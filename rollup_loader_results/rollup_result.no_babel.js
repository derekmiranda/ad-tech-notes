/**
	@class Device
	@desc
		Global constant that provide information about the Device on which the code is currently executing
*/

class Device {
	constructor() {
		this.pixelRatio = window.devicePixelRatio || 'unknown';
	}

	/**	
		@memberOf Device	
		@var {string} agentString
		@desc
			Current user agent of browser. */

	/**	
		@memberOf Device	
		@var {string} brand
		@desc
			Brand of device, possible values are: 
			<code>microsoft</code>, 
			<code>apple</code>, 
			<code>android</code>, 
			<code>rim</code>, 
			<code>unknown</code>. 
	*/

	/**	
		@memberOf Device	
		@var {string} product
		@desc
			Brand subtype, possible values are: 
			<code>windows phone</code>, 
			<code>windows</code>, 
			<code>iphone</code>, 
			<code>ipad</code>, 
			<code>ipod</code>, 
			<code>mac</code>, 
			<code>android</code>, 
			<code>blackberry</code>. 
		*/

	/**	
		@memberOf Device	
		@var {string} type
		@desc
			Device type, possible values are: 
			<code>mobile</code>, 
			<code>tablet</code>, 
			<code>desktop</code>. 
			<br><br>
			Windows > 8 currently returns tablet, currently no way to differentiate from desktop. */

	/**	
		@memberOf Device	
		@var {string} os
		@desc
			Operating system of device. */

	/**	
		@memberOf Device	
		@var {string} osVersion
		@desc
			Version of operating system of device. */

	/** 	
		@memberOf Device	
		@var {string} browser
		@desc
			Brand of browser. */

	/**	
		@memberOf Device	
		@var {string} browserVersion
		@desc
			Version of browser. 
	*/

	/**	
		@memberOf Device	
		@var {string} pixelRatio
		@desc
			Pixel ratio of device viewport. 
	*/

	/** ------------------------------------------------------------------------------------------------------------- */
	// GETTERS

	/**	
		@memberOf Device	
		@var {string} orientation
		@desc
			Orientaion of device viewport: landscape or portrait. 
	*/
	get orientation() {
		return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
	}

	/**	
		@memberOf Device	
		@var {object} dimensions
		@property {number} width
			window inner-width
		@property {number} height
			window inner-height
		@desc
			The current dimensions of the device's viewport, returns an object with a width and height 
			value that are direct returns of windowWidth and windowHeight.
	*/
	get dimensions() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	/** ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS

	/**	
		@memberOf Device	
		@method init
		@desc
			Initializes the module, which is called from within the pipeline.
	*/
	init() {
		console.log('Device.init()');
		const D = this;
		D.agentString = navigator.userAgent;

		D._getType();
		D._getBrandAndOS();
		D._getBrowser();

		if (D.type !== 'desktop' && D.os === 'windows' && D.osVersion <= 8 && D.browser === 'ie' && D.browserVersion < 12) {
			console.log(
				"You appear to be on Windows 7 or 8 using Internet Explorer 11 or under. You also appear to be on a touchscreen device. We will assume you're actually on a desktop, since it's extremely unlikely you're on a tablet or mobile device using this specific operating system and browser."
			);
			D.type = 'desktop';
		}

		var line = Array(70).join('-');
		var str = '\n' + line;
		str += '\n AGENT:\n\n\t' + D.agentString + '\n';
		str += '\n  Brand:\t\t\t' + D.brand;
		str += '\n  Product:\t\t\t' + D.product;
		str += '\n  Type:\t\t\t\t' + D.type;
		str += '\n  Os:\t\t\t\t' + D.os + ' - ' + D.osVersion;
		str += '\n  Browser:\t\t\t' + D.browser + ' - ' + D.browserVersion;
		str += '\n  Dimensions: \t\t' + D.dimensions.width + 'x' + D.dimensions.height;
		str += '\n  Orientation:\t\t' + D.orientation;
		str += '\n  Pixel Ratio:\t\t' + D.pixelRatio;
		str += '\n' + line;
		console.log(str);
	}

	/** ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	_getType() {
		const D = this;
		var hasMobile = /(android|mobile)/gi.exec(D.agentString);
		var hasTablet = /(tablet|touch)/gi.exec(D.agentString);
		var hasIPad = /(ipad)/gi.exec(D.agentString);
		D.type = 'desktop';
		if (hasMobile) D.type = 'mobile';
		if (hasTablet) D.type = 'tablet';
		if (hasIPad) D.type = 'tablet';
	}

	_getBrandAndOS() {
		var D = this;
		var apple = D.agentString.match(/ip(hone|od|ad)|mac/gi);
		if (apple) {
			D.brand = 'apple';
			D.product = apple[0].toLowerCase();
			var appleOS = /(OS\s)(\X\s|)([\d\.\_]+)/gi.exec(D.agentString);
			D.os = appleOS[2] == '' ? 'ios' : 'osx';
			D.osVersion = appleOS[3].replace(/\_/g, '.');
			return
		}

		var android = /(android)\/?\s*([0-9\.]+)/gi.exec(D.agentString);
		if (android) {
			D.brand = D.product = D.os = android[1].toLowerCase();
			D.osVersion = android[2];
			return
		}

		var microsoft = /(windows\snt\s|windows\sphone)\/?\s*([0-9\.]+)/gi.exec(D.agentString);
		if (microsoft) {
			D.brand = 'microsoft';
			D.os = 'windows';

			switch (microsoft[2]) {
				case '5.2':
					D.osVersion = 'xp';
					break
				case '6.0':
					D.osVersion = 'vista';
					break
				case '6.1':
					D.osVersion = '7';
					break
				case '6.2':
					D.osVersion = '8';
					break
				case '6.3':
					D.osVersion = '8.1';
					break
				case '10.0':
					D.osVersion = '10';
					break
				default:
					D.osVersion = microsoft[2];
			}

			D.product = microsoft[1].toLowerCase();
			if (D.product.match(/\snt/i)) {
				D.product = 'pc';
			}
			return
		}

		// blackberry
		var blackberry = D.agentString.match(/(blackberry|bb10|playbook)/i);
		if (blackberry) {
			D.brand = D.product = D.os = 'blackberry';
			D.osVersion = /(version)\/?\s*([0-9\.]+)/gi.exec(D.agentString)[2];
		}
	}

	_getBrowser() {
		const D = this;
		var browserMatches = /(edge(?=\/))\/?\s*([0-9\.]+)/i.exec(D.agentString); // check for edge first

		// if it's not edge, check for other common browsers
		if (!browserMatches) {
			browserMatches = D.agentString.match(/(fban|fbav|opera|chrome|crios|safari|firefox|msie|trident(?=\/))\/?\s*([0-9\.]+)/i);
		}

		// if we checked for common browsers and got NOTHING in return, let's just use the device's default browser
		if (!browserMatches || browserMatches.length < 3) {
			console.log('we received no browser data, so we are setting it to the default of the device');
			switch (D.os) {
				case 'ios':
					D.browser = 'safari';
					break
				case 'windows':
					D.browser = 'trident';
					break
				default:
					D.browser = 'chrome';
					break
			}
			D.browserVersion = 'os-default';
			return
		}

		console.log('we received browser data');
		D.browser = browserMatches[1].toLowerCase();
		D.browserVersion = browserMatches[2];

		switch (D.browser) {
			case 'trident':
				// Check for desktop IE 10
				var versionMatch = /\brv:+(\d+)/g.exec(D.agentString);
				if (versionMatch) D.browserVersion = versionMatch[1];
			case 'msie':
				D.browser = 'ie';
				break
			case 'crios':
				D.browser = 'chrome';
				break
			case 'safari':
				var versionMatch = D.agentString.match(/\sversion\/([0-9\.]+)\s/i);
				if (versionMatch) D.browserVersion = versionMatch[1];
				break
			case 'chrome':
				// check for Opera
				var versionMatch = D.agentString.match(/\b(OPR)\/([0-9\.]+)/i);
				if (versionMatch) {
					D.browser = 'opera';
					D.browserVersion = versionMatch[2];
				}
				break
		}
	}
}

var Device$1 = new Device()

/**
	@class LocationUtils
	@desc
		This object contains utilities for interfacing with the device's GPS.
*/

/**
	@class MotionUtils
	@desc
		This object is for accessing the mobile/tablet's accelerometer for tilt shifting values
*/

/**
	@class Ratio
	@desc
		Utilities for different ratio layouts; used by {@link UIImage} and deprecated Flipbook.
*/

/**
	@memberof Ratio
	@const {string} EXACT
		'auto' ~ Images display at the exact height and width of the source 
*/


/**
	@memberof Ratio
	@const {string} FILL
		'cover' ~ Scales the image to fill the target without distortion while maintaining aspect ratio, may cause a crop. 
*/


/**
	@memberof Ratio
	@const {string} FIT
		'contain' ~ Scales to fit the full image without distortion while maintaining aspect ratio, may cause negative borders. 
*/


/**
	@memberof Ratio
	@const {string} STRETCH
		'100% 100%' ~ Images stretches to fill the target, may cause aspect ratio distortion. 
*/

/**
	@module Markup
	@desc
		This object contains utilities relateed to dom elements.
*/

/**
	@memberof Markup
	@method get
	@param {string} selector
		A string selector. It defaults to find the string as an id, or if the string starts with '#'. 
		If starts with '.', it selects by class name. If wrapped with '<>', it selects by tag name.
	@param {element} parent
		Optional parent element to get the element(s) from. Defaults to document.
	@returns {element|HTMLCollection}
		One single element if the selector is an id. With class name or tag name, it returns an HTML collection ( similiar to an array ).
	@desc
		Used to select elements.

	@example
		// get element by its id called 'myId'
		Markup.get( 'myId' );
		
		// same as above
		Markup.get( '#myId' );
		
		// get element by CSS classname 'myClass'
		Markup.get( '.myClass' );
		
		// get elements by tag name 'head'
		Markup.get( '<head>' );
*/
function get(selector, parent) {
	if (typeof selector !== 'string') {
		return selector
	}

	parent = parent || document;
	selector = selector.trim();

	switch (selector[0]) {
		case '#':
			// id
			return parent.getElementById(selector.slice(1))
			break
		case '.':
			// class
			return parent.getElementsByClassName(selector.slice(1))
			break
		case '<':
			// tag
			return parent.getElementsByTagName(selector.slice(1, selector.length - 1))
			break
		default:
			// default to id for backworad support
			return parent.getElementById(selector)
	}
}
// the deprecated syntax 12/28/16


/**
	@memberof Markup
	@method removeChildren
	@param {element} _target
		element to be targeted
	@desc
		Removes all the children elements of an element
*/


/* 
	To be deprecated after moving addiFrame and addSvg to UIComponent 
*/
// export function applyContainerCss (_element, _containerData) {
// 	if (!_containerData.css) _containerData.css = {};
// 	if (!_containerData.css.position)
// 		_containerData.css.position = 'absolute';
// 	Styles.setCss(_element, _containerData.css);
// 	Styles.setCss(_element, _containerData.styles);
// }

/**	Method: addIframe()
 Deprecated. Add an iframe to the containerData.target, pointing at containerData.source.  */


/**	Method: addSvg()
	Deprecated.

	_containerData			- object with the necessary keys for creating an element. */


/**
	@memberof Markup
	@method applyToElements
	@param {object} arg
		See properties for more info:
		@property {object} arg.scope
			the scope of this
		@property {function} arg.method
			the function to use
		@property {element|array} arg.element
			the element(s) to apply the method to, can be a single element or an array
		@property {string|number|array|object} arg.methodArg
			the argument to pass to the method function
	@desc
		Apply a method to multiple elements. Currently assuming the method accepts element as the first argument,
		and a second argument as the setting. 

	@example
		var myElements = Markup.get( '.centered-blocks' );
		Markup.applyToElements({
			scope: Align,
			method: Align.set,
			elements: myElements,
			methodArg: { x: Align.CENTER }
		});
*/

/**
	@class Styles
	@desc
		Utilities for CSS style related purposes. 
*/

/**
	@memberof Styles
	@method setCss
	@param {string|element} _target
		id or element to which the style(s) should be applied
	@param {string|object|array} args
		any type of CssDeclaration, an object of key-value pairs, a semicolon separated string of styles, or a separate( key, value )arguments
	@desc
		Sets specified styles on target object.
	@example
		// set multiple styles using a css-string
		Styles.setCss ( myDiv, 'top: 30px; left: 10px' );

		// set multiple styles using a css-object, same as the 'css' property on {@link UIComponent}s
		Styles.setCss ( myDiv, { top:30, left:10 });

		// set a single style, using individual( key, value )args
		Styles.setCss ( myDiv, 'top', 30 );
*/
function setCss(element, args) {
	element = get(element);
	var cssList = {};
	if (arguments.length > 2) {
		for (var i = 1; i < arguments.length; i += 2) {
			cssList = CssManager$1.conformCssKeyValue(arguments[i], arguments[i + 1]);
		}
	} else if (typeof arguments[1] == 'string') {
		cssList = CssManager$1.conformCssString(arguments[1], element);
	} else {
		cssList = CssManager$1.conformCssObject(arguments[1], element);
	}
	CssManager$1.apply(element, cssList);
}

/**
	@memberof Styles
	@method getCss
	@param {string|element} _target
		id or element to which css style should be applied
	@param {string} key
		css key
	@desc
		Gets a specific style for a particular key.
*/
function getCss(element, key) {
	element = get(element);

	var cssValue;
	if (key == 'x' || key == 'y') {
		var existingTransform = element.style[CssManager$1.getDeviceKey('transform')];
		var matrix = existingTransform.replace(/[\s\(\)matrix]/g, '').split(',');
		cssValue = matrix.length < 6 ? 0 : +matrix[key == 'x' ? 4 : 5];
	} else {
		var style = window.getComputedStyle(element, null);
		cssValue = style.getPropertyValue(key).replace(/px/, '');
		if (!isNaN(cssValue)) cssValue = parseInt(cssValue, 10);
	}

	return cssValue
}

/**
	@memberof Styles
	@method injectStylesheet
	@param {string} nodeId
		the id of the &lt;style> node written to the &lt;head>
	@param {string|object|array} styles
		any type of CssDeclaration: an object of key-value pairs, a semicolon separated string of styles, or a separate( key, value )arguments
	@desc
		Creates a new CSS stylesheet node (class, tag, etc) DEFINITION out of the submitted styles. 

	@example
		// selector/CSS string pair
		Styles.injectStylesheet( 'myFirstStyle', 
			'.class-a', 'position:absolute; width:inherit;'
		)

		// selector/CSS string pair: add multiple class declarations to the same node
		Styles.injectStylesheet( 'mySecondStyle', 
			'.class-b', 'position:absolute;',
			'.class-b-top', 'width:inherit; height:inherit;'
		)

		// selector/CSS string pair:  have mulitple classes share the same logic
		Styles.injectStylesheet( 'myThirdStyle', 
			'.class-c, .class-d', 'position:absolute;'
		)

		// selector/CSS string pair: add style to a tag name globally
		Styles.injectStylesheet( 'myFourthStyle', 
			'h1', 'position:absolute;'
		)

		// self-contained CSS string
		var myCssString = '.myClass, h1 { color: blue; margin: 10px; }';
		Styles.injectStylesheet( 'myFifthStyle', myCssString );
*/


/**
	@memberof Styles
	@method addClass
	@param {string|element} target
		id or element to which css style should be added
	@param {string} className
		css class association to be added to this target
	@desc
		Add a CSS class ASSOCIATION to the targeted element.
*/


/**
	@memberof Styles
	@method removeClass
	@param {string|element} target
		id or element from which css style should be removed
	@param {string} className
		css class association to be removed from this target
	@desc
		Removes a CSS class ASSOCIATION from the targeted element.
*/

/**
	@class Effects
	@desc
		Utilities for adding effects to elements
*/
/* --------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
	@memberof Effects
	@method blur
	@param {object} obj
		object containing blur arguments, see Properties for more info:

		@property {element} obj.target
			dom element
		@property {number} obj.amount
			the level of blurriness
	@desc
		Blurs a dom element.
	
	
	@example
		//
		Effects.blur({
			target: _myDiv,
			amount: 10
		});
*/


/**
	@memberof Effects
	@method dropShadow
	@param {object} obj
		object containing drop shadow arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {number} obj.angle
			optional NUMBER IN DEGREES for the angle at which the shadow will project. Defaults to 0.
		@property {number} obj.distance
			optional NUMBER for how far away the shadow will offset. Defaults to 0.
		@property {number} obj.size
			optional NUMBER for shadow radius. Defaults to 0.
		@property {number} obj.spread
			optional NUMBER for how much extra the shadow will increase before it begins its gradient fade. Defaults to 0.
		@property {string|object} obj.color
			optional color of shadow as a HEX STRING :"#ff0000", 
			RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", 
			or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
		@property {number} obj.alpha
			optional NUMBER of shadow opacity, if set will overwrite color.a. Defaults to 1.
		@property {boolean} obj.inner
			optional BOOLEAN to set the shadow as inset. Defaults to false.

	@desc
		Adds a drop shadow to a dom element. Follows the same use specs as Photoshop.
		
	@example
		//
		Effects.dropShadow({
			target:_myDiv,
			angle: 135,
			distance: 50,
			size: 20, 
			spread: 10,
			color: 'rgb(90, 0, 0)',
			alpha: 0.1,
			inner: true
		});
*/


/**
	@memberof Effects
	@method textDropShadow
	@param {object} obj
		object containing drop shadow arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {number} obj.angle
			optional NUMBER IN DEGREES for the angle at which the shadow will project. Defaults to 0.
		@property {number} obj.distance
			optional NUMBER for how far away the shadow will offset. Defaults to 0.
		@property {number} obj.size
			optional NUMBER for shadow radius. Defaults to 0.
		@property {string|object} obj.color
			optional color of shadow as a HEX STRING :"#ff0000", 
			RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", 
			or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
		@property {number} obj.alpha
			optional NUMBER of shadow opacity, if set will overwrite color.a. Defaults to 1.

	@desc
		Adds a drop shadow to text within a dom element. Follows the same use specs as Photoshop.
		
	@example
		//
		Effects.textDropShadow({
			target:_myText, 
			angle: 45, 
			distance: 15, 
			size: 1, 
			color: '#ff0000', 
			alpha: 0.5
		});
*/


/**
	@memberof Effects
	@method glow
	@param {object} obj
		object containing glow arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {number} obj.size
			optional NUMBER for glow radius. Defaults to 0.
		@property {number} obj.spread
			optional NUMBER for how much extra the glow will increase before it begins its gradient fade. Defaults to 0.
		@property {string|object} obj.color
			optional color of glow as a HEX STRING :"#ff0000", 
			RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)", 
			or an RGB/A OBJECT:{r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}. Defaults to "#000000".
		@property {number} obj.alpha
			optional NUMBER of glow opacity, if set will overwrite color.a. Defaults to 1.
		@property {boolean} obj.inner
			optional BOOLEAN to set the glow as inset. Defaults to false.

	@desc
		Adds a glow to a dom element. Follows the same use specs as Photoshop.
		
	@example
		//
		Effects.glow({
			target: _myDiv,
			size: 20, 
			spread: 0,
			color: 'rgb(90, 0, 0)',
			alpha: 0.5,
			inner: true
		});
*/


/**
	@memberof Effects
	@method linearGradient
	@param {object} obj
		object containing gradient arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {array} obj.colors
			ARRAY of colors as either a HEX STRING :"#ff0000" or an RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)".
		@property {number} obj.angle
			NUMBER IN DEGREES of angle to draw linear-gradient at. Defaults to 0.
	@desc
		Changes the background of a given dom element to be a linear gradient.
		<br><br>

		<b>Example</b><br>
		Adding a horizontal gradient from red, to blue, fading to a transparent yellow.
		<codeblock>
			Effects.linearGradient({
				target: _myDiv, 
				colors: ['red', 'blue', 'rgba(255, 255, 0, 0.5)'], 
				angle: 90
			});
		</codeblock>
*/


/**
	@memberof Effects
	@method radialGradient
	@param {object} obj
		object containing gradient arguments, see Properties for more info:
		@property {element} obj.target
			dom element
		@property {array} obj.colors
			ARRAY of colors as either a HEX STRING :"#ff0000" 
			or an RGB/A STRING: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)". 
			<br><br>

			To add stops, append a % value to the color string: ["#ff0000 50%, "#00ff00 90%"].
		@property {number} obj.angle
			NUMBER IN DEGREES of angle to draw linear-gradient at. Defaults to 0.
	@desc
		Changes the background of a given dom element to be a radial gradient.
		<br><br>

		<b>Example</b><br>
		Adding a gradient from red to blue, with a very large choke on the blue.
		<codeblock>
			Effects.radialGradient({
				target: _myDiv, 
				colors: ['#ff0000', '#0000ff 10%']
			});
		</codeblock>
*/

/**
	@class Clamp
	@desc
		Utility for resizing a DOM element to the size of all its content, sort of like shrink wrapping.
		<br><br>
		
		This will clamp the bounds and potentially move the x and y so that visually the content stays where it is. There is the option to clamp 
		both horizontally and vertically, or you can just do one. Additionally there is a optional object to add some buffer space on any of the sides.

	@example
		// clamp both directions
		Clamp.set( View.main.myDiv, Clamp.XY );
		
		// clamp both directions while adding some buffer padding on each side
		Clamp.set( View.main.myDiv, Clamp.XY, {
			top : 5,
			left : 10,
			bottom : 5,
			right : 10
		});

		// clamp only horizontally and add a buffer padding on the left
		Clamp.set( View.main.myDiv, Clamp.X, {
			left : 10
		});
*/
/**
		@memberof Clamp
		@const {string} X
			Synonymous with "clampX" - clamp on the horizontal direction only 
	*/


/**
	@memberof Clamp
	@const {string} Y
		Synonymous with "clampY" - clamp on the vertical direction only 
*/


/**
	@memberof Clamp
	@const {string} XY
		Synonymous with "clampXY" - clamp on all sides 
*/


/* ------------------------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
			@memberof Clamp
			@method set
			@param {element} source
				The DOM element to resize and move.
			@param {string} type
				A String/Constant representing what directions to clamp on.
			@param {object} buffer
				(optional) An Object that has the values to add buffer padding to each side. See properties for more info:
		
				@property {number} buffer.left
					Amount of left padding
				@property {number} buffer.right
					Amount of right padding
				@property {number} buffer.top
					Amount of top padding
				@property {number} buffer.bottom
					Amount of bottom padding
			@desc
				Resizes and moves the source element horizontally and/or vertically, relative to all its children. 
		*/


/* ------------------------------------------------------------------------------------------------------------------------------- */

/**
	@class Align
	@desc
		Utility for aligning objects, which works for DOM elements and {@link CanvasDrawer} elements.  The x and y alignments are split up
		into separate assignemnts in one call. There are extra parameters that can be passed into the object to handle more complex logic.
		<br><br>

		<b>Notes:</b>
			<br>
			Align, by default, snaps to a full pixel. To change this, see <b>Sample 3</b> ( snap: false )
			<br><br>

		<b>Sample 1</b>
		<codeblock>
			// simple classic usage
			Align.set( myDiv, Align.LEFT ); // only align left
			Align.set( myDiv, Align.BOTTOM ); // only align bottom
			Align.set( myDiv, Align.CENTER ); // align both x and y to the center
		</codeblock>
		<br><br>
		
		<b>Sample 2</b>
		<codeblock>
			// simply align the x and y seperately
			Align.set( myDiv, {
				x: Align.RIGHT,
				y: Align.BOTTOM
			});
		</codeblock>
		<br><br>

		<b>Sample 3</b>
		<br>
		<b>'against'</b> is an object to which we align our given object, like making myDiv perfectly centered against myOtherDiv
		<br>
		<b>'against'</b> could also be a number, as in align myDiv centered against adParams.adWidth / 2
		<br>
		<br>
		<b>'outer'</b> is an optional complex parameter which determines how we align to the 'against' object; default to false
		<br>
		If <b>'against'</b> is a number, then <b>'outer'</b> will have no affect.
		<br>
		<br>
		<img src="../docs_images/align/align_c.jpg" />
		<br><br>
		<codeblock>
			// complex alignment, align in relation to another div with an offset shift of 10 pixels, without snapping to a whole pixel
			Align.set( myDiv, {
				x: {
					type: Align.RIGHT,
					against: myOtherDiv
					offset: 10,
					outer: true
				},
				y: {
					type: Align.BOTTOM,
					offset: 14
				},
				snap: false
			});
		</codeblock>
		<br><br>

		<b>Sample 4</b>
		<codeblock>
			// complex alignment, align in relation to a fixed number with an offset shift of 10 pixels
			Align.set( myDiv, {
				x: {
					type: Align.RIGHT,
					against: 200
					offset: 10,
				},
				y: {
					type: Align.BOTTOM,
					against: 30
					offset: 14
				},
			});
		</codeblock>
		<br><br>
*/
/**
		@memberof Align
		@const {string} BOTTOM
			Synonymous with "alignBottom" 
	*/


/**
	@memberof Align
	@const {string} CENTER
		Synonymous with "alignCenter" 
*/


/**
	@memberof Align
	@const {string} LEFT
		Synonymous with "alignLeft" 
*/


/**
	@memberof Align
	@const {string} RIGHT
		Synonymous with "alignRight" 
*/


/**
	@memberof Align
	@const {string} TOP
		Synonymous with "alignTop" 
*/


/**
	@memberof Align
	@const {string} BOTTOM_LEFT
		Synonymous with "alignBottomLeft", used for {@link UITextField.alignText} 
*/


/**
	@memberof Align
	@const {string} BOTTOM_RIGHT
		Synonymous with "alignBottomRight" used for {@link UITextField.alignText} 
*/


/**
	@memberof Align
	@const {string} TOP_LEFT
		Synonymous with "alignTopLeft" used for {@link UITextField.alignText} 
*/


/**
	@memberof Align
	@const {string} TOP_RIGHT
		Synonymous with "alignTopRight" used for {@link UITextField.alignText} 
*/


/* ------------------------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
		@memberof Align
		@method get
		@desc
			Calculates but does not apply the amount the source element will move horizontally and/or vertically, relative to its parent 
			according to provided mode. The constants allow for picking which coordinate to apply.  
	*/


/**
		@memberof Align
		@method set
		@desc
			Moves the source element horizontally and/or vertically, relative to its parent according to provided mode. The constants 
			allow for picking which coordinate to apply.  
	*/


/* ------------------------------------------------------------------------------------------------------------------------------- */
// PRIVATE METHODS

// used internally by Flipbook




/* ------------------------------------------------------------------------------------------------------------------------------- */

// export { default as Countdown } from './lib/Countdown'
// named exports

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	TextUtils

