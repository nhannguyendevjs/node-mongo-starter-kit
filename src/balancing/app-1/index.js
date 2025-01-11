const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hey Buddy! Your request is processed by Server 1\n'));
app.listen(3000, () => console.log('Server is running on port 3000!'));
