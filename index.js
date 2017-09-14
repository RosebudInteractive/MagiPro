let request = require('request');
function* idMaker() {
  // var index = 0;
  while(true) {
    var body = yield request('https://ponyfoo.com/articles/random', (err, res, body) => {
      console.log('================')
      // console.log(body)
      // if (err) {
      //   g.throw(err); return;
      // }
      // g.next(body);
    });
  }
}

var gen = idMaker();

console.log(gen.next().value); // 0
// console.log(gen.next().value); // 1
// console.log(gen.next().value); // 2

// let request = require('request');
// let hget = require('hget');
// let marked = require('marked');

// function getRandomPonyFooArticle (gen) {
//   console.log('started')
//   var g = gen();
//   g.next(); // Important! Otherwise stops execution on `var html = yield`.
  
//   request('https://ponyfoo.com/articles/random', (err, res, body) => {
//     console.log(body)
//     if (err) {
//       g.throw(err); return;
//     }
    
//     g.next(body);
//   });
// }

// getRandomPonyFooArticle(function* printRandomArticle () {
//   console.log('before?')
//   var html = yield;
//   console.log('started')
  
//   var md = hget(html, {
//     markdown: true,
//     root: 'main',
//     ignore: '.at-subscribe,.mm-comments,.de-sidebar'
//   });
  
//   var txt = marked(md, {
//     renderer: new marked.Renderer()
//   });
  
//   console.log(txt);
// });