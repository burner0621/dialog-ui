import { bindable } from 'aurelia-framework'
var MachineLoader = require('../../../../loader/machines-loader');

export class MachineItem {
  @bindable machine;

  activate(context) {
    //console.log("machine-Item")
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.machine = this.data;
    this.filterMachine = {
      "UnitDivisionName": "FINISHING & PRINTING"
    }
  }

  get machineLoader() {
    return MachineLoader;
  }

  machineChanged(newValue, oldValue) {
    if (this.machine) {

      this.data.MachineId = this.machine.Id;
      this.data.Name = this.machine.Name;
      this.data.Code = this.machine.Code;
      console.log(this.data)
    } else {
      this.data = null;
      this.machine = {};
    }
  }

}