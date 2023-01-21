import { inject, bindable, computedFrom } from "aurelia-framework";
import { callbackify } from "util";

export class DataForm {
  @bindable title;
  @bindable readOnly;
  // @bindable Name;

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor() {}


  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Id) {
      this.ringDocumentsOptions = {};
      this.ringDocumentsOptions.Code = "";
      this.ringDocumentsOptions.Number = "";
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  // NameChanged(newValue) {
  //   if (this.Name) {
  //     var whitespaceRegex = new RegExp("\\s");
  //     if (whitespaceRegex.test(newValue)) {
  //       var detectWhitespace = this.Name.split(" ");
  //       this.error.Name = "Kode Tambahan Tidak Boleh Mengandung Spasi";
  //       this.Name = detectWhitespace[0] ? detectWhitespace[0] : " ";
  //     } else {
  //       this.Name = "";
  //       this.Name = newValue;
  //     }
  //   }
  // }

  //Triggered when "+" on Items Collections Clicked

}
