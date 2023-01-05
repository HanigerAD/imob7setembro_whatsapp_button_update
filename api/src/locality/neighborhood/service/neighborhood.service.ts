import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CityService } from '../../city/service/city.service';
import { NeighborhoodBuilder } from '../builder/neighborhood.builder';
import { NeighborhoodRequest } from '../integration/request/neighborhood.request';
import { NeighborhoodResponse } from '../integration/response/neighborhood.response';
import { NeighborhoodMapper } from '../mapper/neighborhood.mapper';
import { NeighborhoodRepository } from '../repository/neighborhood.repository';
import { PaginationDTO } from './../../../common/dto/pagination.dto';
import { CityResponse } from './../../city/integration/response/city.response';

@Injectable()
export class NeighborhoodService {
    constructor(
        private repository: NeighborhoodRepository,
        private cityService: CityService
    ) { }

    public insert(request: NeighborhoodRequest): Promise<number> {
        return this.repository.insert(NeighborhoodMapper.requestToEntity(request));
    }

    public getAll(pagination: PaginationDTO, res: Response): Promise<NeighborhoodResponse[]> {
        return this.repository.basicQuery()
            .then(result => { res.set('Count', result.length); return result })
            .then(result => this.repository.getAll(pagination, result))
            .then(result => NeighborhoodMapper.entityListToResponse(result));
    }

    public getSingle(code: number): Promise<NeighborhoodResponse> {
        return this.repository.getSingle(code)
            .then(result => this.buildResponse(NeighborhoodMapper.entityToResponse(result)));
    }

    public update(code: number, request: NeighborhoodRequest): Promise<number> {
        return this.repository.update(code, NeighborhoodMapper.requestToEntity(request));
    }

    public getCity(neighborhoodCode: number): Promise<CityResponse> {
        return this.cityService.getCityByNeighborhood(neighborhoodCode)
    }

    public getNeighborhoodByAddress(addressCode: number): Promise<NeighborhoodResponse> {
        return this.repository.getNeighborhoodByAddress(addressCode)
            .then(result => this.buildResponse(NeighborhoodMapper.entityToResponse(result)))
    }

    public async buildResponse(neighborhood: NeighborhoodResponse): Promise<NeighborhoodResponse> {
        const builder = new NeighborhoodBuilder();
        builder.neighborhoodData(neighborhood);
        return builder.build();
    }

    public delete(code: number): Promise<number> {
        return this.repository.delete(code);
    }
}
