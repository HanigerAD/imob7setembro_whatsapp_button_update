import { Component, OnInit } from '@angular/core';
import { AboutUsService } from './service/about-us.service';
import { ConfigurationModel } from '../shared/model/configuration.model';
import { StorageEnum } from '../shared/storage.enum';
import { AgentModel } from './model/agent.model';
import { converterParaTelefone, converterParaWhatsapp } from '../shared/utils/parser.utils';
import { PartnerModel } from '../shared/model/partner.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public siteInfo: ConfigurationModel;
  public agents: AgentModel[] = [];
  public partners: PartnerModel[] = [];

  constructor(
    private service: AboutUsService
  ) { }

  public ngOnInit(): void {
    this.getSiteInfo();
    this.getAgents();
    this.getPartners();
  }

  public getSiteInfo(): void {
    this.siteInfo = this.service.getSiteInfoStorage();
  }

  public getAgents(): void {
    this.service.getAgents().subscribe(response => {
      this.agents = response;
    });
  }

  public getPartners(): void {
    this.service.getPartners().subscribe(response => {
      this.partners = response;
    });
  }

  public converterTelefone(phone: string): string {
    return converterParaTelefone(phone);
  }

  get banner(): string {
    const banner = JSON.stringify(localStorage.getItem(StorageEnum.BANNER));
    return `background-image:url(${banner});`;
  }

  public converterParaWhatsapp(phone: string): string {
    return converterParaWhatsapp(phone);
  }
}
