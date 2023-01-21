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
        this.isFlyer = true;

        if (this.data.Output) {
            this.output = this.data.Output;
        }

        if (this.data.BadOutput) {
            this.badOutput = this.data.BadOutput;
        }
        if (this.data.DeliveryTotal) {
            this.deliveryTotal = this.data.DeliveryTotal;
        } else {
            if (this.isFlyer) {
                var MachineSpinning = this.MachineSpinnings.find(x => x.Id == this.data.MachineSpinning.Id);
                this.deliveryTotal = MachineSpinning.Delivery;
                this.data.DeliveryTotal = this.deliveryTotal;
            }

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
        if (this.processType == "Flyer") {
            this.flyerFormula(MachineSpinning);
        }
    }

    flyerFormula(MachineSpinning) {

        let spd = MachineSpinning.Delivery - this.data.Spindle;

        if (this.data.MachineSpinning.UomUnit.toUpperCase() == "KG") {
            this.data.Bale = this.data.Output / 181.44;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "RND") {
            this.data.Bale = this.data.Output * ((28.5 * (22 / 7) * this.CountConfig.TotalDraft * this.CountConfig.Grain * (MachineSpinning.Delivery - this.data.Spindle)) / 76776006142.08); // 1000 * 0.914 * 30 * 15.4321 * 453.6 * 400
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "MTR") {
            this.data.Bale = (((MachineSpinning.Delivery - this.data.Spindle) * this.data.Output) / (768 * this.CountConfig.Ne)) / 400;
        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "HANK") {
            this.data.Bale = (this.data.Output * spd / (this.CountConfig.Ne * 400));
            // this.data.Bale = (this.data.Output * 0.01 / this.CountConfig.Ne) / 400;

        } else if (this.data.MachineSpinning.UomUnit.toUpperCase() == "COUNTER") {
            this.data.Bale = ((this.data.Output * 28.5 * 3.14 * this.CountConfig.TotalDraft) * (this.data.DeliveryTotal - this.data.Spindle)) / (this.CountConfig.Ne * 1000 * 768 * 400);
        } else {
            this.data.Bale = this.data.Output;
        }
        // this.data.Eff = this.data.Bale * 100 / (((this.CountConfig.RPM * 1440 * (this.data.DeliveryTotal - this.data.Spindle)) / (this.CountConfig.Ne * 12096000 * this.CountConfig.TPI)) / 3); // 60 * 24 & 36 * 840 * 400
        this.data.Eff = (this.data.Bale / (MachineSpinning.CapacityPerHour / 3)) * 100;
    }

    controlOptions = {
        control: {
            length: 12
        }
    };

}
