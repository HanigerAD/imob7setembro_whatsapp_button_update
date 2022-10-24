
import { Builder } from 'builder-pattern';

import { SearchModel } from '../../../navbar/search/model/search.model';

export class FeaturedPropertiesMapper {

  public static mapFilterFeaturedProperties(): SearchModel {
    return Builder<SearchModel>()
      .page(1)
      .perPage(6)
      .featured(true)
      .build();
  }

}
