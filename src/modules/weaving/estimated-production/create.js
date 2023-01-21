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
  searchButton = true;
  dataExist = false;
  editable = false;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
  }

  activate(params) {}

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Simpan", membuat data, redirect ke create
  saveCallback(event) {
    this.data.Day = new Date().getDate();
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
      this.error.EstimatedDetails = orderProductionsDocumentError;
    } else {
      if (summedUpGrade != 100) {
        window.alert(summedUpGradeAlert);
      } else {
        this.data.EstimatedDetails = this.data.EstimatedDetails.map(o => {
          let mappedDetail = {};
          mappedDetail.OrderId = o.Id;
          mappedDetail.GradeA = o.GradeA;
          mappedDetail.GradeB = o.GradeB;
          mappedDetail.GradeC = o.GradeC;
          mappedDetail.GradeD = o.GradeD;

          return mappedDetail;
        });
        
        this.service
          .create(this.data)
          .then(result => {
            this.list();
          })
          .catch(e => {
            this.error = e;
          });
      }
    }
  }
}
