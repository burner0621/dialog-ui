export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Currency' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Currency' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Currency' },
        ]);

        this.router = router;
    }
}
