import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-return-correction-notes';
const deliveryOrderServiceUri = 'garment-delivery-orders/correction-note-quantity';
const purchaseOrderExternalServiceUri = 'purchase-orders/externals/by-user';
const doServiceUri = 'garment-delivery-orders';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
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

    getDOById(id) {
        var endpoint = `${doServiceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfReturnNotePph(id) {
        var endpoint = `${serviceUri}/return-note-pph/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfReturnNotePpn(id) {
        var endpoint = `${serviceUri}/return-note-ppn/${id}`;
        return super.getPdf(endpoint);
    }

    getdeliveryOrderById(id) {
        var endpoint = `${deliveryOrderServiceUri}/${id}`;
        return super.get(endpoint);
    }
}
