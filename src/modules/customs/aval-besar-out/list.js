import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
        this.service = service;
        this.router = router;
    }
    info = { page: 1,size:50};
    search(){
        this.info.page = 1;
        this.searching();
    }
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
    
    searching() {
    var args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(args)
     
            .then(result => {
                var index =1;
                var rowDoc=[]
                for(var _data of result.data){

                    var bon = _data.BonNo.toString();
                    var uom = _data.UomUnit.toString();
                    // var date = _data.TransactionDate.toString();
                    // var ket = _data.Keterangan.toString();


                    if(!rowDoc[bon]){
                        rowDoc[bon] = 1
                    }else{
                        rowDoc[bon]++
                    }
                    if(!rowDoc[uom]){
                        rowDoc[uom] = 1
                    }else{
                        rowDoc[uom]++
                    }  
                    // if(!rowDoc[date]){
                    //     rowDoc[date] = 1
                    // }else{
                    //     rowDoc[date]++
                    // }
                    // if(!rowDoc[ket]){
                    //     rowDoc[ket] = 1
                    // }else{
                    //     rowDoc[ket]++
                    // }
                }
                for(var b of result.data){
                    let bonNo = result.data.find(o=>o.BonNo == b.BonNo);
                        if(bonNo) {
                            bonNo.bonspan = rowDoc[b.BonNo.toString()]
                        }

                        let uomm = result.data.find(o=>o.UomUnit == b.UomUnit);
                        if(uomm) {
                            uomm.uomspan = rowDoc[b.UomUnit.toString()]
                        }

                        // let datee = result.data.find(o=>o.TransactionDate == b.TransactionDate);
                        // if(datee) {
                        //     datee.datespan = rowDoc[b.TransactionDate.toString()]
                        // }
                        
                        // let kete = result.data.find(o=>o.Keterangan == b.Keterangan);
                        // if(kete) {
                        //     kete.ketspan = rowDoc[b.Keterangan.toString()]
                        // }  
                }

               this.data=result.data;     
               
            });
            
    }
    changePage(e) {
        var page = e.detail;
        // this.info.page = page;
        this.searching();
    }
      reset() {
      
        this.dateFrom = "";
        this.dateTo = "";
    }

    get sumQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.Quantity;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }

    ExportToExcel() {
        this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }
            this.service.generateExcel(info);
        }
    }
}