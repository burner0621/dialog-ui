import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const InsuranceLoader = require('../../../loader/garment-insurance-loader')

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedPolicyType;
    @bindable selectedInsurance;
    @bindable data = {};
    @bindable rate;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };
    filter = {
        IsUsed: true
    };
    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumnsCargo = [
        { header: "Tgl Polis" },
        { header: "No Polis" },
        { header: "Invoice" },
        { header: "Buyer" },
        { header: "Amount" },
        { header: "Kurs" },
        { header: "Amount IDR" },
        { header: "Amount Per Unit (C2A)" },
        { header: "Amount Per Unit (C2B)" },
        { header: "Amount Per Unit (C2C)" },
        { header: "Amount Per Unit (C1A)" },
        { header: "Amount Per Unit (C1B)" },
    ];

    itemsColumnsCredit = [
        { header: "Tgl Polis" },
        { header: "No Polis" },
        { header: "Invoice" },
        { header: "Buyer" },
        { header: "Amount USD" },
        { header: "Premi" },
        { header: "Premi Per Unit (C2A)" },
        { header: "Premi Per Unit (C2B)" },
        { header: "Premi Per Unit (C2C)" },
        { header: "Premi Per Unit (C1A)" },
        { header: "Premi Per Unit (C1B)" },
    ];



    unitColumns = {
        columns: [
            { header: "Unit" },
            { header: "Amount" },

        ],
    }

    get insuranceLoader() {
        return InsuranceLoader;
    }

    policyTypeOptions = ["Kargo", "Piutang"];

    insuranceView = (data) => {
        return `${data.Name || data.name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.isEdit = this.context.isEdit;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            itemData: this.data.items,
            type: this.data.policyType
        }
        if (this.data.id) {
            this.selectedInsurance = this.data.insurance;
            this.selectedInsurance.bankName = this.data.bankName;
            this.selectedPolicyType = this.data.policyType;
            this.rate = this.data.rate;
            this.data.unitCharge = [];

            for (var item of this.data.items) {
                if (item.amount && item.currencyRate && this.data.policyType == "Kargo") {
                    item.amountIDR = item.amount * item.currencyRate;
                }

                if (item.amount2APercentage > 0 || item.amount2A > 0) {
                    var dup = this.data.unitCharge.find(a => a.unitCode == "C2A");
                    if (!dup)
                        this.data.unitCharge.push({ unitCode: "C2A" });
                }
                if (item.amount2BPercentage > 0 || item.amount2B > 0) {
                    var dup = this.data.unitCharge.find(a => a.unitCode == "C2B");
                    if (!dup)
                        this.data.unitCharge.push({ unitCode: "C2B" });
                }
                if (item.amount2CPercentage > 0 || item.amount2C > 0) {
                    var dup = this.data.unitCharge.find(a => a.unitCode == "C2C");
                    if (!dup)
                        this.data.unitCharge.push({ unitCode: "C2C" });
                }
                if (item.amount1APercentage > 0 || item.amount1A > 0) {
                    var dup = this.data.unitCharge.find(a => a.unitCode == "C1A");
                    if (!dup)
                        this.data.unitCharge.push({ unitCode: "C1A" });
                }
                if (item.amount1BPercentage > 0 || item.amount1B > 0) {
                    var dup = this.data.unitCharge.find(a => a.unitCode == "C1B");
                    if (!dup)
                        this.data.unitCharge.push({ unitCode: "C1B" });
                }
                if (this.data.policyType == "Piutang") {
                    item.rate = this.data.rate;
                }
            }
        }
    }

    get addItems() {
        return (event) => {
            if (this.data.policyType == "Piutang")
                this.data.items.push({ rate: this.data.rate });
            else
                this.data.items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
        };
    }

    selectedPolicyTypeChanged(newValue) {
        this.data.policyType = newValue;
        this.Options.type = newValue;
        if (!this.data.id) {
            this.data.items.splice(0);
            this.data.unitCharge = [];
        }
    }

    selectedInsuranceChanged(newValue) {
        console.log(newValue)
        if (newValue) {
            this.data.insurance = {
                id: newValue.Id || newValue.id,
                name: newValue.Name || newValue.name,
                code: newValue.Code || newValue.code,
                bankName: newValue.BankName || newValue.bankName
            };
            this.data.bankName = this.data.insurance.bankName;
        }
    }

    rateChanged(newValue) {
        this.data.rate = newValue;
        if (this.data.items) {
            for (var item of this.data.items) {
                item.rate = this.data.rate;
            }
        }
    }

    itemChanged(e) {
        this.data.unitCharge = [];
        for (var item of this.data.items) {
            if (item.amount2APercentage > 0 || item.amount2A > 0) {
                var dup = this.data.unitCharge.find(a => a.unitCode == "C2A");
                if (!dup)
                    this.data.unitCharge.push({ unitCode: "C2A" });
            }
            if (item.amount2BPercentage > 0 || item.amount2B > 0) {
                var dup = this.data.unitCharge.find(a => a.unitCode == "C2B");
                if (!dup)
                    this.data.unitCharge.push({ unitCode: "C2B" });
            }
            if (item.amount2CPercentage > 0 || item.amount2C > 0) {
                var dup = this.data.unitCharge.find(a => a.unitCode == "C2C");
                if (!dup)
                    this.data.unitCharge.push({ unitCode: "C2C" });
            }
            if (item.amount1APercentage > 0 || item.amount1A > 0) {
                var dup = this.data.unitCharge.find(a => a.unitCode == "C1A");
                if (!dup)
                    this.data.unitCharge.push({ unitCode: "C1A" });
            }
            if (item.amount1BPercentage > 0 || item.amount1B > 0) {
                var dup = this.data.unitCharge.find(a => a.unitCode == "C1B");
                if (!dup)
                    this.data.unitCharge.push({ unitCode: "C1B" });
            }

        }
    }
}
