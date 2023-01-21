import { bindable, inject, computedFrom } from "aurelia-framework";
import { Service, CoreService,SalesService } from "./service";

const UnitLoader = require('../../../loader/garment-units-loader');
const PreparingLoader = require('../../../loader/garment-preparing-ro-loader');

@inject(Service, CoreService,SalesService)
export class DataForm {
    @bindable readOnly = false;
    @bindable isEdit = false;
    @bindable title;
    @bindable data = {};
    // @bindable error = {};
    @bindable selectedPreparing;

    constructor(service, coreService,salesService) {
        this.service = service;
        this.coreService = coreService;
        this.salesService=salesService;
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
            length: 5
        }
    };

    cuttingTypes = [
        "Main Fabric",
        "Non Main Fabric"
    ];

    detailsColumns = [
        "Kode Barang",
        "Keterangan",
        "Jumlah Preparing",
        "Jumlah Preparing Out",
        "Satuan Barang",
        "Jumlah Potong",
        "Satuan Potong",
        "FC"
    ];

    detailsColumnsView = [
        { value: "ProductCode", header: "Kode Barang" },
        { value: "DesignColor", header: "Keterangan" },
        { value: "PreparingQuantity", header: "Jumlah Preparing Out" },
        { value: "PreparingUomUnit", header: "Satuan" },
        { value: "CuttingInQuantity", header: "Jumlah Potong" },
        { value: "RemainingQuantity", header: "Sisa" },
        { value: "CuttingInUomUnit", header: "Satuan" },
        { value: "BasicPrice", header: "Harga" },
        { value: "Currency", header: "Mata Uang" },
        { value: "FC", header: "FC" },
    ];

    detailsColumnsViewSewing = [
        { value: "ProductCode", header: "Kode Barang" },
        { value: "DesignColor", header: "Keterangan" },
        { value: "CuttingInQuantity", header: "Jumlah" },
        { value: "CuttingInUomUnit", header: "Satuan" },
        { value: "Color", header: "Warna" },
    ];

    @computedFrom("data.Unit")
    get preparingFilter() {
        this.selectedPreparing = null;
        if (this.data.Unit) {
            return {
                UnitId: this.data.Unit.Id
            };
        } else {
            return {
                UnitId: 0
            };
        }
    }

    bind(context) {
        this.context = context;
        this.data = this.context.data;
        this.error = this.context.error;

        if (this.data) {
            (this.data.Items || []).forEach(
                item => (item.Details || []).forEach(
                    detail => {
                        detail.IsSave = true;
                    }
                )
            );
        }
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get unitLoader() {
        return UnitLoader;
    }

    get preparingLoader() {
        return PreparingLoader;
    }

    async selectedPreparingChanged(newValue, oldValue){
        if(newValue) {
            this.context.error.Items = [];
            this.data.RONo = newValue.RONo;
            this.data.Article = newValue.Article;

            let uomResult = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: "PCS" }) });
            let uom = uomResult.data[0];

            let noResult = await this.salesService.getCostCalculationByRONo({ size: 1, filter: JSON.stringify({ RO_Number: this.data.RONo }) });
            if(noResult.data.length>0){
                this.data.Comodity = noResult.data[0].Comodity;
            } else {
                const comodityCodeResult = await this.salesService.getHOrderKodeByNo({ no: this.data.RONo });
                const comodityCode = comodityCodeResult.data[0];
                if (comodityCode) {
                    const comodityResult = await this.coreService.getComodities({ size: 1, filter: JSON.stringify({ Code: comodityCode }) });
                    this.data.Comodity = comodityResult.data[0];
                }
            }
            
            let priceResult= await this.service.getComodityPrice({ filter: JSON.stringify({ ComodityId: this.data.Comodity.Id, UnitId: this.data.Unit.Id , IsValid:true})});
            if(priceResult.data.length>0){
                this.data.Price= priceResult.data[0].Price;
                //console.log(this.data.Price)
            }
            else{
                this.data.Price=0;
            }
            
            Promise.resolve(this.service.getPreparing({ filter: JSON.stringify({ RONo: this.data.RONo, UnitId: this.data.Unit.Id }) }))
                .then(result => {
                    this.data.Items = result.data
                        .map(data => {
                            return Object.assign(data, {
                                PreparingId: data.Id,
                                Details: data.Items
                                    .filter(item => {
                                        if (this.data.CuttingType.toUpperCase() == "MAIN FABRIC") {
                                            return (item.FabricType.toUpperCase() == "MAIN FABRIC");
                                        } else {
                                            return (item.FabricType.toUpperCase() != "MAIN FABRIC");
                                        }
                                    }).filter(d=>d.RemainingQuantity>0)
                                    .map(item => {
                                        
                                        return Object.assign(item, {
                                            PreparingItemId: item.Id,
                                            IsSave: true,
                                            PreparingUom: item.Uom,
                                            CuttingInUom: uom,
                                            PreparingRemainingQuantity: item.RemainingQuantity,
                                            PreparingBasicPrice: item.BasicPrice,
                                            ComodityPrice: this.data.Price,
                                            PreparingQuantity:0,
                                            FC: 0
                                        });
                                        
                                    })
                            });
                        })
                        .filter(data => data.Details.length > 0);
                    this.context.checkedAll = true;
                });
        }
        else {
            this.context.selectedPreparingViewModel.editorValue = "";
            this.data.RONo = null;
            this.data.Article = null;
            this.data.Items = [];
        }
    }

    changeCheckedAll() {
        (this.data.Items || []).forEach(i => {
            (i.Details || []).forEach(d => d.IsSave = this.context.checkedAll)
        });
    }

    //@computedFrom("data.Items")
    get dataFC(){
        this.data.FC=0;
        var count=0;
        var fc=0;
        if(this.data.Items){
            if(this.data.Items.length > 0){
                for(var a of this.data.Items){
                    for(var b of a.Details){
                        if(b.IsSave){
                            fc+=b.FC;
                            count++;
                        }
                    }
                }
            }
            if(fc && count){
                this.data.FC=parseFloat((fc/count).toFixed(2));
            }
        }
        return this.data.FC;
    }
}