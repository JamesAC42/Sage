//usng RSS with custom fields
let p = new Parser({
    customFields: {
      feed: ['otherTitle', 'extendedDescription'],
      item: ['coAuthor','subtitle'],
    }
  });
  
  p.parseURL('https://www.reddit.com/.rss', function(err:any, feed:any) {
    console.log(feed.extendedDescription);
  
    feed.items.forEach(function(entry: any) {
      console.log(entry.coAuthor + ':' + entry.subtitle);
    })
  })