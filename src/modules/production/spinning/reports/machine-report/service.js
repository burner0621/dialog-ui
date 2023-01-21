import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'machine-reports';
const machineServiceUri = "machine-spinnings";
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    getReport(sdate, edate, prodNumber, unit, processType, machineNo, machineName, materialType) {
        var endpoint = `${serviceUri}`;
        var query = '';

        if (sdate) {
            if (query === '') query = `dateFrom=${(sdate)}`;
            else query = `${query}&dateFrom=${(sdate)}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${(edate)}`;
            else query = `${query}&dateTo=${(edate)}`;
        }
        if (prodNumber) {
            if (query === '') query = `production=${prodNumber}`;
            else query = `${query}&production=${prodNumber}`;
        }
        if (unit) {
            if (query === '') query = `unitId=${unit.Id}`;
            else query = `${query}&unitId=${unit.Id}`;
        }
        if (processType) {
            if (query === '') query = `processType=${processType}`;
            else query = `${query}&processType=${processType}`;
            
        }
        if (machineNo) {
            if (query === '') query = `machineNo=${machineNo.No}`;
            else query = `${query}&machineNo=${machineNo.No}`;
            
        }
        if (machineName) {
            if (query === '') query = `machineName=${machineName.Name}`;
            else query = `${query}&machineName=${machineName.Name}`;
            
        }
        if (materialType) {
            if (query === '') query = `materialTypeId=${materialType.Id}`;
            else query = `${query}&materialTypeId=${materialType.Id}`;
            
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, prodNumber, unit, processType, machineNo, machineName, materialType) {

        var endpoint = `${serviceUri}/xls`;
        var query = '';
        if (sdate) {
            if (query === '') query = `dateFrom=${(sdate)}`;
            else query = `${query}&dateFrom=${(sdate)}`;
        }
        if (edate) {
            if (query === '') query = `dateTo=${(edate)}`;
            else query = `${query}&dateTo=${(edate)}`;
        }
        if (prodNumber) {
            if (query === '') query = `production=${prodNumber}`;
            else query = `${query}&production=${prodNumber}`;
        }
        if (unit) {
            if (query === '') query = `unitId=${unit.Id}`;
            else query = `${query}&unitId=${unit.Id}`;
        }
        if (processType) {
            if (query === '') query = `processType=${processType}`;
            else query = `${query}&processType=${processType}`;
            
        }
        if (machineNo) {
            if (query === '') query = `machineNo=${machineNo.No}`;
            else query = `${query}&machineNo=${machineNo.No}`;
            
        }
        if (machineName) {
            if (query === '') query = `machineName=${machineName.Name}`;
            else query = `${query}&machineName=${machineName.Name}`;
            
        }
        if (materialType) {
            if (query === '') query = `materialTypeId=${materialType.Id}`;
            else query = `${query}&materialTypeId=${materialType.Id}`;
            
        }
        if (query !== '')
            endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
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