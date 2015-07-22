/*
	jwQuakeText <EarthquakeText, QuakeText or just Quake>
	
	Written by Jerome "PJ" Williams
	3.3.2013
	http://www.jworksstudios.com/plugins/jwquaketext
	https://github.com/jworksstudios/jwquaketext
	
	Quake is a quick plugin that will jumble your text like an earthquake.
	Features are random (default), CSS defined, or define on-the-fly.
	
	Use quake to give an element's text a little flair with minimal effort.
	Quake returns "this" so you can chain it to other functions.

	NOTE: Try to use plain text inside of elements.
		  Text that has inline tags around them (ex: <span style...>This Text</span> will be returned with default attributes.
		  If you want to style your element text, use styles on the outside of that element, not inside the tag.
	
	STYLING: You can style the resulting text by using the quake.css stylesheet.
	
	Free to use and tweak. Leave some credit when you can.
*/

(function($){
	$.fn.quake = function(options){
	
	var def = $.extend({
		'random' : true,   // Randomize the angle? The values for randomMin and randomMax be used to determine the final rotation angle.
		'randomMin' : -20, // The min rotation angle random rotations. Can be negative.
		'randomMax' : 20,  // The max rotation angle random rotations. Can be negative.
		'even' : null,     // (If not using random) Sets explicit angle for every [even] character in this element.
		'odd' : null,      // (If not using random) Sets explicit angle for every [odd] character in this element.
		'xShift' : 2,      // (Random) The max number of pixels the letters will move left/right. Default 2
		'yShift' : 5       // (Random) The max number of pixels the letters will move up/down. Default 5
	}, options)
	
	return this.each(function(){
	// Grab the text we're working with in this element.
	var input = $(this).text();
	// Need to know how many characters we're working with.
	var length = input.length;
	// What gets drawn to the screen.
	var output = "";
	// In case user-defined values: Even or odd???
	var isEven = 0;
	
	for(i = 0; i < length; i++){
		// Check to see if the input is whitespace. If it's NOT, then append the styling...
		if(input[i] != "" && input[i] != " "){
			
			/****** RANDOM ******/
			if(def['random'] && def['even'] == null && def['odd'] == null){
				// If we're going to go random, then we need to add inline code...
				var rot = ((Math.random() * def['randomMax'] * 2) + def['randomMin'] + 1) + 'deg';// Calc once, add deg...
				var trans = 'transform:rotate(' + rot + '); -moz-transform:rotate(' + rot + '); -o-transform:rotate(' + rot + '); -ms-transform:rotate(' + rot + '); -webkit-transform:rotate(' + rot + ');';
				
				// Going to put some x/y movement too...
				var shiftX = (Math.random() * def['xShift']) -def['xShift'];
				var shiftY = (Math.random() * def['yShift']) -def['yShift'];
				var shift = 'position: relative; top: ' + shiftY + 'px; left: ' + shiftX + 'px;';
				output += '<span class = "quake" style = "' + trans + shift + '">' + input[i] + '</span>';
			}
			/****** NOT RANDOM ******/
			else{
				// Ok, it's not random, but see if we will use the CSS or if we will use userdefined values...
				var shiftX = (Math.random() * def['xShift']) -def['xShift'];
				var shiftY = (Math.random() * def['yShift']) -def['yShift'];
				var shift = 'position: relative; top: ' + shiftY + 'px; left: ' + shiftX + 'px;';
				
				/****** NOT RANDOM, USING DEFAULT CSS VALUES ******/
				if(def['even'] == null || def['odd'] == null)// Use defined CSS values.
					output += '<span class = "quake" style = "' + shift + '">' + input[i] + '</span>';
				/****** NOT RANDOM, BUT USER-DEFINED VALUES ******/
				else{// We are NOT random, AND we have values for even and odd. Use them...
					// Maintain our Even/Odd directions...
					var rot = isEven == 1 ? def['even'] + 'deg' : def['odd'] + 'deg';
					// Toggle...
					isEven ^= 1;
					// Same ole.
					var trans = 'transform:rotate(' + rot + '); -moz-transform:rotate(' + rot + '); -o-transform:rotate(' + rot + '); -ms-transform:rotate(' + rot + '); -webkit-transform:rotate(' + rot + ');';
				output += '<span class = "quake" style = "' + trans + '">' + input[i] + '</span>';
				}
			}
		}
		else if(input[i] == " ")// If there's a space, add space...Makes the output look true.
			output += '<span class = "quake">&nbsp;</span>';
	}
	// Now add it back...
	$(this).html(output);
	});	
  }
})(jQuery);