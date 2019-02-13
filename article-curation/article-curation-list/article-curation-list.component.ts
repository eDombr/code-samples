import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as _ from 'lodash';

import { BaseClass } from './../../../shared/base/base.class';
import { PERMISSIONS } from './../../roles/permissions/permission.config';

import { LocalDataSource } from 'ng2-smart-table';
import { TableSettings } from './../../../shared/table/table-settings';
import { ArticleCurationListTableModel } from './article-curation-list-table.model';
import { RSSFeed } from './../../../core/interfaces/rss-feed.interface';

import { PermissionService } from './../../../core/services/permission.service';
import { RSSFeedService } from '../../../core/services/rss-feed.service';

import { FeedImageRenderComponent } from './feed-image-render/feed-image-render.component';
import { ActionsRenderComponent } from './actions-render/actions-render.component';
import { FeedExtractionRenderComponent } from './feed-extraction-render/feed-extraction-render.component';
import { FeedInfoRenderComponent } from './feed-info-render/feed-info-render.component';

@Component({
  selector: 'ngx-article-curation-list',
  templateUrl: './article-curation-list.component.html',
  styleUrls: ['./article-curation-list.component.scss']
})
export class ArticleCurationListComponent extends BaseClass implements OnInit {
  public settings: TableSettings<ArticleCurationListTableModel>;
  public source: LocalDataSource;
  public permissions = PERMISSIONS;
  private selected: ArticleCurationListTableModel[] = [];

  constructor(private rssFeedService: RSSFeedService,
              private permissionService: PermissionService) {
    super();
  }

  ngOnInit(): void {
    this.loadRSSFeeds();

    this.settings = {
      mode: 'external',
      selectMode: this.permissionService.checkPermission(this.permissions.aggregator.bulkDeleteFeedItem) ?
      'multi' : null,
      columns: {
        assets: {
          title: 'Thumbnail',
          filter: false,
          type: 'custom',
          renderComponent: FeedImageRenderComponent
        },
        info: {
          title: 'Feed Info',
          filter: false,
          type: 'custom',
          renderComponent: FeedInfoRenderComponent
        },
        feedExtraction: {
          title: 'Feed Extraction',
          filter: false,
          type: 'custom',
          renderComponent: FeedExtractionRenderComponent
        },
        categories: {
          title: 'Tags',
          filter: false,
          valuePrepareFunction: (cell, row) => _.map(row.categories, (c: any) => c.name)
        },
        createdAt: {
          title: 'Creation Info',
          filter: false,
          valuePrepareFunction: (cell, row) => `Created On - ${row.createdAt}`
        }
      },
      edit: {
          editButtonContent: '<i class=\'nb-edit\'></i>',
          saveButtonContent: '',
          cancelButtonContent: '',
      },
      actions: {
        columnTitle: 'Action',
        add: false,
        edit: false,
        delete: this.permissionService.checkPermission(this.permissions.aggregator.deleteFeedItem)
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
      },
    };

    if (this.permissionService.checkPermission(this.permissions.articles.addFromFeed)) {
      this.settings.columns.actions = {
        title: 'Additional Actions',
        filter: false,
        type: 'custom',
        renderComponent: ActionsRenderComponent
      }
    }
  }

  public bulkDelete(): void {
    if (!this.selected.length) {
      return;
    }

    const ids = _.map(this.selected, s => s.id);
    const sub = this.rssFeedService.bulkDelete(ids)
      .subscribe(() => {
        _.forEach(this.selected, s => {
          this.source.remove(s);
        });

        this.selected = [];
      });
    this.subscribe(sub);
  }

  public selectFeeds(event: any): void {
    this.selected = event.selected;
  }

  private loadRSSFeeds(): void {
    const sub = this.rssFeedService.get()
      .pipe(
        tap((rssFeeds: RSSFeed[]) => rssFeeds.sort(this.sortFeedsByAssetsLength))
      )
      .map((rssFeeds: RSSFeed[]) => _.map(rssFeeds, feed => new ArticleCurationListTableModel(feed)))
      .subscribe((rssFeeds: ArticleCurationListTableModel[]) => this.source = new LocalDataSource(rssFeeds));
    this.subscribe(sub);
  }

  private sortFeedsByAssetsLength(a: RSSFeed, b: RSSFeed): number {
    return b.assets.length - a.assets.length;
  }

  public handleArticleDelete(event): void {
    const id = event.data.id;

    const sub = this.rssFeedService.delete(id)
      .subscribe(() => {
        this.source.remove(event.data);
      });
    this.subscribe(sub);
  }
}
