export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Monitoring Event Harian' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Monitoring Event Harian' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Monitoring Event Harian' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Monitoring Event Harian' }
        ]);

        this.router = router;
    }
}