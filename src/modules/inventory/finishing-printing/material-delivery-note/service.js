import { RestService } from '../../../../utils/rest-service';

const serviceUri = "material-delivery-note";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        let endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        let endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }
}
