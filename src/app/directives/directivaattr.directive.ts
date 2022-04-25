import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirectivaattr]'
})
export class DirectivaattrDirective {

  constructor(private el:ElementRef) {
   }

   cambiar(color: string){
    
    this.el.nativeElement.style.backgroundColor=color;
   }

   @HostListener('mouseenter') onMouseEnter(){
     this.cambiar('red');
   }

   @HostListener('mouseleave') onMouseLeave(){
    this.cambiar('');
  }
}
