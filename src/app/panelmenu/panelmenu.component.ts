import {Component,  Input, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

export interface MenuItem {
    label?: string;
    url?: string;
    routerLink?: any;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
}

@Component({
    selector: 'panelmenuSub',
    directives:[PanelmenuSubComponent],
    pipes:[],
    providers:[],
    template: require('./menuitem.component.html'),
    styles: [require('./menuitem.component.css')]
})
export class PanelmenuSubComponent {

    @Input() item:MenuItem[];
    @Input() expanded: boolean;
    activeItems:MenuItem[];

    constructor(private router: Router) {
        this.activeItems = [];
    }

    isActive(item: MenuItem): boolean {
        return this.activeItems.indexOf(item) != -1;
    }
    onClick(event,item: MenuItem) {
    if(item.items) {
        let index = this.activeItems.indexOf(item);

        if(index == -1)
            this.activeItems.push(item);
        else
            this.activeItems.splice(index, 1);

        event.preventDefault();
    }
    else {
        if(!item.url||item.routerLink) {
            event.preventDefault();
        }

        if(item.routerLink) {
            this.router.navigate(['/group',  item.routerLink]);
            //this.router.navigate(item.routerLink);
        }
    }
}
}

@Component({
  selector: 'panelmenu',
  directives:[PanelmenuSubComponent],
  pipes:[],
  providers:[],
  template: require('./panelmenu.component.html'),
  styles: [require('./panelmenu.component.css')]
})
export class PanelmenuComponent{

    @Input() model:MenuItem[];
    @Input() style: any;
    @Input() styleClass: string;
    activeItems: MenuItem[];

  constructor(){
      this.activeItems = [];
  }

    headerClick(event, item ) {
        let index = this.activeItems.indexOf(item);

        if(index == -1)
            this.activeItems.push(item);
        else
            this.activeItems.splice(index, 1);

        event.preventDefault();
    }

    isActive(item: MenuItem): boolean {
        return this.activeItems.indexOf(item) != -1;
    }
 }
