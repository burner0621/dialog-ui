import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
import { Dialog } from './../../../au-components/dialog/dialog';

@inject(Router, Service,Dialog)
export class List { 

    constructor(router, service,dialog) {
        this.service = service;
        this.router = router;
        this.dialog = dialog;
    }

    bind(context) {
        // console.log(context);
        this.context = context;
        // this.isShowingMasuk = false;
        // this.isShowingKeluar = false;
        // this.hasBUM = false;
        // this.hasBUK = false;
    }

    searching() {
        if(!this.noBon){
            console.log(this.noBon)
            alert("No BUM harus Diisi");
        }else{
            let args = {
                bum : this.noBon,
            };
            this.service.search(args)
                    .then(result => {
                        this.rowCount=[];
                        var rowDoc=[]
                        var datas= [];
                        var index = 1;
                        for(var _data of result.data){
                            var urn = _data.URNNo.toString();
                            var po = _data.PO.toString();
                            var smalqty = _data.SmallQty.toString();

                            if(!rowDoc[urn]){
                                rowDoc[urn] = 1
                            }else{
                                rowDoc[urn]++
                            }

                            if(!rowDoc[po]){
                                rowDoc[po] = 1
                            }else{
                                rowDoc[po]++
                            }

                            if(!rowDoc[po + smalqty]){
                                rowDoc[po+ smalqty] = 1
                            }else{
                                rowDoc[po+ smalqty]++
                            }

                            datas.push(_data);
                        }

                        for(var b of result.data){

                        let urnno = result.data.find(o=>o.URNNo == b.URNNo);
                        if(urnno) {
                            urnno.urnspan = rowDoc[b.URNNo.toString()]
                        }

                        let pono = result.data.find(o=>o.PO == b.PO);
                        if(pono) {
                            pono.pospan = rowDoc[b.PO.toString()]
                        }

                        let smalqty = result.data.find(o=>o.PO + o.SmallQty == b.PO + b.SmallQty);
                        if(smalqty) {
                            smalqty.smallspan = rowDoc[b.PO.toString() + b.SmallQty.toString()]
                        }
                        }
                    
                        // this.info.total= result.info.total;
                        this.data = datas; 
                        // console.log(this.data)
                    })
            }
        
    }

    ExportToExcel() {
        if(!this.noBon){
            console.log(this.noBon)
            alert("No BUM harus Diisi");
        }else{   
            let args = {
                bum : this.noBon
            };
            
            this.service.generateExcel(args)
          
        }
        
    }

    reset() {
        this.noBon = null;
    }

}
