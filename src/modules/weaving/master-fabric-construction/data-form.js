import {
  inject,
  bindable,
  computedFrom
} from "aurelia-framework";

export class DataForm {
  @bindable title;
  @bindable readOnly;
  @bindable onCreated;
  @bindable Yarn;
  @bindable MaterialType;
  @bindable ConstructionWarpsDetail;
  @bindable ConstructionWeftsDetail;
  readOnlyAll = "true";

  formOptions = {
    cancelText: "Kembali",
    saveText: "Simpan",
    deleteText: "Hapus",
    editText: "Ubah"
  };

  constructor(service) {
    this.service = service;
    this.formatData = "0,000.0000";
  }
  ConstructionWarpsDetailOptions = {};
  ConstructionWeftsDetailOptions = {};

  //Collections Columns
  warpColumns = [{
      header: "Kode Lusi",
      value: "warpType.Code"
    },
    {
      header: "Benang Lusi",
      value: "warpType"
    },
    {
      header: "Qty(Gram/Meter)",
      value: "warp.Quantity"
    },
    {
      header: "Keterangan",
      value: "warp.Information"
    }
  ];

  weftColumns = [{
      header: "Kode Pakan",
      value: "weftType.Code"
    },
    {
      header: "Benang Pakan",
      value: "weftType"
    },
    {
      header: "Qty(Gram/Meter)",
      value: "weft.Quantity"
    },
    {
      header: "Keterangan",
      value: "weft.Information"
    }
  ];

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    if (this.data.Id) {
      this.MaterialType = this.data.MaterialType;
      this.ConstructionWarpsDetail = this.data.ConstructionWarpsDetail;
      this.ConstructionWeftsDetail = this.data.ConstructionWeftsDetail;
      this.ConstructionWarpsDetailOptions.Id = this.data.Id;
      this.ConstructionWeftsDetailOptions.Id = this.data.Id;
    }

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;
  }

  //Triggered when "+" on Warp Collections Clicked
  get addConstructionWarpsDetail() {
    return event => {
      this.ConstructionWarpsDetail.push({});
    };
  }

  //Triggered when "+" on Weft Collections Clicked
  get addConstructionWeftsDetail() {
    return event => {
      this.ConstructionWeftsDetail.push({});
    };
  }

  MaterialTypeChanged(newValue) {
    this.data.MaterialType = newValue;
  }

  //Concatenated some properties for create ConstructionNumber on Form
  get ConstructionNumber() {
    var result = "";
    var MaterialName = this.data.MaterialType ? this.data.MaterialType : "";
    var Woven = this.data.WovenType ? this.data.WovenType : "";
    var Warp = this.data.AmountOfWarp ? this.data.AmountOfWarp : "";
    var Weft = this.data.AmountOfWeft ? this.data.AmountOfWeft : "";
    var Width = this.data.Width ? this.data.Width : "";
    result =
      MaterialName +
      " " +
      Woven +
      " " +
      Warp +
      " " +
      Weft +
      " " +
      Width +
      " " +
      this.WarpType +
      " " +
      this.WeftType;
    this.data.ConstructionNumber = result;
    return result;
  }

  constructionDetail(data) {
    var detail = {};
    detail.Id = data.Id ? data.Id : "";
    detail.YarnId = data.YarnId;
    detail.Quantity = data.Quantity;
    detail.Information = data.Information;
    detail.Type = data.Type;
    detail.FabricConstructionDocumentId = data.FabricConstructionDocumentId ? data.FabricConstructionDocumentId : "";

    if (data.Id) {
      this.data.ConstructionNumber = this.ConstructionNumber;
    }
    return detail;
  }

  //Capture "Jenis Lusi" on Data Form, and show it on "Jenis Lusi dan Pakan"
  //The result used on constructionNumber as an element of ConstructionNumber
  get WarpType() {
    let result = "";

    if (this.ConstructionWarpsDetail) {
      if (this.ConstructionWarpsDetail.length > 0) {
        for (let detail of this.ConstructionWarpsDetail) {
          if (detail.YarnName) {
            result = result + detail.YarnName;
          }
        }
      }
    }

    this.data.WarpType = result;
    return result;
  }

  //Capture "Jenis Pakan" on Data Form, and show it on "Jenis Lusi dan Pakan"
  //The result used on constructionNumber as an element of ConstructionNumber
  get WeftType() {
    let result = "";

    if (this.ConstructionWeftsDetail) {
      if (this.ConstructionWeftsDetail.length > 0) {
        for (let detail of this.ConstructionWeftsDetail) {
          if (detail.YarnName) {
            result = result + detail.YarnName;
          }
        }
      }
    }

    this.data.WeftType = result;
    return result;
  }

  //Sumed Up Yarn Quantity
  get TotalYarn() {
    let result = 0;

    if (this.ConstructionWarpsDetail && this.ConstructionWeftsDetail) {
      if (this.ConstructionWarpsDetail.length > 0) {
        this.data.ConstructionWarpsDetail = [];
        for (let detail of this.ConstructionWarpsDetail) {
          if (detail.YarnId && detail.Quantity != 0) {
            this.data.ConstructionWarpsDetail.push(this.constructionDetail(detail));
            result += detail.Quantity;
          } else {
            var ItemWarpsIndex = this.data.ConstructionWarpsDetail.indexOf(detail);
            this.data.ConstructionWarpsDetail.splice(ItemWarpsIndex, 1);
          }
        }
      }

      if (this.ConstructionWeftsDetail.length > 0) {
        this.data.ConstructionWeftsDetail = [];
        for (let detail of this.ConstructionWeftsDetail) {
          if (detail.YarnId && detail.Quantity != 0) {
            this.data.ConstructionWeftsDetail.push(this.constructionDetail(detail));
            result += detail.Quantity;
          } else {
            var ItemWeftsIndex = this.data.ConstructionWeftsDetail.indexOf(detail);
            this.data.ConstructionWeftsDetail.splice(ItemWeftsIndex, 1);
          }
        }
      }
    }

    this.data.TotalYarn = result;
    return result;
  }
}
