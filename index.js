const path = process.cwd();

//External modules
const express = require('express');
const moment = require('moment-timezone');
const morgan = require('morgan');
const translate = require('@vitalets/google-translate-api');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8080;

// import language
const langs = require(path +'/language');

// set up app express
const app = express();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(process.cwd()));
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
  res.render('index', {
    ucapan: moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a').charAt(0).toUpperCase() + moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a').slice(1),
    language: langs,
    years: moment.tz('Asia/Jakarta').locale('id').format('yy'),
    layout: 'layouts/main'
  });
});
app.get('/tr', async function(req, res) {
  const { text, to } = req.query;
  if (!text || !to) return res.send('bakaaaa >//<');
  translate(text, { to }).then(response => {
    const getLearn = response.raw[1][0][0][5][0][4];
    if (getLearn == undefined) throw new Error('undefined error');
    let arr = new Array();
    let stats;
    for(let i = 0; i < getLearn.length; i++) {
      arr.push(getLearn[i][0]);
    }
    if (response.from.text.value !== '') {
      stats = '<hr>input kata: <i>'+ text +'</i><br>Artinya: <b>'+ response.text +'</b><br><br>Ada typo tuh harusnya tuh: <br>[ '+ (response.from.text.value).split('[')[1].split(']')[0] +' ] <br><hr><b><i>hadehhh capekkk😪😪</i></b><hr>';
    } else {
      stats = '<hr>input: <b>'+ text +'</b><br>Result: <b>'+ response.text +'</b><br><br>Result Others:<br>==========<br>'+ arr.join('<br>') +'<br>==========';
    }
    res.json({
      status: true,
      result: stats
    });
  }).catch(e => {
    console.error(e);
    res.json({
      status: false,
      msg: e
    });
  });
});

app.listen(port, function() {
  console.log('connected', port);
});