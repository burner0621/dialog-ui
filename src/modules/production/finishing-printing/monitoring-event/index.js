export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Monitoring Event' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Monitoring Event' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Monitoring Event' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Monitoring Event' },
        ]);

        this.router = router;
    }
}