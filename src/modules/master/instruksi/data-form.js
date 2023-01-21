import { inject, bindable, computedFrom } from 'aurelia-framework';

export class DataForm {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable isEdit;

    constructor() { }

    activate() { }

    attached() {
    }

    bind() { }

    stepInfo = {
        columns: [
            { header: "No.", value: "Index" },
            { header: "Step", value: "Step" },
            { header: "Area", value: "ProcessArea" }
        ],
        onAdd: function () {
            this.data.Steps = this.data.Steps || [];
            this.data.Steps.push({});
        }.bind(this),
        onRemove: function () {
        }.bind(this)
    };

    moveItemUp(event) {
        let steps = this.data.Steps;
        if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex > 0) {
            let selectedSteps = steps.splice(steps[0].selectedIndex, 1);
            steps.splice(steps[0].selectedIndex - 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].selectedIndex - 1);
        }
    }

    moveItemDown(event) {
        let steps = this.data.Steps;
        if (steps && steps.length > 0 && steps[0].selectedIndex != null && steps[0].selectedIndex < steps.length) {
            let selectedSteps = steps.splice(steps[0].selectedIndex, 1);
            steps.splice(steps[0].selectedIndex + 1, 0, selectedSteps[0])
            this.setCurrentIndex(steps[0].selectedIndex + 1);
        }
    }

}