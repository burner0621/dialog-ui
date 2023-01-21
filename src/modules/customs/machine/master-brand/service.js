import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'machine';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "customs-report");
    }

    search(info) {
        var endpoint = `${serviceUri}/brand`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}/brand`;
        return super.post(endpoint, data);
    }

    // getById(id) {
    //     var endpoint = `${serviceUri}/brand/${id}`;
    //     return super.get(endpoint);
    //   }
    
    // update(data) {
    //     var endpoint = `${serviceUri}/${data.Id}`;
    //     return super.put(endpoint, data);
    // }

}

export { Service }