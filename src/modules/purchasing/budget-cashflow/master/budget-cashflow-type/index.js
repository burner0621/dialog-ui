export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Jenis Budget Cashflow' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jenis Budget Cashflow' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jenis Budget Cashflow' },
        ]);

        this.router = router;
    }
}