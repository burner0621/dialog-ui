export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'validate'], moduleId: './validate', name: 'validate', nav: true },
        ]);

        this.router = router;
    }
}