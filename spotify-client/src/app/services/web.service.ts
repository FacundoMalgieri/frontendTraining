import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { environment } from "environments/environment";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class WebService {
    constructor(
        private http: Http,
        private router: Router,
        private route: ActivatedRoute) { }

    scope = 'user-follow-modify user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate user-read-email user-top-read';
    clientId: string = 'b6eef19106214c13bd0c2811ea88f407';
    clientSecret: string = '0166b8230f6b4ed9af333454da5b0c9d'; //not necessary
    redirectUri: string = 'http://localhost:4200/explorar'
    response_type = 'token'
    token: string
    url = 'https://accounts.spotify.com/authorize?' +
    'response_type=' + this.response_type +
    '&client_id=' + this.clientId +
    '&scope=' + this.scope +
    '&redirect_uri=' + this.redirectUri;

    generateToken(): void {
        window.location.href = this.url
        let tokenRoute = this.route.fragment.map(fragment => fragment);
        tokenRoute.subscribe(fragment => {
            let fragment1 = !!fragment ? fragment.match(/^(.*?)&/) : '';
            if (!!fragment1) {
                this.token = fragment1[1].replace('access_token=', '');
                localStorage.setItem('token', this.token)
            }
        })
    }
    
    /**
     * This method is used to get the current user's from 
     * the local storage JSON value parsed as an object.
     * @return {Object} unnamed - the user object with your data.
     */
    private getCurrentUser(): Object {
        return localStorage.getItem('token');
    }

    /**
     * This method creates headers and adds them into options, for further requests.
     * @param {Any} body - the body of the request.
     * @return {RequestOptions}
     */
    private createAuthorizationHeader(body?: any) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        let token: any = this.getCurrentUser();

        if (token)
            headers.append('Authorization', 'Bearer ' + token)
        if (body) {
        console.log(headers)
            return new RequestOptions({
                headers: headers,
                body: body
            });
        }

        return new RequestOptions({ headers: headers });
    }

    /**
     * This method performs a GET request to the API.
     * @param {String} url - a partial path to the API.
     * @return {Observable<any>}
     */
    get(url: string): Observable<any> {
        return this.http.get(url, this.createAuthorizationHeader())
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /**
     * This method performs a POST request to the APIs.
     * @param {String} url - a partial path to the API.
     * @return {Observable<any>}
     */
    post(url: string, body: any): Observable<any> {
        return this.http.post(environment.baseUrl + url, JSON.stringify(body), this.createAuthorizationHeader())
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /**
     * This method performs a PUT request to the API.
     * @param {String} url - a partial path to the API.
     * @return {Observable<any>}
     */
    put(url: string, body: any): Observable<any> {
        return this.http.put(environment.baseUrl + url, JSON.stringify(body), this.createAuthorizationHeader())
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /**
     * This method performs a DELETE request to the API.
     * @param {String} url - a partial path to the API.
     * @return {Observable<any>}
     */
    delete(url: string, body: any): Observable<any> {
        return this.http.delete(environment.baseUrl + url, this.createAuthorizationHeader(body))
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    /**
     * This method throws the error status text.
     * @param {Response} error - the response containing the error.
     * @return {Observable<any>}
     */
    private handleError(error: Response): ErrorObservable {
        return Observable.throw(error);
    }
}
