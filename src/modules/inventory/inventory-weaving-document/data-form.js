import { inject, bindable, computedFrom } from 'aurelia-framework';
import { PermissionHelper } from '../../../utils/permission-helper';



@inject(PermissionHelper)
export class DataForm {
    @bindable data = {};

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.from = this.fromList;
      
        // this.info;
    }
    fromList = ["","PRODUKSI", "RETUR PACKING", "RETUR FINISHING", "RETUR PRINTING", "RECHEKING", "DEVELOPMENT", "LAIN-LAIN"];

    auInputOptions = {
        label: {
            length: 4,
            align: "right"
        },
        control: {
            length: 5
        }
    };

    
}
