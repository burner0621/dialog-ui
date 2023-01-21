export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Aval Barang' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Aval Barang' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Aval Barang' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Aval Barang' },
        ]);

        this.router = router;
    }
}