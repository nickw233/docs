import{f as r}from"./chartEditStore-eacdd3b3.js";import{di as m}from"./index-3cca530d.js";const c={},i={echarts:m},f=n=>{if(!n.events)return{};const e={};for(const t in n.events.baseEvent){const o=n.events.baseEvent[t];o&&(e[t]=a(o))}const s=n.events.advancedEvents||{},E={[r.VNODE_BEFORE_MOUNT](t){c[n.id]=t.component;const o=(s[r.VNODE_BEFORE_MOUNT]||"").trim();u(o,t)},[r.VNODE_MOUNTED](t){const o=(s[r.VNODE_MOUNTED]||"").trim();u(o,t)}};return{...e,...E}};function a(n){try{return new Function(`
      return (
        async function(components,mouseEvent){
          ${n}
        }
      )`)().bind(void 0,c)}catch(e){console.error(e)}}function u(n,e){try{Function(`
      "use strict";
      return (
        async function(e, components, node_modules){
          const {${Object.keys(i).join()}} = node_modules;
          ${n}
        }
      )`)().bind(e?.component)(e,c,i)}catch(s){console.error(s)}}export{i as n,f as u};
