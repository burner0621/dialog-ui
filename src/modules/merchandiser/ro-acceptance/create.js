import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { PurchaseRequestService } from './service';
import moment from 'moment';
import { activationStrategy } from 'aurelia-router';

const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');
var SectionLoader = require('../../../loader/garment-sections-loader');

@inject(Router, Service)
export class Create {
    @bindable data = {};
    @bindable error = {};
    @bindable isCreate = false;
    @bindable costCalculationGarment;
    @bindable validationType;
    @bindable buyer;
    @bindable article;
    @bindable section;
    @bindable itemOptions = {};
    @bindable section;
    @bindable sectionId;

    options = {
        cancelText: "Kembali",
        saveText: "Terima",
    };

    length = {
        label: {
            length: 1,
        },
        control: {
            length: 3,
        }
    }

    columns = [
       "No RO",
       "Kode Brand",
       "Nama Buyer Brand",
       "Artikel",
       "Unit",
       "Kuantitas Order",
       "Satuan",
    ];

    get costCalculationGarmentLoader() {
        return costCalculationGarmentLoader;
    }

    get costCalculationGarmentUnpostedFilter() {
        return { "CostCalculationGarment_Materials.Any(IsPosted == false) && SCGarmentId > 0": true, IsValidatedROSample: true };
    }

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = {};
        this.error = {};
    }

    async sectionChanged(newValue) {
        if (newValue && newValue.Id) {
            this.itemOptions = {
                isCreate : true,
                sectionId : newValue.Id,
            }
            let costCalculationGarment = await this.service.getCostCalculationGarment({
                size: Number.MAX_SAFE_INTEGER,
                filter : JSON.stringify({
                    Section : newValue.Code,
                    IsApprovedPPIC : true,
                    IsROAccepted : false
                })
            });
            this.data.CostCalculationGarment = costCalculationGarment.data;
            if (this.data.CostCalculationGarment && this.data.CostCalculationGarment.CostCalculationGarment_Materials) {

                let productsInPRMaster = [];
                if (this.data.CostCalculationGarment.PreSCId) {
                    const info = {
                        select: JSON.stringify({ Id: 1, PRNo: 1, SCId: 1, SCNo: 1, "Items.ProductId": 1, "Items.ProductCode": 1 }),
                        filter: JSON.stringify({ SCId: this.data.CostCalculationGarment.PreSCId, PRType: "MASTER" })
                    };
                    let purchaseRequest = await this.purchaseRequestService.getProducts(info);

                    if (purchaseRequest.data && purchaseRequest.data.length > 0) {
                        productsInPRMaster = purchaseRequest.data.reduce(
                            (acc, cur) => acc.concat(cur.Items.map(i => i.ProductCode))
                            , []);
                    }
                }

                this.buyer = `${this.data.CostCalculationGarment.BuyerBrand.Code} - ${this.data.CostCalculationGarment.BuyerBrand.Name}`;
                this.article = this.data.CostCalculationGarment.Article;

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

                let no = 0;
                this.data.CostCalculationGarment_Materials.map(material => {
                    material.No = ++no;
                    material.Section = this.data.CostCalculationGarment.Section;
                    material.ProductCode = material.Product.Code;
                    material.ProductName = material.Product.Name;
                    material.UOMPriceUnit = material.UOMPrice.Unit;
                    material.DeliveryDate = moment(this.data.CostCalculationGarment.DeliveryDate).format("DD MMM YYYY");
                    material.BudgetQuantityString = material.BudgetQuantity.toFixed(2);
                    material.IsPRMaster = productsInPRMaster.indexOf(material.ProductCode) > -1;
                    material.Status = material.IsPRMaster ? "MASTER" : "JOB ORDER";
                });
            }
        }
        else {
            this.clear();
        }
    }

    get sectionLoader() {
        return SectionLoader;
    }

    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }

    cancelCallback(event) {
        this.router.navigateToRoute('list');
    }

    clear() {
        this.data = {};
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    saveCallback() {
        if (this.section) {
            if (confirm("Terima RO Garment?")) {
                // var sentData = this.data.CostCalculationGarment || {};
                var sentData=[];
                for(var item of this.data.CostCalculationGarment){
                    if(item.IsSave == true){

                        sentData.push(item.Id)
                    }
                }
                // sentData.CostCalculationGarment_Materials = this.data.CostCalculationGarment_Materials;
                if(sentData.length>0){
                    this.service.accpeted(sentData)
                    .then(result => {
                        alert("Berhasil Menerima RO");
                        this.router.navigateToRoute('create', {}, { replace: true, trigger: true });
                    })
                    .catch(e => {
                        if (e.statusCode === 500) {
                            this.error = JSON.parse(e.message);
                        } else {
                            this.error = e;
                        }
                    });
                } else {
                    this.error = { MaterialsCount: "Item belum ada yang dipilih"}
                }
            }
        } else {
            this.error = { section: "Seksi harus diisi." };
        }
    }
}
