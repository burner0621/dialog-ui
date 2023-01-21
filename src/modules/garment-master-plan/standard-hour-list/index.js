export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Standard Minute Value' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Standard Minute Value' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Standard Minute Value' },
        ]);

        this.router = router;
    }
}