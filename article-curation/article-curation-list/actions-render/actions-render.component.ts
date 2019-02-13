import { ArticleCurationActions } from './../article-curation-list-table.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-actions-render',
  templateUrl: 'actions-render.component.html',
  styleUrls: ['actions-render.component.scss']
})

export class ActionsRenderComponent implements OnInit {
  public feedId: number;
  @Input() value: ArticleCurationActions;

  constructor() { }

  ngOnInit() {
    this.feedId = this.value.feedId;
  }
}
