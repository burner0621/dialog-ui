export class Index {
	configureRouter(config, router) {
		config.map([
			{ route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: BC Masuk' },
			{ route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: BC Masuk' },
			{ route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: BC Masuk' },
			{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: BC Masuk' },
		]);
		this.router = router;
	}
}