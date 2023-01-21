export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Master Asal Barang Aval' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Asal Barang Aval' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Asal Barang Aval' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Asal Barang Aval' },
            
        ]);

        this.router = router;
    }
}
