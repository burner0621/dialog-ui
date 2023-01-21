import {bindable} from 'aurelia-framework'

export class listSPP {

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isShowing = false;
  } 

  detailSPPColumns = ["Acuan Warna / Desain", "Warna Yang Diminta", "Jumlah", "Satuan"];

  controlOptions = {
    control: {
      length: 12
    }
  };

  toggle(){
    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }
}