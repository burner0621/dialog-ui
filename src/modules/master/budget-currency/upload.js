import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var moment = require('moment');

@inject(Router, Service)
export class Create {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
    }

    auOption = {
        label: {
            length: 3,
            align: "left"
        },
        control: {
            length: 4
        }
    }

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event) {
        this.list();
    }

    saveCallback(event) {
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var fileList = fileInput.files;

        if (!this.data.date) {
            e.date = "Tanggal harus di isi";
            this.error = e;
        }
        if(this.data.date > new Date()){
            e.date = "Tanggal lebih dari hari ini";
            this.error = e;
        }
        
        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else if (Object.getOwnPropertyNames(e) == 0) {
            formData.append("date", moment(this.data.date).format("YYYY-MM-DD"));
            formData.append("fileUpload", fileList[0]);

            var endpoint = 'master/upload-budget-currencies';
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };
            this.service.endpoint.client.fetch(endpoint, request)
                .then(response => {
                    if (response.status == 200) {
                        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki. Silahkan lihat Error Log untuk melihat detail dari error tersebut.");
                        this.list();
                    }
                    else if (response.status == 404) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format Kolom: mata uang, kurs,keterangan");
                    }
                    else if (response.status == 201) {
                        alert("Data Berhasil Diupload");
                        this.list();

                    }
                })
        }
    }

}
