import { ApplicationRef, Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemingService {

    theme = new BehaviorSubject("default"); // <- initial theme
    
    constructor(private ref: ApplicationRef, private themeService: NbThemeService) {
        // Initially check if dark mode is enabled on system
        const darkModeOn =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        // If dark mode is enabled then directly switch to the dark-theme
        if (darkModeOn) {
            this.themeService.changeTheme('dark');
        }

        // Watch for changes of the preference
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
            const turnOn = e.matches;
            this.themeService.changeTheme(turnOn ? "dark" : "default");

            // Trigger refresh of UI
            this.ref.tick();
        });
    }
}