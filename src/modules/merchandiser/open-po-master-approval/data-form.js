import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service, CoreService, CostCalculationService } from './service';
const PRMasterLoader = require('../../../loader/garment-purchase-request-loader');

@inject(Service, CoreService, CostCalculationService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedPRNo;

    constructor(service, coreService, costCalculationService) {
        this.service = service;
        this.coreService = coreService;
        this.ccService = costCalculationService;

        this.controlOptions = {
            label: {
                length: 4
            },
            control: {
                length: 5
            }
        }

        this.formOptions = {
            cancelText: "Kembali",
            saveText: "Approve",
        };

    }

    @computedFrom("data.Buyer")
    get buyer() {
        if (this.data && this.data.Buyer) {
            return `${this.data.Buyer.Code} - ${this.data.Buyer.Name}`;
        } else {
            return "";
        }
    }

    get unit() {
        if (this.data && this.data.Unit) {
            return `${this.data.Unit.Code} - ${this.data.Unit.Name}`;
        } else {
            return "";
        }
    }

    get prMasterFilter() {
        let filter = {
            "IsValidatedMD2": true
        };
        filter["(PRType == \"MASTER\" || PRType == \"SAMPLE\")"] = true;
        filter["Items.Any(IsOpenPO==false)"] = true;
        return filter;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit: this.isEdit
        };

        if (this.data && this.data.Items && this.data.Items.length > 0) {
            await this.setItems(this.data.Items);
        }
    }

    get PRMasterLoader() {
        return PRMasterLoader;
    }

    itemsColumns = [
        { header: "No. PO" },
        { header: "Kategori" },
        { header: "Kode Barang" },
        { header: "Komposisi" },
        { header: "Konstruksi" },
        { header: "Yarn" },
        { header: "Width" },
        { header: "Keterangan" },
        { header: "Jumlah" },
        { header: "Satuan" },
        { header: "Price" },
        { header: "Satuan Harga" },
        { header: "Konversi" },
        { header: "Total" },
        { header: "Jumlah Tersedia" },
        { header: "Satuan" },
    ]

    async selectedPRNoChanged(newValue) {
        if (newValue) {
            const data = await this.service.read(newValue.Id);
            Object.assign(this.data, data);
            if (this.data.Items) {
                this.data.Items = this.data.Items.filter(i => i.IsOpenPO === false);

                await this.setItems(this.data.Items);
            }
        } else {
            this.data = {};
        }
    }

    async setItems(items) {
        const prmasteritemids = items.map(item => item.Id);
        if (prmasteritemids.length) {
            const materialsInfo = {
                size: 0,
                select: "new(PRMasterId, PRMasterItemId, BudgetQuantity)",
                prmasteritemids: JSON.stringify(prmasteritemids),
                filter: JSON.stringify({ PRMasterId: this.data.Id })
            };

            const ccMaterialsResults = await this.ccService.getMaterials(materialsInfo);
            const ccMaterials = ccMaterialsResults.data || [];

            items.forEach(d => {
                const selectedCCMaterials = ccMaterials.filter(m => m.PRMasterItemId === d.Id);
                const othersQuantity = selectedCCMaterials.reduce((acc, cur) => acc += cur.BudgetQuantity, 0);
                d.AvailableQuantity = d.Quantity - othersQuantity;
            });
        }

        let fabricItemsProductIds = items
            .filter(i => i.Category.Name === "FABRIC")
            .map(i => i.Product.Id);

        if (fabricItemsProductIds.length) {
            const garmentProducts = await this.coreService.getGarmentProductsByIds(fabricItemsProductIds);
            items
                .filter(i => i.Category.Name === "FABRIC")
                .forEach(i => {
                    i.Product = garmentProducts.find(d => d.Id == i.Product.Id);
                });
        }
    }

    changeCheckedAll() {
        (this.data.Items || []).forEach(i => i.IsSave = this.context.checkedAll);
    }
}