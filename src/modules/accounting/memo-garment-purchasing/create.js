import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
    }

    bind() {
        this.data = { MemoGarmentPurchasingDetails: [] };
        this.error = {};
        console.log(this.data);
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    reset(){
        this.data = {};
        this.error ={};        
    }

    convertDate(Date) {
      var date = Date;
      var day = date.getDate();       // yields date
      var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
      var year = date.getFullYear();  // yields year

      // After this construct a string with the above results as below
      var time = year + "/" + month + "/" + day;
      return time;
    }

    save(event) {
        this.data.MemoDate = this.convertDate(this.data.MemoDate);
        console.log(this.data);
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create', {} , { replace: true, trigger: true });
                this.reset();
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
    }

    
}
