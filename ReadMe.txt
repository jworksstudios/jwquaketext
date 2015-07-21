jwQuakeText - A jQuery plugin to jumble your text.
Jerome "PJ" Williams
http://JWorksStudios.com/plugins/jwquaketext
https://github.com/jworksstudios/jwquaketext

You can download and/or follow along with the demo.

To run:
-Include jquery
-Include jwquaketext
-Add your required CSS styles. This will ensure your text can be manipulated:
  .quake span.quake:nth-child(odd), 
  .quake span.quake:nth-child(even){
	display: inline-block;
  }

Feel free to experiment with the .quake display styles.

Simplest usage:

(html)   <p><div id = "element" class = "quake">This will quake!</div>, but this will not.</p>

(js)       $(".quake").quake();