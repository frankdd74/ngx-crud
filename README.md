NGX CRUD
========

> CRUD services in Angular with effortless aborting, caching and observing.

[![Build Status](https://img.shields.io/github/workflow/status/henryruhs/ngx-crud/ci.svg)](https://github.com/henryruhs/ngx-crud/actions?query=workflow:ci)
[![Coverage Status](https://coveralls.io/repos/github/henryruhs/ngx-crud/badge.svg)](https://coveralls.io/github/henryruhs/ngx-crud)
[![NPM Version](https://img.shields.io/npm/v/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)
[![License](https://img.shields.io/npm/l/ngx-crud.svg)](https://npmjs.com/package/ngx-crud)


Installation
------------

```
npm install ngx-crud
```


Setup
-----

Import the `CrudModule` and `HttpClientModule` inside your `AppModule`:

```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CrudModule } from 'ngx-crud';

@NgModule(
{
	imports:
	[
		CrudModule,
		HttpClientModule
	]
})
export class AppModule
{
}
```


Usage
-----

Extend the `ExampleService` from the `CrudService`:

```typescript
import { Injectable } from '@angular/core';
import { CrudService } from 'ngx-crud';
import { RequestBody, ResponseBody } from './example.interface';

import { environment } from '@environments';

@Injectable()
export class ExampleService extends CrudService<RequestBody, ResponseBody>
{
	protected apiUrl : string = environment.apiUrl;
	protected apiRoute : string = environment.apiRoutes.example;
}
```

Use the HTTP operations as needed:

```typescript
exampleService.create(body, options);
exampleService.read(id, options);
exampleService.find(options);
exampleService.update(id, body, options);
exampleService.patch(id, body, options);
exampleService.delete(id, options);
exampleService.custom(method, options);
```


Documentation
-------------

Read the [documenation](https://henryruhs.gitbook.io/ngx-crud) for a deep dive.
