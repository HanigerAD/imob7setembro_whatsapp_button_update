import { Injectable } from '@angular/core';
import {LoginModel} from '../../shared/model/login.model';
import {StorageEnum} from '../../shared/storage.enum';
import {ConfigurationModel} from '../../shared/model/configuration.model';

@Injectable()
export class AboutUsService {

  constructor() { }

  public getSiteInfoStorage(): ConfigurationModel {
    return JSON.parse(localStorage.getItem(StorageEnum.SITE_INFO));
  }

}
