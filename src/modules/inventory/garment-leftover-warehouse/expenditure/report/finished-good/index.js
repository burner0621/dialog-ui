export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Report Pengeluaran Gudang Sisa' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View : Report Pengeluaran Gudang Sisa' },
        ]);

        this.router = router;
    }
}