import { Component, Input } from '@angular/core';
import {EliService, PostModel} from "./eli.service";
import {Panel, Editor, Header} from 'primeng/primeng';

@Component({
  selector: 'post-comp',
  directives:[Panel, Editor, Header],
  pipes:[],
  providers:[],
  template: `

      <p-panel header="Nova poruka" [style]="{'padding':'10px'}"
          *ngIf="newId">
          <div class="row">
        <div class="col-md-2">
            <button class="btn btn-sm"> File </button>
        </div>
        <div class="col-md-10">
          <p-editor [(ngModel)]="text0" [style]="{'height':'250px'}"></p-editor>

        </div>
        <button class="btn btn-sm pull-right" (click)="addPoMeth()">Posalji poruku</button>
        </div>
      </p-panel>

    <div *ngFor="let wt of WPosts let i=index" class="po">
      <div class="row">
        <div class="col-sm-2 text-center">
            <p class="text-center po1">{{wt.user.username}}</p>
            <p class="text-center">{{wt.user.status}}</p>
            <p>{{wt.user.email}}</p>
        </div>
        <div class="col-sm-10 po2">
        <button class="btn btn-sm pull-left" (click)="answerIdMeth(wt)"
            *ngIf=" _eli.getUser().id == wt.user.id" > Ispravi </button>
            <p class="text-right"><strong>DatCre: </strong>{{wt.datCre|date:"dd.MMM yyyy u hh:mm"}}</p>
             <div [innerHTML]="wt.body"></div>
            <p *ngIf="wt.datMod" class="text-right"><strong>DatMod: </strong>{{wt.datMod|date:"dd.MMM yyyy u hh:mm"}}</p>
        </div>
      </div>

      <p-panel header="Edit poruke" [style]="{'padding':'10px'}"
          *ngIf="wt.id == editId">
          <div class="row">
        <div class="col-md-2">
            <button class="btn btn-sm"> File </button>
        </div>
        <div class="col-md-10">
          <p-editor [(ngModel)]="text1" [style]="{'height':'250px'}"></p-editor>

        </div>
        <button class="btn btn-sm pull-right" (click)="putPoMeth(wt, i)">Posalji ispravku</button>
        </div>
      </p-panel>

    </div>
   `,
  styles: [`
  .po1{
      font-weight: bold;
      font-size: 11pt;}
  .po{
      background-color: #eeeef0;
      color: #000000;
      padding:4px;
      border-bottom: 1px solid silver;}
  p {
      margin: 0 0 5px;
    }
    button {
      cursor: pointer;
      font-weight: 600;
      margin-left: 5px;
      padding:2px 10px;
    }
    p-panel button{
      margin-top: 15px;
    }
  `]
})
export class PostComponent{
  @Input() i:number;
  @Input() g:number;
  @Input() ip;
  WPosts:PostModel[];
  private editId:number;
  private  newId:number;
  private  text1:string;
  private  text0:string;

  constructor(private _eli:EliService ){
      this.editId = -1;
      this.newId = 0;
  };
    ngOnInit(){
        if (this.ip==null) {
        this._eli.getOnePoTh(this.i)
            .subscribe(data=>{
              this.WPosts = data;
            }, err=> console.log(err))}
        else {this.WPosts = this.ip}
    };

    answerIdMeth(z){
        this.text1 = z.body;
        this.editId = (z.id == this.editId) ? -1 : z.id;
    };
    newIdMeth(i){
        this.newId = (i == this.newId) ? 0 : i;
    };

    addPoMeth(z){
        let w = {"themeId":this.i, "groupId":this.g, "body":this.text0};
        this._eli.addPo(w).subscribe(data=>{
            this.newId = 0;
            data.user = this._eli.getUser();
            this.WPosts.push(data)
            this.text0="";
        })
    };
    putPoMeth(z, i){
        z.body = this.text1;
        this._eli.putPo(z).subscribe(data=>{
            this.editId = -1;
            data.user = this._eli.getUser();
            this.WPosts[i] = data;
            this.text1="";
        })
    };
 }