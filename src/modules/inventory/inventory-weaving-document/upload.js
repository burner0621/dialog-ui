import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Create {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        //this.data = {};
        this.data = { items: [] };
        console.log(this.data);
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
        var source = this.data.from;
        var date = this.data.date;
        // this.data.date = new Date().toLocaleDateString('en-US', {
        //     month: '2-digit',day: '2-digit',year: 'numeric'});
        var fileList = fileInput.files;
        if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else {
            formData.append("fileUpload", fileList[0]);
            formData.append("date", date);
            formData.append("source", source);

 
            var endpoint = 'Inventory-weaving/upload';
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };

            this.service.endpoint.client.fetch(endpoint, request)
                .then(response => {
                    if (response.status == 200) {
                        var getRequest =this.service.endpoint.client.fetch(endpoint, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki. Silahkan lihat Error Log untuk melihat detil dari error tersebut.");
                        this.list();
                    }
                    else if (response.status == 404) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format Kolom: nota,benang,type,lusi,pakan,lebar,jlusi,jpakan,alusi,apakan,sp,grade,jenis,piece,meter,barcode,tgl");
                        this.upload();
                    }
                    else if (response.status == 201) {
                        console.log(response);
                        alert("Data Berhasil Diupload");
                        this.list();
                    }
                    else if (response.status == 500)
                    {
                        //var message = response.message;
                        alert("Nota Sudah Pernah di Input");
                        this.upload();
                    }

                    console.log(response);
                
                })
        }
    }

}
