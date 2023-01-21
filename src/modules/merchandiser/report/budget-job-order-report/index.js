export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'list'],
                moduleId: './list',
                name: 'list',
                nav: true,
            },
        ]);

        this.router = router;
    }
}
