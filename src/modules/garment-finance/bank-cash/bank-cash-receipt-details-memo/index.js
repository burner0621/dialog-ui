export class Index {
	configureRouter(config, router) {
		config.map([
			{ route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Penerimaan Kas Bank' },
			{ route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Penerimaan Kas Bank' },
			{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Penerimaan Kas Bank' },
			{ route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Kas Bank' },
			{ route: 'post', moduleId: './post', name: 'post', nav: false, title: 'Post: Penerimaan Kas Bank' }
		]);

		this.router = router;
	}
}
