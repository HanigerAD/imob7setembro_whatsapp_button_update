import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './homepage/homepage.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './services/app.service';
import { AppRestService } from './services/app-rest.service';
import { SearchComponent } from './navbar/search/search.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SearchService } from './navbar/search/services/search.service';
import { SearchRestService } from './navbar/search/services/search-rest.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarService } from './navbar/navbar.service';
import { ListPropertiesComponent } from './property/list-properties/list-properties.component';
import { PropertyService } from './property/services/property.service';
import { PropertyRestService } from './property/services/property-rest.service';
import { ViewPropertyComponent } from './property/view-property/view-property.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsService } from './about-us/service/about-us.service';
import { ContactsComponent } from './contacts/contacts.component';
import { NewsComponent } from './news/news.component';
import { NewsService } from './news/service/news.service';
import { NewsRestService } from './news/service/news-rest.service';
import { ViewPostComponent } from './news/view-post/view-post.component';
import { PartnersComponent } from './partners/partners.component';
import { SellYourPropertyComponent } from './sell-your-property/sell-your-property.component';
import { LoadingComponent } from './loading/loading.component';
import { SellYourPropertyService } from './sell-your-property/service/sell-your-property.service';
import { SellYourPropertyRestService } from './sell-your-property/service/sell-your-property-rest.service';
import { AlertService } from './shared/services/alert.service';
import { NgxMaskModule } from 'ngx-mask';
import { ContactsService } from './contacts/service/contacts/contacts.service';
import { ContactsRestService } from './contacts/service/contacts/contacts-rest.service';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { SharedModule } from './shared/shared.module';
import { AgentRestService } from './about-us/service/agent-rest.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ListPropertiesComponent,
    ViewPropertyComponent,
    FooterComponent,
    AboutUsComponent,
    ContactsComponent,
    NewsComponent,
    ViewPostComponent,
    PartnersComponent,
    SellYourPropertyComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageModule,
    HttpClientModule,
    NgxSliderModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot(),
    ShareButtonsModule,
    ShareIconsModule,
    SharedModule
  ],
  providers: [
    AppService,
    AppRestService,
    SearchService,
    SearchRestService,
    NavbarService,
    PropertyService,
    PropertyRestService,
    AboutUsService,
    AgentRestService,
    NewsService,
    NewsRestService,
    SellYourPropertyService,
    SellYourPropertyRestService,
    AlertService,
    ContactsService,
    ContactsRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
