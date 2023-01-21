import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'purchasing-disposition-acceptance';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getDisposition(id){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("purchasing-azure");
        const resource = `purchasing-dispositions/${id}`;
        return _endpoint.find(resource)
            .then(result => {
                console.log(result)
                return result.data;
            });
    }
}
