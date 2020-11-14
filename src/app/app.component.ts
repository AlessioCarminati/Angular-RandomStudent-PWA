import { ThemingService } from './_services/theming.service';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private themingService: ThemingService) { }
  @HostBinding('class') public cssClass: string;

  title = 'Random student';
  lightTheme: boolean;

  ngOnInit(): void {
    this.themingService.load();
    if (this.themingService.currentActive() === 'default')
      this.lightTheme = true;
    else
      this.lightTheme = false;
  }

  toggleTheme() {
    this.lightTheme = !this.lightTheme;
    this.lightTheme ? this.themingService.update('default') : this.themingService.update('dark');
  }

}
