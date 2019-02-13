import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ArticleCurationRoutingModule, routedComponents } from './article-curation.routes';

import { ActionsRenderComponent } from './article-curation-list/actions-render/actions-render.component';
import { FeedExtractionRenderComponent } from './article-curation-list/feed-extraction-render/feed-extraction-render.component';
import { FeedImageRenderComponent } from './article-curation-list/feed-image-render/feed-image-render.component';
import { FeedInfoRenderComponent } from './article-curation-list/feed-info-render/feed-info-render.component';

const entryComponents = [
  FeedImageRenderComponent,
  FeedInfoRenderComponent,
  FeedExtractionRenderComponent,
  ActionsRenderComponent
];

@NgModule({
  imports: [
    SharedModule,
    ArticleCurationRoutingModule,
  ],
  declarations: [
    routedComponents,
    ...entryComponents,
  ],
  entryComponents: [
    ...entryComponents
  ]
})
export class ArticleCurationModule {}
