import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, CoreService } from "./service";

var SectionLoader = require('../../../loader/garment-sections-loader');
var BuyerLoader = require('../../../loader/garment-buyers-loader');
var LCLoader = require('../../../loader/garment-shipping-letter-of-credit');

@inject(Service, CoreService)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedSection;
    @bindable selectedBuyer;
    @bindable selectedLC;
    @bindable selectedInvoiceType;

    constructor(service, coreService) {
        this.service = service;
        this.coreService = coreService;
    }

    formOptions = {
        cancelText: "Back"
    }

    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;
    }

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

    itemsColumns = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Buyer Brand" },
        { header: "Komoditi" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Price" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    itemsColumnsSM = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Price" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    itemsColumnsROMaster = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Buyer Brand" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    itemsColumnsSMMaster = [
        { header: "RO No" },
        { header: "SC No" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
        { header: "" },
    ]

    measureColumns = [
        { header: "No", value: "MeasurementIndex" },
        { header: "Length" },
        { header: "Width" },
        { header: "Height" },
        { header: "Quantity" },
        { header: "CBM" },
    ]

    PackingTypeOptions = ["EXPORT"];
    InvoiceTypeOptions = ["DS", "SM"];
    PaymentTermOptions = ["LC", "TT/OA", "NON COMMERCIAL"];

    countries = ["", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRITISH VIRGIN ISLANDS", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLANDS", "CHAD", "CHILE", "CHINA", "COLOMBIA", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D IVOIRE", "CROATIA", "CRUISE SHIP", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ESTONIA", "ETHIOPIA", "FALKLAND ISLANDS", "FAROE ISLANDS", "FIJI", "FINLAND", "FRANCE", "FRENCH POLYNESIA", "FRENCH WEST INDIES", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HONG KONG", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISLE OF MAN", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JERSEY", "JORDAN", "KAZAKHSTAN", "KENYA", "KUWAIT", "KYRGYZ REPUBLIC", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MAURITANIA", "MAURITIUS", "MEXICO", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NEPAL", "NETHERLANDS", "NETHERLANDS ANTILLES", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORWAY", "OMAN", "PAKISTAN", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT PIERRE AND MIQUELON", "SAMOA", "SAN MARINO", "SATELLITE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOUTH AFRICA", "SOUTH KOREA", "SPAIN", "SRI LANKA", "ST KITTS AND NEVIS", "ST LUCIA", "ST VINCENT", "ST. LUCIA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR L'ESTE", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES OF AMERICA", "URUGUAY", "UZBEKISTAN", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS (US)", "YEMEN", "ZAMBIA", "ZIMBABWE"];

    get say() {
        var number = this.data.totalCartons;

        const first = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ', 'ELEVEN ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN ', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];
        const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
        const mad = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];
        let word = '';

        for (let i = 0; i < mad.length; i++) {
            let tempNumber = number % (100 * Math.pow(1000, i));
            if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
                if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
                    word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
                } else {
                    word = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + '-' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + word;
                }
            }

            tempNumber = number % (Math.pow(1000, i + 1));
            if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0)
                word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'hundred ' + word;
        }
        return word.toUpperCase();
    }

    get sectionLoader() {
        return SectionLoader;
    }
    sectionView = (section) => {
        var sectionCode = section.Code || section.code;
        var sectionName = section.Name || section.name;
        return `${sectionCode} - ${sectionName}`
    }

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName = buyer.Name || buyer.name;
        var buyerCode = buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }

    get lcLoader() {
        return LCLoader;
    }

    async bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save = this.context.saveCallback;
        this.cancel = this.context.cancelCallback;
        this.delete = this.context.deleteCallback;
        this.edit = this.context.editCallback;
        this.Items = this.data.items;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }
        if (this.data) {
            this.selectedBuyer = this.data.buyerAgent;
            this.selectedLC = {
                documentCreditNo: this.data.lcNo
            };

            this.data.shippingStaffName = this.data.shippingStaff.name;
        }
        this.data.items = this.Items;
        if (this.data.items && this.data.id) {
            for (var item of this.data.items) {
                item.BuyerCodeFilter = this.data.buyerAgent.code;
                item.SectionFilter = this.data.section.code;
            }
        }

        this.data.sayUnit = this.data.sayUnit || "CARTON";

        this.shippingMarkImageSrc = this.data.shippingMarkImageFile || this.noImage;
        this.sideMarkImageSrc = this.data.sideMarkImageFile || this.noImage;
        this.remarkImageSrc = this.data.remarkImageFile || this.noImage;
        this.data.isShipping = false;
    }

    get addMeasurements() {
        return (event) => {
            this.data.measurements.push({});
            this.data.measurements.forEach((m, i) => m.MeasurementIndex = i);
        };
    }

    get removeMeasurements() {
        return (event) => {
            this.error = null;
            this.data.measurements.forEach((m, i) => m.MeasurementIndex = i);
            //this.Options.error = null;
        };
    }

    get addItems() {
        return (event) => {
            this.data.items.push({
                SectionFilter: this.data.section.Code || this.data.section.code,
                BuyerCodeFilter: this.data.buyerAgent.Code || this.data.buyerAgent.code,
                details: []
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.updateMeasurements();
        };
    }

    paymentTermChanged() {
        this.data.lcNo = null;
        this.data.issuedBy = null;
    }

    selectedSectionChanged(newValue) {
        if (newValue != this.data.section && this.data.items)
            this.data.items.splice(0);
        this.data.section = null;
        if (newValue) {
            this.data.section = newValue;
        }
    }

    selectedBuyerChanged(newValue) {
        if (newValue != this.data.buyerAgent && this.data.items)
            this.data.items.splice(0);
        this.data.buyerAgent = null;
        if (newValue) {
            this.data.buyerAgent = newValue;
        }
    }

    async selectedInvoiceTypeChanged(newValue) {
        if (newValue != this.data.invoiceType && this.data.items) {
            this.data.items.splice(0);
            /*if (this.data.measurements)
                this.data.measurements.splice(0);*/
        }
        if (newValue) {
            this.data.invoiceType = newValue;
            if (newValue == "DS") {
                this.data.omzet = true;
                this.data.accounting = true;
                var shippingStaff = await this.coreService.getStaffIdByName({ size: 1, filter: JSON.stringify({ Name: "DEDE" }) });
                this.data.shippingStaffName = shippingStaff.data[0].Name;
                this.data.shippingStaff = {
                    id: shippingStaff.data[0].Id,
                    name: shippingStaff.data[0].Name
                };

            } else {
                this.data.omzet = false;
                this.data.accounting = false;
                var shippingStaff = await this.coreService.getStaffIdByName({ size: 1, filter: JSON.stringify({ Name: "SYARIF" }) });
                this.data.shippingStaffName = shippingStaff.data[0].Name;
                this.data.shippingStaff = {
                    id: shippingStaff.data[0].Id,
                    name: shippingStaff.data[0].Name
                };

            }
        }
    }

    selectedLCChanged(newValue) {
        if (newValue) {
            this.data.lcNo = newValue.documentCreditNo;
        } else {
            this.data.lcNo = null;
        }
    }

    get totalCBM() {
        var total = 0;
        if (this.data.measurements) {
            for (var m of this.data.measurements) {
                if (m.length && m.width && m.height && m.cartonsQuantity) {
                    total += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
                }
            }
        }
        return total.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    }

    get totalCartons() {
        let cartons = [];
        if (this.data.items) {
            for (var item of this.data.items) {
                if (item.details) {
                    for (var detail of item.details) {
                        if (detail.cartonQuantity && cartons.findIndex(c => c.carton1 == detail.carton1 && c.carton2 == detail.carton2 && c.index == detail.index) < 0) {
                            cartons.push({ carton1: detail.carton1, carton2: detail.carton2, index: detail.index, cartonQuantity: detail.cartonQuantity });
                        }
                    }
                }
            }
        }
        this.data.totalCartons = cartons.reduce((acc, cur) => acc + cur.cartonQuantity, 0);
        return this.data.totalCartons;
    }

    get totalQuantities() {
        let quantities = [];
        let result = [];
        let units = [];
        if (this.data.items) {
            var no = 1;
            for (var item of this.data.items) {
                let unit = item.uom != null ? item.uom.unit || item.uom.Unit : "";
                if (item.quantity && quantities.findIndex(c => c.roNo == item.roNo && c.unit == unit) < 0) {
                    quantities.push({ no: no, roNo: item.roNo, unit: unit, quantityTotal: item.quantity });
                    if (units.findIndex(u => u.unit == unit) < 0) {
                        units.push({ unit: unit });
                    }
                }
                no++;

            }
        }
        for (var u of units) {
            let countableQuantities = 0;
            for (var q of quantities) {
                if (q.unit == u.unit) {
                    countableQuantities += q.quantityTotal;
                }
            }
            result.push(countableQuantities + " " + u.unit);
        }
        return result.join(" / ");
    }

    noImage = "images/no-image.jpg";

    @bindable shippingMarkImageSrc;
    @bindable shippingMarkImageUpload;
    shippingMarkImageUploadChanged(newValue) {
        this.uploadImage('shippingMark', newValue);
    }

    @bindable sideMarkImageSrc;
    @bindable sideMarkImageUpload;
    sideMarkImageUploadChanged(newValue) {
        this.uploadImage('sideMark', newValue);
    }

    @bindable remarkImageSrc;
    @bindable remarkImageUpload;
    remarkImageUploadChanged(newValue) {
        this.uploadImage('remark', newValue);
    }

    uploadImage(mark, newValue) {
        if (newValue) {
            let imageInput = document.getElementById(mark + 'ImageInput');
            let reader = new FileReader();
            reader.onload = event => {
                let base64Image = event.target.result;
                const base64Content = base64Image.substring(base64Image.indexOf(',') + 1);

                if (base64Content.length * 6 / 8 > 5242880) {
                    this[mark + 'ImageSrc'] = this.noImage;
                    this.data[mark + 'ImageFile'] = null;
                    alert("Maximum Document Size is 5 MB");
                } else {
                    this[mark + 'ImageSrc'] = this.data[mark + 'ImageFile'] = base64Image;
                }
            }
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            this[mark + 'ImageSrc'] = this.noImage;
            this.data[mark + 'ImageFile'] = null;
        }
    }

    removeImage(mark) {
        this[mark + "ImageSrc"] = this.noImage;
        this.data[mark + "ImageFile"] = null;
    }

    get shippingStaffLoader() {
        return ShippingStaffLoader;
    }

    shippingStaffView = (data) => {
        return `${data.Name || data.name}`
    }

    updateMeasurements() {
        let measurementCartons = [];
        for (const item of this.data.items) {
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

        this.data.measurements = this.data.measurements || [];
        this.data.measurements.splice(0);

        for (const mt of measurements) {
            let measurement = (this.data.measurementsTemp || []).find(m => m.length == mt.length && m.width == mt.width && m.height == mt.height);
            if (measurement) {
                measurement.cartonsQuantity = mt.cartonsQuantity;
                this.data.measurements.push(measurement);
            } else {
                this.data.measurements.push(mt);
            }
        }

        this.data.measurements.forEach((m, i) => m.MeasurementIndex = i);
    }
}
