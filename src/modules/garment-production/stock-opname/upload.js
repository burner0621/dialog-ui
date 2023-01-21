import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';

@inject(Router, Service)
export class Create {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        editText: "Upload"
    };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 8
        }
    };

    cancelCallback() {
        this.router.navigateToRoute('list');
    }

    editCallback() {
        let e = {};
        let fileInput = document.getElementById("fileCsv");
        let fileList = fileInput.files;
        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else {
            this.service.upload(fileList[0])
                .then(result => {
                    alert("Data Berhasil Diupload");
                    this.cancelCallback();
                })
                .catch(error => {
                    e.upload = "";
                    for (const key in error) {
                        if (error.hasOwnProperty(key)) {
                            const element = error[key];
                            e.upload += `${key} : ${element}\n`;
                        }
                    }
                    this.error = e;
                    alert("Gagal");
                });
        }
    }
}