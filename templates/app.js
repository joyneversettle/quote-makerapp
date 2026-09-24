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
  const safeText=v=>esc2(v||'—');
  // Keep contact text black and prevent Gmail/mobile clients from auto-linking it.
  const safePhone=v=>esc2(v||'—').replace(/(\d{4})(?=\d)/g,'$1&#8203;');
  const safeEmail=v=>esc2(v||'—').replace(/@/g,'&#8203;@').replace(/\./g,'&#8203;.');
  const safeWeb=v=>esc2(v||'—').replace(/\./g,'&#8203;.');
  const box='border:1px solid #c6d0dc;border-radius:9px;background:#ffffff;overflow:hidden;';
  const title='background:#f8fafc;border-bottom:1px solid #c6d0dc;padding:10px 12px;font-size:11px;font-weight:800;line-height:15px;color:#111827;';
  const body='padding:11px 12px;font-size:11px;line-height:18px;color:#111827;overflow-wrap:anywhere;word-break:break-word;';
  const row='padding:10px 12px;border-top:1px solid #e3e7ed;font-size:11px;line-height:16px;color:#111827;';
  const contact=`<span style="color:#000000!important;text-decoration:none!important;-webkit-text-decoration:none!important;-webkit-text-fill-color:#000000!important;">`;
  return `<div style="width:100%;margin:0;padding:0;background:#ffffff;color:#111827;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:100%;box-sizing:border-box;margin:0 auto;padding:10px;background:#ffffff;">
      <div style="width:100%;max-width:680px;margin:0 auto;border:1px solid #bfc8d5;border-radius:10px;background:#ffffff;padding:16px;box-sizing:border-box;">

        <!-- Header: deliberately single-column for reliable Gmail/Outlook/mobile rendering -->
        <div style="width:100%;box-sizing:border-box;border:1px solid #c6d0dc;border-radius:9px;padding:12px;background:#ffffff;text-align:center;">
          <div style="font-size:19px;font-weight:800;line-height:24px;color:#111827;text-align:center;overflow-wrap:anywhere;word-break:break-word;">${esc2(s.name)}</div>
          <div style="font-size:10px;line-height:15px;margin-top:3px;color:#111827;text-align:center;overflow-wrap:anywhere;word-break:break-word;">${esc2(s.address)}</div>
          <div style="font-size:10px;line-height:15px;color:#000000;text-align:center;overflow-wrap:anywhere;word-break:break-word;">
            Phone: ${contact}${safePhone(s.phone)}</span>
            <span style="color:#000000;">&nbsp; | &nbsp;</span>
            Email: ${contact}${safeEmail(s.email)}</span>
          </div>
          ${s.gstin?`<div style="font-size:10px;line-height:15px;color:#111827;text-align:center;">GSTIN: ${esc2(s.gstin)}</div>`:''}
          <div style="height:3px;background:#f97316;margin:8px auto 0;border-radius:2px;max-width:240px;"></div>
        </div>

        <div style="height:9px;line-height:9px;font-size:1px;">&nbsp;</div>

        <!-- Receipt / confirmation reference -->
        <div style="${box}">
          <div style="${title}">${type==='payment'?'PAYMENT RECEIPT':'BOOKING CONFIRMATION'}</div>
          <div style="padding:11px 12px;font-size:11px;line-height:17px;color:#111827;overflow-wrap:anywhere;word-break:break-word;">
            <span style="display:inline-block;background:#f97316;color:#ffffff;border-radius:14px;padding:5px 9px;font-size:9px;font-weight:800;line-height:11px;margin-bottom:7px;">${type==='payment'?'PAYMENT RECEIVED':'BOOKING CONFIRMED'}</span><br>
            Ref: ${safeText(d.bookingRef||d.quoteRef)}<br>
            Date: ${safeText(d.paymentDate||today())}
          </div>
        </div>

        <div style="height:9px;line-height:9px;font-size:1px;">&nbsp;</div>

        <!-- Prepared for -->
        <div style="${box}">
          <div style="${title}">PREPARED FOR</div>
          <div style="${body}">
            <strong style="font-size:12px;">${safeText(d.guest)}</strong><br>
            Phone: ${contact}${safePhone(d.phone)}</span><br>
            Email: ${contact}${safeEmail(d.email)}</span><br>
            Agency: ${safeText(d.agency)}
          </div>
        </div>

        <div style="height:9px;line-height:9px;font-size:1px;">&nbsp;</div>

        <!-- Stay details -->
        <div style="${box}">
          <div style="${title}">STAY DETAILS</div>
          <div style="${body}">
            Check-in: <strong>${safeText(d.checkin)}</strong><br>
            Check-out: <strong>${safeText(d.checkout)}</strong><br>
            Occupancy: ${safeText(d.occupancy)}<br>
            Room / Stay: ${safeText(d.room)}
          </div>
        </div>

        <div style="height:9px;line-height:9px;font-size:1px;">&nbsp;</div>

        <!-- Main status / amount -->
        <div style="border:1px solid #c6d0dc;border-radius:9px;background:#f8fafc;padding:13px;box-sizing:border-box;">
          <div style="font-size:10px;font-weight:800;color:#667085;line-height:14px;">${type==='payment'?'PAYMENT RECEIVED':'BOOKING CONFIRMED'}</div>
          <div style="font-size:20px;font-weight:800;line-height:25px;color:#0b1d41;margin-top:3px;overflow-wrap:anywhere;word-break:break-word;">${type==='payment'?money(d.paymentAmount):'Your reservation is confirmed'}</div>
          ${type==='payment'
            ? `<div style="font-size:11px;line-height:17px;margin-top:4px;color:#111827;overflow-wrap:anywhere;word-break:break-word;">Payment Mode: ${safeText(d.paymentMode)}<br>Transaction / UTR: ${safeText(d.transaction)}</div>`
            : `<div style="font-size:11px;line-height:17px;margin-top:4px;color:#111827;overflow-wrap:anywhere;word-break:break-word;">Quotation Ref: ${safeText(d.quoteRef)}<br>Booking Ref: ${safeText(d.bookingRef)}</div>`}
        </div>

        <div style="height:9px;line-height:9px;font-size:1px;">&nbsp;</div>

        <!-- Detail rows -->
        <div style="${box}">
          <div style="${row}border-top:0;">
            <div style="font-weight:500;">${type==='payment'?'Payment Date':'Confirmation Date'}</div>
            <div style="font-weight:700;margin-top:3px;">${safeText(d.paymentDate||today())}</div>
          </div>
          <div style="${row}">
            <div style="font-weight:500;">Payment Mode</div>
            <div style="font-weight:700;margin-top:3px;">${safeText(d.paymentMode)}</div>
          </div>
          <div style="${row}">
            <div style="font-weight:500;">${type==='payment'?'Balance Due':'Balance Payable'}</div>
            <div style="font-weight:700;margin-top:3px;">${money(d.balance)}</div>
          </div>
          ${d.paymentNote?`<div style="${row}"><div style="font-weight:500;">Note</div><div style="font-weight:700;margin-top:3px;overflow-wrap:anywhere;word-break:break-word;">${safeText(d.paymentNote)}</div></div>`:''}
        </div>

        ${s.banner?`<div style="margin-top:9px;border:1px solid #c6d0dc;border-radius:9px;overflow:hidden;"><img src="${s.banner}" alt="Promo Banner" style="display:block;width:100%;max-width:100%;height:auto;border:0;"></div>`:''}

        <div style="margin-top:9px;border:1px solid #c6d0dc;border-radius:9px;padding:12px;font-size:11px;line-height:18px;color:#111827;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${esc2(d.message||'')}</div>

        ${s.signature?`<div style="text-align:right;margin-top:9px;"><img src="${s.signature}" alt="Authorized Signature" style="display:inline-block;max-width:150px;max-height:55px;height:auto;"></div>`:''}

        <div style="border-top:1px solid #c6d0dc;margin-top:10px;padding-top:9px;text-align:center;font-size:9px;line-height:15px;color:#111827;overflow-wrap:anywhere;word-break:break-word;">
          Thank you for choosing ${esc2(s.name)}<br>
          Phone: ${contact}${safePhone(s.phone)}</span>
          <span style="color:#667085;">&nbsp; | &nbsp;</span>
          Email: ${contact}${safeEmail(s.email)}</span><br>
          ${contact}${safeWeb(s.website)}</span>
        </div>
      </div>
    </div>
  </div>`;
}
function htmlForEmail(){const d=data();return `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff;">${emailDocument(d)}</body></html>`}
async function copyEmail(){const html=htmlForEmail();try{if(navigator.clipboard?.write&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([document.querySelector('#document').innerText],{type:'text/plain'})})])}else{throw new Error('rich clipboard unavailable')}}catch{const holder=document.createElement('div');holder.contentEditable='true';holder.style.position='fixed';holder.style.left='-99999px';holder.style.top='0';holder.innerHTML=emailDocument(data());document.body.appendChild(holder);const range=document.createRange();range.selectNodeContents(holder);const sel=getSelection();sel.removeAllRanges();sel.addRange(range);document.execCommand('copy');sel.removeAllRanges();holder.remove()}alert('Template copied. Paste it into Gmail/Outlook.')}
function setType(next){type=next;$$('.tab').forEach(b=>b.classList.toggle('active',b.dataset.template===type));$('#formTitle').textContent=type==='payment'?'Payment Received':'Booking Confirmed';defaultsForm()}
function fitTemplatePreview(){const host=$('#document');const sheet=host?.querySelector('.sheet');if(!host||!sheet)return;const baseW=794,baseH=1123;const available=Math.max(250,host.clientWidth-10);const scale=Math.min(1,available/baseW);sheet.style.transform=`scale(${scale})`;sheet.style.transformOrigin='top center';host.style.height=`${baseH*scale}px`;host.style.width='100%';}
function initTemplateType(){const requested=new URLSearchParams(location.search).get('template');setType(requested==='booking'||requested==='confirmed'?'confirmed':'payment');}
$$('.tab').forEach(b=>b.onclick=()=>setType(b.dataset.template));fields.forEach(k=>$('#'+k)?.addEventListener('input',render));$('#loadLast').onclick=()=>loadFromQuote(lastQuote());$('#copyEmail').onclick=copyEmail;$('#print').onclick=()=>window.print();$('#reset').onclick=defaultsForm;initTemplateType();window.addEventListener('resize',fitTemplatePreview);new ResizeObserver(fitTemplatePreview).observe($('#document'));
