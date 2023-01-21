export class Index {
	configureRouter(config, router) {
		config.map([
			{ route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Memorial' },
			{ route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Memorial' },
			{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Memorial' },
			{ route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Memorial' },
		]);

		this.router = router;
	}
}
