import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const UnitLoader = require('../../../../../loader/garment-unitsAndsample-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedUnitFrom;
    @bindable selectedType;
    @bindable isFabric = false;
    @bindable isAccessories = false;
    @bindable isComponent = false;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumns = [
        { header: "Nomor RO", value: "RONo" },
    ]

    accItemsColumns=[
        { header: "Kode - Nama Barang", value: "ProductCode" },
        { header: "Jumlah Aval", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ]

    componentItemsColumns=[
        { header: "No Aval Komponen", value: "AvalComponentNo" },
        { header: "RO No", value: "RONo" },
        { header: "Artikel",value: "Article" },
        { header: "Jumlah Aval",value: "Quantity" },
        { header: "Satuan",value: "UomUnit" },
    ]


    avalTypes=["AVAL FABRIC", "AVAL BAHAN PENOLONG","AVAL KOMPONEN"];

    get unitLoader() {
        return UnitLoader;
    }

    
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
            checkedAll: this.context.isCreate == true ? false : true,
            header: this.data
        }
        this.selectedType=this.data.AvalType;

        this.isFabric= this.data.AvalType==="AVAL FABRIC";
        this.isAccessories= this.data.AvalType==="AVAL BAHAN PENOLONG";
        this.isComponent= this.data.AvalType==="AVAL KOMPONEN";

       
        if (this.data && this.data.Id) {
            this.selectedUnitFrom = {
                Code: this.data.UnitFrom.Code,
                Name: this.data.UnitFrom.Name
            };
            var roList=[];
            if(this.data.AvalType==="AVAL FABRIC")
            {
                for (const item of this.data.Items) {
                    var detail={};
                    if(roList.length==0){
                        detail.RONo=item.RONo;
                        detail.FabricItems=[];
                        detail.FabricItems.push({
                            Product:item.Product,
                            ProductRemark:item.ProductRemark,
                            Quantity:item.Quantity,
                            Uom:item.Uom,
                            GarmentAvalProductId:item.GarmentAvalProductId,
                            GarmentAvalProductItemId:item.GarmentAvalProductItemId,
                            IsSave:true
                        });
                        roList.push(detail);
                    }
                    else{
                        var dup=roList.find(a=>a.RONo==item.RONo);
                        if(!dup){
                            detail.RONo=item.RONo;
                            detail.FabricItems=[];
                            detail.FabricItems.push({
                                Product:item.Product,
                                ProductRemark:item.ProductRemark,
                                Quantity:item.Quantity,
                                Uom:item.Uom,
                                GarmentAvalProductId:item.GarmentAvalProductId,
                                GarmentAvalProductItemId:item.GarmentAvalProductItemId,
                                IsSave:true
                            });
                            roList.push(detail);
                        }
                        else{
                            var idx= roList.indexOf(dup);
                            dup.FabricItems.push({
                                Product:item.Product,
                                ProductRemark:item.ProductRemark,
                                Quantity:item.Quantity,
                                Uom:item.Uom,
                                GarmentAvalProductId:item.GarmentAvalProductId,
                                GarmentAvalProductItemId:item.GarmentAvalProductItemId,
                                IsSave:true
                            });
                            
                            roList[idx]=dup;
                            
                        }
                    }
                }
                this.data.ROList=roList;
            }
        }
            

    }

    selectedTypeChanged(newValue){
        if(newValue){
            this.data.AvalType=newValue;
            this.isFabric= this.data.AvalType==="AVAL FABRIC";
            this.isAccessories= this.data.AvalType==="AVAL BAHAN PENOLONG";
            this.isComponent= this.data.AvalType==="AVAL KOMPONEN";

        }

        
        if(this.data.ROList && !this.data.Id)
            this.data.ROList.splice(0);

        if(!this.data.Id && this.data.Items){

            this.data.Items.splice(0);
            this.data.TotalAval=0;
        }


    }

    selectedUnitFromChanged(newValue){
        if (this.data.Id) return;

        this.data.UnitFrom = newValue;
        if(this.data.ROList){
            this.data.ROList.splice(0);
        }
        if(!this.data.Id && this.data.Items){

            this.data.Items.splice(0);
            this.data.TotalAval=0;
        }
    }

    get addItems() {
        return (event) => {
            this.data.ROList.push({
                UnitId: this.data.UnitFrom? this.data.UnitFrom.Id : 0,
                RONo:""
            })
        };
    }

    get addItemsAcc() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get addItemsComponent() {
        return (event) => {
            this.data.Items.push({})
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }


   //@computedFrom("data.Unit")
    get totalQuantity(){
        
        if(this.data.ROList && this.isFabric){
            var qty=0;
            for(var item of this.data.ROList){
                for(var detail of item.FabricItems){
                    if(detail.IsSave)
                        qty += detail.Quantity;
                }
            }
            return qty;
        }

        if(this.data.Items && this.isComponent ){
            var qty=0;
            for(var item of this.data.Items){
                qty += item.Quantity;
            }
            return qty;
        }

       
    }

    
}
