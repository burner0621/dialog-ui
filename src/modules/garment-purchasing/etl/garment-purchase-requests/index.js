export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Garment Purchase Requests' },
            { route: 'migrate', moduleId: './migrate', name: 'migrate', nav: false, title: 'Migrate: Garment Purchase Requests' },
        ]);

        this.router = router;
    }
}