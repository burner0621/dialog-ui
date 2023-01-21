import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'garment-delivery-orders/monitoring';
const deliveryOrderServiceUri = 'garment-delivery-orders/loader';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchDeliveryOrder(info) {
        var endpoint = `${deliveryOrderServiceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getXls(info) {
        var endpoint = `${serviceUri}/download?no=${info.no}&poEksNo=${info.poEksNo}&supplierId=${info.supplierId}&billno=${info.billno}&paymentbill=${info.paymentbill}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}
