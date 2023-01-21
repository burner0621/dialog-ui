import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import moment from 'moment';
var UnitLoader = require('../../../../loader/weekly-plan-unit-loader');
var weeklyLoader = require('../../../../loader/garment-master-plan-weekly-plan-loader');
var weekLoader = require('../../../../loader/garment-master-plan-weekly-plan-by-year-loader');
var MasterPlanComodityLoader = require('../../../../loader/garment-master-plan-comodity-loader');

const shResource = 'master/standard-minute-value'

export class Item {
  @bindable selectedUnit;
  @bindable selectedWeeklyPlan;
  @bindable selectedWeek;
  @bindable selectedComodity;


  async activate(item) {
    this.data = item.data;
    this.error = item.error;
    this.options = item.options;
    this.buyerCode = item.context.options.buyerCode || "";
    this.context = item.context;
    this.data.oldVal={};
    this.items = [];
    for (var a = 0; a < this.context.items.length; a++) {
      this.items.push(this.context.items[a].data);
    }
    // console.log(this.items[this.context.items.length-1].code);
    if (this.data.Unit)
      this.selectedUnit = this.data.Unit;
    if (this.data.Year)
      this.selectedWeeklyPlan = { Year: this.data.Year.toString() };
    
    if (this.data.WeekNumber) {
      this.selectedWeek = { 
        WeekNumber : this.data.WeekNumber,
        StartDate:this.data.StartDate,
        EndDate:this.data.EndDate,
        Month:this.data.Month,
        RemainingEH : this.data.RemainingEH,
        Efficiency : this.data.Efficiency
      };

      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("sales");
      var filter = {
        Year: this.data.Year,
        unit: this.data.Unit.Code,
        weekNumber: this.data.WeekNumber
      }

      if (this.data.LastModifiedUtc) {
        if(this.data.WeeklyPlanItemId){
          var resource = `garment-master-plan/weekly-plans/week/${this.data.WeeklyPlanItemId}`;
        
          await endpoint.find(resource)
            .then((result) => {
              this.selectedWeek = result.data;
              this.data.Operator = this.selectedWeek.Operator;
              this.data.RemainingEH=this.selectedWeek.RemainingEH;
              for (var a = this.items.length-1; a >=0; a--) {
                  if(this.data.Year==this.items[a].Year && this.data.Unit.Code==this.items[a].Unit.Code&& this.data.WeekNumber==this.items[a].WeekNumber){
                    this.data.RemainingEH+=this.items[a].EHBooking;
                    if(this.data.Id==this.items[a].Id){
                        break;
                    }
                  }
              }
              this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
            });
            this.data.LastModifiedUtc=null;
        }
      }

    }
    if (this.data.Comodity)
      this.selectedComodity = this.data.Comodity;
  }

  controlOption = {
    control: {
      length: 12
    }
  }

  @computedFrom("yearFilter")
  get filterYear() {
    var yearFilter = {};
    if (this.data.Year && this.data.Unit && this.data.Unit.Code) {
      if(this.yearFilter){
        yearFilter = this.yearFilter;
      }
      else{
        yearFilter = {
          Year: this.data.Year,
          "UnitCode": this.data.Unit.Code
        };
      }
    }
    return yearFilter;
  }


  @computedFrom("data.Unit")
  get filterUnit() {
    var filter = {};
    if (this.data.Unit && this.data.Unit.Code) {
      filter = {
        "UnitCode": this.data.Unit.Code
      }
    }
    return filter;
  }

  selectedUnitChanged(newValue,oldValue) {
    if(oldValue){
      this.data.oldVal.unitCode=oldValue.Code;
      this.data.oldVal.year=this.data.Year;
      this.data.oldVal.weekNumber=this.data.WeekNumber;
      this.data.oldVal.remainingEH=this.data.RemainingEH;
    }
    var _selectedData = newValue;
    if (_selectedData) {
      this.data.Unit = _selectedData;
    } else {
      this.data.Unit=null;
      this.selectedWeeklyPlan = {};
      this.selectedWeek = {};
    }
    
    this.selectedWeeklyPlan = {};
    this.selectedWeek = {};
    this.data.EHBooking = 0;
    this.data.sisaEH = 0;
    this.data.Efficiency = 0;
    this.data.quantity = 0;
    this.data.planWorkingHours = 0;
    this.data.RemainingEH=0;
  }

  selectedWeeklyPlanChanged(newValue,oldValue) {
    if(newValue!=null)
      if(oldValue){
        this.data.oldVal.year=this.data.oldVal.year? this.data.oldVal.year : oldValue.Year;
        this.data.oldVal.unitCode=this.data.oldVal.unitCode? this.data.oldVal.unitCode : this.data.Unit.Code;
        // this.data.oldVal.weekNumber=this.data.oldVal.weekNumber ?this.data.oldVal.weekNumber: this.data.WeekNumber;
        // this.data.oldVal.remainingEH=this.data.RemainingEH;
      }
    var _selectedData = newValue;
    if (_selectedData) {
      this.data.Year = _selectedData.Year;
      this.data.WeeklyPlanId = _selectedData.Id;
    }
    else {
      delete this.data.weeklyPlanId;
      delete this.data.weeklyPlanYear;
      this.selectedWeek = {};
      this.data.RemainingEH=0;
    }
    this.yearFilter = {};
    if (this.data.Year && this.data.Unit && this.data.Unit.Code) {
      this.yearFilter = {
        Year: this.data.Year,
        UnitCode: this.data.Unit.Code
      }
    }
    this.selectedWeek = {};
    this.data.EHBooking = 0;
    this.data.sisaEH = 0;
    this.data.Efficiency = 0;
    this.data.OrderQuantity = 0;
    this.data.planWorkingHours = 0;
    this.data.RemainingEH=0;
  }

