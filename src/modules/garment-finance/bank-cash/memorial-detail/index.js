export class Index {
	configureRouter(config, router) {
		config.map([
			{ route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Rincian Memorial' },
			{ route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Rincian Memorial' },
			{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Rincian Memorial' },
			{ route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Rincian Memorial' },
		]);

		this.router = router;
	}
}
