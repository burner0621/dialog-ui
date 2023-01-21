export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Invoice Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Invoice Garment' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Invoice Garment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Invoice Garment' },
        ]);

        this.router = router;
    }
}