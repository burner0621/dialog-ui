import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const TransactionTypeLoader = require('../../../loader/garment-transaction-type-loader');
const BuyerLoader = require('../../../loader/garment-leftover-warehouse-buyer-loader');
var VatTaxLoader = require('../../../loader/vat-tax-loader');

@inject(Service)
export class DataForm {

    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable selectedTransactionType;
    @bindable selectedVatTax;
    @bindable selectedBuyer;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    items = {
        columns: [
            "Kode - Nama Barang",
            "Komoditi",
            "Quantity",
            "Satuan",
            "Harga",
            "Total",
            "Keterangan"
        ],
        onAdd: function () {
            this.data.items.push({});
            
        }.bind(this),
        options: {
            transactionTypeId: 0
        }
    };

    get transactionTypeLoader() {
        return TransactionTypeLoader;
    }

    get buyerLoader() {
        return BuyerLoader;
    }

    transactionTypeView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    buyerView = (data) => {
        return `${data.Code || data.code} - ${data.Name || data.name}`;
    }

    buyerNPWPView = (data) => {
        return data.NPWP || data.npwp;
    }

    buyerAddressView=(data) => {
        return data.Address || data.address;
    }

    get vatTaxLoader() {
       return VatTaxLoader;
    }

    vatTaxView = (vatTax) => {
       
       return vatTax.rate ? `${vatTax.rate}` : `${vatTax.Rate}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        if (this.data && this.data.transactionType) {
            this.items.options.transactionTypeId = this.data.transactionType.id;
        }
        if(!this.data.sellerAddress || this.data.sellerAddress==""){
            this.data.sellerAddress="PT DANLIRIS (DIVISI GARMENT) - KAWASAN BERIKAT \nJL. MERAPI NO. 23, KELURAHAN BANARAN, KECAMATAN GROGOL, SUKOHARJO";
        }

        if(!this.data.sellerNPWP || this.data.sellerNPWP==""){
            this.data.sellerNPWP="01.139.907.8-532.000";
        }
        
        this.selectedVatTax = this.data.vat || false;       
    }

    selectedVatTaxChanged(newValue) {
        
    
        var _selectedVatTax = newValue;
        if (_selectedVatTax) {
            this.data.vat= {
            id : _selectedVatTax.Id || _selectedVatTax.id,
            rate : _selectedVatTax.Rate || _selectedVatTax.rate
        } 
       
        } else {
            this.data.vat = {};
        }
    }

    get subtotal() {
        this.data.subTotal = (this.data.items || []).reduce((acc, cum) => acc + cum.amount, 0);
        
        return this.data.subTotal;
    }

    @computedFrom('data.vat.rate','data.subTotal')
    get ppn() {
        var ppn=0;    
        if(this.data.subTotal && this.data.isUseVat){
           ppn=this.data.subTotal*(this.data.vat.rate/100);
        }
        
        return ppn;
    }

    @computedFrom('data.vat.rate','data.subTotal')
    get total() {
        var total=0;
        if(this.data.subTotal){
            if( this.data.isUseVat)
                total=(this.data.subTotal*(this.data.vat.rate/100)) + this.data.subTotal;
            else
                total=this.data.subTotal;
        }
        return total;
    }

    selectedTransactionTypeChanged(newValue, oldValue) {
        if (newValue) {
            this.data.transactionType = newValue;
            this.items.options.transactionTypeId = newValue.Id;

            if (oldValue && newValue.Id != oldValue.Id) {
                this.data.items.splice(0);
            }
        } else {
            this.data.transactionType = null;
            this.data.items.splice(0);
        }
    }

   
}
