import { Aurelia, inject } from 'aurelia-framework';
import { AuthService } from "aurelia-authentication";
import '../styles/signin.css';

@inject(AuthService)
export class Login {
    // username = "dev";
    // password = "Standar123";

    username="";
    password="";
    error = false;
    disabledButton = false;

    constructor(authService) {
        this.authService = authService;
    }

    login() {
        this.error = false;
        this.disabledButton = true;

        return this.authService.login({ "username": this.username, "password": this.password })
            .then(response => {
                console.log("success logged " + response);
            })
            .catch(err => {
                this.error = true;
                this.disabledButton = false;
                console.log(err);
                console.log("login failure");
            });
    }
} 