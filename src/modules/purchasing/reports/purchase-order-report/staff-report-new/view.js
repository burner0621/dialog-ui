import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import moment from 'moment';


@inject(Router, Service)
export class View {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }




async activate(params) {

var user= params.user;
var dateFrom = params.info.dateFrom;
var dateTo = params.info.dateTo;
var divisiId = params.info.divisi;

         var nilais=0;
         var nilaitotals=0;
         var nilais2=0;
         var nilaitotals2=0;
          var nilaip=0;
         var nilaitotalp=0;
         var nilaipp=0;
         var divname="";
         var nilaitotalpp=0;
         var nilaipp2=0;
         var nilaitotalpp2=0;

     this.dateFrom = dateFrom;
     this.dateTo = dateTo;
     this.user= user;
    this.divisiId= divisiId;

        this.info = params.info;
        var uri = this.service.getDetailStaff(this.info);
        uri.then(data => {
             this.data=data;

             
              for (var sel of data) {
                sel.tgltarget = sel.tgltarget.substring(0,10)
                sel.tgldatang = sel.tgldatang.substring(0,10)
                sel.tglpoint = sel.tglpoint.substring(0,10)
                sel.tglpoeks = sel.tglpoeks.substring(0,10)
                  divname=sel.divisi;
                 if (sel.selisih > 0)
                     nilais=1;
                 else
                     nilais=0;

             nilaitotals += nilais;
               if (sel.selisih2 > 7)
                     nilais2=1;
                 else
                     nilais2=0;

             nilaitotals2 += nilais2;
             }

             this.nilaitotals = nilaitotals;
             this.nilaitotals2 = nilaitotals2;
             this.divname = divname;

             for (var tep of data) {
                 if (tep.selisih <= 0)
                     nilaipp=1;
                 else
                     nilaipp=0;

             nilaitotalpp += nilaipp;
               if (tep.selisih2 <= 7)
                     nilaipp2=1;
                 else
                     nilaipp2=0;

             nilaitotalpp2 += nilaipp2;
             }
             this.nilaitotalpp = nilaitotalpp;
             this.nilaitotalpp2 = nilaitotalpp2;

 for (var selp of data) {
                 if (selp._id.name!==0)
                     nilaip=1;
                 else
                     nilaip=0;

             nilaitotalp += nilaip;
             }
             this.nilaitotalp = nilaitotalp;


                 if (this.nilaitotalpp != 0 && this.nilaitotalp != 0 ) {
                    this.persen = (this.nilaitotalpp / this.nilaitotalp * 100).toFixed(0);
                 }
                 else {
                     this.persen = 0;
                 }

                 if (this.nilaitotalpp2 != 0 && this.nilaitotalp != 0 ) {
                     this.persen2 = (this.nilaitotalpp2 / this.nilaitotalp * 100).toFixed(0);
                 }
                 else {
                     this.persen2 = 0;
                 }

         this.staff = staff;

        })
    }






 ExportToExcel() {
        var info = {
            staff : this.info.staff ? this.info.staff: "",
            dateFrom : this.info.dateFrom ? moment(this.info.dateFrom).format("YYYY-MM-DD"): "",
            dateTo : this.info.dateTo ? moment(this.info.dateTo).format("YYYY-MM-DD"): "",
            divisi : this.info.divisi ? this.info.divisi: "",
        }
        this.service.generateExcel(info)
    }

     list( dateFrom, dateTo,divisiId) {
         this.router.navigateToRoute('list', { dateFrom: this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD"): "", dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD"): "", divisiId: this.divisiId ? this.divisiId : ""});
     }



}
