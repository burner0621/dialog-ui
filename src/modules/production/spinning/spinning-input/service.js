import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
var moment = require('moment');

const serviceUri = 'SpinningInputProduction';
const lotYarnServiceUri = "LotYarn"

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}/create`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getLotYarn(info) {
        var spinning = info.spinning ? info.spinning : " ";
        var machine = info.machine ? info.machine : " ";
        var yarn = info.yarn ? info.yarn : " ";
        var endpoint = `${lotYarnServiceUri}/${spinning}/${machine}/${yarn}`;

        return super.get(endpoint);
    }

}