import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUriPurchaseOrderExternal = 'generating-data/purchase-order-external';
const serviceUriDeliveryOrder = 'generating-data/delivery-order';
const serviceUriCustoms = 'generating-data/customs';
const serviceUriUnitPaymentOrder = 'generating-data/intern-note';
const serviceUriInvoice = 'generating-data/invoice';
const serviceUriPaymentCorrectionNote = 'generating-data/correction-note';
const serviceUriQuantityCorrectionNote = 'generating-data/quantity-correction-note';
const serviceUriUnitReceiptNote = 'generating-data/unit-receipt-note';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    generatePurchaseOrderExternal(dateFrom, dateTo) {
        var endpoint = `${serviceUriPurchaseOrderExternal}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriPurchaseOrderExternal}?${query}`;
        return super.getXls(endpoint);
    }

    generateDeliveryOrder(dateFrom, dateTo) {
        var endpoint = `${serviceUriDeliveryOrder}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriDeliveryOrder}?${query}`;
        return super.getXls(endpoint);
    }

    generateCustoms(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriCustoms}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriCustoms}`;
        }
        return super.getXls(endpoint);
    }

    generateInvoice(dateFrom, dateTo) {
        var endpoint = `${serviceUriInvoice}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriInvoice}?${query}`;
        return super.getXls(endpoint);
    }

    generateUnitPaymentOrder(dateFrom, dateTo) {
        var endpoint = `${serviceUriUnitPaymentOrder}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriUnitPaymentOrder}?${query}`;
        return super.getXls(endpoint);
    }

    generatePaymentCorrectionNote(dateFrom, dateTo) {
        var endpoint = `${serviceUriPaymentCorrectionNote}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriPaymentCorrectionNote}?${query}`;
        return super.getXls(endpoint);
    }

    generateQuantityCorrectionNote(dateFrom, dateTo) {
        var endpoint = `${serviceUriQuantityCorrectionNote}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriQuantityCorrectionNote}?${query}`;
        return super.getXls(endpoint);
    }

generateUnitReceiptNote(dateFrom, dateTo) {
        var endpoint = `${serviceUriUnitReceiptNote}`;
        var query = '';
        if (dateFrom) {
            if (query == '') query = `dateFrom=${dateFrom}`;
            else query = `${query}&dateFrom=${dateFrom}`;
        }
        if (dateTo) {
            if (query == '') query = `dateTo=${dateTo}`;
            else query = `${query}&dateTo=${dateTo}`;
        }
          
        if (query != '')
            endpoint = `${serviceUriUnitReceiptNote}?${query}`;
        return super.getXls(endpoint);
    }

    exportData(dateFrom, dateTo) {
        return new Promise((resolve, reject) => {
            var tasks = [];
            tasks.push(this.generatePurchaseOrderExternal(dateFrom, dateTo));
            tasks.push(this.generateDeliveryOrder(dateFrom, dateTo));
            tasks.push(this.generateCustoms(dateFrom, dateTo));
            tasks.push(this.generateInvoice(dateFrom, dateTo));
            tasks.push(this.generateUnitPaymentOrder(dateFrom, dateTo));
            tasks.push(this.generatePaymentCorrectionNote(dateFrom, dateTo));
            tasks.push(this.generateQuantityCorrectionNote(dateFrom, dateTo));
            tasks.push(this.generateUnitReceiptNote(dateFrom, dateTo));
         
            Promise.all(tasks)
                .then(result => {
                    resolve(true);
                })
                .catch(e => {
                    reject(e);
                })
        });
    }
}
