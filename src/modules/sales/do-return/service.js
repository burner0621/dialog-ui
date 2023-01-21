import { RestService } from "../../../utils/rest-service";

const serviceUri = "sales/do-return";
const salesInvoiceServiceUri = "sales/sales-invoices";
const shippingOutServiceUri = "output-shipping";
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

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  searchSalesInvoice(info) {
    var endpoint = `${salesInvoiceServiceUri}`;
    return super.list(endpoint, info);
  }

  getSalesInvoiceById(id, select) {
    var endpoint = `${salesInvoiceServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}

export class ServicePackingInventory extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  searchOutputShipping(info) {
    var endpoint = `${shippingOutServiceUri}`;
    return super.list(endpoint, info);
  }

  getByShippingOutputId(id) {
    var endpoint = `${shippingOutServiceUri}/${id}`;
    return super.get(endpoint);
  }

  salesLoaderOutputShipping(info) {
    var endpoint = `${shippingOutServiceUri}/sales-loader`;
    return super.list(endpoint, info);
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
