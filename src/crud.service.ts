import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonService } from './common.service';
import { DeleteService } from './delete.service';
import { GetService } from './get.service';
import { PostService } from './post.service';
import { PutService } from './put.service';
import { PatchService } from './patch.service';
import { OptionsInterface } from './option.interface';

@Injectable()
export class CrudService<T> extends CommonService
{
	constructor
	(
		protected deleteService : DeleteService<T>,
		protected getService : GetService<T>,
		protected postService : PostService<T>,
		protected putService : PutService<T>,
		protected patchService : PatchService<T>
	)
	{
		super();
		this.clear();
	}

	create(body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.postService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.setOptions((this.options))
			.post(body, options);
	}

	read(id : number | string, options? : OptionsInterface) : Observable<T>
	{
		return this.getService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.setOptions((this.options))
			.get(id, options);
	}

	find(options? : OptionsInterface) : Observable<T[]>
	{
		return this.getService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.setOptions((this.options))
			.find(options);
	}

	update(id : number | string, body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.putService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.setOptions((this.options))
			.put(id, body, options);
	}

	patch(id : number | string, body : any, options? : OptionsInterface) : Observable<T>
	{
		return this.patchService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.setOptions((this.options))
			.patch(id, body, options);
	}

	delete(id : number | string, options? : OptionsInterface) : Observable<T>
	{
		return this.deleteService
			.setApiUrl(this.apiUrl)
			.setEndpoint(this.endpoint)
			.setOptions((this.options))
			.delete(id, options);
	}
}
