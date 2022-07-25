import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StorageEnum} from '../shared/storage.enum';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  constructor(
      private router: Router
  ) { }

  public ngOnInit(): void {
  }

  public redirectToPartner(url: string): void {
    window.open(url, '_blank');
  }

  get banner(): string {
    const banner = JSON.stringify(localStorage.getItem(StorageEnum.BANNER));
    return `background-image:url(${banner});`;
  }

}
