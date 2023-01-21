import { inject, bindable, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Upload {
    @bindable error = {};

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] };
        console.log(this.data);
    }

    destinationAreas = ["PACKING", "FINISHING", "PRINTING", "LAIN-LAIN","KOTOR","INSPECTING WEAVING"];

    activate(params) {

    }

    list() {
        this.router.navigateToRoute('list');
    }

    cancelCallback(event){
        this.list();
    }

    saveCallback(event) {
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var destination = this.data.from;
        var date = this.data.date;
        this.data.date = new Date().toLocaleDateString('en-US', {
            month: '2-digit',day: '2-digit',year: 'numeric'});
        var fileList = fileInput.files;
        if (fileList[0] == undefined) {
            e.file = "File Csv harus ditambahkan";
            this.error = e;
        }else {
            formData.append("fileUpload", fileList[0]);
            formData.append("date", date);
            //formData.append("destination", destination);

            var endpoint = 'output-inventory-weaving/upload-output';
            var request = {
                method: 'POST',
                headers: {},
                body: formData
            };

            this.service.endpoint.client.fetch(endpoint, request)
                .then(response => {
                    if (response.status == 200) {
                        var getRequest = this.service.endpoint.client.fetch(endpoint, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki. Silahkan lihat file 'Error Log' untuk melihat detail error.");
                        this.list();
                    }
                    else if (response.status == 400) {
                        alert ("Urutan format kolom Csv tidak sesuai. \nFormat Kolom: konstruksi,benang,anyaman,lusi,pakan,lebar,jl,jp,al,ap,grade,piece,qty,qtypiece,barcode,productionorderdate.");
                    }
                    else if (response.status == 201) {
                        console.log(response);
                        alert("Data Berhasil diupload");
                        this.list();
                    }
                    else if (response.status == 500){
                        alert("Terdapat data yang belum ada di penyimpanan. Cek Barcode dan/atau Construction. \natau ada kesalahan penyimpanan.");
                    }

                    console.log(response);

                })
        }
    }
}