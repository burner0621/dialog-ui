import {inject, bindable, computedFrom} from 'aurelia-framework'
import {Service} from './service';
var UnitLoader = require('../../../loader/unit-loader');
var CategoryLoader = require('../../../loader/category-loader');
var TransferRequestPostedLoader = require('../../../loader/transfer-request-posted-loader');
var moment = require('moment');

export class DataForm {
    @bindable readOnly = false;
    @bindable prReadOnly = false;
    @bindable data;
    @bindable error;
    @bindable transferRequest;

    @bindable title;

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;
      
    }

    itemsColumns = [
        { header: "Barang", value: "product" },
        { header: "Jumlah", value: "defaultQuantity" },
        { header: "Satuan", value: "defaultUom" },
        { header: "Grade", value: "Grade" },
        { header: "Keterangan", value: "productRemark" }
    ]

    get transferRequestPostedLoader() {
        return TransferRequestPostedLoader;
        
    }

    get unitLoader() {
        return UnitLoader;
    }

    get categoryLoader() {
        return CategoryLoader;
    }

    transferRequestChanged(newValue) {
        this.data.transferRequest = newValue;
       
        if (this.data.transferRequest) {
            var _items = [];
            // console.log(this.data.transferRequest);
            this.data.TRNo=this.data.transferRequest.trNo;
            this.data.TRId=this.data.transferRequest.Id;
            this.data.TRDate=this.data.transferRequest.trDate;
            this.data.RequestedArrivalDate=this.data.transferRequest.requestedArrivalDate;
            this.data.UnitId=this.data.transferRequest.unitId;
            this.data.UnitCode=this.data.transferRequest.unitCode;
            this.data.UnitName=this.data.transferRequest.unitName;
            this.data.DivisionId= this.data.transferRequest.divisionId;
            this.data.DivisionName=this.data.transferRequest.divisionName;
            this.data.DivisionCode=this.data.transferRequest.divisionCode;
            this.data.CategoryId= this.data.transferRequest.categoryId;
            this.data.CategoryName=this.data.transferRequest.categoryName;
            this.data.CategoryCode=this.data.transferRequest.categoryCode;
            this.data.Remarks=this.data.transferRequest.remark;
            this.data.transferRequest.UnitName=this.data.transferRequest.divisionName +"-"+ this.data.transferRequest.unitName
            this.data.transferRequest.Remarks=this.data.transferRequest.remark;
            this.data.transferRequest.CategoryName=this.data.transferRequest.categoryCode+"-"+this.data.transferRequest.categoryName;
            this.data.transferRequest.TRDate=this.data.transferRequest.trDate;
            this.data.transferRequest.TRNo=this.data.transferRequest.trNo;
            this.data.transferRequest.RequestedArrivalDate=this.data.transferRequest.requestedArrivalDate;
            
            this.data.transferRequest.details.map((item) =>  {
                var _item = {};
                _item.ProductId=item.product._id;
                _item.ProductCode=item.product.code;
                _item.ProductName = item.product.name;
                _item.product=item.product.code+"-"+ item.product.name;
                _item.Quantity = item.quantity;
                _item.Grade = item.grade;
                _item.ProductRemark=item.productRemark;
                _item.UomId=item.uom._id;
                _item.UomUnit=item.uom.unit;
                _item.TRDetailId=item.Id;
                _items.push(_item);
              
            })
       
             
            this.data.InternalTransferOrderDetails = _items;
            
        }
        else {
            // this.data.transferRequest = {};
            // this.data.Id = {};
            // this.data.Remark = "";
            // this.data.InternalTransferOrderDetails = [];

            Object.keys(this.data).forEach(
                key => {
                    if(typeof this.data[key] != "object")
                        delete this.data[key];
                    else
                        this.data[key] = null;
                }
            )
        }
    }

} 