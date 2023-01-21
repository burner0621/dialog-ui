import { inject, Lazy, computedFrom } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service, ProductionService } from "./service";
import { Dialog } from "../../../au-components/dialog/dialog";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");
const US = "US$. ";
const RP = "Rp. ";

@inject(Router, Service, Dialog, ProductionService)
export class View {
  title = "Detail Cost Calculation Export Finishing Printing";
  readOnly = true;
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  };
  length6 = {
    label: {
      align: "left",
      length: 6
    }
  };
  length7 = {
    label: {
      align: "left",
      length: 7
    }
  };
  machines = {
    columns: [
      { header: "Proses", value: "Process" },
      { header: "Mesin", value: "Machine" },
      { header: "Biaya Chemical", value: "Chemical" },
      { header: "Biaya Utility", value: "Utility" },
      { header: "Biaya Depresiasi", value: "Depretiation" },
      { header: "Total", value: "Total" },
    ]
  };

  constructor(router, service, dialog, productionService) {
    this.router = router;
    this.service = service;
    this.dialog = dialog;
    this.productionService = productionService;
  }

  get isDollar() {
    if (this.data.CurrencyRate) {
      return this.data.CurrencyRate !== 0;
    }
    else {
      return false;
    }

  }

  async activate(params) {
    var id = params.id;
    this.data = await this.service.getById(id);
    // this.data.OrderQuantity = this.formatNumber(this.data.PreSalesContract.OrderQuantity, 2);
    this.data.OrderQuantity = this.data.PreSalesContract.OrderQuantity;
    this.data.ManufacturingServiceCost = this.formatNumber(this.data.ManufacturingServiceCost, 2);
    this.data.HelperMaterial = this.formatNumber(this.data.HelperMaterial, 2);
    this.data.MiscMaterial = this.formatNumber(this.data.MiscMaterial, 2);
    this.data.Lubricant = this.formatNumber(this.data.Lubricant, 2);
    this.data.SparePart = this.formatNumber(this.data.SparePart, 2);
    this.data.StructureMaintenance = this.formatNumber(this.data.StructureMaintenance, 2);
    this.data.MachineMaintenance = this.formatNumber(this.data.MachineMaintenance, 2);
    this.data.ConfirmPrice = this.formatNumber(this.data.ConfirmPrice, 2);
    this.isPosted = this.data.IsPosted;
    this.salesText = `${this.data.Sales.profile.firstname} - ${this.data.Sales.profile.lastname}`;
    var totalDetailAll = 0;
    for (var item of this.data.Machines) {
      var itemChemical = 0;
      if (item.Chemicals.length > 0) {
        itemChemical = item.Chemicals.reduce((previousValue, currentValue) => {
          var res = previousValue + (currentValue.Chemical.Price * currentValue.ChemicalQuantity)

          return res;
        }, 0);
        var itemUtility = item.Machine.Electric + item.Machine.Steam + item.Machine.Water + item.Machine.Solar + item.Machine.LPG;
        var totalDetail = itemChemical + itemUtility + item.Depretiation;
        totalDetailAll += totalDetail;
      }
      this.totalMachinesAndGreige = totalDetailAll + this.data.ActualPrice;

    }

    var directLaborDate = new Date(this.data.Date);
    this.directLaborData = await this.productionService.getDirectLaborCost(directLaborDate.getMonth() + 1, directLaborDate.getFullYear());
    this.directLaborWage = this.directLaborData.WageTotal;
    this.indirectLaborWage = 0;
    this.subTotal = this.directLaborWage + this.indirectLaborWage + this.data.GeneralAdministrationCost + this.data.DirectorOfficeCost + this.data.BankMiscCost;

    this.totalConfirmPrice = this.totalMachinesAndGreige + this.subTotal;
    this.finalConfirmPrice = this.totalConfirmPrice + this.data.FreightCost + this.data.Embalase;
  }
  async bind(context) {
    this.context = context;
  }

  printPdf() {
    this.service.getPdfById(this.data.Id);
  }

  printBudget() {
    this.service.getBudgetById(this.data.Id);
  }

  copyCC() {
    this.router.navigateToRoute("copy", { id: this.data.Id });
  }

  list() {
    this.router.navigateToRoute("list");
  }

  edit(data) {
    this.router.navigateToRoute('edit', { id: this.data.Id });
  }

  delete() {
    this.service
      .delete(this.data)
      .then(result => {
        this.list();
      })
      .catch(e => {
        this.dialog.alert(e, "Hapus Cost Calculation");
      });
  }

  formatNumber(input, decimalPlaces) {
    return (input).toFixed(decimalPlaces).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
  }

  @computedFrom("data.PreSalesContract.Unit.Name")
  get isPrinting() {
    return (this.data.PreSalesContract.Unit.Name && this.data.PreSalesContract.Unit.Name.toUpperCase() == "PRINTING");
  }
}
