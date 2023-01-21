export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bukti Pengeluaran Lain - Lain' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bukti Pengeluaran Lain - Lain' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bukti Pengeluaran Lain - Lain' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bukti Pengeluaran Lain - Lain' },
        ]);

        this.router = router;
    }
}
