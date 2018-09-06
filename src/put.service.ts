import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { OptionInterface } from './option.interface';

@Injectable()
export class PutService<T> extends CommonService
{
	put(id : number | string, body : any, options? : OptionInterface) : Observable<T>
	{
		return this.http.put<T>(this.createURL(this.apiUrl, this.endpoint, id), body,
		{
			...this.options,
			...options
		});
	}
}
