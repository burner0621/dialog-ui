import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';

@inject(Router, Service)
export class List {
    context = ["Rincian"];
    columns = [
		{ field: "Name", title: "Nama" },
		{ field: "Website", title: "Website" },
		{ field: "Industry", title: "Industri" },
		{ field: "PhoneNumber", title: "Nomor Telepon" },
		{ field: "City", title: "Kota" },
    ];

	constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    loader = (info) => {
		var order = {};
		if (info.sort)
			order[info.sort] = info.order;

		var arg = {
			page: parseInt(info.offset / info.limit, 10) + 1,
			size: info.limit,
			keyword: info.search,
			order: order,
			select: ['Name', 'Website', 'Industry', 'PhoneNumber', 'City']
		}

		return this.service.search(arg)
			.then(result => {
				return {
					total: result.info.total,
					data: result.data
				}
			});
    }

    contextCallback(event) {
		var arg = event.detail;
		var data = arg.data;
		switch (arg.name) {
			case "Rincian":
				this.router.navigateToRoute('view', { id: data.Id });
				break;
		}
    }

    view(data) {
        this.router.navigateToRoute('view', { id: data.Id });
    }

	create() {
		this.router.navigateToRoute('create');
	}
}
