const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const KEY='qm_pro_v6_state';let type='payment';
const today=()=>new Date().toISOString().slice(0,10);const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(n)||0);const esc=v=>String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\\':'&#92;','"':'&quot;'}[m]));
const defaults={settings:{name:'SHANGRILAS BEACH RESORT',address:'Vijay Nagar, Swaraj Dweep, South Andaman - 744211, A & N Islands',phone:'9474252529',email:'shangrilasbeachresort@gmail.com',website:'www.shangrilasbeachresort.in',account:'Shangrilas Beach Resort',upi:'shangrilas@upi',bank:'HDFC Bank',branch:'',ac:'',ifsc:'',banner:'',signature:''},quotes:[]};
function loadState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return {...defaults,...x,settings:{...defaults.settings,...(x.settings||{})}}}catch{return defaults}}
let state=loadState();
const fields=['guest','agency','phone','email','quoteRef','bookingRef','checkin','checkout','room','occupancy','paymentDate','paymentAmount','paymentMode','transaction','paymentNote','balance','message'];
function lastQuote(){return state.draft||state.quotes?.[0]||null}
function loadFromQuote(q){if(!q)return;$('#guest').value=q.guest||'';$('#agency').value=q.agency||'';$('#phone').value=q.phone||'';$('#email').value=q.email||'';$('#quoteRef').value=q.ref||'';$('#bookingRef').value=q.ref||'';$('#checkin').value=q.checkin||today();$('#checkout').value=q.checkout||'';$('#room').value=(q.items||[]).map(i=>`${i.name} × ${i.qty} room(s)`).join(', ');$('#occupancy').value=`${q.adults||0} Adults, ${q.children||0} Children`;$('#balance').value='0';$('#message').value= type==='payment'?'We confirm receipt of the payment mentioned above. Thank you for your payment.':'Your booking is confirmed. We look forward to welcoming you to our resort.';render()}
function defaultsForm(){const q=lastQuote();if(q){loadFromQuote(q)}else{fields.forEach(k=>{const e=$('#'+k);if(e)e.value=''});$('#paymentDate').value=today();$('#checkin').value=today();$('#paymentMode').value='UPI';$('#message').value=type==='payment'?'We confirm receipt of the payment mentioned above. Thank you for your payment.':'Your booking is confirmed. We look forward to welcoming you to our resort.'}render()}
function data(){const d={};fields.forEach(k=>d[k]=$('#'+k)?.value||'');return d}
function quoteSummary(d){const s=state.settings;return `<div class="sheet"><div class="qtop"><div><div class="brandtitle">${esc(s.name)}</div><div class="small">${esc(s.address)}</div><div class="small">Phone: <span class="no-link">${esc(s.phone)}</span> &nbsp;|&nbsp; Email: <span class="no-link">${esc(s.email)}</span></div><div class="small">${s.gstin?`GSTIN: ${esc(s.gstin)}`:''}</div><div class="orange-line"></div></div><div class="refbox"><strong>${type==='payment'?'PAYMENT RECEIPT':'BOOKING CONFIRMATION'}</strong><span class="badge">${type==='payment'?'PAYMENT RECEIVED':'BOOKING CONFIRMED'}</span><br>Ref: ${esc(d.bookingRef||d.quoteRef||'—')}<br>Date: ${esc(d.paymentDate||today())}</div></div><div class="grid2"><div class="box"><div class="boxtitle">PREPARED FOR</div><div class="body"><b>${esc(d.guest||'—')}</b><br>Phone: <span class="no-link">${esc(d.phone||'—')}</span><br>Email: <span class="no-link">${esc(d.email||'—')}</span><br>Agency: ${esc(d.agency||'—')}</div></div><div class="box"><div class="boxtitle">STAY DETAILS</div><div class="body">Check-in: <b>${esc(d.checkin||'—')}</b><br>Check-out: <b>${esc(d.checkout||'—')}</b><br>Occupancy: ${esc(d.occupancy||'—')}<br>Room / Stay: ${esc(d.room||'—')}</div></div></div><div class="highlight"><div class="label">${type==='payment'?'PAYMENT RECEIVED':'BOOKING CONFIRMED'}</div><div class="big">${type==='payment'?money(d.paymentAmount):'Your reservation is confirmed'}</div>${type==='payment'?`<div class="small">Payment Mode: ${esc(d.paymentMode||'—')} &nbsp; | &nbsp; Transaction / UTR: ${esc(d.transaction||'—')}</div>`:`<div class="small">Quotation Ref: ${esc(d.quoteRef||'—')} &nbsp; | &nbsp; Booking Ref: ${esc(d.bookingRef||'—')}</div>`}</div><div class="rows"><div class="row"><span>${type==='payment'?'Payment Date':'Confirmation Date'}</span><strong>${esc(d.paymentDate||today())}</strong></div><div class="row"><span>Payment Mode</span><strong>${esc(d.paymentMode||'—')}</strong></div><div class="row"><span>${type==='payment'?'Balance Due':'Balance Payable'}</span><strong>${money(d.balance)}</strong></div>${d.paymentNote?`<div class="row"><span>Note</span><strong>${esc(d.paymentNote)}</strong></div>`:''}</div>${s.banner?`<img class="banner" src="${s.banner}" alt="Promo Banner">`:''}<div class="message">${esc(d.message||'')}</div>${s.signature?`<img class="signature" src="${s.signature}" alt="Authorized Signature">`:''}<div class="footer">Thank you for choosing ${esc(s.name)}<br>Phone: <span class="no-link">${esc(s.phone)}</span> &nbsp;|&nbsp; Email: <span class="no-link">${esc(s.email)}</span> &nbsp;|&nbsp; <span class="no-link">${esc(s.website)}</span></div></div>`}
function render(){const d=data();$('#document').innerHTML=quoteSummary(d);requestAnimationFrame(fitTemplatePreview)}
function emailDocument(d){
  const s=state.settings||{};
  const esc2=esc;
  const cell='border:1px solid #c6d0dc;border-radius:8px;padding:0;vertical-align:top;overflow:hidden;';
  const title='background:#f8fafc;border-bottom:1px solid #c6d0dc;padding:9px 11px;font-size:11px;font-weight:800;line-height:14px;';
  const body='padding:10px 11px;font-size:11px;line-height:18px;overflow-wrap:anywhere;word-break:break-word;';
  const row='border-top:1px solid #e3e7ed;padding:9px 11px;font-size:11px;line-height:16px;';
  const html=`<div style="width:100%;margin:0;padding:0;background:#ffffff;color:#111827;font-family:Arial,Helvetica,sans-serif;">
    <style>
      @media screen and (max-width:600px){
        .tm-outer{padding:8px!important}
        .tm-card{width:100%!important;max-width:100%!important;border-radius:8px!important;padding:12px!important}
        .tm-head,.tm-info{width:100%!important;table-layout:auto!important}
        .tm-head td,.tm-info td{display:block!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important}
        .tm-brand{padding:0 0 10px 0!important;border-bottom:0!important}
        .tm-ref{margin-top:8px!important;padding:10px!important}
        .tm-info{border-spacing:0!important;width:100%!important;margin-left:0!important}
        .tm-info td{padding:0!important}
        .tm-info td+td{padding-top:9px!important}
        .tm-box{margin-top:9px!important}
        .tm-value{font-size:18px!important;line-height:22px!important}
        .tm-row-label,.tm-row-value{display:block!important;width:100%!important;float:none!important;text-align:left!important}
        .tm-row-value{margin-top:3px!important}
        .tm-banner{max-height:none!important;height:auto!important}
        .tm-footer{text-align:center!important}
      }
    </style>
    <div class="tm-outer" style="width:100%;box-sizing:border-box;margin:0;padding:10px;background:#ffffff;">
      <div class="tm-card" style="width:100%;max-width:680px;margin:0 auto;border:1px solid #bfc8d5;border-radius:10px;background:#ffffff;padding:18px;box-sizing:border-box;">
        <table class="tm-head" role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;table-layout:fixed;">
          <tr>
            <td class="tm-brand" valign="top" style="vertical-align:top;padding:0 12px 10px 0;border-bottom:1px solid #0b1d41;">
              <div style="font-size:18px;font-weight:800;line-height:22px;overflow-wrap:anywhere;word-break:break-word;">${esc2(s.name)}</div>
              <div style="font-size:10px;line-height:15px;margin-top:3px;overflow-wrap:anywhere;word-break:break-word;">${esc2(s.address)}</div>
              <div style="font-size:10px;line-height:15px;overflow-wrap:anywhere;word-break:break-word;">Phone: <span style="color:#111827!important;text-decoration:none!important;">${esc2(s.phone)}</span> &nbsp;|&nbsp; Email: <span style="color:#111827!important;text-decoration:none!important;">${esc2(s.email)}</span></div>
              ${s.gstin?`<div style="font-size:10px;line-height:15px;">GSTIN: ${esc2(s.gstin)}</div>`:''}
              <div style="height:3px;background:#f97316;margin-top:8px;border-radius:2px;"></div>
            </td>
            <td class="tm-ref" valign="top" style="width:185px;vertical-align:top;padding:9px;border:1px solid #c6d0dc;border-radius:8px;font-size:10px;line-height:15px;overflow-wrap:anywhere;word-break:break-word;">
              <div style="font-size:12px;font-weight:800;line-height:15px;">${type==='payment'?'PAYMENT RECEIPT':'BOOKING CONFIRMATION'}</div>
              <div style="display:inline-block;background:#f97316;color:#ffffff;border-radius:12px;padding:4px 8px;font-size:9px;font-weight:800;margin:5px 0;">${type==='payment'?'PAYMENT RECEIVED':'BOOKING CONFIRMED'}</div><br>
              Ref: ${esc2(d.bookingRef||d.quoteRef||'—')}<br>Date: ${esc2(d.paymentDate||today())}
            </td>
          </tr>
        </table>

        <table class="tm-info" role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:8px 9px;width:calc(100% + 16px);margin-left:-8px;table-layout:fixed;">
          <tr>
            <td class="tm-info-cell" width="50%" style="width:50%;${cell}"><div style="${title}">PREPARED FOR</div><div style="${body}"><strong>${esc2(d.guest||'—')}</strong><br>Phone: ${esc2(d.phone||'—')}<br>Email: ${esc2(d.email||'—')}<br>Agency: ${esc2(d.agency||'—')}</div></td>
            <td class="tm-info-cell" width="50%" style="width:50%;${cell}"><div style="${title}">STAY DETAILS</div><div style="${body}">Check-in: <strong>${esc2(d.checkin||'—')}</strong><br>Check-out: <strong>${esc2(d.checkout||'—')}</strong><br>Occupancy: ${esc2(d.occupancy||'—')}<br>Room / Stay: ${esc2(d.room||'—')}</div></td>
          </tr>
        </table>

        <div class="tm-box" style="margin-top:9px;background:#f8fafc;border:1px solid #c6d0dc;border-radius:8px;padding:13px;box-sizing:border-box;">
          <div style="font-size:10px;font-weight:800;color:#667085;">${type==='payment'?'PAYMENT RECEIVED':'BOOKING CONFIRMED'}</div>
          <div class="tm-value" style="font-size:20px;font-weight:800;line-height:24px;color:#0b1d41;margin-top:3px;overflow-wrap:anywhere;">${type==='payment'?money(d.paymentAmount):'Your reservation is confirmed'}</div>
          ${type==='payment'?`<div style="font-size:10px;line-height:15px;margin-top:3px;overflow-wrap:anywhere;">Payment Mode: ${esc2(d.paymentMode||'—')} &nbsp; | &nbsp; Transaction / UTR: ${esc2(d.transaction||'—')}</div>`:`<div style="font-size:10px;line-height:15px;margin-top:3px;overflow-wrap:anywhere;">Quotation Ref: ${esc2(d.quoteRef||'—')} &nbsp; | &nbsp; Booking Ref: ${esc2(d.bookingRef||'—')}</div>`}
        </div>

        <div class="tm-box" style="margin-top:9px;border:1px solid #c6d0dc;border-radius:8px;overflow:hidden;">
          <div style="${row.replace('border-top:','border-top:0;')}"><span class="tm-row-label">${type==='payment'?'Payment Date':'Confirmation Date'}</span><span class="tm-row-value" style="float:right;font-weight:700;text-align:right;">${esc2(d.paymentDate||today())}</span></div>
          <div style="${row}"><span class="tm-row-label">Payment Mode</span><span class="tm-row-value" style="float:right;font-weight:700;text-align:right;">${esc2(d.paymentMode||'—')}</span></div>
          <div style="${row}"><span class="tm-row-label">${type==='payment'?'Balance Due':'Balance Payable'}</span><span class="tm-row-value" style="float:right;font-weight:700;text-align:right;">${money(d.balance)}</span></div>
          ${d.paymentNote?`<div style="${row}"><span class="tm-row-label">Note</span><span class="tm-row-value" style="float:right;font-weight:700;text-align:right;max-width:65%;">${esc2(d.paymentNote)}</span></div>`:''}
        </div>

        ${s.banner?`<div class="tm-box" style="margin-top:9px;border:1px solid #c6d0dc;border-radius:8px;overflow:hidden;"><img class="tm-banner" src="${s.banner}" alt="Promo Banner" style="display:block;width:100%;max-width:100%;height:auto;border:0;"></div>`:''}
        <div class="tm-box" style="margin-top:9px;border:1px solid #c6d0dc;border-radius:8px;padding:11px;font-size:11px;line-height:18px;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${esc2(d.message||'')}</div>
        ${s.signature?`<div style="text-align:right;margin-top:8px;"><img src="${s.signature}" alt="Authorized Signature" style="display:inline-block;max-width:150px;max-height:55px;height:auto;"></div>`:''}
        <div class="tm-footer" style="border-top:1px solid #c6d0dc;margin-top:10px;padding-top:8px;text-align:right;font-size:9px;line-height:14px;overflow-wrap:anywhere;">Thank you for choosing ${esc2(s.name)}<br>Phone: ${esc2(s.phone)} &nbsp;|&nbsp; Email: ${esc2(s.email)} &nbsp;|&nbsp; ${esc2(s.website)}</div>
      </div>
    </div>
  </div>`;
  return html;
}
function htmlForEmail(){const d=data();return `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff;">${emailDocument(d)}</body></html>`}
async function copyEmail(){const html=htmlForEmail();try{if(navigator.clipboard?.write&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([document.querySelector('#document').innerText],{type:'text/plain'})})])}else{throw new Error('rich clipboard unavailable')}}catch{const holder=document.createElement('div');holder.contentEditable='true';holder.style.position='fixed';holder.style.left='-99999px';holder.style.top='0';holder.innerHTML=emailDocument(data());document.body.appendChild(holder);const range=document.createRange();range.selectNodeContents(holder);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);document.execCommand('copy');sel.removeAllRanges();holder.remove()}alert('Template copied. Paste it into Gmail/Outlook.')}
function setType(next){type=next;$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.template===type));$('#formTitle').textContent=type==='payment'?'Payment Received':'Booking Confirmed';defaultsForm()}
function fitTemplatePreview(){const host=$('#document');const sheet=host?.querySelector('.sheet');if(!host||!sheet)return;const baseW=794,baseH=1123;const available=Math.max(250,host.clientWidth-10);const scale=Math.min(1,available/baseW);sheet.style.transform=`scale(${scale})`;sheet.style.transformOrigin='top center';host.style.height=`${baseH*scale}px`;host.style.width='100%';}
function initTemplateType(){const requested=new URLSearchParams(location.search).get('template');setType(requested==='booking'||requested==='confirmed'?'confirmed':'payment');}
$$('.tab').forEach(b=>b.onclick=()=>setType(b.dataset.template));fields.forEach(k=>$('#'+k)?.addEventListener('input',render));$('#loadLast').onclick=()=>loadFromQuote(lastQuote());$('#copyEmail').onclick=copyEmail;$('#print').onclick=()=>window.print();$('#reset').onclick=defaultsForm;initTemplateType();window.addEventListener('resize',fitTemplatePreview);new ResizeObserver(fitTemplatePreview).observe($('#document'));
