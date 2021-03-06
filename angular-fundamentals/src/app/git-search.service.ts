import { Injectable } from '@angular/core';
import { GitSearch } from './git-search'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedValues: Array<{
      [query: string]: GitSearch
    }> = [];

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  gitSearch = (query: string, page: number) => {
    let promise = new Promise((resolve, reject) => {
      if (this.cachedValues[query]) {
            resolve(this.cachedValues[query]);
        } else {
          this.http.get('https://api.github.com/search/repositories?q=' + query + '&page=' + page + '&per_page=5')
          .toPromise()
          .then( (response) => {
            resolve(response as GitSearch)
          }, (error) => {
            reject(error);
          })
        }
    })
    return promise;
  }

  gitUserSearch = (query: string) => {
    let promise = new Promise((resolve, reject) => {
      if (this.cachedValues[query]) {
            resolve(this.cachedValues[query])
        }
        else {
          this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then( (response) => {
            resolve(response as GitSearch)
          }, (error) => {
            reject(error);
          })
        }
    })
    return promise;
  }

}
