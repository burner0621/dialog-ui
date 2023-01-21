import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/packing-sku-inventory/fabric-quality-control/dialogs/fabric-grade-test-editor.html")
export class FabricGradeTestEditor {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }
    PcsNo;
    activate(data) {
        this.data = data;
        this.PcsNo = this.data && this.data.pcsNo ? this.data.pcsNo : "";
        this.PcsLength = this.data && this.data.length ? this.data.length : 0;
        this.PcsWidth = this.data && this.data.width ? this.data.width : 0;
    }

    saveCallback() {
        var action = Promise.resolve(this.pcsNo);

        action
            .then(result => {
                this.dialogController.ok({
                    PcsNo: this.PcsNo,
                    PcsLength: this.PcsLength,
                    PcsWidth: this.PcsWidth
                });
            })
            .catch(error => {
                this.error = error;
            });
    }
}