export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Retur Barang Jadi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Retur Barang Jadi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Retur Barang Jadi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Retur Barang Jadi' },
        ]);
        this.router = router;
    }
}