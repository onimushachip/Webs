$( function() {

	//jQuery objects
	var $controls = $( '.controls' );
	var	$keyboard = $( '#keyboard' );
	var	$log = $( '#log' );
	var	$keys = $keyboard.find( '.keys' );
	//Normal variables
	var	playing = false;
	var	keys = {};
	var	playlist = [];

	 //Drawing the keyboard to the page
	var addKey = function( $where, key ) {
		var $key = $( '<span class="key" id="' + key + '"><a data-key="' + key + '"><span class="letter">' + key + '</span></a></span>' );
		$where.append( $key );
		
		keys[ key ] = $key;
	}

	var playKey = function( key, quick, callback ) {
		callback = callback || new Function;

		//Check to see which key on the keyboard is played
		$keys.find( '.pressed' ).removeClass( 'pressed' );
		keys[ key ].addClass( 'pressed' );

		// Playing the audio of each key, enable the sound to sustain or disappear when a new one is played
		if ( window.Audio ) {

			if ( playing ) {
				playing.pause()
				$( playing ).off( 'ended' )
			}

			playing = tones[ key ];
			playing.play();
			$( playing ).on ( 'ended', function() {
				console.log( key + ' ended' );
				$keys.find( '.pressed' ).removeClass( 'pressed' );
				$( this ).off( 'ended' );
				callback( key );
			});
		}
		else {
			setTimeout( 200, function() {
				$keys.find( '.pressed' ).removeClass( 'pressed' );
				callback( key );
			});
		}

		var t = quick ? 100 : 200;

		setTimeout( function() {
			$keys.find( '.pressed' ).removeClass( 'pressed' );
			callback( key );
		}, t );
	}

	for ( var key in tones ) {
		if ( /\#/.test( key ) )
			addKey( $keys.find( '#' + key.replace( /\#/, '' ) ) , key );
		else
			addKey( $keys, key );
	}

	$keyboard.on( 'click', '[data-key]', function( e ) {
		var $this = $( e.target ).closest( '[data-key]' );
		var	key = $this.data( 'key' );

		playKey( key, true );
	});

	$controls.hide();
	
});

( function(){
	"use_strict";

	//A list of keys in the keyboard
	var tone_map = {
			'C' : 2.45,
			'C#' : 2.35,
			'D' : 2.2,
			'D#' : 2.0,
			'E' : 1.95,
			'F' : 1.8,
			'F#' : 1.7,
			'G' : 1.60,
			'G#' : 1.53,
			'A' : 1.45,
			'A#' : 1.36,
			'B' : 1.28,
			'c' : 1.20,
		}

	//Storing all tones defined above
	var	tones = {};

	if ( ! window.Audio ) {
		window.tones = tone_map;
		return false;
	}

	//Encoding the sample to be played for each key
	for ( var key in tone_map ) {
		var data = [];

		for ( var i = 0; i < 10000; i++ )
			data.push( 128 + Math.round( 127 * Math.sin( i / tone_map[ key ] ) ) )

		var wave = new RIFFWAVE( data );

		tones[ key ] = new Audio( wave.dataURI );
	}

	window.tones = tones;
})();