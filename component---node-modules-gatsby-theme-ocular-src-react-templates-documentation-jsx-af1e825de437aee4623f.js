(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"1OyB":function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}e.d(t,"a",(function(){return r}))},"5ku3":function(n,t,e){"use strict";(function(n){e.d(t,"a",(function(){return i})),e.d(t,"b",(function(){return u}));var r=e("U8pU"),o=e("I0ug");function i(){return!("object"===(void 0===n?"undefined":Object(r.a)(n))&&"[object process]"===String(n)&&!n.browser)||Object(o.a)()}function u(){return i()&&"undefined"!=typeof document}}).call(this,e("8oxB"))},I0ug:function(n,t,e){"use strict";(function(n){e.d(t,"a",(function(){return o}));var r=e("U8pU");function o(t){if("undefined"!=typeof window&&"object"===Object(r.a)(window.process)&&"renderer"===window.process.type)return!0;if(void 0!==n&&"object"===Object(r.a)(n.versions)&&Boolean(n.versions.electron))return!0;var e="object"===("undefined"==typeof navigator?"undefined":Object(r.a)(navigator))&&"string"==typeof navigator.userAgent&&navigator.userAgent,o=t||e;return!!(o&&o.indexOf("Electron")>=0)}}).call(this,e("8oxB"))},K9nA:function(n,t,e){"use strict";(function(n,r){e.d(t,"e",(function(){return u})),e.d(t,"f",(function(){return c})),e.d(t,"c",(function(){return a})),e.d(t,"b",(function(){return f})),e.d(t,"d",(function(){return s})),e.d(t,"a",(function(){return d}));var o=e("U8pU"),i={self:"undefined"!=typeof self&&self,window:"undefined"!=typeof window&&window,global:void 0!==n&&n,document:"undefined"!=typeof document&&document,process:"object"===(void 0===r?"undefined":Object(o.a)(r))&&r},u=i.self||i.window||i.global,c=i.window||i.self||i.global,a=i.global||i.self||i.window,f=i.document||{},s=i.process||{},d=console}).call(this,e("yLpj"),e("8oxB"))},NdJ4:function(n,t,e){"use strict";function r(n){if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,t){if(!n)return;if("string"==typeof n)return o(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return o(n,t)}(n))){var t=0,e=function(){};return{s:e,n:function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}},e:function(n){throw n},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i,u=!0,c=!1;return{s:function(){r=n[Symbol.iterator]()},n:function(){var n=r.next();return u=n.done,n},e:function(n){c=!0,i=n},f:function(){try{u||null==r.return||r.return()}finally{if(c)throw i}}}}function o(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function i(n){var t,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:["constructor"],o=Object.getPrototypeOf(n),i=Object.getOwnPropertyNames(o),u=r(i);try{var c=function(){var r=t.value;"function"==typeof n[r]&&(e.find((function(n){return r===n}))||(n[r]=n[r].bind(n)))};for(u.s();!(t=u.n()).done;)c()}catch(a){u.e(a)}finally{u.f()}}e.d(t,"a",(function(){return i}))},S5bX:function(n,t,e){"use strict";e.d(t,"a",(function(){return u}));var r=e("1OyB"),o=e("vuIU");function i(n){try{var t=window[n],e="__storage_test__";return t.setItem(e,e),t.removeItem(e),t}catch(r){return null}}var u=function(){function n(t,e){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"sessionStorage";Object(r.a)(this,n),this.storage=i(o),this.id=t,this.config={},Object.assign(this.config,e),this._loadConfiguration()}return Object(o.a)(n,[{key:"getConfiguration",value:function(){return this.config}},{key:"setConfiguration",value:function(n){return this.config={},this.updateConfiguration(n)}},{key:"updateConfiguration",value:function(n){if(Object.assign(this.config,n),this.storage){var t=JSON.stringify(this.config);this.storage.setItem(this.id,t)}return this}},{key:"_loadConfiguration",value:function(){var n={};if(this.storage){var t=this.storage.getItem(this.id);n=t?JSON.parse(t):{}}return Object.assign(this.config,n),this}}]),n}()},U8pU:function(n,t,e){"use strict";function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}e.d(t,"a",(function(){return r}))},W1BH:function(n,t,e){"use strict";e.d(t,"a",(function(){return o})),e.d(t,"b",(function(){return i}));var r=e("5ku3"),o="undefined"!=typeof __VERSION__?__VERSION__:"untranspiled source",i=Object(r.a)()},bzNg:function(n,t,e){"use strict";e.r(t),e.d(t,"query",(function(){return a})),e.d(t,"default",(function(){return f}));var r=e("dI71"),o=e("q1tI"),i=e.n(o),u=e("8mkv"),c=e("7yFj"),a="2196287876",f=function(n){function t(){return n.apply(this,arguments)||this}return Object(r.a)(t,n),t.prototype.render=function(){var n=this.props.data.docBySlug.body,t=this.props.pageContext.relativeLinks;return i.a.createElement("div",{style:{position:"relative"}},i.a.createElement(c.o,null,i.a.createElement(u.a,{path:this.props.location.pathname,relativeLinks:t,body:n})))},t}(i.a.Component)},egY1:function(n,t,e){"use strict";e.d(t,"a",(function(){return i}));var r=e("W1BH"),o=e("K9nA");function i(){var n;if(r.b&&o.f.performance)n=o.f.performance.now();else if(o.d.hrtime){var t=o.d.hrtime();n=1e3*t[0]+t[1]/1e6}else n=Date.now();return n}},qlHW:function(n,t,e){"use strict";function r(n,t){if(!n)throw new Error(t||"Assertion failed")}e.d(t,"a",(function(){return r}))},vuIU:function(n,t,e){"use strict";function r(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function o(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}e.d(t,"a",(function(){return o}))},ygbw:function(n,t,e){"use strict";function r(n){return n<10?"".concat(n.toFixed(2),"ms"):n<100?"".concat(n.toFixed(1),"ms"):n<1e3?"".concat(n.toFixed(0),"ms"):"".concat((n/1e3).toFixed(2),"s")}function o(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8,e=Math.max(t-n.length,0);return"".concat(" ".repeat(e)).concat(n)}function i(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8,e=Math.max(t-n.length,0);return"".concat(n).concat(" ".repeat(e))}function u(n,t,e){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:600,o=n.src.replace(/\(/g,"%28").replace(/\)/g,"%29");n.width>r&&(e=Math.min(e,r/n.width));var i=n.width*e,u=n.height*e,c=["font-size:1px;","padding:".concat(Math.floor(u/2),"px ").concat(Math.floor(i/2),"px;"),"line-height:".concat(u,"px;"),"background:url(".concat(o,");"),"background-size:".concat(i,"px ").concat(u,"px;"),"color:transparent;"].join("");return["".concat(t," %c+"),c]}e.d(t,"b",(function(){return r})),e.d(t,"c",(function(){return o})),e.d(t,"d",(function(){return i})),e.d(t,"a",(function(){return u}))},zLVn:function(n,t,e){"use strict";function r(n,t){if(null==n)return{};var e,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)e=i[r],t.indexOf(e)>=0||(o[e]=n[e]);return o}e.d(t,"a",(function(){return r}))}}]);