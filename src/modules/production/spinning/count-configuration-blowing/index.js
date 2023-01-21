export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Count Configuration' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Count Configuration' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Count Configuration' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Count Configuration' }
        ]);

        this.router = router;
    }
}