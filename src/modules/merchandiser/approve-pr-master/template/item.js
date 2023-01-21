import {inject, computedFrom} from 'aurelia-framework';
import {bindable} from 'aurelia-framework'
import {CoreService} from '../service';
import numeral from 'numeral';
let CategoryLoader = require('../../../../loader/garment-category-loader');
let UomLoader = require('../../../../loader/uom-loader');

@inject(CoreService)
export class Item {
  @bindable selectedCategory;
  @bindable selectedComposition;
  @bindable selectedConst;
  @bindable selectedYarn;
  @bindable selectedWidth;

  get categoryLoader() {
    return CategoryLoader;
  }

  get compositionLoader() {
    return (keyword) => this.coreService.getGarmentProductsDistinctDescription(keyword, JSON.stringify({ Name: "FABRIC" }));
  }

  get constLoader() {
    return (keyword) => this.coreService.getGarmentProductConsts(keyword, JSON.stringify(this.constFilter));
  }

  get yarnLoader() {
    return (keyword) => this.coreService.getGarmentProductYarns(keyword, JSON.stringify(this.yarnFilter));
  }

  get widthLoader() {
    return (keyword) => this.coreService.getGarmentProductWidths(keyword, JSON.stringify(this.widthFilter));
  }

  get priceUomLoader() {
    return UomLoader;
  }

  @computedFrom("data.Product")
  get product() {
    if (this.data.Product) {
      return this.data.Product.Code;
    } else {
      return "-";
    }
  }

  @computedFrom("data.Uom")
  get uom() {
    if (this.data.Uom) {
      return this.data.Uom.Unit;
    } else {
      return "-";
    }
  }

  @computedFrom("data.Quantity", "data.BudgetPrice", "data.PriceConversion")
  get total() {
    if (this.data.PriceConversion > 0) {
      let total = this.data.Quantity * this.data.BudgetPrice / this.data.PriceConversion;
      return numeral(total).format("0,000.00");
    } else {
      return 0;
    }
  }

  @computedFrom("data.Composition")
  get constFilter() {
    let filter = { Name: "FABRIC" };
    if (this.data.Composition) {
      filter.Composition = this.data.Composition.Composition;
    } else {
      filter.Composition = "this.data.Composition.Composition";
    }
    return filter;
  }

  @computedFrom("data.Const")
  get yarnFilter() {
    let filter = this.constFilter;
    if (this.data.Const) {
      filter.Const = this.data.Const.Const;
    } else {
      filter.Const = "this.data.Const.Const";
    }
    return filter;
  }

  @computedFrom("data.Yarn")
  get widthFilter() {
    let filter = this.yarnFilter;
    if (this.data.Yarn) {
      filter.Yarn = this.data.Yarn.Yarn;
    } else {
      filter.Yarn = "this.data.Yarn.Yarn";
    }
    return filter;
  }

  controlOptions = {
    control: {
      length: 12
    }
  };

  constructor(coreService) {
    this.coreService = coreService;
  }

  activate(context) {
    this.context = context;
    this.data = context.data;
    this.error = context.error;
    this.options = context.options;

    this.readOnly = this.options.readOnly;
    
    if (this.data) {
      this.selectedCategory = this.data.Category;
      this.selectedComposition = this.data.Composition;
      this.selectedConst = this.data.Const;
      this.selectedYarn = this.data.Yarn;
      this.selectedWidth = this.data.Width;
    }
  }

  bind(context) {
    this.compositionViewModel = context.compositionViewModel;
    this.constViewModel = context.constViewModel;
    this.yarnViewModel = context.yarnViewModel;
    this.widthViewModel = context.widthViewModel;
  }

  async selectedCategoryChanged(newValue) {
    if (newValue) {
      this.data.Category = newValue;

      if (this.data.Category.Name !== "FABRIC") {
        // this.data.Product = await this.coreService.getProductByName(this.data.Category.Name);
        // this.data.Uom = {
        //   Id: this.data.Product.UomId,
        //   Unit: this.data.Product.UomUnit
        // };

        this.coreService.getProductByName(this.data.Category.Name)
          .then(product => {
            this.data.Product = product;
            this.data.Uom = {
              Id: this.data.Product.UomId,
              Unit: this.data.Product.UomUnit
            };
          });
      } else {
        this.data.Product = null;
        this.data.Uom = null;
      }
    } else {
      this.data.Category = null;
      this.data.Product = null;
      this.data.Uom = null;
    }
    this.compositionViewModel.editorValue = "";
    this.selectedComposition = null;
  }

  selectedCompositionChanged(newValue) {
    if (newValue) {
      this.data.Composition = newValue;
    }
    else {
      this.data.Composition = null;
    }
    this.constViewModel.editorValue = "";
    this.selectedConst = null;
  }

  selectedConstChanged(newValue) {
    if (newValue) {
      this.data.Const = newValue;
    }
    else {
      this.data.Const = null;
    }
    this.yarnViewModel.editorValue = "";
    this.selectedYarn = null;
  }

  selectedYarnChanged(newValue) {
    if (newValue) {
      this.data.Yarn = newValue;
    }
    else {
      this.data.Yarn = null;
    }
    this.widthViewModel.editorValue = "";
    this.selectedWidth = null;
  }

  selectedWidthChanged(newValue) {
    if (newValue) {
      this.data.Width = newValue;
      this.data.Product = this.data.Width;
      this.data.Uom = {
        // Id: this.data.Product.UomId,
        // Unit: this.data.Product.UomUnit
        Id: 1,
        Unit: "MT"
      };
    }
    else {
      this.data.Width = null;
      this.data.Product = null;
      this.data.Uom = null;
    }
  }
}