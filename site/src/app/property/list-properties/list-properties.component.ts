import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Options} from '@angular-slider/ngx-slider';
import {CityModel} from '../../navbar/search/model/city.model';
import {NeighborhoodModel} from '../../navbar/search/model/neighborhood.model';
import {SearchModel} from '../../navbar/search/model/search.model';
import {StorageEnum} from '../../shared/storage.enum';
import {FinalityModel} from '../../navbar/search/model/finality.model';
import {TypeModel} from '../../navbar/search/model/type.model';
import {SearchService} from '../../navbar/search/services/search.service';
import {Subscription} from 'rxjs';
import {PropertyService} from '../services/property.service';
import {PropertyModel} from '../models/property.model';
import {Router} from '@angular/router';
import {TransactionEnum} from '../../shared/enum/transaction.enum';
import {ZoneModel} from '../../navbar/search/model/zone.model';
import {PropertyZoneEnum} from '../../navbar/search/enum/property-zone.enum';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.css']
})
export class ListPropertiesComponent implements OnInit, OnChanges {

  private subscriptions: Subscription = new Subscription();
  public searchForm: FormGroup;
  public minPrice: number = 10000;
  public maxPrice: number = 2000000;
  public minPriceConfig: number = 10000;
  public maxPriceConfig: number = 2000000;
  public optionsSlider: Options;
  public filters: SearchModel;
  public finalities: FinalityModel[] = [];
  public types: TypeModel[] = [];
  public zones: ZoneModel[] = [];
  public cities: CityModel[] = [];
  public neighborhoods: NeighborhoodModel[] = [];
  public properties: PropertyModel[] = [];
  public loading: boolean = true;
  public ruralZoneSelected = false;

  public propertiesCounter: number;
  public actualPage = 1;
  public perPage = 12;

  constructor(
      private formBuilder: FormBuilder,
      private service: PropertyService,
      private searchService: SearchService,
      private router: Router
  ) { }

  public ngOnInit(): void {
    this.getFinalities();
    this.getZones();
    this.getTypes();
    this.getCities();
    this.getFilters();
    this.generateForm();
    this.verifyMinAndMaxFilterValues();
    this.getValueRange();

    this.getProperties();
    window.scroll(0, 0);
  }

  public ngOnChanges(): void {
    this.verifyMinAndMaxFilterValues();
    this.ruralZoneSelected = this.searchForm?.get('zone')?.value === PropertyZoneEnum.RURAL;
  }

  public verifyMinAndMaxFilterValues(): void {
    const transactionCode = this.service.filteredTransaction ?
        this.service.filteredTransaction :
        Number(this.searchForm.get('finality').value);

    switch (transactionCode) {

      case (0 || TransactionEnum.SALE): {
        this.minPrice = 10000;
        this.maxPrice = 2000000;
        this.minPriceConfig = 10000;
        this.maxPriceConfig = 2000000;
        break;
      }

      case (TransactionEnum.RENT || TransactionEnum.SEASON): {
        this.minPrice = 100;
        this.maxPrice = 20000;
        this.minPriceConfig = 100;
        this.maxPriceConfig = 20000;
        break;
      }
    }

    this.configureSlider();
  }

  private getFilters(): void {
    this.filters = JSON.parse(localStorage.getItem(StorageEnum.FILTERS));
  }

  private generateForm(): void {
    this.searchForm = this.formBuilder.group({
      financeable: this.filters.financeable,
      finality: this.filters.finality,
      type: this.filters.type,
      city: this.filters.city,
      neighborhood: this.filters.neighborhood,
      hectare: this.filters.hectare,
      code: this.filters.code,
      minPrice: this.filters.minPrice,
      maxPrice: this.filters.maxPrice,
      zone: this.filters.zone
    });

    this.ruralZoneSelected = this.searchForm.get('zone').value === PropertyZoneEnum.RURAL;
  }

  private configureSlider(): void {
    this.optionsSlider = {
      floor: this.minPriceConfig,
      ceil: this.maxPriceConfig,
      animate: true,
      translate: (value: number): string => {
        return 'R$' + (this.roundValue(value)).toLocaleString();
      },
      combineLabels: (minValue: string, maxValue: string): string => {
        return `${minValue} - ${maxValue}`;
      }
    };
  }

  private getFinalities(): void {
    this.subscriptions.add(
        this.searchService.getFinalities().subscribe(
            finalities => this.finalities = finalities
        )
    );
  }

  private getZones(): void {
    this.subscriptions.add(
        this.searchService.getZones().subscribe(
            zones => this.zones = zones
        )
    );
  }

  private getTypes(): void {
    this.subscriptions.add(
        this.searchService.getTypes().subscribe(
            types => this.types = types
        )
    );
  }

  private getCities(): void {
    this.subscriptions.add(
        this.searchService.getCities().subscribe(
            cities => this.manageGettingCities(cities)
        )
    );
  }

  private manageGettingCities(cities: CityModel[]): void {
    this.cities = cities;
    this.getNeighborhoods();
  }

  public getNeighborhoods(): void {
    this.subscriptions.add(
        this.searchService.getNeighborhoods(this.searchForm.get('city').value).subscribe(
            neighborhoods => this.neighborhoods = neighborhoods
        )
    );
  }

  private getValueRange(): void {
    this.minPrice = this.filters.minPrice;
    this.maxPrice = this.filters.maxPrice;
  }

  private roundValue(value: number): number {
    return this.minPriceConfig > 100 ?
        Math.trunc(Math.round(value  * 100) / 1000000 ) * 10000 :
        Math.trunc(Math.round(value  * 100) / 10000 ) * 100;
  }

  private getProperties(): void {
    this.filters.page = this.actualPage;
    this.filters.perPage = this.perPage;

    this.subscriptions.add(
        this.service.getProperties(this.filters).subscribe(
            properties => this.manageSuccessGetProperties(properties),
            () => this.loading = false
        )
    );
  }

  private manageSuccessGetProperties(properties: PropertyModel[]): void {
    this.properties = properties;
    this.loading = false;
  }

  public searchProperties(): void {
    this.filters = this.searchForm.getRawValue();
    this.filters.minPrice = this.minPrice;
    this.filters.maxPrice = this.maxPrice;

    this.getProperties();
  }

  public getPropertyImage(path: string): string {
    return this.service.getPropertyImage(path);
  }

  public seePropertyDetails(code: number): void {
    this.router.navigateByUrl(`/detalhes-imovel/${code}`);
  }

  public redirectToContacts(): void {
    this.router.navigateByUrl('/contatos');
  }

  public changePage(page: number): void {
    this.actualPage = page;
    this.getProperties();
  }

  get banner(): string {
    const banner = JSON.stringify(localStorage.getItem(StorageEnum.BANNER));
    return `background-image:url(${banner});`;
  }

}
