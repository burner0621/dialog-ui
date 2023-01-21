import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'machine';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "customs-report");
    }

    search(info) {
        var endpoint = `${serviceUri}/mutation`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/mutation/${id}`;
        return super.get(endpoint);
      }
    
    update(data) {
        var endpoint = `${serviceUri}/mutation/${data.TransactionID}`;
        return super.put(endpoint, data);
    }

    createIN(data) {
        var endpoint = `${serviceUri}/machinesmutation`;
        return super.post(endpoint, data);
    }

    createOut(data) {
        var endpoint = `${serviceUri}/machinesmutation/out`;
        return super.post(endpoint, data);
    }

}

export { Service }