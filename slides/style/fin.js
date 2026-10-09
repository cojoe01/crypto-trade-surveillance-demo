/* Shared helpers for the trade surveillance deck. Needs eweb.js. */
(function(){
  const FIN = window.FIN = {};
  const SYMS = ['BTC-USD', 'ETH-USD', 'SOL-USD', 'XRP-USD', 'USDC-USD', 'DOGE-USD', 'AVAX-USD', 'LINK-USD', 'ADA-USD', 'DOT-USD'];
  // Ticker tape: symbols and direction only, no invented prices.
  FIN.ticker = function(parent){
    const d = document.createElement('div'); d.className = 'tape';
    const row = SYMS.map((s, i) => { const dn = [1, 4, 7].includes(i); return `<span><b>${s}</b><i class="${dn ? 'dn' : 'up'}">${dn ? '▼' : '▲'}</i></span>`; }).join('');
    d.innerHTML = `<div class="tape-in">${row}${row}</div>`; (parent || document.body).appendChild(d); return d;
  };
  // Order-flow bars in an iso scene, descending so every top stays visible. c = [_, height, _, _, up]
  FIN.CANDLES = [[0, 140, 0, 0, 1], [0, 118, 0, 0, 1], [0, 108, 0, 0, 0], [0, 94, 0, 0, 1], [0, 80, 0, 0, 0], [0, 66, 0, 0, 1], [0, 48, 0, 0, 1]];
  FIN.RED = {top: '#FFFFFF', left: '#E0352B', right: '#A8231B'};
  FIN.candles = function(sc, o){
    o = Object.assign({x0: 14, step: 36, y: 168, w: 26, d: 84, z: 46, delay: .5, gap: .07, k: .9, data: FIN.CANDLES}, o);
    o.data.forEach(([lo, hi, wl, wh, up], i) => {
      const x = o.x0 + i * o.step, dl = o.delay + i * o.gap, h = hi * o.k;
      sc.box({x, y: o.y, w: o.w, d: o.d, h, z: o.z, c: up ? 'teal' : 'orange', stroke: false, delay: dl, drop: 80, order: 2});
      sc.box({x: x + (o.w - 4) / 2, y: o.y + (o.d - 4) / 2, w: 4, d: 4, h: 14, z: o.z + h, c: 'slate', stroke: false, delay: dl + .1, drop: 40, order: 3});
    });
  };
  // Seeded random walk for sparklines / price lines: returns array of y in [0,1].
  FIN.walk = function(n, seed, drift){
    const R = EW.rand(seed || 5); let v = .5; const out = [];
    for (let i = 0; i < n; i++){ v += (R() - .5 + (drift || 0)) * .16; v = Math.min(.95, Math.max(.05, v)); out.push(v); }
    return out;
  };
  // Custom light-on-dark footer for the single dark slide.
  FIN.darkFoot = function(tag){
    const d = document.createElement('div'); d.className = 'ew-foot'; d.style.color = '#7C8BB5';
    d.innerHTML = `<span class="lg" style="color:#fff;gap:8px"><span style="width:24px;height:24px;display:block">${EW.MARK}</span>elastic</span><span>${tag}</span>`;
    document.body.appendChild(d);
  };
})();
