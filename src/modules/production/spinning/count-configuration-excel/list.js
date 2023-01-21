import { inject,bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';


@inject(Router, Service)
export class List {
@bindable type;
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.title = "Export Excel Konfigurasi Count";
    }
    typeOptions=["Blowing","Carding", "Lap Former", "Combing", "Pre-Drawing", "Mix Drawing", "Drawing", "Finish Drawing", "Flyer", "Ring Spinning", "Winder"];
    
    fillValues() {
        console.log(this.type)
        this.info.type = this.type;
    }
    info = { page: 1,size:25};
    exportExcel() {
        this.fillValues();
        this.service.generateExcel(this.info);
    }
}