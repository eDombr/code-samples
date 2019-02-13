import { ArticleDto } from './../../admin/articles/dto/article.dto';
import { ArticleComment } from './../../core/interfaces/article-comment.interface';
import { BaseAction } from './base.action';
import { dispatch } from '@angular-redux/store';
import { Action } from '../../core/interfaces/action.interface';

export class ArticleActions extends BaseAction {
  static readonly className: string = 'ArticleActions';
  static readonly SET_COMMENTS = ArticleActions.getActType('SET_COMMENTS');
  static readonly ADD_COMMENTS = ArticleActions.getActType('ADD_COMMENTS');
  static readonly REMOVE_COMMENT = ArticleActions.getActType('REMOVE_COMMENT');
  static readonly EDIT_COMMENT = ArticleActions.getActType('EDIT_COMMENT');
  static readonly SET_ARTICLES = ArticleActions.getActType('SET_ARTICLES');
  static readonly ADD_ARTICLES = ArticleActions.getActType('ADD_ARTICLES');
  static readonly EDIT_ARTICLE = ArticleActions.getActType('EDIT_ARTICLE');

  @dispatch()
  static setArticles(articles: ArticleDto[]): Action {
    return {
      type: ArticleActions.SET_ARTICLES,
      payload: { articles }
    };
  }

  @dispatch()
  static addArticles(articles: ArticleDto[] | ArticleDto): Action {
    return {
      type: ArticleActions.ADD_ARTICLES,
      payload: { articles }
    };
  }

  @dispatch()
  static editArticle(article: ArticleDto): Action {
    return {
      type: ArticleActions.EDIT_ARTICLE,
      payload: { article }
    }
  }

  @dispatch()
  static setComments(comments: ArticleComment[]): Action {
    return {
      type: ArticleActions.SET_COMMENTS,
      payload: { comments }
    };
  }

  @dispatch()
  static addComments(comments: ArticleComment[] | ArticleComment): Action {
    return {
      type: ArticleActions.ADD_COMMENTS,
      payload: { comments }
    };
  }

  @dispatch()
  static removeComment(commentId: number): Action {
    return {
      type: ArticleActions.REMOVE_COMMENT,
      payload: { commentId }
    }
  }

  @dispatch()
  static editComment(comment: ArticleComment): Action {
    return {
      type: ArticleActions.EDIT_COMMENT,
      payload: { comment }
    }
  }
}
