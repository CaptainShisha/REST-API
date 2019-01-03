import { CommonModule } from '@angular/common';
import { МodalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [МodalComponent],
  imports: [CommonModule],
  exports: [CommonModule, МodalComponent]
})
export class SharedModule {}
