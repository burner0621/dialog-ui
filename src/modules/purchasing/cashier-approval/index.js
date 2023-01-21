export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Approval VB' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Approval VB' },
        ]);

        this.router = router;
    }
}
