import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './api/service/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { TagsComponent } from './pages/tags/tags.component';
import { TravelsComponent } from './pages/travels/travels.component';

const routes: Routes = [
    {
        path: 'travels',
        component: TravelsComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'tags',
        component: TagsComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'auth',
        component: AuthComponent,
    }, {
        path: '**',
        redirectTo: '/travels',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
