import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service, ServicePurchasing } from "./service";

const UnitLoader = require('../../../loader/unit-loader');
const VbLoader = require('../../../loader/vb-with-po-request-loader');

@containerless()
@inject(Service, ServicePurchasing, BindingEngine)
export class DataForm {
  @bindable readOnly = false;
  @bindable data = {};
  @bindable error = {};
  @bindable title;
  @bindable numberVB;

  NumberVbOptions = ["", "Dengan Nomor VB", "Tanpa Nomor VB"];

  controlOptions = {
    label: {
      length: 4
    },
    control: {
      length: 5
    }
  }

  constructor(service, servicePurchasing, bindingEngine) {
    this.service = service;
    this.servicePurchasing = servicePurchasing;
    this.bindingEngine = bindingEngine;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data ;
    this.error = this.context.error;
    this.collectionVM = this.context.collectionVM;
    // console.log(this.data.numberVB);
    if (this.data.numberVB && this.data.numberVB.VBNo) {
      this.numberVB = this.data.numberVB;
    }

    console.log(this);
    // else{
    //     this.numberVB = {};
    // }
  }

  collectionOptions = {};
  showCollection = false;

  filter = {
    "Apporve_Status": true, "Realization_Status": false
  };

  async numberVBChanged(newValue) {
    var temp_detailItem = [];
    this.data.numberVB = newValue;

    if (this.data.numberVB) {
      // console.log(this.data.numberVB);
      this.data.DateEstimate = this.data.numberVB.DateEstimate;
      this.data.CreatedByVB = this.data.numberVB.CreatedBy;
      this.data.VBNo = this.data.numberVB.VBNo;
      this.data.UnitId = this.data.numberVB.UnitId;
      this.data.UnitCode = this.data.numberVB.UnitCode;
      this.data.UnitName = this.data.numberVB.UnitName;
      this.data.Amount = this.data.numberVB.Amount;
      let selectedPOIds = this.data.numberVB.PONo.map((item) => item.POId);
      this.collectionOptions = {
        selectedPOIds: selectedPOIds
      };
      console.log(this.data.numberVB);
      this.showCollection = true;

      // for (var dataspb of this.data.numberVB.PONo) {
      //   // var itemData = {
      //   //     PONO: dataspb.PONo
      //   // };
      //   // console.log(dataspb.PONo);
      //   var getSPB = await this.servicePurchasing.getPONo(dataspb.PONo);
      //   // console.log(getSPB);

      //   if (getSPB) {

      //     for (var item of getSPB) {
      //       var resso = {
      //         no: item.no,
      //         date: item.date,
      //         division: item.division.name,
      //         item: item.items,
      //         supplier: item.supplier,
      //         currency: item.currency
      //       }

      //       temp_detailItem.push(resso);
      //       this.data.Items = temp_detailItem;
      //     }
      //   }
      // }

    }
    else {
      this.data.numberVB = {};
      this.data.DateEstimate = {};
      this.data.CreateBy = {};
      this.data.Items = [];
      this.showCollection = true;
    }

  }

  @bindable selectedTypeVB;
  selectedTypeVBChanged(newValue, oldValue) {
    this.data.Items = [];

    if (newValue) {
      this.data.TypeVBNonPO = newValue;

      if (newValue == "Tanpa Nomor VB") {
        this.data.showCollection = true;
      }
    } else {
      delete this.data.TypeVBNonPO;
      delete this.data.numberVB;
    }
  }

  columns = ["Daftar SPB"];

  get vbLoader() {
    return VbLoader;
  }

  get addItems() {
    return (event) => {
      this.data.Items.push({})
      this.collectionVM.bind()
    };
  }

  // get showCollection() {
  //   // if ()
  // }

}
