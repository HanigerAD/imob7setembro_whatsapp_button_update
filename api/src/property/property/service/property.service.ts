import { ImageResponse } from './../integration/response/photo.response';
import { HttpService, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { Response } from 'express';

import { AgentResponse } from 'src/agent/integration/response/agent.response';
import { CityResponse } from 'src/locality/city/integration/response/city.response';

import { AgentMapper } from '../../../agent/mapper/agent.mapper';
import { ImageSizeEnum } from '../../../common/enum/image-size.enum';
import { ImageRequest } from '../../../common/integration/request/image.request';
import { DocumentService } from '../../../common/service/document.service';
import { ImageService } from '../../../common/service/image.service';
import { UtilsService } from '../../../common/utils/utils';
import { CityService } from '../../../locality/city/service/city.service';
import { FederativeUnitService } from '../../../locality/federative-unit/service/federative-unit.service';
import { NeighborhoodService } from '../../../locality/neighborhood/service/neighborhood.service';
import { CategoryResponse } from '../../category/integration/response/category.response';
import { CategoryMapper } from '../../category/mapper/category.mapper';
import { ConservationStateResponse } from '../../conservation-state/integration/response/conservation-state.response';
import { ProfileResponse } from '../../profile/integration/response/profile.response';
import { TransactionResponse } from '../../transaction/integration/response/transaction.response';
import { TypeResponse } from '../../type/integration/response/type.response';
import { ZoneResponse } from '../../zone/integration/response/zone.response';
import { ZoneMapper } from '../../zone/mapper/zone.mapper';
import { PropertyDetailBuilder } from '../builder/property-detail.builder';
import { PropertyDTO } from '../DTO/property.dto';
import { PropertyFilterRequest } from '../integration/request/property-filter.request';
import { PropertyRequest } from '../integration/request/property.request';
import { PropertyDetailResponse } from '../integration/response/property-detail.response';
import { PropertyFilterMapper } from '../mapper/property-filter.mapper';
import { PropertyMapper } from '../mapper/property.mapper';
import { PropertyRepository } from '../repository/property.repository';
import { NeighborhoodResponse } from './../../../locality/neighborhood/integration/response/neighborhood.response';
import { ConservationStateMapper } from './../../conservation-state/mapper/conservation-state.mapper';
import { ProfileMapper } from './../../profile/mapper/profile.mapper';
import { TransactionMapper } from './../../transaction/mapper/transaction.mapper';
import { TypeMapper } from './../../type/mapper/type.mapper';
import { ImageMapper } from './../mapper/image.mapper';
import { CdnService } from "../../../common/service/cdn.service";
import { ImageSortRequest } from "../integration/request/image-sort.request";
import { PropertyDocumentResponse } from "../integration/response/property-document.response";
import { PropertyDocumentMapper } from "../mapper/property-document.mapper";
import { LogEntity } from "../entity/log.entity";
import { LogRequest } from "../integration/request/log.request";
import { LogMapper } from "../mapper/log.mapper";
import { LogResponse } from "../integration/response/log.response";
import { TableFieldEnum } from "../table-field.enum";
import { SituationResponse } from "../../../user/integration/response/situation.response";
import { SituationMapper } from "../../../user/mapper/situation.mapper";
import { ConfigurationService } from 'src/configuration/service/configuration.service';
import { ImageWatermark } from 'src/common/integration/request/image-watermark';
import { CategoryRequest } from '../../../property/category/integration/response/category.request';



@Injectable()
export class PropertyService {
  constructor(
    private repository: PropertyRepository,
    private neighborhoodService: NeighborhoodService,
    private cityService: CityService,
    private federativeUnitService: FederativeUnitService,
    private imageService: ImageService,
    private documentService: DocumentService,
    private configurationService: ConfigurationService
  ) {
  }

  public async insertProperty(request: PropertyRequest): Promise<number> {
    return this.repository.insertProperty(PropertyMapper.requestToEntity(request));
  }

  public async insertCategory(request: CategoryRequest): Promise<number> {
    return this.repository.insertCategory(CategoryMapper.requestToEntity(request));
  }

  public updateCategory(code: number, request: CategoryRequest): Promise<number> {
    return this.repository.updateCategory(code, CategoryMapper.requestToEntity(request));
  }

  public deleteCategory(code: number): Promise<number> {
    return this.repository.deleteCategory(code);
  }

  public update(code: number, request: PropertyRequest): Promise<number> {
    return this.repository.update(code, PropertyMapper.requestToEntity(request));
  }

  public getAllProperties(filter: PropertyFilterRequest): Promise<any> {
    const filters = PropertyFilterMapper.requestToEntity(filter);

    return this.repository.getAll(UtilsService.clearObject(filters))
      .then(properties => PropertyMapper.entityListToResponse(properties));
  }

  public async generateImagesWithWatermark(res: Response): Promise<void> {
    // buscar todas as imagens originais das propriedades
    let allImagesOfPropertiesResponse = await this.repository.getAllPropertiesImagesUrls();
    let allImagesOfProperties = allImagesOfPropertiesResponse.map(
      ({ foto }) => ({
        foto,
        originalFoto: `original-${foto}`,
        originalFotoUrl: `${process.env.CDN_URL}/original-${foto}`,
      } as ImageWatermark)
    );
    // buscar logo
    const { logo: logoImageName } = await this.configurationService.get();
    const logoUrl = `${process.env.CDN_URL}/${logoImageName}`;

    console.log('1', allImagesOfProperties);

    return this.imageService.applyWatermarkAndSubmitToCdn(allImagesOfProperties, logoUrl, res);
  }

  public getSingle(code: number): Promise<PropertyDetailResponse> {
    return this.repository.getSingle(code)
      .then(result => PropertyMapper.entityDetailToDto(result))
      .then(property => this.buildDetailedResponse(property));
  }

  public async buildDetailedResponse(property: PropertyDTO): Promise<PropertyDetailResponse> {
    const builder = new PropertyDetailBuilder();
    builder.setProperty(property);
    builder.setAgent(await this.getAgent(property.code));
    builder.setCategory(await this.getCategory(property.code));
    builder.setConservationState(await this.getConservationState(property.code));
    builder.setProfile(await this.getprofile(property.code));
    builder.setType(await this.getType(property.code));
    builder.setZone(await this.getZone(property.code));
    builder.setTransaction(await this.getTransaction(property.code))
    builder.setFederativeUnit(await this.federativeUnitService.getByCity(property.city))
    builder.setCity(await this.cityService.getSingle(property.city))
    builder.setNeighborhood(await this.neighborhoodService.getSingle(property.neighborhood))
    builder.setSituation(await this.getSituation(property.code))
    return builder.build();
  }

  public getCity(code: number): Promise<CityResponse> {
    return this.cityService.getSingle(code);
  }

  public getNeighborhood(code: number): Promise<NeighborhoodResponse> {
    return this.neighborhoodService.getSingle(code);
  }

  public getCategory(code: number): Promise<CategoryResponse> {
    return this.repository.getCategory(code)
      .then(result => CategoryMapper.entityToResponse(result));
  }

  public getAgent(code: number): Promise<AgentResponse> {
    return this.repository.getAgent(code)
      .then(result => AgentMapper.entityToResponse(result));
  }

  public getConservationState(code: number): Promise<ConservationStateResponse> {
    return this.repository.getConservationState(code)
      .then(result => ConservationStateMapper.entityToResponse(result));
  }

  public getprofile(code: number): Promise<ProfileResponse> {
    return this.repository.getprofile(code)
      .then(result => ProfileMapper.entityToResponse(result));
  }

  public getZone(code: number): Promise<ZoneResponse> {
    return this.repository.getZone(code)
      .then(result => ZoneMapper.entityToResponse(result));
  }

  public getType(code: number): Promise<TypeResponse> {
    return this.repository.getType(code)
      .then(result => TypeMapper.entityToResponse(result));
  }

  public getSituation(code: number): Promise<SituationResponse> {
    return this.repository.getSituation(code)
      .then(result => SituationMapper.entityToResponse(result));
  }

  public getTransaction(code: number): Promise<TransactionResponse> {
    return this.repository.getTransaction(code)
      .then(transaction => TransactionMapper.entityToResponse(transaction));
  }

  public getRentCounter(): Promise<number> {
    return this.repository.rentPropertyCounter()
      .then(result => result[0].registers);
  }

  public getSellCounter(): Promise<number> {
    return this.repository.sellPropertyCounter()
      .then(result => result[0].registers);
  }

  // public getPropertyImage(code: number): Promise<string[]> {
  //     return this.repository.getPropertyImage(code)
  //         .then(result => result.foto);
  // }

  public getPropertyImagesUrls(code: number): Promise<string[]> {
    return this.repository.getPropertyImagesUrls(code)
      .then(result => result?.map(entity => entity.foto));
  }

  public getPropertyDocuments(code: number): Promise<PropertyDocumentResponse[]> {
    return this.repository.getPropertyDocuments(code)
      .then(documents => documents.map(document => PropertyDocumentMapper.mapPropertyDocumentEntityToResponse(document)));
  }

  public async insertPropertyImages(files: Express.Multer.File[], propertyCode: number, res: Response): Promise<void> {
    const { logo: logoImageName } = await this.configurationService.get();
    const logoUrl = `${process.env.CDN_URL}/${logoImageName}`;

    return this.imageService.saveImages(this.buildPropertyImage(files), res, true, logoUrl)
      .then(() => Promise.all(files.map((file, i) => this.repository.insertPropertyImages(file.filename, i, propertyCode))))
      .then(() => {
      })

  }

  public async insertPropertyImage(file: Express.Multer.File, propertyCode: number, res: Response, order: number): Promise<void> {
    const { logo: logoImageName } = await this.configurationService.get();
    const logoUrl = `${process.env.CDN_URL}/${logoImageName}`;

    return this.imageService.saveImage(this.buildPropertyImageRequest(file), res, true, logoUrl)
      .then(() => this.repository.insertPropertyImage(file[0].filename, order, propertyCode))
      .then(() => { });
  }

  public async updateImagesSort(imagesSort: ImageSortRequest[]): Promise<void> {
    await Promise.all(imagesSort.map(image => this.repository.updateImagesSort(image)));
  }

  public async insertPropertyDocument(file: Express.Multer.File, propertyCode: number): Promise<void> {
    const newFile = this.buildPropertyDocument(file);
    await this.documentService.saveDocument(newFile);
    await this.repository.insertPropertyDocument(newFile.filename, newFile.originalname, propertyCode);
  }

  public insertDocuments(files: Express.Multer.File[], propertyCode: number, res: Response): void {
    Promise.all(files.map(file => this.documentService.saveDocument(file)));
    Promise.all(files.map(file => this.repository.insertPropertyDocument(file.filename, file.originalname, propertyCode)));
  }

  public buildPropertyDocument(file: Express.Multer.File): Express.Multer.File {
    return file[0];
  }

  public buildPropertyImage(files: Express.Multer.File[]): ImageRequest[] {
    return files?.map(file =>
      Builder<ImageRequest>()
        .file(file)
        .width(ImageSizeEnum.PROPERTY_WIDTH)
        .height(ImageSizeEnum.PROPERTY_HEIGHT)
        .build()
    );
  }

  public buildPropertyImageRequest(file: Express.Multer.File): ImageRequest {
    return Builder<ImageRequest>()
      .file(file[0])
      .width(ImageSizeEnum.PROPERTY_WIDTH)
      .height(ImageSizeEnum.PROPERTY_HEIGHT)
      .build();
  }

  public getPropertyImages(propertyCode: number): Promise<ImageResponse[]> {
    return this.repository.getPropertyImages(propertyCode)
      .then(entities => ImageMapper.entityListToResponse(entities))
  }

  public async deleteImages(paths: string[]): Promise<void> {
    await Promise.all(paths.map(path => this.repository.deleteImage(path)));
  }

  public async deleteDocuments(paths: string[]): Promise<void> {
    await Promise.all(paths.map(path => this.repository.deleteDocuments(path)));
  }

  public delete(code: number): Promise<number> {
    return this.repository.delete(code);
  }

  public async insertLogs(logRequest: LogRequest[]): Promise<void> {
    const entity: LogEntity[] = LogMapper.mapRequestListToEntity(logRequest);
    await Promise.all(entity.map(log => this.repository.insertLog(log)));
  }

  public getLogs(propertyCode: number): Promise<LogResponse[]> {
    return this.repository.getLogs(propertyCode)
      .then(logs => LogMapper.mapEntityListToResponse(logs));
  }

  public getValueLog(field: string, value: number): Promise<any> {
    const table = TableFieldEnum[field];
    return this.repository.getValueLog(table, value)
      .then(response => response[0]);
  }

}
