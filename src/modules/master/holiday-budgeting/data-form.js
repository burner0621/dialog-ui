import {inject, bindable, computedFrom} from 'aurelia-framework';

var divisionLoader = require('../../../loader/division-loader');

export class DataForm {
    @bindable title;
    @bindable readOnly;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    constructor() { }

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }
    
    bind(context) {
    this.context = context;
    this.data = this.context.data;
    if (this.data && this.data.division)
            this.data.division.toString = function () {
                return this.name;
            };
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }

    divisionChanged(e) {
        var selectedDivision = e.detail;
        if (selectedDivision)
            this.data.divisionId = selectedDivision._id;
    }

    get divisionLoader() {
      return divisionLoader;
    }
}
