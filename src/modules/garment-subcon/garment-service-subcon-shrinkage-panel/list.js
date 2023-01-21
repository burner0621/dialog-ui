import { inject } from 'aurelia-framework';
import { Service, PurchasingService } from "./service";
import { Router } from 'aurelia-router';
import { AuthService } from "aurelia-authentication";
var moment = require("moment");

@inject(Router, Service, AuthService, PurchasingService)
export class List {
	constructor(router, service, authService, purchasingService) {
		this.service = service;
		this.router = router;
		this.authService = authService;
		this.purchasingService = purchasingService;
	}

	filter = {};

	activate(params) {
		let username = null;
		if (this.authService.authenticated) {
			const me = this.authService.getTokenPayload();
			username = me.username;
		}
		this.filter = {
			CreatedBy: username
		}
	}

	context = ["Rincian", "Cetak"];

	columns = [
		{ field: "ServiceSubconShrinkagePanelNo", title: "No Subcon BB Shrinkage / Panel" },
		{ field: "UnitExpenditureNo", title: "No BUK" },
		{
			field: "ServiceSubconShrinkagePanelDate", title: "Tgl Subcon BB Shrinkage / Panel", formatter: function (value, data, index) {
				return moment(value).format("DD MMM YYYY")
			},
		},
	]

	loader = (info) => {
		var order = {};
		if (info.sort)
			order[info.sort] = info.order;

		var arg = {
			page: parseInt(info.offset / info.limit, 10) + 1,
			size: info.limit,
			keyword: info.search,
			order: order,
			filter: JSON.stringify(this.filter)
		}

		return this.service.searchComplete(arg)
			.then(result => {
				var data = {};
				data.total = result.info.total;
				data.data = result.data;
				this.totalQuantity = result.info.totalQty;
				result.data.forEach(s => {
					var getUen = s.Items.map(d => {
						return `<ul><li>${d.UnitExpenditureNo}</li></ul>`	
					})
					s.UnitExpenditureNo = getUen;	
					// console.log(s.UnitExpenditureNo)
					// s.Items.toString = function () {
                    //     var str = "<ul>";
                    //     for (var item of s.Items){
                    //         if (item.UnitExpenditureNo != null)
                    //         {
                    //             str += `<li>${item.UnitExpenditureNo}</li>`
                    //         }
                    //     }
                    //     str += "</ul>";
                    //     return str;
                    // }
				})
				
				return {
					total: result.info.total,
					data: result.data
				}
			});
	}

	async contextClickCallback(event) {
		var arg = event.detail;
		var data = arg.data;
		switch (arg.name) {
			case "Rincian":
				this.router.navigateToRoute('view', { id: data.Id });
				break;
			case "Cetak":
				this.service.getPdfById(data.Id);
				break;
		}
	}

	create() {
		this.router.navigateToRoute('create');
	}

	excel() {
        this.router.navigateToRoute('excel');
        // this.service.generateExcel();
    }
}
