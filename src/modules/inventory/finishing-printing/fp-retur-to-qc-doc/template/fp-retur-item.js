import { bindable, inject } from 'aurelia-framework'
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import { Service } from "../service";

var PackingLoader = require('../../../../../loader/packing-loader');
var ProductionLoader = require('../../../../../loader/production-order-loader');
const resource = 'master/products';

@inject(Service)
export class FPReturToQCItem {
  @bindable selectedPacking;

  itemsColumns = [
    { header: "Barang", value: "productName" },
    { header: "Design", value: "designName" },
    { header: "Keterangan", value: "remark" },
    { header: "CW", value: "colorName" },
    { header: "Jumlah Stock", value: "quantityBefore" },
    { header: "Jumlah Retur", value: "returQuantity" },
    { header: "Satuan", value: "uom" },
    { header: "Panjang (Meter)", value: "length" },
    { header: "Berat (Kg)", value: "weight" }
  ]

  constructor(service) {
    this.service = service;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;
    this.isShowing = false;
    this.filter = this.context.context.options ? this.context.context.options : {};

    if (this.data) {
      this.selectedPacking = this.data;
      if (this.data.Details) {
        this.isShowing = true;
      }
    }
  }

  //packingFilter=this.filter;


  get packingLoader() {
    return PackingLoader;
  }

  get productionLoader() {
    return ProductionLoader;
  }

  async selectedPackingChanged(newValue) {

    var items = [];
    if (newValue) {
      if (newValue.Id) {
        this.data.ProductionOrder = newValue;

        var config = Container.instance.get(Config);
        var endpoint = config.getEndpoint("core");
        var productFilter = {
          ProductionOrderNo: newValue.OrderNo
        };
        await this.service.getProductByProductionOrderNo(newValue.OrderNo)
          .then((result) => {

            var productIds = result.data.map(function (v) {
              return v.Id;
            });
            var product = result.data;
            this.service.getInventoryItemsByProductId({ productIds })
              .then((result) => {
                if (result) {
                  
                  if (newValue.OrderType && newValue.OrderType.Name) {
                    var inventoryData = {};
                    if (newValue.OrderType.Name.toUpperCase() === 'PRINTING') {
                      inventoryData = result.filter(function (v) {
                        return v.storageName && v.storageName.toUpperCase() === 'GUDANG PRINTING';
                      });
                    } else {
                      inventoryData = result.filter(function (v) {
                        return v.storageName && v.storageName.toUpperCase() !== 'GUDANG PRINTING';
                      });
                    }
                    for (var item of inventoryData) {
                      var newProduct = product.find(function (v) {
                        return v.Id == item.productId;
                      });
                      var data = {
                        ProductName: item.productName,
                        ProductId: item.productId,
                        ProductCode: item.productCode,
                        DesignNumber: newProduct.SPPProperties.DesignNumber,
                        DesignCode: newProduct.SPPProperties.DesignCode,
                        Remark: '',
                        ColorWay: newProduct.SPPProperties.ColorName,
                        QuantityBefore: item.quantity,
                        ReturQuantity: 0,
                        UOMId: item.uomId,
                        UOMUnit: item.uom,
                        Length: 0,
                        Weight: 0,
                        StorageId: item.storageId,
                        StorageCode: item.storageCode,
                        StorageName: item.storageName
                      }
                      items.push(data);
                    }
                    this.data.Details = items;
                  }
                }
              });
          });
        this.isShowing = true;
      }
    }
  }

  toggle() {

    if (!this.isShowing)
      this.isShowing = true;
    else
      this.isShowing = !this.isShowing;
  }

  packingLoaderView = (packing) => {
    if (packing.Code && packing.ProductionOrderNo)
      return `${packing.Code} - ${packing.ProductionOrderNo}`;
    //return packing.productionOrderNo
  }

  productionLoaderView = (productionOrder) => {

    if (productionOrder.OrderNo)
      return `${productionOrder.OrderNo}`;
    else if (productionOrder.ProductionOrder) {
      return `${productionOrder.ProductionOrder.OrderNo}`
    }
  }

  controlOptions = {
    control: {
      length: 12
    }
  };
}