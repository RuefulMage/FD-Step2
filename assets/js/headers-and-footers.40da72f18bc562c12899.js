!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=148)}({0:function(e,t,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function u(e,t){for(var n={},r=[],o=0;o<e.length;o++){var i=e[o],u=t.base?i[0]+t.base:i[0],l=n[u]||0,c="".concat(u," ").concat(l);n[u]=l+1;var f=s(c),d={css:i[1],media:i[2],sourceMap:i[3]};-1!==f?(a[f].references++,a[f].updater(d)):a.push({identifier:c,updater:g(d,t),references:1}),r.push(c)}return r}function l(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var c,f=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function d(e,t,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function v(e,t,n){var r=n.css,o=n.media,i=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var h=null,p=0;function g(e,t){var n,r,o;if(t.singleton){var i=p++;n=h||(h=l(t)),r=d.bind(null,n,i,!1),o=d.bind(null,n,i,!0)}else n=l(t),r=v.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=u(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var o=s(n[r]);a[o].references--}for(var i=u(e,t),l=0;l<n.length;l++){var c=s(n[l]);0===a[c].references&&(a[c].updater(),a.splice(c,1))}n=i}}}},10:function(e,t,n){},13:function(e,t,n){var r=n(0),o=n(14);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},14:function(e,t,n){},148:function(e,t,n){"use strict";n.r(t);n(149),n(4),n(13),n(15),n(6),n(17),n(19),n(9),n(21),n(2),n(23),n(25),n(151),n(27)},149:function(e,t,n){var r=n(0),o=n(150);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},15:function(e,t,n){var r=n(0),o=n(16);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},150:function(e,t,n){},151:function(e,t,n){var r=n(0),o=n(152);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},152:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){var r=n(0),o=n(18);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},18:function(e,t,n){},19:function(e,t,n){var r=n(0),o=n(20);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},2:function(e,t,n){var r=n(0),o=n(3);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},20:function(e,t,n){},21:function(e,t,n){var r=n(0),o=n(22);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},22:function(e,t,n){},23:function(e,t,n){var r=n(0),o=n(24);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},24:function(e,t,n){},25:function(e,t,n){var r=n(0),o=n(26);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},26:function(e,t,n){},27:function(e,t,n){"use strict";var r=function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.init=function(){n.navigation=n.element.querySelector(".".concat(e.navClassName)),n.authInfo=n.element.querySelector(".".concat(e.authClassName)),n.burgerButton=n.element.querySelector(".".concat(e.burgerButtonClassName)),n.addHandler()},this.addHandler=function(){n.burgerButton.addEventListener("click",n.handleBurgerButtonClick)},this.handleBurgerButtonClick=function(){n.navigation.classList.toggle(e.shownNavModifier),n.authInfo.classList.toggle(e.shownAuthModifier),n.burgerButton.classList.toggle(e.burgerButtonActiveModifier)},this.element=t,this.init()};r.shownNavModifier="header__navigation_shown",r.shownAuthModifier="header__auth_shown",r.navClassName="js-header__navigation",r.authClassName="js-header__auth-info",r.burgerButtonClassName="js-header__burger-button",r.burgerButtonActiveModifier="header__burger-button_active";var o=r;document.querySelectorAll(".js-header").forEach((function(e){new o(e)}))},3:function(e,t,n){},4:function(e,t,n){var r=n(0),o=n(5);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},5:function(e,t,n){},6:function(e,t,n){var r=n(0),o=n(7);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}},7:function(e,t,n){},9:function(e,t,n){var r=n(0),o=n(10);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var i={insert:"head",singleton:!1};r(o,i);e.exports=o.locals||{}}});