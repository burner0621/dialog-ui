import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import numeral from 'numeral';
var moment = require('moment');
@inject(Router, Service)
export class List {
    context = ["Detail"];
    itemYears = [];
    columns = [
        { field: "Code", title: "Kode Strike Off" },
        { field: "Colors", title: "Warna" }
    ];
    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;

        var arg = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order
        }

        return this.service.search(arg)
            .then(result => {
                if (result.data && result.data.length > 0) {
                    result.data = result.data.map((datum) => {
                        let listColor = [];

                        for (let detail of datum.StrikeOffItems) {
                            let existColor = listColor.find((color) => color == '- ' + detail.ColorCode);
                            if (!existColor) {
                                listColor.push('- ' + detail.ColorCode);
                            }
                        }

                        datum.Colors = listColor.join('\n');

                        return datum;
                    })
                }
                return {
                    total: result.info.total,
                    data: result.data
                }
            });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;


    }

    contextCallback(event) {
        let arg = event.detail;
        let data = arg.data;
        switch (arg.name) {
            case "Detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}