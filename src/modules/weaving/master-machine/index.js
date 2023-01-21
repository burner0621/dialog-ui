export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Mesin' },
            { route: 'view/:Id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Mesin' },
            { route: 'edit/:Id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Mesin' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Mesin' }
        ]);
    }
}
