import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VariablesCommunesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello VariablesCommunesProvider Provider');
  }

}
