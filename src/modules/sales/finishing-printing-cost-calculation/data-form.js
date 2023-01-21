import { Router } from "aurelia-router";
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { ServiceEffeciency } from './service-efficiency';
import { RateService } from './service-rate';
import { Service, ProductionService } from './service';

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
var SalesContractLoader = require('../../../loader/finishing-printing-pre-sales-contract-loader');
var InstructionLoader = require('../../../loader/instruction-loader');
var ProductLoader = require('../../../loader/product-null-tags-loader');
var UomLoader = require('../../../loader/uom-loader');
var MaterialLoader = require("../../../loader/product-loader");
var AccountLoader = require('../../../loader/account-loader');

@inject(Router, BindingEngine, ServiceEffeciency, RateService, Element, Service, ProductionService)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable disabled = "true";
  @bindable data = {};
  @bindable error = {};
  @bindable selectedSalesContract;
  @bindable selectedInstruction;
  @bindable selectedGreige;
  @bindable selectedUOM;
  @bindable selectedMaterial;
  @bindable selectedSales;
  @bindable date;
  @bindable directLaborWage;
  @bindable indirectLaborWage;
  @bindable orderQuantity;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  directLaborData = {};
  length0 = {
    label: {
      align: "left"
    }
  }
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  }
  length6 = {
    label: {
      align: "left",
      length: 6
    }
  }
  length8 = {
    label: {
      align: "left",
      length: 8
    }
  }
  materialQuery = {
    "Tags": "MATERIAL"
  }
  preSCQuery = {
    "IsPosted": true
  }
  machines = {
    columns: [
      { header: "Proses", value: "Process" },
      { header: "Mesin", value: "Machine" },
      { header: "Biaya Chemical", value: "Chemical" },
      { header: "Biaya Utility", value: "Utility" },
      { header: "Biaya Depresiasi", value: "Depretiation" },
      { header: "Total", value: "Total" },
    ]
  }
  machineOptions = {};
  constructor(router, bindingEngine, serviceEffeciency, rateService, element, service, productionService) {
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.efficiencyService = serviceEffeciency;
    this.rateService = rateService;
    this.element = element;
    this.service = service;
    this.productionService = productionService;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.machineOptions.readOnly = this.readOnly;

    if (this.data.PreSalesContract && this.data.PreSalesContract.Id) {
      this.selectedSalesContract = this.data.PreSalesContract

    }

    if (this.data.Material && this.data.Material.Id) {
      this.selectedMaterial = this.data.Material;
    }

    if (this.data.Instruction && this.data.Instruction.Id) {
      this.selectedInstruction = this.data.Instruction;
    }

    if (this.data.UOM && this.data.UOM.Id) {
      this.selectedUOM = this.data.UOM;
    }

    if (this.data.Sales) {
      this.selectedSales = this.data.Sales;
    }

    if (this.data.Greige && this.data.Greige.Id) {
      this.selectedGreige = this.data.Greige;
    }

    if (this.data.Date) {
      this.date = this.data.Date;
    }

    this.imageSrc = this.data.ImageFile = this.isEdit || this.isCopy ? (this.data.ImageFile || "#") : "#";
  }

  get materialLoader() {
    return MaterialLoader;
  }

  get productLoader() {
    return ProductLoader;
  }

  get instructionLoader() {
    return InstructionLoader;
  }

  get salesContractLoader() {
    return SalesContractLoader;
  }

  get uomLoader() {
    return UomLoader;
  }

  get accountLoader() {
    return AccountLoader;
  }

  salesText = (data) => {
    return `${data.profile.firstname} - ${data.profile.lastname}`
  }


  @bindable imageUpload;
  @bindable imageSrc;
  imageUploadChanged(newValue) {
    let imageInput = document.getElementById('imageInput');
    let reader = new FileReader();
    reader.onload = event => {
      let base64Image = event.target.result;
      this.imageSrc = this.data.ImageFile = base64Image;
    }
    reader.readAsDataURL(imageInput.files[0]);
  }

  async dateChanged(n, o) {
    if (this.date) {

      this.data.Date = this.date;
      var directLaborDate = new Date(this.data.Date);
      this.directLaborData = await this.productionService.getDirectLaborCost(directLaborDate.getMonth() + 1, directLaborDate.getFullYear());
      this.directLaborWage = this.directLaborData.WageTotal;
    } else {
      this.directLaborWage = 0;
    }
  }

  selectedSalesContractChanged(newValue, oldValue) {
    if (newValue) {
      this.data.PreSalesContract = this.selectedSalesContract;
      this.data.Unit = this.selectedSalesContract.Unit.Name;
      this.data.Buyer = this.selectedSalesContract.Buyer.Name;
      this.orderQuantity = this.selectedSalesContract.OrderQuantity;
      console.log(this.orderQuantity)
    }
    else {
      this.data = {};
    }
  }

  selectedUOMChanged(newValue, oldValue) {
    if (newValue) {
      this.data.UOMUnit = this.selectedUOM.Unit;
      this.data.UOMId = this.selectedUOM.Id;
      this.data.UOM = this.selectedUOM;
    }
  }

  selectedMaterialChanged(n, o) {
    if (this.selectedMaterial) {
      this.data.Material = this.selectedMaterial;
    }
  }

  selectedSalesChanged(n, o) {
    if (this.selectedSales) {
      this.data.Sales = this.selectedSales;
    }
  }

  selectedInstructionChanged(newValue, oldValue) {
    if (newValue) {
      if (!this.data.Id) {
        this.data.Machines = this.selectedInstruction.Steps.map((step) => { return { "Step": step }; });
        console.log(this.data.Machines);
      }

      this.data.InstructionId = this.selectedInstruction.Id;
      this.data.InstructionName = this.selectedInstruction.Name;
      this.data.Instruction = this.selectedInstruction;
    } else {
      this.data.Machines = [];
      this.data.InstructionId = 0;
      this.data.InstructionName = "";
    }
  }

  selectedGreigeChanged(newValue, oldValue) {
    if (newValue) {
      this.data.GreigeId = newValue.Id;
      this.data.GreigeName = newValue.Name;
      this.data.Greige = this.selectedGreige;
    } else {
      this.data.GreigeId = 0;
    }

  }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || 0) != 0;
  }

  @computedFrom("data.Unit")
  get isPrinting() {
    return (this.data.Unit && this.data.Unit.toUpperCase() == "PRINTING");
  }

  @computedFrom("error.Machines")
  get hasError() {
    return (this.error.Machines ? this.error.Machines.length : 0) > 0;
  }

}
