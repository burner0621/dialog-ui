export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Saldo Hutang Lokal Valas' },
            { route: 'detail/:supplierCode/:divisionId/:month/:year?', moduleId: './detail', name: 'detail', nav: false, title: 'Rincian Saldo Hutang' },
        ]);

        this.router = router;
    }
}
