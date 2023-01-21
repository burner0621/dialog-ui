import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const SewingDOLoader = require('../../../loader/garment-sewing-do-loader');

@inject(Service,)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedSewingDO;
    @bindable itemOptions = {};
    @bindable selectedUnit;

    constructor(service) {
        this.service = service;
    }

    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah"
    };

    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 7
        }
    };


    itemsColumns = [""];


    async bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        this.itemOptions = {
            isEdit: this.isEdit,
            checkedAll: true,
            readOnly:this.readOnly
        }
        // if(this.data.SewingDOId){
        //     this.selectedSewingDO= await this.service.getSewingDObyId(this.data.SewingDOId);
        // }

        if (this.data && this.data.Items) {
            this.data.Items.forEach(
                item => {
                    item.IsSave = true;
                }
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    ROView=(DO)=>{
        var colorList=[];
        var sizeList=[];
        for(var a of DO.Items){
            if(colorList.length==0){
                colorList.push(a.Color);
            }
            else{
                var dup=colorList.find(d=> d==a.Color);
                if(!dup){
                    colorList.push(a.Color);
                }
            }
            if(sizeList.length==0){
                sizeList.push(a.Size.Size);
            }
            else{
                var duplicate=sizeList.find(d=> d==a.Size.Size);
                if(!duplicate){
                    sizeList.push(a.Size.Size);
                }
            }
        }
        return `${DO.RONo} - ${DO.SewingDONo} - ${colorList.join(", ")} - ${sizeList.join(", ")}`
    }

    get unitLoader() {
        return UnitLoader;
    }

    get sewingDOLoader() {
        return SewingDOLoader;
    }

    @computedFrom("data.Unit")
    get filter(){
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id,
                "GarmentSewingDOItem.Any(a=>a.RemainingQuantity>0)":true
            };
        } else {
            return {
                UnitId: 0
            };
        }
    }

    selectedUnitChanged(newValue){
        this.selectedSewingDO=null;
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.UnitFrom=null;
        this.data.SewingDOId=null;
        this.data.SewingDONo=null;
        this.data.Price=0;
        this.data.Items.splice(0);
        if(newValue){
            this.data.Unit=newValue;
        }
        else{
            this.data.Unit=null;
            this.selectedSewingDO=null;
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.UnitFrom=null;
            this.data.SewingDOId=null;
            this.data.SewingDONo=null;
            this.data.Price=0;
            this.data.Items.splice(0);
        }
    }

    async selectedSewingDOChanged(newValue, oldValue){
        this.data.RONo = null;
        this.data.Article = null;
        this.data.Comodity=null;
        this.data.UnitFrom=null;
        this.data.SewingDOId=null;
        this.data.SewingDONo=null;
        this.data.Items.splice(0);
        this.data.Price=0;
        if(newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;
            this.data.Comodity= newValue.Comodity;
            this.data.UnitFrom=newValue.Unit;
            this.data.SewingDOId=newValue.Id;
            this.data.SewingDONo=newValue.SewingDONo;

            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
                //console.log(this.data.Price)
            }
            else{
                this.data.Price=0;
            }

            var items=[];
            for(var item of newValue.Items){
                var a={};
                if(item.RemainingQuantity >0){
                    a.Product= item.Product;
                    a.Uom=item.Uom;
                    a.DesignColor=item.DesignColor;
                    a.Color=item.Color;
                    a.Size=item.Size;
                    a.Quantity=item.RemainingQuantity;
                    a.IsSave=true;
                    a.SewingDOItemId=item.Id;
                    a.RemainingQuantity=item.RemainingQuantity;
                    a.BasicPrice=item.BasicPrice;
                    a.ComodityPrice=this.data.Price;
                    this.data.Items.push(a);
                }
                
            }
        }
        
        else {
            this.context.selectedSewingDOViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Comodity=null;
            this.data.UnitFrom=null;
            this.data.SewingDOId=null;
            this.data.SewingDONo=null;
            this.data.Price=0;
            this.data.Items = [];
        }
    }
    itemsInfo = {
        columns: [
            "Kode Barang",
            "Keterangan",
            "Size",
            "Jumlah Keluar",
            "Satuan",
            "Warna",
        ]
    }


    get totalQuantity(){
        var qty=0;
        if(this.data.Items){
            for(var item of this.data.Items){
                if(item.IsSave)
                    qty += item.Quantity;
            }
        }
        return qty;
    }
}