import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheEnum } from './cache.enum';
import { CacheInterface } from './cache.interface';

@Injectable()
export class CacheService
{
	protected store : Map<string, CacheInterface> = new Map();

	public get<T>(request : HttpRequest<T>) : Observable<HttpResponse<T>>
	{
		const cache : CacheInterface = this.store.get(request.urlWithParams);

		return cache && this.isValid(cache.expiration) ? cache.response : null;
	}

	public set<T>(request : HttpRequest<T>, response : Observable<HttpResponse<T>>) : this
	{
		this.store.set(request.urlWithParams,
		{
			expiration: this.getExpiration<T>(request),
			response
		});
		return this;
	}

	public clear(urlWithParams : string) : this
	{
		this.store.delete(urlWithParams);
		return this;
	}

	public clearMany(baseUrl : string) : this
	{
		this.store.forEach((value, urlWithParams) => urlWithParams.startsWith(baseUrl) ? this.clear(urlWithParams) : null);
		return this;
	}

	public clearAll() : this
	{
		this.store.forEach((value, urlWithParams) => this.clear(urlWithParams));
		return this;
	}

	public clearOnExpiration<T>(request : HttpRequest<T>) : this
	{
		setTimeout(() => this.clear(request.urlWithParams), this.getExpiration(request) - Date.now());
		return this;
	}

	protected isValid(expiration : number) : boolean
	{
		return expiration > Date.now();
	}

	protected getExpiration<T>(request : HttpRequest<T>) : number
	{
		return parseFloat(request.headers.get(CacheEnum.expiration));
	}
}
