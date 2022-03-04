import { Action, createReducer, on } from '@ngrx/store';
import * as ReposActions from './repos.actions';
import { TopReposState } from './repos.state';

export const initialState: TopReposState = {};

const reducer = createReducer(
  initialState,

  on(ReposActions.getRepos, (state) => state),
);

export function userReducer(state: TopReposState | undefined, action: Action) {
  return reducer(state, action);
}
