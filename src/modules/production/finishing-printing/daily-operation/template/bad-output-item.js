import { bindable } from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
var BadOutputReasonLoader = require('../../../../../loader/bad-output-reason-loader');
var MachineLoader = require('../../../../../loader/dyeing-printing-machines-loader');

const resource = 'finishing-printing/daily-operations';

export class BadOutputItem {
    @bindable badOutputReason;
    @bindable machine;
    async activate(context) {
        this.data = context.data;
        this.error = typeof context.error === 'object' ? context.error : {};
        console.log(this.error);
        this.options = context.options;
        this.badOutputReason = this.data.BadOutput;
        this.filter = context.context.options.reason;
        console.log(this.filter);
        // this.machineFilter=context.context.options.machineCode;
        this.machine = this.data.Machine;
        // this.data.precentage = this.error && this.error.length ? this.data.length : this.data.precentage;
        // this.data.length = this.data.length && !this.error ? this.data.length : this.data.precentage;
        this.data.Length = this.data.hasOwnProperty("Length") ? this.data.Length : this.data.hasOwnProperty("Precentage") ? this.data.Precentage : 0;

        this.data.Action = this.data.hasOwnProperty("Action") ? this.data.Action : this.filter.Action;
        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("production");

        // var filterKanban={
        //     "kanban.code":this.machineFilter.kanban,
        //     _deleted:false,
        //     type:"input"
        // };
        // var _machineCode=[];
        // await endpoint.find(resource, { filter: JSON.stringify(filterKanban)})
        // .then((result) => {
        //     for(var item of result.data){
        //         if(_machineCode.length>0){
        //             var dup=_machineCode.find(mc=>mc==item.machine.code);
        //             if(!dup)
        //                 _machineCode.push(item.machine.code);
        //         }
        //         else{
        //             _machineCode.push(item.machine.code);
        //         }
        //     }
        //     _machineCode.push(this.machineFilter.code);
        //     this.filterMachine={
        //         code:{
        //             $in:_machineCode
        //         }
        //     };
        // });

        // if(this.machineFilter)
        this.filterMachine = {
            "UnitDivisionName": "FINISHING & PRINTING"
        };
        this.selectBadOutput = ["Code", "Reason", ""];
        this.selectMachine = ["Code", "Name"];
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

    get machineLoader() {
        return MachineLoader;
    }

    actionList = ["", "Reproses", "Digudangkan", "Diavalkan"];

    get badOutputReasonLoader() {
        return BadOutputReasonLoader;
    }

    badOutputReasonChanged(newValue, oldValue) {
        if (newValue) {
            this.data.BadOutput = newValue;
            // this.data.BadOutputReason.BadOutputId=newValue.Id;
        } else {
            this.data.BadOutput = {};
            this.badOutputReason = {};
            // delete this.data.BadOutputReason.Id;
        }
    }

    machineChanged(newValue, oldValue) {
        if (newValue) {
            this.data.Machine = newValue;
        } else {
            this.data.Machine = {};
            // delete this.data.Machine.Id;
        }
    }
}