import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { activationStrategy } from "aurelia-router";
import moment from "moment";
import numeral from "numeral";
import { Dialog } from '../../../components/dialog/dialog';
import { Service } from "./service";
import { CreateSubmit } from './dialog-template/create-submit';
// import PurchasingDocumentExpeditionService from "../shared/purchasing-document-expedition-service";
import { PermissionHelper } from "../../../utils/permission-helper";
import {
  VERIFICATION,
  CASHIER,
  ACCOUNTING,
  RETUR,
} from "../shared/permission-constants";
const InternalNoteLoader = require("../../../loader/garment-intern-note-loader");
const SupplierLoader = require("../../../loader/garment-supplier-loader");
// const DivisionLoader = require("../../../loader/division-loader");

@inject(Router, Service, PermissionHelper,Dialog)
export class Create {
  fromPurchasingColumns = [
    { field: "selected", checkbox: true, sortable: false },
    {
      field: "SentDate",
      title: "Tanggal Penyerahan",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "InternalNoteNo", title: "No. Nota Intern" },
    {
      field: "InternalNoteDate",
      title: "Tanggal Nota Intern",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "SupplierName", title: "Supplier" },
    {
      field: "Amount",
      title: "Total Bayar",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "Remark", title: "Keterangan" },
  ];

  fromVerificationColumns = [
    { field: "selected", checkbox: true, sortable: false },
    {
      field: "SentDate",
      title: "Tanggal Penyerahan",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    {
      field: "VerificationAcceptedDate",
      title: "Tanggal Verifikasi",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "InternalNoteNo", title: "No. Nota Intern" },
    {
      field: "InternalNoteDate",
      title: "Tanggal Nota Intern",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "SupplierName", title: "Supplier" },
    {
      field: "Amount",
      title: "Total Bayar",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "Remark", title: "Keterangan" },
  ];

  returFromVerificationColumns = [
    { field: "selected", checkbox: true, sortable: false },
    {
      field: "VerificationAcceptedDate",
      title: "Tanggal Verifikasi",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "InternalNoteNo", title: "No. Nota Intern" },
    {
      field: "InternalNoteDate",
      title: "Tanggal Nota Intern",
      formatter: function (value, data, index) {
        return value ? moment(value).format("DD MMM YYYY") : "-";
      },
    },
    { field: "SupplierName", title: "Supplier" },
    {
      field: "Amount",
      title: "Total Bayar",
      formatter: function (value, data, index) {
        return numeral(value).format("0,000.00");
      },
      align: "right",
    },
    { field: "CurrencyCode", title: "Mata Uang" },
    { field: "SendToPurchasingRemark", title: "Alasan" },
  ];

  tableOptions = {
    pagination: false,
    showColumns: false,
    search: false,
    showToggle: false,
  };

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
  };

  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(router, service, permissionHelper,dialog) {
    this.router = router;
    this.service = service;

    this.documentData = [];
    this.selectedItems = [];
    this.submitContext = {};

    this.permissions = permissionHelper.getUserPermissions();
    this.initPermission();

    this.isVerification = this.activeRole.key == "VERIFICATION";
    this.isRetur = this.activeRole.key == "RETUR";
    this.dialog = dialog;
  }

  initPermission() {
    this.roles = [VERIFICATION, CASHIER, ACCOUNTING, RETUR];
    this.accessCount = 0;

    for (let i = this.roles.length - 1; i >= 0; i--) {
      for (let code of this.roles[i].code) {
        if (this.permissions.hasOwnProperty(code)) {
          this.roles[i].hasPermission = true;
          this.accessCount++;
          this.activeRole = this.roles[i];
          // console.log("this.roles[i]", this.roles[i]);
        }
      }
    }

    if (this.permissions.hasOwnProperty("C9")) {
      this.accessCount = 0;
      this.roles = this.roles.map((role) => {
        role.hasPermission = true;
        this.accessCount++;
        return role;
      });
      this.activeRole = this.roles[0];
    }
  }

