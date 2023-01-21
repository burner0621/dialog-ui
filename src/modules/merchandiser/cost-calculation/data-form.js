import { Router } from "aurelia-router";
import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework';
import { ServiceEffeciency } from './service-efficiency';
import { RateService } from './service-rate';
import { ServiceCore } from './service-core';
import moment from 'moment';

import numeral from 'numeral';
numeral.defaultFormat("0,0.00");
const rateNumberFormat = "0,0.000";
var PreSalesContractLoader = require('../../../loader/garment-pre-sales-contracts-loader');
var BookingOrderLoader = require('../../../loader/garment-booking-order-by-no-for-ccg-loader');
var GarmentMarketingLoader = require('../../../loader/garment-marketings-loader');
var SizeRangeLoader = require('../../../loader/size-range-loader');
var ComodityLoader = require('../../../loader/garment-comodities-loader');
var UOMLoader = require('../../../loader/uom-loader');
var UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, BindingEngine, ServiceEffeciency, RateService, Element, ServiceCore)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable disabled = "true";
  @bindable OLCheck;
  @bindable OTL1Check;
  @bindable OTL2Check;
  @bindable OTL3Check;
  @bindable Quantity;
  @bindable data = {};
  @bindable error = {};
  @bindable SelectedRounding;
  @bindable isCopy = false;
  
  leadTimeList = ["", "25 hari", "40 hari"];
 
  defaultRate = { Id: 0, Value: 0, CalculatedValue: 0 };
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


  costCalculationGarment_MaterialsInfo = {
    columns: [
      { header: "No." },
      { header: "PR Master" },
      { header: "No. PO" },
      { header: "Kategori", value: "Category" },
      { header: "Kode Barang", value: "ProductCode" },
      { header: "Komposisi", value: "Composition" },
      { header: "Konstruksi", value: "Construction" },
      { header: "Yarn", value: "Yarn" },
      { header: "Width", value: "Width" },
      { header: "Deskripsi", value: "Description" },
      { header: "Detail Barang", value: "ProductRemark" },
      { header: "Kuantitas", value: "Quantity" },
      { header: "Satuan", value: "SatuanQuantity" },
      { header: "Price", value: "Price" },
      { header: "Satuan", value: "SatuanPrice" },
      { header: "Konversi", value: "Conversion" },
      { header: "Total", value: "Total" },
      { header: "Ongkir (%)", value: "ShippingFeePortion" },
      { header: "Jumlah Ongkir", value: "TotalShippingFee" },
      { header: "Kuantitas Budget", value: "BudgetQuantity" },
    ],
    onAdd: function () {
      this.data.CostCalculationGarment_Materials.push({
        QuantityOrder: this.data.Quantity,
        FabricAllowance: this.data.FabricAllowance,
        AccessoriesAllowance: this.data.AccessoriesAllowance,
        Rate: this.data.Rate,
        SMV_Cutting: this.data.SMV_Cutting,
        SMV_Sewing: this.data.SMV_Sewing,
        SMV_Finishing: this.data.SMV_Finishing,
        THR: this.data.THR,
        Wage: this.data.Wage,
        SMV_Total: this.data.SMV_Total,
        Efficiency: this.data.Efficiency
      });
      this.data.CostCalculationGarment_Materials.forEach((m, i) => m.MaterialIndex = i);
    }.bind(this),
    onRemove: function () {
      this.data.CostCalculationGarment_Materials.forEach((m, i) => m.MaterialIndex = i);
    }.bind(this),
    options: {}
  }
  radio = {
    Dollar: "Dollar",
    Rupiah: "Rupiah"
  }

  preSalesContractFilter = {
    IsPosted: true,
    SCType: "JOB ORDER"
  }

  constructor(router, bindingEngine, serviceEffeciency, rateService, element, serviceCore) {
    this.router = router;
    this.bindingEngine = bindingEngine;
    this.efficiencyService = serviceEffeciency;
    this.rateService = rateService;
    this.element = element; 
    this.selectedRate = "USD"
    this.serviceCore = serviceCore;
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.selectedSMV_Cutting = this.data.SMV_Cutting ? this.data.SMV_Cutting : 0;
    this.selectedSMV_Sewing = this.data.SMV_Sewing ? this.data.SMV_Sewing : 0;
    this.selectedSMV_Finishing = this.data.SMV_Finishing ? this.data.SMV_Finishing : 0;
    this.quantity = this.data.Quantity ? this.data.Quantity : 1;
    this.fabricAllowance = this.data.FabricAllowance ? this.data.FabricAllowance : 0;
    this.accessoriesAllowance = this.data.AccessoriesAllowance ? this.data.AccessoriesAllowance : 0;
    this.data.Risk = this.data.Risk ? this.data.Risk : 5;
    this.imageSrc = this.data.ImageFile = this.isEdit || this.isCopy ? (this.data.ImageFile || "#") : "#";
    this.selectedLeadTime = this.data.LeadTime ? `${this.data.LeadTime} hari` : "";
    this.selectedUnit = this.data.Unit?this.data.Unit:"";
    this.data.OTL1 = this.data.OTL1 ? this.data.OTL1 : Object.assign({}, this.defaultRate);
    this.data.OTL2 = this.data.OTL2 ? this.data.OTL2 : Object.assign({}, this.defaultRate);
    this.data.ConfirmPrice =this.data.ConfirmPrice ? this.data.ConfirmPrice .toLocaleString('en-EN', { minimumFractionDigits: 4}):0 ;
    this.create = this.context.create; 
    if (!this.create)
      {
          this.selectedBookingOrder = {
               BookingOrderId :this.data.BookingOrderId,
               BookingOrderItemId : this.data.BookingOrderItemId,
               BookingOrderNo : this.data.BookingOrderNo, 
               ConfirmDate : this.data.ConfirmDate,
               ConfirmQuantity : this.data.BOQuantity,
               //ComodityName : this.data.Comodity.Name,
        }

        this.selectedGarmentMarketing = {
               Name :this.data.MarketingName,
               ResponsibleName : this.data.ResponsibleName,            
        }
      }
      else
      {
          this.selectedBookingOrder = null;
          this.selectedGarmentMarketing = null;
      }
    console.log(this.context);
    let promises = [];

    let wage;
    if (this.data.Wage) {
      wage = new Promise((resolve, reject) => {
        resolve(this.data.Wage);
      });
      this.data.Wage.Value=this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    }
    else {
      this.data.Wage = this.defaultRate;
      wage = this.rateService.search({ filter: "{Name:\"OL\"}" })
        .then(results => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
          return result;
        });
        this.data.Wage.Value=this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    }
    promises.push(wage);

    let THR;
    if (this.data.THR) {
      THR = new Promise((resolve, reject) => {
        resolve(this.data.THR);
      });
    }
    else {
      this.data.THR = this.defaultRate;
      THR = this.rateService.search({ filter: "{Name:\"THR\"}" })
        .then(results => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
          return result;
        });
    }
    promises.push(THR);

    let rate;
    if (this.data.Rate) {
      rate = new Promise((resolve, reject) => {
        console.log(resolve)
        resolve(this.data.Rate);
      });
    }
    else {
      this.data.Rate = this.defaultRate;
      rate = this.rateService.search({ filter: "{Name:\"USD\"}" })
        .then(results => {
          let result = results.data[0] ? results.data[0] : this.defaultRate;
          result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
          return result;
        });
    }
    promises.push(rate);

    let all = await Promise.all(promises);
    this.data.Wage = all[0];
    this.data.Wage.Value=this.data.Wage.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    this.data.THR = all[1];
    this.data.Rate = all[2];

    // this.selectedRate = this.data.Rate ? this.data.Rate.Name : "";
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.QuantityOrder = this.data.Quantity;
        item.FabricAllowance = this.data.FabricAllowance;
        item.AccessoriesAllowance = this.data.AccessoriesAllowance;
        item.Rate = this.data.Rate;
        item.SMV_Cutting = this.data.SMV_Cutting;
        item.SMV_Sewing = this.data.SMV_Sewing;
        item.SMV_Finishing = this.data.SMV_Finishing;
        item.THR = this.data.THR;
        item.Wage = this.data.Wage;
        item.SMV_Total = this.data.SMV_Total;
        item.Efficiency = this.data.Efficiency;
      })
    }

    this.costCalculationGarment_MaterialsInfo.options.CCId = this.data.Id;
    this.costCalculationGarment_MaterialsInfo.options.SCId = this.data.PreSCId;
    console.log(context);
  }

  get preSalesContractLoader() {
      return PreSalesContractLoader;
  }

  get garmentMarketingLoader() { 
      return GarmentMarketingLoader;
  }

 @bindable selectedGarmentMarketing;
 async selectedGarmentMarketingChanged(newValue, oldValue) {
    if (newValue) {
        this.data.MarketingName = newValue.Name;
        this.data.ResponsibleName = newValue.ResponsibleName;
        
        console.log(newValue);
       }
    else
       {
          this.selectedBookingOrder = null;
          this.selectedGarmentMarketing = null;
       }
    
  }

  garmentMarketingView = (garmentmarketing) => {                          
    return`${garmentmarketing.Name} - ${garmentmarketing.ResponsibleName}`
  }

  get bookingOrderLoader() {
    return BookingOrderLoader;
  }

  bookingOrderView = (bookingorder) => {                          
    return`${bookingorder.BookingOrderNo} - ${bookingorder.ComodityName} - ${bookingorder.ConfirmQuantity} - ${moment(bookingorder.ConfirmDate).format("DD MMM YYYY")}`
  }

 get filter() {
     var filter = {};
     filter = {
               BuyerCode: this.data.BuyerBrandCode,
               SectionCode: this.data.Section,
               ComodityCode: this.data.ComodityCode,
              };          
     return filter;
  }
 
  get sizeRangeLoader() {
    return SizeRangeLoader;
  }

  get comodityLoader() {
    return ComodityLoader;
  }
  comodityView = (comodity) => {
    return`${comodity.Code} - ${comodity.Name}`
  }

  get comodityQuery(){
    var result = { "_CreatedBy" : "dev217" }
    return result;   
  }

  get uomLoader() {
    return UOMLoader;
  }

  get unitLoader() {
    return UnitLoader;
  }

  unitView = (unit) => {
    return `${unit.Code} - ${unit.Name}`
  }

  uomView =(uom)=>{
    return uom?`${uom.Unit}` : '';
  }

  get dataSection() {
    return (this.data.Section || this.data.SectionName) ? `${this.data.Section} - ${this.data.SectionName}` : "-";
  } 

  get dataBuyer() {
    return this.data.Buyer ? this.data.Buyer.Name : "-";
  } 

  get dataBuyerBrand() {
    return this.data.BuyerBrand ? this.data.BuyerBrand.Name : "-";
  }

  @bindable selectedPreSalesContract;
  async selectedPreSalesContractChanged(newValue, oldValue) {
    if (newValue) {
      this.data.PreSCId = newValue.Id;
      this.data.PreSCNo = newValue.SCNo;
      this.data.Section = newValue.SectionCode;
      console.log(this.data.Section);
      const section = await this.serviceCore.getSection(newValue.SectionId);
      this.data.SectionName = section.Name;
      this.data.ApprovalCC = section.ApprovalCC;
      this.data.ApprovalRO = section.ApprovalRO;   
      this.data.ApprovalKadiv = section.ApprovalKadiv;
      
      this.data.Buyer = {
        Id: newValue.BuyerAgentId,
        Code: newValue.BuyerAgentCode,
        Name: newValue.BuyerAgentName
      };
      
      this.data.BuyerCode = this.data.Buyer.Code;
      console.log(this.data.BuyerCode);
      this.data.BuyerBrand = {
        Id: newValue.BuyerBrandId,
        Code: newValue.BuyerBrandCode,
        Name: newValue.BuyerBrandName
      };

      this.data.BuyerBrandCode = this.data.BuyerBrand.Code;
      console.log(this.data.BuyerBrandCode);

    } else {
      this.data.PreSCId = 0;
      this.data.PreSCNo = null;
      this.data.Section = null;
      this.data.SectionName = null;
      this.data.ApprovalCC = null;
      this.data.ApprovalRO = null; 
      this.data.ApprovalKadiv = null;
      this.data.Buyer = null;
      this.data.BuyerBrand = null;
      this.selectedBookingOrder = null;      
    }

    if ((oldValue && newValue) || (oldValue && !newValue)) {
      this.data.CostCalculationGarment_Materials.splice(0);
    } else if (this.data.PreSCNoSource && this.data.PreSCNo !== this.data.PreSCNoSource) {
      const materialsFromPRMaster = this.data.CostCalculationGarment_Materials.filter(m => m.PRMasterItemId > 0);
      for (const materialFromPRmaster of materialsFromPRMaster) {
        // const index = this.data.CostCalculationGarment_Materials.indexOf(materialFromPRmaster);
        // this.data.CostCalculationGarment_Materials.splice(index, 1);
        materialFromPRmaster.IsPRMaster = null;
        materialFromPRmaster.PRMasterId = 0;
        materialFromPRmaster.PRMasterItemId = 0;
        materialFromPRmaster.POMaster = null;
      }
    }
    this.costCalculationGarment_MaterialsInfo.options.SCId = this.data.PreSCId;
  }

  //
 @bindable selectedBookingOrder;
  async selectedBookingOrderChanged(newValue, oldValue) {
    //console.log(newValue);
    if (newValue)
       {
         this.data.BookingOrderId = newValue.BookingOrderId;
         this.data.BookingOrderItemId = newValue.BookingOrderItemId;
         this.data.BookingOrderNo = newValue.BookingOrderNo;   
         this.data.BOQuantity = newValue.ConfirmQuantity;
         this.data.ConfirmDate = newValue.ConfirmDate;   
         //this.data.Commodity = newValue.ComodityName;

         console.log(this.data.BookingOrderId);
         console.log(this.data.BookingOrderItemId);      
         console.log(this.data.BookingOrderNo);
         console.log(this.data.BOQuantity);
         console.log(this.data.ConfirmDate);     
         //console.log(this.data.Commodity);   
       } 
       else 
       {
          this.data.BookingOrderId = 0;
          this.data.BookingOrderItemId = 0;
          this.data.BookingOrderNo = null;      
          this.data.BOQuantity = 0;
          this.data.ConfirmDate = null;
         // this.data.Commodity = this.data.Commodity;
       }
  }

  @bindable selectedComodity;
  selectedComodityChanged(newVal) {
    this.data.Comodity = newVal;    
    if (newVal) {
     this.data.ComodityId=newVal.Id;
     this.data.ComodityCode=newVal.Code;
     this.data.ComodityName=newVal.Name;
    }
    else
    {
          this.selectedBookingOrder = null;
    }
    console.log(this.data.ComodityCode);
    //console.log(newVal);
  }

  @bindable selectedLeadTime = "";
  selectedLeadTimeChanged(newVal) {
 
    if (newVal === "25 hari")
    {
      this.data.LeadTime = 25;
    }
    else if (newVal === "40 hari")
    {      
      this.data.LeadTime = 40;
      
    }
    else
      this.data.LeadTime = 0;
     
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

  @bindable selectedRate;
  // selectedRateChanged(newValue, oldValue) {
  //   if (newValue && newValue.toUpperCase() === "RUPIAH") {
  //     this.data.Rate = { Id: 0, Value: 1, CalculatedValue: 1 };
  //   }
  //   else {
  //     this.data.Rate = this.RateDollar;
  //   }
  // }

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || 0) != 0;
  }
  @computedFrom("error.CostCalculationGarment_MaterialTable")
  get hasError() {
    return (this.error.CostCalculationGarment_MaterialTable ? this.error.CostCalculationGarment_MaterialTable.length : 0) > 0;
  }

  get lineLoader() {
    return lineLoader;
  }

  @bindable quantity;
  async quantityChanged(newValue) {
    this.data.Quantity = newValue;
    this.data.Efficiency = await this.efficiencyService.getEffByQty(this.data.Quantity);
    this.data.Efficiency.Value=this.data.Efficiency.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) ;
    let index = this.data.Efficiency.Value ? 100 / this.data.Efficiency.Value.toLocaleString('en-EN', { minimumFractionDigits: 2 }) : 0;
    this.data.Index = numeral(numeral(index).format()).value().toLocaleString('en-EN', { minimumFractionDigits: 2 });
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.QuantityOrder = this.data.Quantity;
        item.Efficiency = this.data.Efficiency;
      })
      this.context.itemsCollection.bind()
    }
  }

  @bindable fabricAllowance;
  fabricAllowanceChanged(newValue) {
    this.data.FabricAllowance = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.FabricAllowance = this.data.FabricAllowance;
      })
    }
  }

  @bindable accessoriesAllowance;
  accessoriesAllowanceChanged(newValue) {
    this.data.AccessoriesAllowance = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.AccessoriesAllowance = this.data.AccessoriesAllowance;
      })
    }
  }

  @bindable selectedSMV_Cutting;
  selectedSMV_CuttingChanged(newValue) {
    this.data.SMV_Cutting = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Cutting = this.data.SMV_Cutting;
      })
      this.context.itemsCollection.bind()
    }
  }

  @bindable selectedSMV_Sewing;
  selectedSMV_SewingChanged(newValue) {
    this.data.SMV_Sewing = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Sewing = this.data.SMV_Sewing;
      })
      this.context.itemsCollection.bind()
    }
  }

  @bindable selectedSMV_Finishing;
  selectedSMV_FinishingChanged(newValue) {
    this.data.SMV_Finishing = newValue;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Finishing = this.data.SMV_Finishing;
      })
      this.context.itemsCollection.bind()
    }
  }

 

  @bindable selectedUnit;
  async selectedUnitChanged(newVal) {
    this.data.Unit = newVal;
    this.data.UnitId=newVal.Id;
    this.data.UnitCode=newVal.Code;
    this.data.BuyerName=newVal.Name;
    if (newVal) {
      let UnitCode = newVal.Code;

      let promises = [];
      let OTL1 = this.rateService.search({ filter: JSON.stringify({ Name: "OTL 1", UnitCode: UnitCode }) }).then((results) => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
        return result;
      });
      promises.push(OTL1);

      let OTL2 = this.rateService.search({ filter: JSON.stringify({ Name: "OTL 2", UnitCode: UnitCode }) }).then((results) => {
        let result = results.data[0] ? results.data[0] : this.defaultRate;
        result.Value = numeral(numeral(result.Value).format(rateNumberFormat)).value();
        return result;
      });
      promises.push(OTL2);

      let results = await Promise.all(promises);

      this.data.OTL1 = results[0];
      this.data.OTL2 = results[1];
      this.data.UnitCode=newVal.Code;
      this.data.UnitId=newVal.Id;
      this.data.UnitName=newVal.Name;
    }
  }


  @computedFrom('data.SMV_Cutting', 'data.SMV_Sewing', 'data.SMV_Finishing')
  get SMV_Total() {
    let SMV_Total = this.data.SMV_Cutting + this.data.SMV_Sewing + this.data.SMV_Finishing;
    SMV_Total = numeral(SMV_Total).format();
    this.data.SMV_Total = numeral(SMV_Total).value();

    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        item.SMV_Finishing = this.data.SMV_Total;
      })
    }

    return SMV_Total;
  }

  @computedFrom('data.CommissionPortion', 'data.ConfirmPrice', 'data.Freight', 'data.Insurance', 'data.Rate')
  get commissionRate() {
    let CommissionRate = this.data.CommissionPortion / 100 * (this.data.ConfirmPrice - this.data.Insurance - this.data.Freight) * this.data.Rate.Value;
    CommissionRate = numeral(CommissionRate).format();
    this.data.CommissionRate=numeral(CommissionRate).value();
    return CommissionRate;
  }

  @computedFrom('data.OTL1', 'data.SMV_Total')
  get calculatedRateOTL1() {
    let calculatedRateOTL1 = this.data.SMV_Total ? this.data.OTL1.Value * this.data.SMV_Total * 60 : 0;
    calculatedRateOTL1 = numeral(calculatedRateOTL1).format();
    this.data.OTL1.CalculatedValue = numeral(calculatedRateOTL1).value();
    return calculatedRateOTL1;
  }

  @computedFrom('data.OTL2', 'data.SMV_Total')
  get calculatedRateOTL2() {
    let calculatedRateOTL2 = this.data.SMV_Total ? this.data.OTL2.Value * this.data.SMV_Total * 60 : 0;
    calculatedRateOTL2 = numeral(calculatedRateOTL2).format();
    this.data.OTL2.CalculatedValue = numeral(calculatedRateOTL2).value();
    return calculatedRateOTL2;
  }

  @computedFrom('data.Wage', 'data.SMV_Sewing', 'data.Efficiency' + 'data.SMV_Cutting', 'data.SMV_Finishing', 'data.THR', 'data.SMV_Total')
  get productionCost() {
    let productionCost = this.data.Efficiency ?
      (this.data.Efficiency.Value ? this.data.Wage.Value * this.data.SMV_Sewing * 100 / this.data.Efficiency.Value +
        this.data.Wage.Value * this.data.SMV_Cutting * 100 / 75 +
        this.data.Wage.Value * this.data.SMV_Finishing * 100 / 90 +
        this.data.THR.Value * this.data.SMV_Total : 0)
      : 0;
    productionCost = numeral(productionCost).format();
    this.data.ProductionCost = numeral(productionCost).value();
    return productionCost;
  }

  @computedFrom('data.ConfirmPrice', 'data.Insurance', 'data.Freight', 'data.Rate', 'data.CommissionRate')
  get NETFOB() {
    let NETFOB = (this.data.ConfirmPrice - this.data.Insurance - this.data.Freight) * this.data.Rate.Value - this.data.CommissionRate;
    NETFOB = numeral(NETFOB).format();
    this.data.NETFOB = numeral(NETFOB).value();
    return NETFOB;
  }

  get freightCost() {
    let freightCost = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        freightCost += item.TotalShippingFee;
      })
    }
    freightCost = numeral(freightCost).format();
    this.data.FreightCost = numeral(freightCost).value();
    
    return freightCost;
  }



  get NETFOBP() {
    let allMaterialCost = 0;
    if (this.data.CostCalculationGarment_Materials) {
      this.data.CostCalculationGarment_Materials.forEach(item => {
        allMaterialCost += item.Total;
      })
    }
    let subTotal = allMaterialCost !== 0 ? (allMaterialCost + this.data.OTL1.CalculatedValue + this.data.OTL2.CalculatedValue) * (100 + this.data.Risk) / 100 + this.data.FreightCost : 0;
    let NETFOBP = this.data.NETFOB && subTotal !== 0 ? (this.data.NETFOB - subTotal) / subTotal * 100 : 0;
    NETFOBP = numeral(NETFOBP).format();
    this.data.NETFOBP = numeral(NETFOBP).value();
    return NETFOBP;
  }

  enterDelegate(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      return false;
    }
    else
      return true;
  }
}
