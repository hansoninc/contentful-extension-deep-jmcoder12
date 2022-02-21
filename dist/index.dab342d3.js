var e,t,n={};function r(e){if(window){const t=new CustomEvent("deepcopylog",{detail:{log:e}});window.dispatchEvent(t)}console&&console.log("DeepCopy: "+e)}e=n,t=function(e){var t,n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},r=function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i=function(){function e(){this._id=0,this._listeners={}}return e.prototype.dispatch=function(){for(var e,t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];for(var r in this._listeners)(e=this._listeners)[r].apply(e,t)},e.prototype.attach=function(e){var t=this;if("function"!=typeof e)throw new Error("listener function expected");var n=this._id++;return this._listeners[n]=e,function(){return delete t._listeners[n]}},e}(),o="__private__memoized__arguments__",a=function(e){function r(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var i=e.call(this)||this;if(i[t]=[],!n.length)throw new Error("Initial value to be memoized expected");return i[o]=n,i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(r,e),r.prototype.dispatch=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];this[o]=t,e.prototype.dispatch.apply(this,t)},r.prototype.attach=function(t){var n=e.prototype.attach.call(this,t);return t.apply(void 0,this[o]),n},r}(i);t=o;var s=function(){function e(e,t){var n,r,i,o=this;this._messageHandlers={},this._responseHandlers={},this._send=(n=e,r=t.parent,i=0,function(e,t){var o=i++;try{r.postMessage({source:n,id:o,method:e,params:t},"*")}catch(t){throw t instanceof DOMException&&"DataCloneError"===t.name&&"openDialog"===e&&console.error("Error: openCurrent[App] parameters could not be parsed. You likely tried to pass functions or DOM elements as a parameter. Tip: Use the App SDK directly within the dialog location.\n\nLearn more about the dialog location: https://ctfl.io/app-sdk-dialog"),t}return o}),t.addEventListener("message",(function(e){o._handleMessage(e.data)}))}return e.prototype.call=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var i=this._send(e,n);return new Promise((function(e,n){t._responseHandlers[i]={resolve:e,reject:n}}))},e.prototype.send=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];this._send(e,t)},e.prototype.addHandler=function(e,t){return e in this._messageHandlers||(this._messageHandlers[e]=new i),this._messageHandlers[e].attach(t)},e.prototype._handleMessage=function(e){if(e.method){var t=e.method,n=e.params,r=this._messageHandlers[t];r&&r.dispatch.apply(r,n)}else{var i=e.id,o=this._responseHandlers[i];if(!o)return;"result"in e?o.resolve(e.result):"error"in e&&o.reject(e.error),delete this._responseHandlers[i]}},e}(),l=function(){function e(e,t){var n=this;this.id=t.id,this.locale=t.locale,this.type=t.type,this.required=t.required,this.validations=t.validations,this.items=t.items,this._value=t.value,this._valueSignal=new a(this._value),this._isDisabledSignal=new a(void 0),this._schemaErrorsChangedSignal=new a(void 0),this._channel=e,e.addHandler("valueChanged",(function(e,t,r){e!==n.id||t&&t!==n.locale||(n._value=r,n._valueSignal.dispatch(r))})),e.addHandler("isDisabledChangedForFieldLocale",(function(e,t,r){e===n.id&&t===n.locale&&n._isDisabledSignal.dispatch(r)})),e.addHandler("schemaErrorsChangedForFieldLocale",(function(e,t,r){e===n.id&&t===n.locale&&n._schemaErrorsChangedSignal.dispatch(r)}))}return e.prototype.getValue=function(){return this._value},e.prototype.setValue=function(e){return this._value=e,this._valueSignal.dispatch(e),this._channel.call("setValue",this.id,this.locale,e)},e.prototype.removeValue=function(){return this._value=void 0,this._channel.call("removeValue",this.id,this.locale)},e.prototype.setInvalid=function(e){return this._channel.call("setInvalid",e,this.locale)},e.prototype.onValueChanged=function(e){return this._valueSignal.attach(e)},e.prototype.onIsDisabledChanged=function(e){return this._isDisabledSignal.attach(e)},e.prototype.onSchemaErrorsChanged=function(e){return this._schemaErrorsChangedSignal.attach(e)},e}(),c=function(){function e(e,t,n){this.id=t.id,this.locales=t.locales,this.type=t.type,this.required=t.required,this.validations=t.validations,this.items=t.items,this._defaultLocale=n,this._fieldLocales=t.locales.reduce((function(n,i){var o,a=new l(e,{id:t.id,type:t.type,required:t.required,validations:t.validations,items:t.items,locale:i,value:t.values[i]});return r(r({},n),((o={})[i]=a,o))}),{}),this.assertHasLocale(n)}return e.prototype.getValue=function(e){return this._getFieldLocale(e).getValue()},e.prototype.setValue=function(e,t){return this._getFieldLocale(t).setValue(e)},e.prototype.removeValue=function(e){return this.setValue(void 0,e)},e.prototype.onValueChanged=function(e,t){var n=t||e;return t||(e=""),this._getFieldLocale(e).onValueChanged(n)},e.prototype.onIsDisabledChanged=function(e,t){var n=t||e;return t||(e=""),this._getFieldLocale(e).onIsDisabledChanged(n)},e.prototype._getFieldLocale=function(e){return e=e||this._defaultLocale,this.assertHasLocale(e),this._fieldLocales[e]},e.prototype.getForLocale=function(e){if(!e)throw new Error("getForLocale must be passed a locale");return this._getFieldLocale(e)},e.prototype.assertHasLocale=function(e){if(!this._fieldLocales[e])throw new Error('Unknown locale "'+e+'" for field "'+this.id+'"')},e}();function u(e,t){var n,r=e,i=r.document,o=r.MutationObserver,a=function(){c.updateHeight()},s=new o(a),l=!1,c={startAutoResizer:function(){c.updateHeight(),l||(l=!0,s.observe(i.body,{attributes:!0,childList:!0,subtree:!0,characterData:!0}),e.addEventListener("resize",a))},stopAutoResizer:function(){l&&(l=!1,s.disconnect(),e.removeEventListener("resize",a))},updateHeight:function(e){void 0===e&&(e=null),null===e&&(e=Math.ceil(i.documentElement.getBoundingClientRect().height)),e!==n&&(t.send("setHeight",e),n=e)}};return c}var d=["getTask","getTasks","createTask","updateTask","deleteTask"];function p(e,t,n,i){var o=t.sys,s=new a(o),l=t.metadata,c=new a(l);e.addHandler("sysChanged",(function(e){o=e,s.dispatch(o)})),e.addHandler("metadataChanged",(function(e){l=e,c.dispatch(l)}));var u={};return d.forEach((function(t){u[t]=function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return e.call("callEntryMethod",t,n)}})),r(r(r({getSys:function(){return o},onSysChanged:function(e){return s.attach(e)},fields:n.reduce((function(e,t){return e[t.id]=i(t),e}),{})},l?{metadata:l}:{}),{getMetadata:function(){return l},onMetadataChanged:function(e){return c.attach(e)}}),u)}var f=["getContentType","getEntry","getEntrySnapshots","getAsset","getEditorInterface","getPublishedEntries","getPublishedAssets","getContentTypes","getEntries","getEditorInterfaces","getAssets","createContentType","createEntry","createAsset","updateContentType","updateEntry","updateAsset","deleteContentType","deleteEntry","deleteAsset","publishEntry","publishAsset","unpublishEntry","unpublishAsset","archiveEntry","archiveAsset","unarchiveEntry","unarchiveAsset","createUpload","processAsset","waitUntilAssetProcessed","getUsers","getAllScheduledActions","getEntityScheduledActions","signRequest","createTag","readTags","updateTag","deleteTag","getTeams"],h=function(e){var t;return"object"!=typeof(t=e)||null===t||Array.isArray(t)?{}:e};function y(e,t){function n(t,n){return e.call("openDialog",t,h(n))}function i(n){var i=h(n);if((i=r(r({},i),{id:i.id||t.extension})).id)return e.call("openDialog","extension",i);throw new Error("Extension ID not provided.")}function o(n){if(n=h(n),t.app){var i=r(r({},n),{id:t.app});return e.call("openDialog","app",i)}throw new Error("Not in the app context.")}function a(t,n,r){return(r=h(r)).entityType=t,r.multiple=n,e.call("openDialog","entitySelector",r)}return{openAlert:n.bind(null,"alert"),openConfirm:n.bind(null,"confirm"),openPrompt:n.bind(null,"prompt"),openExtension:i,openCurrentApp:o,openCurrent:function(e){return t.app?o(e):i(r(r({},e),{id:t.extension}))},selectSingleEntry:a.bind(null,"Entry",!1),selectSingleAsset:a.bind(null,"Asset",!1),selectMultipleEntries:a.bind(null,"Entry",!0),selectMultipleAssets:a.bind(null,"Asset",!0)}}function g(e,t){var n=new a(void 0),r=new a(void 0);return e.addHandler("localeSettingsChanged",(function(e){n.dispatch(e)})),e.addHandler("showDisabledFieldsChanged",(function(e){r.dispatch(e)})),{editorInterface:t,onLocaleSettingsChanged:function(e){return n.attach(e)},onShowDisabledFieldsChanged:function(e){return r.attach(e)}}}var v,w="preInstall",m="postInstall",_=function(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)},E=function(e){return"function"==typeof e},A=function(e){return console.error(e),Promise.resolve(!1)},C=function(e,t,n){if(!E(e))return Promise.resolve(t);var r;try{r=void 0===n?e():e(n)}catch(e){return A(e)}var i,o=r;return _(i=o)&&E(i.then)||(o=Promise.resolve(o)),o.then((function(e){return e instanceof Error?Promise.reject(e):!1!==e&&(_(e)?e:t)}),A).catch(A)},T={LOCATION_ENTRY_FIELD:"entry-field",LOCATION_ENTRY_FIELD_SIDEBAR:"entry-field-sidebar",LOCATION_ENTRY_SIDEBAR:"entry-sidebar",LOCATION_DIALOG:"dialog",LOCATION_ENTRY_EDITOR:"entry-editor",LOCATION_PAGE:"page",LOCATION_APP_CONFIG:"app-config"},I=[b,D,function(e,t){var n=t.field;if(!n)throw new Error('FieldAPI called for location without "field" property defined.');return{field:new l(e,n)}},S,O],L=((v={})[T.LOCATION_ENTRY_FIELD]=I,v[T.LOCATION_ENTRY_FIELD_SIDEBAR]=I,v[T.LOCATION_ENTRY_SIDEBAR]=[b,D,S,O],v[T.LOCATION_ENTRY_EDITOR]=[b,D,S],v[T.LOCATION_DIALOG]=[b,function(e){return{close:function(t){return e.send("closeDialog",t)}}},O],v[T.LOCATION_PAGE]=[b],v[T.LOCATION_APP_CONFIG]=[b,function(e){return{app:(t=e,(n={}).preInstall=null,n.postInstall=null,r=n,i=function(e,t){if(!E(t))throw new Error("Handler must be a function.");r[e]=t},t.addHandler("appHook",(function(e){var n=e.stage,i=e.installationRequestId,o=e.err;return n===w?C(r[n],{}).then((function(e){return t.send("appHookResult",{stage:n,installationRequestId:i,result:e})})):n===m?C(r[n],void 0,o||null).then((function(){return t.send("appHookResult",{stage:n,installationRequestId:i})})):Promise.resolve()})),{setReady:function(){return t.call("callAppMethod","setReady")},isInstalled:function(){return t.call("callAppMethod","isInstalled")},getParameters:function(){return t.call("callAppMethod","getParameters")},getCurrentState:function(){return t.call("callAppMethod","getCurrentState")},onConfigure:function(e){i(w,e)},onConfigurationCompleted:function(e){i(m,e)}})};var t,n,r,i}],v);function b(e,t){var n,o,a,s,l,c,u=t.user,d=t.parameters,p=t.locales,h=t.ids,g=t.initialContentTypes,v=t.location||T.LOCATION_ENTRY_FIELD;return{location:{is:function(e){return v===e}},user:u,parameters:d,locales:{available:p.available,default:p.default,names:p.names,fallbacks:p.fallbacks,optional:p.optional,direction:p.direction},space:(s=e,l=g,c={},f.forEach((function(e){c[e]=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return s.call("callSpaceMethod",e,t)}})),c.getCachedContentTypes=function(){return function(e,t){for(var n=0,r=t.length,i=e.length;n<r;n++,i++)e[i]=t[n];return e}([],l)},c),dialogs:y(e,h),navigator:(n=e,o=h,a=new i,n.addHandler("navigateSlideIn",(function(e){a.dispatch(e)})),{openEntry:function(e,t){return n.call("navigateToContentEntity",r(r({},t),{entityType:"Entry",id:e}))},openNewEntry:function(e,t){return n.call("navigateToContentEntity",r(r({},t),{entityType:"Entry",id:null,contentTypeId:e}))},openBulkEditor:function(e,t){return n.call("navigateToBulkEditor",r({entryId:e},t))},openAsset:function(e,t){return n.call("navigateToContentEntity",r(r({},t),{entityType:"Asset",id:e}))},openNewAsset:function(e){return n.call("navigateToContentEntity",r(r({},e),{entityType:"Asset",id:null}))},openPageExtension:function(e){return n.call("navigateToPage",r({type:"extension",id:o.extension},e))},openCurrentAppPage:function(e){return n.call("navigateToPage",r({type:"app",id:o.app},e))},openAppConfig:function(){return n.call("navigateToAppConfig")},openEntriesList:function(){return n.call("navigateToSpaceEnvRoute",{route:"entries"})},openAssetsList:function(){return n.call("navigateToSpaceEnvRoute",{route:"assets"})},onSlideInNavigation:function(e){return a.attach(e)}}),notifier:{success:function(t){return e.send("notify",{type:"success",message:t})},error:function(t){return e.send("notify",{type:"error",message:t})}},ids:h,access:{can:function(t,n,r){return e.call("checkAccess",t,n,r)},canEditAppConfig:function(){return e.call("checkAppConfigAccess")}}}}function O(e,t,n){return{window:u(n,e)}}function S(e,t){return{editor:g(e,t.editorInterface)}}function D(e,t){var n=t.locales,r=t.contentType,i=t.entry,o=t.fieldInfo;return{contentType:r,entry:p(e,i,o,(function(t){return new c(e,t,n.default)}))}}var H,N,P,R,k,F,x,M=(H=window,N=function(e,t,n){return(L[t.location]||I).reduce((function(i,o){return r(r({},i),o(e,t,n))}),{})},(P={promise:null,resolve:null}).promise=new Promise((function(e){P.resolve=e})),(R=P).promise.then((function(e){var t=e[0],n=H.document;n.addEventListener("focus",(function(){return t.send("setActive",!0)}),!0),n.addEventListener("blur",(function(){return t.send("setActive",!1)}),!0)})),x=function(e,t){!function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];R.resolve(e)}(new s(e.id,k),e,t)},(F=k=H).addEventListener("message",(function e(t){var n=t.data;"connect"===n.method&&(F.removeEventListener("message",e),x.apply(void 0,n.params))})),function(e,t){var n=void 0===t?{supressIframeWarning:!1}:t,r=n.makeCustomApi;n.supressIframeWarning||H.self!==H.top||console.error("Cannot use ui-extension-sdk outside of Contenful:\n\nIn order for the ui-extension-sdk to function correctly, your app needs to be run in an iframe in the Contentful Web App.\n\nLearn more about local development with the ui-extension-sdk here:\n  https://www.contentful.com/developers/docs/extensibility/ui-extensions/faq/#how-can-i-use-the-ui-extension-sdk-locally"),R.promise.then((function(t){var n,i=t[0],o=t[1],a=t[2],s=N(i,o,H);"function"==typeof r&&(n=r(i,o)),a.forEach((function(e){i._handleMessage(e)})),e(s,n)}))});e.init=M,e.locations=T,Object.defineProperty(e,"__esModule",{value:!0})},"object"==typeof n?t(n):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).contentfulExtension={}),window.contentfulApp=window.contentfulExtension;let i={},o=0,a=0,s=0;async function l(e){return new Promise((t=>{setTimeout(t,e)}))}async function c(e,t){return await l(100),await e.updateEntry(t)}async function u(e,t,n){return await l(100),await e.createEntry(t,n)}async function d(e,t){if(t&&Array.isArray(t))return await Promise.all(t.map((async t=>await d(e,t))));t&&t.sys&&"Link"===t.sys.type&&"Entry"===t.sys.linkType&&await p(e,t.sys.id)}async function p(e,t){if(i[t])return;const n=await async function(e,t){return await l(100),await e.getEntry(t)}(e,t);o++,i[t]=n;for(let t in n.fields){const r=n.fields[t];for(let t in r){const n=r[t];await d(e,n)}}}async function f(e,t){if(e&&Array.isArray(e))return await Promise.all(e.map((async e=>await f(e,t))));if(e&&e.sys&&"Link"===e.sys.type&&"Entry"===e.sys.linkType){i[e.sys.id];const n=t[e.sys.id];e.sys.id=n.sys.id}}async function h(e,t,n){i={},o=0,a=0,s=0,r("Starting clone...");let l=null;r(""),r("Finding references recursively..."),l=setInterval((()=>{r(` - found ${o} entries so far...`)}),3e3),await p(e,t),clearInterval(l),r(` -- Found ${o} reference(s) in total`),r(""),r("Creating new entries..."),l=setInterval((()=>{r(` - created ${a}/${o} - ${Math.round(a/o*100)}%`)}),3e3);const d=await async function(e,t){const n={};for(let r in i){const o=i[r];o.fields.title&&o.fields.title["en-US"]&&(o.fields.title["en-US"]=o.fields.title["en-US"]+" "+t);const s=await u(e,o.sys.contentType.sys.id,{fields:o.fields});a++,n[r]=s}return n}(e,n);return clearInterval(l),r(` -- Created ${a} reference(s)`),r(""),r("Updating reference-tree..."),l=setInterval((()=>{r(` - updated ${s}/${o} - ${Math.round(s/o*100)}%`)}),3e3),await async function(e,t){for(let n in t){const r=t[n];for(let e in r.fields){const n=r.fields[e];for(let e in n){const r=n[e];await f(r,t)}}await c(e,r),s++}}(e,d),clearInterval(l),r(""),r("Updating done."),d[t]}let y=null,g=null,v=null,w="idle";const m=document.querySelector("button"),_=document.querySelector(".log-window");function E(e){_.innerHTML+=`<p>${e}</p>`,_.scrollTo(0,999999999)}n.init((e=>{y=e.space,g=e.entry,v=e,v.window.updateHeight&&v.window.updateHeight()})),window.addEventListener("deepcopylog",(e=>{E(e.detail.log)})),window.doTheDeepCopy=async function(){if("idle"!=w)return;w="cloning",m.classList.add("cf-is-loading"),m.disabled=!0,_.style.display="block";const e=document.querySelector(".clone-tag").value;v.window.updateHeight&&v.window.updateHeight();const t=g.getSys(),n=await h(y,t.id,e);E(""),E("<strong>Clone successful!<strong>"),E("New entry at:"),E(`<a target="_top" href="https://app.contentful.com/spaces/${t.space.sys.id}/entries/${n.sys.id}">https://app.contentful.com/spaces/${t.space.sys.id}/entries/${t.id}</a>`),m.classList.remove("cf-is-loading")},document.querySelector(".clone-tag").value=`(${(new Date).toUTCString()})`,window.toggleConfirmModal=function(e){document.querySelector(".confirm").style.display=e?"flex":"none"};
//# sourceMappingURL=index.dab342d3.js.map
