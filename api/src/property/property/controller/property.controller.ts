import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";

import { JwtAuthGuard } from "../../../authentication/config/jwt-auth.guard";
import { SituationResponse } from "../../../user/integration/response/situation.response";
import { CategoryResponse } from "../../category/integration/response/category.response";
import { ConservationStateResponse } from "../../conservation-state/integration/response/conservation-state.response";
import { ProfileResponse } from "../../profile/integration/response/profile.response";
import { TransactionResponse } from "../../transaction/integration/response/transaction.response";
import { TypeResponse } from "../../type/integration/response/type.response";
import { ZoneResponse } from "../../zone/integration/response/zone.response";
import { PropertyFilterRequest } from "../integration/request/property-filter.request";
import { PropertyRequest } from "../integration/request/property.request";
import { PropertyBasicDataService } from "../service/property-basic-data.service";
import { PropertyService } from "../service/property.service";
import { PropertyDetailResponse } from "./../integration/response/property-detail.response";
import { ImageSortRequest } from "../integration/request/image-sort.request";
import { PropertyDocumentResponse } from "../integration/response/property-document.response";
import { LogRequest } from "../integration/request/log.request";
import { LogResponse } from "../integration/response/log.response";

@Controller("property")
export class PropertyController {
  constructor(
    private service: PropertyService,
    private basicDataService: PropertyBasicDataService
  ) {}

  @Post("properties")
  @UseGuards(JwtAuthGuard)
  public insertProperty(@Body() request: PropertyRequest): Promise<number> {
    return this.service.insertProperty(request);
  }

  @Post("properties/:code/images")
  @UseInterceptors(FilesInterceptor("files"))
  @HttpCode(HttpStatus.OK)
  public insertImages(
    @Param("code") code: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response
  ): void {
    this.service.insertPropertyImages(files, code, res);
  }

  @Put("properties/:code/images")
  @UseInterceptors(FilesInterceptor("files"))
  @HttpCode(HttpStatus.OK)
  public updateImages(
    @Param("code") code: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response
  ): void {
    this.service.insertPropertyImages(files, code, res);
  }

  @Post("properties/:code/image")
  @UseInterceptors(FilesInterceptor("file"))
  @HttpCode(HttpStatus.OK)
  public insertImage(
    @Param("code") code: number,
    @Query("order") order: number,
    @UploadedFiles() file: Express.Multer.File,
    @Res() res: Response
  ): void {
    this.service.insertPropertyImage(file, code, res, order);
  }

  @Put("properties/images-sort")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public updateImagesSort(@Body() imagesSort: ImageSortRequest[]): void {
    this.service.updateImagesSort(imagesSort);
  }

  @Patch("properties/:code/delete-images")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public deleteImages(
    @Param("code") code: number,
    @Body() deletedImages: string[]
  ): void {
    this.service.deleteImages(deletedImages);
  }

  @Patch("properties/:code/delete-documents")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public deleteDocuments(
    @Param("code") code: number,
    @Body() deletedImages: string[]
  ): void {
    this.service.deleteDocuments(deletedImages);
  }

  @Get("properties")
  public async getAllProperty(
    @Query() filter: PropertyFilterRequest,
    @Res() res: Response
  ): Promise<any> {
    res.send(await this.service.getAllProperties(filter, res));
  }

  @Get("properties/:code")
  public getSingleProperty(
    @Param("code") code: number
  ): Promise<PropertyDetailResponse> {
    return this.service.getSingle(code);
  }

  @Patch("properties/:code")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public updateProperty(
    @Param("code") code: number,
    @Body() request: PropertyRequest
  ): Promise<number> {
    return this.service.update(code, request);
  }

  @Post("properties/:code/documents")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor("files"))
  public insertDocuments(
    @Param("code") code: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() response: Response
  ) {
    return this.service.insertDocuments(files, code, response);
  }

  @Get("counter/rent")
  public getRentCounter(): Promise<number> {
    return this.service.getRentCounter();
  }

  @Get("counter/sell")
  public getSellCounter(): Promise<number> {
    return this.service.getSellCounter();
  }

  // @Get('properties/:code/image')
  // public async getPropertyImage(@Param('code') code: number, @Res() res): Promise<Express.Multer.File> {
  // const image = await this.service.getPropertyImage(code);
  // return res.sendFile(image, { root: 'uploads' })
  // }

  @Get("properties/:code/images/urls")
  public async getPropertyImageUrl(
    @Param("code") code: number,
    @Res() res
  ): Promise<string[]> {
    const images = await this.service.getPropertyImagesUrls(code);
    return res.send(images);
  }

  @Get("properties/:code/documents")
  public async getPropertyDocuments(
    @Param("code") code: number,
    @Res() res
  ): Promise<PropertyDocumentResponse[]> {
    const images = await this.service.getPropertyDocuments(code);
    return res.send(images);
  }

  @Get("/transactions")
  public getTransactions(): Promise<TransactionResponse[]> {
    return this.basicDataService.getTransactions();
  }

  @Get("/zones")
  public getZones(): Promise<ZoneResponse[]> {
    return this.basicDataService.getZones();
  }

  @Get("/categories")
  public getCategories(): Promise<CategoryResponse[]> {
    return this.basicDataService.getCategories();
  }

  @Get("/types")
  public getTypes(): Promise<TypeResponse[]> {
    return this.basicDataService.getTypes();
  }

  @Get("/conservation-states")
  public getConservationStates(): Promise<ConservationStateResponse[]> {
    return this.basicDataService.getConservationStates();
  }

  @Get("/situations")
  public getSituations(): Promise<SituationResponse[]> {
    return this.basicDataService.getSituations();
  }

  @Get("/profiles")
  public getProfiles(): Promise<ProfileResponse[]> {
    return this.basicDataService.getProfiles();
  }

  @Post("/logs")
  public insertLogs(@Body() logsRequest: LogRequest[]): void {
    this.service.insertLogs(logsRequest);
  }

  @Get("/logs/:code")
  public getLogs(@Param("code") propertyCode: number): Promise<LogResponse[]> {
    return this.service.getLogs(propertyCode);
  }

  @Get("/logs/description/:field/:value")
  public getValueLog(
    @Param("field") field: string,
    @Param("value") value: number
  ): Promise<any> {
    return this.service.getValueLog(field, value);
  }
}
