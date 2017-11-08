var publisher = { 
  subscribers: {
    any: [] // event type: subscribers 
  },
  subscribe: function (fn, type) {
    type = type || 'any';
    if (typeof this.subscribers[type] === "undefined") {
      this.subscribers[type] = []; 
    }
    this.subscribers[type].push(fn); 
  },
  unsubscribe: function (fn, type) {
    this.visitSubscribers('unsubscribe', fn, type); 
  },
  publish: function (publication, type) {
    this.visitSubscribers('publish', publication, type); 
  },
  visitSubscribers: function (action, arg, type) { 
    var pubtype = type || 'any',
    subscribers = this.subscribers[pubtype], i,
    max = subscribers.length;
    for (i = 0; i < max; i += 1) {
      if (action === 'publish') { 
          subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1); 
        }
      } 
    }
  } 
};

var paper = Object.create(publisher);
paper.daily = function() {
  this.publish("big news today");
};
paper.monthly = function () {
  this.publish("interesting analysis", "monthly");
};

var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read ' + paper); 
  },
  sundayPreNap: function (monthly) {
    console.log('About to fall asleep reading this ' + monthly); 
  }
};

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily(); 
paper.daily(); 
paper.daily(); 
paper.monthly();

var tmp = Object.create(publisher);
joe = Object.assign(joe, tmp);
joe.tweet = function (msg) {
  this.publish(msg); 
};
paper.readTweets = function (tweet) {
  alert('Call big meeting! Someone ' + tweet); 
};
joe.subscribe(paper.readTweets);
joe.tweet("hated the paper today");
