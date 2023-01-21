import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { VBRealizationService } from './vb-realization-service';
import { Dialog } from '../../../au-components/dialog/dialog';
import { AlertView } from './custom-dialog-view/alert-view';

@inject(Router, Service, Dialog, VBRealizationService)
export class View {
    constructor(router, service, dialog, vbRealizationService) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;
        this.vbRealizationService = vbRealizationService;
        this.data = {}
    }

    async activate(params) {
        let id = params.id;
        this.data.vbRealization = await this.vbRealizationService.getById(id);



        // if (this.data.Status == "POSTED") {
        //     this.hasPosting = false;
        //     this.editCallback = false;
        //     this.deleteCallback = false;
        // } else {
        //     this.hasPosting = true;
        // }

    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    // editCallback(event) {
    //     this.router.navigateToRoute('edit', { id: this.data.Id });
    // }

    postingCallback(event) {
        this.dialog.prompt('Transaksi yang sudah di POSTING tidak dapat diubah dan dihapus. Apakah anda yakin?', 'Posting Jurnal Transaksi')
            .then(response => {
                if (response.ok) {
                    this.service.posting(this.data)
                        .then(result => {
                            this.list();
                        });
                }
            });
    }

    // deleteCallback(event) {
    //     this.dialog.prompt('Apakah anda yakin akan menghapus data ini?', 'Hapus Data Jurnal Transaksi')
    //         .then(response => {
    //             if (response.ok) {
    //                 this.service.delete(this.data)
    //                     .then(result => {
    //                         this.list();
    //                     });
    //             }
    //         });
    // }

    sendToCashierCallback(event) {

        if (this.data.vbRealization.Header.Id)
            this.service
            .verified(this.data.vbRealization.Header.Id)
            .then(result => {
                alert("Data berhasil diubah");
                this.list();
            })
            .catch(e => {
                this.error = e;
            });
        else {
            this.error = {
                vbRealization: "ID Realisasi VB tidak dapat ditemukan"
            }
        }
    }

    rejectCallback(event) {
        // this.service
        //   .reject(this.data)
        //   .then(result => {
        //     alert("Data berhasil dibuat");
        //     this.router.navigateToRoute(
        //       "create",
        //       {},
        //       { replace: true, trigger: true }
        //     );
        //   })
        //   .catch(e => {
        //     this.error = e;
        //   });

        if (this.data.vbRealization && this.data.vbRealization.Header.Id) {
            this.dialog.show(AlertView)
                .then((response) => {

                    if (!response.wasCancelled) {
                        var body = {
                            Reason: response.output.Remark
                        }

                        this.service
                            .reject(this.data.vbRealization.Header.Id, body)
                            .then(result => {
                                alert("Data berhasil diubah");
                                this.list();
                            })
                            .catch(e => {
                                this.error = e;
                            });
                    }
                });
        } else {
            this.error = {
                vbRealization: "Data atau ID Realisasi VB tidak dapat ditemukan"
            }
        }
    }
}