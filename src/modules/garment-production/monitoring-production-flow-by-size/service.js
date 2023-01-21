
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'monitoringFlowProduction';
const unitDeliveryOrderUri = 'garment-unit-delivery-orders'
const unitExpenditureNoteUri = 'garment-unit-expenditure-notes'
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}/bySize`;
        var query = '';

        if (info.date && info.date !== "") {
            if (query === '') query = `date=${info.date}`;
            else query = `${query}&date=${info.date}`;
        }
      
        if (info.unit && info.unit !== "") {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        }
        if (info.ro && info.ro !== "") {
            if (query === '') query = `ro=${info.ro}`;
            else query = `${query}&ro=${info.ro}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/bySize?${query}`;

        return super.get(endpoint);

    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?unit=${info.unit}&date=${info.date}`;
        console.log(endpoint);
        var query = '';
        
        if (info.date && info.date !== "") {
            if (query === '') query = `date=${info.date}`;
            else query = `${query}&date=${info.date}`;
        }
      
        if (info.unit && info.unit !== "") {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        }
        if (info.ro && info.ro !== "") {
            if (query === '') query = `ro=${info.ro}`;
            else query = `${query}&ro=${info.ro}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/download?${query}`;

    return super.getXls(endpoint);
    }
}

export class PurchasingService extends RestService {

    constructor(http, aggregator, config, api){
        super(http, aggregator, config, "purchasing-azure")
    }

    getUnitDeliveryOrderById(id) {
        var endpoint = `${unitDeliveryOrderUri}/${id}`;
        return super.get(endpoint);
    }

    getUnitExpenditureNoteById(id) {
        var endpoint = `${unitExpenditureNoteUri}/${id}`;
        return super.get(endpoint);
    }
}