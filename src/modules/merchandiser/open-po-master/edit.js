import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Edit {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.error = {};
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.read(id);

        if (this.data) {
            this.selectedPRNo = {
                PRNo: this.data.PRNo,
            };

            if (this.data.Items) {
                this.data.Items = this.data.Items.filter(i => i.IsOpenPO === true);
            }
        }
    }

    backToView() {
        this.router.navigateToRoute('view', { id: this.data.Id });
    }

    cancelCallback(event) {
        this.backToView();
    }

    saveCallback(event) {
        const items = (this.data.Items || []).filter(i => i.IsOpenPO);
        const ids = (this.data.Items || []).filter(i => i.IsOpenPO && i.IsSave).map(i => i.Id);

        if (ids.length) {
            let errorCount = 0;
            this.error.Items = [];

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                this.error.Items[i] = {};
                if (item.IsOpenPO && item.IsSave && item.IsApprovedOpenPOMD) {
                    errorCount++;
                    this.error.Items[i] = {
                        PO_SerialNumber: "Open PO Master sudah di-Approve Md"
                    };
                }
            }

            if (errorCount > 0) {
                alert("Ada kesalah, cek item!")
            } else {
                if (confirm("Batalkan Open PO Master?")) {
                    const jsonPatch = [
                        { op: "replace", path: `/IsOpenPO`, value: false },
                        { op: "replace", path: `/OpenPOBy`, value: null },
                        { op: "replace", path: `/OpenPODate`, value: new Date('0001-01-01') },
                    ];

                    this.service.patch({ id: JSON.stringify(ids) }, jsonPatch)
                        .then(result => {
                            alert("Berhasil Membatalkan Open PO Master");
                            this.backToView();
                        })
                        .catch(e => {
                            this.error = e;
                        });
                }
            }
        } else {
            alert("Tidak ada nomor PO yang dipilih.");
        }
    }
}
