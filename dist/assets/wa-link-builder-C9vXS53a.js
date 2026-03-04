const r=t=>String(t||"").replace(/\D/g,""),a=t=>/%[0-9A-Fa-f]{2}/.test(t||""),u=t=>Array.from(String(t||"")).some(e=>e.charCodeAt(0)>127),p=["https://",["wa","me"].join("."),"/"].join(""),o="Источник:",c="Site: WhatsApp",s={source:"site",medium:"whatsapp",campaign:"site-general"},g=t=>{const e=String(t||"");if(!a(e)||u(e))return e;try{return decodeURIComponent(e.replace(/\+/g,"%20"))}catch{return e}},d=t=>{const e=g(t).replace(/\r\n/g,`
`).trim();if(!e)return`${o} ${c}
utm_source=${s.source}&utm_medium=${s.medium}&utm_campaign=${s.campaign}`;const i=[e];new RegExp(`${o}`,"i").test(e)||i.push("",`${o} ${c}`);const n=[];return/utm_source=/i.test(e)||n.push(`utm_source=${s.source}`),/utm_medium=/i.test(e)||n.push(`utm_medium=${s.medium}`),/utm_campaign=/i.test(e)||n.push(`utm_campaign=${s.campaign}`),n.length&&i.push(n.join("&")),i.join(`
`).replace(/\n{3,}/g,`

`).trim()},h=(t,e)=>{const i=r(t),n=d(e),m=encodeURIComponent(n);return`${p}${i}?text=${m}`};export{h as b};
