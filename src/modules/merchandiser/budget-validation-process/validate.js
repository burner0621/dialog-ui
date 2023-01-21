import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import moment from 'moment';

const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');
const buyerLoader = require('../../../loader/buyers-loader');

@inject(Router, Service)
export class Create {
    @bindable data = {};
    @bindable error = {};

    @bindable costCalculationGarment;
    @bindable validationType;
    @bindable buyer;
    @bindable article;

    options = {
        cancelText: "Clear",
        saveText: "Process",
    };

    length = {
        label: {
            align: "right",
            length: 4
        }
    };

    columns = [
        { header: "No.", value: "No" },
        { header: "Seksi", value: "Section" },
        { header: "No. PO", value: "PO_SerialNumber" },
        { header: "Kode", value: "ProductCode" },
        { header: "Item Barang", value: "ProductName" },
        { header: "Deskripsi Barang", value: "Description" },
        { header: "Qty", value: "BudgetQuantityString" },
        { header: "Satuan", value: "UOMPriceUnit" },
        { header: "Shipment", value: "DeliveryDate" },
        { header: "Seksi", value: "Section" },
        { header: "Staf Merchandiser", value: "CreatedBy" },     
        { header: "Status", value: "Status" },
    ];

    get costCalculationGarmentLoader() {
        return costCalculationGarmentLoader;
    }

    get buyerLoader() {
        return buyerLoader;
    }

    get costCalculationGarmentUnpostedFilter() {
        // Filter yang sudah Approved Md dan IE serta sudah Validasi Purchasing
        // Saat disimpan maka IsApprovedPPIC menjadi true
        // , dan sebagian Material value IsPosted menjadi true
        return {
            "CostCalculationGarment_Materials.Any(IsPosted == false)": true,
            "CostCalculationGarment_Materials.Any(IsPosted == true)": true,
            IsApprovedMD: true,
            IsApprovedPurchasing: true,
            IsApprovedIE: true,
            // IsApprovedPPIC : false
        };
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async costCalculationGarmentChanged(newValue) {
        if (newValue && newValue.Id) {
            this.data.CostCalculationGarment = await this.service.getCostCalculationGarmentById(newValue.Id);

            if (this.data.CostCalculationGarment && this.data.CostCalculationGarment.CostCalculationGarment_Materials) {

                // Ambil semua Products di GarmentPurchaseRequests untuk mengecek
                // Product di CostCalculation_Materials adalah MASTER (IsPRMaster) atau JOB ORDER
                this.buyer = `${this.data.CostCalculationGarment.BuyerBrand.Code} - ${this.data.CostCalculationGarment.BuyerBrand.Name}`;
                this.article = this.data.CostCalculationGarment.Article;

                /* FILTER MATERIALS */
                // Cek apakah CostCalculation punya Material yang IsPosted adalah "TRUE"
                // Untuk validasi pertama kali harusnya tidak ada, sehingga Jenis Validasi = "NON PROCESS"
                // , Kemudian hanya memvalidasi Materials yang Category bukan "PROCESS"
                // Untuk validasi selanjutnya jika ada, Jenis Validasi = "PROCESS"
                // , Kemudian hanya memvalidasi Materials yang Category adalah "PROCESS"
                // Saat validasi IsPosted pada Material dibuat "TRUE"

                let isAnyPostedMaterials = this.data.CostCalculationGarment.CostCalculationGarment_Materials.reduce((acc, cur) => {
                    return acc || cur.IsPosted || false;
                }, false);

                this.validationType = (isAnyPostedMaterials === true) ? "Process" : "Non Process";

                this.data.CostCalculationGarment_Materials = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(mtr => {
                    let processOrNot = (isAnyPostedMaterials === true) ? (mtr.Category.name.toUpperCase() === "PROCESS") : (mtr.Category.name.toUpperCase() !== "PROCESS");
                    return true
                        && mtr.IsPosted !== true
                        // && mtr.Category.Name.toUpperCase() !== "PROCESS"
                        // && mtr.Category.Name.toUpperCase() === "PROCESS"
                        && processOrNot
                });
                /* FILTER MATERIALS */

                let no = 0;
                this.data.CostCalculationGarment_Materials.map(material => {
                    material.No = ++no;
                    material.Section = this.data.CostCalculationGarment.Section;
                    material.ProductCode = material.Product.Code;
                    material.ProductName = material.Product.Name;
                    material.UOMPriceUnit = material.UOMPrice.Unit;
                    material.DeliveryDate = moment(this.data.CostCalculationGarment.DeliveryDate).format("DD MMM YYYY");
                    material.BudgetQuantityString = material.BudgetQuantity.toFixed(2);
                    material.IsPRMaster = material.PRMasterId > 0;
                    material.Status = material.IsPRMaster ? "MASTER" : "JOB ORDER";
                });
            }
        }
        else {
            this.clear();
        }
    }

    clear() {
        this.data = {};
        this.error = {};

        this.costCalculationGarmentVM.editorValue = "";
        this.costCalculationGarment = null;
        this.validationType = "";
        this.buyer = "";
        this.article = "";
    }

    cancelCallback(event) {
        this.clear();
    }

    saveCallback() {
        if (this.data.CostCalculationGarment) {
            if (confirm("Validasi Budget?")) {
                var sentData = this.data.CostCalculationGarment || {};
                sentData.CostCalculationGarment_Materials = this.data.CostCalculationGarment_Materials;
                this.service.create(sentData)
                    .then(result => {
                        alert("Berhasil Validasi Budget");
                        this.clear();
                    })
                    .catch(e => {
                        if (e.statusCode === 500) {
                            alert("Gagal menyimpan, silakan coba lagi!");
                            this.error = JSON.parse(e.message);
                        } else {
                            this.error = e;
                        }
                    });
            }
        } else {
            this.error = { RONo: "No. RO harus diisi." };
        }
    }
}
