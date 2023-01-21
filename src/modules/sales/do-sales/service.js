import { RestService } from "../../../utils/rest-service";

const serviceUri = "sales/do-sales";
const salesContractDyeingPrintingServiceUri = "sales/finishing-printing-sales-contracts";
const salesContractSpinningServiceUri = "sales/spinning-sales-contracts";
const salesContractWeavingServiceUri = "sales/weaving-sales-contracts";
const productionOrderServiceUri = "sales/production-orders";
const buyerServiceUri = "master/buyers";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
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
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getDOSalesPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  searchSalesContractDyeingPrinting(info) {
    var endpoint = `${salesContractDyeingPrintingServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesContractDyeingPrintingById(id, select) {
    var endpoint = `${salesContractDyeingPrintingServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchSalesContractSpinning(info) {
    var endpoint = `${salesContractSpinningServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesContractSpinningById(id, select) {
    var endpoint = `${salesContractSpinningServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchSalesContractWeaving(info) {
    var endpoint = `${salesContractWeavingServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesContractWeavingById(id, select) {
    var endpoint = `${salesContractWeavingServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  getProductionOrderBySalesContractId(salesContractId) {
    var endpoint = `${productionOrderServiceUri}/filter-by-sales-contract/${salesContractId}`;
    return super.list(endpoint);
  }
}

export class ServiceCore extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "core");
  }

  searchBuyer(info) {
    var endpoint = `${buyerServiceUri}`;
    return super.list(endpoint, info);
  }

  getBuyerById(id, select) {
    var endpoint = `${buyerServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}
