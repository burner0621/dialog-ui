import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'garment-disposition-expeditions';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        if(data.Role == "VERIFICATION")
         endpoint+="/verification-accepted";
        else if(data.Role == "CASHIER")
         endpoint+="/cashier-accepted";
        else if(data.Role=="RETUR")
         endpoint+="/purchasing-accepted";
        else
         console.log("Cannot View Role");
        
        return super.put(endpoint, data.Items);
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
