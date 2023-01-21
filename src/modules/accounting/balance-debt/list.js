import { inject } from 'aurelia-framework';
import { Service } from "./service";
//import { ServiceLocal } from "./service-local";
import { Router } from 'aurelia-router';

@inject(Router, Service)
//@inject(Router, ServiceLocal)
export class List {
  context = ["Rincian"];
  columns = [
    { field: "supplier.Code", title: "Kode Supplier" },
    { field: "supplier.Name", title: "Nama Supplier" },
    { field: "codeRequirment", title: "Jenis Bahan" },
    { field: "currency.Code", title: "Mata Uang" },
    { field: "supplier.Import", title: "Import",
      formatter: function (value, row, index) {
        return value ? "YA" : "TIDAK";
      }
    },
    { field: "Year", title: "Tahun" },
    { field: "totalValas", title: "Valas" },
    { field: "dOCurrencyRate", title: "Kurs" },
    { field: "totalAmountIDR", title: "Nilai IDR"},
  ];

  loader = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      //select: ["SupplierName", "CodeRequirment", "CurrencyCode", "import", "Year", "Month", "TotalAmount", "CurrencyRate", "TotalAmountIDR"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        for (var data of result.data) {
          data.totalValas = data.totalValas.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          data.dOCurrencyRate = data.dOCurrencyRate.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          data.totalAmountIDR = data.totalAmountIDR.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            // switch (data.Month) {
            //   case 1:
            //     data.Month = "Januari";
            //     break;
            //   case 2:
            //     data.Month = "Februari";
            //     break;
            //   case 3:
            //     data.Month = "Maret";
            //     break;
            //   case 4:
            //     data.Month = "April";
            //     break;
            //   case 5:
            //     data.Month = "Mei";
            //     break;
            //   case 6:
            //     data.Month = "Juni";
            //     break;
            //   case 7:
            //     data.Month = "Juli";
            //     break;
            //   case 8:
            //     data.Month = "Agustus";
            //     break;
            //   case 9:
            //     data.Month = "September";
            //     break;
            //   case 10:
            //     data.Month = "Oktober";
            //     break;
            //   case 11:
            //     data.Month = "November";
            //     break;
            //   case 12:
            //     data.Month = "Desember";
            //     break;
            //   default:
            //     "-";
            //     break;
        //}
      }
        return {
          total: result.info.total,
          data: result.data
        }
        //data.IncomeTaxesName = result.data.IncomeTaxes.name;
      });
  }

  // constructor(router, service) {
  //   this.service = service;
  //   this.router = router;
  // }
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  contextClickCallback(event) {
    console.log(event)
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

  // contextCallback(event) {
  //   var arg = event.detail;
  //   var data = arg.data;
  //   switch (arg.name) {
  //     case "detail":
  //       this.router.navigateToRoute('view', { id: data.Id });
  //       break;
  //   }
  // }


  upload() {
    this.router.navigateToRoute('upload');
  }
  create() {
    this.router.navigateToRoute('create');
  }
  // columns = [
  //   { field: "SupplierName", title: "Supplier" },
  //   { field: "CodeRequirment", title: "Jenis Bahan" },
  //   { field: "CurrencyCode", title: "Mata Uang" },
  //   { field: "Import", title: "Import",
  //     formatter: function (value, row, index) {
  //       return value ? "YA" : "TIDAK";
  //     }
  //   },
  //   { field: "Year", title: "Tahun" },
  //   { field: "Month", title: "Nama" },
  //   { field: "TotalAmount", title: "Valas" },
  //   { field: "CurrencyRate", title: "Kurs" },
  //   { field: "TotalAmountIDR", title: "Nilai IDR"},


  // ];
  // loader = (info) => {
  //   var order = {};
  //   if (info.sort)
  //     order[info.sort] = info.order;

  //   var arg = {
  //     page: parseInt(info.offset / info.limit, 10) + 1,
  //     size: info.limit,
  //     keyword: info.search,
  //     select: ["SupplierName", "CodeRequirment", "CurrencyCode", "import", "Year", "Month", "TotalAmount", "CurrencyRate", "TotalAmountIDR"],
  //     order: order
  //   }

  //   return this.service.search(arg)
  //     .then(result => {
  //       for(var data of result.data){
  //           switch (data.Month) {
  //             // case 1:
  //             //   return data.Month = "Januari";
  //             //   break;
  //             // case 2:
  //             //   return value = "Februari";
  //             //   break;
  //             // case 3:
  //             //   return value = "Maret";
  //             //   break;
  //             // case 4:
  //             //   return value = "April";
  //             //   break;
  //             // case 5:
  //             //   return value = "Mei";
  //             //   break;
  //             // case 6:
  //             //   return value = "Juni";
  //             //   break;
  //             // case 7:
  //             //   return value = "Juli";
  //             //   break;
  //             // case 8:
  //             //   return value = "Agustus";
  //             //   break;
  //             // case 9:
  //             //   return value = "September";
  //             //   break;
  //             // case 10:
  //             //   return value = "Oktober";
  //             //   break;
  //             // case 11:
  //             //   return value = "November";
  //             //   break;
  //             case 12:
  //               return data.Month = "Desember";
  //               break;
  //             default:
  //               "-";
  //               break;
  //       }
  //     }
  //       return {
  //         total: result.info.total,
  //         data: result.data
  //       }
  //     });
  // }
  



  // constructor(router, service) {
  //   console.log(router);
  //   this.service = service;
  //   this.router = router;
  //   this.buyerId = "";
  //   this.buyers = [];
  // }


  // upload() {
  //   this.router.navigateToRoute('upload');
  // }

  // download() {
  //   var endpoint = 'master/chart-of-accounts/download';
  //   var request = {
  //     method: 'GET'
  //   };

  //   var getRequest = this.service.endpoint.client.fetch(endpoint, request);
  //   this.service._downloadFile(getRequest);
  //   this.service.publish(getRequest);
  // }


}
