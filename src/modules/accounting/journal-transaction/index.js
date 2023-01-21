export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Jurnal Transaksi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Jurnal Transaksi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Jurnal Transaksi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Jurnal Transaksi' },
            { route: 'post', moduleId: './post', name: 'post', nav: false, title: 'Post: Jurnal Transaksi' }
        ]);

        this.router = router;
    }
}
