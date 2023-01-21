export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Finishing Out' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Finishing Out' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Finishing Out' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Finishing Out' },
        ]);
        this.router = router;
    }
}