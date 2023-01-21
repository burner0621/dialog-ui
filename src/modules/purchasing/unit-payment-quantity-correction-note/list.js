import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    today = new Date();

    isPrint = false;
    
    context = ["Rincian", "Cetak PDF", "Cetak Nota Retur"]

    columns = [
        { field: "uPCNo", title: "No. Koreksi" },
        { field: "correctionDate", title: "Tgl. Koreksi", formatter: function(value, data, index){
            return moment(value).format("D MMM YYYY");
          }
        },
        { field: "uPONo", title: "No. Surat Perintah Bayar"},
        { field: "supplier.name", title: "Supplier"},
        { field: "invoiceCorrectionNo", title: "No. Invoice Koreksi"},
        { field: "dueDate", title: "Tgl. Jatuh Tempo", formatter: function(value, data, index){
            return moment(value).format("D MMM YYYY");
          }
        }
      ];

    loader = (info) => {
      var order = {};
      if (info.sort)
         order[info.sort] = info.order;
         var arg = {
         page: parseInt(info.offset / info.limit, 10) + 1,
         size: info.limit,
         keyword: info.search,
         order: order
        }
    
        return this.service.search(arg)
          .then(result => {
            for (var data of result.data) {
                data.uPCNo = data.uPCNo || data.uPCNo || 0;
                data.uPONo = data.uPONo;
            }
            return {
              total: result.info.total,
              data: result.data
            }
          });
      }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        
        switch (arg.name) {
            case "Rincian":
                this.router.navigateToRoute('view', { id: data._id });
                break;
            case "Cetak PDF":
                this.service.getPdfById(data._id);
                break;
            case "Cetak Nota Retur":
                this.service.getPdfReturById(data._id);
                break;
        }
    }
    contextShowCallback(index, name, data) {
        switch (name) {
            case "Cetak Nota Retur":
                return data.useVat;
            default:
                return true;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}