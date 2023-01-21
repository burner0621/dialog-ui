import { inject, bindable, computedFrom, BindingEngine } from 'aurelia-framework';
import { SalesService } from "../service";
var CostCalculationLoader = require("../../../../loader/cost-calculation-garment-loader");
var UomLoader = require("../../../../loader/uom-loader");
var UnitLoader = require("../../../../loader/unit-loader");
const SizeLoader = require('../../../../loader/size-loader');
import { Sizes } from './sizes';

@inject(SalesService, BindingEngine)
export class Item {
	@bindable selectedRO;
	@bindable uom;
	@bindable removedSizes;


	constructor(salesService, bindingEngine) {
		this.salesService = salesService;
		this.bindingEngine = bindingEngine;
	}

	get filter() {
		var filter = {};
		let section = this.context.context.options.header.section || {};

		if (section.code === "C") {
			var filter = {
				Section: section.code || section.Code,
				"SCGarmentId!=null": true
			};
		}
		else {
			var filter = {
				BuyerCode: this.data.BuyerCode,
				Section: section.code || section.Code,
				"SCGarmentId!=null": true
			};
		}
		return filter;
	}

	detailsColumns = [
		{ header: "Index" },
		{ header: "Carton 1" },
		{ header: "Carton 2" },
		{ header: "Style" },
		{ header: "Colour" },
		{ header: "Jml Carton" },
		{ header: "Qty" },
		{ header: "Total Qty" },
		{ header: "GW" },
		{ header: "NW" },
		{ header: "NNW" },
		{ header: "L" },
		{ header: "W" },
		{ header: "H" },
		{ header: "CBM" },
		{ header: "" },
	];

	get roLoader() {
		return CostCalculationLoader;
	}

	roView = (costCal) => {
		return `${costCal.RO_Number}`
	}

	get uomLoader() {
		return UomLoader;
	}

	uomView = (uom) => {
		return `${uom.Unit || uom.unit}`
	}

	get unitLoader() {
		return UnitLoader;
	}

	get sizeLoader() {
		return SizeLoader;
	}

	sizeView = (size) => {
		var sizeName = size.Size || size.size;
		return `${sizeName}`
	}


	get unitFilter() {
		return { "(Code == \"C2A\" || Code == \"C2B\" || Code == \"C2C\" || Code == \"C1A\" || Code == \"C1B\")": true };
	}

