import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { CityModel } from '../../navbar/search/model/city.model';
import { NeighborhoodModel } from '../../navbar/search/model/neighborhood.model';
import { SearchModel } from '../../navbar/search/model/search.model';
import { StorageEnum } from '../../shared/storage.enum';
import { FinalityModel } from '../../navbar/search/model/finality.model';
import { TypeModel } from '../../navbar/search/model/type.model';
import { SearchService } from '../../navbar/search/services/search.service';
import { Subscription } from 'rxjs';
import { PropertyService } from '../services/property.service';
import { PropertyModel } from '../models/property.model';
import { Router } from '@angular/router';
import { TransactionEnum } from '../../shared/enum/transaction.enum';
import { ZoneModel } from '../../navbar/search/model/zone.model';
import { PropertyZoneEnum } from '../../navbar/search/enum/property-zone.enum';
import { converterParaMoeda } from '../../shared/utils/parser.utils';
import { Builder } from 'builder-pattern';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.css']
})
export class ListPropertiesComponent implements OnInit, OnChanges {

  private subscriptions: Subscription = new Subscription();
  public searchForm: FormGroup;
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

  public propertiesCounter = 0;
  public actualPage = 1;
  public perPage = 12;

  public converterParaMoeda = converterParaMoeda;

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

    this.getProperties();
    window.scroll(0, 0);
  }

  public ngOnChanges(): void {
    this.ruralZoneSelected = this.searchForm?.get('zone')?.value === PropertyZoneEnum.RURAL;
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

  converterParaNumero(value) {
    let temp = String(value).trim().replace(/\D/g, "");

    return Number(temp);
  }

  private getFilters(): void {
    this.filters = JSON.parse(localStorage.getItem(StorageEnum.FILTERS));
    if (!this.filters) {
      const newFilters = Builder<SearchModel>()
        .finality(0)
        .type(0)
        .city(0)
        .neighborhood(0)
        .zone(0)
        .build();

      this.searchService.saveFiltersStorage(newFilters);
      this.filters = newFilters;
    }
  }

  private generateForm(): void {
    if (this.filters) {
      this.searchForm = this.formBuilder.group({
        financeable: this.filters.financeable,
        finality: this.filters.finality,
        type: this.filters.type,
        city: this.filters.city,
        zone: this.filters.zone,
        neighborhood: this.filters.neighborhood,
        code: this.filters.code,
        minPrice: [this.filters.minPrice ? this.formatMoney(this.filters.minPrice) : ''],
        maxPrice: [this.filters.maxPrice ? this.formatMoney(this.filters.maxPrice) : ''],
        bedroom: this.filters.bedroom,
        parkingVacancy: this.filters.parkingVacancy,
        bathroom: this.filters.bathroom,
      });
    }

    this.ruralZoneSelected = this.searchForm.get('zone').value === PropertyZoneEnum.RURAL;
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

  private getProperties(): void {
    this.getPropertiesCounter();

    this.filters.page = this.actualPage;
    this.filters.perPage = this.perPage;
    this.filters.minPrice = this.filters.minPrice ? this.converterParaNumero(this.filters.minPrice) : undefined;
    this.filters.maxPrice = this.filters.maxPrice ? this.converterParaNumero(this.filters.maxPrice) : undefined;
    this.loading = true;

    this.subscriptions.add(
      this.service.getProperties(this.filters).subscribe(
        properties => this.manageSuccessGetProperties(properties),
        () => this.loading = false
      )
    );
  }

  private getPropertiesCounter(): void {
    this.subscriptions.add(
      this.service.getPropertiesCounter(this.filters).subscribe(
        propertiesCounter => this.manageSuccessGetPropertiesCounter(propertiesCounter),
        () => this.loading = false
      )
    );
  }

  private manageSuccessGetProperties(properties: PropertyModel[]): void {
    this.properties = properties;
    this.loading = false;
  }

  private manageSuccessGetPropertiesCounter(propertiesCounter: number): void {
    this.propertiesCounter = propertiesCounter;
  }

  public searchProperties(): void {
    this.filters = this.searchForm.getRawValue();
    
    this.filters.city = this.filters.city && this.filters.city !== '0' ? this.filters.city : undefined;
    this.filters.code = this.filters.code && this.filters.code !== '0' ? this.filters.code : undefined;
    this.filters.finality = this.filters.finality && this.filters.finality !== '0' ? this.filters.finality : undefined;
    this.filters.neighborhood = this.filters.neighborhood && this.filters.neighborhood !== '0' ? this.filters.neighborhood : undefined;
    this.filters.featured = this.filters.featured && this.filters.featured !== '0' ? this.filters.featured : undefined;
    this.filters.zone = this.filters.zone && this.filters.zone !== '0' ? this.filters.zone : undefined;
    this.filters.showSite = this.filters.showSite && this.filters.showSite !== '0' ? this.filters.showSite : undefined;
    this.filters.type = this.filters.type && this.filters.type !== '0' ? this.filters.type : undefined;
    this.filters.minPrice = this.filters.minPrice ? this.converterParaNumero(this.filters.minPrice) : undefined;
    this.filters.maxPrice = this.filters.maxPrice ? this.converterParaNumero(this.filters.maxPrice) : undefined;
    this.filters.bathroom = this.filters.bathroom ? Number(this.filters.bathroom) : undefined;
    this.filters.bedroom = this.filters.bedroom ? Number(this.filters.bedroom) : undefined;
    this.filters.parkingVacancy = this.filters.parkingVacancy ? Number(this.filters.parkingVacancy) : undefined;
    this.filters.financeable = this.filters.financeable ? 1 : 0;
    
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
