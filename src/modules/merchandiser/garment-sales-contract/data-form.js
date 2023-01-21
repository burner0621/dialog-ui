import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from './service';

import CCLoader from "../../../loader/cost-calculation-garment-loader";
import AccountBankLoader from "../../../loader/account-banks-loader";

@inject(BindingEngine, Service, Element)
export class DataForm {
  @bindable isCreate = false;

  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable hasItems=false;
  lampHeader = [{ header: "Standar Lampu" }];

  DeliveryOptions = ["BY SEA", "BY AIR", "BY SEA-AIR"];

  countries =
    ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  filterBank = {
    "DivisionName.toUpper()":"G"
  };

  get filterCostCalculationGarment() {
    return {
      "IsPosted": true,
      "SCGarmentId": null
    }
  }

  constructor(bindingEngine, service, element) {
    this.bindingEngine = bindingEngine;
    this.element = element;
    this.service = service;
  }

  async bind(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.data.CreatedUtc=this.data.CreatedUtc?this.data.CreatedUtc:new Date();
    if(this.data.SalesContractNo){
      this.selectedRO={
        RO_Number:this.data.RONumber
      }
      this.data.comodity=this.data.ComodityCode + " - " +this.data.ComodityName;
      if(this.data.AccountBankId||this.data.AccountBank.Id){
        var accId=this.data.AccountBankId?this.data.AccountBankId:this.data.AccountBank.Id;
        this.selectedAccountBank=await this.service.getAccountBankById(accId);
      }
      this.data.UomUnit=this.data.Uom.Unit;
      this.data.buyer=this.data.BuyerBrandCode + " - " +this.data.BuyerBrandName;
    }

    this.hasItems=false;
    if(this.data.Items)
      if(this.data.Items.length>0){
        this.data.Amount=0;
        for(var item of this.data.Items){
          item.Uom=this.data.Uom.Unit;
          item.PricePerUnit=this.data.Uom.Unit;
          this.data.Amount+=item.Price*item.Quantity;
        }
        this.hasItems=true;
      }
      if(this.data.Amount)
        this.data.Amount=this.data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2})
      if(this.data.Price){
        this.data.Price=this.data.Price.toLocaleString('en-EN', { minimumFractionDigits: 4})
      }
    if(!this.data.DocPresented || this.data.DocPresented==""){
      this.data.DocPresented="INVOICE OF COMMERCIAL VALUE \nPACKING LIST \nEXPORT LICENSE \nCERTIFICATE OF ORIGIN / G.S.P FORM A \nINSPECTION CERTIFICATE ";
    }
    
  }


  @bindable selectedRO;
  selectedROChanged(newValue, oldValue) {
    //this.data.Buyer = newValue;
    if(oldValue && newValue)
      if(newValue.RO_Number!=oldValue.RO_Number){
        this.selectedRO=null;
        this.data.BuyerBrandName= "";
        this.data.BuyerBrandCode= "";
        this.data.BuyerBrandId="";
        this.data.RONumber="";
        this.data.Quantity=0;
        this.data.Article="";
        this.data.ComodityId="";
        this.data.ComodityName="";
        this.data.ComodityCode="";
        this.data.Uom=null;
        this.data.UomId="";
        this.data.UomUnit="";
        this.data.Price=0;
        this.data.DeliveryDate=null;
        this.data.Items.splice(0);
        this.data.comodity="";
        this.data.buyer="";
        this.data.Amount=0;
      }
    if (newValue) {
      this.selectedRO=newValue;
      this.data.RONumber=newValue.RO_Number;
      if(newValue.Id){
        this.data.BuyerBrandName= newValue.BuyerBrand.Name;
        this.data.BuyerBrandId=newValue.BuyerBrand.Id;
        this.data.BuyerBrandCode=newValue.BuyerBrand.Code;
        this.data.Quantity=newValue.Quantity;
        this.data.Article=newValue.Article;
        this.data.ComodityId=newValue.Comodity.Id;
        this.data.CostCalculationId=newValue.Id;
        var como=null;
        // if(this.data.ComodityId && this.data.ComodityId!=0){
        //   como=this.service.getComodityById(this.data.ComodityId);
        //   this.data.comodity= como.code + " - " +como.name;
        // }
        // if(como!=null){
        //   this.data.ComodityName=como.name;
        //   this.data.ComodityCode=como.code;
        // }
        this.data.ComodityName=newValue.Comodity.Name;
        this.data.ComodityCode=newValue.Comodity.Code;
        this.data.comodity=this.data.ComodityCode + " - " +this.data.ComodityName;
        this.data.buyer=this.data.BuyerBrandCode + " - " + this.data.BuyerBrandName;
        this.data.Uom=newValue.UOM;
        this.data.UomId=newValue.UOM.Id;
        this.data.UomUnit=newValue.UOM.Unit;
        this.data.Price=newValue.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 4});
        this.data.DeliveryDate=newValue.DeliveryDate;
        if(this.data.Items.length==0){
          this.data.Amount=parseFloat(this.data.Quantity*parseFloat(this.data.Price)).toLocaleString('en-EN', { minimumFractionDigits: 2});
        }
      }
      
    } else {
      this.selectedRO=null;
      this.data.RONumber="";
      this.data.Quantity=0;
      this.data.Article="";
      this.data.ComodityId="";
      this.data.ComodityName="";
      this.data.ComodityCode="";
      this.data.Uom=null;
      this.data.UomId="";
      this.data.UomUnit="";
      this.data.DeliveryDate=null;
      this.data.Price=0;
      this.data.Items.splice(0);
      this.data.comodity="";
      this.data.buyer="";
      this.data.BuyerBrandName= "";
      this.data.BuyerBrandCode= "";
      this.data.BuyerBrandId="";
      this.data.Amount=0;
    }
  }

  @bindable selectedAccountBank;
  selectedAccountBankChanged(newValue, oldValue) {
    if (newValue) {
      this.data.AccountBank =newValue;
    } else {
      this.data.AccountBank = null;
    }
  }


  get detailHeader() {
      return [{ header: "Keterangan" }, { header: "Quantity" }, { header: "Satuan" }, { header: "Harga" },{ header: "Satuan Harga" }];
  }

  itemsInfo = {
    onAdd: function () {
      this.data.Items.push({
        Uom: this.data.UomUnit,
        Description: '',
        Price: 0,
        Quantity: 0,
        PricePerUnit: this.data.UomUnit
      });
    }.bind(this)
  }

  get roLoader() {
    return CCLoader;
  }

  roView(cc) {
    return `${cc.RO_Number}` ;
  }

  get accountBankLoader() {
    return AccountBankLoader;
  }

  bankView(bank) {
    return bank.AccountName ? `${bank.AccountName} - ${bank.BankName} - ${bank.AccountNumber} - ${bank.Currency.Code}` : '';
  }

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 7,
      align: "right"
    }
  }

  PriceChanged(e){
    this.data.Price=parseFloat(e.srcElement.value).toLocaleString('en-EN', { minimumFractionDigits: 4});

    this.data.Amount=parseFloat(this.data.Quantity*parseFloat(this.data.Price)).toLocaleString('en-EN', { minimumFractionDigits: 2});
    
  }

  async itemsChanged(e){
    this.hasItems=true;
    this.data.Price=0;
    this.data.Amount=0;
    if(this.data.Items){
      for(var item of this.data.Items){
        if(item.Price && item.Quantity){
          this.data.Amount+=item.Price*item.Quantity;
        }
      }
      this.data.Amount=parseFloat(this.data.Amount).toLocaleString('en-EN', { minimumFractionDigits: 2});
      if(this.data.Items.length==0){
        this.hasItems=false;
        var price= await this.service.getCostCalById(this.data.CostCalculationId);
        this.data.Price=price.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 4});
        this.data.Amount=parseFloat(this.data.Quantity*parseFloat(this.data.Price)).toLocaleString('en-EN', { minimumFractionDigits: 2});
      }
    }

  }

  get  removeItems() {
    return async (event) => //console.log(event.detail);
    {
        if(this.data.Items){
          this.data.Amount=0;
          for(var item of this.data.Items){
            if(item.Price && item.Quantity){
              this.data.Amount+=item.Price*item.Quantity;
          }
        }
        this.data.Amount=parseFloat(this.data.Amount).toLocaleString('en-EN', { minimumFractionDigits: 2});
      }
      if(this.data.Items.length==0){
        this.hasItems=false;
        var price= await this.service.getCostCalById(this.data.CostCalculationId);
        this.data.Price=await price.ConfirmPrice;
        this.data.Amount=parseFloat(this.data.Quantity*parseFloat(this.data.Price)).toLocaleString('en-EN', { minimumFractionDigits: 2});
        this.data.Price=price.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 4});
      }
    }
  }
}
