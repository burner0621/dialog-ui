import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
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
        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else {
            formData.append("fileUpload", fileList[0]);
 
            var endpoint = 'master/upload-uoms';
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
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki. Silahkan lihat Error Log untuk melihat detil dari error tersebut.");
                        this.list();
                    }
                    else if (response.status == 404) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format Kolom: Unit");
                    }
                    else if (response.status == 201) {
                        alert("Data Berhasil Diupload");
                        this.list();

                    }
                })
        }
    }

}
