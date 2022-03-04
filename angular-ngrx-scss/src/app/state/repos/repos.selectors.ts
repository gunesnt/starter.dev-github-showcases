import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TopReposState } from './repos.state';

export const reposFeatureKey = 'repos';
export const selectReposState =
  createFeatureSelector<TopReposState>(reposFeatureKey);
