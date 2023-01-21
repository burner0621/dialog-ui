import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";
import { EventAggregator } from 'aurelia-event-aggregator';

var WovenTypeLoader = require('../../packing-sku-loaders/woven-type-loader');
var ConstructionLoader = require('../../packing-sku-loaders/construction-loader');
var WidthLoader = require('../../packing-sku-loaders/width-loader');
var WarpLoader = require('../../packing-sku-loaders/warp-loader');
var WeftLoader = require('../../packing-sku-loaders/weft-loader');
var ProcessTypeLoader = require('../../packing-sku-loaders/process-type-loader');
var YarnTypeLoader = require('../../packing-sku-loaders/yarn-type-loader');
var GradeLoader = require('../../packing-sku-loaders/grade-loader');
var UOMLoader = require('../../packing-sku-loaders/uom-loader');

@inject(EventAggregator)
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
  }
  controlOptions = {
    label: {
      length: 4,
    },
    control: {
      length: 4,
    },
  };

  constructor(eventAggregator, service) {
    this.eventAggregator = eventAggregator;
    this.service = service;
  }

  bind(context) {
    this.context = context;
    this.data = this.context.data;
    this.error = this.context.error;

    this.cancelCallback = this.context.cancelCallback;
    this.deleteCallback = this.context.deleteCallback;
    this.editCallback = this.context.editCallback;
    this.saveCallback = this.context.saveCallback;

    this.selectedWovenType = this.data.wovenType;
    this.selectedConstruction = this.data.construction
    this.selectedWidth = this.data.width
    this.selectedWarp = this.data.warp
    this.selectedWeft = this.data.weft
    this.selectedProcessType = this.data.processType
    this.selectedYarnType = this.data.yarnType
    this.selectedGrade = this.data.grade
    this.selectedUOM = this.data.uom

  }

  @bindable selectedWovenType;
  selectedWovenTypeChanged(newValue, oldValue) {
    if (newValue)
      this.data.wovenTypeId = newValue.id
    else
      this.data.wovenTypeId = 0
  }

  get wovenTypeLoader() {
    return WovenTypeLoader;
  }

  @bindable selectedConstruction;
  selectedConstructionChanged(newValue, oldValue) {
    if (newValue)
      this.data.constructionId = newValue.id
    else
      this.data.constructionId = 0
  }

  get constructionLoader() {
    return ConstructionLoader;
  }

  @bindable selectedWidth;
  selectedWidthChanged(newValue, oldValue) {
    if (newValue)
      this.data.widthId = newValue.id
    else
      this.data.widthId = 0
  }

  get widthLoader() {
    return WidthLoader;
  }

  @bindable selectedWarp;
  selectedWarpChanged(newValue, oldValue) {
    if (newValue)
      this.data.warpId = newValue.id
    else
      this.data.warpId = 0
  }

  get warpLoader() {
    return WarpLoader;
  }

  @bindable selectedWeft;
  selectedWeftChanged(newValue, oldValue) {
    if (newValue)
      this.data.weftId = newValue.id
    else
      this.data.weftId = 0
  }

  get weftLoader() {
    return WeftLoader;
  }

  @bindable selectedProcessType;
  selectedProcessTypeChanged(newValue, oldValue) {
    if (newValue)
      this.data.processTypeId = newValue.id
    else
      this.data.processTypeId = 0
  }

  get processTypeLoader() {
    return ProcessTypeLoader;
  }

  @bindable selectedYarnType;
  selectedYarnTypeChanged(newValue, oldValue) {
    if (newValue)
      this.data.yarnTypeId = newValue.id
    else
      this.data.yarnTypeId = 0
  }

  get yarnTypeLoader() {
    return YarnTypeLoader;
  }

  @bindable selectedGrade;
  selectedGradeChanged(newValue, oldValue) {
    if (newValue)
      this.data.gradeId = newValue.id
    else
      this.data.gradeId = 0
  }

  get gradeLoader() {
    return GradeLoader;
  }

  @bindable selectedUOM;
  selectedUOMChanged(newValue, oldValue) {
    if (newValue)
      this.data.uomId = newValue.id
    else
      this.data.uomId = 0
  }

  get uomLoader() {
    return UOMLoader;
  }

}


