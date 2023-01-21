export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Surat Permintaan Barang' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Surat Permintaan Barang' },
            { route: 'complete/:id', moduleId: './complete', name: 'complete', nav: false, title: 'Complete: Surat Permintaan Barang' },
            { route: 'create', moduleId: './create', name: 'create', nav: true, title: 'Create: Surat Permintaan Barang' } 
        ]);
        this.router = router;
    }
}
