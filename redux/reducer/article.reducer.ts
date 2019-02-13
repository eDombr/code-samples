import { ArticleDto } from './../../admin/articles/dto/article.dto';
import { ArticleActions } from './../action/article.action';
import { ArticleComment } from './../../core/interfaces/article-comment.interface';
import { Action } from './../../core/interfaces/action.interface';
import { Reducer } from 'redux';
import * as _ from 'lodash';

export interface ArticleState {
  comments: ArticleComment[];
  articles: ArticleDto[];
}

export const INITIAL_ARTICLE_STATE: ArticleState = {
  comments: [],
  articles: []
}

export const ArticleReducer: Reducer<ArticleState> = (state = INITIAL_ARTICLE_STATE, action: Action): ArticleState => {
  switch (action.type) {
    case ArticleActions.SET_ARTICLES: {
      const articles: ArticleDto[] = action.payload.articles;

      if (articles.length) {
        return _.assign({}, state, { articles });
      } else {
        return state;
      }
    }

    case ArticleActions.ADD_ARTICLES: {
      const articles: ArticleDto[] = _.concat(action.payload.articles, state.articles);

      if (articles.length) {
        return _.assign({}, state, { articles });
      } else {
        return state;
      }
    }

    case ArticleActions.EDIT_ARTICLE: {
      const article: ArticleDto = action.payload.article;
      const articles = _.cloneDeep(state.articles);

      if (article) {
        const index = _.findIndex(articles, ['id', article.id]);
        articles[index] = article;

        return _.assign({}, state, { articles });
      } else {
        return state;
      }
    }

    case ArticleActions.SET_COMMENTS: {
      const comments: ArticleComment[] = action.payload.comments;

      if (comments.length) {
        return _.assign({}, state, { comments });
      } else {
        return state;
      }
    }

    case ArticleActions.ADD_COMMENTS: {
      const comments: ArticleComment[] = _.concat(state.comments, action.payload.comments);
      if (comments.length) {
        return _.assign({}, state, { comments });
      } else {
        return state;
      }
    }

    case ArticleActions.REMOVE_COMMENT: {
      const commentId: number = action.payload.commentId;

      const comments = _.cloneDeep(state.comments);

      _.remove(comments, ['id', commentId]);

      if (comments.length) {
        return _.assign({}, state, { comments });
      } else {
        return state;
      }
    }

    case ArticleActions.EDIT_COMMENT: {
      const comment: ArticleComment = action.payload.comment;
      const comments = _.cloneDeep(state.comments);

      if (comment) {
        const index = _.findIndex(comments, ['id', comment.id]);
        comments[index] = comment;

        return _.assign({}, state, { comments });
      } else {
        return state;
      }
    }
  }
  return state;
};