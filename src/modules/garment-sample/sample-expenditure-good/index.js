export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Pengeluaran Barang Jadi Sample' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Pengeluaran Barang Jadi Sample' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Pengeluaran Barang Jadi Sample' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Pengeluaran Barang Jadi Sample' },
        ]);
        this.router = router;
    }
}