import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = 'count-configurations';
const lotYarnServiceUri = "lot/configuration";

const machineServiceUri = "machine-spinnings";
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        console.log(info)
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;

        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
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

    getLotByYarnType(yarnType, unitId) {
        var endpoint = `${lotYarnServiceUri}/getLotByYarn/${yarnType}/${unitId}`;
        return super.get(endpoint);
    }

    getLotById(id) {
        var endpoint = `${lotYarnServiceUri}/${id}`;
        return super.get(endpoint);
    }

    
}

export class CoreService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getMachineTypes() {
        var endpoint = `${machineServiceUri}/machine/types`;
        return super.list(endpoint);
    }

    searchMachineSpinning(info) {
        var endpoint = `${machineServiceUri}`;
        return super.list(endpoint, info);
    }
}