import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUriPurchaseRequest = 'generating-data/purchase-request';
const serviceUriPurchaseOrderExternal = 'generating-data/purchase-order-external';
const serviceUriUnitReceiptNote = 'generating-data/unit-receipt-note';
const serviceUriUnitPaymentOrder = 'generating-data/unit-payment-order';
const serviceUriPaymentCorrectionNote = 'generating-data/unit-payment-correction-note';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    generatePurchaseRequest(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriPurchaseRequest}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriPurchaseRequest}`;
        }
        return super.getXls(endpoint);
    }

    generatePurchaseOrderExternal(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriPurchaseOrderExternal}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriPurchaseOrderExternal}`;
        }
        return super.getXls(endpoint);
    }

    generateUnitReceiptNote(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriUnitReceiptNote}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriUnitReceiptNote}`;
        }
        return super.getXls(endpoint);
    }

    generateUnitPaymentOrder(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriUnitPaymentOrder}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriUnitPaymentOrder}`;
        }
        return super.getXls(endpoint);
    }

    generatePaymentCorrectionNote(dateFrom, dateTo) {
        var endpoint;
        if (dateFrom && dateTo) {
            endpoint = `${serviceUriPaymentCorrectionNote}/download?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        } else {
            endpoint = `${serviceUriPaymentCorrectionNote}`;
        }
        return super.getXls(endpoint);
    }

    exportData(dateFrom, dateTo) {
        return new Promise((resolve, reject) => {
            var tasks = [];
 //           tasks.push(this.generatePurchaseRequest(dateFrom, dateTo));
 //           tasks.push(this.generatePurchaseOrderExternal(dateFrom, dateTo));
            tasks.push(this.generateUnitReceiptNote(dateFrom, dateTo));
            tasks.push(this.generateUnitPaymentOrder(dateFrom, dateTo));
            tasks.push(this.generatePaymentCorrectionNote(dateFrom, dateTo));

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