	unitView = (unit) => {
		return `${unit.Code || unit.code}`
	}

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
			header: context.context.options.header,
			item: this.data,
		};
		if (this.data.roNo) {
			this.selectedRO = {
				RO_Number: this.data.RONo || this.data.roNo
			};
			this.uom = this.data.uom;
			this.data.details.forEach(x => {
				if (x.sizes != null) {
					x.sizes.forEach(s => {
						if (s.size != null) {
							let index = this.allSizes.findIndex(x => x.size.Size == s.size.size);
							if (index == -1) {
								this.allSizes.push({ id: s.id, size: { Id: s.size.id, Size: s.size.size }, quantity: s.quantity });
							}
						}
					})

				}
			});
			if (this.allSizes.length > 0) {
				this.onUpdateTable();
			}
		}

		this.isShowing = false;
		if (this.error && this.error.Details && this.error.Details.length > 0) {
			this.isShowing = true;
		}
	}

	selectedROChanged(newValue) {
		if (newValue) {
			this.salesService.getCostCalculationById(newValue.Id)
				.then(result => {
					this.salesService.getSalesContractById(result.SCGarmentId)
						.then(sc => {
							this.salesService.getPreSalesContractById(result.PreSCId)
								.then(psc => {
									this.data.roNo = result.RO_Number;
									this.data.article = result.Article;
						   		    this.data.marketingName = result.MarketingName;      
									this.data.buyerAgent = result.Buyer;
									this.data.buyerBrand = result.BuyerBrand;
									this.data.sectionName = result.SectionName;
									this.data.section = {
										id: psc.SectionId,
										code: result.Section,
									};
									this.data.comodityDescription = (result.Comodity || {}).Name;
									this.data.unit = result.Unit;
									this.data.uom = result.UOM;
									this.uom = result.UOM;
									this.data.valas = "USD";
									this.data.quantity = result.Quantity;
									this.data.scNo = sc.SalesContractNo;
									this.data.price = sc.Price;
									this.data.priceRO = sc.Price;
									this.data.comodity = result.Comodity;
									this.data.amount = sc.Amount;

									this.context.context.options.header.section = this.data.section;
								});
						})
				});
		}
	}

	sumSubTotal(opt) {
		let result = 0;
		const newDetails = this.data.details.map(d => {
			return {
				carton1: d.carton1,
				carton2: d.carton2,
				cartonQuantity: d.cartonQuantity,
				grossWeight: d.grossWeight,
				netWeight: d.netWeight,
				netNetWeight: d.netNetWeight,
				index: d.index
			};
		}).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);
		for (const detail of newDetails) {
			const cartonExist = false;
			const indexItem = this.context.context.options.header.items.indexOf(this.data);
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


	get subGrossWeight() {
		return this.sumSubTotal(0);
	}

	get subNetWeight() {
		return this.sumSubTotal(1);
	}

	get subNetNetWeight() {
		return this.sumSubTotal(2);
	}

	get addDetails() {
		return (event) => {
			const i = this.context.context.items.indexOf(this.context);
			let lastIndex;

			let lastDetail;
			if (this.data.details.length > 0) {
				lastDetail = this.data.details[this.data.details.length - 1];
				lastIndex = this.data.details[this.data.details.length - 1].index;
			} else if (i > 0) {
				const lastItem = this.context.context.items[i - 1];
				lastDetail = lastItem.data.details[lastItem.data.details.length - 1];
			}
			let allSizes = this.allSizes.slice();
			allSizes = allSizes.map(x => {
				return Object.assign({}, x);
			});

			this.data.details.push({
				carton1: lastDetail ? lastDetail.carton2 + 1 : 0,
				style: lastDetail ? lastDetail.style : "",
				colour: lastDetail ? lastDetail.colour : "",
				length: lastDetail ? lastDetail.length : 0,
				width: lastDetail ? lastDetail.width : 0,
				height: lastDetail ? lastDetail.height : 0,
				index: lastIndex ? lastIndex : 1,
				sizes: allSizes.map(x => {
					x.id = 0;
					x.quantity = 0;
					return x;
				}),
			});
		};
	}

	get removeDetails() {
		return (event) => {
			this.error = null;
			this.updateTotalSummary();
			this.updateMeasurements();
		};
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


	get totalQty() {
		let qty = 0;
		if (this.data.details) {
			for (var detail of this.data.details) {
				if (detail.cartonQuantity && detail.quantityPCS) {
					qty += detail.cartonQuantity * detail.quantityPCS;
				}
			}
		}
		return qty;
	}

	get totalCtn() {
		let qty = 0;
		if (this.data.details) {
			const newDetails = this.data.details.map(d => {
				return {
					carton1: d.carton1,
					carton2: d.carton2,
					cartonQuantity: d.cartonQuantity,
					grossWeight: d.grossWeight,
					netWeight: d.netWeight,
					netNetWeight: d.netNetWeight,
					index: d.index
				};
			}).filter((value, i, self) => self.findIndex(f => value.carton1 == f.carton1 && value.carton2 == f.carton2 && value.index == f.index) === i);
			for (var detail of newDetails) {
				const cartonExist = false;
				const indexItem = this.context.context.options.header.items.indexOf(this.data);
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
					qty += detail.cartonQuantity;
				}
			}
		}
		return qty;
	}

	get amount() {
		this.data.amount = 0;
		if (this.data.quantity && this.data.price) {
			this.data.amount = this.data.quantity * this.data.price
		}
		return this.data.amount;
	}

	updateTotalSummary() {
		this.context.context.options.header.grossWeight = 0;
		this.context.context.options.header.nettWeight = 0;
		this.context.context.options.header.netNetWeight = 0;

		this.data.subGrossWeight = this.sumSubTotal(0);
		this.data.subNetWeight = this.sumSubTotal(1);
		this.data.subNetNetWeight = this.sumSubTotal(2);

		for (const item of this.context.context.options.header.items) {
			this.context.context.options.header.grossWeight += item.subGrossWeight || 0;
			this.context.context.options.header.nettWeight += item.subNetWeight || 0;
			this.context.context.options.header.netNetWeight += item.subNetNetWeight || 0;
		}
	}

	uomChanged(newValue) {
		if (newValue) {
			this.data.uom = newValue;
			this.uom = newValue;
		}
	}


	allSizes = [];

	get onAddSizes() {
		return (event) => {
			if (this.allSizes.length < 20) {
				this.allSizes.push({ size: null, quantity: 0 });
			}

		};
	}

	get onRemoveSizes() {
		return (event) => {
			if (this.removedSizes != null) {
				if (this.allSizes.length > 0 && this.allSizes[0].size != null) {
					let index = this.allSizes.findIndex(s => {
						if (s.size != null) {
							let tempSize = s.size.Size || s.size.size;
							if (this.removedSizes.Size == tempSize) {
								return s;
							}
						}

					});
					if (index != -1) {
						this.allSizes.splice(index, 1);
						this.onUpdateTable();
					}

				} else {
					alert("Sizes sudah kosong !");
				}
				if (this.allSizes.length == 0) {
					this.allSizes = [];
				}

			}
		};
	}

	onUpdateTable() {
		if ((this.allSizes.length > 0 && this.allSizes[0].size != null) || this.removedSizes) {
			this.detailsColumns = [
				{ header: "Index" },
				{ header: "Carton 1" },
				{ header: "Carton 2" },
				{ header: "Style" },
				{ header: "Colour" },
				{ header: "Jml Carton" },
				{ header: "Qty" },
				{ header: "Total Qty" },
				{ header: "GW" },
				{ header: "NW" },
				{ header: "NNW" },
				{ header: "L" },
				{ header: "W" },
				{ header: "H" },
				{ header: "CBM" },
				{ header: "" },
			];

			let newDetailColumns = [...this.detailsColumns];
			let tempDetailColumns = [];
			let isEmptySize = false;
			let newSizes = [];
			for (let sizes of this.allSizes) {
				if (sizes.size != null) {
					tempDetailColumns.push({ header: sizes.size.Size, value: undefined });
					if (sizes.id == null) {
						newSizes.push(sizes);
					}
				} else {
					isEmptySize = true;
				}
			}
			if (isEmptySize) {
				alert("Masih ada size yang kosong!");
			}
			newDetailColumns.splice(5, 0, ...tempDetailColumns);
			this.detailsColumns = newDetailColumns;
			for (let details of this.data.details) {
				let filteredSizes = [];

				if (details.sizes.length == 0 && this.removedSizes == null) {
					newSizes.forEach(x => {
						filteredSizes.push(x.size);
					})
				}
				// filteredSizes untuk sizes yang ada di newSizes dan belum ada di details untuk ditambahkan
				if (this.removedSizes == null) {
					for (let sizes of details.sizes) {
						newSizes.forEach(x => {
							let tempSize = sizes.size.id || sizes.size.Id;
							if (x.size.Id != tempSize) {
								filteredSizes.push(x.size);
							}
						});
					}

				}

				if (filteredSizes.length != 0) {
					let idx = this.data.details.indexOf(details);
					filteredSizes.forEach(f => {
						let index = this.data.details[idx].sizes.findIndex(x => x.size.Size == f.Size);
						if (index == -1) {
							this.data.details[idx].sizes.push({ size: f });

						}
					})

				}
				if (this.removedSizes != null) {
					let idx = this.data.details.indexOf(details);
					let indexSize = this.data.details[idx].sizes.findIndex(x => {
						if (x.size != null) {
							let tempSize = x.size.size || x.size.Size;
							if (tempSize == this.removedSizes.Size) {
								return x;
							}

						}
					});
					this.data.details[idx].sizes.splice(indexSize, 1);
				}
			}
			this.removedSizes = null;

		} else {
			alert('Size masih kosong !');
		}
	}


}
