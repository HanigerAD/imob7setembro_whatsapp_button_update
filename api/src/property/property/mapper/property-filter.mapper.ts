import { PaginationEntity } from './../entity/pagination.entity';
import { PriceFilterEntity } from './../entity/price-filter.entity';
import { PropertyFilterEntity } from './../entity/property-filter.entity';

import { PropertyFilterRequest } from '../integration/request/property-filter.request';
import { Builder } from 'builder-pattern';

export class PropertyFilterMapper {
    public static requestToEntity(request: PropertyFilterRequest): PropertyFilterEntity {
        return Builder<PropertyFilterEntity>()
            .codigo_interno(request?.internalCode)
            .transacao(request?.finality ? Number(request?.finality) : null)
            .bairro(this.validateNeighborhoods(request.neighborhood))
            .hectare(request?.hectare)
            .zona(request?.zone)
            .codigo(request?.code)
            .municipio(request?.city)
            .tipo(request?.type)
            .paginacao(this.generatePaginationFilter(request))
            .preco(this.generatePriceFilter(request))
            .financiavel(request.financeable ? 1 : 0)
            .exibir(request?.showSite ? request.showSite : 0)
            .categoria(request.category)
            .zona(request.zone)
            .dormitorio(request?.bedroom)
            .vaga(request?.parkingVacancy)
            .banheiro(request?.bathroom)
            .build();
    }

    public static validateNeighborhoods(neighborhoods: any): any {
        if (neighborhoods?.length == 1) {
            return Array.of(neighborhoods);
        } else if (neighborhoods?.length > 1) {
            return neighborhoods;
        }
    }

    public static generatePriceFilter(filter: PropertyFilterRequest): PriceFilterEntity {
        return Builder<PriceFilterEntity>()
            .minPrice(filter.minPrice ? Number(filter.minPrice) : 0)
            .maxPrice(filter.maxPrice ? Number(filter.maxPrice) : 10000000)
            .build();
    }

    public static generatePaginationFilter(filter: PropertyFilterRequest): PaginationEntity {
        return Builder<PaginationEntity>()
            .pagina(filter.page ?? 1)
            .porPagina(filter.perPage ?? 1000000)
            .build();
    }
}
