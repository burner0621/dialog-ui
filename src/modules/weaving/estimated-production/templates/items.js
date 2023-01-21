import {
  inject,
  BindingEngine
} from "aurelia-framework";
import moment from "moment";

@inject(BindingEngine)
export class Items {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.data = context.data;
    this.error = context.error;

    // if (this.data.FabricConstructionDocument) {
    //   this.data.ConstructionNumber = this.data.FabricConstructionDocument.ConstructionNumber;
    //   parseFloat(
    //     (this.data.TotalGramEstimation =
    //       this.data.WholeGrade * this.data.FabricConstructionDocument.TotalYarn)
    //   );
    //   this.data.TotalYarn = parseFloat(
    //     this.data.FabricConstructionDocument.TotalYarn
    //   );
    // }
    if (this.data.DateOrdered) {
      this.data.Period = moment(this.data.DateOrdered).format("MMMM YYYY");
    }
    
    this.options = context.context.options;
    this.readOnly = context.options.readOnly;
  }
}
