import {inject, bindable, computedFrom} from 'aurelia-framework';

var UnitLoader = require('../../../loader/unit-loader');
var MachineLoader = require('../../../loader/machine-loader');
var YarnLoader = require('../../../loader/spinning-yarn-loader');


export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable unit;
    @bindable machine;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    spinningFilter = { "division.name": { "$regex": "SPINNING", "$options": "i" } };

    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    changeColor(e) {
        console.log(e.srcElement.value);
        this.data.color=e.srcElement.value;

    }

    bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    }

}
