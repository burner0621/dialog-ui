import { RestService } from '../../../utils/rest-service';

const serviceUri = 'subcon-delivery-letter-outs';
const subconContractServiceUri = 'subcon-contracts';
const SubconCuttingOutServiceUri = 'subcon-cutting-outs';
const ServiceSubconCuttingUri='service-subcon-cuttings';
const ServiceSubconSewingUri='service-subcon-sewings';
const ServiceSubconFabricUri = 'service-subcon-fabric-washes';
const ServiceSubconShrinkageUri = 'service-subcon-shrinkage-panels';
const serviceUriSewIn = 'sewing-ins';
const serviceUriSewInByRo = 'sewing-ins/get-by-ro';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchComplete(info) {
        var endpoint = `${serviceUri}/complete`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    read(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    readSubconContractById(id) {
        var endpoint = `${subconContractServiceUri}/${id}`;
        return super.get(endpoint);
    }

    readSubconCuttingOutById(id) {
        var endpoint = `${SubconCuttingOutServiceUri}/${id}`;
        return super.get(endpoint);
    }

    readServiceSubconCuttingById(id) {
        var endpoint = `${ServiceSubconCuttingUri}/${id}`;
        return super.get(endpoint);
    }

    readServiceSubconSewingById(id) {
        var endpoint = `${ServiceSubconSewingUri}/${id}`;
        return super.get(endpoint);
    }
  
    readServiceSubconShrinkageById(id) {
        var endpoint = `${ServiceSubconShrinkageUri}/${id}`;
        return super.get(endpoint);
    }

    readServiceSubconFabricById(id) {
        var endpoint = `${ServiceSubconFabricUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/get-pdf/${id}`;
        return super.getPdf(endpoint);
    }

    generateExcel1(info) {
        var endpoint = `${serviceUri}/garment-cutting-sewing/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

    generateExcel2(info) {
        var endpoint = `${serviceUri}/garment-sewing/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

    generateExcel3(info) {
        var endpoint = `${serviceUri}/raw-material/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

    generateExcel4(info) {
        var endpoint = `${serviceUri}/service-component/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

    generateExcel5(info) {
        var endpoint = `${serviceUri}/service-garment-wash/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

    searchItem(info) {
        var endpoint = `${serviceUri}/item`;
        return super.list(endpoint, info);
    }
    searchSewingIn(info) {
        var endpoint = `${serviceUriSewIn}`;
        return super.list(endpoint, info);
    }
}
const garmentEPOServiceUri = 'garment-external-purchase-orders/by-ro';
const unitDeliveryOrderUri = 'garment-unit-delivery-orders';
const garmentUENServiceUri = 'garment-unit-expenditure-notes';
const serviceUriPR = 'garment-purchase-requests';

class PurchasingService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getGarmentEPO(info) {
        var endpoint = `${garmentEPOServiceUri}`;
        return super.list(endpoint, info);
    }
    getUnitDeliveryOrderById(id) {
        var endpoint = `${unitDeliveryOrderUri}/${id}`;
        return super.get(endpoint);
    }
    getUENById(id) {
        var endpoint = `${garmentUENServiceUri}/${id}`;
        return super.get(endpoint);
    }
    getGarmentPR(info) {
        var endpoint = `${serviceUriPR}`;
        return super.list(endpoint, info);
    } 
    
}
const uomServiceUri = 'master/uoms';
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getUom(info) {
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }
}


export { Service,PurchasingService, CoreService}