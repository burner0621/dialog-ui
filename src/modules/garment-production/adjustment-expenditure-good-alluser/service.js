import { RestService } from '../../../utils/rest-service';

const serviceUri = 'adjustments';
const serviceUriFinIn = 'finished-good-stocks';
const comodityPriceserviceUri = 'comodity-prices';
const servicePR='garment-purchase-requests';
const remainingQtyUri='finished-good-stocks';
class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getComodityPrice(info) {
        var endpoint = `${comodityPriceserviceUri}`;
        return super.list(endpoint, info);
    }

    searchFinishedGoodStock(info) {
        var endpoint = `${serviceUriFinIn}`;
        return super.list(endpoint, info);
    }

    searchFinishedGoodStockComplete(info) {
        var endpoint = `${serviceUriFinIn}/complete`;
        return super.list(endpoint, info);
    }

   

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
    searchRemaining(id) {
        var endpoint = `${remainingQtyUri}/${id}`;
       return super.get(endpoint);
    }
    getGarmentProductsDistinctDescription(keyword, filter) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");

        const resource = 'master/garmentProducts/distinct-product-description';

        return endpoint.find(resource, { keyword: keyword, filter: filter })
            .then(results => {
                return results.data;
            });
    }
}

class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getBuyerCode(info) {
        var endpoint = `${servicePR}`;
        return super.list(endpoint, info);
    }
}
export { Service,PurchasingService }