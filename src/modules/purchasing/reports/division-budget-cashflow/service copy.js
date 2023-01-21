import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "budget-cashflows";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getDivision(query) {
    let endpoint = `${serviceUri}/division`;
    return super.list(endpoint, query);
  }

  getXls(query) {
    let endpoint = `${serviceUri}/division/xls?divisionId=${query.divisionId}&dueDate=${query.dueDate}`;
    return super.getXls(endpoint);
  }

  getPdf(query) {
    let endpoint = `${serviceUri}/division/pdf?divisionId=${query.divisionId}&dueDate=${query.dueDate}`;
    return super.getPdf(endpoint);
  }

  // getOACI(query) {
  //   let endpoint = `${serviceUri}/division/cash-in-operational`;
  //   return super.list(endpoint, query);
  // }

  // getOACO(query) {
  //   let endpoint = `${serviceUri}/division/cash-out-operational`;
  //   return super.list(endpoint, query);
  // }

  // getOADiff(query) {
  //   let endpoint = `${serviceUri}/division/diff-operational`;
  //   return super.list(endpoint, query);
  // }

  // getIACI(query) {
  //   let endpoint = `${serviceUri}/division/cash-in-investment`;
  //   return super.list(endpoint, query);
  // }

  // getIACO(query) {
  //   let endpoint = `${serviceUri}/division/cash-out-investment`;
  //   return super.list(endpoint, query);
  // }

  // getIADiff(query) {
  //   let endpoint = `${serviceUri}/division/diff-investment`;
  //   return super.list(endpoint, query);
  // }

  // getFACI(query) {
  //   let endpoint = `${serviceUri}/division/cash-in-financial`;
  //   return super.list(endpoint, query);
  // }

  // getFACO(query) {
  //   let endpoint = `${serviceUri}/division/cash-out-financial`;
  //   return super.list(endpoint, query);
  // }

  // getFADiff(query) {
  //   let endpoint = `${serviceUri}/division/diff-financial`;
  //   return super.list(endpoint, query);
  // }
}
