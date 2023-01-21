export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Transaksi Bank Harian Keluar' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Transaksi Bank Harian Keluar' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Transaksi Bank Harian Keluar' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Transaksi Bank Harian Keluar' },
        ]);

        this.router = router;
    }
}
