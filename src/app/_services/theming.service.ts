import { ApplicationRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemingService {

    private theme: string;

    constructor(private themeService: NbThemeService) {}

    _detectPrefersColorScheme() {
        // Detect if prefers-color-scheme is supported
         if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
             // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise set to light.
             this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
        } else {
             // If the browser doesn't support prefers-color-scheme, set it as default to light
            this.theme = 'default';
        }
    }

    _setColorScheme(theme) {
        this.theme = theme;
        // Save prefers-color-scheme to localStorage
        localStorage.setItem('prefers-color', theme);
    }

    _getColorScheme() {
        // Check if any prefers-color-scheme is stored in localStorage
        if (localStorage.getItem('prefers-color')) {
            // Save prefers-color-scheme from localStorage
            this.theme = localStorage.getItem('prefers-color');
        } else {
            // If no prefers-color-scheme is stored in localStorage, try to detect OS default prefers-color-scheme
            this._detectPrefersColorScheme();
        }
    }

    load() {
        this._getColorScheme();
        this.themeService.changeTheme(this.theme);
    }

    update(theme) {
        this._setColorScheme(theme);
        this.themeService.changeTheme(theme);
    }

    currentActive() {
        return this.theme;
    }

}