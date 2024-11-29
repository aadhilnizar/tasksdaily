const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'SecretcodeToCookies',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');

// In-memory storage for votes (you could use a database for persistence)
let votes = {
    'Fahad Fasil': 0,
    'Sunny Wayne': 0,
    'Antony Varghese Pepe': 0,
    'Dulqer Salman': 0,
    'Prithviraj Sukumaran': 0
};

app.get('/', (req, res) => {
    const iscookie = req.cookies.username;
    if (iscookie) {
        res.redirect('/result');
    } else {
        res.render('survey');
    }
});

app.post('/', (req, res) => {
    const selectedactor = req.body.actor;

    if (selectedactor) {
        // Increment the vote count for the selected actor
        votes[selectedactor]++;
        
        // Store the selected actor in session and set a cookie for later use
        req.session.usersession = selectedactor;
        res.cookie('username', selectedactor, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

        // Render the survey result page with vote counts and progress
        res.render('surveyresult', { selectedactor, votes });
    } else {
        res.send('No actor selected');
    }
});

app.get('/result', (req, res) => {
    const selectedactor = req.cookies.username;
    if (selectedactor) {
        // Send the vote counts to the result page
        res.render('surveyresult', { selectedactor, votes });
    } else {
        res.redirect('/');
    }
});
app.get('/logout',(req,res)=>{
    res.clearCookie('username');
    delete req.session;
    res.redirect('/')
})
app.listen(3000, () => {
    console.log('App Running on port 3000');
});
