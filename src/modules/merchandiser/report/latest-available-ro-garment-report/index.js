export class Index {
    configureRouter(config, router) {
        config.map([
            {
                route: ['', 'monitoring'],
                moduleId: './monitoring',
                name: 'monitoring',
                nav: true,
            },
        ]);

        this.router = router;
    }
}
