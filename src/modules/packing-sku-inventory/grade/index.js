export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Grade - Dyeing/Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Grade - Dyeing/Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Grade - Dyeing/Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Grade - Dyeing/Printing' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Grade - Dyeing/Printing' }
        ]);

        this.router = router;
    }
}
