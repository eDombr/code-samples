import { ArticleState, INITIAL_ARTICLE_STATE, ArticleReducer } from './reducer/article.reducer';
import { UserReducer } from './reducer/user.reducer';
import { combineReducers } from 'redux';

export interface Store {
  article: ArticleState;
}

export const INITIAL_STATE: Store = {
  article: INITIAL_ARTICLE_STATE
}

export const StoreReducer = combineReducers<Store>({
  article: ArticleReducer
});
