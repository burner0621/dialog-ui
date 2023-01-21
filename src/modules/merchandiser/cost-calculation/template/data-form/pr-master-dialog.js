import { inject, useView } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Service, PurchasingService } from '../../service';
import { ServiceCore } from '../../service-core';

@inject(DialogController, Service, PurchasingService, ServiceCore)
@useView("modules/merchandiser/cost-calculation/template/data-form/pr-master-dialog.html")
export class PRMasterDialog {
    data = {};
    error = {};

    constructor(controller, service, prService, coreService) {
        this.controller = controller;
        this.answer = null;
        this.service = service;
        this.prService = prService;
        this.coreService = coreService;
    }

    options = {
        showColumns: false,
        showToggle: false,
        clickToSelect: true,
        height: 500
    }

    columns = [
        { field: "isSelected", radio: true, sortable: false, },
        { field: "GarmentPurchaseRequest.PRNo", title: "Nomor PR" },
        { field: "GarmentPurchaseRequest.RONo", title: "Nomor RO" },
        { field: "GarmentPurchaseRequest.Article", title: "Artikel" },
        { field: "PO_SerialNumber", title: "No. PO" },
        { field: "Category.name", title: "Kategori" },
        { field: "Product.Code", title: "Kode Barang" },
        { field: "Composition.Composition", title: "Komposisi", sortable: false },
        { field: "Const.Const", title: "Konstruksi", sortable: false },
        { field: "Yarn.Yarn", title: "Yarn", sortable: false },
        { field: "Width.Width", title: "Width", sortable: false },
        { field: "ProductRemark", title: "Keterangan" },
        { field: "Quantity", title: "Jumlah" },
        { field: "UomUnit", title: "Satuan" },
        { field: "AvailableQuantity", title: "Jumlah Tersedia", sortable: false },
    ];

    loader = (info) => {
        this.selectedData = [];

        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            search: JSON.stringify(["PO_SerialNumber", "CategoryName", "ProductCode", "ProductName", "GarmentPurchaseRequest.PRNo", "GarmentPurchaseRequest.Article", "GarmentPurchaseRequest.RONo"]),
            order: order,
            select: "new( " +
                "GarmentPurchaseRequest.Id as PRId, GarmentPurchaseRequest.PRType, GarmentPurchaseRequest.SCId, GarmentPurchaseRequest.SCNo, GarmentPurchaseRequest.PRNo, GarmentPurchaseRequest.RONo, GarmentPurchaseRequest.Article," +
                "Id, PO_SerialNumber, CategoryId, CategoryName, ProductId, ProductCode, ProductName, ProductRemark, Quantity, BudgetPrice, UomId, UomUnit, PriceUomId, PriceUomUnit" +
                ")",
            filter: JSON.stringify(this.filter),
        }

        return this.prService.searchItems(arg)
            .then(result => {
                result.data.map(data => {
                    return data;
                });

                let data = [];
                for (const d of result.data) {
                    data.push(Object.assign({
                        PRMasterId: d.PRId,
                        PRMasterItemId: d.Id,
                        POMaster: d.PO_SerialNumber,

                        PRNo: d.PRNo,
                        RONo: d.RONo,
                        Article: d.Article,
                        "GarmentPurchaseRequest.PRNo": d.PRNo,
                        "GarmentPurchaseRequest.RONo": d.RONo,
                        "GarmentPurchaseRequest.Article": d.Article,

                        Category: {
                            Id: d.CategoryId,
                            // code: i.CategoryCode,
                            name: d.CategoryName,
                        },
                        Product: {
                            Id: d.ProductId,
                            Code: d.ProductCode,
                            Name: d.ProductName,
                        },
                        Description: d.ProductRemark,
                        Uom: {
                            Id: d.UomId,
                            Unit: d.UomUnit
                        },
                        BudgetPrice: d.BudgetPrice,
                        PriceUom: {
                            Id: d.PriceUomId,
                            Unit: d.PriceUomUnit
                        }
                    }, d));
                }

                let materialsFilter = {};
                materialsFilter[`(CostCalculationGarmentId == ${this.CCId})`] = false;

                const prmasteritemids = data.filter((item, index) => item.PRMasterItemId > 0 && data.findIndex(d => d.PRMasterItemId === item.PRMasterItemId) === index).map(item => item.PRMasterItemId);

                const materialsInfo = {
                    size: 0,
                    select: "new(PRMasterId, PRMasterItemId, BudgetQuantity)",

                    prmasteritemids: JSON.stringify(prmasteritemids),
                    filter: JSON.stringify(materialsFilter)

                };

                return this.service.getMaterials(materialsInfo)
                    .then(ccMaterialsResults => {
                        const ccMaterials = ccMaterialsResults.data || [];
                        data.forEach(d => {
                            const selectedCCMaterials = ccMaterials.filter(m => m.PRMasterId === d.PRMasterId && m.PRMasterItemId === d.PRMasterItemId);
                            const othersQuantity = selectedCCMaterials.reduce((acc, cur) => acc += cur.BudgetQuantity, 0);
                            d.AvailableQuantity = d.Quantity - othersQuantity;
                        });

                        let fabricItemsProductIds = data
                            .filter(i => i.Category.name === "FABRIC")
                            .map(i => i.Product.Id);

                        if (fabricItemsProductIds.length) {
                            return this.coreService.getGarmentProductsByIds(fabricItemsProductIds)
                                .then(garmentProductsResult => {
                                    data.filter(i => i.Category.name === "FABRIC")
                                        .forEach(i => {
                                            const product = garmentProductsResult.find(d => d.Id == i.Product.Id);

                                            i.Product = product;
                                            i.Composition = product;
                                            i.Const = product;
                                            i.Yarn = product;
                                            i.Width = product;
                                        });

                                    return {
                                        total: result.info.total,
                                        data: data
                                    }
                                });
                        } else {
                            return {
                                total: result.info.total,
                                data: data
                            }
                        }
                    });
            });
    }

    activate(params) {
        this.CCId = params.CCId;
        this.filter = {};
        this.filter["GarmentPurchaseRequest.PRType == \"MASTER\" || GarmentPurchaseRequest.PRType == \"SAMPLE\""] = true;
        this.filter[`GarmentPurchaseRequest.SCId == ${params.SCId} || IsApprovedOpenPOKadivMd`] = true;
        this.filter["GarmentPurchaseRequest.IsValidatedMD2"] = true;
    }

    select() {
        if (this.selectedData && this.selectedData.length > 0) {
            this.controller.ok(this.selectedData[0]);
        } else {
            alert("Belum ada yang dipilih!")
        }
    }
}
