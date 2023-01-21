import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Router } from 'aurelia-router';
import { Service, PurchaseRequestService, DeliveryOrderService, CostCalculationService } from './service';
var SupplierLoader = require('../../../loader/garment-supplier-loader');

@inject(Router, Service, PurchaseRequestService, DeliveryOrderService, CostCalculationService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable data = {};
    @bindable title;
    @bindable selectedSupplier;
    @bindable selectedDeliveryOrder;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    itemsColumns = [
        { header: "Nomor PO External" },
        { header: "Nomor PR" },
        { header: "Nomor Referensi PR" },
        { header: "Barang" },
        { header: "Dipesan" },
        { header: "Diterima" },
        { header: "Satuan" },
        { header: "Konversi" },
        { header: "Jumlah Kecil" },
        { header: "Satuan Kecil" },
        { header: "Harga" },
        { header: "Harga Total" },
        { header: "Mata Uang" },
        { header: "Catatan" },
    ]

    @computedFrom("data.Supplier")
    get deliveryOrderLoader() {
        return (keyword) => {
            var info = {
                keyword: keyword,
                filter: JSON.stringify({
                    "BillNo != null": true,
                    // "CustomsId > 0": true,
                    "Items.Any(Details.Any(PRNo != null && PRNo.StartsWith(\"PR\") && PRNo.EndsWith(\"M\")))": true,
                    "SupplierId": this.data.Supplier ? this.data.Supplier.Id : 0
                }),
                select: JSON.stringify({ "DONo": "1", "Id": "1" }),
                search: JSON.stringify(["DONo"]),
                order: { "DONo": "asc" }
            };
            return this.doService.search(info)
                .then((result) => {
                    return result.data.map(data => {
                        data.toString = function () { return `${this.doNo} - ${this.supplierName}`; };
                        return data;
                    });
                });
        }
    }

    @computedFrom("data.deliveryOrder")
    get supplierType() {
        let supplierType;
        if (this.data.deliveryOrder && this.data.deliveryOrder.supplier) {
            supplierType = (this.data.deliveryOrder.supplier.import || false) ? "Import" : "Lokal";
        }
        return supplierType;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    supplierView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    };

    constructor(Router, Service, PurchaseRequestService, DeliveryOrderService, CostCalculationService) {
        this.router = Router;
        this.service = Service;
        this.prService = PurchaseRequestService;
        this.doService = DeliveryOrderService;
        this.ccService = CostCalculationService;
    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit: this.isEdit
        };
    }

    selectedSupplierChanged(newValue) {
        this.context.selectedDeliveryOrderViewModel.editorValue = "";
        this.selectedDeliveryOrder = null;

        if (newValue) {
            this.data.Supplier = newValue;
        } else {
            this.data.Supplier = null;
        }
    }

    async selectedDeliveryOrderChanged(newValue) {
        if (this.data.Items) {
            this.data.Items.splice(0);
        } else {
            this.data.Items = [];
        }
        this.context.error = null;

        if (newValue) {
            const checkExistingPOMasterDistribution = await this.service.search({
                select: JSON.stringify({ "Id": 1, "DOId": 1, "DONo": 1 }),
                filter: JSON.stringify({ "DOId": newValue.Id })
            });

            if (checkExistingPOMasterDistribution && checkExistingPOMasterDistribution.info && checkExistingPOMasterDistribution.info.total > 0) {
                const existingPOMasterDistribution = checkExistingPOMasterDistribution.data.find(d => d.DOId == newValue.Id);
                
                if (confirm("NO SJ Sudah Pembagian PO Master. Ubah?")) {
                    this.router.navigateToRoute('edit', { id: existingPOMasterDistribution.Id });
                }
                return;
            }

            this.data.deliveryOrder = await this.doService.read(newValue.Id);

            if (this.data.deliveryOrder) {
                this.data.DOId = this.data.deliveryOrder.Id;
                this.data.DONo = this.data.deliveryOrder.doNo;
                this.data.DODate = this.data.deliveryOrder.doDate;

                let items = [];

                for (const item of this.data.deliveryOrder.items) {
                    for (const detail of item.fulfillments) {
                        if (detail.pRNo && detail.pRNo.startsWith("PR") && detail.pRNo.endsWith("M")) {
                            items.push({
                                DOItemId: item.Id,
                                DODetailId: detail.Id,
                                EPONo: item.purchaseOrderExternal.no,
                                PRId: detail.pRId,
                                PRItemId: detail.pRItemId, // untuk filter CC saja
                                PRNo: detail.pRNo,
                                POSerialNumber: detail.poSerialNumber,
                                Product: detail.product,
                                DealQuantity: detail.dealQuantity,
                                DOQuantity: detail.doQuantity,
                                Uom: detail.purchaseOrderUom,
                                Conversion: detail.conversion,
                                SmallQuantity: detail.smallQuantity,
                                SmallUom: detail.smallUom,
                                PricePerDealUnit: detail.pricePerDealUnit,
                                PriceTotal: detail.priceTotal,
                                Currency: item.currency,
                                Remark: detail.product.Remark
                            });
                        }
                    }
                }

                let ccFilter = {};
                ccFilter['CostCalculationGarment.IsApprovedPPIC'] = true;
                ccFilter['IsPRMaster'] = true;
                ccFilter[items.map(item => `PRMasterId == ${item.PRId}`).join(" or ")] = true;
                ccFilter[items.map(item => `PRMasterItemId == ${item.PRItemId}`).join(" or ")] = true;

                const constCalculationMaterials = await this.ccService.readMaterials({
                    filter: JSON.stringify(ccFilter),
                    select: "new(Id, IsPRMaster, PRMasterId, PRMasterItemId, PO_SerialNumber, new(ProductId as Id, ProductCode as Code) as Product, BudgetQuantity, new(UOMPriceId as Id, UOMPriceName as Unit) as UOMPrice, CostCalculationGarment.Id as CostcalculationId, CostCalculationGarment.RO_Number, CostCalculationGarment.PreSCId)"
                });

                items.forEach(item => {
                    const ccMaterials = constCalculationMaterials.data.filter(f => f.PRMasterId == item.PRId && f.PRMasterItemId == item.PRItemId);

                    item.Details = (ccMaterials || []).map(material => {
                        item.SCId = material.PreSCId;
                        return {
                            Conversion: 1,
                            // ParentProduct: item.Product,
                            Uom: item.Uom,
                            // SCId: material.PreSCId,

                            RONo: material.RO_Number,
                            CostcalculationId: material.CostcalculationId,

                            POSerialNumber: material.PO_SerialNumber,
                            Product: material.Product,
                            QuantityCC: material.BudgetQuantity,
                            UomCC: material.UOMPrice
                        };
                    });

                    this.data.Items.push(item);
                });
            }

        } else {
            this.data.deliveryOrder = null;
            this.data.DOId = 0;
            this.data.DONo = null;
            this.data.DODate = null;
        }
    }
}
