import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Headers, Http, Response} from '@angular/http';

@Injectable()
export class GroupModel{
    constructor(
        public title:string,
        public rewievs:string,
        public groupId?:number,
        public id?:number
    ){}
}
@Injectable()
export class ThemeModel{
    constructor(
        public title:string,
        public desc:string,
        public id?:number
    ){}
}
@Injectable()
export class PostModel{
    constructor(
        public body:string,
        public themeId?:number,
        public id?:number
    ){}
}

@Injectable()
export class EliService{
    private _url="http://localhost:3000/api/";
    private atVar = "";
    headers:Headers;
    constructor(private _http:Http){
        this.headers = new Headers({"Content-Type":"application/json"});
        this.atVar = localStorage.getItem("auth_token");
    };
    isLoggedIn():boolean {
        return this.getUser() !== null;
    };
    login(uname, password) {
        return this._http
            .post(this._url+'users/login?include=user',
                    JSON.stringify({"username": uname, "password": password }),{ headers : this.headers })
            .map(res => res.json())
            .subscribe((res) => {
                if (res.id) {
                    this.atVar = res.id;
                    localStorage.setItem('auth_token', res.id);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    return true;
                }
                return false;
            });
    };
    logout(): any {
        this._http
            .post(this._url+'users/logout/?access_token='+ this.atVar,{ headers : this.headers })
            .subscribe();
            this.atVar = "";
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            return true;
    };
    getUser(): any {
        return  JSON.parse(localStorage.getItem('user') );
    };

    getOneGr(i){
        return this._http.get(this._url+'groups/'+i).map(res=>res.json())
    };
    getOneGrTh(i){
        return this._http.get(this._url+'groups/'+i+'?filter[include]=themes').map(res=>res.json())
    };
    getOnePoTh(i){
        return this._http.get(this._url+'posts?filter[where][themeId]='+i+'&filter[include]=user').map(res=>res.json())
    };
    getNewP(i){
        return this._http.get(this._url+'posts/newP/?qdatCre='+i).map(res=>res.json())
    };
    addGr(w){
        return this._http.post(this._url+'groups', JSON.stringify(w), {headers:this.headers}).map(res=>res.json())
    };
    addTh(w){
        return this._http.post(this._url+'themes?access_token='+ this.atVar,
            JSON.stringify(w), {headers:this.headers}).map(res=>res.json())
    };
    addPo(w){
        return this._http.post(this._url+'posts?access_token='+ this.atVar,
            JSON.stringify(w), {headers:this.headers}).map(res=>res.json())
    };
    putPo(w){
        return this._http.put(this._url+'posts?access_token='+ this.atVar,
            JSON.stringify(w), {headers:this.headers}).map(res=>res.json())
    };
}



