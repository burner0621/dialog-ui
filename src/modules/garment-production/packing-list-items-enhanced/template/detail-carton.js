import { inject, bindable, computedFrom } from 'aurelia-framework'

export class Detail {
	@bindable selectedRO;
	@bindable length;
	@bindable width;
	@bindable height;
	@bindable grossWeight;
	@bindable netWeight;
	@bindable netNetWeight;
	@bindable carton1;
	@bindable carton2;

	quantities = [];

	constructor() {

	}
	sizesColumns = [
		{ header: "Size" },
		{ header: "Quantity" },
	];


	toggle() {
		if (!this.isShowing)
			this.isShowing = true;
		else
			this.isShowing = !this.isShowing;
	}

	activate(context) {
		this.context = context;
		this.data = context.data;
		this.error = context.error;
		this.options = context.options;
		this.readOnly = this.options.readOnly;
		this.isCreate = context.context.options.isCreate;
		this.isEdit = context.context.options.isEdit;
		this.itemOptions = {
			error: this.error,
			isCreate: this.isCreate,
			readOnly: this.readOnly,
			isEdit: this.isEdit,
		};

		this.isShowing = false;
		if (this.error && this.error.Sizes && this.error.Sizes.length > 0) {
			this.isShowing = true;
		}

		this.length = this.data.length;
		this.width = this.data.width;
		this.height = this.data.height;


		this.grossWeight = this.data.grossWeight;
		this.netWeight = this.data.netWeight;
		this.netNetWeight = this.data.netNetWeight;

		this.carton1 = this.data.carton1;
		this.carton2 = this.data.carton2;
	}


	get addSizes() {
		return (event) => {
			this.data.sizes.push({});
		};
	}

	get removeSizes() {
		return (event) => {
			this.error = null;
		};
	}

	get totalQuantity() {
		if (this.data.cartonQuantity && this.data.quantityPCS) {
			this.data.totalQuantity = this.data.cartonQuantity * this.data.quantityPCS;
			return this.data.totalQuantity;
		}
		else
			return 0;
	}

	get totalQtySize() {
		var qtytot = 0;
		if (this.data.sizes) {
			for (var size of this.data.sizes) {
				if (size.quantity) {
					qtytot += size.quantity;
				}
			}
		}
		return qtytot;
	}

