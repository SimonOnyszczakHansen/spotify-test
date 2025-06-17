import { Directive, ElementRef, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private hasBeenInView = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !this.hasBeenInView) {
            this.ngZone.run(() => {
              this.el.nativeElement.classList.add('in-view');
              this.hasBeenInView = true;
              this.disconnectObserver();
            });
          }
        },
        { 
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      );
      
      setTimeout(() => {
        if (this.observer) {
          this.observer.observe(this.el.nativeElement);
        }
      }, 50);
    });
  }

  private disconnectObserver() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  ngOnDestroy() {
    this.disconnectObserver();
  }
}