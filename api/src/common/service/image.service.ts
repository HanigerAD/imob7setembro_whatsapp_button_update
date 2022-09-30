import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import { Response } from "express";
import * as Jimp from "jimp";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { Builder } from "builder-pattern";
import { ImageRequest } from "../integration/request/image.request";
import { CdnService } from "./cdn.service";
import { CdnDto } from "../dto/cdn.dto";

@Injectable()
export class ImageService {
  constructor(private cdnService: CdnService) { }

  get acceptedFormats(): string[] {
    return ["image/png", "image/jpg", "image/jpeg"];
  }

  public async saveImages(
    images: ImageRequest[],
    res: Response,
    addWatermask = false,
    logoUrl = ''
  ): Promise<void> {
    if (images?.length) {
      const validImages = images.filter((image) =>
        this.acceptedFormats.includes(image.file.mimetype)
      );

      const cdnDtos = await Promise.all(
        validImages.map((image) => this.prepararImagensParaCdn(image, addWatermask, logoUrl))
      ).then(promissesResponse => promissesResponse.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue)
      }, []));

      return this.cdnService.sendMultipleFilesToFTP(cdnDtos, res);
    }

    return null;
  }

  public async saveImage(image: ImageRequest, res: Response, addWatermask = false, logoUrl = ''): Promise<void> {
    const cdnDtos = await this.prepararImagensParaCdn(image, addWatermask, logoUrl);

    if (cdnDtos.length) {
      return this.cdnService.sendMultipleFilesToFTP(cdnDtos, res);
    }

    return null;
  }

  private async prepararImagensParaCdn(image: ImageRequest, addWatermask = false, logoUrl = ''): Promise<CdnDto[]> {
    if (image && this.acceptedFormats.includes(image.file.mimetype)) {
      const extensaoDaImagem = path.extname(image.file.originalname);
      const nomeDaImagem = this.gerarNomeParaImagem('', '', extensaoDaImagem);
      image.file.filename = nomeDaImagem;// altera nome do arquivo no contexto

      const bufferImagemTratada = await this.tratarImagem(image.file.buffer, image.width, image.height);

      if (addWatermask) {
        const cdnDtoImagemTratada = this.buildCdnDto(bufferImagemTratada, `original-${nomeDaImagem}`);

        const bufferImagemComMarcaDagua = await this.aplicarMarcaDagua(bufferImagemTratada, logoUrl);
        const cdnDtoImagemTratadaComMarcaDagua = this.buildCdnDto(bufferImagemComMarcaDagua, nomeDaImagem);

        return [cdnDtoImagemTratada, cdnDtoImagemTratadaComMarcaDagua];
      } else {
        const cdnDtoImagemTratada = this.buildCdnDto(bufferImagemTratada, nomeDaImagem);

        return [cdnDtoImagemTratada];
      }
    }

    return [];
  }

  private async tratarImagem(imageBuffer: Buffer, maxWidth: number, maxHeight: number): Promise<Buffer> {
    const { width: originalWidth, height: originalHeight } = await sharp(imageBuffer).metadata();
    let width = maxWidth;
    let height = maxHeight;

    if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
      width = originalWidth;
      height = originalHeight;
    }

    return await sharp(imageBuffer)
      .resize(width, height, {
        fit: 'inside',
      })
      .toBuffer();
  }

  private async aplicarMarcaDagua(imageBuffer: Buffer, logoUrl): Promise<Buffer> {
    let image = await Jimp.read(imageBuffer);
    let watermark = await Jimp.read(logoUrl);

    watermark.resize(image.bitmap.width / 5, Jimp.AUTO);

    const LOGO_MARGIN_PERCENTAGE = 5;
    const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

    const X = image.bitmap.width - watermark.bitmap.width - xMargin;
    const Y = image.bitmap.height - watermark.bitmap.height - yMargin;

    const mimeImage = image.getMIME();

    image = image.composite(watermark, X, Y, {
      mode: Jimp.BLEND_SOURCE_OVER,
      opacityDest: 1,
      opacitySource: 0.5
    });

    return await image.getBufferAsync(mimeImage);
  }

  private gerarNomeParaImagem(prefix: string, suffix: string, ext: string): string {
    return `${prefix}${uuidv4()}${suffix}${ext}`;
  }

  private buildCdnDto(file: Buffer, fileName: string): CdnDto {
    return Builder<CdnDto>().buffer(file).name(fileName).build();
  }
}

