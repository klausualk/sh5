if (Meteor.isClient) {

  if (Meteor.isCordova) {
    Meteor.startup(function(){
      console.log("device capability: " + JSON.stringify(navigator.device.capture));
  });
}

 Template.private.events({

    'click button': function () {
        console.log("jõudsin siia");
      //if (Meteor.isCordova){
        if (Meteor.isClient){
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1, duration: 13});
      } else {
        // do the standard mdg:camera thing here ??
        // because we're in a browser.....
      }
  }
  });

  var captureError = function(error) {
    navigator.notification.alert('ERROR:' + error.message, null, "Capture Error");
  }

  var captureSuccess = function(mediaFiles) {
    var i, path, len;
    for (i=0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
      // do something with this file... upload to S3 ?
      console.log("path = " + path);
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}