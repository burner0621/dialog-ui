import { inject, bindable, computedFrom } from 'aurelia-framework';
import { SalesService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../loader/uom-loader");

@inject(SalesService)
export class Item {
    @bindable selectedRO;
    @bindable avG_GW;
    @bindable avG_NW;

    constructor(salesService) {
        this.salesService = salesService;
    }

    get filter() {
        var filter = {
            // BuyerCode:this.data.BuyerCode,
            // Section: this.data.Section,
            "SCGarmentId!=null": true
        };
        return filter;
    }

    detailsColumns = [
        { header: "Carton 1" },
        { header: "Carton 2" },
        { header: "Colour" },
        { header: "Jml Carton" },
        { header: "Qty" },
        { header: "Total Qty" },
        { header: "" },
    ];

    get roLoader() {
        return CostCalculationLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    uomView = (uom) => {
        return `${uom.Unit || uom.unit}`
    }

    roView = (costCal) => {
        return `${costCal.RO_Number}`
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
            header: context.context.options.header
        };
        if (this.data.roNo) {
            this.selectedRO = {
                RO_Number: this.data.RONo || this.data.roNo
            };
        }
        this.isShowing = false;
        if (this.data.details) {
            if (this.data.details.length > 0) {
                this.isShowing = true;
            }
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
                                    this.data.marketingName = result.MarketingName;      
                                    this.data.buyerAgent = result.Buyer;
                                    this.data.buyerBrand = result.BuyerBrand;
                                    this.data.sectionName = result.SectionName;
                                    this.data.section = {
                                        id: psc.SectionId,
                                        code: result.Section,
                                    };
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

    get addDetails() {
        return (event) => {
            const i = this.context.context.items.indexOf(this.context);

            let lastDetail;
            if (this.data.details.length > 0) {
                lastDetail = this.data.details[this.data.details.length - 1];
            } else if (i > 0) {
                const lastItem = this.context.context.items[i - 1];
                lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
            }

            this.data.details.push({
                carton1: lastDetail ? lastDetail.carton2 + 1 : 0
            });
        };
    }

    get removeDetails() {
        return (event) => {
            this.error = null;
        };
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
            for (var detail of this.data.details) {
                if (detail.cartonQuantity) {
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
}