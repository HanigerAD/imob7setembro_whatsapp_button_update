import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyModel } from '../models/property.model';
import { PropertyDetailsModel } from '../models/property-details.model';
import * as L from 'leaflet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchModel } from '../../navbar/search/model/search.model';
import { FinalityModel } from '../../navbar/search/model/finality.model';
import { TypeModel } from '../../navbar/search/model/type.model';
import { CityModel } from '../../navbar/search/model/city.model';
import { NeighborhoodModel } from '../../navbar/search/model/neighborhood.model';
import { SearchService } from '../../navbar/search/services/search.service';
import { Options } from '@angular-slider/ngx-slider';
import { StorageEnum } from '../../shared/storage.enum';
import { ZoneModel } from '../../navbar/search/model/zone.model';
import { PropertyZoneEnum } from '../../navbar/search/enum/property-zone.enum';
import { TransactionEnum } from '../../shared/enum/transaction.enum';
import { converterParaMoeda } from '../../shared/utils/parser.utils';
import { PartnerModel } from 'src/app/shared/model/partner.model';

declare const google: any;

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  public property: PropertyDetailsModel;
  public imagesUrls: string[] = [];
  public map: any;
  public searchForm: FormGroup;
  public filters: SearchModel;
  public finalities: FinalityModel[] = [];
  public zones: ZoneModel[] = [];
  public types: TypeModel[] = [];
  public cities: CityModel[] = [];
  public neighborhoods: NeighborhoodModel[] = [];
  public minPrice: number = 10000;
  public maxPrice: number = 10000000;
  public minPriceConfig: number = 10000;
  public maxPriceConfig: number = 10000000;
  public optionsSlider: Options;
  public similarProperties: PropertyModel[] = [];
  public ruralZoneSelected = false;
  public converterParaMoeda = converterParaMoeda;
  public slideIndex = 0;
  public partners: PartnerModel[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private service: PropertyService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.generateForm();
    this.getFinalities();
    this.getZones();
    this.getTypes();
    this.getCities();
    this.getFilters();
    this.getValueRange();
    this.configureSlider();
    this.getPropertyCode();
    this.verifyMinAndMaxFilterValues();
    this.getPartners();
    window.scroll(0, 0);
  }

  public ngOnChanges(): void {
    this.verifyMinAndMaxFilterValues();
    this.ruralZoneSelected = this.searchForm?.get('zone')?.value === PropertyZoneEnum.RURAL;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngAfterViewInit(): void { }

  get urlToShareFacebook(): string {
    return `${window.location.href}`;
  }

  get urlToShareWhatsApp(): string {
    const baseUrl = "https://wa.me";
    const text = `Veja só easse imóvel que encontrei na Imobiliária 7 de Setembro: - ${window.location.href}`;
    return `${baseUrl}/?text=${text}`;
  }

  get infoToShare() {
    return {
      url: window.location.href,
      description: `Veja só easse imóvel que encontrei na Imobiliária 7 de Setembro: - ${window.location.href}`
    }
  }

  private getProperty(code: number): void {
    this.subscriptions.add(
      this.service.getProperty(code).subscribe(
        property => {
          this.property = property;
          this.getPropertyImages(code);
          this.getSimilarProperties();
          this.initMap();
        }
      )
    );
  }

  private getPropertyCode(): void {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe(
        params => this.getProperty(params.code)
      )
    );
  }

  private getPropertyImages(code: number): void {
    this.subscriptions.add(
      this.service.getPropertyImages(code).subscribe(
        urls => this.imagesUrls = urls
      )
    );
  }

  public getPropertyImage(path: string): string {
    return this.service.getPropertyImage(path);
  }

  private initMap(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 16,
        center: { lat: Number(this.property.latitude), lng: Number(this.property.longitude) },
        mapTypeId: "terrain",
      }
    );

    const cityCircle = new google.maps.Circle({
      strokeColor: "#3051A0",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#3051A0",
      fillOpacity: 0.35,
      map,
      center: { lat: Number(this.property.latitude), lng: Number(this.property.longitude) },
      radius: 150,
    });
  }

  private getFilters(): void {
    this.filters = JSON.parse(localStorage.getItem(StorageEnum.FILTERS));
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
        hectare: this.filters.neighborhood,
        code: this.filters.code,
        minPrice: this.filters.minPrice,
        maxPrice: this.filters.maxPrice
      });
    } else {
      this.searchForm = this.formBuilder.group({
        financeable: null,
        finality: 0,
        type: 0,
        city: 0,
        neighborhood: 0,
        zone: 0,
        hectare: null,
        code: null,
        minPrice: 10000,
        maxPrice: 2000000
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

  private getValueRange(): void {
    this.minPrice = this.filters?.minPrice ? this.filters.minPrice : 10000;
    this.maxPrice = this.filters?.maxPrice ? this.filters.maxPrice : 2000000;
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

  private roundValue(value: number): number {
    return Math.trunc(Math.round(value * 100) / 1000000) * 10000;
  }

  public search(): void {
    this.searchForm.get('minPrice').setValue(this.minPrice);
    this.searchForm.get('maxPrice').setValue(this.maxPrice);

    this.searchService.saveFiltersStorage(this.searchForm.getRawValue());
    this.searchService.redirectToListProperties();
  }

  private getSimilarProperties(): void {
    this.subscriptions.add(
      this.service.getProperties(this.filters).subscribe(
        properties => this.similarProperties = properties.filter(property => property.code != this.property.code)
      )
    );
  }

  public seePropertyDetails(code: number): void {
    this.router.navigateByUrl(`/detalhes-imovel/${code}`);
    window.scroll(0, 0);
  }

  public redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  public redirectToProperties(): void {
    this.router.navigateByUrl('/listando-imoveis');
  }

  public verifyMinAndMaxFilterValues(): void {
    const transactionCode = this.service.filteredTransaction ?
      this.service.filteredTransaction :
      Number(this.searchForm.get('finality').value);

    switch (transactionCode) {

      case (0 || TransactionEnum.SALE): {
        this.minPrice = 10000;
        this.maxPrice = 10000000;
        this.minPriceConfig = 10000;
        this.maxPriceConfig = 10000000;
        break;
      }

      case (TransactionEnum.RENT || TransactionEnum.SEASON): {
        this.minPrice = 0;
        this.maxPrice = 50000;
        this.minPriceConfig = 0;
        this.maxPriceConfig = 50000;
        break;
      }
    }

    this.configureSlider();
  }

  public prevSlides() {
    console.log('prevSlides');
    this.showSlides(this.slideIndex - 1);
  }

  public plusSlides() {
    console.log('plusSlides');
    this.showSlides(this.slideIndex + 1);
  }

  public showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");

    if (n >= slides.length) {
      this.slideIndex = 0;
    } else if (n < 0) {
      this.slideIndex = slides.length - 1;
    } else {
      this.slideIndex = n;
    }
  }

  public getPartners(): void {
    this.service.getPartners().subscribe(response => {
      this.partners = response;
    });
  }
}
