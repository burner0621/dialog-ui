import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
var moment = require('moment');

// const serviceUri = 'SpinningInputProduction';
const serviceUri = 'machine-inputs';
const lotYarnServiceUri = "LotYarn";
const machineServiceUri = "machine-spinnings";

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

    getByHeader(date, processType, yarnMaterialId, lotId, shift, group, unitId) {
        var newDate = moment(date).format("DD MMM YYYY")
        var endpoint = `${serviceUri}/by-header?date=${newDate}&processType=${processType}&yarnMaterialTypeId=${yarnMaterialId}&lotId=${lotId}&shift=${shift}&group=${group}&unitDepartmentId=${unitId}`;
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

    searchMachineSpinning(unitId, type) {
        var endpoint = `${machineServiceUri}/spinning-filtered?unitId=${unitId}&type=${type}`;
        return super.get(endpoint);
    }
}