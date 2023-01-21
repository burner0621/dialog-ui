export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Keterangan Bad Output' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Keterangan Bad Output' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Keterangan Bad Output' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Keterangan Bad Output' },
        ]);
    }
}