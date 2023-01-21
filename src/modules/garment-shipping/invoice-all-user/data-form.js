import { inject, bindable, BindingEngine, observable, computedFrom } from 'aurelia-framework'
import { Service } from "./service";
import { CoreService } from "./service";
import { AuthService } from 'aurelia-authentication';
import moment from 'moment';
var InvoiceLoader = require('../../../loader/garment-packing-list-not-used-loader');
var AccountBankLoader = require('../../../loader/account-banks-loader');
var FabricTypeLoader = require('../../../loader/fabric-type-loader');
var ShippingStaffLoader = require('../../../loader/garment-shipping-staff-loader');


@inject(Service, CoreService, AuthService)
export class DataForm {
    @bindable packinglists;
    @bindable shippingStaff;
    @bindable bankAccount;
    @bindable fabricType;
    @bindable data = {};
    @bindable items = {};
    @bindable readOnly = false;
    @bindable read = true;
    @bindable isCreate = false;
    @bindable isEdit = false;
    @bindable isUsed = false;
    @bindable isUpdated = false;
    @bindable dataItems=[];

    constructor(service, coreService, authService) {
        this.service = service;
        this.coreService = coreService;
        this.authService = authService;
    }

    bankFilter = {
        DivisionName: "G"
    };

    INCOTERMSOptions=["FOB", "FAS","CFR","CIF","EXW","FCA","CPT","CIP","DAT","DAP","DDP"];

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.save = this.context.saveCallback;
        this.cancel = this.context.cancelCallback;
        this.options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            isUpdated: this.context.isUpdated,
            isUsed: this.context.isUsed,
            itemData:this.data.items,
            data:this.data,
        }
        this.isEdit = this.context.isEdit;
        this.isUpdated = this.context.isUpdated;
        

        if (this.data.id != undefined) {
            if(this.data.bankAccountId>0){
                this.coreService.getBankAccountById(this.data.bankAccountId)
                .then(result => {

                    this.bankAccount =
                    {
                        Id: this.data.bankAccountId,
                        BankName: result.BankName,
                        Currency: {
                            Code: result.Currency.Code
                        }
                    };
                    this.data.bankAccount = result.BankName;
                });
            }
            
            
            this.fabricType = {
                Id: this.data.fabricTypeId,
                Name: this.data.fabricType
            }

            this.data.bankAccountId = this.data.bankAccountId;
            this.packinglists = this.data.invoiceNo;
            this.isUpdated && this.updateItems(this.data.invoiceNo);

            this.data.npeDate=moment(this.data.npeDate).format("DD-MMM-YYYY")=="01-Jan-0001" ? null : this.data.npeDate;
            this.data.blDate=moment(this.data.blDate).format("DD-MMM-YYYY")=="01-Jan-0001" ? null : this.data.blDate;
            this.data.coDate=moment(this.data.coDate).format("DD-MMM-YYYY")=="01-Jan-0001" ? null : this.data.coDate;
            this.data.pebDate=moment(this.data.pebDate).format("DD-MMM-YYYY")=="01-Jan-0001" ? null : this.data.pebDate;
            this.data.cotpDate=moment(this.data.cotpDate).format("DD-MMM-YYYY")=="01-Jan-0001" ? null : this.data.cotpDate;
        }

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

    paymentDueOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    get invoiceLoader() {
        return InvoiceLoader;
    }

    invoiceView = (inv) => {
        return `${inv.invoiceNo}`;
    }

    get accountBankLoader() {
        return AccountBankLoader;
    }

    accountBankView = (acc) => {
        return `${acc.BankName} - ${acc.Currency.Code}`;
    }

    get shippingStaffLoader() {
        return ShippingStaffLoader;
    }

    shippingStaffView = (acc) => {
        return `${acc.Name}`;
    }

    get fabricTypeLoader() {
        return FabricTypeLoader;
    }

    fabricTypeView = (acc) => {
        return `${acc.Name}`;
    }

    shippingStaffChanged(newValue, oldValue) {
        var selectedShipping = newValue;
        if (selectedShipping && this.data.id == undefined) {
            this.data.shippingStaffId = selectedShipping.Id;
            this.data.shippingStaff = selectedShipping.Name;
        }
    }
    bankAccountChanged(newValue, oldValue) {
        var selectedAccount = newValue;
        if (selectedAccount) {

            this.data.bankAccountId = selectedAccount.Id;

            this.data.bankAccount = selectedAccount.BankName;

        }
    }

    fabricTypeChanged(newValue, oldValue) {
        var selectedfabric = newValue;
        if (selectedfabric) {
            this.data.fabricTypeId = selectedfabric.Id;
            this.data.fabricType = selectedfabric.Name;
        }
    }
    async packinglistsChanged(newValue, oldValue) {
        var selectedInv = newValue;
        if (selectedInv && this.data.id == undefined) {
            this.data.packinglistId = selectedInv.id;
            this.data.invoiceNo = selectedInv.invoiceNo;
            this.data.invoiceDate = selectedInv.date;

            this.shippingStaff = {
              Id: selectedInv.shippingStaff.id,
              Name: selectedInv.shippingStaff.name || ""
            }

            //console.log(newValue)
            this.data.section =
            {
                id: selectedInv.section.id,
                code: selectedInv.section.code
            }
            this.data.buyerAgent =
            {
                id: selectedInv.buyerAgent.id,
                code: selectedInv.buyerAgent.code,
                name: selectedInv.buyerAgent.name
            };
            if (selectedInv.paymentTerm)
                this.data.lcNo = selectedInv.lcNo;
            this.data.issuedBy = selectedInv.issuedBy;

            var packingItem = await this.service.getPackingListById(selectedInv.id);
            var buyer = await this.coreService.getBuyerById(this.data.buyerAgent.id);
            this.data.consigneeAddress = buyer.Address;
            this.data.items.splice(0);
            this.dataItems.splice(0);
            this.data.garmentShippingInvoiceAdjustments.splice(0);
           // console.log(packingItem)
            var consignee = "";
            var TotalAmount = 0;
            var _consignee = "";
            var consignees = [];
            for (var item of packingItem.items) {
                //console.log(item)
                var _item = {};
                _item.BuyerCode = this.data.buyerAgent.code;
                _item.Section = this.data.section.code;
                _item.roNo = item.roNo;
                _item.scNo = item.scNo;
                _item.price = item.priceFOB;
                _item.priceRO = item.priceRO;
                _item.quantity = item.quantity;
                _item.cmtPrice=item.priceCMT;
                _item.comodity = {
                    id: item.comodity.id,
                    code: item.comodity.code,
                    name: item.comodity.name

                };
                _item.buyerBrand = {
                    id: item.buyerBrand.id,
                    code: item.buyerBrand.code,
                    name: item.buyerBrand.name

                };
                _item.uom = {
                    id: item.uom.id,
                    unit: item.uom.unit

                };
                _item.unit = {
                    id: item.unit.id,
                    code: item.unit.code,
                    name: item.unit.name

                };
                _item.amount = item.amount;
                _item.currencyCode = item.valas;
                _item.packingListItemId = item.id;
                consignee += item.buyerBrand.name;
                if (consignees.length > 0) {
                    var dup = consignees.find(a => a == item.buyerBrand.name);
                    if (!dup) {
                        consignees.push(item.buyerBrand.name)
                    }
                }
                else {
                    consignees.push(item.buyerBrand.name);
                }
                TotalAmount = TotalAmount + item.amount;
                this.data.items.push(_item);
                _consignee += item.buyerBrand.name + "\n";
            }
            this.dataItems=this.data.items;
            this.data.totalAmount = TotalAmount;

            this.data.consignee = consignees.join("\n");
            this.percentageProcess(this.dataItems);

        }
        // else
        // {
        //     this.data.packinglistId= null;
        //     this.data.invoiceNo = selectedInv.invoiceNo;
        //     this.data.invoiceDate = null ;

        //     this.data.section ={};
        //     this.data.buyerAgent = {};
        //     this.data.lcNo = null;
        //     this.data.issuedBy = null;
        //     this.data.items.slice(0);
        // }

    }
    async updateItems(invoiceNo) {
        var dataPackingList = await this.service.getInvoiceNo({ filter: JSON.stringify({ InvoiceNo:invoiceNo })});
        var invoiceData = await this.service.getById(this.data.id);
        var packingItem = await this.service.getPackingListById(dataPackingList.data[0].id);
        var buyer = await this.coreService.getBuyerById(this.data.buyerAgent.id);
        this.data.consigneeAddress = buyer.Address;
        this.data.items.splice(0);
        this.dataItems.splice(0);
        var consignee = "";
        var TotalAmount = 0;
        var _consignee = "";
        var consignees = [];
        for (var item of packingItem.items) {
            var _item = {};
            var dataInvoiceLama = invoiceData.items.find(a => a.packingListItemId == item.id);
            _item.BuyerCode = this.data.buyerAgent.code;
            _item.Section = this.data.section.code;
            _item.roNo = item.roNo;
            _item.scNo = item.scNo;
            _item.price = item.priceFOB;
            _item.priceRO = item.priceRO;
            _item.quantity = item.quantity;
            _item.cmtPrice = item.priceCMT;
            _item.comodity = {
                id: item.comodity.id,
                code: item.comodity.code,
                name: item.comodity.name

            };
            _item.buyerBrand = {
                id: item.buyerBrand.id,
                code: item.buyerBrand.code,
                name: item.buyerBrand.name

            };
            _item.uom = {
                id: item.uom.id,
                unit: item.uom.unit

            };
            _item.unit = {
                id: item.unit.id,
                code: item.unit.code,
                name: item.unit.name

            };
            this.data.shippingStaffId = packingItem.shippingStaff.id;
            this.data.shippingStaff = packingItem.shippingStaff.name;
            this.shippingStaff = {
                Id: packingItem.shippingStaff.id,
                Name: packingItem.shippingStaff.name || ""
            }
            _item.amount = item.amount;
            _item.currencyCode = item.valas;
            _item.packingListItemId = item.id;
            _item.createdUtc = item.createdUtc;
            _item.createdBy = item.createdBy;
            _item.lastModifiedUtc = item.lastModifiedUtc;
            _item.lastModifiedBy = item.lastModifiedBy;
            _item.lastModifiedAgent = item.lastModifiedAgent;
            if(dataInvoiceLama) {
                _item.id = dataInvoiceLama.id;
                _item.createdUtc = dataInvoiceLama.createdUtc;
                _item.createdBy = dataInvoiceLama.createdBy;
                _item.lastModifiedUtc = dataInvoiceLama.lastModifiedUtc;
                _item.lastModifiedBy = dataInvoiceLama.lastModifiedBy;
                _item.lastModifiedAgent = dataInvoiceLama.lastModifiedAgent;

                _item.comodityDesc= dataInvoiceLama.comodityDesc;
                _item.desc2 = dataInvoiceLama.desc2;
                _item.desc3 = dataInvoiceLama.desc3;
                _item.desc4 = dataInvoiceLama.desc4;
                _item.quantity = dataInvoiceLama.quantity;
                _item.price = dataInvoiceLama.price;
                _item.cmtPrice = dataInvoiceLama.cmtPrice;
            }
            consignee += item.buyerBrand.name;
            if (consignees.length > 0) {
                var dup = consignees.find(a => a == item.buyerBrand.name);
                if (!dup) {
                    consignees.push(item.buyerBrand.name)
                }
            }
            else {
                consignees.push(item.buyerBrand.name);
            }
            TotalAmount = TotalAmount + item.amount;
            this.data.items.push(_item);
            _consignee += item.buyerBrand.name + "\n";
        }
        this.dataItems = this.data.items;
        this.data.totalAmount = TotalAmount;

        this.data.consignee = consignees.join("\n");
        this.percentageProcess(this.dataItems);
    }
    packinglistColumns = {
        columns: [
            { header: "RoNo", value: "roNo" },
            { header: "SCNo", value: "scNo" },
            { header: "Buyer Brand", value: "buyerBrand.name" },
            { header: "Komoditi", value: "comodity.name" },
            { header: "Desc1", value: "comodityDesc" },
            { header: "Desc2", value: "desc2" },
            { header: "Desc3", value: "desc3" },
            { header: "Desc4", value: "desc4" },
            { header: "Qty", value: "quantity" },
            { header: "Satuan", value: "uom.unit" },
            { header: "Price RO", value: "priceRO" },
            { header: "Price", value: "price" },
            { header: "Currency", value: "currencyCode" },
            { header: "Amount", value: "amount" },
            { header: "Unit", value: "unit.code" },
            { header: "CMT Price", value: "cmtPrice" },
            { header: "Amount CMT", value: "cmtAmount" },
        ],
        onAdd: function () {

            this.data.items.push({
                BuyerCode: this.data.buyerAgent.code,
                Section: this.data.section.code
            });
            this.data.items.forEach((m, i) => m.MaterialIndex = i);

        }.bind(this),
        onRemove: function () {
            this.data.items.forEach((m, i) => m.MaterialIndex = i);
            this.percentageProcess(this.data.items);
        }.bind(this),
        options: {}
    }

    adjustmentColumns = {
        columns: [
            { header: "Penambahan/Pengurangan" },
            { header: "Nilai" },

        ],
        onAdd: function () {
            this.data.garmentShippingInvoiceAdjustments.push({
                adjustmentDescription: this.data.adjustmentDescription,
                adjustmentValue: this.data.adjustmentValue
            });
            this.data.garmentShippingInvoiceAdjustments.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        onRemove: function () {
            this.data.garmentShippingInvoiceAdjustments.forEach((m, i) => m.MaterialIndex = i);
        }.bind(this),
        options: {}
    }

    fabricTypeOptions = ["POLYESTER/COTTON ( T/C )", "COTTON/POLYESTER ( CVC )", "COTTON", "VISCOSE", "VISCOSE POLYESTER", "VISCOSE FUJIETTE", "POLYESTER"];


    countries =
          ["", "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA AND HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRITISH VIRGIN ISLANDS", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLANDS", "CHAD", "CHILE", "CHINA", "COLOMBIA", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D IVOIRE", "CROATIA", "CRUISE SHIP", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ESTONIA", "ETHIOPIA", "FALKLAND ISLANDS", "FAROE ISLANDS", "FIJI", "FINLAND", "FRANCE", "FRENCH POLYNESIA", "FRENCH WEST INDIES", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA BISSAU", "GUYANA", "HAITI", "HONDURAS", "HONG KONG", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISLE OF MAN", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JERSEY", "JORDAN", "KAZAKHSTAN", "KENYA", "KUWAIT", "KYRGYZ REPUBLIC", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MAURITANIA", "MAURITIUS", "MEXICO", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "NAMIBIA", "NEPAL", "NETHERLANDS", "NETHERLANDS ANTILLES", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NORTH KOREA", "NORWAY", "OMAN", "PAKISTAN", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT PIERRE AND MIQUELON", "SAMOA", "SAN MARINO", "SATELLITE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOUTH AFRICA", "SOUTH KOREA", "SPAIN", "SRI LANKA", "ST KITTS AND NEVIS", "ST LUCIA", "ST VINCENT", "ST. LUCIA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TIMOR L'ESTE", "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES OF AMERICA", "URUGUAY", "UZBEKISTAN", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS (US)", "YEMEN", "ZAMBIA", "ZIMBABWE"];

    unitColumns = {
        columns: [
            { header: "Unit" },
            { header: "Jumlah (%)" },
            { header: "Amount (%)" },

        ],
    }

    // unitColumns=[{ title: "Unit", field: "unit.code" },
    //       { title: "Jumlah (%)", field: "quantityPercentage" },
    //       { title: "Amount (%)", field: "amountPercentage" },]
    get amountToBePaid() {
        var totalAmount = 0;
        var amountisCmt = 0;
        var amountAll = 0;
        var amountCMT = 0;
        var adjustmentValue = 0;
        var total = 0;
        if (this.data.items) {
            for (var item of this.data.items) {
                if (this.data.totalAmount > 0) { total = this.data.totalAmount };
                if (item.quantity) {
                    amountAll = amountAll + item.amount;
                    if (item.cmtPrice > 0) {
                        amountisCmt += item.quantity * item.price;
                        amountCMT += item.quantity * item.cmtPrice;
                    }

                    totalAmount = amountAll - amountisCmt + amountCMT;
                }
            }
        }

        if (this.data.garmentShippingInvoiceAdjustments) {
            for (var item of this.data.garmentShippingInvoiceAdjustments) {
                if (item.adjustmentValue) {
                    adjustmentValue = adjustmentValue + item.adjustmentValue;
                }
            }
        }

        this.data.amountToBePaid = totalAmount + adjustmentValue;
        return totalAmount + adjustmentValue;
    }
    get totalAmounts() {
        var totalAmount = 0;

        if (this.data.items) {

            for (var item of this.data.items) {

                if (item.amount > 0) {
                    totalAmount = totalAmount + (item.price * item.quantity);
                } else {
                    totalAmount = 0;
                }
            }
        }

        this.data.totalAmount = totalAmount;
        return totalAmount;
    }

    get lessFabricCosts() {
        var lessFabCost = 0;

        if (this.data.items) {

            for (var item of this.data.items) {

                if (item.cmtPrice > 0) {
                    lessFabCost += ((item.cmtPrice-item.price) * item.quantity);
                }
           }
        }

        this.lessFabCost = lessFabCost;
        return lessFabCost;
    }

    get sectionLoader() {
        return SectionLoader;
    }
    sectionView = (section) => {
        return `${section.Code} - ${section.Name}`
    }

    get filter() {
      let username = null;
      if (this.authService.authenticated) {
          const me = this.authService.getTokenPayload();
          username = me.username;
      }
//   
      return {
        'status=="CREATED" || status=="DRAFT_APPROVED_SHIPPING" || status=="POSTED" || status=="APPROVED_MD" || status=="APPROVED_SHIPPING" || status=="REVISED_MD" || status=="REVISED_SHIPPING" || status=="REJECTED_MD" || status=="REJECTED_SHIPPING_UNIT"':true,
        ShippingStaffName: username
      }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({});
        };
    }

    get removeItems() {
        return (event) => {
            this.percentageProcess(this.data.items);
            this.error = null;
        };
    }

    percentageProcess(items) {
        this.data.garmentShippingInvoiceUnits = [];
        var percents = [];
        var totalqty = 0;
        var totalamount = 0;
        if (items) {
            if (items.length > 0) {
                for (var i of items) {
                    totalqty += i.quantity;
                    totalamount += i.price * i.quantity;
                    var percent = {};
                    if (i.unit) {
                        if (percents.length == 0) {
                            percent.unit = i.unit;
                            percent.qty = i.quantity;
                            percent.amount = i.price * i.quantity;
                            percents.push(percent);
                        }
                        else {
                            var dup = percents.find(a => a.unit.code == i.unit.code);
                            if (dup) {
                                var idx = percents.indexOf(dup);
                                dup.amount += i.price * i.quantity;
                                dup.qty += i.quantity;
                                percents[idx] = dup;
                            }
                            else {
                                percent.unit = i.unit;
                                percent.qty = i.quantity;
                                percent.amount = i.price * i.quantity;
                                percents.push(percent);
                            }
                        }
                    }
                }
                if (percents.length > 0) {
                    for (var p of percents) {
                        if (p.amount > 0 && totalamount > 0) {
                            p.amountPercentage = p.amount / totalamount * 100;
                        }
                        if (p.qty > 0 && totalqty > 0) {
                            p.quantityPercentage = p.qty / totalqty * 100;
                        }
                        this.data.garmentShippingInvoiceUnits.push(p)
                    }
                }
            }
        }
        return this.data.garmentShippingInvoiceUnits
    }


    itemChanged(e) {
        this.percentageProcess(this.data.items);
    }
}
