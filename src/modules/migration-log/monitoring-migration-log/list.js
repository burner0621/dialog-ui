import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    columns = [
        { field: "_id.description", title: "Description" },
        {
            field: "latestDate", title: "Latest Successful", formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY h:mm:ss a");
            }
        }
    ];

    options = {
        pagination: false
    };

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        this.arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
            select: ["_id.description", "latestDate"]
        }

        return this.service.search(this.arg)
            .then(result => {

                var data = {}
                data.total = result.info.length;
                data.data = result.info;
                return data;
            });
    }
}