	Description:
		This object contains methods necessary for manipulating text.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/** 
	@class NetUtils
	@desc
		Utility functions that are common in making network requests.
*/

/**
	@class DcsUtils
	@desc
		Doubleclick Studio utilities.
*/



/**
	@memberOf DcsUtils
	@method addVideoMetrics
	@param {VideoPlayer} player 
		The video player instance to track
	@param {string} message
		The message passed as the metric, defaults to 'Video Report 1'
	@desc
		Adds DoubleClick Tracking metrics to a video player.
	@example
		DcsUtils.addVideoMetrics( adData.elements.videoPlayer, 'Intro Video' );
*/


/**
	@memberOf DcsUtils
	@method addYouTubeVideoMetrics
	@param {VideoPlayer} player 		- The YouTubePlayer instance to track
	@desc
		Adds DoubleClick Tracking metrics to a YouTube video player.  The Enabler counter calls are added to the index when
		a YouTubePlayer is added through Ad App.
		<br><br>

		If manually adding a YouTubePlayer/tracking, the required global vars are:<br>
		<codeblock>
			var trackVideoPlay = function() {
				Enabler.counter( 'YTP Video Play', true )
			}
			var trackVideoReplay = function() {
				Enabler.counter( 'YTP Video Replay', true )
			}
			var trackVideoPause = function() {
				Enabler.counter( 'YTP Video Pause', true )
			}
			var trackVideoComplete = function() {
				Enabler.counter( 'YTP Video Complete', true )
			}
		</codeblock>
		<br><br>

	@example
		DcsUtils.addYouTubeVideoMetrics( adData.elements.mainYouTubePlayer );
*/

/**
	@class ObjectUtils
	@desc
		Utilities for affecting objects.
*/

/**
	@memberOf ObjectUtils
	@name objectifier
	@property {function} objectifier.get
		{@link ObjectUtils.get}
	@property {function} objectifier.set
		{@link ObjectUtils.set}
	@desc
		This object is parent to a number of utility funcitons
*/
/**
	@memberOf ObjectUtils
	@method clone
	@param {object} obj
		object to clone
	@returns {object}
		cloned object
	@desc
		Get a clone of an object without reference.
	@example
		//
		var oldObj = {
			a: 1,
			b: 2
		};

		var newObj = ObjectUtils.clone( oldObj );
		
		newObj.a = 'xyz';

		// oldObj.a is still 1
*/

/**
    @module MathUtils
    @desc
        Common math utilities.
*/

/**
		@memberOf MathUtils
		@method toRadians
		@param {number} degree
				An angle value as a degree
		@desc
				Converts an angle value from Degrees to Radians.
*/


/**
		@memberOf MathUtils
		@method toDegrees
		@param {number} radian
				An angle value as a radian
		@desc
				Converts an angle value from Radians to Degrees.
*/


/**
		@memberOf MathUtils
		@method random
		@param {number} a
				the first value to find between
		@param {number} b
				the second value to find between 
		@param {number} increment
				optionaly set the increment of the random number. Defaults to 1
		@desc
				Get a random number between a range of two values, with an option to return to a decimal place. ( Note that
				 due to the inprecision of decimal number calculation in Javascript, you may not get a perfect result when 
				 your increment value is decimal, but the value will be close. A classic Javascript inpreciosn calculation example: 
				 0.1 + 0.2 = 0.30000000000000004 ) 
		@example
				MathUtils.random ( 1, 3, 1 );   // returns 1 or 2 or 3
				MathUtils.random ( 1, 3, 0.5 )  // returns 1, 1.5, 2, 2.5 or 3
*/


/**
		@memberOf MathUtils
		@method randomBoolean
		@param {number} weight
				change the outcome probabilty. Greater than .5 more likely true. Defaults to .5
		@desc
				Randomly returns a true or false;
*/




/**
		@memberOf MathUtils
		@method rel
		@param {number} a0
				the first value to find between
		@param {number} a1
				the second value to find between
		@param {number} b0
				the first value to use as relative to a0
		@param {number} b1
				the second value to use as relative to a1
		@param {number} bX
				the value between b0 and b1
		@desc
				Calculates a value between two numbers relative to a value between 2 other numbers.
				Returns The proportion between a0 and a1 relative to the bX proportion between b0 and b1
		@example
				MathUtils.rel ( 0, 1, 10, 20, 15 ); // 0.5
				MathUtils.rel ( 100, 300, 3, 5, 3.5 ); // 150
*/


/**
		@memberOf MathUtils
		@method inRange
		@param {number} val
				the number to check
		@param {number} a
				the first value of the range
		@param {number} b
				the second value of the range
		@returns {boolean}
		@desc
				Checks if a value is in the range of two numbers.
		@example
				MathUtils.inRange ( 5, 1, 10 ); // true
				MathUtils.inRange ( -5, 1, 10 ); // false
*/


/**
		@memberOf MathUtils
		@method isNumber
		@param {number} num
				the variable to check
		@desc
				Returns true if the passed var is a number.
*/


/**
		@memberOf MathUtils
		@method toNumber
		@param {string} str
				the variable to convert
		@desc
				Takes a numerical string and converts it to number type.
*/


/* --------------------------------------------------------------------------------- */
// DEV
/**
		@memberOf MathUtils
		@method restrict
		@desc
				Restricts a value to with a range.
*/


/**
		@memberOf MathUtils
		@method getAnglePoint
		@returns {array}
				containing an [xValue, yValue] given x1, y1, distance from that starting coordinate, 
				and angle (in *radians*) which the new point should be from the starting coordinate
		@desc
				Assumes original coordinate rotation is 0 radians
*/


/**
		@memberOf MathUtils
		@method getAngle
		@retuns {number}
				The angle (in *radians*) between two points given x1, y1, x2, y2
*/


/**
		@memberOf MathUtils
		@method getDistance
		@returns {number}
				The distance between two points given x1, y1, x2, y2
*/

/**
	@class ColorUtils
	@desc
		This class contains methods for manipulating color.
*/

/**	
	@memberOf ColorUtils
	@method toRgba
	@param {string|object} color
		the color to convert, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@param {number} alpha
		the optional alpha value for the return string: overrides the alpha value of an RGBA color. 
		If undefined, will default to the alpha value of the color.
	@desc
		Returns an object containing r, g, b, a properties 
*/


/**	
	@memberOf ColorUtils
	@method toRgbaString
	@param {string|object} color
		the color to convert, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@param {number} alpha
		the optional alpha value for the return string: overrides the alpha value of an RGBA color. If undefined, will default to the alpha value of the color.
	@desc
		Returns the rgba() string representing a given color and optional alpha
*/


/**	
	@memberOf ColorUtils
	@method saturation
	@param {object} obj
		an object with paramaters for overall saturation, see Properties for more info
	@property {string|object} from
		the source color to saturate, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@property {string|object} color
		synonymous with the from parameter
	@property {number} amount
		the total saturation of the from. 0 = grayscale, 1 = full, original color
	@property {string} format
		either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
		an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
	@desc
		Change the color saturation of a given color; returns either an 'rgba()' string or an rgba{} object
	@example
		// convert to full grayscale
		ColorUtils.saturation({
			from: '#99aa33',
			amount: 0,
			format: 'object'
		});
		// returns {r: 86, g: 86, b: 86, a: 1}
*/


/**	
	@memberOf ColorUtils
	@method contrast
	@param {object} obj
		an object with paramaters for overall saturation, see Properties for more info
	@property {string|object} from
		the source color to begin with, represented as a HEX string:"#ff0000", an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.,
	@property {string|object} color
		synonymous with the from parameter
	@property {number} amount
		the contrast of the target. 0 = no contrast, 1 = original contrast, >1 = more and more, to infinity and beyond!
	@property {string|object} format
		either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
		an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
	@desc
		Change the contrast of the target; returns either an 'rgba()' string or an rgba{} object
	@example
		// get your whites whiter and brights brighter
		ColorUtils.contrast({
			from: '#aa0011'
			amount: 1.3,
			format: 'object'
		});
		// returns {r: 221, g: 0, b: 22, a: 1}
*/


/**	
	@memberOf ColorUtils
	@method tint
	@param {object} obj
		an object with paramaters for overall saturation, see Properties for more info
	@property {string|object} from
		the source color to begin with, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@property {string|object} color
		synonymous with the from parameter
	@property {string|object} to
		the target color to tint to, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@property {number} amount
		the percentage of color to apply to the target. Defaults to 1, which is 100% color tinting
	@property {string|object} format
		either 'object' or 'string' - which determines whether to return an 'rgba()' string, 
		or an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
	@desc
		Tint a color uniformly to a given color; returns either an 'rgba()' string or an rgba{} object
	@example
		// tint to green
		ColorUtils.tint({
			from: '#ffff00',
			to: '#00ff00',
			amount: 1,
			format: 'object'
		});
		// returns {r: 0, g: 255, b: 0, a: 1 };
		(end)

		(start code)
		// tint 50% to green
		ColorUtils.tint({
			from: '#ffff00',
			to: '#00ff00',
			amount: 0.5
		});
		// returns 'rgba(128, 128, 0, 1)'
*/


/**	
	@memberOf ColorUtils
	@method transform
	@param {object} obj
		an object with paramaters for overall saturation, see Properties for more info
	@property {string|object} from
		the source color to begin with, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@property {string|object} color
		synonymous with the from parameter
	@property {string|object} to
		the target color to transform to, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@property {number} amount
		the percentage of color to apply to the target. Defaults to 1, which is 100% color transform
	@property {string} format
		either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
		an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
	@returns {string|object} 
		either an 'rgba()' string or an rgba{} object
	@desc
		Color Transforms a color to another color by pulling colors out of original source; 
	@example
		// remove all colors but greens
		ColorUtils.transform({
			from: '#ffff00',
			to: '#00ff00',
			amount: 1,
			format: 'object'
		});
		// returns {r: 0, g: 255, b: 0, a: 1 };


		// remove all colors but greens
		ColorUtils.transform({
			from: '#ffff00',
			to: '#00ff00',
			amount: 1
		});
		// returns 'rgba(0, 255, 0, 1)'
*/


/**	
	@memberOf ColorUtils
	@method invert
	@param {object} obj
		an object with parameters for overall inversion, see Properties for more info
	@property {string|object} from
		the color to invert, represented as a HEX string:"#ff0000", 
		an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
		or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
	@property {string|object} color
		synonymous with the from parameter
	@property {string} format
		either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
		an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
	@desc
		Invert the color; returns either an 'rgba()' string or an rgba{} object
	@example
		// invert and return result as object
		ColorUtils.invert({
			color: '#ff0000',
			format: 'object'
		});
		// returns {r: 0, g: 255, b: 255, a: 1 };

		// invert and return result as string
		ColorUtils.invert({
			color: '#ff0000'
		});
		// returns 'rgba(0, 255, 255, 1)'
*/

/**
	@class ArrayUtils
	@desc
		This object contains additional methods for manipulating arrays.
*/

/** 
	@memberOf ArrayUtils
	@method combine
	@param {array} arr1
		first array
	@param {array} arr2
		second array appended to the first
	@desc
		A 'more friendly' concat function.
*/


/** 
	@memberOf ArrayUtils
	@method copy
	@param {array} array
		the array to duplicate
	@desc
		Creates a unique duplicate of the given array.
*/


/** 
	@memberOf ArrayUtils
	@method insertAt
	@param {array} array
		the array to modify
	@param {number} index
		the index to insert elements
	@param {arguments} arguments
		the elements to insert
	@desc
		Adds elements at a provided index. Returns a new array.
*/


/**
	@memberOf ArrayUtils
	@method removeAt
	@param {array} array
		the array to modify
	@param {number} index
		the index of the element to remove
	@desc
		Removes an element at a provided index. Returns a new array.
*/


/**
	@memberOf ArrayUtils
	@method remove
	@param {array} array
		the array to modify
	@param {number|string} item
		the item to remove from the array
	@desc
		Removes all instances of an element from the given array. Returns a new array.
*/


/**
	@memberOf ArrayUtils
	@method shuffle
	@param {array} array
		the array to modify
	@desc
		Shuffles the array into a random order.
*/


/**
	@memberOf ArrayUtils
	@method contains
	@param {array} array
		the array to check
	@param {number|string} item
		the item to check for in the array
	@desc
		Determines if a given array contains a given element. Returns a boolean.
*/

/**
	@class ImageUtils
	@desc
		This object contains methods necessary for manipulating images.
*/

/**
	@memberOf ImageUtils
	@method fitImageAtCoordinate
	@param {element} source
		The div with a background image
	@param {number} originX
		The x position to center on
	@param {number} originY
		The y position to center on
	@desc
		Positions a background image to fit the div size while centering around a point.  If the point is beyond the size bounds, it will align to that side.
*/

/* NOTE: DON'T import only "default" from ObjectUtils since the default
function is a reserved keyword. Importing into scope will likely cause
issues w/ code using the "default" keyword */

let mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {  
	constructor(superclass) {
		this.superclass = superclass;
	}

	with(...mixins) { 
		return mixins.reduce((c, mixin) => mixin(c), this.superclass);
	}
}

const LoaderBase = (superclass) => class extends superclass {  
	constructor(...args) {
		super(...args);
		const arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
		
		const L = this;
		
		L.onComplete = arg.onComplete || function(){};
		L.onFail = arg.onFail || function(){};
		L.onProgress = arg.onProgress || function(){};
		L.name = arg.name || '';
		L.scope = arg.scope || L;
		L.dataRaw;
		L.cacheBuster = arg.cacheBuster || false;

		L._failCalled = false;
	}

	_handleFail() {
		const L = this;
		// console.log( 'LoaderBase._handleFail()' )
		if ( !L._failCalled ){
			L._failCalled = true;
			L.onFail.call( L.scope, L );

			console.log( 'Loader "'+ L.name + '" Fail:', L.url );
		}
	}
};

function createXMLHttpRequest() {
	try { return new XMLHttpRequest() } catch(e){}
	try { return new ActiveXObject("Msxml2.XMLHTTP") } catch(e){}
	alert("XMLHttpRequest not supported");
	return null
}

function getFileName(url) {
	let extension = url.lastIndexOf('.');
	let directory = url.lastIndexOf('/') + 1;
	if (directory > extension)
		extension = undefined;
	return url.substring( directory, extension )
}



function getFileType(url) {
	url = url || '';
	const _index = url.indexOf('?');
	if (_index > -1){
		url = url.substr(0, _index);
	}
	const _split = url.match ( /[^\\]*\.(\w+)$/ );
	const _base64 = url.match ( /image\/(jpeg|jpg|png)/ );
	const _type = _split ? _split[1] : _base64 ? _base64[1] : 'unknown';
	
	return _type
}





function getParamsFromData(query) {
	if (typeof query === 'string') {
		/*
		 * TODO - check the string is formatted correctly?
		 */
		return query
	} else {
		let queryString = '';			
		for( let prop in query ) {
			console.log("      prop =", prop);
			queryString += prop + '=' + query[prop] + '&';
		}

		return queryString.substr(0, queryString.length - 1)
	}
}

const LoaderSource = (superclass) => class extends superclass {  
	constructor(...args) {
		super(...args);
		const arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
		
		const L = this;
		
		L.url = global.matchProtocolTo( arguments[0] || '' );
		
		if ( arg.platformGetUrl ){ 
			L.platformGetUrl = arg.platformGetUrl;
			L.url = arg.platformGetUrl(L.url);
		}

		L.fileName = arg.id === undefined ? getFileName(L.url) : arg.id;
		L.fileType = arg.fileType || getFileType(L.url);
	}
};

const LoaderTicker = (superclass) => class extends superclass {  
	constructor(...args) {
		super(...args);
	}

	_setTicker(args) {
		const L = this;
		let node = document.createElement('div');
		node.innerHTML = args.content;
		node.style.cssText = args.css || '';

		document.body.appendChild(node);

		const width = args.width != undefined ? args.width : node.offsetWidth;
		
		node.style.fontFamily = args.font || '';

		let _timeOut = setTimeout(function() {
			clearInterval(_interval);
			L._handleFail();
		}, 5000);

		let _interval = setInterval(function() {
			if (node.offsetWidth != width) {
				clearTimeout(_timeOut);
				clearInterval(_interval);
				
				L._handleTickerComplete(node);
			}
		}, 10);
	}

	_removeTickerNode(node) {
		node.parentNode.removeChild(node);
	}		
};

class Blank$1 {}

class ImageLoader extends mix(Blank$1).with(LoaderBase, LoaderSource, LoaderTicker) {
	constructor(...args) {
		super(...args);
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

		// used when only needing to render, such as writing into the DOM as markup <svg>
		this.renderOnly = !!arg.renderOnly;
		this.crossOrigin = arg.crossOrigin;
	}

