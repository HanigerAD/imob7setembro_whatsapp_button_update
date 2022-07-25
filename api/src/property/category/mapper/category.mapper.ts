import { CategoryResponse } from './../integration/response/category.response';
import { CategoryEntity } from '../entity/category.entity';
import { Builder } from "builder-pattern";

export class CategoryMapper {
    public static entityToResponse(entity: CategoryEntity): CategoryResponse {
        return Builder<CategoryResponse>()
            .code(entity.codigo)
            .description(entity.descricao)
            .build();
    }

    public static entityListToResponse(entities: CategoryEntity[]): CategoryResponse[] {
        return entities.map(entity => this.entityToResponse(entity));
    }
}