	get cmb() {
		if (this.data.length && this.data.width && this.data.height && this.data.cartonQuantity)
			return (this.data.length * this.data.width * this.data.height * this.data.cartonQuantity / 1000000).toLocaleString('en-EN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
		else
			return "0";
	}

	lengthChanged(newValue) {
		this.data.length = newValue;
		this.updateMeasurements();
	}

	widthChanged(newValue) {
		this.data.width = newValue;
		this.updateMeasurements();
	}

	heightChanged(newValue) {
		this.data.height = newValue;
		this.updateMeasurements();
	}

	updateMeasurements() {
		let measurementCartons = [];
		for (const item of this.context.context.options.header.items) {
			for (const detail of (item.details || [])) {
				let measurement = measurementCartons.find(m => m.length == detail.length && m.width == detail.width && m.height == detail.height && m.carton1 == detail.carton1 && m.carton2 == detail.carton2 && m.index == detail.index);
				if (!measurement) {
					measurementCartons.push({
						carton1: detail.carton1,
						carton2: detail.carton2,
						length: detail.length,
						width: detail.width,
						height: detail.height,
						cartonsQuantity: detail.cartonQuantity,
						index: detail.index,
					});
				}
			}
		}

		let measurements = [];
		for (const measurementCarton of measurementCartons) {
			let measurement = measurements.find(m => m.length == measurementCarton.length && m.width == measurementCarton.width && m.height == measurementCarton.height && m.index == measurementCarton.index);
			if (measurement) {
				measurement.cartonsQuantity += measurementCarton.cartonsQuantity;
			} else {
				measurements.push(Object.assign({}, measurementCarton));
			}
		}

		this.context.context.options.header.measurements = this.context.context.options.header.measurements || [];
		this.context.context.options.header.measurements.splice(0);

		for (const mt of measurements) {
			let measurement = (this.context.context.options.header.measurementsTemp || []).find(m => m.length == mt.length && m.width == mt.width && m.height == mt.height && mt.index == m.index);
			if (measurement) {
				measurement.cartonsQuantity = mt.cartonsQuantity;
				this.context.context.options.header.measurements.push(measurement);
			} else {
				this.context.context.options.header.measurements.push(mt);
			}
		}

		this.context.context.options.header.measurements.forEach((m, i) => m.MeasurementIndex = i);
	}

	sumSubTotal(opt) {
		let result = 0;
		const newDetails = this.context.context.options.item.details.map(d => {
			return {
				carton1: d.carton1,
				carton2: d.carton2,
				cartonQuantity: d.cartonQuantity,
				grossWeight: d.grossWeight,
				netWeight: d.netWeight,
				netNetWeight: d.netNetWeight,
				index: d.index
			};
		}).filter((value, index, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === index);
		for (const detail of newDetails) {
			const cartonExist = false;
			const indexItem = this.context.context.options.header.items.indexOf(this.context.context.options.item);
			if (indexItem > 0) {
				for (let i = 0; i < indexItem; i++) {
					const item = this.context.context.options.header.items[i];
					for (const prevDetail of item.details) {
						if (detail.carton1 == prevDetail.carton1 && detail.carton2 == prevDetail.carton2 && detail.index == prevDetail.index) {
							cartonExist = true;
							break;
						}
					}
				}
			}
			if (!cartonExist) {
				switch (opt) {
					case 0:
						result += detail.grossWeight * detail.cartonQuantity;
						break;
					case 1:
						result += detail.netWeight * detail.cartonQuantity;
						break;
					case 2:
						result += detail.netNetWeight * detail.cartonQuantity;
						break;
				}
			}
		}
		return result;
	}

	grossWeightChanged(newValue) {
		this.data.grossWeight = newValue;
		this.updateGrossWeight();
	}

	updateGrossWeight() {
		this.context.context.options.header.grossWeight = 0;

		this.context.context.options.item.subGrossWeight = this.sumSubTotal(0);

		for (const item of this.context.context.options.header.items) {
			this.context.context.options.header.grossWeight += item.subGrossWeight || 0;
		}
	}

	netWeightChanged(newValue) {
		this.data.netWeight = newValue;
		this.updateNettWeight();
	}

	updateNettWeight() {
		this.context.context.options.header.nettWeight = 0;

		this.context.context.options.item.subNetWeight = this.sumSubTotal(1);

		for (const item of this.context.context.options.header.items) {
			this.context.context.options.header.nettWeight += item.subNetWeight || 0;
		}
	}

	netNetWeightChanged(newValue) {
		this.data.netNetWeight = newValue;
		this.updateNetNetWeight();
	}

	updateNetNetWeight() {
		this.context.context.options.header.netNetWeight = 0;

		this.context.context.options.item.subNetNetWeight = this.sumSubTotal(2);

		for (const item of this.context.context.options.header.items) {
			this.context.context.options.header.netNetWeight += item.subNetNetWeight || 0;
		}
	}

	carton1Changed(newValue) {
		this.data.carton1 = newValue;
		this.updateCartonQuantity();
		this.updateTotalSummary();
	}

	updateCartonQuantity() {
		this.data.cartonQuantity = 0;
		if (this.data.carton1 && this.data.carton2) {
			this.data.cartonQuantity = this.data.carton2 - this.data.carton1 + 1;
		}
		this.updateMeasurements();
	}

	carton2Changed(newValue) {
		this.data.carton2 = newValue;
		this.updateCartonQuantity();
		this.updateTotalSummary();
	}

	updateTotalSummary() {
		this.context.context.options.header.grossWeight = 0;
		this.context.context.options.header.nettWeight = 0;
		this.context.context.options.header.netNetWeight = 0;

		this.context.context.options.item.subGrossWeight = this.sumSubTotal(0);
		this.context.context.options.item.subNetWeight = this.sumSubTotal(1);
		this.context.context.options.item.subNetNetWeight = this.sumSubTotal(2);

		for (const item of this.context.context.options.header.items) {
			this.context.context.options.header.grossWeight += item.subGrossWeight || 0;
			this.context.context.options.header.nettWeight += item.subNetWeight || 0;
			this.context.context.options.header.netNetWeight += item.subNetNetWeight || 0;
		}
	}

	indexChanged(newValue) {
		this.context.context.options.item.details[this.context.context.options.item.details.length - 1].index = newValue;
	}

	quantitiesChanged(newValue) {
		console.log(newValue);
		console.log("quantities", this.quantities);
	}

	get quantityPCS() {
		this.data.quantityPCS = this.data.sizes.reduce((acc, cur) => acc += cur.quantity, 0);
		return this.data.quantityPCS;
	}
}
