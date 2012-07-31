module.exports = {

  findAppointment: function(args, cb) {
    //simulate the api call
    setInterval(
      function() {
        console.log("API CALL");
        cb(null, {data: "appointment"});
      }, 1000);
  },

  findAlerts: function(args, cb) {
    setInterval(function() {
      console.log("API CALL ALERT");
      cb(null, {data: "alert"});
    }, 1000);
  }

};