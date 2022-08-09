import { FederativeUnitResponse } from './../../../../locality/federative-unit/integration/response/federative-unit.response';
import { NeighborhoodResponse } from './../../../../locality/neighborhood/integration/response/neighborhood.response';
import { CityResponse } from './../../../../locality/city/integration/response/city.response';
import { TransactionResponse } from './../../../transaction/integration/response/transaction.response';
import { FinalityResponse } from './../../../finality/integration/response/finality.response';
import { SituationResponse } from './../../../../user/integration/response/situation.response';
import { AgentResponse } from './../../../../agent/integration/response/agent.response';
import { ZoneResponse } from './../../../zone/integration/response/zone.response';
import { ProfileResponse } from './../../../profile/integration/response/profile.response';
import { ConservationStateResponse } from './../../../conservation-state/integration/response/conservation-state.response';
import { TypeResponse } from './../../../type/integration/response/type.response';
import { CategoryResponse } from './../../../category/integration/response/category.response';

export class PropertyDetailResponse {
    public code?: number;//ok
    public internalCode?: number;//ok
    public title?: string;//ok
    public price?: string;//ok
    public dormitory?: number;//ok
    public unitAvailable?: number;//ok
    public bathroom?: number;//ok
    public parkingVacancy?: number;//ok
    public privativeArea?: string;//ok
    public totalArea?: string;//ok
    public pavement?: number;
    public financeable?: boolean;
    public description?: string;//ok
    public privateInfo?: string;
    public show?: boolean;
    public reserved?: boolean;
    public reserveDate?: string;
    public hectare?: number;
    public constuctionYear?: number;
    public featured?: boolean;
    public superFeatured?: boolean;
    public suite?: number;//ok
    public rented?: boolean;
    public condominiumPrice?: string;
    public showValue?: boolean;
    public city?: CityResponse;
    public neighborhood?: NeighborhoodResponse;
    public zipCode?: string;
    public street?: string;
    public number?: string;
    public complement?: string;
    public latitude?: string;
    public longitude?: string;
    public mainPhoto: string;
    public category?: CategoryResponse;//ok
    public type?: TypeResponse;
    public conservationState?: ConservationStateResponse;//ok
    public profile?: ProfileResponse;
    public zone?: ZoneResponse;
    public agent?: AgentResponse;//ok
    public situation?: SituationResponse;
    public finality?: FinalityResponse;
    public transaction?: TransactionResponse;
    public federativeUnit?: FederativeUnitResponse;
}