	load() {
		const I = this;
		if (I.renderOnly) {
			I._setTicker({
				content: I.url,
				width: 0
			});
		} else {
			let img = new Image();
			img.id = I.fileName;
			img.crossOrigin = I.crossOrigin;
			img.onload = I._handleComplete.bind(I);
			img.onerror = I._handleFail;
			img.src = I.url;
		}
	}

	_handleComplete(event) {
		const I = this;
		// console.log('ImageLoader "' + I.name + '" is Complete')
		I.dataRaw = event.target;
		I.onComplete.call(I.scope, I);
	}
}

class Blank$2 {}

class InlineLoader extends mix(Blank$2).with(LoaderBase, LoaderSource) {
	constructor(...args) {
		super(...args);
	}

	load() {
		const I = this;
		let elem;
		if (I.fileType == 'css') {
			elem = I._createCssLink();
		} else if (I.fileType == 'html') {
			elem = I._createHtmlLink();
		} else {
			elem = I._createScript();
		}
		elem.charset = 'utf-8';
		elem.onload = I._handleComplete.bind(I);
		elem.onerror = I._handleFail;
		I.fileType == 'css' || I.fileType == 'html' ? (elem.href = this.url) : (elem.src = I.url);

		document.getElementsByTagName('head')[0].appendChild(elem);
	}

	_createCssLink() {
		let elem = document.createElement('link');
		elem.rel = 'stylesheet';
		elem.type = 'text/css';
		return elem
	}

	_createHtmlLink() {
		let elem = document.createElement('link');
		elem.rel = 'import';
		// elem.async = ''
		return elem
	}

	_createScript() {
		let elem = document.createElement('script');
		elem.type = 'text/javascript';
		return elem
	}

	_handleComplete(event) {
		const I = this;
		// console.log('InlineLoader "' + I.name + '" is Complete')
		I.dataRaw = event.target;
		I.onComplete.call(I.scope, I);
	}
}

class Blank$3 {}

class DataLoader extends mix(Blank$3).with(LoaderBase, LoaderSource) {
	constructor(...args) {
		super(...args);
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

		const D = this;
		D.method = (arg.method || 'get').toLowerCase();
		D.query = arg.query || null;
		D.responseType = arg.responseType || null;
	}

	load() {
		const D = this;
		// console.log('DataLoader "' + D.name + '" requesting:\n\t->', D.url)

		let queryString = null;
		const isPost = D.method === 'post';

		D.req = createXMLHttpRequest();

		if (D.responseType != undefined) D.req.responseType = D.responseType;

		let url = D.url;

		if (D.query) {
			queryString = getParamsFromData(D.query);
			if (!isPost) {
				url += '?' + queryString;
				queryString = null;
			}
		}

		if (D.cacheBuster) {
			url += D.query && !isPost ? '&' : '?';
			url += 'cb=' + new Date().getTime();
		}

		D.req.onreadystatechange = D._handleStateChange.bind(D);
		D.req.open(D.method, url, true);

		// Set Mime Type
		// NOTE: responseType has to be set AFTER the XmlHttpRequest.open() is called because IE is terrible
		switch (D.fileType) {
			case 'xml':
				if (D.req.overrideMimeType) D.req.overrideMimeType('text/xml');
				break
			case 'json':
				if (D.req.overrideMimeType) D.req.overrideMimeType('application/json');
				break
			case 'fba':
			case 'bin':
			case 'binary':
				D.responseType = D.req.responseType = 'arraybuffer';
				//D.req.overrideMimeType( 'text/plain charset=x-user-defined' )
				break
		}

		if (D.method === 'post') {
			D.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}

		D.req.send(queryString);
	}

	_handleStateChange(target) {
		const D = this;
		switch (D.req.readyState) {
			case 3:
				if (this.req.status == 200) {
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText;
					D._handleProgress(D);
				}
				break
			case 4:
				if (D.req.status == 200) {
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText;
					D._handleComplete(D);
				} else {
					D._handleFail({
						target: target
					});
				}
				break
		}
	}

	_handleProgress() {
		const D = this;
		D.onProgress.call(D.scope, D);
	}

	_handleComplete() {
		const D = this;
		// console.log('DataLoader "' + D.name + '" is Complete')
		D.onComplete.call(D.scope, D);
	}
}

class Blank$4 {}

class FontLoader extends mix(Blank$4).with(LoaderBase, LoaderSource, LoaderTicker) {
	constructor(...args) {
		super(...args);
	}

	load() {
		const F = this;

		// console.log('FontLoader "' + F.name + '" requesting:\n\t->', F.url)

		F.fileName = F.fileName.split('.')[0];

		let assembledFontRule = '@font-face { font-family: ' + F.fileName + '; src: url(' + F.url + ") format('truetype'); }";

		let getSheet = document.getElementById('RED_fontStyleSheet');
		if (getSheet) {
			getSheet.innerHTML += assembledFontRule;
		} else {
			let styleScript = document.createElement('style');
			styleScript.type = 'text/css';
			styleScript.media = 'screen';
			styleScript.id = 'RED_fontStyleSheet';
			styleScript.appendChild(document.createTextNode(assembledFontRule));
			document.getElementsByTagName('head')[0].appendChild(styleScript);
		}

		F._setTicker({
			content: ' !"\\#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~',
			css:
				'position:absolute; top:-1000px; font-size:100px; font-family:san-serif; font-variant:normal; font-style:normal; font-weight:normal; letter-spacing:0; white-space:nowrap;',
			font: F.fileName
		});
	}

	_handleTickerComplete(node) {
		const F = this;
		// added timeout to leave a rendered textfield on stage for initial textfields
		// to return proper offsetWidth values
		setTimeout(function() {
			// leave the test textfield temporarily to allow dom
			// to have a reference to rendered characters. hack?
			F._removeTickerNode(node);
		}, 300);

		F._handleComplete();
	}

	_handleComplete(event) {
		const F = this;
		// console.log('FontLoader "' + F.name + '" is Complete')
		F.dataRaw = F.fileName;
		F.onComplete.call(F.scope, F);
	}
}

/** 
	@class Loader
	@param {string|array|Loader} arg
		load target
	@param {object} arg
		Object with any of the following optional parameters for customizing the load routine.
	@property {string} query
	@property {string} name
	@property {boolean} prioritize
	@property {boolean} cacheBuster
	@property {string} method 
		"POST" or "GET"
	@property {object} scope
	@property {function} onComplete
	@property {function} onProgress
	@property {function} onFail
	@property {string} prepend
		A file path to be added to all loader targets.
	@property {function} platformGetUrl
		A callback method to wrap the url, such as DoubleClick's <code>Enabler.getUrl</code>.
	@property {string} fileType
		Manually assign the file type, eg: <code>jpg</code>, <code>svg</code>.
	@desc
		This class is designed to handle all load processes: images, fonts and data, even other Loaders! Below are multiple use case scenarios.
		<br><br>


		<b>Single Load:</b>
		<codeblock>
			var singleLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this });
			singleLoader.load();

			function handleLoadComplete( target ) {
				console.log( target.content[0].dataRaw );
			}
		</codeblock>
		<br><br>


		<b>Array of loads from one Constructor:</b>
		<codeblock>
			// Array load - you can pass in multiple files on creation of a Loader
			var arrayLoader = new Loader(['font1.ttf', 'font2.ttf'], { name:'fontLoader', onComplete:handleLoadComplete, prepend:adParams.commonPath + 'fonts/' });
			arrayLoader.load();

			function handleLoadComplete( target ) {
				console.log( target.content[0].dataRaw );
			}		
		</codeblock>
		<br><br>
		

		<b>Complex Load:</b>
		<codeblock>
			var myLoader = new Loader('images/img0.jpg', { onComplete:handleLoadComplete, scope:this });	

			// append to that loader
			myLoader.add('images/img1.jpg');

			// append multiple
			myLoader.add(['images/img2.jpg', 'images/img3.jpg']);
			myLoader.load();

			function handleLoadComplete( target ) {
				console.log( target.content[0].dataRaw );
			}		
		</codeblock>
		<br><br>


		<b>Nested Loads:</b>
		<codeblock>
			// Nested loads - best practice is to make a loader for one file type
			var masterLoader = new Loader({ name:'master', onComplete:handleAllComplete, onProgress:handleAllProgress, onFail:handleLoadFail, scope:this });

			// declare a var to reference later, then add it to main loader
			var _imgLoader = new Loader( [ 'images/img2.jpg', 'images/img3.jpg' ], { name:'load_images', prepend:'images/' });
			masterLoader.add( _imgLoader );

			// or just add a new loader instance
			masterLoader.add( new Loader( [ 'font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend:adParams.commonPath + 'fonts/' }) );
			masterLoader.add( new Loader( ['Ad_Data.js', 'NetUtils.js', 'Align.js', 'Analytics.js'], { name:'load_js', prepend:adParams.corePath + 'utils/' }) );
			masterLoader.load();

			function handleLoadComplete( target ) {
				console.log( target.content[0].dataRaw );
			}
			function handleLoadProgress( target ) {
				console.log( target.progress, target.rawProgress )
			}
			function handleLoadFail( target ) {
				console.log( target );
			}
			function handleAllComplete( target ) {
				var a = target.getLoader( _imgLoader )
				console.log( "Loader found by var:", a )

				var b = target.getContent( 'font1.ttf' );
				console.log( "Content found by name:", b );

				var c = target.getLoader( 'load_fonts' );
				console.log( "Loader found by url:", c );
			}		
		</codeblock>

*/

/* TODO
	- change getAllContent() to take secret boolean so can call getAllContentRaw(true) for no extra loop
	- ? comment out progress calculations
*/

class Blank {}

class Loader$1 extends mix(Blank).with(LoaderBase) {
	constructor(...args) {
		super(...args);
		let arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

		const L = this;

		L._queue = {};
		L._total = 0;
		L._active = false;
		L._startedCount = 0;

		L.prepend = arg.prepend || '';
		L.platformGetUrl = arg.platformGetUrl;
		L.fileType = arg.fileType || null;
		L.content = [];
		L.crossOrigin = arg.crossOrigin || undefined;

		L.add(arguments[0]);
	}

