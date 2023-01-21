export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'LAPORAN BON TERIMA UNIT YANG BELUM DIBUAT SPB' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:LAPORAN BON TERIMA UNIT YANG BELUM DIBUAT SPB' },
        ]);

        this.router = router;
    }
}
