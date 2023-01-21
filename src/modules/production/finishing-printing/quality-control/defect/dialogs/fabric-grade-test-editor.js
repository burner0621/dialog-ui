import { inject, useView, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
@useView("modules/production/finishing-printing/quality-control/defect/dialogs/fabric-grade-test-editor.html")
export class FabricGradeTestEditor {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }
    PcsNo;
    activate(data) {
        this.data = data;
        this.PcsNo = this.data && this.data.PcsNo ? this.data.PcsNo : "";
        this.PcsLength = this.data && this.data.Length ? this.data.Length : 0;
        this.PcsWidth = this.data && this.data.Width ? this.data.Width : 0;
    }

    saveCallback() {
        var action = Promise.resolve(this.PcsNo);

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