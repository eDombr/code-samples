import { RSSFeedInfo } from './../article-curation-list-table.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-feed-info-render',
  templateUrl: 'feed-info-render.component.html',
  styleUrls: ['feed-info-render.component.scss']
})

export class FeedInfoRenderComponent implements OnInit {
  @Input() value: RSSFeedInfo;

  public title: string;
  public description: string;
  public link: string;

  constructor() { }

  ngOnInit() {
    [this.title, this.description, this.link] = [this.value.title, this.value.description, this.value.link];
  }
}
