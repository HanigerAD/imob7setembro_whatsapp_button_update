import { Injectable } from '@angular/core';
import { StorageEnum } from '../../shared/storage.enum';
import { ConfigurationModel } from '../../shared/model/configuration.model';
import { AgentModel } from '../model/agent.model';
import { AgentRestService } from './agent-rest.service';
import { map } from 'rxjs/operators';
import { AgentMapper } from '../mapper/agent.mapper';
import { Observable } from 'rxjs';

@Injectable()
export class AboutUsService {

  constructor(
    private agentRest: AgentRestService
  ) { }

  public getSiteInfoStorage(): ConfigurationModel {
    return JSON.parse(localStorage.getItem(StorageEnum.SITE_INFO));
  }

  public getAgents(): Observable<AgentModel[]> {
    return this.agentRest.getAgents().pipe(
      map(response => AgentMapper.mapAgentsArrayResponseToModel(response))
    );
  }
}
