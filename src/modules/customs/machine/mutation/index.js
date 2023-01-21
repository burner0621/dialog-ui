export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            // { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Machine Category' },
            // { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Currency' },
            { route: 'out', moduleId: './out', name: 'out', nav: false, title: 'OUT' },
            { route: 'in', moduleId: './in', name: 'in', nav: false, title: 'IN' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Mutation' },
        ]);

        this.router = router;
    }
}
