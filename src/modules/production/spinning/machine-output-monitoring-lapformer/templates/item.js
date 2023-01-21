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
        this.isWinder = false;
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
        if (this.processType == "Lap Former") {
            this.lapFormerFormula(MachineSpinning);
        }
    }

    lapFormerFormula(MachineSpinning) {
        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "YARD") {
            // this.data.Bale = ((this.data.Output / 840) / this.CountConfig.Ne) / 400;
            this.data.Bale = ((this.data.Output * 10 * MachineSpinning.Delivery) / (840 * this.CountConfig.Ne * 400));
        } else {
            this.data.Bale = this.data.Output;
        }
        this.data.Eff = (this.data.Bale / (MachineSpinning.CapacityPerHour / 3)) * 100;
        // this.data.Eff = this.data.Bale * 100 / ((this.CountConfig.RPM * MachineSpinning.Delivery * 1440) / (((7000 / 840) / this.CountConfig.Grain) * 307200)); // 24 * 60 && 768 * 400
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

}
