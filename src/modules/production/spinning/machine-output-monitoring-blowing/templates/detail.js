import { bindable } from 'aurelia-framework';



// @inject(BindingEngine)
export class Item {
    
    @bindable output;
    @bindable data;
    @bindable readOnly;
    @bindable uomUnit;

    
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = context.options.readOnly;
        
        this.uomUnit =  context.context.options.UomUnit;
        
        if (this.data.Output) {
            this.output = this.data.Output;
        }


        
    }

    outputChanged(n, o) {

        this.data.Output = this.output;
        if (o != null && o != undefined && n != o) {
            // this.baseMathFormula();
        }

    }

    badOutputChanged(n, o) {

        this.data.BadOutput = this.badOutput;
        if (o != null && o != undefined && n != o && this.isBlowing) {
            this.baseMathFormula();
        }

    }

    deliveryTotalChanged(n, o) {

        this.data.DeliveryTotal = this.deliveryTotal;
        if (o != null && o != undefined && n != o && this.isFlyer) {
            this.baseMathFormula();
        }

    }

    spindleChanged(n, o) {

        this.data.Spindle = this.spindle;
        if (o != null && o != undefined && n != o && this.isFlyer) {
            this.baseMathFormula();
        }

    }

    wasteChanged(n, o) {

        this.data.Waste = this.waste;
        if (o != null && o != undefined && n != o && this.isWinder) {
            this.baseMathFormula();
        }

    }

    drumTotalChanged(n, o) {

        this.data.DrumTotal = this.drumTotal;
        if (o != null && o != undefined && n != o && this.isWinder) {
            this.baseMathFormula();
        }

    }

    baseMathFormula() {
        
        if (this.processType == "Blowing") {
            this.blowingFormula(this.MachineSpinning);
        } 
    }

    blowingFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = (this.data.Output / 181.44) * MachineSpinning.Delivery;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "GRAM") {
            this.data.Bale = this.data.Output / (1000 * 181.44);
            // this.data.Bale = (this.data.Output / 181.44) * MachineSpinning.Delivery;
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = this.data.Bale * 100 / ((this.CountConfig.RPM * 345.6 * (22 / 7) * MachineSpinning.Delivery) / (this.CountConfig.Ne * 307200)); // 60 * 24 * 0.24 & 400 * 768
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

}
