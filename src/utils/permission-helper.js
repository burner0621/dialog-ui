import { inject } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';
import jwtDecode from 'jwt-decode';

@inject(AuthService)
export class PermissionHelper {
    constructor(authService) {
        this.authService = authService;
    }

    getUserPermissions() {
        const config = this.authService.authentication.config;
        const storage = this.authService.authentication.storage;
        const token = JSON.parse(storage.get(config.storageKey));
        const user = jwtDecode(token.data);
        
        return user.permission;
    }
}
