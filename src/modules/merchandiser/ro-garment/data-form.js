import { Router } from 'aurelia-router';
import { Service } from './service';
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
const costCalculationGarmentLoader = require('../../../loader/cost-calculation-garment-loader');

@inject(Router, Service, BindingEngine)
export class DataForm {

  length2 = {
    label: {
      align: "left",
      length: 2
    }
  }
  length4 = {
    label: {
      align: "left",
      length: 4
    }
  }
  CCG_M_FabricInfo = {
    columns: [
      { header: "Product Code" },
      { header: "Composition" },
      { header: "Construction" },
      { header: "Yarn" },
      { header: "Width" },
      { header: "Description", value: "Description" },
      { header: "Detil Barang", value: "Detil Barang" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  CCG_M_AccessoriesInfo = {
    columns: [
      { header: "Product Code" },
      { header: "Description", value: "Description" },
      { header: "Detil Barang", value: "Detil Barang" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  CCG_M_RateInfo = {
    columns: [
      { header: "Product Code" },
      { header: "Composition" },
      { header: "Construction" },
      { header: "Yarn" },
      { header: "Width" },
      { header: "Name", value: "Material" },
      { header: "Description", value: "Description" },
      { header: "Quantity", value: "Quantity" },
      { header: "Remark", value: "Information" }
    ]
  }
  RO_Garment_SizeBreakdownsInfo = {
    columns: [
      { header: "No.", value: "SizeBreakdownIndex" },
      { header: "Color", value: "Color" },
      { header: "Size Range", value: "RO_Garment_SizeBreakdowns_Detail" },
    ],
    options: { readOnly: this.readOnly },
    onAdd: function () {
      this.data.RO_Garment_SizeBreakdowns.push({});
      this.data.RO_Garment_SizeBreakdowns.forEach((m, i) => m.SizeBreakdownIndex = i);
    }.bind(this),
    onRemove: function () {
      this.data.RO_Garment_SizeBreakdowns.forEach((m, i) => m.SizeBreakdownIndex = i);
    }.bind(this)
  };

  @bindable title;
  @bindable data = {};
  @bindable error = {};
  @bindable readOnly;
  @bindable isCopy;
  disabled = true;
  shown = false;

  @bindable costCalculationGarment;
  CCG_M_Fabric = [];
  CCG_M_Accessories = [];
  CCG_M_Rate = [];

  @computedFrom("data.Id")
  get isEdit() {
    return (this.data.Id || '').toString() != '';
  }

  get costCalculationGarmentLoader() {
    return costCalculationGarmentLoader;
  }

  get filterCostCalculationGarment() {
    //return { "RO_GarmentId": null, "SCGarmentId":null }
    return { "RO_GarmentId== null && SCGarmentId > 0": true };
  }

  constructor(router, service, bindingEngine) {
    this.router = router;
    this.service = service;
    this.bindingEngine = bindingEngine;
  }

  @bindable imageUpload;
  imageUploadChanged(newValue) {
    if (newValue) {
      let imageInput = document.getElementById('imageInput');
      let reader = new FileReader();
      reader.onload = event => {
        let base64Image = event.target.result;
        this.imagesSrc.push(base64Image);
        this.imagesSrcChanged(this.imagesSrc);
      }
      reader.readAsDataURL(imageInput.files[0]);
      this.imageUpload = null;
    }
  }

  @bindable imagesSrc = [];
  imagesSrcChanged(newValue) {
    this.data.ImagesFile = [];
    newValue.forEach(imageSrc => {
      this.data.ImagesFile.push(imageSrc);
    })
  }

  removeImage(index) {
    this.imagesSrc.splice(index, 1);
    this.data.ImagesName.splice(index, 1);
    this.imagesSrcChanged(this.imagesSrc);
  }

  async bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;
    this.readOnly = this.context.readOnly ? this.context.readOnly : false;
    this.RO_Garment_SizeBreakdownsInfo.options.readOnly = this.readOnly;
    if (this.data.CostCalculationGarment) {
      if (this.isCopy) {
        if (this.data.CostCalculationGarment.CostCalculationGarment_Materials.length !== 0) {
          this.CCG_M_Fabric = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.name.toUpperCase() === "FABRIC");
          this.CCG_M_Accessories = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.name.toUpperCase() !== "FABRIC");
        }
      } else {
        this.costCalculationGarment = this.data.CostCalculationGarment;
      }
    }
    this.data.ImagesFile = this.data.ImagesFile ? this.data.ImagesFile : [];
    this.data.ImagesName = this.data.ImagesName ? this.data.ImagesName : [];
    this.imagesSrc = this.data.ImagesFile.slice();
    this.data.DocumentsFile = this.data.DocumentsFile || [];
    this.data.DocumentsFileName = this.data.DocumentsFileName || [];
    this.documentsPathTemp = [].concat(this.data.DocumentsPath);
  }

  async costCalculationGarmentChanged(newValue) {
    this.isCopy = false;

    if (newValue && newValue.Id) {
      if (!this.isEdit) {
        this.data.CostCalculationGarment = await this.service.getCostCalculationGarmentById(newValue.Id);
        this.data.CostCalculationGarment.ImageFile = this.data.CostCalculationGarment.ImageFile || '#';
        this.data.Total = this.data.CostCalculationGarment.Quantity;
      }
      if (this.data.CostCalculationGarment.CostCalculationGarment_Materials.length !== 0) {
        this.CCG_M_Fabric = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.name.toUpperCase() === "FABRIC");
        this.CCG_M_Accessories = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.name.toUpperCase() !== "FABRIC");
        // this.CCG_M_Rate = this.data.CostCalculationGarment.CostCalculationGarment_Materials.filter(item => item.Category.Name.toUpperCase() === "ONG");
      }
    }
    else {
      //this.data.CostCalculationGarment.CostCalculationGarment_Materials=[];
      this.data.CostCalculationGarment = null;
      //this.data.CostCalculationGarment.ImageFile = '#';
      this.CCG_M_Fabric = [];
      this.CCG_M_Accessories = [];
      this.data.Total = 0;
    }
  }

  @computedFrom('data.CostCalculationGarment')
  get hasCostCalculationGarment() {
    if (this.isCopy) {
      return true;
    }
    return this.data.CostCalculationGarment && this.data.CostCalculationGarment.Id;
  }

  @computedFrom("CCG_M_Fabric")
  get hasCCG_M_Fabric() {
    return this.CCG_M_Fabric.length !== 0;
  }

  @computedFrom("CCG_M_Accessories")
  get hasCCG_M_Accessories() {
    return this.CCG_M_Accessories.length !== 0;
  }

  // @computedFrom("CCG_M_Rate")
  // get hasCCG_M_Rate() {
  //   return this.CCG_M_Rate.length !== 0;
  // }

  // get total() {
  //   this.data.Total = 0;
  //   if (this.data.RO_Garment_SizeBreakdowns) {
  //     this.data.RO_Garment_SizeBreakdowns.forEach(sb => {
  //       if (sb.RO_Garment_SizeBreakdown_Details) {
  //         sb.RO_Garment_SizeBreakdown_Details.forEach(sbd => {
  //           this.data.Total += sbd.Quantity;
  //         })
  //       }
  //     })
  //   }
  //   return this.data.Total;
  // }

  onAddDocument() {
    this.data.DocumentsFile.push("");
    this.data.DocumentsFileName.push("");
    this.documentsPathTemp.push("");
  }

  onRemoveDocument(index) {
    this.data.DocumentsFile.splice(index, 1);
    this.data.DocumentsFileName.splice(index, 1);
    this.documentsPathTemp.splice(index, 1);
  }

  downloadDocument(index) {
    // this.service.getFile((this.documentsPathTemp[index] || '').replace('/sales/', ''), this.data.DocumentsFileName[index]);

    const linkSource = this.data.DocumentsFile[index];
    const downloadLink = document.createElement("a");
    const fileName = this.data.DocumentsFileName[index];

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  documentInputChanged(index) {
    let documentInput = document.getElementById('documentInput' + index);

    if (documentInput.files[0]) {
      let reader = new FileReader();
      reader.onload = event => {
        let base64Document = event.target.result;
        const base64Content = base64Document.substring(base64Document.indexOf(',') + 1);
        if (base64Content.length * 6 / 8 > 52428800) {
          documentInput.value = "";
          this.data.DocumentsFile[index] = "";
          this.data.DocumentsFileName[index] = "";
          alert("Maximum Document Size is 50 MB")
        } else {
          this.data.DocumentsFile[index] = base64Document;
          this.data.DocumentsFileName[index] = documentInput.value.replace(/^.*[\\\/]/, '');
        }
      }
      reader.readAsDataURL(documentInput.files[0]);
    }
  }
}

