
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "cost-calculation-garments";
// const costCalculationGarmentServiceUri = "cost-calculation-garments";

class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUri}/ro-available`;
        return super.list(endpoint, info);
    }

    getCostCalculationGarment(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    availabled(data){
        var endpoint = `${serviceUri}/available`;
        return super.post(endpoint, data);
    }
}

// const servicePurchaseRequestUri = 'garment-purchase-requests';

// class PurchaseRequestService extends RestService {
//     constructor(http, aggregator, config) {
//         super(http, aggregator, config, "purchasing-azure");
//     }

//     getProducts(info) {
//         var endpoint = `${servicePurchaseRequestUri}/dynamic`;
//         return super.list(endpoint, info);
//     }
// }

export { Service }