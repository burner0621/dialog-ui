import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
var moment = require('moment');

const serviceUri = "machine-outputs";
const machineServiceUri = "machine-spinnings";
const countUri = "count-configurations";

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
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
        let endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getByHeader(date, processType, yarnMaterialId, lotId, shift, group, unitId) {
        var newDate = moment(date).format("DD MMM YYYY")
        var endpoint = `${serviceUri}/by-header?date=${newDate}&processType=${processType}&yarnMaterialTypeId=${yarnMaterialId}&lotId=${lotId}&shift=${shift}&group=${group}&unitDepartmentId=${unitId}`;
        return super.get(endpoint);
    }

    getCountByProcessAndYarn(processType, yarnId, unitId){
        var endpoint = `${countUri}/by-process-yarn?processType=${processType}&yarnId=${yarnId}&unitId=${unitId}`;
        return super.get(endpoint);
    }

    getCountById(id){
        var endpoint = `${countUri}/${id}`;
        return super.get(endpoint)
            .then(result => {
                return result;
            })
            .catch(err =>{
                return {};
            });
    }

    validateLotInCount(lotId, processType){
        var endpoint = `${countUri}/validate-lot?lotId=${lotId}&processType=${processType}`;
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
