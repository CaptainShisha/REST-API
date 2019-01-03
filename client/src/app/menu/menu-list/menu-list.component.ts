import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  public menuItems = [];

  public constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const data = this.route.snapshot.data['menu'];
    this.extractmenuItems(data);
  }

  /*
  public getmenu(search: string): void {
    this.http
      .get(
        'http://localhost:3000/menu'
      )
      .subscribe();
  }
|*/

  private extractmenuItems(data: any): void {
    this.menuItems = data;
  }
}
