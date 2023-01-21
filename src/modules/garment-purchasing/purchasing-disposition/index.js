export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Disposisi Pembelian' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Disposisi Pembelian' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Disposisi Pembelian' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Disposisi Pembelian' },
        ]);

        this.router = router;
    }
}
