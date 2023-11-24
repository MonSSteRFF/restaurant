/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-5357ef54'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "../dist/assets/index-804f4e36.css",
    "revision": null
  }, {
    "url": "../dist/icons/apple-touch-icon-180x180.png",
    "revision": "0e0e99ceac72c79f2749bf01cc008d3b"
  }, {
    "url": "../dist/icons/favicon.ico",
    "revision": "beffff4a67cb0031a944768c6894dbb9"
  }, {
    "url": "../dist/icons/favicon.svg",
    "revision": "190512be7842d4c43a36d92e281cfbca"
  }, {
    "url": "../dist/icons/maskable-icon-512x512.png",
    "revision": "5d28d8a6b1c8dfd4a9d3660d3500a35a"
  }, {
    "url": "../dist/icons/pwa-192x192.png",
    "revision": "108a08daa637574fde1d540bb46d052a"
  }, {
    "url": "../dist/icons/pwa-512x512.png",
    "revision": "12873981210e23afe7285866a110dc14"
  }, {
    "url": "../dist/icons/pwa-64x64.png",
    "revision": "79c6a66b27170e96b9060022ce836dca"
  }, {
    "url": "../dist/index.html",
    "revision": "974c19839e3acc55b40386f6297451c1"
  }, {
    "url": "../dist/screenshots/Screenshot_1.png",
    "revision": "861387f3cfe357d539bc67c1d7b6d483"
  }, {
    "url": "../index.html",
    "revision": "83c253b5a020c61941568d4b6969ea46"
  }, {
    "url": "../package-lock.json",
    "revision": "f1434e5f74192b4a1c94298edc3a31e7"
  }, {
    "url": "../package.json",
    "revision": "1eeee71377dc430a9b8cf88a244fdc51"
  }, {
    "url": "../public/icons/apple-touch-icon-180x180.png",
    "revision": "0e0e99ceac72c79f2749bf01cc008d3b"
  }, {
    "url": "../public/icons/favicon.ico",
    "revision": "beffff4a67cb0031a944768c6894dbb9"
  }, {
    "url": "../public/icons/favicon.svg",
    "revision": "190512be7842d4c43a36d92e281cfbca"
  }, {
    "url": "../public/icons/maskable-icon-512x512.png",
    "revision": "5d28d8a6b1c8dfd4a9d3660d3500a35a"
  }, {
    "url": "../public/icons/pwa-192x192.png",
    "revision": "108a08daa637574fde1d540bb46d052a"
  }, {
    "url": "../public/icons/pwa-512x512.png",
    "revision": "12873981210e23afe7285866a110dc14"
  }, {
    "url": "../public/icons/pwa-64x64.png",
    "revision": "79c6a66b27170e96b9060022ce836dca"
  }, {
    "url": "../public/screenshots/Screenshot_1.png",
    "revision": "861387f3cfe357d539bc67c1d7b6d483"
  }, {
    "url": "index.html",
    "revision": "0.0g6o69tfsvo"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
    allowlist: [/^\/$/]
  }));

}));
