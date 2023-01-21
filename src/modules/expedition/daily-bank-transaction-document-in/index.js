export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Transaksi Bank Harian Masuk' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Transaksi Bank Harian Masuk' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Transaksi Bank Harian Masuk' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Transaksi Bank Harian Masuk' },
        ]);

        this.router = router;
    }
}
