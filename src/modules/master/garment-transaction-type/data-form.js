import { inject, bindable, computedFrom } from 'aurelia-framework';
var COALoader = require('../../../loader/coa-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable filtercoa;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }

    coaView = (coa) => { 
        return `${coa.Code}`
    }
   
    get coaLoader() {
        return COALoader;
    }

   filtercoaChanged(newValue){
        var selectedcoa = newValue;
        console.log(selectedcoa)
        if(selectedcoa){
            this.data.COAId = selectedcoa.Id;
            this.data.COACode = selectedcoa.Code;
            this.data.COAName = selectedcoa.Name;
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        console.log(this.data)
        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if(this.data.Id){
            this. filtercoa = {};
            this. filtercoa.Id   = this.data.COAId;
            this. filtercoa.Code = this.data.COACode;
            this. filtercoa.Name = this.data.COAName;
        }
    }
}
