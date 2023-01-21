import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService } from './service';
import { debug } from 'util';

//var lotConfigurationLoader = require('../../../../loader/lot-configuration-loader');

var moment = require('moment');
var MaterialTypeLoader = require('../../../../loader/spinning-material-types-loader');
var UnitLoader = require('../../../../loader/unit-loader');
var UOMLoader = require('../../../../loader/uom-loader');

@inject(Service, CoreService)
export class DataForm {
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable readOnly;
    @bindable data = {};
    @bindable error;
    @bindable title;
    @bindable lotConfiguration;
    @bindable processType;
    @bindable yarnType;
    @bindable count;
    @bindable unit;
    @bindable uomWeight;
    @bindable uomLength;
    @bindable thin;
    @bindable thick;
    @bindable neps;
    @bindable stdWeight

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        editText: "Ubah",
        deleteText: "Hapus",
    };


    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }
    controlOptions3 = {
        label: {
            length: 1
        },
        control: {
            length: 5
        }
    }
    controlOptions2 = {
        label: {
            length: 6
        },
        control: {
            length: 6
        }
    }
    processTypeList = [];
    gradeList =["","Excellent","Good","Medium","Low","Bad"];


    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.processType = false;
        if (!this.readOnly)
            this.coreService.getMachineTypes()
                .then(result => {
                    if (this.data.ProcessType) {
                        this.processTypeList = result;
                    } else {
                        this.processTypeList.push("");
                        for (var list of result) {
                            this.processTypeList.push(list);
                        }
                    }
                });
        if (this.data.ProcessType) {
            this.processType = this.data.ProcessType;
        }

        if (this.data.UnitDepartment && this.data.UnitDepartment.Id) {
            this.unit = this.data.UnitDepartment;
        }

        if (this.data.MaterialType && this.data.MaterialType.Id) {
            this.yarnType = this.data.MaterialType;
        }

        if (this.data.UomWeightIdentity && this.data.UomWeightIdentity.Id) { 
            this.uomWeight = this.data.UomWeightIdentity;
            this.data.UomWeightUnit = this.data.UomWeightIdentity.Unit;
        }

        if (this.data.UomLengthIdentity && this.data.UomLengthIdentity.Id){
            this.uomLength = this.data.UomLengthIdentity.Unit;
        }

        if (this.data.Thin)
            this.thin = this.data.Thin;
        if (this.data.Thick)
            this.thick = this.data.Thick;
        if (this.data.Neps)
            this.neps = this.data.Neps;
        if (this.data.StdWeight)
            this.stdWeight = this.data.StdWeight;
    }

    spinningFilter = { "DivisionName.toUpper()": "SPINNING" };

    unitChanged(newValue, oldValue) {
        if (this.unit && this.unit.Id) {
            this.data.UnitDepartmentId = this.unit.Id;
        }
    }

    processTypeChanged(n, o) {
        var selectedProcess = this.processType;
        this.data.ProcessType = selectedProcess;
    }

    
    yarnTypeChanged(n, o) {
        var selectedYarn = this.yarnType;
        if (selectedYarn) {
            this.data.MaterialTypeIdentity = selectedYarn.Id;
        }
    }

    stdWeightChanged(n, o) { 
        var selectedWeight = this.stdWeight;
        if (selectedWeight) { 
            this.data.StdWeight = selectedWeight;
            switch(this.data.UomWeightUnit){
                case "GRAM":
                this.data.Grain = this.data.StdWeight * 15.4321;
                break;
                case "LBS":
                this.data.Grain = this.data.StdWeight * 7000;
                break;
                case "OZ":
                this.data.Grain = this.data.StdWeight * 28.3495;
                break;
                default:
                this.data.Grain = this.data.StdWeight;
            }
        }
    }

    uomWeightChanged(newValue) {
        if (newValue && newValue.Id) {
          this.data.UomWeightIdentity = newValue.Id;
          this.data.UomWeightUnit = newValue.Unit;
          switch(this.data.UomWeightUnit){
              case "GRAM":
              this.data.Grain = this.data.StdWeight * 15.4321;
              break;
              case "LBS":
              this.data.Grain = this.data.StdWeight * 7000;
              break;
              case "OZ":
              this.data.Grain = this.data.StdWeight * 28.3495;
              break;
              default:
              this.data.Grain = this.data.StdWeight;
          }
        }else{
          this.data.UomWeightIdentity = 0;
        }
    }

    uomLengthChanged(newValue) {
        if (newValue &&newValue.Id) {
          this.data.UomLengthIdentity = newValue.Id;
        }else{
          this.data.UomLengthIdentity = 0;
        }
    }

    thinChanged(newValue) {
        this.data.Thin = newValue;
        this.data.TotalIPI = this.data.Thin + this.data.Thick + this.data.Neps;
    }

    thickChanged(newValue) {
        this.data.Thick = newValue;
        this.data.TotalIPI = this.data.Thin + this.data.Thick + this.data.Neps;
    }

    nepsChanged(newValue) {
        this.data.Neps = newValue;
        this.data.TotalIPI = this.data.Thin + this.data.Thick + this.data.Neps;
    }

    uomWeightView = (uom) => {
        return `${uom.Unit}`
      }

    uomLengthView = (uom) => {
        return `${uom.Unit}`
      }

    get yarnLoader() {
        return ProductLoader;
    }

    get materialTypeLoader() {
        return MaterialTypeLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get uomWeightLoader() {
        return UOMLoader;
      }

    get uomLengthLoader() {
        return UOMLoader;
      }
} 