import { Injectable } from '@angular/core';
import { UnifiedSearch } from './unified-search';
import { Observable, forkJoin } from 'rxjs';
import { GitSearchService } from './git-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UnifiedSearchService {

  constructor(
    private searchService: GitSearchService,
    private codeSearchService: GitCodeSearchService) { }

    unifiedSearch: Function = (query: string): Observable<UnifiedSearch> => {
      return forkJoin(this.searchService.gitSearchObservable(query), this.codeSearchService.codeSearch(query)).subscribe( (response) => {
        return {
          'repositories' : response[0],
          'code': response[1]
        }
      });
    }
}
