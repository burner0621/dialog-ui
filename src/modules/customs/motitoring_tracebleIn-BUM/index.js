export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Monitoring Traceable IN By BUM' }, 
        ]);

        this.router = router;
    }
}
