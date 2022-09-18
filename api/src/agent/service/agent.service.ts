import { AgentRepository } from "../repository/agent.repository";
import { Injectable } from "@nestjs/common";
import { AgentRequest } from "../integration/request/agent.request";
import { AgentMapper } from "../mapper/agent.mapper";
import { AgentResponse } from "../integration/response/agent.response";
import { ImageService } from "src/common/service/image.service";
import { ImageRequest } from "src/common/integration/request/image.request";
import { Builder } from "builder-pattern";
import { ImageSizeEnum } from "src/common/enum/image-size.enum";
import { Response } from "express";

@Injectable()
export class AgentService {
  constructor(
    private repository: AgentRepository,
    private imageService: ImageService
  ) {}

  public insert(request: AgentRequest): Promise<number> {
    return this.repository.insert(AgentMapper.requestToEntity(request));
  }

  public getAll(): Promise<AgentResponse[]> {
    return this.repository
      .getAll()
      .then((agents) => AgentMapper.entityListToResponse(agents));
  }

  public getSingle(code: number): Promise<AgentResponse> {
    return this.repository
      .getSingle(code)
      .then((agent) => AgentMapper.entityToResponse(agent));
  }

  public setImage(
    code: number,
    image: Express.Multer.File,
    res: Response
  ): Promise<number> {
    return this.imageService
      .saveImages(Array.of(this.buildAgentImage(image)), res)
      .then(() => this.repository.setImage(code, image.filename));
  }

  public update(code: number, request: AgentRequest): Promise<number> {
    return this.repository.update(code, AgentMapper.requestToEntity(request));
  }

  public delete(code: number): Promise<number> {
    return this.repository.delete(code);
  }

  public buildAgentImage(file: Express.Multer.File): ImageRequest {
    return Builder<ImageRequest>()
      .file(file)
      .width(ImageSizeEnum.AGENT_WIDTH)
      .height(ImageSizeEnum.AGENT_HEIGHT)
      .build();
  }
}
