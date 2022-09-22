import { Module } from "@nestjs/common";
import { AgentController } from "./controller/agent.controller";
import { AgentService } from "./service/agent.service";
import { AgentRepository } from "./repository/agent.repository";
import { CommomModule } from "src/common/commom.module";

@Module({
  controllers: [AgentController],
  providers: [AgentService, AgentRepository],
  imports: [CommomModule],
})
export class AgentModule {}

