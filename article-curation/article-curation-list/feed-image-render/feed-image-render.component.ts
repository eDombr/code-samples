import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-feed-image-render',
  templateUrl: './feed-image-render.component.html',
  styleUrls: ['./feed-image-render.component.scss']
})
export class FeedImageRenderComponent implements OnInit {
  constructor() { }

  @Input() value: any[];
  public imageUrl: string;

  ngOnInit(): void {
    this.imageUrl = this.value.length ? this.value[0].url : null;
  }
}