  selectedWeekChanged(newValue,oldValue) {
    //if(newValue!=null)
    if(oldValue){
      if(oldValue){
        this.data.oldVal.weekNumber=oldValue.WeekNumber  ;
        this.data.oldVal.year=this.data.oldVal.year? this.data.oldVal.year:this.data.Year;
        this.data.oldVal.unitCode=this.data.oldVal.unitCode? this.data.oldVal.unitCode : this.data.Unit.Code;
        this.data.oldVal.remainingEH= this.data.oldVal.remainingEH || this.data.RemainingEH;
      }
    }
    var _selectedData = newValue;
    this.selectedWeek=_selectedData;
    if (_selectedData) {
      this.data.WeekNumber = _selectedData.WeekNumber;
      this.data.StartDate=_selectedData.StartDate;
      this.data.EndDate=_selectedData.EndDate;
      this.data.Month=_selectedData.Month;
      this.data.RemainingEH = _selectedData.RemainingEH;
      this.data.WeeklyPlanItemId=_selectedData.Id;
      this.data.Efficiency = _selectedData.Efficiency;
      this.data.Operator = _selectedData.Operator;
      this.data.EHBooking = Math.round((this.data.SMVSewing * this.data.OrderQuantity) / 60);
      this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
      
    } else {
      //delete this.data.week;
      this.selectedWeek = {};
      this.data.EHBooking = 0;
      this.data.sisaEH = 0;
      this.data.planWorkingHours = 0;
      this.data.RemainingEH=0;
    }
  }

  quantityChanged(e) {
    if(this.data.OrderQuantity===0){
      this.data.EHBooking=0;
    }
    if (this.data.OrderQuantity && this.data.WeekNumber) {
      this.data.EHBooking = Math.round((this.data.SMVSewing * this.data.OrderQuantity) / 60);
      this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
    }
  }

  efficiencyChanged(e) {
    if (this.data.OrderQuantity && this.data.WeekNumber) {
      this.data.EHBooking = Math.round((this.data.SMVSewing * this.data.OrderQuantity) / 60);
      this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
    }
  }

  SMVChanged(e) {
    if (this.data.OrderQuantity && this.data.WeekNumber) {
      this.data.EHBooking = Math.round((this.data.SMVSewing * this.data.OrderQuantity) / 60);
      this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
    }
  }

  EHChanged(e) {
    if (this.data.OrderQuantity && this.data.WeekNumber) {
      this.data.EHBooking = Math.round((this.data.SMVSewing * this.data.OrderQuantity) / 60);
      this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
    }
  }

  async selectedComodityChanged(newValue) {
    var _selectedData = newValue;
    if (_selectedData) {
      this.data.Comodity = _selectedData;
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("core");
      var filter = {
        BuyerCode: this.buyerCode,
        ComodityCode: _selectedData.Code
      };
      await endpoint.find(shResource, { filter: JSON.stringify(filter) })
        .then((result) => {
          if (result.data.length > 0) {
            this.data.SMVSewing = result.data[0].SMVSewing;
            if (this.data.OrderQuantity && this.data.WeekNumber) {
              this.data.EHBooking = Math.round((this.data.SMVSewing * this.data.OrderQuantity) / 60);
              this.data.sisaEH = this.data.RemainingEH - this.data.EHBooking;
            }
          }
          else {
            this.data.EHBooking = 0;
            this.data.sisaEH = 0;
            this.data.planWorkingHours = 0;
            this.data.shSewing = 0;
            this.data.SMVSewing =0;
          }
        });
    }
  }

  get unitLoader() {
    return UnitLoader;
  }
  get weeklyloader() {
    return weeklyLoader;
  }
  get weekloader() {
    return weekLoader;
  }
  get masterPlanComodityLoader() {
    return MasterPlanComodityLoader;
  }

  get isFilterUnit() {
    return this.data && this.data.Unit.Id;
  }

  get isFilterWeek() {
    return this.data && this.data.Unit.Id && this.data.Year;
  }


  weekView = (week) => {
    var returnData = "";
    if (week.WeekNumber) {
      var endDate = moment(week.EndDate).format("DD MMM YYYY");
      var startDate = moment(week.StartDate).format("DD MMM YYYY");
      returnData = `W${week.WeekNumber} - ${startDate} s/d ${endDate}`;
    }
    return returnData;
  }

  yearView = (week) => {
    if(week.Year)
      return `${week.Year}`
  }

  ConfirmChanged(e){
    if(this.data.IsConfirm && this.data.EHBooking && this.data.Operator && this.data.Efficiency){
      this.data.whConfirm= this.data.EHBooking/(this.data.Operator * this.data.Efficiency);
    }
    else{
      this.data.whConfirm=0;
    }
  }
  @computedFrom("data.EHBooking && data.Operator && data.Efficiency && data.IsConfirm")
  get whConfirm(){
    this.data.whConfirm=0;
    if(this.data.IsConfirm && this.data.EHBooking && this.data.Operator && this.data.Efficiency){
      var calc=(this.data.Operator * this.data.Efficiency);
      this.data.whConfirm= this.data.EHBooking/calc;
    }
    else{
      this.data.whConfirm=0;
    }
    return this.data.whConfirm;
  }
}
