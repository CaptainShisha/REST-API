import { MenuListComponent } from './menu-list/menu-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuListResolverService } from './menu-list/menu-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MenuListComponent,
    resolve: { menu: MenuListResolverService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {}
