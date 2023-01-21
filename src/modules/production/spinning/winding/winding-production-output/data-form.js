import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
import {Service} from './service';

@inject(BindingEngine, Element,Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};

    shiftOptions = ['Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];
    
    spinningUnitFilter = {
        "division.name": "SPINNING"
    }
    constructor(bindingEngine, element,service) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }
    @computedFrom("data._id")
    get isEdit() {
        return (this.data._id || '').toString() != '';
    }

    spinningChanged(e){
        var selectedUnit = e.detail;
        if(selectedUnit){
            this.data.unitId = selectedUnit._id ? selectedUnit._id : "";
            if (!this.readOnly) {
                this.data.machine={};
                this.machineChanged({});
            }
            if(this.data.unitId){
                this.filter = {
                    unitId : this.data.unitId
                };
            }
        }
    }

    machineChanged(e) {
        var selectedmachine= e.detail || {};
        if (selectedmachine){
            this.data.machineId = selectedmachine._id ? selectedmachine._id : "";
            if(this.data.lotMachine==undefined|| this.data.lotMachine==null )
            {
                if(this.data.machineId!=""&&this.data.productId!=""&&this.data.machineId!=undefined&&this.data.productId!=undefined){
                    this.service.getLot(this.data.productId,this.data.machineId).then(result => {
                    this.data.lotMachine=result[0];
                    this.data.lotMachine.lot=result[0].lot;
                }).
                catch(e => {
                this.error = e;
            })
                    
                }
            }
            else if((this.data.machineId==""|| this.data.machineId==undefined)&&this.data.lotMachine!=undefined) {
                this.data.lotMachine.lot="";
                this.data.lotMachine=undefined;
            }
            
        }
        
       

    }

    threadChanged(e) {
        var selectedThread = e.detail || {};
        var lot='';
        if (selectedThread) {
            this.data.productId=selectedThread._id? selectedThread._id :"";
            if(this.data.lotMachine==undefined|| this.data.lotMachine==null )
            {
                if(this.data.machineId!=""&&this.data.productId!=""&&this.data.machineId!=undefined&&this.data.productId!=undefined){
                    this.service.getLot(this.data.productId,this.data.machineId).then(result => {
                        
                            this.data.lotMachine=result[0];
                            this.data.lotMachine.lot=result[0].lot;
                        
                }).
                catch(e => {
                this.error = e;
            })
                    
                }
                
            }else if((this.data.productId==""|| this.data.productId==undefined)&&this.data.lotMachine!=undefined) {
                    this.data.lotMachine.lot="";
                    this.data.lotMachine=undefined;
                }
            
        }
     }
}