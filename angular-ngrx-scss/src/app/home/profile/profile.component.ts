import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { fetchProfile } from 'src/app/state/profile/profile.actions';
import { selectProfileState } from 'src/app/state/profile/profile.selectors';
import {
  ProfileState,
  UserReposState,
} from 'src/app/state/profile/profile.state';
import { fetchUserData } from 'src/app/state/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  profile$?: Observable<ProfileState>;
  repos$?: Observable<UserReposState[]>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(fetchUserData());

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ username }) => {
        this.store.dispatch(fetchProfile({ username }));
      });

    this.profile$ = this.store.select(selectProfileState);
    this.repos$ = this.profile$.pipe(map((profile) => profile.repos ?? []));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
