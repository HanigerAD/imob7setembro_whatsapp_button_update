import { Builder } from 'builder-pattern';
import { AgentResponse } from '../integration/response/agent.response';
import { AgentModel } from '../model/agent.model';

export class AgentMapper {

    public static mapAgentsArrayResponseToModel(response: AgentResponse[]): AgentModel[] {
        return response.map(property => this.mapAgentResponseToModel(property));
    }

    public static mapAgentResponseToModel(response: AgentResponse): AgentModel {
        return Builder<AgentModel>()
            .code(response.code)
            .image(response.image)
            .name(response.name)
            .phone(response.phone)
            .build();
    }
}