	/* ---------------------------------------------------------------------------------------------------------------- */
	// PUBLIC

	/**
		@memberOf Loader
		@method add
		@param {string|array|Loader} arg
			a file, array of files, or Loader instance
		@desc
			Add to the load queue: a single or array of files or even another Loader.
		@example
			// Single load
			var imgLoader = new Loader({ name:'img_loader' });
			
			// add to that loader
			imgLoader.add('images/img1.jpg');
			
			// add multiple
			imgLoader.add(['images/img2.jpg', 'images/img3.jpg']);
		
			// Nested loads - best practice is to make a loader for one file type
			var mainLoader = new Loader({ name:'main', onComplete:handleComplete });

			mainLoader.add( imgLoader );
			
			// or just add a new loader instance
			mainLoader.add( new Loader(['font1.ttf', 'font2.ttf'], { name:'load_fonts' }) );				
	*/
	add(arg) {
		const L = this;
		if (typeof arg === 'string') {
			// single load as first parameter
			L._addSingleLoad(arg);
		} else if (arg instanceof Array) {
			// first parameter is an Array of urls
			for (var i = 0; i < arg.length; i++) {
				L._addSingleLoad(arg[i]);
			}
		} else if (arg instanceof Loader$1) {
			if (arg.content && arg.content[0] && arg.content[0].fileType == 'fba') {
				L._addFbaSubLoads(arg.content[0]);
			} else {
				L._addSubLoad(arg);
			}
		}
	}

	/**
		@memberOf Loader
		@method load
		@desc
			Starts the load process.
		@example
			// Single load
			var imgLoader = new Loader({ onComplete:handleComplete });
			imgLoader.load();				
	*/
	load() {
		const L = this;
		L._active = true;
		if (L._total <= 0) {
			console.log('Loader "' + L.name + '" has NO assets to be loaded.');
		} else {
			let _has = false;
			let _output = '';
			for (let l in L._queue) {
				if (!(L._queue[l] instanceof Loader$1)) {
					if (!_has) {
						_has = true;
						_output += 'Loader "' + L.name + '" requesting:';
					}
					const fileName = L._queue[l].fileName;
					const extension = L._queue[l].fileType;
					const extensionIndex = fileName.indexOf('.' + extension);
					const fileAndExtension = extensionIndex > -1 ? fileName : fileName + '.' + extension;
					_output += '\n\t -> ' + (L._queue[l].prepend || '') + fileAndExtension;
				}
			}
			if (_has) console.log(_output);
		}

		L._startSingleLoad(0);
	}

	/**	
		@memberOf Loader
		@method getAllContent
		@returns {array}
			An array of LoaderData Objects with relevant loading information (like an Event Object).  
			Access the loaded content via the property 'dataRaw': an image, raw Json, raw XML, or font name
		@desc
			Get all loaded content from the Loader and all nested Loaders
		@example
			var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete });
			myLoader.load();

			function handleComplete( target ) {
				var myContent = target.getAllContent();
				console.log( "Content found:", myContent );
			}
	*/
	getAllContent() {
		let _found = [];
		function searchSubLoader(content) {
			for (let i = 0; i < content.length; i++) {
				//console.log( "   -> sub:", content[i] )
				if (content[i] instanceof Loader$1) {
					searchSubLoader(content[i].content);
				} else {
					_found.push(content[i]);
				}
			}
		}

		searchSubLoader(this.content);

		if (_found.length < 1) console.log('No Content found');

		return _found
	}

	/**	
		@memberOf Loader
		@method getAllContentRaw
		@returns {array}
			An array of only the raw data: an image, raw Json, raw XML, or font name
		@desc
			Get all raw loaded content from the Loader and all nested Loaders, no LoaderData Objects
		@example
			var myLoader = new Loader(['img1.jpg', 'img2.jpg', 'img3.jpg'], { onComplete:handleComplete });
			myLoader.load();

			function handleComplete( target ) {
				var myContent = target.getAllContentRaw();
				console.log( "Content found:", myContent );
			}
	*/
	getAllContentRaw() {
		let _content = this.getAllContent();
		for (let i = 0; i < _content.length; i++) {
			_content[i] = _content[i].dataRaw;
		}
		return _content
	}

	/**	
		@memberOf Loader
		@method getLoader
		@param {string} id
			the string optionally assigned to the 'name' property or the variable assigned to the Loader instance
		@returns {Loader}
		@desc
			Get the Loader instance from the Loader or any nested Loader
		@example
			var mainLoader = new Loader({ name:'main', onComplete:handleLoadComplete });
			mainLoader.add( new Loader( [ 'font1.ttf', 'font2.ttf' ], { name:'load_fonts', prepend:adParams.commonPath + 'fonts/' }) );
			mainLoader.add( new Loader( ['Ad_Data.js', 'NetUtils.js'], { name:'load_js', prepend:adParams.corePath + 'utils/' }) );
			mainLoader.load();

			function handleLoadComplete( target ) {
				var fontLoader = target.getLoader('load_fonts');
			}
	*/
	getLoader(id) {
		let _found = null;
		function searchSubLoader(content) {
			for (let i = 0; i < content.length; i++) {
				//console.log( "   -> sub:", content[i] )
				if (content[i] instanceof Loader$1) {
					if (content[i] && (content[i].name === id || content[i] === id)) {
						_found = content[i];
					} else {
						searchSubLoader(content[i].content);
					}
				}
			}
		}

		searchSubLoader(this.content);

		if (!_found) console.log('No Loader found of that name');

		return _found
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	_addSingleLoad(url, fbaOverwrite) {
		// console.log('_addSingleLoad()', url, fbaOverwrite)
		const L = this;

		// fbaOverwrite is an array [ file name, file extension ]
		const fileType = fbaOverwrite ? fbaOverwrite[1] : L.fileType || getFileType(url);
		let loaderType;
		// console.log('\t fileType:', fileType)

		switch (fileType) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'png':
			case 'svg':
				loaderType = ImageLoader;
				break
			case 'ttf':
			case 'woff':
				loaderType = FontLoader;
				break
			case 'json':
			case 'fba':
			case 'bin':
			case 'binary':
				loaderType = DataLoader;
				break
			default:
				loaderType = InlineLoader;
		}

		// either the data as binary OR the file path and name
		const urlChoice = fbaOverwrite ? url : L.prepend + url;
		// console.log('\t url:', url, '| loaderType:', loaderType)

		var singleLoader = new loaderType(urlChoice, {
			scope: L,
			platformGetUrl: L.platformGetUrl,
			onComplete: L._handleSingleLoadComplete,
			onFail: L._handleFail,
			fileType: fileType,
			cacheBuster: L.cacheBuster,
			crossOrigin: L.crossOrigin
		});
		// console.log('\t singleLoader:', singleLoader)

		// from fba, the files are binary, so there is
		// no file name to reference so set it here
		if (fbaOverwrite) {
			singleLoader.fileName = fbaOverwrite[0];
		}

		singleLoader.queueIndex = L._total;

		L._queue[L._total] = singleLoader;
		L._total++;
		// console.log(L._total, L._queue)
	}

	_addSubLoad(loader) {
		const L = this;
		//console.log(L.name, '_addSubLoad()')
		loader.onComplete = L._handleSingleLoadComplete.bind(L);
		loader.onProgress = L._handleProgress.bind(L);
		loader.onFail = L._handleFail;
		//loader.platformGetUrl = L.platformGetUrl;
		loader.queueIndex = L._total;
		L._queue[L._total] = loader;
		L._total++;
	}

	_addFbaSubLoads(loader) {
		// console.log("_addFbaSubLoads()", loader)

		// Conversion between uint8s and uint32s.
		let uint8 = new Uint8Array(4);
		let uint32 = new Uint32Array(uint8.buffer);

		// start after = signature(8 bytes) + IHDR(25 bytes) + fbAc(16 bytes total, but only 11: size,type,content-1 )
		let idx = 44;

		const chunkTotal = new Uint8Array(loader.dataRaw, idx, 1)[0];
		//console.log( 'number of images as chunks:', chunkTotal )

		// skip over rest of fbAc chunk: count value byte + CRC 4 bytes
		idx += 5;

		for (let i = 0; i < chunkTotal; i++) {
			// size, type, content, crc
			// get the size of next chunk as on UintArray
			let sizeOfChunk = new Uint8Array(loader.dataRaw, idx, 4);

			// Read the length of the current chunk, which is stored as a Uint32.
			// this one has to be a loop, as values get assigned to uint8, that changes buffer of uint32
			// also, the values must be set reversed, henced the count down loop
			let up = 4;
			for (var k = 0; k < 4; k++) {
				//console.log( k, up, sizeOfChunk[k] )
				uint8[--up] = sizeOfChunk[k];
			}

			// all chunk data NOT including the type
			let length = uint32[0];

			idx += 7;

			// Get the chunk type in ASCII, only last character really matters
			let type = String.fromCharCode(new Uint8Array(loader.dataRaw, idx++, 1));

			//console.log( '\ttype:', type, '\tlength:', length )
			let fileNameLengthArray = new Uint8Array(loader.dataRaw, idx + 3, 1);
			let fileNameLength = fileNameLengthArray[0] || 0; // default to zero incase array fails? maybe unnecessary

			let nameBuffer = new Uint8Array(loader.dataRaw, idx + 4, fileNameLength);
			let fileName = String.fromCharCode.apply(String, nameBuffer);

			// first add to the file name length 4 bytes: file name length byte count
			fileNameLength += 4;

			// offset the array start and length by the file name length
			let chunkData = new Uint8Array(loader.dataRaw, idx + fileNameLength, length - fileNameLength);
			// NOTE: ArrayBuffer.slice() does not exist in IE10, so have to do it manually inline
			//var chunkData = new Uint8Array(chunk.buffer.slice(4))

			// skip over the content AND skip over the CRC value by incrementing by 4 bytes
			idx += length + 4;

			let fileNameSplit = fileName.split('.');
			//var blobFileType = '';// 'application/octet-stream';
			let blobFileType = type == 'f' ? 'application/x-font-ttf' : 'image/' + (fileNameSplit[1] == 'svg' ? 'svg+xml' : fileNameSplit[1]);
			let blob = new Blob([chunkData], { type: blobFileType });
			let url = URL.createObjectURL(blob);
			// url will be ~ blob:32c3c7af-ef04-414f-a073-685602fe8a28
			//console.log( fileNameSplit, blobFileType, url )
			this._addSingleLoad(url, fileNameSplit);
		}
	}

	_startSingleLoad(i) {
		const L = this;
		const _inst = L._queue[i];
		// console.log(L.name, '_startSingleLoad()', 'index:', i, 'total:', L._total)
		if (L._total == 0) {
			// fire a complete because there are no requests
			L._handleComplete();
		} else {
			if (i < L._total) {
				// console.log( L.name, '_startSingleLoad() ->', _inst )
				if (!(_inst instanceof Loader$1)) {
					//console.log( _inst.name, 'is a subloader' )
					//} else {
					if (i < L._total - 1) {
						L._startLoadTimeOut(++i);
					}
				}
				_inst.load();
			}
		}
	}

	_startLoadTimeOut(i) {
		const L = this;
		setTimeout(function() {
			L._startSingleLoad(i);
		}, 10);
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS
	_handleSingleLoadComplete(target) {
		const L = this;
		// console.log("_handleSingleLoadComplete(), target:", target)
		L.content[target.queueIndex] = target;
		delete L._queue[target.queueIndex];

		L._handleProgress();

		// is a nested Loader
		if (target.url == undefined) {
			//console.log( '"' + L.name + '" nested Loader "' + target.name + '" Complete' );
			if (target.queueIndex < L._total - 1) {
				L._startLoadTimeOut(target.queueIndex + 1);
			}
		}
	}

	_handleProgress() {
		const L = this;
		const _length = L.content.length;
		let _count = 0;
		for (let i = 0; i < _length; i++) {
			if (L.content[i]) _count++;
		}
		// console.log(L.name, '_handleProgress()', '_count:', _count, 'total:', L._total)

		const _consecutive = _count;
		let _subProgress = 0;

		if (_count < L._total && L._queue[_count]) {
			_subProgress = L._queue[_count].progress / L._total || 0;
		}

		L.progress = _consecutive / L._total + _subProgress;
		L.rawProgress = _count / L._total + _subProgress;

		L.onProgress.call(L.scope, L);
		//console.log( 'progress')
		if (_count >= L._total) {
			//console.log( 'Loader calling _handleComplete()')
			L._handleComplete();
		}
	}

	_handleComplete() {
		const L = this;
		// console.log('Loader "' + L.name + '" is Complete')
		L.onComplete.call(L.scope, L);
	}
}

/**
	@class DateUtils

	@classdesc
		<span style="color:#ff0000"><b>WARN:</b><br>
		This class has been deprecated.  See the dates/ package: {@link DateFormatter}, {@link DateManager}, {@link DateSchedule}, {@link Timezone}, {@link TzDate} 
		</span>

		<br><br>

		This class provides utilities for mananipulating the Javascript "Date" object.<br><br>

		Because ads often need to display date/time in timezones other than that of the user, much of this involves
		a paradign of ignoring the Date-object's tzOffset and instead maintaining a "tzDesignation". This ends up allowing 
		for apples-to-apples comparisons/manipulations.<br><br>

		There are messaging utilities. This makes it easy to generate the correct date-messaging as 
		an event draws closer. See "selectMessagingForDate()".<br><br>

		There are also formatting utilities...making it easier to derive the various syntaxes in which dates need 
		to be expressed.<br><br>

		<b>Debugging:</b><br>
		
		There are several ways to test dates, INSTEAD of changing your computer clock:<br>
		<ul>
			<li>In your Index: <br>
				Change the return value of `adParams.dateSettings.dateOverride`.</li><br>

			<li>Local Server or iframe Query-string:<br>
				&externalDate=YYYY-MM-DD HH:MM:SS GMT-####</li><br>

		 	<li>Publish to client-projects<br>
		 		There is a date/time picker interface.</li><br>
		 </ul>
*/

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Align_old

	WARN:
		This class has been depreciated. It is only used for migrating old ads when there is a time sensitive
		deadline.  Otherwise, old units that are migrated should have their Align methods updated to use the
		<Align> class.

