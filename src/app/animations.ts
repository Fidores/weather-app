import { style, animate, animation, trigger, transition, useAnimation, query, stagger, animateChild, group } from '@angular/animations';

export const fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '0.3s',
        easing: 'ease-out'
    }
});

export const fadeOutAnimation = animation(
    animate('{{ duration }} {{ easing }}', style({opacity: 0}))
, {
    params: {
        duration: '0.3s',
        easing: 'ease-in'
    }
});

export const slideInAnimation = animation([
    style({transform: 'translateX(-100%)', opacity: 0}),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '0.3s',
        easing: 'ease-out'
    }
});

export const slideOutAnimation = animation(
    animate('{{ duration }} {{ easing }}', style({transform: 'translateX(-100%)', opacity: 0}))
, {
    params: {
        duration: '0.3s',
        easing: 'ease-out'
    }
});

export const fade = trigger('fade', [
    transition(':enter', useAnimation(fadeInAnimation)),
    transition(':leave', useAnimation(fadeOutAnimation))
]);

export const slideInEntrance = [
    trigger('slideInEntranceParent', [
        
        transition(':enter', [
            query('@slideInEntranceChild', stagger(20, animateChild()))
        ])
        ]),

        trigger('slideInEntranceChild', [

        transition(':enter', group([
            useAnimation(slideInAnimation),
            useAnimation(fadeInAnimation)
        ])),

    ])
]