import { inject } from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

import { DialogDetailView } from './template/detail-masuk-dialog';
import { DialogDetailKeluarView } from './template/detail-keluar-dialog';
import { Dialog } from './../../../au-components/dialog/dialog';

@inject(Service, Dialog)
export class List {
    
    info = { page: 1,size:25};
    constructor(service, dialog) {
        this.service = service;
        // this.router = router;
        this.dialog = dialog;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }

    bind(context) {
        // console.log(context);
        this.context = context;
        this.isShowingMasuk = false;
        this.isShowingKeluar = false;
        this.hasBUM = false;
        this.hasBUK = false;
    }

    

    attached() {
    }

    activate(){
        
    }

    itemColumns = [
        "No. Bukti",
        "Qty Order",
        "Satuan",
        "Zona Asal",
        ""
    ];
    search(){
        this.info.page = 1;
        this.info.total = 0;
        this.searching();
    }

    toggleMasuk(index) {
        //console.log(index);

        var arg = this.data[index]
        //console.log(arg);
        // var arg = event.detail;
        var data = arg.items.Masuk;

        //  console.log(data);

        this.dialog.show(DialogDetailView, { data: data });
        // console.log(data);
        // if (!this.isShowingMasuk) this.isShowingMasuk = true;
        // else this.isShowingMasuk = !this.isShowingMasuk;
    }

    toggleKeluar(index) {
        var arg = this.data[index]
        //console.log(arg);
        // var arg = event.detail;
        var data = arg.items.Keluar;

        //  console.log(data);
        if( data.length > 0){
            this.dialog.show(DialogDetailKeluarView, { data: data });
        }else{
            alert("Barang Belum Dipakai");
        }
        
    }
    
    searching() {
        if(!this.roNo){
            alert("No RO harus Diisi");
        }else{
            let args = {
                RONo : this.roNo,
            };
            this.service.search(args)
                    .then(result => {
                        // console.log(result);
                        var datas= [];
                        var index = 1;
                        for(var _data of result){
                            datas.push(_data);
                        }
                    
                        // this.info.total= result.info.total;
                        this.data = datas; 
                        // console.log(this.data)
                    })
            }
        }

  reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.supplier = null;
        this.internNote = null;
        this.currency = null;
        this.bill = null;
        this.deliveryorder = null;
        this.paymentbill = null;
        this.invoice = null;
  }
  changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
  }
}



