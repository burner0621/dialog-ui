export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Bon Pengeluaran Unit' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bon Pengeluaran Unit' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bon Pengeluaran Unit' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bon Pengeluaran Unit' },
        ]);

        this.router = router;
    }
}