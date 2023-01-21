
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service ,CoreService} from './service';

const DestinationLoader = require('../../../loader/garment-scrap-destination-loader');

@inject(Service,CoreService, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable selectedDestination;
    @bindable isEdit = false;
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable options = {};
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }

    @computedFrom("data.Id")
    get isEdit() {
        this.readOnly=true;
        return (this.data.Id || '').toString() != '';
      
    }
    constructor(service,coreService, bindingEngine) {
        this.service = service;
        this.coreService=coreService;
        this.bindingEngine = bindingEngine;
    }
    bind(context) {
        this.context = context;
        this.dataView = this.context.data;
        this.data = this.context.data;
        this.data.TransactionType = "OUT";
        this.error = this.context.error;
        this.options.isCreate = this.context.isCreate;
        console.log(this.options.isCreate);
        this.options.isView = this.context.isView;
        if(this.data)
        {
            this.selectedDestination= this.data.ScrapDestinationName;
        }
    }
    itemsInfo = {
        columns: [
            "Jenis Barang Aval",
            "Jumlah Tersedia",
            "Jumlah Keluar",
            "Satuan",
            "Keterangan"
        ]
    }
    itemsColumns = [""];
    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
    }
   
    destinationView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get destinationLoader() {
        return DestinationLoader;
    }
    async selectedSourceChanged(newValue) {
        if (newValue) {
            this.data.ScrapSourceId = newValue.Id;
            this.data.ScrapSourceName = newValue.Name;
        }
    }
    async selectedDestinationChanged(newValue) {
        if (newValue && this.options.isCreate) {
            this.data.Items.splice(0);
        let uomResult = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: "KG" }) });
        let uom = uomResult.data[0].Id;

            this.data.ScrapDestinationId = newValue.Id;
            this.data.ScrapDestinationName = newValue.Name;
            this.service.searchStock({order: {"ScrapClassificationName" : "asc"}, filter: JSON.stringify({ ScrapDestinationName:  this.data.ScrapDestinationName }) }).then((results) => {
           
                for(var items of results.data)
                {
                    this.data.Items.push(
                        {
                            ScrapDestinationId : items.ScrapDestinationId,
                            ScrapDestinationName : items.ScrapDestinationName,
                            ScrapClassificationId : items.ScrapClassificationId,
                            ScrapClassificationName : items.ScrapClassificationName,
                            Quantity : 0,
                            RemainingQuantity : items.Quantity,
                            UomUnit:"KG",
                            UomId: uom,
                            TransactionType :"OUT"
                        }
                    );
                }              
              });
            }else
            {
                let remaingQtyResult = await this.service.searchRemaining(this.data.ScrapDestinationName);
                
                for(var item of this.data.Items)
                {
                     for(var qty of remaingQtyResult.data)
                     { 
                          
                        if (item.ScrapClassificationId ===  qty.ScrapClassificationId && this.data.ScrapDestinationId === qty.ScrapDestinationId )
                        {
                            item.RemainingQuantity = qty.Quantity + item.Quantity;
                            item.TransactionType = "OUT";
                            item.IsEdit= true;
                        }
                    }
                }
            } 
        }
    }
