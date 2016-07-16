import {Component} from '@angular/core';
import {EliService, GroupModel} from "./eli.service";

@Component({
    selector: 'login',
    template: `
  <div class="alert alert-danger" role="alert" *ngIf="message">
    {{ message }}
  </div>

  <form class="form-inline" *ngIf="!_eli.getUser()">
    <div class="form-group">
      <label for="username">User:</label>
      <input class="form-control" name="username" #username>
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input class="form-control " type="password" name="password" #password>
    </div>

    <a class="btn btn-default" (click)="login(username.value, password.value)">
      login
    </a>
  </form>

  <div class="" *ngIf="_eli.getUser()">
    <b>{{ _eli.getUser().username }}</b>
    <button class="btn btn-sm" type="button" (click)="logout()"> Logout</button>
  </div>
  `,
    styles: [`
    input{
        width:100px !important;
        height: 26px;
    }
    .btn{
        font-family: Cambria, Georgia;
        background: #ccc;
        font-weight: 600;
        margin-left: 5px;
        padding: 2px 10px;
    }
    b {
        color:#06c
    }
  `]
})
export class LoginComponent {
    message: string;

    constructor(public _eli: EliService) {
        this.message = '';
    };

    login(username: string, password: string): boolean {
        this.message = '';
        if (!this._eli.login(username, password)) {
            this.message = 'Incorrect credentials.';
            setTimeout(function() {
                this.message = '';
            }.bind(this), 2500);
        };
        return false;
    };

    logout(): boolean {
        this._eli.logout();
        return false;
    };
}

