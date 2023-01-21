export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Kategori Budget Cashflow' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Kategori Budget Cashflow' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Kategori Budget Cashflow' },
        ]);

        this.router = router;
    }
}