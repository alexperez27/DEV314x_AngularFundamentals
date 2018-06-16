import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedSearches: Array<{
    [query: string]: GitSearch
  }> = [];
  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];
  cachedValueObservable: string;
  search: Observable<GitSearch>;

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  gitSearchObservable: Function = (query: string): Observable<GitSearch> => {
    this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query)
        // .publishReplay(1)
        // .refCount()
        ;
    this.cachedValueObservable = query;
    return this.search;
  }

  gitSearch = (query: string, page: number) => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
      if (this.cachedSearches[query]) {
            resolve(this.cachedSearches[query]);
        } else {
          this.http.get('https://api.github.com/search/repositories?q=' + query + '&page=' + page + '&per_page=5')
          .toPromise()
          .then( (response) => {
            resolve(response as GitSearch);
          }, (error) => {
            reject(error);
          });
        }
    });
    return promise;
  }

  gitUserSearch = (query: string) => {
    let promise = new Promise((resolve, reject) => {
      if (this.cachedUsers[query]) {
            resolve(this.cachedUsers[query]);
        } else {
          this.http.get('https://api.github.com/search/users?q=' + query)
          .toPromise()
          .then( (response) => {
            resolve(response as GitSearch)
          }, (error) => {
            reject(error);
          });
        }
    });
    return promise;
  }

}