  changeRole(role) {
    console.log(role);
    if (role.key !== this.activeRole.key) {
      this.activeRole = role;
      this.selectedItems.splice(0, this.selectedItems.length);
      this.documentData.splice(0, this.documentData.length);
      this.documentTable.refresh();
      this.internalNoteFilter = {
        Position: this.activeRole.positionAutocomplete
      }
    }
  }

  //   changeTable(role) {
  //     this.code = role.key === "CASHIER" ? true : false;
  //   }

  changeTable(role) {
    this.isVerification = role.key == "VERIFICATION";
    this.isRetur = role.key == "RETUR";
    this.documentTable.refresh();


  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  search() {
    let position = 2;
    if (this.activeRole) position = this.activeRole.positionAutocomplete;

    let internalNoteId = 0;
    if (this.internalNote) internalNoteId = this.internalNote.Id;

    let supplierId = 0;
    if (this.supplier) supplierId = this.supplier.Id;

    let arg = {
      page: 1,
      size: 255,
      position: position,
      internalNoteId: internalNoteId,
      supplierId: supplierId,
    };

    this.service.search(arg).then((result) => {
      this.selectedItems.splice(0, this.selectedItems.length);
      this.documentData.splice(0, this.documentData.length);
      this.documentData.push(...result.data);
      this.documentTable.refresh();
    });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("list");
  }

  saveCallback(event) {
    /*
            let data = {
                ReceiptDate: this.receiptDate,
                Role: this.activeRole.key,
                PurchasingDocumentExpedition: [],
            };
        */

    if (!this.selectedItems || this.selectedItems.length <= 0)
    // if (false)    
      alert("Harap pilih dokumen!");
    else {
      let ids = this.selectedItems.map((item) => item.Id);
      console.log("activerole",this.activeRole);
      switch (this.activeRole.key) {
        case "VERIFICATION":
          this.service
            .verificationAccepted(ids)
            .then((result) => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute(
                "create",
                {},
                { replace: true, trigger: true }
              );
            })
            .catch((e) => {
              this.error = e;
            });
          break;
        case "CASHIER":
          this.service
            .cashierAccepted(ids)
            .then((result) => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute(
                "create",
                {},
                { replace: true, trigger: true }
              );
            })
            .catch((e) => {
              this.error = e;
            });
          break;
        case "ACCOUNTING":
       this.submitContext.verifiedAlert = true;        
        this.dialog.show(CreateSubmit, this.submitContext)
        .then((response)=>{
          console.log("response acooutning",response);
          var isOk = response.output.verifiedAlert;
          var remark = response.output.Remark;
          if(isOk){
            this.service
            .accountingAccepted(ids)
            .then((result) => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute(
                "create",
                {},
                { replace: true, trigger: true }
              );
            })
            .catch((e) => {
              this.error = e;
            });
          }else{
            this.service
            .accountingDispositionNotOk(ids,remark)
            .then((result) => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute(
                "create",
                {},
                { replace: true, trigger: true }
              );
            })
            .catch((e) => {
              this.error = e;
            });
          }
        });
          
          break;
        case "RETUR":
          this.service
            .returAccepted(ids)
            .then((result) => {
              alert("Data berhasil dibuat");
              this.router.navigateToRoute(
                "create",
                {},
                { replace: true, trigger: true }
              );
            })
            .catch((e) => {
              this.error = e;
            });
          break;
        default:
          break;
      }
    }

    console.log(this);
    // let data = {
    //   Role: this.activeRole.key,
    //   PurchasingDocumentExpedition: [],
    // };

    // for (let s of this.selectedItems) {
    //   data.PurchasingDocumentExpedition.push({
    //     Id: s.Id,
    //     UnitPaymentOrderNo: s.UnitPaymentOrderNo,
    //   });
    // }

    // this.service
    //   .create(data)
    //   .then((result) => {
    //     alert("Data berhasil dibuat");
    //     this.router.navigateToRoute(
    //       "create",
    //       {},
    //       { replace: true, trigger: true }
    //     );
    //   })
    //   .catch((e) => {
    //     this.error = e;
    //   });
  }

  get internalNoteLoader() {
    return InternalNoteLoader;
  }

  get supplierLoader() {
    return SupplierLoader;
  }
}
