import { RestService } from '../../../utils/rest-service';
const serviceUri = 'stock-warehouse';
const avalServiceUri = 'aval-stock-report';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    searchPacking(info) {
        var endpoint = `${serviceUri}/packing`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {

        var endpoint = `${serviceUri}/xls`;
        var query = '';
        // if (info.dateFrom) {
        //     if (query === '') query = `dateFrom=${info.dateFrom}`;
        //     else query = `${query}&dateFrom=${info.dateFrom}`;
        // }
        // if (info.dateTo) {
        //     if (query === '') query = `dateTo=${info.dateTo}`;
        //     else query = `${query}&dateTo=${info.dateTo}`;
        // }
        if (info.dateReport) {
            if (query === '') query = `dateReport=${info.dateReport}`;
            else query = `${query}&dateReport=${info.dateReport}`;
        }
        if (info.zona) {
            if (query === '') query = `zona=${info.zona}`;
            else query = `${query}&zona=${info.zona}`;
        }
        if (info.unit) {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        }
        if (info.inventoryType) {
            if (query === '') query = `inventoryType=${info.inventoryType}`;
            else query = `${query}&inventoryType=${info.inventoryType}`;
        }
        if (info.packingType) {
            if (query === '') query = `packingType=${info.packingType}`;
            else query = `${query}&packingType=${info.packingType}`;
        }
        if (info.construction) {
            if (query === '') query = `construction=${info.construction}`;
            else query = `${query}&construction=${info.construction}`;
        }
        if (info.buyer) {
            if (query === '') query = `buyer=${info.buyer}`;
            else query = `${query}&buyer=${info.buyer}`;
        }
        if (info.productionOrderId) {
            if (query === '') query = `productionOrderId=${info.productionOrderId}`;
            else query = `${query}&productionOrderId=${info.productionOrderId}`;
        }
        
        if (query !== '')
            endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
    }

    searchAval(info) {
        var endpoint = `${avalServiceUri}`;
        return super.list(endpoint, info);
    }

    generateExcelAval(date) {
        var endpoint = `${avalServiceUri}/xls?searchDate=${date}`;

        return super.getXls(endpoint);
    }
}