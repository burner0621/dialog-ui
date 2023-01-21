import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    constructor(router, service) {

        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    dateFrom = null;
    dateTo = null;
    spinning = '';
    machine = null;
    uster = null;
    grade = '';
    
    gradeOption = ['','Excellent', 'Good', 'Medium', 'Low', 'Bad'];

    spinningUnitFilter = {
        "division.name": "SPINNING"
    }
    activate() {
    }

    searching() {
        var data = [];
        this.service.getByDate(this.dateFrom, this.dateTo, this.spinning, this.machine, this.uster, this.grade)
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.data = null;
        this.spinning = '';
        this.machine = null;
        this.uster = null;
        this.grade = '';
    }

    ExportToExcel() {
        //    var htmltable= document.getElementById('myTable');
        //    var html = htmltable.outerHTML;
        //    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
        this.service.generateExcel(this.dateFrom, this.dateTo, this.spinning, this.machine, this.uster, this.grade);
    }
}