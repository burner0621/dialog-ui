import { RestService } from '../../../utils/rest-service';

const serviceUri = 'scrap-classifications';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
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

}


const resource = 'master/garment-comodities';
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }
    getGarmentComodity(info) {
        var endpoint = `${resource}`;
        return super.list(endpoint, info);
    }
}

export { Service,CoreService }