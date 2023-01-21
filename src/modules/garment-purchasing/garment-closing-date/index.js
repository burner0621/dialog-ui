export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'edit', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Closing Date' },
        ]);

        this.router = router;
    }
}
