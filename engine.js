(function (root) {
  'use strict';
  var DEC = { KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12 }, BIN = { KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 };
  var SPEED = { Kbps: 1e3, Mbps: 1e6, Gbps: 1e9 };
  // size in bytes; binary=true means the number shown by Windows (GiB labelled GB)
  function bytes(size, unit, binary) { return size * (binary ? BIN : DEC)[unit]; }
  function bps(speed, unit) { return speed * SPEED[unit]; }
  function mbpsToMBps(mbps) { return mbps / 8; }
  // seconds with protocol overhead as a fraction (0.05 = 5% more time)
  function seconds(nbytes, nbps, overhead) { return nbytes * 8 / nbps * (1 + (overhead || 0)); }
  // bits per second needed to move nbytes in sec seconds, allowing for overhead
  function neededBps(nbytes, sec, overhead) { return nbytes * 8 * (1 + (overhead || 0)) / sec; }
  function human(s) {
    if (s < 1) return 'under a second';
    var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = Math.round(s % 60), p = [];
    if (x === 60) { x = 0; m += 1; } if (m === 60) { m = 0; h += 1; } if (h === 24) { h = 0; d += 1; }
    if (d) p.push(d + 'd'); if (h) p.push(h + 'h'); if (m) p.push(m + 'm'); if (x && !d) p.push(x + 's');
    return p.join(' ') || '0s';
  }
  var api = { DEC: DEC, BIN: BIN, SPEED: SPEED, bytes: bytes, bps: bps, mbpsToMBps: mbpsToMBps, seconds: seconds, neededBps: neededBps, human: human };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Bits = api;
})(typeof window !== 'undefined' ? window : this);
