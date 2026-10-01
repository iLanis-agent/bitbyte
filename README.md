# BitByte

Download time and required speed.

time = bytes x 8 / bits per second x (1 + overhead). Decimal units by default; a checkbox treats the size as Windows-style binary (1 GB = 1,073,741,824 bytes).
Overhead default 5% is an assumption (TCP/IP, TLS and retransmits typically 3-8%).

Tests: webcaretakers.com (50 MB at 100 Mbps = 4 s; 100 Mbps = 12.5 MB/s), omcalculator.com (1 Gbps = 125 MB/s; 1 GB = 8,000 Mb), downloadtimecalculator.net (1 GiB = 8,589,934,592 bits).
Assumes the link runs flat out the whole time.

Static client-side. `node test-engine.js` runs the tests.
