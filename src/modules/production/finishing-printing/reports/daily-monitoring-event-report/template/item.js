import { inject, bindable, computedFrom } from 'aurelia-framework'
export class CartItem {
    @bindable legalLossesData;
    @bindable unUtilisedCapacityData;
    @bindable processDrivenData;
    @bindable manufacturingPerformanceData;
    activate(context) {

        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.contextOptions = context.context.options;
        this.readOnly = context.options.readOnly;

        this.legalLossesData = this.data.LegalLosses;
        this.unUtilisedCapacityData = this.data.UnUtilisedCapacityLosses;
        this.processDrivenData = this.data.ProcessDrivenLosses;
        this.manufacturingPerformanceData = this.data.ManufacturingPerformanceLosses;
    }
    legalLossesColumns = [""];
    unUtilisedCapacityColumns = [""];
    processDrivenColumns = [""];
    manufacturingPerformanceColumns = [""];
    controlOptions = {
        control: {
            length: 12
        }
    };

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

}