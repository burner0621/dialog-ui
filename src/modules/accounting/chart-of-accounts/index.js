export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Chart of Accounts' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Chart of Accounts' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Chart of Accounts' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Chart of Accounts' }
        ]);

        this.router = router;
    }
}
