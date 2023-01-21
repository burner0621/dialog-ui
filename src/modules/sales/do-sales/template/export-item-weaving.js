import { bindable } from "aurelia-framework";

export class localitemsweaving {
    @bindable Weight;

    activate(context) {
      this.data = context.data;
      this.error = context.error;
      this.options = context.options;
      this.WeightUom = context.context.options.WeightUom;
  
      if (!this.data.Packing) {
        this.data.Packing = 0;
      }
      if (!this.data.Weight) {
        this.data.Weight = 0;
      }
      if (!this.data.ConvertionValue) {
        this.data.ConvertionValue = 0;
      }
  
      this.Packing = this.data.Packing;
      this.Weight = this.data.Weight;
      if (this.WeightUom == "KG") {
        this.getConvertionValue = this.Weight * 0.005;
      } else if (this.WeightUom == "BALE") {
        this.getConvertionValue = this.Weight * 217.72;
      } else {
        this.getConvertionValue = 0;
      }
      this.data.ConvertionValue = this.getConvertionValue;
    }
  
    WeightChanged(newValue, oldValue) {
      if (this.Weight && this.Weight > 0) {
        this.data.Weight = {};
        if (this.WeightUom == "KG") {
          this.getConvertionValue = this.Weight * 0.005;
        } else if (this.WeightUom == "BALE") {
          this.getConvertionValue = this.Weight * 217.72;
        } else {
          this.getConvertionValue = 0;
        }
      } else {
        this.getConvertionValue = 0;
      }
      this.data.ConvertionValue = this.getConvertionValue;
      this.data.Weight = this.Weight;
    }

    gradeOptions = ["", "A", "AB", "B", "BC", "C", "Standar PT Dan Liris (Golongan III & IV)", "All"];
}