	Description:
		Utilities for aligning objects.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/**
	@class DateStates
	@desc
		<span style="color:#ff0000"><b>WARN:</b><br>
		This class has been deprecated.  See DateSchedule
		</span>

		<br><br>

		Used to create a schedule of dates. Then this class can be queried for:
		<ul>
			<li>a label representing the current valid date</li>
			<li>an index which can be used to manually retrieve the current valid object</li>
		</ul>
		
		Also interfaces with {@link StaticGenerator} in order to create a schedule of "static states" for the ad.
		<br><br>

		<b>AdData.js:</b><br>
		It is recommended that you centralize your schedule in AdData. This way, changes to the schedule can easily 
		be achieved with one common update.<br>
		<codeblock>
			this.dateStates = new DateStates();
			this.dateStates.addDate( '2015-08-01 12:00:00', DateUtils.TZ_LOCAL );
			this.dateStates.addDate( '2015-08-30 12:00:00', DateUtils.TZ_LOCAL );
			this.dateStates.traceSchedule();
		</codeblock>
		<br><br>

		<b>build.js:</b><br>
		In <u>build.View</u>, you can write functions that build out the DOM for each of your states. 
		<codeblock>
			this.buildDateState0 = function() {
				console.log( 'View.buildDateState0()' );
				// Markup...
			}
			this.buildDateState1 = function() {
				console.log( 'View.buildDateState1()' );
				// Markup...
			}
			this.buildDateState2 = function() {
				console.log( 'View.buildDateState2()' );
				// Markup...
			}
		</codeblock>
		<br><br>

		In <u>build.Control</u>, you can write the logic to switch which build function gets called. Please *NOTE*, the first date is ALWAYS
		passed. In other words, index 0, or "date-0" is the default state, before any of your dates have passed.
		<codeblock>
			switch( adData.dateStates.getCurrentLabel()) {
				case 'date-0': // default state
					View.buildDateState0();
					break;

				case 'date-1': // first date has passed
					View.buildDateState1();
					break;

				case 'date-2': // second date has passed
					View.buildDateState2();
					break;
			}
		</codeblock>
		<br><br>
*/

// TODO - update expand() / collapse() to new requestExpand() / requestCollapse()
//		- change onExitCollapse to event based, similar to Gesture for clarity
//		- https://www.google.com/doubleclick/studio/docs/sdk/html5/en/class_studio_Enabler.html
/**
	@class DcsExpandable
	@desc
		A static class for DoubleClick Expandable Units: Creates Markup and handles core expand/collapse logic.

	@example
		// Parameters found in the adParams object in the index		
		expandable: {
			expandedX			: 0,	// expanded x position
			expandedY			: 0,	// expanded y position
			collapsedX		: 0,	// collapsed y position
			collapsedY		: 0,	// collapsed x position
			collapsedWidth		: 300,	// collapsed height
			collapsedHeight	: 50,	// collapsed width
			expanded			: true,	// sets whether or not the unti starts in the expanded state
			collapseOnExit		: true	// sets whether or not the unit collapses when exiting the unit
		},
*/

/**
	@class GestureEvent
	@desc
		This module has custom events to be used with the Gesture module. {@link Gesture}
*/

var _kills = {};
var _eventLooping = false;

/**
			@memberOf GestureEvent
			@class GestureEvent.Event
			@param {string} name
				The event type name
			@param {number} mouseGlobalX
				The mouse x on the page
			@param {number} mouseGlobalY
				The mouse y on the page
			@param {number} mouseLocalX
				The mouse x relative to the element position
			@param {number} mouseLocalY
				The mouse y relative to the element position
			@param {number} elementX
				The element x position
			@param {number} elementY
				The element y position
			@param {number} distanceX
				The distance moved on the x, only used for drags and swipes
			@param {number} distanceY
				The distance moved on the y, only used for drags and swipes
			@param {number} velocityX
				The distance moved on the x since previous event fired, essentially the speed
			@param {number} velocityY
				The distance moved on the y since previous event fired, essentially the speed
			@desc
				Creates a new CustomEvent with properties assigned to it, accessible fomr the passed through event to the handler
				
			@example
				Gesture.add ( myDiv, GestureEvent.CLICK, handleClick );
				function handleClick( event ) {
					console.log( event )
					console.log( 'global mouse:', event.mouse.global.x, event.mouse.global.y )
					console.log( 'local mouse:', event.mouse.local.x, event.mouse.local.y )
					console.log( 'element:', event.element.x, event.element.y )
				}	
				Gesture.add ( dragDiv, GestureEvent.DRAG, handleDrag );
				function handleDrag( event ) {
					console.log( event )
					console.log( 'element:', event.element.x, event.element.y )
					console.log( 'distance:', event.distance.x, event.distance.y )
					console.log( 'velocity:', event.velocity.x, event.velocity.y )
				}					
		*/
function createEvent(
	name,
	mouseGlobalX,
	mouseGlobalY,
	mouseLocalX,
	mouseLocalY,
	elementX,
	elementY,
	distanceX,
	distanceY,
	velocityX,
	velocityY
) {
	var E = new CustomEvent(name);
	E.mouse = {
		global: {
			x: mouseGlobalX,
			y: mouseGlobalY
		},
		local: {
			x: mouseLocalX,
			y: mouseLocalY
		}
	};
	E.element = {
		x: elementX || 0,
		y: elementY || 0
	};
	E.distance = {
		x: distanceX || 0,
		y: distanceY || 0
	};
	E.velocity = {
		x: velocityX || 0,
		y: velocityY || 0
	};
	E.direction = {
		x: velocityX > 0 ? 'right' : velocityX < 0 ? 'left' : null,
		y: velocityY > 0 ? 'down' : velocityY < 0 ? 'up' : null
	};

	return E
}

const Event = createEvent;

/**
		@memberOf GestureEvent
		@method stop
		@param {event} event
			The event parameter from the event handler
		@desc
			Stops all future events of the type during the event loop, is a native equivilent to event.stopImmediatePropogation().
			It does NOT remove any listeners, simply stops the event from bubbling up through the chain.
			
		@example
			Gesture.add ( parentDiv, GestureEvent.CLICK, handleParentClick );
			function handleParentClick( event ) {
				// This will not be heard
				console.log( 'parent click heard' )
			}
			
			Gesture.add ( childDiv, GestureEvent.CLICK, handleChildClick );
			function handleChildClick( event ) {
				GestureEvent.stop ( event )
				console.log( 'child click heard' )
			}					
	*/


function isStopped(type) {
	return _kills[type] != undefined
}

const stopped = isStopped;

// A flag for the start of the event loop through all bases
function startPoint() {
	if (!_eventLooping) {
		// the end of event loop has been reached, so reset things
		_eventLooping = true;
		_kills = {};
	}
}
// A flag to reset any bubble killing
function endPoint() {
	_eventLooping = false;
}

/**	
	@memberOf GestureEvent	
	@const {string} OVER
	@desc
		Represents a 'mouseover', fired on desktop cursor roll over
	@example
		GestureEvent.OVER
*/


/**	
	@memberOf GestureEvent	
	@const {string} OUT
	@desc
		Represents a 'mouseout', fired on desktop cursor roll out
	@example
		GestureEvent.OUT
*/


/**	
	@memberOf GestureEvent	
	@const {string} MOVE
	@desc
		Represents a 'mousemove', fired on desktop cursor move
	@example
		GestureEvent.MOVE
*/


/**	
	@memberOf GestureEvent	
	@const {string} PRESS
	@desc
		Represents an 'onPress', fired on mousedown / touch start
	@example
		GestureEvent.PRESS
*/


/**	
	@memberOf GestureEvent	
	@const {string} RELEASE
	@desc
		Represents an 'onRelease', fired on mouseup / touch end
	@example
		GestureEvent.RELEASE
*/


/**	
	@memberOf GestureEvent	
	@const {string} CLICK
	@desc
		Represents a 'click', fired on click / touch end
	@example
		GestureEvent.CLICK
*/


/**	
	@memberOf GestureEvent	
	@const {string} DRAG
	@desc
		Represents an 'onDrag', fired after an element is selected and before released. <br>
		Element data objects included: selection position, element position, velocity of move	
	@example
		GestureEvent.DRAG
*/


/**	
	@memberOf GestureEvent	
	@const {string} DRAG_START
	@desc
		Represents an 'onDragStart', fired after an element is selected, when first moved and before released. <br>
		Element data objects included: selection position, element position
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.DRAG_START, handleDragStart );
		//
		function handleDragStart ( event ){
			// coordinate position of mouse/touch
			console.log( event.position );

			// coordinate position of target element
			console.log( event.element );
		}
*/


/**	
	@memberOf GestureEvent	
	@const {string} DRAG_STOP
	@desc
		Represents an 'onDragStop', fired after an element is selected, moved, then released. <br>
		Element data objects included: selection position, velocity of last move
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.DRAG_STOP, handleDragStop );
		//
		function handleDragStop ( event ){
			// coordinate position of mouse/touch
			console.log( event.position );

			// velocity, ie change in distance, of target element
			console.log( event.velocity );
		}
*/


/**	
	@memberOf GestureEvent	
	@const {string} SWIPE
	@desc
		Represents an 'onSwipe', fired just after a DRAG_STOP, but different event properties available. <br>
		Element data objects included: direction, distance, velocity
	@example
		Gesture.addEventListener ( myDiv, GestureEvent.SWIPE, handleSwipe );
		//
		function handleSwipe ( event ){
			// direction of swipe, as strings 
			console.log( event.direction );

			// distance covered from down to release
			console.log( event.distance );

			// velocity, aka speed of swipe
			console.log( event.velocity );
		}
*/

/**
	@class GestureBase

	@desc
		-- INTERNAL MODULE --
		This module is used exclusively by Gesture.  When a dom element has an event listener registered, it creates an instance of this module 
		to hold all the event handlers for the dom element.  Every dom element gets a new GestureBase instance. {@link Gesture}
	
*/
class GestureBase {
	constructor(elem) {
		var G = this;
		G.elem = elem;
		G.hasActiveChildren = true;
		G.debug = false;
		G.eventList = [];

		G._isDragEnabled = false;
		// isDragging also used for swipe event check
		G._isDragging = false;
		G._give = 2;

		// offset coordinate for element
		G._oX = 0;
		G._oY = 0;

		// previous coordinates for drag/swipe
		G._p1X = 0;
		G._p1Y = 0;
		G._p2X = 0;
		G._p2Y = 0;

		// start coordinate
		G._sX = 0;
		G._sY = 0;

		// velocity
		G._vX = 0;
		G._vY = 0;

		G._cursor = 'mouse';
		G._start = 'down';
		G._end = 'up';

		G.init();
	}

	init() {
		var G = this;
		if (G.debug) console.log('GestureBase.init()');

		G._handleTouchStart = G._handleTouchStart.bind(G);
		G._handleDown = G._handleDown.bind(G);
		G._handleDrag = G._handleDrag.bind(G);
		G._handleUp = G._handleUp.bind(G);

		G._elemAdd = G.elem.addEventListener.bind(G.elem);
		G._elemRemove = G.elem.removeEventListener.bind(G.elem);

		G._reset();
	}

	// replace addEventListener so can flag the event type
	register(name, handler) {
		var G = this;
		if (G.debug) console.log('GestureBase.register(', name, ')');

		G.eventList.push(name);
		G._checkDragEnabled();

		// then actually add the listener
		G._elemAdd(name, handler);
	}

