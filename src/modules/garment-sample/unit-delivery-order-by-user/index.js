export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Unit Delivery Order' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Unit Delivery Order' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Unit Delivery Order' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Unit Delivery Order' },
        ]);

        this.router = router;
    }
}