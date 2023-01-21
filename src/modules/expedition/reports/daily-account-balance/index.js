export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Saldo Bank Harian' },
        ]);

        this.router = router;
    }
}