	unregister(name, handler) {
		var G = this;
		if (G.debug) console.log('GestureBase.unregister(', name, ')');

		var index = G.eventList.indexOf(name);
		if (index >= 0) {
			G.eventList.splice(index, 1);
		}
		G._checkDragEnabled();

		G._elemRemove(name, handler);
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// UTILITY
	_reset() {
		var G = this;
		G._cursor = 'mouse';
		G._start = 'down';
		G._end = 'up';
		G.elem.addEventListener('touchstart', G._handleTouchStart);

		// listen for both touch and mouse, except on iOS devices
		if (Device$1.os != 'ios') G.elem.addEventListener('mousedown', G._handleDown);
	}

	_checkDragEnabled() {
		var G = this;
		var hasDragEventIndex = G.eventList.join('').indexOf('onDrag');

		// check if it is a drag, therefore enabling dragability
		G._isDragEnabled = hasDragEventIndex > -1;
	}

	// Android stores things like pageX in an array. This scopes the internally used event properly
	_getEventScope(event) {
		//if( this.debug ) console.log( 'GestureBase._getEventScope(), event:', event );
		// check for existence of changedTouches instead
		//return ( Device.os == 'android' && event instanceof TouchEvent ) ? event.changedTouches[0] : event ;
		return event.changedTouches ? event.changedTouches[0] : event
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// WINDOW EVENT ENABLE
	_add(type, handler) {
		window.addEventListener(this._cursor + type, handler);
	}

	_remove(type, handler) {
		window.removeEventListener(this._cursor + type, handler);
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// HANLDERS
	_handleDown(event) {
		var G = this;
		if (G.debug) console.log('GestureBase._handleDown()');

		startPoint();

		G.elem.removeEventListener('touchstart', G._handleTouchStart);
		if (Device$1.os != 'ios') G.elem.removeEventListener('mousedown', G._handleDown);

		G._isDragging = false;

		G._add(G._end, G._handleUp);
		G._add('move', G._handleDrag);

		var touch = G._getEventScope(event);
		var mouseX = touch.pageX;
		var mouseY = touch.pageY;

		var elemRect = G.elem.getBoundingClientRect();
		var localOffsetX = mouseX - elemRect.left;
		var localOffsetY = mouseY - elemRect.top;

		var localX = G.elem.x || getCss(G.elem, 'x');
		var localY = G.elem.y || getCss(G.elem, 'y');
		var globalOffsetX = elemRect.left - localX;
		var globalOffsetY = elemRect.top - localY;

		G._oX = globalOffsetX + localOffsetX;
		G._oY = globalOffsetY + localOffsetY;

		var elemPositionX = mouseX - G._oX;
		var elemPositionY = mouseY - G._oY;

		// reset the dragging vars
		G._sX = G._p1X = G._p2X = mouseX;
		G._sY = G._p1Y = G._p2Y = mouseY;

		/*console.log( 
			'\n\t_handleDown()',
			'| mouse:', mouseX, mouseY, 
			'| localOffset:', localOffsetX, localOffsetY,
			'| local:', localX, localY,
			'| globalOffset:', globalOffsetX, globalOffsetY,
			'| totalOffset:', G._oX, G._oY,
			'| elemPosition:', elemPositionX, elemPositionY,
			'\n\n'
		)*/

		localCreateEvent('onPress');

		function localCreateEvent(name) {
			if (stopped(name)) return
			var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY);
			if (G.debug) console.log(' -> dispatch', name);
			G.elem.dispatchEvent(newEvent);
		}
	}

	_handleUp(event, bypass) {
		var G = this;
		if (G.debug) console.log('GestureBase._handleUp()');

		G._remove(G._end, G._handleUp);
		G._remove('move', G._handleDrag);

		var touch = G._getEventScope(event);
		var mouseX = touch.pageX;
		var mouseY = touch.pageY;

		var elemRect = G.elem.getBoundingClientRect();
		var localOffsetX = mouseX - elemRect.left;
		var localOffsetY = mouseY - elemRect.top;

		var elemPositionX = mouseX - G._oX;
		var elemPositionY = mouseY - G._oY;

		if (bypass !== true) {
			localCreateEvent('onRelease');
		}

		var offsetTop = elemRect.top + window.pageYOffset;
		var offsetBottom = offsetTop + elemRect.height;
		var offsetLeft = elemRect.left + window.pageXOffset;
		var offsetRight = offsetLeft + elemRect.width;

		if (G._isDragging) {
			if (G._isDragEnabled) {
				G._dragEndOrSwipe('onDragStop');
			}
			console.log('  -> No CLICK Fired, was dragging');
		} else {
			if (mouseX > offsetLeft && mouseX < offsetRight && mouseY > offsetTop && mouseY < offsetBottom) {
				localCreateEvent('onSelect');
			}
		}

		function localCreateEvent(name) {
			if (stopped(name)) return
			var newEvent = new Event(
				name,
				mouseX,
				mouseY,
				localOffsetX,
				localOffsetY,
				elemPositionX,
				elemPositionY,
				0,
				0,
				G._vX,
				G._vY
			);
			if (G.debug) console.log(' -> dispatch', name);
			G.elem.dispatchEvent(newEvent);
		}

		if (G._isDragging) {
			G._dragEndOrSwipe('onSwipe');
		}

		G._reset();

		// this prevents the second mouse down on Android
		event.preventDefault();

		endPoint();
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// TOUCH BYPASSING
	// This will stop from both touch and mouse events firing, thus doubling every Gesture Event fired.
	_handleTouchStart(event) {
		var G = this;
		if (G.debug) console.log('GestureBase._handleTouchStart()');

		// Change the native events to listen for the rest of the system
		G._cursor = 'touch';
		G._start = 'start';
		G._end = 'end';

		G._handleDown(event);
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// DRAG
	_handleDrag(event) {
		var G = this;
		if (G.debug) console.log('GestureBase._handleDrag()');

		var touch = G._getEventScope(event);
		var mouseX = touch.pageX;
		var mouseY = touch.pageY;

		var diffx1 = mouseX - G._p1X;
		var diffx2 = mouseX - G._p2X;
		G._vX = (diffx2 - diffx1) / 2 + diffx1;

		var diffy1 = mouseY - G._p1Y;
		var diffy2 = mouseY - G._p2Y;
		G._vY = (diffy2 - diffy1) / 2 + diffy1;

		var elemPositionX = mouseX - G._oX;
		var elemPositionY = mouseY - G._oY;

		var elemRect = G.elem.getBoundingClientRect();
		var localOffsetX = mouseX - elemRect.left;
		var localOffsetY = mouseY - elemRect.top;

		/*console.log( 
			'\t_handleDrag()',
			'| mouse:', mouseX, mouseY, 
			'| totalOffset:', G._oX, G._oY,
			'| elemPosition:', elemPositionX, elemPositionY,
			'| velocity:', G._vX, G._vY,
			'| distance:', G._p1X - G._sX, G._p1Y - G._sY
		)*/

		if (G._isDragging) {
			if (G._isDragEnabled) {
				localCreateEvent('onDrag');
			}
		} else {
			// check the inital movement to register as dragging or just a click
			if (Math.abs(G._sX - mouseX) > G._give || Math.abs(G._sY - mouseY) > G._give) {
				G._isDragging = true;

				if (G._isDragEnabled) {
					// dispatch when offset distance is exceeded
					localCreateEvent('onDragStart');
				}
			}
		}

		function localCreateEvent(name) {
			if (stopped(name)) return
			var newEvent = new Event(
				name,
				mouseX,
				mouseY,
				localOffsetX,
				localOffsetY,
				elemPositionX,
				elemPositionY,
				G._p1X - G._sX,
				G._p1Y - G._sY,
				G._vX,
				G._vY
			);
			if (G.debug) console.log(' -> dispatch', name);
			G.elem.dispatchEvent(newEvent);
		}

		G._p2X = G._p1X;
		G._p1X = mouseX;

		G._p2Y = G._p1Y;
		G._p1Y = mouseY;
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// DRAG END | SWIPE
	_dragEndOrSwipe(type) {
		var G = this;
		if (G.debug) console.log('GestureBase._dragEndOrSwipe()', type);

		if (stopped(name)) return

		var elemRect = G.elem.getBoundingClientRect();
		var evt = new Event(
			type,
			G._p1X,
			G._p1Y,
			G._p1X - elemRect.left,
			G._p1Y - elemRect.top,
			G._p1X - G._oX,
			G._p1Y - G._oY,
			// since _xp is assigned after moving, must use _p2X
			G._p2X - G._sX,
			G._p2Y - G._sY,
			G._vX,
			G._vY
		);
		if (G.debug) console.log(' -> dispatch', type);
		G.elem.dispatchEvent(evt);
	}
}

// TODO - ? remove gestureBase if no events added
// 		- ? total distance

/**
	@class Gesture
	@desc
		This module is used for seamless use of Mouse / Touch Events, such as click vs tap, mousedown vs touch down, etc.  
		This class figures which to use and reports custom events.<br><br>
	
		See {@link GestureEvent} for available events.
*/
var Gesture = new function() {
	var G = this;

	var _targets = [];
	var _disableList = [];
	var _eventPass = document.createEventObject != undefined;
	G._kills = {};

	/* ------------------------------------------------------------------------------------------------------------- */
	// PUBLIC METHODS

	/**
		@memberOf Gesture
		@method add | addEventListener
		@param {element} target
			The DOM element
		@param {string} name
			The event's name as a String or GestureEvent constant
		@param {function} handler
			The function to be called on event trigger
		@desc
			Registers an event so that the listener receives notification of an event.
			
		@example
			Gesture.addEventListener( myDiv, GestureEvent.CLICK, handleClick );
			function handleClick( event ) {
				console.log( 'Click heard' );
			}					
	*/
	G.add = G.addEventListener = function(target, name, handler) {
		var _gestureBase = getGestureBase(target);
		_gestureBase.register(name, handler);
		setCss(target, 'cursor', 'pointer');

		// OVERWRITES mouseChildren(false) of parent
		setCss(target, 'pointer-events', 'auto');
	};

	/**
		@memberOf Gesture
		@method remove | removeEventListener
		@param {element} target
			The DOM element
		@param {string} name
			The event's name as a String or GestureEvent constant
		@param {function} handler
			The function registered for call on event trigger
		@desc
			Unregisters an event of notifications.

		@example
			Gesture.removeEventListener ( myDiv, GestureEvent.CLICK, handleClick );					
	*/
	G.remove = G.removeEventListener = function(target, name, handler) {
		var _gestureBase = getGestureBase(target);
		if (_gestureBase) {
			_gestureBase.unregister(name, handler);
			if (_gestureBase.eventList.length <= 0) {
				setCss(target, 'cursor', 'auto');
			}
		}
	};

	/**
		@memberOf Gesture
		@method disable
		@param {element} target
			The DOM element
		@desc
			Disables a DOM element from responding the mouse/touch/gesture events. For bubbling events, such as click, this will disable its children as well.
		
		@example	
			Gesture.disable( myDiv );
	*/
	G.disable = function(target) {
		var gestureBase = getGestureBase(target);
		_disableList.push(gestureBase);

		if (_eventPass) {
			gestureBase.register(GestureEvent.CLICK, handlePassThroughClick);
			setCss(target, 'cursor', 'auto');
		} else {
			setCss(target, 'pointer-events', 'none');
		}
	};

	/**
		@memberOf Gesture
		@method disableChildren
		@param {element} target
			The DOM element
		@desc
			Disables all child DOM elements from responding the mouse/touch/gesture events. For bubbling events, such as click, this is unnecessary

		@example
			Gesture.disableChildren ( myDiv );
	*/
	G.disableChildren = function(target) {
		setActiveChildren(target, false);
	};

	/**
		@memberOf Gesture
		@method enable
		@param {element} target
			The DOM element
		@desc
			Enables all a DOM element to responding the mouse/touch/gesture events. For bubbling events, such as click, this will enable its children as well.

		@example
			Gesture.disable ( myDiv );
	*/

	G.enable = function(target) {
		var gestureBase = getGestureBase(target);

		for (var i = 0; i < _disableList.length; i++) {
			if (gestureBase == _disableList[i]) {
				if (_eventPass) {
					gestureBase.unregister(GestureEvent.CLICK, handlePassThroughClick);
				} else {
					setCss(target, 'pointer-events', 'auto');
					setCss(target, 'cursor', 'pointer');
				}
				break
			}
		}
	};

	/**
		@memberOf Gesture
		@method enableChildren
		@param {element} target
			The DOM element
		@desc
			Enables all child DOM elements to responding the mouse/touch/gesture events. For bubbling events, such as click, this is unnecessary

		@example
			Gesture.enableChildren ( myDiv );
	*/
	G.enableChildren = function(target) {
		setActiveChildren(target, true);
	};

	/* ------------------------------------------------------------------------------------------------------------- */
	// PRIVATE METHODS
	function getGestureBase(target) {
		var _gestureBase = null;
		for (var i = 0; i < _targets.length; i++) {
			if (_targets[i].elem === target) {
				_gestureBase = _targets[i];
				break
			}
		}
		if (!_gestureBase) {
			_gestureBase = createGestureBase(target);
		}
		return _gestureBase
	}

	function createGestureBase(target) {
		var _gestureBase = new GestureBase(target);
		_targets.push(_gestureBase);
		return _gestureBase
	}

	function setActiveChildren(target, active) {
		var gestureBase = getGestureBase(target);
		if (gestureBase.hasActiveChildren != active) {
			gestureBase.hasActiveChildren = active;
			var children = gestureBase.elem.getElementsByTagName('*');
			for (var i = 0; i < children.length; i++) {
				//console.log( typeof children[i], ' ; ', children[i].id )
				// gets only the children, not grand-children
				if (children[i].parentNode == target) {
					active ? G.enable(children[i]) : G.disable(children[i]);
				}
			}
		}
	}

	function getNextLayerElement(target, x, y, list) {
		target.style.visibility = 'hidden';
		list.push(target);

		var elem = document.elementFromPoint(x, y);
		//console.log( 'elementFromPoint() : ', elem.id );

		for (var i = 0; i < _disableList.length; i++) {
			//console.log( ' => disable list: ', i, ' : ', _disableList[i].elem.id )
			if (_disableList[i].elem == elem) {
				//console.log( '  -^ match so go again')
				return getNextLayerElement(elem, x, y, list)
			}
		}

		return elem
	}

	function getForwardedTarget(event) {
		var hiddenList = [];

		var el = getNextLayerElement(event.target, event.clientX, event.clientY, hiddenList);
		//console.log( ' returned element: (', event.clientX, ', ', event.clientY, ') ', el.id )

		//console.log( 'hidden list:')
		for (var i = 0; i < hiddenList.length; i++) {
			//console.log( '  -> ', i, ' ', hiddenList[i].id )
			hiddenList[i].style.visibility = 'visible';
		}
		hiddenList = [];

		event.stopImmediatePropagation();
		//console.log( ' - STOP - ')

		return el
	}

	/* ------------------------------------------------------------------------------------------------------------- */
	// EVENT HANDLERS

	// IE 9 & 10 needs to have events captured and passed to the next layer dom element
	function handlePassThroughClick(event) {
		//console.log( 'pass through:', event )
		var el = getForwardedTarget(event);

		// IE 9+
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent(event.type, true, false);
		//console.log( '     # ', el.id, ' is dispatching ' )
		el.dispatchEvent(evt);
	}
}();

/**
	@class UIEvent
	@desc
		This module has custom events to be used with the <UIComponents>
*/

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Description:
		-- INTERNAL MODULE --
		This module is used exclusively by FrameRate.  When a method is registered, it instantiaties an instance of this module to hold all methods at a 
		specified frames per second.  Every fps gets a new FrameRateBase instance.
	
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/**
	@class FrameRate
	@desc
		This module is used for constant consistent updates, akin to ENTER_FRAME in AS3, utilizing requestAnimationFrame at its core. Register a function
		and it will be called on every tick. Optionally, you can register a function with a frame rate value for specific frequency calls.  This is useful
		when working with multiple animation sequences at once.	
	
	@example
		// have any methods			
		function myFunctionA () {
			console.log( 'myFunctionA' );
		}

		function myFunctionB() {
			console.log( 'myFunctionB' );
		}

		function myFunctionC() {
			console.log( 'myFunctionC' );
		}

		// Register any method, anywhere
		FrameRate.register ( this, myFunctionA );
		FrameRate.register ( this, myFunctionB );

		// Register with custom time, say only 7 calls per second
		FrameRate.register ( this, myFunctionC, 7 );

		// Pause the whole engine so no methods are called
		FrameRate.pause();

		// Then start is back up
		FrameRate.resume();

		// or remove a method later
		FrameRate.unregister ( this, myFunctionA );

		// or pause all methods at a specific frame rate
		FrameRate.pause ( 7 ) // this pauses only myFunctionC, but myFunctionB will continue to be called
*/

/**
	@class RecurringDates
	@desc
		<span style="color:#ff0000"><b>WARN:</b><br>
		This class has been deprecated.  See RecurringSchedule 
		</span>

		<br><br>

		This class is for determining the next showtime for events that repeat on a weekly basis. For example, you have a tune-in that
		is every Friday at 6pm, and you want your date messaging to update dynamically.
		<br><br>

		<b>Date Model:</b><br>
		For an event that is every Friday at 6pm for one hour, the model would look like:<br>
		<codeblock>
			// define event model
			var dateModel = [
				{	name: 'Once a week',
					tuneins: [
						{	days: ['Friday'],
							startTime: '18:00',
							endTime: '19:00'
						}
					]
				}
			];
		</codeblock>
		<br><br>

		For more complex schedules( like sports tournaments ), a more complex model might look like this
		<codeblock>
			// define event model
			var dateModel = [
				{	name: 'Weekend events',
					tuneins: [
						{	days: ['Friday','Saturday','Sunday'],
							startTime: '21:00',
							endTime: '22:00'
						}
					]
				},
				{	name: 'Weekday events',
					tuneins: [
						{	days: ['Monday','Tuesday','Wednesday','Thursday'],
							startTime: '18:00',
							endTime: '19:00'
						}
					]
				}
			];
		</codeblock>
		<br><br>
		
		After defining your event model, you must instantiate this class and submit it to {@link RecurringDates.init}. This
		will figure out for you when the next non-expired event starts, and when it will be over. So, to build on the previous example:
		<br>
		<codeblock>
			// generate next start-end dates
			var recurringEventsManager = new RecurringDates();
			recurringEventsManager.init( dateModel );
		</codeblock>
		<br><br>
	
		Now you can access the "next start date" and "next end date" methods. Use those returned Date objects, along with the standard {@link DateUtils} methods, to 
		properly format your date-messaging.
		<codeblock>
			// trace the date objects
			var nextStartDate = recurringEventsManager.getNextStartDate();
			var nextEndDate = recurringEventsManager.getNextEndDate();
			console.log( nextStartDate, nextEndDate );

			// trace the messaging for the dates
			var nextStartDateMessage = DateUtils.selectMessagingForDate( nextStartDate );
			var nextEndDateMessage = DateUtils.selectMessagingForDate( nextEndDate );
			console.log( nextStartDateMessage, nextEndDateMessage );
		</codeblock>
*/

/* ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Styles_legacy
	WARNING: 
		This class is only used for migrating old ads. 

	Description:
		This object contains depreciated methods for the Styles module.
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/**
	@class	AdManager
	@static
	@desc
		This object is meant to handle all of our json loading and parsing.
*/

/**
	@class DateFormatter

	@classdesc
		This class provides a collection of year, month, date labels along with a utility for mananipulating
		a TzDate/Date object.		
*/

/**
	@class Timezone
	@desc
		This class provides constants and methods for accessing Timezone offsets, used by the TzDate class.
*/

/**
	@class TzDate
	@desc
		This class is a wrapper for the Javascript "Date" object.

		<br><br>

		The standard Date object only returns the local time. TzDate returns that local time but adds the ability to 
		get that same date, time, and meridium in ANY timezone, without extra conversions.  Simply ask for anything
		in any timezone and it will return you the adjusted date/time while maintaining the original date.
		
		<br><br>
		
		One thing to understand is the difference between: the timezone the TzDate is being DECLARED in VS the timezone the TzDate is DISPLAYING in.
		When creating a TzDate, you will be providing the date, time, and timezone of the DECLARED time. A way to think of 
		it would be: If you are in Los Angeles, you are in the US/Pacific timezone. So if you look at your calendar and clock
		on the wall, you would enter that date, time and provide the timezone for US/Pacific which is Timezone.PST.  
				
		<codeblock>
			var myDate = new TzDate ({
				datetime : [ '2017-05-18T12:00:00', Timezone.PST ]
			})
			console.log( myDate ); // "Thu May 18 2017 12:00:00 GMT-0700 (PDT)"
			myDate.print(); // "Thu May 18 2017 12:00:00 US/Pacific"
		</codeblock>
		
		<br>
		
		Tracing out a date can get confusing with that end part "GMT-0700 (PDT)". That is how the browser reports the local timezone.
		However, we need to be able to see the date clearly in any timezone.  The print() method allows for a clearer output specifically
		telling you what timezone you have asked for. Lets look at that same date in other timezones:
				
		<codeblock>
			myDate.print( Timezone.MST ); // "Thu May 18 2017 13:00:00 US/Mountain"
			myDate.print( Timezone.EST ); // "Thu May 18 2017 15:00:00 US/Eastern"
		</codeblock>

		<br>

		An important concept to understand is UTC = Universal Time Coordinated. All time is based off of "zero" point, which is also called 
		Greenwich Mean Time.  Let's look at our same time in UTC:

		<codeblock>
			myDate.print( Timezone.UTC ); // "Thu May 18 2017 19:00:00 UTC"
		</codeblock>

		<br>

		You can start to see how the timezones affect time by seeing that noon on the west coast is the same 7 PM (aka 19 hours) at the origin.
		So the time we first declared at the beginning could also be created as any of these other times that we have seen.  Remember that when
		a time is created, no matter what timezone, there is a different way of saying it, but the actual time is just a snap shot of a momnet 
		in time.  Let's look at how we could create the same date different ways:

		<codeblock>
			var myDate_eastern = new TzDate ({
				datetime : [ '2017-05-18T15:00:00', Timezone.EST ]
			})
			myDate_eastern.print(); // "Thu May 18 2017 15:00:00 US/Eastern"
			myDate_eastern.print( Timezone.PST ); // "Thu May 18 2017 12:00:00 US/Pacific"
		</codeblock>

		<br>

		This time, we created the date as if we were on the east coast in the US/Eastern timezone, so the clock on the wall would say 3:00 PM.  
		Notice that all the outputs are all the same, that is because these dates are the same moment, just expressed differently.

		<br><br>

		Sometimes, you will create the date IN a specific timezone, but you always want to see it in another.  Lets take our first date we created.
		We could pass the timezone into the print() method everytime, but that can get repetitive and sometimes you don't have access to that timezone
		later on.  So you can create an outputTimezone for the date, so all methods will return in that timezone:

		<codeblock>
			var myDate = new TzDate ({
				datetime : [ '2017-05-18T12:00:00', Timezone.PST ],
				outputTimezone : Timezone.EST
			})
			myDate.print(); // "Thu May 18 2017 15:00:00 US/Eastern"
		</codeblock>

		<br>

		This can be also changed after the date was created, and again it will always output to that timezone.  BUT, if you pass in a timezone to a method,
		that will take priority:

		<codeblock>
			myDate.outputTimezone = Timezone.PST;
			myDate.print(); // "Thu May 18 2017 12:00:00 US/Pacific"

			myDate.print( Timezone.EST ); // "Thu May 18 2017 15:00:00 US/Eastern"
		</codeblock>

		<br><br>
		
		On to slightly more advanced concepts: ISO dates. Notice that the date strings we have been passing in so far have been in this format:
		
		<br>
		
		<codeblock>
			'2017-05-18T12:00:00' // Year - Month - Day T Hour : Minute : Second 
		</codeblock>
		
		<br>
		
		This is a partial ISO date string.  The last part that is missing is the timezone.  So our first date we created, in proper ISO would actually 
		look like this:

		<br>
		
		<codeblock>
			'2017-05-18T12:00:00-07:00' // Year - Month - Day T Hour : Minute : Second - PST Timezone
		</codeblock>
		
		<br>
		The -07:00 on the end is the timezone of the time.  Think of it like this: The date and time are what you see on that clock and calendar on your wall
		where you are currently standing.  That last part, the timezone, is saying how far FROM the origin (UTC) you are. Lets look at it as a simple math problem.

		<codeblock>
			 (origin zero point) - timezone = (date and time where you are)
								
								UTC - 07:00 = 2017-05-18T12:00:00
		
										UTC = 2017-05-18T12:00:00 + 07:00

										UTC = 2017-05-18T19:00:00+00:00
		</codeblock>

		<br>

		This proper ISO full datetime can be used when creating a TzDate, rather than the array if you are confident of the timezone:

		<codeblock>
			var myDate = new TzDate ({
				datetime : '2017-05-18T12:00:00-07:00'
			})
			myDate.print(); // "Thu May 18 2017 12:00:00 US/Pacific"
		</codeblock>

		<br><br>

		<b>Velvet JSON dates</b>

		<br><br>

		Dates that are in the Velvet JSON will be in proper ISO format AND there will be a timezone provided, like so:

		<codeblock>
		var jsonDateSnippet = {
			datetime : "2017-05-18T19:00:00+00:00",
			timezone : "US/Eastern"
		}
		</codeblock>

		<br>

		This is providing the date/time in UTC and then saying that the dates should be output in US/Eastern timezone.  So we would create our TzDate:

		<codeblock>
			var myDate = new TzDate ({
				datetime : jsonDateSnippet.datetime,
				outputTimezone : jsonDateSnippet.timezone
			})
			myDate.print(); // "Thu May 18 2017 15:00:00 US/Eastern"
		</codeblock>
		
*/

/**
	@class DateManager

	@classdesc
		This class initailizes the ads understanding of "now" for use with all other Date oriented classes.		
*/

/**
	@class DateSchedule
	@desc
		This class creates a schedule of dates that will be compared agains the currentdate/time. There are 2 ways to use 
		this class: standard and custom.
		
		<br><br>

		<b>AdData.js:</b><br>
		It is recommended that you centralize your schedule in AdData. This way, changes to the schedule can easily 
		be achieved with one common update.<br>

		<br><br>
		
		<b>Standard</b><br>
		This will create a schedule of dates leading up to the target date, which was formerly achieved by using		
		the selectMessageForDate() method.  This standard way will produce a schedule pre-populated with:
		
		<ul>
			<li>DATE - returns the target date, using the toSimpleDateTime() for anything further than a week out from the target</li>
			<li>WEEK - returns the day of the week the target date is, ie Wednesday</li>
			<li>TOMORROW - returns the word "Tomorrow", beginning at midnight the day before the target date</li>
			<li>TODAY - returns the string "Today", beginning at midnight on the target date</li>
			<li>TONIGHT - returns the string "Tonight", beginning at the time set with tonightStartsAt</li>
			<li>NOW - returns the string "Live Now"</li>
			<li>PAST - returns the string "Past", called after NOW plus the eventDuration value</li>
		</ul>

	@param {object} arg
		Settings are passed in via this object, see Properties for more info:

	@property {TzDate} target
		The date that the schedule will count down to
	@property {boolean} isStandard
		If true, will create a standard schedule with default messaging
	@property {number} eventDuration
		In a standard schedule, the amount of minutes after the target time the PAST messaging shows. Defaults to 120 which is 2 hours
	@property {string} tonightStartsAt
		In a standard schedule, when the today message changes to tonight. If the target time is before this value, tonight will never show. Defaults to '17:50' which is 5:30PM
	@property {boolean} hasOneDayOf
		In a standard schedule, will determine if only 'tonight' OR 'today' will show, or if it is possible to have both. For example, in ESPN units, the need is that 
		only one of the options will show at midnight day of the event. So if the event is before the tonightStartsAt value, it will only show 'today', while if it is after
		it will only show 'tonight'.  If this is set to false, it will allow for both following the logic of tonightStartsAt.  Defaults to true.
	@property {object} standardOverrides
		An object to overwrite any of the standard labels. Using the standard keys, apply a new label string or callback function passing in the target date
	
	
		<codeblock>
			// Standard Schedule
			this.schedule = new DateSchedule({
				target : new TzDate ({
					datetime : [ '2015-08-01 20:00:00', Timezone.EST ],
					outputTimezone : Timezone.LOCAL 
				}),
				isStandard : true
			});
			this.schedule.print();

			this.dateMessage = this.schedule.currentLabel;
			this.dateHour = this.schedule.target.toDateTime();
		</codeblock>

		Each standard label can be overridded by either assigning a different string or by passing in a callback function 
		that will return a differently formatted message. Note each callback gets fired at runtime, creating each label.
				
		<codeblock>
			this.schedule = new DateSchedule({
				target : new TzDate ({
					datetime : [ '2015-08-01 20:00:00', Timezone.EST ],
					outputTimezone : Timezone.LOCAL 
				}),
				eventDuration : 120,
				isStandard : true,
				standardOverrides : {
					DATE : function( date ){
						return date.toSimpleDate();
					},
					TOMORROW : 'Tommorow Night!',
					NOW : 'Watch Live Now'
				}
			});
			this.schedule.print();

			this.dateMessage = this.schedule.currentLabel;
			this.dateHour = this.schedule.target.toDateTime();
		</codeblock>

		<br><br>

		<b>Custom</b><br>
		This is used to set a specific list of dates to check now against, returning the latest.

		<codeblock>
			this.schedule = new DateSchedule();
			this.schedule.addDate( 
				new TzDate ({
					datetime : [ '2015-08-01 12:00:00', Timezone.EST ],
					outputTimezone : Timezone.LOCAL 
				}),
				"Hey I'm the first date"
			);
			this.schedule.addDate( 
				new TzDate ({
					datetime : [ '2015-08-05 14:00:00', Timezone.UTC ],
					outputTimezone : Timezone.PST 
				}),
				"I'm the last date"
			);
			this.schedule.print();
		</codeblock>

		The schedule can also be used to call different markup builds.  Use the third param of addDates() to pass in 
		a callback, then simply call it from Control.preMarkup() or where ever makes sense.

		<codeblock>
			this.schedule = new DateSchedule();
			this.schedule.addDate( 
				new TzDate ({
					datetime : [ '2015-08-01 12:00:00', Timezone.EST ],
					outputTimezone : Timezone.LOCAL 
				}),
				"Hey I'm the first date",
				View.buildFromDate0
			);
			this.schedule.addDate( 
				new TzDate ({
					datetime : [ '2015-08-05 14:00:00', Timezone.UTC ],
					outputTimezone : Timezone.PST 
				}),
				"I'm the last date",
				View.buildFromDate1
			);
			this.schedule.print();
		</codeblock>

		<b>build.js:</b><br>
		In <u>build.View</u>, you can write functions that build out the DOM for each of your states. 
		<codeblock>
			this.buildFromDate0 = function() {
				console.log( 'View.buildFromDate0()' );
				// Markup...
			}
			this.buildFromDate1 = function() {
				console.log( 'View.buildFromDate1()' );
				// Markup...
			}
		</codeblock>

		In <u>build.Control</u> or <u>build.buildMarkup</u>, you simply call the callback of the current date on the schedule.  This will
		find the current added date object and fire that callback
		<codeblock>
			var message = adData.schedule.current.callback();
			console.log( message );

			var myTextField = new UITextField({
				target : T,
				id : 'my-textfield',
				css : {
					width : 300,
					height : 90
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.INLINE,
				alignText : Align.CENTER,
				text : message.label
			});
		</codeblock>
*/

/**
	@class RecurringSchedule
	@desc
		This class is for determining the next showtime for events that repeat on a weekly basis. For example, you have a tune-in that
		is every Friday at 6pm, and you want your date messaging to update dynamically.
		
		<codeblock>
			var schedule = new RecurringSchedule({	
				tuneins: [
					{	
						days: ['Friday'],
						startTime: '18:00',
						eventDuration : 60
					}
				]
			});			
		</codeblock>
		<br>

		For more complex schedules( like sports tournaments ), a more complex model might look like this
		<codeblock>
			var schedule = new RecurringSchedule({	
				tuneins: [
					{	
						days: ['Friday','Saturday','Sunday'],
						startTime: '21:00',
						eventDuration : 60,
						timezone: Timezone.EST
					},
					{	
						days: ['Monday','Tuesday','Wednesday','Thursday'],
						startTime: '18:00',
						eventDuration : 75,
						timezone: Timezone.EST
					}
				]
			});
		</codeblock>
		<br>
		
		Just like DateSchedule, this uses the standard schedule to create the date messaging, which is accessed with
		the same methods.
		<codeblock>
			schedule.print();
			schedule.currentSchedule.print();
			schedule.currentSchedule.target.print();
			console.log( schedule.current );
			schedule.currentDate.print();
			console.log( schedule.currentLabel );
		</codeblock>
*/

/**
	@class	Velvet
	@static
	@desc
		This object is meant to handle all of our json loading and parsing from the Velvet platform.

		<br><br>

		When testing, changing the date can be a crucial testing step. see DateManager for more information.
*/

/**
	@class Matrix2D
*/

// Version : Mar 17, 2015 2:15 PM
/*
 * TODO - write Documentation
 *		- convert to  a, c, b, d, tx, ty ?
 *		- inverse?
 */

var Matrix2D = function() {
	var M = this;
	// initial set identity base matrix array to data
	M.identity = new Float32Array([1, 0, 0, 0, 1, 0]);
	M.data = new Float32Array(M.identity);
};

Matrix2D.prototype = {
	clear: function() {
		var M = this;
		//console.log( M.data instanceof Float32Array )
		//M.data.set ( M.identity );
		M.data = new Float32Array(M.identity);
	},

	rotate: function(radians) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array(M.identity);

		var c = Math.cos(radians).toFixed(15);
		var s = Math.sin(radians).toFixed(15);

		_m[0] = c;
		_m[1] = s;
		_m[3] = -s;
		_m[4] = c;
		//  cos(rad),  sin(rad), 0,
		//  -sin(rad), cos(rad), 0,
		//  0,         0,        1

		M.multiply(_m, false);
		return M
	},

	scale: function(x, y) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array(M.identity);

		_m[0] = x;
		_m[4] = y;
		//  x, 0, 0,
		//  0, y, 0,
		//  0, 0, 1

		M.multiply(_m, false);
		return M
	},

	skew: function(ax, ay) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array(M.identity);

		_m[1] = Math.tan(ax);
		_m[3] = Math.tan(ay);
		//  1,       tan(ax), 0,
		//  tan(ay), 1,       0,
		//  0,       0,       1

		M.multiply(_m);
		return M
	},

	translate: function(x, y) {
		var M = this;
		// copy the identity to be modified
		var _m = new Float32Array(M.identity);

		_m[2] = x || 0;
		_m[5] = y || 0;
		//  1, 0, x,
		//  0, 1, y,
		//  0, 0, 1

		M.multiply(_m, true);
		return M
	},

	multiply: function(m, invert) {
		var M = this;
		// copy the current matrix data into '_c'
		var _copy = new Float32Array(M.data);

		// translate multiply needs to be inverted, where others do not
		var a = invert ? m : _copy;
		var b = invert ? _copy : m;

		for (var i = 0; i < 6; i++) {
			var k = Math.floor(i / 3) * 3;
			var q = i % 3;
			//console.log( i, '-', a[_a], b[_b], a[_a+1], b[_b+3], a[_a+2], b[_b+6] )
			M.data[i] = a[k] * b[q] + a[k + 1] * b[q + 3];
		}
		M.data[2] += a[2];
		M.data[5] += a[5];

		// a[0] * b[0] + a[1] * b[3] + a[2] * 0
		// a[0] * b[1] + a[1] * b[4] + a[2] * 0
		// a[0] * b[2] + a[1] * b[5] + a[2] * 1
		// a[3] * b[0] + a[4] * b[3] + a[2] * 0
		// a[3] * b[1] + a[4] * b[4] + a[2] * 0
		// a[3] * b[2] + a[4] * b[5] + a[5] * 1
		// 0
		// 0
		// 1
	},

	setFromCss: function(matrixString) {
		var cssMatrix = matrixString
			.match(/\(([^\)]+)\)/)[1]
			.replace(/\s/g, '')
			.split(',')
			.map(Number);
		this.data = [cssMatrix[0], cssMatrix[1], cssMatrix[4], cssMatrix[2], cssMatrix[3], cssMatrix[5]];
	},

	getCss: function() {
		// a, c, tx
		// b, d, ty
		// 0, 0, 1
		// matrix(a, c, b, d, tx, ty)
		var M = this;
		return 'matrix(' + M.data[0] + ',' + M.data[1] + ',' + M.data[3] + ',' + M.data[4] + ',' + M.data[2] + ',' + M.data[5] + ')'
	}
};

/**
	@class Matrix3D
*/

/**
	@class ParentTransform
*/

// pseudo?
// TODO - change order of translations, possible seperate methods that have indexes which can be a re-orderable aray
//		- convert to prototype pattern for multiple instances?

/** 
	@class Vector2D
	@param {number} x
	@param {number} y
	@desc
		A simple 2D Vector classs 
	@example
		var myVector1 = new Vector2D( 0, 320 );
		var myVector2 = new Vector2D( -3, 5.5 );
*/

/**
    @class SimpleNoise2D
    @desc
        SimpleNoise2D is a workaround for creating 2D noise with lightweight code. 
        It returns a {@link Vector2D} with x and y values between -0.5 - 0.5.
        For a more sophisticated purpose, please use Perline Noise https://github.com/josephg/noisejs
*/

/**
	@class CssManager
	@desc
		This is a css-interface class, which is intended to proxy all css applications. The goal is to accept css in any format( see below ), 
		standardize the keys, conform the values, and rapidly apply the style to the target, specific to the {@link Device} running the ad.<br><br> 

		Generally, you should not need to use this class directly. {@link Styles.setCss} will handle it for you.<br><br>

		However, if your css is not being correctly managed, the first step in debugging is to use {@link CssManager.setDebugFilter}. Pass the id, 
		as a string, of the misbehaving element to see the exact format of the css being applied to it. You can then locate the problem style, try 
		applying it in the browser inspector. Using this approach you should be able to determine what the correction/exception needs to be.<br><br>

		Additional debugging output can be switched on using {@link CssManager.setDebugLevel}. Pass a level( 0 is off, 1 is less, 2 is more ). There will be 
		a lot of output, but it is organized and consistent. You should be able to see exactly what is happening to your declarations. <br><br>

		<b>Types:</b><br>
		<table>
			<tr><td>CssObject</td>	<td>the literal "css" object that is passed to {@link Markup} as containerData.css on the creation of the element</td></tr>
			<tr><td>CssStyleString</td>	<td>a literal string of any number of css styles, passed to {@link Markup} as containerData.styles on the creation of the element</td></tr>
			<tr><td>CssDeclaration</td>	<td>either an object like "{ position: 'absolute' }" or a string like "background-color: #ff0000;"</td></tr>

			<tr><td>CssKey</td>	<td>ex: in "position: absolute;" the css-key would be "position"</td></tr>
			<tr><td>CssValue</td>	<td>ex: in "position: absolute;" the css-value would be "absolute"</td></tr>
			<tr><td>CssList</td>	<td>a standardized list of objects with Device-specific keys and corresponding values</td></tr>
		</table>
		<br>

		<b>Formats:</b><br>
		<table>
			<tr><td>Hyphen</td>	<td>ex: 'border-left', '-webkit-clip-path', '-moz-filter'</td></tr>
			<tr><td>Camel</td>	<td>ex: 'borderLeft', 'webkitClipPath', 'moxFilter'</td></tr>
			<tr><td>Alt</td>	<td>this is to handle arbitrary exceptions, like the "bgImage" key on container-data css objects</td></tr>
		</table>
		<br>

		<b>Key Prefixes:</b><br>
		<table>
			<tr><td>Browser</td>	<td>ex: "-webkit-clip-path" or "webkitClipPath"</td></tr>
			<tr><td>Standard</td>	<td>ex: "clip-path" or "clipPath"</td></tr>
		</table>
*/
class CssManager {
	constructor() {
		const C = this;
		C.debug_level1 = false;
		C.debug_level2 = false;
		C.filter;
		C.debug_element;
		C.debug_css_list;
	}

