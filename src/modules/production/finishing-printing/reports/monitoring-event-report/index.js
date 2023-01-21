export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'detail/:id', moduleId: './detail', name: 'detail', nav: false, title: 'Detail:Machine' }

        ]);

        this.router = router;
    }
}