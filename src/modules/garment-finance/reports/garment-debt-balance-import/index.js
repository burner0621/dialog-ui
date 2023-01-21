export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Saldo Hutang Impor' },
        ]);

        this.router = router;
    }
}
