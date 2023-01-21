export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Supplier' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Supplier' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Supplier' },
             { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Supplier' }
        ]);

        this.router = router;
    }
}