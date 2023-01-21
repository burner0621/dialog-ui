import { inject, bindable, computedFrom } from 'aurelia-framework';
var UnitLoader = require('../../../loader/unit-loader');

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable selectedUnit;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  }
  @computedFrom("data._id")
  get isEdit() {
    return (this.data._id || '').toString() != '';
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
    if(this.data.unit){
      this.selectedUnit=this.data.unit;
      // if(this.selectedUnit.division){
      // this.data.unit.name=this.selectedUnit.division.Name;
      // }
    }
  }

  selectedUnitChanged(newdata) {
        var _selectedUnit = newdata;
        if (_selectedUnit){
            this.data.unitId = _selectedUnit._id || _selectedUnit.Id || "" ;
            this.data.unit=_selectedUnit;
            this.data.unit._id=_selectedUnit._id || _selectedUnit.Id || "";
            this.data.unit.name=_selectedUnit.name || _selectedUnit.Name || "";
            this.data.unit.code=_selectedUnit.code || _selectedUnit.Code || "";
            
            this.data.unit.division=_selectedUnit.division || _selectedUnit.Division || {};
            if(this.data.unit.division){
              this.data.unit.division._id=this.data.unit.division.Id||"";
              this.data.unit.division.name= this.data.unit.division.Name|| "";
              this.data.unit.division.code=this.data.unit.division.Code|| "";

            }

          
        }
    }

  get unitLoader() {
        return UnitLoader;
    }
  
  unitView = (unit) => {
        return unit.division ?`${unit.division.Name} - ${unit.name}` : `${unit.Division.Name} - ${unit.Name}`
    }
} 
