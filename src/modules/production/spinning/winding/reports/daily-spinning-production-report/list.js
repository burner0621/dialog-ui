import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';

@inject(Router, Service)
export class List {

    unitId = null;

    firstDay = 1;
    last = 30;

    months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    years = ['2016'];

    spinningUnitFilter = {
        "division.name": "SPINNING"
    }
    
    constructor(router, service) {

        this.service = service;
        this.router = router;

        var now = new Date();

        this.currentMonth = now.toLocaleString("id-ID", { month: "long" });
        this.currentYear = now.getFullYear();

        var valueMonth = this.months.findIndex(x => x == this.currentMonth);
        var selectedDate = new Date(this.currentYear, valueMonth, 1);
    }

    activate() {

    }

    searching() {
        var data = [];

        var valueMonth = this.months.findIndex(x => x == this.currentMonth);
        var selectedDate = new Date(this.currentYear, valueMonth, 1);

        var firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        var lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

        this.last = lastDay.getDate();

        this.service.getDailySpinningProductionReport(firstDay, lastDay, this.unitId)
            .then(data => {
                this.data = data;
            })
    }

    reset() {
        this.unitId = null;
    }

    spinningChanged(e) {
        var selectedspinning = e.detail || {};
        if (selectedspinning) {
            this.unitId = selectedspinning._id ? selectedspinning._id : {};
        }
    }
}