
var CONFIG  = require("./config")
var Slack   = require('slack-node')
var request = require('request')
var cheerio = require('cheerio')

request('https://garfield.com/comic', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('img.img-responsive[width=1200]').each(function(i, element){
      var image_link = $(this).attr("src");

       
      webhookUri = "https://hooks.slack.com/services/" + CONFIG.SLACK_TOKEN;
       
      slack = new Slack();
      slack.setWebhook(webhookUri);
       
      slack.webhook({
        channel: CONFIG.SLACK_CHANNEL,
        username: "GarfieldBot",
        text: image_link
      }, function(err, response) {
        console.log(response);
      });

      console.log(image_link);
    });
  }
});