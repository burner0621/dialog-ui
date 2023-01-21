import { RestService } from '../../../utils/rest-service';

const serviceUri = 'expenditure-good-returns';
const comodityPriceserviceUri = 'comodity-prices';
const expenditureGoodServiceUri = 'expenditure-goods';
const serviceUriFinOut = 'finishing-outs';
const finishedGoodServiceUri = 'finished-good-stocks';

class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getComodityPrice(info) {
        var endpoint = `${comodityPriceserviceUri}`;
        return super.list(endpoint, info);
    }

    getExpenditureGood(info) {
        var endpoint = `${expenditureGoodServiceUri}/complete`;
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

    searchFinishingOut(info) {
        var endpoint = `${serviceUriFinOut}`;
        return super.list(endpoint, info);
    }
    
    getFinishedGoodById(id) {
        var endpoint = `${finishedGoodServiceUri}/${id}`;
        return super.get(endpoint);
    }

}

const costCalculationServiceUri = 'cost-calculation-garments';
const serviceUriSalesContract = "merchandiser/garment-sales-contracts";
class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getCostCalculationByRONo(info) {
        var endpoint = `${costCalculationServiceUri}`;
        return super.list(endpoint, info);
    }

    getSalesContractByRONo(info) {
        var endpoint = `${serviceUriSalesContract}`;
        return super.list(endpoint, info);
    }
}


const serviceUriPR = 'garment-purchase-requests';
class PurchasingService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getGarmentPR(info) {
        var endpoint = `${serviceUriPR}`;
        return super.list(endpoint, info);
    }
}

export { Service,SalesService,PurchasingService }