import { inject, bindable, computedFrom } from 'aurelia-framework';
import { SalesService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../loader/uom-loader");
var UnitLoader = require("../../../../loader/unit-loader");

@inject(SalesService)
export class Item {
    @bindable selectedRO;
    @bindable avG_GW;
    @bindable avG_NW;

    constructor(salesService) {
        this.salesService = salesService;
    }

    // get filter() {
    //     let section = {};
    //     if (this.context.context.options.header.items && this.context.context.options.header.items.length > 0) {
    //         section = (this.context.context.options.header.items.find(i => i.section && (i.section.code || i.section.Code)) || {}).section || {};
    //     }

    //     var filter = {
    //         BuyerCode: this.data.BuyerCode,
    //         Section: section.code || section.Code,
    //         "SCGarmentId!=null": true
    //     };
    //     return filter;
    // }

    detailsColumns = [
        { header: "Index" },
        { header: "Carton 1" },
        { header: "Carton 2" },
        { header: "Style" },
        { header: "Colour" },
        { header: "Jml Carton" },
        { header: "Qty" },
        { header: "Total Qty" },
        { header: "GW" },
        { header: "NW" },
        { header: "NNW" },
        { header: "" },
    ];

    get roLoader() {
        return CostCalculationLoader;
    }

    roView = (costCal) => {
        return `${costCal.RO_Number}`
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (uom) => {
        return `${uom.Unit || uom.unit}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get unitFilter() {
        return { "(Code == \"C2A\" || Code == \"C2B\" || Code == \"C2C\" || Code == \"C1A\" || Code == \"C1B\")": true };
    }

    unitView = (unit) => {
        return `${unit.Code || unit.code}`
    }

    toggle() {
        if (!this.isShowing)
            this.isShowing = true;
        else
            this.isShowing = !this.isShowing;
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
            header: context.context.options.header,
            item : this.data,
        };
        if (this.data.roNo) {
            this.selectedRO = {
                RO_Number: this.data.RONo || this.data.roNo
            };
        }

        this.isShowing = false;
        if (this.error && this.error.Details && this.error.Details.length > 0) {
            this.isShowing = true;
        }

        this.avG_GW = this.data.avG_GW;
        this.avG_NW = this.data.avG_NW;
    }

    selectedROChanged(newValue) {
        if (newValue) {
            this.salesService.getCostCalculationById(newValue.Id)
                .then(result => {
                    this.salesService.getSalesContractById(result.SCGarmentId)
                        .then(sc => {
                            this.salesService.getPreSalesContractById(result.PreSCId)
                                .then(psc => {
                                    this.data.roNo = result.RO_Number;
                                    this.data.article = result.Article;
                                    this.data.buyerAgent = result.Buyer;
                                    this.data.buyerBrand = result.BuyerBrand;
                                    this.data.sectionName = result.SectionName;
                                    this.data.section = {
                                        id: psc.SectionId,
                                        code: result.Section,
                                    };
                                    this.data.comodityDescription = (result.Comodity || {}).Name;
                                    this.data.unit = result.Unit;
                                    this.data.uom = result.UOM;
                                    this.data.valas = "USD";
                                    this.data.quantity = result.Quantity;
                                    this.data.scNo = sc.SalesContractNo;
                                    //this.data.amount=sc.Amount;
                                    this.data.price = sc.Price;
                                    this.data.priceRO = sc.Price;
                                    this.data.comodity = result.Comodity;
                                    this.data.amount = sc.Amount;
                                });
                        })
                });
        }
    }

    sumSubTotal(opt) {
      let result = 0;
      const newDetails = this.data.details.map(d => {
        return {
          carton1: d.carton1,
          carton2: d.carton2,
          cartonQuantity: d.cartonQuantity,
          grossWeight: d.grossWeight,
          netWeight: d.netWeight,
          netNetWeight: d.netNetWeight,
          index: d.index
        };
      }).filter((value, index, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === index);
      for (const detail of newDetails) {
        const cartonExist = false;
        const indexItem = this.context.context.options.header.items.indexOf(this.data);
        if (indexItem > 0) {
          for (let i = 0; i < indexItem; i++) {
            const item = this.context.context.options.header.items[i];
            for (const prevDetail of item.details) {
              if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
                cartonExist = true;
                break;
              }
            }
          }
        }
        if (!cartonExist) {
          switch (opt) {
            case 0:
              result += detail.grossWeight * detail.cartonQuantity;
              break;
            case 1:
              result += detail.netWeight * detail.cartonQuantity;
              break;
            case 2:
              result += detail.netNetWeight * detail.cartonQuantity;
              break;
          }
        }
      }
      return result;
    }

    avG_GWChanged(newValue) {
        this.data.avG_GW = newValue;
        this.updateGrossWeight();
    }

    updateGrossWeight() {
        this.context.context.options.header.grossWeight = this.context.context.options.header.items.reduce((acc, cur) => acc += cur.avG_GW, 0);
    }

    avG_NWChanged(newValue) {
        this.data.avG_NW = newValue;
        this.updateNettWeight();
    }

    updateNettWeight() {
        this.context.context.options.header.nettWeight = this.context.context.options.header.items.reduce((acc, cur) => acc += cur.avG_NW, 0);
    }

    get totalQty() {
        let qty = 0;
        if (this.data.details) {
            for (var detail of this.data.details) {
                if (detail.cartonQuantity && detail.quantityPCS) {
                    qty += detail.cartonQuantity * detail.quantityPCS;
                }
            }
        }
        return qty;
    }

    get totalCtn() {
      let qty = 0;
      if (this.data.details) {
        const newDetails = this.data.details.map(d => {
          return {
            carton1: d.carton1,
            carton2: d.carton2,
            cartonQuantity: d.cartonQuantity,
            grossWeight: d.grossWeight,
            netWeight: d.netWeight,
            netNetWeight: d.netNetWeight,
            index: d.index
          };
        }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);
        for (var detail of newDetails) {
          const cartonExist = false;
          const indexItem = this.context.context.options.header.items.indexOf(this.data);
          if (indexItem > 0) {
            for (let i = 0; i < indexItem; i++) {
              const item = this.context.context.options.header.items[i];
              for (const prevDetail of item.details) {
                if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
                  cartonExist = true;
                  break;
                }
              }
            }
          }
          if (!cartonExist) {
            qty += detail.cartonQuantity;
          }
        }
      }
      return qty;
    }

    get amount() {
        this.data.amount = 0;
        if (this.data.quantity && this.data.price) {
            this.data.amount = this.data.quantity * this.data.price
        }
        return this.data.amount;
    }

    get subGrossWeight() {
      return this.sumSubTotal(0);
    }
  
    get subNetWeight() {
      return this.sumSubTotal(1);
    }
  
    get subNetNetWeight() {
      return this.sumSubTotal(2);
    }
}
