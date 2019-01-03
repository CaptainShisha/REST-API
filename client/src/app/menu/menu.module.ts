import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuListResolverService } from './menu-list/menu-list-resolver.service';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuThumbnailComponent } from './menu-thumbnail/menu-thumbnail.component';

@NgModule({
  declarations: [
    MenuListComponent,
    MenuThumbnailComponent,
  ],
  imports: [SharedModule, MenuRoutingModule, HttpClientModule],
  providers: [MenuListResolverService],
  exports: [MenuListComponent]
})
export class MenuModule {}
