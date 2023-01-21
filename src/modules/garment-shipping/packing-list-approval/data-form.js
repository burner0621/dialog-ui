import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

var LCLoader = require('../../../loader/garment-shipping-letter-of-credit');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedLC;

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
        { header: "Buyer Agent" },
        { header: "Buyer Brand" },
        { header: "Seksi" },
        { header: "Komoditi Description" },
        { header: "Qty" },
        { header: "Satuan" },
        { header: "Price RO" },
        { header: "Price FOB" },
        { header: "Price CMT" },
        { header: "Mata Uang" },
        { header: "Amount" },
        { header: "Unit" },
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
    ShipmentModeOptions = ["Air", "Sea", "Courier", "Sea-Air"];
     PaymentTermOptions = ["LC", "TT/OA", "NON COMMERCIAL"];
    countries =  ["", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRITISH VIRGIN ISLANDS", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLANDS", "CHAD", "CHILE", "CHINA", "COLOMBIA", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D IVOIRE", "CROATIA", "CRUISE SHIP", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ESTONIA", "ETHIOPIA", "FALKLAND ISLANDS", "FAROE ISLANDS", "FIJI", "FINLAND", "FRANCE", "FRENCH POLYNESIA", "FRENCH WEST INDIES", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HONG KONG", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISLE OF MAN", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JERSEY", "JORDAN", "KAZAKHSTAN", "KENYA", "KUWAIT", "KYRGYZ REPUBLIC", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MAURITANIA", "MAURITIUS", "MEXICO", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NEPAL", "NETHERLANDS", "NETHERLANDS ANTILLES", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORWAY", "OMAN", "PAKISTAN", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT PIERRE AND MIQUELON", "SAMOA", "SAN MARINO", "SATELLITE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOUTH AFRICA", "SOUTH KOREA", "SPAIN", "SRI LANKA", "ST KITTS AND NEVIS", "ST LUCIA", "ST VINCENT", "ST. LUCIA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR L'ESTE", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES OF AMERICA", "URUGUAY", "UZBEKISTAN", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS (US)", "YEMEN", "ZAMBIA", "ZIMBABWE"];

    terbilang(numeric) {
        var number = numeric;

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
        this.say= word.toUpperCase();
    }

    get lcLoader() {
        return LCLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save = this.context.saveCallback;
        this.cancel = this.context.cancelCallback;
        this.delete = this.context.deleteCallback;
        this.edit = this.context.editCallback;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }

        if (this.data) {
            this.selectedLC = {
                documentCreditNo: this.data.lcNo
            };
        }

        this.totalCBM="";
        var total = 0;
        if (this.data.measurements) {
            this.data.measurements.map((m)=>{
                if (m.length && m.width && m.height && m.cartonsQuantity) {
                    total += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
                }
            })
            this.totalCBM=total.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        }

        this.data.sayUnit = this.data.sayUnit || "CARTON";

        this.shippingMarkImageSrc = this.data.shippingMarkImageFile || this.noImage;
        this.sideMarkImageSrc = this.data.sideMarkImageFile || this.noImage;
        this.remarkImageSrc = this.data.remarkImageFile || this.noImage;
        this.terbilang(this.data.totalCartons);
        this.totalQty();
    }

    paymentTermChanged() {
        this.data.lcNo = null;
        this.data.issuedBy = null;
    }

    selectedLCChanged(newValue) {
        if (newValue) {
            this.data.lcNo = newValue.documentCreditNo;
        } else {
            this.data.lcNo = null;
        }
    }

    // get totalCBM() {
    //     var total = 0;
    //     if (this.data.measurements) {
    //         for (var m of this.data.measurements) {
    //             if (m.length && m.width && m.height && m.cartonsQuantity) {
    //                 total += (m.length * m.width * m.height * m.cartonsQuantity / 1000000);
    //             }
    //         }
    //     }
    //     return total.toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    // }

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

    totalQty() {
        let quantities = [];
        let result = [];
        let units = [];
        if (this.data.items) {
            var no = 1;
            for (var item of this.data.items) {
                let unit = "";
                if (item.uom) {
                    unit = item.uom.unit || item.uom.Unit;
                }
                // if (item.quantity && quantities.findIndex(c => c.roNo == item.roNo && c.unit == unit) < 0) {
                quantities.push({ no: no, roNo: item.roNo, unit: unit, quantityTotal: item.quantity });
                if (units.findIndex(u => u.unit == unit) < 0) {
                    units.push({ unit: unit });
                    // }
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
        this.totalQuantities= result.join(" / ");
    }
}
