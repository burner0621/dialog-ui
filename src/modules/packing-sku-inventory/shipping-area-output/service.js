import { RestService } from '../../../utils/rest-service';
const serviceUri = 'output-shipping';
const serviceUri2 = 'output-shipping2222';
const ccServiceUri = 'sales/finishing-printing-cost-calculations';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getByIdBon(id) {
        var endpoint = `${serviceUri}/bon/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        console.log(data);
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        console.log(data);
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id, type) {
        var endpoint = `${serviceUri}/pdf/${id}/${type}`;
        return super.getPdf(endpoint);
    }

    getPdfPackingListSalesById(id) {
        var endpoint = `${serviceUri}/pdf/packinglist/${id}`;
        return super.getPdf(endpoint);
    }

    generateExcel(id) {
        var endpoint = `${serviceUri}/xls/${id}`;
        return super.getXls(endpoint);
    }

    getProductionOrderFromInput(id){
        var endpoint = `${serviceUri}/input-production-orders/${id}`;

        return super.get(endpoint);
    }

    generateExcelAll(info) {
        var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&type=${info.type}`;
        return super.getXls(endpoint);
    }

    getProductionOrderInput() {
        var endpoint = `${serviceUri}/input-production-orders/production-order`;

        return super.get(endpoint);
    }

    getProductionOrderInputById(productionOrderId) {
        var endpoint = `${serviceUri}/input-production-orders/production-order?productionOrderId=${productionOrderId}`;

        return super.get(endpoint);
    }
}