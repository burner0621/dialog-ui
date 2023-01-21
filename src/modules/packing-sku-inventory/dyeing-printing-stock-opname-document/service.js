import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "stock-opname-warehouse";
const uomServiceUri = 'master/uoms';

 class Service extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    
    getProductionOrderOutput(bonId) {
        var endpoint = `${serviceUri}/stock-opname-production-orders/${bonId}`;
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

        var endpoint = `${serviceUri}/xls-document/${id}`;
        return super.getXls(endpoint);
    }

    // searchViewScan(info){

    //     console.log(info);
    //     var endpoint = `${serviceUri}/monitoring?productionOrderId=${info.produtionOrderId}&documentNo=${info.documentNo}&grade=${info.grade}`;
    //     console.log(endpoint);
    //     return super.list(endpoint);
    // }

    searchViewScan(info) {
        console.log(info);
        let endpoint = `${serviceUri}/monitoring`;
        return super.list(endpoint, info);
        
    }

    // generateExcelMonitoring(info) {
    //     //var endpoint = `${serviceUri}/monitoring/download?productionOrderId=${info.productionOrderId}&barcode=${info.barcode}&documentNo=${info.documentNo}&grade=${info.grade}&userFilter=${info.userFilter}`;
    //     var endpoint = `${serviceUri}/monitoring/download`;
    //     console.log(endpoint);
        

    //     return super.getXls(endpoint, info);
    // }

    generateExcelMonitoring(info){
        //var endpoint = `${serviceUri}/download?productionOrderId=${info.productionOrderId}&barcode=${info.barcode}&documentNo=${info.documentNo}&grade=${info.grade}&userFilter=${info.userFilter}`;
        var endpoint = `${serviceUri}/monitoring/download`;
        //console.log(endpoint);

        console.log(info);
        var query = '';
        
        if (info.productionOrderId) {
            if (query === '') query = `productionOrderId=${info.productionOrderId}`;
            else query = `${query}&productionOrderId=${info.unit}`;
        }
        if (info.barcode) {
            if (query === '') query = `barcode=${info.barcode}`;
            else query = `${query}&barcode=${info.barcode}`;
        }
        if (info.documentNo) {
            if (query === '') query = `documentNo=${info.documentNo}`;
            else query = `${query}&documentNo=${info.documentNo}`;
        }

        if (info.grade) {
            if (query === '') query = `grade=${info.grade}`;
            else query = `${query}&grade=${info.grade}`;
        }

        if (info.userFilter) {
            if (query === '') query = `userFilter=${info.userFilter}`;
            else query = `${query}&userFilter=${info.userFilter}`;
        }

        if (query !== '')
        endpoint = `${serviceUri}/monitoring/download?${query}`;

    return super.getXls(endpoint);
    }
 


}

class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getUom(info) {
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }

    
}

export {Service, CoreService}
