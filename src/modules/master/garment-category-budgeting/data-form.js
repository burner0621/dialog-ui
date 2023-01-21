import { inject, bindable, computedFrom } from 'aurelia-framework';
var UomLoader = require('../../../loader/uom-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable UOM;
  
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }

 CodeRequirements = ['BB', 'BP', 'BE']
 CategoryTypes = ['FABRIC', 'NON FABRIC']

  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

    get uomLoader() {
      return UomLoader;
    }

    UOMChanged() {
        if (this.UOM) {
            this.data.UOM = this.UOM
        } else {
            this.UOM = {};
        }
    }

    CodeRequirementChanged(e) {
        var selectedCodeRequirement = e.srcElement.value;        
    }

    CategoryTypeChanged(e) {
        var selectedCategoryType = e.srcElement.value;        
    }


 bind(context) {
        this.context = context;
        this.data = this.context.data;
        if (this.data.Id) {
            this.UOM = this.data.UOM;            
        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }
}
} 
