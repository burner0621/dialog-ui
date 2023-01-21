export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Count Configuration Excel' },
            
        ]);

        this.router = router;
    }
}