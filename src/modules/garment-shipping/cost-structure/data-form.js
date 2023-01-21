import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
import { AuthService } from 'aurelia-authentication';
import moment from 'moment';

var InvoiceLoader = require('../../../loader/garment-packing-list-not-used-cost-structure-loader');
var ComodityLoader = require('../../../loader/garment-master-plan-comodity-loader');


@inject(Service, AuthService)
export class DataForm {
    @bindable packinglists;
    @bindable selectedComodity;
    @bindable data = {};
    @bindable items = {};
    @bindable readOnly = false;
    @bindable read = true;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isUsed = false;
    @bindable dataItems = [];

    constructor(service, authService) {
        this.service = service;
        this.authService = authService;
    }

    async bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save = this.context.saveCallback;
        this.cancel = this.context.cancelCallback;
        this.options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            isUsed: this.context.isUsed,
            headerData: this.data
        }
        this.isEdit = this.context.isEdit;
        this.isCreate = this.context.isCreate;
        if(this.isCreate) {
            this.data.date = new Date();
        }

        if (this.data.id != undefined) {
            this.packinglists = this.data.invoiceNo;
            this.selectedComodity = {
                Id: this.data.comodity.id,
                Code: this.data.comodity.code,
                Name: this.data.comodity.name
            }

            this.data.date=moment(this.data.date).format("DD-MMM-YYYY")=="01-Jan-0001" ? null : this.data.date;
        }


        // var items = [];
        // var dataColumnItem = ["UNKNOWN_IMPORT_GOODS", "ASEAN_GOODS", "INDONESIAN_GOODS", "DIRECT_PRODUCT_COST", "ADVANTAGES", "COST_GOODS_TO_SHIPS", "FREE_ON_BOARD"];
        // for (var d of dataColumnItem) {
        //     var item = {};
        //     item.costStructureType = d;
        //     item.details = [];
        //     item.summaryPercentage = 0;
        //     item.summaryValue = 0;
        //     items.push(item);
        // }
        // this.data.items = items;
    }

    @bindable title;
    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    invoiceView = (inv) => {
        return `${inv.invoiceNo}`;
    }

    get invoiceLoader() {
        return InvoiceLoader;
    }

    comodityView = (comodity) => {
        return `${comodity.Code} - ${comodity.Name}`
    }

    get comodityLoader() {
        return ComodityLoader;
    }

    countries =
        ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];



    itemAColumns = {
        columns: [
            { header: "Uraian Barang / Pos Tarif Hs", value: "description" },
            { header: "Negara Asal", value: "countryFrom" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        options: {}
    }

    itemBColumns = {
        columns: [
            { header: "Uraian Barang / Pos Tarif Hs", value: "description" },
            { header: "Negara Asal", value: "description" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        onAdd: function () {
            this.data.items.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        onRemove: function () {
            this.data.items.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        options: {}
    }

    itemCColumns = {
        columns: [
            { header: "Uraian Barang / Pos Tarif Hs", value: "description" },
            { header: "Nama Pemasok", value: "description" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        options: {}
    }

    itemDColumns = {
        columns: [
            { header: "Biaya Produksi", value: "description" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        options: {}
    }

    itemEColumns = {
        columns: [
            { header: "Keuntungan", value: "description" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        options: {}
    }

    itemFColumns = {
        columns: [
            { header: "Biaya Pengangkutan Sampai Ke Kapal", value: "description" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        options: {}
    }

    costStructureColumns = {
        columns: [
            { header: "Uraian Barang / Pos Tarif Hs", value: "description" },
            { header: "Negara Asal", value: "description" },
            { header: "Persentase (%)", value: "description" },
            { header: "Nilai", value: "description" },
        ],
        onAdd: function () {
            this.data.items.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        onRemove: function () {
            this.data.items.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        options: {}
    }

    fabricTypeOptions = ["", "COTTON", "CVC ( COTTON / POLYESTER )", "TC ( POLYESTER / COTTON )", "POLYESTER", "VISCOSE", "VISCOSE / POLYESTER", "VISCOSE FUJIETTE"];

    packinglistsChanged(newValue, oldValue) {
        var selectedInv = newValue;
        if (selectedInv && this.data.id == undefined) {
            this.data.invoiceNo = selectedInv.invoiceNo;
            this.data.packinglistId = selectedInv.id;
        }
    }

    selectedComodityChanged(newValue, oldValue) {
        var selectedComodity = newValue;
        if (selectedComodity) {
            this.data.comodity = {
                Id: selectedComodity.Id,
                Code: selectedComodity.Code,
                Name: selectedComodity.Name,
            };
        } else {
            this.data.comodity = null;
        }
        console.log(selectedComodity);
    }


    // fabricTypeChanged(newValue, oldValue) {
    //     var selectedfabric = newValue;
    //     if (selectedfabric) {
    //         this.data.fabricTypeId = selectedfabric.Id;
    //         this.data.fabricType = selectedfabric.Name;

    //     }
    // if (this.isCreate) {
    //     if (this.data.fabricType == "COTTON") {
    //         var itemADesc = ["RAW COTTON (5201)", "TYSSALIS (1108)", "PVA (3905)"];
    //         var itemAPercentage = [13.00, 1.50, 0.50];

    //         var itemDDesc = ["BURUH", "BIAYA LANGSUNG LAINNYA"];
    //         var itemDPercentage = [10, 54];

    //         for (var item of this.data.items) {
    //             switch (item.costStructureType) {
    //                 case "UNKNOWN_IMPORT_GOODS":
    //                     for (var i = 0; i < 3; i++) {
    //                         var details = {};
    //                         details.description = itemADesc[i];
    //                         details.value = 0;
    //                         details.percentage = itemAPercentage[i];
    //                         item.details.push(details);
    //                     }
    //                     break;
    //                 case "INDONESIAN_GOODS":
    //                     var details = {};
    //                     details.description = "ACCESSORIES";
    //                     details.countryFrom = "INDONESIA";
    //                     details.value = 0;
    //                     details.percentage = 10;
    //                     item.details.push(details);
    //                     break;
    //                 case "DIRECT_PRODUCT_COST":
    //                     for (var i = 0; i < 2; i++) {
    //                         var details = {};
    //                         details.description = itemDDesc[i];
    //                         details.percentage = itemDPercentage[i];
    //                         details.value = 0;
    //                         item.details.push(details);
    //                     }
    //                     break;
    //                 case "ADVANTAGES":
    //                     var details = {};
    //                     details.description = "KEUNTUNGAN";
    //                     details.percentage = 10;
    //                     details.value = 0;
    //                     item.details.push(details);
    //                     break;
    //                 case "COST_GOODS_TO_SHIPS":
    //                     var details = {};
    //                     details.description = "BIAYA PENGANGKUTAN SAMPAI KE KAPAL";
    //                     details.percentage = 1;
    //                     details.value = 0;
    //                     item.details.push(details);
    //                     break;
    //             }
    //         }
    //     }
    // }
    // }
}
