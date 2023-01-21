import { RestService } from "../../../utils/rest-service";

const serviceUri = "sales/sales-invoices-export";
const buyerServiceUri = "master/buyers";
const currencyServiceUri = "master/currencies";
const unitServiceUri = "master/units";
const uomServiceUri = "master/uoms";
const bonSpinningUri = "/v1/material-delivery-note";
const bonWeavingUri = "material-delivery-note-weaving";
const bonDyeingPrintingUri = "output-shipping";

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

  getSalesInvoiceExportValasPdfById(id) {
    var endpoint = `${serviceUri}/sales-invoice-export-valas-pdf/${id}`;
    return super.getPdf(endpoint);
  }

  getSalesInvoiceExportIDRPdfById(id) {
    var endpoint = `${serviceUri}/sales-invoice-export-idr-pdf/${id}`;
    return super.getPdf(endpoint);
  }
}

export class ServicePackingInventory extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "packing-inventory");
  }

  searchBonSpinning(info) {
    var endpoint = `${bonSpinningUri}`;
    return super.list(endpoint, info);
  }

  getBonSpinningById(id, select) {
    var endpoint = `${bonSpinningUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchBonWeaving(info) {
    var endpoint = `${bonWeavingUri}`;
    return super.list(endpoint, info);
  }

  getBonWeavingById(id, select) {
    var endpoint = `${bonWeavingUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchBonDyeingPrinting(info) {
    var endpoint = `${bonDyeingPrintingUri}`;
    return super.list(endpoint, info);
  }

  getBonDyeingPrintingById(id, select) {
    var endpoint = `${bonDyeingPrintingUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
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

  searchCurrency(info) {
    var endpoint = `${currencyServiceUri}`;
    return super.list(endpoint, info);
  }

  getCurrencyById(id, select) {
    var endpoint = `${currencyServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
  getUnitById(id, select) {
    var endpoint = `${unitServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchUom(info) {
    var endpoint = `${uomServiceUri}`;
    return super.list(endpoint, info);
  }

  getUomById(id, select) {
    var endpoint = `${uomServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}
