import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {environment} from 'environments/environment';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class WebService {
	scope = 'user-follow-modify user-follow-read user-library-read user-library-modify user-read-private user-read-birthdate user-read-email user-top-read';
	response_type = 'token';
	token: string;
	url = environment.authorizeUrl +
		'response_type=' + this.response_type +
		'&client_id=' + environment.clientId +
		'&scope=' + this.scope +
		'&redirect_uri=' + environment.redirectUri;

	constructor(private http: Http, private route: ActivatedRoute) {
	}


	isLoggedIn() {
		return !!localStorage.getItem('token');
	}

	/**
	 * Generates the token to use spotify's api
	 */
	generateToken(): void {
		window.location.replace(this.url);
		this.route.fragment.map(fragment => fragment).subscribe(fragment => {
			const fragment1 = !!fragment ? fragment.match(/^(.*?)&/) : '';
			if (!!fragment1) {
				this.token = fragment1[1].replace('access_token=', '');
				localStorage.setItem('token', this.token);
				alert('Login successful');
			}
		});
	}

	/**
	 * This method performs a GET request to the API.
	 * @param {string} url - a partial path to the API.
	 * @return {Observable<any>}
	 */
	get(url: string): Observable<any> {
		return this.http.get(url, this.createAuthorizationHeader())
			.map((response: Response) => response.json())
			.catch(this.handleError);
	}

	/**
	 * This method performs a POST request to the APIs.
	 * @param {string} url - a partial path to the API.
	 * @param body
	 * @return {Observable<any>}
	 */
	post(url: string, body: any): Observable<any> {
		return this.http.post(url, JSON.stringify(body), this.createAuthorizationHeader())
			.map((response: Response) => response.json())
			.catch(this.handleError);
	}

	/**
	 * This method performs a PUT request to the API.
	 * @param {String} url - a partial path to the API.
	 * @param body
	 * @return {Observable<any>}
	 */
	put(url: string, body?: any): Observable<any> {
		return this.http.put(url, JSON.stringify(body), this.createAuthorizationHeader())
			.map((response: Response) => response)
			.catch(this.handleError);
	}

	/**
	 * This method performs a DELETE request to the API.
	 * @param {String} url - a partial path to the API.
	 * @param body
	 * @return {Observable<any>}
	 */
	delete(url: string, body?: any): Observable<any> {
		return this.http.delete(url, this.createAuthorizationHeader(body))
			.map((response: Response) => response)
			.catch(this.handleError);
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
		const headers: Headers = new Headers({'Content-Type': 'application/json'});
		const token: any = this.getCurrentUser();
		if (token) {
			headers.append('Authorization', 'Bearer ' + token);
		}
		if (body) {
			console.log(headers);
			return new RequestOptions({
				headers: headers,
				body: body
			});
		}
		return new RequestOptions({headers: headers});
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
