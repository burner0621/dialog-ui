export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Master Tujuan Barang Aval' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Tujuan Barang Aval' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Tujuan Barang Aval' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Tujuan Barang Aval' },
            
        ]);

        this.router = router;
    }
}
