! function (modules) {
	var installedModules = {};

	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) return installedModules[moduleId].exports;
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: !1,
			exports: {}
		};
		return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
	}
	__webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
		__webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
			configurable: !1,
			enumerable: !0,
			get: getter
		})
	}, __webpack_require__.n = function (module) {
		var getter = module && module.__esModule ? function () {
			return module.default
		} : function () {
			return module
		};
		return __webpack_require__.d(getter, "a", getter), getter
	}, __webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property)
	}, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 23)
}({
	2: function (module, exports) {
		var g;
		g = function () {
			return this
		}();
		try {
			g = g || Function("return this")() || (0, eval)("this")
		} catch (e) {
			"object" == typeof window && (g = window)
		}
		module.exports = g
	},
	23: function (module, exports, __webpack_require__) {
		(function (global) {
			var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
					return typeof obj
				} : function (obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
				},
				_createClass = function () {
					function defineProperties(target, props) {
						for (var i = 0; i < props.length; i++) {
							var descriptor = props[i];
							descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
						}
					}
					return function (Constructor, protoProps, staticProps) {
						return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
					}
				}();

			function _possibleConstructorReturn(self, call) {
				if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return !call || "object" != typeof call && "function" != typeof call ? self : call
			}

			function _inherits(subClass, superClass) {
				if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
				subClass.prototype = Object.create(superClass && superClass.prototype, {
					constructor: {
						value: subClass,
						enumerable: !1,
						writable: !0,
						configurable: !0
					}
				}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
			}

			function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
			}! function (a) {
				var b = '<template id="build-template">\n\n</template>';
				if (a.head) {
					var c = a.head,
						d = a.createElement("div");
					for (d.innerHTML = b; d.children.length > 0;) c.appendChild(d.children[0])
				} else a.write(b)
			}(document);
			var Device$1 = new(function () {
				function Device() {
					_classCallCheck(this, Device), this.pixelRatio = window.devicePixelRatio || "unknown"
				}
				return Device.prototype.init = function () {
					console.log("Device.init()");
					var D = this;
					D.agentString = navigator.userAgent, D._getType(), D._getBrandAndOS(), D._getBrowser(), "desktop" !== D.type && "windows" === D.os && D.osVersion <= 8 && "ie" === D.browser && D.browserVersion < 12 && (console.log("You appear to be on Windows 7 or 8 using Internet Explorer 11 or under. You also appear to be on a touchscreen device. We will assume you're actually on a desktop, since it's extremely unlikely you're on a tablet or mobile device using this specific operating system and browser."), D.type = "desktop");
					var line = Array(70).join("-"),
						str = "\n" + line;
					str += "\n AGENT:\n\n\t" + D.agentString + "\n", str += "\n  Brand:\t\t\t" + D.brand, str += "\n  Product:\t\t\t" + D.product, str += "\n  Type:\t\t\t\t" + D.type, str += "\n  Os:\t\t\t\t" + D.os + " - " + D.osVersion, str += "\n  Browser:\t\t\t" + D.browser + " - " + D.browserVersion, str += "\n  Dimensions: \t\t" + D.dimensions.width + "x" + D.dimensions.height, str += "\n  Orientation:\t\t" + D.orientation, str += "\n  Pixel Ratio:\t\t" + D.pixelRatio, str += "\n" + line, console.log(str)
				}, Device.prototype._getType = function () {
					var D = this,
						hasMobile = /(android|mobile)/gi.exec(D.agentString),
						hasTablet = /(tablet|touch)/gi.exec(D.agentString),
						hasIPad = /(ipad)/gi.exec(D.agentString);
					D.type = "desktop", hasMobile && (D.type = "mobile"), hasTablet && (D.type = "tablet"), hasIPad && (D.type = "tablet")
				}, Device.prototype._getBrandAndOS = function () {
					var D = this,
						apple = D.agentString.match(/ip(hone|od|ad)|mac/gi);
					if (apple) {
						D.brand = "apple", D.product = apple[0].toLowerCase();
						var appleOS = /(OS\s)(\X\s|)([\d\.\_]+)/gi.exec(D.agentString);
						return D.os = "" == appleOS[2] ? "ios" : "osx", void(D.osVersion = appleOS[3].replace(/\_/g, "."))
					}
					var android = /(android)\/?\s*([0-9\.]+)/gi.exec(D.agentString);
					if (android) return D.brand = D.product = D.os = android[1].toLowerCase(), void(D.osVersion = android[2]);
					var microsoft = /(windows\snt\s|windows\sphone)\/?\s*([0-9\.]+)/gi.exec(D.agentString);
					if (microsoft) {
						switch (D.brand = "microsoft", D.os = "windows", microsoft[2]) {
							case "5.2":
								D.osVersion = "xp";
								break;
							case "6.0":
								D.osVersion = "vista";
								break;
							case "6.1":
								D.osVersion = "7";
								break;
							case "6.2":
								D.osVersion = "8";
								break;
							case "6.3":
								D.osVersion = "8.1";
								break;
							case "10.0":
								D.osVersion = "10";
								break;
							default:
								D.osVersion = microsoft[2]
						}
						return D.product = microsoft[1].toLowerCase(), void(D.product.match(/\snt/i) && (D.product = "pc"))
					}
					D.agentString.match(/(blackberry|bb10|playbook)/i) && (D.brand = D.product = D.os = "blackberry", D.osVersion = /(version)\/?\s*([0-9\.]+)/gi.exec(D.agentString)[2])
				}, Device.prototype._getBrowser = function () {
					var D = this,
						browserMatches = /(edge(?=\/))\/?\s*([0-9\.]+)/i.exec(D.agentString);
					if (browserMatches || (browserMatches = D.agentString.match(/(fban|fbav|opera|chrome|crios|safari|firefox|msie|trident(?=\/))\/?\s*([0-9\.]+)/i)), !browserMatches || browserMatches.length < 3) {
						switch (console.log("we received no browser data, so we are setting it to the default of the device"), D.os) {
							case "ios":
								D.browser = "safari";
								break;
							case "windows":
								D.browser = "trident";
								break;
							default:
								D.browser = "chrome"
						}
						D.browserVersion = "os-default"
					} else switch (console.log("we received browser data"), D.browser = browserMatches[1].toLowerCase(), D.browserVersion = browserMatches[2], D.browser) {
						case "trident":
							(versionMatch = /\brv:+(\d+)/g.exec(D.agentString)) && (D.browserVersion = versionMatch[1]);
						case "msie":
							D.browser = "ie";
							break;
						case "crios":
							D.browser = "chrome";
							break;
						case "safari":
							(versionMatch = D.agentString.match(/\sversion\/([0-9\.]+)\s/i)) && (D.browserVersion = versionMatch[1]);
							break;
						case "chrome":
							var versionMatch;
							(versionMatch = D.agentString.match(/\b(OPR)\/([0-9\.]+)/i)) && (D.browser = "opera", D.browserVersion = versionMatch[2])
					}
				}, _createClass(Device, [{
					key: "orientation",
					get: function () {
						return window.innerWidth > window.innerHeight ? "landscape" : "portrait"
					}
				}, {
					key: "dimensions",
					get: function () {
						return {
							width: window.innerWidth,
							height: window.innerHeight
						}
					}
				}]), Device
			}());

			function get(selector, parent) {
				if ("string" != typeof selector) return selector;
				switch (parent = parent || document, (selector = selector.trim())[0]) {
					case "#":
						return parent.getElementById(selector.slice(1));
					case ".":
						return parent.getElementsByClassName(selector.slice(1));
					case "<":
						return parent.getElementsByTagName(selector.slice(1, selector.length - 1));
					default:
						return parent.getElementById(selector)
				}
			}

			function setCss(element, args) {
				element = get(element);
				var cssList = {};
				if (arguments.length > 2)
					for (var i = 1; i < arguments.length; i += 2) cssList = CssManager$1.conformCssKeyValue(arguments[i], arguments[i + 1]);
				else cssList = "string" == typeof arguments[1] ? CssManager$1.conformCssString(arguments[1], element) : CssManager$1.conformCssObject(arguments[1], element);
				CssManager$1.apply(element, cssList)
			}

			function getCss(element, key) {
				var cssValue;
				if (element = get(element), "x" == key || "y" == key) {
					var matrix = element.style[CssManager$1.getDeviceKey("transform")].replace(/[\s\(\)matrix]/g, "").split(",");
					cssValue = matrix.length < 6 ? 0 : +matrix["x" == key ? 4 : 5]
				} else {
					cssValue = window.getComputedStyle(element, null).getPropertyValue(key).replace(/px/, ""), isNaN(cssValue) || (cssValue = parseInt(cssValue, 10))
				}
				return cssValue
			}

			function injectStylesheet(nodeId, styles) {
				if (!document.getElementById(nodeId)) {
					var style = document.createElement("style");
					style.type = "text/css", style.id = nodeId;
					var str = 2 === arguments.length ? styles : "";
					if (arguments.length > 2)
						for (var i = 0; i < arguments.length - 1; i += 2) {
							str += arguments[i + 1].replace(/\,\s+/g, ","), str += " { " + (arguments[i + 2] || "") + " }\n"
						}
					style.innerHTML = str, document.getElementsByTagName("head")[0].appendChild(style)
				}
			}

			function addClass(target, className) {
				for (var element = get(target), i = 0; i < arguments.length - 1; i++) element.classList.add(arguments[i + 1])
			}
			var Styles$1 = Object.freeze({
				setCss: setCss,
				getCss: getCss,
				injectStylesheet: injectStylesheet,
				addClass: addClass,
				removeClass: function (target, className) {
					get(target).classList.remove(className)
				}
			});

			function textDropShadow(obj) {
				setCss(obj.target, {
					textShadow: function (angle, distance, size, spread, color, alpha, inner) {
						var val = "",
							rad = (degree = -1 * angle + 180, Math.PI / 180 * degree);
						var degree;
						val += (Math.cos(rad) * distance).toFixed(8) + "px ", val += (Math.sin(rad) * distance).toFixed(8) + "px ", val += size + "px", spread && (val += " " + spread + "px");
						val += " " + function (color, alpha) {
							return "rgba(" + (color = function (color, alpha) {
								switch (void 0 === color ? "undefined" : _typeof(color)) {
									case "object":
										color = color || {
											r: 0,
											g: 0,
											b: 0,
											a: 1
										};
										break;
									default:
										if (color.indexOf("rgb") >= 0) color = {
											r: (color = color.substring(color.indexOf("(") + 1, color.lastIndexOf(")")).split(/,\s*/))[0],
											g: color[1],
											b: color[2],
											a: Number(color[3])
										};
										else {
											if (!(color.indexOf("#") >= 0)) return console.log(""), console.log("ERROR: ColorUtils.toRgba does not accept color names such as '" + color + "'. Use HEX or an RGB/A string or object per documentation"), console.log("Returning the color '" + color + "' without any alpha"), console.log(""), color;
											var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(color);
											color = result ? {
												r: parseInt(result[1], 16),
												g: parseInt(result[2], 16),
												b: parseInt(result[3], 16),
												a: result[4] ? Number(result[4], 16) : 1
											} : null
										}
								}
								return color.a || (color.a = 1), alpha >= 0 && (color.a = alpha), color
							}(color, alpha)).r + "," + color.g + "," + color.b + "," + color.a + ")"
						}(color, alpha), (inner = !!inner) && (val += " inset");
						return val
					}(obj.angle || 0, obj.distance || 0, obj.size || 0, null, obj.color || "#000000", obj.alpha)
				})
			}
			var _rect = {
				x: ["offsetWidth", "width", "left", "right"],
				y: ["offsetHeight", "height", "top", "bottom"]
			};
			var _rect$1 = [{
					x: "offsetWidth",
					y: "offsetHeight",
					parent: "parentNode"
				}, {
					x: "width",
					y: "height",
					parent: "stage"
				}],
				BOTTOM = "alignBottom",
				CENTER = "alignCenter";

			function set$1(source, arg) {
				var obj = function (source, arg) {
					var elem = source.canvas || get(source),
						obj = {},
						snap = !1 !== arg.snap,
						sourceRect = isDomElement(source) ? 0 : 1;
					"string" == typeof arg && (arg = calculate(arg));
					for (var xy in arg)
						if ("x" == xy || "y" == xy) {
							var against, againstDimension, params = arg[xy];
							if (!params) continue;
							"string" == typeof params && (params = {
								type: params
							});
							var againstX = 0,
								againstNumber = !1,
								offset = params.offset || 0;
							if (void 0 !== params.against) {
								var againstRect = 0;
								isDomElement(against = params.against) ? against.canvas ? againstRect = 1 : againstX = getCss(against, xy) : "number" == typeof against ? (againstNumber = !0, againstX = against) : (againstX = against[xy], againstRect = 1), againstDimension = _rect$1[againstRect][xy], params.type === CENTER && (arg[xy].outer = !1)
							} else against = elem[_rect$1[sourceRect].parent], againstDimension = _rect$1[sourceRect][xy];
							var widthOrHeight = elem[_rect$1[sourceRect][xy]];
							switch (source._type) {
								case "arc":
								case "path":
									switch (params.type) {
										case CENTER:
											widthOrHeight = 0;
											break;
										default:
											offset += widthOrHeight / 2
									}
									break;
								case "text":
									if ("x" === xy) switch (source.alignText) {
										case "center":
											widthOrHeight = 0;
										case "right":
											widthOrHeight *= -1
									}
							}
							widthOrHeight /= source.qualityScale || 1;
							var pos = calculate(params.type, widthOrHeight, againstNumber ? 0 : against[againstDimension] / (against.qualityScale || 1), !againstNumber && !!arg[xy].outer);
							null != pos && (pos += againstX + offset, obj[xy] = snap ? Math.round(pos) : pos)
						}
					return obj
				}(source, arg);
				if (isDomElement(source)) setCss(source.canvas || get(source), obj);
				else
					for (var prop in obj) source[prop] = obj[prop];
				return obj
			}

			function calculate(mode, source, target, outer) {
				var isConvert = 1 == arguments.length;
				switch (mode) {
					case "alignBottom":
						if (outer && (source = 0), !isConvert) return target - source;
					case "alignTop":
						return isConvert ? {
							y: mode
						} : outer ? -source : 0;
					case "alignRight":
						if (outer && (target += source), !isConvert) return target - source;
					case "alignLeft":
						return isConvert ? {
							x: mode
						} : outer ? -source : 0;
					case "alignCenter":
						return outer && (target = 0), isConvert ? {
							x: mode,
							y: mode
						} : (target - source) / 2;
					default:
						return null
				}
			}

			function isDomElement(elem) {
				return elem instanceof HTMLElement || void 0 != elem.canvas
			}

			function rel(a0, a1, b0, b1, bX) {
				return (bX - b0) / (b1 - b0) * (a1 - a0) + a0
			}
			var mix = function (superclass) {
					return new MixinBuilder(superclass)
				},
				MixinBuilder = function () {
					function MixinBuilder(superclass) {
						_classCallCheck(this, MixinBuilder), this.superclass = superclass
					}
					return MixinBuilder.prototype.with = function () {
						for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) mixins[_key] = arguments[_key];
						return mixins.reduce(function (c, mixin) {
							return mixin(c)
						}, this.superclass)
					}, MixinBuilder
				}(),
				LoaderBase = function (superclass) {
					return function (_superclass) {
						function _class() {
							for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
							_classCallCheck(this, _class);
							var _this = _possibleConstructorReturn(this, _superclass.call.apply(_superclass, [this].concat(args))),
								arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
								L = _this;
							return L.onComplete = arg.onComplete || function () {}, L.onFail = arg.onFail || function () {}, L.onProgress = arg.onProgress || function () {}, L.name = arg.name || "", L.scope = arg.scope || L, L.dataRaw, L.cacheBuster = arg.cacheBuster || !1, L._failCalled = !1, _this
						}
						return _inherits(_class, _superclass), _class.prototype._handleFail = function () {
							var L = this;
							L._failCalled || (L._failCalled = !0, L.onFail.call(L.scope, L), console.log('Loader "' + L.name + '" Fail:', L.url))
						}, _class
					}(superclass)
				};

			function getFileName(url) {
				var extension = url.lastIndexOf("."),
					directory = url.lastIndexOf("/") + 1;
				return directory > extension && (extension = void 0), url.substring(directory, extension)
			}

			function getFileType(url) {
				var _index = (url = url || "").indexOf("?");
				_index > -1 && (url = url.substr(0, _index));
				var _split = url.match(/[^\\]*\.(\w+)$/),
					_base64 = url.match(/image\/(jpeg|jpg|png)/);
				return _split ? _split[1] : _base64 ? _base64[1] : "unknown"
			}
			var LoaderSource = function (superclass) {
					return function (_superclass2) {
						function _class2() {
							for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
							_classCallCheck(this, _class2);
							var _this2 = _possibleConstructorReturn(this, _superclass2.call.apply(_superclass2, [this].concat(args))),
								arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
								L = _this2;
							return L.url = global.matchProtocolTo(arguments[0] || ""), arg.platformGetUrl && (L.platformGetUrl = arg.platformGetUrl, L.url = arg.platformGetUrl(L.url)), L.fileName = void 0 === arg.id ? getFileName(L.url) : arg.id, L.fileType = arg.fileType || getFileType(L.url), _this2
						}
						return _inherits(_class2, _superclass2), _class2
					}(superclass)
				},
				LoaderTicker = function (superclass) {
					return function (_superclass3) {
						function _class3() {
							_classCallCheck(this, _class3);
							for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
							return _possibleConstructorReturn(this, _superclass3.call.apply(_superclass3, [this].concat(args)))
						}
						return _inherits(_class3, _superclass3), _class3.prototype._setTicker = function (args) {
							var L = this,
								node = document.createElement("div");
							node.innerHTML = args.content, node.style.cssText = args.css || "", document.body.appendChild(node);
							var width = void 0 != args.width ? args.width : node.offsetWidth;
							node.style.fontFamily = args.font || "";
							var _timeOut = setTimeout(function () {
									clearInterval(_interval), L._handleFail()
								}, 5e3),
								_interval = setInterval(function () {
									node.offsetWidth != width && (clearTimeout(_timeOut), clearInterval(_interval), L._handleTickerComplete(node))
								}, 10)
						}, _class3.prototype._removeTickerNode = function (node) {
							node.parentNode.removeChild(node)
						}, _class3
					}(superclass)
				},
				ImageLoader = function (_mix$with) {
					function ImageLoader() {
						for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) args[_key5] = arguments[_key5];
						_classCallCheck(this, ImageLoader);
						var _this4 = _possibleConstructorReturn(this, _mix$with.call.apply(_mix$with, [this].concat(args))),
							arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
						return _this4.renderOnly = !!arg.renderOnly, _this4.crossOrigin = arg.crossOrigin, _this4
					}
					return _inherits(ImageLoader, _mix$with), ImageLoader.prototype.load = function () {
						var I = this;
						if (I.renderOnly) I._setTicker({
							content: I.url,
							width: 0
						});
						else {
							var img = new Image;
							img.id = I.fileName, img.crossOrigin = I.crossOrigin, img.onload = I._handleComplete.bind(I), img.onerror = I._handleFail, img.src = I.url
						}
					}, ImageLoader.prototype._handleComplete = function (event) {
						var I = this;
						I.dataRaw = event.target, I.onComplete.call(I.scope, I)
					}, ImageLoader
				}(mix(function Blank$1() {
					_classCallCheck(this, Blank$1)
				}).with(LoaderBase, LoaderSource, LoaderTicker)),
				InlineLoader = function (_mix$with2) {
					function InlineLoader() {
						_classCallCheck(this, InlineLoader);
						for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) args[_key6] = arguments[_key6];
						return _possibleConstructorReturn(this, _mix$with2.call.apply(_mix$with2, [this].concat(args)))
					}
					return _inherits(InlineLoader, _mix$with2), InlineLoader.prototype.load = function () {
						var I = this,
							elem = void 0;
						(elem = "css" == I.fileType ? I._createCssLink() : "html" == I.fileType ? I._createHtmlLink() : I._createScript()).charset = "utf-8", elem.onload = I._handleComplete.bind(I), elem.onerror = I._handleFail, "css" == I.fileType || "html" == I.fileType ? elem.href = this.url : elem.src = I.url, document.getElementsByTagName("head")[0].appendChild(elem)
					}, InlineLoader.prototype._createCssLink = function () {
						var elem = document.createElement("link");
						return elem.rel = "stylesheet", elem.type = "text/css", elem
					}, InlineLoader.prototype._createHtmlLink = function () {
						var elem = document.createElement("link");
						return elem.rel = "import", elem
					}, InlineLoader.prototype._createScript = function () {
						var elem = document.createElement("script");
						return elem.type = "text/javascript", elem
					}, InlineLoader.prototype._handleComplete = function (event) {
						var I = this;
						I.dataRaw = event.target, I.onComplete.call(I.scope, I)
					}, InlineLoader
				}(mix(function Blank$2() {
					_classCallCheck(this, Blank$2)
				}).with(LoaderBase, LoaderSource)),
				DataLoader = function (_mix$with3) {
					function DataLoader() {
						for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) args[_key7] = arguments[_key7];
						_classCallCheck(this, DataLoader);
						var _this6 = _possibleConstructorReturn(this, _mix$with3.call.apply(_mix$with3, [this].concat(args))),
							arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
							D = _this6;
						return D.method = (arg.method || "get").toLowerCase(), D.query = arg.query || null, D.responseType = arg.responseType || null, _this6
					}
					return _inherits(DataLoader, _mix$with3), DataLoader.prototype.load = function () {
						var D = this,
							queryString = null,
							isPost = "post" === D.method;
						D.req = function () {
							try {
								return new XMLHttpRequest
							} catch (e) {}
							try {
								return new ActiveXObject("Msxml2.XMLHTTP")
							} catch (e) {}
							return alert("XMLHttpRequest not supported"), null
						}(), void 0 != D.responseType && (D.req.responseType = D.responseType);
						var url = D.url;
						switch (D.query && (queryString = function (query) {
							if ("string" == typeof query) return query;
							var queryString = "";
							for (var prop in query) console.log("      prop =", prop), queryString += prop + "=" + query[prop] + "&";
							return queryString.substr(0, queryString.length - 1)
						}(D.query), isPost || (url += "?" + queryString, queryString = null)), D.cacheBuster && (url += D.query && !isPost ? "&" : "?", url += "cb=" + (new Date).getTime()), D.req.onreadystatechange = D._handleStateChange.bind(D), D.req.open(D.method, url, !0), D.fileType) {
							case "xml":
								D.req.overrideMimeType && D.req.overrideMimeType("text/xml");
								break;
							case "json":
								D.req.overrideMimeType && D.req.overrideMimeType("application/json");
								break;
							case "fba":
							case "bin":
							case "binary":
								D.responseType = D.req.responseType = "arraybuffer"
						}
						"post" === D.method && D.req.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), D.req.send(queryString)
					}, DataLoader.prototype._handleStateChange = function (target) {
						var D = this;
						switch (D.req.readyState) {
							case 3:
								200 == this.req.status && (D.dataRaw = D.responseType ? D.req.response : D.req.responseText, D._handleProgress(D));
								break;
							case 4:
								200 == D.req.status ? (D.dataRaw = D.responseType ? D.req.response : D.req.responseText, D._handleComplete(D)) : D._handleFail({
									target: target
								})
						}
					}, DataLoader.prototype._handleProgress = function () {
						var D = this;
						D.onProgress.call(D.scope, D)
					}, DataLoader.prototype._handleComplete = function () {
						var D = this;
						D.onComplete.call(D.scope, D)
					}, DataLoader
				}(mix(function Blank$3() {
					_classCallCheck(this, Blank$3)
				}).with(LoaderBase, LoaderSource)),
				FontLoader = function (_mix$with4) {
					function FontLoader() {
						_classCallCheck(this, FontLoader);
						for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) args[_key8] = arguments[_key8];
						return _possibleConstructorReturn(this, _mix$with4.call.apply(_mix$with4, [this].concat(args)))
					}
					return _inherits(FontLoader, _mix$with4), FontLoader.prototype.load = function () {
						var F = this;
						F.fileName = F.fileName.split(".")[0];
						var assembledFontRule = "@font-face { font-family: " + F.fileName + "; src: url(" + F.url + ") format('truetype'); }",
							getSheet = document.getElementById("RED_fontStyleSheet");
						if (getSheet) getSheet.innerHTML += assembledFontRule;
						else {
							var styleScript = document.createElement("style");
							styleScript.type = "text/css", styleScript.media = "screen", styleScript.id = "RED_fontStyleSheet", styleScript.appendChild(document.createTextNode(assembledFontRule)), document.getElementsByTagName("head")[0].appendChild(styleScript)
						}
						F._setTicker({
							content: " !\"\\#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~",
							css: "position:absolute; top:-1000px; font-size:100px; font-family:san-serif; font-variant:normal; font-style:normal; font-weight:normal; letter-spacing:0; white-space:nowrap;",
							font: F.fileName
						})
					}, FontLoader.prototype._handleTickerComplete = function (node) {
						var F = this;
						setTimeout(function () {
							F._removeTickerNode(node)
						}, 300), F._handleComplete()
					}, FontLoader.prototype._handleComplete = function (event) {
						var F = this;
						F.dataRaw = F.fileName, F.onComplete.call(F.scope, F)
					}, FontLoader
				}(mix(function Blank$4() {
					_classCallCheck(this, Blank$4)
				}).with(LoaderBase, LoaderSource, LoaderTicker)),
				Loader$1 = function (_mix$with5) {
					function Loader$1() {
						for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) args[_key9] = arguments[_key9];
						_classCallCheck(this, Loader$1);
						var _this8 = _possibleConstructorReturn(this, _mix$with5.call.apply(_mix$with5, [this].concat(args))),
							arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
							L = _this8;
						return L._queue = {}, L._total = 0, L._active = !1, L._startedCount = 0, L.prepend = arg.prepend || "", L.platformGetUrl = arg.platformGetUrl, L.fileType = arg.fileType || null, L.content = [], L.crossOrigin = arg.crossOrigin || void 0, L.add(arguments[0]), _this8
					}
					return _inherits(Loader$1, _mix$with5), Loader$1.prototype.add = function (arg) {
						var L = this;
						if ("string" == typeof arg) L._addSingleLoad(arg);
						else if (arg instanceof Array)
							for (var i = 0; i < arg.length; i++) L._addSingleLoad(arg[i]);
						else arg instanceof Loader$1 && (arg.content && arg.content[0] && "fba" == arg.content[0].fileType ? L._addFbaSubLoads(arg.content[0]) : L._addSubLoad(arg))
					}, Loader$1.prototype.load = function () {
						var L = this;
						if (L._active = !0, L._total <= 0) console.log('Loader "' + L.name + '" has NO assets to be loaded.');
						else {
							var _has = !1,
								_output = "";
							for (var l in L._queue)
								if (!(L._queue[l] instanceof Loader$1)) {
									_has || (_has = !0, _output += 'Loader "' + L.name + '" requesting:');
									var fileName = L._queue[l].fileName,
										extension = L._queue[l].fileType,
										fileAndExtension = fileName.indexOf("." + extension) > -1 ? fileName : fileName + "." + extension;
									_output += "\n\t -> " + (L._queue[l].prepend || "") + fileAndExtension
								}
							_has && console.log(_output)
						}
						L._startSingleLoad(0)
					}, Loader$1.prototype.getAllContent = function () {
						var _found = [];
						return function searchSubLoader(content) {
							for (var i = 0; i < content.length; i++) content[i] instanceof Loader$1 ? searchSubLoader(content[i].content) : _found.push(content[i])
						}(this.content), _found.length < 1 && console.log("No Content found"), _found
					}, Loader$1.prototype.getAllContentRaw = function () {
						for (var _content = this.getAllContent(), i = 0; i < _content.length; i++) _content[i] = _content[i].dataRaw;
						return _content
					}, Loader$1.prototype.getLoader = function (id) {
						var _found = null;
						return function searchSubLoader(content) {
							for (var i = 0; i < content.length; i++) content[i] instanceof Loader$1 && (!content[i] || content[i].name !== id && content[i] !== id ? searchSubLoader(content[i].content) : _found = content[i])
						}(this.content), _found || console.log("No Loader found of that name"), _found
					}, Loader$1.prototype._addSingleLoad = function (url, fbaOverwrite) {
						var L = this,
							fileType = fbaOverwrite ? fbaOverwrite[1] : L.fileType || getFileType(url),
							loaderType = void 0;
						switch (fileType) {
							case "jpg":
							case "jpeg":
							case "gif":
							case "png":
							case "svg":
								loaderType = ImageLoader;
								break;
							case "ttf":
							case "woff":
								loaderType = FontLoader;
								break;
							case "json":
							case "fba":
							case "bin":
							case "binary":
								loaderType = DataLoader;
								break;
							default:
								loaderType = InlineLoader
						}
						var singleLoader = new loaderType(fbaOverwrite ? url : L.prepend + url, {
							scope: L,
							platformGetUrl: L.platformGetUrl,
							onComplete: L._handleSingleLoadComplete,
							onFail: L._handleFail,
							fileType: fileType,
							cacheBuster: L.cacheBuster,
							crossOrigin: L.crossOrigin
						});
						fbaOverwrite && (singleLoader.fileName = fbaOverwrite[0]), singleLoader.queueIndex = L._total, L._queue[L._total] = singleLoader, L._total++
					}, Loader$1.prototype._addSubLoad = function (loader) {
						var L = this;
						loader.onComplete = L._handleSingleLoadComplete.bind(L), loader.onProgress = L._handleProgress.bind(L), loader.onFail = L._handleFail, loader.queueIndex = L._total, L._queue[L._total] = loader, L._total++
					}, Loader$1.prototype._addFbaSubLoads = function (loader) {
						var uint8 = new Uint8Array(4),
							uint32 = new Uint32Array(uint8.buffer),
							idx = 44,
							chunkTotal = new Uint8Array(loader.dataRaw, idx, 1)[0];
						idx += 5;
						for (var i = 0; i < chunkTotal; i++) {
							for (var sizeOfChunk = new Uint8Array(loader.dataRaw, idx, 4), up = 4, k = 0; k < 4; k++) uint8[--up] = sizeOfChunk[k];
							var length = uint32[0];
							idx += 7;
							var type = String.fromCharCode(new Uint8Array(loader.dataRaw, idx++, 1)),
								fileNameLength = new Uint8Array(loader.dataRaw, idx + 3, 1)[0] || 0,
								nameBuffer = new Uint8Array(loader.dataRaw, idx + 4, fileNameLength),
								fileName = String.fromCharCode.apply(String, nameBuffer);
							fileNameLength += 4;
							var chunkData = new Uint8Array(loader.dataRaw, idx + fileNameLength, length - fileNameLength);
							idx += length + 4;
							var fileNameSplit = fileName.split("."),
								blobFileType = "f" == type ? "application/x-font-ttf" : "image/" + ("svg" == fileNameSplit[1] ? "svg+xml" : fileNameSplit[1]),
								blob = new Blob([chunkData], {
									type: blobFileType
								}),
								url = URL.createObjectURL(blob);
							this._addSingleLoad(url, fileNameSplit)
						}
					}, Loader$1.prototype._startSingleLoad = function (i) {
						var L = this,
							_inst = L._queue[i];
						0 == L._total ? L._handleComplete() : i < L._total && (_inst instanceof Loader$1 || i < L._total - 1 && L._startLoadTimeOut(++i), _inst.load())
					}, Loader$1.prototype._startLoadTimeOut = function (i) {
						var L = this;
						setTimeout(function () {
							L._startSingleLoad(i)
						}, 10)
					}, Loader$1.prototype._handleSingleLoadComplete = function (target) {
						var L = this;
						L.content[target.queueIndex] = target, delete L._queue[target.queueIndex], L._handleProgress(), void 0 == target.url && target.queueIndex < L._total - 1 && L._startLoadTimeOut(target.queueIndex + 1)
					}, Loader$1.prototype._handleProgress = function () {
						for (var L = this, _length = L.content.length, _count = 0, i = 0; i < _length; i++) L.content[i] && _count++;
						var _consecutive = _count,
							_subProgress = 0;
						_count < L._total && L._queue[_count] && (_subProgress = L._queue[_count].progress / L._total || 0), L.progress = _consecutive / L._total + _subProgress, L.rawProgress = _count / L._total + _subProgress, L.onProgress.call(L.scope, L), _count >= L._total && L._handleComplete()
					}, Loader$1.prototype._handleComplete = function () {
						var L = this;
						L.onComplete.call(L.scope, L)
					}, Loader$1
				}(mix(function Blank() {
					_classCallCheck(this, Blank)
				}).with(LoaderBase)),
				_kills = {},
				_eventLooping = !1;
			var Event = function (name, mouseGlobalX, mouseGlobalY, mouseLocalX, mouseLocalY, elementX, elementY, distanceX, distanceY, velocityX, velocityY) {
				var E = new CustomEvent(name);
				return E.mouse = {
					global: {
						x: mouseGlobalX,
						y: mouseGlobalY
					},
					local: {
						x: mouseLocalX,
						y: mouseLocalY
					}
				}, E.element = {
					x: elementX || 0,
					y: elementY || 0
				}, E.distance = {
					x: distanceX || 0,
					y: distanceY || 0
				}, E.velocity = {
					x: velocityX || 0,
					y: velocityY || 0
				}, E.direction = {
					x: velocityX > 0 ? "right" : velocityX < 0 ? "left" : null,
					y: velocityY > 0 ? "down" : velocityY < 0 ? "up" : null
				}, E
			};
			var stop = function (event) {
				event && (event.stopImmediatePropagation(), _kills[event.type] = !0)
			};
			var stopped = function (type) {
				return void 0 != _kills[type]
			};
			var _componentEnabled, _sliderUpdate, OVER = "mouseover",
				OUT = "mouseout",
				CLICK = "onSelect",
				GestureBase = function () {
					function GestureBase(elem) {
						_classCallCheck(this, GestureBase);
						var G = this;
						G.elem = elem, G.hasActiveChildren = !0, G.debug = !1, G.eventList = [], G._isDragEnabled = !1, G._isDragging = !1, G._give = 2, G._oX = 0, G._oY = 0, G._p1X = 0, G._p1Y = 0, G._p2X = 0, G._p2Y = 0, G._sX = 0, G._sY = 0, G._vX = 0, G._vY = 0, G._cursor = "mouse", G._start = "down", G._end = "up", G.init()
					}
					return GestureBase.prototype.init = function () {
						var G = this;
						G.debug && console.log("GestureBase.init()"), G._handleTouchStart = G._handleTouchStart.bind(G), G._handleDown = G._handleDown.bind(G), G._handleDrag = G._handleDrag.bind(G), G._handleUp = G._handleUp.bind(G), G._elemAdd = G.elem.addEventListener.bind(G.elem), G._elemRemove = G.elem.removeEventListener.bind(G.elem), G._reset()
					}, GestureBase.prototype.register = function (name, handler) {
						var G = this;
						G.debug && console.log("GestureBase.register(", name, ")"), G.eventList.push(name), G._checkDragEnabled(), G._elemAdd(name, handler)
					}, GestureBase.prototype.unregister = function (name, handler) {
						var G = this;
						G.debug && console.log("GestureBase.unregister(", name, ")");
						var index = G.eventList.indexOf(name);
						index >= 0 && G.eventList.splice(index, 1), G._checkDragEnabled(), G._elemRemove(name, handler)
					}, GestureBase.prototype._reset = function () {
						var G = this;
						G._cursor = "mouse", G._start = "down", G._end = "up", G.elem.addEventListener("touchstart", G._handleTouchStart), "ios" != Device$1.os && G.elem.addEventListener("mousedown", G._handleDown)
					}, GestureBase.prototype._checkDragEnabled = function () {
						var hasDragEventIndex = this.eventList.join("").indexOf("onDrag");
						this._isDragEnabled = hasDragEventIndex > -1
					}, GestureBase.prototype._getEventScope = function (event) {
						return event.changedTouches ? event.changedTouches[0] : event
					}, GestureBase.prototype._add = function (type, handler) {
						window.addEventListener(this._cursor + type, handler)
					}, GestureBase.prototype._remove = function (type, handler) {
						window.removeEventListener(this._cursor + type, handler)
					}, GestureBase.prototype._handleDown = function (event) {
						var G = this;
						G.debug && console.log("GestureBase._handleDown()"), _eventLooping || (_eventLooping = !0, _kills = {}), G.elem.removeEventListener("touchstart", G._handleTouchStart), "ios" != Device$1.os && G.elem.removeEventListener("mousedown", G._handleDown), G._isDragging = !1, G._add(G._end, G._handleUp), G._add("move", G._handleDrag);
						var touch = G._getEventScope(event),
							mouseX = touch.pageX,
							mouseY = touch.pageY,
							elemRect = G.elem.getBoundingClientRect(),
							localOffsetX = mouseX - elemRect.left,
							localOffsetY = mouseY - elemRect.top,
							localX = G.elem.x || getCss(G.elem, "x"),
							localY = G.elem.y || getCss(G.elem, "y"),
							globalOffsetX = elemRect.left - localX,
							globalOffsetY = elemRect.top - localY;
						G._oX = globalOffsetX + localOffsetX, G._oY = globalOffsetY + localOffsetY;
						var elemPositionX = mouseX - G._oX,
							elemPositionY = mouseY - G._oY;
						G._sX = G._p1X = G._p2X = mouseX, G._sY = G._p1Y = G._p2Y = mouseY,
							function (name) {
								if (stopped(name)) return;
								var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY);
								G.debug && console.log(" -> dispatch", name);
								G.elem.dispatchEvent(newEvent)
							}("onPress")
					}, GestureBase.prototype._handleUp = function (event, bypass) {
						var G = this;
						G.debug && console.log("GestureBase._handleUp()"), G._remove(G._end, G._handleUp), G._remove("move", G._handleDrag);
						var touch = G._getEventScope(event),
							mouseX = touch.pageX,
							mouseY = touch.pageY,
							elemRect = G.elem.getBoundingClientRect(),
							localOffsetX = mouseX - elemRect.left,
							localOffsetY = mouseY - elemRect.top,
							elemPositionX = mouseX - G._oX,
							elemPositionY = mouseY - G._oY;
						!0 !== bypass && localCreateEvent("onRelease");
						var offsetTop = elemRect.top + window.pageYOffset,
							offsetBottom = offsetTop + elemRect.height,
							offsetLeft = elemRect.left + window.pageXOffset,
							offsetRight = offsetLeft + elemRect.width;

						function localCreateEvent(name) {
							if (!stopped(name)) {
								var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY, 0, 0, G._vX, G._vY);
								G.debug && console.log(" -> dispatch", name), G.elem.dispatchEvent(newEvent)
							}
						}
						G._isDragging ? (G._isDragEnabled && G._dragEndOrSwipe("onDragStop"), console.log("  -> No CLICK Fired, was dragging")) : mouseX > offsetLeft && mouseX < offsetRight && mouseY > offsetTop && mouseY < offsetBottom && localCreateEvent("onSelect"), G._isDragging && G._dragEndOrSwipe("onSwipe"), G._reset(), event.preventDefault(), _eventLooping = !1
					}, GestureBase.prototype._handleTouchStart = function (event) {
						var G = this;
						G.debug && console.log("GestureBase._handleTouchStart()"), G._cursor = "touch", G._start = "start", G._end = "end", G._handleDown(event)
					}, GestureBase.prototype._handleDrag = function (event) {
						var G = this;
						G.debug && console.log("GestureBase._handleDrag()");
						var touch = G._getEventScope(event),
							mouseX = touch.pageX,
							mouseY = touch.pageY,
							diffx1 = mouseX - G._p1X,
							diffx2 = mouseX - G._p2X;
						G._vX = (diffx2 - diffx1) / 2 + diffx1;
						var diffy1 = mouseY - G._p1Y,
							diffy2 = mouseY - G._p2Y;
						G._vY = (diffy2 - diffy1) / 2 + diffy1;
						var elemPositionX = mouseX - G._oX,
							elemPositionY = mouseY - G._oY,
							elemRect = G.elem.getBoundingClientRect(),
							localOffsetX = mouseX - elemRect.left,
							localOffsetY = mouseY - elemRect.top;

						function localCreateEvent(name) {
							if (!stopped(name)) {
								var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY, G._p1X - G._sX, G._p1Y - G._sY, G._vX, G._vY);
								G.debug && console.log(" -> dispatch", name), G.elem.dispatchEvent(newEvent)
							}
						}
						G._isDragging ? G._isDragEnabled && localCreateEvent("onDrag") : (Math.abs(G._sX - mouseX) > G._give || Math.abs(G._sY - mouseY) > G._give) && (G._isDragging = !0, G._isDragEnabled && localCreateEvent("onDragStart")), G._p2X = G._p1X, G._p1X = mouseX, G._p2Y = G._p1Y, G._p1Y = mouseY
					}, GestureBase.prototype._dragEndOrSwipe = function (type) {
						var G = this;
						if (G.debug && console.log("GestureBase._dragEndOrSwipe()", type), !stopped(name)) {
							var elemRect = G.elem.getBoundingClientRect(),
								evt = new Event(type, G._p1X, G._p1Y, G._p1X - elemRect.left, G._p1Y - elemRect.top, G._p1X - G._oX, G._p1Y - G._oY, G._p2X - G._sX, G._p2Y - G._sY, G._vX, G._vY);
							G.debug && console.log(" -> dispatch", type), G.elem.dispatchEvent(evt)
						}
					}, GestureBase
				}(),
				Gesture = new function () {
					var G = this,
						_targets = [],
						_disableList = [],
						_eventPass = void 0 != document.createEventObject;

					function getGestureBase(target) {
						for (var _gestureBase = null, i = 0; i < _targets.length; i++)
							if (_targets[i].elem === target) {
								_gestureBase = _targets[i];
								break
							}
						return _gestureBase || (_gestureBase = function (target) {
							var _gestureBase = new GestureBase(target);
							return _targets.push(_gestureBase), _gestureBase
						}(target)), _gestureBase
					}

					function setActiveChildren(target, active) {
						var gestureBase = getGestureBase(target);
						if (gestureBase.hasActiveChildren != active) {
							gestureBase.hasActiveChildren = active;
							for (var children = gestureBase.elem.getElementsByTagName("*"), i = 0; i < children.length; i++) children[i].parentNode == target && (active ? G.enable(children[i]) : G.disable(children[i]))
						}
					}

					function getForwardedTarget(event) {
						for (var hiddenList = [], el = function getNextLayerElement(target, x, y, list) {
								target.style.visibility = "hidden", list.push(target);
								for (var elem = document.elementFromPoint(x, y), i = 0; i < _disableList.length; i++)
									if (_disableList[i].elem == elem) return getNextLayerElement(elem, x, y, list);
								return elem
							}(event.target, event.clientX, event.clientY, hiddenList), i = 0; i < hiddenList.length; i++) hiddenList[i].style.visibility = "visible";
						return hiddenList = [], event.stopImmediatePropagation(), el
					}

					function handlePassThroughClick(event) {
						var el = getForwardedTarget(event),
							evt = document.createEvent("HTMLEvents");
						evt.initEvent(event.type, !0, !1), el.dispatchEvent(evt)
					}
					G._kills = {}, G.add = G.addEventListener = function (target, name, handler) {
						getGestureBase(target).register(name, handler), setCss(target, "cursor", "pointer"), setCss(target, "pointer-events", "auto")
					}, G.remove = G.removeEventListener = function (target, name, handler) {
						var _gestureBase = getGestureBase(target);
						_gestureBase && (_gestureBase.unregister(name, handler), _gestureBase.eventList.length <= 0 && setCss(target, "cursor", "auto"))
					}, G.disable = function (target) {
						var gestureBase = getGestureBase(target);
						_disableList.push(gestureBase), _eventPass ? (gestureBase.register(GestureEvent.CLICK, handlePassThroughClick), setCss(target, "cursor", "auto")) : setCss(target, "pointer-events", "none")
					}, G.disableChildren = function (target) {
						setActiveChildren(target, !1)
					}, G.enable = function (target) {
						for (var gestureBase = getGestureBase(target), i = 0; i < _disableList.length; i++)
							if (gestureBase == _disableList[i]) {
								_eventPass ? gestureBase.unregister(GestureEvent.CLICK, handlePassThroughClick) : (setCss(target, "pointer-events", "auto"), setCss(target, "cursor", "pointer"));
								break
							}
					}, G.enableChildren = function (target) {
						setActiveChildren(target, !0)
					}
				},
				UIEvent$1 = {
					ENABLED: "uiComponentEnabled",
					RESIZE: "uiResize",
					SLIDER_UPDATE: "uiSliderUpdate",
					get componentEnabled() {
						return _componentEnabled || (_componentEnabled = new CustomEvent("uiComponentEnabled")), _componentEnabled
					},
					get sliderUpdate() {
						return _sliderUpdate || (_sliderUpdate = new CustomEvent("uiSliderUpdate")), _sliderUpdate
					}
				},
				Matrix2D = function () {
					var M = this;
					M.identity = new Float32Array([1, 0, 0, 0, 1, 0]), M.data = new Float32Array(M.identity)
				};
			Matrix2D.prototype = {
				clear: function () {
					this.data = new Float32Array(this.identity)
				},
				rotate: function (radians) {
					var M = this,
						_m = new Float32Array(M.identity),
						c = Math.cos(radians).toFixed(15),
						s = Math.sin(radians).toFixed(15);
					return _m[0] = c, _m[1] = s, _m[3] = -s, _m[4] = c, M.multiply(_m, !1), M
				},
				scale: function (x, y) {
					var M = this,
						_m = new Float32Array(M.identity);
					return _m[0] = x, _m[4] = y, M.multiply(_m, !1), M
				},
				skew: function (ax, ay) {
					var M = this,
						_m = new Float32Array(M.identity);
					return _m[1] = Math.tan(ax), _m[3] = Math.tan(ay), M.multiply(_m), M
				},
				translate: function (x, y) {
					var M = this,
						_m = new Float32Array(M.identity);
					return _m[2] = x || 0, _m[5] = y || 0, M.multiply(_m, !0), M
				},
				multiply: function (m, invert) {
					for (var M = this, _copy = new Float32Array(M.data), a = invert ? m : _copy, b = invert ? _copy : m, i = 0; i < 6; i++) {
						var k = 3 * Math.floor(i / 3),
							q = i % 3;
						M.data[i] = a[k] * b[q] + a[k + 1] * b[q + 3]
					}
					M.data[2] += a[2], M.data[5] += a[5]
				},
				setFromCss: function (matrixString) {
					var cssMatrix = matrixString.match(/\(([^\)]+)\)/)[1].replace(/\s/g, "").split(",").map(Number);
					this.data = [cssMatrix[0], cssMatrix[1], cssMatrix[4], cssMatrix[2], cssMatrix[3], cssMatrix[5]]
				},
				getCss: function () {
					var M = this;
					return "matrix(" + M.data[0] + "," + M.data[1] + "," + M.data[3] + "," + M.data[4] + "," + M.data[2] + "," + M.data[5] + ")"
				}
			};
			var CssManager$1 = new(function () {
					function CssManager() {
						_classCallCheck(this, CssManager);
						var C = this;
						C.debug_level1 = !1, C.debug_level2 = !1, C.filter, C.debug_element, C.debug_css_list
					}
					return CssManager.prototype.init = function () {
						console.log("CssManager.init()"), this.generateBrowserKeyDictionary()
					}, CssManager.prototype.setDebugLevel = function (level) {
						var C = this;
						switch (parseInt(level)) {
							case 1:
								C.debug_level1 = !0, C.debug_level2 = !1;
								break;
							case 2:
								C.debug_level1 = !0, C.debug_level2 = !0;
								break;
							default:
								C.debug_level1 = !1, C.debug_level2 = !1
						}
					}, CssManager.prototype.setDebugFilter = function (filter) {
						console.log("CssManager.setDebugFilter(),", filter), this.filter = filter, this.debug_level1 = !0
					}, CssManager.prototype.ifDebug = function (debugLevel) {
						var C = this;
						return C.filter ? !(!C.passDebugFilter() || !C[debugLevel]) || void 0 : C[debugLevel]
					}, CssManager.prototype.passDebugFilter = function () {
						var C = this;
						if (C.debug_element && C.debug_element.id.indexOf(C.filter) > -1) return !0;
						if (C.debug_css_list)
							for (var i in C.debug_css_list) {
								if (i.indexOf(C.filter) > -1) return !0;
								if (String(C.debug_css_list[i]).indexOf(C.filter) > -1) return !0
							}
						return !1
					}, CssManager.prototype.generateBrowserKeyDictionary = function () {
						var C = this;
						console.log("CssManager.generateBrowserKeyDictionary()"), C.deviceKeyDict = {};
						var styles = document.createElement("div").style;
						for (var key in styles) {
							var prefix = C.getPrefix(key),
								standardKey = C.standardizeKey(key);
							switch (Device$1.browser) {
								case "safari":
									"webkit" == prefix ? C.deviceKeyDict[standardKey] = C.prependPrefix("webkit", standardKey) : C.prependPrefix("webkit", standardKey) in styles || (C.deviceKeyDict[standardKey] = standardKey);
									break;
								case "firefox":
									var mozKey = C.prependPrefix("Moz", standardKey),
										webkitKey = C.prependPrefix("Webkit", standardKey);
									standardKey in styles ? C.deviceKeyDict[standardKey] = standardKey : "moz" == prefix ? C.camelateKey("webkit-" + standardKey) in styles && (C.deviceKeyDict[standardKey] = mozKey) : "webkit" == prefix && (mozKey in styles || (C.deviceKeyDict[standardKey] = webkitKey));
									break;
								case "chrome":
								case "ie":
								default:
									standardKey in styles ? C.deviceKeyDict[standardKey] = standardKey : prefix && (C.deviceKeyDict[standardKey] = C.prependPrefix(prefix, standardKey))
							}
						}
						console.log(" KEY DICTIONARY:", C.deviceKeyDict)
					}, CssManager.prototype.apply = function (element, cssList) {
						var C = this;
						C.debug_element = element, C.debug_css_list = cssList, C.ifDebug("debug_level1") && console.log("  CssManager.apply()", element.id);
						var transformList = {};
						for (var key in cssList) key.match(/^transform\(/) ? transformList[key] = cssList[key] : (C.ifDebug("debug_level1") && console.log("   " + key + ": " + cssList[key] + ";"), element.style[C.getDeviceKey(key)] = cssList[key]);
						C.applyTransforms(element, transformList), C.ifDebug("debug_level1") && console.log("\n\n"), C.debug_element = null, C.debug_css_list = null
					}, CssManager.prototype.conformCssObject = function (cssObject, debugElement) {
						var C = this;
						C.debug_element = debugElement, C.ifDebug("debug_level1") && console.log("CssManager.conformCssObject()", cssObject);
						var cssList = {};
						if (cssObject)
							for (var key in cssObject) {
								C.ifDebug("debug_level2") && console.log("  PARSE( key: " + key + ", value: " + cssObject[key] + " )");
								var declarations = C.conformKeyValue(key, cssObject[key]);
								for (var i in declarations) C.ifDebug("debug_level2") && console.log("    CONFORMED DECLARATION:", declarations[i]), cssList[declarations[i][0]] = declarations[i][1]
							}
						return C.debug_element = null, cssList
					}, CssManager.prototype.conformCssString = function (cssString, debugElement) {
						var C = this;
						C.debug_element = debugElement, C.ifDebug("debug_level1") && console.log(" CssManager.conformCssString()");
						var cssList = {};
						if (cssString) {
							var declarations = cssString.split(/\s*;\s*/);
							for (var key in declarations)
								if (declarations[key]) {
									var declarationParts = declarations[key].split(/:(.+)?/);
									C.ifDebug("debug_level2") && console.log("  PARSE( key: " + declarationParts[0] + ", value: " + declarationParts[1] + " )");
									var conformedDeclarations = C.conformKeyValue(declarationParts[0], declarationParts[1]);
									for (var i in conformedDeclarations) C.ifDebug("debug_level2") && console.log("    CONFORMED DECLARATION:", conformedDeclarations[i]), cssList[conformedDeclarations[i][0]] = conformedDeclarations[i][1]
								}
						}
						return C.debug_element = null, cssList
					}, CssManager.prototype.conformCssKeyValue = function (key, value) {
						this.ifDebug("debug_level1") && console.log(" CssManager.conformCssKeyValue()");
						var cssObject = {};
						return cssObject[key] = value, this.conformCssObject(cssObject)
					}, CssManager.prototype.applyTransforms = function (element, value) {
						var C = this;
						C.ifDebug("debug_level1") && console.log("    - CssManager.applyTransforms(), ", value);
						var matrix2D = new Matrix2D,
							matrixMatch = element.style[C.getDeviceKey("transform")].match(/matrix[^\)]+\)/);
						if (matrixMatch && (matrix2D.setFromCss(matrixMatch[0]), C.ifDebug("debug_level2") && console.log("       existing matrix:", matrix2D.data)), "transforms" in element) var transforms = element.transforms;
						else transforms = {
							tx: 0,
							ty: 0,
							rz: 0,
							sx: 1,
							sy: 1
						};
						var changed = {};
						for (var key in value) {
							changed[key.match(/\(\s([^\s]+)/)[1]] = value[key]
						}
						if (void 0 != changed.tx && (matrix2D.data[2] = 0), void 0 != changed.ty && (matrix2D.data[5] = 0), void 0 != changed.rz) {
							var reverse = -transforms.rz;
							matrix2D.rotate(reverse * (Math.PI / 180)), matrix2D.rotate(changed.rz * (Math.PI / 180)), transforms.rz = changed.rz
						}
						if (void 0 != changed.sx) {
							reverse = 1 / transforms.sx;
							matrix2D.scale(reverse, 1), matrix2D.scale(changed.sx, 1), transforms.sx = changed.sx
						}
						if (void 0 != changed.sy) {
							reverse = 1 / transforms.sy;
							matrix2D.scale(1, reverse), matrix2D.scale(1, changed.sy), transforms.sy = changed.sy
						}
						void 0 != changed.tx && (matrix2D.translate(changed.tx, 0), transforms.tx = changed.tx), void 0 != changed.ty && (matrix2D.translate(0, changed.ty), transforms.ty = changed.ty), element.transforms = transforms, C.ifDebug("debug_level2") && console.log("       updated matrix:", matrix2D.data), element.style[C.getDeviceKey("transform")] = matrix2D.getCss()
					}, CssManager.prototype.conformKeyValue = function (key, value) {
						key = String(key).trim(), value = String(value).trim();
						var keyAsStandard = this.standardizeKey(key);
						return this.conformValue(keyAsStandard, value)
					}, CssManager.prototype.hasPrefix = function (key) {
						return key.search(this.matchPrefixRegex()) > -1
					}, CssManager.prototype.getPrefix = function (key) {
						var match = key.match(this.matchPrefixRegex());
						return match ? match[1].replace(/-/g, "").toLowerCase() : null
					}, CssManager.prototype.stripPrefix = function (key) {
						var keyless = key.replace(this.matchPrefixRegex(), "");
						return keyless.charAt(0).toLowerCase() + keyless.slice(1)
					}, CssManager.prototype.getDeviceKey = function (key) {
						return key in this.deviceKeyDict ? this.deviceKeyDict[key] : key
					}, CssManager.prototype.prependPrefix = function (prefix, key) {
						return prefix + key.replace(/^(.)/, function (str) {
							return str.charAt(0).toUpperCase()
						})
					}, CssManager.prototype.standardizeKey = function (key) {
						var C = this;
						return key = (key = C.stripPrefix(key)) in C.keyFormatExceptions() ? C.keyFormatExceptions()[key] : C.camelateKey(key), C.ifDebug("debug_level2") && console.log('    - result: "' + key + '"'), key
					}, CssManager.prototype.camelateKey = function (key) {
						return key = key.replace(/-(.)/g, function (str) {
							return str.charAt(1).toUpperCase()
						})
					}, CssManager.prototype.keyFormatExceptions = function () {
						return {
							x: "transform( tx )",
							translateX: "transform( tx )",
							y: "transform( ty )",
							translateY: "transform( ty )",
							rotate: "transform( rz )",
							rotation: "transform( rz )",
							scaleX: "transform( sx )",
							scaleY: "transform( sy )",
							scale: "transform( sx ),transform( sy )"
						}
					}, CssManager.prototype.conformValue = function (key, value) {
						var conformedValue, C = this,
							conformedValues = [],
							hasMultipleValues = value.match(/\s/),
							numericValue = value.match(C.matchNumberRegex());
						if (!hasMultipleValues && numericValue) {
							C.ifDebug("debug_level2") && console.log("   conform value as number"), conformedValue = Number(numericValue[0]);
							var unitMatch = value.match(/[^0-9\.]+$/);
							if (unitMatch) conformedValue += unitMatch[0];
							else switch (key) {
								case "top":
								case "right":
								case "bottom":
								case "left":
								case "width":
								case "height":
								case "fontSize":
								case "lineHeight":
								case "padding":
								case "margin":
								case "marginRight":
								case "marginLeft":
								case "marginTop":
								case "marginBottom":
								case "borderRadius":
								case "borderWidth":
								case "letterSpacing":
									conformedValue += "px"
							}
						} else if ("backgroundImage" == key) C.ifDebug("debug_level2") && console.log("   conform value as background image"), conformedValue = 'url( "' + (value = value.replace(/^url\(\s*['"]*/, "").replace(/['"]*\s*\)$/, "")) + '" )';
						else if ("transform" == key) {
							C.ifDebug("debug_level2") && console.log('   convert "transform" functions to individual transforms');
							for (var functionRegex = /([a-z0-9]+)\(([^\)]+)\)/gi; params = functionRegex.exec(value);) {
								var args = params[2].replace(/\s/g, "").split(",").map(function (value, index, array) {
									return Number(value.match(C.matchNumberRegex())[0])
								});
								switch (params[1]) {
									case "translate":
										conformedValues.push(["transform( tx )", args[0]]), conformedValues.push(["transform( ty )", args[1]]);
										break;
									case "translateX":
										conformedValues.push(["transform( tx )", args[0]]);
										break;
									case "translateY":
										conformedValues.push(["transform( ty )", args[0]]);
										break;
									case "rotate":
										conformedValues.push(["transform( rz )", args[0]]);
										break;
									case "scale":
										conformedValues.push(["transform( sx )", args[0]]), conformedValues.push(["transform( sy )", args[1]]);
										break;
									case "scaleX":
										conformedValues.push(["transform( sx )", args[0]]);
										break;
									case "scaleY":
										conformedValues.push(["transform( sy )", args[0]])
								}
							}
						} else C.ifDebug("debug_level2") && console.log("   conform value as string"), conformedValue = value;
						if (void 0 != conformedValue) {
							C.ifDebug("debug_level2") && console.log('    - result: "' + conformedValue + '"');
							for (var splitKeys = key.split(/\,/), i = 0; i < splitKeys.length; i++) conformedValues.push([splitKeys[i], conformedValue])
						}
						return conformedValues
					}, CssManager.prototype.matchNumberRegex = function () {
						return /^[+-]?[0-9]*\.?[0-9]+/
					}, CssManager.prototype.matchPrefixRegex = function () {
						return /^-*(moz-*|webkit-*|ms-*|o-)/i
					}, CssManager
				}()),
				ImageManager$1 = new(function () {
					function ImageManager() {
						_classCallCheck(this, ImageManager);
						var I = this;
						I._pendingImages = [], I._pendingCanvasImages = [], I._pendingLoaders = [], I._nextLoadCallback = [], I._imageManagerLoader, I._dict = {}, I._isLoading = !1, I._loaderCount = 0, I._onComplete = function () {}, I._onFail
					}
					return ImageManager.prototype.addToLoad = function (file, arg) {
						var I = this,
							id = getFileName(file);
						I.available(id, !0) || (arg && 1 == arg.forCanvas ? I._pendingCanvasImages.push(file) : I._pendingImages.push(file));
						return id
					}, ImageManager.prototype.addLoader = function (loader) {
						this._pendingLoaders.push(loader)
					}, ImageManager.prototype.get = function (imageId) {
						if (this._dict[imageId]) return this._dict[imageId];
						throw new Error("ImageManager : No image named '" + imageId + "' has been loaded")
					}, ImageManager.prototype.available = function (imageId, internal) {
						var exists = void 0 != this._dict[imageId];
						return exists ? internal && console.log("ImageManager.available() --\x3e", !0, ': Duplicate Image Id "' + imageId + '". One or more images loading in have the same name. Each Image needs a unique file name.') : internal || console.log("ImageManager.available() --\x3e", !1, ": No image named '" + imageId + "' has been loaded"), exists
					}, ImageManager.prototype.load = function (callback, onFail) {
						var I = this;
						if (I._onFail = onFail || global.failAd, I._isLoading) I._nextLoadCallback.push(callback);
						else {
							I._imageManagerLoader = new Loader$1({
								name: "imageManagerLoader",
								onComplete: function (event) {
									I._isLoading = !1, I._addToDictionary(event.getAllContentRaw())
								},
								onFail: function (event) {
									I._isLoading = !1, I._onFail.call()
								},
								scope: I
							}), I._onComplete = [].concat(callback), I._nextLoadCallback = [];
							var currentPendingImages = I._pendingImages.slice();
							I._pendingImages = [], I._imageManagerLoader.add(new Loader$1(currentPendingImages, {
								name: "dynamicImages-" + I._loaderCount++,
								fileType: "jpg"
							}));
							var currentPendingCanvasImages = I._pendingCanvasImages.slice();
							I._pendingCanvasImages = [], I._imageManagerLoader.add(new Loader$1(currentPendingCanvasImages, {
								name: "dynamicCanvasImages-" + I._loaderCount++,
								fileType: "jpg",
								crossOrigin: "anonymous"
							}));
							var currentPendingLoaders = I._pendingLoaders.slice();
							I._pendingLoaders = [];
							for (var i = 0; i < currentPendingLoaders.length; i++) I._imageManagerLoader.add(currentPendingLoaders[i]);
							I._isLoading = !0, I._imageManagerLoader.load()
						}
					}, ImageManager.prototype.addFbaImages = function (target) {
						target && this._addToDictionary(target.getAllContentRaw())
					}, ImageManager.prototype._addToDictionary = function (content) {
						for (var I = this, i = 0; i < content.length; i++)
							if (content[i] instanceof Image || content[i] instanceof SVGElement) {
								var img = content[i];
								I.available(content[i].id, !0) || (I._dict[img.id] = img)
							}
						console.log("ImageManager:", I._dict);
						for (i = 0; i < I._onComplete.length; i++) I._onComplete[i].call();
						I._nextLoadCallback.length > 0 && I.load(I._nextLoadCallback)
					}, ImageManager
				}()),
				PrepareCore$1 = new(function () {
					function PrepareCore() {
						_classCallCheck(this, PrepareCore)
					}
					return PrepareCore.prototype.init = function (fbaLoader) {
						if (console.log("PrepareCore.init()"), void 0 === global.async) throw new Error("Index migration required. To avoid migration, rollback core/js/control/PrepareCore.js");
						var P = this,
							promises = [new Promise(function (resolve, reject) {
								fbaLoader && P.prepareFbaPayload(fbaLoader), P.queueRequestedImages(), Device$1.init(), CssManager$1.init(), resolve()
							}).catch(function (reason) {
								console.log("promise rejected:", reason)
							})];
						return promises.push(P.loadFonts()), Promise.all(promises)
					}, PrepareCore.prototype.finish = function () {
						return console.log("PrepareCore.finish()"), new Promise(function (resolve, reject) {
							console.log("\t PrepareCore load Image Queue"), ImageManager$1.load(resolve, global.failAd)
						})
					}, PrepareCore.prototype.prepareFbaPayload = function (fbaLoader) {
						console.log("PrepareCore.prepareFbaPayload()"), ImageManager$1.addFbaImages(fbaLoader)
					}, PrepareCore.prototype.queueRequestedImages = function () {
						ImageManager$1.addLoader(new Loader(assets.images, {
							name: "indexImages",
							prepend: adParams.imagesPath
						})), ImageManager$1.addLoader(new Loader(assets.edgeImages, {
							name: "edgeImages",
							prepend: adParams.edgePath
						}))
					}, PrepareCore.prototype.loadFonts = function () {
						return console.log("PrepareCore.loadFonts()"), new Promise(function (resolve, reject) {
							var fontLoader = new Loader({
								name: "fontLoader",
								onComplete: resolve,
								onFail: global.failAd
							});
							fontLoader.add(new Loader(assets.fonts, {
								name: "fontSubLoader",
								prepend: adParams.fontsPath,
								fileType: "ttf"
							})), fontLoader.add(new Loader(assets.edgeFonts, {
								name: "fontEdgeSubLoader",
								prepend: adParams.fontsPath,
								fileType: "ttf"
							})), fontLoader.load()
						})
					}, PrepareCore
				}()),
				INLINE_FIT = "inlineFit",
				UIDiv = function UIDiv(arg, type) {
					_classCallCheck(this, UIDiv), injectStylesheet("RED_uiElement", ".ui-elem", "position:absolute;"), type = type || "div";
					var U = document.createElement(type);
					(addClass(U, "ui-elem"), (arg = arg || {}).id && (U.id = arg.id), setCss(U, arg.css), arg.target) && get(arg.target).appendChild(U);
					return Object.defineProperty(U, "parent", {
						get: function () {
							return U.parentNode
						}
					}), U.toString = function () {
						return "[object UIDiv]"
					}, U
				},
				UIBorder = function UIBorder(arg) {
					var _size, _color;
					_classCallCheck(this, UIBorder);
					var U = new UIDiv(arg);
					return addClass(U, "ui-border"), Object.defineProperties(U, {
						size: {
							get: function () {
								return _size
							},
							set: function (value) {
								void 0 != value && _size != value && setCss(U, {
									borderWidth: _size = value
								})
							}
						},
						color: {
							get: function () {
								return _color
							},
							set: function (value) {
								value && _color != value && setCss(U, {
									borderColor: _color = value
								})
							}
						}
					}), U.toString = function () {
						return "[object UIBorder]"
					}, Gesture.disable(U), U.color = arg.color, U.size = arg.size, U
				},
				UIComponent = function (_UIDiv) {
					function UIComponent(arg, type) {
						_classCallCheck(this, UIComponent);
						var _enabled = !0,
							_showing = !0,
							_typeDef = type || "div";
						arg = arg || {}, type = "svg" == _typeDef ? "div" : type;
						var _this9 = _possibleConstructorReturn(this, _UIDiv.call(this, arg, type)),
							U = _this9;
						return U._align = arg.align, Object.defineProperties(U, {
							x: {
								get: function () {
									return getCss(U, "x")
								},
								set: function (value) {
									setCss(U, {
										x: value
									})
								}
							},
							y: {
								get: function () {
									return getCss(U, "y")
								},
								set: function (value) {
									setCss(U, {
										y: value
									})
								}
							},
							enabled: {
								get: function () {
									return _enabled
								},
								set: function (state) {
									_enabled = state, U.dispatchEvent(UIEvent$1.componentEnabled)
								}
							},
							showing: {
								get: function () {
									return _showing
								},
								set: function () {
									console.log(":: WARNING ::\n\n\tUIComponent.showing cannot be set.\n\n")
								}
							}
						}), "canvas" != _typeDef && "svg" != _typeDef && Object.defineProperties(U, {
							width: {
								get: function () {
									return U.offsetWidth
								},
								set: function (value) {
									setCss(U, {
										width: value
									});
									var evt = new CustomEvent(UIEvent$1.RESIZE);
									evt.direction = "width", U.dispatchEvent(evt)
								}
							},
							height: {
								get: function () {
									return U.offsetHeight
								},
								set: function (value) {
									setCss(U, {
										height: value
									});
									var evt = new CustomEvent(UIEvent$1.RESIZE);
									evt.direction = "height", U.dispatchEvent(evt)
								}
							}
						}), U.hide = function () {
							U.style.display = "none", _showing = !1
						}, U.show = function () {
							try {
								U.style.removeProperty("display")
							} catch (e) {
								U.style.display = null
							}
							_showing = !0
						}, U.setCss = function (args) {
							setCss(U, args)
						}, U.addChild = function (elem) {
							var child = get(elem);
							U.appendChild(child), elem._align && set$1(elem, elem._align)
						}, U.inspect = function () {
							for (var o = {}, props = Object.getOwnPropertyNames(U), i = 0; i < props.length; i++) {
								var val = U[props[i]];
								o[props[i]] = val
							}
							console.log("\n\t", U.toString(), "\t", U.id, "\n\t", o)
						}, U.toString = function () {
							return "[object UIComponent]"
						}, U._initAlign = function (parentTriggered) {
							var fire = parentTriggered ? 1 == parentTriggered : void 0 != arg.target;
							arg.align && fire && set$1(U, arg.align)
						}, U.enabled = !0, U._initAlign(), _possibleConstructorReturn(_this9, U)
					}
					return _inherits(UIComponent, _UIDiv), UIComponent
				}(UIDiv),
				UIImage = function UIImage(arg) {
					_classCallCheck(this, UIImage), injectStylesheet("RED_uiImage", ".ui-image", "background-repeat:no-repeat; background-size:contain;");
					var _init = !0,
						_source = null,
						_retina = !1,
						_ratio = "contain",
						_aspectRatio = !!arg.aspectRatio;
					arg.css;
					if (!arg.source) throw new Error("UIImage : No image source set on '" + arg.id + "'");
					arg.css = arg.css || {};
					var U = new UIComponent(arg);

					function resize$$1(direction) {
						var width, height, denominator = _retina ? 2 : 1,
							ratio = _source.width / _source.height,
							sourceWidth = arg.css.width || _source.width,
							sourceHeight = arg.css.height || _source.height,
							updateWidth = void 0 == arg.css.width,
							updateHeight = void 0 == arg.css.height;
						(_init || (updateWidth = "height" == direction, updateHeight = "width" == direction, sourceWidth = U.width, sourceHeight = U.height), updateWidth) && (width = _aspectRatio && !updateHeight ? sourceHeight * ratio : sourceWidth / denominator, U.style.width = Math.round(width) + "px");
						updateHeight && (height = _aspectRatio && !updateWidth ? sourceWidth / ratio : sourceHeight / denominator, U.style.height = Math.round(height) + "px")
					}
					return addClass(U, "ui-image"), Object.defineProperties(U, {
						source: {
							get: function () {
								return _source
							},
							set: function (value) {
								_source = ImageManager$1.get(value), U.style.backgroundImage = "url(" + _source.src + ")"
							}
						},
						retina: {
							get: function () {
								return _retina
							},
							set: function (value) {
								_retina = value, resize$$1()
							}
						},
						ratio: {
							get: function () {
								return _ratio
							},
							set: function (value) {
								_ratio = value, U.style.backgroundSize = value
							}
						},
						aspectRatio: {
							get: function () {
								return _aspectRatio
							},
							set: function (value) {
								_aspectRatio = value, resize$$1()
							}
						}
					}), U.toString = function () {
						return "[object UIImage]"
					}, U.addEventListener(UIEvent$1.RESIZE, function (event) {
						console.log("handleResize()", event, event.direction), resize$$1(event.direction)
					}), U.source = arg.source, U.retina = !!arg.retina, arg.ratio && (U.ratio = arg.ratio), U._initAlign(), _init = !1, U
				},
				UIButton = function UIButton(arg) {
					_classCallCheck(this, UIButton), (arg = arg || {}).css = arg.css || {}, injectStylesheet("RED_uiButton", ".ui-button", "position:absolute", ".ui-button-state", "position: absolute; width:inherit; height:inherit;");
					var _bg, _state = 0,
						_icon = [],
						_containChild = !!arg.containChild,
						U = new UIComponent(arg);
					addClass(U, "ui-button"), arg.bg && createChild(arg.bg, !1), clampContainer(), arg.icon = arg.icon || [];
					for (var i = 0; i < arg.icon.length; i++) createChild(arg.icon[i], !0);

					function createChild(name, isIcon) {
						var elem, id = arg.id + (isIcon ? "-state-" + _icon.length : "-bg");
						"string" == typeof name ? elem = new UIImage({
							target: U,
							id: id,
							source: name,
							css: _containChild ? {
								width: "inherit",
								height: "inherit"
							} : {}
						}) : ((elem = name).id = id, U.addChild(elem), /(UITextField)/gi.exec(elem.toString()) && elem.resetToDefault(), elem._initAlign(!0)), isIcon ? (_icon.push(elem), addClass(elem, "ui-button-state")) : _bg = elem, Gesture.disable(elem)
					}

					function clampContainer() {
						! function (source, type, buffer, move) {
							var elem = get(source);
							move = !1 !== move;
							var children = elem.childNodes,
								childCoordinates = [],
								direction = {};
							/(x)/gi.exec(type) && (direction.x = {}), /(y)/gi.exec(type) && (direction.y = {});
							for (var i = 0; i < children.length; i++) {
								var child = children[i];
								childCoordinates[i] = {};
								for (var xy in direction) {
									var xyValue = getCss(child, xy),
										add = xyValue + child[_rect[xy][0]],
										xyDirection = direction[xy];
									0 == i && (xyDirection.min = xyValue, xyDirection.max = add), xyValue < xyDirection.min && (xyDirection.min = xyValue), xyDirection.max < add && (xyDirection.max = add), childCoordinates[i][xy] = xyValue
								}
							}
							var _buffer = {
								top: 0,
								bottom: 0,
								left: 0,
								right: 0
							};
							if (buffer)
								for (var prop in _buffer) _buffer[prop] = isNaN(buffer) ? buffer[prop] || 0 : buffer;
							var css = {};
							for (var xy in direction) {
								var d = direction[xy];
								move && (css[xy] = d.min + getCss(elem, xy) - _buffer[_rect[xy][2]]), css[_rect[xy][1]] = d.max - d.min + _buffer[_rect[xy][2]] + _buffer[_rect[xy][3]]
							}
							for (setCss(elem, css), i = 0; i < children.length; i++) {
								child = children[i], css = {};
								for (var xy in direction) css[xy] = childCoordinates[i][xy] - direction[xy].min + _buffer[_rect[xy][2]];
								setCss(child, css)
							}
						}(U, "clamp" + (arg.css.width ? "" : "X") + (arg.css.height ? "" : "Y"), {}, !1)
					}

					function handleClick(event) {
						stop(event), U.togglable && (U.state = Number(!_state)), U._onClick.call(U, event), U.onClick.call(U, event)
					}

					function handleOver(event) {
						U._onOver.call(U, event), U.onOver.call(U, event)
					}

					function handleOut(event) {
						U._onOut.call(U, event), U.onOut.call(U, event)
					}
					return clampContainer(), U.togglable = arg.icon.length > 1, Object.defineProperties(U, {
						bg: {
							get: function () {
								return _bg
							}
						},
						icon: {
							get: function () {
								return _icon
							}
						},
						state: {
							get: function () {
								return _state
							},
							set: function (value) {
								_state = value, value >= _icon.length && (_state = 0);
								for (var i = 0; i < _icon.length; i++) _icon[i].style.visibility = i == _state ? "visible" : "hidden"
							}
						}
					}), U.onClick = arg.onClick || function (event) {}, U.onOver = arg.onOver || function (event) {}, U.onOut = arg.onOut || function (event) {}, U.toString = function () {
						return "[object UIButton]"
					}, U._onClick = function (event) {}, U._onOver = function (event) {}, U._onOut = function (event) {}, U.addEventListener(UIEvent.ENABLED, function (event) {
						var listener = U.enabled ? "addEventListener" : "removeEventListener";
						Gesture[listener](U, CLICK, handleClick), Gesture[listener](U, OVER, handleOver), Gesture[listener](U, OUT, handleOut)
					}), U.enabled = !0, U.state = arg.state || 0, U._initAlign(), U
				},
				UITextField = function UITextField(arg) {
					var _alignText;
					_classCallCheck(this, UITextField), injectStylesheet("RED_uiTextfield", ".ui-textfield", "position:absolute; white-space:nowrap;", ".smooth-text", "-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;", ".ui-textfield .content", "position:relative; display:table-cell; cursor:default; pointer-events:none; line-height:100%; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;");
					var _fontFamily, _leading, _spacing, _verticalAlign, _smoothing, _fontSize = 0,
						_format = "",
						_bufferText = {
							top: 0,
							bottom: 0,
							left: 0,
							right: 0
						},
						_text = "",
						_init = !0,
						_defaults = {},
						U = new UIComponent(arg = arg || {});
					addClass(U, "ui-textfield");
					var _content = document.createElement("span");

					function update() {
						if (!_init) switch (_format) {
							case "paragraphClamp":
							case "inlineClamp":
								resizeToContent();
								break;
							case "inlineFitClamp":
								_format = "inlineFit", autoSizeContent(), _format = "inlineClamp", resizeToContent(), _format = "inlineFitClamp";
								break;
							case "paragraphFitClamp":
								_format = "paragraphFit", autoSizeContent(), _format = "paragraphClamp", resizeToContent(), _format = "paragraphFitClamp";
							default:
								autoSizeContent()
						}
					}

					function autoSizeContent() {
						if (setCss(_content, {
								verticalAlign: "auto",
								height: "auto",
								width: "auto"
							}), "paragraphFit" == _format) {
							for (var tempFontSize = _fontSize; U.scrollHeight > U.offsetHeight && !(tempFontSize <= 0);) tempFontSize--, U.style.fontSize = tempFontSize + "px";
							for (; U.scrollWidth > U.offsetWidth && !(tempFontSize <= 0);) tempFontSize--, U.style.fontSize = tempFontSize + "px";
							_fontSize = tempFontSize, U.style.fontSize = _fontSize + "px"
						} else if ("inlineFit" == _format) {
							var parentWidth = U.offsetWidth,
								parentHeight = U.offsetHeight;
							U.style.fontSize = "243px";
							var largeWidth = _content.offsetWidth,
								largeHeight = _content.offsetHeight;
							U.style.fontSize = "182px";
							var smallWidth = _content.offsetWidth,
								smallHeight = _content.offsetHeight,
								fontSizeWidth = rel(243, 182, largeWidth, smallWidth, parentWidth),
								fontSizeHeight = rel(243, 182, largeHeight, smallHeight, parentHeight);
							_fontSize = ~~Math.min(_fontSize, Math.min(fontSizeWidth, fontSizeHeight)), U.style.fontSize = _fontSize + "px"
						}
						_verticalAlign && setCss(_content, {
							verticalAlign: _verticalAlign,
							height: U.offsetHeight - _bufferText.top - _bufferText.bottom,
							width: U.offsetWidth - _bufferText.left - _bufferText.right
						})
					}

					function resizeToContent() {
						setCss(_content, {
							height: "auto",
							width: "auto"
						}), U.width = _content.offsetWidth, U.height = _content.offsetHeight
					}
					return addClass(_content, "content"), U.appendChild(_content), Object.defineProperties(U, {
							alignText: {
								get: function () {
									return _alignText
								},
								set: function (value) {
									if (value && _alignText != value) {
										var ta = ((_alignText = value).match(/(left|right)/gi) || ["center"])[0].toLowerCase();
										setCss(U, {
											lineHeight: U.height,
											textAlign: ta
										}), _verticalAlign = (_alignText.match(/(bottom|top)/gi) || ["middle"])[0].toLowerCase(), setCss(_content, {
											verticalAlign: _verticalAlign
										})
									}
								}
							},
							fontSize: {
								get: function () {
									return _fontSize
								},
								set: function (value) {
									!isNaN(value) && value > 0 && (_fontSize = value, U.style.fontSize = ~~value + "px", update())
								}
							},
							fontFamily: {
								get: function () {
									return _fontFamily
								},
								set: function (value) {
									_fontFamily = value, U.style.fontFamily = value, update()
								}
							},
							format: {
								get: function () {
									return _format
								},
								set: function (value) {
									_format != value && (setCss(U, {
										whiteSpace: null != /inline/g.exec(_format = value) ? "nowrap" : "normal"
									}), update())
								}
							},
							leading: {
								get: function () {
									return _leading
								},
								set: function (value) {
									value && _leading != value && (setCss(_content, {
										lineHeight: 100 * (_leading = value) + "%"
									}), update())
								}
							},
							spacing: {
								get: function () {
									return getCss(U, "letter-spacing") || _spacing
								},
								set: function (value) {
									value && _spacing != value && (_spacing = value, setCss(U, {
										letterSpacing: value
									}), update())
								}
							},
							bufferText: {
								get: function () {
									return _bufferText
								},
								set: function (value) {
									if (value && _bufferText != value) {
										for (var style = "", order = ["top", "right", "bottom", "left"], i = 0; i < 4; i++) {
											var prop = order[i],
												propValue = isNaN(value) ? value[prop] || 0 : value;
											_bufferText[prop] = propValue, style += propValue + "px "
										}
										setCss(_content, {
											padding: style
										}), update()
									}
								}
							},
							text: {
								get: function () {
									return _text
								},
								set: function (value) {
									void 0 != value && "" != value && (_text = value, U.setDefault("text", value), _content.innerHTML = value, update())
								}
							},
							smoothing: {
								get: function () {
									return _smoothing
								},
								set: function (value) {
									Styles$1[(_smoothing = value) ? "addClass" : "removeClass"](_content, "smooth-text")
								}
							}
						}), U.resetToDefault = function () {
							if (_init = !0, arguments.length > 0)
								for (var i = 0; i < arguments.length; i++) U[arguments[i]] = _defaults[arguments[i]];
							else
								for (var param in _defaults) void 0 != U[param] && (U[param] = _defaults[param]);
							_init = !1, update()
						}, U.setDefault = function (key, value) {
							_defaults[key] = value
						}, U.toString = function () {
							return "[object UITextfield]"
						}, U.enabled = !0,
						function () {
							for (var a in arg)
								if ("css" == a)
									for (var b in arg.css) switch (b) {
										case "x":
										case "y":
										case "width":
										case "height":
											_defaults[b] = arg.css[b]
									} else if ("bufferText" == a) {
										_defaults[a] = {};
										for (var prop in _bufferText) _defaults[a][prop] = arg[a][prop] || 0
									} else _defaults[a] = arg[a];
							delete _defaults.target, delete _defaults.id
						}(), U.format = arg.format, U.fontSize = arg.fontSize, U.fontFamily = arg.fontFamily || "Arial", U.alignText = arg.alignText, U.bufferText = arg.bufferText, U.leading = arg.leading, U.spacing = arg.spacing, U.smoothing = 0 != arg.smoothing, _init = !1, U.text = arg.text, U._initAlign(), U
				};
			window.Control = new function () {
				this.prepareCore = function (fbaContent) {
					trace("Control.prepareCore() -- in build"), PrepareCore$1.init(fbaContent).then(function () {
						global.adData = new function () {
							this.elements = {}, this.elements.redAdContainer = get("redAdContainer"), this.fonts = {
								primary: "template_font"
							}, this.colors = {}, this.svg = {}
						}
					}).then(PrepareCore$1.finish).then(Control.prepareBuild)
				}, this.prepareBuild = function () {
					trace("Control.prepareBuild()"), Control.preMarkup(), View.main = new function () {
						var T = get("main");
						return setCss(T, {
							position: "absolute",
							width: adParams.adWidth,
							height: adParams.adHeight,
							opacity: 0,
							left: "0px",
							top: "0px",
							overflow: "hidden",
							userSelect: "none"
						}), T.logoContainer = new UIImage({
							id: "logo-container",
							target: T,
							source: "template_image",
							css: {
								x: 9,
								y: 60
							}
						}), T.txtGreeting = new UITextField({
							id: "txt-greeting",
							target: T,
							css: {
								width: 200,
								height: 30,
								color: "#ff1414"
							},
							align: CENTER,
							fontSize: 40,
							fontFamily: "template_font",
							format: INLINE_FIT,
							alignText: CENTER,
							bufferText: {
								left: 5,
								right: 5
							},
							leading: 1,
							text: "MOBILE ADS"
						}), textDropShadow({
							target: T.txtGreeting,
							angle: 45,
							distance: 2,
							size: 2,
							color: "#000000",
							alpha: .5
						}), T.buttonCta = new UIButton({
							id: "btn-cta",
							target: T,
							css: {
								width: 150,
								height: 40,
								backgroundColor: "grey",
								borderRadius: 10
							},
							align: {
								x: CENTER,
								y: {
									type: BOTTOM,
									offset: -30
								}
							},
							icon: [new UITextField({
								css: {
									width: 150,
									height: 40,
									color: "#ffffff"
								},
								fontSize: 12,
								fontFamily: "template_font",
								format: INLINE_FIT,
								alignText: CENTER,
								text: "CLICK FOR MORE"
							})]
						}), setCss(T, {
							"background-color": "#cccccc"
						}), T
					}, View.mainBorder = new function () {
						new UIBorder({
							target: View.main,
							size: 1,
							color: "#000000"
						})
					}, Control.postMarkup(), Animation.startAd()
				}, this.preMarkup = function () {
					trace("Control.preMarkup()"), get("main").appendChild(get("build-template").content.cloneNode(!0))
				}, this.postMarkup = function () {
					trace("Control.postMarkup()"), Gesture.add(View.main, CLICK, Control.handleClick)
				}, this.animationComplete = function () {
					trace("Control.animationComplete()")
				}, this.handleClick = function (event) {
					Network.exit(clickTag)
				}
			}, window.Animation = new function () {
				this.startAd = function () {
					trace("Animation.startAd()"), global.removePreloader(), setCss(View.main, {
						opacity: 1
					}), TweenLite.from(View.main.logoContainer, 1, {
						y: -40
					}), TweenLite.from(View.main.txtGreeting, 1, {
						y: 330
					})
				}
			}
		}).call(exports, __webpack_require__(2))
	}
});