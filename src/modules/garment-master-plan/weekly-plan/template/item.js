import {bindable} from 'aurelia-framework'

export class Item {
  activate(context) {
    this.data = context.data;
    this.error = context.error;
    this.options = context.options; 
    this.context = context;

    // week yang sudah dipakai (dibooking, usedEH > 0) tidak boleh diubah
    //this.options.readOnly = this.options.readOnly || this.data.usedEH > 0;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
 
  get dataAhTotal() {
    this.data.AHTotal = parseFloat((this.data.Operator * this.data.WorkingHours).toFixed(2));
    return this.data.AHTotal;
  }

  set dataAhTotal(value) {
    this.data.AHTotal = value;
  }

  get dataEhTotal() {
    this.data.EHTotal = Math.round(this.data.AHTotal * this.data.Efficiency / 100);
    return this.data.EHTotal;
  }

  set dataEhTotal(value) {
    this.data.EHTotal = value;
  }

  get dataRemainingEH() {
    this.data.RemainingEH = this.data.EHTotal - this.data.UsedEH;
    return this.data.RemainingEH;
  }

  set dataRemainingEH(value) {
    this.data.RemainingEH = value;
  }
}
