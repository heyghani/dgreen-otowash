if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>a(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"dc1f9840118bef1c9a62a092ed99d65b"},{url:"/_next/static/BBdVTyxqzre8GP9mqTa2r/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/BBdVTyxqzre8GP9mqTa2r/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/23-41895cd82805c9bf.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/291-9236232bfbce2f39.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/924-c1da4a31223f1caa.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/app/_not-found/page-0cc4858ce7ae42a0.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/app/home/page-74e9c62f4f8db6c2.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/app/layout-f16463088041b82b.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/app/login/page-4463f272bfa9b86b.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/app/orders/page-bde75f4075554ee2.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/app/page-39510d5dfb397b9f.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/fd9d1056-2737f78bfff3f6bf.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/main-69aa5f60f88ff09d.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/main-app-babf57fab9240b8e.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-597d84c99d6705a6.js",revision:"BBdVTyxqzre8GP9mqTa2r"},{url:"/_next/static/css/76dbc25d67a57fe4.css",revision:"76dbc25d67a57fe4"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/assets/header.jpeg",revision:"0b5ee49aa71a570c39adb5fa963d2124"},{url:"/manifest.json",revision:"cf17cd14080150d3f82a9cd46b64b7c0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
