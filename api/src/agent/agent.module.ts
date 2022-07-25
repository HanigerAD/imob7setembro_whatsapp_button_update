import {Module} from '@nestjs/common';
import {AgentController} from './controller/agent.controller';
import {AgentService} from "./service/agent.service";
import {AgentRepository} from "./repository/agent.repository";

@Module({
    controllers: [AgentController],
    providers: [
        AgentService,
        AgentRepository
    ]
})
export class AgentModule {
}
