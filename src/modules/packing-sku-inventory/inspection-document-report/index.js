export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Bon Inspection Material Dyeing/Printing' }
        ]);

        this.router = router;
    }
}