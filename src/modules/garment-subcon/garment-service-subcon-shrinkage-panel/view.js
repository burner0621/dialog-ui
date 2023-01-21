import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service, PurchasingService } from './service';

@inject(Router, Service, PurchasingService)
export class View {
	isView = true;
	constructor(router, service, purchasingService) {
		this.router = router;
		this.service = service;
		this.purchasingService = purchasingService;
	}

	async activate(params) {
		let id = params.id;
		this.data = await this.service.read(id);

		this.selectedUnit = this.data.Unit;
		if (this.data.IsUsed) {
			this.deleteCallback = null;
			this.editCallback = null;
		}
	}

	cancelCallback(event) {
		this.router.navigateToRoute('list');
	}

	editCallback(event) {
		this.router.navigateToRoute('edit', { id: this.data.Id });
	}

	deleteCallback(event) {
		if (confirm(`Hapus ${this.data.ServiceSubconShrinkagePanelNo}?`))
			this.service.delete(this.data)
				.then(result => {
					this.cancelCallback();
				})
				.catch(e => {
					this.error = e;
					if (typeof (this.error) == "string") {
						alert(this.error);
					} else {
						alert("Missing Some Data");
					}
				})
	}
}
