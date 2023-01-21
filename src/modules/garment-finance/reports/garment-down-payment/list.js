import { inject, bindable } from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";

@inject(Service)
export class List {
  purchasingCategoryOptions = ["", "Bahan Baku", "Bahan Embalage", "Bahan Pendukung"];
  supplierQuery = { Import: false };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
    pagination: false,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.categories = [];
    this.currencies = [];
  }

  loader = (info) => {

  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  excel() {

  }

  reset() {
    this.flag = false;
    this.info.purchasingCategory = null;
    this.info.startDate = null;
    this.info.endDate = null;
    this.error = {};
    this.tableList.refresh();
    this.selectedBillNo = null;
    this.selectedPaymentBill = null;
    this.currencies = [];
    this.categories = [];
  }

}
