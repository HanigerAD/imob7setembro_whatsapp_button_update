import {Controller, Get, Param} from "@nestjs/common";
import { CityResponse } from "src/locality/city/integration/response/city.response";
import {FederativeUnitResponse} from "../integration/response/federative-unit.response";
import {FederativeUnitService} from "../service/federative-unit.service";

@Controller('locality/uf')
export class FederativeUnitController {
    constructor(
        private service: FederativeUnitService
    ) {
    }

    @Get()
    public getAll(): Promise<FederativeUnitResponse[]> {
        return this.service.getAll();
    }

    @Get(':code')
    public getSingle(@Param('code') code: number): Promise<FederativeUnitResponse> {
        return this.service.getSingle(code);
    }

    @Get(':code/cities')
    public getCities(@Param('code') code: number): Promise<CityResponse[]> {
        return this.service.getCities(code);
    }
}
