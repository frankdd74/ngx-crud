import { HttpContextToken, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Optional, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Context, ObserveAfterEffect, ObserveBeforeEffect } from './observe.interface';
import { State } from './observe.type';
import { OBSERVE_EFFECT } from './observe.token';

@Injectable()
export class ObserveService
{
	protected defaultContext : Context =
	{
		method: null,
		lifetime: null
	};
	protected token : HttpContextToken<Context> = new HttpContextToken<Context>(() => this.defaultContext);
	protected state : Subject<State> = new Subject<State>();
	protected timeout : NodeJS.Timeout;

	constructor(@Optional() @Inject(OBSERVE_EFFECT) protected observeEffect : ObserveBeforeEffect & ObserveAfterEffect)
	{
	}

	/**
	 * get the token of the context
	 *
	 * @since 6.0.0
	 *
	 * @return {HttpContextToken<Context>} token of the context
	 */

	public getToken() : HttpContextToken<Context>
	{
		return this.token;
	}

	/**
	 * start to observe the request
	 *
	 * @since 8.0.0
	 *
	 * @return {this} instance of the service
	 */

	public start() : this
	{
		this.state.next('STARTED');
		return this;
	}

	/**
	 * before hook for the effect service
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {HttpRequest<T>} instance of the http request
	 */

	public before<T>(request : HttpRequest<T>) : HttpRequest<T>
	{
		if (typeof this.observeEffect?.before === 'function')
		{
			return this.observeEffect.before(request);
		}
		return request;
	}

	/**
	 * after hook for the effect service
	 *
	 * @since 8.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 * @param {HttpResponse<T> | HttpErrorResponse} response instance of the http response
	 *
	 * @return {this} instance of the service
	 */

	public after<T>(request : HttpRequest<T>, response : HttpResponse<T> | HttpErrorResponse) : this
	{
		if (typeof this.observeEffect?.after === 'function')
		{
			this.observeEffect.after(request, response);
		}
		return this;
	}

	/**
	 * end to observe the request
	 *
	 * @since 5.0.0
	 *
	 * @param {HttpRequest<T>} request instance of the http request
	 *
	 * @return {this} instance of the service
	 */

	public end<T>(request : HttpRequest<T>) : this
	{
		const context : Context = request.context.get(this.getToken());

		clearTimeout(this.timeout);
		this.timeout = context.lifetime > 0 ? setTimeout(() => this.completeAll(), context.lifetime) : null;
		return this;
	}

	/**
	 * complete to observe for enabled services
	 *
	 * @since 8.0.0
	 *
	 * @return {this} instance of the service
	 */

	public completeAll() : this
	{
		this.state.next('COMPLETED');
		return this;
	}

	/**
	 * observe all requests for enabled services
	 *
	 * @since 8.0.0
	 *
	 * @return {Subject<State>} state of all requests
	 */

	public observeAll() : Subject<State>
	{
		return this.state;
	}
}
