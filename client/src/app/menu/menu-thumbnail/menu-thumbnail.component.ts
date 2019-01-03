import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { МodalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-thumbnail',
  templateUrl: './menu-thumbnail.component.html',
  styleUrls: ['./menu-thumbnail.component.css']
})
export class MenuThumbnailComponent {
  @Input() public item: any;
  @Input() public isHighlighted: boolean;
  @Output() public getmenuItem = new EventEmitter<any>();

  @ViewChild(МodalComponent) public modal: МodalComponent;

  public constructor(private readonly router: Router) {}

  public showmenuInfo(): void {
    this.getmenuItem.emit(this.item);
    this.modal.open();
  }

  public showmenuDetails(): void {
    this.router.navigate(['/menu', this.item]);
    this.modal.close();
  }
}
