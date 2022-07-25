import {AgentRepository} from "../repository/agent.repository";
import {Injectable} from "@nestjs/common";
import {AgentRequest} from "../integration/request/agent.request";
import {AgentMapper} from "../mapper/agent.mapper";
import {AgentResponse} from "../integration/response/agent.response";

@Injectable()
export class AgentService {
    constructor(
        private repository: AgentRepository
    ) {
    }

    public insert(request: AgentRequest): Promise<number> {
        return this.repository.insert(AgentMapper.requestToEntity(request));
    }

    public getAll(): Promise<AgentResponse[]> {
        return this.repository.getAll()
            .then(agents => AgentMapper.entityListToResponse(agents));
    }

    public getSingle(code: number): Promise<AgentResponse> {
        return this.repository.getSingle(code)
            .then(agent => AgentMapper.entityToResponse(agent));
    }

    public update(code: number, request: AgentRequest): Promise<number> {
        return this.repository.update(code, AgentMapper.requestToEntity(request));
    }

    public delete(code: number): Promise<number> {
        return this.repository.delete(code);
    }
}