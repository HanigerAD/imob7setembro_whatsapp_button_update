import {PropertyTypeEnum} from '../enum/property-type.enum';

export class SearchModel {
    public city: number;
    public code: number;
    public finality: number;
    public hectare: number;
    public maxPrice: number;
    public minPrice: number;
    public neighborhood: number;
    public financeable: boolean;
    public featured: boolean;
    public zone: number;
    public showSite: number;
    public type: PropertyTypeEnum;
    public page: number;
    public perPage: number;
}
