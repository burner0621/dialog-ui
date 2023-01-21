import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import PurchasingDocumentExpeditionService from '../shared/purchasing-document-expedition-service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, PurchasingDocumentExpeditionService, Dialog)
export class View {
    controlOptions = {
        label: {
            length: 5
        },
        control: {
            length: 6
        }
    };

    constructor(router, service, dialog) {
        this.router = router;
        this.service = service;
        this.dialog = dialog;

        this.columns = ['Unit', 'Nama Barang', 'Jumlah', 'UOM', 'Harga'];
    }

    async activate(params) {
        let id = params.id;
        this.data = await this.service.getById(id);

        this.items = [];

        for (let item of this.data.Items) {
            this.items.push({
                unitName: item.UnitName,
                productName: item.ProductName,
                quantity: item.Quantity,
                uom: item.Uom,
                price: item.Price
            });
        }
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    deleteCallback(event) {
        this.dialog.prompt('Apakah anda yakin mau menghapus data ini?', 'Hapus Data Penyerahan Dokumen Pembelian ke Verifikasi')
            .then(response => {
                if (response.ok) {
                    this.service.delete(this.data)
                        .then(result => {
                            this.cancelCallback();
                        });
                }
            });
    }
}
