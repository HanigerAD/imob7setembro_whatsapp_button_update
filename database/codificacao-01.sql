/* remover vinculo de imovel com municipio */
alter table imovel drop foreign key FK_municipio_imovel;
/* remover coluna municipio de imovel */
alter table imovel drop column municipio;