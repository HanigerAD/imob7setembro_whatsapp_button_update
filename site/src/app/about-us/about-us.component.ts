import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../shared/model/login.model';
import {AboutUsService} from './service/about-us.service';
import {ConfigurationModel} from '../shared/model/configuration.model';
import {StorageEnum} from '../shared/storage.enum';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public siteInfo: ConfigurationModel;

  constructor(
      private service: AboutUsService
  ) { }

  public ngOnInit(): void {
    this.getSiteInfo();
  }

  public getSiteInfo(): void {
    this.siteInfo = this.service.getSiteInfoStorage();
  }

  get banner(): string {
    const banner = JSON.stringify(localStorage.getItem(StorageEnum.BANNER));
    return `background-image:url(${banner});`;
  }

}
