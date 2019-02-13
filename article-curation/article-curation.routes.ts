import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PERMISSIONS } from './../roles/permissions/permission.config';
import { RoleGuard } from '../../core/guards/role.guard';

import { AddAricleFromFeedComponent } from './add-article-from-feed/add-article-from-feed.component';
import { ArticleCurationListComponent } from './article-curation-list/article-curation-list.component';

const permissions = PERMISSIONS;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: ArticleCurationListComponent,
    data: { permission: permissions.aggregator.viewAllFeeds },
    canActivate: [RoleGuard]
  },
  {
    path: 'add-article-from-feed/:rssFeedId',
    pathMatch: 'full',
    component: AddAricleFromFeedComponent,
    data: { permission: permissions.articles.addFromFeed },
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCurationRoutingModule {}

export const routedComponents = [
  ArticleCurationListComponent,
  AddAricleFromFeedComponent
];
