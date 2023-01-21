import { inject, bindable, computedFrom } from 'aurelia-framework';
var UOMLoader = require('../../../loader/uom-loader');
var TRXLoader = require('../../../loader/garment-transaction-type-loader');


export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable filterUom;
  @bindable filterTrxType;
  
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }

  unitname = null;
  trxtypename = null;
  

  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

    uomView = (uom) => { 
        return `${uom.Unit}`
    }
   
    get uomLoader() {
        return UOMLoader;
    }

   filterUomChanged(newValue){
        var selectedUom = newValue;
        console.log(selectedUom)
        if(selectedUom){
            this.data.UomId = selectedUom.Id;
            this.data.UomUnit = selectedUom.Unit;
        }
    }


    trxtypeView = (trxtype) => { 
        return `${trxtype.Code}`
    }
   
    get trxtypeLoader() {
        return TRXLoader;
    }

   filterTrxTypeChanged(newValue){
        var selectedTrxType = newValue;
        console.log(selectedTrxType)
        if(selectedTrxType){
            this.data.ProductTypeId = selectedTrxType.Id;
            this.data.ProductTypeCode = selectedTrxType.Code;
            this.data.ProductTypeName = selectedTrxType.Name;
        }
    }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    console.log(this.data)
    this.error = this.context.error;
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if(this.data.Id){
           this.filterUom = {};
           this.filterUom.Id = this.data.UomId;
           this.filterUom.Unit = this.data.UomUnit;
   
           this. filterTrxType = {};
           this. filterTrxType.Id   = this.data.ProductTypeId;
           this. filterTrxType.Code = this.data.ProductTypeCode;
           this. filterTrxType.Name = this.data.ProductTypeName;
    }
  }
} 
