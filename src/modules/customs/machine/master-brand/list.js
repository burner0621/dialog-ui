import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    // context = ["ubah"];
    columns = [
        { field: "BrandID", title: "Brand ID" },
        { field: "BrandName", title: "Nama Brand" },
        {
            field: "CreatedDate", title: "Tanggal Buat", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "CreatedBy", title: "Dibuat Oleh" },
    ];

    loader = (info) => {
        var arg = {
            keyword: info.search,
        }

        return this.service.search(arg)
            .then(result => {
                var data = {}
                data.data = result.data;

                return {
                    data: result.data
                }
            })
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    // contextCallback(event) {
    //     var arg = event.detail;
    //     var data = arg.data;
    //     switch (arg.name) {
    //       case "ubah":
    //         this.router.navigateToRoute('edit', { id: this.data.Id });
    //         break;
    //     }
    //   }

    create() {
        this.router.navigateToRoute('create');
    }
}