	/**
		@memberOf CssManager
		@method init
		@desc
			Called one time per life-cycle. Creates the browser key-dictionary. 
	*/
	init() {
		console.log('CssManager.init()');
		this.generateBrowserKeyDictionary();
	}

	/* -- DEBUGGING -------------------------------------------------
	 *
	 *
	 */

	/**
		@memberOf CssManager
		@method setDebugLevel
		@param {number} level
			controls debug verbosity for all css processing, default is 0, max is 2
		@desc
			Use this to control the degree of logging that happens in this class. Debugging is off by default, or pass 0 or null to disable. 
	*/
	setDebugLevel(level) {
		const C = this;
		switch (parseInt(level)) {
			case 1:
				C.debug_level1 = true;
				C.debug_level2 = false;
				break
			case 2:
				C.debug_level1 = true;
				C.debug_level2 = true;
				break
			default:
				C.debug_level1 = false;
				C.debug_level2 = false;
				break
		}
	}

	/**
		@memberOf CssManager
		@method setDebugFilter
		@param {string} filter
			the filter string: An element.id, a css-key, or a css-value. For example, if you want to only see css being applied 
			to particular element, pass its id to this function. Conversely, if you only want to see css with a particular 
			key or value, pass that string.
		@desc
			Use this control to filter which <CssMananger>.apply() calls get output to the console. 
	*/
	setDebugFilter(filter) {
		const C = this;
		console.log('CssManager.setDebugFilter(),', filter);
		C.filter = filter;
		C.debug_level1 = true;
	}
	ifDebug(debugLevel) {
		const C = this;
		if (!C.filter) return C[debugLevel]
		else if (C.passDebugFilter() && C[debugLevel]) return true
	}
	passDebugFilter() {
		const C = this;
		if (C.debug_element) if (C.debug_element.id.indexOf(C.filter) > -1) return true
		if (C.debug_css_list)
			for (var i in C.debug_css_list) {
				if (i.indexOf(C.filter) > -1) return true
				else if (String(C.debug_css_list[i]).indexOf(C.filter) > -1) return true
			}
		return false
	}

	/* -- KEY DICTIONARY -------------------------------------------------
	 *
	 *		This is called once and prepares a dictionary with standard, 
	 *		browser-agnostic keys which map to device-specific keys.
	 */
	generateBrowserKeyDictionary() {
		const C = this;
		console.log('CssManager.generateBrowserKeyDictionary()');
		C.deviceKeyDict = {};

		var styles = document.createElement('div').style;

		for (var key in styles) {
			// get prefix
			var prefix = C.getPrefix(key);

			// key without prefix
			var standardKey = C.standardizeKey(key);
			//console.log( 'Device.element.style:', key );
			//console.log( ' - standard key:', standardKey );

			// handle exceptions per browser
			switch (Device$1.browser) {
				case 'safari':
					// use "webkit" prefix, if that's what was returned
					if (prefix == 'webkit') {
						C.deviceKeyDict[standardKey] = C.prependPrefix('webkit', standardKey);
					} else {
						// standard
						// exclude keys that have a "webkit"-equivalent
						if (!(C.prependPrefix('webkit', standardKey) in styles)) {
							C.deviceKeyDict[standardKey] = standardKey;
						}
					}
					break
				case 'firefox':
					var mozKey = C.prependPrefix('Moz', standardKey);
					var webkitKey = C.prependPrefix('Webkit', standardKey);

					// use the no-prefix version, if it exists
					if (standardKey in styles) {
						C.deviceKeyDict[standardKey] = standardKey;
					} else if (prefix == 'moz') {
						// use "Moz" if a "webkit"-equivalent exists
						if (C.camelateKey('webkit-' + standardKey) in styles) {
							C.deviceKeyDict[standardKey] = mozKey;
						}
					} else if (prefix == 'webkit') {
						// note: in FF, there seem to be equivalents for all "webkit" vs. "Webkit" properites, so we use "Webkit" to match "Moz" convention....yah, nevermind.
						// use "webkit" if no "Moz"-equivalent exists
						if (!(mozKey in styles)) {
							C.deviceKeyDict[standardKey] = webkitKey;
						}
					}
					break
				case 'chrome':
				case 'ie':
				default:
					// use the no-prefix version, if it exists
					if (standardKey in styles) {
						C.deviceKeyDict[standardKey] = standardKey;
					} else if (prefix) {
						// otherwise it's a "prefix"-only type of property
						C.deviceKeyDict[standardKey] = C.prependPrefix(prefix, standardKey);
					}
					break
			}
		}
		console.log(' KEY DICTIONARY:', C.deviceKeyDict);
	}

