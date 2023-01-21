import { inject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from "./service";

var moment = require("moment");

@inject(Router, Service)
export class List {
	constructor(router, service) {
		this.router = router;
		this.service = service;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
		this.area = ["Blank", "Area Pre Treatment", "Area Dyeing", "Area Printing", "Area Finishing", "Area QC"]
		this.map = [];

		for (var area of this.area) {
			this.map[area] = { input: [], output: [] };
		}

		this.stages = [
			{ name: "Blank", area: "Blank", map: this.map["Blank"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Pre Treatment", area: "Area Pre Treatment", map: this.map["Area Pre Treatment"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Dyeing", area: "Area Dyeing", map: this.map["Area Dyeing"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Printing", area: "Area Printing", map: this.map["Area Printing"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "Finishing", area: "Area Finishing", map: this.map["Area Finishing"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 },
			{ name: "QC", area: "Area QC", map: this.map["Area QC"], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0 }
		];

		this.index = 0;
		this.totalData = 0;
		this.count = 0;
		this.page = 1;
		this.size = 500;
	}

	async activate() {
		await this.getData();
		// this.getQC();
	}


	async getData() {
		var arg = {
			page: this.page,
			size: this.size,
			filter: JSON.stringify({ isComplete: false }), /* "instruction.steps.process" */
			select: ["code", "currentStepIndex", "cart.cartNumber", "instruction.steps._id", "instruction.steps.deadline", "instruction.steps.processArea", "productionOrder.orderNo", "productionOrder.salesContractNo", "productionOrder.deliveryDate", "productionOrder.buyer.name", "productionOrder.orderQuantity"],
			order: { "productionOrder.deliveryDate": "asc" }
		};

		await this.service.search(arg)
			.then((result) => {
				this.totalData = result.info.Total;
				this.count += result.info.Count;

				for (var data of result.data) {
					if (data && data.Process) {
						var area = (!data.ProcessArea || data.ProcessArea === "") ? "Blank" : data.ProcessArea;
						var stage = this.stages.find(o => o.area == area);

						if (!stage) {
							var stringName = area.replace(/area /gi,"");
							this.map[area] = { input: [], output: [] };
							stage = {
								name: stringName, area: area, map: this.map[area], inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0
							};
							this.stages.push(stage);
						}

						if (data.Type === "Input") {
							var obj = {
								ccode: data.Code,
								process: data.Process ? data.Process : "-",
								salesContractNo: (data.ProductionOrder && data.ProductionOrder.SalesContractNo) ? data.ProductionOrder.SalesContractNo : "-",
								productionOrderNo: (data.ProductionOrder && data.ProductionOrder.OrderNo) ? data.ProductionOrder.OrderNo : "-",
								buyer: (data.ProductionOrder && data.ProductionOrder.Buyer && data.ProductionOrder.Buyer.Name) ? data.ProductionOrder.Buyer.Name : "-",
								cart: data.Cart ? data.Cart.CartNumber : "-",
								orderQuantity: data.ProductionOrder ? data.ProductionOrder.OrderQuantity : "-",
								deadline: data.Deadline ? moment(data.Deadline).format("DD MMM YYYY") : "-",
								deliveryDate: (data.ProductionOrder && data.ProductionOrder.DeliveryDate) ? moment(data.ProductionOrder.DeliveryDate).format("DD MMM YYYY") : "-",
								input: data.InputQuantity,
								stepsLength: data.StepsLength,
								currentStepIndex: data.CurrentStepIndex
							};

							stage.inputTotal += data.InputQuantity;
							this.map[area].input.push(obj);
						}
						else {
							var obj = {
								code: data.Code,
								process: data.Process ? data.Process : "-",
								salesContractNo: (data.ProductionOrder && data.ProductionOrder.SalesContractNo) ? data.ProductionOrder.SalesContractNo : "-",
								productionOrderNo: (data.ProductionOrder && data.ProductionOrder.OrderNo) ? data.ProductionOrder.OrderNo : "-",
								buyer: (data.ProductionOrder && data.ProductionOrder.Buyer && data.ProductionOrder.Buyer.Name) ? data.ProductionOrder.Buyer.Name : "-",
								cart: data.Cart ? data.Cart.CartNumber : "-",
								orderQuantity: data.ProductionOrder ? data.ProductionOrder.OrderQuantity : "-",
								deadline: data.Deadline ? moment(data.Deadline).format("DD MMM YYYY") : "-",
								deliveryDate: (data.ProductionOrder && data.ProductionOrder.DeliveryDate) ? moment(data.ProductionOrder.DeliveryDate).format("DD MMM YYYY") : "-",
								goodOutput: data.GoodOutput,
								badOutput: data.BadOutput,
								stepsLength: data.StepsLength,
								currentStepIndex: data.CurrentStepIndex
							};

							stage.goodOutputTotal += data.GoodOutput ? data.GoodOutput : 0;
							stage.badOutputTotal += data.BadOutput ? data.BadOutput : 0;
							
							this.map[area].output.push(obj);
						}
					}
				}
				this.areaLength = this.stages.length;
				this.kanbanArea =  "width: " + (this.areaLength * 500) + "px";
				if (this.totalData != this.count) {
					this.page++;
					this.getData();
				}
			});
	}

	// getQC() {
	// 	this.totalQC = 0;
	// 	this.qualityControl = [];

	// 	var arg = {
	// 		page: 1,
	// 		size: Number.MAX_SAFE_INTEGER,
	//         filter: JSON.stringify({ isUsed: false }),
	//         select: ["code", "productionOrderNo", "cartNo", "buyer", "fabricGradeTests.finalLength"]
	//     };

	// 	this.service.searchQC(arg)
	// 		.then((result) => {
	// 			this.qualityControl = result.data;

	// 			for (var data of result.data) {
	// 				for (var test of data.fabricGradeTests) {
	// 					this.totalQC += test.finalLength;
	// 				}
	// 			}
	// 		});
	// }
}