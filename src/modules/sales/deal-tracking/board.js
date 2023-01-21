import { inject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from "./service";
import { moveBefore } from 'aurelia-dragula';
import { Dialog } from '../../../components/dialog/dialog';
import { BoardFormView } from './dialog-view/board-form-view';
import { DealFormView } from './dialog-view/deal-form-view';
import { StageFormView } from './dialog-view/stage-form-view';

var moment = require("moment");

@inject(Router, Dialog, Service)
export class View {
	formOptions = {
		editText: "Ubah",
		deleteText: "Hapus",
		cancelText: "Kembali"
	};

	constructor(router, dialog, service) {
		this.router = router;
		this.dialog = dialog;
		this.service = service;

		this.type = ["type-1", "type-2", "type-3", "type-4"];
		this.stages = [];
		this.map = [];

		this.index = 0;
	}

	async activate(params) {
		this.boardId = params.id;
		await this.getBoardData();
		await this.getStageData();
	}

	async getBoardData() {
		await this.service.getBoardById(this.boardId)
			.then((result) => {
				this.board = result;
			});
	}

	async getStageData() {
		this.stages = [];
		this.map = [];

		var arg = {
			filter: JSON.stringify({ 'BoardId': this.boardId }),
			order: { "CreatedUtc": "asc" }
		};

		await this.service.searchStage(arg)
			.then((result) => {
				if(result.data.length > 0) {
					for (let data of result.data) {
						let total = 0;
						let deals = [];
	
						if (data.DealsOrder) {
							for (let dealId of JSON.parse(data.DealsOrder)) {
								let deal = data.Deals.find(p => p.Id == dealId);

								if(deal){

									deal.CloseDate = moment(deal.CloseDate).format("DD MMM YYYY");
									total += deal.Amount;
		
									deals.push(deal);
								}
							}
						}
	
						this.map[data.Code] = deals;
	
						this.stages.push({
							Id: data.Id,
							code: data.Code,
							name: data.Name,
							total: total,
							map: this.map[data.Code]
						});
					}

					this.deleteCallback = null;
				}
				else {
					this.deleteCallback = this.delete;
				}
			});
	}

	itemDropped(item, target, source, sibling, itemVM, siblingVM) {
		let sourceArr;
		let targetArr;
		let sourceStage = this.getStage(source.dataset.code);
		let targetStage = this.getStage(target.dataset.code);

		sourceArr = sourceStage.map;
		targetArr = targetStage.map;

		if (source.dataset.code == target.dataset.code) {
			let itemId = item.dataset.id;
			let siblingId = sibling ? sibling.dataset.id : null;
			let indexOfSource = this.arrayObjectIndexOf(sourceArr, itemId, "Id");

			moveBefore(sourceArr, (arr) => arr.Id == itemId, (arr) => arr.Id == siblingId);

			if (indexOfSource != this.arrayObjectIndexOf(sourceArr, itemId, "Id")) { /* Jika posisi tidak sama */
				let updateData = {
					SourceStageId: sourceStage.Id,
					SourceDealsOrder: [],
					Type: 'Order',
				};

				let total = 0;

				for (let source of sourceArr) {
					total += source.Amount;
					updateData.SourceDealsOrder.push(source.Id);
				}

				updateData.SourceDealsOrder = JSON.stringify(updateData.SourceDealsOrder);

				this.service.moveActivity(updateData)
					.then(() => {
						sourceStage.total = total;
					});
			}
		}
		else {
			let theItem;
			let siblingIndex;

			theItem = sourceArr[parseInt(item.dataset.index)];
			siblingIndex = sibling != undefined ? parseInt(sibling.dataset.index) : 'end';

			sourceArr.splice(parseInt(item.dataset.index), 1);
			if (parseInt(siblingIndex) === 0) {
				targetArr.unshift(theItem);
			} else if (siblingIndex === 'end') {
				targetArr.push(theItem);
			} else {
				targetArr.splice(parseInt(siblingIndex), 0, theItem);
			}

			let totalSource = 0, totalTarget = 0;

			let updateData = {
				SourceStageId: sourceStage.Id,
				SourceStageName: sourceStage.name,
				SourceDealsOrder: [],
				TargetStageId: targetStage.Id,
				TargetStageName: targetStage.name,
				TargetDealsOrder: [],
				DealId: theItem.Id,
				type: "Move"
			};

			for (let source of sourceArr) {
				totalSource += source.Amount;
				updateData.SourceDealsOrder.push(source.Id);
			}

			for (let target of targetArr) {
				totalTarget += target.Amount;
				updateData.TargetDealsOrder.push(target.Id);
			}

			updateData.SourceDealsOrder = JSON.stringify(updateData.SourceDealsOrder);
			updateData.TargetDealsOrder = JSON.stringify(updateData.TargetDealsOrder);

			this.service.moveActivity(updateData)
				.then(() => {
					sourceStage.total = totalSource;
					targetStage.total = totalTarget;
				});
		}
	}

	getStage(code) {
		let l = {};

		for (var i = 0; i < this.stages.length; i++) {
			if (this.stages[i].code == code) {
				l = this.stages[i];
				break;
			}
		}

		return l;
	}

	createDeal() {
		var params = {
			stages: this.stages,
			currency: this.board.Currency.Code,
			type: "Add"
		};

		this.dialog.show(DealFormView, params)
			.then(response => {
				if (!response.wasCancelled) {
					this.getStageData();
				}
			});
	}

	createStage() {
		this.dialog.show(StageFormView, { id: this.boardId, type: "Add" })
			.then(response => {
				if (!response.wasCancelled) {
					this.getStageData();
				}
			});
	}

	deleteStage(id) {
		this.dialog.prompt("Apakah anda yakin mau menghapus stage ini?", "Hapus Stage")
			.then(response => {
				if (response == "ok") {
					this.service.deleteStage({ Id: id })
						.then(result => {
							this.getStageData();
						});
				}
			});
	}

	@computedFrom("stages.length")
	get hasStages() {
		return this.stages.length > 0;
	}

	detail(id, stageName) {
		this.router.navigateToRoute('deal', { id: id, stage: encodeURIComponent(stageName.trim()), boardId: this.boardId });
	}

	editStage(stage) {
		this.dialog.show(StageFormView, { id: stage.Id, type: "Edit" })
			.then(response => {
				if (!response.wasCancelled) {
					stage.name = response.output.name;
				}
			});
	}

	editCallback() {
		this.dialog.show(BoardFormView, { id: this.boardId, type: "Edit" })
			.then(response => {
				if (!response.wasCancelled) {
					this.getBoardData();
				}
			});
	}

	delete(event) {
		this.dialog.prompt("Apakah anda yakin mau menghapus board ini?", "Hapus Board")
			.then(response => {
				if (response == "ok") {
					this.service.deleteBoard({ Id: this.boardId })
						.then(result => {
							this.cancelCallback();
						});
				}
			});
	}

	cancelCallback() {
		this.router.navigateToRoute('list');
	}

	arrayObjectIndexOf(myArray, searchTerm, property) {
		for (var i = 0, len = myArray.length; i < len; i++) {
			if (myArray[i][property] == searchTerm) return i;
		}
		return -1;
	}
}