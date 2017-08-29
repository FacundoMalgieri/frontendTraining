import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { environment } from "environments/environment";

@Injectable()
export class WebService {
    constructor(private http: Http) { }

    /**
     * This method is used to get the current user's from 
     * the local storage JSON value parsed as an object.
     * @return {Object} unnamed - the user object with your data.
     */
    private getCurrentUser(): Object {
        return JSON.parse(localStorage.getItem('token'));
    }

    /**
     * This method creates headers and adds them into options, for further requests.
     * @param {Any} body - the body of the request.
     * @return {RequestOptions}
     */
    private createAuthorizationHeader(body?: any) {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        let currentUser: any = this.getCurrentUser();
        
        if (currentUser && currentUser.token)
            headers.append('Authorization', 'Bearer ' + currentUser.token)

        if (body)
            return new RequestOptions({
                headers: headers,
                body: body
            });

        return new RequestOptions({ headers: headers });
    }

    /**
     * This method throws the error status text.
     * @param {Response} error - the response containing the error.
     * @return {Observable<any>}
     */
    private handleError(error: Response): ErrorObservable {
        return Observable.throw(error);
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
}
