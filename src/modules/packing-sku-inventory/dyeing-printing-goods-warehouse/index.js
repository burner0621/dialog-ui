export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Bon Gudang Jadi' }
        ]);

        this.router = router;
    }
}