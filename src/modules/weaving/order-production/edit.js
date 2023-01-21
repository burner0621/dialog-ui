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
import moment from "moment";

@inject(Router, Service)
export class Edit {
  detailEditOnly = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.error = {};
  }

  async activate(params) {
    var Id = params.Id;
    var mappedResult = {};
    this.data = await this.service
      .getById(Id)
      .then(result => {
        mappedResult = result;
        if (result.Period) {
          moment.locale("id");
          mappedResult.Month = moment(result.Period).format("MMMM");
          mappedResult.Year = moment(result.Period).format("YYYY");
        }
        return this.service.getConstructionById(mappedResult.ConstructionDocumentId);
      }).then(constructionResult => {
        mappedResult.Construction = constructionResult;
        return this.service.getUnitById(mappedResult.UnitId);
      }).then(unitResult => {
        mappedResult.Unit = unitResult;
        return this.service.getSupplierById(mappedResult.WarpOriginIdOne);
      }).then(warpOneResult => {
        mappedResult.WarpOriginOne = warpOneResult;
        return this.service.getSupplierById(mappedResult.WeftOriginIdOne);
      }).then(weftOneResult => {
        mappedResult.WeftOriginOne = weftOneResult;
        if (mappedResult.WeftOriginIdTwo != "00000000-0000-0000-0000-000000000000") {
          return this.service.getSupplierById(mappedResult.WeftOriginIdTwo)
            .then(weftTwoResult => {
              mappedResult.WeftOriginTwo = weftTwoResult;
              return mappedResult;
            });
        } else {
          return mappedResult;
        }
      });
  }

  cancelCallback(event) {
    this.router.navigateToRoute("view", {
      Id: this.data.Id
    });
  }

  saveCallback(event) {
    this.error = {};
    var errorIndex = 0;
    var updateData ={};

    var sumWarp = this.data.WarpCompositionPoly + this.data.WarpCompositionCotton + this.data.WarpCompositionOthers;
    if (sumWarp < 100) {
      this.error.SumWarp = "Jumlah Komposisi Lusi Tidak Boleh Kurang Dari 100%";
      errorIndex++;
    } else if (sumWarp > 100) {
      this.error.SumWarp = "Jumlah Komposisi Lusi Tidak Boleh Lebih Dari 100%";
      errorIndex++;
    }

    var sumWeft = this.data.WeftCompositionPoly + this.data.WeftCompositionCotton + this.data.WeftCompositionOthers;
    if (sumWeft < 100) {
      this.error.SumWeft = "Jumlah Komposisi Pakan Tidak Boleh Kurang Dari 100%";
      errorIndex++;
    } else if (sumWeft > 100) {
      this.error.SumWeft = "Jumlah Komposisi Pakan Tidak Boleh Lebih Dari 100%";
      errorIndex++;
    }

    updateData.Id = this.data.Id;
    updateData.Year = this.data.Year;
    updateData.Month = this.data.Month;
    updateData.ConstructionDocumentId = this.data.Construction.Id;
    updateData.YarnType = this.data.YarnType;
    updateData.WarpOriginIdOne = this.data.WarpOriginIdOne;
    updateData.WarpCompositionPoly = this.data.WarpCompositionPoly;
    updateData.WarpCompositionCotton = this.data.WarpCompositionCotton;
    updateData.WarpCompositionOthers = this.data.WarpCompositionOthers;
    updateData.WeftOriginIdOne = this.data.WeftOriginIdOne;
    updateData.WeftOriginIdTwo = this.data.WeftOriginIdTwo;
    updateData.WeftCompositionPoly = this.data.WeftCompositionPoly;
    updateData.WeftCompositionCotton = this.data.WeftCompositionCotton;
    updateData.WeftCompositionOthers = this.data.WeftCompositionOthers;
    updateData.AllGrade = this.data.AllGrade;
    updateData.UnitId = this.data.UnitId;

    console.log(updateData);
    debugger
    
    if (errorIndex == 0) {
      this.service
        .update(updateData)
        .then(result => {
          this.router.navigateToRoute("view", {
            Id: updateData.Id
          });
        })
        .catch(e => {
          this.error = e;
        });
    }
  }
}
