import { bindable } from 'aurelia-framework';



// @inject(BindingEngine)
export class Item {
    @bindable isBlowing;
    @bindable isWinder;
    @bindable isFlyer;
    @bindable output;
    @bindable data;
    @bindable readOnly;
    @bindable badOutput;
    @bindable deliveryTotal;
    @bindable spindle;
    @bindable waste;
    @bindable drumTotal;

    CountConfig = {};
    MachineSpinnings = {};
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = context.options.readOnly;
        this.processType = context.context.options.ProcessType;
        this.CountConfig = context.context.options.CountConfig;
        this.MachineSpinnings = context.context.options.MachineSpinnings;
        this.isEdit = this.context.context.options.isEdit;

        this.isBlowing = false;
        this.isWinder = true;
        this.isFlyer = false;

        if (this.data.Output) {
            this.output = this.data.Output;
        }

        if (this.data.BadOutput) {
            this.badOutput = this.data.BadOutput;
        }

        if (this.data.DeliveryTotal) {
            this.deliveryTotal = this.data.DeliveryTotal;
        }

        if (this.data.Spindle) {
            this.spindle = this.data.Spindle;
        }

        if (this.data.Waste) {
            this.waste = this.data.Waste;
        }

        if (this.data.DrumTotal) {
            this.drumTotal = this.data.DrumTotal;
        }


    }

    outputChanged(n, o) {

        this.data.Output = this.output;
        if (o != null && o != undefined && n != o) {
            this.baseMathFormula();
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
        var MachineSpinning = this.MachineSpinnings.find(x => x.Id == this.data.MachineSpinning.Id);
        if (this.processType == "Winder") {
            this.winderFormula(MachineSpinning);
        }
    }

    winderFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "CONE") {
            this.data.Bale = this.data.Output / (181.44 / this.CountConfig.ConeWeight);
        } else {
            this.data.Bale = this.data.Output;
        }
        // this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 1440 * this.data.DrumTotal) / (this.CountConfig.Ne * 307200)) / 3); // 60 * 24 & 768 * 400
        this.data.Eff = (this.data.Bale / (MachineSpinning.CapacityPerHour / 3)) * 100;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

}
