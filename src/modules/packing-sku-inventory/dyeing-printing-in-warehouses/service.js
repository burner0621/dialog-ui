import { RestService } from "../../../utils/rest-service";
const serviceUri = "input-warehouse";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getProductionOrderOutput() {
    var endpoint = `${serviceUri}/output-production-orders`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getByIdBon(id) {
    var endpoint = `${serviceUri}/bon/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.id}`;
    return super.post(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.id}`;
    return super.delete(endpoint, data);
  }

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  generateExcel(id) {
    var endpoint = `${serviceUri}/xls/${id}`;
    return super.getXls(endpoint);
  }
  generateExcelAll(info) {
    var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&type=${info.type}`;
    return super.getXls(endpoint);
  }
  reject(data) {
    var endpoint = `${serviceUri}/reject`;
    return super.post(endpoint, data);
  }

  getProductionOrderOutputv2ById(productionOrderId) {
    var endpoint = `${serviceUri}/output-production-orders-v2?productionOrderId=${productionOrderId}`;

    return super.get(endpoint);
}


  // update(data) {
  //   let endpoint = `${serviceUri}/${data.id}`;
  //   return super.put(endpoint, data);
  // }

  // delete(data) {
  //   let endpoint = `${serviceUri}/${data.id}`;
  //   return super.delete(endpoint, data);
  // }
}
