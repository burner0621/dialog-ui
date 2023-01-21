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
export class View {
  detailEditOnly = true;
  createOnly = true;
  constructor(router, service) {
    this.router = router;
    this.service = service;
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

  //Dipanggil ketika tombol "Kembali" ditekan
  list() {
    this.router.navigateToRoute("list");
  }

  //Tombol "Kembali", panggil list()
  cancelCallback(event) {
    this.list();
  }

  //Tombol "Ubah", routing ke 'edit'
  editCallback(event) {
    this.router.navigateToRoute("edit", {
      Id: this.data.Id
    });
  }

  //Tombol "Hapus", hapus this.data, redirect ke list
  deleteCallback(event) {
    this.service.delete(this.data).then(result => {
      this.list();
    });
  }
}
