import { inject ,bindable} from "aurelia-framework";
import moment from "moment";
import numeral from "numeral";
import XLSX from "xlsx";
import { Service } from "./service";
const InvoiceLoader = require("../../shared/garment-invoice-purchasing-disposition");
const DispositionLoader = require("../../shared/disposition-purchasing-loader");


@inject(Service)
export class List {
	@bindable selectedDispo;
	@bindable selectedInvo;

  columns = 
    [
		{ field: "InvoiceNo", title: "No Bukti Pembayaran Disposisi"},
		{ field: "InvoiceDate",formatter: function (value, data, index) {
			return value ? moment(value).format("DD MMM YYYY") : "";
		  },  title: "Tanggal Bayar Disposisi"
		},
		{ field: "DispositionNo", title: "No Disposisi"},
		{ field: "DispositionDate",formatter: function (value, data, index) {
			return value ? moment(value).format("DD MMM YYYY") : "";
		  }, title:  "Tanggal Disposisi"
		},
		{ field: "DispositionDueDate",formatter: function (value, data, index) {
			return value ? moment(value).format("DD MMM YYYY") : "";
		  }, title:  "Tanggal Jatuh Tempo"
		},
		{ field: "BankName", title: "Bank Bayar"},
		{ field: "CurrencySymbol", title: "Mata Uang"},
		{ field: "SupplierName", title: "Supplier"},
		{ field: "ProformaNo", title: "Nomor Proforma Invoice"},
		{ field: "Category", title: "Kategori"},
		{ field: "VatAmount", title: "PPN"},
		{
			field: "TotalAmount", title: "Total Pembayaran", align: "right", formatter: (value, data) => {
				return numeral(value).format("0,0.00")
			  }, align: "right"
			
		},
		{
			field: "TotalPaidToSupplier", title: "Jumlah dibayar ke Supplier", align: "right", formatter: (value, data) => {
				return numeral(value).format("0,0.00")
			  }, align: "right"
			
		},
		{
			field: "TotalDifference", title: "Selisih Total yang dibayar", align: "right", formatter: (value, data) => {
				return numeral(value).format("0,0.00")
			  }, align: "right"
			
		},
		{
			field: "TotalPaid", title: "Total yang sudah dibayar", align: "right", formatter: (value, data) => {
				return numeral(value).format("0,0.00")
			  }, align: "right"
			
		},
		{ field: "PaymentType", title: "Jenis Transaksi"}

    ] 

  itemYears = [];
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  tableOptions = {
    showColumns: false,
    search: false,
    showToggle: false,
    sortable: false,
  };

  constructor(service) {
    this.service = service;
    this.info = {};
    this.error = {};
    this.data = [];
    this.isEmpty = true;
    this.currency = "";
    this.purchase = 0;
    this.payment = 0;
    this.closingBalance = 0;
   

  }

  async bind() {
  
  }

  get dispositionLoader() {
	return DispositionLoader;
  }
  dispositionView = (disposition) => {
 
	return `${disposition.DispositionNo}`;
  }

  get invoiceLoader() {
	return InvoiceLoader;
  }
  invoiceView = (invoice) => {
	  console.log(invoice);
	return `${invoice.InvoiceNo}`;
  }

  selectedDispoChanged(newValue) {
	 
	if (newValue) {
		this.dispositionNo = newValue;
 
	} else {
		this.dispositionNo = null;
	}
}
selectedInvoChanged(newValue) {
	if (newValue) {
		this.invoiceNo = newValue;
	} else {
		this.invoiceNo = null;
	}
}
  loader = (info) => {

        let startDate = this.startDate && this.startDate != "Invalid Date" ? moment(this.startDate).format("YYYY-MM-DD") : null;
		let endDate = this.endDate && this.endDate != "Invalid Date" ? moment(this.endDate).format("YYYY-MM-DD") : null;
		let invoiceNo= this.invoiceNo   ? this.invoiceNo.InvoiceNo: null;
		let dispositionNo= this.dispositionNo  ? this.dispositionNo.DispositionNo: null;


    let params = {
      invoiceNo, dispositionNo, startDate, endDate
    };
	console.log(dispositionNo);

    return this.flag
      ? this.service.search(params).then((result) => {

        return {
          total: 0,
          data: result.data.Result
        };
      })
      : { total: 0, data: [] };
  };

  search() {
    this.error = {};
    this.flag = true;
    this.tableList.refresh();
  }

  excel() {
    let startDate = this.startDate && this.startDate != "Invalid Date" ? moment(this.startDate).format("YYYY-MM-DD") : null;
		let endDate = this.endDate && this.endDate != "Invalid Date" ? moment(this.endDate).format("YYYY-MM-DD") : null;
		let invoiceNo= this.invoiceNo   ? this.invoiceNo.InvoiceNo: "";
		let dispositionNo= this.dispositionNo  ? this.dispositionNo.DispositionNo: "";
    let params = {
		invoiceNo, dispositionNo, startDate, endDate

    };
console.log(invoiceNo);
    this.service.getXls(params);

    // this.getExcelData();
  }


  reset() {
    this.flag = false; 
    this.selectedDispo = null;
    this.selectedInvo = null;
    this.startDate = null;
    this.endDate = null;
    this.data = [];
    this.tableList.refresh();
  }

   
}
