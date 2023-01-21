import { inject, bindable, computedFrom } from "aurelia-framework";
import { Service } from "./service";

let ShippingAreaLoader = require("../../../loader/output-shipping-loader");
let FilterSPPLoader = require("../../../loader/pre-output-shipping-spp-loader");
var DOSalesLoader = require("../../../loader/do-stock-dyeingprinting-loader");
@inject(Service)
export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable data;
  @bindable error;
  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah",
  };
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };
  adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Unit", "Buyer", "Warna", "Motif", "Grade 1", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
  itemColumns = [
    "No. SPP",
    "Buyer",
    "Material",
    "Nama Barang",
    "Unit",
    "Warna",
    "Motif",
    "Jenis",
    "Grade 1",
    "Grade 2",
    "Keterangan",
    "Qty Packing",
    "Packing",
    "Qty Keluar",
    "Berat (KG)",
    "Bon Penjualan"
  ];
  shifts = ["PAGI", "SIANG"];
  packingType = ["CARTON/BALE","LOOSE PACKING"];
  
  authorizedItems = ["ADRIYANA DAMAYANTI", "WAHYU PAMUNGKAS"]
  detailOptions = {};
  types = ["OUT", "ADJ"];
  destinationAreas = ["PENJUALAN", "BUYER", "INSPECTION MATERIAL", "TRANSIT", "PACKING", "GUDANG JADI"];
  areas = [
    "INSPECTION MATERIAL",
    "PROD",
    "TRANSIT",
    "PACK",
    "GUDANG JADI",
    "SHIPPING",
    "AWAL",
    "LAB",
  ];
  constructor(service) {
    this.service = service;
  }

  groups = ["A", "B"];

  doSalesQuery = { DOSalesCategory: "DYEINGPRINTING" };

  get shippingAreaLoader() {
    return ShippingAreaLoader;
  }

  get doSalesLoader() {
    return DOSalesLoader;
  }

  areaMovementTextFormatter = (areaInput) => {
    return `${areaInput.bonNo}`;
  };

  doTextFormatter = (deliveryOrder) => {
    return `${deliveryOrder.DOSalesNo}`;
  };

  @computedFrom("data.id")
  get isEdit() {
    return (this.data.id || "").toString() != "";
  }

  @computedFrom("destinationArea")
  get isPenjualan() {
    return this.destinationArea && this.destinationArea == "PENJUALAN";
  }

  @computedFrom("data.type")
  get isAdj() {
    return this.data && this.data.type == "ADJ";
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.type = this.context.type;
    console.log(this.type);

    this.data.area = "SHIPPING";

    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    if (this.data.bonNo) {
      this.selectedShipping = {};
      this.selectedShipping.bonNo = this.data.bonNo;
    }
    if (this.data.destinationArea) {
      this.destinationArea = this.data.destinationArea;
    }

    if (this.destinationArea !== "BUYER") {

      this.isSales = true;
      if (this.readOnly) {

        if (this.destinationArea == "TRANSIT") {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Nama Barang",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Ket Transit",
            "Qty Packing",
            "Packing",
            "Panjang Packing",
            "Qty Keluar",
            "Berat (KG)"
          ];
        } else {
          if (this.type == true){
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Qty Keluar",
              "Berat (KG)"
            ];

          }else{
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)"
            ];

          }
          
        }

      } else {
        if (this.isEdit) {
          if (this.destinationArea == "TRANSIT") {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Ket Transit",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              ""
            ];
          } else {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              "Bon Penjualan",
              ""
            ];
          }

        } else {
          if (this.destinationArea == "TRANSIT") {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Ket Transit",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)"
            ];
          } else {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              "Bon Penjualan",
              ""
            ];
          }
          

        }
      }


    } else {

      this.isSales = false;
      if (this.readOnly) {
        if (this.type == true){
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Nama Barang",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Panjang Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
          ];
        }else{
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Nama Barang",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Panjang Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
          ];
        }
        
      } else {
        if (this.isEdit) {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Nama Barang",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Panjang Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
            ""
          ];
        } else {
          this.itemColumns = [
            "No. SPP",
            "Buyer",
            "Material",
            "Nama Barang",
            "Unit",
            "Warna",
            "Motif",
            "Jenis",
            "Grade 1",
            "Grade 2",
            "Keterangan",
            "Qty Packing",
            "Packing",
            "Panjang Packing",
            "Qty Keluar",
            "Berat (KG)",
            "SJ",
          ];
        }
      }


    }
    this.detailOptions = {
      isEdit: this.isEdit,
      isSales: this.isSales,
      type: this.type,
      destinationArea: this.destinationArea
    };
    if (this.readOnly) {
      this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Nama Barang", "Unit", "Buyer", "Warna", "Motif", "Grade 1", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "QTY Total", "No Dokumen"];
    } else {
      this.adjItemColumns = ["No. SPP", "Qty Order", "Jenis Order", "Material", "Nama Barang", "Unit", "Buyer", "Warna", "Motif", "Grade 1", "QTY Pack", "Satuan Pack", "Satuan", "QTY Satuan", "Saldo", "QTY Total", "No Dokumen"];
    }
    if (this.data.type == "OUT") {
      if (this.data.shippingProductionOrders) {
        this.data.displayShippingProductionOrders = this.data.shippingProductionOrders;
      }
    } else {
      if (this.data.shippingProductionOrders) {
        this.data.adjShippingProductionOrders = this.data.shippingProductionOrders;
      }

    }

    if (this.data.deliveryOrder) {
      this.selectedDO = {};
      this.selectedDO.Id = this.data.deliveryOrder.id;
      this.selectedDO.DOSalesNo = this.data.deliveryOrder.no;
    }

    if (this.ItemsCollection) {
      this.ItemsCollection.bind();
    }
  }
  addItemCallback = (e) => {
    this.data.adjShippingProductionOrders =
      this.data.adjShippingProductionOrders || [];
    this.data.adjShippingProductionOrders.push({});
  };

  @bindable selectedShipping;
  selectedShippingChanged(n, o) {
    if (this.selectedShipping) {
      this.detailOptions.destinationArea = this.destinationArea;
      this.data.inputShippingId = this.selectedShipping.id;
      if (this.selectedShipping.shippingProductionOrders) {
        this.data.displayShippingProductionOrders = this.selectedShipping.shippingProductionOrders.filter(
          (s) => !s.hasNextAreaDocument
        );
        this.data.bonNo = this.selectedShipping.bonNo;
        this.data.deliveryOrder = this.selectedShipping.deliveryOrder;
        this.data.inputShippingId == this.selectedShipping.id;
      }
      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    }
  }
  shippingQuery = {
    DestinationArea: "PENJUALAN",
    "DyeingPrintingAreaOutputProductionOrders.Any(HasNextAreaDocument == false)":true
  };
  @bindable selectedDO;
  async selectedDOChanged(n, o) {
    if (this.selectedDO) {
      this.data.deliveryOrder = {};
      this.data.deliveryOrder.id = this.selectedDO.Id;
      this.data.deliveryOrder.no = this.selectedDO.DOSalesNo;
      if (!this.isEdit && this.selectedDO.Id) {
        this.detailOptions.buyer = this.selectedDO.SalesContract.Buyer.Name;
        this.detailOptions.buyerId = this.selectedDO.SalesContract.Buyer.Id;
        this.detailOptions.destinationArea = this.destinationArea;
        this.data.displayShippingProductionOrders = await this.service.getProductionOrderFromInput(
          this.selectedDO.Id
        );
      }

      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    }
  }

  @bindable ItemsCollection;
  @bindable destinationArea;
  async destinationAreaChanged(n, o) {
    if (this.destinationArea) {
      this.data.destinationArea = this.destinationArea;
      if (this.destinationArea !== "BUYER") {

        this.isSales = true;
        if (this.readOnly) {
          if (this.destinationArea == "TRANSIT") {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Ket Transit",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)"
            ];
          } else {
            if(this.type == true){
              this.itemColumns = [
                "No. SPP",
                "Buyer",
                "Material",
                "Nama Barang",
                "Unit",
                "Warna",
                "Motif",
                "Jenis",
                "Grade 1",
                "Grade 2",
                "Keterangan",
                "Qty Packing",
                "Packing",
                //"Panjang Packing",
                "Qty Keluar",
                "Berat (KG)"
              ];
            }else{
              this.itemColumns = [
                "No. SPP",
                "Buyer",
                "Material",
                "Nama Barang",
                "Unit",
                "Warna",
                "Motif",
                "Jenis",
                "Grade 1",
                "Grade 2",
                "Keterangan",
                "Qty Packing",
                "Packing",
                "Panjang Packing",
                "Qty Keluar",
                "Berat (KG)"
              ];
            }
           
          }

        } else {
          if (this.isEdit) {
            if (this.destinationArea == "TRANSIT") {
              this.itemColumns = [
                "No. SPP",
                "Buyer",
                "Material",
                "Nama Barang",
                "Unit",
                "Warna",
                "Motif",
                "Jenis",
                "Grade 1",
                "Grade 2",
                "Keterangan",
                "Ket Transit",
                "Qty Packing",
                "Packing",
                "Panjang Packing",
                "Qty Keluar",
                "Berat (KG)",
                ""
              ];
            } else {
              this.itemColumns = [
                "No. SPP",
                "Buyer",
                "Material",
                "Nama Barang",
                "Unit",
                "Warna",
                "Motif",
                "Jenis",
                "Grade 1",
                "Grade 2",
                "Keterangan",
                "Qty Packing",
                "Packing",
                "Panjang Packing",
                "Qty Keluar",
                "Berat (KG)",
                ""
              ];
            }

          } else {
            if (this.destinationArea == "TRANSIT") {
              this.itemColumns = [
                "No. SPP",
                "Buyer",
                "Material",
                "Nama Barang",
                "Unit",
                "Warna",
                "Motif",
                "Jenis",
                "Grade 1",
                "Grade 2",
                "Keterangan",
                "Ket Transit",
                "Qty Packing",
                "Packing",
                "Panjang Packing",
                "Qty Keluar",
                "Berat (KG)"
              ];
            } else {
              this.itemColumns = [
                "No. SPP",
                "Buyer",
                "Material",
                "Nama Barang",
                "Unit",
                "Warna",
                "Motif",
                "Jenis",
                "Grade 1",
                "Grade 2",
                "Keterangan",
                "Qty Packing",
                "Packing",
                "Panjang Packing",
                "Qty Keluar",
                "Berat (KG)",
                "BonNo"
              ];
            }


          }
        }

        if (!this.isEdit) {
          if (this.destinationArea !== "PENJUALAN") {
            this.selectedFilterSPP = null;
            this.data.displayShippingProductionOrders = await this.service.getProductionOrderInput();
            if (this.ItemsCollection) {
              this.ItemsCollection.bind();
            }
          }
        }


      } else {

        this.isSales = false;
        if (this.readOnly) {
          if(this.type == true){
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              //"Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              "SJ",
            ];

          }else{
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              "SJ",
              "Bale",
              "Net",
              "Gross"
            ];
          }
          
        } else {
          if (this.isEdit) {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              "SJ",
              "Bale",
              "Net",
              "Gross",
              ""
            ];
          } else {
            this.itemColumns = [
              "No. SPP",
              "Buyer",
              "Material",
              "Nama Barang",
              "Unit",
              "Warna",
              "Motif",
              "Jenis",
              "Grade 1",
              "Grade 2",
              "Keterangan",
              "Qty Packing",
              "Packing",
              "Panjang Packing",
              "Qty Keluar",
              "Berat (KG)",
              "SJ/Invoice",
              "Bale",
            "Net",
            "Gross"
            ];
          }
        }


      }
      this.detailOptions.isSales = this.isSales;
      this.detailOptions.destinationArea = this.destinationArea;
      if (!this.data.id) {
        this.selectedShipping = null;
        this.data.deliveryOrder = null;
        this.selectedDO = null;
        this.data.bonNo = null;
        this.data.inputShippingId = 0;
        if (this.data.destinationArea == "PENJUALAN" || this.data.destinationArea == "BUYER") {

          this.data.displayShippingProductionOrders = [];
        }
      }

      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    }
  }

  ExportToExcel() {
    this.service.generateExcel(this.data.id);
  }

  get filterSPPLoader() {
    return FilterSPPLoader;
  }

  sppTextFormatter = (spp) => {
    return `${spp.productionOrder.no}`
  }

  @bindable selectedFilterSPP;
  async selectedFilterSPPChanged(n, o) {
    if (this.selectedFilterSPP) {

      this.data.displayShippingProductionOrders = await this.service.getProductionOrderInputById(this.selectedFilterSPP.productionOrder.id);
      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    } else {

      this.data.displayShippingProductionOrders = await this.service.getProductionOrderInput();
      if (this.ItemsCollection) {
        this.ItemsCollection.bind();
      }
    }
  }

}
