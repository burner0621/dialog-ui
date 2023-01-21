export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Maksimal WH Confirm' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Maksimal WH Confirm' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Maksimal WH Confirm' },
        ]);

        this.router = router;
    }
}