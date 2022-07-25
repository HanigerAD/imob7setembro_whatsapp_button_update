import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageService } from '../shared/services/homepage.service';
import { HomepageRestService } from '../shared/services/homepage-rest.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxSliderModule} from '@angular-slider/ngx-slider';



@NgModule({
    declarations: [
        HomepageComponent
    ],
    exports: [
        HomepageComponent
    ],
    imports: [
        CommonModule,
        NgxSliderModule
    ],
    providers: [
        HomepageService,
        HomepageRestService
    ]
})
export class HomepageModule { }
