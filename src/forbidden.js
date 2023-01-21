import { inject } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";

@inject(AuthService)
export class Forbidden {

    constructor(authService) {
        this.authService = authService;
    }
} 