	/* -- APPLYING CSS -----------------------------------------------
	 *
	 *
	 */
	apply(element, cssList) {
		const C = this;
		C.debug_element = element;
		C.debug_css_list = cssList;
		if (C.ifDebug('debug_level1')) console.log('  CssManager.apply()', element.id);

		// creates a collection of only the transforms
		var transformList = {};

		for (var key in cssList) {
			// has a non-destructive transform update, as generated by keyFormatExceptions()
			if (key.match(/^transform\(/)) transformList[key] = cssList[key];
			else {
				// standard css-key
				if (C.ifDebug('debug_level1')) console.log('   ' + key + ': ' + cssList[key] + ';');
				element.style[C.getDeviceKey(key)] = cssList[key];
			}
		}

		// will apply all transforms at once for correct calculation
		C.applyTransforms(element, transformList);

		if (C.ifDebug('debug_level1')) console.log('\n\n');
		C.debug_element = null;
		C.debug_css_list = null;
	}

	/* -- CONFORMING CSS SYNTAX -----------------------------------------------
	 *
	 *		These are protected methods, meant to be called by Styles...although
	 *		they could certainly be utilized by other core modules.
	 */
	conformCssObject(cssObject, debugElement) {
		const C = this;
		C.debug_element = debugElement;
		if (C.ifDebug('debug_level1')) console.log('CssManager.conformCssObject()', cssObject);
		var cssList = {};
		if (cssObject) {
			for (var key in cssObject) {
				if (C.ifDebug('debug_level2')) console.log('  PARSE( key: ' + key + ', value: ' + cssObject[key] + ' )');
				var declarations = C.conformKeyValue(key, cssObject[key]);
				for (var i in declarations) {
					if (C.ifDebug('debug_level2')) console.log('    CONFORMED DECLARATION:', declarations[i]);
					cssList[declarations[i][0]] = declarations[i][1];
				}
			}
		}
		C.debug_element = null;
		return cssList
	}
	conformCssString(cssString, debugElement) {
		const C = this;
		C.debug_element = debugElement;
		if (C.ifDebug('debug_level1')) console.log(' CssManager.conformCssString()');
		var cssList = {};
		if (cssString) {
			var declarations = cssString.split(/\s*;\s*/);
			for (var key in declarations) {
				if (declarations[key]) {
					var declarationParts = declarations[key].split(/:(.+)?/);
					if (C.ifDebug('debug_level2')) console.log('  PARSE( key: ' + declarationParts[0] + ', value: ' + declarationParts[1] + ' )');
					var conformedDeclarations = C.conformKeyValue(declarationParts[0], declarationParts[1]);
					for (var i in conformedDeclarations) {
						if (C.ifDebug('debug_level2')) console.log('    CONFORMED DECLARATION:', conformedDeclarations[i]);
						cssList[conformedDeclarations[i][0]] = conformedDeclarations[i][1];
					}
				}
			}
		}
		C.debug_element = null;
		return cssList
	}
	conformCssKeyValue(key, value) {
		const C = this;
		if (C.ifDebug('debug_level1')) console.log(' CssManager.conformCssKeyValue()');
		var cssObject = {};
		cssObject[key] = value;
		return C.conformCssObject(cssObject)
	}

	/* -- CSS TRANSFORMATIONS -----------------------------------------------
	 *
	 *
	 *
	 */
	applyTransforms(element, value) {
		const C = this;
		if (C.ifDebug('debug_level1')) console.log('    - CssManager.applyTransforms(), ', value);
		var matrix2D = new Matrix2D();

		// existing transform
		var existingTransform = element.style[C.getDeviceKey('transform')];
		var matrixMatch = existingTransform.match(/matrix[^\)]+\)/);
		if (matrixMatch) {
			matrix2D.setFromCss(matrixMatch[0]);
			if (C.ifDebug('debug_level2')) console.log('       existing matrix:', matrix2D.data);
		}

		if ('transforms' in element) var transforms = element.transforms;
		else {
			var transforms = {
				tx: 0,
				ty: 0,
				rz: 0,
				sx: 1,
				sy: 1
			};
		}

		var changed = {};
		for (var key in value) {
			var transformMethod = key.match(/\(\s([^\s]+)/)[1];
			changed[transformMethod] = value[key];
		}

		// Order matters: rotate, scale, translate

		// first translate the x and y back to zero
		if (changed.tx != undefined) {
			matrix2D.data[2] = 0;
		}
		if (changed.ty != undefined) {
			matrix2D.data[5] = 0;
		}
		if (changed.rz != undefined) {
			var reverse = -transforms.rz;
			matrix2D.rotate(reverse * (Math.PI / 180));
			matrix2D.rotate(changed.rz * (Math.PI / 180));
			transforms.rz = changed.rz;
		}
		if (changed.sx != undefined) {
			var reverse = 1 / transforms.sx;
			matrix2D.scale(reverse, 1);
			matrix2D.scale(changed.sx, 1);
			transforms.sx = changed.sx;
		}
		if (changed.sy != undefined) {
			var reverse = 1 / transforms.sy;
			matrix2D.scale(1, reverse);
			matrix2D.scale(1, changed.sy);
			transforms.sy = changed.sy;
		}

		if (changed.tx != undefined) {
			matrix2D.translate(changed.tx, 0);
			transforms.tx = changed.tx;
		}
		if (changed.ty != undefined) {
			matrix2D.translate(0, changed.ty);
			transforms.ty = changed.ty;
		}

		// store transforms
		element.transforms = transforms;
		if (C.ifDebug('debug_level2')) console.log('       updated matrix:', matrix2D.data);

		// apply css matrix
		element.style[C.getDeviceKey('transform')] = matrix2D.getCss();
	}

	/* -- KEY MAPPING -----------------------------------------------
	 *
	 *
	 */
	conformKeyValue(key, value) {
		const C = this;
		key = String(key).trim();
		value = String(value).trim();
		var keyAsStandard = C.standardizeKey(key);
		return C.conformValue(keyAsStandard, value)
	}
	hasPrefix(key) {
		const C = this;
		return key.search(C.matchPrefixRegex()) > -1
	}
	getPrefix(key) {
		const C = this;
		var match = key.match(C.matchPrefixRegex());
		return match ? match[1].replace(/-/g, '').toLowerCase() : null
	}
	stripPrefix(key) {
		const C = this;
		var keyless = key.replace(C.matchPrefixRegex(), '');
		return keyless.charAt(0).toLowerCase() + keyless.slice(1)
	}
	getDeviceKey(key) {
		const C = this;
		return key in C.deviceKeyDict ? C.deviceKeyDict[key] : key
	}
	prependPrefix(prefix, key) {
		return (
			prefix +
			key.replace(/^(.)/, function(str) {
				return str.charAt(0).toUpperCase()
			})
		)
	}

	// converts any syntax of css-key to a consistent camelCase format
	standardizeKey(key) {
		const C = this;
		key = C.stripPrefix(key);

		// check if key is an exception
		if (key in C.keyFormatExceptions()) key = C.keyFormatExceptions()[key];
		else
			// or procedurally convert to camel
			key = C.camelateKey(key);

		if (C.ifDebug('debug_level2')) console.log('    - result: "' + key + '"');
		return key
	}
	camelateKey(key) {
		key = key.replace(/-(.)/g, function(str) {
			return str.charAt(1).toUpperCase()
		});
		return key
	}
	/* This dictionary handles INTERNAL differences between how css-keys are written in the build on the css-objects and how they must be written 
		as valid CSS. Primarily, these exceptions are the arguments of the transform function, translate(), rotate(), and scale(), which need to be further 
		handled during value conformation. The exceptions could also include any semantic differences that might ease production confusion.

		** Do not confuse this with browser-key differences!! ex: transform vs. -ms-transform. Browser-keys are handled by <CssManager>.generateBrowserKeyDictionary() */
	keyFormatExceptions() {
		return {
			x: 'transform( tx )',
			translateX: 'transform( tx )',
			y: 'transform( ty )',
			translateY: 'transform( ty )',
			rotate: 'transform( rz )',
			rotation: 'transform( rz )',
			scaleX: 'transform( sx )',
			scaleY: 'transform( sy )',
			scale: 'transform( sx ),transform( sy )'
		}
	}

	/* -- VALUE PARSING -----------------------------------------------
	 *
	 *
	 */
	/* takes a single css param, arg or func, and conforms it to _adlib standard */
	conformValue(key, value) {
		const C = this;
		var conformedValues = [];
		var conformedValue;

		// look for numeric values
		var hasMultipleValues = value.match(/\s/);
		var numericValue = value.match(C.matchNumberRegex());
		if (!hasMultipleValues && numericValue) {
			if (C.ifDebug('debug_level2')) console.log('   conform value as number');
			conformedValue = Number(numericValue[0]);
			/* get existing unit */
			var unitMatch = value.match(/[^0-9\.]+$/);
			if (unitMatch) conformedValue += unitMatch[0];
			else
				/* assume default unit */
				switch (key) {
					case 'top':
					case 'right':
					case 'bottom':
					case 'left':
					case 'width':
					case 'height':
					case 'fontSize':
					case 'lineHeight':
					case 'padding':
					case 'margin':
					case 'marginRight':
					case 'marginLeft':
					case 'marginTop':
					case 'marginBottom':
					case 'borderRadius':
					case 'borderWidth':
					case 'letterSpacing':
						conformedValue += 'px';
						break
				}
		} else if (key == 'backgroundImage') {
			// background images - allows for either a stand-alone URL, or proper css like 'url( "http://example.com/image.jpg" );'
			if (C.ifDebug('debug_level2')) console.log('   conform value as background image');
			value = value.replace(/^url\(\s*['"]*/, '').replace(/['"]*\s*\)$/, '');
			conformedValue = 'url( "' + value + '" )';
		} else if (key == 'transform') {
			// transform-functions - should be split apart so a single matrix function can be written
			//	faster to just specify the transform exactly via css-object keys: x, y, rotate, scaleX, scaleY
			// && Device.browser == 'ie') {
			if (C.ifDebug('debug_level2')) console.log('   convert "transform" functions to individual transforms');
			var functionRegex = /([a-z0-9]+)\(([^\)]+)\)/gi;
			while ((params = functionRegex.exec(value))) {
				var args = params[2]
					.replace(/\s/g, '')
					.split(',')
					.map(function(value, index, array) {
						return Number(value.match(C.matchNumberRegex())[0])
					});
				switch (params[1]) {
					case 'translate':
						conformedValues.push(['transform( tx )', args[0]]);
						conformedValues.push(['transform( ty )', args[1]]);
						break
					case 'translateX':
						conformedValues.push(['transform( tx )', args[0]]);
						break
					case 'translateY':
						conformedValues.push(['transform( ty )', args[0]]);
						break
					case 'rotate':
						conformedValues.push(['transform( rz )', args[0]]);
						break
					case 'scale':
						conformedValues.push(['transform( sx )', args[0]]);
						conformedValues.push(['transform( sy )', args[1]]);
						break
					case 'scaleX':
						conformedValues.push(['transform( sx )', args[0]]);
						break
					case 'scaleY':
						conformedValues.push(['transform( sy )', args[0]]);
						break
				}
			}
		} else {
			// pass through
			if (C.ifDebug('debug_level2')) console.log('   conform value as string');
			conformedValue = value;
		}

		// create style pair
		if (conformedValue != undefined) {
			if (C.ifDebug('debug_level2')) console.log('    - result: "' + conformedValue + '"');

			// split the key will alyways have 1 value, except for scale which has to split to scaleX and scaleY
			var splitKeys = key.split(/\,/);

			for (var i = 0; i < splitKeys.length; i++) {
				conformedValues.push([splitKeys[i], conformedValue]);
			}
		}

		return conformedValues
	}

	matchNumberRegex() {
		return /^[+-]?[0-9]*\.?[0-9]+/
	}
	matchPrefixRegex() {
		return /^-*(moz-*|webkit-*|ms-*|o-)/i
	}
}

var CssManager$1 = new CssManager()

/**
	@class ImageManager
	@desc
		This module is used to add/load/manage all Images.
		
*/

/**
	@class PrepareCore
	@desc
		Boilerplate logic that is attempted for all ad templates happens here. The build of an ad should not need to affect this scope. 
*/

/** 
	@class Async
	@desc
		This is a utility to allow easy sequencing of multiple async functions. Increment tokens 
		by calling <code>wait()</code>, decrement by calling <code>done()</code>. Every time <code>done()</code> is called,
		it checks if there are any remaining tokens...if not, the callback is fired.
*/

/**
	@class SheetManager
	@desc
		Class manages the creation of &lt;style> tags and the addition/removal of classes.
*/

/**
	@class Expandable
	@description
		This class controls the expanding and collapsing of expandable units. The animation relys on the properties
		set in the index. Therefore, the animation has be removed from the build file and handled internally. 
		This class can be extended with {@link ExpandableDcs} when units are used in DoubleClick.
 */

/**
	@class ExpandableDcs
	@description
		This is and extension of {@link Expandable} when units are used in DoubleClick. The only difference in the 
		init() method is to pass in this class to the Expandable.init()
		<codeblock>
			Expandable.init ({
				target : View.expanded,
				expandStart : Control.handleExpandStart,
				expandComplete : Control.handleExpandComplete,
				collapseStart : Control.handleCollapseStart,
				collapseComplete : Control.handleCollapseFinish,

				extend : ExpandableDcs
			});
		</codeblock>
 */

/**
	@class LiveScoringData
	@param {object} liveScoringDataRaw	
		raw, live-data json object
	@desc
		This class is instantiated dynamically by {@link LiveScoring}.
*/

/**
	@class LiveScoring
	@desc
		This class manages the polling of the ESPN SCORES API via an Edgecast proxy. In order to build an ad that responds to live scoring, 
		you need to start with the "ad-manager-espn-live-scoring" template. You will notice there is a "liveScoring" settings object
		in the index. Then, in the build is where you will find the event-handlers that will be necessary to thread into your build routines.
		<br><br>

		<b>Setup:</b><br>
			The piece that must be coded is the connection of game-ids from {@link AdManager} to {@link LiveScoring}. The json from AdManager 
			(accessible on {@link AdData.adDataRaw} contains a list of events, the first of which is the next live event. There should be a
			"game_id" property somewhere in that json. For the ESPN API is a 9-digit number. You need to create a property in {@link AdData} 
			for this id, and pass that to {@link LiveScoring}, like:
			<br>

			<codeblock>
				adData.liveScoring = new LiveScoring();
				adData.liveScoring.prepare( adData.currentGameId );
			</codeblock>
			<br><br>

			The following is a summary of what happens in the build.
			<ol>
			 <li>Instantiate {@link LiveScoring}</li>
			 <li>Pass current-game-id to {@link LiveScoring}
			 <li>Setup listeners to handle 
			  <ul>
				<li>State Change, ie, a match goes from upcoming-to-live or live-to-past...which necessitates a rebuild of the view</li>
				<li>Match Update, ie, the score, clock, or period of the currently live game changes/li>
				<li>All Matches Complete, ie, in a doubleheader, both matches are finished and the next {@link AdData} from {@link AdManager} needs to be loaded.</li>
			  </ul>
			 <li>Indicate pathes to local, debug json, which can be used to spoof live-data</li>
			 <li>Start polling.</li>
			</ol>

		<b>Debug:</b><br>
			When running the ad locally, the ad will load the debug live-scoring-json, as specified in the build: <br>
			
			<codeblock>
				adParams.commonPath + 'debug/'
			</codeblock>
			<br><br>

			Because live-events often are double-headers (two games per event) that need to actively cycle through each game there are 
			four debug jsons. These represent two events( "live_data1" and "live_data2" ), with two games( "game1" and "game2" ) per event. 
			If you are only advertising a single game, then you'd be able to test using only the first set "live_data1".<br><br>

			The way to change the "state" of the ad is to find the "state" property in these debug jsons and switch them to one of
			the following three modes:<br>
			<ol>
				<li><code>pre</code></li>
				<li><code>in</code></li>
				<li><code>post</code></li>
			</ol>

			From there any other properties display depends on how your ad is coded.<br><br>

		<b>Notes:</b><br>
			The challenge of live-scoring is building your ad in a way that it can be rebuilt and updated dynamically. For example,
			it needs to be able to build itself in either Doubleheader, Singleheader, or Live modes.<br><br>

			One example of how this can be achieved is detailed below. This code assumes that you have built different endframe "modules"
			which all have a common interface method called "buildMarkup()".<br><br>

	@example
		this.rebuildEndframe = function() {
			adData.elements.endframeModule = function() {
				// LIVE MODE
				if( adData.liveScoring.areLiveMatches() ) {
					console.log( ' - LIVE MODE' );
					return new LiveScoring_300x250();
				}

				// UPCOMING MODE
				else {
					console.log( ' - UPCOMING MODE' );
					// json is double-header
					if( adData.game_type == 'Doubleheader' ) {
						// both matches are upcoming
						if( !adData.getIsMatchup1Past() ) {
							console.log( '    ( doubleheader )' );
							return new DoubleHeader_300x250();
						}
						// first match is finished
						else {
							console.log( '    ( singleheader )' );
							return new SingleHeader_300x250();
						}
					}

					// json is single-header
					else {
						console.log( '    ( singleheader )' );
						return new SingleHeader_300x250();
					}
				}
			}
			adData.elements.endframeModule.buildMarkup();
		}
*/
