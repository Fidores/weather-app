import { OverlayService } from './../../services/overlay/overlay.service';
import { fade, fadeInAnimation, fadeOutAnimation } from './../../animations';
import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [ 
    trigger('expand', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '0.2s' } })),
      transition(':leave', useAnimation(fadeOutAnimation, { params: { duration: '0.2s' } }))
    ])
  ]
})
export class SelectComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly hostRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly overlay: OverlayService
  ) { }

  @HostListener('document:click', ['$event']) onOutsideClick($event: MouseEvent) { 
    if(!this.hostRef.nativeElement.contains($event.target as Node)) this.closeSelect();
  };
  @ViewChild('select', {static: false}) select: ElementRef<HTMLSelectElement>;

  options: Option[] = [
    { value: 'pl', name: 'Polski' },
    { value: 'en', name: 'English' }
  ];
  currentOption: number = 0;
  isExpanded: boolean = false;

  faArrowDown = faArrowDown;

  ngAfterViewInit() {
    for (const option of this.options) this.addOptionToPlaceholder(option);
  }

  ngOnInit() {}

  selectOption(index: number) {
    this.currentOption = index;
    this.selectOptionOfPlaceholder(index);
    this.closeSelect()
  }

  toggleSelect() {
    this.isExpanded = !this.isExpanded;
  }

  closeSelect() {
    this.isExpanded = false;
  }

  private addOptionToPlaceholder(option: Option) {
    const item = this.renderer.createElement('option');
    const text = this.renderer.createText(option.name);

    this.renderer.setAttribute(item, 'value', option.value);
    this.renderer.appendChild(item, text);
    this.select.nativeElement.add(item);
  }

  private selectOptionOfPlaceholder(index: number) {
    this.select.nativeElement.value = this.options[index].value;
  }

}
