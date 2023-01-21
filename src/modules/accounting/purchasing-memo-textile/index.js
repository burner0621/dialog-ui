export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Memorial Pembelian Tekstil' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Memorial Pembelian Tekstil' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Memorial Pembelian Tekstil' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Memorial Pembelian Tekstil' },
        ]);

        this.router = router;
    }
}
