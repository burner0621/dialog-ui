export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Purchase Order External' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Purchase Order External' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Purchase Order External' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Purchase Order External' },
        ]);

        this.router = router;
    }
}