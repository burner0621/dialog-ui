import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'purchasing-disposition-verification';
const serviceUriExpedition = 'purchasing-disposition-expeditions';
const serviceUriUnitPaymenOrder = 'unit-payment-orders';
const serviceUriPurchasingDisposition = 'purchasing-dispositions';
const serviceUriPurchaseRequest = 'purchase-requests/by-user';
const serviceUriPR = 'purchase-orders/monitoring';
const serviceUriPaymentDisposition = 'payment-disposition-note';
const serviceUriDispositionByEPO = 'purchasing-dispositions/disposition';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        var endpoint = `${serviceUriExpedition}`;
        return super.list(endpoint, info);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    getById(id) {
        var endpoint = `${serviceUriExpedition}/${id}`;
        return super.get(endpoint);
    }

    searchPaymentDispo(epoId) {
        var endpoint = `${serviceUriPaymentDisposition}/byEpoId/${epoId}`;
        return super.get(endpoint);
    }
}

class PurchasingDispositionService extends RestService{
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    search(info) {
        var endpoint = `${serviceUriPurchasingDisposition}`;
        return super.list(endpoint, info);
    }
    searchByEPO(info) {
        var endpoint = `${serviceUriDispositionByEPO}`;
        return super.list(endpoint, info);
    }
}

class MongoService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing');
    }

    searchByCode(info) {
        var endpoint = `${serviceUriUnitPaymenOrder}`;
        return super.list(endpoint, info);
    }


    search(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo, state,budgetId) {
        var endpoint = `${serviceUriPR}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}&budgetId=${budgetId}`;
        return super.get(endpoint);
    }

    generateExcel(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo, state,budgetId) {
        var endpoint = `${serviceUriPR}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}&budgetId=${budgetId}`;
        return super.getXls(endpoint);
    }

    searchPrByCode(info) {
        var endpoint = `${serviceUriPurchaseRequest}`;
        return super.list(endpoint, info);
    }

}

export {
    Service,
    MongoService,
    PurchasingDispositionService
};


