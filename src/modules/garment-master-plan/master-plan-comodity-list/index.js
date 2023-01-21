export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Master Plan Comodity' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Plan Comodity' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Plan Comodity' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Plan Comodity' },
        ]);

        this.router = router;
    }
}