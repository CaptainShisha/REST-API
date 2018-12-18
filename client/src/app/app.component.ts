import { Component, OnInit } from '@angular/core';
import snowflakes from 'snowflakes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    snowflakes.init();
  }

}
