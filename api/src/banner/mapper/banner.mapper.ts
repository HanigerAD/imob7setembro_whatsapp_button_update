import {BannerEntity} from "../entity/banner.entity";
import {BannerResponse} from "../integration/response/banner.response";
import {Builder} from "builder-pattern";

export class BannerMapper {
    public static entityToResponse(entity: BannerEntity): BannerResponse {
        return Builder<BannerResponse>()
            .code(entity.codigo)
            .image(process.env.CDN_URL + `/` + entity.imagem)
            .build()
    }

    public static entityListToResponse(entities: BannerEntity[]): BannerResponse[] {
        return entities.map(entity => this.entityToResponse(entity));
    }
}
