import { inject } from 'aurelia-framework';
import { Redirect } from 'aurelia-router';
import { AuthService } from 'aurelia-authentication';
import jwtDecode from 'jwt-decode';

@inject(AuthService)
export class AuthStep {
    constructor(authService) {
        this.authService = authService;
    }

    run(routingContext, next) {
        const isLoggedIn = this.authService.authenticated;
        const loginRoute = this.authService.config.loginRoute;
        const config = this.authService.authentication.config;
        const storage = this.authService.authentication.storage;
        const forbiddenRoute = "/forbidden";

        if (routingContext.getAllInstructions().some(route => route.config.auth === true)) {
            if (!isLoggedIn) {
                return next.cancel(new Redirect(loginRoute));
            }
            else if (isLoggedIn && routingContext.getAllInstructions().some(route => {
                const token = JSON.parse(storage.get(config.storageKey));
                var user = jwtDecode(token.data);
                var routeSettings = route.config.settings || {};
                var routePermissions = routeSettings.permissions || [];
                var userPermissions = user.permissions;

                return routePermissions.some(permission => {
                    return false;
                    //userPermissions.indexOf(permission)
                });
            })) {
                return next.cancel(new Redirect(forbiddenRoute));
            }
        }
        else if (isLoggedIn && routingContext.getAllInstructions().some(route => [loginRoute].indexOf(route.fragment) >= 0)) {
            return next.cancel(new Redirect(this.authService.config.loginRedirect));
        }

        return next();
    }
}
