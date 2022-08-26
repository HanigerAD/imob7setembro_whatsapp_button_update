import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";
import { Response } from "express";
import { ImageRequest } from "../integration/request/image.request";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import { CdnService } from "./cdn.service";
import { CdnDto } from "../dto/cdn.dto";
import { Builder } from "builder-pattern";

@Injectable()
export class ImageService {
  constructor(private cdnService: CdnService) {}

  get acceptedFormats(): string[] {
    return ["image/png", "image/jpg", "image/jpeg"];
  }

  public async saveImages(
    images: ImageRequest[],
    res: Response
  ): Promise<void> {
    if (images?.length) {
      const validImages = images.filter((image) =>
        this.acceptedFormats.includes(image.file.mimetype)
      );
      const cdnDtos = await Promise.all(
        validImages.map((image) => this.prepareImageForCDN(image))
      );
      return this.cdnService.sendMultipleFilesToFTP(cdnDtos, res);
    }
    return null;
  }

  public async saveImage(image: ImageRequest, res: Response): Promise<void> {
    if (image && this.acceptedFormats.includes(image.file.mimetype)) {
      const cdnDtos = await this.prepareImageForCDN(image);
      return this.cdnService.sendSingleImageToFTP(cdnDtos, res);
    }
    return null;
  }

  private async prepareImageForCDN(image: ImageRequest): Promise<CdnDto> {
    image.file.filename = this.renameImage(image.file.originalname);
    const imageBuffer = await sharp(image.file.buffer)
      .resize(image.width, image.height)
      .toBuffer();
    return this.buildCdnDto(imageBuffer, image.file.filename);
  }

  private renameImage(originalName: string): string {
    return uuidv4() + path.extname(originalName);
  }

  private buildCdnDto(file: Buffer, fileName: string): CdnDto {
    return Builder<CdnDto>().buffer(file).name(fileName).build();
  }
}

