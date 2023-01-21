import {inject, bindable, computedFrom} from 'aurelia-framework';

export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable const;
    @bindable yarn;
    @bindable width;

    ProductTypes = ['FABRIC', 'NON FABRIC']

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

    bind(context) {
    this.context = context;
    this.data = this.context.data;
    if (this.data && this.data.UOM)
            this.data.UOM.toString = function () {
                return this.unit;
            };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }


    uomChanged(e) {
        var selectedUom = e.detail;
        if (selectedUom)
            this.data.UOM = selectedUom.Id;
    }
    ProductTypeChanged(e) {
        var selectedProductType = e.srcElement.value;
        if(selectedProductType="FABRIC")
            data.Name="FABRIC";
    }

}
