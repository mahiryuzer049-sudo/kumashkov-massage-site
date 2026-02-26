const r=t=>String(t||"").replace(/\D/g,""),a=t=>/%[0-9A-Fa-f]{2}/.test(t||""),u=t=>Array.from(String(t||"")).some(e=>e.charCodeAt(0)>127),o="Источник:",c="Site: WhatsApp",s={source:"site",medium:"whatsapp",campaign:"site-general"},p=t=>{const e=String(t||"");if(!a(e)||u(e))return e;try{return decodeURIComponent(e.replace(/\+/g,"%20"))}catch{return e}},g=t=>{const e=p(t).replace(/\r\n/g,`
`).trim();if(!e)return`${o} ${c}
utm_source=${s.source}&utm_medium=${s.medium}&utm_campaign=${s.campaign}`;const i=[e];new RegExp(`${o}`,"i").test(e)||i.push("",`${o} ${c}`);const n=[];return/utm_source=/i.test(e)||n.push(`utm_source=${s.source}`),/utm_medium=/i.test(e)||n.push(`utm_medium=${s.medium}`),/utm_campaign=/i.test(e)||n.push(`utm_campaign=${s.campaign}`),n.length&&i.push(n.join("&")),i.join(`
`).replace(/\n{3,}/g,`

`).trim()},d=(t,e)=>{const i=r(t),n=g(e),m=encodeURIComponent(n);return`https://wa.me/${i}?text=${m}`};export{d as b};
