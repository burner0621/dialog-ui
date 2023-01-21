import { inject, bindable, computedFrom } from 'aurelia-framework';
// @containerless()
// @inject(BindingEngine, Element)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data = {};
  @bindable error = {};

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };

  // constructor(bindingEngine, element) {
  //   this.bindingEngine = bindingEngine;
  //   this.element = element;
  // }


  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
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

  
  listIndicatorsColumns = {
    Columns: [
      { header: "Indikator", value: "Indicator" },
      { header: "Tipe Data", value: "DataType" },
      { header: "Petunjuk Data", value: "DefaultValue" },
      { header: "Satuan", value: "Uom" },
    ],
    onAdd: function () {
      this.data.Indicators.push({ Indicator: "", DataType: "", DefaultValue: "", Uom: "" });
      console.log("add");
    }.bind(this),
    onRemove: function () {
      console.log("remove");
    }.bind(this)
  };


  // listIndicatorsColumns = [
  //   { header: "Indikator", value: "indicator" },
  //   { header: "Tipe Data", value: "dataType" },
  //   { header: "Petunjuk Data", value: "defaultValue" },
  //   { header: "Satuan", value: "uom" },
  // ]



} 
