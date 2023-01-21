import { inject, bindable, computedFrom } from 'aurelia-framework';
var COALoader = require('../../../loader/chart-of-account-loader');


export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedCOA;
  
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

    coaView = (coa) => { 
        return `${coa.Code} - ${coa.Name}`
    }
   
    get coaLoader() {
        return COALoader;
    }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    
    this.error = this.context.error;
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if(this.data.Id){
        this.selectedCOA = {
            Id:this.data.COAId,
            Code:this.data.COACode,
            Name:this.data.COAName
        };
    }
  }

  selectedCOAChanged(newValue){
    if(newValue){
        this.data.COAId=newValue.Id;
        this.data.COACode=newValue.Code;
        this.data.COAName=newValue.Name;
    }
  }
} 
