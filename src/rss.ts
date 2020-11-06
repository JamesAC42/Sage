let Parser = require('rss-parser');
let parser = new Parser();


(async () => {

  let feed = await parser.parseURL('https://www.reddit.com/.rss'); //desired website
  console.log(feed.title);

    
  feed.items.forEach((item:any) => {
    console.log(item.title + ':' + item.link)
  });


})();