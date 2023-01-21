export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: Monitoring Specification Machine' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Monitoring Specification Machine' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Monitoring Specification Machine' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Monitoring Specification Machine' },
        ]);

        this.router = router;
    }
}