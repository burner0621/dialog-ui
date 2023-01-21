import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import moment from 'moment';

const serviceUri = 'garment-external-purchase-orders';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
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

    post(data) {
        var endpoint = 'garment-external-purchase-orders/post';
        return super.post(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    searchByTags(keyword, category, shipmentDateFrom, shipmentDateTo) {
        var endpoint = 'garment-internal-purchase-orders/by-tags';
        var filter = {};
        if (keyword && shipmentDateFrom && shipmentDateTo) {
            filter = {
                category: category,
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
                tags: keyword
            };
            return super.list(endpoint, filter);
        }
        else if (keyword) {
            filter = {
                category: category,
                tags: keyword
            };
            return super.list(endpoint, filter);
        } else if (shipmentDateFrom && shipmentDateTo) {
            filter = {
                category: category,
                shipmentDateFrom: moment(shipmentDateFrom).format("YYYY-MM-DD"),
                shipmentDateTo: moment(shipmentDateTo).format("YYYY-MM-DD"),
            };
            return super.list(endpoint, filter);
        } else {
            filter = { category: category };
            return super.list(endpoint,filter);
        }
    }

    getListUsedBudget(purchaseRequestNo, purchaseRequestRefNo, productCode, purchaseOrderExternalNo) {
        var endpoint = 'purchase-orders/externals/get-budget';
        var filter = {};
        if (purchaseOrderExternalNo) {
            filter = {
                purchaseRequestNo: purchaseRequestNo,
                purchaseRequestRefNo: purchaseRequestRefNo,
                productCode: productCode,
                purchaseOrderExternalNo: purchaseOrderExternalNo
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
        else {
            filter = {
                purchaseRequestNo: purchaseRequestNo,
                purchaseRequestRefNo: purchaseRequestRefNo,
                productCode: productCode
            };
            return super.list(endpoint, { filter: JSON.stringify(filter) });
        }
    }

    getPRById(id, select) {
        var endpoint = `purchase-requests/${id}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    cancel(id) {
        var endpoint = `garment-external-purchase-orders/cancel/${id}`;
        return super.put(endpoint);
    }

    unpost(id) {
        var endpoint = `${serviceUri}/unpost/${id}`;
        return super.put(endpoint);
    }

    close(id) {
        var endpoint = `garment-external-purchase-orders/close/${id}`;
        return super.put(endpoint);
    }

    getPoId(id) {
        var endpoint = `garment-internal-purchase-orders/${id}`;
        //"productionOrder.orderNo","productionOrder.orderType.name", "productionOrder.material", "productionOrder.materialConstruction", "productionOrder.materialWidth"
        //var info = { select: select };
        return super.get(endpoint);
    }

    getKurs(code, date) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/budget-currencies/by-code?code=${code}&date=${date}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getDefaultVat(info){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/vat`;
        return _endpoint.find(_serviceUri, info)
        .then(result => {
            return result.data;
        })
    }

    SmallUom(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/garmentProducts/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getUENById(id) {
        var endpoint = `garment-unit-expenditure-notes/${id}`;
        return super.get(endpoint);
    }
}

export class ServiceFinance extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  getVbWithPO(id){
    var endpoint = `vb-request-documents/purchasing/${id}`;
    return super.get(endpoint);
  }
}
