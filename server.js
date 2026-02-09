const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Merhaba Dunya! Burasi benim ilk Backend sunucum.');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde calismaya basladi!`);
});