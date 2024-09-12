import {NgZone} from '@angular/core';
import {NavigationStart, provideRouter, Router} from '@angular/router';

import {getSingleSpaExtraProviders, singleSpaAngular} from 'single-spa-angular';

import {singleSpaPropsSubject} from './single-spa/single-spa-props';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {APP_BASE_HREF} from "@angular/common";
import {EmptyRouteComponent} from "./app/empty-route/empty-route.component";

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps: any) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return bootstrapApplication(AppComponent, {
      providers: [
        {provide: APP_BASE_HREF, useValue: '/login'},
        getSingleSpaExtraProviders(),
        provideRouter([{path: '**', component: EmptyRouteComponent}])
      ]
    })
  },
  template: '<app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
