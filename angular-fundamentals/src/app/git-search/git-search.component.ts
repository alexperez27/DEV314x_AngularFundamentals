import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { GitUsers } from '../git-users';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;

  constructor(private GitSearchService: GitSearchService) { }

  ngOnInit() {
    this.GitSearchService.gitSearch('angular js').then( (response) => {
      this.searchResults = <GitSearch> response;
      alert('Total Libraries Found:' + (<GitSearch> response).total_count);
    }, (error) => {
      alert('Error Libraries: ' + error.statusText);
    });

    this.GitSearchService.gitUserSearch('tom').then( (response) => {
      alert('Total Users Found:' + (<GitUsers> response).total_count);
    }, (error) => {
      alert('Error Users: ' + error.statusText);
    });
  }

  gitSearch = (query: string) => {
    this.GitSearchService.gitSearch(query).then( (response) => {
      this.searchResults = <GitSearch> response;
      alert('Total Libraries Found:' + (<GitSearch> response).total_count);
    }, (error) => {
      alert('Error Libraries: ' + error.statusText);
    });
  }
}
