import {Component, Input } from '@angular/core';
import {EliService, GroupModel } from "./eli.service";
import {ThemeComponent} from "./theme.component";
import {ActivatedRoute } from '@angular/router';

@Component({
    selector: 'group-comp',
    directives:[ThemeComponent],
    pipes:[],
    providers:[],
    template: `
    <div *ngFor="let WG of WlastPs let i=index" >
        <div id="g1">Group {{WG.id}} - {{WG.title}}</div>
        <div class="g2 row">
            <p class="col-xs-9">{{WG.desc}}</p>
            <button class="btn btn-sm pull-right" (click)="mmm.newIdMeth(WG.id)"
                *ngIf=" _eli.getUser()"> Nova tema</button>
        </div>
       <theme-comp [wthemes]="WG.the" #mmm></theme-comp>
    </div>
   `,
    styles:[`
        #g1{
            background-color: #335780;
            color: #fafafa;
            font-family: verdana, arial, helvetica, sans-serif;
            font-size: 9.6pt;
            padding: 5px;}
        .g2{padding:5px}
        button {
          cursor: pointer;
          color:black;
          font-weight: 600;
          margin:0 15px;
          padding:2px 10px;
        }
    `]
    //styles: [require('./group.component.css')]
})
export class LastComponent{
    private sub:any;
    i:string;
    WlastPs:GroupModel[]=[];
    constructor(private _eli:EliService, private _acRou: ActivatedRoute){
    };
    ngOnInit(){
       this.sub = this._acRou.params.subscribe(par=>{
            let q = par['dat'];
            let d2 = Date.now();
            let d3 = new Date(d2 - q*3600000);
            let x = d3.toJSON();
            this._eli.getNewP(x)
                .subscribe(data=>{
                    this.WlastPs = data.news;
            },
            err=> console.log(err))
       })
    };
    ngOnDestroy() {
        this.sub.unsubscribe();
    };
}
