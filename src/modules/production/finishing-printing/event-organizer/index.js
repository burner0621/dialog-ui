export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Pelaksana Event' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Pelaksana Event' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Pelaksana Event' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Pelaksana Event' }
        ]);

        this.router = router;
    }
}