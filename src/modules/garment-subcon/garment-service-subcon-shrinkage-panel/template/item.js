import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service, PurchasingService } from "../service";
import GarmentUnitExpenditureNotesLoader from '../../../../loader/garment-unit-expenditure-note-loader';

@inject(Service, PurchasingService)
export class Item {
	@bindable selectedUEN;

	constructor(service, purchasingService) {
		this.service = service;
		this.purchasingService = purchasingService;
	}

	filter = {
		ExpenditureType: "SUBCON"
	};

	detailColumns = [
		"Kode Barang",
		"Nama Barang",
		"Keterangan Barang",
		"Design / Color",
		"Jumlah",
		"Satuan"
	];

	activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.options = context.context.options;
		this.data.IsDifferentSize = false;
		this.readOnly = context.options.readOnly;
		this.isCreate = context.context.options.isCreate;
		this.isEdit = context.context.options.isEdit;

		this.itemOptions = {
			error: this.error,
			isCreate: this.isCreate,
			isEdit: this.isEdit,
			readOnly: this.readOnly
		};
		this.isShowing = true;
		if (this.data.Details) {
			if (this.data.Details.length > 0) {
				this.isShowing = true;
			}
		}
		if (this.data) {
			this.selectedUEN = {
				UENNo: this.data.UnitExpenditureNo,
				ExpenditureDate: this.data.ExpenditureDate,
				UnitSenderId: this.data.UnitSender && this.data.UnitSender.Id,
				UnitSenderCode: this.data.UnitSender && this.data.UnitSender.Code,
				UnitSenderName: this.data.UnitSender && this.data.UnitSender.Name,
				UnitRequestId: this.data.UnitRequest && this.data.UnitRequest.Id,
				UnitRequestCode: this.data.UnitRequest && this.data.UnitRequest.Code,
				UnitRequestName: this.data.UnitRequest && this.data.UnitRequest.Name,
				Items: this.data.Items && []
			}
		}
	}

	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}

	UENView = (uen) => {
		return `${uen.UENNo}`;
	}

	async selectedUENChanged(newValue, oldValue) {
		if (newValue.UENNo != this.data.UnitExpenditureNo) {
			this.data.Details.splice(0);
			this.data.UnitExpenditureNo = newValue.UENNo;
			this.data.ExpenditureDate = newValue.ExpenditureDate;
			this.data.UnitSender = {
				Id: newValue.UnitSenderId,
				Code: newValue.UnitSenderCode,
				Name: newValue.UnitSenderName
			};

			this.data.UnitRequest = {
				Id: newValue.UnitRequestId,
				Code: newValue.UnitRequestCode,
				Name: newValue.UnitRequestName
			};
			newValue.Items.map(async i => {
				const dataUnitDOItem = await this.purchasingService.getUnitDeliveryOrderItems(i.UnitDOItemId);
				const detail = {};
				detail.Product = {
					Id: i.ProductId,
					Code: i.ProductCode,
					Name: i.ProductName,
					Remark: i.ProductRemark,
				};
				detail.Quantity = i.Quantity;
				detail.DesignColor = dataUnitDOItem.DesignColor;
				detail.Uom = {
					Id: i.UomId,
					Unit: i.UomUnit
				}
				this.data.Details.push(detail);
			})

		} else {
			this.data.UENNo = null;
		}
	}

	get garmentUENLoader() {
		return async (keyword) => {
			var info = {
				keyword: keyword,
				filter: JSON.stringify({ ExpenditureType: "SUBCON" })
			};

			let dataSubconShrinkage = await this.service.searchComplete({});
			let uenNo = [];
			dataSubconShrinkage.data.map(x => {
				x.Items.map(item => {
					uenNo.push(item.UnitExpenditureNo);
				})
			});

			return this.purchasingService.getUnitExpenditureNotes(info)
				.then((result) => {
					let data = result.data.filter(x => !uenNo.includes(x.UENNo));
					return data;
				});
		}
	}
}
