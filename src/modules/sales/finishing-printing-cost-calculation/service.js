import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

// const serviceUri = 'cost-calculation-fp';
const costCalculationServiceUri = 'sales/finishing-printing-cost-calculations';
// const serviceUri = "rates";
// const serviceUri = "efficiencies";
const directLaborUri = 'master/direct-labor-cost'


export class ProductionService extends RestService{
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "production-azure");
    }

    getDirectLaborCost(month, year){

        var endpoint = `${directLaborUri}/cost-calculation?month=${month}&year=${year}`;
        return super.get(endpoint);
    }
}

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    postCC(data) {
        var endpoint = `${costCalculationServiceUri}/post`;
        return super.put(endpoint, data);
    }

    search(info) {
        var endpoint = `${costCalculationServiceUri}`;
        return super.list(endpoint, info);
    }

    create(data) {
        var endpoint = `${costCalculationServiceUri}`;
        console.log(data);
        return super.post(endpoint, data);
    }

    getById(id) {
        var endpoint = `${costCalculationServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getByCode(code) {
        var endpoint = `${costCalculationServiceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    update(data) {
        var endpoint = `${costCalculationServiceUri}/${data.Id}`;
        console.log(data);
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${costCalculationServiceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${costCalculationServiceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getBudgetById(id) {
        var endpoint = `${costCalculationServiceUri}/budget/${id}`;
        return super.getPdf(endpoint);
    }

    getBuyerBrand(keyword, filter) {
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");

        const resource = 'master/garment-buyer-brands/byName';
        return endpoint.find(resource, { keyword: keyword, filter: filter })
            .then(results => {
                return results.data;
            });
    }

};


