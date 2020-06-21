const express = require('express');
const path = require('path');
const app = express();
const expressStaticGzip = require('express-static-gzip');

app.use("/", expressStaticGzip(path.join(__dirname, 'build_gzip')));

app.listen(3000);