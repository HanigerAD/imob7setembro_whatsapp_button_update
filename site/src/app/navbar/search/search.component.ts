import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { LoginModel } from '../../shared/model/login.model';
import { Subscription } from 'rxjs';
import { SearchService } from './services/search.service';
import { CityModel } from './model/city.model';
import { NeighborhoodModel } from './model/neighborhood.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchTabsEnum } from './enum/search-tabs.enum';
import { FinalityModel } from './model/finality.model';
import { TypeModel } from './model/type.model';
import { PropertyZoneEnum } from './enum/property-zone.enum';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input()
  public siteInfo: LoginModel;

  public searchForm: FormGroup;
  public optionsSlider: Options;
  public finalities: FinalityModel[] = [];
  public types: TypeModel[] = [];
  public cities: CityModel[] = [];
  public neighborhoods: NeighborhoodModel[] = [];
  public activatedTab: SearchTabsEnum = SearchTabsEnum.URBAN;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: SearchService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.generateForm();
    this.configureSlider();
    this.getFinalities();
    this.getTypes();
    this.getCities();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private generateForm(): void {
    this.searchForm = this.formBuilder.group({
      finality: 0,
      type: 0,
      city: 0,
      neighborhood: 0,
      internalCode: null,
      minPrice: '',
      maxPrice: '',
      category: 0,
      zone: 0
    });
  }

  transformCurrency(keyFormattedCurrency) {
    const value = this.searchForm.get(keyFormattedCurrency).value;

    this.searchForm.get(keyFormattedCurrency).setValue(
      this.formatMoney(value),
      { emitEvent: false }
    );
  }

  formatMoney(value) {
    let temp = String(value).trim();

    temp = temp.replace(/\D/g, "");
    temp = temp.replace(/(\d)$/, "$1");
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return temp;
  }

  public changeTab(activatedTab: string): void {
    if (activatedTab !== SearchTabsEnum.CODE) {
      this.searchForm.get('internalCode').setValue(null);
    }

    this.activatedTab = SearchTabsEnum[activatedTab];
  }

  private getFinalities(): void {
    this.subscriptions.add(
      this.service.getFinalities().subscribe(
        finalities => this.finalities = finalities
      )
    );
  }

  private getTypes(): void {
    this.subscriptions.add(
      this.service.getTypes().subscribe(
        types => this.types = types
      )
    );
  }

  private getCities(): void {
    this.subscriptions.add(
      this.service.getCities().subscribe(
        cities => this.cities = cities
      )
    );
  }

  public getNeighborhoods(): void {
    this.subscriptions.add(
      this.service.getNeighborhoods(this.searchForm.get('city').value).subscribe(
        neighborhoods => this.neighborhoods = neighborhoods
      )
    );
  }

  public search(): void {
    this.manageSelectedValues();

    this.service.saveFiltersStorage(this.searchForm.getRawValue());
    this.service.redirectToListProperties();
  }

  private manageSelectedValues(): void {
    switch (this.activatedTab) {
      case SearchTabsEnum.URBAN: {
        this.searchForm.get('zone').setValue(PropertyZoneEnum.URBAN);
        break;
      }

      case SearchTabsEnum.RURAL: {
        this.searchForm.get('zone').setValue(PropertyZoneEnum.RURAL);
        break;
      }

      default:
        break;
    }
  }

  private configureSlider(): void {
    this.optionsSlider = {
      floor: 0,
      ceil: 10000000,
      animate: true,
      translate: (value: number): string => {
        return 'R$' + (this.roundValue(value)).toLocaleString();
      },
      combineLabels: (minValue: string, maxValue: string): string => {
        return `${minValue} - ${maxValue}`;
      }
    };
  }

  private roundValue(value: number): number {
    return Math.trunc(Math.round(value * 100) / 1000000) * 10000;
  }

}
