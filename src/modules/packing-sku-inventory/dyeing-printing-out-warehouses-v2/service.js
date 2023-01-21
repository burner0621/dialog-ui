import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "output-warehouse";

export class Service extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getProductionOrderInput() {
        var endpoint = `${serviceUri}/input-production-orders`;
        return super.get(endpoint);
    }

    getProductionOrderInputById(productionOrderId) {
        var endpoint = `${serviceUri}/input-production-orders-v2?productionOrderId=${productionOrderId}`;

        return super.get(endpoint);
    }

    getProductionOrderInputv2(bonId) {
        var endpoint = `${serviceUri}/input-production-orders-v2/${bonId}`;
        return super.get(endpoint);
    }
    getProductionOrderInputv2() {
        var endpoint = `${serviceUri}/input-production-orders-v2`;
        return super.get(endpoint);
    }

    getProductionOrderInputv2ById(productionOrderId) {
        var endpoint = `${serviceUri}/input-production-orders-v2?productionOrderId=${productionOrderId}`;

        return super.get(endpoint);
    }

    getProductionOrderOutput(bonId) {
        var endpoint = `${serviceUri}/output-production-orders/${bonId}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        console.log(data);
        return super.post(endpoint, data);
        
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    generateExcel(id) {

        var endpoint = `${serviceUri}/xls/${id}`;
        return super.getXls(endpoint);
    }
    generateExcelAll(info) {
        var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

    //   getPdfById(id) {
    //       var endpoint = `${serviceUri}/pdf/${id}`;
    //       return super.getPdf(endpoint);
    //   }

    // update(data) {
    //   let endpoint = `${serviceUri}/${data.id}`;
    //   return super.put(endpoint, data);
    // }

    // delete(data) {
    //   let endpoint = `${serviceUri}/${data.id}`;
    //   return super.delete(endpoint, data);
    // }
}
