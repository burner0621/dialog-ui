export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Catatan Transfer Stok' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Catatan Transfer Stok' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Catatan Transfer Stok' }
        ]);

        this.router = router;
    }
}
