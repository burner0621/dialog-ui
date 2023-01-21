import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "sales-receipts";
const salesInvoiceServiceUri = "sales/sales-invoices";
const bankServiceUri = "master/account-banks";
const buyerServiceUri = "master/buyers";
const unitServiceUri = "master/units";
const currencyServiceUri = "master/currencies";
const memoserviceUri = "memos";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
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

  getSalesReceiptPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}

export class ServiceSales extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "sales");
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

  getSalesInvoiceByBuyerId(buyerId) {
    var endpoint = `${salesInvoiceServiceUri}/filter-by-buyer/${buyerId}`;
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

  searchCurrency(info) {
    var endpoint = `${currencyServiceUri}`;
    return super.list(endpoint, info);
  }

  getCurrencyById(id, select) {
    var endpoint = `${currencyServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchBank(info) {
    var endpoint = `${bankServiceUri}`;
    return super.list(endpoint, info);
  }

  getBankById(id, select) {
    var endpoint = `${bankServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }

  searchUnit(info) {
    var endpoint = `${unitServiceUri}`;
    return super.list(endpoint, info);
  }

  getUnitById(id, select) {
    var endpoint = `${unitServiceUri}/${id}`;
    var info = { select: select };
    return super.get(endpoint, null, info);
  }
}

export class ServiceMemo extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  getById(id) {
    let endpoint = `${memoserviceUri}/${id}`;
    return super.get(endpoint);
  }

  getBySalesInvoice(salesinvoice) {
    let endpoint = `${memoserviceUri}/by-salesinvoiceno/${salesinvoice}`;
    return super.get(endpoint);
  }

}
