import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import { Dialog } from '../../../au-components/dialog/dialog';

@inject(Router, Service, Dialog)
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

        for (let item of this.data.items) {
            this.items.push({
                unitName: item.unit.name,
                productName: item.product.name,
                quantity: item.quantity,
                uom: item.uom.unit,
                price: item.price
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
        this.dialog.prompt('Apakah anda yakin mau menghapus data ini?', 'Hapus Data Penyerahan Dokumen Disposisi Pembelian ke Verifikasi')
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