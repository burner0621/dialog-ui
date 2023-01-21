import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.title = "Ubah Detail Status Order";
        this.errors = [];
    }

    formOptions = {
        saveText: "Simpan",
        cancelText: "Kembali"
    }

    textOptions = {
        label: {
            length: 3,
            align: "left"
        },
        control: {
            length: 3,
            align: "right"
        }
    }

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: false
    }

    columns = [
        "No.", "No. SPP", "Konstruksi", "Jenis Proses",
        "Motif", "Warna", "Buyer", "Sales", "Tgl Terima Order",
        "Permintaan Delivery", "Posisi Kanban Terakhir",
        "Perubahan Tanggal Delivery", "Alasan Perubahan Tanggal Delivery",
        "Panjang SPP (m)", "Sisa Belum Turun Kanban (m)",
        "Belum Produksi (m)", "Sedang Produksi (m)", "Sedang QC (m)", "Sudah Produksi (m)",
        "Kirim Ke Gudang (m)", "Kirim Ke Buyer (m)", "Sisa Belum Kirim Ke Buyer (m)"
    ];

    async activate(params) {
        this.year = params.year;
        this.month = params.month;
        this.orderType = params.orderType ? params.orderType : "-";

        this.info = {
            year: this.year,
            month: this.month,
            orderType: this.orderType
        };

        this.data = await this.service.detail(this.info);

        this.initData = JSON.parse(JSON.stringify(this.data));
    }

    saveCallback(event) {
        let histories = [];

        this.errors = [];
        let hasError = false;

        for (let d of this.data) {
            /* Validation */
            let item = this.initData.find(p => p.orderNo == d.orderNo);
            let error = {};

            if (item.deliveryDateCorrection && (!d.deliveryDateCorrection || d.deliveryDateCorrection == null || d.deliveryDateCorrection == "Invalid Date"))
                error.deliveryDateCorrection = "Perubahan Tanggal Delivery harus diisi";
            else if (d.deliveryDateCorrection && d.deliveryDateCorrection < new Date(d.deliveryDate))
                error.deliveryDateCorrection = "Perubahan Tanggal Delivery harus lebih besar dari tanggal sebelumnya";

            if (d.deliveryDateCorrection && d.deliveryDateCorrection != null && (!d.reason || d.reason === '')) {
                error.reason = "Alasan harus diisi";
            }

            this.errors.push(error);

            /* End of Validation */

            /* Build Data */

            if (d.deliveryDateCorrection && (new Date(d.deliveryDateCorrection).toString() != new Date(item.deliveryDateCorrection).toString() || (d.reason != "" && d.reason != item.reason))) {
                histories.push({
                    productionOrderNo: d.orderNo,
                    deliveryDateCorrection: d.deliveryDateCorrection,
                    reason: d.reason
                });
            }

            /* End of Build Data */
        }

        for (let error of this.errors) {
            if (Object.getOwnPropertyNames(error).length > 0) {
                hasError = true;
                break;
            }
        }

        if (!hasError) {
            if (histories.length > 0)
                this.service.createHistory(histories)
                    .then(result => {
                        alert("Data berhasil dibuat");
                        this.cancelCallback();
                    })
                    .catch(e => {
                        if (e.statusCode == 500) {
                            alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                        } else {
                            this.error = e;
                        }
                    })
            else
                alert("Tidak ada data yang berubah");
        }
        else
            alert("Terdapat data yang tidak valid, mohon dicek kembali");
    }

    cancelCallback(event) {
        this.router.navigateToRoute('view', { year: this.year, month: this.month, orderType: this.orderType });
    }
}