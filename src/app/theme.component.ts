import { Component, Input } from '@angular/core';
import {EliService, ThemeModel} from "./eli.service";
import {PostComponent} from "./post.component";
import {Panel, Editor, Header} from 'primeng/primeng';


@Component({
  selector: 'theme-comp',
  directives:[PostComponent, Panel, Editor, Header],
  pipes:[],
  providers:[],
  template: `
      <p-panel header="Nova tema" [style]="{'padding':'10px'}"
          *ngIf=" newId ">
        <div >
          <input type="text" [(ngModel)]="text0">
          <button class="btn btn-sm pull-right" (click)="addThMeth(newId)">Potvrdi temu</button>
        </div>
      </p-panel>

    <div *ngFor="let wt of wthemes let i=index" >
      <div class="cat">{{i+1}}. {{wt.title}} - themeId:{{wt.id}}
        <button class="btn btn-sm pull-right" (click)="activateIdMeth(wt.id)" >Vidi</button>
        <button class="btn btn-sm pull-right" (click)="nnn.newIdMeth(wt.id)"
            *ngIf="wt.id == activId && _eli.getUser()" >Dodaj post</button>
        <span class="label label-default pull-right">{{wt.rewievs}}</span>
      </div>

      <post-comp [i]="wt.id" [ip]="wt.post" [g]="wt.groupId" [hidden]="wt.id != activId" #nnn ></post-comp>
    </div>
   `,
  styles: [`
    .cat {
      background-color: #96aeca;
      color: #111111;
      font-weight: bold;
      padding: 5px;
      border-bottom: 1px solid #ddd;
    }
    button {
      cursor: pointer;
      font-weight: 600;
      margin-left: 5px;
      padding:2px 10px;
    }
    .label {
      padding: .6em .5em;
    }
    p-panel input{
      width: 300px;
    }
  `]
})
export class ThemeComponent{
  activId:number;
  newId:number;
  @Input() wthemes:ThemeModel[];
  text1:string;
  text0:string;

  constructor(private _eli:EliService){
    this.activId = -1;
    this.newId = 0;
  }

  ngOnInit(){
        //this._eli.getOneTh(this.i).subscribe(data=>{this.WThemes = data; console.log(this.WThemes);}, err=> console.log(err))
  }

  activateIdMeth(i){
    this.activId = (i==this.activId) ? -1 : i;
  }
  newIdMeth(i){
    console.log(i);
    this.newId = (i == this.newId) ? 0 : i;
  }
  addThMeth(gr){
    let w = { "groupId":gr, "title":this.text0};
    console.log(w);
    this._eli.addTh(w).subscribe(
        data=> {
          console.log(data);
          this.wthemes.push(data);
          this.activId = data.id;
          this.newId = 0;
        });

  }
 }