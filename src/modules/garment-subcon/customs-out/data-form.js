import { bindable, inject, computedFrom } from "aurelia-framework";
import { data } from "jquery";
import { Service } from "./service";

var moment = require('moment');

const ContractLoader = require('../../../loader/garment-subcon-contract-loader');

@inject(Service)
export class DataForm {
    @bindable readOnly = false;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isView = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedCustomsType;
    @bindable selectedSubconType;
    @bindable itemOptions = {};
    @bindable selectedContract;
    @bindable selectedSubconCategory;
    @bindable dataSC = {};

    customsOutTypeOptions = ['2.6.1', '2.7.Out'];
    subconTypeOptions = ['SUBCON GARMENT', 'SUBCON BAHAN BAKU', 'SUBCON JASA'];
    subconCategoryGarmentOptions = ['SUBCON CUTTING SEWING', 'SUBCON SEWING'];
    subconCategoryBBOptions = ['SUBCON BB SHRINKAGE/PANEL', 'SUBCON BB FABRIC WASH/PRINT'];
    subconCategoryServiceOptions = ['SUBCON JASA GARMENT WASH', 'SUBCON JASA KOMPONEN'];

    @computedFrom("data.SubconCategory")
    get contractFilter() {
        var current = new Date();
        var maxDate = moment(current).format("YYYY-MM-DD");
        var filter = {
            SubconCategory: this.data.SubconCategory,
            IsUsed: true
        };
        filter[`DueDate >= ${JSON.stringify(maxDate)} `] = true;
        return filter;
    }

    contractView = (contract) => {
        return `${contract.ContractNo}`;
    }

    get contractLoader() {
        return ContractLoader;
    }

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    };

    itemsInfo = {
        columns: [
            "No SJ Keluar",
            "Jumlah"
        ],

    }

    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
        this.itemOptions = {
            isCreate: this.context.isCreate,
            isEdit: this.context.isEdit,
            isView: this.context.isView,
            checkedAll: this.context.isCreate == true ? false : true,
            SCId: this.data.SubconContractId
        }

        if (this.data && this.data.Id) {
            this.selectedSubconType = this.data.SubconType;
            var dataSubconContract = await this.service.getSubconContractByID(this.data.SubconContractId);
            this.selectedContract = dataSubconContract;
            this.selectedSubconCategory = this.data.SubconCategory;
        }
    }

    selectedSubconTypeChanged(newValue) {
        if (!this.data.Id) {
            this.data.SubconContractId = null;
            this.data.SubconContractNo = null;
            this.data.SubconCategory = null;
            this.data.Supplier = null;
            if (this.data.Items) {
                this.data.Items.splice(0);
            }
            this.context.selectedContractViewModel.editorValue = "";
            this.selectedSubconCategory = null;
        }
        this.data.SubconType = newValue;
    }

    async selectedContractChanged(newValue) {
        // if (this.data.Items && (!this.readOnly && !this.isCreate)) {
            
        //     if (newValue) {
        //         this.data.SubconContractId = newValue.Id;
        //         this.data.SubconContractNo = newValue.ContractNo;
        //         this.data.BuyerStaff = newValue.CreatedBy;
        //         this.data.Supplier = newValue.Supplier;
        //         Promise.resolve(this.service.searchDeliveryLetterOut({ filter: JSON.stringify({ ContractNo: this.data.SubconContractNo, IsUsed: false }) }))
        //             .then(result => {
        //                 for (var dl of result.data) {
        //                     var item = {};
        //                     item.SubconDLOutNo = dl.DLNo;
        //                     item.SubconDLOutId = dl.Id;
        //                     item.Quantity = 0;
        //                     for (var a of dl.Items) {
        //                         item.Quantity += a.Quantity;
        //                     }
        //                     this.data.Items.push(item);
        //                 }
        //             });
    
        //         const dataCustomsOut = await this.service.searchComplete({ filter: JSON.stringify({ SubconContractId: newValue.Id }) });
        //         const dataJumlahCustomsOut = dataCustomsOut.data.map(x => {
        //             return x.Items.reduce((acc, cur) => acc += cur.Quantity, 0);
        //         });
        //         const dataJumlah = dataJumlahCustomsOut.reduce((acc, cur) => acc += cur, 0);
        //         newValue.RemainingQuantity = newValue.Quantity - dataJumlah;
        //         this.data.RemainingQuantity = newValue.RemainingQuantity;
        //         this.dataSC = newValue;
        //     } else {
        //         this.data.SubconContractId = null;
        //         this.data.SubconContractNo = null;
        //         this.data.Supplier = null;
        //         if (this.data.Items) {
        //             this.data.Items.splice(0);
        //         }
        //         this.context.selectedContractViewModel.editorValue = "";
        //         this.selectedSubconCategory = null;
        //     }
        //     console.log(newValue);
        // }

        if (this.data.Items && (!this.readOnly && !this.isCreate)) {
            this.data.Items.splice(0);
        }
        if (newValue) {
            this.data.SubconContractId = newValue.Id;
            this.data.SubconContractNo = newValue.ContractNo;
            this.data.BuyerStaff = newValue.CreatedBy;
            this.data.Supplier = newValue.Supplier;
            this.selectedSubconType = newValue.ContractType;
            this.itemOptions.SCId = this.data.SubconContractId;
            const dataCustomsOut = await this.service.searchComplete({ filter: JSON.stringify({ SubconContractId: newValue.Id }) });
            const dataJumlahCustomsOut = dataCustomsOut.data.map(x => {
                 return x.Items.reduce((acc, cur) => acc += cur.Quantity, 0);
            });
            const dataJumlah = dataJumlahCustomsOut.reduce((acc, cur) => acc += cur, 0);
            newValue.RemainingQuantity = newValue.Quantity - dataJumlah;
            this.data.RemainingQuantity = newValue.RemainingQuantity;
            this.dataSC = newValue;
            if (newValue.Id != this.data.SubconContractId) {
                this.data.Items.splice(0);
            }
            
        }
    }

    get totalQuantity() {
        var qty = 0;
        if (this.data.Items) {
            for (var item of this.data.Items) {
                if (item.IsSave) {
                    qty += item.Quantity;
                }
            }
        }
        this.data.TotalQty = qty;
        return qty;
    }

    selectedSubconCategoryChanged(newValue, oldValue) {
        if (!this.data.Id) {
            this.data.SubconContractId = null;
            this.data.SubconContractNo = null;
            this.data.Supplier = null;
            if (this.data.Items) {
                this.data.Items.splice(0);
            }
            this.context.selectedContractViewModel.editorValue = "";
        }
        this.data.SubconCategory = newValue;
    }
}