export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Supplier Garment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Supplier Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Supplier Garment' },
             { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Supplier Garment' }
        ]);

        this.router = router;
    }
}