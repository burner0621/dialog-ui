import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, CoreService, ProductionService } from '../service';

const UnitLoader = require('../../../../../loader/garment-units-loader');
const ROLoader = require('../../../../../loader/garment-external-purchase-orders-item-by-ro-loader');
const LeftoverComodityLoader = require('../../../../../loader/garment-leftover-comodity-loader');


@inject(Service, CoreService, ProductionService)
export class ItemFinishedGood {

    @bindable selectedUnit;
    @bindable selectedLeftoverComodity;
    @bindable selectedRo;

    constructor(service, coreService, productionService) {
        this.service = service;
        this.coreService = coreService;
        this.productionService = productionService;
    }

    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if (this.data.Uom == null) {
            let uomResult = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: 'PCS' }) });
            this.data.Uom = {
                Id: uomResult.data[0].Id,
                Unit: uomResult.data[0].Unit
            }
        }

        if (this.data) {
            this.selectedUnit = this.data.Unit;
            this.selectedLeftoverComodity = this.data.LeftoverComodity;
            this.selectedRo = this.data.RONo;
        }
    }
    filter = {
        'RONo.Contains("M")': "false",
        'RONo.Contains("S")': "false"
    };

    get unitLoader() {
        return UnitLoader;
    }

    get roLoader() {
        return ROLoader;
    }

    get leftoverComodityLoader() {
        return LeftoverComodityLoader;
    }

    selectedUnitChanged(newValue) {
        this.data.Unit = null;
        this.data.RONo = null;
        this.data.BasicPrice = 0;
        if (newValue) {
            this.data.Unit = {
                Id: newValue.Id,
                Code: newValue.Code,
                Name: newValue.Name
            }
        }
    }

    selectedLeftoverComodityChanged(newValue, oldValue) {
        this.data.LeftoverComodity = null;

        if (newValue) {
            this.data.LeftoverComodity = {
                Id: newValue.Id,
                Code: newValue.Code,
                Name: newValue.Name
            }
        }
    }

    async selectedRoChanged(newValue) {
        this.data.RONo = null;
        this.data.BasicPrice = 0;
        if (newValue) {
            this.data.RONo = newValue.RONo;
            if (this.data.Unit && this.data.RONo) {
                var filter = {
                    UnitId: this.data.Unit.Id,
                    RONo: this.data.RONo
                };
                var info = {
                    keyword: null,
                    filter: JSON.stringify(filter),
                };
                this.data.BasicPrice = await this.productionService.getBasicPriceByRO(info)
                    .then((result) => {
                        return result.data == "NaN" ? 0 : result.data;
                    });
            }
        }
    }
}