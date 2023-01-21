import { inject, Lazy } from "aurelia-framework";
import { Router } from "aurelia-router";
import { Service } from "./service";
import { activationStrategy } from "aurelia-router";

@inject(Router, Service)
export class Create {
  isCreate = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.data = {};
    this.error = {};
  }

  async activate(params) {
    this.data = {};
    // this.data.warehousesProductionOrders = await this.service.getProductionOrderOutput();
    // debugger
  }

  back() {
    this.router.navigateToRoute("list");
  }

  determineActivationStrategy() {
    return activationStrategy.replace; //replace the viewmodel with a new instance
    // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
    // or activationStrategy.noChange to explicitly use the default behavior
  }

  save() {

    let errorIndex = 0;
    this.error = {};

    if (
      this.data.date === null ||
      this.data.date === undefined ||
      this.data.date === ""
    ) {
      this.error.Date = "Tanggal Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Date = "";
    }

    if (
      this.data.shift === null ||
      this.data.shift === undefined ||
      this.data.shift === ""
    ) {
      this.error.Shift = "Shift Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Shift = "";
    }

    if (
      this.data.group === null ||
      this.data.group === undefined ||
      this.data.group === ""
    ) {
      this.error.Group = "Group Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Group;
    }

    // console.log(this.data.warehousesProductionOrders)
    let any = this.data.warehousesProductionOrders.find((element) => element.productionOrderItems.find((item) => item.IsSave))
    // console.log(any)
    if (!any) {
      this.error.item = "Nomor Order Harus Dipilih!";
      errorIndex++;
    } else {
      this.error.items = this.data.warehousesProductionOrders.map((element) => {
        let errorItem = {};

        if (!element.productionOrderItems.find((item) => item.IsSave)) {

        } else {
          let productionOrderItemErrors = element.productionOrderItems.map((productionOrderItem) => {
            let errorProductionOrderItem = {}

            if (productionOrderItem.IsSave) {
              let anyPackingCodeChecked = productionOrderItem.productPackingCodeList.find((packingCode) => packingCode.IsSave);
              if (!anyPackingCodeChecked) {
                errorProductionOrderItem.packingCode = "Kode Packing Harus Dipilih!";
                errorIndex++;
              }
                
            }
            return errorProductionOrderItem;
          })
          errorItem.productionOrderItems = productionOrderItemErrors;
        }

        return errorItem;
      })
    }

    // console.log(this.error);

    if (errorIndex === 0) {

      var selectedProductionOrders = this.data.warehousesProductionOrders;

      this.data.mappedWarehousesProductionOrders = [];
      selectedProductionOrders.forEach((datum) => {
        var datumSelected = datum.productionOrderItems.filter((s) => s.IsSave === true);
        datumSelected.forEach((datumItem) => {
          datumItem.qtyOrder = datum.productionOrderOrderQuantity;
          datumItem.packingCodeToCreate = datumItem.productPackingCodeList
            .filter((element) => element.IsSave)
            .map((element) => element.packingCode)
            .join(',')
          this.data.mappedWarehousesProductionOrders.push(datumItem);
        });
      });

      let dataForm = Object.assign({}, this.data);
      delete dataForm.warehousesProductionOrders;

      this.service
        .create(dataForm)
        .then((result) => {
          alert("Data berhasil dibuat");
          this.router.navigateToRoute(
            "create",
            {},
            { replace: true, trigger: true }
          );
        })
        .catch((e) => {
          if (e.statusCode == 500) {
            alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
          } else {
            this.error = e;
          }
        });
    }
  }

  reject() {
    let errorIndex = 0;
    this.error = {};

    if (
      this.data.date === null ||
      this.data.date === undefined ||
      this.data.date === ""
    ) {
      this.error.Date = "Tanggal Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Date = "";
    }

    if (
      this.data.shift === null ||
      this.data.shift === undefined ||
      this.data.shift === ""
    ) {
      this.error.Shift = "Shift Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Shift = "";
    }

    if (
      this.data.group === null ||
      this.data.group === undefined ||
      this.data.group === ""
    ) {
      this.error.Group = "Group Harus Diisi!";
      errorIndex++;
    } else {
      this.error.Group;
    }

    if (errorIndex === 0) {

      var selectedProductionOrders = this.data.warehousesProductionOrders;

      this.data.mappedWarehousesProductionOrders = [];
      selectedProductionOrders.forEach((datum) => {
        var datumSelected = datum.productionOrderItems.filter((s) => s.IsSave === true);
        datumSelected.forEach((datumItem) => {
          datumItem.qtyOrder = datum.productionOrderOrderQuantity;
          this.data.mappedWarehousesProductionOrders.push(datumItem);
        });
      });

      this.service
        .reject(this.data)
        .then((result) => {
          alert("Data berhasil ditolak");
          this.router.navigateToRoute(
            "create",
            {},
            { replace: true, trigger: true }
          );
        })
        .catch((e) => {
          if (e.statusCode == 500) {
            alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
          } else {
            this.error = e;
          }
        });
    }
  }
}
