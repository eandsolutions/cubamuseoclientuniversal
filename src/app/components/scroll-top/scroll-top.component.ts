import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/common";
@Component({
    selector: 'app-scroll-top',
    templateUrl: './scroll-top.component.html',
    styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit {
    windowScrolled: boolean;

    @HostListener('window:scroll')
    onScrollHost(e: Event) {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }

    scrollToTop() {

        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            document.scrollingElement.scrollTop = 0;
            
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
                let body = document.body;
                body.scrollTop = 0;
            }
        })();
    }

    example() {
        console.log('asd')
        window.scrollTo(0, 0)
    }

    constructor() { }
    ngOnInit() {
        window.addEventListener('scroll', this.scroll, true)
    }

    scroll = (event: any): void => {
        console.log('asd')
        this.onScrollHost(event)
    }
}
