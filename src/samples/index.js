export class index {

  configureRouter(config, router) {
    config.map([ 
      { route: '/',         name: 'list',         moduleId: './list',         nav: true,      title: 'Sample List' },
      { route: '/input-form',   name: 'input-form',       moduleId: './input-form/index',       nav: true,      title: 'input-form sample' },
      { route: '/autocomplete',   name: 'autocomplete',       moduleId: './autocomplete/index',       nav: true,      title: 'Autocomplete sample' },
      { route: '/dropdown',   name: 'dropdown',       moduleId: './dropdown/index',       nav: true,      title: 'Dropdown sample' },
      { route: '/collection',   name: 'collection',       moduleId: './collection/index',       nav: true,      title: 'Collection sample' },      
      { route: 'form-controls', moduleId: './form-controls', name: 'form-controls', nav: true, title: 'Sample - Form Controls' }
    ]);

    this.router = router;
  }
}
