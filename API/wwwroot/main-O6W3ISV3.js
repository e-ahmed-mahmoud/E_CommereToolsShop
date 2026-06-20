import{a as Ge,b as qe,c as $e}from"./chunk-DO7E5C75.js";import{a as Pe}from"./chunk-FBLCHR7L.js";import{a as Ue}from"./chunk-6QUSSJGV.js";import{b as x}from"./chunk-CXKPV4ZB.js";import{a as Ve}from"./chunk-HAZAVELX.js";import{a as je,b as y}from"./chunk-XHXWDMQ4.js";import{a as N}from"./chunk-GUQL3XWV.js";import{r as _}from"./chunk-XG5HBJHF.js";import{a as Xe}from"./chunk-6OAL4X54.js";import{B as Te,G as Oe,H as Fe,P as He,Q as Ne,a as ze,b as Be,e as we,r as Ie,u as Le,y as Re}from"./chunk-VH2YWVJC.js";import{$ as J,Aa as K,Ab as W,B as oe,Ba as fe,D as se,Ia as be,La as ve,M as me,Ma as p,Na as u,Pb as Ee,Q as w,Qb as F,R as q,Rb as Y,S as ce,Sa as S,Ta as s,U as i,Ua as a,Va as g,W as $,Wa as T,X as Z,Xa as O,Y as le,Ya as M,Z as de,_a as he,aa as pe,ab as f,ba as I,cb as b,cc as Ce,da as ue,e as te,ea as k,fc as ke,gc as Se,ia as L,jc as Me,kc as d,l as z,lc as H,m as ne,mb as _e,mc as De,n as re,nb as Q,nc as Ae,ob as h,p as ie,pb as ye,qa as c,qb as m,sb as D,t as ae,ua as R,va as ge,xb as xe,y as B,za as l}from"./chunk-2HOJFBMZ.js";var P=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=l({type:t,selectors:[["app-not-found"]],decls:10,vars:0,consts:[[1,"flex","items-center","justify-center","min-h-94","bg-gray-100"],[1,"text-center"],[1,"text-purple-700","icon-display","scale-150"],[1,"text-4xl","font-bold","text-gray-800","mt-4"],[1,"text-lg","text-gray-600","mt-2"],["routerLink","/shop","mat-flat-button","",1,"mt-4"]],template:function(e,n){e&1&&(s(0,"div",0)(1,"div",1)(2,"mat-icon",2),m(3," error_outline "),a(),s(4,"h1",3),m(5,"404"),a(),s(6,"p",4),m(7,"page not found"),a(),s(8,"button",5),m(9," Back to shop"),a()()())},dependencies:[N,H,Ne],encapsulation:2})};function st(t,o){if(t&1&&(s(0,"mat-card",4)(1,"code",5),m(2),a()()),t&2){let e,n=b(2);c(2),D(" ",(e=n.error())==null?null:e.error.details," ")}}function mt(t,o){if(t&1&&(s(0,"h5",2),m(1),a(),s(2,"h5",3),m(3," Stack trace"),a(),p(4,st,3,1,"mat-card",4)),t&2){let e,n=b();c(),D("Error: ",(e=n.error())==null?null:e.message),c(3),u(n.isDevelopemntEnv()?4:-1)}}var X=class t{constructor(o){this.router=o;this.error?.set(o.currentNavigation()?.extras.state?.error),this.isDevelopemntEnv.set(this.router.url.includes("localhost:"))}error=k(void 0);isDevelopemntEnv=k(!1);static \u0275fac=function(e){return new(e||t)(ge(d))};static \u0275cmp=l({type:t,selectors:[["app-server-error"]],decls:4,vars:1,consts:[[1,"container","mt-5","p4","bg-gray-100","rounded","shadow-lg"],[1,"text-2xl","font-semibold","mb4"],[1,"text-red-600"],[1,"text-lg","font-semibold","mb-2"],[1,"p-4","bg-white"],[1,"block","whitespace-pre-wrap"]],template:function(e,n){e&1&&(s(0,"div",0)(1,"h1",1),m(2," Inter server error "),a(),p(3,mt,5,2),a()),e&2&&(c(3),u(n.error()?3:-1))},dependencies:[Pe],encapsulation:2})};var E=(t,o)=>{let e=i(y),n=i(d);return e.currentUser()?z(!0):e.isAuthenticated().pipe(ie(r=>r.isAuthenticated?!0:(n.navigate(["/account/login"],{queryParams:{returnUrl:o.url}}),!1)))};var Ze=(t,o)=>{let e=i(x),n=i(_);return e.cartItemsCount()<1?(n.error("your cart is empty"),!1):!0};var Je=(t,o)=>{let e=i(Ve),n=i(d);return e.orderComplete()?!0:(n.navigateByUrl("/shop"),!1)};var Ke=[{path:"",loadComponent:()=>import("./chunk-BEXNBKS7.js").then(t=>t.Home)},{path:"shop",loadComponent:()=>import("./chunk-IHRQAHYY.js").then(t=>t.Shop)},{path:"shop/:id",loadComponent:()=>import("./chunk-ENSITJC5.js").then(t=>t.ProductDetails)},{path:"cart",loadComponent:()=>import("./chunk-CB72KYC3.js").then(t=>t.Cart)},{path:"checkout",loadComponent:()=>import("./chunk-7JNW5RVR.js").then(t=>t.CheckoutComponent),canActivate:[E,Ze]},{path:"checkout/success",loadComponent:()=>import("./chunk-ID4MAVSF.js").then(t=>t.CheckoutSuccess),canActivate:[E,Je]},{path:"addProduct",loadComponent:()=>import("./chunk-3KX6LQBL.js").then(t=>t.ProductForm),canActivate:[E]},{path:"orders",loadComponent:()=>import("./chunk-MCXGXQAJ.js").then(t=>t.Order),canActivate:[E]},{path:"orders/:id",loadComponent:()=>import("./chunk-FHA3KIWS.js").then(t=>t.OrderDetials),canActivate:[E]},{path:"account/login",loadComponent:()=>import("./chunk-QQAYJK6N.js").then(t=>t.Login)},{path:"account/register",loadComponent:()=>import("./chunk-QXBLI37P.js").then(t=>t.Register)},{path:"not-found",component:P},{path:"server-error",component:X},{path:"**",redirectTo:"",pathMatch:"full"}];var Qe=(t,o)=>{let e=i(d),n=i(_);return o(t).pipe(B(r=>{if(console.log(r.status),r.status===400)if(r.error.errors){let A=[];for(let G in r.error.errors)r.error.errors[G]&&A.push(r.error.errors[G].errorCode+" : "+r.error.errors[G].errorMessage);throw A.flat()}else n.error(r.message);else if(r.status===401)n.error("`not authrized user");else if(r.status===404)e.navigateByUrl("/not-found");else if(r.status===500){let A={state:{error:r.error}};e.navigateByUrl("/server-error",A)}else console.log(r);return ne(()=>r)}))};var C=class t{isLoading=k(!1);busyRequestCount=0;busy(){this.busyRequestCount++,this.isLoading.set(!0)}idle(){this.busyRequestCount--,this.busyRequestCount<=0&&(this.isLoading.set(!1),this.busyRequestCount=0)}static \u0275fac=function(e){return new(e||t)};static \u0275prov=w({token:t,factory:t.\u0275fac,providedIn:"root"})};var We=(t,o)=>{let e=i(C);return e.busy(),o(t).pipe(Xe.isProd?te:oe(300),se(()=>e.idle()))};var j=class t{cartService=i(x);accountService=i(y);router=i(d);signalrService=i(je);init(){let o=localStorage.getItem("cart_id"),e=o?this.cartService.getCart(o):z(null),n=this.accountService.getUserInfo().pipe(B(r=>this.router.navigateByUrl("/account/login")),me(r=>{r&&(this.signalrService.createHubConnection(),this.accountService.getUserRoles().subscribe())}));return ae({cart:e,user:n})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=w({token:t,factory:t.\u0275fac,providedIn:"root"})};var Ye=(t,o)=>{let e=t.clone({withCredentials:!0});return o(e)};var et={providers:[ue(),Ae(Ke),ke(Se([Qe,We,Ye])),be(()=>re(i(j).init()).finally(()=>{let t=document.getElementById("initialLoad");t&&t.remove()}))]};function ct(t,o){t&1&&M(0,"div",2)}var lt=new ce("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var nt=(()=>{class t{_elementRef=i(L);_ngZone=i(I);_changeDetectorRef=i(Ee);_renderer=i(R);_cleanupTransitionEnd;constructor(){let e=Oe(),n=i(lt,{optional:!0});this._isNoopAnimation=e==="di-disabled",e==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),n&&(n.color&&(this.color=this._defaultColor=n.color),this.mode=n.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor="primary";get value(){return this._value}set value(e){this._value=tt(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=tt(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new pe;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static \u0275fac=function(n){return new(n||t)};static \u0275cmp=l({type:t,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(n,r){n&2&&(ve("aria-valuenow",r._isIndeterminate()?null:r.value)("mode",r.mode),ye("mat-"+r.color),h("_mat-animation-noopable",r._isNoopAnimation)("mdc-linear-progress--animation-ready",!r._isNoopAnimation)("mdc-linear-progress--indeterminate",r._isIndeterminate()))},inputs:{color:"color",value:[2,"value","value",Y],bufferValue:[2,"bufferValue","bufferValue",Y],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(n,r){n&1&&(T(0,"div",0),M(1,"div",1),p(2,ct,1,0,"div",2),O(),T(3,"div",3),M(4,"span",4),O(),T(5,"div",5),M(6,"span",4),O()),n&2&&(c(),Q("flex-basis",r._getBufferBarFlexBasis()),c(),u(r.mode==="buffer"?2:-1),c(),Q("transform",r._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2,changeDetection:0})}return t})();function tt(t,o=0,e=100){return Math.max(o,Math.min(e,t))}var rt="mat-badge-content",dt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=l({type:t,selectors:[["ng-component"]],decls:0,vars:0,template:function(n,r){},styles:[`.mat-badge {
  position: relative;
}
.mat-badge.mat-badge {
  overflow: visible;
}

.mat-badge-content {
  position: absolute;
  text-align: center;
  display: inline-block;
  transition: transform 200ms ease-in-out;
  transform: scale(0.6);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  pointer-events: none;
  background-color: var(--mat-badge-background-color, var(--mat-sys-error));
  color: var(--mat-badge-text-color, var(--mat-sys-on-error));
  font-family: var(--mat-badge-text-font, var(--mat-sys-label-small-font));
  font-weight: var(--mat-badge-text-weight, var(--mat-sys-label-small-weight));
  border-radius: var(--mat-badge-container-shape, var(--mat-sys-corner-full));
}
.mat-badge-above .mat-badge-content {
  bottom: 100%;
}
.mat-badge-below .mat-badge-content {
  top: 100%;
}
.mat-badge-before .mat-badge-content {
  right: 100%;
}
[dir=rtl] .mat-badge-before .mat-badge-content {
  right: auto;
  left: 100%;
}
.mat-badge-after .mat-badge-content {
  left: 100%;
}
[dir=rtl] .mat-badge-after .mat-badge-content {
  left: auto;
  right: 100%;
}
@media (forced-colors: active) {
  .mat-badge-content {
    outline: solid 1px;
    border-radius: 0;
  }
}

.mat-badge-disabled .mat-badge-content {
  background-color: var(--mat-badge-disabled-state-background-color, color-mix(in srgb, var(--mat-sys-error) 38%, transparent));
  color: var(--mat-badge-disabled-state-text-color, var(--mat-sys-on-error));
}

.mat-badge-hidden .mat-badge-content {
  display: none;
}

.ng-animate-disabled .mat-badge-content,
.mat-badge-content._mat-animation-noopable {
  transition: none;
}

.mat-badge-content.mat-badge-active {
  transform: none;
}

.mat-badge-small .mat-badge-content {
  width: var(--mat-badge-legacy-small-size-container-size, unset);
  height: var(--mat-badge-legacy-small-size-container-size, unset);
  min-width: var(--mat-badge-small-size-container-size, 6px);
  min-height: var(--mat-badge-small-size-container-size, 6px);
  line-height: var(--mat-badge-small-size-line-height, 6px);
  padding: var(--mat-badge-small-size-container-padding, 0);
  font-size: var(--mat-badge-small-size-text-size, 0);
  margin: var(--mat-badge-small-size-container-offset, -6px 0);
}
.mat-badge-small.mat-badge-overlap .mat-badge-content {
  margin: var(--mat-badge-small-size-container-overlap-offset, -6px);
}

.mat-badge-medium .mat-badge-content {
  width: var(--mat-badge-legacy-container-size, unset);
  height: var(--mat-badge-legacy-container-size, unset);
  min-width: var(--mat-badge-container-size, 16px);
  min-height: var(--mat-badge-container-size, 16px);
  line-height: var(--mat-badge-line-height, 16px);
  padding: var(--mat-badge-container-padding, 0 4px);
  font-size: var(--mat-badge-text-size, var(--mat-sys-label-small-size));
  margin: var(--mat-badge-container-offset, -12px 0);
}
.mat-badge-medium.mat-badge-overlap .mat-badge-content {
  margin: var(--mat-badge-container-overlap-offset, -12px);
}

.mat-badge-large .mat-badge-content {
  width: var(--mat-badge-legacy-large-size-container-size, unset);
  height: var(--mat-badge-legacy-large-size-container-size, unset);
  min-width: var(--mat-badge-large-size-container-size, 16px);
  min-height: var(--mat-badge-large-size-container-size, 16px);
  line-height: var(--mat-badge-large-size-line-height, 16px);
  padding: var(--mat-badge-large-size-container-padding, 0 4px);
  font-size: var(--mat-badge-large-size-text-size, var(--mat-sys-label-small-size));
  margin: var(--mat-badge-large-size-container-offset, -12px 0);
}
.mat-badge-large.mat-badge-overlap .mat-badge-content {
  margin: var(--mat-badge-large-size-container-overlap-offset, -12px);
}
`],encapsulation:2,changeDetection:0})}return t})(),it=(()=>{class t{_ngZone=i(I);_elementRef=i(L);_ariaDescriber=i(Te);_renderer=i(R);_animationsDisabled=Fe();_idGenerator=i(Re);get color(){return this._color}set color(e){this._setColor(e),this._color=e}_color="primary";overlap=!0;disabled=!1;position="above after";get content(){return this._content}set content(e){this._updateRenderedContent(e)}_content;get description(){return this._description}set description(e){this._updateDescription(e)}_description;size="medium";hidden=!1;_badgeElement;_inlineBadgeDescription;_isInitialized=!1;_interactivityChecker=i(Ie);_document=i(J);constructor(){let e=i(ze);e.load(dt),e.load(Be)}isAbove(){return this.position.indexOf("below")===-1}isAfter(){return this.position.indexOf("before")===-1}getBadgeElement(){return this._badgeElement}ngOnInit(){this._clearExistingBadges(),this.content&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement(),this._updateRenderedContent(this.content)),this._isInitialized=!0}ngAfterViewInit(){}ngOnDestroy(){this._renderer.destroyNode&&(this._renderer.destroyNode(this._badgeElement),this._inlineBadgeDescription?.remove()),this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description)}_isHostInteractive(){return this._interactivityChecker.isFocusable(this._elementRef.nativeElement,{ignoreVisibility:!0})}_createBadgeElement(){let e=this._renderer.createElement("span"),n="mat-badge-active";return e.setAttribute("id",this._idGenerator.getId("mat-badge-content-")),e.setAttribute("aria-hidden","true"),e.classList.add(rt),this._animationsDisabled&&e.classList.add("_mat-animation-noopable"),this._elementRef.nativeElement.appendChild(e),typeof requestAnimationFrame=="function"&&!this._animationsDisabled?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>{e.classList.add(n)})}):e.classList.add(n),e}_updateRenderedContent(e){let n=`${e??""}`.trim();this._isInitialized&&n&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement()),this._badgeElement&&(this._badgeElement.textContent=n),this._content=n}_updateDescription(e){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description),(!e||this._isHostInteractive())&&this._removeInlineDescription(),this._description=e,this._isHostInteractive()?this._ariaDescriber.describe(this._elementRef.nativeElement,e):this._updateInlineDescription()}_updateInlineDescription(){this._inlineBadgeDescription||(this._inlineBadgeDescription=this._document.createElement("span"),this._inlineBadgeDescription.classList.add("cdk-visually-hidden")),this._inlineBadgeDescription.textContent=this.description,this._badgeElement?.appendChild(this._inlineBadgeDescription)}_removeInlineDescription(){this._inlineBadgeDescription?.remove(),this._inlineBadgeDescription=void 0}_setColor(e){let n=this._elementRef.nativeElement.classList;n.remove(`mat-badge-${this._color}`),e&&n.add(`mat-badge-${e}`)}_clearExistingBadges(){let e=this._elementRef.nativeElement.querySelectorAll(`:scope > .${rt}`);for(let n of Array.from(e))n!==this._badgeElement&&n.remove()}static \u0275fac=function(n){return new(n||t)};static \u0275dir=fe({type:t,selectors:[["","matBadge",""]],hostAttrs:[1,"mat-badge"],hostVars:20,hostBindings:function(n,r){n&2&&h("mat-badge-overlap",r.overlap)("mat-badge-above",r.isAbove())("mat-badge-below",!r.isAbove())("mat-badge-before",!r.isAfter())("mat-badge-after",r.isAfter())("mat-badge-small",r.size==="small")("mat-badge-medium",r.size==="medium")("mat-badge-large",r.size==="large")("mat-badge-hidden",r.hidden||!r.content)("mat-badge-disabled",r.disabled)},inputs:{color:[0,"matBadgeColor","color"],overlap:[2,"matBadgeOverlap","overlap",F],disabled:[2,"matBadgeDisabled","disabled",F],position:[0,"matBadgePosition","position"],content:[0,"matBadge","content"],description:[0,"matBadgeDescription","description"],size:[0,"matBadgeSize","size"],hidden:[2,"matBadgeHidden","hidden",F]}})}return t})(),at=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=K({type:t});static \u0275inj=q({imports:[Le,we]})}return t})();var ot=()=>({exact:!0});function ut(t,o){if(t&1&&(s(0,"button",15)(1,"mat-icon"),m(2,"account_circle"),a(),m(3),s(4,"mat-icon"),m(5,"arrow_drop_down"),a()()),t&2){let e,n=b(),r=_e(32);S("mat-menu-trigger-for",r),c(3),D(" ",(e=n.accountService.currentUser())==null?null:e.email," ")}}function gt(t,o){t&1&&(s(0,"div",16)(1,"button",28),m(2,"Login"),a(),s(3,"button",29),m(4,"Register"),a()())}function ft(t,o){if(t&1){let e=he();g(0,"hr",30),s(1,"a",31),f("click",function(){$(e);let r=b();return Z(r.isMenuOpen=!1)}),m(2,"Login"),a(),s(3,"a",32),f("click",function(){$(e);let r=b();return Z(r.isMenuOpen=!1)}),m(4,"Register"),a()}}function bt(t,o){t&1&&g(0,"mat-progress-bar",22)}function vt(t,o){t&1&&(s(0,"button",24)(1,"mat-icon"),m(2,"add"),a(),m(3," AddProduct "),a())}var V=class t{cartService=i(x);isMenuOpen=!1;loadingService=i(C);accountService=i(y);router=i(d);snackbarError=i(_);logout(){this.accountService.logout().subscribe({next:()=>{this.accountService.currentUser.set(null),this.router.navigateByUrl("/")},error:o=>this.snackbarError.error(o)})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=l({type:t,selectors:[["app-header"]],decls:47,vars:12,consts:[["menu","matMenu"],[1,"shadow-md","p-2","w-full","fixed","bg-white","top-0","z-50","mb-6"],[1,"max-w-screen-2xl","mx-auto"],[1,"flex","items-center","justify-between"],[1,"sm:hidden","p-2","text-gray-600",3,"click"],["fill","none","stroke","currentColor","viewBox","0 0 24 24",1,"w-6","h-6"],["stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M4 6h16M4 12h16m-7 6h7"],["routerLink","/"],["src","/images/shopLogo.png","alt","app logo",1,"max-h-12","sm:max-h-17","scale-150","sm:scale-185","object-contain"],[1,"hidden","sm:flex","gap-1","sm:gap-3","sm:uppercase","sm:text-xl","sm:text-textBlueColor"],["routerLink","/","routerLinkActive","active",3,"routerLinkActiveOptions"],["routerLink","/shop","routerLinkActive","active"],["routerLink","/contactUs","routerLinkActive","active"],[1,"flex","gap-3","items-center"],["routerLink","/cart","matBadgeSize","large",1,"mt-2","mr-2",3,"matBadge"],["mat-button","",1,"hidden","sm:flex",3,"mat-menu-trigger-for"],[1,"hidden","sm:flex","gap-2"],[1,"sm:hidden","flex","flex-col","mt-3","border-t","pt-2","gap-2","text-sm","uppercase","text-textBlueColor"],["routerLink","/","routerLinkActive","active",3,"click","routerLinkActiveOptions"],["routerLink","/shop","routerLinkActive","active",3,"click"],["routerLink","/contactUs","routerLinkActive","active",3,"click"],[1,"mb-24"],["mode","indeterminate",1,"fixed","top-20"],[1,"px-5"],["mat-menu-item","","routerLink","/addProduct",1,"px-4","text-center"],["mat-menu-item","","routerLink","/cart",1,"px-4"],["mat-menu-item","","routerLink","/orders",1,"px-4"],["mat-menu-item","",1,"px-4",3,"click"],["mat-stroked-button","","routerLink","/account/login"],["mat-stroked-button","","routerLink","/account/register"],[1,"my-2"],["routerLink","/account/login",3,"click"],["routerLink","/account/register",3,"click"]],template:function(e,n){if(e&1&&(s(0,"header",1)(1,"div",2)(2,"div",3)(3,"button",4),f("click",function(){return n.isMenuOpen=!n.isMenuOpen}),le(),s(4,"svg",5),g(5,"path",6),a()(),de(),s(6,"a",7),g(7,"img",8),a(),s(8,"nav",9)(9,"a",10),m(10,"Home"),a(),s(11,"a",11),m(12,"Shop"),a(),s(13,"a",12),m(14,"Contact"),a()(),s(15,"div",13)(16,"a",14)(17,"mat-icon"),m(18,"shopping_cart"),a()(),p(19,ut,6,2,"button",15)(20,gt,5,0,"div",16),a()(),s(21,"nav",17)(22,"a",18),f("click",function(){return n.isMenuOpen=!1}),m(23,"Home"),a(),s(24,"a",19),f("click",function(){return n.isMenuOpen=!1}),m(25,"Shop"),a(),s(26,"a",20),f("click",function(){return n.isMenuOpen=!1}),m(27,"Contact"),a(),p(28,ft,5,0),a()()(),g(29,"div",21),p(30,bt,1,0,"mat-progress-bar",22),s(31,"mat-menu",23,0),p(33,vt,4,0,"button",24),s(34,"button",25)(35,"mat-icon"),m(36,"shopping_cart"),a(),m(37," MyCart "),a(),s(38,"button",26)(39,"mat-icon"),m(40,"history"),a(),m(41," My orders "),a(),g(42,"mat-divider"),s(43,"button",27),f("click",function(){return n.logout()}),s(44,"mat-icon"),m(45,"logout"),a(),m(46," Logout "),a()()),e&2){let r;c(9),S("routerLinkActiveOptions",W(10,ot)),c(7),S("matBadge",xe(n.cartService.cartItemsCount())),c(3),u(n.accountService.currentUser()?19:20),c(2),h("hidden",!n.isMenuOpen),c(),S("routerLinkActiveOptions",W(11,ot)),c(6),u(n.accountService.currentUser()?-1:28),c(2),u(n.loadingService.isLoading()?30:-1),c(3),u((r=n.accountService.userRoles())!=null&&r.includes("Admin")?33:-1)}},dependencies:[N,He,H,De,nt,at,it,qe,Ge,Ue,$e],styles:[".custom-badge[_ngcontent-%COMP%]   .mat-badge-content[_ngcontent-%COMP%]{width:24px;height:24pc;font-size:14px;line-height:24px}.custom-badge[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:28px;width:28px;height:28px}a.active[_ngcontent-%COMP%]{color:#00f}"]})};var U=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=l({type:t,selectors:[["app-root"]],decls:3,vars:0,consts:[[1,"container","mt-22","z-20"]],template:function(e,n){e&1&&(g(0,"app-header"),s(1,"div",0),g(2,"router-outlet"),a())},dependencies:[Me,V],encapsulation:2})};Ce(U,et).catch(t=>console.error(t));
