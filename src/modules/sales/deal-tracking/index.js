export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List' },
            { route: 'board/:id', moduleId: './board', name: 'board', nav: false, title: 'Board' },
            { route: 'deal/:id/:stage/:boardId', moduleId: './deal', name: 'deal', nav: false, title: 'Deal' }
        ]);

        this.router = router;
    }
}
