import { inject, bindable, containerless, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";

@containerless()
@inject(Service, BindingEngine)
export class Detail {
  @bindable selectedPurchaseOrderExternal;

  // itemsColumns = [
  //   { header: "SH Cutting" },
  //   { header: "SH Sewing" },
  //   { header: "SH Finishing" },
  //   { header: "Total SH" },
  //   { header: "Unit" },
  //   { header: "Tahun" },
  //   { header: "Week" },
  //   { header: "Jumlah Order" },
  //   { header: "Keterangan" }
  // ]

  constructor(service, bindingEngine) {
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
  }


  // get addItems() {
  //     return (event) => {
  //         var newDetail=   {
  //             shCutting: 0,
  //             shSewing: 0,
  //             shFinishing: 0,
  //             quantity: 0,
  //             remark:"",
  //         };
  //         this.data.detailItems.push(newDetail);
  //     };
  // }

//   toggle() {
//     if (!this.isShowing)
//       this.isShowing = true;
//     else
//       this.isShowing = !this.isShowing;
//   }

  get comodity(){
      var comodity = this.data && this.data.ComodityId ? `${this.data.ComodityCode} - ${this.data.ComodityName}` : "";
      return comodity;
  }

  get bookingComodity(){
      var comodity = this.data && this.data.bookingMasterPlanComodity ? `${this.data.bookingMasterPlanComodity.code} - ${this.data.bookingMasterPlanComodity.name}` : "";
      return comodity;
  }

  // get isConfirmed(){
  //     var detail = "Belum Confirm";
  //     if(this.data.isConfirmed)
  //       detail = "Sudah Confirm";
  //     return detail;
  // }

  // get bookingIsConfirmed(){
  //     var detail = "Belum Confirm";
  //     if(this.data.bookingIsConfirmed)
  //       detail = "Sudah Confirm";
  //     return detail;
  // }

  controlOptions = {
    control: {
      length: 12
    }
  };
}