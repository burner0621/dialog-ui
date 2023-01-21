import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { AuthService } from "aurelia-authentication";

@inject(Router, Service, AuthService)
export class View {

    constructor(router, service, authService) {
        this.router = router;
        this.service = service;
        this.authService = authService;
    }

    async activate(params, routeConfig, navigationInstruction) {
        const instruction = navigationInstruction.getAllInstructions()[0];
        const parentInstruction = instruction.parentInstruction;
        this.title = parentInstruction.config.title;
        this.type = parentInstruction.config.settings.type;

        if (this.authService.authenticated) {
            this.me = this.authService.getTokenPayload();
        }
        else {
            this.me = null;
        }

        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPRNo = {
                PRNo: this.data.PRNo,
            };

            if (this.data.Items) {
                switch (this.type) {
                    case "kabag_md":
                        this.data.Items = this.data.Items.filter(i => i.IsOpenPO && !i.IsApprovedOpenPOMD);
                        break;
                    case "purchasing":
                        this.data.Items = this.data.Items.filter(i => i.IsOpenPO && i.IsApprovedOpenPOMD && !i.IsApprovedOpenPOPurchasing);
                        break;
                    case "kadiv_md":
                        this.data.Items = this.data.Items.filter(i => i.IsOpenPO && i.IsApprovedOpenPOMD && i.IsApprovedOpenPOPurchasing && !i.IsApprovedOpenPOKadivMd);
                        break;
                }
    
                if (this.data.Items.length < 1) {
                    this.editCallback = null;
                }
            } else {
                this.editCallback = null;
            }
        }
    }

    backToList() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.backToList();
    }

    saveCallback(event) {
        if (confirm("Approve Open PO Master?")) {
            let ids = [];

            const jsonPatch = [];
            switch (this.type) {
                case "kabag_md":
                    jsonPatch.push(
                        { op: "replace", path: `/IsApprovedOpenPOMD`, value: true },
                        { op: "replace", path: `/ApprovedOpenPOMDBy`, value: this.me.username },
                        { op: "replace", path: `/ApprovedOpenPOMDDate`, value: new Date() },
                    );
                    ids = (this.data.Items || []).filter(i => i.IsOpenPO && !i.IsApprovedOpenPOMD).map(i => i.Id);
                    break;
                case "purchasing":
                    jsonPatch.push(
                        { op: "replace", path: `/IsApprovedOpenPOPurchasing`, value: true },
                        { op: "replace", path: `/ApprovedOpenPOPurchasingBy`, value: this.me.username },
                        { op: "replace", path: `/ApprovedOpenPOPurchasingDate`, value: new Date() },
                    );
                    ids = (this.data.Items || []).filter(i => i.IsOpenPO && i.IsApprovedOpenPOMD && !i.IsApprovedOpenPOPurchasing).map(i => i.Id);
                    break;
                case "kadiv_md":
                    jsonPatch.push(
                        { op: "replace", path: `/IsApprovedOpenPOKadivMd`, value: true },
                        { op: "replace", path: `/ApprovedOpenPOKadivMdBy`, value: this.me.username },
                        { op: "replace", path: `/ApprovedOpenPOKadivMdDate`, value: new Date() },
                    );
                    ids = (this.data.Items || []).filter(i => i.IsOpenPO && i.IsApprovedOpenPOMD && i.IsApprovedOpenPOPurchasing && !i.IsApprovedOpenPOKadivMd).map(i => i.Id);
                    break;
            }

            this.service.patch({ id: JSON.stringify(ids) }, jsonPatch)
                .then(result => {
                    alert("Berhasil Approve Open PO Master");
                    this.backToList();
                })
                .catch(e => {
                    this.error = e;
                });
        }
        return;
    }
}
