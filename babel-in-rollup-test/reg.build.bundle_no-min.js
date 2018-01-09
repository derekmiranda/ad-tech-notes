! function (modules) {
	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) return installedModules[moduleId].exports;
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: !1,
			exports: {}
		};
		return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
	}
	var installedModules = {};
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
		var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
			return typeof obj
		} : function (obj) {
			return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
		};
		g = function () {
			return this
		}();
		try {
			g = g || Function("return this")() || (0, eval)("this")
		} catch (e) {
			"object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window)
		}
		module.exports = g
	},
	23: function (module, exports, __webpack_require__) {
		(function (global) {
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
				element = get(element);
				var cssValue;
				if ("x" == key || "y" == key) {
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

			function textDropShadow(obj) {
				setCss(obj.target, {
					textShadow: function (angle, distance, size, spread, color, alpha, inner) {
						var val = "",
							rad = function (degree) {
								return Math.PI / 180 * degree
							}(-1 * angle + 180);
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

			function set$1(source, arg) {
				var obj = function (source, arg) {
					var elem = source.canvas || get(source),
						obj = {},
						snap = !1 !== arg.snap,
						sourceRect = isDomElement(source) ? 0 : 1;
					"string" == typeof arg && (arg = calculate(arg));
					for (var xy in arg)
						if ("x" == xy || "y" == xy) {
							var params = arg[xy];
							if (!params) continue;
							"string" == typeof params && (params = {
								type: params
							});
							var against, againstDimension, againstX = 0,
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
				if (isDomElement(source)) {
					setCss(source.canvas || get(source), obj)
				} else
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

			function _classCallCheck$5(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
			}

			function _classCallCheck$8(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
			}

			function _classCallCheck$9(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
			}

			function _classCallCheck$10(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
			}

			function _classCallCheck$2(instance, Constructor) {
				if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
			}

			function TzDate(args) {
				function formatTimezoneISO(timezone, offset) {
					var num = timezone.value + offset,
						hours = num > 0 ? Math.floor(num) : Math.ceil(num),
						minutes = num % 1 * 60;
					minutes = num > 0 ? Math.floor(minutes) : Math.ceil(minutes);
					return (num < 0 ? "-" : "+") + TextUtils$1.pad(Math.abs(hours), 2) + ":" + TextUtils$1.pad(Math.abs(minutes), 2)
				}
				var _outputTimezone, Timezone$$1 = new Timezone,
					_dateString = (args = args || {}).datetime;
				if (Array.isArray(_dateString) && (_dateString = args.datetime[0], _outputTimezone = args.datetime[1]), "string" == typeof _dateString) {
					var currentTzString = (_dateString = _dateString.replace(/(\T|\s)/g, "T")).match(/(\+|\-)([0-9]{2})\:([0-9]{2})/g);
					if (currentTzString)
						if ("+00:00" == (currentTzString = currentTzString[0])) _outputTimezone = Timezone$$1.UTC;
						else {
							var value = function (str, offset) {
								var split = str.split(":");
								return +split[0] + +split[1] / 60 - offset
							}(currentTzString, Timezone$$1.getDLS(new Date(_dateString)));
							_outputTimezone = Timezone$$1.get(value)
						}
					else if (_outputTimezone) {
						_outputTimezone = Timezone$$1.get(_outputTimezone);
						var offset = Timezone$$1.getDLS(new Date(_dateString));
						_dateString += formatTimezoneISO(_outputTimezone, offset)
					}
				}
				args.outputTimezone ? _outputTimezone = Timezone$$1.get(args.outputTimezone) : adParams.defaultTimezone && (_outputTimezone = Timezone$$1.get(adParams.defaultTimezone));
				var T = new Date(_dateString);
				return Object.defineProperties(T, {
					outputTimezone: {
						get: function () {
							return _outputTimezone || Timezone$$1.UTC
						},
						set: function (value) {
							_outputTimezone = Timezone$$1.get(value)
						}
					}
				}), T.clone = function (newTimezone) {
					return newTimezone = newTimezone || T.outputTimezone, new TzDate({
						datetime: T,
						outputTimezone: newTimezone
					})
				}, T.getHoursIn = function (inTimezone, inMilitary) {
					var time = T.getIn(inTimezone).getHours();
					return 1 != inMilitary && time > 12 && (time %= 12), time
				}, T.format = function (format, args) {
					return DateFormatter.format(T, format, args)
				}, T.getIn = function (inTimezone) {
					var utcString = T.toISOString().split(".")[0],
						offset = Timezone$$1.getDLS(T),
						localTimezone = formatTimezoneISO(Timezone$$1._trueLOCAL, offset),
						tz = Timezone$$1.get(inTimezone || T.outputTimezone),
						utcDateAdjusted = new Date(utcString + localTimezone),
						dls = Timezone$$1.getDLS(utcDateAdjusted);
					return tz.label == Timezone$$1.UTC.label && (dls = 0), DateFormatter.adjust(utcDateAdjusted, {
						hour: tz.value + dls
					})
				}, T.print = function (inTimezone) {
					var fullDateTime = T.toFullDateTime(inTimezone);
					return console.log(fullDateTime), fullDateTime
				}, T.toFullDateTime = function (inTimezone) {
					inTimezone = inTimezone || T.outputTimezone;
					return T.getIn(inTimezone).toString().split("GMT")[0] + inTimezone.label
				}, T.toSimpleDate = function (inTimezone) {
					var tzDate = T.getIn(inTimezone);
					return tzDate.getMonth() + 1 + "/" + tzDate.getDate()
				}, T.toDate = function (inTimezone) {
					var tzDate = T.getIn(inTimezone);
					return T.toSimpleDate(inTimezone) + "/" + tzDate.getFullYear()
				}, T.toDateTime = function (inTimezone) {
					return T.toDate(inTimezone) + " " + T.toTime(inTimezone)
				}, T.toSimpleDateTime = function () {
					return T.toSimpleDate() + " " + T.toTime()
				}, T.toTime = function (inTimezone) {
					return T.toSimpleTime(inTimezone) + " " + T.toMeridiem(inTimezone)
				}, T.toSimpleTime = function (inTimezone, inMilitary) {
					var tzDate = T.getIn(inTimezone),
						hours = T.getHoursIn(inTimezone, inMilitary);
					return 0 == hours && (hours = 12), inMilitary && (hours = TextUtils$1.pad(hours, 2)), hours + ":" + TextUtils$1.pad(tzDate.getMinutes(), 2)
				}, T.toMeridiem = function (inTimezone, includeTimezone) {
					var tz = inTimezone || T.outputTimezone;
					return (T.getIn(tz).getHours() >= 12 ? "pm" : "am") + (1 == includeTimezone ? "/" + tz.abbr : "")
				}, T.toShortestTime = function (inTimezone, inMilitary) {
					return T.toSimpleTime(inTimezone, inMilitary).replace(/:00$/g, "")
				}, T.toDateTimeISO = function (inTimezone) {
					var dateSplit = T.toDate(inTimezone).split("/");
					return dateSplit[2] + "-" + TextUtils$1.pad(dateSplit[0], 2) + "-" + TextUtils$1.pad(dateSplit[1], 2) + "T" + T.toSimpleTime(inTimezone, !0) + ":00"
				}, T._isTzDate = !0, T
			}

			function _possibleConstructorReturn$8(self, call) {
				if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return !call || "object" != typeof call && "function" != typeof call ? self : call
			}! function (a) {
				var b = '<template id="build-template">\n\n</template>';
				if (a.head) {
					var c = a.head,
						d = a.createElement("div");
					for (d.innerHTML = b; d.children.length > 0;) c.appendChild(d.children[0])
				} else a.write(b)
			}(document);
			var _componentEnabled, _sliderUpdate, _createClass = function () {
					function defineProperties(target, props) {
						for (var i = 0; i < props.length; i++) {
							var descriptor = props[i];
							descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
						}
					}
					return function (Constructor, protoProps, staticProps) {
						return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
					}
				}(),
				Device$1 = new(function () {
					function Device() {
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, Device), this.pixelRatio = window.devicePixelRatio || "unknown"
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
				}()),
				Styles$1 = Object.freeze({
					setCss: setCss,
					getCss: getCss,
					injectStylesheet: injectStylesheet,
					addClass: addClass,
					removeClass: function (target, className) {
						get(target).classList.remove(className)
					}
				}),
				_rect = {
					x: ["offsetWidth", "width", "left", "right"],
					y: ["offsetHeight", "height", "top", "bottom"]
				},
				_rect$1 = [{
					x: "offsetWidth",
					y: "offsetHeight",
					parent: "parentNode"
				}, {
					x: "width",
					y: "height",
					parent: "stage"
				}],
				BOTTOM = "alignBottom",
				CENTER = "alignCenter",
				Styles = {},
				Markup$$1 = {},
				TextUtils$1 = new function () {
					var self = this;
					self.autosizeTF = function (target, fontAdjustmentFactor) {
						var elem = void 0;
						elem = target.id ? Markup$$1.get(target) : target.textfield;
						var elemParent = Markup$$1.getParent(elem);
						fontAdjustmentFactor = fontAdjustmentFactor || 1;
						var currentFontSize = void 0,
							lineHeightAdustment = void 0,
							maxWidth = Styles.getWidth(elemParent);
						if (Styles.getWidth(elem) > maxWidth)
							for (; Styles.getWidth(elem) > maxWidth;) currentFontSize = void 0 === currentFontSize ? Styles.getCss(elem, "font-size") : currentFontSize - 1, Styles.setCss(elem, "font-size", currentFontSize), lineHeightAdustment = currentFontSize * fontAdjustmentFactor, Styles.setCss(elem, "line-height", lineHeightAdustment);
						var maxHeight = Styles.getHeight(elemParent);
						if (Styles.getHeight(elem) > maxHeight)
							for (; Styles.getHeight(elem) > maxHeight;) currentFontSize = void 0 === currentFontSize ? Styles.getCss(elem, "font-size") : currentFontSize - 1, Styles.setCss(elem, "font-size", currentFontSize), lineHeightAdustment = currentFontSize * fontAdjustmentFactor, Styles.setCss(elem, "line-height", lineHeightAdustment);
						if (!(Styles.getWidth(elem) > maxWidth || Styles.getHeight(elem) > maxHeight)) return currentFontSize || Styles.getCss(elem, "font-size");
						TextUtils$1.autosizeTF(elem)
					}, self.fitContainerToText = function (target, fitWidth, fitHeight) {
						Markup$$1.get(target);
						if (fitWidth) {
							var textWidth = Styles.getWidth(target.textfield);
							Styles.setCss(target.parent, "width", textWidth), Styles.setCss(target.parent, "left", parseInt(target.textfield.containerData.margin) / 2);
							var newContainerWidth = parseInt(textWidth + parseInt(target.textfield.containerData.margin));
							Styles.setCss(target.container, "width", newContainerWidth)
						} else if (fitHeight) {
							var textHeight = Styles.getHeight(target.textfield);
							Styles.setCss(target.parent, "height", textHeight), Styles.setCss(target.container, "height", textHeight)
						}
					}, self.matchTeamNameSize = function (team1Element, team2Element) {
						var team1FontSize = TextUtils$1.autosizeTF(team1Element),
							team2FontSize = TextUtils$1.autosizeTF(team2Element),
							smallestFontSize = team1FontSize > team2FontSize ? team2FontSize : team1FontSize;
						Styles.setCss(team1Element, {
							fontSize: smallestFontSize
						}), (void 0)(CENTER, team1Element), Styles.setCss(team2Element, {
							fontSize: smallestFontSize
						}), (void 0)(CENTER, team2Element)
					}, self.addText = function (target, txt) {
						("string" == typeof target ? Markup$$1.get(target) : target).innerHTML = txt
					}, self.hasText = function (target) {
						return ("string" == typeof target ? Markup$$1.get(target) : target).innerHTML.length > 0
					}, self.numlines = function (target) {
						"string" == typeof target && Markup$$1.get(target);
						return Styles.getCss(target, "height") / Styles.getCss(target, "line-height")
					}, self.addSpaces = function (numberOfSpaces) {
						for (var spacingString = "", i = 0; i < numberOfSpaces; i++) spacingString += "&nbsp;";
						return spacingString
					}, self.getSpecialCharacter = function (requestedCharacter, isCapital) {
						requestedCharacter = global.proxyStringToLowerCase.apply(requestedCharacter);
						for (var i = 0; i < self.specialChars.length; i++) {
							if (global.proxyStringToLowerCase.apply(self.specialChars[i].label) === requestedCharacter) return isCapital ? self.specialChars[i].upperCase : self.specialChars[i].lowerCase
						}
						return !1
					}, self.specialCharacters = [{
						label: "iexcl",
						upperCase: "&#161;",
						lowerCase: "&#161;"
					}, {
						label: "trademark",
						upperCase: "&#153;",
						lowerCase: "&#153;"
					}, {
						label: "copyright",
						upperCase: "&#169;",
						lowerCase: "&#169;"
					}, {
						label: "registered",
						upperCase: "&#174;",
						lowerCase: "&#174;"
					}, {
						label: "nTilde",
						upperCase: "&#209;",
						lowerCase: "&#241;"
					}, {
						label: "aAccent",
						upperCase: "&#193;",
						lowerCase: "&#225;"
					}, {
						label: "eAccent",
						upperCase: "&#201;",
						lowerCase: "&#233;"
					}, {
						label: "iAccent",
						upperCase: "&#205;",
						lowerCase: "&#237;"
					}, {
						label: "oAccent",
						upperCase: "&#211;",
						lowerCase: "&#243;"
					}, {
						label: "uAccent",
						upperCase: "&#218;",
						lowerCase: "&#250;"
					}], self.trimStartAndEnd = function (target) {
						return target ? target.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : ""
					}, self.removeSpaces = function (str) {
						return str.split(" ").join("")
					}, self.pad = function (_target, _count) {
						var _sign = "";
						for (_target < 0 && (_sign = "-"), _target = _target.toString().replace(/\-/, "", _target); _target.length < _count;) _target = "0" + _target;
						return _sign + _target
					}
				},
				NetUtils = new function () {
					this.getQueryParameterBy = function (name) {
						return global.queryParams[name]
					}
				},
				_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
					return typeof obj
				} : function (obj) {
					return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
				},
				mix = function (superclass) {
					return new MixinBuilder(superclass)
				},
				MixinBuilder = function () {
					function MixinBuilder(superclass) {
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, MixinBuilder), this.superclass = superclass
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
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
							! function (instance, Constructor) {
								if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
							}(this, _class);
							var _this = function (self, call) {
									if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
									return !call || "object" != typeof call && "function" != typeof call ? self : call
								}(this, _superclass.call.apply(_superclass, [this].concat(args))),
								arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
								L = _this;
							return L.onComplete = arg.onComplete || function () {}, L.onFail = arg.onFail || function () {}, L.onProgress = arg.onProgress || function () {}, L.name = arg.name || "", L.scope = arg.scope || L, L.dataRaw, L.cacheBuster = arg.cacheBuster || !1, L._failCalled = !1, _this
						}
						return function (subClass, superClass) {
							if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
							subClass.prototype = Object.create(superClass && superClass.prototype, {
								constructor: {
									value: subClass,
									enumerable: !1,
									writable: !0,
									configurable: !0
								}
							}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
						}(_class, _superclass), _class.prototype._handleFail = function () {
							var L = this;
							L._failCalled || (L._failCalled = !0, L.onFail.call(L.scope, L), console.log('Loader "' + L.name + '" Fail:', L.url))
						}, _class
					}(superclass)
				},
				LoaderSource = function (superclass) {
					return function (_superclass) {
						function _class() {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
							! function (instance, Constructor) {
								if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
							}(this, _class);
							var _this = function (self, call) {
									if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
									return !call || "object" != typeof call && "function" != typeof call ? self : call
								}(this, _superclass.call.apply(_superclass, [this].concat(args))),
								arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
								L = _this;
							return L.url = global.matchProtocolTo(arguments[0] || ""), arg.platformGetUrl && (L.platformGetUrl = arg.platformGetUrl, L.url = arg.platformGetUrl(L.url)), L.fileName = void 0 === arg.id ? getFileName(L.url) : arg.id, L.fileType = arg.fileType || getFileType(L.url), _this
						}
						return function (subClass, superClass) {
							if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
							subClass.prototype = Object.create(superClass && superClass.prototype, {
								constructor: {
									value: subClass,
									enumerable: !1,
									writable: !0,
									configurable: !0
								}
							}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
						}(_class, _superclass), _class
					}(superclass)
				},
				LoaderTicker = function (superclass) {
					return function (_superclass) {
						function _class() {
							! function (instance, Constructor) {
								if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
							}(this, _class);
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
							return function (self, call) {
								if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !call || "object" != typeof call && "function" != typeof call ? self : call
							}(this, _superclass.call.apply(_superclass, [this].concat(args)))
						}
						return function (subClass, superClass) {
							if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
							subClass.prototype = Object.create(superClass && superClass.prototype, {
								constructor: {
									value: subClass,
									enumerable: !1,
									writable: !0,
									configurable: !0
								}
							}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
						}(_class, _superclass), _class.prototype._setTicker = function (args) {
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
						}, _class.prototype._removeTickerNode = function (node) {
							node.parentNode.removeChild(node)
						}, _class
					}(superclass)
				},
				ImageLoader = function (_mix$with) {
					function ImageLoader() {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
						_classCallCheck$5(this, ImageLoader);
						var _this = function (self, call) {
								if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !call || "object" != typeof call && "function" != typeof call ? self : call
							}(this, _mix$with.call.apply(_mix$with, [this].concat(args))),
							arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};
						return _this.renderOnly = !!arg.renderOnly, _this.crossOrigin = arg.crossOrigin, _this
					}
					return function (subClass, superClass) {
						if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						subClass.prototype = Object.create(superClass && superClass.prototype, {
							constructor: {
								value: subClass,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
					}(ImageLoader, _mix$with), ImageLoader.prototype.load = function () {
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
				}(mix(function Blank() {
					_classCallCheck$5(this, Blank)
				}).with(LoaderBase, LoaderSource, LoaderTicker)),
				InlineLoader = function (_mix$with) {
					function InlineLoader() {
						_classCallCheck$8(this, InlineLoader);
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
						return function (self, call) {
							if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
							return !call || "object" != typeof call && "function" != typeof call ? self : call
						}(this, _mix$with.call.apply(_mix$with, [this].concat(args)))
					}
					return function (subClass, superClass) {
						if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						subClass.prototype = Object.create(superClass && superClass.prototype, {
							constructor: {
								value: subClass,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
					}(InlineLoader, _mix$with), InlineLoader.prototype.load = function () {
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
				}(mix(function Blank() {
					_classCallCheck$8(this, Blank)
				}).with(LoaderBase, LoaderSource)),
				DataLoader = function (_mix$with) {
					function DataLoader() {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
						_classCallCheck$9(this, DataLoader);
						var _this = function (self, call) {
								if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !call || "object" != typeof call && "function" != typeof call ? self : call
							}(this, _mix$with.call.apply(_mix$with, [this].concat(args))),
							arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
							D = _this;
						return D.method = (arg.method || "get").toLowerCase(), D.query = arg.query || null, D.responseType = arg.responseType || null, _this
					}
					return function (subClass, superClass) {
						if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						subClass.prototype = Object.create(superClass && superClass.prototype, {
							constructor: {
								value: subClass,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
					}(DataLoader, _mix$with), DataLoader.prototype.load = function () {
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
				}(mix(function Blank() {
					_classCallCheck$9(this, Blank)
				}).with(LoaderBase, LoaderSource)),
				FontLoader = function (_mix$with) {
					function FontLoader() {
						_classCallCheck$10(this, FontLoader);
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
						return function (self, call) {
							if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
							return !call || "object" != typeof call && "function" != typeof call ? self : call
						}(this, _mix$with.call.apply(_mix$with, [this].concat(args)))
					}
					return function (subClass, superClass) {
						if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						subClass.prototype = Object.create(superClass && superClass.prototype, {
							constructor: {
								value: subClass,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
					}(FontLoader, _mix$with), FontLoader.prototype.load = function () {
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
				}(mix(function Blank() {
					_classCallCheck$10(this, Blank)
				}).with(LoaderBase, LoaderSource, LoaderTicker)),
				Loader$1 = function (_mix$with) {
					function Loader() {
						for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
						_classCallCheck$2(this, Loader);
						var _this = function (self, call) {
								if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !call || "object" != typeof call && "function" != typeof call ? self : call
							}(this, _mix$with.call.apply(_mix$with, [this].concat(args))),
							arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
							L = _this;
						return L._queue = {}, L._total = 0, L._active = !1, L._startedCount = 0, L.prepend = arg.prepend || "", L.platformGetUrl = arg.platformGetUrl, L.fileType = arg.fileType || null, L.content = [], L.crossOrigin = arg.crossOrigin || void 0, L.add(arguments[0]), _this
					}
					return function (subClass, superClass) {
						if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						subClass.prototype = Object.create(superClass && superClass.prototype, {
							constructor: {
								value: subClass,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
					}(Loader, _mix$with), Loader.prototype.add = function (arg) {
						var L = this;
						if ("string" == typeof arg) L._addSingleLoad(arg);
						else if (arg instanceof Array)
							for (var i = 0; i < arg.length; i++) L._addSingleLoad(arg[i]);
						else arg instanceof Loader && (arg.content && arg.content[0] && "fba" == arg.content[0].fileType ? L._addFbaSubLoads(arg.content[0]) : L._addSubLoad(arg))
					}, Loader.prototype.load = function () {
						var L = this;
						if (L._active = !0, L._total <= 0) console.log('Loader "' + L.name + '" has NO assets to be loaded.');
						else {
							var _has = !1,
								_output = "";
							for (var l in L._queue)
								if (!(L._queue[l] instanceof Loader)) {
									_has || (_has = !0, _output += 'Loader "' + L.name + '" requesting:');
									var fileName = L._queue[l].fileName,
										extension = L._queue[l].fileType,
										fileAndExtension = fileName.indexOf("." + extension) > -1 ? fileName : fileName + "." + extension;
									_output += "\n\t -> " + (L._queue[l].prepend || "") + fileAndExtension
								}
							_has && console.log(_output)
						}
						L._startSingleLoad(0)
					}, Loader.prototype.getAllContent = function () {
						function searchSubLoader(content) {
							for (var i = 0; i < content.length; i++) content[i] instanceof Loader ? searchSubLoader(content[i].content) : _found.push(content[i])
						}
						var _found = [];
						return searchSubLoader(this.content), _found.length < 1 && console.log("No Content found"), _found
					}, Loader.prototype.getAllContentRaw = function () {
						for (var _content = this.getAllContent(), i = 0; i < _content.length; i++) _content[i] = _content[i].dataRaw;
						return _content
					}, Loader.prototype.getLoader = function (id) {
						function searchSubLoader(content) {
							for (var i = 0; i < content.length; i++) content[i] instanceof Loader && (!content[i] || content[i].name !== id && content[i] !== id ? searchSubLoader(content[i].content) : _found = content[i])
						}
						var _found = null;
						return searchSubLoader(this.content), _found || console.log("No Loader found of that name"), _found
					}, Loader.prototype._addSingleLoad = function (url, fbaOverwrite) {
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
					}, Loader.prototype._addSubLoad = function (loader) {
						var L = this;
						loader.onComplete = L._handleSingleLoadComplete.bind(L), loader.onProgress = L._handleProgress.bind(L), loader.onFail = L._handleFail, loader.queueIndex = L._total, L._queue[L._total] = loader, L._total++
					}, Loader.prototype._addFbaSubLoads = function (loader) {
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
					}, Loader.prototype._startSingleLoad = function (i) {
						var L = this,
							_inst = L._queue[i];
						0 == L._total ? L._handleComplete() : i < L._total && (_inst instanceof Loader || i < L._total - 1 && L._startLoadTimeOut(++i), _inst.load())
					}, Loader.prototype._startLoadTimeOut = function (i) {
						var L = this;
						setTimeout(function () {
							L._startSingleLoad(i)
						}, 10)
					}, Loader.prototype._handleSingleLoadComplete = function (target) {
						var L = this;
						L.content[target.queueIndex] = target, delete L._queue[target.queueIndex], L._handleProgress(), void 0 == target.url && target.queueIndex < L._total - 1 && L._startLoadTimeOut(target.queueIndex + 1)
					}, Loader.prototype._handleProgress = function () {
						for (var L = this, _length = L.content.length, _count = 0, i = 0; i < _length; i++) L.content[i] && _count++;
						var _consecutive = _count,
							_subProgress = 0;
						_count < L._total && L._queue[_count] && (_subProgress = L._queue[_count].progress / L._total || 0), L.progress = _consecutive / L._total + _subProgress, L.rawProgress = _count / L._total + _subProgress, L.onProgress.call(L.scope, L), _count >= L._total && L._handleComplete()
					}, Loader.prototype._handleComplete = function () {
						var L = this;
						L.onComplete.call(L.scope, L)
					}, Loader
				}(mix(function Blank() {
					_classCallCheck$2(this, Blank)
				}).with(LoaderBase)),
				_kills = {},
				_eventLooping = !1,
				Event = function (name, mouseGlobalX, mouseGlobalY, mouseLocalX, mouseLocalY, elementX, elementY, distanceX, distanceY, velocityX, velocityY) {
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
				},
				stop = function (event) {
					event && (event.stopImmediatePropagation(), _kills[event.type] = !0)
				},
				stopped = function (type) {
					return void 0 != _kills[type]
				},
				OVER = "mouseover",
				OUT = "mouseout",
				CLICK = "onSelect",
				GestureBase = function () {
					function GestureBase(elem) {
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, GestureBase);
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
								if (!stopped(name)) {
									var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY);
									G.debug && console.log(" -> dispatch", name), G.elem.dispatchEvent(newEvent)
								}
							}("onPress")
					}, GestureBase.prototype._handleUp = function (event, bypass) {
						function localCreateEvent(name) {
							if (!stopped(name)) {
								var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY, 0, 0, G._vX, G._vY);
								G.debug && console.log(" -> dispatch", name), G.elem.dispatchEvent(newEvent)
							}
						}
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
						G._isDragging ? (G._isDragEnabled && G._dragEndOrSwipe("onDragStop"), console.log("  -> No CLICK Fired, was dragging")) : mouseX > offsetLeft && mouseX < offsetRight && mouseY > offsetTop && mouseY < offsetBottom && localCreateEvent("onSelect"), G._isDragging && G._dragEndOrSwipe("onSwipe"), G._reset(), event.preventDefault(), _eventLooping = !1
					}, GestureBase.prototype._handleTouchStart = function (event) {
						var G = this;
						G.debug && console.log("GestureBase._handleTouchStart()"), G._cursor = "touch", G._start = "start", G._end = "end", G._handleDown(event)
					}, GestureBase.prototype._handleDrag = function (event) {
						function localCreateEvent(name) {
							if (!stopped(name)) {
								var newEvent = new Event(name, mouseX, mouseY, localOffsetX, localOffsetY, elemPositionX, elemPositionY, G._p1X - G._sX, G._p1Y - G._sY, G._vX, G._vY);
								G.debug && console.log(" -> dispatch", name), G.elem.dispatchEvent(newEvent)
							}
						}
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

					function getNextLayerElement(target, x, y, list) {
						target.style.visibility = "hidden", list.push(target);
						for (var elem = document.elementFromPoint(x, y), i = 0; i < _disableList.length; i++)
							if (_disableList[i].elem == elem) return getNextLayerElement(elem, x, y, list);
						return elem
					}

					function handlePassThroughClick(event) {
						var el = function (event) {
								for (var hiddenList = [], el = getNextLayerElement(event.target, event.clientX, event.clientY, hiddenList), i = 0; i < hiddenList.length; i++) hiddenList[i].style.visibility = "visible";
								return hiddenList = [], event.stopImmediatePropagation(), el
							}(event),
							evt = document.createEvent("HTMLEvents");
						evt.initEvent(event.type, !0, !1), el.dispatchEvent(evt)
					}
					var G = this,
						_targets = [],
						_disableList = [],
						_eventPass = void 0 != document.createEventObject;
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
				DateFormatter = new function () {
					var D = this;
					D.MS_PER_SECOND = 1e3, D.MS_PER_MINUTE = 6e4, D.MS_PER_HOUR = 36e5, D.MS_PER_DAY = 864e5, D.MS_PER_WEEK = 6048e5, D.adjust = function (date, times) {
						var dateAdj;
						dateAdj = date._isTzDate ? date.clone() : new Date(date);
						for (var key in times) {
							var cons = "MS_PER_" + key.toUpperCase(),
								val = D[cons],
								add = times[key] * val;
							dateAdj.setTime(dateAdj.getTime() + add)
						}
						return dateAdj
					}, D.getNumericSuffixFor = function (value, includeDate) {
						var lastNumber = (value = value.toString()).slice(value.length - 1),
							labels = D.getLabels(),
							output = labels.TH;
						switch (lastNumber) {
							case "1":
								"11" != value && (output = labels.ST);
								break;
							case "2":
								"12" != value && (output = labels.ND);
								break;
							case "3":
								"13" != value && (output = labels.RD)
						}
						return (includeDate ? value : "") + output
					}, D.format = function (tzDate, format, args) {
						var tz = (args = args || {}).inTimezone || tzDate.outputTimezone,
							language = args.language,
							dateIn = tzDate.getIn(tz);
						console.log(".format( '" + format + "' )");
						var labels = D.getLabels(language),
							month = dateIn.getMonth(),
							hours = dateIn.getHours(),
							minutes = dateIn.getMinutes();
						return format.replace(/\$\{(.*?)\}/g, function (match, token) {
							var padding, output = token,
								trim = 0,
								upper = !1,
								keep = !0;
							switch (token.replace(/(.+)(\^)/, function (match3, token3) {
								token = token3, upper = !0, console.log("\t\t\t", match3, token3)
							}), 2 == token.length && token.replace(/(?![Yo])([a-zA-Z]).*?\1/, function (match2, token2) {
								token = token2.substr(0, 1), console.log("\t\t", match2, token2, token), padding = 2
							}), token) {
								case "YY":
									trim = -2;
								case "YYYY":
									output = ("" + dateIn.getFullYear()).slice(trim);
									break;
								case "M":
									output = month + 1;
									break;
								case "MMM":
									output = labels.MONTHS_ABRV[month];
									break;
								case "MMMM":
									output = labels.MONTHS_FULL[month];
									break;
								case "D":
									output = dateIn.getDate();
									break;
								case "Do":
									output = D.getNumericSuffixFor(dateIn.getDate(), !0);
									break;
								case "DDD":
									output = labels.WEEKDAYS_ABRV[dateIn.getDay()];
									break;
								case "DDDD":
									output = labels.WEEKDAYS_FULL[dateIn.getDay()];
									break;
								case "t":
									keep = minutes > 0;
								case "T":
									output = hours, keep && (output += ":" + TextUtils$1.pad(minutes, 2));
									break;
								case "H":
									output = hours;
									break;
								case "h":
									0 == (output = hours % 12) && (output = 12);
									break;
								case "m":
									output = minutes;
									break;
								case "s":
									output = dateIn.getSeconds();
									break;
								case "a":
									output = hours >= 12 ? "pm" : "am";
									break;
								case "z":
									output = tz.abbr
							}
							return padding && (output = TextUtils$1.pad(output, padding)), upper && (output = output.toUpperCase()), console.log("\t", match, token, output), output
						})
					}, D.language = "english";
					var _languageLabels = {
						english: {
							MONTHS_FULL: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
							MONTHS_ABRV: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
							MONTHS_EXCP: ["", "", "", "", "", "", "", "", "sept", "", "", ""],
							WEEKDAYS_FULL: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
							WEEKDAYS_ABRV: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
							WEEKDAYS_EXCP1: ["", "", "tues", "wednes", "thur", "", ""],
							WEEKDAYS_EXCP2: ["", "", "", "", "thurs", "", ""],
							ST: "st",
							ND: "nd",
							RD: "rd",
							TH: "th",
							OF: "of",
							TOMORROW: "Tomorrow",
							TODAY: "Today",
							TONIGHT: "Tonight",
							NOW: "Live Now",
							PAST: "Past"
						},
						spanish: {
							MONTHS_FULL: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
							MONTHS_ABRV: ["enero", "feb", "marzo", "abr", "mayo", "jun", "jul", "agosto", "sept", "oct", "nov", "dic"],
							MONTHS_EXCP: ["", "", "", "", "", "", "", "", "sep", "", "", ""],
							WEEKDAYS_FULL: ["domingo", "lunes", "martes", "mi&#201;rcoles", "jueves", "viernes", "s&#193;bado"],
							WEEKDAYS_ABRV: ["dom", "lun", "mar", "mi&#201;r", "jue", "vier", "s&#193;b"],
							WEEKDAYS_EXCP1: ["", "", "tues", "wednes", "thur", "", ""],
							WEEKDAYS_EXCP2: ["", "", "", "", "thurs", "", ""],
							ST: "ro",
							ND: "ndo",
							RD: "rd",
							TH: "th",
							OF: "de",
							TOMORROW: "ma&#209;ana",
							TODAY: "hoy",
							TONIGHT: "esta noche",
							NOW: "en vivo",
							PAST: "past"
						}
					};
					D.monthsFull = "MONTHS_FULL", D.monthsAbrv = "MONTHS_ABRV", D.weekdaysFull = "WEEKDAYS_FULL", D.weekdaysAbrv = "WEEKDAYS_ABRV", D.getLabels = function (language) {
						return _languageLabels[language || D.language]
					}
				},
				T = void 0,
				Timezone = function Timezone() {
					if (T) return T;
					var _local, _pool = ["LOCAL", "UTC", "EST", "CST", "MST", "PST", "AKST", "AZ", "HST", "MEX", "AEST", "AEST2"];
					(T = this)._trueLOCAL, T._tzDiff = [0, 0, 0], Object.defineProperties(T, {
						LOCAL: {
							get: function () {
								if (void 0 == _local) {
									var now = new Date,
										offset = T.getDLS(now),
										val = -now.getTimezoneOffset() / 60 - offset;
									_local = {
										label: "Local",
										abbr: "local",
										value: val
									};
									var actualTz = T.get(_local.value);
									if (isNaN(actualTz)) _local.label = actualTz.label, _local.abbr = actualTz.abbr;
									else {
										var tzStr = now.toTimeString().split("(")[1];
										tzStr = (tzStr = tzStr.substr(0, tzStr.length - 1)).replace(/[a-z\.\s]/g, ""), _local.label = _local.abbr = tzStr, console.log("\t\t\t", _local)
									}
									T._trueLOCAL = _local
								}
								return _local
							},
							set: function (val) {
								var now = new Date,
									tzOff = now.getTimezoneOffset(),
									hr = Math.floor(tzOff / 60),
									min = tzOff % 60,
									adjHr = -(Math.floor(val.value) + hr),
									adjMin = -(val.value % 1 * 60 + min),
									offset = Timezone.getDLS(now);
								0 == val.value ? offset = 0 : val.value > 0 && (adjHr = 24 + adjHr), T._tzDiff[0] = adjHr - offset, T._tzDiff[1] = adjMin, _local = val, console.log("\tTimezone.LOCAL is now:", val)
							}
						},
						UTC: {
							get: function () {
								return {
									label: "UTC",
									abbr: "utc",
									value: 0
								}
							}
						},
						EST: {
							get: function () {
								return {
									label: "US/Eastern",
									abbr: "et",
									value: -5
								}
							}
						},
						CST: {
							get: function () {
								return {
									label: "US/Central",
									abbr: "ct",
									value: -6
								}
							}
						},
						MST: {
							get: function () {
								return {
									label: "US/Mountain",
									abbr: "mt",
									value: -7
								}
							}
						},
						PST: {
							get: function () {
								return {
									label: "US/Pacific",
									abbr: "pt",
									value: -8
								}
							}
						},
						AKST: {
							get: function () {
								return {
									label: "US/Alaska",
									abbr: "akst",
									value: -9
								}
							}
						},
						AZ: {
							get: function () {
								return {
									label: "US/Arizona",
									abbr: "az",
									value: -7
								}
							}
						},
						HST: {
							get: function () {
								return {
									label: "US/Hawaii",
									abbr: "hst",
									value: -10
								}
							}
						},
						MEX: {
							get: function () {
								return {
									label: "America/Mexico_City",
									abbr: "mx",
									value: -6
								}
							}
						},
						AEST: {
							get: function () {
								return {
									label: "Australia/Brisbane",
									abbr: "aest",
									value: 10
								}
							}
						},
						AEST2: {
							get: function () {
								return {
									label: "Australia/Sydney",
									abbr: "aest",
									value: 10
								}
							}
						}
					}), T.get = function (timezone) {
						if (void 0 == timezone) return T.LOCAL;
						if ("string" == typeof timezone) {
							for (var i = 0; i < _pool.length; i++)
								if (T[_pool[i]].label == timezone) return T[_pool[i]];
							return null
						}
						if ("number" == typeof timezone && isFinite(timezone)) {
							for (i = 0; i < _pool.length; i++)
								if (T[_pool[i]].value === timezone && "Local" != T[_pool[i]].label) return T[_pool[i]];
							return {
								label: "Local",
								abbr: "Local",
								value: timezone
							}
						}
						return timezone
					}, T.getDLS = function (date) {
						var winter = new Date("2011", "01", "01"),
							summer = new Date("2011", "07", "01"),
							winterOffset = winter.getTimezoneOffset(),
							summerOffset = summer.getTimezoneOffset(),
							dateOffset = date.getTimezoneOffset();
						return dateOffset == summerOffset && dateOffset != winterOffset ? 1 : 0
					}
				},
				D = void 0;
			new(function () {
				function Velvet() {
					! function (instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
					}(this, Velvet);
					var V = this;
					V._baseUrlLive = "https://json.ff0000-cdn.net/", V._baseUrlPreview = "https://preview.ff0000-cdn.net/preview/", V._baseUrlNow, V._baseSlugs, V._settings, V._debug = !1, V._resolved, V.adDataRaw = {}
				}
				return Velvet.prototype.init = function (settings) {
					console.log("Velvet.init()");
					var V = this;
					V.isPreviewLocation() ? (console.log("\tPreview requested"), V._baseUrlNow = V._baseUrlPreview) : (console.log("\tLive requested"), V._baseUrlNow = V._baseUrlLive), V._settings = settings, V._baseSlugs = V._settings.client + "/" + V._settings.locale + "/", console.log("\tbase url:", V._baseUrlNow), console.log("\tbase slugs:", V._baseSlugs);
					var query = getQueryParams();
					return console.log("\tquery:", query), query.addata && (console.log("\t\tAd Data set via query"), V._settings.adData = query.addata), new Promise(function (resolve, reject) {
						V._resolved = resolve, console.log("\tVelvet.init() Promise, V:", V), V._settings.adData ? V._loadAdData() : V._loadSegment()
					})
				}, Velvet.prototype.get = function () {
					function walk(elem) {
						switch (Object.prototype.toString.call(elem)) {
							case "[object Object]":
								walkObject(elem);
								break;
							case "[object Array]":
								! function (arr) {
									if (_pathed || isNaN(targetKey))
										for (var i = 0; i < arr.length; i++) walkObject(arr[i]);
									else result.push(arr[targetKey])
								}(elem)
						}
					}

					function walkObject(obj) {
						V._debug && console.log("walkObject() >", obj);
						for (var param in obj) ! function (obj, param) {
							V._debug && console.log("\t\t\t readProperty()", obj, param, "|", anchor, "|", targetKey);
							if (param != targetKey || _pathed) {
								if (param == anchor) {
									var narrowDown = function (splits, obj) {
										var i, s, result = obj || {};
										for (i = 0; result && (s = splits[i]); i++) result = s in result ? result[s] : void 0;
										return result
									}(splits, obj[param]);
									return V._debug && console.log("param:", param, "\n\tnarrowDown:", narrowDown, "\n\tobj[param]:", obj[param], param), void(narrowDown && result.push(properKey(narrowDown)))
								}
							} else result.push(properKey(obj[param]));
							recursive && walk(obj[param])
						}(obj, param)
					}

					function properKey(obj) {
						return obj.hasOwnProperty("value") ? obj.value : obj
					}
					var _useRawObject = "string" == typeof arguments[0],
						key = arguments[_useRawObject ? 0 : 1],
						source = _useRawObject ? V.adDataRaw : arguments[0],
						recursive = !!arguments[_useRawObject ? 1 : 2];
					V._debug && console.log(Array(100).join("-") + "\nget(", key, ")\nwithin:", source, "\nrecursive:", recursive);
					var result = [],
						strippedKey = key.replace(/\.value(\.|)/g, ".").replace(/\.$/, "");
					V._debug && console.log("\tstrippedKey:", strippedKey);
					for (var anchor, splits = strippedKey.split("."), targetKey = splits.pop(), pathInExpanded = "", i = 0; i < splits.length; i++) i > 0 && (pathInExpanded += "."), pathInExpanded += splits[i], isNaN(splits[i]) && (pathInExpanded += ".value");
					V._debug && console.log("\tkey:", key, "\n\tsplits:", splits, "\n\tpathInExpanded:", pathInExpanded);
					var _pathed = splits.length > 0;
					return _pathed && (splits = pathInExpanded.split("."), anchor = splits.shift(), splits.push(targetKey), V._debug && console.log("\tanchor:", anchor, "\n\tsplits again:", splits)), walk(source), 1 == result.length ? result = result[0] : 0 == result.length && (result = void 0), V._debug && console.log(result), result
				}, Velvet.prototype.isPreviewLocation = function () {
					console.log("\n\n Velvet.isPreviewLocation() > queryParams? \n\n");
					var href = window.location.href;
					return void 0 != href && null != href && ("production" !== queryParams.velvet && !!(href.match(/^file/) || href.match(/manta\.joyent\.com/) || href.match(/ff0000\.com/) || href.match(/adprodtest/) || href.match(/client\-projects\.com/) || href.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)))
				}, Velvet.prototype._loadSegment = function () {
					var V = this;
					new DataLoader(V._baseUrlNow + V._baseSlugs + V._settings.segment, {
						name: "segmentLoader",
						fileType: "json",
						onComplete: V._handleSegmentLoadComplete,
						onFail: global.failAd,
						scope: V
					}).load()
				}, Velvet.prototype._loadAdData = function () {
					var V = this;
					new DataLoader(V._baseUrlNow + V._baseSlugs + V._settings.adData, {
						name: "velvetAdDataLoader",
						fileType: "json",
						onComplete: V._handleAdDataLoadComplete,
						onFail: global.failAd,
						scope: V
					}).load()
				}, Velvet.prototype._handleSegmentLoadComplete = function (event) {
					var V = this,
						segmentJson = JSON.parse(event.dataRaw);
					console.log("Velvet segment Json:\n", segmentJson), adParams.defaultTimezone = segmentJson.tz, adParams.defaultTimezone && console.log("\tdefaultTimezone:", adParams.defaultTimezone);
					var timeblocks = segmentJson.timeblocks,
						now = (new function () {
							if (D) return D;
							D = this;
							var _currentDate, Timezone$$1 = new Timezone;
							D.init = function (args) {
								console.log("DateManager.init()");
								var externalDate = NetUtils.getQueryParameterBy("date"),
									dateMode = "SYSTEM-DATE";
								if (externalDate ? (_currentDate = externalDate, dateMode = "EXTERNAL-DATE") : !args.dateOverride || "staging" != adParams.environmentId && "debug" != adParams.environmentId || (_currentDate = args.dateOverride(), dateMode = "INTERNAL-DATE"), _currentDate) {
									var now = new TzDate({
										datetime: _currentDate
									});
									console.log("\t_currentDate set |", now.outputTimezone, "|", now, "|", now.toFullDateTime(), "|", now.outputTimezone);
									var tz = now.outputTimezone,
										externalTzLabel = NetUtils.getQueryParameterBy("tz");
									externalTzLabel && (tz.label = tz.abbr = externalTzLabel), Timezone$$1.LOCAL = tz
								}
								var externalDefaultTimezone = NetUtils.getQueryParameterBy("ltz");
								externalDefaultTimezone && (adParams.defaultTimezone = externalDefaultTimezone), console.log("-- CURRENT DATE " + Array(104).join("-")), console.log(""), console.log("    DATE-MODE: " + dateMode), console.log(""), console.log("     Time for this unit is now assumed to be: "), console.log("      ", D.getNow().toFullDateTime()), console.log(""), externalDefaultTimezone && (console.log("     External default timezone is: "), console.log("      ", externalDefaultTimezone), console.log("")), console.log(Array(120).join("-")), args.language && (DateFormatter.language = args.language)
							}, D.getNow = function () {
								var date = _currentDate;
								return void 0 == date && (date = (new Date).toISOString().split(".")[0] + "+00:00"), new TzDate({
									datetime: date,
									outputTimezone: Timezone$$1.LOCAL
								})
							}, D.isPast = function (date, context) {
								return void 0 == context && (context = D.getNow()), context.getTime() >= date.getTime()
							}, D.getTimeDifference = function (startTime, endTime) {
								var diff = endTime.getTime() / 1e3 - startTime.getTime() / 1e3;
								diff < 0 && (diff = 0);
								for (var obj = {
										day: diff / 86400,
										hour: diff / 3600 % 24,
										minute: diff / 60 % 60,
										second: diff % 60,
										output: ""
									}, label = ["day", "hour", "minute", "second"], i = 0; i < 4; i++) obj.output += TextUtils$1.pad(Math.floor(obj[label[i]]), 2), i < 3 && (obj.output += ":");
								return obj
							}
						}).getNow();
					console.log("\tnow:", new Date(now));
					for (var i = 0; i < timeblocks.length; i++) {
						var startDate = timeblocks[i].time;
						if (console.log("\t\t>", new Date(startDate)), now < startDate) break
					}
					var latestIndex = i - 1;
					if (latestIndex < 0) global.failAd();
					else {
						console.log("\tselected timeblock:", timeblocks[latestIndex]);
						var rotation = timeblocks[latestIndex].ad_rotation;
						V._settings.adData = function (obj) {
							var keys = [],
								vals = [0];
							for (var param in obj) keys.push(param), vals.push(obj[param] + (vals[vals.length - 1] || 0));
							for (var rand = 100 * Math.random().toFixed(2), k = 0; k < vals.length - 1; k++)
								if (M.inRange(rand, vals[k], vals[k + 1])) return keys[k]
						}(rotation), console.log("\tselected ad slug:", V._settings.adData), V._loadAdData()
					}
				}, Velvet.prototype._handleAdDataLoadComplete = function (event) {
					var V = this;
					console.log("Velvet._handleAdDataLoadComplete()"), V.adDataRaw = JSON.parse(event.dataRaw), console.log("adDataRaw:\n", V.adDataRaw), V._resolved()
				}, Velvet
			}());
			var Matrix2D = function () {
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
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, CssManager);
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
						return key = C.stripPrefix(key), key = key in C.keyFormatExceptions() ? C.keyFormatExceptions()[key] : C.camelateKey(key), C.ifDebug("debug_level2") && console.log('    - result: "' + key + '"'), key
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
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, ImageManager);
						var I = this;
						I._pendingImages = [], I._pendingCanvasImages = [], I._pendingLoaders = [], I._nextLoadCallback = [], I._imageManagerLoader, I._dict = {}, I._isLoading = !1, I._loaderCount = 0, I._onComplete = function () {}, I._onFail
					}
					return ImageManager.prototype.addToLoad = function (file, arg) {
						var I = this,
							id = getFileName(file);
						if (!I.available(id, !0)) {
							arg && 1 == arg.forCanvas ? I._pendingCanvasImages.push(file) : I._pendingImages.push(file)
						}
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
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, PrepareCore)
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
					! function (instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
					}(this, UIDiv), injectStylesheet("RED_uiElement", ".ui-elem", "position:absolute;"), type = type || "div";
					var U = document.createElement(type);
					if (addClass(U, "ui-elem"), (arg = arg || {}).id && (U.id = arg.id), setCss(U, arg.css), arg.target) {
						get(arg.target).appendChild(U)
					}
					return Object.defineProperty(U, "parent", {
						get: function () {
							return U.parentNode
						}
					}), U.toString = function () {
						return "[object UIDiv]"
					}, U
				},
				UIBorder = function UIBorder(arg) {
					! function (instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
					}(this, UIBorder);
					var _size, _color, U = new UIDiv(arg);
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
						var _ret;
						! function (instance, Constructor) {
							if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
						}(this, UIComponent);
						var _enabled = !0,
							_showing = !0,
							_typeDef = type || "div";
						arg = arg || {}, type = "svg" == _typeDef ? "div" : type;
						var _this = _possibleConstructorReturn$8(this, _UIDiv.call(this, arg, type)),
							U = _this;
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
						}, U.enabled = !0, U._initAlign(), _ret = U, _possibleConstructorReturn$8(_this, _ret)
					}
					return function (subClass, superClass) {
						if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						subClass.prototype = Object.create(superClass && superClass.prototype, {
							constructor: {
								value: subClass,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass)
					}(UIComponent, _UIDiv), UIComponent
				}(UIDiv),
				UIImage = function UIImage(arg) {
					function resize$$1(direction) {
						var denominator = _retina ? 2 : 1,
							ratio = _source.width / _source.height,
							sourceWidth = arg.css.width || _source.width,
							sourceHeight = arg.css.height || _source.height,
							updateWidth = void 0 == arg.css.width,
							updateHeight = void 0 == arg.css.height;
						if (_init || (updateWidth = "height" == direction, updateHeight = "width" == direction, sourceWidth = U.width, sourceHeight = U.height), updateWidth) {
							var width;
							width = _aspectRatio && !updateHeight ? sourceHeight * ratio : sourceWidth / denominator, U.style.width = Math.round(width) + "px"
						}
						if (updateHeight) {
							var height;
							height = _aspectRatio && !updateWidth ? sourceWidth / ratio : sourceHeight / denominator, U.style.height = Math.round(height) + "px"
						}
					}! function (instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
					}(this, UIImage), injectStylesheet("RED_uiImage", ".ui-image", "background-repeat:no-repeat; background-size:contain;");
					var _init = !0,
						_source = null,
						_retina = !1,
						_ratio = "contain",
						_aspectRatio = !!arg.aspectRatio;
					arg.css;
					if (!arg.source) throw new Error("UIImage : No image source set on '" + arg.id + "'");
					arg.css = arg.css || {};
					var U = new UIComponent(arg);
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
					}! function (instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
					}(this, UIButton), (arg = arg || {}).css = arg.css || {}, injectStylesheet("RED_uiButton", ".ui-button", "position:absolute", ".ui-button-state", "position: absolute; width:inherit; height:inherit;");
					var _bg, _state = 0,
						_icon = [],
						_containChild = !!arg.containChild,
						U = new UIComponent(arg);
					addClass(U, "ui-button"), arg.bg && createChild(arg.bg, !1), clampContainer(), arg.icon = arg.icon || [];
					for (var i = 0; i < arg.icon.length; i++) createChild(arg.icon[i], !0);
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
					}! function (instance, Constructor) {
						if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
					}(this, UITextField), injectStylesheet("RED_uiTextfield", ".ui-textfield", "position:absolute; white-space:nowrap;", ".smooth-text", "-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;", ".ui-textfield .content", "position:relative; display:table-cell; cursor:default; pointer-events:none; line-height:100%; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;");
					var _alignText, _fontFamily, _leading, _spacing, _verticalAlign, _smoothing, _fontSize = 0,
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