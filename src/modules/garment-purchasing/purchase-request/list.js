import { inject } from 'aurelia-framework';
import { Service,SalesService } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
import { PRMasterDialog } from '../../merchandiser/cost-calculation/template/data-form/pr-master-dialog';

@inject(Router, Service,SalesService)
export class List {
  context = ["Rincian"]

  columns = [
    { field: "SectionName", title: "Seksi"},  
    { field: "MDStaff", title: "Nama Staff MD", formatter:function(value, data, index){
      return value != null ? value : "-"
    }},
    // { field: "MDStaff", title: "Merchandiser"},
    { field: "PRNo", title: "Nomor PR" },
    {
      field: "Date", title: "Tanggal Validasi", formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      }
    },
    { field: "RONo", title: "Nomor RO" },
    { field: "BuyerCode", title: "Kode Buyer" },
    { field: "BuyerName", title: "Nama Buyer" },
    { field: "Article", title: "Artikel" },
    {
      field: "ShipmentDate", title: "Tanggal Shipment", formatter: function (value, data, index) {
        return moment(value).format("DD MMM YYYY");
      }
    },
    { field: "Status", title: "Status Validasi" }
  ];

  rowFormatter(data, index) {
    if (data.Status === "SUDAH")
      return { classes: "success" }
    else
      return { classes: "danger" }
  }

  loader  = (info) => {
    var order = {};
    if (info.sort)
      order[info.sort] = info.order;
    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      // select: ["PRNo", "RONo", "ShipmentDate", "Buyer.Name", "Unit.Name", "IsPosted"],
      order: order
    }

    return this.service.search(arg)
      .then(result => {

        let itemPromises = result.data.map((pr) => {
          if(pr.PRType =="JOB ORDER"){
            return this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: pr.RONo }) } )
              .then((ccg) => {
                  pr.SectionName = ccg.data.length > 0 ?ccg.data[0].SectionName : "";
                  return Promise.resolve(pr)
              });
          }
          else{
            return Promise.resolve(pr)
          } 
          
        });

        return Promise.all(itemPromises)
            .then((datas) => {
              for (const data of datas) {
                  data.BuyerCode = data.Buyer.Code;
                  data.BuyerName = data.Buyer.Name;
                  if (data.PRType == "MASTER" || data.PRType == "SAMPLE") {
                    data.Status = (data.IsValidatedMD1 && data.IsValidatedMD2 && data.IsValidatedPurchasing) ? "SUDAH" : "BELUM";
                    if (data.Status === "SUDAH") {
                      data.Date = data.ValidatedMD2Date;
                    } 
                    else {
                      data.Date = null;
                    }
                  } 
                  else {
                    data.Status = "SUDAH";
                  }
                }
                return {
                    total: result.info.total,
                    data: datas
                }
            });

        //   });
        // var datas=[];
        // var total= result.info.total;
        // result.data.map((data) => {
        //   data.BuyerCode = data.Buyer.Code;
        //   data.BuyerName = data.Buyer.Name;
        //   if (data.PRType == "MASTER" || data.PRType == "SAMPLE") {
        //     data.Status = (data.IsValidatedMD1 && data.IsValidatedMD2 && data.IsValidatedPurchasing) ? "SUDAH" : "BELUM";
        //     if (data.Status === "SUDAH") {
        //       data.Date = data.ValidatedMD2Date;
        //     } else {
        //       data.Date = null;
        //     }
        //   } else {
        //     data.Status = "SUDAH";
        //   }
        //   if(data.PRType =="JOB ORDER"){
        //     return this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: data.RONo }) })
        //     .then(noresult => {
        //       if(noresult.data.length>0){
        //         data.SectionName=noresult.data[0].SectionName;
        //         return data;
        //       }
        //       else{
        //         data.SectionName="";
        //         return data;
        //       }
        //     });
        //   }
        //   else{
        //     return data;
        //   }
          
        // });

        // for (const data of result.data) {
        //   data.BuyerCode = data.Buyer.Code;
        //   data.BuyerName = data.Buyer.Name;
        //   if (data.PRType == "MASTER" || data.PRType == "SAMPLE") {
        //     data.Status = (data.IsValidatedMD1 && data.IsValidatedMD2 && data.IsValidatedPurchasing) ? "SUDAH" : "BELUM";
        //     if (data.Status === "SUDAH") {
        //       data.Date = data.ValidatedMD2Date;
        //     } else {
        //       data.Date = null;
        //     }
        //   } else {
        //     data.Status = "SUDAH";
        //   }
        //   if(data.PRType =="JOB ORDER"){
        //     data.SectionName=this.salesService.getCostCalculationByRONo(data.RONo);
        //     // .then(noresult => {
        //        console.log(data.SectionName)
        //     //   if(noresult.data.length>0){
        //     //     data.SectionName=noresult.data[0].SectionName;
        //     //   }
        //     //   else{
        //     //     data.SectionName="";
        //     //   }
        //     // });
        //   }
         
        // }
        // return {
        //   total: result.info.total,
        //   data: result.data
        // }
      });
  }

  constructor(router, service,salesService) {
    this.service = service;
    this.router = router;
    this.salesService=salesService;
  }

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Rincian":
        this.router.navigateToRoute('view', { id: data.Id });
        break;
    }
  }

}
