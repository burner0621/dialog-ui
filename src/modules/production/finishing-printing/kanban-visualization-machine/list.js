import { inject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from "./service";
import { CoreService } from "./core-service";

var moment = require("moment");

@inject(Router, Service, CoreService)
export class List {
	constructor(router, service, coreService) {
		this.router = router;
		this.service = service;
		this.coreService = coreService;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
		this.map = [];

		this.stages = [];

		this.index = 0;
		this.totalData = 0;
		this.count = 0;
		this.page = 1;
		this.size = 500;
	}

	async activate() {
		await this.getMachine();
	}

	async getMachine() {
		this.sortMachine = {
			"Area Pre Treatment": 1,
			"Area Dyeing": 2,
			"Area Printing": 3,
			"Area Finishing": 4,
			"Area Quality Control": 5,
			"Area Gudang": 6
		};

		var arg = {
			page: 1,
			size: 2147483647,
			select: ["name", "process"]
		};

		await this.coreService.search(arg)
			.then((results) => {
				for (var data of results.data) {
					this.map[data.Name] = { input: [], output: [] };
					this.stages.push({
						name: data.Name,
						map: this.map[data.Name],
						inputTotal: 0, goodOutputTotal: 0, badOutputTotal: 0,
						process: data.Process
					});
				}

				this.stages.sort((a, b) => {
					var sortA = this.sortMachine[a.process];
					var sortB = this.sortMachine[b.process];
					var nameA = a.name;
					var nameB = b.name;

					sortA = sortA ? sortA : 10;
					sortB = sortB ? sortB : 100;

					if (sortA != sortB)
						return sortA - sortB;
					else
						return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
				});

				this.machineLength = results.data.length;
				this.kanbanMachine =  "width: " + (this.machineLength * 500) + "px";
				this.getData();
			});
	}

	getData() {
		var arg = {
			page: this.page,
			size: this.size,
			filter: JSON.stringify({ isComplete: false }), /* "instruction.steps.process" */
			select: ["code", "currentStepIndex", "cart.cartNumber", "instruction.steps._id", "instruction.steps.deadline", "instruction.steps.processArea", "productionOrder.orderNo", "productionOrder.salesContractNo", "productionOrder.deliveryDate", "productionOrder.buyer.name", "productionOrder.orderQuantity"],
			order: { "productionOrder.deliveryDate": "asc" }
		};

		this.service.search(arg)
			.then((result) => {
				this.totalData = result.info.Total;
				this.count += result.info.Count;

				for (var data of result.data) {
					if (data && data.Process) {
						var machine = data.DailyOperationMachine;
						var stage = this.stages.find(o => o.name == machine);

						if(data.Type === "Input") {
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
								input: data.InputQuantity,
								stepsLength: data.StepsLength,
								currentStepIndex: data.CurrentStepIndex
							};

							if (!stage) {
								this.map[machine] = { input: [], output: [] };

								this.stages.push({
									name: machine,
									map: this.map[machine],
									inputTotal: data.InputQuantity
								});
								
								this.machineLength++;
							}
							else {
								stage.inputTotal += data.InputQuantity;
							}
							
							this.map[machine].input.push(obj);
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

							if (!stage) {
								this.map[machine] = { input: [], output: [] };

								this.stages.push({
									name: machine,
									map: this.map[machine],
									goodOutputTotal: data.GoodOutput,
									badOutputTotal: data.BadOutput
								});
								
								this.machineLength++;
							}
							else {
								stage.goodOutputTotal += data.GoodOutput ? data.GoodOutput : 0;
								stage.badOutputTotal += data.BadOutput ? data.BadOutput : 0;
							}

							this.map[machine].output.push(obj);
						}
					}
				}

				this.kanbanMachine =  "width: " + (this.machineLength * 500) + "px; height: 600px;";
				
				if (this.totalData != this.count) {
					this.page++;
					this.getData();
				}
			});
	}
}