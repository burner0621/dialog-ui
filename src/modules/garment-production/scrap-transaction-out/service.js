import { RestService } from '../../../utils/rest-service';

const serviceUri = 'scrap-transactions';
const getServiceUri = 'scrap-transactions/out';
const uomServiceUri = 'master/uoms';
const serviceStockUri = 'scrap-stocks';
const remainingQtyUri='scrap-stocks/remainingQty';
class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${getServiceUri}`;
        return super.list(endpoint, info);
        
    }
    

    searchStock(info) {
        var endpoint = `${serviceStockUri}`;
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
    searchRemaining(info) {
        var endpoint = `${remainingQtyUri}`;
        return super.list(endpoint, info);
    }
    
}


class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getUom(info) {
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }
}
export { Service,CoreService }