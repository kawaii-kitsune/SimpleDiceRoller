const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/public', express.static(path.join(__dirname, '/public/dice.svg/icons/000000/transparent/1x1')));
app.use(express.static(path.join(__dirname, '/')));
// Route to serve the HTML file
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
