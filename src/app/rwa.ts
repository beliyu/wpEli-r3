import {Component} from '@angular/core';

@Component({
    selector:'rwa',
    template:`
    <div class="pull-right">
        <H2>light Eli clone</H2>
        <p>Admin user:<br>username:beli - password:beli</p> 
        <p>user: <br>username:mal - password:mal</p>
    </div>
    `,
    styles:[`
        div {margin-right: 33px;}
    `]
})
export class Rwa {
}