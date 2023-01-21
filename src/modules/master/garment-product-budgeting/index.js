export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Garment Products' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Garment Product' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Garment Product' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Garment Product' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Garment Product' }
        ]);
    }
}
