import { Catch, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { TransactionEnum } from '../../../common/enum/transaction.enum';
import { CategoryEntity } from '../../category/entity/category.entity';
import { ConservationStateEntity } from '../../conservation-state/entity/conservation-state.entity';
import { ProfileEntity } from '../../profile/entity/profile.entity';
import { TransactionEntity } from '../../transaction/entity/transaction.entity';
import { ZoneEntity } from '../../zone/entity/zone.entity';
import { PropertyDetailEntity } from '../entity/property-detail.entity';
import { PropertyImageEntity } from '../entity/property-image.entity';
import { PropertyEntity } from '../entity/property.entity';
import { AgentEntity } from './../../../agent/entity/agent.entity';
import { PropertyFilterEntity } from './../entity/property-filter.entity';
import { ImageSortRequest } from "../integration/request/image-sort.request";
import { PropertyDocumentEntity } from "../entity/property-document.entity";
import {log} from "util";
import {LogEntity} from "../entity/log.entity";
import {LogResponse} from "../integration/response/log.response";
import {SituationEntity} from "../../../user/entity/situation.entity";
import { RepositoryException } from "src/common/exceptions/repository-exception";

@Injectable()
export class PropertyRepository {
    constructor(
        @InjectKnex() private readonly knex: Knex
    ) {
    }

    public insertProperty(entity: PropertyDetailEntity): Promise<number> {
        return this.knex
            .insert(entity)
            .into('imovel');
    }

    public basicQuery(filter: PropertyFilterEntity): Promise<any> {
        const neighborhood = filter.bairro;
        const price = filter.preco;

        delete filter.bairro;
        delete filter.paginacao;
        delete filter.preco;

        let query = this.knex
            .select('codigo')
            .from('imovel')
            .where(filter)
            .whereBetween('valor', [price.minPrice, price.maxPrice])
            .pluck('codigo');

        if (neighborhood?.length > 0) {
            query = query.whereIn('bairro', neighborhood);
        }
        return query;
    }

    public getById(code: number): Promise<ProfileEntity> {
        return this.knex
            .select(
                'codigo_interno',
                'titulo',
                'imovel.codigo',
                'valor',
                'dormitorio',
                'vaga',
                'area_total as areaTotal',
                'bairro.descricao as bairro',
                'municipio.descricao as municipio',
                'transacao_imovel.descricao as transacao',
                'transacao_imovel.codigo as transacao_codigo',
                'foto_imovel.foto as foto',
                'unidade_federativa.descricao as unidadeFederativa',
                'zona_imovel.descricao as zona',
                'categoria_imovel.descricao as categoria',
                'imovel.financiavel as financiavel'
            )
            .from('imovel')
            .joinRaw('JOIN categoria_imovel ON imovel.categoria = categoria_imovel.codigo')
            .joinRaw('JOIN zona_imovel ON imovel.zona = zona_imovel.codigo')
            .joinRaw('JOIN bairro ON imovel.bairro = bairro.codigo')
            .joinRaw('JOIN municipio on imovel.municipio = municipio.codigo')
            .joinRaw('JOIN unidade_federativa ON municipio.unidade_federativa = unidade_federativa.codigo')
            .joinRaw('JOIN transacao_imovel ON imovel.transacao = transacao_imovel.codigo')
            .joinRaw('JOIN foto_imovel ON imovel.codigo = foto_imovel.imovel')
            .where('codigo_interno', code)
            .first();
    }

    public getAll(filters: PropertyFilterEntity): Promise<PropertyEntity[]> {
        const since = (filters?.paginacao?.pagina - 1) * filters?.paginacao?.porPagina;
        const perPage = filters?.paginacao?.porPagina;

        return this.knex
            .select(
                'codigo_interno',
                'titulo',
                'imovel.codigo',
                'valor',
                'dormitorio',
                'vaga',
                'area_total as areaTotal',
                'hectare',
                'bairro.descricao as bairro',
                'municipio.descricao as municipio',
                'transacao_imovel.descricao as transacao',
                'transacao_imovel.codigo as transacao_codigo',
                'foto_imovel.foto as foto',
                'unidade_federativa.descricao as unidadeFederativa',
                'zona_imovel.descricao as zona',
                'categoria_imovel.descricao as categoria',
                'imovel.financiavel as financiavel'
            )
            .from('imovel')
            .joinRaw('JOIN categoria_imovel ON imovel.categoria = categoria_imovel.codigo')
            .joinRaw('JOIN zona_imovel ON imovel.zona = zona_imovel.codigo')
            .joinRaw('JOIN bairro ON imovel.bairro = bairro.codigo')
            .joinRaw('JOIN municipio on imovel.municipio = municipio.codigo')
            .joinRaw('JOIN unidade_federativa ON municipio.unidade_federativa = unidade_federativa.codigo')
            .joinRaw('JOIN transacao_imovel ON imovel.transacao = transacao_imovel.codigo')
            .joinRaw('JOIN foto_imovel ON imovel.codigo = foto_imovel.imovel AND foto_imovel.ordem = 1')
            .modify(queryBuilder => {
                Object.keys(filters).forEach(filter => {
                    if (filters[filter]) {
                        if (filter != 'paginacao' && filter != 'preco' && filters[filter] && filter != 'transacao'
                            && filter != 'categoria' && filter != 'hectare') {
                            queryBuilder.where(`imovel.${filter}`, '=', filters[filter]);
                        }

                        if (filter == 'preco') {
                            queryBuilder.whereBetween('valor', [ filters[filter].minPrice, filters[filter].maxPrice ])
                        }

                        if (filter == 'transacao') {
                            queryBuilder.where('transacao_imovel.codigo', '=', filters[filter]);
                        }

                        if (filter == 'hectare') {

                            if (Number(filters[filter]) == 1) {
                                queryBuilder.where('hectare', '<', 100);
                            } else if (Number(filters[filter]) == 2) {
                                queryBuilder.where('hectare', '>=', 100);
                            }
                        }

                        if (filter == 'categoria') {
                            if (filters[filter].toUpperCase() == 'RURAL') {
                                queryBuilder.whereIn('categoria_imovel.codigo', [9,10,11]);
                            }
                        }

                        if (filter == 'zona') {
                            queryBuilder.where('zona_imovel.codigo', '=', filters[filter])
                        }

                        if (filter == 'exibir') {
                            queryBuilder.where('exibir', '=', filters[filter]);
                        }
                    }
                });
            })
            .offset(since)
            .limit(perPage)
            .orderBy('imovel.codigo', 'DESC');
    }

    public getAllQuery(filter: PropertyFilterEntity): Promise<PropertyDetailEntity[]> {
        return this.knex
            .select('codigo')
            .from('imovel')
            .where(filter);
    }

    public getSingle(code: number): Promise<PropertyDetailEntity> {
        return this.knex
            .select()
            .from('imovel')
            .where('codigo', '=', code)
            .first();
    }

    public update(code: number, entity: PropertyDetailEntity): Promise<number> {
        return this.knex
            .update(entity)
            .from('imovel')
            .where('codigo', '=', code);
    }

    public getAgent(code: number): Promise<AgentEntity> {
        return this.knex
            .select('agenciador.*')
            .from('imovel')
            .joinRaw('JOIN agenciador ON agenciador.codigo = imovel.agenciador')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getCategory(code: number): Promise<CategoryEntity> {
        return this.knex
            .select('categoria_imovel.*')
            .from('imovel')
            .joinRaw('JOIN categoria_imovel ON categoria_imovel.codigo = imovel.categoria')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getConservationState(code: number): Promise<ConservationStateEntity> {
        return this.knex
            .select('estado_conservacao.*')
            .from('imovel')
            .joinRaw('JOIN estado_conservacao ON estado_conservacao.codigo = imovel.estado_conservacao')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getprofile(code: number): Promise<ProfileEntity> {
        return this.knex
            .select('perfil_imovel.*')
            .from('imovel')
            .joinRaw('JOIN perfil_imovel ON perfil_imovel.codigo = imovel.perfil')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getZone(code: number): Promise<ZoneEntity> {
        return this.knex
            .select('zona_imovel.*')
            .from('imovel')
            .joinRaw('JOIN zona_imovel ON zona_imovel.codigo = imovel.zona')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getType(code: number): Promise<ZoneEntity> {
        return this.knex
            .select('tipo_imovel.*')
            .from('imovel')
            .joinRaw('JOIN tipo_imovel ON tipo_imovel.codigo = imovel.tipo')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getSituation(code: number): Promise<SituationEntity> {
        return this.knex
            .select('situacao.*')
            .from('imovel')
            .joinRaw('JOIN situacao ON situacao.codigo = imovel.situacao')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public getTransaction(code: number): Promise<TransactionEntity> {
        return this.knex
            .select('transacao_imovel.*')
            .from('imovel')
            .joinRaw('JOIN transacao_imovel ON transacao_imovel.codigo = imovel.transacao')
            .where('imovel.codigo', '=', code)
            .first();
    }

    public counterProperties(): Promise<number> {
        return this.knex
            .select()
            .from('imovel')
            .count('* as registers')
    }

    public getPropertyImage(code: number): Promise<PropertyImageEntity[]> {
        return this.knex
            .select('foto')
            .from('foto_imovel')
            .where('imovel', '=', code)
            .orderBy('ordem', 'asc');
    }

    public getPropertyImagesUrls(code: number): Promise<PropertyImageEntity[]> {
        return this.knex
            .select('foto')
            .from('foto_imovel')
            .where('imovel', '=', code)
            .orderBy('ordem', 'asc');
    }

    public getPropertyDocuments(code: number): Promise<PropertyDocumentEntity[]> {
        return this.knex
            .select('*')
            .from('documento_imovel')
            .where('imovel', '=', code);
    }

    public insertPropertyImages(file: string, i: number, code: number): Promise<number[]> {
        return this.knex
            .insert({ foto: file, ordem: i + 1, imovel: code })
            .from('foto_imovel')
    }

    public insertPropertyImage(file: string, i: number, code: number): Promise<number> {
        return this.knex
            .insert({ foto: file, ordem: i, imovel: code })
            .from('foto_imovel');
    }

    public deleteImage(path: string): Promise<number> {
        return this.knex
            .delete()
            .from('foto_imovel')
            .where('foto', path);
    }

    public deleteDocuments(path: string): Promise<number> {
        return this.knex
            .delete()
            .from('documento_imovel')
            .where('documento', path);
    }

    public getPropertyImages(propertyCode: number): Promise<PropertyImageEntity[]> {
        return this.knex
            .select(
                'foto',
                'ordem'
            )
            .from('foto_imovel')
            .where('imovel', '=', propertyCode)
    }

    public insertPropertyDocument(filename: string, originalName: string, propertyCode: number): Promise<number> {
        return this.knex
              .insert({ imovel: propertyCode, documento: filename, nome_arquivo: originalName })
              .into('documento_imovel');
    }

    public rentPropertyCounter(): Promise<number> {
        return this.knex
            .select()
            .from('imovel')
            .where('transacao', '=', TransactionEnum.RENT)
            .count('* as registers')
    }

    public sellPropertyCounter(): Promise<number> {
        return this.knex
            .select()
            .from('imovel')
            .where('transacao', '=', TransactionEnum.SELL)
            .count('* as registers')
    }

    public updateImagesSort(imageSort: ImageSortRequest): Promise<number> {
        return this.knex
            .update('ordem', imageSort.index)
            .from('foto_imovel')
            .where('foto', imageSort.path);
    }

    public insertLog(logEntity: LogEntity): Promise<number> {
        return this.knex
            .insert({
                data: logEntity.data,
                tipo_log: logEntity.tipo_log,
                nome_campo: logEntity.nome_campo,
                informacao_antiga: logEntity.informacao_antiga,
                nova_informacao: logEntity.nova_informacao,
                codigo_agenciador: logEntity.codigo_agenciador,
                codigo_imovel: logEntity.codigo_imovel
            })
            .into('log');
    }

    public getLogs(propertyCode: number): Promise<LogEntity[]> {
        return this.knex
            .select('log.*', 'usuario.nome as nome_agenciador')
            .from('log')
            .joinRaw('JOIN usuario ON usuario.codigo = log.codigo_agenciador')
            .where('codigo_imovel', Number(propertyCode))
            .orderBy('codigo', 'DESC');
    }

    public getValueLog(table: string, code: number): Promise<any> {

        if (table === 'agenciador') {
            return this.knex
                .select('nome')
                .from(table)
                .where('codigo', code);
        }

        return this.knex
            .select('descricao')
            .from(table)
            .where('codigo', code);
    }

}
