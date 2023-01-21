import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'garment-delivery-orders/deliveryReport';
const serviceUriDetail = 'garment-delivery-orders/deliveryReportDetail';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&productCode=${info.productCode}&paymentType=${info.paymentType}&paymentMethod=${info.paymentMethod}`;
        return super.get(endpoint);
    }

    getDetail(info) {
        var endpoint = `${serviceUriDetail}?supplier=${info.supplierCode}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&productCode=${info.productCode}&paymentType=${info.paymentType}&paymentMethod=${info.paymentMethod}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&productCode=${info.productCode}&paymentType=${info.paymentType}&paymentMethod=${info.paymentMethod}`;
        return super.getXls(endpoint);
    }

    generateExcel2(info) {
        var endpoint = `${serviceUriDetail}/download?supplier=${info.supplierCode}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&productCode=${info.productCode}&paymentType=${info.paymentType}&paymentMethod=${info.paymentMethod}`;
        return super.getXls(endpoint);
    }
}
