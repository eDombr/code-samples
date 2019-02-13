import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-feed-extraction-render',
  templateUrl: 'feed-extraction-render.component.html',
  styleUrls: ['feed-extraction-render.component.scss']
})

export class FeedExtractionRenderComponent implements OnInit {
  @Input() value: any;

  public metaTitle: string;
  public metaDescr: string;
  public feedUrl: string;

  constructor() { }

  ngOnInit() {
    [this.metaTitle, this.metaDescr, this.feedUrl] = [this.value.metaTitle, this.value.metaDescr, this.value.feedUrl];
  }
}
