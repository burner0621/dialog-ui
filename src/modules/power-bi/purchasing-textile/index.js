export class Index {
  configureRouter(config, router) {
    config.map([
        {route:['', '/list'],       moduleId:'./list',          name:'list',        nav:false,      title:'Textile Purchasing Reports'},
        {route:'view/:id',          moduleId:'./view',          name:'view',        nav:false,      title:'View:Textile Purchasing Reports'},
        {route:'edit/:id',          moduleId:'./edit',          name:'edit',        nav:false,      title:'Edit:Textile Purchasing Reports'},
        {route:'create',            moduleId:'./create',        name:'create',      nav:false,      title:'Create:Textile Purchasing Reports'}
    ]);

    this.router = router;
  }
}