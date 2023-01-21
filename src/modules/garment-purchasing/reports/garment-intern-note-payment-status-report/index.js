export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Status Bayar Nota Intern' }
        ]);
        this.router = router;
    }
}