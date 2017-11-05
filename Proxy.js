var proxy = { 
  ids: [],
  delay: 50,
  timeout: null,
  callback: null,
  context: null,
  makeRequest: function (id, callback, context) {

    // add to the queue 
    this.ids.push(id);
    this.callback = callback; 
    this.context = context;

    // set up timeout 
    if (!this.timeout) {
      this.timeout = setTimeout(function () { 
        proxy.flush();
      }, this.delay);
    }
  },
  flush: function () {
    http.makeRequest(this.ids, "proxy.handler");

    // clear timeout and queue 
    this.timeout = null; 
    this.ids = [];
  },
  handler: function (data) {
    var i, max;

    // single video
    if (parseInt(data.query.count, 10) === 1) {
      proxy.callback.call(proxy.context, data.query.results.Video);
      return; 
    }

    // multiple videos
    for (i = 0, max = data.query.results.Video.length; i < max; i += 1) {
      proxy.callback.call(proxy.context, data.query.results.Video[i]); 
    }
  }
};

// The proxy sets up a queue to collect the IDs of the videos received in the past 50ms 
// and then flushes the queue calling http and provides its own callback function,
// because the videos.updateList() callback can handle only a single data record.
