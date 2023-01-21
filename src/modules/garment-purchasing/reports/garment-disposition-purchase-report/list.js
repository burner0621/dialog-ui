
import { inject, bindable} from 'aurelia-framework';
import { Service } from "./service";

import moment from 'moment';

var suppLoader = require('../../../../loader/garment-supplier-loader');
var userLoader = require('../../../../loader/garment-user-list-loader');


@inject(Service)
export class List {
    info = { page: 1,size:25};
    constructor(service) {
        this.service = service;

        this.flag = false;
        
        this.today = new Date();
        this.error = {};
    }
    @bindable status
    bind(context) {
        console.log(context);
        this.context = context;

    }

    attached() {
    }

    activate() {
    }

    searching() {
        // console.log('searcing',this);
        this.service.search(this.info)
        .then(result=> {
            // console.log(result);
            this.data = result.data.Data;
        });
        }
    
    
        ExportToExcel() {
            this.service.generateExcel(this.info);
            
        }
    get SupplierLoader(){
        return suppLoader;
    }
    get UserLoader(){
        return userLoader;
    }
    UserViewer= (data) => {
        return data.Username;
    }

    reset() {
        this.info = {};

    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}
