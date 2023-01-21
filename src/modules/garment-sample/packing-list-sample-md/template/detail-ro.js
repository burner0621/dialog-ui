import { inject, bindable, computedFrom } from 'aurelia-framework';
import { SalesService, GarmentProductionService, CoreService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../loader/uom-loader");
var UnitLoader = require("../../../../loader/garment-units-loader");
var SampleRequestLoader = require("../../../../loader/garment-sample-request-loader");

@inject(SalesService, GarmentProductionService, CoreService)
export class Item {
    @bindable selectedRO;
    @bindable uom;
    @bindable avG_GW;
    @bindable avG_NW;
    @bindable unit;

    roTypeOptions = ["RO SAMPLE", "RO JOB"];

    constructor(salesService, garmentProductionService, coreService) {
        this.salesService = salesService;
        this.garmentProductionService = garmentProductionService;
        this.coreService = coreService;
    }

    get filter() {
        var filter = {};
        if (this.data.roType == "RO JOB") {
            if (this.header.invoiceType != "SM") {
                filter = {
                    BuyerCode: this.data.BuyerCodeFilter,
                    Section: this.data.SectionFilter,
                    "SCGarmentId!=null": true
                };
            }
            else {
                filter = {
                    Section: this.data.SectionFilter,
                    "SCGarmentId!=null": true
                };
            }
        }
        return filter;
    }

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
        if (this.data.roType == 'RO SAMPLE') {
            return SampleRequestLoader;
        } else {
            return CostCalculationLoader;
        }
    }

    get uomLoader() {
        return UomLoader;
    }

    get unitLoader() {
        return UnitLoader;
    }

    currencyView = (currency) => {
        return `${currency.Code || currency.code}`
    }

    unitView = (unit) => {
        return `${unit.Code || unit.code}`
    }

    uomView = (uom) => {
        return `${uom.Unit || uom.unit}`
    }

    roView = (ro) => {
        if (this.data.roType == 'RO SAMPLE')
            return `${ro.RONoSample}`;
        else
            return `${ro.RO_Number}`;
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
        this.header = context.context.options.header;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit: this.isEdit,
            header: this.header,
            item: this.data
        };
        this.header = context.context.options.header;
        if (this.data.roType) {
            if (this.data.roNo) {
                if (this.data.roType == 'RO SAMPLE') {
                    this.selectedRO = {
                        RONoSample: this.data.RONo || this.data.roNo,
                    };
                } else {
                    this.selectedRO = {
                        RO_Number: this.data.RONo || this.data.roNo,
                    };
                }
            }
        }

        if (this.data.uom) {
            this.uom = this.data.uom;
        }
        this.isShowing = false;
        if (this.data.details && !this.data.id) {
            if (this.data.details.length > 0 ) {
                this.isShowing = true;
            }
        }
    }

    selectedROChanged(newValue) {
        if (newValue) {
            if (this.data.roType == 'RO JOB') {
                this.salesService.getCostCalculationById(newValue.Id)
                    .then(result => {
                        this.salesService.getSalesContractById(result.SCGarmentId)
                            .then(sc => {
                                this.data.roNo = result.RO_Number;
                                this.data.article = result.Article;
                                this.data.buyerBrand = result.BuyerBrand;
                                this.data.unit = result.Unit;

                                this.data.uom = result.UOM;
                                this.uom = result.UOM;
                                this.data.valas = "USD";
                                this.data.quantity = result.Quantity;
                                this.data.scNo = sc.SalesContractNo;
                                //this.data.amount=sc.Amount;
                                this.data.price = sc.Price;
                                this.data.priceRO = sc.Price;
                                this.data.comodity = result.Comodity;
                                this.data.amount = sc.Amount;
                            })
                    });

            } else {
                this.garmentProductionService.getSampleRequestById(newValue.Id)
                    .then(async result => {
                        this.data.roNo = result.RONoSample;
                        this.data.article = result.SampleProducts.map(x => x.Style).join(',');
                        this.data.buyerBrand = result.Buyer;
                        var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
                        this.data.unit = units.data[0];

                        let uomResult = await this.coreService.getUom({ size: 1, keyword: 'PCS', filter: JSON.stringify({ Unit: 'PCS' }) });
                        this.data.uom = uomResult.data[0];
                        this.uom = uomResult.data[0];
                        this.data.valas = "USD";
                        this.data.quantity = result.SampleProducts.reduce((acc, cur) => acc += cur.Quantity, 0);
                        this.data.scNo = result.SampleRequestNo;
                        //this.data.amount=sc.Amount;
                        this.data.price = 0;
                        this.data.priceRO = 0;
                        this.data.comodity = result.Comodity;
                        this.data.amount = 0;
                    })
            }
        }
    }

    uomChanged(newValue) {
        if (newValue) {
            this.data.uom = newValue;
            this.uom = newValue;
        }
    }

    get addDetails() {
        return (event) => {
            const i = this.context.context.items.indexOf(this.context);
            let lastIndex;

            let lastDetail;
            if (this.data.details.length > 0) {
                lastDetail = this.data.details[this.data.details.length - 1];
                lastIndex = this.data.details[this.data.details.length - 1].index;
            } else if (i > 0) {
                const lastItem = this.context.context.items[i - 1];
                lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
            }

            this.data.details.push({
                carton1: lastDetail ? lastDetail.carton2 + 1 : 0,
                index: lastIndex ? lastIndex : 1,
                sizes: []
            });
        };
    }

    get removeDetails() {
        return (event) => {
            this.error = null;
            const gw = this.sumSubTotal(0);
            const nw = this.sumSubTotal(1);
            const nnw = this.sumSubTotal(2);
            this.context.context.options.header.grossWeight = gw;
            this.context.context.options.header.nettWeight = nw;
            this.context.context.options.header.netNetWeight = nnw;
            this.data.subGrossWeight = gw;
            this.data.subNetWeight = nw;
            this.data.subNetNetWeight = nnw;
            //this.updateMeasurements();
        };
    }

    updateMeasurements() {
        let measurementCartons = [];
        for (const item of this.context.context.options.header.items) {
            for (const detail of (item.details || [])) {
                let measurement = measurementCartons.find(m => m.length == detail.length && m.width == detail.width && m.height == detail.height && m.carton1 == detail.carton1 && m.carton2 == detail.carton2);
                if (!measurement) {
                    measurementCartons.push({
                        carton1: detail.carton1,
                        carton2: detail.carton2,
                        length: detail.length,
                        width: detail.width,
                        height: detail.height,
                        cartonsQuantity: detail.cartonQuantity
                    });
                }
            }
        }

        let measurements = [];
        for (const measurementCarton of measurementCartons) {
            let measurement = measurements.find(m => m.length == measurementCarton.length && m.width == measurementCarton.width && m.height == measurementCarton.height);
            if (measurement) {
                measurement.cartonsQuantity += measurementCarton.cartonsQuantity;
            } else {
                measurements.push(Object.assign({}, measurementCarton));
            }
        }

        this.context.context.options.header.measurements = this.context.context.options.header.measurements || [];
        this.context.context.options.header.measurements.splice(0);

        for (const mt of measurements) {
            let measurement = (this.context.context.options.header.measurementsTemp || []).find(m => m.length == mt.length && m.width == mt.width && m.height == mt.height);
            if (measurement) {
                measurement.cartonsQuantity = mt.cartonsQuantity;
                this.context.context.options.header.measurements.push(measurement);
            } else {
                this.context.context.options.header.measurements.push(mt);
            }
        }

        this.context.context.options.header.measurements.forEach((m, i) => m.MeasurementIndex = i);
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
                    qty += detail.cartonQuantity;
                }
            }
            return qty;
        }
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

    roTypeChanged(e) {
        let type = (e.detail) ? e.detail : "";

        if (type) {
            this.data.roType = type;
        }

    }
}
