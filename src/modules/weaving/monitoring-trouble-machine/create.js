import {
  inject,
  Lazy
} from "aurelia-framework";
import {
  Router
} from "aurelia-router";
import {
  Service
} from "./service";

@inject(Router, Service)
export class Create {
  showViewEdit = false;
  readOnlyViewEdit = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.data.Tags = "trouble-machines";
    this.error = {};
  }

  activate(params) {}

  list() {
    this.router.navigateToRoute("list");
  }

  cancelCallback(event) {
    this.list();
  }

  saveCallback(event) {

    var postData = {}

    if (this.data.MachineNumber) {
      postData.MachineNumber = this.data.MachineNumber.Id;
    }

    if (this.data.Process) {
      postData.Process = this.data.Process;
    }

    if (this.data.Trouble) {
      postData.Trouble = this.data.Trouble;
    }

    if (this.data.Description) {
      postData.Description = this.data.Description;
    }

    if (this.data.StopDate) {
      postData.StopDate = this.data.StopDate;
    }

    if (this.data.ContinueDate) {
      postData.ContinueDate = this.data.ContinueDate;
    }
    
    if (this.data.Operator) {
      postData.OperatorDocument = this.data.Operator.Id;
    }

    if (this.data.OrderNumber) {
      postData.OrderDocument = this.data.OrderNumber.Id;
    }
  
    this
      .service
      .create(postData)
      .then(result => {
        alert("Data berhasil dibuat");
        this.router.navigateToRoute('list');
      })
      .catch(e => {
        if (e.statusCode === 500) {
          alert("Gagal menyimpan, silakan coba lagi!");
        } else {
          this.error = e;
          this.error.Operator = e['OperatorDocument'] ? 'Operator tidak boleh kosong' : '';
          this.error.OrderNumber = e['OrderDocument'] ? 'No SPP tidak boleh kosong' : '';
          this.error.StopDate = e['StopDate'] ? 'Tanggal berhenti tidak boleh kosong' : '';
          this.error.ContinueDate = e['ContinueDate'] ? 'Tanggal lanjut tidak boleh ada yang kosong' : '';
          this.error.Trouble = e['Trouble'] ? 'Trouble tidak boleh kosong' : '';
        }
      })
  }
}
