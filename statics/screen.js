(function ($) {
	"use strict";

	// Funtion to enquee fucntions and execute them one after other
	var Queue = (function(){

		function Queue() {};

		//this.runningOverlay;

		Queue.prototype.running        = false;
		Queue.prototype.runningOverlay = false;
		Queue.prototype.queue          = [];

		Queue.prototype.add_overlay = function(msg, type, topPriority) {

			if (typeof topPriority == "undefined" || !topPriority) {
				//add callback to the queue
				this.queue.push({ msg: msg, type: type});
			} else {
				//add callback in top priority mode (next in queue)
				this.queue.unshift({ msg: msg, type: type});
				this.abort();
			}

			if(!this.running) {
				// if nothing is running, then start the engines!
				this.next();
			}

			return this;
		}

		Queue.prototype.next = function(){
			this.running = false;
			//get the first element off the queue
			var shift = this.queue.shift();
			if(shift) {
				this.running = true;
				this.runningOverlay = new Overlay;
				this.runningOverlay.start_overlay(shift.msg, shift.type);
			}
		}

		Queue.prototype.abort = function(){

			if (this.runningOverlay) {

				this.runningOverlay.stop_overlay();

			}
		}

		return Queue;

	})();
	var queue = new Queue;


	var Overlay = (function(){

		function Overlay() {};

		Overlay.prototype.overlayDiv       = false;
		Overlay.prototype.newElement       = false;
		Overlay.prototype.style            = false;
		Overlay.prototype.closetimeout     = false;
		Overlay.prototype.playingSound     = false;
		Overlay.prototype.soundInterval    = false;
		Overlay.prototype.overlayDuration  = 10;
		Overlay.prototype.transitionStyles = [
			"overlay-simplegenie",
			"overlay-slidedown",
			"overlay-scale",
			"overlay-door"
		];


		Overlay.prototype.start_overlay = function(msg, type, style) {

			var self = this;

			if (typeof style == "undefined" ||  this.transitionStyles.indexOf(style) === -1 ) {
				style = this.transitionStyles[Math.floor(Math.random()*this.transitionStyles.length)];
			}
			this.style = style;

			this.overlayDiv = $("<div>")
				.addClass("overlay")
				.appendTo($("#overlays"));

			// Open overlay
			this.overlayDiv.addClass(this.style);
			setTimeout(function() {
				self.overlayDiv.addClass("open");
				//ion.sound.play("beer_can_opening");
			}, 500);

			// Add content to the new element
			// MESSAGE
			if (type === "message") {
				this.newElement = $("<div>")
					.addClass("centered-text")
					.text(msg);

				// Wait X seconds close and destroy
				this.closetimeout = setTimeout(function() {
					self.stop_overlay();
				}, this.overlayDuration*1000);

			// IMAGE
			} else if (type === "image") {
				this.newElement = $("<img>")
					.addClass("centered-image")
					.attr("src", msg);

				// Wait X seconds close and destroy
				this.closetimeout = setTimeout(function() {
					self.stop_overlay();
				}, this.overlayDuration*1000);

			// SOUND
			} else if (type === "sound") {

				this.newElement = $("<div>")
					.addClass("centered-text");

				this.playingSound = msg.sound;

				// create sound
				ion.sound({
					sounds : [
						{name : self.playingSound}
					],

					path      : "uploads/",
					preload   : true,
					multiplay : false,

					ready_callback: function (obj) {

						let duration      = Math.round(obj.duration);
						let $durationSpan = $("<span>");
						self.newElement
							.html(
								$("<span>").html("&#9654; " + msg.name + "<br>")
							)
							.append($durationSpan);

						// Add the sound countdown time
						self.soundInterval = setInterval(function() {
							duration--;
							$durationSpan.text(duration.toHHMMSS());
						}, 1000);

					},
					ended_callback: function (obj) {

						self.newElement.html("");

						// Close overlay
						self.stop_overlay();

					}
				});

				ion.sound.play(msg.sound);

			// PROD MODE
			}  else if (type === "prodmode") {
				this.newElement = $("<div>")
					.addClass("centered-text")
					.text("PROD MODE");

				// Add danger class to main overlay
				this.overlayDiv.addClass("danger");

				// Play danger sound
				ion.sound.play("bell_ring", {
					loop: 5
				});
			}

			// append new element to overlay
			this.overlayDiv.append(this.newElement);

			return this;

		}

		Overlay.prototype.stop_overlay = function() {

			var self = this;

			if (this.closetimeout) {
				clearTimeout(this.closetimeout);
			}

			if (this.soundInterval) {
				clearInterval(this.soundInterval);
			}

			if (this.playingSound) {
				ion.sound.destroy(this.playingSound);
			}

			this.overlayDiv.removeClass("open");

			setTimeout(function() {
				self.overlayDiv.remove();

				// Exec next in queue
				queue.next();
			}, 1000);
		}

		return Overlay;

	})();


	// init ion-sounds
	ion.sound({
		sounds : [
			{name : "beer_can_opening"},
			{name : "bell_ring"},
			{name : "branch_break"},
			{name : "button_click"}
		],

		path      : "/assets/ion-sound/sounds/",
		preload   : true,
		multiplay : true,
		volume    : 0.9
	});

	// Init Socket.io
	var socket = io.connect();

	// Receive message from server
	socket.on("message", function(msg) {
		queue.add_overlay(msg, "message");
	});

	// Receive image from server
	socket.on("image", function(msg) {
		queue.add_overlay(msg, "image");
	});

	// Receive prodmode from server
	socket.on("prodmode", function(msg) {
		if (msg) {
			// Add prodmode in Top priority
			queue.add_overlay(null, "prodmode",true);
		} else {
			// Stop prodmode
			queue.abort();
			// Play danger sound
			ion.sound.play("bell_ring", {
				loop: 1
			});
		}

	});

	// Receive sound from server
	socket.on("sound", function(msg) {
		queue.add_overlay(msg, "sound");
	});

	// Receive abort from server
	socket.on("abort", function() {
		// stop sounds if any
		ion.sound.stop();

		// stop current overlay
		queue.abort();
	});



	// FIXME: THIS IS A TEST: Receive call API from server
	socket.on("apiTest", function(msg) {
		console.log(msg);
		$("#messages")
			.append($("<div>")
				.text(msg)
			);
	});


// Format number into (HH:)MM:SS
Number.prototype.toHHMMSS = function (showHours) {

	if (typeof showHours == "undefined") showHours = false;

	var sec_num = parseInt(this, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return (showHours?hours+":":"")+minutes+":"+seconds;
}

}(jQuery));

