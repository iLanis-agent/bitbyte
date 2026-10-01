var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// webcaretakers.com: 50 MB at 100 Mbps = 400 million bits -> 4 s; 100 MB at 100 Mbps -> 8 s on the wire; 100 Mbps = 12.5 MB/s
eq(E.seconds(E.bytes(50, 'MB'), E.bps(100, 'Mbps')), 4, '50MB'); eq(E.seconds(E.bytes(100, 'MB'), E.bps(100, 'Mbps')), 8, '100MB'); eq(E.mbpsToMBps(100), 12.5, '12.5 MB/s');
// omcalculator.com: 1 Gbps = 125 MB/s; 1 GB = 8,000 Mb; 1 MB/s = 8 Mbps
eq(E.mbpsToMBps(1000), 125, '1 Gbps'); eq(E.bytes(1, 'GB') * 8 / 1e6, 8000, '1GB in Mb'); eq(E.mbpsToMBps(8), 1, '1 MB/s');
// 5% overhead (3 to 8 percent range per webcaretakers): 8 s becomes 8.4 s
eq(E.seconds(E.bytes(100, 'MB'), E.bps(100, 'Mbps'), 0.05), 8.4, 'overhead');
// Windows binary: 1 GB shown by Windows = 1,073,741,824 bytes = 1.0737 x decimal; downloadtimecalculator.net 1 GB = 8,589,934,592 bits
eq(E.bytes(1, 'GB', true), 1073741824, 'GiB'); eq(E.bytes(1, 'GB', true) * 8, 8589934592, 'bits'); eq(E.bytes(1, 'GB', true) / E.bytes(1, 'GB'), 1.0737, 'factor', 1e-4);
// 90 GB game on 100 Mbps decimal: 7200 s = 2 h; with 5% = 2h 6m
eq(E.seconds(E.bytes(90, 'GB'), E.bps(100, 'Mbps')), 7200, '90GB'); is(E.human(7200), '2h', 'h2'); is(E.human(7560), '2h 6m', 'h3');
// needed speed: 90 GB in 1 hour without overhead = 200 Mbps
eq(E.neededBps(E.bytes(90, 'GB'), 3600) / 1e6, 200, 'needed'); eq(E.neededBps(E.bytes(90, 'GB'), 3600, 0.05) / 1e6, 210, 'needed + 5%', 1e-9);
// human
is(E.human(0.4), 'under a second', 'u'); is(E.human(59.6), '1m', 'round up'); is(E.human(3661), '1h 1m 1s', 'hms'); is(E.human(90000), '1d 1h', 'day');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
