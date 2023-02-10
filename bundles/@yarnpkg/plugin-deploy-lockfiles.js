/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-deploy-lockfiles",
factory: function (require) {
var plugin;(()=>{var e={299:e=>{const t="win32"===process.platform,n=t?"\\\\+":"\\/",r=t?"\\\\":"/",i=`((?:[^${r}]*(?:${r}|$))*)`,o=`([^${r}]*)`;e.exports=function(e,{extended:t=!1,globstar:r=!1,strict:s=!1,filepath:a=!1,flags:l=""}={}){let c="",f="",p={regex:"",segments:[]},g=!1,u=!1;const d=[];function w(e,{split:t,last:r,only:i}={}){"path"!==i&&(c+=e),a&&"regex"!==i&&(p.regex+="\\/"===e?n:e,t?(r&&(f+=e),""!==f&&(l.includes("g")||(f=`^${f}$`),p.segments.push(new RegExp(f,l))),f=""):f+=e)}let y,m;for(let n=0;n<e.length;n++)if(y=e[n],m=e[n+1],["\\","$","^",".","="].includes(y))w("\\"+y);else if("/"!==y)if("("!==y)if(")"!==y)if("|"!==y)if("+"!==y)if("@"===y&&t&&"("===m)d.push(y);else if("!"!==y)if("?"!==y)if("["!==y)if("]"!==y)if("{"!==y)if("}"!==y)if(","!==y)if("*"!==y)w(y);else{if("("===m&&t){d.push(y);continue}let s=e[n-1],a=1;for(;"*"===e[n+1];)a++,n++;let l=e[n+1];if(r){a>1&&("/"===s||void 0===s)&&("/"===l||void 0===l)?(w("((?:[^/]*(?:/|$))*)",{only:"regex"}),w(i,{only:"path",last:!0,split:!0}),n++):(w("([^/]*)",{only:"regex"}),w(o,{only:"path"}))}else w(".*")}else{if(g){w("|");continue}w("\\"+y)}else{if(t){g=!1,w(")");continue}w("\\"+y)}else{if(t){g=!0,w("(");continue}w("\\"+y)}else{if(t){u=!1,w(y);continue}w("\\"+y)}else{if(u&&":"===m){n++;let t="";for(;":"!==e[++n];)t+=e[n];"alnum"===t?w("(\\w|\\d)"):"space"===t?w("\\s"):"digit"===t&&w("\\d"),n++;continue}if(t){u=!0,w(y);continue}w("\\"+y)}else{if(t){"("===m?d.push(y):w(".");continue}w("\\"+y)}else{if(t){if(u){w("^");continue}if("("===m){d.push(y),w("(?!"),n++;continue}w("\\"+y);continue}w("\\"+y)}else{if("("===m&&t){d.push(y);continue}w("\\"+y)}else{if(d.length){w(y);continue}w("\\"+y)}else{if(d.length){w(y);let e=d.pop();w("@"===e?"{1}":"!"===e?"([^/]*)":e);continue}w("\\"+y)}else{if(d.length){w(y);continue}w("\\"+y)}else w("\\"+y,{split:!0}),"/"!==m||s||(c+="?");l.includes("g")||(c=`^${c}$`,f=`^${f}$`,a&&(p.regex=`^${p.regex}$`));const h={regex:new RegExp(c,l)};return a&&(p.segments.push(new RegExp(f,l)),p.regex=new RegExp(p.regex,l),p.globstar=new RegExp(l.includes("g")?i:`^${i}$`,l),h.path=p),h}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{default:()=>o});const e=require("@yarnpkg/core"),t=require("@yarnpkg/fslib");var i=n(299);const o={hooks:{afterAllInstalled:async(n,r)=>{const o=n.workspacesByCwd.get(n.configuration.startingCwd);await r.report.startTimerPromise(`Deployment lockfiles (${o.relativeCwd})`,()=>async function(n,r,o){const s=r.workspacesByCwd.get(r.configuration.startingCwd),a=await e.Cache.find(n,{immutable:!0}),l="."===s.relativeCwd?await async function(e){const t=e.workspacesByCwd.get(e.cwd).manifest.workspaceDefinitions.map(e=>i(e.pattern,{globstar:!0,extended:!0}).regex);return e.workspaces.filter(e=>t.some(t=>t.test(e.relativeCwd)))}(r):[s],c=new Set(l.map(e=>"workspace:"+e.relativeCwd));await Promise.all(l.map(async r=>{const i=t.ppath.join(r.cwd,"yarn.deploy.lock"),s=await async function(t,n,r,i){const{project:o,workspace:s}=await e.Project.find(t,n);o.workspaces=[s],await o.resolveEverything({cache:r,report:new e.ThrowReport});const a="workspace:"+s.relativeCwd;for(const e of o.originalPackages.values())e.reference!=a?i.has(e.reference)&&e.reference:e.reference="workspace:.";for(const e of o.storedDescriptors.values())e.range!=a||(e.range="workspace:.");return o.generateLockfile()}(n,r.cwd,a,c);let l=!1;if((await t.xfs.statPromise(i)).size!=s.length){l=(await t.xfs.readFilePromise(i)).toString()!==s}l?(await t.xfs.writeFilePromise(i,s),o.reportInfo(null,e.structUtils.stringifyIdent(r.locator)+" => "+`[32m${"Writing yarn.deploy.lock"}[0m`)):o.reportInfo(null,e.structUtils.stringifyIdent(r.locator)+" => "+(e=>`[30m${e}[0m`)("No change"))}))}(n.configuration,n,r.report))}}}})(),plugin=r})();
return plugin;
}
};