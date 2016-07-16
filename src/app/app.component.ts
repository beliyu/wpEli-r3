import {Component } from '@angular/core';
import {Control, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {ROUTER_DIRECTIVES, Router } from '@angular/router';
import {EliService, GroupModel} from "./eli.service";
import {LoginComponent} from "./login.component";
import {GroupComponent } from "./group.component";
import {LastComponent } from "./last.component";
import {PanelmenuComponent} from './panelmenu/panelmenu.component';
import {Toolbar} from 'primeng/primeng';
import {Rwa} from "./rwa";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  directives:[PanelmenuComponent, Rwa, ROUTER_DIRECTIVES,
              GroupComponent, Toolbar, LoginComponent],
  pipes:[],
  providers:[EliService],
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent{
  menItems=[];
  toggle:boolean=true;
  WGroups:GroupModel[]=[];
  WlastPs:GroupModel[]=[];
  constructor(private _eli:EliService, private _router: Router){
    this.widthAct();
  }

  toggleSidebar (){
    this.toggle = !this.toggle;
    localStorage.setItem('toggle', this.toggle ? '1' : '0');
  }
  widthAct(){
    if (window.innerWidth >= 768) {
      if (typeof(localStorage.getItem('toggle')) != null) {
        this.toggle =localStorage.getItem('toggle')=='0' ? false : true;
      } else {
        this.toggle = true;
      }
    } else {
      this.toggle = false;
    }
  }
  naviLast(q){
    this._router.navigate(['/last', q]);
  }
  last(q){
    let d2 = Date.now();
    let d3 = new Date(d2-q*3600000);
    let x = d3.toJSON();
    this._eli.getNewP(x).subscribe(data=>{this.WlastPs = data; console.log(this.WlastPs);}, err=> console.log(err))
  }

  ngOnInit() {
    this.menItems = [
      {
        label: 'Linux',
        items: [
          {label: 'Linux', routerLink:1},
          {label: 'Linux aplikacije', routerLink:2},
          {label: 'Linux desktop okruženja', routerLink:3},
          {label: 'Linux hardware', routerLink:4}
        ]
      },
      {
        label: 'Windows',
        items: [
          {label: 'Windows desktop',routerLink:5},
          {label: 'Windows aplikacije',routerLink:6},
          {label: 'Zaštita'},
          {label: 'Office',
            items: [
                {label: 'Word'},
                {label: 'Excel'},
            ]},
          {label: 'Windows drajveri'}
        ]
      },
      {
        label: 'Apple',
        items: [
          {label: 'Macintosh'},
          {label: 'Mac hardware'},
          {label: 'Mac software'},
          {label: 'Iphone'}
        ]
      },
      {
        label: 'Mreže',
        items: [
          {label: 'Enterprise Networking'},
          {label: 'SOHO Networking'},
          {label: 'Wireless',
            items: [
              {label: 'WiMax'},
              {label: 'Mikrotik'},
              {label: 'Wireless oprema'}
            ]},
          {label: 'Windows mreže'},
          {label: 'Linux mreže'}
        ]
      }
    ];
  }

  static log(q){console.log(q)}

}


