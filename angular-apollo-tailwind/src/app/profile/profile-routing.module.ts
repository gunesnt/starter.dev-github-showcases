import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfileReposListComponent } from './profile-repos-list/profile-repos-list.component';
import { ProfileComponent } from './profile.component';

const routes: Route[] = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileReposListComponent,
      },
      {
        path: 'repositories',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
