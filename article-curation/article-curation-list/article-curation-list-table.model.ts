import { RSSFeed, RSSFeedCategory, RSSFeedAsset } from './../../../core/interfaces/rss-feed.interface';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

export class ArticleCurationListTableModel {
  public id: number;
  public info: RSSFeedInfo;
  public feedExtraction: any;
  public categories: RSSFeedCategory[];
  public assets: RSSFeedAsset[];
  public createdAt: string;
  public actions: ArticleCurationActions;

  public constructor(rssFeed: RSSFeed) {
    _.assign(
      this,
      _.pick(rssFeed, ['id', 'categories', 'assets']),
      {
        info: _.pick(rssFeed, ['title', 'description', 'link']),
        feedExtraction: _.pick(rssFeed, ['metaTitle', 'metaDescr', 'feedUrl']),
        createdAt: this.toDateView(rssFeed.createdAt),
        actions: {
          feedId: rssFeed.id
        }
      }
    );
  }

  private toDateView(date: string) {
    let datePipe = new DatePipe('en-US');
    let raw = new Date(date);

    return datePipe.transform(raw, 'dd MMM yyyy; hh:mm a');
  }

}

export interface ArticleCurationActions {
  feedId: number;
}

export interface RSSFeedInfo {
  title: string;
  description: string;
  link: string;
}
