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
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;

        return super.get(endpoint).then((data) => {

            if (data.ProcessType == "Mix Drawing") {
                var setItem = data.MaterialComposition.map((item) => {
                    // this.service.getLotById(item.LotId).then((lotResult) =>{
                    //     item.CottonCompositions = lotResult.CottonCompositions;
                    // });

                    return this.getLotById(item.LotId)
                        .then((lot) => {

                            item.cottonCompositions = lot.CottonCompositions;
                            return Promise.resolve(item);
                        });

                    // return Promise.resolve(item);
                });

                return Promise.all(setItem).then((setItemResult) => {
                    data.MaterialComposition = setItemResult;
                    return Promise.resolve(data);
                });
            } else {
                return this.getLotByYarnType(data.MaterialComposition[0].YarnId, data.UnitDepartment.Id, false).then(result => {
                    if (result) {
                        data.LotId = result.Id;
                        data.LotNo = result.LotNo;
                        data.regularItems = result.CottonCompositions;
                    }
                    return Promise.resolve(data);
                });
            }

        });
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

    getLotByYarnType(yarnType, unitId, finishingDrawing) {
        var endpoint = `${lotYarnServiceUri}/getLotByYarn/${yarnType}/${unitId}/${finishingDrawing}`;
        return super.get(endpoint);
    }

    getLotById(id) {
        var endpoint = `${lotYarnServiceUri}/${id}`;
        return super.get(endpoint);
    }

    // getLot(keyword, filter) {
    //     var config = Container.instance.get(Config);
    //     var endpoint = config.getEndpoint("core-azure");

    //     return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter), order: JSON.stringify({ "name": "asc" }) })
    //         .then(results => {
    //             return results.data;
    //         });
    // }

    // getYarn(yarnType) {
    //     var config = Container.instance.get(Config);
    //     var _endpoint = config.getEndpoint("core");
    //     var _serviceUri = `master/budget-currencies/by-code?code=${code}&date=${date}`;

    //     return _endpoint.find(_serviceUri)
    //         .then(result => {
    //             return result.data;
    //         });
    // }

}

export class CoreService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core-azure");
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