import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "../service";

var BuyerLoader = require('../../../../loader/garment-buyers-loader');
var ShippingStaffLoader = require('../../../../loader/garment-shipping-staff-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Back"
    }

    activeTab = 0;
    changeRole(tab) {
        this.activeTab = tab;
        // if (tab != 2) {
        //     this.context.saveCallback=null;
        //     this.context.cancelCallback=null;
        //     this.context.deleteCallback=null;
        //     this.context.editCallback=null;
        // }
        // else{
        //     this.context.saveCallback=this.save;
        //     this.context.cancelCallback=this.cancel;
        //     this.context.deleteCallback=this.delete;
        //     this.context.editCallback=this.edit;
        // }
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
        { header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
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
        { header: "Qty Cartons" },
        { header: "CBM" },
    ]

    PackingTypeOptions = ["EXPORT", "RE EXPORT"];
    InvoiceTypeOptions = ["DL", "SM"];
    countries = ["", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre and Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts and Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

    get say() {
        var number = this.data.totalCartons;

        const first = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
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

    get buyerLoader() {
        return BuyerLoader;
    }
    buyerView = (buyer) => {
        var buyerName = buyer.Name || buyer.name;
        var buyerCode = buyer.Code || buyer.code;
        return `${buyerCode} - ${buyerName}`
    }

    get shippingStaffLoader() {
        return ShippingStaffLoader;
    }
    shippingStaffView = (data) => {
        return `${data.Name || data.name}`
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }

        this.shippingMarkImageSrc = this.data.shippingMarkImageFile || this.noImage;
        this.sideMarkImageSrc = this.data.sideMarkImageFile || this.noImage;
        this.remarkImageSrc = this.data.remarkImageFile || this.noImage;

        if (this.data.items) {
            for (var item of this.data.items) {
                item.BuyerCode = this.data.buyerAgent.code;
                item.isCopy=true;
            }
        }
    }

    get addItems() {
        return (event) => {
            this.data.items.push({
                BuyerCode: this.data.buyerAgent.Code || this.data.buyerAgent.code,
                details: []
            });
        };
    }

    get removeItems() {
        return (event) => {
            this.data.grossWeight = this.data.items.reduce((acc, cur) => acc += cur.avG_GW, 0);
            this.data.nettWeight = this.data.items.reduce((acc, cur) => acc += cur.avG_NW, 0);
            this.error = null;
        };
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
      let result = 0;
      if (this.data.items) {
        for (var item of this.data.items) {
          if (item.details) {
            const newDetails = item.details.map(d => {
              return {
                carton1: d.carton1,
                carton2: d.carton2,
                cartonQuantity: d.cartonQuantity,
                index: d.index
              };
            }).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);

            for (var detail of newDetails) {
              const cartonExist = false;
              const indexItem = this.data.items.indexOf(item);
              if (indexItem > 0) {
                for (let i = 0; i < indexItem; i++) {
                  const item =  this.data.items[i];
                  for (const prevDetail of item.details) {
                    if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
                      cartonExist = true;
                      break;
                    }
                  }
                }
              }
              if (!cartonExist) {
                result += detail.cartonQuantity;
              }
            }
          }
        }
        this.data.totalCartons = result;
        return this.data.totalCartons;
      }
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
                this[mark + 'ImageSrc'] = this.data[mark + 'ImageFile'] = base64Image;
            }
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            this[mark + 'ImageSrc'] = this.noImage;
            this.data[mark + 'ImageFile'] = null;
        }
    }

    removeImage(mark) {
        this[mark + "ImageUpload"] = null;
        this[mark + "ImageSrc"] = this.noImage;
        this.data[mark + "ImageFile"] = null;
    }
}
