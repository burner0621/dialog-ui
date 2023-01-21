
import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service ,CoreService} from './service';

const DestinationLoader = require('../../../loader/garment-scrap-destination-loader');
const SourceLoader = require('../../../loader/garment-scrap-source-loader');
@inject(Service,CoreService, BindingEngine)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable selectedDestination;
    @bindable selectedSource;
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
    controlOptions = {
        label: {
            length: 2
        },
        control: {
            length: 5
        }
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
        this.data.TransactionType = "IN";
        this.error = this.context.error;
        this.options.isCreate = this.context.isCreate;
        console.log(this.options.isCreate);
        this.options.isView = this.context.isView;
        if(this.data)
        {
            this.selectedSource= this.data.ScrapSourceName;
            this.selectedDestination= this.data.ScrapDestinationName;
        }
    }
    itemsInfo = {
        columns: [
            "Jenis Barang Aval",
            "Jumlah Masuk",
            "Satuan",
            "Keterangan"
        ]
    }
    itemsColumns = [""];
    sourceView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    }

    get sourceLoader() {
        return SourceLoader;
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
            this.service.searchClassification({})
            .then((cls) => {
               
                for (var item of cls.data) {
                    this.data.Items.push({
                        ScrapClassificationId : item.Id,
                        ScrapClassificationName: item.Name,
                        UomUnit:"KG",
                      
                        UomId: uom
                    });
                }
            });
        }
     
      
    }
}
