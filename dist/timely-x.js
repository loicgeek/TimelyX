var Ir = Object.defineProperty;
var kr = (r, e, t) => e in r ? Ir(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var me = (r, e, t) => kr(r, typeof e != "symbol" ? e + "" : e, t);
var Mr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, lr = { exports: {} };
(function(r, e) {
  (function(i, f) {
    r.exports = f();
  })(Mr, () => (
    /******/
    (() => {
      var t = {
        /***/
        "./src/datetime.ts": (
          /*!*************************!*\
            !*** ./src/datetime.ts ***!
            \*************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.DateTime = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./duration */
              "./src/duration.ts"
            ), k = s(
              /*! ./interval */
              "./src/interval.ts"
            ), N = s(
              /*! ./settings */
              "./src/settings.ts"
            ), I = s(
              /*! ./info */
              "./src/info.ts"
            ), U = s(
              /*! ./impl/formatter */
              "./src/impl/formatter.ts"
            ), C = s(
              /*! ./zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), M = s(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), h = s(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), T = s(
              /*! ./impl/zoneUtil */
              "./src/impl/zoneUtil.ts"
            ), E = s(
              /*! ./impl/diff */
              "./src/impl/diff.ts"
            ), R = s(
              /*! ./impl/regexParser */
              "./src/impl/regexParser.ts"
            ), S = s(
              /*! ./impl/tokenParser */
              "./src/impl/tokenParser.ts"
            ), y = s(
              /*! ./impl/conversions */
              "./src/impl/conversions.ts"
            ), D = m.__importStar(s(
              /*! ./impl/formats */
              "./src/impl/formats.ts"
            )), A = s(
              /*! ./errors */
              "./src/errors.ts"
            ), Z = s(
              /*! ./types/invalid */
              "./src/types/invalid.ts"
            ), w = "Invalid DateTime", b = 864e13;
            function P(u, a, o) {
              var c = u - a * 60 * 1e3, g = o.offset(c);
              if (a === g)
                return [c, a];
              c -= (g - a) * 60 * 1e3;
              var l = o.offset(c);
              return g === l ? [c, g] : [u - Math.min(g, l) * 60 * 1e3, Math.max(g, l)];
            }
            function O(u, a) {
              u += a * 60 * 1e3;
              var o = new Date(u);
              return {
                year: o.getUTCFullYear(),
                month: o.getUTCMonth() + 1,
                day: o.getUTCDate(),
                hour: o.getUTCHours(),
                minute: o.getUTCMinutes(),
                second: o.getUTCSeconds(),
                millisecond: o.getUTCMilliseconds()
              };
            }
            function W(u, a, o) {
              return P((0, h.objToLocalTS)(u), a, o);
            }
            function j(u, a, o, c, g, l) {
              var _ = o.setZone, F = o.zone;
              if (u && Object.keys(u).length !== 0 || a) {
                var x = a || F, H = ae.fromObject(u || void 0, m.__assign(m.__assign({}, o), { zone: x, specificOffset: l }));
                return _ ? H : H.setZone(F);
              } else
                return ae.invalid(new Z.Invalid("unparsable", 'the input "'.concat(g, `" can't be parsed as `).concat(c)));
            }
            function B(u, a, o) {
              return o === void 0 && (o = !0), u.isValid ? U.Formatter.create(M.Locale.create("en-US"), {
                allowZ: o,
                forceSimple: !0
              }).formatDateTimeFromString(u, a) : null;
            }
            var q = {
              year: 0,
              // unused value
              month: 1,
              day: 1,
              hour: 0,
              minute: 0,
              second: 0,
              millisecond: 0
            }, X = {
              weekNumber: 1,
              weekday: 1,
              hour: 0,
              minute: 0,
              second: 0,
              millisecond: 0
            }, z = {
              ordinal: 1,
              hour: 0,
              minute: 0,
              second: 0,
              millisecond: 0
            }, L = [
              "year",
              "month",
              "day",
              "hour",
              "minute",
              "second",
              "millisecond"
            ], Y = [
              "weekYear",
              "weekNumber",
              "weekday",
              "hour",
              "minute",
              "second",
              "millisecond"
            ], V = [
              "year",
              "ordinal",
              "hour",
              "minute",
              "second",
              "millisecond"
            ];
            function ee(u) {
              var a = h.PLURAL_MAPPING[u.toLowerCase()];
              if (!a)
                throw new A.InvalidUnitError(u);
              return a;
            }
            var ae = (
              /** @class */
              function() {
                function u(a) {
                  var o, c = a.zone || N.Settings.defaultZone, g = a.invalid || // invalid timestamp can happen when using plus or minus with 1E8 days resulting in overflows
                  (Number.isNaN(a.ts) ? new Z.Invalid("invalid timestamp") : null) || (c.isValid ? null : u._unsupportedZone(c));
                  this._ts = (0, h.isUndefined)(a.ts) ? N.Settings.now() : a.ts;
                  var l, _;
                  if (!g) {
                    var F = !!a.old && a.old.ts === this._ts && a.old.zone.equals(c);
                    if (F)
                      o = [a.old.c, a.old.o], _ = o[0], l = o[1];
                    else {
                      var x = (0, h.isNumber)(a.o) && !a.old ? a.o : c.offset(this.ts);
                      _ = O(this._ts, x), g = Number.isNaN(_.year) ? new Z.Invalid("invalid input") : null, _ = g ? void 0 : _, l = g ? void 0 : x;
                    }
                  }
                  this._zone = c, this._loc = a.loc || M.Locale.create(), this._invalid = g, this._weekData = null, this._c = _, this._o = l, this._isLuxonDateTime = !0;
                }
                return Object.defineProperty(u.prototype, "day", {
                  /**
                   * Get the day of the month (1-30ish).
                   * @example DateTime.local(2017, 5, 25).day //=> 25
                   */
                  get: function() {
                    return this.isValid ? this._c.day : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "daysInMonth", {
                  /**
                   * Returns the number of days in this DateTime's month
                   * @example DateTime.local(2016, 2).daysInMonth //=> 29
                   * @example DateTime.local(2016, 3).daysInMonth //=> 31
                   */
                  get: function() {
                    return (0, h.daysInMonth)(this.year, this.month);
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "daysInYear", {
                  /**
                   * Returns the number of days in this DateTime's year
                   * @example DateTime.local(2016).daysInYear //=> 366
                   * @example DateTime.local(2013).daysInYear //=> 365
                   */
                  get: function() {
                    return this.isValid ? (0, h.daysInYear)(this.year) : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "hour", {
                  /**
                   * Get the hour of the day (0-23).
                   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
                   */
                  get: function() {
                    return this.isValid ? this._c.hour : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "invalidExplanation", {
                  /**
                   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
                   */
                  get: function() {
                    return this._invalid ? this._invalid.explanation : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "invalidReason", {
                  /**
                   * Returns an error code if this Duration became invalid, or null if the Duration is valid
                   */
                  get: function() {
                    return this._invalid ? this._invalid.reason : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "isInDST", {
                  /**
                   * Get whether the DateTime is in a DST.
                   */
                  get: function() {
                    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "isInLeapYear", {
                  /**
                   * Returns true if this DateTime is in a leap year, false otherwise
                   * @example DateTime.local(2016).isInLeapYear //=> true
                   * @example DateTime.local(2013).isInLeapYear //=> false
                   */
                  get: function() {
                    return (0, h.isLeapYear)(this.year);
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "isOffsetFixed", {
                  /**
                   * Get whether this zone's offset ever changes, as in a DST.
                   */
                  get: function() {
                    return this.isValid ? this.zone.isUniversal : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "isValid", {
                  /**
                   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
                   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
                   * * The DateTime was created by an operation on another invalid date
                   */
                  get: function() {
                    return this._invalid === null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "isWeekend", {
                  /**
                   * Returns true if this date is on a weekend according to the locale, false otherwise
                   * @returns {boolean}
                   */
                  get: function() {
                    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "loc", {
                  /**
                   * Get a clone of the Locale instance of a DateTime.
                   */
                  get: function() {
                    return this.isValid ? this._loc.clone() : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "localWeekNumber", {
                  /**
                   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
                   * because the week can start on different days of the week (see localWeekday) and because a different number of days
                   * is required for a week to count as the first week of a year.
                   */
                  get: function() {
                    return this.isValid ? this._possiblyCachedLocalWeekData(this).weekNumber : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "localWeekYear", {
                  /**
                   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
                   * differently, see localWeekNumber.
                   */
                  get: function() {
                    return this.isValid ? this._possiblyCachedLocalWeekData(this).weekYear : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "localWeekday", {
                  /**
                   * Get the day of the week according to the locale.
                   * 1 is the first day of the week and 7 is the last day of the week.
                   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
                   */
                  get: function() {
                    return this.isValid ? this._possiblyCachedLocalWeekData(this).weekday : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "locale", {
                  /**
                   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
                   */
                  get: function() {
                    return this.isValid ? this._loc.locale : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "millisecond", {
                  /**
                   * Get the millisecond of the second (0-999).
                   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
                   */
                  get: function() {
                    return this.isValid ? this._c.millisecond : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "minute", {
                  /**
                   * Get the minute of the hour (0-59).
                   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
                   */
                  get: function() {
                    return this.isValid ? this._c.minute : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "month", {
                  /**
                   * Get the month (1-12).
                   * @example DateTime.local(2017, 5, 25).month //=> 5
                   */
                  get: function() {
                    return this.isValid ? this._c.month : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "monthLong", {
                  /**
                   * Get the human-readable long month name, such as 'October'.
                   * Defaults to the system's locale if no locale has been specified
                   * @example DateTime.local(2017, 10, 30).monthLong //=> October
                   */
                  get: function() {
                    return this.isValid ? I.Info.months("long", { locObj: this._loc })[this.month - 1] : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "monthShort", {
                  /**
                   * Get the human-readable short month name, such as 'Oct'.
                   * Defaults to the system's locale if no locale has been specified
                   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
                   */
                  get: function() {
                    return this.isValid ? I.Info.months("short", { locObj: this._loc })[this.month - 1] : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "numberingSystem", {
                  /**
                   * Get the numbering system of a DateTime, such as "beng". The numbering system is used when formatting the DateTime
                   */
                  get: function() {
                    return this.isValid ? this._loc.numberingSystem : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "offset", {
                  /**
                   * Get the UTC offset of this DateTime in minutes
                   * @example DateTime.now().offset //=> -240
                   * @example DateTime.utc().offset //=> 0
                   */
                  get: function() {
                    return this.isValid ? +this._o : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "offsetNameLong", {
                  /**
                   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
                   * Defaults to the system's locale if no locale has been specified
                   */
                  get: function() {
                    return this.isValid ? this.zone.offsetName(this._ts, {
                      format: "long",
                      locale: this.locale
                    }) : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "offsetNameShort", {
                  /**
                   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
                   * Defaults to the system's locale if no locale has been specified
                   */
                  get: function() {
                    return this.isValid ? this.zone.offsetName(this._ts, {
                      format: "short",
                      locale: this.locale
                    }) : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "ordinal", {
                  /**
                   * Get the ordinal (meaning the day of the year)
                   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
                   */
                  get: function() {
                    return this.isValid ? (0, y.gregorianToOrdinal)(this._c).ordinal : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "outputCalendar", {
                  /**
                   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
                   */
                  get: function() {
                    return this.isValid ? this._loc.outputCalendar : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "quarter", {
                  /**
                   * Get the quarter
                   * @example DateTime.local(2017, 5, 25).quarter //=> 2
                   */
                  get: function() {
                    return this.isValid ? Math.ceil(this._c.month / 3) : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "second", {
                  /**
                   * Get the second of the minute (0-59).
                   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
                   */
                  get: function() {
                    return this.isValid ? this._c.second : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "ts", {
                  /**
                   * Get the timestamp.
                   * @example DateTime.local(1970, 1, 1, 0, 0, 0, 654).ts //=> 654
                   */
                  get: function() {
                    return this._ts;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weekNumber", {
                  /**
                   * Get the week number of the week year (1-52ish).
                   * @see https://en.wikipedia.org/wiki/ISO_week_date
                   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
                   */
                  get: function() {
                    return this.isValid ? this._possiblyCachedWeekData(this).weekNumber : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weekYear", {
                  /**
                   * Get the week year
                   * @see https://en.wikipedia.org/wiki/ISO_week_date
                   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
                   */
                  get: function() {
                    return this.isValid ? this._possiblyCachedWeekData(this).weekYear : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weekday", {
                  /**
                   * Get the day of the week.
                   * 1 is Monday and 7 is Sunday
                   * @see https://en.wikipedia.org/wiki/ISO_week_date
                   * @example DateTime.local(2014, 11, 31).weekday //=> 4
                   */
                  get: function() {
                    return this.isValid ? this._possiblyCachedWeekData(this).weekday : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weekdayLong", {
                  /**
                   * Get the human-readable long weekday, such as 'Monday'.
                   * Defaults to the system's locale if no locale has been specified
                   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
                   */
                  get: function() {
                    return this.isValid ? I.Info.weekdays("long", { locObj: this._loc })[this.weekday - 1] : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weekdayShort", {
                  /**
                   * Get the human-readable short weekday, such as 'Mon'.
                   * Defaults to the system's locale if no locale has been specified
                   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
                   */
                  get: function() {
                    return this.isValid ? I.Info.weekdays("short", { locObj: this._loc })[this.weekday - 1] : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weeksInLocalWeekYear", {
                  /**
                   * Returns the number of weeks in this DateTime's local week year
                   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
                   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? (0, h.weeksInWeekYear)(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "weeksInWeekYear", {
                  /**
                   * Returns the number of weeks in this DateTime's year
                   * @see https://en.wikipedia.org/wiki/ISO_week_date
                   * @example DateTime.local(2004).weeksInWeekYear //=> 53
                   * @example DateTime.local(2013).weeksInWeekYear //=> 52
                   */
                  get: function() {
                    return this.isValid ? (0, h.weeksInWeekYear)(this.weekYear) : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "year", {
                  /**
                   * Get the year
                   * @example DateTime.local(2017, 5, 25).year //=> 2017
                   */
                  get: function() {
                    return this.isValid ? this._c.year : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "zone", {
                  /**
                   * Get the time zone associated with this DateTime.
                   */
                  get: function() {
                    return this._zone;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(u.prototype, "zoneName", {
                  /**
                   * Get the name of the time zone.
                   */
                  get: function() {
                    return this.isValid ? this.zone.name : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), u.buildFormatParser = function(a, o) {
                  o === void 0 && (o = {});
                  var c = o.locale, g = c === void 0 ? null : c, l = o.numberingSystem, _ = l === void 0 ? null : l, F = M.Locale.fromOpts({
                    locale: g,
                    numberingSystem: _,
                    defaultToEN: !0
                  });
                  return new S.TokenParser(F, a);
                }, u.expandFormat = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, S.expandMacroTokens)(U.Formatter.parseFormat(a), M.Locale.fromObject(o));
                  return c.map(function(g) {
                    return g.val;
                  }).join("");
                }, u.fromFormat = function(a, o, c) {
                  if (c === void 0 && (c = {}), (0, h.isUndefined)(a) || (0, h.isUndefined)(o))
                    throw new A.InvalidArgumentError("fromFormat requires an input string and a format");
                  var g = c.locale, l = c.numberingSystem, _ = M.Locale.fromOpts({
                    locale: g,
                    numberingSystem: l,
                    defaultToEN: !0
                  }), F = (0, S.parseFromTokens)(_, a, o), x = F[0], H = F[1], J = F[2], K = F[3];
                  return K ? u.invalid(K) : j(x, H || null, c, "format ".concat(o), a, J);
                }, u.fromFormatExplain = function(a, o, c) {
                  c === void 0 && (c = {});
                  var g = c.locale, l = c.numberingSystem, _ = M.Locale.fromOpts({
                    locale: g,
                    numberingSystem: l,
                    defaultToEN: !0
                  });
                  return (0, S.explainFromTokens)(_, a, o);
                }, u.fromFormatParser = function(a, o, c) {
                  if (c === void 0 && (c = {}), (0, h.isUndefined)(a) || (0, h.isUndefined)(o))
                    throw new A.InvalidArgumentError("fromFormatParser requires an input string and a format parser");
                  var g = c.locale, l = g === void 0 ? null : g, _ = c.numberingSystem, F = _ === void 0 ? null : _, x = M.Locale.fromOpts({
                    locale: l,
                    numberingSystem: F,
                    defaultToEN: !0
                  });
                  if (!x.equals(o.locale))
                    throw new A.InvalidArgumentError("fromFormatParser called with a locale of ".concat(x, ", ") + "but the format parser was created for ".concat(o.locale));
                  var H = o.explainFromTokens(a), J = H.result, K = H.zone, Q = H.specificOffset, ne = H.invalidReason;
                  return ne ? u.invalid(ne) : j(J, K, c, "format ".concat(o.format), a, Q);
                }, u.fromHTTP = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, R.parseHTTPDate)(a), g = c[0], l = c[1];
                  return j(g, l, o, "HTTP", a);
                }, u.fromISO = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, R.parseISODate)(a), g = c[0], l = c[1];
                  return j(g, l, o, "ISO 8601", a);
                }, u.fromJSDate = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, h.isDate)(a) ? a.valueOf() : NaN;
                  if (Number.isNaN(c))
                    return u.invalid("invalid input");
                  var g = (0, T.normalizeZone)(o.zone, N.Settings.defaultZone);
                  return g.isValid ? new u({
                    ts: c,
                    zone: g,
                    loc: M.Locale.fromObject(o)
                  }) : u.invalid(u._unsupportedZone(g));
                }, u.fromMillis = function(a, o) {
                  if (o === void 0 && (o = {}), (0, h.isNumber)(a))
                    return a < -b || a > b ? u.invalid("Timestamp out of range") : new u({
                      ts: a,
                      zone: (0, T.normalizeZone)(o.zone, N.Settings.defaultZone),
                      loc: M.Locale.fromObject(o)
                    });
                  throw new A.InvalidArgumentError("fromMillis requires a numerical input, but received a ".concat(typeof a, " with value ").concat(a));
                }, u.fromObject = function(a, o) {
                  a === void 0 && (a = {}), o === void 0 && (o = {});
                  var c = (0, T.normalizeZone)(o.zone, N.Settings.defaultZone);
                  if (!c.isValid)
                    return u.invalid(u._unsupportedZone(c));
                  var g = M.Locale.fromObject(o), l = (0, h.normalizeObject)(a, ee), _ = N.Settings.now(), F = (0, h.isNumber)(o.specificOffset) ? o.specificOffset : c.offset(_), x = (0, h.isDefined)(l.ordinal), H = (0, h.isDefined)(l.year), J = (0, h.isDefined)(l.month) || (0, h.isDefined)(l.day), K = H || J, Q = l.weekYear || l.weekNumber;
                  if ((K || x) && Q)
                    throw new A.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                  if (J && x)
                    throw new A.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
                  var ne = Q || l.weekday && !K, fe = (0, y.usesLocalWeekValues)(l, g), _e = fe.minDaysInFirstWeek, Se = fe.startOfWeek, be = O(_, F), Be = {
                    containsGregor: K,
                    containsOrdinal: x,
                    loc: g,
                    normalized: l,
                    obj: a,
                    offsetProvis: F,
                    useWeekData: ne,
                    zoneToUse: c
                  };
                  return ne ? u._buildObject(Be, Y, X, (0, y.gregorianToWeek)(be, _e, Se)) : x ? u._buildObject(Be, V, z, (0, y.gregorianToOrdinal)(be)) : u._buildObject(Be, L, q, be);
                }, u.fromRFC2822 = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, R.parseRFC2822Date)(a), g = c[0], l = c[1];
                  return j(g, l, o, "RFC 2822", a);
                }, u.fromSQL = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, R.parseSQL)(a), g = c[0], l = c[1];
                  return j(g, l, o, "SQL", a);
                }, u.fromSeconds = function(a, o) {
                  if (o === void 0 && (o = {}), !(0, h.isNumber)(a))
                    throw new A.InvalidArgumentError("fromSeconds requires a numerical input");
                  return new u({
                    ts: a * 1e3,
                    zone: (0, T.normalizeZone)(o.zone, N.Settings.defaultZone),
                    loc: M.Locale.fromObject(o)
                  });
                }, u.fromString = function(a, o, c) {
                  return c === void 0 && (c = {}), u.fromFormat(a, o, c);
                }, u.fromStringExplain = function(a, o, c) {
                  return c === void 0 && (c = {}), u.fromFormatExplain(a, o, c);
                }, u.invalid = function(a, o) {
                  if (!a)
                    throw new A.InvalidArgumentError("need to specify a reason the DateTime is invalid");
                  var c = a instanceof Z.Invalid ? a : new Z.Invalid(a, o);
                  if (N.Settings.throwOnInvalid)
                    throw new A.InvalidDateTimeError(c);
                  return new u({ invalid: c });
                }, u.isDateTime = function(a) {
                  return !!(a && a._isLuxonDateTime);
                }, u.local = function() {
                  for (var a = [], o = 0; o < arguments.length; o++)
                    a[o] = arguments[o];
                  var c = this._lastOpts(a), g = c[0], l = c[1], _ = l[0], F = l[1], x = l[2], H = l[3], J = l[4], K = l[5], Q = l[6];
                  return u._quickDT({
                    year: _,
                    month: F,
                    day: x,
                    hour: H,
                    minute: J,
                    second: K,
                    millisecond: Q
                  }, g);
                }, u.max = function() {
                  for (var a = [], o = 0; o < arguments.length; o++)
                    a[o] = arguments[o];
                  if (!a.every(u.isDateTime))
                    throw new A.InvalidArgumentError("max requires all arguments be DateTimes");
                  return (0, h.bestBy)(a, function(c) {
                    return c.valueOf();
                  }, Math.max);
                }, u.min = function() {
                  for (var a = [], o = 0; o < arguments.length; o++)
                    a[o] = arguments[o];
                  if (!a.every(u.isDateTime))
                    throw new A.InvalidArgumentError("min requires all arguments be DateTimes");
                  return (0, h.bestBy)(a, function(c) {
                    return c.valueOf();
                  }, Math.min);
                }, u.now = function() {
                  return new u({});
                }, u.parseFormatForOpts = function(a, o) {
                  o === void 0 && (o = {});
                  var c = (0, S.formatOptsToTokens)(a, M.Locale.fromObject(o));
                  return c ? c.map(function(g) {
                    return g ? g.val : null;
                  }).join("") : null;
                }, u.resetCache = function() {
                  this._zoneOffsetTs = void 0, this._zoneOffsetGuessCache = /* @__PURE__ */ new Map();
                }, u.utc = function() {
                  for (var a = [], o = 0; o < arguments.length; o++)
                    a[o] = arguments[o];
                  var c = this._lastOpts(a), g = c[0], l = c[1], _ = l[0], F = l[1], x = l[2], H = l[3], J = l[4], K = l[5], Q = l[6];
                  return g.zone = C.FixedOffsetZone.utcInstance, this._quickDT({ year: _, month: F, day: x, hour: H, minute: J, second: K, millisecond: Q }, g);
                }, u._buildObject = function(a, o, c, g) {
                  var l = !1;
                  o.forEach(function(ne) {
                    var fe = a.normalized[ne];
                    (0, h.isDefined)(fe) ? l = !0 : l ? a.normalized[ne] = c[ne] : a.normalized[ne] = g[ne];
                  });
                  var _ = a.useWeekData ? (0, y.hasInvalidWeekData)(a.normalized) : a.containsOrdinal ? (0, y.hasInvalidOrdinalData)(a.normalized) : (0, y.hasInvalidGregorianData)(a.normalized), F = _ || (0, y.hasInvalidTimeData)(a.normalized);
                  if (F)
                    return u.invalid(F);
                  var x = a.useWeekData ? (0, y.weekToGregorian)(a.normalized) : a.containsOrdinal ? (0, y.ordinalToGregorian)(a.normalized) : a.normalized, H = W(x, a.offsetProvis, a.zoneToUse), J = H[0], K = H[1], Q = new u({
                    ts: J,
                    zone: a.zoneToUse,
                    o: K,
                    loc: a.loc
                  });
                  return a.normalized.weekday && a.containsGregor && a.obj.weekday !== Q.weekday ? u.invalid("mismatched weekday", "you can't specify both a weekday of ".concat(a.normalized.weekday, " and a date of ").concat(Q.toISO())) : Q.isValid ? Q : u.invalid(Q._invalid);
                }, u._diffRelative = function(a, o, c) {
                  var g = (0, h.isUndefined)(c.round) ? !0 : c.round, l = function(K, Q) {
                    K = (0, h.roundTo)(K, g || c.calendary ? 0 : 2, !0);
                    var ne = o._loc.clone(c).relFormatter(c);
                    return ne.format(K, Q);
                  }, _ = function(K) {
                    return c.calendary ? o.hasSame(a, K) ? 0 : o.startOf(K).diff(a.startOf(K), K).get(K) : o.diff(a, K).get(K);
                  };
                  if (c.unit)
                    return l(_(c.unit), c.unit);
                  for (var F = 0, x = c.units; F < x.length; F++) {
                    var H = x[F], J = _(H);
                    if (Math.abs(J) >= 1)
                      return l(J, H);
                  }
                  return l(a > o ? -0 : 0, c.units[c.units.length - 1]);
                }, u._guessOffsetForZone = function(a) {
                  return this._zoneOffsetGuessCache.has(a) || (this._zoneOffsetTs === void 0 && (this._zoneOffsetTs = N.Settings.now()), this._zoneOffsetGuessCache.set(a, a.offset(this._zoneOffsetTs))), this._zoneOffsetGuessCache.get(a);
                }, u._lastOpts = function(a) {
                  var o = {}, c;
                  return a.length > 0 && typeof a[a.length - 1] == "object" ? (o = a.pop(), c = a) : c = Array.from(a), [o, c];
                }, u._quickDT = function(a, o) {
                  var c, g = (0, T.normalizeZone)(o.zone, N.Settings.defaultZone);
                  if (!g.isValid)
                    return u.invalid(this._unsupportedZone(g));
                  var l = M.Locale.fromObject(o), _ = N.Settings.now(), F, x;
                  if ((0, h.isDefined)(a.year)) {
                    for (var H = 0, J = L; H < J.length; H++) {
                      var K = J[H];
                      (0, h.isUndefined)(a[K]) && (a[K] = q[K]);
                    }
                    var Q = (0, y.hasInvalidGregorianData)(a) || (0, y.hasInvalidTimeData)(a);
                    if (Q)
                      return u.invalid(Q);
                    var ne = this._guessOffsetForZone(g);
                    c = W(a, ne, g), F = c[0], x = c[1];
                  } else
                    F = _;
                  return new u({ ts: F, zone: g, loc: l, o: x });
                }, u._unsupportedZone = function(a) {
                  return new Z.Invalid("unsupported zone", 'the zone "'.concat(a.name, '" is not supported'));
                }, u.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                  return this.isValid ? "DateTime { ts: ".concat(this.toISO(), ", zone: ").concat(this.zone.name, ", locale: ").concat(this.locale, " }") : "DateTime { Invalid, reason: ".concat(this.invalidReason, " }");
                }, u.prototype.diff = function(a, o, c) {
                  if (o === void 0 && (o = "milliseconds"), c === void 0 && (c = {}), !this.isValid || !a.isValid) {
                    var g = this.invalidReason || a.invalidReason;
                    return d.Duration.invalid(g, "created by diffing an invalid DateTime");
                  }
                  var l = (0, h.maybeArray)(o).map(d.Duration.normalizeUnit), _ = a.valueOf() > this.valueOf(), F = _ ? this : a, x = _ ? a : this, H = (0, E.diff)(F, x, l, m.__assign({ locale: this.locale, numberingSystem: this.numberingSystem }, c));
                  return _ ? H.negate() : H;
                }, u.prototype.diffNow = function(a, o) {
                  return a === void 0 && (a = "milliseconds"), o === void 0 && (o = {}), this.diff(u.now(), a, o);
                }, u.prototype.endOf = function(a, o) {
                  var c, g = o === void 0 ? {} : o, l = g.useLocaleWeeks, _ = l === void 0 ? !1 : l;
                  return this.plus((c = {}, c[a] = 1, c)).startOf(a, { useLocaleWeeks: _ }).minus({ milliseconds: 1 });
                }, u.prototype.equals = function(a) {
                  return this.valueOf() === a.valueOf() && this.zone.equals(a.zone) && this._loc.equals(a._loc);
                }, u.prototype.get = function(a) {
                  return this[a];
                }, u.prototype.getPossibleOffsets = function() {
                  if (!this.isValid || this.isOffsetFixed)
                    return [this];
                  var a = 864e5, o = 6e4, c = (0, h.objToLocalTS)(this._c), g = this.zone.offset(c - a), l = this.zone.offset(c + a), _ = this.zone.offset(c - g * o), F = this.zone.offset(c - l * o);
                  if (_ === F)
                    return [this];
                  var x = c - _ * o, H = c - F * o, J = O(x, _), K = O(H, F);
                  return J.hour === K.hour && J.minute === K.minute && J.second === K.second && J.millisecond === K.millisecond ? [this._clone({ ts: x }), this._clone({ ts: H })] : [this];
                }, u.prototype.hasSame = function(a, o, c) {
                  if (!this.isValid)
                    return !1;
                  var g = a.valueOf(), l = this.setZone(a.zone, { keepLocalTime: !0 });
                  return +l.startOf(o) <= g && g <= +l.endOf(o, c);
                }, u.prototype.minus = function(a) {
                  if (!this.isValid)
                    return this;
                  var o = d.Duration.fromDurationLike(a).negate();
                  return this._clone(this._adjustTime(o));
                }, u.prototype.plus = function(a) {
                  if (!this.isValid)
                    return this;
                  var o = d.Duration.fromDurationLike(a);
                  return this._clone(this._adjustTime(o));
                }, u.prototype.reconfigure = function(a) {
                  var o = this._loc.clone(a);
                  return this._clone({ loc: o });
                }, u.prototype.resolvedLocaleOptions = function(a) {
                  a === void 0 && (a = {});
                  var o = U.Formatter.create(this._loc.clone(a), a).resolvedOptions(this), c = o.locale, g = o.numberingSystem, l = o.calendar;
                  return { locale: c, numberingSystem: g, outputCalendar: l };
                }, u.prototype.set = function(a) {
                  if (!this.isValid)
                    return this;
                  var o = (0, h.normalizeObject)(a, ee), c = (0, y.usesLocalWeekValues)(o, this.loc), g = c.minDaysInFirstWeek, l = c.startOfWeek, _ = (0, h.isDefined)(o.weekYear) || (0, h.isDefined)(o.weekNumber) || (0, h.isDefined)(o.weekday), F = (0, h.isDefined)(o.ordinal), x = (0, h.isDefined)(o.year), H = (0, h.isDefined)(o.month) || (0, h.isDefined)(o.day), J = x || H, K = o.weekYear || o.weekNumber;
                  if ((J || F) && K)
                    throw new A.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                  if (H && F)
                    throw new A.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
                  var Q;
                  _ ? Q = (0, y.weekToGregorian)(m.__assign(m.__assign({}, (0, y.gregorianToWeek)(this._c, g, l)), o), g, l) : (0, h.isUndefined)(o.ordinal) ? (Q = m.__assign(m.__assign({}, this.toObject()), o), (0, h.isUndefined)(o.day) && (Q.day = Math.min((0, h.daysInMonth)(Q.year, Q.month), Q.day))) : Q = (0, y.ordinalToGregorian)(m.__assign(m.__assign({}, (0, y.gregorianToOrdinal)(this._c)), o));
                  var ne = W(Q, this._o, this.zone), fe = ne[0], _e = ne[1];
                  return this._clone({ ts: fe, o: _e });
                }, u.prototype.setLocale = function(a) {
                  return this.reconfigure({ locale: a });
                }, u.prototype.setZone = function(a, o) {
                  var c = o === void 0 ? {} : o, g = c.keepLocalTime, l = g === void 0 ? !1 : g, _ = c.keepCalendarTime, F = _ === void 0 ? !1 : _;
                  if (a = (0, T.normalizeZone)(a, N.Settings.defaultZone), a.equals(this.zone))
                    return this;
                  if (a.isValid) {
                    var x = this._ts;
                    if (l || F) {
                      var H = a.offset(this._ts), J = this.toObject();
                      x = W(J, H, a)[0];
                    }
                    return this._clone({ ts: x, zone: a });
                  } else
                    return u.invalid(u._unsupportedZone(a));
                }, u.prototype.startOf = function(a, o) {
                  var c = o === void 0 ? {} : o, g = c.useLocaleWeeks, l = g === void 0 ? !1 : g;
                  if (!this.isValid)
                    return this;
                  var _ = {}, F = d.Duration.normalizeUnit(a);
                  switch (F) {
                    case "years":
                      _.month = 1;
                    case "quarters":
                    case "months":
                      _.day = 1;
                    case "weeks":
                    case "days":
                      _.hour = 0;
                    case "hours":
                      _.minute = 0;
                    case "minutes":
                      _.second = 0;
                    case "seconds":
                      _.millisecond = 0;
                      break;
                  }
                  if (F === "weeks")
                    if (l) {
                      var x = this.loc.getStartOfWeek(), H = this.weekday;
                      H < x && (_.weekNumber = this.weekNumber - 1), _.weekday = x;
                    } else
                      _.weekday = 1;
                  if (F === "quarters") {
                    var J = Math.ceil(this.month / 3);
                    _.month = (J - 1) * 3 + 1;
                  }
                  return this.set(_);
                }, u.prototype.toBSON = function() {
                  return this.toJSDate();
                }, u.prototype.toFormat = function(a, o) {
                  return o === void 0 && (o = {}), this.isValid ? U.Formatter.create(this._loc.redefaultToEN(o)).formatDateTimeFromString(this, a) : w;
                }, u.prototype.toHTTP = function() {
                  return B(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
                }, u.prototype.toISO = function(a) {
                  var o = a === void 0 ? {} : a, c = o.format, g = c === void 0 ? "extended" : c, l = o.suppressSeconds, _ = l === void 0 ? !1 : l, F = o.suppressMilliseconds, x = F === void 0 ? !1 : F, H = o.includeOffset, J = H === void 0 ? !0 : H, K = o.extendedZone, Q = K === void 0 ? !1 : K;
                  if (!this.isValid)
                    return null;
                  var ne = g === "extended";
                  return [
                    this._toISODate(ne),
                    "T",
                    this._toISOTime(ne, _, x, J, Q)
                  ].join("");
                }, u.prototype.toISODate = function(a) {
                  var o = a === void 0 ? { format: "extended" } : a, c = o.format, g = c === void 0 ? "extended" : c;
                  return this.isValid ? this._toISODate(g === "extended") : null;
                }, u.prototype.toISOTime = function(a) {
                  var o = a === void 0 ? {} : a, c = o.suppressMilliseconds, g = c === void 0 ? !1 : c, l = o.suppressSeconds, _ = l === void 0 ? !1 : l, F = o.includeOffset, x = F === void 0 ? !0 : F, H = o.includePrefix, J = H === void 0 ? !1 : H, K = o.extendedZone, Q = K === void 0 ? !1 : K, ne = o.format, fe = ne === void 0 ? "extended" : ne;
                  return this.isValid ? [
                    J ? "T" : "",
                    this._toISOTime(fe === "extended", _, g, x, Q)
                  ].join("") : null;
                }, u.prototype.toISOWeekDate = function() {
                  return B(this, "kkkk-'W'WW-c");
                }, u.prototype.toJSDate = function() {
                  return new Date(this.isValid ? this._ts : NaN);
                }, u.prototype.toJSON = function() {
                  return this.toISO();
                }, u.prototype.toLocal = function() {
                  return this.setZone(N.Settings.defaultZone);
                }, u.prototype.toLocaleParts = function(a) {
                  return a === void 0 && (a = {}), this.isValid ? U.Formatter.create(this._loc.clone(a), a).formatDateTimeParts(this) : [];
                }, u.prototype.toLocaleString = function(a, o) {
                  return a === void 0 && (a = D.DATE_SHORT), o === void 0 && (o = {}), this.isValid ? U.Formatter.create(this._loc.clone(o), a).formatDateTime(this) : w;
                }, u.prototype.toMillis = function() {
                  return this.isValid ? this.ts : NaN;
                }, u.prototype.toObject = function(a) {
                  if (a === void 0 && (a = { includeConfig: !1 }), !this.isValid)
                    return {};
                  var o = Object.assign({}, this._c);
                  return a.includeConfig && (o.outputCalendar = this.outputCalendar, o.numberingSystem = this._loc.numberingSystem, o.locale = this._loc.locale), o;
                }, u.prototype.toRFC2822 = function() {
                  return B(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
                }, u.prototype.toRelative = function(a) {
                  if (a === void 0 && (a = {}), !this.isValid)
                    return null;
                  var o = a.base || u.fromObject({}, { zone: this.zone }), c = a.padding ? this < o ? -a.padding : a.padding : 0, g = ["years", "months", "days", "hours", "minutes", "seconds"], l = a.unit;
                  return Array.isArray(a.unit) && (g = a.unit, l = void 0), u._diffRelative(o, this.plus(c), m.__assign(m.__assign({}, a), { numeric: "always", units: g, unit: l }));
                }, u.prototype.toRelativeCalendar = function(a) {
                  return a === void 0 && (a = {}), this.isValid ? u._diffRelative(a.base || u.fromObject({}, { zone: this.zone }), this, m.__assign(m.__assign({}, a), { numeric: "auto", units: ["years", "months", "days"], calendary: !0 })) : null;
                }, u.prototype.toSQL = function(a) {
                  return a === void 0 && (a = {}), this.isValid ? "".concat(this.toSQLDate(), " ").concat(this.toSQLTime(a)) : null;
                }, u.prototype.toSQLDate = function() {
                  return this.isValid ? this._toISODate(!0) : null;
                }, u.prototype.toSQLTime = function(a) {
                  var o = a === void 0 ? {} : a, c = o.includeOffset, g = c === void 0 ? !0 : c, l = o.includeZone, _ = l === void 0 ? !1 : l, F = o.includeOffsetSpace, x = F === void 0 ? !0 : F, H = "HH:mm:ss.SSS";
                  return (_ || g) && (x && (H += " "), _ ? H += "z" : g && (H += "ZZ")), B(this, H, !0);
                }, u.prototype.toSeconds = function() {
                  return this.isValid ? this._ts / 1e3 : NaN;
                }, u.prototype.toString = function() {
                  return this.isValid ? this.toISO() : w;
                }, u.prototype.toUTC = function(a, o) {
                  return a === void 0 && (a = 0), o === void 0 && (o = {}), this.setZone(C.FixedOffsetZone.instance(a), o);
                }, u.prototype.toUnixInteger = function() {
                  return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
                }, u.prototype.until = function(a) {
                  return k.Interval.fromDateTimes(this, a);
                }, u.prototype.valueOf = function() {
                  return this.toMillis();
                }, u.prototype._adjustTime = function(a) {
                  var o = this._o, c = this._c.year + Math.trunc(a.years), g = this._c.month + Math.trunc(a.months) + Math.trunc(a.quarters) * 3, l = m.__assign(m.__assign({}, this._c), { year: c, month: g, day: Math.min(this._c.day, (0, h.daysInMonth)(c, g)) + Math.trunc(a.days) + Math.trunc(a.weeks) * 7 }), _ = d.Duration.fromObject({
                    years: a.years - Math.trunc(a.years),
                    quarters: a.quarters - Math.trunc(a.quarters),
                    months: a.months - Math.trunc(a.months),
                    weeks: a.weeks - Math.trunc(a.weeks),
                    days: a.days - Math.trunc(a.days),
                    hours: a.hours,
                    minutes: a.minutes,
                    seconds: a.seconds,
                    milliseconds: a.milliseconds
                  }).as("milliseconds"), F = (0, h.objToLocalTS)(l), x = P(F, o, this.zone), H = x[0], J = x[1];
                  return _ !== 0 && (H += _, J = this.zone.offset(H)), { ts: H, o: J };
                }, u.prototype._clone = function(a) {
                  var o = {
                    ts: this._ts,
                    zone: this.zone,
                    c: this._c,
                    o: this._o,
                    loc: this._loc,
                    invalid: this._invalid || void 0
                  };
                  return new u(m.__assign(m.__assign(m.__assign({}, o), a), { old: o }));
                }, u.prototype._possiblyCachedLocalWeekData = function(a) {
                  return a._localWeekData || (a._localWeekData = (0, y.gregorianToWeek)(a._c, a.loc.getMinDaysInFirstWeek(), a.loc.getStartOfWeek())), a._localWeekData;
                }, u.prototype._possiblyCachedWeekData = function(a) {
                  return a._weekData === null && (a._weekData = (0, y.gregorianToWeek)(a._c)), a._weekData;
                }, u.prototype._toISODate = function(a) {
                  var o = this._c.year > 9999 || this._c.year < 0, c = "";
                  return o && this._c.year >= 0 && (c += "+"), c += (0, h.padStart)(this._c.year, o ? 6 : 4), a ? (c += "-", c += (0, h.padStart)(this._c.month), c += "-", c += (0, h.padStart)(this._c.day)) : (c += (0, h.padStart)(this._c.month), c += (0, h.padStart)(this._c.day)), c;
                }, u.prototype._toISOTime = function(a, o, c, g, l) {
                  var _ = (0, h.padStart)(this._c.hour);
                  return a ? (_ += ":", _ += (0, h.padStart)(this._c.minute), (this._c.millisecond !== 0 || this._c.second !== 0 || !o) && (_ += ":")) : _ += (0, h.padStart)(this._c.minute), (this._c.millisecond !== 0 || this._c.second !== 0 || !o) && (_ += (0, h.padStart)(this._c.second), (this._c.millisecond !== 0 || !c) && (_ += ".", _ += (0, h.padStart)(this._c.millisecond, 3))), g && (this.isOffsetFixed && this.offset === 0 && !l ? _ += "Z" : this._o < 0 ? (_ += "-", _ += (0, h.padStart)(Math.trunc(-this._o / 60)), _ += ":", _ += (0, h.padStart)(Math.trunc(-this._o % 60))) : (_ += "+", _ += (0, h.padStart)(Math.trunc(this._o / 60)), _ += ":", _ += (0, h.padStart)(Math.trunc(this._o % 60)))), l && (_ += "[" + this.zone.ianaName + "]"), _;
                }, u.DATETIME_FULL = D.DATETIME_FULL, u.DATETIME_FULL_WITH_SECONDS = D.DATETIME_FULL_WITH_SECONDS, u.DATETIME_HUGE = D.DATETIME_HUGE, u.DATETIME_HUGE_WITH_SECONDS = D.DATETIME_HUGE_WITH_SECONDS, u.DATETIME_MED = D.DATETIME_MED, u.DATETIME_MED_WITH_SECONDS = D.DATETIME_MED_WITH_SECONDS, u.DATETIME_MED_WITH_WEEKDAY = D.DATETIME_MED_WITH_WEEKDAY, u.DATETIME_SHORT = D.DATETIME_SHORT, u.DATETIME_SHORT_WITH_SECONDS = D.DATETIME_SHORT_WITH_SECONDS, u.DATE_FULL = D.DATE_FULL, u.DATE_HUGE = D.DATE_HUGE, u.DATE_MED = D.DATE_MED, u.DATE_MED_WITH_WEEKDAY = D.DATE_MED_WITH_WEEKDAY, u.DATE_SHORT = D.DATE_SHORT, u.TIME_24_SIMPLE = D.TIME_24_SIMPLE, u.TIME_24_WITH_LONG_OFFSET = D.TIME_24_WITH_LONG_OFFSET, u.TIME_24_WITH_SECONDS = D.TIME_24_WITH_SECONDS, u.TIME_24_WITH_SHORT_OFFSET = D.TIME_24_WITH_SHORT_OFFSET, u.TIME_SIMPLE = D.TIME_SIMPLE, u.TIME_WITH_LONG_OFFSET = D.TIME_WITH_LONG_OFFSET, u.TIME_WITH_SECONDS = D.TIME_WITH_SECONDS, u.TIME_WITH_SHORT_OFFSET = D.TIME_WITH_SHORT_OFFSET, u._zoneOffsetGuessCache = /* @__PURE__ */ new Map(), u;
              }()
            );
            n.DateTime = ae;
          }
        ),
        /***/
        "./src/duration.ts": (
          /*!*************************!*\
            !*** ./src/duration.ts ***!
            \*************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Duration = n.casualMatrix = n.lowOrderMatrix = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), k = s(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), N = s(
              /*! ./impl/formatter */
              "./src/impl/formatter.ts"
            ), I = s(
              /*! ./impl/regexParser */
              "./src/impl/regexParser.ts"
            ), U = s(
              /*! ./errors */
              "./src/errors.ts"
            ), C = s(
              /*! ./settings */
              "./src/settings.ts"
            ), M = s(
              /*! ./types/invalid */
              "./src/types/invalid.ts"
            ), h = s(
              /*! ./datetime */
              "./src/datetime.ts"
            );
            n.lowOrderMatrix = {
              weeks: {
                days: 7,
                hours: 168,
                minutes: 10080,
                seconds: 604800,
                milliseconds: 6048e5
              },
              days: {
                hours: 24,
                minutes: 1440,
                seconds: 86400,
                milliseconds: 864e5
              },
              hours: { minutes: 60, seconds: 3600, milliseconds: 36e5 },
              minutes: { seconds: 60, milliseconds: 6e4 },
              seconds: { milliseconds: 1e3 }
            }, n.casualMatrix = m.__assign({ years: {
              quarters: 4,
              months: 12,
              weeks: 52,
              days: 365,
              hours: 8760,
              minutes: 525600,
              seconds: 31536e3,
              milliseconds: 31536e6
            }, quarters: {
              months: 3,
              weeks: 13,
              days: 91,
              hours: 2184,
              minutes: 131040,
              seconds: 7862400,
              milliseconds: 78624e5
            }, months: {
              weeks: 4,
              days: 30,
              hours: 720,
              minutes: 43200,
              seconds: 2592e3,
              milliseconds: 2592e6
            } }, n.lowOrderMatrix);
            var T = 146097 / 400, E = 146097 / 4800, R = m.__assign({ years: {
              quarters: 4,
              months: 12,
              weeks: T / 7,
              days: T,
              hours: T * 24,
              minutes: T * 24 * 60,
              seconds: T * 24 * 60 * 60,
              milliseconds: T * 24 * 60 * 60 * 1e3
            }, quarters: {
              months: 3,
              weeks: T / 28,
              days: T / 4,
              hours: T * 24 / 4,
              minutes: T * 24 * 60 / 4,
              seconds: T * 24 * 60 * 60 / 4,
              milliseconds: T * 24 * 60 * 60 * 1e3 / 4
            }, months: {
              weeks: E / 7,
              days: E,
              hours: E * 24,
              minutes: E * 24 * 60,
              seconds: E * 24 * 60 * 60,
              milliseconds: E * 24 * 60 * 60 * 1e3
            } }, n.lowOrderMatrix);
            function S(w, b) {
              for (var P, O = (P = b.milliseconds) !== null && P !== void 0 ? P : 0, W = 0, j = d.REVERSE_ORDERED_UNITS.slice(1); W < j.length; W++) {
                var B = j[W];
                b[B] && (O += b[B] * w[B].milliseconds);
              }
              return O;
            }
            function y(w, b) {
              return w === void 0 || w === 0 ? b === void 0 || b === 0 : w === b;
            }
            function D(w, b) {
              var P = S(w, b) < 0 ? -1 : 1;
              d.REVERSE_ORDERED_UNITS.reduce(function(O, W) {
                if ((0, d.isUndefined)(b[W]))
                  return O;
                if (O) {
                  var j = b[O] * P, B = w[W][O], q = Math.floor(j / B);
                  b[W] += q * P, b[O] -= q * B * P;
                }
                return W;
              }, null), d.ORDERED_UNITS.reduce(function(O, W) {
                if ((0, d.isUndefined)(b[W]))
                  return O;
                if (O) {
                  var j = b[O] % 1;
                  b[O] -= j, b[W] += j * w[O][W];
                }
                return W;
              }, null);
            }
            function A(w) {
              return w === void 0 && (w = {}), Object.entries(w).reduce(function(b, P) {
                var O = P[0], W = P[1];
                return W !== 0 && (b[O] = W), b;
              }, {});
            }
            var Z = (
              /** @class */
              function() {
                function w(b) {
                  var P = b.conversionAccuracy === "longterm" || !1, O, W;
                  P ? (W = "longterm", O = R) : (W = "casual", O = n.casualMatrix), b.matrix && (O = b.matrix), this._values = b.values || {}, this._loc = b.loc || k.Locale.create(), this._conversionAccuracy = W, this._invalid = b.invalid || null, this._matrix = O, this._isLuxonDuration = !0;
                }
                return Object.defineProperty(w, "_INVALID", {
                  get: function() {
                    return "Invalid Duration";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "conversionAccuracy", {
                  /**
                   * Returns the conversion system to use
                   * @type {ConversionAccuracy}
                   */
                  get: function() {
                    return this._conversionAccuracy;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "days", {
                  /**
                   * Get the days.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.days || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "hours", {
                  /**
                   * Get the hours.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.hours || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "invalidExplanation", {
                  /**
                   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
                   * @type {string}
                   */
                  get: function() {
                    return this._invalid ? this._invalid.explanation : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "invalidReason", {
                  /**
                   * Returns an error code if this Duration became invalid, or null if the Duration is valid
                   * @return {string}
                   */
                  get: function() {
                    return this._invalid ? this._invalid.reason : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "isValid", {
                  /**
                   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
                   * on invalid DateTimes or Intervals.
                   * @return {boolean}
                   */
                  get: function() {
                    return this._invalid === null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "locale", {
                  /**
                   * Get  the locale of a Duration, such 'en-GB'
                   * @type {string}
                   */
                  get: function() {
                    return this.isValid ? this._loc.locale : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "matrix", {
                  /**
                   * Get the conversion matrix of a Duration
                   * @type {ConversionMatrix}
                   */
                  get: function() {
                    return this._matrix;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "milliseconds", {
                  /**
                   * Get the milliseconds.
                   * @return {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.milliseconds || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "minutes", {
                  /**
                   * Get the minutes.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.minutes || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "months", {
                  /**
                   * Get the months.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.months || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "numberingSystem", {
                  /**
                   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
                   *
                   * @type {NumberingSystem}
                   */
                  get: function() {
                    return this.isValid ? this._loc.numberingSystem : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "quarters", {
                  /**
                   * Get the quarters.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.quarters || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "seconds", {
                  /**
                   * Get the seconds.
                   * @return {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.seconds || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "weeks", {
                  /**
                   * Get the weeks
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.weeks || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(w.prototype, "years", {
                  /**
                   * Get the years.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.years || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), w.fromDurationLike = function(b) {
                  if ((0, d.isNumber)(b))
                    return w.fromMillis(b);
                  if (w.isDuration(b))
                    return b;
                  if (typeof b == "object")
                    return w.fromObject(b);
                  throw new U.InvalidArgumentError("Unknown duration argument ".concat(b, " of type ").concat(typeof b));
                }, w.fromISO = function(b, P) {
                  var O = (0, I.parseISODuration)(b)[0];
                  return O ? w.fromObject(O, P) : w.invalid("unparsable", 'the input "'.concat(b, `" can't be parsed as ISO 8601`));
                }, w.fromISOTime = function(b, P) {
                  P === void 0 && (P = {});
                  var O = (0, I.parseISOTimeOnly)(b)[0];
                  return O ? w.fromObject(O, P) : w.invalid("unparsable", 'the input "'.concat(b, `" can't be parsed as ISO 8601`));
                }, w.fromMillis = function(b, P) {
                  return P === void 0 && (P = {}), w.fromObject({ milliseconds: b }, P);
                }, w.fromObject = function(b, P) {
                  if (P === void 0 && (P = {}), b == null || typeof b != "object")
                    throw new U.InvalidArgumentError("Duration.fromObject: argument expected to be an object, got ".concat(b === null ? "null" : typeof b));
                  return new w({
                    values: (0, d.normalizeObject)(b, w.normalizeUnit),
                    loc: k.Locale.fromObject(P),
                    conversionAccuracy: P.conversionAccuracy,
                    matrix: P.matrix
                  });
                }, w.invalid = function(b, P) {
                  if (!b)
                    throw new U.InvalidArgumentError("need to specify a reason the Duration is invalid");
                  var O = b instanceof M.Invalid ? b : new M.Invalid(b, P);
                  if (C.Settings.throwOnInvalid)
                    throw new U.InvalidDurationError(O);
                  return new w({ invalid: O });
                }, w.isDuration = function(b) {
                  return !!b && b._isLuxonDuration || !1;
                }, w.normalizeUnit = function(b) {
                  var P = {
                    year: "years",
                    years: "years",
                    quarter: "quarters",
                    quarters: "quarters",
                    month: "months",
                    months: "months",
                    localWeekNumber: "localWeekNumbers",
                    localWeekYear: "localWeekYears",
                    localWeekday: "localWeekdays",
                    localWeekNumbers: "localWeekNumbers",
                    localWeekYears: "localWeekYears",
                    localWeekdays: "localWeekdays",
                    week: "weeks",
                    weeks: "weeks",
                    day: "days",
                    days: "days",
                    hour: "hours",
                    hours: "hours",
                    minute: "minutes",
                    minutes: "minutes",
                    second: "seconds",
                    seconds: "seconds",
                    millisecond: "milliseconds",
                    milliseconds: "milliseconds"
                  }[b];
                  if (!P)
                    throw new U.InvalidUnitError(b);
                  return P;
                }, w.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                  return this.isValid ? "Duration { values: ".concat(JSON.stringify(this._values), " }") : "Duration { Invalid, reason: ".concat(this.invalidReason, " }");
                }, w.prototype.as = function(b) {
                  return this.shiftTo(b).get(b);
                }, w.prototype.equals = function(b) {
                  if (!this.isValid || !b.isValid || !this._loc.equals(b._loc))
                    return !1;
                  for (var P = 0, O = d.ORDERED_UNITS; P < O.length; P++) {
                    var W = O[P];
                    if (!y(this._values[W], b._values[W]))
                      return !1;
                  }
                  return !0;
                }, w.prototype.get = function(b) {
                  return this[w.normalizeUnit(b)];
                }, w.prototype.getMaxUnit = function(b) {
                  b === void 0 && (b = !1);
                  var P = b ? d.HUMAN_ORDERED_UNITS : d.ORDERED_UNITS, O = this.shiftTo.apply(this, P).toObject();
                  return P.find(function(W) {
                    return (O[W] || 0) > 0;
                  }) || d.REVERSE_ORDERED_UNITS[0];
                }, w.prototype.mapUnits = function(b) {
                  var P = this;
                  if (!this.isValid)
                    return this;
                  var O = {};
                  return Object.keys(this._values).forEach(function(W) {
                    O[W] = (0, d.asNumber)(b(P._values[W], W));
                  }), this._clone(this, { values: O }, !0);
                }, w.prototype.minus = function(b) {
                  if (!this.isValid)
                    return this;
                  var P = w.fromDurationLike(b);
                  return this.plus(P.negate());
                }, w.prototype.negate = function() {
                  var b = this;
                  if (!this.isValid)
                    return this;
                  var P = {};
                  return Object.keys(this._values).forEach(function(O) {
                    P[O] = b._values[O] === 0 ? 0 : -b._values[O];
                  }), this._clone(this, { values: P }, !0);
                }, w.prototype.normalize = function() {
                  if (!this.isValid)
                    return this;
                  var b = this.toObject();
                  return D(this._matrix, b), this._clone(this, { values: b }, !0);
                }, w.prototype.plus = function(b) {
                  var P = this;
                  if (!this.isValid)
                    return this;
                  var O = w.fromDurationLike(b), W = {};
                  return d.ORDERED_UNITS.forEach(function(j) {
                    (O._values[j] !== void 0 || P._values[j] !== void 0) && (W[j] = O.get(j) + P.get(j));
                  }), this._clone(this, { values: W }, !0);
                }, w.prototype.reconfigure = function(b) {
                  var P = b === void 0 ? {} : b, O = P.locale, W = P.numberingSystem, j = P.conversionAccuracy, B = P.matrix, q = this._loc.clone({ locale: O, numberingSystem: W }), X = { loc: q, matrix: B, conversionAccuracy: j };
                  return this._clone(this, X);
                }, w.prototype.rescale = function() {
                  if (!this.isValid)
                    return this;
                  var b = A(this.normalize().shiftToAll().toObject());
                  return this._clone(this, { values: b }, !0);
                }, w.prototype.set = function(b) {
                  if (!this.isValid)
                    return this;
                  var P = m.__assign(m.__assign({}, this._values), (0, d.normalizeObject)(b, w.normalizeUnit));
                  return this._clone(this, { values: P });
                }, w.prototype.shiftTo = function() {
                  for (var b = this, P = [], O = 0; O < arguments.length; O++)
                    P[O] = arguments[O];
                  if (!this.isValid || P.length === 0)
                    return this;
                  P = P.map(function(X) {
                    return w.normalizeUnit(X);
                  });
                  var W = {}, j = {}, B = this.toObject(), q;
                  return d.ORDERED_UNITS.forEach(function(X) {
                    if (P.indexOf(X) >= 0) {
                      q = X;
                      var z = 0;
                      Object.keys(j).forEach(function(Y) {
                        z += b._matrix[Y][X] * j[Y], j[Y] = 0;
                      }), (0, d.isNumber)(B[X]) && (z += B[X]);
                      var L = Math.trunc(z);
                      W[X] = L, j[X] = (z * 1e3 - L * 1e3) / 1e3;
                    } else (0, d.isNumber)(B[X]) && (j[X] = B[X]);
                  }), Object.keys(j).forEach(function(X) {
                    var z = j[X];
                    z !== 0 && (W[q] += X === q ? z : z / b._matrix[q][X]);
                  }), this._clone(this, { values: W }, !0).normalize();
                }, w.prototype.shiftToAll = function() {
                  return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
                }, w.prototype.toFormat = function(b, P) {
                  P === void 0 && (P = { floor: !0 });
                  var O = m.__assign(m.__assign({}, P), { floor: P.round !== !1 && P.floor !== !1 });
                  return this.isValid ? N.Formatter.create(this._loc, O).formatDurationFromString(this, b) : w._INVALID;
                }, w.prototype.toHuman = function(b) {
                  var P = this;
                  if (b === void 0 && (b = {}), !this.isValid)
                    return w._INVALID;
                  var O = this.getMaxUnit(!0), W = b.onlyHumanUnits ? d.HUMAN_ORDERED_UNITS : d.ORDERED_UNITS, j = this.shiftTo.apply(this, W.slice(W.indexOf(O))), B = j.toObject(), q = W.map(function(z) {
                    var L = B[z];
                    return (0, d.isUndefined)(L) || L === 0 ? null : P._loc.numberFormatter(m.__assign(m.__assign({ style: "unit", unitDisplay: "long" }, b), { unit: z.slice(0, -1) })).format(L);
                  }).filter(function(z) {
                    return z;
                  }), X = m.__assign({ type: "conjunction", style: b.listStyle || "narrow" }, b);
                  return this._loc.listFormatter(X).format(q);
                }, w.prototype.toISO = function() {
                  if (!this.isValid)
                    return null;
                  var b = "P";
                  return this.years !== 0 && (b += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (b += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (b += this.weeks + "W"), this.days !== 0 && (b += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (b += "T"), this.hours !== 0 && (b += this.hours + "H"), this.minutes !== 0 && (b += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (b += (0, d.roundTo)(this.seconds + this.milliseconds / 1e3, 3) + "S"), b === "P" && (b += "T0S"), b;
                }, w.prototype.toISOTime = function(b) {
                  if (b === void 0 && (b = {}), !this.isValid)
                    return null;
                  var P = this.toMillis();
                  if (P < 0 || P >= 864e5)
                    return null;
                  b = m.__assign(m.__assign({ suppressMilliseconds: !1, suppressSeconds: !1, includePrefix: !1, format: "extended" }, b), { includeOffset: !1 });
                  var O = h.DateTime.fromMillis(P, { zone: "UTC" });
                  return O.toISOTime(b);
                }, w.prototype.toJSON = function() {
                  return this.toISO();
                }, w.prototype.toMillis = function() {
                  return this.isValid ? S(this.matrix, this._values) : NaN;
                }, w.prototype.toObject = function() {
                  return this.isValid ? m.__assign({}, this._values) : {};
                }, w.prototype.toString = function() {
                  return this.toISO();
                }, w.prototype.valueOf = function() {
                  return this.toMillis();
                }, w.prototype._clone = function(b, P, O) {
                  O === void 0 && (O = !1);
                  var W = {
                    values: O ? P.values : m.__assign(m.__assign({}, b._values), P.values || {}),
                    loc: b._loc.clone(P.loc),
                    conversionAccuracy: P.conversionAccuracy || b.conversionAccuracy,
                    matrix: P.matrix || b.matrix
                  };
                  return new w(W);
                }, w;
              }()
            );
            n.Duration = Z;
          }
        ),
        /***/
        "./src/errors.ts": (
          /*!***********************!*\
            !*** ./src/errors.ts ***!
            \***********************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.ZoneIsAbstractError = n.InvalidArgumentError = n.ConflictingSpecificationError = n.InvalidZoneError = n.InvalidUnitError = n.InvalidIntervalError = n.InvalidDurationError = n.InvalidDateTimeError = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R() {
                  return E !== null && E.apply(this, arguments) || this;
                }
                return R;
              }(Error)
            ), k = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  return E.call(this, "Invalid DateTime: ".concat(S.toMessage())) || this;
                }
                return R;
              }(d)
            );
            n.InvalidDateTimeError = k;
            var N = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  return E.call(this, "Invalid Duration: ".concat(S.toMessage())) || this;
                }
                return R;
              }(d)
            );
            n.InvalidDurationError = N;
            var I = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  return E.call(this, "Invalid Interval: ".concat(S.toMessage())) || this;
                }
                return R;
              }(d)
            );
            n.InvalidIntervalError = I;
            var U = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  var y = E.call(this, "Invalid unit ".concat(S)) || this;
                  return Object.setPrototypeOf(y, R.prototype), y;
                }
                return R;
              }(d)
            );
            n.InvalidUnitError = U;
            var C = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  var y = E.call(this, "".concat(S, " is an invalid or unknown zone specifier")) || this;
                  return Object.setPrototypeOf(y, R.prototype), y;
                }
                return R;
              }(d)
            );
            n.InvalidZoneError = C;
            var M = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  var y = E.call(this, S) || this;
                  return Object.setPrototypeOf(y, R.prototype), y;
                }
                return R;
              }(d)
            );
            n.ConflictingSpecificationError = M;
            var h = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R(S) {
                  var y = E.call(this, S) || this;
                  return Object.setPrototypeOf(y, R.prototype), y;
                }
                return R;
              }(d)
            );
            n.InvalidArgumentError = h;
            var T = (
              /** @class */
              function(E) {
                m.__extends(R, E);
                function R() {
                  var S = E.call(this, "Zone is an abstract class") || this;
                  return Object.setPrototypeOf(S, R.prototype), S;
                }
                return R;
              }(d)
            );
            n.ZoneIsAbstractError = T;
          }
        ),
        /***/
        "./src/impl/conversions.ts": (
          /*!*********************************!*\
            !*** ./src/impl/conversions.ts ***!
            \*********************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.usesLocalWeekValues = n.isoWeekdayToLocal = n.hasInvalidTimeData = n.hasInvalidGregorianData = n.hasInvalidOrdinalData = n.hasInvalidWeekData = n.ordinalToGregorian = n.gregorianToOrdinal = n.weekToGregorian = n.gregorianToWeek = n.dayOfWeek = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./util */
              "./src/impl/util.ts"
            ), k = s(
              /*! ../types/invalid */
              "./src/types/invalid.ts"
            ), N = s(
              /*! ../errors */
              "./src/errors.ts"
            ), I = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], U = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
            function C(O, W) {
              return new k.Invalid("unit out of range", "you specified ".concat(W, " (of type ").concat(typeof W, ") as a ").concat(O, ", which is invalid"));
            }
            function M(O, W, j) {
              return j + ((0, d.isLeapYear)(O) ? U : I)[W - 1];
            }
            function h(O, W) {
              var j = (0, d.isLeapYear)(O) ? U : I, B = j.findIndex(function(X) {
                return X < W;
              }), q = W - j[B];
              return { month: B + 1, day: q };
            }
            function T(O, W, j) {
              var B = new Date(Date.UTC(O, W - 1, j));
              O < 100 && O >= 0 && B.setUTCFullYear(B.getUTCFullYear() - 1900);
              var q = B.getUTCDay();
              return q === 0 ? 7 : q;
            }
            n.dayOfWeek = T;
            function E(O, W, j) {
              W === void 0 && (W = d.FALLBACK_WEEK_SETTINGS.minimalDays), j === void 0 && (j = d.FALLBACK_WEEK_SETTINGS.firstDay);
              var B = O.year, q = O.month, X = O.day, z = M(B, q, X), L = b(T(B, q, X), j), Y = Math.floor((z - L + 14 - W) / 7), V;
              return Y < 1 ? (V = B - 1, Y = (0, d.weeksInWeekYear)(V, W, j)) : Y > (0, d.weeksInWeekYear)(B, W, j) ? (V = B + 1, Y = 1) : V = B, m.__assign({ weekYear: V, weekNumber: Y, weekday: L }, (0, d.timeObject)(O));
            }
            n.gregorianToWeek = E;
            function R(O, W, j) {
              W === void 0 && (W = d.FALLBACK_WEEK_SETTINGS.minimalDays), j === void 0 && (j = d.FALLBACK_WEEK_SETTINGS.firstDay);
              var B = O.weekYear, q = O.weekNumber, X = O.weekday, z = b(T(B, 1, W), j), L = (0, d.daysInYear)(B), Y = q * 7 + X - z - 7 + W, V;
              Y < 1 ? (V = B - 1, Y += (0, d.daysInYear)(V)) : Y > L ? (V = B + 1, Y -= (0, d.daysInYear)(B)) : V = B;
              var ee = h(V, Y), ae = ee.month, u = ee.day;
              return m.__assign({ year: V, month: ae, day: u }, (0, d.timeObject)(O));
            }
            n.weekToGregorian = R;
            function S(O) {
              var W = O.year, j = O.month, B = O.day, q = M(W, j, B);
              return m.__assign({ year: W, ordinal: q }, (0, d.timeObject)(O));
            }
            n.gregorianToOrdinal = S;
            function y(O) {
              var W = O.year, j = O.ordinal, B = h(W, j), q = B.month, X = B.day;
              return m.__assign({ year: W, month: q, day: X }, (0, d.timeObject)(O));
            }
            n.ordinalToGregorian = y;
            function D(O, W, j) {
              W === void 0 && (W = 4), j === void 0 && (j = 1);
              var B = (0, d.isInteger)(O.weekYear), q = (0, d.integerBetween)(O.weekNumber, 1, (0, d.weeksInWeekYear)(O.weekYear, W, j)), X = (0, d.integerBetween)(O.weekday, 1, 7);
              if (B)
                if (q) {
                  if (!X)
                    return C("weekday", O.weekday);
                } else return C("week", O.weekNumber);
              else return C("weekYear", O.weekYear);
              return !1;
            }
            n.hasInvalidWeekData = D;
            function A(O) {
              var W = (0, d.isInteger)(O.year), j = (0, d.integerBetween)(O.ordinal, 1, (0, d.daysInYear)(O.year));
              if (W) {
                if (!j)
                  return C("ordinal", O.ordinal);
              } else return C("year", O.year);
              return !1;
            }
            n.hasInvalidOrdinalData = A;
            function Z(O) {
              var W = (0, d.isInteger)(O.year), j = (0, d.integerBetween)(O.month, 1, 12), B = (0, d.integerBetween)(O.day, 1, (0, d.daysInMonth)(O.year, O.month));
              if (W)
                if (j) {
                  if (!B)
                    return C("day", O.day);
                } else return C("month", O.month);
              else return C("year", O.year);
              return !1;
            }
            n.hasInvalidGregorianData = Z;
            function w(O) {
              var W = O.hour, j = O.minute, B = O.second, q = O.millisecond, X = (0, d.integerBetween)(W, 0, 23) || W === 24 && j === 0 && B === 0 && q === 0, z = (0, d.integerBetween)(j, 0, 59), L = (0, d.integerBetween)(B, 0, 59), Y = (0, d.integerBetween)(q, 0, 999);
              if (X)
                if (z)
                  if (L) {
                    if (!Y)
                      return C("millisecond", q);
                  } else return C("second", B);
                else return C("minute", j);
              else return C("hour", W);
              return !1;
            }
            n.hasInvalidTimeData = w;
            function b(O, W) {
              return (O - W + 7) % 7 + 1;
            }
            n.isoWeekdayToLocal = b;
            function P(O, W) {
              var j = (0, d.isDefined)(O.localWeekday) || (0, d.isDefined)(O.localWeekNumber) || (0, d.isDefined)(O.localWeekYear);
              if (j) {
                var B = (0, d.isDefined)(O.weekday) || (0, d.isDefined)(O.weekNumber) || (0, d.isDefined)(O.weekYear);
                if (B)
                  throw new N.ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
                return (0, d.isDefined)(O.localWeekday) && (O.weekday = O.localWeekday), (0, d.isDefined)(O.localWeekNumber) && (O.weekNumber = O.localWeekNumber), (0, d.isDefined)(O.localWeekYear) && (O.weekYear = O.localWeekYear), delete O.localWeekday, delete O.localWeekNumber, delete O.localWeekYear, {
                  minDaysInFirstWeek: W.getMinDaysInFirstWeek(),
                  startOfWeek: W.getStartOfWeek()
                };
              } else
                return { minDaysInFirstWeek: d.FALLBACK_WEEK_SETTINGS.minimalDays, startOfWeek: d.FALLBACK_WEEK_SETTINGS.firstDay };
            }
            n.usesLocalWeekValues = P;
          }
        ),
        /***/
        "./src/impl/diff.ts": (
          /*!**************************!*\
            !*** ./src/impl/diff.ts ***!
            \**************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.diff = void 0;
            var m = s(
              /*! ../duration */
              "./src/duration.ts"
            );
            function d(I, U) {
              var C = function(h) {
                return h.toUTC(0, { keepLocalTime: !0 }).startOf("days").valueOf();
              }, M = C(U) - C(I);
              return Math.floor(m.Duration.fromMillis(M).as("days"));
            }
            function k(I, U, C) {
              for (var M = [
                ["years", function(w, b) {
                  return b.year - w.year;
                }],
                ["quarters", function(w, b) {
                  return b.quarter - w.quarter + (b.year - w.year) * 4;
                }],
                ["months", function(w, b) {
                  return b.month - w.month + (b.year - w.year) * 12;
                }],
                [
                  "weeks",
                  function(w, b) {
                    var P = d(w, b);
                    return (P - P % 7) / 7;
                  }
                ],
                ["days", d]
              ], h = {}, T = I, E, R, S = 0, y = M; S < y.length; S++) {
                var D = y[S], A = D[0], Z = D[1];
                C.indexOf(A) >= 0 && (E = A, h[A] = Z(I, U), R = T.plus(h), R > U ? (h[A]--, I = T.plus(h), I > U && (R = I, h[A]--, I = T.plus(h))) : I = R);
              }
              return [I, h, R, E];
            }
            var N = function(I, U, C, M) {
              var h, T, E = k(I, U, C), R = E[0], S = E[1], y = E[2], D = E[3], A = +U - +R, Z = C.filter(function(b) {
                return ["hours", "minutes", "seconds", "milliseconds"].indexOf(b) >= 0;
              });
              Z.length === 0 && (y < U && (y = R.plus((h = {}, h[D] = 1, h))), y !== R && (S[D] = (S[D] || 0) + A / (+y - +R)));
              var w = m.Duration.fromObject(S, M);
              return Z.length > 0 ? (T = m.Duration.fromMillis(A, M)).shiftTo.apply(T, Z).plus(w) : w;
            };
            n.diff = N;
          }
        ),
        /***/
        "./src/impl/digits.ts": (
          /*!****************************!*\
            !*** ./src/impl/digits.ts ***!
            \****************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.digitRegex = n.resetDigitRegexCache = n.parseDigits = void 0;
            var s = {
              arab: "[٠-٩]",
              arabext: "[۰-۹]",
              bali: "[᭐-᭙]",
              beng: "[০-৯]",
              deva: "[०-९]",
              fullwide: "[０-９]",
              gujr: "[૦-૯]",
              hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
              khmr: "[០-៩]",
              knda: "[೦-೯]",
              laoo: "[໐-໙]",
              limb: "[᥆-᥏]",
              mlym: "[൦-൯]",
              mong: "[᠐-᠙]",
              mymr: "[၀-၉]",
              orya: "[୦-୯]",
              tamldec: "[௦-௯]",
              telu: "[౦-౯]",
              thai: "[๐-๙]",
              tibt: "[༠-༩]",
              latn: "\\d"
            }, m = {
              arab: [1632, 1641],
              arabext: [1776, 1785],
              bali: [6992, 7001],
              beng: [2534, 2543],
              deva: [2406, 2415],
              fullwide: [65296, 65303],
              gujr: [2790, 2799],
              khmr: [6112, 6121],
              knda: [3302, 3311],
              laoo: [3792, 3801],
              limb: [6470, 6479],
              mlym: [3430, 3439],
              mong: [6160, 6169],
              mymr: [4160, 4169],
              orya: [2918, 2927],
              tamldec: [3046, 3055],
              telu: [3174, 3183],
              thai: [3664, 3673],
              tibt: [3872, 3881]
            }, d = s.hanidec.replace(/[\[|\]]/g, "").split("");
            function k(C) {
              var M = parseInt(C, 10);
              if (!isNaN(M))
                return M;
              for (var h = "", T = 0; T < C.length; T++) {
                var E = C.charCodeAt(T);
                if (C[T].search(s.hanidec) !== -1)
                  h += d.indexOf(C[T]);
                else
                  for (var R in m) {
                    var S = m[R], y = S[0], D = S[1];
                    if (E >= y && E <= D) {
                      h += E - y;
                      break;
                    }
                  }
              }
              return parseInt(h, 10);
            }
            n.parseDigits = k;
            var N = {};
            function I() {
              N = {};
            }
            n.resetDigitRegexCache = I;
            function U(C, M) {
              var h = C.numberingSystem;
              M === void 0 && (M = "");
              var T = h || "latn";
              return N[T] || (N[T] = {}), N[T][M] || (N[T][M] = new RegExp("".concat(s[T]).concat(M))), N[T][M];
            }
            n.digitRegex = U;
          }
        ),
        /***/
        "./src/impl/english.ts": (
          /*!*****************************!*\
            !*** ./src/impl/english.ts ***!
            \*****************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.formatString = n.formatRelativeTime = n.eraForDateTime = n.monthForDateTime = n.weekdayForDateTime = n.meridiemForDateTime = n.eras = n.erasNarrow = n.erasShort = n.erasLong = n.meridiems = n.weekdays = n.weekdaysNarrow = n.weekdaysShort = n.weekdaysLong = n.months = n.monthsNarrow = n.monthsShort = n.monthsLong = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = m.__importStar(s(
              /*! ./formats */
              "./src/impl/formats.ts"
            )), k = s(
              /*! ./util */
              "./src/impl/util.ts"
            ), N = s(
              /*! ../duration */
              "./src/duration.ts"
            );
            function I(D) {
              return JSON.stringify(D, Object.keys(D).sort());
            }
            n.monthsLong = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ], n.monthsShort = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ], n.monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
            function U(D) {
              switch (D) {
                case "narrow":
                  return m.__spreadArray([], n.monthsNarrow, !0);
                case "short":
                  return m.__spreadArray([], n.monthsShort, !0);
                case "long":
                  return m.__spreadArray([], n.monthsLong, !0);
                case "numeric":
                  return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
                case "2-digit":
                  return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
              }
            }
            n.months = U, n.weekdaysLong = [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ], n.weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], n.weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
            function C(D) {
              switch (D) {
                case "narrow":
                  return m.__spreadArray([], n.weekdaysNarrow, !0);
                case "short":
                  return m.__spreadArray([], n.weekdaysShort, !0);
                case "long":
                  return m.__spreadArray([], n.weekdaysLong, !0);
                case "numeric":
                  return ["1", "2", "3", "4", "5", "6", "7"];
              }
            }
            n.weekdays = C, n.meridiems = ["AM", "PM"], n.erasLong = ["Before Christ", "Anno Domini"], n.erasShort = ["BC", "AD"], n.erasNarrow = ["B", "A"];
            function M(D) {
              switch (D) {
                case "narrow":
                  return m.__spreadArray([], n.erasNarrow, !0);
                case "short":
                  return m.__spreadArray([], n.erasShort, !0);
                case "long":
                  return m.__spreadArray([], n.erasLong, !0);
              }
            }
            n.eras = M;
            function h(D) {
              return n.meridiems[D.hour < 12 ? 0 : 1];
            }
            n.meridiemForDateTime = h;
            function T(D, A) {
              return C(A)[D.weekday - 1];
            }
            n.weekdayForDateTime = T;
            function E(D, A) {
              return U(A)[D.month - 1];
            }
            n.monthForDateTime = E;
            function R(D, A) {
              return M(A)[D.year < 0 ? 0 : 1];
            }
            n.eraForDateTime = R;
            function S(D, A, Z, w) {
              Z === void 0 && (Z = "always"), w === void 0 && (w = !1);
              var b = {
                years: ["year", "yr."],
                quarters: ["quarter", "qtr."],
                months: ["month", "mo."],
                weeks: ["week", "wk."],
                days: ["day", "day", "days"],
                hours: ["hour", "hr."],
                minutes: ["minute", "min."],
                seconds: ["second", "sec."],
                milliseconds: []
                // never used
              }, P = N.Duration.normalizeUnit(D), O = b[P], W = ["hours", "minutes", "seconds"].indexOf(P) === -1;
              if (Z === "auto" && W) {
                var j = P === "days";
                switch (A) {
                  case 1:
                    return j ? "tomorrow" : "next ".concat(O[0]);
                  case -1:
                    return j ? "yesterday" : "last ".concat(O[0]);
                  case 0:
                    return j ? "today" : "this ".concat(O[0]);
                }
              }
              var B = Object.is(A, -0) || A < 0, q = Math.abs(A), X = q === 1, z = w ? X ? O[1] : O[2] || O[1] : X ? O[0] : P;
              return B ? "".concat(q, " ").concat(z, " ago") : "in ".concat(q, " ").concat(z);
            }
            n.formatRelativeTime = S;
            function y(D) {
              var A = (0, k.pick)(D, [
                "weekday",
                "era",
                "year",
                "month",
                "day",
                "hour",
                "minute",
                "second",
                "timeZoneName",
                "hourCycle"
              ]), Z = I(A), w = "EEEE, LLLL d, yyyy, h:mm a";
              switch (Z) {
                case I(d.DATE_SHORT):
                  return "M/d/yyyy";
                case I(d.DATE_MED):
                  return "LLL d, yyyy";
                case I(d.DATE_MED_WITH_WEEKDAY):
                  return "EEE, LLL d, yyyy";
                case I(d.DATE_FULL):
                  return "LLLL d, yyyy";
                case I(d.DATE_HUGE):
                  return "EEEE, LLLL d, yyyy";
                case I(d.TIME_SIMPLE):
                  return "h:mm a";
                case I(d.TIME_WITH_SECONDS):
                  return "h:mm:ss a";
                case I(d.TIME_WITH_SHORT_OFFSET):
                  return "h:mm a";
                case I(d.TIME_WITH_LONG_OFFSET):
                  return "h:mm a";
                case I(d.TIME_24_SIMPLE):
                  return "HH:mm";
                case I(d.TIME_24_WITH_SECONDS):
                  return "HH:mm:ss";
                case I(d.TIME_24_WITH_SHORT_OFFSET):
                  return "HH:mm";
                case I(d.TIME_24_WITH_LONG_OFFSET):
                  return "HH:mm";
                case I(d.DATETIME_SHORT):
                  return "M/d/yyyy, h:mm a";
                case I(d.DATETIME_MED):
                  return "LLL d, yyyy, h:mm a";
                case I(d.DATETIME_FULL):
                  return "LLLL d, yyyy, h:mm a";
                case I(d.DATETIME_HUGE):
                  return w;
                case I(d.DATETIME_SHORT_WITH_SECONDS):
                  return "M/d/yyyy, h:mm:ss a";
                case I(d.DATETIME_MED_WITH_SECONDS):
                  return "LLL d, yyyy, h:mm:ss a";
                case I(d.DATETIME_MED_WITH_WEEKDAY):
                  return "EEE, d LLL yyyy, h:mm a";
                case I(d.DATETIME_FULL_WITH_SECONDS):
                  return "LLLL d, yyyy, h:mm:ss a";
                case I(d.DATETIME_HUGE_WITH_SECONDS):
                  return "EEEE, LLLL d, yyyy, h:mm:ss a";
                default:
                  return w;
              }
            }
            n.formatString = y;
          }
        ),
        /***/
        "./src/impl/formats.ts": (
          /*!*****************************!*\
            !*** ./src/impl/formats.ts ***!
            \*****************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.DATETIME_HUGE_WITH_SECONDS = n.DATETIME_HUGE = n.DATETIME_FULL_WITH_SECONDS = n.DATETIME_FULL = n.DATETIME_MED_WITH_WEEKDAY = n.DATETIME_MED_WITH_SECONDS = n.DATETIME_MED = n.DATETIME_SHORT_WITH_SECONDS = n.DATETIME_SHORT = n.TIME_24_WITH_LONG_OFFSET = n.TIME_24_WITH_SHORT_OFFSET = n.TIME_24_WITH_SECONDS = n.TIME_24_SIMPLE = n.TIME_WITH_LONG_OFFSET = n.TIME_WITH_SHORT_OFFSET = n.TIME_WITH_SECONDS = n.TIME_SIMPLE = n.DATE_HUGE = n.DATE_FULL = n.DATE_MED_WITH_WEEKDAY = n.DATE_MED = n.DATE_SHORT = void 0;
            var s = "numeric", m = "short", d = "long";
            n.DATE_SHORT = {
              year: s,
              month: s,
              day: s
            }, n.DATE_MED = {
              year: s,
              month: m,
              day: s
            }, n.DATE_MED_WITH_WEEKDAY = {
              year: s,
              month: m,
              day: s,
              weekday: m
            }, n.DATE_FULL = {
              year: s,
              month: d,
              day: s
            }, n.DATE_HUGE = {
              year: s,
              month: d,
              day: s,
              weekday: d
            }, n.TIME_SIMPLE = {
              hour: s,
              minute: s
            }, n.TIME_WITH_SECONDS = {
              hour: s,
              minute: s,
              second: s
            }, n.TIME_WITH_SHORT_OFFSET = {
              hour: s,
              minute: s,
              second: s,
              timeZoneName: m
            }, n.TIME_WITH_LONG_OFFSET = {
              hour: s,
              minute: s,
              second: s,
              timeZoneName: d
            }, n.TIME_24_SIMPLE = {
              hour: s,
              minute: s,
              hourCycle: "h23"
            }, n.TIME_24_WITH_SECONDS = {
              hour: s,
              minute: s,
              second: s,
              hourCycle: "h23"
            }, n.TIME_24_WITH_SHORT_OFFSET = {
              hour: s,
              minute: s,
              second: s,
              hourCycle: "h23",
              timeZoneName: m
            }, n.TIME_24_WITH_LONG_OFFSET = {
              hour: s,
              minute: s,
              second: s,
              hourCycle: "h23",
              timeZoneName: d
            }, n.DATETIME_SHORT = {
              year: s,
              month: s,
              day: s,
              hour: s,
              minute: s
            }, n.DATETIME_SHORT_WITH_SECONDS = {
              year: s,
              month: s,
              day: s,
              hour: s,
              minute: s,
              second: s
            }, n.DATETIME_MED = {
              year: s,
              month: m,
              day: s,
              hour: s,
              minute: s
            }, n.DATETIME_MED_WITH_SECONDS = {
              year: s,
              month: m,
              day: s,
              hour: s,
              minute: s,
              second: s
            }, n.DATETIME_MED_WITH_WEEKDAY = {
              year: s,
              month: m,
              day: s,
              weekday: m,
              hour: s,
              minute: s
            }, n.DATETIME_FULL = {
              year: s,
              month: d,
              day: s,
              hour: s,
              minute: s,
              timeZoneName: m
            }, n.DATETIME_FULL_WITH_SECONDS = {
              year: s,
              month: d,
              day: s,
              hour: s,
              minute: s,
              second: s,
              timeZoneName: m
            }, n.DATETIME_HUGE = {
              year: s,
              month: d,
              day: s,
              weekday: d,
              hour: s,
              minute: s,
              timeZoneName: d
            }, n.DATETIME_HUGE_WITH_SECONDS = {
              year: s,
              month: d,
              day: s,
              weekday: d,
              hour: s,
              minute: s,
              second: s,
              timeZoneName: d
            };
          }
        ),
        /***/
        "./src/impl/formatter.ts": (
          /*!*******************************!*\
            !*** ./src/impl/formatter.ts ***!
            \*******************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Formatter = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = m.__importStar(s(
              /*! ./english */
              "./src/impl/english.ts"
            )), k = m.__importStar(s(
              /*! ./formats */
              "./src/impl/formats.ts"
            )), N = s(
              /*! ./util */
              "./src/impl/util.ts"
            );
            function I(M, h) {
              for (var T = "", E = 0, R = M; E < R.length; E++) {
                var S = R[E];
                S.literal ? T += S.val : T += h(S.val);
              }
              return T;
            }
            var U = {
              /* eslint-disable @typescript-eslint/naming-convention */
              D: k.DATE_SHORT,
              DD: k.DATE_MED,
              DDD: k.DATE_FULL,
              DDDD: k.DATE_HUGE,
              t: k.TIME_SIMPLE,
              tt: k.TIME_WITH_SECONDS,
              ttt: k.TIME_WITH_SHORT_OFFSET,
              tttt: k.TIME_WITH_LONG_OFFSET,
              T: k.TIME_24_SIMPLE,
              TT: k.TIME_24_WITH_SECONDS,
              TTT: k.TIME_24_WITH_SHORT_OFFSET,
              TTTT: k.TIME_24_WITH_LONG_OFFSET,
              f: k.DATETIME_SHORT,
              ff: k.DATETIME_MED,
              fff: k.DATETIME_FULL,
              ffff: k.DATETIME_HUGE,
              F: k.DATETIME_SHORT_WITH_SECONDS,
              FF: k.DATETIME_MED_WITH_SECONDS,
              FFF: k.DATETIME_FULL_WITH_SECONDS,
              FFFF: k.DATETIME_HUGE_WITH_SECONDS
              /* eslint-enable @typescript-eslint/naming-convention */
            }, C = (
              /** @class */
              function() {
                function M(h, T) {
                  this._opts = T, this._loc = h, this._systemLoc = void 0;
                }
                return M.create = function(h, T) {
                  return T === void 0 && (T = {}), new M(h, T);
                }, M.macroTokenToFormatOpts = function(h) {
                  return U[h];
                }, M.parseFormat = function(h) {
                  for (var T = null, E = "", R = !1, S = [], y = 0; y < h.length; y++) {
                    var D = h.charAt(y);
                    D === "'" ? (E.length > 0 && S.push({ literal: R || /^\s+$/.test(E), val: E }), T = null, E = "", R = !R) : R || D === T ? E += D : (E.length > 0 && S.push({ literal: /^\s+$/.test(E), val: E }), E = D, T = D);
                  }
                  return E.length > 0 && S.push({ literal: R || /^\s+$/.test(E), val: E }), S;
                }, M.prototype.dtFormatter = function(h, T) {
                  return T === void 0 && (T = {}), this._loc.dtFormatter(h, m.__assign(m.__assign({}, this._opts), T));
                }, M.prototype.formatDateTime = function(h, T) {
                  return this.dtFormatter(h, T).format();
                }, M.prototype.formatDateTimeFromString = function(h, T) {
                  var E = this, R = this._loc.listingMode() === "en", S = this._loc.outputCalendar && this._loc.outputCalendar !== "gregory", y = function(W, j) {
                    return E._loc.extract(h, W, j);
                  }, D = function(W) {
                    return h.isOffsetFixed && h.offset === 0 && W.allowZ ? "Z" : h.isValid ? h.zone.formatOffset(h.ts, W.format) : "";
                  }, A = function() {
                    return R ? d.meridiemForDateTime(h) : y({ hour: "numeric", hourCycle: "h12" }, "dayPeriod");
                  }, Z = function(W, j) {
                    return R ? d.monthForDateTime(h, W) : y(j ? { month: W } : { month: W, day: "numeric" }, "month");
                  }, w = function(W, j) {
                    return R ? d.weekdayForDateTime(h, W) : y(j ? { weekday: W } : { weekday: W, month: "long", day: "numeric" }, "weekday");
                  }, b = function(W) {
                    var j = M.macroTokenToFormatOpts(W);
                    return j ? E.formatWithSystemDefault(h, j) : W;
                  }, P = function(W) {
                    return R ? d.eraForDateTime(h, W) : y({ era: W }, "era");
                  }, O = function(W) {
                    switch (W) {
                      case "S":
                        return E.num(h.millisecond);
                      case "u":
                      case "SSS":
                        return E.num(h.millisecond, 3);
                      case "s":
                        return E.num(h.second);
                      case "ss":
                        return E.num(h.second, 2);
                      case "uu":
                        return E.num(Math.floor(h.millisecond / 10), 2);
                      case "uuu":
                        return E.num(Math.floor(h.millisecond / 100));
                      case "m":
                        return E.num(h.minute);
                      case "mm":
                        return E.num(h.minute, 2);
                      case "h":
                        return E.num(h.hour % 12 === 0 ? 12 : h.hour % 12);
                      case "hh":
                        return E.num(h.hour % 12 === 0 ? 12 : h.hour % 12, 2);
                      case "H":
                        return E.num(h.hour);
                      case "HH":
                        return E.num(h.hour, 2);
                      case "Z":
                        return D({ format: "narrow", allowZ: E._opts.allowZ });
                      case "ZZ":
                        return D({ format: "short", allowZ: E._opts.allowZ });
                      case "ZZZ":
                        return D({ format: "techie", allowZ: E._opts.allowZ });
                      case "ZZZZ":
                        return h.zone.offsetName(h.ts, { format: "short", locale: E._loc.locale }) || "";
                      case "ZZZZZ":
                        return h.zone.offsetName(h.ts, { format: "long", locale: E._loc.locale }) || "";
                      case "z":
                        return h.zoneName || "";
                      case "a":
                        return A();
                      case "d":
                        return S ? y({ day: "numeric" }, "day") : E.num(h.day);
                      case "dd":
                        return S ? y({ day: "2-digit" }, "day") : E.num(h.day, 2);
                      case "c":
                        return E.num(h.weekday);
                      case "ccc":
                        return w("short", !0);
                      case "cccc":
                        return w("long", !0);
                      case "ccccc":
                        return w("narrow", !0);
                      case "E":
                        return E.num(h.weekday);
                      case "EEE":
                        return w("short", !1);
                      case "EEEE":
                        return w("long", !1);
                      case "EEEEE":
                        return w("narrow", !1);
                      case "L":
                        return S ? y({ month: "numeric", day: "numeric" }, "month") : E.num(h.month);
                      case "LL":
                        return S ? y({ month: "2-digit", day: "numeric" }, "month") : E.num(h.month, 2);
                      case "LLL":
                        return Z("short", !0);
                      case "LLLL":
                        return Z("long", !0);
                      case "LLLLL":
                        return Z("narrow", !0);
                      case "M":
                        return S ? y({ month: "numeric" }, "month") : E.num(h.month);
                      case "MM":
                        return S ? y({ month: "2-digit" }, "month") : E.num(h.month, 2);
                      case "MMM":
                        return Z("short", !1);
                      case "MMMM":
                        return Z("long", !1);
                      case "MMMMM":
                        return Z("narrow", !1);
                      case "y":
                        return S ? y({ year: "numeric" }, "year") : E.num(h.year);
                      case "yy":
                        return S ? y({ year: "2-digit" }, "year") : E.num(parseInt(h.year.toString().slice(-2), 10), 2);
                      case "yyyy":
                        return S ? y({ year: "numeric" }, "year") : E.num(h.year, 4);
                      case "yyyyyy":
                        return S ? y({ year: "numeric" }, "year") : E.num(h.year, 6);
                      case "G":
                        return P("short");
                      case "GG":
                        return P("long");
                      case "GGGGG":
                        return P("narrow");
                      case "kk":
                        return E.num(parseInt(h.weekYear.toString().slice(-2), 10), 2);
                      case "kkkk":
                        return E.num(h.weekYear, 4);
                      case "W":
                        return E.num(h.weekNumber);
                      case "WW":
                        return E.num(h.weekNumber, 2);
                      case "o":
                        return E.num(h.ordinal);
                      case "ooo":
                        return E.num(h.ordinal, 3);
                      case "q":
                        return E.num(h.quarter);
                      case "qq":
                        return E.num(h.quarter, 2);
                      case "X":
                        return E.num(Math.floor(h.ts / 1e3));
                      case "x":
                        return E.num(h.ts);
                      default:
                        return b(W);
                    }
                  };
                  return I(M.parseFormat(T), O);
                }, M.prototype.formatDateTimeParts = function(h, T) {
                  return this.dtFormatter(h, T).formatToParts();
                }, M.prototype.formatDurationFromString = function(h, T) {
                  var E = this, R = function(Z) {
                    switch (Z[0]) {
                      case "S":
                        return "milliseconds";
                      case "s":
                        return "seconds";
                      case "m":
                        return "minutes";
                      case "h":
                        return "hours";
                      case "d":
                        return "days";
                      case "M":
                        return "months";
                      case "y":
                        return "years";
                      default:
                        return;
                    }
                  }, S = function(Z) {
                    return function(w) {
                      var b = R(w);
                      return b ? E.num(Z.get(b), w.length) : w;
                    };
                  }, y = M.parseFormat(T), D = y.reduce(function(Z, w) {
                    var b = w.literal, P = w.val;
                    return b ? Z : Z.concat(P);
                  }, []), A = h.shiftTo.apply(h, D.map(R).filter(function(Z) {
                    return !!Z;
                  }));
                  return I(y, S(A));
                }, M.prototype.formatInterval = function(h, T) {
                  if (T === void 0 && (T = {}), !h.isValid)
                    throw Error("Invalid Interval provided!");
                  var E = this.dtFormatter(h.start, T);
                  return E.dtf.formatRange(h.start.toJSDate(), h.end.toJSDate());
                }, M.prototype.formatWithSystemDefault = function(h, T) {
                  this._systemLoc === void 0 && (this._systemLoc = this._loc.redefaultToSystem());
                  var E = this._systemLoc.dtFormatter(h, m.__assign(m.__assign({}, this._opts), T));
                  return E.format();
                }, M.prototype.num = function(h, T) {
                  if (T === void 0 && (T = 0), this._opts.forceSimple)
                    return (0, N.padStart)(h, T);
                  var E = m.__assign({}, this._opts);
                  return T > 0 && (E.padTo = T), this._loc.numberFormatter(E).format(h);
                }, M.prototype.resolvedOptions = function(h, T) {
                  return T === void 0 && (T = {}), this.dtFormatter(h, T).resolvedOptions();
                }, M;
              }()
            );
            n.Formatter = C;
          }
        ),
        /***/
        "./src/impl/locale.ts": (
          /*!****************************!*\
            !*** ./src/impl/locale.ts ***!
            \****************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Locale = n.PolyDateFormatter = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./util */
              "./src/impl/util.ts"
            ), k = m.__importStar(s(
              /*! ./english */
              "./src/impl/english.ts"
            )), N = s(
              /*! ../settings */
              "./src/settings.ts"
            ), I = s(
              /*! ../datetime */
              "./src/datetime.ts"
            ), U = s(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), C = m.__importDefault(s(
              /*! ../types/intl-next */
              "./src/types/intl-next.ts"
            )), M = {};
            function h(z, L) {
              L === void 0 && (L = {});
              var Y = JSON.stringify([z, L]), V = M[Y];
              return V || (V = new C.default.ListFormat(z, L), M[Y] = V), V;
            }
            var T = {};
            function E(z, L) {
              L === void 0 && (L = {});
              var Y = JSON.stringify([z, L]), V = T[Y];
              return V || (V = new C.default.DateTimeFormat(z, L), T[Y] = V), V;
            }
            var R = {};
            function S(z, L) {
              var Y = JSON.stringify([z, L]), V = R[Y];
              return V || (V = new C.default.NumberFormat(z, L), R[Y] = V), V;
            }
            var y = {};
            function D(z, L) {
              L === void 0 && (L = {});
              var Y = JSON.stringify([z, L]), V = y[Y];
              return V || (V = new C.default.RelativeTimeFormat(z, L), y[Y] = V), V;
            }
            var A;
            function Z() {
              return A || (A = new C.default.DateTimeFormat().resolvedOptions().locale), A;
            }
            function w(z) {
              var L = z.indexOf("-x-");
              L !== -1 && (z = z.substring(0, L));
              var Y = z.indexOf("-u-");
              if (Y === -1)
                return [z];
              var V = void 0, ee = void 0;
              try {
                V = E(z).resolvedOptions(), ee = z;
              } catch {
                var ae = z.substring(0, Y);
                V = E(ae).resolvedOptions(), ee = ae;
              }
              var u = V.numberingSystem, a = V.calendar;
              return [ee, u, a];
            }
            function b(z, L, Y) {
              return (Y || L) && (z.includes("-u-") || (z += "-u"), Y && (z += "-ca-".concat(Y)), L && (z += "-nu-".concat(L))), z;
            }
            function P(z) {
              for (var L = [], Y = 1; Y <= 12; Y++) {
                var V = I.DateTime.utc(2009, Y, 1);
                L.push(z(V));
              }
              return L;
            }
            function O(z) {
              for (var L = [], Y = 1; Y <= 7; Y++) {
                var V = I.DateTime.utc(2016, 11, 13 + Y);
                L.push(z(V));
              }
              return L;
            }
            function W(z, L, Y, V) {
              var ee = z.listingMode();
              return ee === "en" ? Y(L) : V(L);
            }
            var j = (
              /** @class */
              function() {
                function z(L, Y, V) {
                  var ee = V.padTo, ae = V.floor, u = m.__rest(V, ["padTo", "floor"]);
                  if (this._padTo = ee || 0, this._floor = ae || !1, !Y || Object.keys(u).length > 0) {
                    var a = m.__assign({ useGrouping: !1 }, V);
                    this._padTo > 0 && (a.minimumIntegerDigits = ee), this._inf = S(L, a);
                  }
                }
                return z.prototype.format = function(L) {
                  if (this._inf) {
                    var Y = this._floor ? Math.floor(L) : L;
                    return this._inf.format(Y);
                  } else {
                    var Y = this._floor ? Math.floor(L) : (0, d.roundTo)(L, 3);
                    return (0, d.padStart)(Y, this._padTo);
                  }
                }, z;
              }()
            ), B = (
              /** @class */
              function() {
                function z(L, Y, V) {
                  this._opts = V;
                  var ee;
                  if (this._opts.timeZone)
                    this._dt = L;
                  else if (L.zone.type === "fixed") {
                    var ae = -1 * (L.offset / 60), u = ae >= 0 ? "Etc/GMT+".concat(ae) : "Etc/GMT".concat(ae);
                    L.offset !== 0 && U.IANAZone.create(u).isValid ? (ee = u, this._dt = L) : (ee = "UTC", this._dt = L.offset === 0 ? L : L.setZone("UTC").plus({ minutes: L.offset }), this._originalZone = L.zone);
                  } else L.zone.type === "system" ? this._dt = L : L.zone.type === "iana" ? (this._dt = L, ee = L.zone.name) : (ee = "UTC", this._dt = L.setZone("UTC").plus({ minutes: L.offset }), this._originalZone = L.zone);
                  var a = m.__assign(m.__assign({}, this._opts), { timeZone: this._opts.timeZone || ee });
                  this._dtf = E(Y, a);
                }
                return Object.defineProperty(z.prototype, "dtf", {
                  get: function() {
                    return this._dtf;
                  },
                  enumerable: !1,
                  configurable: !0
                }), z.prototype.format = function() {
                  return this._originalZone ? this.formatToParts().map(function(L) {
                    var Y = L.value;
                    return Y;
                  }).join("") : this.dtf.format(this._dt.toJSDate());
                }, z.prototype.formatToParts = function() {
                  var L = this, Y = this.dtf.formatToParts(this._dt.toJSDate());
                  return this._originalZone ? Y.map(function(V) {
                    if (V.type === "timeZoneName") {
                      var ee = L._originalZone.offsetName(L._dt.ts, {
                        locale: L._dt.locale,
                        format: L._opts.timeZoneName
                      });
                      return m.__assign(m.__assign({}, V), {
                        // tslint:disable-next-line:no-non-null-assertion
                        value: ee
                      });
                    } else
                      return V;
                  }) : Y;
                }, z.prototype.resolvedOptions = function() {
                  return this._dtf.resolvedOptions();
                }, z;
              }()
            );
            n.PolyDateFormatter = B;
            var q = (
              /** @class */
              function() {
                function z(L, Y, V) {
                  this._opts = m.__assign({ style: "long" }, V), !Y && (0, d.hasRelative)() && (this._rtf = D(L, V));
                }
                return z.prototype.format = function(L, Y) {
                  return this._rtf ? this._rtf.format(L, Y) : k.formatRelativeTime(Y, L, this._opts.numeric, this._opts.style !== "long");
                }, z.prototype.formatToParts = function(L, Y) {
                  return this._rtf ? this._rtf.formatToParts(L, Y) : [];
                }, z;
              }()
            ), X = (
              /** @class */
              function() {
                function z(L, Y, V, ee, ae) {
                  var u = w(L), a = u[0], o = u[1], c = u[2];
                  this.locale = a, this.numberingSystem = Y || o, this.outputCalendar = V || c, this._intl = b(this.locale, this.numberingSystem, this.outputCalendar), this._weekSettings = ee, this._weekdaysCache = { format: {}, standalone: {} }, this._monthsCache = { format: {}, standalone: {} }, this._meridiemCache = void 0, this._eraCache = {}, this._specifiedLocale = ae, this._fastNumbersCached = void 0;
                }
                return Object.defineProperty(z.prototype, "fastNumbers", {
                  get: function() {
                    return this._fastNumbersCached === void 0 && (this._fastNumbersCached = this._supportsFastNumbers()), this._fastNumbersCached;
                  },
                  enumerable: !1,
                  configurable: !0
                }), z.create = function(L, Y, V, ee, ae) {
                  ae === void 0 && (ae = !1);
                  var u = L || N.Settings.defaultLocale, a = u || (ae ? "en-US" : Z()), o = Y || N.Settings.defaultNumberingSystem, c = V || N.Settings.defaultOutputCalendar, g = (0, d.validateWeekSettings)(ee) || N.Settings.defaultWeekSettings;
                  return new z(a, o, c, g, u);
                }, z.fromObject = function(L) {
                  var Y = L === void 0 ? {} : L, V = Y.locale, ee = Y.numberingSystem, ae = Y.outputCalendar, u = Y.weekSettings;
                  return z.create(V, ee, ae, u);
                }, z.fromOpts = function(L) {
                  return z.create(L.locale, L.numberingSystem, L.outputCalendar, L.weekSettings, L.defaultToEN);
                }, z.resetCache = function() {
                  A = void 0, M = {}, T = {}, R = {}, y = {};
                }, z.prototype.clone = function(L) {
                  return !L || Object.getOwnPropertyNames(L).length === 0 ? this : z.create(L.locale || this._specifiedLocale, L.numberingSystem || this.numberingSystem, L.outputCalendar || this.outputCalendar, (0, d.validateWeekSettings)(L.weekSettings) || this._weekSettings, L.defaultToEN || !1);
                }, z.prototype.dtFormatter = function(L, Y) {
                  return Y === void 0 && (Y = {}), new B(L, this._intl, Y);
                }, z.prototype.equals = function(L) {
                  return this.locale === L.locale && this.numberingSystem === L.numberingSystem && this.outputCalendar === L.outputCalendar;
                }, z.prototype.eras = function(L) {
                  var Y = this;
                  return W(this, L, k.eras, function(V) {
                    var ee = { era: V };
                    return Y._eraCache[V] || (Y._eraCache[V] = [I.DateTime.utc(-40, 1, 1), I.DateTime.utc(2017, 1, 1)].map(function(ae) {
                      return Y.extract(ae, ee, "era");
                    })), Y._eraCache[V];
                  });
                }, z.prototype.extract = function(L, Y, V) {
                  var ee = this.dtFormatter(L, Y), ae = ee.formatToParts(), u = ae.find(function(a) {
                    return a.type.toLowerCase() === V.toLowerCase();
                  });
                  if (!u)
                    throw new Error("Invalid extract field ".concat(V));
                  return u.value;
                }, z.prototype.getMinDaysInFirstWeek = function() {
                  return this.getWeekSettings().minimalDays;
                }, z.prototype.getStartOfWeek = function() {
                  return this.getWeekSettings().firstDay;
                }, z.prototype.getWeekSettings = function() {
                  return this._weekSettings ? this._weekSettings : (0, d.hasLocaleWeekInfo)() ? this._getCachedWeekInfo(this.locale) : d.FALLBACK_WEEK_SETTINGS;
                }, z.prototype.getWeekendDays = function() {
                  return this.getWeekSettings().weekend;
                }, z.prototype.isEnglish = function() {
                  return (
                    // tslint:disable-next-line:no-bitwise
                    !!~["en", "en-us"].indexOf(this.locale.toLowerCase()) || new C.default.DateTimeFormat(this._intl).resolvedOptions().locale.startsWith("en-us")
                  );
                }, z.prototype.listFormatter = function(L) {
                  return L === void 0 && (L = {}), h(this._intl, L);
                }, z.prototype.listingMode = function() {
                  var L = this.isEnglish(), Y = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
                  return L && Y ? "en" : "intl";
                }, z.prototype.meridiems = function() {
                  var L = this;
                  return W(
                    this,
                    "long",
                    // arbitrary unused value
                    function() {
                      return k.meridiems;
                    },
                    function() {
                      return L._meridiemCache === void 0 && (L._meridiemCache = [
                        I.DateTime.utc(2016, 11, 13, 9),
                        I.DateTime.utc(2016, 11, 13, 19)
                      ].map(function(Y) {
                        return L.extract(Y, { hour: "numeric", hourCycle: "h12" }, "dayPeriod");
                      })), L._meridiemCache;
                    }
                  );
                }, z.prototype.months = function(L, Y) {
                  var V = this;
                  return Y === void 0 && (Y = !1), W(this, L, k.months, function(ee) {
                    var ae = Y ? { month: ee, day: "numeric" } : { month: ee }, u = Y ? "format" : "standalone";
                    return V._monthsCache[u][ee] || (V._monthsCache[u][ee] = P(function(a) {
                      return V.extract(a, ae, "month");
                    })), V._monthsCache[u][ee];
                  });
                }, z.prototype.numberFormatter = function(L) {
                  return L === void 0 && (L = {}), new j(this._intl, this.fastNumbers, L);
                }, z.prototype.redefaultToEN = function(L) {
                  return L === void 0 && (L = {}), this.clone(m.__assign(m.__assign({}, L), { defaultToEN: !0 }));
                }, z.prototype.redefaultToSystem = function(L) {
                  return L === void 0 && (L = {}), this.clone(m.__assign(m.__assign({}, L), { defaultToEN: !1 }));
                }, z.prototype.relFormatter = function(L) {
                  return L === void 0 && (L = {}), new q(this._intl, this.isEnglish(), L);
                }, z.prototype.toString = function() {
                  return "Locale(".concat(this.locale, ", ").concat(this.numberingSystem, ", ").concat(this.outputCalendar, ")");
                }, z.prototype.weekdays = function(L, Y) {
                  var V = this;
                  return Y === void 0 && (Y = !1), W(this, L, k.weekdays, function(ee) {
                    var ae = Y ? { weekday: ee, year: "numeric", month: "long", day: "numeric" } : { weekday: ee }, u = Y ? "format" : "standalone";
                    return V._weekdaysCache[u][ee] || (V._weekdaysCache[u][ee] = O(function(a) {
                      return V.extract(a, ae, "weekday");
                    })), V._weekdaysCache[u][ee];
                  });
                }, z.prototype._getCachedWeekInfo = function(L) {
                  var Y = z._weekInfoCache[L];
                  if (!Y) {
                    var V = new C.default.Locale(L);
                    Y = "getWeekInfo" in V ? V.getWeekInfo() : V.weekInfo, z._weekInfoCache[L] = Y;
                  }
                  return Y;
                }, z.prototype._supportsFastNumbers = function() {
                  return this.numberingSystem && this.numberingSystem !== "latn" ? !1 : this.numberingSystem === "latn" || !this.locale || this.locale.startsWith("en") || C.default.DateTimeFormat(this._intl).resolvedOptions().numberingSystem === "latn";
                }, z._weekInfoCache = {}, z;
              }()
            );
            n.Locale = X;
          }
        ),
        /***/
        "./src/impl/regexParser.ts": (
          /*!*********************************!*\
            !*** ./src/impl/regexParser.ts ***!
            \*********************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.parseSQL = n.parseRFC2822Date = n.parseISOTimeOnly = n.parseISODuration = n.parseISODate = n.parseHTTPDate = n.IANA_REGEX = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./util */
              "./src/impl/util.ts"
            ), k = m.__importStar(s(
              /*! ./english */
              "./src/impl/english.ts"
            )), N = s(
              /*! ../zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), I = s(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            );
            function U() {
              for (var G = [], te = 0; te < arguments.length; te++)
                G[te] = arguments[te];
              var se = G.reduce(function(ce, de) {
                return ce + de.source;
              }, "");
              return RegExp("^".concat(se, "$"));
            }
            function C() {
              for (var G = [], te = 0; te < arguments.length; te++)
                G[te] = arguments[te];
              return function(se) {
                return G.reduce(function(ce, de) {
                  var he = ce[0], Ie = ce[1], we = ce[2], ye = de(se, we), et = ye[0], tt = ye[1], rt = ye[2];
                  return [m.__assign(m.__assign({}, he), et), tt || Ie, rt];
                }, [{}, null, 1]).slice(0, 2);
              };
            }
            function M(G) {
              for (var te = [], se = 1; se < arguments.length; se++)
                te[se - 1] = arguments[se];
              if (G == null)
                return [null, null];
              for (var ce = 0, de = te; ce < de.length; ce++) {
                var he = de[ce], Ie = he[0], we = he[1], ye = Ie.exec(G);
                if (ye)
                  return we(ye);
              }
              return [null, null];
            }
            function h() {
              for (var G = [], te = 0; te < arguments.length; te++)
                G[te] = arguments[te];
              return function(se, ce) {
                var de = {}, he;
                for (he = 0; he < G.length; he++)
                  de[G[he]] = (0, d.parseInteger)(se[ce + he]);
                return [de, null, ce + he];
              };
            }
            n.IANA_REGEX = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
            var T = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, E = "(?:".concat(T.source, "?(?:\\[(").concat(n.IANA_REGEX.source, ")\\])?)?"), R = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, S = RegExp("".concat(R.source).concat(E)), y = RegExp("(?:T".concat(S.source, ")?")), D = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, A = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Z = /(\d{4})-?(\d{3})/, w = h("weekYear", "weekNumber", "weekday"), b = h("year", "ordinal"), P = /(\d{4})-(\d\d)-(\d\d)/, O = RegExp("".concat(R.source, " ?(?:").concat(T.source, "|(").concat(n.IANA_REGEX.source, "))?")), W = RegExp("(?: ".concat(O.source, ")?"));
            function j(G, te, se) {
              return (0, d.isUndefined)(G[te]) ? se : (0, d.parseInteger)(G[te]);
            }
            function B(G, te) {
              var se = {
                year: j(G, te, 0),
                // 0 default value never used?
                month: j(G, te + 1, 1),
                day: j(G, te + 2, 1)
              };
              return [se, null, te + 3];
            }
            function q(G, te) {
              var se = {
                hour: j(G, te, 0),
                minute: j(G, te + 1, 0),
                second: j(G, te + 2, 0),
                millisecond: (0, d.parseMillis)(G[te + 3])
              };
              return [se, null, te + 4];
            }
            function X(G, te) {
              var se = !G[te] && !G[te + 1], ce = (0, d.signedOffset)(G[te + 1], G[te + 2]), de = se ? null : N.FixedOffsetZone.instance(ce);
              return [{}, de, te + 3];
            }
            function z(G, te) {
              var se = G[te] ? I.IANAZone.create(G[te]) : null;
              return [{}, se, te + 1];
            }
            var L = RegExp("^T?".concat(R.source, "$")), Y = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
            function V(G) {
              var te = G[0], se = G[1], ce = G[2], de = G[3], he = G[4], Ie = G[5], we = G[6], ye = G[7], et = G[8], tt = te.startsWith("-"), rt = !!ye && ye.startsWith("-"), Fe = function(Ze, mt) {
                return mt === void 0 && (mt = !1), typeof Ze == "number" && (mt || Ze && tt) ? -Ze : Ze;
              };
              return [{
                years: Fe((0, d.parseFloating)(se)),
                months: Fe((0, d.parseFloating)(ce)),
                weeks: Fe((0, d.parseFloating)(de)),
                days: Fe((0, d.parseFloating)(he)),
                hours: Fe((0, d.parseFloating)(Ie)),
                minutes: Fe((0, d.parseFloating)(we)),
                seconds: Fe((0, d.parseFloating)(ye), ye === "-0"),
                milliseconds: Fe((0, d.parseMillis)(et), rt)
              }];
            }
            var ee = {
              GMT: 0,
              EDT: -4 * 60,
              EST: -5 * 60,
              CDT: -5 * 60,
              CST: -6 * 60,
              MDT: -6 * 60,
              MST: -7 * 60,
              PDT: -7 * 60,
              PST: -8 * 60
            };
            function ae(G, te, se, ce, de, he, Ie) {
              var we;
              G && (we = G.length > 3 ? k.weekdaysLong.indexOf(G) + 1 : k.weekdaysShort.indexOf(G) + 1);
              var ye = te.length === 2 ? (0, d.untruncateYear)((0, d.parseInteger)(te)) : (0, d.parseInteger)(te);
              return {
                year: ye,
                month: k.monthsShort.indexOf(se) + 1,
                day: (0, d.parseInteger)(ce),
                hour: (0, d.parseInteger)(de),
                minute: (0, d.parseInteger)(he),
                second: (0, d.parseInteger)(Ie),
                weekday: we
              };
            }
            var u = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
            function a(G) {
              var te = G[1], se = G[2], ce = G[3], de = G[4], he = G[5], Ie = G[6], we = G[7], ye = G[8], et = G[9], tt = G[10], rt = G[11], Fe = ae(te, de, ce, se, he, Ie, we), Ze;
              return ye ? Ze = ee[ye] : et ? Ze = 0 : Ze = (0, d.signedOffset)(tt, rt), [Fe, new N.FixedOffsetZone(Ze)];
            }
            function o(G) {
              return G.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
            }
            var c = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, g = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, l = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
            function _(G) {
              var te = G[1], se = G[2], ce = G[3], de = G[4], he = G[5], Ie = G[6], we = G[7], ye = ae(te, de, ce, se, he, Ie, we);
              return [ye, N.FixedOffsetZone.utcInstance];
            }
            function F(G) {
              var te = G[1], se = G[2], ce = G[3], de = G[4], he = G[5], Ie = G[6], we = G[7], ye = ae(te, we, se, ce, de, he, Ie);
              return [ye, N.FixedOffsetZone.utcInstance];
            }
            var x = U(D, y), H = U(A, y), J = U(Z, y), K = U(S), Q = C(B, q, X, z), ne = C(w, q, X, z), fe = C(b, q, X, z), _e = C(q, X, z);
            function Se(G) {
              return M(G, [c, _], [g, _], [l, F]);
            }
            n.parseHTTPDate = Se;
            function be(G) {
              return M(G, [x, Q], [H, ne], [J, fe], [K, _e]);
            }
            n.parseISODate = be;
            function Be(G) {
              return M(G, [Y, V]);
            }
            n.parseISODuration = Be;
            function ht(G) {
              return M(G, [L, C(q)]);
            }
            n.parseISOTimeOnly = ht;
            function Er(G) {
              return M(o(G), [u, a]);
            }
            n.parseRFC2822Date = Er;
            var Or = U(P, W), wr = U(O), Dr = C(q, X, z);
            function Sr(G) {
              return M(G, [Or, Q], [wr, Dr]);
            }
            n.parseSQL = Sr;
          }
        ),
        /***/
        "./src/impl/tokenParser.ts": (
          /*!*********************************!*\
            !*** ./src/impl/tokenParser.ts ***!
            \*********************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.formatOptsToTokens = n.parseFromTokens = n.sanitizeSpaces = n.explainFromTokens = n.TokenParser = n.expandMacroTokens = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./util */
              "./src/impl/util.ts"
            ), k = s(
              /*! ./formatter */
              "./src/impl/formatter.ts"
            ), N = s(
              /*! ../zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), I = s(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), U = s(
              /*! ./digits */
              "./src/impl/digits.ts"
            ), C = s(
              /*! ../datetime */
              "./src/datetime.ts"
            ), M = s(
              /*! ../errors */
              "./src/errors.ts"
            ), h = "missing Intl.DateTimeFormat.formatToParts support";
            function T(a, o) {
              return o === void 0 && (o = function(c) {
                return c;
              }), { regex: a, deser: function(c) {
                var g = c[0];
                return o((0, U.parseDigits)(g));
              } };
            }
            var E = "[ ".concat(" ", "]"), R = new RegExp(E, "g");
            function S(a) {
              return a.replace(/\./g, "\\.?").replace(R, E);
            }
            function y(a) {
              return a.replace(/\./g, "").replace(R, " ").toLowerCase();
            }
            function D(a, o) {
              return {
                regex: RegExp(a.map(S).join("|")),
                deser: function(c) {
                  var g = c[0];
                  return a.findIndex(function(l) {
                    return y(g) === y(l);
                  }) + o;
                }
              };
            }
            function A(a, o) {
              return { regex: a, deser: function(c) {
                var g = c[1], l = c[2];
                return (0, d.signedOffset)(g, l);
              }, groups: o };
            }
            function Z(a) {
              return { regex: a, deser: function(o) {
                var c = o[0];
                return c;
              } };
            }
            function w(a) {
              return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }
            function b(a, o) {
              var c = (0, U.digitRegex)(o), g = (0, U.digitRegex)(o, "{2}"), l = (0, U.digitRegex)(o, "{3}"), _ = (0, U.digitRegex)(o, "{4}"), F = (0, U.digitRegex)(o, "{6}"), x = (0, U.digitRegex)(o, "{1,2}"), H = (0, U.digitRegex)(o, "{1,3}"), J = (0, U.digitRegex)(o, "{1,6}"), K = (0, U.digitRegex)(o, "{1,9}"), Q = (0, U.digitRegex)(o, "{2,4}"), ne = (0, U.digitRegex)(o, "{4,6}"), fe = function(be) {
                return {
                  regex: RegExp(w(be.val)),
                  deser: function(Be) {
                    var ht = Be[0];
                    return ht;
                  },
                  literal: !0
                };
              }, _e = function(be) {
                if (a.literal)
                  return fe(be);
                switch (be.val) {
                  case "G":
                    return D(o.eras("short"), 0);
                  case "GG":
                    return D(o.eras("long"), 0);
                  case "y":
                    return T(J);
                  case "yy":
                    return T(Q, d.untruncateYear);
                  case "yyyy":
                    return T(_);
                  case "yyyyy":
                    return T(ne);
                  case "yyyyyy":
                    return T(F);
                  case "M":
                    return T(x);
                  case "MM":
                    return T(g);
                  case "MMM":
                    return D(o.months("short", !0), 1);
                  case "MMMM":
                    return D(o.months("long", !0), 1);
                  case "L":
                    return T(x);
                  case "LL":
                    return T(g);
                  case "LLL":
                    return D(o.months("short", !1), 1);
                  case "LLLL":
                    return D(o.months("long", !1), 1);
                  case "d":
                    return T(x);
                  case "dd":
                    return T(g);
                  case "o":
                    return T(H);
                  case "ooo":
                    return T(l);
                  case "HH":
                    return T(g);
                  case "H":
                    return T(x);
                  case "hh":
                    return T(g);
                  case "h":
                    return T(x);
                  case "mm":
                    return T(g);
                  case "m":
                    return T(x);
                  case "q":
                    return T(x);
                  case "qq":
                    return T(g);
                  case "s":
                    return T(x);
                  case "ss":
                    return T(g);
                  case "S":
                    return T(H);
                  case "SSS":
                    return T(l);
                  case "u":
                    return Z(K);
                  case "a":
                    return D(o.meridiems(), 0);
                  case "kkkk":
                    return T(_);
                  case "kk":
                    return T(Q, d.untruncateYear);
                  case "W":
                    return T(x);
                  case "WW":
                    return T(g);
                  case "E":
                  case "c":
                    return T(c);
                  case "EEE":
                    return D(o.weekdays("short", !1), 1);
                  case "EEEE":
                    return D(o.weekdays("long", !1), 1);
                  case "ccc":
                    return D(o.weekdays("short", !0), 1);
                  case "cccc":
                    return D(o.weekdays("long", !0), 1);
                  case "Z":
                  case "ZZ":
                    return A(new RegExp("([+-]".concat(x.source, ")(?::(").concat(g.source, "))?")), 2);
                  case "ZZZ":
                    return A(new RegExp("([+-]".concat(x.source, ")(").concat(g.source, ")?")), 2);
                  case "z":
                    return Z(/[a-z_+-/]{1,256}?/i);
                  default:
                    return fe(be);
                }
              }, Se = _e(a) || {
                invalidReason: h
              };
              return m.__assign(m.__assign({}, Se), { token: a });
            }
            var P = {
              year: {
                "2-digit": "yy",
                numeric: "yyyyy"
              },
              month: {
                numeric: "M",
                "2-digit": "MM",
                short: "MMM",
                long: "MMMM"
              },
              day: {
                numeric: "d",
                "2-digit": "dd"
              },
              weekday: {
                short: "EEE",
                long: "EEEE"
              },
              dayPeriod: "a",
              hour12: {
                numeric: "h",
                "2-digit": "hh"
              },
              hour24: {
                numeric: "H",
                "2-digit": "HH"
              },
              hour: {
                numeric: "h",
                "2-digit": "hh"
              },
              minute: {
                numeric: "m",
                "2-digit": "mm"
              },
              second: {
                numeric: "s",
                "2-digit": "ss"
              },
              timeZoneName: {
                long: "ZZZZZ",
                short: "ZZZ"
              }
            };
            function O(a, o, c) {
              var g = a.type, l = a.value;
              if (g === "literal") {
                var _ = /^\s+$/.test(l);
                return {
                  literal: !_,
                  val: _ ? " " : l
                };
              }
              var F = o[g], x = g;
              g === "hour" && (o.hour12 != null ? x = o.hour12 ? "hour12" : "hour24" : o.hourCycle != null ? o.hourCycle === "h11" || o.hourCycle === "h12" ? x = "hour12" : x = "hour24" : x = c.hour12 ? "hour12" : "hour24");
              var H = P[x];
              if (typeof H == "object" && (H = H[F]), H)
                return {
                  literal: !1,
                  val: H
                };
            }
            function W(a) {
              var o = a.map(function(c) {
                return c.regex;
              }).reduce(function(c, g) {
                return "".concat(c, "(").concat(g.source, ")");
              }, "");
              return ["^".concat(o, "$"), a];
            }
            function j(a, o, c) {
              var g = o.exec(a), l = {};
              if (g !== null) {
                var _ = 1;
                c.forEach(function(F) {
                  var x = F.groups ? F.groups + 1 : 1;
                  F.literal || (l[F.token.val[0]] = F.deser(g.slice(_, _ + x))), _ += x;
                });
              }
              return [g, l];
            }
            function B(a) {
              var o = function(_) {
                switch (_) {
                  case "S":
                    return "millisecond";
                  case "s":
                    return "second";
                  case "m":
                    return "minute";
                  case "h":
                  case "H":
                    return "hour";
                  case "d":
                    return "day";
                  case "o":
                    return "ordinal";
                  case "L":
                  case "M":
                    return "month";
                  case "y":
                    return "year";
                  case "E":
                  case "c":
                    return "weekday";
                  case "W":
                    return "weekNumber";
                  case "k":
                    return "weekYear";
                  case "q":
                    return "quarter";
                  default:
                    return null;
                }
              }, c = null, g;
              (0, d.isDefined)(a.z) && (c = I.IANAZone.create(a.z)), (0, d.isDefined)(a.Z) && (c || (c = new N.FixedOffsetZone(+a.Z)), g = +a.Z), (0, d.isDefined)(a.q) && (a.M = (a.q - 1) * 3 + 1), (0, d.isDefined)(a.h) && (+a.h < 12 && a.a === 1 ? a.h = a.h + 12 : a.h === 12 && a.a === 0 && (a.h = 0)), a.G === 0 && a.y && (a.y = -a.y), (0, d.isDefined)(a.u) && (a.S = (0, d.parseMillis)(a.u) || 0);
              var l = Object.keys(a).reduce(function(_, F) {
                var x = o(F);
                return x && (_[x] = a[F]), _;
              }, {});
              return [l, c, g];
            }
            var q;
            function X(a) {
              return q === void 0 && (q = C.DateTime.fromMillis(1555555555555, {
                locale: a.locale
              })), q;
            }
            function z(a, o) {
              if (a.literal)
                return a;
              var c = k.Formatter.macroTokenToFormatOpts(a.val), g = u(c, o);
              return g == null || g.includes(void 0) ? a : g;
            }
            function L(a, o) {
              var c;
              return (c = Array.prototype).concat.apply(c, a.map(function(g) {
                return z(g, o);
              }));
            }
            n.expandMacroTokens = L;
            var Y = (
              /** @class */
              function() {
                function a(o, c) {
                  this.locale = o, this.format = c, this._mapTokens();
                }
                return Object.defineProperty(a.prototype, "invalidReason", {
                  get: function() {
                    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(a.prototype, "isValid", {
                  get: function() {
                    return !this.disqualifyingUnit;
                  },
                  enumerable: !1,
                  configurable: !0
                }), a.prototype.explainFromTokens = function(o) {
                  if (this.isValid) {
                    var c = j(o, this.regex, this.handlers), g = c[0], l = c[1], _ = l ? B(l) : [null, null, void 0], F = _[0], x = _[1], H = _[2];
                    if (l.hasOwnProperty("a") && l.hasOwnProperty("H"))
                      throw new M.ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
                    return {
                      input: o,
                      tokens: this.tokens,
                      regex: this.regex,
                      rawMatches: g,
                      matches: l,
                      result: F,
                      zone: x,
                      specificOffset: H
                    };
                  } else
                    return { input: o, tokens: this.tokens, invalidReason: this.invalidReason };
                }, a.prototype._mapTokens = function() {
                  var o = this;
                  this.tokens = L(k.Formatter.parseFormat(this.format), this.locale);
                  var c = this.tokens.map(function(F) {
                    return b(F, o.locale);
                  });
                  if (this.disqualifyingUnit = c.find(function(F) {
                    return F.invalidReason;
                  }), this.units = c.filter(function(F) {
                    return !F.invalidReason;
                  }), !this.disqualifyingUnit) {
                    var g = W(this.units), l = g[0], _ = g[1];
                    this.regex = RegExp(l, "i"), this.handlers = _;
                  }
                }, a;
              }()
            );
            n.TokenParser = Y;
            function V(a, o, c) {
              var g = new Y(a, c);
              return g.explainFromTokens(o);
            }
            n.explainFromTokens = V;
            function ee(a) {
              return a.replace(/\u202F/g, " ");
            }
            n.sanitizeSpaces = ee;
            function ae(a, o, c) {
              var g = V(a, ee(o), ee(c)), l = g.result, _ = g.zone, F = g.specificOffset, x = g.invalidReason;
              return [l, _, F, x];
            }
            n.parseFromTokens = ae;
            function u(a, o) {
              if (!a)
                return null;
              var c = k.Formatter.create(o, a), g = c.dtFormatter(X(o)), l = g.formatToParts(), _ = g.resolvedOptions();
              return l.map(function(F) {
                return O(F, a, _);
              });
            }
            n.formatOptsToTokens = u;
          }
        ),
        /***/
        "./src/impl/util.ts": (
          /*!**************************!*\
            !*** ./src/impl/util.ts ***!
            \**************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.FALLBACK_WEEK_SETTINGS = n.PLURAL_MAPPING = n.HUMAN_ORDERED_UNITS = n.REVERSE_ORDERED_UNITS = n.ORDERED_UNITS = n.timeObject = n.formatOffset = n.normalizeObject = n.asNumber = n.signedOffset = n.parseZoneInfo = n.untruncateYear = n.weeksInWeekYear = n.objToLocalTS = n.daysInMonth = n.daysInYear = n.isLeapYear = n.roundTo = n.parseMillis = n.parseFloating = n.parseInteger = n.padStart = n.floorMod = n.integerBetween = n.validateWeekSettings = n.pick = n.bestBy = n.maybeArray = n.hasLocaleWeekInfo = n.hasRelative = n.isDate = n.isString = n.isInteger = n.isNumber = n.isUndefined = n.isDefined = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ../errors */
              "./src/errors.ts"
            ), k = s(
              /*! ../settings */
              "./src/settings.ts"
            ), N = s(
              /*! ./conversions */
              "./src/impl/conversions.ts"
            ), I = m.__importDefault(s(
              /*! ../types/intl-next */
              "./src/types/intl-next.ts"
            ));
            function U(l) {
              return typeof l < "u";
            }
            n.isDefined = U;
            function C(l) {
              return typeof l > "u";
            }
            n.isUndefined = C;
            function M(l) {
              return typeof l == "number";
            }
            n.isNumber = M;
            function h(l) {
              return M(l) && l % 1 === 0;
            }
            n.isInteger = h;
            function T(l) {
              return typeof l == "string";
            }
            n.isString = T;
            function E(l) {
              return Object.prototype.toString.call(l) === "[object Date]";
            }
            n.isDate = E;
            function R() {
              try {
                return typeof I.default < "u" && !!I.default.RelativeTimeFormat;
              } catch {
                return !1;
              }
            }
            n.hasRelative = R;
            function S() {
              try {
                return typeof I.default < "u" && !!I.default.Locale && ("weekInfo" in I.default.Locale.prototype || "getWeekInfo" in I.default.Locale.prototype);
              } catch {
                return !1;
              }
            }
            n.hasLocaleWeekInfo = S;
            function y(l) {
              return Array.isArray(l) ? l : [l];
            }
            n.maybeArray = y;
            function D(l, _, F) {
              if (l.length !== 0) {
                var x = l.reduce(function(H, J) {
                  var K = [_(J), J];
                  return F(H[0], K[0]) === H[0] ? H : K;
                }, [_(l[0]), l[0]]);
                return x[1];
              }
            }
            n.bestBy = D;
            function A(l, _) {
              return _.reduce(function(F, x) {
                return F[x] = l[x], F;
              }, {});
            }
            n.pick = A;
            function Z(l) {
              if (l) {
                if (typeof l != "object")
                  throw new d.InvalidArgumentError("Week settings must be an object");
                if (!w(l.firstDay, 1, 7) || !w(l.minimalDays, 1, 7) || !Array.isArray(l.weekend) || l.weekend.some(function(_) {
                  return !w(_, 1, 7);
                }))
                  throw new d.InvalidArgumentError("Invalid week settings");
                return {
                  firstDay: l.firstDay,
                  minimalDays: l.minimalDays,
                  weekend: l.weekend
                };
              } else return;
            }
            n.validateWeekSettings = Z;
            function w(l, _, F) {
              return h(l) && l >= _ && l <= F;
            }
            n.integerBetween = w;
            function b(l, _) {
              return l - _ * Math.floor(l / _);
            }
            n.floorMod = b;
            function P(l, _) {
              _ === void 0 && (_ = 2);
              var F = +l < 0 ? "-" : "", x = F ? +l * -1 : l, H;
              return x.toString().length < _ ? H = ("0".repeat(_) + x).slice(-_) : H = x.toString(), "".concat(F).concat(H);
            }
            n.padStart = P;
            function O(l) {
              if (l)
                return parseInt(l, 10);
            }
            n.parseInteger = O;
            function W(l) {
              if (l)
                return parseFloat(l);
            }
            n.parseFloating = W;
            function j(l) {
              if (!(C(l) || l === null || l === "")) {
                var _ = parseFloat("0." + l) * 1e3;
                return Math.floor(_);
              }
            }
            n.parseMillis = j;
            function B(l, _, F) {
              F === void 0 && (F = !1);
              var x = Math.pow(10, _), H = F ? Math.trunc : Math.round;
              return H(l * x) / x;
            }
            n.roundTo = B;
            function q(l) {
              return l % 4 === 0 && (l % 100 !== 0 || l % 400 === 0);
            }
            n.isLeapYear = q;
            function X(l) {
              return q(l) ? 366 : 365;
            }
            n.daysInYear = X;
            function z(l, _) {
              var F = b(_ - 1, 12) + 1, x = l + (_ - F) / 12;
              return [31, q(x) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][F - 1];
            }
            n.daysInMonth = z;
            function L(l) {
              var _ = Date.UTC(l.year, l.month - 1, l.day, l.hour, l.minute, l.second, l.millisecond);
              return l.year < 100 && l.year >= 0 && (_ = new Date(_), _.setUTCFullYear(l.year, l.month - 1, l.day)), +_;
            }
            n.objToLocalTS = L;
            function Y(l, _, F) {
              var x = (0, N.isoWeekdayToLocal)((0, N.dayOfWeek)(l, 1, _), F);
              return -x + _ - 1;
            }
            function V(l, _, F) {
              _ === void 0 && (_ = 4), F === void 0 && (F = 1);
              var x = Y(l, _, F), H = Y(l + 1, _, F);
              return (X(l) - x + H) / 7;
            }
            n.weeksInWeekYear = V;
            function ee(l) {
              return l > 99 ? l : l > k.Settings.twoDigitCutoffYear ? 1900 + l : 2e3 + l;
            }
            n.untruncateYear = ee;
            function ae(l, _, F, x) {
              var H = new Date(l), J = {
                hourCycle: "h23",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: x
              }, K = m.__assign({ timeZoneName: _ }, J), Q = new I.default.DateTimeFormat(F, K).formatToParts(H).find(function(ne) {
                return ne.type.toLowerCase() === "timezonename";
              });
              return Q ? Q.value : null;
            }
            n.parseZoneInfo = ae;
            function u(l, _) {
              var F = parseInt(l, 10);
              Number.isNaN(F) && (F = 0);
              var x = parseInt(_, 10) || 0, H = F < 0 || Object.is(F, -0) ? -x : x;
              return F * 60 + H;
            }
            n.signedOffset = u;
            function a(l) {
              var _ = Number(l);
              if (typeof l == "boolean" || l === "" || Number.isNaN(_))
                throw new d.InvalidArgumentError("Invalid unit value ".concat(l));
              return _;
            }
            n.asNumber = a;
            function o(l, _) {
              return Object.keys(l).reduce(function(F, x) {
                return l[x] !== void 0 && l[x] !== null && (F[_(x)] = a(l[x])), F;
              }, {});
            }
            n.normalizeObject = o;
            function c(l, _) {
              var F = Math.trunc(Math.abs(l / 60)), x = Math.trunc(Math.abs(l % 60)), H = l >= 0 ? "+" : "-";
              switch (_) {
                case "short":
                  return "".concat(H).concat(P(F, 2), ":").concat(P(x, 2));
                case "narrow":
                  return "".concat(H).concat(F).concat(x > 0 ? ":".concat(x) : "");
                case "techie":
                  return "".concat(H).concat(P(F, 2)).concat(P(x, 2));
                default:
                  throw new RangeError("Value format ".concat(_, " is out of range for property format"));
              }
            }
            n.formatOffset = c;
            function g(l) {
              return A(l, ["hour", "minute", "second", "millisecond"]);
            }
            n.timeObject = g, n.ORDERED_UNITS = [
              "years",
              "quarters",
              "months",
              "weeks",
              "days",
              "hours",
              "minutes",
              "seconds",
              "milliseconds"
            ], n.REVERSE_ORDERED_UNITS = n.ORDERED_UNITS.slice(0).reverse(), n.HUMAN_ORDERED_UNITS = [
              "years",
              "months",
              "days",
              "hours",
              "minutes",
              "seconds",
              "milliseconds"
            ], n.PLURAL_MAPPING = {
              year: "year",
              years: "year",
              quarter: "quarter",
              quarters: "quarter",
              month: "month",
              months: "month",
              day: "day",
              days: "day",
              hour: "hour",
              hours: "hour",
              localweeknumber: "localWeekNumber",
              localweeknumbers: "localWeekNumber",
              localweekday: "localWeekday",
              localweekdays: "localWeekday",
              localweekyear: "localWeekYear",
              localweekyears: "localWeekYear",
              minute: "minute",
              minutes: "minute",
              second: "second",
              seconds: "second",
              millisecond: "millisecond",
              milliseconds: "millisecond",
              weekday: "weekday",
              weekdays: "weekday",
              weeknumber: "weekNumber",
              weeksnumber: "weekNumber",
              weeknumbers: "weekNumber",
              weekyear: "weekYear",
              weekyears: "weekYear",
              ordinal: "ordinal"
            }, n.FALLBACK_WEEK_SETTINGS = {
              firstDay: 1,
              minimalDays: 4,
              weekend: [6, 7]
            };
          }
        ),
        /***/
        "./src/impl/zoneUtil.ts": (
          /*!******************************!*\
            !*** ./src/impl/zoneUtil.ts ***!
            \******************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.normalizeZone = void 0;
            var m = s(
              /*! ../zone */
              "./src/zone.ts"
            ), d = s(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), k = s(
              /*! ../zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), N = s(
              /*! ./util */
              "./src/impl/util.ts"
            ), I = s(
              /*! ../zones/invalidZone */
              "./src/zones/invalidZone.ts"
            ), U = s(
              /*! ../zones/systemZone */
              "./src/zones/systemZone.ts"
            ), C = function(M, h) {
              if ((0, N.isUndefined)(M) || M === null)
                return h;
              if (M instanceof m.Zone)
                return M;
              if ((0, N.isString)(M)) {
                var T = M.toLowerCase();
                return T === "default" ? h : T === "local" || T === "system" ? U.SystemZone.instance : T === "utc" || T === "gmt" ? k.FixedOffsetZone.utcInstance : k.FixedOffsetZone.parseSpecifier(T) || d.IANAZone.create(M);
              } else return (0, N.isNumber)(M) ? k.FixedOffsetZone.instance(M) : typeof M == "object" && "offset" in M && typeof M.offset == "function" ? M : new I.InvalidZone(M);
            };
            n.normalizeZone = C;
          }
        ),
        /***/
        "./src/index.ts": (
          /*!**********************!*\
            !*** ./src/index.ts ***!
            \**********************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.REVERSE_ORDERED_UNITS = n.ORDERED_UNITS = n.VERSION = n.Settings = n.SystemZone = n.InvalidZone = n.IANAZone = n.FixedOffsetZone = n.Zone = n.Info = n.Interval = n.Duration = n.DateTime = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ./datetime */
              "./src/datetime.ts"
            );
            Object.defineProperty(n, "DateTime", { enumerable: !0, get: function() {
              return d.DateTime;
            } });
            var k = s(
              /*! ./duration */
              "./src/duration.ts"
            );
            Object.defineProperty(n, "Duration", { enumerable: !0, get: function() {
              return k.Duration;
            } });
            var N = s(
              /*! ./interval */
              "./src/interval.ts"
            );
            Object.defineProperty(n, "Interval", { enumerable: !0, get: function() {
              return N.Interval;
            } });
            var I = s(
              /*! ./info */
              "./src/info.ts"
            );
            Object.defineProperty(n, "Info", { enumerable: !0, get: function() {
              return I.Info;
            } });
            var U = s(
              /*! ./zone */
              "./src/zone.ts"
            );
            Object.defineProperty(n, "Zone", { enumerable: !0, get: function() {
              return U.Zone;
            } });
            var C = s(
              /*! ./zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            );
            Object.defineProperty(n, "FixedOffsetZone", { enumerable: !0, get: function() {
              return C.FixedOffsetZone;
            } });
            var M = s(
              /*! ./zones/IANAZone */
              "./src/zones/IANAZone.ts"
            );
            Object.defineProperty(n, "IANAZone", { enumerable: !0, get: function() {
              return M.IANAZone;
            } });
            var h = s(
              /*! ./zones/invalidZone */
              "./src/zones/invalidZone.ts"
            );
            Object.defineProperty(n, "InvalidZone", { enumerable: !0, get: function() {
              return h.InvalidZone;
            } });
            var T = s(
              /*! ./zones/systemZone */
              "./src/zones/systemZone.ts"
            );
            Object.defineProperty(n, "SystemZone", { enumerable: !0, get: function() {
              return T.SystemZone;
            } });
            var E = s(
              /*! ./settings */
              "./src/settings.ts"
            );
            Object.defineProperty(n, "Settings", { enumerable: !0, get: function() {
              return E.Settings;
            } });
            var R = s(
              /*! ./impl/util */
              "./src/impl/util.ts"
            );
            Object.defineProperty(n, "ORDERED_UNITS", { enumerable: !0, get: function() {
              return R.ORDERED_UNITS;
            } }), Object.defineProperty(n, "REVERSE_ORDERED_UNITS", { enumerable: !0, get: function() {
              return R.REVERSE_ORDERED_UNITS;
            } }), m.__exportStar(s(
              /*! ./types/public */
              "./src/types/public.ts"
            ), n);
            var S = "5.0.7-beta.0";
            n.VERSION = S;
          }
        ),
        /***/
        "./src/info.ts": (
          /*!*********************!*\
            !*** ./src/info.ts ***!
            \*********************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Info = void 0;
            var m = s(
              /*! ./datetime */
              "./src/datetime.ts"
            ), d = s(
              /*! ./settings */
              "./src/settings.ts"
            ), k = s(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), N = s(
              /*! ./zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), I = s(
              /*! ./impl/zoneUtil */
              "./src/impl/zoneUtil.ts"
            ), U = s(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), C = (
              /** @class */
              function() {
                function M() {
                }
                return M.eras = function(h, T) {
                  h === void 0 && (h = "short");
                  var E = T === void 0 ? {} : T, R = E.locale;
                  return k.Locale.create(R, void 0, "gregory").eras(h);
                }, M.features = function() {
                  return { relative: (0, U.hasRelative)(), localeWeek: (0, U.hasLocaleWeekInfo)() };
                }, M.getMinimumDaysInFirstWeek = function(h) {
                  var T = h === void 0 ? {} : h, E = T.locale, R = T.locObj;
                  return (R || k.Locale.create(E)).getMinDaysInFirstWeek();
                }, M.getStartOfWeek = function(h) {
                  var T = h === void 0 ? {} : h, E = T.locale, R = T.locObj;
                  return (R || k.Locale.create(E)).getStartOfWeek();
                }, M.getWeekendWeekdays = function(h) {
                  var T = h === void 0 ? {} : h, E = T.locale, R = T.locObj;
                  return (R || k.Locale.create(E)).getWeekendDays().slice();
                }, M.hasDST = function(h) {
                  h === void 0 && (h = d.Settings.defaultZone);
                  var T = m.DateTime.now().setZone(h).set({ month: 12 });
                  return !h.isUniversal && T.offset !== T.set({ month: 6 }).offset;
                }, M.isValidIANAZone = function(h) {
                  return N.IANAZone.isValidZone(h);
                }, M.meridiems = function(h) {
                  var T = h === void 0 ? {} : h, E = T.locale;
                  return k.Locale.create(E).meridiems();
                }, M.months = function(h, T) {
                  h === void 0 && (h = "long");
                  var E = T === void 0 ? {} : T, R = E.locale, S = R === void 0 ? null : R, y = E.locObj, D = y === void 0 ? null : y, A = E.numberingSystem, Z = A === void 0 ? null : A, w = E.outputCalendar, b = w === void 0 ? "gregory" : w;
                  return (D || k.Locale.create(S, Z, b)).months(h);
                }, M.monthsFormat = function(h, T) {
                  h === void 0 && (h = "long");
                  var E = T === void 0 ? {} : T, R = E.locale, S = E.locObj, y = E.numberingSystem, D = E.outputCalendar, A = D === void 0 ? "gregory" : D;
                  return (S || k.Locale.create(R, y, A)).months(h, !0);
                }, M.normalizeZone = function(h) {
                  return (0, I.normalizeZone)(h, d.Settings.defaultZone);
                }, M.weekdays = function(h, T) {
                  h === void 0 && (h = "long");
                  var E = T === void 0 ? {} : T, R = E.locale, S = E.locObj, y = E.numberingSystem;
                  return (S || k.Locale.create(R, y)).weekdays(h);
                }, M.weekdaysFormat = function(h, T) {
                  h === void 0 && (h = "long");
                  var E = T === void 0 ? {} : T, R = E.locale, S = E.locObj, y = E.numberingSystem;
                  return (S || k.Locale.create(R, y)).weekdays(h, !0);
                }, M;
              }()
            );
            n.Info = C;
          }
        ),
        /***/
        "./src/interval.ts": (
          /*!*************************!*\
            !*** ./src/interval.ts ***!
            \*************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Interval = void 0;
            var m = s(
              /*! ./datetime */
              "./src/datetime.ts"
            ), d = s(
              /*! ./duration */
              "./src/duration.ts"
            ), k = s(
              /*! ./errors */
              "./src/errors.ts"
            ), N = s(
              /*! ./types/invalid */
              "./src/types/invalid.ts"
            ), I = s(
              /*! ./settings */
              "./src/settings.ts"
            ), U = s(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), C = s(
              /*! ./impl/formatter */
              "./src/impl/formatter.ts"
            ), M = s(
              /*! ./impl/formats */
              "./src/impl/formats.ts"
            ), h = "Invalid Interval";
            function T(S, y) {
              if (!S || !S.isValid)
                return R.invalid("missing or invalid start");
              if (!y || !y.isValid)
                return R.invalid("missing or invalid end");
              if (y < S)
                return R.invalid("end before start", "The end of an interval must be after its start, but you had start=".concat(S.toISO(), " and end=").concat(y.toISO()));
            }
            function E(S) {
              if (m.DateTime.isDateTime(S))
                return S;
              if (S && S.valueOf && (0, U.isNumber)(S.valueOf()))
                return m.DateTime.fromJSDate(S);
              if (S && typeof S == "object")
                return m.DateTime.fromObject(S);
              throw new k.InvalidArgumentError("Unknown datetime argument: ".concat(S, ", of type ").concat(typeof S));
            }
            var R = (
              /** @class */
              function() {
                function S(y) {
                  this._s = y.start, this._e = y.end, this._invalid = y.invalid || null, this._isLuxonInterval = !0;
                }
                return Object.defineProperty(S.prototype, "end", {
                  /**
                   * Returns the end of the Interval
                   */
                  get: function() {
                    return this.isValid ? this._e : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(S.prototype, "invalidReason", {
                  /**
                   * Returns an error code if this Interval is invalid, or null if the Interval is valid
                   */
                  get: function() {
                    return this._invalid ? this._invalid.reason : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(S.prototype, "isValid", {
                  /**
                   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
                   */
                  get: function() {
                    return this.invalidReason === null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(S.prototype, "start", {
                  /**
                   * Returns the start of the Interval
                   */
                  get: function() {
                    return this.isValid ? this._s : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), S.after = function(y, D) {
                  var A = d.Duration.fromDurationLike(D), Z = E(y);
                  return new S({
                    start: Z,
                    end: Z ? Z.plus(A) : void 0
                  });
                }, S.before = function(y, D) {
                  var A = d.Duration.fromDurationLike(D), Z = E(y);
                  return new S({
                    start: Z ? Z.minus(A) : void 0,
                    end: Z
                  });
                }, S.fromDateTimes = function(y, D) {
                  var A = E(y), Z = E(D), w = T(A, Z);
                  return w || new S({
                    start: A,
                    end: Z
                  });
                }, S.fromISO = function(y, D) {
                  D === void 0 && (D = {});
                  var A = (y || "").split("/", 2), Z = A[0], w = A[1];
                  if (Z && w) {
                    var b = void 0, P = void 0;
                    try {
                      b = m.DateTime.fromISO(Z, D), P = b.isValid;
                    } catch {
                      P = !1;
                    }
                    var O = void 0, W = void 0;
                    try {
                      O = m.DateTime.fromISO(w, D), W = O.isValid;
                    } catch {
                      W = !1;
                    }
                    if (P && W)
                      return S.fromDateTimes(b, O);
                    if (P) {
                      var j = d.Duration.fromISO(w, D);
                      if (j.isValid)
                        return S.after(b, j);
                    } else if (W) {
                      var j = d.Duration.fromISO(Z, D);
                      if (j.isValid)
                        return S.before(O, j);
                    }
                  }
                  return S.invalid("unparsable", 'the input "'.concat(y, `" can't be parsed as ISO 8601`));
                }, S.invalid = function(y, D) {
                  if (!y)
                    throw new k.InvalidArgumentError("need to specify a reason the Interval is invalid");
                  var A = y instanceof N.Invalid ? y : new N.Invalid(y, D);
                  if (I.Settings.throwOnInvalid)
                    throw new k.InvalidIntervalError(A);
                  return new S({ invalid: A });
                }, S.isInterval = function(y) {
                  return !!y && y._isLuxonInterval || !1;
                }, S.merge = function(y) {
                  var D = y.sort(function(w, b) {
                    return w._s.valueOf() - b._s.valueOf();
                  }).reduce(function(w, b) {
                    var P = w[0], O = w[1];
                    return O ? O.overlaps(b) || O.abutsStart(b) ? [P, O.union(b)] : [P.concat([O]), b] : [P, b];
                  }, [[], null]), A = D[0], Z = D[1];
                  return Z && A.push(Z), A;
                }, S.xor = function(y) {
                  for (var D, A = null, Z = 0, w = [], b = y.map(function(q) {
                    return [
                      { time: q._s, type: "s" },
                      { time: q._e, type: "e" }
                    ];
                  }), P = (D = Array.prototype).concat.apply(D, b), O = P.sort(function(q, X) {
                    return +q.time - +X.time;
                  }), W = 0, j = O; W < j.length; W++) {
                    var B = j[W];
                    Z += B.type === "s" ? 1 : -1, Z === 1 ? A = B.time : (A && A.valueOf() !== B.time.valueOf() && w.push(S.fromDateTimes(A, B.time)), A = null);
                  }
                  return S.merge(w);
                }, S.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                  return this.isValid ? "Interval { start: ".concat(this._s.toISO(), ", end: ").concat(this._e.toISO(), " }") : "Interval { Invalid, reason: ".concat(this.invalidReason, " }");
                }, S.prototype.abutsEnd = function(y) {
                  return +y._e == +this._s;
                }, S.prototype.abutsStart = function(y) {
                  return +this._e == +y._s;
                }, S.prototype.contains = function(y) {
                  return this._s <= y && this._e > y;
                }, S.prototype.count = function(y, D) {
                  if (y === void 0 && (y = "milliseconds"), !this.isValid)
                    return NaN;
                  var A = this.start.startOf(y, D), Z;
                  return D != null && D.useLocaleWeeks ? Z = this.end.reconfigure({ locale: A.locale }) : Z = this.end, Z = Z.startOf(y, D), Math.floor(Z.diff(A, y).get(y)) + +(Z.valueOf() !== this.end.valueOf());
                }, S.prototype.difference = function() {
                  for (var y = this, D = [], A = 0; A < arguments.length; A++)
                    D[A] = arguments[A];
                  return S.xor([this].concat(D)).map(function(Z) {
                    return y.intersection(Z);
                  }).filter(function(Z) {
                    return Z && !Z.isEmpty();
                  });
                }, S.prototype.divideEqually = function(y) {
                  return this.isValid ? this.splitBy({ milliseconds: this.length() / y }).slice(0, y) : [];
                }, S.prototype.engulfs = function(y) {
                  return this.isValid ? this._s <= y._s && this._e >= y._e : !1;
                }, S.prototype.equals = function(y) {
                  return !this.isValid || !y.isValid ? !1 : this._s.equals(y._s) && this._e.equals(y._e);
                }, S.prototype.hasSame = function(y) {
                  return this.isValid ? this.isEmpty() || this._e.minus(1).hasSame(this._s, y) : !1;
                }, S.prototype.intersection = function(y) {
                  if (!this.isValid)
                    return this;
                  var D = this._s > y._s ? this._s : y._s, A = this._e < y._e ? this._e : y._e;
                  return D >= A ? null : S.fromDateTimes(D, A);
                }, S.prototype.isAfter = function(y) {
                  return this.isValid ? this._s > y : !1;
                }, S.prototype.isBefore = function(y) {
                  return this.isValid ? this._e <= y : !1;
                }, S.prototype.isEmpty = function() {
                  return this._s.valueOf() === this._e.valueOf();
                }, S.prototype.length = function(y) {
                  return y === void 0 && (y = "milliseconds"), this.toDuration(y).get(y);
                }, S.prototype.mapEndpoints = function(y) {
                  return S.fromDateTimes(y(this._s), y(this._e));
                }, S.prototype.overlaps = function(y) {
                  return this._e > y._s && this._s < y._e;
                }, S.prototype.set = function(y) {
                  var D = y === void 0 ? {} : y, A = D.start, Z = D.end;
                  return this.isValid ? S.fromDateTimes(A || this._s, Z || this._e) : this;
                }, S.prototype.splitAt = function() {
                  for (var y = this, D = [], A = 0; A < arguments.length; A++)
                    D[A] = arguments[A];
                  for (var Z = D.map(E).filter(function(j) {
                    return y.contains(j);
                  }).sort(function(j, B) {
                    return j.toMillis() - B.toMillis();
                  }), w = [], b = this._s, P = 0; b < this._e; ) {
                    var O = Z[P] || this._e, W = +O > +this._e ? this._e : O;
                    w.push(S.fromDateTimes(b, W)), b = W, P += 1;
                  }
                  return w;
                }, S.prototype.splitBy = function(y) {
                  var D = d.Duration.fromDurationLike(y);
                  if (!this.isValid || !D.isValid || D.as("milliseconds") === 0)
                    return [];
                  for (var A = this._s, Z = 1, w, b = []; A < this._e; ) {
                    var P = this.start.plus(D.mapUnits(function(O) {
                      return O * Z;
                    }));
                    w = +P > +this._e ? this._e : P, b.push(S.fromDateTimes(A, w)), A = w, Z += 1;
                  }
                  return b;
                }, S.prototype.toDuration = function(y, D) {
                  return y === void 0 && (y = "milliseconds"), D === void 0 && (D = {}), this.isValid ? this._e.diff(this._s, y, D) : d.Duration.invalid(this._invalid.reason);
                }, S.prototype.toFormat = function(y, D) {
                  var A = D === void 0 ? {} : D, Z = A.separator, w = Z === void 0 ? " - " : Z;
                  return this.isValid ? "".concat(this._s.toFormat(y)).concat(w).concat(this._e.toFormat(y)) : h;
                }, S.prototype.toISO = function(y) {
                  return y === void 0 && (y = {}), this.isValid ? "".concat(this._s.toISO(y), "/").concat(this._e.toISO(y)) : h;
                }, S.prototype.toISODate = function() {
                  return this.isValid ? "".concat(this._s.toISODate(), "/").concat(this._e.toISODate()) : h;
                }, S.prototype.toISOTime = function(y) {
                  return y === void 0 && (y = {}), this.isValid ? "".concat(this._s.toISOTime(y), "/").concat(this._e.toISOTime(y)) : h;
                }, S.prototype.toLocaleString = function(y, D) {
                  return y === void 0 && (y = M.DATE_SHORT), D === void 0 && (D = {}), this.isValid ? C.Formatter.create(this._s.loc.clone(D), y).formatInterval(this) : h;
                }, S.prototype.toString = function() {
                  return this.isValid ? "[".concat(this._s.toISO(), " – ").concat(this._e.toISO(), ")") : h;
                }, S.prototype.union = function(y) {
                  if (!this.isValid)
                    return this;
                  var D = this._s < y._s ? this._s : y._s, A = this._e > y._e ? this._e : y._e;
                  return S.fromDateTimes(D, A);
                }, S;
              }()
            );
            n.Interval = R;
          }
        ),
        /***/
        "./src/settings.ts": (
          /*!*************************!*\
            !*** ./src/settings.ts ***!
            \*************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Settings = void 0;
            var m = s(
              /*! ./zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), d = s(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), k = s(
              /*! ./impl/zoneUtil */
              "./src/impl/zoneUtil.ts"
            ), N = s(
              /*! ./zones/systemZone */
              "./src/zones/systemZone.ts"
            ), I = s(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), U = s(
              /*! ./datetime */
              "./src/datetime.ts"
            ), C = s(
              /*! ./impl/digits */
              "./src/impl/digits.ts"
            ), M = function() {
              return Date.now();
            }, h = "system", T, E, R, S = 60, y = !1, D, A = (
              /** @class */
              function() {
                function Z() {
                }
                return Object.defineProperty(Z, "defaultLocale", {
                  /**
                   * Get the default locale to create DateTimes with. Does not affect existing instances.
                   */
                  get: function() {
                    return T;
                  },
                  /**
                   * Set the default locale to create DateTimes with. Does not affect existing instances.
                   */
                  set: function(w) {
                    T = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "defaultNumberingSystem", {
                  /**
                   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
                   */
                  get: function() {
                    return E;
                  },
                  /**
                   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
                   * @type {string}
                   */
                  set: function(w) {
                    E = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "defaultOutputCalendar", {
                  /**
                   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
                   */
                  get: function() {
                    return R;
                  },
                  /**
                   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
                   */
                  set: function(w) {
                    R = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "defaultWeekSettings", {
                  get: function() {
                    return D;
                  },
                  /**
                   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
                   * how many days are required in the first week of a year.
                   * Does not affect existing instances.
                   */
                  set: function(w) {
                    D = (0, I.validateWeekSettings)(w);
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "defaultZone", {
                  /**
                   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
                   */
                  get: function() {
                    return (0, k.normalizeZone)(h, N.SystemZone.instance);
                  },
                  /**
                   * [TS] had to use type Zone here. I created another setter to use a ZoneLike instead
                   * Let's face it. This is ugly. The original should have this approach as well.
                   * Set the default time zone to create DateTimes in. Does not affect existing instances.
                   * Use the value "system" to reset this value to the system's time zone.
                   */
                  set: function(w) {
                    h = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "defaultZoneLike", {
                  /**
                   * [TS] can't use the real setter here because set and get must have the same type.
                   * Let's face this. This is bullshit. But I get that you want to make life easier for users.
                   * Set the default time zone to create DateTimes in. Does not affect existing instances.
                   * Use the value "system" to reset this value to the system's time zone.
                   */
                  set: function(w) {
                    h = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "now", {
                  /**
                   * Get the callback for returning the current timestamp.
                   */
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  get: function() {
                    return M;
                  },
                  /**
                   * Set the callback for returning the current timestamp.
                   * The function should return a number, which will be interpreted as an Epoch millisecond count
                   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
                   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
                   */
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  set: function(w) {
                    M = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "throwOnInvalid", {
                  /**
                   * Get whether TSLuxon will throw when it encounters invalid DateTimes, Durations, or Intervals
                   */
                  get: function() {
                    return y;
                  },
                  /**
                   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
                   * @type {boolean}
                   */
                  set: function(w) {
                    y = w;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(Z, "twoDigitCutoffYear", {
                  /**
                   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
                   * @type {number}
                   */
                  get: function() {
                    return S;
                  },
                  /**
                   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
                   * @type {number}
                   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
                   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
                   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
                   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
                   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
                   */
                  set: function(w) {
                    S = w % 100;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Z.resetCaches = function() {
                  d.Locale.resetCache(), m.IANAZone.resetCache(), U.DateTime.resetCache(), (0, C.resetDigitRegexCache)();
                }, Z;
              }()
            );
            n.Settings = A;
          }
        ),
        /***/
        "./src/types/common.ts": (
          /*!*****************************!*\
            !*** ./src/types/common.ts ***!
            \*****************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/datetime.ts": (
          /*!*******************************!*\
            !*** ./src/types/datetime.ts ***!
            \*******************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/duration.ts": (
          /*!*******************************!*\
            !*** ./src/types/duration.ts ***!
            \*******************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/info.ts": (
          /*!***************************!*\
            !*** ./src/types/info.ts ***!
            \***************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/interval.ts": (
          /*!*******************************!*\
            !*** ./src/types/interval.ts ***!
            \*******************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/intl-next.ts": (
          /*!********************************!*\
            !*** ./src/types/intl-next.ts ***!
            \********************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.default = Intl;
          }
        ),
        /***/
        "./src/types/invalid.ts": (
          /*!******************************!*\
            !*** ./src/types/invalid.ts ***!
            \******************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Invalid = void 0;
            var s = (
              /** @class */
              function() {
                function m(d, k) {
                  this.reason = d, this.explanation = k, this._formattedExplanation = "", k && (this._formattedExplanation = ": ".concat(k));
                }
                return m.prototype.toMessage = function() {
                  return "".concat(this.reason).concat(this._formattedExplanation);
                }, m;
              }()
            );
            n.Invalid = s;
          }
        ),
        /***/
        "./src/types/locale.ts": (
          /*!*****************************!*\
            !*** ./src/types/locale.ts ***!
            \*****************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/public.ts": (
          /*!*****************************!*\
            !*** ./src/types/public.ts ***!
            \*****************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Intl = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            );
            m.__exportStar(s(
              /*! ./common */
              "./src/types/common.ts"
            ), n), m.__exportStar(s(
              /*! ./datetime */
              "./src/types/datetime.ts"
            ), n), m.__exportStar(s(
              /*! ./duration */
              "./src/types/duration.ts"
            ), n), m.__exportStar(s(
              /*! ./info */
              "./src/types/info.ts"
            ), n), m.__exportStar(s(
              /*! ./interval */
              "./src/types/interval.ts"
            ), n), m.__exportStar(s(
              /*! ./locale */
              "./src/types/locale.ts"
            ), n), m.__exportStar(s(
              /*! ./zone */
              "./src/types/zone.ts"
            ), n);
            var d = m.__importDefault(s(
              /*! ./intl-next */
              "./src/types/intl-next.ts"
            ));
            n.Intl = d.default;
          }
        ),
        /***/
        "./src/types/zone.ts": (
          /*!***************************!*\
            !*** ./src/types/zone.ts ***!
            \***************************/
          /***/
          (p, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/zone.ts": (
          /*!*********************!*\
            !*** ./src/zone.ts ***!
            \*********************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Zone = void 0;
            var m = s(
              /*! ./errors */
              "./src/errors.ts"
            ), d = (
              /** @class */
              function() {
                function k() {
                }
                return Object.defineProperty(k.prototype, "type", {
                  /**
                   * The type of zone
                   * @abstract
                   * @type {string}
                   */
                  get: function() {
                    throw new m.ZoneIsAbstractError();
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(k.prototype, "ianaName", {
                  /**
                   * The IANA name of this zone.
                   * Defaults to `name` if not overwritten by a subclass.
                   * @abstract
                   * @type {string}
                   */
                  get: function() {
                    return this.name;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(k.prototype, "name", {
                  /**
                   * The name of this zone.
                   * @abstract
                   * @type {string}
                   */
                  get: function() {
                    throw new m.ZoneIsAbstractError();
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(k.prototype, "isUniversal", {
                  /**
                   * Returns whether the offset is known to be fixed for the whole year.
                   * @abstract
                   * @type {boolean}
                   */
                  get: function() {
                    throw new m.ZoneIsAbstractError();
                  },
                  enumerable: !1,
                  configurable: !0
                }), k.prototype.offsetName = function(N, I) {
                  throw new m.ZoneIsAbstractError();
                }, k.prototype.formatOffset = function(N, I) {
                  throw new m.ZoneIsAbstractError();
                }, k.prototype.offset = function(N) {
                  throw new m.ZoneIsAbstractError();
                }, k.prototype.equals = function(N) {
                  throw new m.ZoneIsAbstractError();
                }, Object.defineProperty(k.prototype, "isValid", {
                  /**
                   * Return whether this Zone is valid.
                   * @abstract
                   * @type {boolean}
                   */
                  get: function() {
                    throw new m.ZoneIsAbstractError();
                  },
                  enumerable: !1,
                  configurable: !0
                }), k;
              }()
            );
            n.Zone = d;
          }
        ),
        /***/
        "./src/zones/IANAZone.ts": (
          /*!*******************************!*\
            !*** ./src/zones/IANAZone.ts ***!
            \*******************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.IANAZone = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ../impl/util */
              "./src/impl/util.ts"
            ), k = s(
              /*! ../zone */
              "./src/zone.ts"
            ), N = s(
              /*! ../errors */
              "./src/errors.ts"
            ), I = m.__importDefault(s(
              /*! ../types/intl-next */
              "./src/types/intl-next.ts"
            )), U = {};
            function C(S) {
              if (!U[S])
                try {
                  U[S] = new I.default.DateTimeFormat("en-US", {
                    hour12: !1,
                    timeZone: S,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    era: "short"
                  });
                } catch {
                  throw new N.InvalidZoneError(S);
                }
              return U[S];
            }
            var M = {
              year: 0,
              month: 1,
              day: 2,
              era: 3,
              hour: 4,
              minute: 5,
              second: 6
            };
            function h(S, y) {
              var D = S.format(y).replace(/\u200E/g, ""), A = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(D), Z = A[1], w = A[2], b = A[3], P = A[4], O = A[5], W = A[6], j = A[7];
              return [b, Z, w, P, O, W, j];
            }
            function T(S, y) {
              for (var D = S.formatToParts(y), A = [], Z = 0; Z < D.length; Z++) {
                var w = D[Z], b = w.type, P = w.value, O = M[b];
                b === "era" ? A[O] = P : (0, d.isUndefined)(O) || (A[O] = parseInt(P, 10));
              }
              return A;
            }
            var E = {}, R = (
              /** @class */
              function(S) {
                m.__extends(y, S);
                function y(D) {
                  var A = S.call(this) || this;
                  return A._zoneName = D, A._valid = y.isValidZone(D), A;
                }
                return y.create = function(D) {
                  return E[D] || (E[D] = new y(D)), E[D];
                }, y.resetCache = function() {
                  E = {}, U = {};
                }, y.isValidSpecifier = function(D) {
                  return this.isValidZone(D);
                }, y.isValidZone = function(D) {
                  if (!D)
                    return !1;
                  try {
                    return new I.default.DateTimeFormat("en-US", { timeZone: D }).format(), !0;
                  } catch {
                    return !1;
                  }
                }, Object.defineProperty(y.prototype, "type", {
                  /** @override **/
                  get: function() {
                    return "iana";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(y.prototype, "name", {
                  /** @override **/
                  get: function() {
                    return this._zoneName;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(y.prototype, "isUniversal", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), y.prototype.offsetName = function(D, A) {
                  var Z = A === void 0 ? {} : A, w = Z.format, b = Z.locale;
                  return (0, d.parseZoneInfo)(D, w, b, this.name);
                }, y.prototype.formatOffset = function(D, A) {
                  return (0, d.formatOffset)(this.offset(D), A);
                }, y.prototype.offset = function(D) {
                  var A = new Date(D);
                  if (isNaN(+A))
                    return NaN;
                  var Z = C(this.name), w, b = typeof Z.formatToParts == typeof isNaN ? T(Z, A) : h(Z, A), P = b[0], O = b[1], W = b[2], j = b[3], B = b[4], q = b[5], X = b[6];
                  j === "BC" && (w = -Math.abs(+P) + 1);
                  var z = B === 24 ? 0 : B, L = (0, d.objToLocalTS)({
                    year: w || +P,
                    month: +O,
                    day: +W,
                    hour: +z,
                    minute: +q,
                    second: +X,
                    millisecond: 0
                  }), Y = +A, V = Y % 1e3;
                  return Y -= V >= 0 ? V : 1e3 + V, (L - Y) / (60 * 1e3);
                }, y.prototype.equals = function(D) {
                  return D.type === "iana" && D.name === this.name;
                }, Object.defineProperty(y.prototype, "isValid", {
                  /** @override **/
                  get: function() {
                    return this._valid;
                  },
                  enumerable: !1,
                  configurable: !0
                }), y;
              }(k.Zone)
            );
            n.IANAZone = R;
          }
        ),
        /***/
        "./src/zones/fixedOffsetZone.ts": (
          /*!**************************************!*\
            !*** ./src/zones/fixedOffsetZone.ts ***!
            \**************************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.FixedOffsetZone = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ../impl/util */
              "./src/impl/util.ts"
            ), k = s(
              /*! ../zone */
              "./src/zone.ts"
            ), N = null, I = (
              /** @class */
              function(U) {
                m.__extends(C, U);
                function C(M) {
                  var h = U.call(this) || this;
                  return h._fixed = M, h;
                }
                return Object.defineProperty(C, "utcInstance", {
                  /**
                   * Get a singleton instance of UTC
                   * @return {FixedOffsetZone}
                   */
                  get: function() {
                    return N === null && (N = new C(0)), N;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "ianaName", {
                  /**
                   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
                   *
                   * @override
                   * @type {string}
                   */
                  get: function() {
                    return this._fixed === 0 ? "Etc/UTC" : "Etc/GMT".concat((0, d.formatOffset)(-this._fixed, "narrow"));
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "isUniversal", {
                  /**
                   * Returns whether the offset is known to be fixed for the whole year:
                   * Always returns true for all fixed offset zones.
                   * @override
                   * @type {boolean}
                   */
                  get: function() {
                    return !0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "isValid", {
                  /**
                   * Return whether this Zone is valid:
                   * All fixed offset zones are valid.
                   * @override
                   * @type {boolean}
                   */
                  get: function() {
                    return !0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "name", {
                  /**
                   * The name of this zone.
                   * All fixed zones' names always start with "UTC" (plus optional offset)
                   * @override
                   * @type {string}
                   */
                  get: function() {
                    return this._fixed === 0 ? "UTC" : "UTC".concat((0, d.formatOffset)(this._fixed, "narrow"));
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "type", {
                  /**
                   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
                   * @override
                   * @type {string}
                   */
                  get: function() {
                    return "fixed";
                  },
                  enumerable: !1,
                  configurable: !0
                }), C.instance = function(M) {
                  return M === 0 ? C.utcInstance : new C(M);
                }, C.parseSpecifier = function(M) {
                  if (M) {
                    var h = M.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
                    if (h)
                      return new C((0, d.signedOffset)(h[1], h[2]));
                  }
                  return null;
                }, C.prototype.equals = function(M) {
                  return M.type === "fixed" && M._fixed === this._fixed;
                }, C.prototype.formatOffset = function(M, h) {
                  return (0, d.formatOffset)(this._fixed, h);
                }, C.prototype.offset = function() {
                  return this._fixed;
                }, C.prototype.offsetName = function() {
                  return this.name;
                }, C;
              }(k.Zone)
            );
            n.FixedOffsetZone = I;
          }
        ),
        /***/
        "./src/zones/invalidZone.ts": (
          /*!**********************************!*\
            !*** ./src/zones/invalidZone.ts ***!
            \**********************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.InvalidZone = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ../zone */
              "./src/zone.ts"
            ), k = (
              /** @class */
              function(N) {
                m.__extends(I, N);
                function I(U) {
                  var C = N.call(this) || this;
                  return C._zoneName = U, Object.setPrototypeOf(C, I.prototype), C;
                }
                return Object.defineProperty(I.prototype, "type", {
                  /** @override **/
                  get: function() {
                    return "invalid";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(I.prototype, "name", {
                  /** @override **/
                  get: function() {
                    return this._zoneName;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(I.prototype, "isUniversal", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), I.prototype.offsetName = function() {
                  return null;
                }, I.prototype.formatOffset = function() {
                  return "";
                }, I.prototype.offset = function() {
                  return NaN;
                }, I.prototype.equals = function() {
                  return !1;
                }, Object.defineProperty(I.prototype, "isValid", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), I;
              }(d.Zone)
            );
            n.InvalidZone = k;
          }
        ),
        /***/
        "./src/zones/systemZone.ts": (
          /*!*********************************!*\
            !*** ./src/zones/systemZone.ts ***!
            \*********************************/
          /***/
          (p, n, s) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.SystemZone = void 0;
            var m = s(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), d = s(
              /*! ../impl/util */
              "./src/impl/util.ts"
            ), k = s(
              /*! ../zone */
              "./src/zone.ts"
            ), N = null, I = (
              /** @class */
              function(U) {
                m.__extends(C, U);
                function C() {
                  return U !== null && U.apply(this, arguments) || this;
                }
                return Object.defineProperty(C, "instance", {
                  /**
                   * Get a singleton instance of the local zone
                   * @return {SystemZone}
                   */
                  get: function() {
                    return N === null && (N = new C()), N;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "type", {
                  /** @override **/
                  get: function() {
                    return "system";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "name", {
                  /** @override **/
                  get: function() {
                    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(C.prototype, "isUniversal", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), C.prototype.offsetName = function(M, h) {
                  var T = h.format, E = h.locale;
                  return (0, d.parseZoneInfo)(M, T, E);
                }, C.prototype.formatOffset = function(M, h) {
                  return (0, d.formatOffset)(this.offset(M), h);
                }, C.prototype.offset = function(M) {
                  return -new Date(M).getTimezoneOffset();
                }, C.prototype.equals = function(M) {
                  return M.type === "system";
                }, Object.defineProperty(C.prototype, "isValid", {
                  /** @override **/
                  get: function() {
                    return !0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), C;
              }(k.Zone)
            );
            n.SystemZone = I;
          }
        ),
        /***/
        "./node_modules/tslib/tslib.es6.js": (
          /*!*****************************************!*\
            !*** ./node_modules/tslib/tslib.es6.js ***!
            \*****************************************/
          /***/
          (p, n, s) => {
            s.r(n), s.d(n, {
              /* harmony export */
              __assign: () => (
                /* binding */
                k
              ),
              /* harmony export */
              __asyncDelegator: () => (
                /* binding */
                j
              ),
              /* harmony export */
              __asyncGenerator: () => (
                /* binding */
                W
              ),
              /* harmony export */
              __asyncValues: () => (
                /* binding */
                B
              ),
              /* harmony export */
              __await: () => (
                /* binding */
                O
              ),
              /* harmony export */
              __awaiter: () => (
                /* binding */
                R
              ),
              /* harmony export */
              __classPrivateFieldGet: () => (
                /* binding */
                Y
              ),
              /* harmony export */
              __classPrivateFieldIn: () => (
                /* binding */
                ee
              ),
              /* harmony export */
              __classPrivateFieldSet: () => (
                /* binding */
                V
              ),
              /* harmony export */
              __createBinding: () => (
                /* binding */
                y
              ),
              /* harmony export */
              __decorate: () => (
                /* binding */
                I
              ),
              /* harmony export */
              __esDecorate: () => (
                /* binding */
                C
              ),
              /* harmony export */
              __exportStar: () => (
                /* binding */
                D
              ),
              /* harmony export */
              __extends: () => (
                /* binding */
                d
              ),
              /* harmony export */
              __generator: () => (
                /* binding */
                S
              ),
              /* harmony export */
              __importDefault: () => (
                /* binding */
                L
              ),
              /* harmony export */
              __importStar: () => (
                /* binding */
                z
              ),
              /* harmony export */
              __makeTemplateObject: () => (
                /* binding */
                q
              ),
              /* harmony export */
              __metadata: () => (
                /* binding */
                E
              ),
              /* harmony export */
              __param: () => (
                /* binding */
                U
              ),
              /* harmony export */
              __propKey: () => (
                /* binding */
                h
              ),
              /* harmony export */
              __read: () => (
                /* binding */
                Z
              ),
              /* harmony export */
              __rest: () => (
                /* binding */
                N
              ),
              /* harmony export */
              __runInitializers: () => (
                /* binding */
                M
              ),
              /* harmony export */
              __setFunctionName: () => (
                /* binding */
                T
              ),
              /* harmony export */
              __spread: () => (
                /* binding */
                w
              ),
              /* harmony export */
              __spreadArray: () => (
                /* binding */
                P
              ),
              /* harmony export */
              __spreadArrays: () => (
                /* binding */
                b
              ),
              /* harmony export */
              __values: () => (
                /* binding */
                A
              ),
              /* harmony export */
              default: () => ae
              /* harmony export */
            });
            var m = function(u, a) {
              return m = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(o, c) {
                o.__proto__ = c;
              } || function(o, c) {
                for (var g in c) Object.prototype.hasOwnProperty.call(c, g) && (o[g] = c[g]);
              }, m(u, a);
            };
            function d(u, a) {
              if (typeof a != "function" && a !== null)
                throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
              m(u, a);
              function o() {
                this.constructor = u;
              }
              u.prototype = a === null ? Object.create(a) : (o.prototype = a.prototype, new o());
            }
            var k = function() {
              return k = Object.assign || function(a) {
                for (var o, c = 1, g = arguments.length; c < g; c++) {
                  o = arguments[c];
                  for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (a[l] = o[l]);
                }
                return a;
              }, k.apply(this, arguments);
            };
            function N(u, a) {
              var o = {};
              for (var c in u) Object.prototype.hasOwnProperty.call(u, c) && a.indexOf(c) < 0 && (o[c] = u[c]);
              if (u != null && typeof Object.getOwnPropertySymbols == "function")
                for (var g = 0, c = Object.getOwnPropertySymbols(u); g < c.length; g++)
                  a.indexOf(c[g]) < 0 && Object.prototype.propertyIsEnumerable.call(u, c[g]) && (o[c[g]] = u[c[g]]);
              return o;
            }
            function I(u, a, o, c) {
              var g = arguments.length, l = g < 3 ? a : c === null ? c = Object.getOwnPropertyDescriptor(a, o) : c, _;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") l = Reflect.decorate(u, a, o, c);
              else for (var F = u.length - 1; F >= 0; F--) (_ = u[F]) && (l = (g < 3 ? _(l) : g > 3 ? _(a, o, l) : _(a, o)) || l);
              return g > 3 && l && Object.defineProperty(a, o, l), l;
            }
            function U(u, a) {
              return function(o, c) {
                a(o, c, u);
              };
            }
            function C(u, a, o, c, g, l) {
              function _(be) {
                if (be !== void 0 && typeof be != "function") throw new TypeError("Function expected");
                return be;
              }
              for (var F = c.kind, x = F === "getter" ? "get" : F === "setter" ? "set" : "value", H = !a && u ? c.static ? u : u.prototype : null, J = a || (H ? Object.getOwnPropertyDescriptor(H, c.name) : {}), K, Q = !1, ne = o.length - 1; ne >= 0; ne--) {
                var fe = {};
                for (var _e in c) fe[_e] = _e === "access" ? {} : c[_e];
                for (var _e in c.access) fe.access[_e] = c.access[_e];
                fe.addInitializer = function(be) {
                  if (Q) throw new TypeError("Cannot add initializers after decoration has completed");
                  l.push(_(be || null));
                };
                var Se = (0, o[ne])(F === "accessor" ? { get: J.get, set: J.set } : J[x], fe);
                if (F === "accessor") {
                  if (Se === void 0) continue;
                  if (Se === null || typeof Se != "object") throw new TypeError("Object expected");
                  (K = _(Se.get)) && (J.get = K), (K = _(Se.set)) && (J.set = K), (K = _(Se.init)) && g.unshift(K);
                } else (K = _(Se)) && (F === "field" ? g.unshift(K) : J[x] = K);
              }
              H && Object.defineProperty(H, c.name, J), Q = !0;
            }
            function M(u, a, o) {
              for (var c = arguments.length > 2, g = 0; g < a.length; g++)
                o = c ? a[g].call(u, o) : a[g].call(u);
              return c ? o : void 0;
            }
            function h(u) {
              return typeof u == "symbol" ? u : "".concat(u);
            }
            function T(u, a, o) {
              return typeof a == "symbol" && (a = a.description ? "[".concat(a.description, "]") : ""), Object.defineProperty(u, "name", { configurable: !0, value: o ? "".concat(o, " ", a) : a });
            }
            function E(u, a) {
              if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(u, a);
            }
            function R(u, a, o, c) {
              function g(l) {
                return l instanceof o ? l : new o(function(_) {
                  _(l);
                });
              }
              return new (o || (o = Promise))(function(l, _) {
                function F(J) {
                  try {
                    H(c.next(J));
                  } catch (K) {
                    _(K);
                  }
                }
                function x(J) {
                  try {
                    H(c.throw(J));
                  } catch (K) {
                    _(K);
                  }
                }
                function H(J) {
                  J.done ? l(J.value) : g(J.value).then(F, x);
                }
                H((c = c.apply(u, a || [])).next());
              });
            }
            function S(u, a) {
              var o = { label: 0, sent: function() {
                if (l[0] & 1) throw l[1];
                return l[1];
              }, trys: [], ops: [] }, c, g, l, _;
              return _ = { next: F(0), throw: F(1), return: F(2) }, typeof Symbol == "function" && (_[Symbol.iterator] = function() {
                return this;
              }), _;
              function F(H) {
                return function(J) {
                  return x([H, J]);
                };
              }
              function x(H) {
                if (c) throw new TypeError("Generator is already executing.");
                for (; _ && (_ = 0, H[0] && (o = 0)), o; ) try {
                  if (c = 1, g && (l = H[0] & 2 ? g.return : H[0] ? g.throw || ((l = g.return) && l.call(g), 0) : g.next) && !(l = l.call(g, H[1])).done) return l;
                  switch (g = 0, l && (H = [H[0] & 2, l.value]), H[0]) {
                    case 0:
                    case 1:
                      l = H;
                      break;
                    case 4:
                      return o.label++, { value: H[1], done: !1 };
                    case 5:
                      o.label++, g = H[1], H = [0];
                      continue;
                    case 7:
                      H = o.ops.pop(), o.trys.pop();
                      continue;
                    default:
                      if (l = o.trys, !(l = l.length > 0 && l[l.length - 1]) && (H[0] === 6 || H[0] === 2)) {
                        o = 0;
                        continue;
                      }
                      if (H[0] === 3 && (!l || H[1] > l[0] && H[1] < l[3])) {
                        o.label = H[1];
                        break;
                      }
                      if (H[0] === 6 && o.label < l[1]) {
                        o.label = l[1], l = H;
                        break;
                      }
                      if (l && o.label < l[2]) {
                        o.label = l[2], o.ops.push(H);
                        break;
                      }
                      l[2] && o.ops.pop(), o.trys.pop();
                      continue;
                  }
                  H = a.call(u, o);
                } catch (J) {
                  H = [6, J], g = 0;
                } finally {
                  c = l = 0;
                }
                if (H[0] & 5) throw H[1];
                return { value: H[0] ? H[1] : void 0, done: !0 };
              }
            }
            var y = Object.create ? function(u, a, o, c) {
              c === void 0 && (c = o);
              var g = Object.getOwnPropertyDescriptor(a, o);
              (!g || ("get" in g ? !a.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
                return a[o];
              } }), Object.defineProperty(u, c, g);
            } : function(u, a, o, c) {
              c === void 0 && (c = o), u[c] = a[o];
            };
            function D(u, a) {
              for (var o in u) o !== "default" && !Object.prototype.hasOwnProperty.call(a, o) && y(a, u, o);
            }
            function A(u) {
              var a = typeof Symbol == "function" && Symbol.iterator, o = a && u[a], c = 0;
              if (o) return o.call(u);
              if (u && typeof u.length == "number") return {
                next: function() {
                  return u && c >= u.length && (u = void 0), { value: u && u[c++], done: !u };
                }
              };
              throw new TypeError(a ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }
            function Z(u, a) {
              var o = typeof Symbol == "function" && u[Symbol.iterator];
              if (!o) return u;
              var c = o.call(u), g, l = [], _;
              try {
                for (; (a === void 0 || a-- > 0) && !(g = c.next()).done; ) l.push(g.value);
              } catch (F) {
                _ = { error: F };
              } finally {
                try {
                  g && !g.done && (o = c.return) && o.call(c);
                } finally {
                  if (_) throw _.error;
                }
              }
              return l;
            }
            function w() {
              for (var u = [], a = 0; a < arguments.length; a++)
                u = u.concat(Z(arguments[a]));
              return u;
            }
            function b() {
              for (var u = 0, a = 0, o = arguments.length; a < o; a++) u += arguments[a].length;
              for (var c = Array(u), g = 0, a = 0; a < o; a++)
                for (var l = arguments[a], _ = 0, F = l.length; _ < F; _++, g++)
                  c[g] = l[_];
              return c;
            }
            function P(u, a, o) {
              if (o || arguments.length === 2) for (var c = 0, g = a.length, l; c < g; c++)
                (l || !(c in a)) && (l || (l = Array.prototype.slice.call(a, 0, c)), l[c] = a[c]);
              return u.concat(l || Array.prototype.slice.call(a));
            }
            function O(u) {
              return this instanceof O ? (this.v = u, this) : new O(u);
            }
            function W(u, a, o) {
              if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
              var c = o.apply(u, a || []), g, l = [];
              return g = {}, _("next"), _("throw"), _("return"), g[Symbol.asyncIterator] = function() {
                return this;
              }, g;
              function _(Q) {
                c[Q] && (g[Q] = function(ne) {
                  return new Promise(function(fe, _e) {
                    l.push([Q, ne, fe, _e]) > 1 || F(Q, ne);
                  });
                });
              }
              function F(Q, ne) {
                try {
                  x(c[Q](ne));
                } catch (fe) {
                  K(l[0][3], fe);
                }
              }
              function x(Q) {
                Q.value instanceof O ? Promise.resolve(Q.value.v).then(H, J) : K(l[0][2], Q);
              }
              function H(Q) {
                F("next", Q);
              }
              function J(Q) {
                F("throw", Q);
              }
              function K(Q, ne) {
                Q(ne), l.shift(), l.length && F(l[0][0], l[0][1]);
              }
            }
            function j(u) {
              var a, o;
              return a = {}, c("next"), c("throw", function(g) {
                throw g;
              }), c("return"), a[Symbol.iterator] = function() {
                return this;
              }, a;
              function c(g, l) {
                a[g] = u[g] ? function(_) {
                  return (o = !o) ? { value: O(u[g](_)), done: !1 } : l ? l(_) : _;
                } : l;
              }
            }
            function B(u) {
              if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
              var a = u[Symbol.asyncIterator], o;
              return a ? a.call(u) : (u = typeof A == "function" ? A(u) : u[Symbol.iterator](), o = {}, c("next"), c("throw"), c("return"), o[Symbol.asyncIterator] = function() {
                return this;
              }, o);
              function c(l) {
                o[l] = u[l] && function(_) {
                  return new Promise(function(F, x) {
                    _ = u[l](_), g(F, x, _.done, _.value);
                  });
                };
              }
              function g(l, _, F, x) {
                Promise.resolve(x).then(function(H) {
                  l({ value: H, done: F });
                }, _);
              }
            }
            function q(u, a) {
              return Object.defineProperty ? Object.defineProperty(u, "raw", { value: a }) : u.raw = a, u;
            }
            var X = Object.create ? function(u, a) {
              Object.defineProperty(u, "default", { enumerable: !0, value: a });
            } : function(u, a) {
              u.default = a;
            };
            function z(u) {
              if (u && u.__esModule) return u;
              var a = {};
              if (u != null) for (var o in u) o !== "default" && Object.prototype.hasOwnProperty.call(u, o) && y(a, u, o);
              return X(a, u), a;
            }
            function L(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function Y(u, a, o, c) {
              if (o === "a" && !c) throw new TypeError("Private accessor was defined without a getter");
              if (typeof a == "function" ? u !== a || !c : !a.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
              return o === "m" ? c : o === "a" ? c.call(u) : c ? c.value : a.get(u);
            }
            function V(u, a, o, c, g) {
              if (c === "m") throw new TypeError("Private method is not writable");
              if (c === "a" && !g) throw new TypeError("Private accessor was defined without a setter");
              if (typeof a == "function" ? u !== a || !g : !a.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
              return c === "a" ? g.call(u, o) : g ? g.value = o : a.set(u, o), o;
            }
            function ee(u, a) {
              if (a === null || typeof a != "object" && typeof a != "function") throw new TypeError("Cannot use 'in' operator on non-object");
              return typeof u == "function" ? a === u : u.has(a);
            }
            const ae = {
              __extends: d,
              __assign: k,
              __rest: N,
              __decorate: I,
              __param: U,
              __metadata: E,
              __awaiter: R,
              __generator: S,
              __createBinding: y,
              __exportStar: D,
              __values: A,
              __read: Z,
              __spread: w,
              __spreadArrays: b,
              __spreadArray: P,
              __await: O,
              __asyncGenerator: W,
              __asyncDelegator: j,
              __asyncValues: B,
              __makeTemplateObject: q,
              __importStar: z,
              __importDefault: L,
              __classPrivateFieldGet: Y,
              __classPrivateFieldSet: V,
              __classPrivateFieldIn: ee
            };
          }
        )
        /******/
      }, i = {};
      function f(p) {
        var n = i[p];
        if (n !== void 0)
          return n.exports;
        var s = i[p] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        return t[p](s, s.exports, f), s.exports;
      }
      f.d = (p, n) => {
        for (var s in n)
          f.o(n, s) && !f.o(p, s) && Object.defineProperty(p, s, { enumerable: !0, get: n[s] });
      }, f.o = (p, n) => Object.prototype.hasOwnProperty.call(p, n), f.r = (p) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(p, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(p, "__esModule", { value: !0 });
      };
      var v = f("./src/index.ts");
      return v;
    })()
  ));
})(lr);
var ue = lr.exports, Et = [
  "MO",
  "TU",
  "WE",
  "TH",
  "FR",
  "SA",
  "SU"
], Oe = (
  /** @class */
  function() {
    function r(e, t) {
      if (t === 0)
        throw new Error("Can't create weekday with n == 0");
      this.weekday = e, this.n = t;
    }
    return r.fromStr = function(e) {
      return new r(Et.indexOf(e));
    }, r.prototype.nth = function(e) {
      return this.n === e ? this : new r(this.weekday, e);
    }, r.prototype.equals = function(e) {
      return this.weekday === e.weekday && this.n === e.n;
    }, r.prototype.toString = function() {
      var e = Et[this.weekday];
      return this.n && (e = (this.n > 0 ? "+" : "") + String(this.n) + e), e;
    }, r.prototype.getJsWeekday = function() {
      return this.weekday === 6 ? 0 : this.weekday + 1;
    }, r;
  }()
), ve = function(r) {
  return r != null;
}, We = function(r) {
  return typeof r == "number";
}, Ut = function(r) {
  return typeof r == "string" && Et.includes(r);
}, ke = Array.isArray, Ue = function(r, e) {
  e === void 0 && (e = r), arguments.length === 1 && (e = r, r = 0);
  for (var t = [], i = r; i < e; i++)
    t.push(i);
  return t;
}, ie = function(r, e) {
  var t = 0, i = [];
  if (ke(r))
    for (; t < e; t++)
      i[t] = [].concat(r);
  else
    for (; t < e; t++)
      i[t] = r;
  return i;
}, Nr = function(r) {
  return ke(r) ? r : [r];
};
function Ke(r, e, t) {
  t === void 0 && (t = " ");
  var i = String(r);
  return e = e >> 0, i.length > e ? String(i) : (e = e - i.length, e > t.length && (t += ie(t, e / t.length)), t.slice(0, e) + String(i));
}
var Lr = function(r, e, t) {
  var i = r.split(e);
  return t ? i.slice(0, t).concat([i.slice(t).join(e)]) : i;
}, Le = function(r, e) {
  var t = r % e;
  return t * e < 0 ? t + e : t;
}, yt = function(r, e) {
  return { div: Math.floor(r / e), mod: Le(r, e) };
}, Re = function(r) {
  return !ve(r) || r.length === 0;
}, ge = function(r) {
  return !Re(r);
}, le = function(r, e) {
  return ge(r) && r.indexOf(e) !== -1;
}, $e = function(r, e, t, i, f, v) {
  return i === void 0 && (i = 0), f === void 0 && (f = 0), v === void 0 && (v = 0), new Date(Date.UTC(r, e - 1, t, i, f, v));
}, Ar = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], cr = 1e3 * 60 * 60 * 24, fr = 9999, dr = $e(1970, 1, 1), Cr = [6, 0, 1, 2, 3, 4, 5], at = function(r) {
  return r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
}, hr = function(r) {
  return r instanceof Date;
}, nt = function(r) {
  return hr(r) && !isNaN(r.getTime());
}, Fr = function(r, e) {
  var t = r.getTime(), i = e.getTime(), f = t - i;
  return Math.round(f / cr);
}, Ot = function(r) {
  return Fr(r, dr);
}, mr = function(r) {
  return new Date(dr.getTime() + r * cr);
}, Wr = function(r) {
  var e = r.getUTCMonth();
  return e === 1 && at(r.getUTCFullYear()) ? 29 : Ar[e];
}, Qe = function(r) {
  return Cr[r.getUTCDay()];
}, Zt = function(r, e) {
  var t = $e(r, e + 1, 1);
  return [Qe(t), Wr(t)];
}, yr = function(r, e) {
  return e = e || r, new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
}, wt = function(r) {
  var e = new Date(r.getTime());
  return e;
}, Ht = function(r) {
  for (var e = [], t = 0; t < r.length; t++)
    e.push(wt(r[t]));
  return e;
}, st = function(r) {
  r.sort(function(e, t) {
    return e.getTime() - t.getTime();
  });
}, Lt = function(r, e) {
  e === void 0 && (e = !0);
  var t = new Date(r);
  return [
    Ke(t.getUTCFullYear().toString(), 4, "0"),
    Ke(t.getUTCMonth() + 1, 2, "0"),
    Ke(t.getUTCDate(), 2, "0"),
    "T",
    Ke(t.getUTCHours(), 2, "0"),
    Ke(t.getUTCMinutes(), 2, "0"),
    Ke(t.getUTCSeconds(), 2, "0"),
    e ? "Z" : ""
  ].join("");
}, At = function(r) {
  var e = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/, t = e.exec(r);
  if (!t)
    throw new Error("Invalid UNTIL value: ".concat(r));
  return new Date(Date.UTC(parseInt(t[1], 10), parseInt(t[2], 10) - 1, parseInt(t[3], 10), parseInt(t[5], 10) || 0, parseInt(t[6], 10) || 0, parseInt(t[7], 10) || 0));
}, xt = function(r, e) {
  var t = r.toLocaleString("sv-SE", { timeZone: e });
  return t.replace(" ", "T") + "Z";
}, Pr = function(r, e) {
  var t = Intl.DateTimeFormat().resolvedOptions().timeZone, i = new Date(xt(r, t)), f = new Date(xt(r, e ?? "UTC")), v = f.getTime() - i.getTime();
  return new Date(r.getTime() - v);
}, Je = (
  /** @class */
  function() {
    function r(e, t) {
      this.minDate = null, this.maxDate = null, this._result = [], this.total = 0, this.method = e, this.args = t, e === "between" ? (this.maxDate = t.inc ? t.before : new Date(t.before.getTime() - 1), this.minDate = t.inc ? t.after : new Date(t.after.getTime() + 1)) : e === "before" ? this.maxDate = t.inc ? t.dt : new Date(t.dt.getTime() - 1) : e === "after" && (this.minDate = t.inc ? t.dt : new Date(t.dt.getTime() + 1));
    }
    return r.prototype.accept = function(e) {
      ++this.total;
      var t = this.minDate && e < this.minDate, i = this.maxDate && e > this.maxDate;
      if (this.method === "between") {
        if (t)
          return !0;
        if (i)
          return !1;
      } else if (this.method === "before") {
        if (i)
          return !1;
      } else if (this.method === "after")
        return t ? !0 : (this.add(e), !1);
      return this.add(e);
    }, r.prototype.add = function(e) {
      return this._result.push(e), !0;
    }, r.prototype.getValue = function() {
      var e = this._result;
      switch (this.method) {
        case "all":
        case "between":
          return e;
        case "before":
        case "after":
        default:
          return e.length ? e[e.length - 1] : null;
      }
    }, r.prototype.clone = function() {
      return new r(this.method, this.args);
    }, r;
  }()
), Dt = function(r, e) {
  return Dt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, i) {
    t.__proto__ = i;
  } || function(t, i) {
    for (var f in i) Object.prototype.hasOwnProperty.call(i, f) && (t[f] = i[f]);
  }, Dt(r, e);
};
function Ct(r, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Dt(r, e);
  function t() {
    this.constructor = r;
  }
  r.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var Me = function() {
  return Me = Object.assign || function(e) {
    for (var t, i = 1, f = arguments.length; i < f; i++) {
      t = arguments[i];
      for (var v in t) Object.prototype.hasOwnProperty.call(t, v) && (e[v] = t[v]);
    }
    return e;
  }, Me.apply(this, arguments);
};
function $(r, e, t) {
  if (t || arguments.length === 2) for (var i = 0, f = e.length, v; i < f; i++)
    (v || !(i in e)) && (v || (v = Array.prototype.slice.call(e, 0, i)), v[i] = e[i]);
  return r.concat(v || Array.prototype.slice.call(e));
}
var zt = (
  /** @class */
  function(r) {
    Ct(e, r);
    function e(t, i, f) {
      var v = r.call(this, t, i) || this;
      return v.iterator = f, v;
    }
    return e.prototype.add = function(t) {
      return this.iterator(t, this._result.length) ? (this._result.push(t), !0) : !1;
    }, e;
  }(Je)
), lt = {
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  tokens: {
    SKIP: /^[ \r\n\t]+|^\.$/,
    number: /^[1-9][0-9]*/,
    numberAsText: /^(one|two|three)/i,
    every: /^every/i,
    "day(s)": /^days?/i,
    "weekday(s)": /^weekdays?/i,
    "week(s)": /^weeks?/i,
    "hour(s)": /^hours?/i,
    "minute(s)": /^minutes?/i,
    "month(s)": /^months?/i,
    "year(s)": /^years?/i,
    on: /^(on|in)/i,
    at: /^(at)/i,
    the: /^the/i,
    first: /^first/i,
    second: /^second/i,
    third: /^third/i,
    nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
    last: /^last/i,
    for: /^for/i,
    "time(s)": /^times?/i,
    until: /^(un)?til/i,
    monday: /^mo(n(day)?)?/i,
    tuesday: /^tu(e(s(day)?)?)?/i,
    wednesday: /^we(d(n(esday)?)?)?/i,
    thursday: /^th(u(r(sday)?)?)?/i,
    friday: /^fr(i(day)?)?/i,
    saturday: /^sa(t(urday)?)?/i,
    sunday: /^su(n(day)?)?/i,
    january: /^jan(uary)?/i,
    february: /^feb(ruary)?/i,
    march: /^mar(ch)?/i,
    april: /^apr(il)?/i,
    may: /^may/i,
    june: /^june?/i,
    july: /^july?/i,
    august: /^aug(ust)?/i,
    september: /^sep(t(ember)?)?/i,
    october: /^oct(ober)?/i,
    november: /^nov(ember)?/i,
    december: /^dec(ember)?/i,
    comma: /^(,\s*|(and|or)\s*)+/i
  }
}, Yt = function(r, e) {
  return r.indexOf(e) !== -1;
}, Rr = function(r) {
  return r.toString();
}, jr = function(r, e, t) {
  return "".concat(e, " ").concat(t, ", ").concat(r);
}, Ye = (
  /** @class */
  function() {
    function r(e, t, i, f) {
      if (t === void 0 && (t = Rr), i === void 0 && (i = lt), f === void 0 && (f = jr), this.text = [], this.language = i || lt, this.gettext = t, this.dateFormatter = f, this.rrule = e, this.options = e.options, this.origOptions = e.origOptions, this.origOptions.bymonthday) {
        var v = [].concat(this.options.bymonthday), p = [].concat(this.options.bynmonthday);
        v.sort(function(d, k) {
          return d - k;
        }), p.sort(function(d, k) {
          return k - d;
        }), this.bymonthday = v.concat(p), this.bymonthday.length || (this.bymonthday = null);
      }
      if (ve(this.origOptions.byweekday)) {
        var n = ke(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday], s = String(n);
        this.byweekday = {
          allWeeks: n.filter(function(d) {
            return !d.n;
          }),
          someWeeks: n.filter(function(d) {
            return !!d.n;
          }),
          isWeekdays: s.indexOf("MO") !== -1 && s.indexOf("TU") !== -1 && s.indexOf("WE") !== -1 && s.indexOf("TH") !== -1 && s.indexOf("FR") !== -1 && s.indexOf("SA") === -1 && s.indexOf("SU") === -1,
          isEveryDay: s.indexOf("MO") !== -1 && s.indexOf("TU") !== -1 && s.indexOf("WE") !== -1 && s.indexOf("TH") !== -1 && s.indexOf("FR") !== -1 && s.indexOf("SA") !== -1 && s.indexOf("SU") !== -1
        };
        var m = function(d, k) {
          return d.weekday - k.weekday;
        };
        this.byweekday.allWeeks.sort(m), this.byweekday.someWeeks.sort(m), this.byweekday.allWeeks.length || (this.byweekday.allWeeks = null), this.byweekday.someWeeks.length || (this.byweekday.someWeeks = null);
      } else
        this.byweekday = null;
    }
    return r.isFullyConvertible = function(e) {
      var t = !0;
      if (!(e.options.freq in r.IMPLEMENTED) || e.origOptions.until && e.origOptions.count)
        return !1;
      for (var i in e.origOptions) {
        if (Yt(["dtstart", "tzid", "wkst", "freq"], i))
          return !0;
        if (!Yt(r.IMPLEMENTED[e.options.freq], i))
          return !1;
      }
      return t;
    }, r.prototype.isFullyConvertible = function() {
      return r.isFullyConvertible(this.rrule);
    }, r.prototype.toString = function() {
      var e = this.gettext;
      if (!(this.options.freq in r.IMPLEMENTED))
        return e("RRule error: Unable to fully convert this rrule to text");
      if (this.text = [e("every")], this[re.FREQUENCIES[this.options.freq]](), this.options.until) {
        this.add(e("until"));
        var t = this.options.until;
        this.add(this.dateFormatter(t.getUTCFullYear(), this.language.monthNames[t.getUTCMonth()], t.getUTCDate()));
      } else this.options.count && this.add(e("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? e("times") : e("time"));
      return this.isFullyConvertible() || this.add(e("(~ approximate)")), this.text.join("");
    }, r.prototype.HOURLY = function() {
      var e = this.gettext;
      this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? e("hours") : e("hour"));
    }, r.prototype.MINUTELY = function() {
      var e = this.gettext;
      this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? e("minutes") : e("minute"));
    }, r.prototype.DAILY = function() {
      var e = this.gettext;
      this.options.interval !== 1 && this.add(this.options.interval.toString()), this.byweekday && this.byweekday.isWeekdays ? this.add(this.plural(this.options.interval) ? e("weekdays") : e("weekday")) : this.add(this.plural(this.options.interval) ? e("days") : e("day")), this.origOptions.bymonth && (this.add(e("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday ? this._byweekday() : this.origOptions.byhour && this._byhour();
    }, r.prototype.WEEKLY = function() {
      var e = this.gettext;
      this.options.interval !== 1 && this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? e("weeks") : e("week")), this.byweekday && this.byweekday.isWeekdays ? this.options.interval === 1 ? this.add(this.plural(this.options.interval) ? e("weekdays") : e("weekday")) : this.add(e("on")).add(e("weekdays")) : this.byweekday && this.byweekday.isEveryDay ? this.add(this.plural(this.options.interval) ? e("days") : e("day")) : (this.options.interval === 1 && this.add(e("week")), this.origOptions.bymonth && (this.add(e("in")), this._bymonth()), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.origOptions.byhour && this._byhour());
    }, r.prototype.MONTHLY = function() {
      var e = this.gettext;
      this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()).add(e("months")), this.plural(this.options.interval) && this.add(e("in"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? e("months") : e("month"))), this.bymonthday ? this._bymonthday() : this.byweekday && this.byweekday.isWeekdays ? this.add(e("on")).add(e("weekdays")) : this.byweekday && this._byweekday();
    }, r.prototype.YEARLY = function() {
      var e = this.gettext;
      this.origOptions.bymonth ? (this.options.interval !== 1 && (this.add(this.options.interval.toString()), this.add(e("years"))), this._bymonth()) : (this.options.interval !== 1 && this.add(this.options.interval.toString()), this.add(this.plural(this.options.interval) ? e("years") : e("year"))), this.bymonthday ? this._bymonthday() : this.byweekday && this._byweekday(), this.options.byyearday && this.add(e("on the")).add(this.list(this.options.byyearday, this.nth, e("and"))).add(e("day")), this.options.byweekno && this.add(e("in")).add(this.plural(this.options.byweekno.length) ? e("weeks") : e("week")).add(this.list(this.options.byweekno, void 0, e("and")));
    }, r.prototype._bymonthday = function() {
      var e = this.gettext;
      this.byweekday && this.byweekday.allWeeks ? this.add(e("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, e("or"))).add(e("the")).add(this.list(this.bymonthday, this.nth, e("or"))) : this.add(e("on the")).add(this.list(this.bymonthday, this.nth, e("and")));
    }, r.prototype._byweekday = function() {
      var e = this.gettext;
      this.byweekday.allWeeks && !this.byweekday.isWeekdays && this.add(e("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext)), this.byweekday.someWeeks && (this.byweekday.allWeeks && this.add(e("and")), this.add(e("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, e("and"))));
    }, r.prototype._byhour = function() {
      var e = this.gettext;
      this.add(e("at")).add(this.list(this.origOptions.byhour, void 0, e("and")));
    }, r.prototype._bymonth = function() {
      this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
    }, r.prototype.nth = function(e) {
      e = parseInt(e.toString(), 10);
      var t, i = this.gettext;
      if (e === -1)
        return i("last");
      var f = Math.abs(e);
      switch (f) {
        case 1:
        case 21:
        case 31:
          t = f + i("st");
          break;
        case 2:
        case 22:
          t = f + i("nd");
          break;
        case 3:
        case 23:
          t = f + i("rd");
          break;
        default:
          t = f + i("th");
      }
      return e < 0 ? t + " " + i("last") : t;
    }, r.prototype.monthtext = function(e) {
      return this.language.monthNames[e - 1];
    }, r.prototype.weekdaytext = function(e) {
      var t = We(e) ? (e + 1) % 7 : e.getJsWeekday();
      return (e.n ? this.nth(e.n) + " " : "") + this.language.dayNames[t];
    }, r.prototype.plural = function(e) {
      return e % 100 !== 1;
    }, r.prototype.add = function(e) {
      return this.text.push(" "), this.text.push(e), this;
    }, r.prototype.list = function(e, t, i, f) {
      var v = this;
      f === void 0 && (f = ","), ke(e) || (e = [e]);
      var p = function(s, m, d) {
        for (var k = "", N = 0; N < s.length; N++)
          N !== 0 && (N === s.length - 1 ? k += " " + d + " " : k += m + " "), k += s[N];
        return k;
      };
      t = t || function(s) {
        return s.toString();
      };
      var n = function(s) {
        return t && t.call(v, s);
      };
      return i ? p(e.map(n), f, i) : e.map(n).join(f + " ");
    }, r;
  }()
), Ur = (
  /** @class */
  function() {
    function r(e) {
      this.done = !0, this.rules = e;
    }
    return r.prototype.start = function(e) {
      return this.text = e, this.done = !1, this.nextSymbol();
    }, r.prototype.isDone = function() {
      return this.done && this.symbol === null;
    }, r.prototype.nextSymbol = function() {
      var e, t;
      this.symbol = null, this.value = null;
      do {
        if (this.done)
          return !1;
        var i = void 0;
        e = null;
        for (var f in this.rules) {
          i = this.rules[f];
          var v = i.exec(this.text);
          v && (e === null || v[0].length > e[0].length) && (e = v, t = f);
        }
        if (e != null && (this.text = this.text.substr(e[0].length), this.text === "" && (this.done = !0)), e == null) {
          this.done = !0, this.symbol = null, this.value = null;
          return;
        }
      } while (t === "SKIP");
      return this.symbol = t, this.value = e, !0;
    }, r.prototype.accept = function(e) {
      if (this.symbol === e) {
        if (this.value) {
          var t = this.value;
          return this.nextSymbol(), t;
        }
        return this.nextSymbol(), !0;
      }
      return !1;
    }, r.prototype.acceptNumber = function() {
      return this.accept("number");
    }, r.prototype.expect = function(e) {
      if (this.accept(e))
        return !0;
      throw new Error("expected " + e + " but found " + this.symbol);
    }, r;
  }()
);
function vr(r, e) {
  e === void 0 && (e = lt);
  var t = {}, i = new Ur(e.tokens);
  if (!i.start(r))
    return null;
  return f(), t;
  function f() {
    i.expect("every");
    var N = i.acceptNumber();
    if (N && (t.interval = parseInt(N[0], 10)), i.isDone())
      throw new Error("Unexpected end");
    switch (i.symbol) {
      case "day(s)":
        t.freq = re.DAILY, i.nextSymbol() && (p(), k());
        break;
      case "weekday(s)":
        t.freq = re.WEEKLY, t.byweekday = [re.MO, re.TU, re.WE, re.TH, re.FR], i.nextSymbol(), p(), k();
        break;
      case "week(s)":
        t.freq = re.WEEKLY, i.nextSymbol() && (v(), p(), k());
        break;
      case "hour(s)":
        t.freq = re.HOURLY, i.nextSymbol() && (v(), k());
        break;
      case "minute(s)":
        t.freq = re.MINUTELY, i.nextSymbol() && (v(), k());
        break;
      case "month(s)":
        t.freq = re.MONTHLY, i.nextSymbol() && (v(), k());
        break;
      case "year(s)":
        t.freq = re.YEARLY, i.nextSymbol() && (v(), k());
        break;
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        t.freq = re.WEEKLY;
        var I = i.symbol.substr(0, 2).toUpperCase();
        if (t.byweekday = [re[I]], !i.nextSymbol())
          return;
        for (; i.accept("comma"); ) {
          if (i.isDone())
            throw new Error("Unexpected end");
          var U = s();
          if (!U)
            throw new Error("Unexpected symbol " + i.symbol + ", expected weekday");
          t.byweekday.push(re[U]), i.nextSymbol();
        }
        p(), d(), k();
        break;
      case "january":
      case "february":
      case "march":
      case "april":
      case "may":
      case "june":
      case "july":
      case "august":
      case "september":
      case "october":
      case "november":
      case "december":
        if (t.freq = re.YEARLY, t.bymonth = [n()], !i.nextSymbol())
          return;
        for (; i.accept("comma"); ) {
          if (i.isDone())
            throw new Error("Unexpected end");
          var C = n();
          if (!C)
            throw new Error("Unexpected symbol " + i.symbol + ", expected month");
          t.bymonth.push(C), i.nextSymbol();
        }
        v(), k();
        break;
      default:
        throw new Error("Unknown symbol");
    }
  }
  function v() {
    var N = i.accept("on"), I = i.accept("the");
    if (N || I)
      do {
        var U = m(), C = s(), M = n();
        if (U)
          C ? (i.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(re[C].nth(U))) : (t.bymonthday || (t.bymonthday = []), t.bymonthday.push(U), i.accept("day(s)"));
        else if (C)
          i.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(re[C]);
        else if (i.symbol === "weekday(s)")
          i.nextSymbol(), t.byweekday || (t.byweekday = [re.MO, re.TU, re.WE, re.TH, re.FR]);
        else if (i.symbol === "week(s)") {
          i.nextSymbol();
          var h = i.acceptNumber();
          if (!h)
            throw new Error("Unexpected symbol " + i.symbol + ", expected week number");
          for (t.byweekno = [parseInt(h[0], 10)]; i.accept("comma"); ) {
            if (h = i.acceptNumber(), !h)
              throw new Error("Unexpected symbol " + i.symbol + "; expected monthday");
            t.byweekno.push(parseInt(h[0], 10));
          }
        } else if (M)
          i.nextSymbol(), t.bymonth || (t.bymonth = []), t.bymonth.push(M);
        else
          return;
      } while (i.accept("comma") || i.accept("the") || i.accept("on"));
  }
  function p() {
    var N = i.accept("at");
    if (N)
      do {
        var I = i.acceptNumber();
        if (!I)
          throw new Error("Unexpected symbol " + i.symbol + ", expected hour");
        for (t.byhour = [parseInt(I[0], 10)]; i.accept("comma"); ) {
          if (I = i.acceptNumber(), !I)
            throw new Error("Unexpected symbol " + i.symbol + "; expected hour");
          t.byhour.push(parseInt(I[0], 10));
        }
      } while (i.accept("comma") || i.accept("at"));
  }
  function n() {
    switch (i.symbol) {
      case "january":
        return 1;
      case "february":
        return 2;
      case "march":
        return 3;
      case "april":
        return 4;
      case "may":
        return 5;
      case "june":
        return 6;
      case "july":
        return 7;
      case "august":
        return 8;
      case "september":
        return 9;
      case "october":
        return 10;
      case "november":
        return 11;
      case "december":
        return 12;
      default:
        return !1;
    }
  }
  function s() {
    switch (i.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return i.symbol.substr(0, 2).toUpperCase();
      default:
        return !1;
    }
  }
  function m() {
    switch (i.symbol) {
      case "last":
        return i.nextSymbol(), -1;
      case "first":
        return i.nextSymbol(), 1;
      case "second":
        return i.nextSymbol(), i.accept("last") ? -2 : 2;
      case "third":
        return i.nextSymbol(), i.accept("last") ? -3 : 3;
      case "nth":
        var N = parseInt(i.value[1], 10);
        if (N < -366 || N > 366)
          throw new Error("Nth out of range: " + N);
        return i.nextSymbol(), i.accept("last") ? -N : N;
      default:
        return !1;
    }
  }
  function d() {
    i.accept("on"), i.accept("the");
    var N = m();
    if (N)
      for (t.bymonthday = [N], i.nextSymbol(); i.accept("comma"); ) {
        if (N = m(), !N)
          throw new Error("Unexpected symbol " + i.symbol + "; expected monthday");
        t.bymonthday.push(N), i.nextSymbol();
      }
  }
  function k() {
    if (i.symbol === "until") {
      var N = Date.parse(i.text);
      if (!N)
        throw new Error("Cannot parse until date:" + i.text);
      t.until = new Date(N);
    } else i.accept("for") && (t.count = parseInt(i.value[0], 10), i.expect("number"));
  }
}
var oe;
(function(r) {
  r[r.YEARLY = 0] = "YEARLY", r[r.MONTHLY = 1] = "MONTHLY", r[r.WEEKLY = 2] = "WEEKLY", r[r.DAILY = 3] = "DAILY", r[r.HOURLY = 4] = "HOURLY", r[r.MINUTELY = 5] = "MINUTELY", r[r.SECONDLY = 6] = "SECONDLY";
})(oe || (oe = {}));
function Ft(r) {
  return r < oe.HOURLY;
}
var Zr = function(r, e) {
  return e === void 0 && (e = lt), new re(vr(r, e) || void 0);
}, Xe = [
  "count",
  "until",
  "interval",
  "byweekday",
  "bymonthday",
  "bymonth"
];
Ye.IMPLEMENTED = [];
Ye.IMPLEMENTED[oe.HOURLY] = Xe;
Ye.IMPLEMENTED[oe.MINUTELY] = Xe;
Ye.IMPLEMENTED[oe.DAILY] = ["byhour"].concat(Xe);
Ye.IMPLEMENTED[oe.WEEKLY] = Xe;
Ye.IMPLEMENTED[oe.MONTHLY] = Xe;
Ye.IMPLEMENTED[oe.YEARLY] = ["byweekno", "byyearday"].concat(Xe);
var Hr = function(r, e, t, i) {
  return new Ye(r, e, t, i).toString();
}, xr = Ye.isFullyConvertible, ct = (
  /** @class */
  function() {
    function r(e, t, i, f) {
      this.hour = e, this.minute = t, this.second = i, this.millisecond = f || 0;
    }
    return r.prototype.getHours = function() {
      return this.hour;
    }, r.prototype.getMinutes = function() {
      return this.minute;
    }, r.prototype.getSeconds = function() {
      return this.second;
    }, r.prototype.getMilliseconds = function() {
      return this.millisecond;
    }, r.prototype.getTime = function() {
      return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1e3 + this.millisecond;
    }, r;
  }()
), zr = (
  /** @class */
  function(r) {
    Ct(e, r);
    function e(t, i, f, v, p, n, s) {
      var m = r.call(this, v, p, n, s) || this;
      return m.year = t, m.month = i, m.day = f, m;
    }
    return e.fromDate = function(t) {
      return new this(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.valueOf() % 1e3);
    }, e.prototype.getWeekday = function() {
      return Qe(new Date(this.getTime()));
    }, e.prototype.getTime = function() {
      return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
    }, e.prototype.getDay = function() {
      return this.day;
    }, e.prototype.getMonth = function() {
      return this.month;
    }, e.prototype.getYear = function() {
      return this.year;
    }, e.prototype.addYears = function(t) {
      this.year += t;
    }, e.prototype.addMonths = function(t) {
      if (this.month += t, this.month > 12) {
        var i = Math.floor(this.month / 12), f = Le(this.month, 12);
        this.month = f, this.year += i, this.month === 0 && (this.month = 12, --this.year);
      }
    }, e.prototype.addWeekly = function(t, i) {
      i > this.getWeekday() ? this.day += -(this.getWeekday() + 1 + (6 - i)) + t * 7 : this.day += -(this.getWeekday() - i) + t * 7, this.fixDay();
    }, e.prototype.addDaily = function(t) {
      this.day += t, this.fixDay();
    }, e.prototype.addHours = function(t, i, f) {
      for (i && (this.hour += Math.floor((23 - this.hour) / t) * t); ; ) {
        this.hour += t;
        var v = yt(this.hour, 24), p = v.div, n = v.mod;
        if (p && (this.hour = n, this.addDaily(p)), Re(f) || le(f, this.hour))
          break;
      }
    }, e.prototype.addMinutes = function(t, i, f, v) {
      for (i && (this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / t) * t); ; ) {
        this.minute += t;
        var p = yt(this.minute, 60), n = p.div, s = p.mod;
        if (n && (this.minute = s, this.addHours(n, !1, f)), (Re(f) || le(f, this.hour)) && (Re(v) || le(v, this.minute)))
          break;
      }
    }, e.prototype.addSeconds = function(t, i, f, v, p) {
      for (i && (this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / t) * t); ; ) {
        this.second += t;
        var n = yt(this.second, 60), s = n.div, m = n.mod;
        if (s && (this.second = m, this.addMinutes(s, !1, f, v)), (Re(f) || le(f, this.hour)) && (Re(v) || le(v, this.minute)) && (Re(p) || le(p, this.second)))
          break;
      }
    }, e.prototype.fixDay = function() {
      if (!(this.day <= 28)) {
        var t = Zt(this.year, this.month - 1)[1];
        if (!(this.day <= t))
          for (; this.day > t; ) {
            if (this.day -= t, ++this.month, this.month === 13 && (this.month = 1, ++this.year, this.year > fr))
              return;
            t = Zt(this.year, this.month - 1)[1];
          }
      }
    }, e.prototype.add = function(t, i) {
      var f = t.freq, v = t.interval, p = t.wkst, n = t.byhour, s = t.byminute, m = t.bysecond;
      switch (f) {
        case oe.YEARLY:
          return this.addYears(v);
        case oe.MONTHLY:
          return this.addMonths(v);
        case oe.WEEKLY:
          return this.addWeekly(v, p);
        case oe.DAILY:
          return this.addDaily(v);
        case oe.HOURLY:
          return this.addHours(v, i, n);
        case oe.MINUTELY:
          return this.addMinutes(v, i, n, s);
        case oe.SECONDLY:
          return this.addSeconds(v, i, n, s, m);
      }
    }, e;
  }(ct)
);
function pr(r) {
  for (var e = [], t = Object.keys(r), i = 0, f = t; i < f.length; i++) {
    var v = f[i];
    le(_n, v) || e.push(v), hr(r[v]) && !nt(r[v]) && e.push(v);
  }
  if (e.length)
    throw new Error("Invalid options: " + e.join(", "));
  return Me({}, r);
}
function Yr(r) {
  var e = Me(Me({}, Wt), pr(r));
  if (ve(e.byeaster) && (e.freq = re.YEARLY), !(ve(e.freq) && re.FREQUENCIES[e.freq]))
    throw new Error("Invalid frequency: ".concat(e.freq, " ").concat(r.freq));
  if (e.dtstart || (e.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0))), ve(e.wkst) ? We(e.wkst) || (e.wkst = e.wkst.weekday) : e.wkst = re.MO.weekday, ve(e.bysetpos)) {
    We(e.bysetpos) && (e.bysetpos = [e.bysetpos]);
    for (var t = 0; t < e.bysetpos.length; t++) {
      var i = e.bysetpos[t];
      if (i === 0 || !(i >= -366 && i <= 366))
        throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
    }
  }
  if (!(e.byweekno || ge(e.byweekno) || ge(e.byyearday) || e.bymonthday || ge(e.bymonthday) || ve(e.byweekday) || ve(e.byeaster)))
    switch (e.freq) {
      case re.YEARLY:
        e.bymonth || (e.bymonth = e.dtstart.getUTCMonth() + 1), e.bymonthday = e.dtstart.getUTCDate();
        break;
      case re.MONTHLY:
        e.bymonthday = e.dtstart.getUTCDate();
        break;
      case re.WEEKLY:
        e.byweekday = [Qe(e.dtstart)];
        break;
    }
  if (ve(e.bymonth) && !ke(e.bymonth) && (e.bymonth = [e.bymonth]), ve(e.byyearday) && !ke(e.byyearday) && We(e.byyearday) && (e.byyearday = [e.byyearday]), !ve(e.bymonthday))
    e.bymonthday = [], e.bynmonthday = [];
  else if (ke(e.bymonthday)) {
    for (var f = [], v = [], t = 0; t < e.bymonthday.length; t++) {
      var i = e.bymonthday[t];
      i > 0 ? f.push(i) : i < 0 && v.push(i);
    }
    e.bymonthday = f, e.bynmonthday = v;
  } else e.bymonthday < 0 ? (e.bynmonthday = [e.bymonthday], e.bymonthday = []) : (e.bynmonthday = [], e.bymonthday = [e.bymonthday]);
  if (ve(e.byweekno) && !ke(e.byweekno) && (e.byweekno = [e.byweekno]), !ve(e.byweekday))
    e.bynweekday = null;
  else if (We(e.byweekday))
    e.byweekday = [e.byweekday], e.bynweekday = null;
  else if (Ut(e.byweekday))
    e.byweekday = [Oe.fromStr(e.byweekday).weekday], e.bynweekday = null;
  else if (e.byweekday instanceof Oe)
    !e.byweekday.n || e.freq > re.MONTHLY ? (e.byweekday = [e.byweekday.weekday], e.bynweekday = null) : (e.bynweekday = [[e.byweekday.weekday, e.byweekday.n]], e.byweekday = null);
  else {
    for (var p = [], n = [], t = 0; t < e.byweekday.length; t++) {
      var s = e.byweekday[t];
      if (We(s)) {
        p.push(s);
        continue;
      } else if (Ut(s)) {
        p.push(Oe.fromStr(s).weekday);
        continue;
      }
      !s.n || e.freq > re.MONTHLY ? p.push(s.weekday) : n.push([s.weekday, s.n]);
    }
    e.byweekday = ge(p) ? p : null, e.bynweekday = ge(n) ? n : null;
  }
  return ve(e.byhour) ? We(e.byhour) && (e.byhour = [e.byhour]) : e.byhour = e.freq < re.HOURLY ? [e.dtstart.getUTCHours()] : null, ve(e.byminute) ? We(e.byminute) && (e.byminute = [e.byminute]) : e.byminute = e.freq < re.MINUTELY ? [e.dtstart.getUTCMinutes()] : null, ve(e.bysecond) ? We(e.bysecond) && (e.bysecond = [e.bysecond]) : e.bysecond = e.freq < re.SECONDLY ? [e.dtstart.getUTCSeconds()] : null, { parsedOptions: e };
}
function Vr(r) {
  var e = r.dtstart.getTime() % 1e3;
  if (!Ft(r.freq))
    return [];
  var t = [];
  return r.byhour.forEach(function(i) {
    r.byminute.forEach(function(f) {
      r.bysecond.forEach(function(v) {
        t.push(new ct(i, f, v, e));
      });
    });
  }), t;
}
function St(r) {
  var e = r.split(`
`).map(Gr).filter(function(t) {
    return t !== null;
  });
  return Me(Me({}, e[0]), e[1]);
}
function ft(r) {
  var e = {}, t = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(r);
  if (!t)
    return e;
  var i = t[1], f = t[2];
  return i && (e.tzid = i), e.dtstart = At(f), e;
}
function Gr(r) {
  if (r = r.replace(/^\s+|\s+$/, ""), !r.length)
    return null;
  var e = /^([A-Z]+?)[:;]/.exec(r.toUpperCase());
  if (!e)
    return Vt(r);
  var t = e[1];
  switch (t.toUpperCase()) {
    case "RRULE":
    case "EXRULE":
      return Vt(r);
    case "DTSTART":
      return ft(r);
    default:
      throw new Error("Unsupported RFC prop ".concat(t, " in ").concat(r));
  }
}
function Vt(r) {
  var e = r.replace(/^RRULE:/i, ""), t = ft(e), i = r.replace(/^(?:RRULE|EXRULE):/i, "").split(";");
  return i.forEach(function(f) {
    var v = f.split("="), p = v[0], n = v[1];
    switch (p.toUpperCase()) {
      case "FREQ":
        t.freq = oe[n.toUpperCase()];
        break;
      case "WKST":
        t.wkst = Ce[n.toUpperCase()];
        break;
      case "COUNT":
      case "INTERVAL":
      case "BYSETPOS":
      case "BYMONTH":
      case "BYMONTHDAY":
      case "BYYEARDAY":
      case "BYWEEKNO":
      case "BYHOUR":
      case "BYMINUTE":
      case "BYSECOND":
        var s = Br(n), m = p.toLowerCase();
        t[m] = s;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        t.byweekday = $r(n);
        break;
      case "DTSTART":
      case "TZID":
        var d = ft(r);
        t.tzid = d.tzid, t.dtstart = d.dtstart;
        break;
      case "UNTIL":
        t.until = At(n);
        break;
      case "BYEASTER":
        t.byeaster = Number(n);
        break;
      default:
        throw new Error("Unknown RRULE property '" + p + "'");
    }
  }), t;
}
function Br(r) {
  if (r.indexOf(",") !== -1) {
    var e = r.split(",");
    return e.map(Gt);
  }
  return Gt(r);
}
function Gt(r) {
  return /^[+-]?\d+$/.test(r) ? Number(r) : r;
}
function $r(r) {
  var e = r.split(",");
  return e.map(function(t) {
    if (t.length === 2)
      return Ce[t];
    var i = t.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
    if (!i || i.length < 3)
      throw new SyntaxError("Invalid weekday string: ".concat(t));
    var f = Number(i[1]), v = i[2], p = Ce[v].weekday;
    return new Oe(p, f);
  });
}
var dt = (
  /** @class */
  function() {
    function r(e, t) {
      if (isNaN(e.getTime()))
        throw new RangeError("Invalid date passed to DateWithZone");
      this.date = e, this.tzid = t;
    }
    return Object.defineProperty(r.prototype, "isUTC", {
      get: function() {
        return !this.tzid || this.tzid.toUpperCase() === "UTC";
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.toString = function() {
      var e = Lt(this.date.getTime(), this.isUTC);
      return this.isUTC ? ":".concat(e) : ";TZID=".concat(this.tzid, ":").concat(e);
    }, r.prototype.getTime = function() {
      return this.date.getTime();
    }, r.prototype.rezonedDate = function() {
      return this.isUTC ? this.date : Pr(this.date, this.tzid);
    }, r;
  }()
);
function It(r) {
  for (var e = [], t = "", i = Object.keys(r), f = Object.keys(Wt), v = 0; v < i.length; v++)
    if (i[v] !== "tzid" && le(f, i[v])) {
      var p = i[v].toUpperCase(), n = r[i[v]], s = "";
      if (!(!ve(n) || ke(n) && !n.length)) {
        switch (p) {
          case "FREQ":
            s = re.FREQUENCIES[r.freq];
            break;
          case "WKST":
            We(n) ? s = new Oe(n).toString() : s = n.toString();
            break;
          case "BYWEEKDAY":
            p = "BYDAY", s = Nr(n).map(function(I) {
              return I instanceof Oe ? I : ke(I) ? new Oe(I[0], I[1]) : new Oe(I);
            }).toString();
            break;
          case "DTSTART":
            t = Kr(n, r.tzid);
            break;
          case "UNTIL":
            s = Lt(n, !r.tzid);
            break;
          default:
            if (ke(n)) {
              for (var m = [], d = 0; d < n.length; d++)
                m[d] = String(n[d]);
              s = m.toString();
            } else
              s = String(n);
        }
        s && e.push([p, s]);
      }
    }
  var k = e.map(function(I) {
    var U = I[0], C = I[1];
    return "".concat(U, "=").concat(C.toString());
  }).join(";"), N = "";
  return k !== "" && (N = "RRULE:".concat(k)), [t, N].filter(function(I) {
    return !!I;
  }).join(`
`);
}
function Kr(r, e) {
  return r ? "DTSTART" + new dt(new Date(r), e).toString() : "";
}
function Jr(r, e) {
  return Array.isArray(r) ? !Array.isArray(e) || r.length !== e.length ? !1 : r.every(function(t, i) {
    return t.getTime() === e[i].getTime();
  }) : r instanceof Date ? e instanceof Date && r.getTime() === e.getTime() : r === e;
}
var qr = (
  /** @class */
  function() {
    function r() {
      this.all = !1, this.before = [], this.after = [], this.between = [];
    }
    return r.prototype._cacheAdd = function(e, t, i) {
      t && (t = t instanceof Date ? wt(t) : Ht(t)), e === "all" ? this.all = t : (i._value = t, this[e].push(i));
    }, r.prototype._cacheGet = function(e, t) {
      var i = !1, f = t ? Object.keys(t) : [], v = function(d) {
        for (var k = 0; k < f.length; k++) {
          var N = f[k];
          if (!Jr(t[N], d[N]))
            return !0;
        }
        return !1;
      }, p = this[e];
      if (e === "all")
        i = this.all;
      else if (ke(p))
        for (var n = 0; n < p.length; n++) {
          var s = p[n];
          if (!(f.length && v(s))) {
            i = s._value;
            break;
          }
        }
      if (!i && this.all) {
        for (var m = new Je(e, t), n = 0; n < this.all.length && m.accept(this.all[n]); n++)
          ;
        i = m.getValue(), this._cacheAdd(e, i, t);
      }
      return ke(i) ? Ht(i) : i instanceof Date ? wt(i) : i;
    }, r;
  }()
), Qr = $($($($($($($($($($($($($([], ie(1, 31), !0), ie(2, 28), !0), ie(3, 31), !0), ie(4, 30), !0), ie(5, 31), !0), ie(6, 30), !0), ie(7, 31), !0), ie(8, 31), !0), ie(9, 30), !0), ie(10, 31), !0), ie(11, 30), !0), ie(12, 31), !0), ie(1, 7), !0), Xr = $($($($($($($($($($($($($([], ie(1, 31), !0), ie(2, 29), !0), ie(3, 31), !0), ie(4, 30), !0), ie(5, 31), !0), ie(6, 30), !0), ie(7, 31), !0), ie(8, 31), !0), ie(9, 30), !0), ie(10, 31), !0), ie(11, 30), !0), ie(12, 31), !0), ie(1, 7), !0), en = Ue(1, 29), tn = Ue(1, 30), Ve = Ue(1, 31), Te = Ue(1, 32), rn = $($($($($($($($($($($($($([], Te, !0), tn, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te.slice(0, 7), !0), nn = $($($($($($($($($($($($($([], Te, !0), en, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te.slice(0, 7), !0), an = Ue(-28, 0), on = Ue(-29, 0), Ge = Ue(-30, 0), Ee = Ue(-31, 0), sn = $($($($($($($($($($($($($([], Ee, !0), on, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee.slice(0, 7), !0), un = $($($($($($($($($($($($($([], Ee, !0), an, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee.slice(0, 7), !0), ln = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366], cn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], Bt = function() {
  for (var r = [], e = 0; e < 55; e++)
    r = r.concat(Ue(7));
  return r;
}();
function fn(r, e) {
  var t = $e(r, 1, 1), i = at(r) ? 366 : 365, f = at(r + 1) ? 366 : 365, v = Ot(t), p = Qe(t), n = Me(Me({ yearlen: i, nextyearlen: f, yearordinal: v, yearweekday: p }, dn(r)), { wnomask: null });
  if (Re(e.byweekno))
    return n;
  n.wnomask = ie(0, i + 7);
  var s, m, d = s = Le(7 - p + e.wkst, 7);
  d >= 4 ? (d = 0, m = n.yearlen + Le(p - e.wkst, 7)) : m = i - d;
  for (var k = Math.floor(m / 7), N = Le(m, 7), I = Math.floor(k + N / 4), U = 0; U < e.byweekno.length; U++) {
    var C = e.byweekno[U];
    if (C < 0 && (C += I + 1), C > 0 && C <= I) {
      var M = void 0;
      C > 1 ? (M = d + (C - 1) * 7, d !== s && (M -= 7 - s)) : M = d;
      for (var h = 0; h < 7 && (n.wnomask[M] = 1, M++, n.wdaymask[M] !== e.wkst); h++)
        ;
    }
  }
  if (le(e.byweekno, 1)) {
    var M = d + I * 7;
    if (d !== s && (M -= 7 - s), M < i)
      for (var U = 0; U < 7 && (n.wnomask[M] = 1, M += 1, n.wdaymask[M] !== e.wkst); U++)
        ;
  }
  if (d) {
    var T = void 0;
    if (le(e.byweekno, -1))
      T = -1;
    else {
      var E = Qe($e(r - 1, 1, 1)), R = Le(7 - E.valueOf() + e.wkst, 7), S = at(r - 1) ? 366 : 365, y = void 0;
      R >= 4 ? (R = 0, y = S + Le(E - e.wkst, 7)) : y = i - d, T = Math.floor(52 + Le(y, 7) / 4);
    }
    if (le(e.byweekno, T))
      for (var M = 0; M < d; M++)
        n.wnomask[M] = 1;
  }
  return n;
}
function dn(r) {
  var e = at(r) ? 366 : 365, t = $e(r, 1, 1), i = Qe(t);
  return e === 365 ? {
    mmask: Qr,
    mdaymask: nn,
    nmdaymask: un,
    wdaymask: Bt.slice(i),
    mrange: cn
  } : {
    mmask: Xr,
    mdaymask: rn,
    nmdaymask: sn,
    wdaymask: Bt.slice(i),
    mrange: ln
  };
}
function hn(r, e, t, i, f, v) {
  var p = {
    lastyear: r,
    lastmonth: e,
    nwdaymask: []
  }, n = [];
  if (v.freq === re.YEARLY)
    if (Re(v.bymonth))
      n = [[0, t]];
    else
      for (var s = 0; s < v.bymonth.length; s++)
        e = v.bymonth[s], n.push(i.slice(e - 1, e + 1));
  else v.freq === re.MONTHLY && (n = [i.slice(e - 1, e + 1)]);
  if (Re(n))
    return p;
  p.nwdaymask = ie(0, t);
  for (var s = 0; s < n.length; s++)
    for (var m = n[s], d = m[0], k = m[1] - 1, N = 0; N < v.bynweekday.length; N++) {
      var I = void 0, U = v.bynweekday[N], C = U[0], M = U[1];
      M < 0 ? (I = k + (M + 1) * 7, I -= Le(f[I] - C, 7)) : (I = d + (M - 1) * 7, I += Le(7 - f[I] + C, 7)), d <= I && I <= k && (p.nwdaymask[I] = 1);
    }
  return p;
}
function mn(r, e) {
  e === void 0 && (e = 0);
  var t = r % 19, i = Math.floor(r / 100), f = r % 100, v = Math.floor(i / 4), p = i % 4, n = Math.floor((i + 8) / 25), s = Math.floor((i - n + 1) / 3), m = Math.floor(19 * t + i - v - s + 15) % 30, d = Math.floor(f / 4), k = f % 4, N = Math.floor(32 + 2 * p + 2 * d - m - k) % 7, I = Math.floor((t + 11 * m + 22 * N) / 451), U = Math.floor((m + N - 7 * I + 114) / 31), C = (m + N - 7 * I + 114) % 31 + 1, M = Date.UTC(r, U - 1, C + e), h = Date.UTC(r, 0, 1);
  return [Math.ceil((M - h) / (1e3 * 60 * 60 * 24))];
}
var yn = (
  /** @class */
  function() {
    function r(e) {
      this.options = e;
    }
    return r.prototype.rebuild = function(e, t) {
      var i = this.options;
      if (e !== this.lastyear && (this.yearinfo = fn(e, i)), ge(i.bynweekday) && (t !== this.lastmonth || e !== this.lastyear)) {
        var f = this.yearinfo, v = f.yearlen, p = f.mrange, n = f.wdaymask;
        this.monthinfo = hn(e, t, v, p, n, i);
      }
      ve(i.byeaster) && (this.eastermask = mn(e, i.byeaster));
    }, Object.defineProperty(r.prototype, "lastyear", {
      get: function() {
        return this.monthinfo ? this.monthinfo.lastyear : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "lastmonth", {
      get: function() {
        return this.monthinfo ? this.monthinfo.lastmonth : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "yearlen", {
      get: function() {
        return this.yearinfo.yearlen;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "yearordinal", {
      get: function() {
        return this.yearinfo.yearordinal;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "mrange", {
      get: function() {
        return this.yearinfo.mrange;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "wdaymask", {
      get: function() {
        return this.yearinfo.wdaymask;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "mmask", {
      get: function() {
        return this.yearinfo.mmask;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "wnomask", {
      get: function() {
        return this.yearinfo.wnomask;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "nwdaymask", {
      get: function() {
        return this.monthinfo ? this.monthinfo.nwdaymask : [];
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "nextyearlen", {
      get: function() {
        return this.yearinfo.nextyearlen;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "mdaymask", {
      get: function() {
        return this.yearinfo.mdaymask;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(r.prototype, "nmdaymask", {
      get: function() {
        return this.yearinfo.nmdaymask;
      },
      enumerable: !1,
      configurable: !0
    }), r.prototype.ydayset = function() {
      return [Ue(this.yearlen), 0, this.yearlen];
    }, r.prototype.mdayset = function(e, t) {
      for (var i = this.mrange[t - 1], f = this.mrange[t], v = ie(null, this.yearlen), p = i; p < f; p++)
        v[p] = p;
      return [v, i, f];
    }, r.prototype.wdayset = function(e, t, i) {
      for (var f = ie(null, this.yearlen + 7), v = Ot($e(e, t, i)) - this.yearordinal, p = v, n = 0; n < 7 && (f[v] = v, ++v, this.wdaymask[v] !== this.options.wkst); n++)
        ;
      return [f, p, v];
    }, r.prototype.ddayset = function(e, t, i) {
      var f = ie(null, this.yearlen), v = Ot($e(e, t, i)) - this.yearordinal;
      return f[v] = v, [f, v, v + 1];
    }, r.prototype.htimeset = function(e, t, i, f) {
      var v = this, p = [];
      return this.options.byminute.forEach(function(n) {
        p = p.concat(v.mtimeset(e, n, i, f));
      }), st(p), p;
    }, r.prototype.mtimeset = function(e, t, i, f) {
      var v = this.options.bysecond.map(function(p) {
        return new ct(e, t, p, f);
      });
      return st(v), v;
    }, r.prototype.stimeset = function(e, t, i, f) {
      return [new ct(e, t, i, f)];
    }, r.prototype.getdayset = function(e) {
      switch (e) {
        case oe.YEARLY:
          return this.ydayset.bind(this);
        case oe.MONTHLY:
          return this.mdayset.bind(this);
        case oe.WEEKLY:
          return this.wdayset.bind(this);
        case oe.DAILY:
          return this.ddayset.bind(this);
        default:
          return this.ddayset.bind(this);
      }
    }, r.prototype.gettimeset = function(e) {
      switch (e) {
        case oe.HOURLY:
          return this.htimeset.bind(this);
        case oe.MINUTELY:
          return this.mtimeset.bind(this);
        case oe.SECONDLY:
          return this.stimeset.bind(this);
      }
    }, r;
  }()
);
function vn(r, e, t, i, f, v) {
  for (var p = [], n = 0; n < r.length; n++) {
    var s = void 0, m = void 0, d = r[n];
    d < 0 ? (s = Math.floor(d / e.length), m = Le(d, e.length)) : (s = Math.floor((d - 1) / e.length), m = Le(d - 1, e.length));
    for (var k = [], N = t; N < i; N++) {
      var I = v[N];
      ve(I) && k.push(I);
    }
    var U = void 0;
    s < 0 ? U = k.slice(s)[0] : U = k[s];
    var C = e[m], M = mr(f.yearordinal + U), h = yr(M, C);
    le(p, h) || p.push(h);
  }
  return st(p), p;
}
function gr(r, e) {
  var t = e.dtstart, i = e.freq, f = e.interval, v = e.until, p = e.bysetpos, n = e.count;
  if (n === 0 || f === 0)
    return He(r);
  var s = zr.fromDate(t), m = new yn(e);
  m.rebuild(s.year, s.month);
  for (var d = bn(m, s, e); ; ) {
    var k = m.getdayset(i)(s.year, s.month, s.day), N = k[0], I = k[1], U = k[2], C = gn(N, I, U, m, e);
    if (ge(p))
      for (var M = vn(p, d, I, U, m, N), h = 0; h < M.length; h++) {
        var T = M[h];
        if (v && T > v)
          return He(r);
        if (T >= t) {
          var E = $t(T, e);
          if (!r.accept(E) || n && (--n, !n))
            return He(r);
        }
      }
    else
      for (var h = I; h < U; h++) {
        var R = N[h];
        if (ve(R))
          for (var S = mr(m.yearordinal + R), y = 0; y < d.length; y++) {
            var D = d[y], T = yr(S, D);
            if (v && T > v)
              return He(r);
            if (T >= t) {
              var E = $t(T, e);
              if (!r.accept(E) || n && (--n, !n))
                return He(r);
            }
          }
      }
    if (e.interval === 0 || (s.add(e, C), s.year > fr))
      return He(r);
    Ft(i) || (d = m.gettimeset(i)(s.hour, s.minute, s.second, 0)), m.rebuild(s.year, s.month);
  }
}
function pn(r, e, t) {
  var i = t.bymonth, f = t.byweekno, v = t.byweekday, p = t.byeaster, n = t.bymonthday, s = t.bynmonthday, m = t.byyearday;
  return ge(i) && !le(i, r.mmask[e]) || ge(f) && !r.wnomask[e] || ge(v) && !le(v, r.wdaymask[e]) || ge(r.nwdaymask) && !r.nwdaymask[e] || p !== null && !le(r.eastermask, e) || (ge(n) || ge(s)) && !le(n, r.mdaymask[e]) && !le(s, r.nmdaymask[e]) || ge(m) && (e < r.yearlen && !le(m, e + 1) && !le(m, -r.yearlen + e) || e >= r.yearlen && !le(m, e + 1 - r.yearlen) && !le(m, -r.nextyearlen + e - r.yearlen));
}
function $t(r, e) {
  return new dt(r, e.tzid).rezonedDate();
}
function He(r) {
  return r.getValue();
}
function gn(r, e, t, i, f) {
  for (var v = !1, p = e; p < t; p++) {
    var n = r[p];
    v = pn(i, n, f), v && (r[n] = null);
  }
  return v;
}
function bn(r, e, t) {
  var i = t.freq, f = t.byhour, v = t.byminute, p = t.bysecond;
  return Ft(i) ? Vr(t) : i >= re.HOURLY && ge(f) && !le(f, e.hour) || i >= re.MINUTELY && ge(v) && !le(v, e.minute) || i >= re.SECONDLY && ge(p) && !le(p, e.second) ? [] : r.gettimeset(i)(e.hour, e.minute, e.second, e.millisecond);
}
var Ce = {
  MO: new Oe(0),
  TU: new Oe(1),
  WE: new Oe(2),
  TH: new Oe(3),
  FR: new Oe(4),
  SA: new Oe(5),
  SU: new Oe(6)
}, Wt = {
  freq: oe.YEARLY,
  dtstart: null,
  interval: 1,
  wkst: Ce.MO,
  count: null,
  until: null,
  tzid: null,
  bysetpos: null,
  bymonth: null,
  bymonthday: null,
  bynmonthday: null,
  byyearday: null,
  byweekno: null,
  byweekday: null,
  bynweekday: null,
  byhour: null,
  byminute: null,
  bysecond: null,
  byeaster: null
}, _n = Object.keys(Wt), re = (
  /** @class */
  function() {
    function r(e, t) {
      e === void 0 && (e = {}), t === void 0 && (t = !1), this._cache = t ? null : new qr(), this.origOptions = pr(e);
      var i = Yr(e).parsedOptions;
      this.options = i;
    }
    return r.parseText = function(e, t) {
      return vr(e, t);
    }, r.fromText = function(e, t) {
      return Zr(e, t);
    }, r.fromString = function(e) {
      return new r(r.parseString(e) || void 0);
    }, r.prototype._iter = function(e) {
      return gr(e, this.options);
    }, r.prototype._cacheGet = function(e, t) {
      return this._cache ? this._cache._cacheGet(e, t) : !1;
    }, r.prototype._cacheAdd = function(e, t, i) {
      if (this._cache)
        return this._cache._cacheAdd(e, t, i);
    }, r.prototype.all = function(e) {
      if (e)
        return this._iter(new zt("all", {}, e));
      var t = this._cacheGet("all");
      return t === !1 && (t = this._iter(new Je("all", {})), this._cacheAdd("all", t)), t;
    }, r.prototype.between = function(e, t, i, f) {
      if (i === void 0 && (i = !1), !nt(e) || !nt(t))
        throw new Error("Invalid date passed in to RRule.between");
      var v = {
        before: t,
        after: e,
        inc: i
      };
      if (f)
        return this._iter(new zt("between", v, f));
      var p = this._cacheGet("between", v);
      return p === !1 && (p = this._iter(new Je("between", v)), this._cacheAdd("between", p, v)), p;
    }, r.prototype.before = function(e, t) {
      if (t === void 0 && (t = !1), !nt(e))
        throw new Error("Invalid date passed in to RRule.before");
      var i = { dt: e, inc: t }, f = this._cacheGet("before", i);
      return f === !1 && (f = this._iter(new Je("before", i)), this._cacheAdd("before", f, i)), f;
    }, r.prototype.after = function(e, t) {
      if (t === void 0 && (t = !1), !nt(e))
        throw new Error("Invalid date passed in to RRule.after");
      var i = { dt: e, inc: t }, f = this._cacheGet("after", i);
      return f === !1 && (f = this._iter(new Je("after", i)), this._cacheAdd("after", f, i)), f;
    }, r.prototype.count = function() {
      return this.all().length;
    }, r.prototype.toString = function() {
      return It(this.origOptions);
    }, r.prototype.toText = function(e, t, i) {
      return Hr(this, e, t, i);
    }, r.prototype.isFullyConvertibleToText = function() {
      return xr(this);
    }, r.prototype.clone = function() {
      return new r(this.origOptions);
    }, r.FREQUENCIES = [
      "YEARLY",
      "MONTHLY",
      "WEEKLY",
      "DAILY",
      "HOURLY",
      "MINUTELY",
      "SECONDLY"
    ], r.YEARLY = oe.YEARLY, r.MONTHLY = oe.MONTHLY, r.WEEKLY = oe.WEEKLY, r.DAILY = oe.DAILY, r.HOURLY = oe.HOURLY, r.MINUTELY = oe.MINUTELY, r.SECONDLY = oe.SECONDLY, r.MO = Ce.MO, r.TU = Ce.TU, r.WE = Ce.WE, r.TH = Ce.TH, r.FR = Ce.FR, r.SA = Ce.SA, r.SU = Ce.SU, r.parseString = St, r.optionsToString = It, r;
  }()
);
function Tn(r, e, t, i, f, v) {
  var p = {}, n = r.accept;
  function s(N, I) {
    t.forEach(function(U) {
      U.between(N, I, !0).forEach(function(C) {
        p[Number(C)] = !0;
      });
    });
  }
  f.forEach(function(N) {
    var I = new dt(N, v).rezonedDate();
    p[Number(I)] = !0;
  }), r.accept = function(N) {
    var I = Number(N);
    return isNaN(I) ? n.call(this, N) : !p[I] && (s(new Date(I - 1), new Date(I + 1)), !p[I]) ? (p[I] = !0, n.call(this, N)) : !0;
  }, r.method === "between" && (s(r.args.after, r.args.before), r.accept = function(N) {
    var I = Number(N);
    return p[I] ? !0 : (p[I] = !0, n.call(this, N));
  });
  for (var m = 0; m < i.length; m++) {
    var d = new dt(i[m], v).rezonedDate();
    if (!r.accept(new Date(d.getTime())))
      break;
  }
  e.forEach(function(N) {
    gr(r, N.options);
  });
  var k = r._result;
  switch (st(k), r.method) {
    case "all":
    case "between":
      return k;
    case "before":
      return k.length && k[k.length - 1] || null;
    case "after":
    default:
      return k.length && k[0] || null;
  }
}
var Kt = {
  dtstart: null,
  cache: !1,
  unfold: !1,
  forceset: !1,
  compatible: !1,
  tzid: null
};
function En(r, e) {
  var t = [], i = [], f = [], v = [], p = ft(r), n = p.dtstart, s = p.tzid, m = In(r, e.unfold);
  return m.forEach(function(d) {
    var k;
    if (d) {
      var N = Sn(d), I = N.name, U = N.parms, C = N.value;
      switch (I.toUpperCase()) {
        case "RRULE":
          if (U.length)
            throw new Error("unsupported RRULE parm: ".concat(U.join(",")));
          t.push(St(d));
          break;
        case "RDATE":
          var M = (k = /RDATE(?:;TZID=([^:=]+))?/i.exec(d)) !== null && k !== void 0 ? k : [], h = M[1];
          h && !s && (s = h), i = i.concat(Jt(C, U));
          break;
        case "EXRULE":
          if (U.length)
            throw new Error("unsupported EXRULE parm: ".concat(U.join(",")));
          f.push(St(C));
          break;
        case "EXDATE":
          v = v.concat(Jt(C, U));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + I);
      }
    }
  }), {
    dtstart: n,
    tzid: s,
    rrulevals: t,
    rdatevals: i,
    exrulevals: f,
    exdatevals: v
  };
}
function On(r, e) {
  var t = En(r, e), i = t.rrulevals, f = t.rdatevals, v = t.exrulevals, p = t.exdatevals, n = t.dtstart, s = t.tzid, m = e.cache === !1;
  if (e.compatible && (e.forceset = !0, e.unfold = !0), e.forceset || i.length > 1 || f.length || v.length || p.length) {
    var d = new Mn(m);
    return d.dtstart(n), d.tzid(s || void 0), i.forEach(function(N) {
      d.rrule(new re(vt(N, n, s), m));
    }), f.forEach(function(N) {
      d.rdate(N);
    }), v.forEach(function(N) {
      d.exrule(new re(vt(N, n, s), m));
    }), p.forEach(function(N) {
      d.exdate(N);
    }), e.compatible && e.dtstart && d.rdate(n), d;
  }
  var k = i[0] || {};
  return new re(vt(k, k.dtstart || e.dtstart || n, k.tzid || e.tzid || s), m);
}
function kt(r, e) {
  return e === void 0 && (e = {}), On(r, wn(e));
}
function vt(r, e, t) {
  return Me(Me({}, r), { dtstart: e, tzid: t });
}
function wn(r) {
  var e = [], t = Object.keys(r), i = Object.keys(Kt);
  if (t.forEach(function(f) {
    le(i, f) || e.push(f);
  }), e.length)
    throw new Error("Invalid options: " + e.join(", "));
  return Me(Me({}, Kt), r);
}
function Dn(r) {
  if (r.indexOf(":") === -1)
    return {
      name: "RRULE",
      value: r
    };
  var e = Lr(r, ":", 1), t = e[0], i = e[1];
  return {
    name: t,
    value: i
  };
}
function Sn(r) {
  var e = Dn(r), t = e.name, i = e.value, f = t.split(";");
  if (!f)
    throw new Error("empty property name");
  return {
    name: f[0].toUpperCase(),
    parms: f.slice(1),
    value: i
  };
}
function In(r, e) {
  if (e === void 0 && (e = !1), r = r && r.trim(), !r)
    throw new Error("Invalid empty string");
  if (!e)
    return r.split(/\s/);
  for (var t = r.split(`
`), i = 0; i < t.length; ) {
    var f = t[i] = t[i].replace(/\s+$/g, "");
    f ? i > 0 && f[0] === " " ? (t[i - 1] += f.slice(1), t.splice(i, 1)) : i += 1 : t.splice(i, 1);
  }
  return t;
}
function kn(r) {
  r.forEach(function(e) {
    if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(e))
      throw new Error("unsupported RDATE/EXDATE parm: " + e);
  });
}
function Jt(r, e) {
  return kn(e), r.split(",").map(function(t) {
    return At(t);
  });
}
function qt(r) {
  var e = this;
  return function(t) {
    if (t !== void 0 && (e["_".concat(r)] = t), e["_".concat(r)] !== void 0)
      return e["_".concat(r)];
    for (var i = 0; i < e._rrule.length; i++) {
      var f = e._rrule[i].origOptions[r];
      if (f)
        return f;
    }
  };
}
var Mn = (
  /** @class */
  function(r) {
    Ct(e, r);
    function e(t) {
      t === void 0 && (t = !1);
      var i = r.call(this, {}, t) || this;
      return i.dtstart = qt.apply(i, ["dtstart"]), i.tzid = qt.apply(i, ["tzid"]), i._rrule = [], i._rdate = [], i._exrule = [], i._exdate = [], i;
    }
    return e.prototype._iter = function(t) {
      return Tn(t, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
    }, e.prototype.rrule = function(t) {
      Qt(t, this._rrule);
    }, e.prototype.exrule = function(t) {
      Qt(t, this._exrule);
    }, e.prototype.rdate = function(t) {
      Xt(t, this._rdate);
    }, e.prototype.exdate = function(t) {
      Xt(t, this._exdate);
    }, e.prototype.rrules = function() {
      return this._rrule.map(function(t) {
        return kt(t.toString());
      });
    }, e.prototype.exrules = function() {
      return this._exrule.map(function(t) {
        return kt(t.toString());
      });
    }, e.prototype.rdates = function() {
      return this._rdate.map(function(t) {
        return new Date(t.getTime());
      });
    }, e.prototype.exdates = function() {
      return this._exdate.map(function(t) {
        return new Date(t.getTime());
      });
    }, e.prototype.valueOf = function() {
      var t = [];
      return !this._rrule.length && this._dtstart && (t = t.concat(It({ dtstart: this._dtstart }))), this._rrule.forEach(function(i) {
        t = t.concat(i.toString().split(`
`));
      }), this._exrule.forEach(function(i) {
        t = t.concat(i.toString().split(`
`).map(function(f) {
          return f.replace(/^RRULE:/, "EXRULE:");
        }).filter(function(f) {
          return !/^DTSTART/.test(f);
        }));
      }), this._rdate.length && t.push(er("RDATE", this._rdate, this.tzid())), this._exdate.length && t.push(er("EXDATE", this._exdate, this.tzid())), t;
    }, e.prototype.toString = function() {
      return this.valueOf().join(`
`);
    }, e.prototype.clone = function() {
      var t = new e(!!this._cache);
      return this._rrule.forEach(function(i) {
        return t.rrule(i.clone());
      }), this._exrule.forEach(function(i) {
        return t.exrule(i.clone());
      }), this._rdate.forEach(function(i) {
        return t.rdate(new Date(i.getTime()));
      }), this._exdate.forEach(function(i) {
        return t.exdate(new Date(i.getTime()));
      }), t;
    }, e;
  }(re)
);
function Qt(r, e) {
  if (!(r instanceof re))
    throw new TypeError(String(r) + " is not RRule instance");
  le(e.map(String), String(r)) || e.push(r);
}
function Xt(r, e) {
  if (!(r instanceof Date))
    throw new TypeError(String(r) + " is not Date instance");
  le(e.map(Number), Number(r)) || (e.push(r), st(e));
}
function er(r, e, t) {
  var i = !t || t.toUpperCase() === "UTC", f = i ? "".concat(r, ":") : "".concat(r, ";TZID=").concat(t, ":"), v = e.map(function(p) {
    return Lt(p.valueOf(), i);
  }).join(",");
  return "".concat(f).concat(v);
}
var Nn = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, xe = function(r) {
  return typeof r == "string" ? r.length > 0 : typeof r == "number";
}, pe = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = Math.pow(10, e)), Math.round(t * r) / t + 0;
}, Ae = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = 1), r > t ? t : r > e ? r : e;
}, br = function(r) {
  return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
}, tr = function(r) {
  return { r: Ae(r.r, 0, 255), g: Ae(r.g, 0, 255), b: Ae(r.b, 0, 255), a: Ae(r.a) };
}, pt = function(r) {
  return { r: pe(r.r), g: pe(r.g), b: pe(r.b), a: pe(r.a, 3) };
}, Ln = /^#([0-9a-f]{3,8})$/i, ut = function(r) {
  var e = r.toString(16);
  return e.length < 2 ? "0" + e : e;
}, _r = function(r) {
  var e = r.r, t = r.g, i = r.b, f = r.a, v = Math.max(e, t, i), p = v - Math.min(e, t, i), n = p ? v === e ? (t - i) / p : v === t ? 2 + (i - e) / p : 4 + (e - t) / p : 0;
  return { h: 60 * (n < 0 ? n + 6 : n), s: v ? p / v * 100 : 0, v: v / 255 * 100, a: f };
}, Tr = function(r) {
  var e = r.h, t = r.s, i = r.v, f = r.a;
  e = e / 360 * 6, t /= 100, i /= 100;
  var v = Math.floor(e), p = i * (1 - t), n = i * (1 - (e - v) * t), s = i * (1 - (1 - e + v) * t), m = v % 6;
  return { r: 255 * [i, n, p, p, s, i][m], g: 255 * [s, i, i, n, p, p][m], b: 255 * [p, p, s, i, i, n][m], a: f };
}, rr = function(r) {
  return { h: br(r.h), s: Ae(r.s, 0, 100), l: Ae(r.l, 0, 100), a: Ae(r.a) };
}, nr = function(r) {
  return { h: pe(r.h), s: pe(r.s), l: pe(r.l), a: pe(r.a, 3) };
}, ar = function(r) {
  return Tr((t = (e = r).s, { h: e.h, s: (t *= ((i = e.l) < 50 ? i : 100 - i) / 100) > 0 ? 2 * t / (i + t) * 100 : 0, v: i + t, a: e.a }));
  var e, t, i;
}, it = function(r) {
  return { h: (e = _r(r)).h, s: (f = (200 - (t = e.s)) * (i = e.v) / 100) > 0 && f < 200 ? t * i / 100 / (f <= 100 ? f : 200 - f) * 100 : 0, l: f / 2, a: e.a };
  var e, t, i, f;
}, An = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Cn = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Fn = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Wn = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Mt = { string: [[function(r) {
  var e = Ln.exec(r);
  return e ? (r = e[1]).length <= 4 ? { r: parseInt(r[0] + r[0], 16), g: parseInt(r[1] + r[1], 16), b: parseInt(r[2] + r[2], 16), a: r.length === 4 ? pe(parseInt(r[3] + r[3], 16) / 255, 2) : 1 } : r.length === 6 || r.length === 8 ? { r: parseInt(r.substr(0, 2), 16), g: parseInt(r.substr(2, 2), 16), b: parseInt(r.substr(4, 2), 16), a: r.length === 8 ? pe(parseInt(r.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r) {
  var e = Fn.exec(r) || Wn.exec(r);
  return e ? e[2] !== e[4] || e[4] !== e[6] ? null : tr({ r: Number(e[1]) / (e[2] ? 100 / 255 : 1), g: Number(e[3]) / (e[4] ? 100 / 255 : 1), b: Number(e[5]) / (e[6] ? 100 / 255 : 1), a: e[7] === void 0 ? 1 : Number(e[7]) / (e[8] ? 100 : 1) }) : null;
}, "rgb"], [function(r) {
  var e = An.exec(r) || Cn.exec(r);
  if (!e) return null;
  var t, i, f = rr({ h: (t = e[1], i = e[2], i === void 0 && (i = "deg"), Number(t) * (Nn[i] || 1)), s: Number(e[3]), l: Number(e[4]), a: e[5] === void 0 ? 1 : Number(e[5]) / (e[6] ? 100 : 1) });
  return ar(f);
}, "hsl"]], object: [[function(r) {
  var e = r.r, t = r.g, i = r.b, f = r.a, v = f === void 0 ? 1 : f;
  return xe(e) && xe(t) && xe(i) ? tr({ r: Number(e), g: Number(t), b: Number(i), a: Number(v) }) : null;
}, "rgb"], [function(r) {
  var e = r.h, t = r.s, i = r.l, f = r.a, v = f === void 0 ? 1 : f;
  if (!xe(e) || !xe(t) || !xe(i)) return null;
  var p = rr({ h: Number(e), s: Number(t), l: Number(i), a: Number(v) });
  return ar(p);
}, "hsl"], [function(r) {
  var e = r.h, t = r.s, i = r.v, f = r.a, v = f === void 0 ? 1 : f;
  if (!xe(e) || !xe(t) || !xe(i)) return null;
  var p = function(n) {
    return { h: br(n.h), s: Ae(n.s, 0, 100), v: Ae(n.v, 0, 100), a: Ae(n.a) };
  }({ h: Number(e), s: Number(t), v: Number(i), a: Number(v) });
  return Tr(p);
}, "hsv"]] }, ir = function(r, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t][0](r);
    if (i) return [i, e[t][1]];
  }
  return [null, void 0];
}, Pn = function(r) {
  return typeof r == "string" ? ir(r.trim(), Mt.string) : typeof r == "object" && r !== null ? ir(r, Mt.object) : [null, void 0];
}, gt = function(r, e) {
  var t = it(r);
  return { h: t.h, s: Ae(t.s + 100 * e, 0, 100), l: t.l, a: t.a };
}, bt = function(r) {
  return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
}, or = function(r, e) {
  var t = it(r);
  return { h: t.h, s: t.s, l: Ae(t.l + 100 * e, 0, 100), a: t.a };
}, Nt = function() {
  function r(e) {
    this.parsed = Pn(e)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r.prototype.isValid = function() {
    return this.parsed !== null;
  }, r.prototype.brightness = function() {
    return pe(bt(this.rgba), 2);
  }, r.prototype.isDark = function() {
    return bt(this.rgba) < 0.5;
  }, r.prototype.isLight = function() {
    return bt(this.rgba) >= 0.5;
  }, r.prototype.toHex = function() {
    return e = pt(this.rgba), t = e.r, i = e.g, f = e.b, p = (v = e.a) < 1 ? ut(pe(255 * v)) : "", "#" + ut(t) + ut(i) + ut(f) + p;
    var e, t, i, f, v, p;
  }, r.prototype.toRgb = function() {
    return pt(this.rgba);
  }, r.prototype.toRgbString = function() {
    return e = pt(this.rgba), t = e.r, i = e.g, f = e.b, (v = e.a) < 1 ? "rgba(" + t + ", " + i + ", " + f + ", " + v + ")" : "rgb(" + t + ", " + i + ", " + f + ")";
    var e, t, i, f, v;
  }, r.prototype.toHsl = function() {
    return nr(it(this.rgba));
  }, r.prototype.toHslString = function() {
    return e = nr(it(this.rgba)), t = e.h, i = e.s, f = e.l, (v = e.a) < 1 ? "hsla(" + t + ", " + i + "%, " + f + "%, " + v + ")" : "hsl(" + t + ", " + i + "%, " + f + "%)";
    var e, t, i, f, v;
  }, r.prototype.toHsv = function() {
    return e = _r(this.rgba), { h: pe(e.h), s: pe(e.s), v: pe(e.v), a: pe(e.a, 3) };
    var e;
  }, r.prototype.invert = function() {
    return De({ r: 255 - (e = this.rgba).r, g: 255 - e.g, b: 255 - e.b, a: e.a });
    var e;
  }, r.prototype.saturate = function(e) {
    return e === void 0 && (e = 0.1), De(gt(this.rgba, e));
  }, r.prototype.desaturate = function(e) {
    return e === void 0 && (e = 0.1), De(gt(this.rgba, -e));
  }, r.prototype.grayscale = function() {
    return De(gt(this.rgba, -1));
  }, r.prototype.lighten = function(e) {
    return e === void 0 && (e = 0.1), De(or(this.rgba, e));
  }, r.prototype.darken = function(e) {
    return e === void 0 && (e = 0.1), De(or(this.rgba, -e));
  }, r.prototype.rotate = function(e) {
    return e === void 0 && (e = 15), this.hue(this.hue() + e);
  }, r.prototype.alpha = function(e) {
    return typeof e == "number" ? De({ r: (t = this.rgba).r, g: t.g, b: t.b, a: e }) : pe(this.rgba.a, 3);
    var t;
  }, r.prototype.hue = function(e) {
    var t = it(this.rgba);
    return typeof e == "number" ? De({ h: e, s: t.s, l: t.l, a: t.a }) : pe(t.h);
  }, r.prototype.isEqual = function(e) {
    return this.toHex() === De(e).toHex();
  }, r;
}(), De = function(r) {
  return r instanceof Nt ? r : new Nt(r);
}, sr = [], Rn = function(r) {
  r.forEach(function(e) {
    sr.indexOf(e) < 0 && (e(Nt, Mt), sr.push(e));
  });
}, je = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = 1), r > t ? t : r > e ? r : e;
}, _t = function(r) {
  var e = r / 255;
  return e < 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}, Tt = function(r) {
  return 255 * (r > 31308e-7 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r);
}, Pt = 96.422, Rt = 100, jt = 82.521, jn = function(r) {
  var e, t, i = { x: 0.9555766 * (e = r).x + -0.0230393 * e.y + 0.0631636 * e.z, y: -0.0282895 * e.x + 1.0099416 * e.y + 0.0210077 * e.z, z: 0.0122982 * e.x + -0.020483 * e.y + 1.3299098 * e.z };
  return t = { r: Tt(0.032404542 * i.x - 0.015371385 * i.y - 4985314e-9 * i.z), g: Tt(-969266e-8 * i.x + 0.018760108 * i.y + 41556e-8 * i.z), b: Tt(556434e-9 * i.x - 2040259e-9 * i.y + 0.010572252 * i.z), a: r.a }, { r: je(t.r, 0, 255), g: je(t.g, 0, 255), b: je(t.b, 0, 255), a: je(t.a) };
}, Un = function(r) {
  var e = _t(r.r), t = _t(r.g), i = _t(r.b);
  return function(f) {
    return { x: je(f.x, 0, Pt), y: je(f.y, 0, Rt), z: je(f.z, 0, jt), a: je(f.a) };
  }(function(f) {
    return { x: 1.0478112 * f.x + 0.0228866 * f.y + -0.050127 * f.z, y: 0.0295424 * f.x + 0.9904844 * f.y + -0.0170491 * f.z, z: -92345e-7 * f.x + 0.0150436 * f.y + 0.7521316 * f.z, a: f.a };
  }({ x: 100 * (0.4124564 * e + 0.3575761 * t + 0.1804375 * i), y: 100 * (0.2126729 * e + 0.7151522 * t + 0.072175 * i), z: 100 * (0.0193339 * e + 0.119192 * t + 0.9503041 * i), a: r.a }));
}, ot = 216 / 24389, qe = 24389 / 27, ur = function(r) {
  var e = Un(r), t = e.x / Pt, i = e.y / Rt, f = e.z / jt;
  return t = t > ot ? Math.cbrt(t) : (qe * t + 16) / 116, { l: 116 * (i = i > ot ? Math.cbrt(i) : (qe * i + 16) / 116) - 16, a: 500 * (t - i), b: 200 * (i - (f = f > ot ? Math.cbrt(f) : (qe * f + 16) / 116)), alpha: e.a };
}, Zn = function(r, e, t) {
  var i, f = ur(r), v = ur(e);
  return function(p) {
    var n = (p.l + 16) / 116, s = p.a / 500 + n, m = n - p.b / 200;
    return jn({ x: (Math.pow(s, 3) > ot ? Math.pow(s, 3) : (116 * s - 16) / qe) * Pt, y: (p.l > 8 ? Math.pow((p.l + 16) / 116, 3) : p.l / qe) * Rt, z: (Math.pow(m, 3) > ot ? Math.pow(m, 3) : (116 * m - 16) / qe) * jt, a: p.alpha });
  }({ l: je((i = { l: f.l * (1 - t) + v.l * t, a: f.a * (1 - t) + v.a * t, b: f.b * (1 - t) + v.b * t, alpha: f.alpha * (1 - t) + v.alpha * t }).l, 0, 400), a: i.a, b: i.b, alpha: je(i.alpha) });
};
function Hn(r) {
  function e(t, i, f) {
    f === void 0 && (f = 5);
    for (var v = [], p = 1 / (f - 1), n = 0; n <= f - 1; n++) v.push(t.mix(i, p * n));
    return v;
  }
  r.prototype.mix = function(t, i) {
    i === void 0 && (i = 0.5);
    var f = t instanceof r ? t : new r(t), v = Zn(this.toRgb(), f.toRgb(), i);
    return new r(v);
  }, r.prototype.tints = function(t) {
    return e(this, "#fff", t);
  }, r.prototype.shades = function(t) {
    return e(this, "#000", t);
  }, r.prototype.tones = function(t) {
    return e(this, "#808080", t);
  };
}
Rn([Hn]);
class ze {
  static generateEventBgColor(e) {
    return De(e).lighten(0.25).toHex();
  }
  static generateEventTitleColor(e) {
    return De(e).darken(0.3).toHex();
  }
  static generateEventDescriptionColor() {
  }
  static generateEventBorderColor(e) {
    return De(e).darken(0.3).toHex();
  }
}
me(ze, "generateForegroundColorFrom", (e, t = 0.8) => De(e).mix(De(e).isDark() ? "white" : "black", t).toHslString());
const Ne = class Ne {
  static getId(e) {
    return e.id ?? Object.entries(e).map(([t, i]) => `${String(i).replace(/[^a-zA-Z0-9]/g, "")}`).join("");
  }
  static getEventMetadata(e, t, i, f, v, p, n) {
    const s = ue.DateTime.fromISO(e.start_date).setZone(p).setLocale(n), m = ue.DateTime.fromISO(e.end_date).setZone(p).setLocale(n), k = s.diff(t.startOf("day"), "minutes").minutes / f.as("minutes"), N = v * k, I = v * (m.diff(s, "minutes").minutes / f.as("minutes")), U = N * 100 / i, C = I * 100 / i, M = U + C;
    return {
      eventStartPercentage: U,
      eventHeightPercentage: C,
      eventEndPercentage: M,
      start: s,
      end: m
    };
  }
};
me(Ne, "getRandomInt", (e, t) => Math.floor(Math.random() * (t - e)) + e), me(Ne, "fakeEvents", () => {
  const e = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"], t = ["Team Meeting", "Client Call", "Code Review", "Marketing Strategy", "Design Sync"], i = ["Conference Room A", "Zoom", "Office 1", "Office 2", "Online"], f = [
    "Discuss project updates and deadlines.",
    "Meet with the client to discuss requirements.",
    "Review the recent code changes and PRs.",
    "Plan the marketing strategy for Q4.",
    "Sync with the design team on new features."
  ], v = [
    ["alice@example.com", "bob@example.com"],
    ["john@example.com", "jane@example.com"],
    ["mike@example.com", "sara@example.com"],
    ["tom@example.com", "lisa@example.com"],
    ["nina@example.com", "peter@example.com"]
  ], p = [], n = /* @__PURE__ */ new Date();
  for (let s = 0; s < 13; s++) {
    const m = Ne.getRandomInt(1, 7), d = Ne.getRandomInt(8, 18), k = Ne.getRandomInt(1, 3), N = new Date(n);
    N.setDate(n.getDate() + m - n.getDay()), N.setHours(d, 0, 0, 0);
    const I = new Date(N);
    I.setHours(d + k);
    const U = {
      id: `${ue.DateTime.now().toMillis().toString()}-${s}`,
      title: t[Ne.getRandomInt(0, t.length)],
      start_date: N.toISOString(),
      end_date: I.toISOString(),
      location: i[Ne.getRandomInt(0, i.length)],
      description: f[Ne.getRandomInt(0, f.length)],
      allDay: !1,
      color: e[Ne.getRandomInt(0, e.length)],
      attendees: v[Ne.getRandomInt(0, v.length)]
    };
    p.push(U);
  }
  return p;
});
let Pe = Ne;
class zn {
  constructor({
    timezone: e = ue.DateTime.local().zoneName,
    selectedDate: t = ue.DateTime.local().toISODate(),
    language: i = navigator.language || "en-US",
    view: f = "month",
    // Default view,
    tHeaderOption: v = {},
    tyxWeekOption: p = {},
    handleEvents: n = !1
  } = {}) {
    me(this, "instance");
    me(this, "timezone");
    me(this, "selectedDate");
    me(this, "startDate");
    me(this, "endDate");
    me(this, "language");
    me(this, "daysOfWeek");
    me(this, "events");
    // Event storage
    me(this, "eventInstances");
    // Event storage
    me(this, "view");
    // Current view
    me(this, "tHeaderOption");
    me(this, "tyxWeekOption");
    me(this, "handleEvents");
    me(this, "isMobile", window.matchMedia("(max-width: 600px)").matches);
    me(this, "onDayClicked");
    me(this, "onTEventClicked");
    me(this, "onBordersChanged");
    this.timezone = e, this.language = i, this.handleEvents = n, this.events = {}, this.eventInstances = {}, this.view = f, this.tHeaderOption = {
      currentMonthFormat: "MMMM yyyy",
      dayFormat: "ccc",
      ...v
    }, this.tyxWeekOption = {
      timeSlotInterval: 60,
      startHourOfDay: 0,
      endHourOfDay: 24,
      timeSlotHeight: 100,
      ...p
    }, this.selectedDate = ue.DateTime.fromISO(t).setZone(this.timezone), this.startDate = this.selectedDate.startOf(f.toString()), this.endDate = this.selectedDate.endOf(f.toString()), this.daysOfWeek = this._getDayHeaders();
  }
  adjustGridClass() {
    const e = document.querySelector(".calendar");
    window.innerWidth <= 600 ? (this.isMobile = !0, e == null || e.classList.add("small-grid"), e == null || e.classList.remove("large-grid")) : (this.isMobile = !1, e == null || e.classList.add("large-grid"), e == null || e.classList.remove("small-grid"));
  }
  mount(e) {
    this.instance = document.querySelector(e), this.instance.classList.add("calendar"), this._render(), window.addEventListener("resize", this.adjustGridClass), this.adjustGridClass();
  }
  changeViewType(e) {
    this.view = e, this._renderDayHeaders(), this._render();
  }
  previous() {
    this._changeMonth(-1);
  }
  next() {
    this._changeMonth(1);
  }
  _changeMonth(e) {
    var t;
    this.view === "month" ? (this.startDate = this.startDate.plus({ months: e }), this.endDate = this.startDate.endOf("month")) : this.view === "week" && (this.startDate = this.startDate.plus({ weeks: e }), this.endDate = this.startDate.endOf("week")), this.selectedDate = void 0, (t = this.onBordersChanged) == null || t.call(this, this.startDate, this.endDate), this._render(e);
  }
  gotoDate(e, t) {
    var i;
    this.selectedDate = e, this.startDate = e.startOf(this.view), this.endDate = e.endOf(this.view), (i = this.onBordersChanged) == null || i.call(this, this.startDate, this.endDate), this._render(t);
  }
  _render(e) {
    var v, p, n;
    this._updateEventInstances(), this.instance.innerHTML = "";
    const t = this._createHeader();
    (v = this.instance) == null || v.appendChild(t);
    const i = document.createElement("div");
    i.className = "calendar-content", (p = this.instance) == null || p.appendChild(i);
    const f = document.createElement("div");
    f.className = "calendar-grid", this.view === "month" ? this._renderMonthView(f) : this.view === "week" ? (this._renderDayHeaders(), this._renderWeekView(f)) : this.view === "day" && this._renderDayView(f), f.classList.remove("fade-in"), f.classList.add("fade-out"), f.classList.add(e && e < 0 ? "direction-left" : "direction-right"), i.appendChild(f), (n = this.instance) == null || n.appendChild(i), this._renderEventLists(), setTimeout(() => {
      f.classList.remove("fade-out"), f.classList.add("fade-in"), this.adjustGridClass();
    }, 100);
  }
  _createHeader() {
    const e = document.createElement("header");
    e.className = "calendar-header";
    const t = document.createElement("button");
    t.className = "prev-month", t.innerText = "◀", t.addEventListener("click", () => this._changeMonth(-1));
    const i = document.createElement("h2");
    i.className = "current-month", i.innerText = this.view === "month" ? this.startDate.setLocale(this.language).toFormat(this.tHeaderOption.currentMonthFormat) : `${this.startDate.startOf("week").toLocaleString(ue.DateTime.DATE_FULL)} - ${this.startDate.endOf("week").toLocaleString(ue.DateTime.DATE_FULL)}`;
    const f = document.createElement("button");
    return f.className = "next-month", f.innerText = "▶", f.addEventListener("click", () => this._changeMonth(1)), e.appendChild(t), e.appendChild(i), e.appendChild(f), e;
  }
  _renderMonthView(e) {
    var v;
    this._removeViewClass(), (v = document.querySelector(".calendar")) == null || v.classList.add("month");
    const t = document.createElement("div");
    t.className = "month-header", this.daysOfWeek.forEach((p) => {
      const n = document.createElement("div");
      n.className = "day-header", n.innerText = p.dayName, t.appendChild(n);
    }), e.appendChild(t);
    const i = this._getDatesForMonth(), f = document.createElement("div");
    f.className = "month-grid", i.forEach(({ date: p, isPrevious: n, isNext: s }) => {
      const m = this._createDateCell({ date: p, isPrevious: n, isNext: s });
      f.appendChild(m);
    }), e.appendChild(f);
  }
  _renderEventLists() {
    if (this.view != "month" || this.handleEvents == !1) return;
    const e = document.querySelector(".event-list") || document.createElement("div");
    if (e.innerHTML = "", e.className = "event-list", e.childNodes.forEach((v) => v.remove()), this.selectedDate == null) return;
    const t = this.selectedDate.toISODate();
    (this.eventInstances[t] || []).forEach((v) => {
      const p = document.createElement("div");
      p.className = "event-item";
      let n = v.color ?? getComputedStyle(document.body).getPropertyValue("--tyx-primary-color");
      p.style.backgroundColor = ze.generateEventBgColor(n), p.style.borderLeftColor = ze.generateEventBorderColor(n), p.style.color = ze.generateEventTitleColor(n);
      const s = document.createElement("div");
      s.className = "event-title", s.innerText = `${v.title}${v.recurrence ? "🔁" : ""}`, p.appendChild(s);
      const m = document.createElement("div");
      m.className = "event-time", m.innerText = `${ue.DateTime.fromISO(v.start_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")} - ${ue.DateTime.fromISO(v.end_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")}`, p.appendChild(m), p.addEventListener("click", () => this._handleTEventClick(v)), e.appendChild(p);
    }), document.querySelector(".calendar-content").appendChild(e);
  }
  _removeViewClass() {
    var e, t;
    (e = document.querySelector(".calendar")) == null || e.classList.remove("week"), (t = document.querySelector(".calendar")) == null || t.classList.remove("month");
  }
  _renderWeekView(e) {
    var h;
    this._removeViewClass(), (h = document.querySelector(".calendar")) == null || h.classList.add("week");
    const t = document.createElement("div");
    t.className = "tyx__week-header", this.daysOfWeek.forEach((T) => {
      const E = document.createElement("div");
      E.className = "tyx__week-day-header";
      const R = document.createElement("div");
      R.className = "tyx__week-day-name", R.innerText = T.dayName, E.appendChild(R);
      const S = document.createElement("span");
      S.className = "tyx__week-day-date", S.innerText = T.date.day.toString(), E.appendChild(S), t.appendChild(E);
    }), document.querySelector(".calendar-content").appendChild(t);
    const f = document.createElement("div");
    f.className = "tyx__week-grid";
    const v = document.createElement("div");
    v.className = "tyx__week-grid__time-axis", f.appendChild(v);
    const p = ue.Duration.fromObject({ minute: this.tyxWeekOption.timeSlotInterval }), n = ue.DateTime.fromObject({ hour: this.tyxWeekOption.startHourOfDay }), s = ue.DateTime.fromObject({ hour: this.tyxWeekOption.endHourOfDay }), d = s.diff(n, "minutes").as("minutes") / p.as("minutes") + 1, k = this.tyxWeekOption.timeSlotHeight, N = d * k, I = document.documentElement;
    I.style.setProperty("--tyx-calendar-week-grid-height", `${N}px`), I.style.setProperty("--tyx-calendar-week-grid-slot-height", `${k}px`), I.style.setProperty("--tyx-calendar-week-grid-padding-top", "15px");
    let C = n;
    for (; C < s; ) {
      const T = document.createElement("div");
      T.className = "tyx__week-grid__time", T.setAttribute("time", `${C.toFormat("HH:mm")}`);
      const E = document.createElement("span");
      E.className = "tyx__week-grid__time-text", E.innerText = `${C.toFormat("HH:mm")}`, T.appendChild(E), v.appendChild(T), C = C.plus(p);
    }
    this._getDatesForWeek().forEach((T) => {
      const E = document.createElement("div");
      E.className = "tyx__week-grid__day", E.classList.add(`tyx__${T.toFormat("EEEE").toLowerCase()}`), E.setAttribute("data", T ? T.toISODate() : ""), E.setAttribute("day", T ? T.toFormat("ccc") : ""), f.appendChild(E);
      const R = this.eventInstances[T.toISODate()] || [];
      for (let y = 0; y < R.length; y++) {
        var S = R.map((j) => {
          var B = Pe.getEventMetadata(
            j,
            T,
            N,
            p,
            k,
            this.timezone,
            this.language
          );
          return {
            start: B.eventStartPercentage,
            end: B.eventEndPercentage,
            event: j
          };
        });
        const D = R[y], A = document.createElement("div");
        A.addEventListener("click", () => this._handleTEventClick(D)), A.className = "tyx__week-grid__day-event";
        const Z = Pe.getEventMetadata(
          D,
          T,
          N,
          p,
          k,
          this.timezone,
          this.language
        );
        A.style.top = `${Z.eventStartPercentage}%`, A.style.height = `${Z.eventHeightPercentage}%`;
        let w = S.filter((j) => j.start > Z.eventStartPercentage && j.start < Z.eventEndPercentage || j.end > Z.eventStartPercentage && j.end < Z.eventEndPercentage || Pe.getId(D) == Pe.getId(j.event));
        const b = w.findIndex((j) => Pe.getId(D) == Pe.getId(j.event));
        if (w = w.filter((j) => Pe.getId(D) != Pe.getId(j.event)), w.length == 0)
          A.style.width = "calc(100%)";
        else {
          const B = 100 / (w.length + 1) * b;
          A.style.marginLeft = `calc(${B}%)`, A.style.width = `calc(${100 - B}%)`, A.style.zIndex = `${y + 1}`, A.classList.add("position-" + b);
        }
        let P = D.color ?? getComputedStyle(document.body).getPropertyValue("--tyx-primary-color");
        A.style.backgroundColor = ze.generateEventBgColor(P), A.style.borderLeftColor = ze.generateEventBorderColor(P), A.style.color = ze.generateEventTitleColor(P);
        const O = document.createElement("div");
        O.classList.add("tyx__week-grid__day-event-title"), O.innerText = `${D.title}`, A.appendChild(O);
        const W = document.createElement("div");
        if (W.classList.add("tyx__week-grid__day-event-time"), W.innerText = `${Z.start.toFormat("HH:mm")} - ${Z.end.toFormat("HH:mm")}`, A.appendChild(W), D.location) {
          const j = document.createElement("div");
          j.innerText = D.location, j.classList.add("tyx__week-grid__day-event-location"), A.appendChild(j);
        }
        E.appendChild(A);
      }
    }), e.appendChild(f);
  }
  _renderDayHeaders() {
    this.daysOfWeek = this._getDayHeaders();
  }
  _renderDayView(e) {
    var i;
    const t = document.createElement("div");
    t.className = "day-details", t.innerText = `Events for ${(i = this.selectedDate) == null ? void 0 : i.toLocaleString(ue.DateTime.DATE_FULL)}`, this._populateEventDetails(this.selectedDate, t), e.appendChild(t);
  }
  _createDateCell({ date: e, isPrevious: t, isNext: i }) {
    var m;
    const f = document.createElement("div"), v = e && e.toISODate() === ((m = this.selectedDate) == null ? void 0 : m.toISODate());
    f.className = `date-cell ${t ? "previous-date" : ""} ${i ? "next-date" : ""} ${v ? "selected-date" : ""}`;
    const p = ue.DateTime.now().setZone(this.timezone).startOf("day");
    e && e.toISODate() === p.toISODate() && f.classList.add("today"), f.setAttribute("data", e ? e.toISODate() : ""), f.setAttribute("day", e ? e.toFormat("ccc") : ""), f.addEventListener("click", () => this._handleDateClick(e));
    const s = document.createElement("div");
    return s.innerText = e ? e.day.toString() : "", f.appendChild(s), this.handleEvents && this._populateEventDetails(e, f), f;
  }
  _getDayHeaders() {
    const e = [];
    if (this.view == "week")
      for (let f = 0; f <= 6; f++) {
        const v = this.startDate.plus({ days: f }), p = v.toFormat(this.tHeaderOption.dayFormat);
        e.push({
          dayName: p,
          date: v
        });
      }
    else
      for (let f = 1; f <= 7; f++) {
        const v = ue.DateTime.local(this.startDate.year, this.startDate.month, 1, { zone: this.timezone }).set({ weekday: f }).setLocale(this.language), p = v.toFormat(this.tHeaderOption.dayFormat);
        e.push({
          dayName: p,
          date: v
        });
      }
    return e;
  }
  _getDatesForMonth() {
    const e = [], t = ue.DateTime.local(this.startDate.year, this.startDate.month, 1, { zone: this.timezone }), i = t.endOf("month"), f = t.weekday, v = t.minus({ days: 1 }).endOf("month");
    for (let n = 0; n < f - 1; n++) {
      const s = v.minus({ days: n });
      e.push({ date: s, isPrevious: !0, isNext: !1 });
    }
    for (let n = 1; n <= i.day; n++)
      e.push({ date: ue.DateTime.local(this.startDate.year, this.startDate.month, n, { zone: this.timezone }), isPrevious: !1, isNext: !1 });
    const p = i.plus({ days: 1 }).startOf("month");
    for (let n = 1; n <= 7 - i.weekday; n++)
      e.push({ date: ue.DateTime.local(p.year, p.month, n, { zone: this.timezone }), isPrevious: !1, isNext: !0 });
    return e;
  }
  _getDatesForWeek() {
    const e = [], t = this.startDate.startOf("week");
    for (let i = 0; i < 7; i++)
      e.push(t.plus({ days: i }));
    return e;
  }
  _handleDateClick(e) {
    var i, f, v;
    if (e) {
      (i = document.querySelector(".selected-date")) == null || i.classList.remove("selected-date");
      var t = document.querySelector(`[data="${e.toISODate()}"]`);
      t != null && t.classList.contains("previous-date") ? this.gotoDate(e, -1) : t != null && t.classList.contains("next-date") && this.gotoDate(e, 1), this.selectedDate = e, (f = document.querySelector(`[data="${e.toISODate()}"]`)) == null || f.classList.add("selected-date"), this._renderEventLists(), (v = this.onDayClicked) == null || v.call(this, e, this.eventInstances[e.toISODate()] || []);
    }
  }
  _handleTEventClick(e) {
    var t;
    (t = this.onTEventClicked) == null || t.call(this, e);
  }
  _populateEventDetails(e, t) {
    if (!e) return;
    const i = e.toISODate(), f = this.eventInstances[i] || [];
    if (f.length > 0) {
      const v = document.createElement("div");
      v.classList.add("event-list-large"), f.forEach((p) => {
        const n = document.createElement("div");
        let s = p.color ?? getComputedStyle(document.body).getPropertyValue("--tyx-primary-color");
        n.style.backgroundColor = ze.generateEventBgColor(s), n.style.color = ze.generateEventTitleColor(s), n.className = "event-item", n.addEventListener("click", () => this._handleTEventClick(p));
        const m = document.createElement("div");
        m.className = "event-details", n.appendChild(m);
        const d = document.createElement("div");
        d.className = "event-title", d.innerText = p.title, m.appendChild(d);
        const k = document.createElement("div");
        k.className = "event-time", k.innerText = `${ue.DateTime.fromISO(p.start_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")} - ${ue.DateTime.fromISO(p.end_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")}`, m.appendChild(k);
        const N = document.createElement("div");
        N.className = "event-marker", N.style.backgroundColor = s, n.appendChild(N), v.appendChild(n);
      }), t.appendChild(v);
    }
  }
  _updateEventInstances() {
    this.eventInstances = {};
    const e = Object.values(this.events).flatMap((t) => t);
    for (const t of e)
      t.recurrence ? kt(t.recurrence).between(this.startDate.toJSDate(), this.endDate.toJSDate(), !0).map((p) => ue.DateTime.fromJSDate(p).setZone(this.timezone)).forEach((p) => {
        var n = ue.DateTime.fromISO(t.start_date).setZone(this.timezone), s = ue.DateTime.fromObject({ year: p.year, month: p.month, day: p.day, hour: n.hour, minute: n.minute }), m = ue.DateTime.fromISO(t.end_date).setZone(this.timezone), d = m.diff(n, "minutes"), k = {
          start_date: s.toISO(),
          end_date: s.plus(d).toISO(),
          title: t.title,
          location: t.location,
          description: t.description,
          attendees: t.attendees,
          allDay: t.allDay,
          recurrence: t.recurrence
        };
        this.addEventInstance(k, this.eventInstances);
      }) : this.addEventInstance(t, this.eventInstances);
  }
  addEvent(e) {
    this.addEventInstance(e, this.events), this._render();
  }
  addEventInstance(e, t) {
    const i = ue.DateTime.fromISO(e.start_date).setZone(this.timezone), f = ue.DateTime.fromISO(e.end_date).setZone(this.timezone);
    let v = i.startOf("day");
    for (; v <= f.startOf("day"); ) {
      const p = v.toISODate();
      t[p] || (t[p] = []);
      let n = v.equals(i.startOf("day")) ? i : v.startOf("day"), s = v.equals(f.startOf("day")) ? f : v.endOf("day");
      t[p].push({
        ...e,
        start_date: n.toISO(),
        // Adjusted start date for this segment
        end_date: s.toISO()
        // Adjusted end date for this segment
      }), t[p].sort((m, d) => ue.DateTime.fromISO(m.start_date).toMillis() - ue.DateTime.fromISO(d.start_date).toMillis()), v = v.plus({ days: 1 });
    }
  }
  addAllEvents(e) {
    for (let t = 0; t < e.length; t++)
      this.addEvent(e[t]);
  }
}
export { Pe as EventUtils, zn as TimelyX };
