import { Aurelia, inject, computedFrom } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';
import { AuthStep } from './utils/auth-step';
import routes from './routes/index';

@inject(AuthService)

export class App {
  constructor(authService) {
    this.authService = authService;
  }
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.addPipelineStep('authorize', AuthStep);
    config.map(routes);
    this.router = router;
  }

  @computedFrom('authService.authenticated')
  get isAuthenticated() {
    return this.authService.authenticated;
  }
}
