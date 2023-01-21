import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";

@inject(Router, Service)
export class Edit {
  searchButton = false;
  dataExist = true;
  editable = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  async activate(params) {
    var Id = params.Id;
    var dataResult;
    this.data = await this.service
      .getByIdEdit(Id);
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", { Id: this.data.Id });
  }

  saveCallback(event) {
    var summedUpGradeAlert =
      "- Jumlah Seluruh Grade Tidak Boleh Lebih Dari 100\n- Jumlah Seluruh Grade Tidak Boleh Kurang Dari 100\n- Jumlah Seluruh Grade Harus Tepat 100";
    var emptyGrade =
      "- GradeA Perintah Produksi Harus Diisi\n- GradeB Perintah Produksi Harus Diisi\n- GradeC Perintah Produksi Harus Diisi";
    var orderProductionsDocumentError = [];
    var summedUpGrade = 0;

    this.data.EstimatedDetails.forEach(datum => {
      var errorEmptyIndex = 0;
      var errorCollection = {};
      if (
        datum.GradeA == undefined ||
        datum.GradeA == null ||
        datum.GradeA == "" ||
        datum.GradeA == 0
      ) {
        errorEmptyIndex++;
        errorCollection.GradeA = "Grade A Harus Diisi";
      }
      if (
        datum.GradeB == undefined ||
        datum.GradeB == null ||
        datum.GradeB == "" ||
        datum.GradeB == 0
      ) {
        errorEmptyIndex++;
        errorCollection.GradeB = "Grade B Harus Diisi";
      }
      if (
        datum.GradeC == undefined ||
        datum.GradeC == null ||
        datum.GradeC == "" ||
        datum.GradeC == 0
      ) {
        errorEmptyIndex++;
        errorCollection.GradeC = "Grade C Harus Diisi";
      }
      if (errorEmptyIndex > 0) {
        window.alert(emptyGrade);
        orderProductionsDocumentError.push(errorCollection);
      }
    });

    this.data.EstimatedDetails.forEach(datum => {
      var gradeANum = datum.GradeA ? datum.GradeA : 0;
      var gradeBNum = datum.GradeB ? datum.GradeB : 0;
      var gradeCNum = datum.GradeC ? datum.GradeC : 0;
      var gradeDNum = datum.GradeD ? datum.GradeD : 0;
      summedUpGrade = 0;

      summedUpGrade =
        summedUpGrade + gradeANum + gradeBNum + gradeCNum + gradeDNum;
    });

    if (orderProductionsDocumentError.length > 0) {
      this.error.EstimationProducts = orderProductionsDocumentError;
    } else {
      if (summedUpGrade != 100) {
        window.alert(summedUpGradeAlert);
      } else {
        this.data.EstimatedDetails = this.data.EstimatedDetails.map(o => {
          let mappedDetail = {};
          mappedDetail.Id = o.Id;
          mappedDetail.OrderId = o.OrderId;
          mappedDetail.GradeA = o.GradeA;
          mappedDetail.GradeB = o.GradeB;
          mappedDetail.GradeC = o.GradeC;
          mappedDetail.GradeD = o.GradeD;

          return mappedDetail;
        });
        
        this.service
          .update(this.data)
          .then(result => {
            this.router.navigateToRoute("view", { Id: this.data.Id });
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
  }
}
