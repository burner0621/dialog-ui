import { inject, bindable, computedFrom } from 'aurelia-framework';
import { PermissionHelper } from '../../../utils/permission-helper';

//var CurrencyLoader = require('../../../loader/currency-loader');
var UomLoader = require('../../../loader/uom-loader');

@inject(PermissionHelper)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    //@bindable Currency;
    @bindable UOM;

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    tages = ["", "Dye Stuff Printing", "MATERIAL"];
    // Currency =[
    //     {
    //         Code: "IDR",
    //         Description: "RUPIAH",
    //          Id: 1,
    //         Rate: 1,
    //          Symbol: "Rp"
    //     }
    // ];
    constructor(permissionHelper) {
        this.permissions = permissionHelper.getUserPermissions();
        console.log(this.permissions);
        this.isPermitted = this.isPermittedRole();
    }

    isPermittedRole() {
        // this.roles = [VERIFICATION, CASHIER, ACCOUNTING];
        let roleRules = ["C9", "B1"];

        for (var key in this.permissions) {
            let hasPermittedRole = roleRules.find((roleRule) => roleRule == key)
            if (hasPermittedRole)
                return true;
        }

        return false;
    }

    @computedFrom("data.Id")
    get isEdit() {
        return (this.data.Id || '').toString() != '';
    }


    bind(context) {
        this.context = context;
        this.data = this.context.data;
        if (this.data.Id) {
            //this.Currency = Currency;
            this.UOM = this.data.UOM;
        }

        this.error = this.context.error;

        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;
    }

    UOMChanged() {
        if (this.UOM) {
            this.data.UOM = this.UOM
        } else {
            this.UOM = {};
        }
    }

    // CurrencyChanged() {
    //     if (this.Currency) {
    //         this.data.Currency = this.Currency;
    //     } else {
    //         this.Currency = {};
    //     }
    // }

    // get currencyLoader() {
    //     return CurrencyLoader;
    // }

    get uomLoader() {
        return UomLoader;
    }

    columns = [
        { header: "Kategori - Divisi", value: "CategoryDivision" }
    ];
    

    get addItems() {
        return (event) => {
            this.data.MappingCategories.push({})
        };
    }
}
