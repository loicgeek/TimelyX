var kr = Object.defineProperty;
var Mr = (r, e, t) => e in r ? kr(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var le = (r, e, t) => Mr(r, typeof e != "symbol" ? e + "" : e, t);
var Nr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, cr = { exports: {} };
(function(r, e) {
  (function(a, l) {
    r.exports = l();
  })(Nr, () => (
    /******/
    (() => {
      var t = {
        /***/
        "./src/datetime.ts": (
          /*!*************************!*\
            !*** ./src/datetime.ts ***!
            \*************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.DateTime = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./duration */
              "./src/duration.ts"
            ), I = o(
              /*! ./interval */
              "./src/interval.ts"
            ), N = o(
              /*! ./settings */
              "./src/settings.ts"
            ), k = o(
              /*! ./info */
              "./src/info.ts"
            ), U = o(
              /*! ./impl/formatter */
              "./src/impl/formatter.ts"
            ), A = o(
              /*! ./zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), M = o(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), h = o(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), T = o(
              /*! ./impl/zoneUtil */
              "./src/impl/zoneUtil.ts"
            ), b = o(
              /*! ./impl/diff */
              "./src/impl/diff.ts"
            ), j = o(
              /*! ./impl/regexParser */
              "./src/impl/regexParser.ts"
            ), D = o(
              /*! ./impl/tokenParser */
              "./src/impl/tokenParser.ts"
            ), p = o(
              /*! ./impl/conversions */
              "./src/impl/conversions.ts"
            ), S = m.__importStar(o(
              /*! ./impl/formats */
              "./src/impl/formats.ts"
            )), C = o(
              /*! ./errors */
              "./src/errors.ts"
            ), P = o(
              /*! ./types/invalid */
              "./src/types/invalid.ts"
            ), O = "Invalid DateTime", _ = 864e13;
            function R(u, i, s) {
              var d = u - i * 60 * 1e3, g = s.offset(d);
              if (i === g)
                return [d, i];
              d -= (g - i) * 60 * 1e3;
              var c = s.offset(d);
              return g === c ? [d, g] : [u - Math.min(g, c) * 60 * 1e3, Math.max(g, c)];
            }
            function w(u, i) {
              u += i * 60 * 1e3;
              var s = new Date(u);
              return {
                year: s.getUTCFullYear(),
                month: s.getUTCMonth() + 1,
                day: s.getUTCDate(),
                hour: s.getUTCHours(),
                minute: s.getUTCMinutes(),
                second: s.getUTCSeconds(),
                millisecond: s.getUTCMilliseconds()
              };
            }
            function W(u, i, s) {
              return R((0, h.objToLocalTS)(u), i, s);
            }
            function Y(u, i, s, d, g, c) {
              var E = s.setZone, F = s.zone;
              if (u && Object.keys(u).length !== 0 || i) {
                var z = i || F, H = ie.fromObject(u || void 0, m.__assign(m.__assign({}, s), { zone: z, specificOffset: c }));
                return E ? H : H.setZone(F);
              } else
                return ie.invalid(new P.Invalid("unparsable", 'the input "'.concat(g, `" can't be parsed as `).concat(d)));
            }
            function V(u, i, s) {
              return s === void 0 && (s = !0), u.isValid ? U.Formatter.create(M.Locale.create("en-US"), {
                allowZ: s,
                forceSimple: !0
              }).formatDateTimeFromString(u, i) : null;
            }
            var K = {
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
            }, Z = {
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
            ], x = [
              "weekYear",
              "weekNumber",
              "weekday",
              "hour",
              "minute",
              "second",
              "millisecond"
            ], G = [
              "year",
              "ordinal",
              "hour",
              "minute",
              "second",
              "millisecond"
            ];
            function ee(u) {
              var i = h.PLURAL_MAPPING[u.toLowerCase()];
              if (!i)
                throw new C.InvalidUnitError(u);
              return i;
            }
            var ie = (
              /** @class */
              function() {
                function u(i) {
                  var s, d = i.zone || N.Settings.defaultZone, g = i.invalid || // invalid timestamp can happen when using plus or minus with 1E8 days resulting in overflows
                  (Number.isNaN(i.ts) ? new P.Invalid("invalid timestamp") : null) || (d.isValid ? null : u._unsupportedZone(d));
                  this._ts = (0, h.isUndefined)(i.ts) ? N.Settings.now() : i.ts;
                  var c, E;
                  if (!g) {
                    var F = !!i.old && i.old.ts === this._ts && i.old.zone.equals(d);
                    if (F)
                      s = [i.old.c, i.old.o], E = s[0], c = s[1];
                    else {
                      var z = (0, h.isNumber)(i.o) && !i.old ? i.o : d.offset(this.ts);
                      E = w(this._ts, z), g = Number.isNaN(E.year) ? new P.Invalid("invalid input") : null, E = g ? void 0 : E, c = g ? void 0 : z;
                    }
                  }
                  this._zone = d, this._loc = i.loc || M.Locale.create(), this._invalid = g, this._weekData = null, this._c = E, this._o = c, this._isLuxonDateTime = !0;
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
                    return this.isValid ? k.Info.months("long", { locObj: this._loc })[this.month - 1] : null;
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
                    return this.isValid ? k.Info.months("short", { locObj: this._loc })[this.month - 1] : null;
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
                    return this.isValid ? (0, p.gregorianToOrdinal)(this._c).ordinal : NaN;
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
                    return this.isValid ? k.Info.weekdays("long", { locObj: this._loc })[this.weekday - 1] : null;
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
                    return this.isValid ? k.Info.weekdays("short", { locObj: this._loc })[this.weekday - 1] : null;
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
                }), u.buildFormatParser = function(i, s) {
                  s === void 0 && (s = {});
                  var d = s.locale, g = d === void 0 ? null : d, c = s.numberingSystem, E = c === void 0 ? null : c, F = M.Locale.fromOpts({
                    locale: g,
                    numberingSystem: E,
                    defaultToEN: !0
                  });
                  return new D.TokenParser(F, i);
                }, u.expandFormat = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, D.expandMacroTokens)(U.Formatter.parseFormat(i), M.Locale.fromObject(s));
                  return d.map(function(g) {
                    return g.val;
                  }).join("");
                }, u.fromFormat = function(i, s, d) {
                  if (d === void 0 && (d = {}), (0, h.isUndefined)(i) || (0, h.isUndefined)(s))
                    throw new C.InvalidArgumentError("fromFormat requires an input string and a format");
                  var g = d.locale, c = d.numberingSystem, E = M.Locale.fromOpts({
                    locale: g,
                    numberingSystem: c,
                    defaultToEN: !0
                  }), F = (0, D.parseFromTokens)(E, i, s), z = F[0], H = F[1], q = F[2], J = F[3];
                  return J ? u.invalid(J) : Y(z, H || null, d, "format ".concat(s), i, q);
                }, u.fromFormatExplain = function(i, s, d) {
                  d === void 0 && (d = {});
                  var g = d.locale, c = d.numberingSystem, E = M.Locale.fromOpts({
                    locale: g,
                    numberingSystem: c,
                    defaultToEN: !0
                  });
                  return (0, D.explainFromTokens)(E, i, s);
                }, u.fromFormatParser = function(i, s, d) {
                  if (d === void 0 && (d = {}), (0, h.isUndefined)(i) || (0, h.isUndefined)(s))
                    throw new C.InvalidArgumentError("fromFormatParser requires an input string and a format parser");
                  var g = d.locale, c = g === void 0 ? null : g, E = d.numberingSystem, F = E === void 0 ? null : E, z = M.Locale.fromOpts({
                    locale: c,
                    numberingSystem: F,
                    defaultToEN: !0
                  });
                  if (!z.equals(s.locale))
                    throw new C.InvalidArgumentError("fromFormatParser called with a locale of ".concat(z, ", ") + "but the format parser was created for ".concat(s.locale));
                  var H = s.explainFromTokens(i), q = H.result, J = H.zone, Q = H.specificOffset, ne = H.invalidReason;
                  return ne ? u.invalid(ne) : Y(q, J, d, "format ".concat(s.format), i, Q);
                }, u.fromHTTP = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, j.parseHTTPDate)(i), g = d[0], c = d[1];
                  return Y(g, c, s, "HTTP", i);
                }, u.fromISO = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, j.parseISODate)(i), g = d[0], c = d[1];
                  return Y(g, c, s, "ISO 8601", i);
                }, u.fromJSDate = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, h.isDate)(i) ? i.valueOf() : NaN;
                  if (Number.isNaN(d))
                    return u.invalid("invalid input");
                  var g = (0, T.normalizeZone)(s.zone, N.Settings.defaultZone);
                  return g.isValid ? new u({
                    ts: d,
                    zone: g,
                    loc: M.Locale.fromObject(s)
                  }) : u.invalid(u._unsupportedZone(g));
                }, u.fromMillis = function(i, s) {
                  if (s === void 0 && (s = {}), (0, h.isNumber)(i))
                    return i < -_ || i > _ ? u.invalid("Timestamp out of range") : new u({
                      ts: i,
                      zone: (0, T.normalizeZone)(s.zone, N.Settings.defaultZone),
                      loc: M.Locale.fromObject(s)
                    });
                  throw new C.InvalidArgumentError("fromMillis requires a numerical input, but received a ".concat(typeof i, " with value ").concat(i));
                }, u.fromObject = function(i, s) {
                  i === void 0 && (i = {}), s === void 0 && (s = {});
                  var d = (0, T.normalizeZone)(s.zone, N.Settings.defaultZone);
                  if (!d.isValid)
                    return u.invalid(u._unsupportedZone(d));
                  var g = M.Locale.fromObject(s), c = (0, h.normalizeObject)(i, ee), E = N.Settings.now(), F = (0, h.isNumber)(s.specificOffset) ? s.specificOffset : d.offset(E), z = (0, h.isDefined)(c.ordinal), H = (0, h.isDefined)(c.year), q = (0, h.isDefined)(c.month) || (0, h.isDefined)(c.day), J = H || q, Q = c.weekYear || c.weekNumber;
                  if ((J || z) && Q)
                    throw new C.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                  if (q && z)
                    throw new C.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
                  var ne = Q || c.weekday && !J, de = (0, p.usesLocalWeekValues)(c, g), _e = de.minDaysInFirstWeek, Se = de.startOfWeek, be = w(E, F), Be = {
                    containsGregor: J,
                    containsOrdinal: z,
                    loc: g,
                    normalized: c,
                    obj: i,
                    offsetProvis: F,
                    useWeekData: ne,
                    zoneToUse: d
                  };
                  return ne ? u._buildObject(Be, x, X, (0, p.gregorianToWeek)(be, _e, Se)) : z ? u._buildObject(Be, G, Z, (0, p.gregorianToOrdinal)(be)) : u._buildObject(Be, L, K, be);
                }, u.fromRFC2822 = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, j.parseRFC2822Date)(i), g = d[0], c = d[1];
                  return Y(g, c, s, "RFC 2822", i);
                }, u.fromSQL = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, j.parseSQL)(i), g = d[0], c = d[1];
                  return Y(g, c, s, "SQL", i);
                }, u.fromSeconds = function(i, s) {
                  if (s === void 0 && (s = {}), !(0, h.isNumber)(i))
                    throw new C.InvalidArgumentError("fromSeconds requires a numerical input");
                  return new u({
                    ts: i * 1e3,
                    zone: (0, T.normalizeZone)(s.zone, N.Settings.defaultZone),
                    loc: M.Locale.fromObject(s)
                  });
                }, u.fromString = function(i, s, d) {
                  return d === void 0 && (d = {}), u.fromFormat(i, s, d);
                }, u.fromStringExplain = function(i, s, d) {
                  return d === void 0 && (d = {}), u.fromFormatExplain(i, s, d);
                }, u.invalid = function(i, s) {
                  if (!i)
                    throw new C.InvalidArgumentError("need to specify a reason the DateTime is invalid");
                  var d = i instanceof P.Invalid ? i : new P.Invalid(i, s);
                  if (N.Settings.throwOnInvalid)
                    throw new C.InvalidDateTimeError(d);
                  return new u({ invalid: d });
                }, u.isDateTime = function(i) {
                  return !!(i && i._isLuxonDateTime);
                }, u.local = function() {
                  for (var i = [], s = 0; s < arguments.length; s++)
                    i[s] = arguments[s];
                  var d = this._lastOpts(i), g = d[0], c = d[1], E = c[0], F = c[1], z = c[2], H = c[3], q = c[4], J = c[5], Q = c[6];
                  return u._quickDT({
                    year: E,
                    month: F,
                    day: z,
                    hour: H,
                    minute: q,
                    second: J,
                    millisecond: Q
                  }, g);
                }, u.max = function() {
                  for (var i = [], s = 0; s < arguments.length; s++)
                    i[s] = arguments[s];
                  if (!i.every(u.isDateTime))
                    throw new C.InvalidArgumentError("max requires all arguments be DateTimes");
                  return (0, h.bestBy)(i, function(d) {
                    return d.valueOf();
                  }, Math.max);
                }, u.min = function() {
                  for (var i = [], s = 0; s < arguments.length; s++)
                    i[s] = arguments[s];
                  if (!i.every(u.isDateTime))
                    throw new C.InvalidArgumentError("min requires all arguments be DateTimes");
                  return (0, h.bestBy)(i, function(d) {
                    return d.valueOf();
                  }, Math.min);
                }, u.now = function() {
                  return new u({});
                }, u.parseFormatForOpts = function(i, s) {
                  s === void 0 && (s = {});
                  var d = (0, D.formatOptsToTokens)(i, M.Locale.fromObject(s));
                  return d ? d.map(function(g) {
                    return g ? g.val : null;
                  }).join("") : null;
                }, u.resetCache = function() {
                  this._zoneOffsetTs = void 0, this._zoneOffsetGuessCache = /* @__PURE__ */ new Map();
                }, u.utc = function() {
                  for (var i = [], s = 0; s < arguments.length; s++)
                    i[s] = arguments[s];
                  var d = this._lastOpts(i), g = d[0], c = d[1], E = c[0], F = c[1], z = c[2], H = c[3], q = c[4], J = c[5], Q = c[6];
                  return g.zone = A.FixedOffsetZone.utcInstance, this._quickDT({ year: E, month: F, day: z, hour: H, minute: q, second: J, millisecond: Q }, g);
                }, u._buildObject = function(i, s, d, g) {
                  var c = !1;
                  s.forEach(function(ne) {
                    var de = i.normalized[ne];
                    (0, h.isDefined)(de) ? c = !0 : c ? i.normalized[ne] = d[ne] : i.normalized[ne] = g[ne];
                  });
                  var E = i.useWeekData ? (0, p.hasInvalidWeekData)(i.normalized) : i.containsOrdinal ? (0, p.hasInvalidOrdinalData)(i.normalized) : (0, p.hasInvalidGregorianData)(i.normalized), F = E || (0, p.hasInvalidTimeData)(i.normalized);
                  if (F)
                    return u.invalid(F);
                  var z = i.useWeekData ? (0, p.weekToGregorian)(i.normalized) : i.containsOrdinal ? (0, p.ordinalToGregorian)(i.normalized) : i.normalized, H = W(z, i.offsetProvis, i.zoneToUse), q = H[0], J = H[1], Q = new u({
                    ts: q,
                    zone: i.zoneToUse,
                    o: J,
                    loc: i.loc
                  });
                  return i.normalized.weekday && i.containsGregor && i.obj.weekday !== Q.weekday ? u.invalid("mismatched weekday", "you can't specify both a weekday of ".concat(i.normalized.weekday, " and a date of ").concat(Q.toISO())) : Q.isValid ? Q : u.invalid(Q._invalid);
                }, u._diffRelative = function(i, s, d) {
                  var g = (0, h.isUndefined)(d.round) ? !0 : d.round, c = function(J, Q) {
                    J = (0, h.roundTo)(J, g || d.calendary ? 0 : 2, !0);
                    var ne = s._loc.clone(d).relFormatter(d);
                    return ne.format(J, Q);
                  }, E = function(J) {
                    return d.calendary ? s.hasSame(i, J) ? 0 : s.startOf(J).diff(i.startOf(J), J).get(J) : s.diff(i, J).get(J);
                  };
                  if (d.unit)
                    return c(E(d.unit), d.unit);
                  for (var F = 0, z = d.units; F < z.length; F++) {
                    var H = z[F], q = E(H);
                    if (Math.abs(q) >= 1)
                      return c(q, H);
                  }
                  return c(i > s ? -0 : 0, d.units[d.units.length - 1]);
                }, u._guessOffsetForZone = function(i) {
                  return this._zoneOffsetGuessCache.has(i) || (this._zoneOffsetTs === void 0 && (this._zoneOffsetTs = N.Settings.now()), this._zoneOffsetGuessCache.set(i, i.offset(this._zoneOffsetTs))), this._zoneOffsetGuessCache.get(i);
                }, u._lastOpts = function(i) {
                  var s = {}, d;
                  return i.length > 0 && typeof i[i.length - 1] == "object" ? (s = i.pop(), d = i) : d = Array.from(i), [s, d];
                }, u._quickDT = function(i, s) {
                  var d, g = (0, T.normalizeZone)(s.zone, N.Settings.defaultZone);
                  if (!g.isValid)
                    return u.invalid(this._unsupportedZone(g));
                  var c = M.Locale.fromObject(s), E = N.Settings.now(), F, z;
                  if ((0, h.isDefined)(i.year)) {
                    for (var H = 0, q = L; H < q.length; H++) {
                      var J = q[H];
                      (0, h.isUndefined)(i[J]) && (i[J] = K[J]);
                    }
                    var Q = (0, p.hasInvalidGregorianData)(i) || (0, p.hasInvalidTimeData)(i);
                    if (Q)
                      return u.invalid(Q);
                    var ne = this._guessOffsetForZone(g);
                    d = W(i, ne, g), F = d[0], z = d[1];
                  } else
                    F = E;
                  return new u({ ts: F, zone: g, loc: c, o: z });
                }, u._unsupportedZone = function(i) {
                  return new P.Invalid("unsupported zone", 'the zone "'.concat(i.name, '" is not supported'));
                }, u.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                  return this.isValid ? "DateTime { ts: ".concat(this.toISO(), ", zone: ").concat(this.zone.name, ", locale: ").concat(this.locale, " }") : "DateTime { Invalid, reason: ".concat(this.invalidReason, " }");
                }, u.prototype.diff = function(i, s, d) {
                  if (s === void 0 && (s = "milliseconds"), d === void 0 && (d = {}), !this.isValid || !i.isValid) {
                    var g = this.invalidReason || i.invalidReason;
                    return f.Duration.invalid(g, "created by diffing an invalid DateTime");
                  }
                  var c = (0, h.maybeArray)(s).map(f.Duration.normalizeUnit), E = i.valueOf() > this.valueOf(), F = E ? this : i, z = E ? i : this, H = (0, b.diff)(F, z, c, m.__assign({ locale: this.locale, numberingSystem: this.numberingSystem }, d));
                  return E ? H.negate() : H;
                }, u.prototype.diffNow = function(i, s) {
                  return i === void 0 && (i = "milliseconds"), s === void 0 && (s = {}), this.diff(u.now(), i, s);
                }, u.prototype.endOf = function(i, s) {
                  var d, g = s === void 0 ? {} : s, c = g.useLocaleWeeks, E = c === void 0 ? !1 : c;
                  return this.plus((d = {}, d[i] = 1, d)).startOf(i, { useLocaleWeeks: E }).minus({ milliseconds: 1 });
                }, u.prototype.equals = function(i) {
                  return this.valueOf() === i.valueOf() && this.zone.equals(i.zone) && this._loc.equals(i._loc);
                }, u.prototype.get = function(i) {
                  return this[i];
                }, u.prototype.getPossibleOffsets = function() {
                  if (!this.isValid || this.isOffsetFixed)
                    return [this];
                  var i = 864e5, s = 6e4, d = (0, h.objToLocalTS)(this._c), g = this.zone.offset(d - i), c = this.zone.offset(d + i), E = this.zone.offset(d - g * s), F = this.zone.offset(d - c * s);
                  if (E === F)
                    return [this];
                  var z = d - E * s, H = d - F * s, q = w(z, E), J = w(H, F);
                  return q.hour === J.hour && q.minute === J.minute && q.second === J.second && q.millisecond === J.millisecond ? [this._clone({ ts: z }), this._clone({ ts: H })] : [this];
                }, u.prototype.hasSame = function(i, s, d) {
                  if (!this.isValid)
                    return !1;
                  var g = i.valueOf(), c = this.setZone(i.zone, { keepLocalTime: !0 });
                  return +c.startOf(s) <= g && g <= +c.endOf(s, d);
                }, u.prototype.minus = function(i) {
                  if (!this.isValid)
                    return this;
                  var s = f.Duration.fromDurationLike(i).negate();
                  return this._clone(this._adjustTime(s));
                }, u.prototype.plus = function(i) {
                  if (!this.isValid)
                    return this;
                  var s = f.Duration.fromDurationLike(i);
                  return this._clone(this._adjustTime(s));
                }, u.prototype.reconfigure = function(i) {
                  var s = this._loc.clone(i);
                  return this._clone({ loc: s });
                }, u.prototype.resolvedLocaleOptions = function(i) {
                  i === void 0 && (i = {});
                  var s = U.Formatter.create(this._loc.clone(i), i).resolvedOptions(this), d = s.locale, g = s.numberingSystem, c = s.calendar;
                  return { locale: d, numberingSystem: g, outputCalendar: c };
                }, u.prototype.set = function(i) {
                  if (!this.isValid)
                    return this;
                  var s = (0, h.normalizeObject)(i, ee), d = (0, p.usesLocalWeekValues)(s, this.loc), g = d.minDaysInFirstWeek, c = d.startOfWeek, E = (0, h.isDefined)(s.weekYear) || (0, h.isDefined)(s.weekNumber) || (0, h.isDefined)(s.weekday), F = (0, h.isDefined)(s.ordinal), z = (0, h.isDefined)(s.year), H = (0, h.isDefined)(s.month) || (0, h.isDefined)(s.day), q = z || H, J = s.weekYear || s.weekNumber;
                  if ((q || F) && J)
                    throw new C.ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
                  if (H && F)
                    throw new C.ConflictingSpecificationError("Can't mix ordinal dates with month/day");
                  var Q;
                  E ? Q = (0, p.weekToGregorian)(m.__assign(m.__assign({}, (0, p.gregorianToWeek)(this._c, g, c)), s), g, c) : (0, h.isUndefined)(s.ordinal) ? (Q = m.__assign(m.__assign({}, this.toObject()), s), (0, h.isUndefined)(s.day) && (Q.day = Math.min((0, h.daysInMonth)(Q.year, Q.month), Q.day))) : Q = (0, p.ordinalToGregorian)(m.__assign(m.__assign({}, (0, p.gregorianToOrdinal)(this._c)), s));
                  var ne = W(Q, this._o, this.zone), de = ne[0], _e = ne[1];
                  return this._clone({ ts: de, o: _e });
                }, u.prototype.setLocale = function(i) {
                  return this.reconfigure({ locale: i });
                }, u.prototype.setZone = function(i, s) {
                  var d = s === void 0 ? {} : s, g = d.keepLocalTime, c = g === void 0 ? !1 : g, E = d.keepCalendarTime, F = E === void 0 ? !1 : E;
                  if (i = (0, T.normalizeZone)(i, N.Settings.defaultZone), i.equals(this.zone))
                    return this;
                  if (i.isValid) {
                    var z = this._ts;
                    if (c || F) {
                      var H = i.offset(this._ts), q = this.toObject();
                      z = W(q, H, i)[0];
                    }
                    return this._clone({ ts: z, zone: i });
                  } else
                    return u.invalid(u._unsupportedZone(i));
                }, u.prototype.startOf = function(i, s) {
                  var d = s === void 0 ? {} : s, g = d.useLocaleWeeks, c = g === void 0 ? !1 : g;
                  if (!this.isValid)
                    return this;
                  var E = {}, F = f.Duration.normalizeUnit(i);
                  switch (F) {
                    case "years":
                      E.month = 1;
                    case "quarters":
                    case "months":
                      E.day = 1;
                    case "weeks":
                    case "days":
                      E.hour = 0;
                    case "hours":
                      E.minute = 0;
                    case "minutes":
                      E.second = 0;
                    case "seconds":
                      E.millisecond = 0;
                      break;
                  }
                  if (F === "weeks")
                    if (c) {
                      var z = this.loc.getStartOfWeek(), H = this.weekday;
                      H < z && (E.weekNumber = this.weekNumber - 1), E.weekday = z;
                    } else
                      E.weekday = 1;
                  if (F === "quarters") {
                    var q = Math.ceil(this.month / 3);
                    E.month = (q - 1) * 3 + 1;
                  }
                  return this.set(E);
                }, u.prototype.toBSON = function() {
                  return this.toJSDate();
                }, u.prototype.toFormat = function(i, s) {
                  return s === void 0 && (s = {}), this.isValid ? U.Formatter.create(this._loc.redefaultToEN(s)).formatDateTimeFromString(this, i) : O;
                }, u.prototype.toHTTP = function() {
                  return V(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
                }, u.prototype.toISO = function(i) {
                  var s = i === void 0 ? {} : i, d = s.format, g = d === void 0 ? "extended" : d, c = s.suppressSeconds, E = c === void 0 ? !1 : c, F = s.suppressMilliseconds, z = F === void 0 ? !1 : F, H = s.includeOffset, q = H === void 0 ? !0 : H, J = s.extendedZone, Q = J === void 0 ? !1 : J;
                  if (!this.isValid)
                    return null;
                  var ne = g === "extended";
                  return [
                    this._toISODate(ne),
                    "T",
                    this._toISOTime(ne, E, z, q, Q)
                  ].join("");
                }, u.prototype.toISODate = function(i) {
                  var s = i === void 0 ? { format: "extended" } : i, d = s.format, g = d === void 0 ? "extended" : d;
                  return this.isValid ? this._toISODate(g === "extended") : null;
                }, u.prototype.toISOTime = function(i) {
                  var s = i === void 0 ? {} : i, d = s.suppressMilliseconds, g = d === void 0 ? !1 : d, c = s.suppressSeconds, E = c === void 0 ? !1 : c, F = s.includeOffset, z = F === void 0 ? !0 : F, H = s.includePrefix, q = H === void 0 ? !1 : H, J = s.extendedZone, Q = J === void 0 ? !1 : J, ne = s.format, de = ne === void 0 ? "extended" : ne;
                  return this.isValid ? [
                    q ? "T" : "",
                    this._toISOTime(de === "extended", E, g, z, Q)
                  ].join("") : null;
                }, u.prototype.toISOWeekDate = function() {
                  return V(this, "kkkk-'W'WW-c");
                }, u.prototype.toJSDate = function() {
                  return new Date(this.isValid ? this._ts : NaN);
                }, u.prototype.toJSON = function() {
                  return this.toISO();
                }, u.prototype.toLocal = function() {
                  return this.setZone(N.Settings.defaultZone);
                }, u.prototype.toLocaleParts = function(i) {
                  return i === void 0 && (i = {}), this.isValid ? U.Formatter.create(this._loc.clone(i), i).formatDateTimeParts(this) : [];
                }, u.prototype.toLocaleString = function(i, s) {
                  return i === void 0 && (i = S.DATE_SHORT), s === void 0 && (s = {}), this.isValid ? U.Formatter.create(this._loc.clone(s), i).formatDateTime(this) : O;
                }, u.prototype.toMillis = function() {
                  return this.isValid ? this.ts : NaN;
                }, u.prototype.toObject = function(i) {
                  if (i === void 0 && (i = { includeConfig: !1 }), !this.isValid)
                    return {};
                  var s = Object.assign({}, this._c);
                  return i.includeConfig && (s.outputCalendar = this.outputCalendar, s.numberingSystem = this._loc.numberingSystem, s.locale = this._loc.locale), s;
                }, u.prototype.toRFC2822 = function() {
                  return V(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
                }, u.prototype.toRelative = function(i) {
                  if (i === void 0 && (i = {}), !this.isValid)
                    return null;
                  var s = i.base || u.fromObject({}, { zone: this.zone }), d = i.padding ? this < s ? -i.padding : i.padding : 0, g = ["years", "months", "days", "hours", "minutes", "seconds"], c = i.unit;
                  return Array.isArray(i.unit) && (g = i.unit, c = void 0), u._diffRelative(s, this.plus(d), m.__assign(m.__assign({}, i), { numeric: "always", units: g, unit: c }));
                }, u.prototype.toRelativeCalendar = function(i) {
                  return i === void 0 && (i = {}), this.isValid ? u._diffRelative(i.base || u.fromObject({}, { zone: this.zone }), this, m.__assign(m.__assign({}, i), { numeric: "auto", units: ["years", "months", "days"], calendary: !0 })) : null;
                }, u.prototype.toSQL = function(i) {
                  return i === void 0 && (i = {}), this.isValid ? "".concat(this.toSQLDate(), " ").concat(this.toSQLTime(i)) : null;
                }, u.prototype.toSQLDate = function() {
                  return this.isValid ? this._toISODate(!0) : null;
                }, u.prototype.toSQLTime = function(i) {
                  var s = i === void 0 ? {} : i, d = s.includeOffset, g = d === void 0 ? !0 : d, c = s.includeZone, E = c === void 0 ? !1 : c, F = s.includeOffsetSpace, z = F === void 0 ? !0 : F, H = "HH:mm:ss.SSS";
                  return (E || g) && (z && (H += " "), E ? H += "z" : g && (H += "ZZ")), V(this, H, !0);
                }, u.prototype.toSeconds = function() {
                  return this.isValid ? this._ts / 1e3 : NaN;
                }, u.prototype.toString = function() {
                  return this.isValid ? this.toISO() : O;
                }, u.prototype.toUTC = function(i, s) {
                  return i === void 0 && (i = 0), s === void 0 && (s = {}), this.setZone(A.FixedOffsetZone.instance(i), s);
                }, u.prototype.toUnixInteger = function() {
                  return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
                }, u.prototype.until = function(i) {
                  return I.Interval.fromDateTimes(this, i);
                }, u.prototype.valueOf = function() {
                  return this.toMillis();
                }, u.prototype._adjustTime = function(i) {
                  var s = this._o, d = this._c.year + Math.trunc(i.years), g = this._c.month + Math.trunc(i.months) + Math.trunc(i.quarters) * 3, c = m.__assign(m.__assign({}, this._c), { year: d, month: g, day: Math.min(this._c.day, (0, h.daysInMonth)(d, g)) + Math.trunc(i.days) + Math.trunc(i.weeks) * 7 }), E = f.Duration.fromObject({
                    years: i.years - Math.trunc(i.years),
                    quarters: i.quarters - Math.trunc(i.quarters),
                    months: i.months - Math.trunc(i.months),
                    weeks: i.weeks - Math.trunc(i.weeks),
                    days: i.days - Math.trunc(i.days),
                    hours: i.hours,
                    minutes: i.minutes,
                    seconds: i.seconds,
                    milliseconds: i.milliseconds
                  }).as("milliseconds"), F = (0, h.objToLocalTS)(c), z = R(F, s, this.zone), H = z[0], q = z[1];
                  return E !== 0 && (H += E, q = this.zone.offset(H)), { ts: H, o: q };
                }, u.prototype._clone = function(i) {
                  var s = {
                    ts: this._ts,
                    zone: this.zone,
                    c: this._c,
                    o: this._o,
                    loc: this._loc,
                    invalid: this._invalid || void 0
                  };
                  return new u(m.__assign(m.__assign(m.__assign({}, s), i), { old: s }));
                }, u.prototype._possiblyCachedLocalWeekData = function(i) {
                  return i._localWeekData || (i._localWeekData = (0, p.gregorianToWeek)(i._c, i.loc.getMinDaysInFirstWeek(), i.loc.getStartOfWeek())), i._localWeekData;
                }, u.prototype._possiblyCachedWeekData = function(i) {
                  return i._weekData === null && (i._weekData = (0, p.gregorianToWeek)(i._c)), i._weekData;
                }, u.prototype._toISODate = function(i) {
                  var s = this._c.year > 9999 || this._c.year < 0, d = "";
                  return s && this._c.year >= 0 && (d += "+"), d += (0, h.padStart)(this._c.year, s ? 6 : 4), i ? (d += "-", d += (0, h.padStart)(this._c.month), d += "-", d += (0, h.padStart)(this._c.day)) : (d += (0, h.padStart)(this._c.month), d += (0, h.padStart)(this._c.day)), d;
                }, u.prototype._toISOTime = function(i, s, d, g, c) {
                  var E = (0, h.padStart)(this._c.hour);
                  return i ? (E += ":", E += (0, h.padStart)(this._c.minute), (this._c.millisecond !== 0 || this._c.second !== 0 || !s) && (E += ":")) : E += (0, h.padStart)(this._c.minute), (this._c.millisecond !== 0 || this._c.second !== 0 || !s) && (E += (0, h.padStart)(this._c.second), (this._c.millisecond !== 0 || !d) && (E += ".", E += (0, h.padStart)(this._c.millisecond, 3))), g && (this.isOffsetFixed && this.offset === 0 && !c ? E += "Z" : this._o < 0 ? (E += "-", E += (0, h.padStart)(Math.trunc(-this._o / 60)), E += ":", E += (0, h.padStart)(Math.trunc(-this._o % 60))) : (E += "+", E += (0, h.padStart)(Math.trunc(this._o / 60)), E += ":", E += (0, h.padStart)(Math.trunc(this._o % 60)))), c && (E += "[" + this.zone.ianaName + "]"), E;
                }, u.DATETIME_FULL = S.DATETIME_FULL, u.DATETIME_FULL_WITH_SECONDS = S.DATETIME_FULL_WITH_SECONDS, u.DATETIME_HUGE = S.DATETIME_HUGE, u.DATETIME_HUGE_WITH_SECONDS = S.DATETIME_HUGE_WITH_SECONDS, u.DATETIME_MED = S.DATETIME_MED, u.DATETIME_MED_WITH_SECONDS = S.DATETIME_MED_WITH_SECONDS, u.DATETIME_MED_WITH_WEEKDAY = S.DATETIME_MED_WITH_WEEKDAY, u.DATETIME_SHORT = S.DATETIME_SHORT, u.DATETIME_SHORT_WITH_SECONDS = S.DATETIME_SHORT_WITH_SECONDS, u.DATE_FULL = S.DATE_FULL, u.DATE_HUGE = S.DATE_HUGE, u.DATE_MED = S.DATE_MED, u.DATE_MED_WITH_WEEKDAY = S.DATE_MED_WITH_WEEKDAY, u.DATE_SHORT = S.DATE_SHORT, u.TIME_24_SIMPLE = S.TIME_24_SIMPLE, u.TIME_24_WITH_LONG_OFFSET = S.TIME_24_WITH_LONG_OFFSET, u.TIME_24_WITH_SECONDS = S.TIME_24_WITH_SECONDS, u.TIME_24_WITH_SHORT_OFFSET = S.TIME_24_WITH_SHORT_OFFSET, u.TIME_SIMPLE = S.TIME_SIMPLE, u.TIME_WITH_LONG_OFFSET = S.TIME_WITH_LONG_OFFSET, u.TIME_WITH_SECONDS = S.TIME_WITH_SECONDS, u.TIME_WITH_SHORT_OFFSET = S.TIME_WITH_SHORT_OFFSET, u._zoneOffsetGuessCache = /* @__PURE__ */ new Map(), u;
              }()
            );
            n.DateTime = ie;
          }
        ),
        /***/
        "./src/duration.ts": (
          /*!*************************!*\
            !*** ./src/duration.ts ***!
            \*************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Duration = n.casualMatrix = n.lowOrderMatrix = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), I = o(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), N = o(
              /*! ./impl/formatter */
              "./src/impl/formatter.ts"
            ), k = o(
              /*! ./impl/regexParser */
              "./src/impl/regexParser.ts"
            ), U = o(
              /*! ./errors */
              "./src/errors.ts"
            ), A = o(
              /*! ./settings */
              "./src/settings.ts"
            ), M = o(
              /*! ./types/invalid */
              "./src/types/invalid.ts"
            ), h = o(
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
            var T = 146097 / 400, b = 146097 / 4800, j = m.__assign({ years: {
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
              weeks: b / 7,
              days: b,
              hours: b * 24,
              minutes: b * 24 * 60,
              seconds: b * 24 * 60 * 60,
              milliseconds: b * 24 * 60 * 60 * 1e3
            } }, n.lowOrderMatrix);
            function D(O, _) {
              for (var R, w = (R = _.milliseconds) !== null && R !== void 0 ? R : 0, W = 0, Y = f.REVERSE_ORDERED_UNITS.slice(1); W < Y.length; W++) {
                var V = Y[W];
                _[V] && (w += _[V] * O[V].milliseconds);
              }
              return w;
            }
            function p(O, _) {
              return O === void 0 || O === 0 ? _ === void 0 || _ === 0 : O === _;
            }
            function S(O, _) {
              var R = D(O, _) < 0 ? -1 : 1;
              f.REVERSE_ORDERED_UNITS.reduce(function(w, W) {
                if ((0, f.isUndefined)(_[W]))
                  return w;
                if (w) {
                  var Y = _[w] * R, V = O[W][w], K = Math.floor(Y / V);
                  _[W] += K * R, _[w] -= K * V * R;
                }
                return W;
              }, null), f.ORDERED_UNITS.reduce(function(w, W) {
                if ((0, f.isUndefined)(_[W]))
                  return w;
                if (w) {
                  var Y = _[w] % 1;
                  _[w] -= Y, _[W] += Y * O[w][W];
                }
                return W;
              }, null);
            }
            function C(O) {
              return O === void 0 && (O = {}), Object.entries(O).reduce(function(_, R) {
                var w = R[0], W = R[1];
                return W !== 0 && (_[w] = W), _;
              }, {});
            }
            var P = (
              /** @class */
              function() {
                function O(_) {
                  var R = _.conversionAccuracy === "longterm" || !1, w, W;
                  R ? (W = "longterm", w = j) : (W = "casual", w = n.casualMatrix), _.matrix && (w = _.matrix), this._values = _.values || {}, this._loc = _.loc || I.Locale.create(), this._conversionAccuracy = W, this._invalid = _.invalid || null, this._matrix = w, this._isLuxonDuration = !0;
                }
                return Object.defineProperty(O, "_INVALID", {
                  get: function() {
                    return "Invalid Duration";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "conversionAccuracy", {
                  /**
                   * Returns the conversion system to use
                   * @type {ConversionAccuracy}
                   */
                  get: function() {
                    return this._conversionAccuracy;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "days", {
                  /**
                   * Get the days.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.days || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "hours", {
                  /**
                   * Get the hours.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.hours || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "invalidExplanation", {
                  /**
                   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
                   * @type {string}
                   */
                  get: function() {
                    return this._invalid ? this._invalid.explanation : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "invalidReason", {
                  /**
                   * Returns an error code if this Duration became invalid, or null if the Duration is valid
                   * @return {string}
                   */
                  get: function() {
                    return this._invalid ? this._invalid.reason : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "isValid", {
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
                }), Object.defineProperty(O.prototype, "locale", {
                  /**
                   * Get  the locale of a Duration, such 'en-GB'
                   * @type {string}
                   */
                  get: function() {
                    return this.isValid ? this._loc.locale : void 0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "matrix", {
                  /**
                   * Get the conversion matrix of a Duration
                   * @type {ConversionMatrix}
                   */
                  get: function() {
                    return this._matrix;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "milliseconds", {
                  /**
                   * Get the milliseconds.
                   * @return {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.milliseconds || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "minutes", {
                  /**
                   * Get the minutes.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.minutes || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "months", {
                  /**
                   * Get the months.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.months || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "numberingSystem", {
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
                }), Object.defineProperty(O.prototype, "quarters", {
                  /**
                   * Get the quarters.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.quarters || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "seconds", {
                  /**
                   * Get the seconds.
                   * @return {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.seconds || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "weeks", {
                  /**
                   * Get the weeks
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.weeks || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(O.prototype, "years", {
                  /**
                   * Get the years.
                   * @type {number}
                   */
                  get: function() {
                    return this.isValid ? this._values.years || 0 : NaN;
                  },
                  enumerable: !1,
                  configurable: !0
                }), O.fromDurationLike = function(_) {
                  if ((0, f.isNumber)(_))
                    return O.fromMillis(_);
                  if (O.isDuration(_))
                    return _;
                  if (typeof _ == "object")
                    return O.fromObject(_);
                  throw new U.InvalidArgumentError("Unknown duration argument ".concat(_, " of type ").concat(typeof _));
                }, O.fromISO = function(_, R) {
                  var w = (0, k.parseISODuration)(_)[0];
                  return w ? O.fromObject(w, R) : O.invalid("unparsable", 'the input "'.concat(_, `" can't be parsed as ISO 8601`));
                }, O.fromISOTime = function(_, R) {
                  R === void 0 && (R = {});
                  var w = (0, k.parseISOTimeOnly)(_)[0];
                  return w ? O.fromObject(w, R) : O.invalid("unparsable", 'the input "'.concat(_, `" can't be parsed as ISO 8601`));
                }, O.fromMillis = function(_, R) {
                  return R === void 0 && (R = {}), O.fromObject({ milliseconds: _ }, R);
                }, O.fromObject = function(_, R) {
                  if (R === void 0 && (R = {}), _ == null || typeof _ != "object")
                    throw new U.InvalidArgumentError("Duration.fromObject: argument expected to be an object, got ".concat(_ === null ? "null" : typeof _));
                  return new O({
                    values: (0, f.normalizeObject)(_, O.normalizeUnit),
                    loc: I.Locale.fromObject(R),
                    conversionAccuracy: R.conversionAccuracy,
                    matrix: R.matrix
                  });
                }, O.invalid = function(_, R) {
                  if (!_)
                    throw new U.InvalidArgumentError("need to specify a reason the Duration is invalid");
                  var w = _ instanceof M.Invalid ? _ : new M.Invalid(_, R);
                  if (A.Settings.throwOnInvalid)
                    throw new U.InvalidDurationError(w);
                  return new O({ invalid: w });
                }, O.isDuration = function(_) {
                  return !!_ && _._isLuxonDuration || !1;
                }, O.normalizeUnit = function(_) {
                  var R = {
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
                  }[_];
                  if (!R)
                    throw new U.InvalidUnitError(_);
                  return R;
                }, O.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                  return this.isValid ? "Duration { values: ".concat(JSON.stringify(this._values), " }") : "Duration { Invalid, reason: ".concat(this.invalidReason, " }");
                }, O.prototype.as = function(_) {
                  return this.shiftTo(_).get(_);
                }, O.prototype.equals = function(_) {
                  if (!this.isValid || !_.isValid || !this._loc.equals(_._loc))
                    return !1;
                  for (var R = 0, w = f.ORDERED_UNITS; R < w.length; R++) {
                    var W = w[R];
                    if (!p(this._values[W], _._values[W]))
                      return !1;
                  }
                  return !0;
                }, O.prototype.get = function(_) {
                  return this[O.normalizeUnit(_)];
                }, O.prototype.getMaxUnit = function(_) {
                  _ === void 0 && (_ = !1);
                  var R = _ ? f.HUMAN_ORDERED_UNITS : f.ORDERED_UNITS, w = this.shiftTo.apply(this, R).toObject();
                  return R.find(function(W) {
                    return (w[W] || 0) > 0;
                  }) || f.REVERSE_ORDERED_UNITS[0];
                }, O.prototype.mapUnits = function(_) {
                  var R = this;
                  if (!this.isValid)
                    return this;
                  var w = {};
                  return Object.keys(this._values).forEach(function(W) {
                    w[W] = (0, f.asNumber)(_(R._values[W], W));
                  }), this._clone(this, { values: w }, !0);
                }, O.prototype.minus = function(_) {
                  if (!this.isValid)
                    return this;
                  var R = O.fromDurationLike(_);
                  return this.plus(R.negate());
                }, O.prototype.negate = function() {
                  var _ = this;
                  if (!this.isValid)
                    return this;
                  var R = {};
                  return Object.keys(this._values).forEach(function(w) {
                    R[w] = _._values[w] === 0 ? 0 : -_._values[w];
                  }), this._clone(this, { values: R }, !0);
                }, O.prototype.normalize = function() {
                  if (!this.isValid)
                    return this;
                  var _ = this.toObject();
                  return S(this._matrix, _), this._clone(this, { values: _ }, !0);
                }, O.prototype.plus = function(_) {
                  var R = this;
                  if (!this.isValid)
                    return this;
                  var w = O.fromDurationLike(_), W = {};
                  return f.ORDERED_UNITS.forEach(function(Y) {
                    (w._values[Y] !== void 0 || R._values[Y] !== void 0) && (W[Y] = w.get(Y) + R.get(Y));
                  }), this._clone(this, { values: W }, !0);
                }, O.prototype.reconfigure = function(_) {
                  var R = _ === void 0 ? {} : _, w = R.locale, W = R.numberingSystem, Y = R.conversionAccuracy, V = R.matrix, K = this._loc.clone({ locale: w, numberingSystem: W }), X = { loc: K, matrix: V, conversionAccuracy: Y };
                  return this._clone(this, X);
                }, O.prototype.rescale = function() {
                  if (!this.isValid)
                    return this;
                  var _ = C(this.normalize().shiftToAll().toObject());
                  return this._clone(this, { values: _ }, !0);
                }, O.prototype.set = function(_) {
                  if (!this.isValid)
                    return this;
                  var R = m.__assign(m.__assign({}, this._values), (0, f.normalizeObject)(_, O.normalizeUnit));
                  return this._clone(this, { values: R });
                }, O.prototype.shiftTo = function() {
                  for (var _ = this, R = [], w = 0; w < arguments.length; w++)
                    R[w] = arguments[w];
                  if (!this.isValid || R.length === 0)
                    return this;
                  R = R.map(function(X) {
                    return O.normalizeUnit(X);
                  });
                  var W = {}, Y = {}, V = this.toObject(), K;
                  return f.ORDERED_UNITS.forEach(function(X) {
                    if (R.indexOf(X) >= 0) {
                      K = X;
                      var Z = 0;
                      Object.keys(Y).forEach(function(x) {
                        Z += _._matrix[x][X] * Y[x], Y[x] = 0;
                      }), (0, f.isNumber)(V[X]) && (Z += V[X]);
                      var L = Math.trunc(Z);
                      W[X] = L, Y[X] = (Z * 1e3 - L * 1e3) / 1e3;
                    } else (0, f.isNumber)(V[X]) && (Y[X] = V[X]);
                  }), Object.keys(Y).forEach(function(X) {
                    var Z = Y[X];
                    Z !== 0 && (W[K] += X === K ? Z : Z / _._matrix[K][X]);
                  }), this._clone(this, { values: W }, !0).normalize();
                }, O.prototype.shiftToAll = function() {
                  return this.isValid ? this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds") : this;
                }, O.prototype.toFormat = function(_, R) {
                  R === void 0 && (R = { floor: !0 });
                  var w = m.__assign(m.__assign({}, R), { floor: R.round !== !1 && R.floor !== !1 });
                  return this.isValid ? N.Formatter.create(this._loc, w).formatDurationFromString(this, _) : O._INVALID;
                }, O.prototype.toHuman = function(_) {
                  var R = this;
                  if (_ === void 0 && (_ = {}), !this.isValid)
                    return O._INVALID;
                  var w = this.getMaxUnit(!0), W = _.onlyHumanUnits ? f.HUMAN_ORDERED_UNITS : f.ORDERED_UNITS, Y = this.shiftTo.apply(this, W.slice(W.indexOf(w))), V = Y.toObject(), K = W.map(function(Z) {
                    var L = V[Z];
                    return (0, f.isUndefined)(L) || L === 0 ? null : R._loc.numberFormatter(m.__assign(m.__assign({ style: "unit", unitDisplay: "long" }, _), { unit: Z.slice(0, -1) })).format(L);
                  }).filter(function(Z) {
                    return Z;
                  }), X = m.__assign({ type: "conjunction", style: _.listStyle || "narrow" }, _);
                  return this._loc.listFormatter(X).format(K);
                }, O.prototype.toISO = function() {
                  if (!this.isValid)
                    return null;
                  var _ = "P";
                  return this.years !== 0 && (_ += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (_ += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (_ += this.weeks + "W"), this.days !== 0 && (_ += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (_ += "T"), this.hours !== 0 && (_ += this.hours + "H"), this.minutes !== 0 && (_ += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (_ += (0, f.roundTo)(this.seconds + this.milliseconds / 1e3, 3) + "S"), _ === "P" && (_ += "T0S"), _;
                }, O.prototype.toISOTime = function(_) {
                  if (_ === void 0 && (_ = {}), !this.isValid)
                    return null;
                  var R = this.toMillis();
                  if (R < 0 || R >= 864e5)
                    return null;
                  _ = m.__assign(m.__assign({ suppressMilliseconds: !1, suppressSeconds: !1, includePrefix: !1, format: "extended" }, _), { includeOffset: !1 });
                  var w = h.DateTime.fromMillis(R, { zone: "UTC" });
                  return w.toISOTime(_);
                }, O.prototype.toJSON = function() {
                  return this.toISO();
                }, O.prototype.toMillis = function() {
                  return this.isValid ? D(this.matrix, this._values) : NaN;
                }, O.prototype.toObject = function() {
                  return this.isValid ? m.__assign({}, this._values) : {};
                }, O.prototype.toString = function() {
                  return this.toISO();
                }, O.prototype.valueOf = function() {
                  return this.toMillis();
                }, O.prototype._clone = function(_, R, w) {
                  w === void 0 && (w = !1);
                  var W = {
                    values: w ? R.values : m.__assign(m.__assign({}, _._values), R.values || {}),
                    loc: _._loc.clone(R.loc),
                    conversionAccuracy: R.conversionAccuracy || _.conversionAccuracy,
                    matrix: R.matrix || _.matrix
                  };
                  return new O(W);
                }, O;
              }()
            );
            n.Duration = P;
          }
        ),
        /***/
        "./src/errors.ts": (
          /*!***********************!*\
            !*** ./src/errors.ts ***!
            \***********************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.ZoneIsAbstractError = n.InvalidArgumentError = n.ConflictingSpecificationError = n.InvalidZoneError = n.InvalidUnitError = n.InvalidIntervalError = n.InvalidDurationError = n.InvalidDateTimeError = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j() {
                  return b !== null && b.apply(this, arguments) || this;
                }
                return j;
              }(Error)
            ), I = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  return b.call(this, "Invalid DateTime: ".concat(D.toMessage())) || this;
                }
                return j;
              }(f)
            );
            n.InvalidDateTimeError = I;
            var N = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  return b.call(this, "Invalid Duration: ".concat(D.toMessage())) || this;
                }
                return j;
              }(f)
            );
            n.InvalidDurationError = N;
            var k = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  return b.call(this, "Invalid Interval: ".concat(D.toMessage())) || this;
                }
                return j;
              }(f)
            );
            n.InvalidIntervalError = k;
            var U = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  var p = b.call(this, "Invalid unit ".concat(D)) || this;
                  return Object.setPrototypeOf(p, j.prototype), p;
                }
                return j;
              }(f)
            );
            n.InvalidUnitError = U;
            var A = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  var p = b.call(this, "".concat(D, " is an invalid or unknown zone specifier")) || this;
                  return Object.setPrototypeOf(p, j.prototype), p;
                }
                return j;
              }(f)
            );
            n.InvalidZoneError = A;
            var M = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  var p = b.call(this, D) || this;
                  return Object.setPrototypeOf(p, j.prototype), p;
                }
                return j;
              }(f)
            );
            n.ConflictingSpecificationError = M;
            var h = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j(D) {
                  var p = b.call(this, D) || this;
                  return Object.setPrototypeOf(p, j.prototype), p;
                }
                return j;
              }(f)
            );
            n.InvalidArgumentError = h;
            var T = (
              /** @class */
              function(b) {
                m.__extends(j, b);
                function j() {
                  var D = b.call(this, "Zone is an abstract class") || this;
                  return Object.setPrototypeOf(D, j.prototype), D;
                }
                return j;
              }(f)
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
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.usesLocalWeekValues = n.isoWeekdayToLocal = n.hasInvalidTimeData = n.hasInvalidGregorianData = n.hasInvalidOrdinalData = n.hasInvalidWeekData = n.ordinalToGregorian = n.gregorianToOrdinal = n.weekToGregorian = n.gregorianToWeek = n.dayOfWeek = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./util */
              "./src/impl/util.ts"
            ), I = o(
              /*! ../types/invalid */
              "./src/types/invalid.ts"
            ), N = o(
              /*! ../errors */
              "./src/errors.ts"
            ), k = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], U = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
            function A(w, W) {
              return new I.Invalid("unit out of range", "you specified ".concat(W, " (of type ").concat(typeof W, ") as a ").concat(w, ", which is invalid"));
            }
            function M(w, W, Y) {
              return Y + ((0, f.isLeapYear)(w) ? U : k)[W - 1];
            }
            function h(w, W) {
              var Y = (0, f.isLeapYear)(w) ? U : k, V = Y.findIndex(function(X) {
                return X < W;
              }), K = W - Y[V];
              return { month: V + 1, day: K };
            }
            function T(w, W, Y) {
              var V = new Date(Date.UTC(w, W - 1, Y));
              w < 100 && w >= 0 && V.setUTCFullYear(V.getUTCFullYear() - 1900);
              var K = V.getUTCDay();
              return K === 0 ? 7 : K;
            }
            n.dayOfWeek = T;
            function b(w, W, Y) {
              W === void 0 && (W = f.FALLBACK_WEEK_SETTINGS.minimalDays), Y === void 0 && (Y = f.FALLBACK_WEEK_SETTINGS.firstDay);
              var V = w.year, K = w.month, X = w.day, Z = M(V, K, X), L = _(T(V, K, X), Y), x = Math.floor((Z - L + 14 - W) / 7), G;
              return x < 1 ? (G = V - 1, x = (0, f.weeksInWeekYear)(G, W, Y)) : x > (0, f.weeksInWeekYear)(V, W, Y) ? (G = V + 1, x = 1) : G = V, m.__assign({ weekYear: G, weekNumber: x, weekday: L }, (0, f.timeObject)(w));
            }
            n.gregorianToWeek = b;
            function j(w, W, Y) {
              W === void 0 && (W = f.FALLBACK_WEEK_SETTINGS.minimalDays), Y === void 0 && (Y = f.FALLBACK_WEEK_SETTINGS.firstDay);
              var V = w.weekYear, K = w.weekNumber, X = w.weekday, Z = _(T(V, 1, W), Y), L = (0, f.daysInYear)(V), x = K * 7 + X - Z - 7 + W, G;
              x < 1 ? (G = V - 1, x += (0, f.daysInYear)(G)) : x > L ? (G = V + 1, x -= (0, f.daysInYear)(V)) : G = V;
              var ee = h(G, x), ie = ee.month, u = ee.day;
              return m.__assign({ year: G, month: ie, day: u }, (0, f.timeObject)(w));
            }
            n.weekToGregorian = j;
            function D(w) {
              var W = w.year, Y = w.month, V = w.day, K = M(W, Y, V);
              return m.__assign({ year: W, ordinal: K }, (0, f.timeObject)(w));
            }
            n.gregorianToOrdinal = D;
            function p(w) {
              var W = w.year, Y = w.ordinal, V = h(W, Y), K = V.month, X = V.day;
              return m.__assign({ year: W, month: K, day: X }, (0, f.timeObject)(w));
            }
            n.ordinalToGregorian = p;
            function S(w, W, Y) {
              W === void 0 && (W = 4), Y === void 0 && (Y = 1);
              var V = (0, f.isInteger)(w.weekYear), K = (0, f.integerBetween)(w.weekNumber, 1, (0, f.weeksInWeekYear)(w.weekYear, W, Y)), X = (0, f.integerBetween)(w.weekday, 1, 7);
              if (V)
                if (K) {
                  if (!X)
                    return A("weekday", w.weekday);
                } else return A("week", w.weekNumber);
              else return A("weekYear", w.weekYear);
              return !1;
            }
            n.hasInvalidWeekData = S;
            function C(w) {
              var W = (0, f.isInteger)(w.year), Y = (0, f.integerBetween)(w.ordinal, 1, (0, f.daysInYear)(w.year));
              if (W) {
                if (!Y)
                  return A("ordinal", w.ordinal);
              } else return A("year", w.year);
              return !1;
            }
            n.hasInvalidOrdinalData = C;
            function P(w) {
              var W = (0, f.isInteger)(w.year), Y = (0, f.integerBetween)(w.month, 1, 12), V = (0, f.integerBetween)(w.day, 1, (0, f.daysInMonth)(w.year, w.month));
              if (W)
                if (Y) {
                  if (!V)
                    return A("day", w.day);
                } else return A("month", w.month);
              else return A("year", w.year);
              return !1;
            }
            n.hasInvalidGregorianData = P;
            function O(w) {
              var W = w.hour, Y = w.minute, V = w.second, K = w.millisecond, X = (0, f.integerBetween)(W, 0, 23) || W === 24 && Y === 0 && V === 0 && K === 0, Z = (0, f.integerBetween)(Y, 0, 59), L = (0, f.integerBetween)(V, 0, 59), x = (0, f.integerBetween)(K, 0, 999);
              if (X)
                if (Z)
                  if (L) {
                    if (!x)
                      return A("millisecond", K);
                  } else return A("second", V);
                else return A("minute", Y);
              else return A("hour", W);
              return !1;
            }
            n.hasInvalidTimeData = O;
            function _(w, W) {
              return (w - W + 7) % 7 + 1;
            }
            n.isoWeekdayToLocal = _;
            function R(w, W) {
              var Y = (0, f.isDefined)(w.localWeekday) || (0, f.isDefined)(w.localWeekNumber) || (0, f.isDefined)(w.localWeekYear);
              if (Y) {
                var V = (0, f.isDefined)(w.weekday) || (0, f.isDefined)(w.weekNumber) || (0, f.isDefined)(w.weekYear);
                if (V)
                  throw new N.ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
                return (0, f.isDefined)(w.localWeekday) && (w.weekday = w.localWeekday), (0, f.isDefined)(w.localWeekNumber) && (w.weekNumber = w.localWeekNumber), (0, f.isDefined)(w.localWeekYear) && (w.weekYear = w.localWeekYear), delete w.localWeekday, delete w.localWeekNumber, delete w.localWeekYear, {
                  minDaysInFirstWeek: W.getMinDaysInFirstWeek(),
                  startOfWeek: W.getStartOfWeek()
                };
              } else
                return { minDaysInFirstWeek: f.FALLBACK_WEEK_SETTINGS.minimalDays, startOfWeek: f.FALLBACK_WEEK_SETTINGS.firstDay };
            }
            n.usesLocalWeekValues = R;
          }
        ),
        /***/
        "./src/impl/diff.ts": (
          /*!**************************!*\
            !*** ./src/impl/diff.ts ***!
            \**************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.diff = void 0;
            var m = o(
              /*! ../duration */
              "./src/duration.ts"
            );
            function f(k, U) {
              var A = function(h) {
                return h.toUTC(0, { keepLocalTime: !0 }).startOf("days").valueOf();
              }, M = A(U) - A(k);
              return Math.floor(m.Duration.fromMillis(M).as("days"));
            }
            function I(k, U, A) {
              for (var M = [
                ["years", function(O, _) {
                  return _.year - O.year;
                }],
                ["quarters", function(O, _) {
                  return _.quarter - O.quarter + (_.year - O.year) * 4;
                }],
                ["months", function(O, _) {
                  return _.month - O.month + (_.year - O.year) * 12;
                }],
                [
                  "weeks",
                  function(O, _) {
                    var R = f(O, _);
                    return (R - R % 7) / 7;
                  }
                ],
                ["days", f]
              ], h = {}, T = k, b, j, D = 0, p = M; D < p.length; D++) {
                var S = p[D], C = S[0], P = S[1];
                A.indexOf(C) >= 0 && (b = C, h[C] = P(k, U), j = T.plus(h), j > U ? (h[C]--, k = T.plus(h), k > U && (j = k, h[C]--, k = T.plus(h))) : k = j);
              }
              return [k, h, j, b];
            }
            var N = function(k, U, A, M) {
              var h, T, b = I(k, U, A), j = b[0], D = b[1], p = b[2], S = b[3], C = +U - +j, P = A.filter(function(_) {
                return ["hours", "minutes", "seconds", "milliseconds"].indexOf(_) >= 0;
              });
              P.length === 0 && (p < U && (p = j.plus((h = {}, h[S] = 1, h))), p !== j && (D[S] = (D[S] || 0) + C / (+p - +j)));
              var O = m.Duration.fromObject(D, M);
              return P.length > 0 ? (T = m.Duration.fromMillis(C, M)).shiftTo.apply(T, P).plus(O) : O;
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
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.digitRegex = n.resetDigitRegexCache = n.parseDigits = void 0;
            var o = {
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
            }, f = o.hanidec.replace(/[\[|\]]/g, "").split("");
            function I(A) {
              var M = parseInt(A, 10);
              if (!isNaN(M))
                return M;
              for (var h = "", T = 0; T < A.length; T++) {
                var b = A.charCodeAt(T);
                if (A[T].search(o.hanidec) !== -1)
                  h += f.indexOf(A[T]);
                else
                  for (var j in m) {
                    var D = m[j], p = D[0], S = D[1];
                    if (b >= p && b <= S) {
                      h += b - p;
                      break;
                    }
                  }
              }
              return parseInt(h, 10);
            }
            n.parseDigits = I;
            var N = {};
            function k() {
              N = {};
            }
            n.resetDigitRegexCache = k;
            function U(A, M) {
              var h = A.numberingSystem;
              M === void 0 && (M = "");
              var T = h || "latn";
              return N[T] || (N[T] = {}), N[T][M] || (N[T][M] = new RegExp("".concat(o[T]).concat(M))), N[T][M];
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
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.formatString = n.formatRelativeTime = n.eraForDateTime = n.monthForDateTime = n.weekdayForDateTime = n.meridiemForDateTime = n.eras = n.erasNarrow = n.erasShort = n.erasLong = n.meridiems = n.weekdays = n.weekdaysNarrow = n.weekdaysShort = n.weekdaysLong = n.months = n.monthsNarrow = n.monthsShort = n.monthsLong = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = m.__importStar(o(
              /*! ./formats */
              "./src/impl/formats.ts"
            )), I = o(
              /*! ./util */
              "./src/impl/util.ts"
            ), N = o(
              /*! ../duration */
              "./src/duration.ts"
            );
            function k(S) {
              return JSON.stringify(S, Object.keys(S).sort());
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
            function U(S) {
              switch (S) {
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
            function A(S) {
              switch (S) {
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
            n.weekdays = A, n.meridiems = ["AM", "PM"], n.erasLong = ["Before Christ", "Anno Domini"], n.erasShort = ["BC", "AD"], n.erasNarrow = ["B", "A"];
            function M(S) {
              switch (S) {
                case "narrow":
                  return m.__spreadArray([], n.erasNarrow, !0);
                case "short":
                  return m.__spreadArray([], n.erasShort, !0);
                case "long":
                  return m.__spreadArray([], n.erasLong, !0);
              }
            }
            n.eras = M;
            function h(S) {
              return n.meridiems[S.hour < 12 ? 0 : 1];
            }
            n.meridiemForDateTime = h;
            function T(S, C) {
              return A(C)[S.weekday - 1];
            }
            n.weekdayForDateTime = T;
            function b(S, C) {
              return U(C)[S.month - 1];
            }
            n.monthForDateTime = b;
            function j(S, C) {
              return M(C)[S.year < 0 ? 0 : 1];
            }
            n.eraForDateTime = j;
            function D(S, C, P, O) {
              P === void 0 && (P = "always"), O === void 0 && (O = !1);
              var _ = {
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
              }, R = N.Duration.normalizeUnit(S), w = _[R], W = ["hours", "minutes", "seconds"].indexOf(R) === -1;
              if (P === "auto" && W) {
                var Y = R === "days";
                switch (C) {
                  case 1:
                    return Y ? "tomorrow" : "next ".concat(w[0]);
                  case -1:
                    return Y ? "yesterday" : "last ".concat(w[0]);
                  case 0:
                    return Y ? "today" : "this ".concat(w[0]);
                }
              }
              var V = Object.is(C, -0) || C < 0, K = Math.abs(C), X = K === 1, Z = O ? X ? w[1] : w[2] || w[1] : X ? w[0] : R;
              return V ? "".concat(K, " ").concat(Z, " ago") : "in ".concat(K, " ").concat(Z);
            }
            n.formatRelativeTime = D;
            function p(S) {
              var C = (0, I.pick)(S, [
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
              ]), P = k(C), O = "EEEE, LLLL d, yyyy, h:mm a";
              switch (P) {
                case k(f.DATE_SHORT):
                  return "M/d/yyyy";
                case k(f.DATE_MED):
                  return "LLL d, yyyy";
                case k(f.DATE_MED_WITH_WEEKDAY):
                  return "EEE, LLL d, yyyy";
                case k(f.DATE_FULL):
                  return "LLLL d, yyyy";
                case k(f.DATE_HUGE):
                  return "EEEE, LLLL d, yyyy";
                case k(f.TIME_SIMPLE):
                  return "h:mm a";
                case k(f.TIME_WITH_SECONDS):
                  return "h:mm:ss a";
                case k(f.TIME_WITH_SHORT_OFFSET):
                  return "h:mm a";
                case k(f.TIME_WITH_LONG_OFFSET):
                  return "h:mm a";
                case k(f.TIME_24_SIMPLE):
                  return "HH:mm";
                case k(f.TIME_24_WITH_SECONDS):
                  return "HH:mm:ss";
                case k(f.TIME_24_WITH_SHORT_OFFSET):
                  return "HH:mm";
                case k(f.TIME_24_WITH_LONG_OFFSET):
                  return "HH:mm";
                case k(f.DATETIME_SHORT):
                  return "M/d/yyyy, h:mm a";
                case k(f.DATETIME_MED):
                  return "LLL d, yyyy, h:mm a";
                case k(f.DATETIME_FULL):
                  return "LLLL d, yyyy, h:mm a";
                case k(f.DATETIME_HUGE):
                  return O;
                case k(f.DATETIME_SHORT_WITH_SECONDS):
                  return "M/d/yyyy, h:mm:ss a";
                case k(f.DATETIME_MED_WITH_SECONDS):
                  return "LLL d, yyyy, h:mm:ss a";
                case k(f.DATETIME_MED_WITH_WEEKDAY):
                  return "EEE, d LLL yyyy, h:mm a";
                case k(f.DATETIME_FULL_WITH_SECONDS):
                  return "LLLL d, yyyy, h:mm:ss a";
                case k(f.DATETIME_HUGE_WITH_SECONDS):
                  return "EEEE, LLLL d, yyyy, h:mm:ss a";
                default:
                  return O;
              }
            }
            n.formatString = p;
          }
        ),
        /***/
        "./src/impl/formats.ts": (
          /*!*****************************!*\
            !*** ./src/impl/formats.ts ***!
            \*****************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.DATETIME_HUGE_WITH_SECONDS = n.DATETIME_HUGE = n.DATETIME_FULL_WITH_SECONDS = n.DATETIME_FULL = n.DATETIME_MED_WITH_WEEKDAY = n.DATETIME_MED_WITH_SECONDS = n.DATETIME_MED = n.DATETIME_SHORT_WITH_SECONDS = n.DATETIME_SHORT = n.TIME_24_WITH_LONG_OFFSET = n.TIME_24_WITH_SHORT_OFFSET = n.TIME_24_WITH_SECONDS = n.TIME_24_SIMPLE = n.TIME_WITH_LONG_OFFSET = n.TIME_WITH_SHORT_OFFSET = n.TIME_WITH_SECONDS = n.TIME_SIMPLE = n.DATE_HUGE = n.DATE_FULL = n.DATE_MED_WITH_WEEKDAY = n.DATE_MED = n.DATE_SHORT = void 0;
            var o = "numeric", m = "short", f = "long";
            n.DATE_SHORT = {
              year: o,
              month: o,
              day: o
            }, n.DATE_MED = {
              year: o,
              month: m,
              day: o
            }, n.DATE_MED_WITH_WEEKDAY = {
              year: o,
              month: m,
              day: o,
              weekday: m
            }, n.DATE_FULL = {
              year: o,
              month: f,
              day: o
            }, n.DATE_HUGE = {
              year: o,
              month: f,
              day: o,
              weekday: f
            }, n.TIME_SIMPLE = {
              hour: o,
              minute: o
            }, n.TIME_WITH_SECONDS = {
              hour: o,
              minute: o,
              second: o
            }, n.TIME_WITH_SHORT_OFFSET = {
              hour: o,
              minute: o,
              second: o,
              timeZoneName: m
            }, n.TIME_WITH_LONG_OFFSET = {
              hour: o,
              minute: o,
              second: o,
              timeZoneName: f
            }, n.TIME_24_SIMPLE = {
              hour: o,
              minute: o,
              hourCycle: "h23"
            }, n.TIME_24_WITH_SECONDS = {
              hour: o,
              minute: o,
              second: o,
              hourCycle: "h23"
            }, n.TIME_24_WITH_SHORT_OFFSET = {
              hour: o,
              minute: o,
              second: o,
              hourCycle: "h23",
              timeZoneName: m
            }, n.TIME_24_WITH_LONG_OFFSET = {
              hour: o,
              minute: o,
              second: o,
              hourCycle: "h23",
              timeZoneName: f
            }, n.DATETIME_SHORT = {
              year: o,
              month: o,
              day: o,
              hour: o,
              minute: o
            }, n.DATETIME_SHORT_WITH_SECONDS = {
              year: o,
              month: o,
              day: o,
              hour: o,
              minute: o,
              second: o
            }, n.DATETIME_MED = {
              year: o,
              month: m,
              day: o,
              hour: o,
              minute: o
            }, n.DATETIME_MED_WITH_SECONDS = {
              year: o,
              month: m,
              day: o,
              hour: o,
              minute: o,
              second: o
            }, n.DATETIME_MED_WITH_WEEKDAY = {
              year: o,
              month: m,
              day: o,
              weekday: m,
              hour: o,
              minute: o
            }, n.DATETIME_FULL = {
              year: o,
              month: f,
              day: o,
              hour: o,
              minute: o,
              timeZoneName: m
            }, n.DATETIME_FULL_WITH_SECONDS = {
              year: o,
              month: f,
              day: o,
              hour: o,
              minute: o,
              second: o,
              timeZoneName: m
            }, n.DATETIME_HUGE = {
              year: o,
              month: f,
              day: o,
              weekday: f,
              hour: o,
              minute: o,
              timeZoneName: f
            }, n.DATETIME_HUGE_WITH_SECONDS = {
              year: o,
              month: f,
              day: o,
              weekday: f,
              hour: o,
              minute: o,
              second: o,
              timeZoneName: f
            };
          }
        ),
        /***/
        "./src/impl/formatter.ts": (
          /*!*******************************!*\
            !*** ./src/impl/formatter.ts ***!
            \*******************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Formatter = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = m.__importStar(o(
              /*! ./english */
              "./src/impl/english.ts"
            )), I = m.__importStar(o(
              /*! ./formats */
              "./src/impl/formats.ts"
            )), N = o(
              /*! ./util */
              "./src/impl/util.ts"
            );
            function k(M, h) {
              for (var T = "", b = 0, j = M; b < j.length; b++) {
                var D = j[b];
                D.literal ? T += D.val : T += h(D.val);
              }
              return T;
            }
            var U = {
              /* eslint-disable @typescript-eslint/naming-convention */
              D: I.DATE_SHORT,
              DD: I.DATE_MED,
              DDD: I.DATE_FULL,
              DDDD: I.DATE_HUGE,
              t: I.TIME_SIMPLE,
              tt: I.TIME_WITH_SECONDS,
              ttt: I.TIME_WITH_SHORT_OFFSET,
              tttt: I.TIME_WITH_LONG_OFFSET,
              T: I.TIME_24_SIMPLE,
              TT: I.TIME_24_WITH_SECONDS,
              TTT: I.TIME_24_WITH_SHORT_OFFSET,
              TTTT: I.TIME_24_WITH_LONG_OFFSET,
              f: I.DATETIME_SHORT,
              ff: I.DATETIME_MED,
              fff: I.DATETIME_FULL,
              ffff: I.DATETIME_HUGE,
              F: I.DATETIME_SHORT_WITH_SECONDS,
              FF: I.DATETIME_MED_WITH_SECONDS,
              FFF: I.DATETIME_FULL_WITH_SECONDS,
              FFFF: I.DATETIME_HUGE_WITH_SECONDS
              /* eslint-enable @typescript-eslint/naming-convention */
            }, A = (
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
                  for (var T = null, b = "", j = !1, D = [], p = 0; p < h.length; p++) {
                    var S = h.charAt(p);
                    S === "'" ? (b.length > 0 && D.push({ literal: j || /^\s+$/.test(b), val: b }), T = null, b = "", j = !j) : j || S === T ? b += S : (b.length > 0 && D.push({ literal: /^\s+$/.test(b), val: b }), b = S, T = S);
                  }
                  return b.length > 0 && D.push({ literal: j || /^\s+$/.test(b), val: b }), D;
                }, M.prototype.dtFormatter = function(h, T) {
                  return T === void 0 && (T = {}), this._loc.dtFormatter(h, m.__assign(m.__assign({}, this._opts), T));
                }, M.prototype.formatDateTime = function(h, T) {
                  return this.dtFormatter(h, T).format();
                }, M.prototype.formatDateTimeFromString = function(h, T) {
                  var b = this, j = this._loc.listingMode() === "en", D = this._loc.outputCalendar && this._loc.outputCalendar !== "gregory", p = function(W, Y) {
                    return b._loc.extract(h, W, Y);
                  }, S = function(W) {
                    return h.isOffsetFixed && h.offset === 0 && W.allowZ ? "Z" : h.isValid ? h.zone.formatOffset(h.ts, W.format) : "";
                  }, C = function() {
                    return j ? f.meridiemForDateTime(h) : p({ hour: "numeric", hourCycle: "h12" }, "dayPeriod");
                  }, P = function(W, Y) {
                    return j ? f.monthForDateTime(h, W) : p(Y ? { month: W } : { month: W, day: "numeric" }, "month");
                  }, O = function(W, Y) {
                    return j ? f.weekdayForDateTime(h, W) : p(Y ? { weekday: W } : { weekday: W, month: "long", day: "numeric" }, "weekday");
                  }, _ = function(W) {
                    var Y = M.macroTokenToFormatOpts(W);
                    return Y ? b.formatWithSystemDefault(h, Y) : W;
                  }, R = function(W) {
                    return j ? f.eraForDateTime(h, W) : p({ era: W }, "era");
                  }, w = function(W) {
                    switch (W) {
                      case "S":
                        return b.num(h.millisecond);
                      case "u":
                      case "SSS":
                        return b.num(h.millisecond, 3);
                      case "s":
                        return b.num(h.second);
                      case "ss":
                        return b.num(h.second, 2);
                      case "uu":
                        return b.num(Math.floor(h.millisecond / 10), 2);
                      case "uuu":
                        return b.num(Math.floor(h.millisecond / 100));
                      case "m":
                        return b.num(h.minute);
                      case "mm":
                        return b.num(h.minute, 2);
                      case "h":
                        return b.num(h.hour % 12 === 0 ? 12 : h.hour % 12);
                      case "hh":
                        return b.num(h.hour % 12 === 0 ? 12 : h.hour % 12, 2);
                      case "H":
                        return b.num(h.hour);
                      case "HH":
                        return b.num(h.hour, 2);
                      case "Z":
                        return S({ format: "narrow", allowZ: b._opts.allowZ });
                      case "ZZ":
                        return S({ format: "short", allowZ: b._opts.allowZ });
                      case "ZZZ":
                        return S({ format: "techie", allowZ: b._opts.allowZ });
                      case "ZZZZ":
                        return h.zone.offsetName(h.ts, { format: "short", locale: b._loc.locale }) || "";
                      case "ZZZZZ":
                        return h.zone.offsetName(h.ts, { format: "long", locale: b._loc.locale }) || "";
                      case "z":
                        return h.zoneName || "";
                      case "a":
                        return C();
                      case "d":
                        return D ? p({ day: "numeric" }, "day") : b.num(h.day);
                      case "dd":
                        return D ? p({ day: "2-digit" }, "day") : b.num(h.day, 2);
                      case "c":
                        return b.num(h.weekday);
                      case "ccc":
                        return O("short", !0);
                      case "cccc":
                        return O("long", !0);
                      case "ccccc":
                        return O("narrow", !0);
                      case "E":
                        return b.num(h.weekday);
                      case "EEE":
                        return O("short", !1);
                      case "EEEE":
                        return O("long", !1);
                      case "EEEEE":
                        return O("narrow", !1);
                      case "L":
                        return D ? p({ month: "numeric", day: "numeric" }, "month") : b.num(h.month);
                      case "LL":
                        return D ? p({ month: "2-digit", day: "numeric" }, "month") : b.num(h.month, 2);
                      case "LLL":
                        return P("short", !0);
                      case "LLLL":
                        return P("long", !0);
                      case "LLLLL":
                        return P("narrow", !0);
                      case "M":
                        return D ? p({ month: "numeric" }, "month") : b.num(h.month);
                      case "MM":
                        return D ? p({ month: "2-digit" }, "month") : b.num(h.month, 2);
                      case "MMM":
                        return P("short", !1);
                      case "MMMM":
                        return P("long", !1);
                      case "MMMMM":
                        return P("narrow", !1);
                      case "y":
                        return D ? p({ year: "numeric" }, "year") : b.num(h.year);
                      case "yy":
                        return D ? p({ year: "2-digit" }, "year") : b.num(parseInt(h.year.toString().slice(-2), 10), 2);
                      case "yyyy":
                        return D ? p({ year: "numeric" }, "year") : b.num(h.year, 4);
                      case "yyyyyy":
                        return D ? p({ year: "numeric" }, "year") : b.num(h.year, 6);
                      case "G":
                        return R("short");
                      case "GG":
                        return R("long");
                      case "GGGGG":
                        return R("narrow");
                      case "kk":
                        return b.num(parseInt(h.weekYear.toString().slice(-2), 10), 2);
                      case "kkkk":
                        return b.num(h.weekYear, 4);
                      case "W":
                        return b.num(h.weekNumber);
                      case "WW":
                        return b.num(h.weekNumber, 2);
                      case "o":
                        return b.num(h.ordinal);
                      case "ooo":
                        return b.num(h.ordinal, 3);
                      case "q":
                        return b.num(h.quarter);
                      case "qq":
                        return b.num(h.quarter, 2);
                      case "X":
                        return b.num(Math.floor(h.ts / 1e3));
                      case "x":
                        return b.num(h.ts);
                      default:
                        return _(W);
                    }
                  };
                  return k(M.parseFormat(T), w);
                }, M.prototype.formatDateTimeParts = function(h, T) {
                  return this.dtFormatter(h, T).formatToParts();
                }, M.prototype.formatDurationFromString = function(h, T) {
                  var b = this, j = function(P) {
                    switch (P[0]) {
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
                  }, D = function(P) {
                    return function(O) {
                      var _ = j(O);
                      return _ ? b.num(P.get(_), O.length) : O;
                    };
                  }, p = M.parseFormat(T), S = p.reduce(function(P, O) {
                    var _ = O.literal, R = O.val;
                    return _ ? P : P.concat(R);
                  }, []), C = h.shiftTo.apply(h, S.map(j).filter(function(P) {
                    return !!P;
                  }));
                  return k(p, D(C));
                }, M.prototype.formatInterval = function(h, T) {
                  if (T === void 0 && (T = {}), !h.isValid)
                    throw Error("Invalid Interval provided!");
                  var b = this.dtFormatter(h.start, T);
                  return b.dtf.formatRange(h.start.toJSDate(), h.end.toJSDate());
                }, M.prototype.formatWithSystemDefault = function(h, T) {
                  this._systemLoc === void 0 && (this._systemLoc = this._loc.redefaultToSystem());
                  var b = this._systemLoc.dtFormatter(h, m.__assign(m.__assign({}, this._opts), T));
                  return b.format();
                }, M.prototype.num = function(h, T) {
                  if (T === void 0 && (T = 0), this._opts.forceSimple)
                    return (0, N.padStart)(h, T);
                  var b = m.__assign({}, this._opts);
                  return T > 0 && (b.padTo = T), this._loc.numberFormatter(b).format(h);
                }, M.prototype.resolvedOptions = function(h, T) {
                  return T === void 0 && (T = {}), this.dtFormatter(h, T).resolvedOptions();
                }, M;
              }()
            );
            n.Formatter = A;
          }
        ),
        /***/
        "./src/impl/locale.ts": (
          /*!****************************!*\
            !*** ./src/impl/locale.ts ***!
            \****************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Locale = n.PolyDateFormatter = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./util */
              "./src/impl/util.ts"
            ), I = m.__importStar(o(
              /*! ./english */
              "./src/impl/english.ts"
            )), N = o(
              /*! ../settings */
              "./src/settings.ts"
            ), k = o(
              /*! ../datetime */
              "./src/datetime.ts"
            ), U = o(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), A = m.__importDefault(o(
              /*! ../types/intl-next */
              "./src/types/intl-next.ts"
            )), M = {};
            function h(Z, L) {
              L === void 0 && (L = {});
              var x = JSON.stringify([Z, L]), G = M[x];
              return G || (G = new A.default.ListFormat(Z, L), M[x] = G), G;
            }
            var T = {};
            function b(Z, L) {
              L === void 0 && (L = {});
              var x = JSON.stringify([Z, L]), G = T[x];
              return G || (G = new A.default.DateTimeFormat(Z, L), T[x] = G), G;
            }
            var j = {};
            function D(Z, L) {
              var x = JSON.stringify([Z, L]), G = j[x];
              return G || (G = new A.default.NumberFormat(Z, L), j[x] = G), G;
            }
            var p = {};
            function S(Z, L) {
              L === void 0 && (L = {});
              var x = JSON.stringify([Z, L]), G = p[x];
              return G || (G = new A.default.RelativeTimeFormat(Z, L), p[x] = G), G;
            }
            var C;
            function P() {
              return C || (C = new A.default.DateTimeFormat().resolvedOptions().locale), C;
            }
            function O(Z) {
              var L = Z.indexOf("-x-");
              L !== -1 && (Z = Z.substring(0, L));
              var x = Z.indexOf("-u-");
              if (x === -1)
                return [Z];
              var G = void 0, ee = void 0;
              try {
                G = b(Z).resolvedOptions(), ee = Z;
              } catch {
                var ie = Z.substring(0, x);
                G = b(ie).resolvedOptions(), ee = ie;
              }
              var u = G.numberingSystem, i = G.calendar;
              return [ee, u, i];
            }
            function _(Z, L, x) {
              return (x || L) && (Z.includes("-u-") || (Z += "-u"), x && (Z += "-ca-".concat(x)), L && (Z += "-nu-".concat(L))), Z;
            }
            function R(Z) {
              for (var L = [], x = 1; x <= 12; x++) {
                var G = k.DateTime.utc(2009, x, 1);
                L.push(Z(G));
              }
              return L;
            }
            function w(Z) {
              for (var L = [], x = 1; x <= 7; x++) {
                var G = k.DateTime.utc(2016, 11, 13 + x);
                L.push(Z(G));
              }
              return L;
            }
            function W(Z, L, x, G) {
              var ee = Z.listingMode();
              return ee === "en" ? x(L) : G(L);
            }
            var Y = (
              /** @class */
              function() {
                function Z(L, x, G) {
                  var ee = G.padTo, ie = G.floor, u = m.__rest(G, ["padTo", "floor"]);
                  if (this._padTo = ee || 0, this._floor = ie || !1, !x || Object.keys(u).length > 0) {
                    var i = m.__assign({ useGrouping: !1 }, G);
                    this._padTo > 0 && (i.minimumIntegerDigits = ee), this._inf = D(L, i);
                  }
                }
                return Z.prototype.format = function(L) {
                  if (this._inf) {
                    var x = this._floor ? Math.floor(L) : L;
                    return this._inf.format(x);
                  } else {
                    var x = this._floor ? Math.floor(L) : (0, f.roundTo)(L, 3);
                    return (0, f.padStart)(x, this._padTo);
                  }
                }, Z;
              }()
            ), V = (
              /** @class */
              function() {
                function Z(L, x, G) {
                  this._opts = G;
                  var ee;
                  if (this._opts.timeZone)
                    this._dt = L;
                  else if (L.zone.type === "fixed") {
                    var ie = -1 * (L.offset / 60), u = ie >= 0 ? "Etc/GMT+".concat(ie) : "Etc/GMT".concat(ie);
                    L.offset !== 0 && U.IANAZone.create(u).isValid ? (ee = u, this._dt = L) : (ee = "UTC", this._dt = L.offset === 0 ? L : L.setZone("UTC").plus({ minutes: L.offset }), this._originalZone = L.zone);
                  } else L.zone.type === "system" ? this._dt = L : L.zone.type === "iana" ? (this._dt = L, ee = L.zone.name) : (ee = "UTC", this._dt = L.setZone("UTC").plus({ minutes: L.offset }), this._originalZone = L.zone);
                  var i = m.__assign(m.__assign({}, this._opts), { timeZone: this._opts.timeZone || ee });
                  this._dtf = b(x, i);
                }
                return Object.defineProperty(Z.prototype, "dtf", {
                  get: function() {
                    return this._dtf;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Z.prototype.format = function() {
                  return this._originalZone ? this.formatToParts().map(function(L) {
                    var x = L.value;
                    return x;
                  }).join("") : this.dtf.format(this._dt.toJSDate());
                }, Z.prototype.formatToParts = function() {
                  var L = this, x = this.dtf.formatToParts(this._dt.toJSDate());
                  return this._originalZone ? x.map(function(G) {
                    if (G.type === "timeZoneName") {
                      var ee = L._originalZone.offsetName(L._dt.ts, {
                        locale: L._dt.locale,
                        format: L._opts.timeZoneName
                      });
                      return m.__assign(m.__assign({}, G), {
                        // tslint:disable-next-line:no-non-null-assertion
                        value: ee
                      });
                    } else
                      return G;
                  }) : x;
                }, Z.prototype.resolvedOptions = function() {
                  return this._dtf.resolvedOptions();
                }, Z;
              }()
            );
            n.PolyDateFormatter = V;
            var K = (
              /** @class */
              function() {
                function Z(L, x, G) {
                  this._opts = m.__assign({ style: "long" }, G), !x && (0, f.hasRelative)() && (this._rtf = S(L, G));
                }
                return Z.prototype.format = function(L, x) {
                  return this._rtf ? this._rtf.format(L, x) : I.formatRelativeTime(x, L, this._opts.numeric, this._opts.style !== "long");
                }, Z.prototype.formatToParts = function(L, x) {
                  return this._rtf ? this._rtf.formatToParts(L, x) : [];
                }, Z;
              }()
            ), X = (
              /** @class */
              function() {
                function Z(L, x, G, ee, ie) {
                  var u = O(L), i = u[0], s = u[1], d = u[2];
                  this.locale = i, this.numberingSystem = x || s, this.outputCalendar = G || d, this._intl = _(this.locale, this.numberingSystem, this.outputCalendar), this._weekSettings = ee, this._weekdaysCache = { format: {}, standalone: {} }, this._monthsCache = { format: {}, standalone: {} }, this._meridiemCache = void 0, this._eraCache = {}, this._specifiedLocale = ie, this._fastNumbersCached = void 0;
                }
                return Object.defineProperty(Z.prototype, "fastNumbers", {
                  get: function() {
                    return this._fastNumbersCached === void 0 && (this._fastNumbersCached = this._supportsFastNumbers()), this._fastNumbersCached;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Z.create = function(L, x, G, ee, ie) {
                  ie === void 0 && (ie = !1);
                  var u = L || N.Settings.defaultLocale, i = u || (ie ? "en-US" : P()), s = x || N.Settings.defaultNumberingSystem, d = G || N.Settings.defaultOutputCalendar, g = (0, f.validateWeekSettings)(ee) || N.Settings.defaultWeekSettings;
                  return new Z(i, s, d, g, u);
                }, Z.fromObject = function(L) {
                  var x = L === void 0 ? {} : L, G = x.locale, ee = x.numberingSystem, ie = x.outputCalendar, u = x.weekSettings;
                  return Z.create(G, ee, ie, u);
                }, Z.fromOpts = function(L) {
                  return Z.create(L.locale, L.numberingSystem, L.outputCalendar, L.weekSettings, L.defaultToEN);
                }, Z.resetCache = function() {
                  C = void 0, M = {}, T = {}, j = {}, p = {};
                }, Z.prototype.clone = function(L) {
                  return !L || Object.getOwnPropertyNames(L).length === 0 ? this : Z.create(L.locale || this._specifiedLocale, L.numberingSystem || this.numberingSystem, L.outputCalendar || this.outputCalendar, (0, f.validateWeekSettings)(L.weekSettings) || this._weekSettings, L.defaultToEN || !1);
                }, Z.prototype.dtFormatter = function(L, x) {
                  return x === void 0 && (x = {}), new V(L, this._intl, x);
                }, Z.prototype.equals = function(L) {
                  return this.locale === L.locale && this.numberingSystem === L.numberingSystem && this.outputCalendar === L.outputCalendar;
                }, Z.prototype.eras = function(L) {
                  var x = this;
                  return W(this, L, I.eras, function(G) {
                    var ee = { era: G };
                    return x._eraCache[G] || (x._eraCache[G] = [k.DateTime.utc(-40, 1, 1), k.DateTime.utc(2017, 1, 1)].map(function(ie) {
                      return x.extract(ie, ee, "era");
                    })), x._eraCache[G];
                  });
                }, Z.prototype.extract = function(L, x, G) {
                  var ee = this.dtFormatter(L, x), ie = ee.formatToParts(), u = ie.find(function(i) {
                    return i.type.toLowerCase() === G.toLowerCase();
                  });
                  if (!u)
                    throw new Error("Invalid extract field ".concat(G));
                  return u.value;
                }, Z.prototype.getMinDaysInFirstWeek = function() {
                  return this.getWeekSettings().minimalDays;
                }, Z.prototype.getStartOfWeek = function() {
                  return this.getWeekSettings().firstDay;
                }, Z.prototype.getWeekSettings = function() {
                  return this._weekSettings ? this._weekSettings : (0, f.hasLocaleWeekInfo)() ? this._getCachedWeekInfo(this.locale) : f.FALLBACK_WEEK_SETTINGS;
                }, Z.prototype.getWeekendDays = function() {
                  return this.getWeekSettings().weekend;
                }, Z.prototype.isEnglish = function() {
                  return (
                    // tslint:disable-next-line:no-bitwise
                    !!~["en", "en-us"].indexOf(this.locale.toLowerCase()) || new A.default.DateTimeFormat(this._intl).resolvedOptions().locale.startsWith("en-us")
                  );
                }, Z.prototype.listFormatter = function(L) {
                  return L === void 0 && (L = {}), h(this._intl, L);
                }, Z.prototype.listingMode = function() {
                  var L = this.isEnglish(), x = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
                  return L && x ? "en" : "intl";
                }, Z.prototype.meridiems = function() {
                  var L = this;
                  return W(
                    this,
                    "long",
                    // arbitrary unused value
                    function() {
                      return I.meridiems;
                    },
                    function() {
                      return L._meridiemCache === void 0 && (L._meridiemCache = [
                        k.DateTime.utc(2016, 11, 13, 9),
                        k.DateTime.utc(2016, 11, 13, 19)
                      ].map(function(x) {
                        return L.extract(x, { hour: "numeric", hourCycle: "h12" }, "dayPeriod");
                      })), L._meridiemCache;
                    }
                  );
                }, Z.prototype.months = function(L, x) {
                  var G = this;
                  return x === void 0 && (x = !1), W(this, L, I.months, function(ee) {
                    var ie = x ? { month: ee, day: "numeric" } : { month: ee }, u = x ? "format" : "standalone";
                    return G._monthsCache[u][ee] || (G._monthsCache[u][ee] = R(function(i) {
                      return G.extract(i, ie, "month");
                    })), G._monthsCache[u][ee];
                  });
                }, Z.prototype.numberFormatter = function(L) {
                  return L === void 0 && (L = {}), new Y(this._intl, this.fastNumbers, L);
                }, Z.prototype.redefaultToEN = function(L) {
                  return L === void 0 && (L = {}), this.clone(m.__assign(m.__assign({}, L), { defaultToEN: !0 }));
                }, Z.prototype.redefaultToSystem = function(L) {
                  return L === void 0 && (L = {}), this.clone(m.__assign(m.__assign({}, L), { defaultToEN: !1 }));
                }, Z.prototype.relFormatter = function(L) {
                  return L === void 0 && (L = {}), new K(this._intl, this.isEnglish(), L);
                }, Z.prototype.toString = function() {
                  return "Locale(".concat(this.locale, ", ").concat(this.numberingSystem, ", ").concat(this.outputCalendar, ")");
                }, Z.prototype.weekdays = function(L, x) {
                  var G = this;
                  return x === void 0 && (x = !1), W(this, L, I.weekdays, function(ee) {
                    var ie = x ? { weekday: ee, year: "numeric", month: "long", day: "numeric" } : { weekday: ee }, u = x ? "format" : "standalone";
                    return G._weekdaysCache[u][ee] || (G._weekdaysCache[u][ee] = w(function(i) {
                      return G.extract(i, ie, "weekday");
                    })), G._weekdaysCache[u][ee];
                  });
                }, Z.prototype._getCachedWeekInfo = function(L) {
                  var x = Z._weekInfoCache[L];
                  if (!x) {
                    var G = new A.default.Locale(L);
                    x = "getWeekInfo" in G ? G.getWeekInfo() : G.weekInfo, Z._weekInfoCache[L] = x;
                  }
                  return x;
                }, Z.prototype._supportsFastNumbers = function() {
                  return this.numberingSystem && this.numberingSystem !== "latn" ? !1 : this.numberingSystem === "latn" || !this.locale || this.locale.startsWith("en") || A.default.DateTimeFormat(this._intl).resolvedOptions().numberingSystem === "latn";
                }, Z._weekInfoCache = {}, Z;
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
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.parseSQL = n.parseRFC2822Date = n.parseISOTimeOnly = n.parseISODuration = n.parseISODate = n.parseHTTPDate = n.IANA_REGEX = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./util */
              "./src/impl/util.ts"
            ), I = m.__importStar(o(
              /*! ./english */
              "./src/impl/english.ts"
            )), N = o(
              /*! ../zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), k = o(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            );
            function U() {
              for (var B = [], te = 0; te < arguments.length; te++)
                B[te] = arguments[te];
              var ue = B.reduce(function(fe, he) {
                return fe + he.source;
              }, "");
              return RegExp("^".concat(ue, "$"));
            }
            function A() {
              for (var B = [], te = 0; te < arguments.length; te++)
                B[te] = arguments[te];
              return function(ue) {
                return B.reduce(function(fe, he) {
                  var me = fe[0], Ie = fe[1], we = fe[2], ye = he(ue, we), et = ye[0], tt = ye[1], rt = ye[2];
                  return [m.__assign(m.__assign({}, me), et), tt || Ie, rt];
                }, [{}, null, 1]).slice(0, 2);
              };
            }
            function M(B) {
              for (var te = [], ue = 1; ue < arguments.length; ue++)
                te[ue - 1] = arguments[ue];
              if (B == null)
                return [null, null];
              for (var fe = 0, he = te; fe < he.length; fe++) {
                var me = he[fe], Ie = me[0], we = me[1], ye = Ie.exec(B);
                if (ye)
                  return we(ye);
              }
              return [null, null];
            }
            function h() {
              for (var B = [], te = 0; te < arguments.length; te++)
                B[te] = arguments[te];
              return function(ue, fe) {
                var he = {}, me;
                for (me = 0; me < B.length; me++)
                  he[B[me]] = (0, f.parseInteger)(ue[fe + me]);
                return [he, null, fe + me];
              };
            }
            n.IANA_REGEX = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
            var T = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/, b = "(?:".concat(T.source, "?(?:\\[(").concat(n.IANA_REGEX.source, ")\\])?)?"), j = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, D = RegExp("".concat(j.source).concat(b)), p = RegExp("(?:T".concat(D.source, ")?")), S = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, C = /(\d{4})-?W(\d\d)(?:-?(\d))?/, P = /(\d{4})-?(\d{3})/, O = h("weekYear", "weekNumber", "weekday"), _ = h("year", "ordinal"), R = /(\d{4})-(\d\d)-(\d\d)/, w = RegExp("".concat(j.source, " ?(?:").concat(T.source, "|(").concat(n.IANA_REGEX.source, "))?")), W = RegExp("(?: ".concat(w.source, ")?"));
            function Y(B, te, ue) {
              return (0, f.isUndefined)(B[te]) ? ue : (0, f.parseInteger)(B[te]);
            }
            function V(B, te) {
              var ue = {
                year: Y(B, te, 0),
                // 0 default value never used?
                month: Y(B, te + 1, 1),
                day: Y(B, te + 2, 1)
              };
              return [ue, null, te + 3];
            }
            function K(B, te) {
              var ue = {
                hour: Y(B, te, 0),
                minute: Y(B, te + 1, 0),
                second: Y(B, te + 2, 0),
                millisecond: (0, f.parseMillis)(B[te + 3])
              };
              return [ue, null, te + 4];
            }
            function X(B, te) {
              var ue = !B[te] && !B[te + 1], fe = (0, f.signedOffset)(B[te + 1], B[te + 2]), he = ue ? null : N.FixedOffsetZone.instance(fe);
              return [{}, he, te + 3];
            }
            function Z(B, te) {
              var ue = B[te] ? k.IANAZone.create(B[te]) : null;
              return [{}, ue, te + 1];
            }
            var L = RegExp("^T?".concat(j.source, "$")), x = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
            function G(B) {
              var te = B[0], ue = B[1], fe = B[2], he = B[3], me = B[4], Ie = B[5], we = B[6], ye = B[7], et = B[8], tt = te.startsWith("-"), rt = !!ye && ye.startsWith("-"), Fe = function(He, mt) {
                return mt === void 0 && (mt = !1), typeof He == "number" && (mt || He && tt) ? -He : He;
              };
              return [{
                years: Fe((0, f.parseFloating)(ue)),
                months: Fe((0, f.parseFloating)(fe)),
                weeks: Fe((0, f.parseFloating)(he)),
                days: Fe((0, f.parseFloating)(me)),
                hours: Fe((0, f.parseFloating)(Ie)),
                minutes: Fe((0, f.parseFloating)(we)),
                seconds: Fe((0, f.parseFloating)(ye), ye === "-0"),
                milliseconds: Fe((0, f.parseMillis)(et), rt)
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
            function ie(B, te, ue, fe, he, me, Ie) {
              var we;
              B && (we = B.length > 3 ? I.weekdaysLong.indexOf(B) + 1 : I.weekdaysShort.indexOf(B) + 1);
              var ye = te.length === 2 ? (0, f.untruncateYear)((0, f.parseInteger)(te)) : (0, f.parseInteger)(te);
              return {
                year: ye,
                month: I.monthsShort.indexOf(ue) + 1,
                day: (0, f.parseInteger)(fe),
                hour: (0, f.parseInteger)(he),
                minute: (0, f.parseInteger)(me),
                second: (0, f.parseInteger)(Ie),
                weekday: we
              };
            }
            var u = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
            function i(B) {
              var te = B[1], ue = B[2], fe = B[3], he = B[4], me = B[5], Ie = B[6], we = B[7], ye = B[8], et = B[9], tt = B[10], rt = B[11], Fe = ie(te, he, fe, ue, me, Ie, we), He;
              return ye ? He = ee[ye] : et ? He = 0 : He = (0, f.signedOffset)(tt, rt), [Fe, new N.FixedOffsetZone(He)];
            }
            function s(B) {
              return B.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
            }
            var d = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, g = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, c = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
            function E(B) {
              var te = B[1], ue = B[2], fe = B[3], he = B[4], me = B[5], Ie = B[6], we = B[7], ye = ie(te, he, fe, ue, me, Ie, we);
              return [ye, N.FixedOffsetZone.utcInstance];
            }
            function F(B) {
              var te = B[1], ue = B[2], fe = B[3], he = B[4], me = B[5], Ie = B[6], we = B[7], ye = ie(te, we, ue, fe, he, me, Ie);
              return [ye, N.FixedOffsetZone.utcInstance];
            }
            var z = U(S, p), H = U(C, p), q = U(P, p), J = U(D), Q = A(V, K, X, Z), ne = A(O, K, X, Z), de = A(_, K, X, Z), _e = A(K, X, Z);
            function Se(B) {
              return M(B, [d, E], [g, E], [c, F]);
            }
            n.parseHTTPDate = Se;
            function be(B) {
              return M(B, [z, Q], [H, ne], [q, de], [J, _e]);
            }
            n.parseISODate = be;
            function Be(B) {
              return M(B, [x, G]);
            }
            n.parseISODuration = Be;
            function ht(B) {
              return M(B, [L, A(K)]);
            }
            n.parseISOTimeOnly = ht;
            function Or(B) {
              return M(s(B), [u, i]);
            }
            n.parseRFC2822Date = Or;
            var wr = U(R, W), Dr = U(w), Sr = A(K, X, Z);
            function Ir(B) {
              return M(B, [wr, Q], [Dr, Sr]);
            }
            n.parseSQL = Ir;
          }
        ),
        /***/
        "./src/impl/tokenParser.ts": (
          /*!*********************************!*\
            !*** ./src/impl/tokenParser.ts ***!
            \*********************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.formatOptsToTokens = n.parseFromTokens = n.sanitizeSpaces = n.explainFromTokens = n.TokenParser = n.expandMacroTokens = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./util */
              "./src/impl/util.ts"
            ), I = o(
              /*! ./formatter */
              "./src/impl/formatter.ts"
            ), N = o(
              /*! ../zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), k = o(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), U = o(
              /*! ./digits */
              "./src/impl/digits.ts"
            ), A = o(
              /*! ../datetime */
              "./src/datetime.ts"
            ), M = o(
              /*! ../errors */
              "./src/errors.ts"
            ), h = "missing Intl.DateTimeFormat.formatToParts support";
            function T(i, s) {
              return s === void 0 && (s = function(d) {
                return d;
              }), { regex: i, deser: function(d) {
                var g = d[0];
                return s((0, U.parseDigits)(g));
              } };
            }
            var b = "[ ".concat(" ", "]"), j = new RegExp(b, "g");
            function D(i) {
              return i.replace(/\./g, "\\.?").replace(j, b);
            }
            function p(i) {
              return i.replace(/\./g, "").replace(j, " ").toLowerCase();
            }
            function S(i, s) {
              return {
                regex: RegExp(i.map(D).join("|")),
                deser: function(d) {
                  var g = d[0];
                  return i.findIndex(function(c) {
                    return p(g) === p(c);
                  }) + s;
                }
              };
            }
            function C(i, s) {
              return { regex: i, deser: function(d) {
                var g = d[1], c = d[2];
                return (0, f.signedOffset)(g, c);
              }, groups: s };
            }
            function P(i) {
              return { regex: i, deser: function(s) {
                var d = s[0];
                return d;
              } };
            }
            function O(i) {
              return i.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            }
            function _(i, s) {
              var d = (0, U.digitRegex)(s), g = (0, U.digitRegex)(s, "{2}"), c = (0, U.digitRegex)(s, "{3}"), E = (0, U.digitRegex)(s, "{4}"), F = (0, U.digitRegex)(s, "{6}"), z = (0, U.digitRegex)(s, "{1,2}"), H = (0, U.digitRegex)(s, "{1,3}"), q = (0, U.digitRegex)(s, "{1,6}"), J = (0, U.digitRegex)(s, "{1,9}"), Q = (0, U.digitRegex)(s, "{2,4}"), ne = (0, U.digitRegex)(s, "{4,6}"), de = function(be) {
                return {
                  regex: RegExp(O(be.val)),
                  deser: function(Be) {
                    var ht = Be[0];
                    return ht;
                  },
                  literal: !0
                };
              }, _e = function(be) {
                if (i.literal)
                  return de(be);
                switch (be.val) {
                  case "G":
                    return S(s.eras("short"), 0);
                  case "GG":
                    return S(s.eras("long"), 0);
                  case "y":
                    return T(q);
                  case "yy":
                    return T(Q, f.untruncateYear);
                  case "yyyy":
                    return T(E);
                  case "yyyyy":
                    return T(ne);
                  case "yyyyyy":
                    return T(F);
                  case "M":
                    return T(z);
                  case "MM":
                    return T(g);
                  case "MMM":
                    return S(s.months("short", !0), 1);
                  case "MMMM":
                    return S(s.months("long", !0), 1);
                  case "L":
                    return T(z);
                  case "LL":
                    return T(g);
                  case "LLL":
                    return S(s.months("short", !1), 1);
                  case "LLLL":
                    return S(s.months("long", !1), 1);
                  case "d":
                    return T(z);
                  case "dd":
                    return T(g);
                  case "o":
                    return T(H);
                  case "ooo":
                    return T(c);
                  case "HH":
                    return T(g);
                  case "H":
                    return T(z);
                  case "hh":
                    return T(g);
                  case "h":
                    return T(z);
                  case "mm":
                    return T(g);
                  case "m":
                    return T(z);
                  case "q":
                    return T(z);
                  case "qq":
                    return T(g);
                  case "s":
                    return T(z);
                  case "ss":
                    return T(g);
                  case "S":
                    return T(H);
                  case "SSS":
                    return T(c);
                  case "u":
                    return P(J);
                  case "a":
                    return S(s.meridiems(), 0);
                  case "kkkk":
                    return T(E);
                  case "kk":
                    return T(Q, f.untruncateYear);
                  case "W":
                    return T(z);
                  case "WW":
                    return T(g);
                  case "E":
                  case "c":
                    return T(d);
                  case "EEE":
                    return S(s.weekdays("short", !1), 1);
                  case "EEEE":
                    return S(s.weekdays("long", !1), 1);
                  case "ccc":
                    return S(s.weekdays("short", !0), 1);
                  case "cccc":
                    return S(s.weekdays("long", !0), 1);
                  case "Z":
                  case "ZZ":
                    return C(new RegExp("([+-]".concat(z.source, ")(?::(").concat(g.source, "))?")), 2);
                  case "ZZZ":
                    return C(new RegExp("([+-]".concat(z.source, ")(").concat(g.source, ")?")), 2);
                  case "z":
                    return P(/[a-z_+-/]{1,256}?/i);
                  default:
                    return de(be);
                }
              }, Se = _e(i) || {
                invalidReason: h
              };
              return m.__assign(m.__assign({}, Se), { token: i });
            }
            var R = {
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
            function w(i, s, d) {
              var g = i.type, c = i.value;
              if (g === "literal") {
                var E = /^\s+$/.test(c);
                return {
                  literal: !E,
                  val: E ? " " : c
                };
              }
              var F = s[g], z = g;
              g === "hour" && (s.hour12 != null ? z = s.hour12 ? "hour12" : "hour24" : s.hourCycle != null ? s.hourCycle === "h11" || s.hourCycle === "h12" ? z = "hour12" : z = "hour24" : z = d.hour12 ? "hour12" : "hour24");
              var H = R[z];
              if (typeof H == "object" && (H = H[F]), H)
                return {
                  literal: !1,
                  val: H
                };
            }
            function W(i) {
              var s = i.map(function(d) {
                return d.regex;
              }).reduce(function(d, g) {
                return "".concat(d, "(").concat(g.source, ")");
              }, "");
              return ["^".concat(s, "$"), i];
            }
            function Y(i, s, d) {
              var g = s.exec(i), c = {};
              if (g !== null) {
                var E = 1;
                d.forEach(function(F) {
                  var z = F.groups ? F.groups + 1 : 1;
                  F.literal || (c[F.token.val[0]] = F.deser(g.slice(E, E + z))), E += z;
                });
              }
              return [g, c];
            }
            function V(i) {
              var s = function(E) {
                switch (E) {
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
              }, d = null, g;
              (0, f.isDefined)(i.z) && (d = k.IANAZone.create(i.z)), (0, f.isDefined)(i.Z) && (d || (d = new N.FixedOffsetZone(+i.Z)), g = +i.Z), (0, f.isDefined)(i.q) && (i.M = (i.q - 1) * 3 + 1), (0, f.isDefined)(i.h) && (+i.h < 12 && i.a === 1 ? i.h = i.h + 12 : i.h === 12 && i.a === 0 && (i.h = 0)), i.G === 0 && i.y && (i.y = -i.y), (0, f.isDefined)(i.u) && (i.S = (0, f.parseMillis)(i.u) || 0);
              var c = Object.keys(i).reduce(function(E, F) {
                var z = s(F);
                return z && (E[z] = i[F]), E;
              }, {});
              return [c, d, g];
            }
            var K;
            function X(i) {
              return K === void 0 && (K = A.DateTime.fromMillis(1555555555555, {
                locale: i.locale
              })), K;
            }
            function Z(i, s) {
              if (i.literal)
                return i;
              var d = I.Formatter.macroTokenToFormatOpts(i.val), g = u(d, s);
              return g == null || g.includes(void 0) ? i : g;
            }
            function L(i, s) {
              var d;
              return (d = Array.prototype).concat.apply(d, i.map(function(g) {
                return Z(g, s);
              }));
            }
            n.expandMacroTokens = L;
            var x = (
              /** @class */
              function() {
                function i(s, d) {
                  this.locale = s, this.format = d, this._mapTokens();
                }
                return Object.defineProperty(i.prototype, "invalidReason", {
                  get: function() {
                    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(i.prototype, "isValid", {
                  get: function() {
                    return !this.disqualifyingUnit;
                  },
                  enumerable: !1,
                  configurable: !0
                }), i.prototype.explainFromTokens = function(s) {
                  if (this.isValid) {
                    var d = Y(s, this.regex, this.handlers), g = d[0], c = d[1], E = c ? V(c) : [null, null, void 0], F = E[0], z = E[1], H = E[2];
                    if (c.hasOwnProperty("a") && c.hasOwnProperty("H"))
                      throw new M.ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
                    return {
                      input: s,
                      tokens: this.tokens,
                      regex: this.regex,
                      rawMatches: g,
                      matches: c,
                      result: F,
                      zone: z,
                      specificOffset: H
                    };
                  } else
                    return { input: s, tokens: this.tokens, invalidReason: this.invalidReason };
                }, i.prototype._mapTokens = function() {
                  var s = this;
                  this.tokens = L(I.Formatter.parseFormat(this.format), this.locale);
                  var d = this.tokens.map(function(F) {
                    return _(F, s.locale);
                  });
                  if (this.disqualifyingUnit = d.find(function(F) {
                    return F.invalidReason;
                  }), this.units = d.filter(function(F) {
                    return !F.invalidReason;
                  }), !this.disqualifyingUnit) {
                    var g = W(this.units), c = g[0], E = g[1];
                    this.regex = RegExp(c, "i"), this.handlers = E;
                  }
                }, i;
              }()
            );
            n.TokenParser = x;
            function G(i, s, d) {
              var g = new x(i, d);
              return g.explainFromTokens(s);
            }
            n.explainFromTokens = G;
            function ee(i) {
              return i.replace(/\u202F/g, " ");
            }
            n.sanitizeSpaces = ee;
            function ie(i, s, d) {
              var g = G(i, ee(s), ee(d)), c = g.result, E = g.zone, F = g.specificOffset, z = g.invalidReason;
              return [c, E, F, z];
            }
            n.parseFromTokens = ie;
            function u(i, s) {
              if (!i)
                return null;
              var d = I.Formatter.create(s, i), g = d.dtFormatter(X(s)), c = g.formatToParts(), E = g.resolvedOptions();
              return c.map(function(F) {
                return w(F, i, E);
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
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.FALLBACK_WEEK_SETTINGS = n.PLURAL_MAPPING = n.HUMAN_ORDERED_UNITS = n.REVERSE_ORDERED_UNITS = n.ORDERED_UNITS = n.timeObject = n.formatOffset = n.normalizeObject = n.asNumber = n.signedOffset = n.parseZoneInfo = n.untruncateYear = n.weeksInWeekYear = n.objToLocalTS = n.daysInMonth = n.daysInYear = n.isLeapYear = n.roundTo = n.parseMillis = n.parseFloating = n.parseInteger = n.padStart = n.floorMod = n.integerBetween = n.validateWeekSettings = n.pick = n.bestBy = n.maybeArray = n.hasLocaleWeekInfo = n.hasRelative = n.isDate = n.isString = n.isInteger = n.isNumber = n.isUndefined = n.isDefined = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ../errors */
              "./src/errors.ts"
            ), I = o(
              /*! ../settings */
              "./src/settings.ts"
            ), N = o(
              /*! ./conversions */
              "./src/impl/conversions.ts"
            ), k = m.__importDefault(o(
              /*! ../types/intl-next */
              "./src/types/intl-next.ts"
            ));
            function U(c) {
              return typeof c < "u";
            }
            n.isDefined = U;
            function A(c) {
              return typeof c > "u";
            }
            n.isUndefined = A;
            function M(c) {
              return typeof c == "number";
            }
            n.isNumber = M;
            function h(c) {
              return M(c) && c % 1 === 0;
            }
            n.isInteger = h;
            function T(c) {
              return typeof c == "string";
            }
            n.isString = T;
            function b(c) {
              return Object.prototype.toString.call(c) === "[object Date]";
            }
            n.isDate = b;
            function j() {
              try {
                return typeof k.default < "u" && !!k.default.RelativeTimeFormat;
              } catch {
                return !1;
              }
            }
            n.hasRelative = j;
            function D() {
              try {
                return typeof k.default < "u" && !!k.default.Locale && ("weekInfo" in k.default.Locale.prototype || "getWeekInfo" in k.default.Locale.prototype);
              } catch {
                return !1;
              }
            }
            n.hasLocaleWeekInfo = D;
            function p(c) {
              return Array.isArray(c) ? c : [c];
            }
            n.maybeArray = p;
            function S(c, E, F) {
              if (c.length !== 0) {
                var z = c.reduce(function(H, q) {
                  var J = [E(q), q];
                  return F(H[0], J[0]) === H[0] ? H : J;
                }, [E(c[0]), c[0]]);
                return z[1];
              }
            }
            n.bestBy = S;
            function C(c, E) {
              return E.reduce(function(F, z) {
                return F[z] = c[z], F;
              }, {});
            }
            n.pick = C;
            function P(c) {
              if (c) {
                if (typeof c != "object")
                  throw new f.InvalidArgumentError("Week settings must be an object");
                if (!O(c.firstDay, 1, 7) || !O(c.minimalDays, 1, 7) || !Array.isArray(c.weekend) || c.weekend.some(function(E) {
                  return !O(E, 1, 7);
                }))
                  throw new f.InvalidArgumentError("Invalid week settings");
                return {
                  firstDay: c.firstDay,
                  minimalDays: c.minimalDays,
                  weekend: c.weekend
                };
              } else return;
            }
            n.validateWeekSettings = P;
            function O(c, E, F) {
              return h(c) && c >= E && c <= F;
            }
            n.integerBetween = O;
            function _(c, E) {
              return c - E * Math.floor(c / E);
            }
            n.floorMod = _;
            function R(c, E) {
              E === void 0 && (E = 2);
              var F = +c < 0 ? "-" : "", z = F ? +c * -1 : c, H;
              return z.toString().length < E ? H = ("0".repeat(E) + z).slice(-E) : H = z.toString(), "".concat(F).concat(H);
            }
            n.padStart = R;
            function w(c) {
              if (c)
                return parseInt(c, 10);
            }
            n.parseInteger = w;
            function W(c) {
              if (c)
                return parseFloat(c);
            }
            n.parseFloating = W;
            function Y(c) {
              if (!(A(c) || c === null || c === "")) {
                var E = parseFloat("0." + c) * 1e3;
                return Math.floor(E);
              }
            }
            n.parseMillis = Y;
            function V(c, E, F) {
              F === void 0 && (F = !1);
              var z = Math.pow(10, E), H = F ? Math.trunc : Math.round;
              return H(c * z) / z;
            }
            n.roundTo = V;
            function K(c) {
              return c % 4 === 0 && (c % 100 !== 0 || c % 400 === 0);
            }
            n.isLeapYear = K;
            function X(c) {
              return K(c) ? 366 : 365;
            }
            n.daysInYear = X;
            function Z(c, E) {
              var F = _(E - 1, 12) + 1, z = c + (E - F) / 12;
              return [31, K(z) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][F - 1];
            }
            n.daysInMonth = Z;
            function L(c) {
              var E = Date.UTC(c.year, c.month - 1, c.day, c.hour, c.minute, c.second, c.millisecond);
              return c.year < 100 && c.year >= 0 && (E = new Date(E), E.setUTCFullYear(c.year, c.month - 1, c.day)), +E;
            }
            n.objToLocalTS = L;
            function x(c, E, F) {
              var z = (0, N.isoWeekdayToLocal)((0, N.dayOfWeek)(c, 1, E), F);
              return -z + E - 1;
            }
            function G(c, E, F) {
              E === void 0 && (E = 4), F === void 0 && (F = 1);
              var z = x(c, E, F), H = x(c + 1, E, F);
              return (X(c) - z + H) / 7;
            }
            n.weeksInWeekYear = G;
            function ee(c) {
              return c > 99 ? c : c > I.Settings.twoDigitCutoffYear ? 1900 + c : 2e3 + c;
            }
            n.untruncateYear = ee;
            function ie(c, E, F, z) {
              var H = new Date(c), q = {
                hourCycle: "h23",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: z
              }, J = m.__assign({ timeZoneName: E }, q), Q = new k.default.DateTimeFormat(F, J).formatToParts(H).find(function(ne) {
                return ne.type.toLowerCase() === "timezonename";
              });
              return Q ? Q.value : null;
            }
            n.parseZoneInfo = ie;
            function u(c, E) {
              var F = parseInt(c, 10);
              Number.isNaN(F) && (F = 0);
              var z = parseInt(E, 10) || 0, H = F < 0 || Object.is(F, -0) ? -z : z;
              return F * 60 + H;
            }
            n.signedOffset = u;
            function i(c) {
              var E = Number(c);
              if (typeof c == "boolean" || c === "" || Number.isNaN(E))
                throw new f.InvalidArgumentError("Invalid unit value ".concat(c));
              return E;
            }
            n.asNumber = i;
            function s(c, E) {
              return Object.keys(c).reduce(function(F, z) {
                return c[z] !== void 0 && c[z] !== null && (F[E(z)] = i(c[z])), F;
              }, {});
            }
            n.normalizeObject = s;
            function d(c, E) {
              var F = Math.trunc(Math.abs(c / 60)), z = Math.trunc(Math.abs(c % 60)), H = c >= 0 ? "+" : "-";
              switch (E) {
                case "short":
                  return "".concat(H).concat(R(F, 2), ":").concat(R(z, 2));
                case "narrow":
                  return "".concat(H).concat(F).concat(z > 0 ? ":".concat(z) : "");
                case "techie":
                  return "".concat(H).concat(R(F, 2)).concat(R(z, 2));
                default:
                  throw new RangeError("Value format ".concat(E, " is out of range for property format"));
              }
            }
            n.formatOffset = d;
            function g(c) {
              return C(c, ["hour", "minute", "second", "millisecond"]);
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
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.normalizeZone = void 0;
            var m = o(
              /*! ../zone */
              "./src/zone.ts"
            ), f = o(
              /*! ../zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), I = o(
              /*! ../zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            ), N = o(
              /*! ./util */
              "./src/impl/util.ts"
            ), k = o(
              /*! ../zones/invalidZone */
              "./src/zones/invalidZone.ts"
            ), U = o(
              /*! ../zones/systemZone */
              "./src/zones/systemZone.ts"
            ), A = function(M, h) {
              if ((0, N.isUndefined)(M) || M === null)
                return h;
              if (M instanceof m.Zone)
                return M;
              if ((0, N.isString)(M)) {
                var T = M.toLowerCase();
                return T === "default" ? h : T === "local" || T === "system" ? U.SystemZone.instance : T === "utc" || T === "gmt" ? I.FixedOffsetZone.utcInstance : I.FixedOffsetZone.parseSpecifier(T) || f.IANAZone.create(M);
              } else return (0, N.isNumber)(M) ? I.FixedOffsetZone.instance(M) : typeof M == "object" && "offset" in M && typeof M.offset == "function" ? M : new k.InvalidZone(M);
            };
            n.normalizeZone = A;
          }
        ),
        /***/
        "./src/index.ts": (
          /*!**********************!*\
            !*** ./src/index.ts ***!
            \**********************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.REVERSE_ORDERED_UNITS = n.ORDERED_UNITS = n.VERSION = n.Settings = n.SystemZone = n.InvalidZone = n.IANAZone = n.FixedOffsetZone = n.Zone = n.Info = n.Interval = n.Duration = n.DateTime = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ./datetime */
              "./src/datetime.ts"
            );
            Object.defineProperty(n, "DateTime", { enumerable: !0, get: function() {
              return f.DateTime;
            } });
            var I = o(
              /*! ./duration */
              "./src/duration.ts"
            );
            Object.defineProperty(n, "Duration", { enumerable: !0, get: function() {
              return I.Duration;
            } });
            var N = o(
              /*! ./interval */
              "./src/interval.ts"
            );
            Object.defineProperty(n, "Interval", { enumerable: !0, get: function() {
              return N.Interval;
            } });
            var k = o(
              /*! ./info */
              "./src/info.ts"
            );
            Object.defineProperty(n, "Info", { enumerable: !0, get: function() {
              return k.Info;
            } });
            var U = o(
              /*! ./zone */
              "./src/zone.ts"
            );
            Object.defineProperty(n, "Zone", { enumerable: !0, get: function() {
              return U.Zone;
            } });
            var A = o(
              /*! ./zones/fixedOffsetZone */
              "./src/zones/fixedOffsetZone.ts"
            );
            Object.defineProperty(n, "FixedOffsetZone", { enumerable: !0, get: function() {
              return A.FixedOffsetZone;
            } });
            var M = o(
              /*! ./zones/IANAZone */
              "./src/zones/IANAZone.ts"
            );
            Object.defineProperty(n, "IANAZone", { enumerable: !0, get: function() {
              return M.IANAZone;
            } });
            var h = o(
              /*! ./zones/invalidZone */
              "./src/zones/invalidZone.ts"
            );
            Object.defineProperty(n, "InvalidZone", { enumerable: !0, get: function() {
              return h.InvalidZone;
            } });
            var T = o(
              /*! ./zones/systemZone */
              "./src/zones/systemZone.ts"
            );
            Object.defineProperty(n, "SystemZone", { enumerable: !0, get: function() {
              return T.SystemZone;
            } });
            var b = o(
              /*! ./settings */
              "./src/settings.ts"
            );
            Object.defineProperty(n, "Settings", { enumerable: !0, get: function() {
              return b.Settings;
            } });
            var j = o(
              /*! ./impl/util */
              "./src/impl/util.ts"
            );
            Object.defineProperty(n, "ORDERED_UNITS", { enumerable: !0, get: function() {
              return j.ORDERED_UNITS;
            } }), Object.defineProperty(n, "REVERSE_ORDERED_UNITS", { enumerable: !0, get: function() {
              return j.REVERSE_ORDERED_UNITS;
            } }), m.__exportStar(o(
              /*! ./types/public */
              "./src/types/public.ts"
            ), n);
            var D = "5.0.7-beta.0";
            n.VERSION = D;
          }
        ),
        /***/
        "./src/info.ts": (
          /*!*********************!*\
            !*** ./src/info.ts ***!
            \*********************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Info = void 0;
            var m = o(
              /*! ./datetime */
              "./src/datetime.ts"
            ), f = o(
              /*! ./settings */
              "./src/settings.ts"
            ), I = o(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), N = o(
              /*! ./zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), k = o(
              /*! ./impl/zoneUtil */
              "./src/impl/zoneUtil.ts"
            ), U = o(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), A = (
              /** @class */
              function() {
                function M() {
                }
                return M.eras = function(h, T) {
                  h === void 0 && (h = "short");
                  var b = T === void 0 ? {} : T, j = b.locale;
                  return I.Locale.create(j, void 0, "gregory").eras(h);
                }, M.features = function() {
                  return { relative: (0, U.hasRelative)(), localeWeek: (0, U.hasLocaleWeekInfo)() };
                }, M.getMinimumDaysInFirstWeek = function(h) {
                  var T = h === void 0 ? {} : h, b = T.locale, j = T.locObj;
                  return (j || I.Locale.create(b)).getMinDaysInFirstWeek();
                }, M.getStartOfWeek = function(h) {
                  var T = h === void 0 ? {} : h, b = T.locale, j = T.locObj;
                  return (j || I.Locale.create(b)).getStartOfWeek();
                }, M.getWeekendWeekdays = function(h) {
                  var T = h === void 0 ? {} : h, b = T.locale, j = T.locObj;
                  return (j || I.Locale.create(b)).getWeekendDays().slice();
                }, M.hasDST = function(h) {
                  h === void 0 && (h = f.Settings.defaultZone);
                  var T = m.DateTime.now().setZone(h).set({ month: 12 });
                  return !h.isUniversal && T.offset !== T.set({ month: 6 }).offset;
                }, M.isValidIANAZone = function(h) {
                  return N.IANAZone.isValidZone(h);
                }, M.meridiems = function(h) {
                  var T = h === void 0 ? {} : h, b = T.locale;
                  return I.Locale.create(b).meridiems();
                }, M.months = function(h, T) {
                  h === void 0 && (h = "long");
                  var b = T === void 0 ? {} : T, j = b.locale, D = j === void 0 ? null : j, p = b.locObj, S = p === void 0 ? null : p, C = b.numberingSystem, P = C === void 0 ? null : C, O = b.outputCalendar, _ = O === void 0 ? "gregory" : O;
                  return (S || I.Locale.create(D, P, _)).months(h);
                }, M.monthsFormat = function(h, T) {
                  h === void 0 && (h = "long");
                  var b = T === void 0 ? {} : T, j = b.locale, D = b.locObj, p = b.numberingSystem, S = b.outputCalendar, C = S === void 0 ? "gregory" : S;
                  return (D || I.Locale.create(j, p, C)).months(h, !0);
                }, M.normalizeZone = function(h) {
                  return (0, k.normalizeZone)(h, f.Settings.defaultZone);
                }, M.weekdays = function(h, T) {
                  h === void 0 && (h = "long");
                  var b = T === void 0 ? {} : T, j = b.locale, D = b.locObj, p = b.numberingSystem;
                  return (D || I.Locale.create(j, p)).weekdays(h);
                }, M.weekdaysFormat = function(h, T) {
                  h === void 0 && (h = "long");
                  var b = T === void 0 ? {} : T, j = b.locale, D = b.locObj, p = b.numberingSystem;
                  return (D || I.Locale.create(j, p)).weekdays(h, !0);
                }, M;
              }()
            );
            n.Info = A;
          }
        ),
        /***/
        "./src/interval.ts": (
          /*!*************************!*\
            !*** ./src/interval.ts ***!
            \*************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Interval = void 0;
            var m = o(
              /*! ./datetime */
              "./src/datetime.ts"
            ), f = o(
              /*! ./duration */
              "./src/duration.ts"
            ), I = o(
              /*! ./errors */
              "./src/errors.ts"
            ), N = o(
              /*! ./types/invalid */
              "./src/types/invalid.ts"
            ), k = o(
              /*! ./settings */
              "./src/settings.ts"
            ), U = o(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), A = o(
              /*! ./impl/formatter */
              "./src/impl/formatter.ts"
            ), M = o(
              /*! ./impl/formats */
              "./src/impl/formats.ts"
            ), h = "Invalid Interval";
            function T(D, p) {
              if (!D || !D.isValid)
                return j.invalid("missing or invalid start");
              if (!p || !p.isValid)
                return j.invalid("missing or invalid end");
              if (p < D)
                return j.invalid("end before start", "The end of an interval must be after its start, but you had start=".concat(D.toISO(), " and end=").concat(p.toISO()));
            }
            function b(D) {
              if (m.DateTime.isDateTime(D))
                return D;
              if (D && D.valueOf && (0, U.isNumber)(D.valueOf()))
                return m.DateTime.fromJSDate(D);
              if (D && typeof D == "object")
                return m.DateTime.fromObject(D);
              throw new I.InvalidArgumentError("Unknown datetime argument: ".concat(D, ", of type ").concat(typeof D));
            }
            var j = (
              /** @class */
              function() {
                function D(p) {
                  this._s = p.start, this._e = p.end, this._invalid = p.invalid || null, this._isLuxonInterval = !0;
                }
                return Object.defineProperty(D.prototype, "end", {
                  /**
                   * Returns the end of the Interval
                   */
                  get: function() {
                    return this.isValid ? this._e : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(D.prototype, "invalidReason", {
                  /**
                   * Returns an error code if this Interval is invalid, or null if the Interval is valid
                   */
                  get: function() {
                    return this._invalid ? this._invalid.reason : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(D.prototype, "isValid", {
                  /**
                   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
                   */
                  get: function() {
                    return this.invalidReason === null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(D.prototype, "start", {
                  /**
                   * Returns the start of the Interval
                   */
                  get: function() {
                    return this.isValid ? this._s : null;
                  },
                  enumerable: !1,
                  configurable: !0
                }), D.after = function(p, S) {
                  var C = f.Duration.fromDurationLike(S), P = b(p);
                  return new D({
                    start: P,
                    end: P ? P.plus(C) : void 0
                  });
                }, D.before = function(p, S) {
                  var C = f.Duration.fromDurationLike(S), P = b(p);
                  return new D({
                    start: P ? P.minus(C) : void 0,
                    end: P
                  });
                }, D.fromDateTimes = function(p, S) {
                  var C = b(p), P = b(S), O = T(C, P);
                  return O || new D({
                    start: C,
                    end: P
                  });
                }, D.fromISO = function(p, S) {
                  S === void 0 && (S = {});
                  var C = (p || "").split("/", 2), P = C[0], O = C[1];
                  if (P && O) {
                    var _ = void 0, R = void 0;
                    try {
                      _ = m.DateTime.fromISO(P, S), R = _.isValid;
                    } catch {
                      R = !1;
                    }
                    var w = void 0, W = void 0;
                    try {
                      w = m.DateTime.fromISO(O, S), W = w.isValid;
                    } catch {
                      W = !1;
                    }
                    if (R && W)
                      return D.fromDateTimes(_, w);
                    if (R) {
                      var Y = f.Duration.fromISO(O, S);
                      if (Y.isValid)
                        return D.after(_, Y);
                    } else if (W) {
                      var Y = f.Duration.fromISO(P, S);
                      if (Y.isValid)
                        return D.before(w, Y);
                    }
                  }
                  return D.invalid("unparsable", 'the input "'.concat(p, `" can't be parsed as ISO 8601`));
                }, D.invalid = function(p, S) {
                  if (!p)
                    throw new I.InvalidArgumentError("need to specify a reason the Interval is invalid");
                  var C = p instanceof N.Invalid ? p : new N.Invalid(p, S);
                  if (k.Settings.throwOnInvalid)
                    throw new I.InvalidIntervalError(C);
                  return new D({ invalid: C });
                }, D.isInterval = function(p) {
                  return !!p && p._isLuxonInterval || !1;
                }, D.merge = function(p) {
                  var S = p.sort(function(O, _) {
                    return O._s.valueOf() - _._s.valueOf();
                  }).reduce(function(O, _) {
                    var R = O[0], w = O[1];
                    return w ? w.overlaps(_) || w.abutsStart(_) ? [R, w.union(_)] : [R.concat([w]), _] : [R, _];
                  }, [[], null]), C = S[0], P = S[1];
                  return P && C.push(P), C;
                }, D.xor = function(p) {
                  for (var S, C = null, P = 0, O = [], _ = p.map(function(K) {
                    return [
                      { time: K._s, type: "s" },
                      { time: K._e, type: "e" }
                    ];
                  }), R = (S = Array.prototype).concat.apply(S, _), w = R.sort(function(K, X) {
                    return +K.time - +X.time;
                  }), W = 0, Y = w; W < Y.length; W++) {
                    var V = Y[W];
                    P += V.type === "s" ? 1 : -1, P === 1 ? C = V.time : (C && C.valueOf() !== V.time.valueOf() && O.push(D.fromDateTimes(C, V.time)), C = null);
                  }
                  return D.merge(O);
                }, D.prototype[Symbol.for("nodejs.util.inspect.custom")] = function() {
                  return this.isValid ? "Interval { start: ".concat(this._s.toISO(), ", end: ").concat(this._e.toISO(), " }") : "Interval { Invalid, reason: ".concat(this.invalidReason, " }");
                }, D.prototype.abutsEnd = function(p) {
                  return +p._e == +this._s;
                }, D.prototype.abutsStart = function(p) {
                  return +this._e == +p._s;
                }, D.prototype.contains = function(p) {
                  return this._s <= p && this._e > p;
                }, D.prototype.count = function(p, S) {
                  if (p === void 0 && (p = "milliseconds"), !this.isValid)
                    return NaN;
                  var C = this.start.startOf(p, S), P;
                  return S != null && S.useLocaleWeeks ? P = this.end.reconfigure({ locale: C.locale }) : P = this.end, P = P.startOf(p, S), Math.floor(P.diff(C, p).get(p)) + +(P.valueOf() !== this.end.valueOf());
                }, D.prototype.difference = function() {
                  for (var p = this, S = [], C = 0; C < arguments.length; C++)
                    S[C] = arguments[C];
                  return D.xor([this].concat(S)).map(function(P) {
                    return p.intersection(P);
                  }).filter(function(P) {
                    return P && !P.isEmpty();
                  });
                }, D.prototype.divideEqually = function(p) {
                  return this.isValid ? this.splitBy({ milliseconds: this.length() / p }).slice(0, p) : [];
                }, D.prototype.engulfs = function(p) {
                  return this.isValid ? this._s <= p._s && this._e >= p._e : !1;
                }, D.prototype.equals = function(p) {
                  return !this.isValid || !p.isValid ? !1 : this._s.equals(p._s) && this._e.equals(p._e);
                }, D.prototype.hasSame = function(p) {
                  return this.isValid ? this.isEmpty() || this._e.minus(1).hasSame(this._s, p) : !1;
                }, D.prototype.intersection = function(p) {
                  if (!this.isValid)
                    return this;
                  var S = this._s > p._s ? this._s : p._s, C = this._e < p._e ? this._e : p._e;
                  return S >= C ? null : D.fromDateTimes(S, C);
                }, D.prototype.isAfter = function(p) {
                  return this.isValid ? this._s > p : !1;
                }, D.prototype.isBefore = function(p) {
                  return this.isValid ? this._e <= p : !1;
                }, D.prototype.isEmpty = function() {
                  return this._s.valueOf() === this._e.valueOf();
                }, D.prototype.length = function(p) {
                  return p === void 0 && (p = "milliseconds"), this.toDuration(p).get(p);
                }, D.prototype.mapEndpoints = function(p) {
                  return D.fromDateTimes(p(this._s), p(this._e));
                }, D.prototype.overlaps = function(p) {
                  return this._e > p._s && this._s < p._e;
                }, D.prototype.set = function(p) {
                  var S = p === void 0 ? {} : p, C = S.start, P = S.end;
                  return this.isValid ? D.fromDateTimes(C || this._s, P || this._e) : this;
                }, D.prototype.splitAt = function() {
                  for (var p = this, S = [], C = 0; C < arguments.length; C++)
                    S[C] = arguments[C];
                  for (var P = S.map(b).filter(function(Y) {
                    return p.contains(Y);
                  }).sort(function(Y, V) {
                    return Y.toMillis() - V.toMillis();
                  }), O = [], _ = this._s, R = 0; _ < this._e; ) {
                    var w = P[R] || this._e, W = +w > +this._e ? this._e : w;
                    O.push(D.fromDateTimes(_, W)), _ = W, R += 1;
                  }
                  return O;
                }, D.prototype.splitBy = function(p) {
                  var S = f.Duration.fromDurationLike(p);
                  if (!this.isValid || !S.isValid || S.as("milliseconds") === 0)
                    return [];
                  for (var C = this._s, P = 1, O, _ = []; C < this._e; ) {
                    var R = this.start.plus(S.mapUnits(function(w) {
                      return w * P;
                    }));
                    O = +R > +this._e ? this._e : R, _.push(D.fromDateTimes(C, O)), C = O, P += 1;
                  }
                  return _;
                }, D.prototype.toDuration = function(p, S) {
                  return p === void 0 && (p = "milliseconds"), S === void 0 && (S = {}), this.isValid ? this._e.diff(this._s, p, S) : f.Duration.invalid(this._invalid.reason);
                }, D.prototype.toFormat = function(p, S) {
                  var C = S === void 0 ? {} : S, P = C.separator, O = P === void 0 ? " - " : P;
                  return this.isValid ? "".concat(this._s.toFormat(p)).concat(O).concat(this._e.toFormat(p)) : h;
                }, D.prototype.toISO = function(p) {
                  return p === void 0 && (p = {}), this.isValid ? "".concat(this._s.toISO(p), "/").concat(this._e.toISO(p)) : h;
                }, D.prototype.toISODate = function() {
                  return this.isValid ? "".concat(this._s.toISODate(), "/").concat(this._e.toISODate()) : h;
                }, D.prototype.toISOTime = function(p) {
                  return p === void 0 && (p = {}), this.isValid ? "".concat(this._s.toISOTime(p), "/").concat(this._e.toISOTime(p)) : h;
                }, D.prototype.toLocaleString = function(p, S) {
                  return p === void 0 && (p = M.DATE_SHORT), S === void 0 && (S = {}), this.isValid ? A.Formatter.create(this._s.loc.clone(S), p).formatInterval(this) : h;
                }, D.prototype.toString = function() {
                  return this.isValid ? "[".concat(this._s.toISO(), " – ").concat(this._e.toISO(), ")") : h;
                }, D.prototype.union = function(p) {
                  if (!this.isValid)
                    return this;
                  var S = this._s < p._s ? this._s : p._s, C = this._e > p._e ? this._e : p._e;
                  return D.fromDateTimes(S, C);
                }, D;
              }()
            );
            n.Interval = j;
          }
        ),
        /***/
        "./src/settings.ts": (
          /*!*************************!*\
            !*** ./src/settings.ts ***!
            \*************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Settings = void 0;
            var m = o(
              /*! ./zones/IANAZone */
              "./src/zones/IANAZone.ts"
            ), f = o(
              /*! ./impl/locale */
              "./src/impl/locale.ts"
            ), I = o(
              /*! ./impl/zoneUtil */
              "./src/impl/zoneUtil.ts"
            ), N = o(
              /*! ./zones/systemZone */
              "./src/zones/systemZone.ts"
            ), k = o(
              /*! ./impl/util */
              "./src/impl/util.ts"
            ), U = o(
              /*! ./datetime */
              "./src/datetime.ts"
            ), A = o(
              /*! ./impl/digits */
              "./src/impl/digits.ts"
            ), M = function() {
              return Date.now();
            }, h = "system", T, b, j, D = 60, p = !1, S, C = (
              /** @class */
              function() {
                function P() {
                }
                return Object.defineProperty(P, "defaultLocale", {
                  /**
                   * Get the default locale to create DateTimes with. Does not affect existing instances.
                   */
                  get: function() {
                    return T;
                  },
                  /**
                   * Set the default locale to create DateTimes with. Does not affect existing instances.
                   */
                  set: function(O) {
                    T = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "defaultNumberingSystem", {
                  /**
                   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
                   */
                  get: function() {
                    return b;
                  },
                  /**
                   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
                   * @type {string}
                   */
                  set: function(O) {
                    b = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "defaultOutputCalendar", {
                  /**
                   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
                   */
                  get: function() {
                    return j;
                  },
                  /**
                   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
                   */
                  set: function(O) {
                    j = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "defaultWeekSettings", {
                  get: function() {
                    return S;
                  },
                  /**
                   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
                   * how many days are required in the first week of a year.
                   * Does not affect existing instances.
                   */
                  set: function(O) {
                    S = (0, k.validateWeekSettings)(O);
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "defaultZone", {
                  /**
                   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
                   */
                  get: function() {
                    return (0, I.normalizeZone)(h, N.SystemZone.instance);
                  },
                  /**
                   * [TS] had to use type Zone here. I created another setter to use a ZoneLike instead
                   * Let's face it. This is ugly. The original should have this approach as well.
                   * Set the default time zone to create DateTimes in. Does not affect existing instances.
                   * Use the value "system" to reset this value to the system's time zone.
                   */
                  set: function(O) {
                    h = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "defaultZoneLike", {
                  /**
                   * [TS] can't use the real setter here because set and get must have the same type.
                   * Let's face this. This is bullshit. But I get that you want to make life easier for users.
                   * Set the default time zone to create DateTimes in. Does not affect existing instances.
                   * Use the value "system" to reset this value to the system's time zone.
                   */
                  set: function(O) {
                    h = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "now", {
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
                  set: function(O) {
                    M = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "throwOnInvalid", {
                  /**
                   * Get whether TSLuxon will throw when it encounters invalid DateTimes, Durations, or Intervals
                   */
                  get: function() {
                    return p;
                  },
                  /**
                   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
                   * @type {boolean}
                   */
                  set: function(O) {
                    p = O;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(P, "twoDigitCutoffYear", {
                  /**
                   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
                   * @type {number}
                   */
                  get: function() {
                    return D;
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
                  set: function(O) {
                    D = O % 100;
                  },
                  enumerable: !1,
                  configurable: !0
                }), P.resetCaches = function() {
                  f.Locale.resetCache(), m.IANAZone.resetCache(), U.DateTime.resetCache(), (0, A.resetDigitRegexCache)();
                }, P;
              }()
            );
            n.Settings = C;
          }
        ),
        /***/
        "./src/types/common.ts": (
          /*!*****************************!*\
            !*** ./src/types/common.ts ***!
            \*****************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/datetime.ts": (
          /*!*******************************!*\
            !*** ./src/types/datetime.ts ***!
            \*******************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/duration.ts": (
          /*!*******************************!*\
            !*** ./src/types/duration.ts ***!
            \*******************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/info.ts": (
          /*!***************************!*\
            !*** ./src/types/info.ts ***!
            \***************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/interval.ts": (
          /*!*******************************!*\
            !*** ./src/types/interval.ts ***!
            \*******************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/intl-next.ts": (
          /*!********************************!*\
            !*** ./src/types/intl-next.ts ***!
            \********************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.default = Intl;
          }
        ),
        /***/
        "./src/types/invalid.ts": (
          /*!******************************!*\
            !*** ./src/types/invalid.ts ***!
            \******************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Invalid = void 0;
            var o = (
              /** @class */
              function() {
                function m(f, I) {
                  this.reason = f, this.explanation = I, this._formattedExplanation = "", I && (this._formattedExplanation = ": ".concat(I));
                }
                return m.prototype.toMessage = function() {
                  return "".concat(this.reason).concat(this._formattedExplanation);
                }, m;
              }()
            );
            n.Invalid = o;
          }
        ),
        /***/
        "./src/types/locale.ts": (
          /*!*****************************!*\
            !*** ./src/types/locale.ts ***!
            \*****************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/types/public.ts": (
          /*!*****************************!*\
            !*** ./src/types/public.ts ***!
            \*****************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Intl = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            );
            m.__exportStar(o(
              /*! ./common */
              "./src/types/common.ts"
            ), n), m.__exportStar(o(
              /*! ./datetime */
              "./src/types/datetime.ts"
            ), n), m.__exportStar(o(
              /*! ./duration */
              "./src/types/duration.ts"
            ), n), m.__exportStar(o(
              /*! ./info */
              "./src/types/info.ts"
            ), n), m.__exportStar(o(
              /*! ./interval */
              "./src/types/interval.ts"
            ), n), m.__exportStar(o(
              /*! ./locale */
              "./src/types/locale.ts"
            ), n), m.__exportStar(o(
              /*! ./zone */
              "./src/types/zone.ts"
            ), n);
            var f = m.__importDefault(o(
              /*! ./intl-next */
              "./src/types/intl-next.ts"
            ));
            n.Intl = f.default;
          }
        ),
        /***/
        "./src/types/zone.ts": (
          /*!***************************!*\
            !*** ./src/types/zone.ts ***!
            \***************************/
          /***/
          (y, n) => {
            Object.defineProperty(n, "__esModule", { value: !0 });
          }
        ),
        /***/
        "./src/zone.ts": (
          /*!*********************!*\
            !*** ./src/zone.ts ***!
            \*********************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.Zone = void 0;
            var m = o(
              /*! ./errors */
              "./src/errors.ts"
            ), f = (
              /** @class */
              function() {
                function I() {
                }
                return Object.defineProperty(I.prototype, "type", {
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
                }), Object.defineProperty(I.prototype, "ianaName", {
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
                }), Object.defineProperty(I.prototype, "name", {
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
                }), Object.defineProperty(I.prototype, "isUniversal", {
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
                }), I.prototype.offsetName = function(N, k) {
                  throw new m.ZoneIsAbstractError();
                }, I.prototype.formatOffset = function(N, k) {
                  throw new m.ZoneIsAbstractError();
                }, I.prototype.offset = function(N) {
                  throw new m.ZoneIsAbstractError();
                }, I.prototype.equals = function(N) {
                  throw new m.ZoneIsAbstractError();
                }, Object.defineProperty(I.prototype, "isValid", {
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
                }), I;
              }()
            );
            n.Zone = f;
          }
        ),
        /***/
        "./src/zones/IANAZone.ts": (
          /*!*******************************!*\
            !*** ./src/zones/IANAZone.ts ***!
            \*******************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.IANAZone = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ../impl/util */
              "./src/impl/util.ts"
            ), I = o(
              /*! ../zone */
              "./src/zone.ts"
            ), N = o(
              /*! ../errors */
              "./src/errors.ts"
            ), k = m.__importDefault(o(
              /*! ../types/intl-next */
              "./src/types/intl-next.ts"
            )), U = {};
            function A(D) {
              if (!U[D])
                try {
                  U[D] = new k.default.DateTimeFormat("en-US", {
                    hour12: !1,
                    timeZone: D,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    era: "short"
                  });
                } catch {
                  throw new N.InvalidZoneError(D);
                }
              return U[D];
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
            function h(D, p) {
              var S = D.format(p).replace(/\u200E/g, ""), C = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(S), P = C[1], O = C[2], _ = C[3], R = C[4], w = C[5], W = C[6], Y = C[7];
              return [_, P, O, R, w, W, Y];
            }
            function T(D, p) {
              for (var S = D.formatToParts(p), C = [], P = 0; P < S.length; P++) {
                var O = S[P], _ = O.type, R = O.value, w = M[_];
                _ === "era" ? C[w] = R : (0, f.isUndefined)(w) || (C[w] = parseInt(R, 10));
              }
              return C;
            }
            var b = {}, j = (
              /** @class */
              function(D) {
                m.__extends(p, D);
                function p(S) {
                  var C = D.call(this) || this;
                  return C._zoneName = S, C._valid = p.isValidZone(S), C;
                }
                return p.create = function(S) {
                  return b[S] || (b[S] = new p(S)), b[S];
                }, p.resetCache = function() {
                  b = {}, U = {};
                }, p.isValidSpecifier = function(S) {
                  return this.isValidZone(S);
                }, p.isValidZone = function(S) {
                  if (!S)
                    return !1;
                  try {
                    return new k.default.DateTimeFormat("en-US", { timeZone: S }).format(), !0;
                  } catch {
                    return !1;
                  }
                }, Object.defineProperty(p.prototype, "type", {
                  /** @override **/
                  get: function() {
                    return "iana";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(p.prototype, "name", {
                  /** @override **/
                  get: function() {
                    return this._zoneName;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(p.prototype, "isUniversal", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), p.prototype.offsetName = function(S, C) {
                  var P = C === void 0 ? {} : C, O = P.format, _ = P.locale;
                  return (0, f.parseZoneInfo)(S, O, _, this.name);
                }, p.prototype.formatOffset = function(S, C) {
                  return (0, f.formatOffset)(this.offset(S), C);
                }, p.prototype.offset = function(S) {
                  var C = new Date(S);
                  if (isNaN(+C))
                    return NaN;
                  var P = A(this.name), O, _ = typeof P.formatToParts == typeof isNaN ? T(P, C) : h(P, C), R = _[0], w = _[1], W = _[2], Y = _[3], V = _[4], K = _[5], X = _[6];
                  Y === "BC" && (O = -Math.abs(+R) + 1);
                  var Z = V === 24 ? 0 : V, L = (0, f.objToLocalTS)({
                    year: O || +R,
                    month: +w,
                    day: +W,
                    hour: +Z,
                    minute: +K,
                    second: +X,
                    millisecond: 0
                  }), x = +C, G = x % 1e3;
                  return x -= G >= 0 ? G : 1e3 + G, (L - x) / (60 * 1e3);
                }, p.prototype.equals = function(S) {
                  return S.type === "iana" && S.name === this.name;
                }, Object.defineProperty(p.prototype, "isValid", {
                  /** @override **/
                  get: function() {
                    return this._valid;
                  },
                  enumerable: !1,
                  configurable: !0
                }), p;
              }(I.Zone)
            );
            n.IANAZone = j;
          }
        ),
        /***/
        "./src/zones/fixedOffsetZone.ts": (
          /*!**************************************!*\
            !*** ./src/zones/fixedOffsetZone.ts ***!
            \**************************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.FixedOffsetZone = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ../impl/util */
              "./src/impl/util.ts"
            ), I = o(
              /*! ../zone */
              "./src/zone.ts"
            ), N = null, k = (
              /** @class */
              function(U) {
                m.__extends(A, U);
                function A(M) {
                  var h = U.call(this) || this;
                  return h._fixed = M, h;
                }
                return Object.defineProperty(A, "utcInstance", {
                  /**
                   * Get a singleton instance of UTC
                   * @return {FixedOffsetZone}
                   */
                  get: function() {
                    return N === null && (N = new A(0)), N;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(A.prototype, "ianaName", {
                  /**
                   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
                   *
                   * @override
                   * @type {string}
                   */
                  get: function() {
                    return this._fixed === 0 ? "Etc/UTC" : "Etc/GMT".concat((0, f.formatOffset)(-this._fixed, "narrow"));
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(A.prototype, "isUniversal", {
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
                }), Object.defineProperty(A.prototype, "isValid", {
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
                }), Object.defineProperty(A.prototype, "name", {
                  /**
                   * The name of this zone.
                   * All fixed zones' names always start with "UTC" (plus optional offset)
                   * @override
                   * @type {string}
                   */
                  get: function() {
                    return this._fixed === 0 ? "UTC" : "UTC".concat((0, f.formatOffset)(this._fixed, "narrow"));
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(A.prototype, "type", {
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
                }), A.instance = function(M) {
                  return M === 0 ? A.utcInstance : new A(M);
                }, A.parseSpecifier = function(M) {
                  if (M) {
                    var h = M.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
                    if (h)
                      return new A((0, f.signedOffset)(h[1], h[2]));
                  }
                  return null;
                }, A.prototype.equals = function(M) {
                  return M.type === "fixed" && M._fixed === this._fixed;
                }, A.prototype.formatOffset = function(M, h) {
                  return (0, f.formatOffset)(this._fixed, h);
                }, A.prototype.offset = function() {
                  return this._fixed;
                }, A.prototype.offsetName = function() {
                  return this.name;
                }, A;
              }(I.Zone)
            );
            n.FixedOffsetZone = k;
          }
        ),
        /***/
        "./src/zones/invalidZone.ts": (
          /*!**********************************!*\
            !*** ./src/zones/invalidZone.ts ***!
            \**********************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.InvalidZone = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ../zone */
              "./src/zone.ts"
            ), I = (
              /** @class */
              function(N) {
                m.__extends(k, N);
                function k(U) {
                  var A = N.call(this) || this;
                  return A._zoneName = U, Object.setPrototypeOf(A, k.prototype), A;
                }
                return Object.defineProperty(k.prototype, "type", {
                  /** @override **/
                  get: function() {
                    return "invalid";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(k.prototype, "name", {
                  /** @override **/
                  get: function() {
                    return this._zoneName;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(k.prototype, "isUniversal", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), k.prototype.offsetName = function() {
                  return null;
                }, k.prototype.formatOffset = function() {
                  return "";
                }, k.prototype.offset = function() {
                  return NaN;
                }, k.prototype.equals = function() {
                  return !1;
                }, Object.defineProperty(k.prototype, "isValid", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), k;
              }(f.Zone)
            );
            n.InvalidZone = I;
          }
        ),
        /***/
        "./src/zones/systemZone.ts": (
          /*!*********************************!*\
            !*** ./src/zones/systemZone.ts ***!
            \*********************************/
          /***/
          (y, n, o) => {
            Object.defineProperty(n, "__esModule", { value: !0 }), n.SystemZone = void 0;
            var m = o(
              /*! tslib */
              "./node_modules/tslib/tslib.es6.js"
            ), f = o(
              /*! ../impl/util */
              "./src/impl/util.ts"
            ), I = o(
              /*! ../zone */
              "./src/zone.ts"
            ), N = null, k = (
              /** @class */
              function(U) {
                m.__extends(A, U);
                function A() {
                  return U !== null && U.apply(this, arguments) || this;
                }
                return Object.defineProperty(A, "instance", {
                  /**
                   * Get a singleton instance of the local zone
                   * @return {SystemZone}
                   */
                  get: function() {
                    return N === null && (N = new A()), N;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(A.prototype, "type", {
                  /** @override **/
                  get: function() {
                    return "system";
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(A.prototype, "name", {
                  /** @override **/
                  get: function() {
                    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
                  },
                  enumerable: !1,
                  configurable: !0
                }), Object.defineProperty(A.prototype, "isUniversal", {
                  /** @override **/
                  get: function() {
                    return !1;
                  },
                  enumerable: !1,
                  configurable: !0
                }), A.prototype.offsetName = function(M, h) {
                  var T = h.format, b = h.locale;
                  return (0, f.parseZoneInfo)(M, T, b);
                }, A.prototype.formatOffset = function(M, h) {
                  return (0, f.formatOffset)(this.offset(M), h);
                }, A.prototype.offset = function(M) {
                  return -new Date(M).getTimezoneOffset();
                }, A.prototype.equals = function(M) {
                  return M.type === "system";
                }, Object.defineProperty(A.prototype, "isValid", {
                  /** @override **/
                  get: function() {
                    return !0;
                  },
                  enumerable: !1,
                  configurable: !0
                }), A;
              }(I.Zone)
            );
            n.SystemZone = k;
          }
        ),
        /***/
        "./node_modules/tslib/tslib.es6.js": (
          /*!*****************************************!*\
            !*** ./node_modules/tslib/tslib.es6.js ***!
            \*****************************************/
          /***/
          (y, n, o) => {
            o.r(n), o.d(n, {
              /* harmony export */
              __assign: () => (
                /* binding */
                I
              ),
              /* harmony export */
              __asyncDelegator: () => (
                /* binding */
                Y
              ),
              /* harmony export */
              __asyncGenerator: () => (
                /* binding */
                W
              ),
              /* harmony export */
              __asyncValues: () => (
                /* binding */
                V
              ),
              /* harmony export */
              __await: () => (
                /* binding */
                w
              ),
              /* harmony export */
              __awaiter: () => (
                /* binding */
                j
              ),
              /* harmony export */
              __classPrivateFieldGet: () => (
                /* binding */
                x
              ),
              /* harmony export */
              __classPrivateFieldIn: () => (
                /* binding */
                ee
              ),
              /* harmony export */
              __classPrivateFieldSet: () => (
                /* binding */
                G
              ),
              /* harmony export */
              __createBinding: () => (
                /* binding */
                p
              ),
              /* harmony export */
              __decorate: () => (
                /* binding */
                k
              ),
              /* harmony export */
              __esDecorate: () => (
                /* binding */
                A
              ),
              /* harmony export */
              __exportStar: () => (
                /* binding */
                S
              ),
              /* harmony export */
              __extends: () => (
                /* binding */
                f
              ),
              /* harmony export */
              __generator: () => (
                /* binding */
                D
              ),
              /* harmony export */
              __importDefault: () => (
                /* binding */
                L
              ),
              /* harmony export */
              __importStar: () => (
                /* binding */
                Z
              ),
              /* harmony export */
              __makeTemplateObject: () => (
                /* binding */
                K
              ),
              /* harmony export */
              __metadata: () => (
                /* binding */
                b
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
                P
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
                O
              ),
              /* harmony export */
              __spreadArray: () => (
                /* binding */
                R
              ),
              /* harmony export */
              __spreadArrays: () => (
                /* binding */
                _
              ),
              /* harmony export */
              __values: () => (
                /* binding */
                C
              ),
              /* harmony export */
              default: () => ie
              /* harmony export */
            });
            var m = function(u, i) {
              return m = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, d) {
                s.__proto__ = d;
              } || function(s, d) {
                for (var g in d) Object.prototype.hasOwnProperty.call(d, g) && (s[g] = d[g]);
              }, m(u, i);
            };
            function f(u, i) {
              if (typeof i != "function" && i !== null)
                throw new TypeError("Class extends value " + String(i) + " is not a constructor or null");
              m(u, i);
              function s() {
                this.constructor = u;
              }
              u.prototype = i === null ? Object.create(i) : (s.prototype = i.prototype, new s());
            }
            var I = function() {
              return I = Object.assign || function(i) {
                for (var s, d = 1, g = arguments.length; d < g; d++) {
                  s = arguments[d];
                  for (var c in s) Object.prototype.hasOwnProperty.call(s, c) && (i[c] = s[c]);
                }
                return i;
              }, I.apply(this, arguments);
            };
            function N(u, i) {
              var s = {};
              for (var d in u) Object.prototype.hasOwnProperty.call(u, d) && i.indexOf(d) < 0 && (s[d] = u[d]);
              if (u != null && typeof Object.getOwnPropertySymbols == "function")
                for (var g = 0, d = Object.getOwnPropertySymbols(u); g < d.length; g++)
                  i.indexOf(d[g]) < 0 && Object.prototype.propertyIsEnumerable.call(u, d[g]) && (s[d[g]] = u[d[g]]);
              return s;
            }
            function k(u, i, s, d) {
              var g = arguments.length, c = g < 3 ? i : d === null ? d = Object.getOwnPropertyDescriptor(i, s) : d, E;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") c = Reflect.decorate(u, i, s, d);
              else for (var F = u.length - 1; F >= 0; F--) (E = u[F]) && (c = (g < 3 ? E(c) : g > 3 ? E(i, s, c) : E(i, s)) || c);
              return g > 3 && c && Object.defineProperty(i, s, c), c;
            }
            function U(u, i) {
              return function(s, d) {
                i(s, d, u);
              };
            }
            function A(u, i, s, d, g, c) {
              function E(be) {
                if (be !== void 0 && typeof be != "function") throw new TypeError("Function expected");
                return be;
              }
              for (var F = d.kind, z = F === "getter" ? "get" : F === "setter" ? "set" : "value", H = !i && u ? d.static ? u : u.prototype : null, q = i || (H ? Object.getOwnPropertyDescriptor(H, d.name) : {}), J, Q = !1, ne = s.length - 1; ne >= 0; ne--) {
                var de = {};
                for (var _e in d) de[_e] = _e === "access" ? {} : d[_e];
                for (var _e in d.access) de.access[_e] = d.access[_e];
                de.addInitializer = function(be) {
                  if (Q) throw new TypeError("Cannot add initializers after decoration has completed");
                  c.push(E(be || null));
                };
                var Se = (0, s[ne])(F === "accessor" ? { get: q.get, set: q.set } : q[z], de);
                if (F === "accessor") {
                  if (Se === void 0) continue;
                  if (Se === null || typeof Se != "object") throw new TypeError("Object expected");
                  (J = E(Se.get)) && (q.get = J), (J = E(Se.set)) && (q.set = J), (J = E(Se.init)) && g.unshift(J);
                } else (J = E(Se)) && (F === "field" ? g.unshift(J) : q[z] = J);
              }
              H && Object.defineProperty(H, d.name, q), Q = !0;
            }
            function M(u, i, s) {
              for (var d = arguments.length > 2, g = 0; g < i.length; g++)
                s = d ? i[g].call(u, s) : i[g].call(u);
              return d ? s : void 0;
            }
            function h(u) {
              return typeof u == "symbol" ? u : "".concat(u);
            }
            function T(u, i, s) {
              return typeof i == "symbol" && (i = i.description ? "[".concat(i.description, "]") : ""), Object.defineProperty(u, "name", { configurable: !0, value: s ? "".concat(s, " ", i) : i });
            }
            function b(u, i) {
              if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(u, i);
            }
            function j(u, i, s, d) {
              function g(c) {
                return c instanceof s ? c : new s(function(E) {
                  E(c);
                });
              }
              return new (s || (s = Promise))(function(c, E) {
                function F(q) {
                  try {
                    H(d.next(q));
                  } catch (J) {
                    E(J);
                  }
                }
                function z(q) {
                  try {
                    H(d.throw(q));
                  } catch (J) {
                    E(J);
                  }
                }
                function H(q) {
                  q.done ? c(q.value) : g(q.value).then(F, z);
                }
                H((d = d.apply(u, i || [])).next());
              });
            }
            function D(u, i) {
              var s = { label: 0, sent: function() {
                if (c[0] & 1) throw c[1];
                return c[1];
              }, trys: [], ops: [] }, d, g, c, E;
              return E = { next: F(0), throw: F(1), return: F(2) }, typeof Symbol == "function" && (E[Symbol.iterator] = function() {
                return this;
              }), E;
              function F(H) {
                return function(q) {
                  return z([H, q]);
                };
              }
              function z(H) {
                if (d) throw new TypeError("Generator is already executing.");
                for (; E && (E = 0, H[0] && (s = 0)), s; ) try {
                  if (d = 1, g && (c = H[0] & 2 ? g.return : H[0] ? g.throw || ((c = g.return) && c.call(g), 0) : g.next) && !(c = c.call(g, H[1])).done) return c;
                  switch (g = 0, c && (H = [H[0] & 2, c.value]), H[0]) {
                    case 0:
                    case 1:
                      c = H;
                      break;
                    case 4:
                      return s.label++, { value: H[1], done: !1 };
                    case 5:
                      s.label++, g = H[1], H = [0];
                      continue;
                    case 7:
                      H = s.ops.pop(), s.trys.pop();
                      continue;
                    default:
                      if (c = s.trys, !(c = c.length > 0 && c[c.length - 1]) && (H[0] === 6 || H[0] === 2)) {
                        s = 0;
                        continue;
                      }
                      if (H[0] === 3 && (!c || H[1] > c[0] && H[1] < c[3])) {
                        s.label = H[1];
                        break;
                      }
                      if (H[0] === 6 && s.label < c[1]) {
                        s.label = c[1], c = H;
                        break;
                      }
                      if (c && s.label < c[2]) {
                        s.label = c[2], s.ops.push(H);
                        break;
                      }
                      c[2] && s.ops.pop(), s.trys.pop();
                      continue;
                  }
                  H = i.call(u, s);
                } catch (q) {
                  H = [6, q], g = 0;
                } finally {
                  d = c = 0;
                }
                if (H[0] & 5) throw H[1];
                return { value: H[0] ? H[1] : void 0, done: !0 };
              }
            }
            var p = Object.create ? function(u, i, s, d) {
              d === void 0 && (d = s);
              var g = Object.getOwnPropertyDescriptor(i, s);
              (!g || ("get" in g ? !i.__esModule : g.writable || g.configurable)) && (g = { enumerable: !0, get: function() {
                return i[s];
              } }), Object.defineProperty(u, d, g);
            } : function(u, i, s, d) {
              d === void 0 && (d = s), u[d] = i[s];
            };
            function S(u, i) {
              for (var s in u) s !== "default" && !Object.prototype.hasOwnProperty.call(i, s) && p(i, u, s);
            }
            function C(u) {
              var i = typeof Symbol == "function" && Symbol.iterator, s = i && u[i], d = 0;
              if (s) return s.call(u);
              if (u && typeof u.length == "number") return {
                next: function() {
                  return u && d >= u.length && (u = void 0), { value: u && u[d++], done: !u };
                }
              };
              throw new TypeError(i ? "Object is not iterable." : "Symbol.iterator is not defined.");
            }
            function P(u, i) {
              var s = typeof Symbol == "function" && u[Symbol.iterator];
              if (!s) return u;
              var d = s.call(u), g, c = [], E;
              try {
                for (; (i === void 0 || i-- > 0) && !(g = d.next()).done; ) c.push(g.value);
              } catch (F) {
                E = { error: F };
              } finally {
                try {
                  g && !g.done && (s = d.return) && s.call(d);
                } finally {
                  if (E) throw E.error;
                }
              }
              return c;
            }
            function O() {
              for (var u = [], i = 0; i < arguments.length; i++)
                u = u.concat(P(arguments[i]));
              return u;
            }
            function _() {
              for (var u = 0, i = 0, s = arguments.length; i < s; i++) u += arguments[i].length;
              for (var d = Array(u), g = 0, i = 0; i < s; i++)
                for (var c = arguments[i], E = 0, F = c.length; E < F; E++, g++)
                  d[g] = c[E];
              return d;
            }
            function R(u, i, s) {
              if (s || arguments.length === 2) for (var d = 0, g = i.length, c; d < g; d++)
                (c || !(d in i)) && (c || (c = Array.prototype.slice.call(i, 0, d)), c[d] = i[d]);
              return u.concat(c || Array.prototype.slice.call(i));
            }
            function w(u) {
              return this instanceof w ? (this.v = u, this) : new w(u);
            }
            function W(u, i, s) {
              if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
              var d = s.apply(u, i || []), g, c = [];
              return g = {}, E("next"), E("throw"), E("return"), g[Symbol.asyncIterator] = function() {
                return this;
              }, g;
              function E(Q) {
                d[Q] && (g[Q] = function(ne) {
                  return new Promise(function(de, _e) {
                    c.push([Q, ne, de, _e]) > 1 || F(Q, ne);
                  });
                });
              }
              function F(Q, ne) {
                try {
                  z(d[Q](ne));
                } catch (de) {
                  J(c[0][3], de);
                }
              }
              function z(Q) {
                Q.value instanceof w ? Promise.resolve(Q.value.v).then(H, q) : J(c[0][2], Q);
              }
              function H(Q) {
                F("next", Q);
              }
              function q(Q) {
                F("throw", Q);
              }
              function J(Q, ne) {
                Q(ne), c.shift(), c.length && F(c[0][0], c[0][1]);
              }
            }
            function Y(u) {
              var i, s;
              return i = {}, d("next"), d("throw", function(g) {
                throw g;
              }), d("return"), i[Symbol.iterator] = function() {
                return this;
              }, i;
              function d(g, c) {
                i[g] = u[g] ? function(E) {
                  return (s = !s) ? { value: w(u[g](E)), done: !1 } : c ? c(E) : E;
                } : c;
              }
            }
            function V(u) {
              if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
              var i = u[Symbol.asyncIterator], s;
              return i ? i.call(u) : (u = typeof C == "function" ? C(u) : u[Symbol.iterator](), s = {}, d("next"), d("throw"), d("return"), s[Symbol.asyncIterator] = function() {
                return this;
              }, s);
              function d(c) {
                s[c] = u[c] && function(E) {
                  return new Promise(function(F, z) {
                    E = u[c](E), g(F, z, E.done, E.value);
                  });
                };
              }
              function g(c, E, F, z) {
                Promise.resolve(z).then(function(H) {
                  c({ value: H, done: F });
                }, E);
              }
            }
            function K(u, i) {
              return Object.defineProperty ? Object.defineProperty(u, "raw", { value: i }) : u.raw = i, u;
            }
            var X = Object.create ? function(u, i) {
              Object.defineProperty(u, "default", { enumerable: !0, value: i });
            } : function(u, i) {
              u.default = i;
            };
            function Z(u) {
              if (u && u.__esModule) return u;
              var i = {};
              if (u != null) for (var s in u) s !== "default" && Object.prototype.hasOwnProperty.call(u, s) && p(i, u, s);
              return X(i, u), i;
            }
            function L(u) {
              return u && u.__esModule ? u : { default: u };
            }
            function x(u, i, s, d) {
              if (s === "a" && !d) throw new TypeError("Private accessor was defined without a getter");
              if (typeof i == "function" ? u !== i || !d : !i.has(u)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
              return s === "m" ? d : s === "a" ? d.call(u) : d ? d.value : i.get(u);
            }
            function G(u, i, s, d, g) {
              if (d === "m") throw new TypeError("Private method is not writable");
              if (d === "a" && !g) throw new TypeError("Private accessor was defined without a setter");
              if (typeof i == "function" ? u !== i || !g : !i.has(u)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
              return d === "a" ? g.call(u, s) : g ? g.value = s : i.set(u, s), s;
            }
            function ee(u, i) {
              if (i === null || typeof i != "object" && typeof i != "function") throw new TypeError("Cannot use 'in' operator on non-object");
              return typeof u == "function" ? i === u : u.has(i);
            }
            const ie = {
              __extends: f,
              __assign: I,
              __rest: N,
              __decorate: k,
              __param: U,
              __metadata: b,
              __awaiter: j,
              __generator: D,
              __createBinding: p,
              __exportStar: S,
              __values: C,
              __read: P,
              __spread: O,
              __spreadArrays: _,
              __spreadArray: R,
              __await: w,
              __asyncGenerator: W,
              __asyncDelegator: Y,
              __asyncValues: V,
              __makeTemplateObject: K,
              __importStar: Z,
              __importDefault: L,
              __classPrivateFieldGet: x,
              __classPrivateFieldSet: G,
              __classPrivateFieldIn: ee
            };
          }
        )
        /******/
      }, a = {};
      function l(y) {
        var n = a[y];
        if (n !== void 0)
          return n.exports;
        var o = a[y] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        return t[y](o, o.exports, l), o.exports;
      }
      l.d = (y, n) => {
        for (var o in n)
          l.o(n, o) && !l.o(y, o) && Object.defineProperty(y, o, { enumerable: !0, get: n[o] });
      }, l.o = (y, n) => Object.prototype.hasOwnProperty.call(y, n), l.r = (y) => {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(y, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(y, "__esModule", { value: !0 });
      };
      var v = l("./src/index.ts");
      return v;
    })()
  ));
})(cr);
var ae = cr.exports, Et = [
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
  for (var t = [], a = r; a < e; a++)
    t.push(a);
  return t;
}, oe = function(r, e) {
  var t = 0, a = [];
  if (ke(r))
    for (; t < e; t++)
      a[t] = [].concat(r);
  else
    for (; t < e; t++)
      a[t] = r;
  return a;
}, Lr = function(r) {
  return ke(r) ? r : [r];
};
function Ke(r, e, t) {
  t === void 0 && (t = " ");
  var a = String(r);
  return e = e >> 0, a.length > e ? String(a) : (e = e - a.length, e > t.length && (t += oe(t, e / t.length)), t.slice(0, e) + String(a));
}
var Cr = function(r, e, t) {
  var a = r.split(e);
  return t ? a.slice(0, t).concat([a.slice(t).join(e)]) : a;
}, Le = function(r, e) {
  var t = r % e;
  return t * e < 0 ? t + e : t;
}, yt = function(r, e) {
  return { div: Math.floor(r / e), mod: Le(r, e) };
}, Pe = function(r) {
  return !ve(r) || r.length === 0;
}, ge = function(r) {
  return !Pe(r);
}, ce = function(r, e) {
  return ge(r) && r.indexOf(e) !== -1;
}, $e = function(r, e, t, a, l, v) {
  return a === void 0 && (a = 0), l === void 0 && (l = 0), v === void 0 && (v = 0), new Date(Date.UTC(r, e - 1, t, a, l, v));
}, Ar = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], fr = 1e3 * 60 * 60 * 24, dr = 9999, hr = $e(1970, 1, 1), Fr = [6, 0, 1, 2, 3, 4, 5], it = function(r) {
  return r % 4 === 0 && r % 100 !== 0 || r % 400 === 0;
}, mr = function(r) {
  return r instanceof Date;
}, nt = function(r) {
  return mr(r) && !isNaN(r.getTime());
}, Wr = function(r, e) {
  var t = r.getTime(), a = e.getTime(), l = t - a;
  return Math.round(l / fr);
}, Ot = function(r) {
  return Wr(r, hr);
}, yr = function(r) {
  return new Date(hr.getTime() + r * fr);
}, Rr = function(r) {
  var e = r.getUTCMonth();
  return e === 1 && it(r.getUTCFullYear()) ? 29 : Ar[e];
}, Xe = function(r) {
  return Fr[r.getUTCDay()];
}, Ht = function(r, e) {
  var t = $e(r, e + 1, 1);
  return [Xe(t), Rr(t)];
}, vr = function(r, e) {
  return e = e || r, new Date(Date.UTC(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
}, wt = function(r) {
  var e = new Date(r.getTime());
  return e;
}, xt = function(r) {
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
}, Ct = function(r) {
  var e = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/, t = e.exec(r);
  if (!t)
    throw new Error("Invalid UNTIL value: ".concat(r));
  return new Date(Date.UTC(parseInt(t[1], 10), parseInt(t[2], 10) - 1, parseInt(t[3], 10), parseInt(t[5], 10) || 0, parseInt(t[6], 10) || 0, parseInt(t[7], 10) || 0));
}, Zt = function(r, e) {
  var t = r.toLocaleString("sv-SE", { timeZone: e });
  return t.replace(" ", "T") + "Z";
}, Pr = function(r, e) {
  var t = Intl.DateTimeFormat().resolvedOptions().timeZone, a = new Date(Zt(r, t)), l = new Date(Zt(r, e ?? "UTC")), v = l.getTime() - a.getTime();
  return new Date(r.getTime() - v);
}, Je = (
  /** @class */
  function() {
    function r(e, t) {
      this.minDate = null, this.maxDate = null, this._result = [], this.total = 0, this.method = e, this.args = t, e === "between" ? (this.maxDate = t.inc ? t.before : new Date(t.before.getTime() - 1), this.minDate = t.inc ? t.after : new Date(t.after.getTime() + 1)) : e === "before" ? this.maxDate = t.inc ? t.dt : new Date(t.dt.getTime() - 1) : e === "after" && (this.minDate = t.inc ? t.dt : new Date(t.dt.getTime() + 1));
    }
    return r.prototype.accept = function(e) {
      ++this.total;
      var t = this.minDate && e < this.minDate, a = this.maxDate && e > this.maxDate;
      if (this.method === "between") {
        if (t)
          return !0;
        if (a)
          return !1;
      } else if (this.method === "before") {
        if (a)
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
  return Dt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, a) {
    t.__proto__ = a;
  } || function(t, a) {
    for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (t[l] = a[l]);
  }, Dt(r, e);
};
function At(r, e) {
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
    for (var t, a = 1, l = arguments.length; a < l; a++) {
      t = arguments[a];
      for (var v in t) Object.prototype.hasOwnProperty.call(t, v) && (e[v] = t[v]);
    }
    return e;
  }, Me.apply(this, arguments);
};
function $(r, e, t) {
  if (t || arguments.length === 2) for (var a = 0, l = e.length, v; a < l; a++)
    (v || !(a in e)) && (v || (v = Array.prototype.slice.call(e, 0, a)), v[a] = e[a]);
  return r.concat(v || Array.prototype.slice.call(e));
}
var zt = (
  /** @class */
  function(r) {
    At(e, r);
    function e(t, a, l) {
      var v = r.call(this, t, a) || this;
      return v.iterator = l, v;
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
}, jr = function(r) {
  return r.toString();
}, Ur = function(r, e, t) {
  return "".concat(e, " ").concat(t, ", ").concat(r);
}, Ye = (
  /** @class */
  function() {
    function r(e, t, a, l) {
      if (t === void 0 && (t = jr), a === void 0 && (a = lt), l === void 0 && (l = Ur), this.text = [], this.language = a || lt, this.gettext = t, this.dateFormatter = l, this.rrule = e, this.options = e.options, this.origOptions = e.origOptions, this.origOptions.bymonthday) {
        var v = [].concat(this.options.bymonthday), y = [].concat(this.options.bynmonthday);
        v.sort(function(f, I) {
          return f - I;
        }), y.sort(function(f, I) {
          return I - f;
        }), this.bymonthday = v.concat(y), this.bymonthday.length || (this.bymonthday = null);
      }
      if (ve(this.origOptions.byweekday)) {
        var n = ke(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday], o = String(n);
        this.byweekday = {
          allWeeks: n.filter(function(f) {
            return !f.n;
          }),
          someWeeks: n.filter(function(f) {
            return !!f.n;
          }),
          isWeekdays: o.indexOf("MO") !== -1 && o.indexOf("TU") !== -1 && o.indexOf("WE") !== -1 && o.indexOf("TH") !== -1 && o.indexOf("FR") !== -1 && o.indexOf("SA") === -1 && o.indexOf("SU") === -1,
          isEveryDay: o.indexOf("MO") !== -1 && o.indexOf("TU") !== -1 && o.indexOf("WE") !== -1 && o.indexOf("TH") !== -1 && o.indexOf("FR") !== -1 && o.indexOf("SA") !== -1 && o.indexOf("SU") !== -1
        };
        var m = function(f, I) {
          return f.weekday - I.weekday;
        };
        this.byweekday.allWeeks.sort(m), this.byweekday.someWeeks.sort(m), this.byweekday.allWeeks.length || (this.byweekday.allWeeks = null), this.byweekday.someWeeks.length || (this.byweekday.someWeeks = null);
      } else
        this.byweekday = null;
    }
    return r.isFullyConvertible = function(e) {
      var t = !0;
      if (!(e.options.freq in r.IMPLEMENTED) || e.origOptions.until && e.origOptions.count)
        return !1;
      for (var a in e.origOptions) {
        if (Yt(["dtstart", "tzid", "wkst", "freq"], a))
          return !0;
        if (!Yt(r.IMPLEMENTED[e.options.freq], a))
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
      var t, a = this.gettext;
      if (e === -1)
        return a("last");
      var l = Math.abs(e);
      switch (l) {
        case 1:
        case 21:
        case 31:
          t = l + a("st");
          break;
        case 2:
        case 22:
          t = l + a("nd");
          break;
        case 3:
        case 23:
          t = l + a("rd");
          break;
        default:
          t = l + a("th");
      }
      return e < 0 ? t + " " + a("last") : t;
    }, r.prototype.monthtext = function(e) {
      return this.language.monthNames[e - 1];
    }, r.prototype.weekdaytext = function(e) {
      var t = We(e) ? (e + 1) % 7 : e.getJsWeekday();
      return (e.n ? this.nth(e.n) + " " : "") + this.language.dayNames[t];
    }, r.prototype.plural = function(e) {
      return e % 100 !== 1;
    }, r.prototype.add = function(e) {
      return this.text.push(" "), this.text.push(e), this;
    }, r.prototype.list = function(e, t, a, l) {
      var v = this;
      l === void 0 && (l = ","), ke(e) || (e = [e]);
      var y = function(o, m, f) {
        for (var I = "", N = 0; N < o.length; N++)
          N !== 0 && (N === o.length - 1 ? I += " " + f + " " : I += m + " "), I += o[N];
        return I;
      };
      t = t || function(o) {
        return o.toString();
      };
      var n = function(o) {
        return t && t.call(v, o);
      };
      return a ? y(e.map(n), l, a) : e.map(n).join(l + " ");
    }, r;
  }()
), Hr = (
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
        var a = void 0;
        e = null;
        for (var l in this.rules) {
          a = this.rules[l];
          var v = a.exec(this.text);
          v && (e === null || v[0].length > e[0].length) && (e = v, t = l);
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
function pr(r, e) {
  e === void 0 && (e = lt);
  var t = {}, a = new Hr(e.tokens);
  if (!a.start(r))
    return null;
  return l(), t;
  function l() {
    a.expect("every");
    var N = a.acceptNumber();
    if (N && (t.interval = parseInt(N[0], 10)), a.isDone())
      throw new Error("Unexpected end");
    switch (a.symbol) {
      case "day(s)":
        t.freq = re.DAILY, a.nextSymbol() && (y(), I());
        break;
      case "weekday(s)":
        t.freq = re.WEEKLY, t.byweekday = [re.MO, re.TU, re.WE, re.TH, re.FR], a.nextSymbol(), y(), I();
        break;
      case "week(s)":
        t.freq = re.WEEKLY, a.nextSymbol() && (v(), y(), I());
        break;
      case "hour(s)":
        t.freq = re.HOURLY, a.nextSymbol() && (v(), I());
        break;
      case "minute(s)":
        t.freq = re.MINUTELY, a.nextSymbol() && (v(), I());
        break;
      case "month(s)":
        t.freq = re.MONTHLY, a.nextSymbol() && (v(), I());
        break;
      case "year(s)":
        t.freq = re.YEARLY, a.nextSymbol() && (v(), I());
        break;
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        t.freq = re.WEEKLY;
        var k = a.symbol.substr(0, 2).toUpperCase();
        if (t.byweekday = [re[k]], !a.nextSymbol())
          return;
        for (; a.accept("comma"); ) {
          if (a.isDone())
            throw new Error("Unexpected end");
          var U = o();
          if (!U)
            throw new Error("Unexpected symbol " + a.symbol + ", expected weekday");
          t.byweekday.push(re[U]), a.nextSymbol();
        }
        y(), f(), I();
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
        if (t.freq = re.YEARLY, t.bymonth = [n()], !a.nextSymbol())
          return;
        for (; a.accept("comma"); ) {
          if (a.isDone())
            throw new Error("Unexpected end");
          var A = n();
          if (!A)
            throw new Error("Unexpected symbol " + a.symbol + ", expected month");
          t.bymonth.push(A), a.nextSymbol();
        }
        v(), I();
        break;
      default:
        throw new Error("Unknown symbol");
    }
  }
  function v() {
    var N = a.accept("on"), k = a.accept("the");
    if (N || k)
      do {
        var U = m(), A = o(), M = n();
        if (U)
          A ? (a.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(re[A].nth(U))) : (t.bymonthday || (t.bymonthday = []), t.bymonthday.push(U), a.accept("day(s)"));
        else if (A)
          a.nextSymbol(), t.byweekday || (t.byweekday = []), t.byweekday.push(re[A]);
        else if (a.symbol === "weekday(s)")
          a.nextSymbol(), t.byweekday || (t.byweekday = [re.MO, re.TU, re.WE, re.TH, re.FR]);
        else if (a.symbol === "week(s)") {
          a.nextSymbol();
          var h = a.acceptNumber();
          if (!h)
            throw new Error("Unexpected symbol " + a.symbol + ", expected week number");
          for (t.byweekno = [parseInt(h[0], 10)]; a.accept("comma"); ) {
            if (h = a.acceptNumber(), !h)
              throw new Error("Unexpected symbol " + a.symbol + "; expected monthday");
            t.byweekno.push(parseInt(h[0], 10));
          }
        } else if (M)
          a.nextSymbol(), t.bymonth || (t.bymonth = []), t.bymonth.push(M);
        else
          return;
      } while (a.accept("comma") || a.accept("the") || a.accept("on"));
  }
  function y() {
    var N = a.accept("at");
    if (N)
      do {
        var k = a.acceptNumber();
        if (!k)
          throw new Error("Unexpected symbol " + a.symbol + ", expected hour");
        for (t.byhour = [parseInt(k[0], 10)]; a.accept("comma"); ) {
          if (k = a.acceptNumber(), !k)
            throw new Error("Unexpected symbol " + a.symbol + "; expected hour");
          t.byhour.push(parseInt(k[0], 10));
        }
      } while (a.accept("comma") || a.accept("at"));
  }
  function n() {
    switch (a.symbol) {
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
  function o() {
    switch (a.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return a.symbol.substr(0, 2).toUpperCase();
      default:
        return !1;
    }
  }
  function m() {
    switch (a.symbol) {
      case "last":
        return a.nextSymbol(), -1;
      case "first":
        return a.nextSymbol(), 1;
      case "second":
        return a.nextSymbol(), a.accept("last") ? -2 : 2;
      case "third":
        return a.nextSymbol(), a.accept("last") ? -3 : 3;
      case "nth":
        var N = parseInt(a.value[1], 10);
        if (N < -366 || N > 366)
          throw new Error("Nth out of range: " + N);
        return a.nextSymbol(), a.accept("last") ? -N : N;
      default:
        return !1;
    }
  }
  function f() {
    a.accept("on"), a.accept("the");
    var N = m();
    if (N)
      for (t.bymonthday = [N], a.nextSymbol(); a.accept("comma"); ) {
        if (N = m(), !N)
          throw new Error("Unexpected symbol " + a.symbol + "; expected monthday");
        t.bymonthday.push(N), a.nextSymbol();
      }
  }
  function I() {
    if (a.symbol === "until") {
      var N = Date.parse(a.text);
      if (!N)
        throw new Error("Cannot parse until date:" + a.text);
      t.until = new Date(N);
    } else a.accept("for") && (t.count = parseInt(a.value[0], 10), a.expect("number"));
  }
}
var se;
(function(r) {
  r[r.YEARLY = 0] = "YEARLY", r[r.MONTHLY = 1] = "MONTHLY", r[r.WEEKLY = 2] = "WEEKLY", r[r.DAILY = 3] = "DAILY", r[r.HOURLY = 4] = "HOURLY", r[r.MINUTELY = 5] = "MINUTELY", r[r.SECONDLY = 6] = "SECONDLY";
})(se || (se = {}));
function Ft(r) {
  return r < se.HOURLY;
}
var xr = function(r, e) {
  return e === void 0 && (e = lt), new re(pr(r, e) || void 0);
}, Qe = [
  "count",
  "until",
  "interval",
  "byweekday",
  "bymonthday",
  "bymonth"
];
Ye.IMPLEMENTED = [];
Ye.IMPLEMENTED[se.HOURLY] = Qe;
Ye.IMPLEMENTED[se.MINUTELY] = Qe;
Ye.IMPLEMENTED[se.DAILY] = ["byhour"].concat(Qe);
Ye.IMPLEMENTED[se.WEEKLY] = Qe;
Ye.IMPLEMENTED[se.MONTHLY] = Qe;
Ye.IMPLEMENTED[se.YEARLY] = ["byweekno", "byyearday"].concat(Qe);
var Zr = function(r, e, t, a) {
  return new Ye(r, e, t, a).toString();
}, zr = Ye.isFullyConvertible, ct = (
  /** @class */
  function() {
    function r(e, t, a, l) {
      this.hour = e, this.minute = t, this.second = a, this.millisecond = l || 0;
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
), Yr = (
  /** @class */
  function(r) {
    At(e, r);
    function e(t, a, l, v, y, n, o) {
      var m = r.call(this, v, y, n, o) || this;
      return m.year = t, m.month = a, m.day = l, m;
    }
    return e.fromDate = function(t) {
      return new this(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.valueOf() % 1e3);
    }, e.prototype.getWeekday = function() {
      return Xe(new Date(this.getTime()));
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
        var a = Math.floor(this.month / 12), l = Le(this.month, 12);
        this.month = l, this.year += a, this.month === 0 && (this.month = 12, --this.year);
      }
    }, e.prototype.addWeekly = function(t, a) {
      a > this.getWeekday() ? this.day += -(this.getWeekday() + 1 + (6 - a)) + t * 7 : this.day += -(this.getWeekday() - a) + t * 7, this.fixDay();
    }, e.prototype.addDaily = function(t) {
      this.day += t, this.fixDay();
    }, e.prototype.addHours = function(t, a, l) {
      for (a && (this.hour += Math.floor((23 - this.hour) / t) * t); ; ) {
        this.hour += t;
        var v = yt(this.hour, 24), y = v.div, n = v.mod;
        if (y && (this.hour = n, this.addDaily(y)), Pe(l) || ce(l, this.hour))
          break;
      }
    }, e.prototype.addMinutes = function(t, a, l, v) {
      for (a && (this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / t) * t); ; ) {
        this.minute += t;
        var y = yt(this.minute, 60), n = y.div, o = y.mod;
        if (n && (this.minute = o, this.addHours(n, !1, l)), (Pe(l) || ce(l, this.hour)) && (Pe(v) || ce(v, this.minute)))
          break;
      }
    }, e.prototype.addSeconds = function(t, a, l, v, y) {
      for (a && (this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / t) * t); ; ) {
        this.second += t;
        var n = yt(this.second, 60), o = n.div, m = n.mod;
        if (o && (this.second = m, this.addMinutes(o, !1, l, v)), (Pe(l) || ce(l, this.hour)) && (Pe(v) || ce(v, this.minute)) && (Pe(y) || ce(y, this.second)))
          break;
      }
    }, e.prototype.fixDay = function() {
      if (!(this.day <= 28)) {
        var t = Ht(this.year, this.month - 1)[1];
        if (!(this.day <= t))
          for (; this.day > t; ) {
            if (this.day -= t, ++this.month, this.month === 13 && (this.month = 1, ++this.year, this.year > dr))
              return;
            t = Ht(this.year, this.month - 1)[1];
          }
      }
    }, e.prototype.add = function(t, a) {
      var l = t.freq, v = t.interval, y = t.wkst, n = t.byhour, o = t.byminute, m = t.bysecond;
      switch (l) {
        case se.YEARLY:
          return this.addYears(v);
        case se.MONTHLY:
          return this.addMonths(v);
        case se.WEEKLY:
          return this.addWeekly(v, y);
        case se.DAILY:
          return this.addDaily(v);
        case se.HOURLY:
          return this.addHours(v, a, n);
        case se.MINUTELY:
          return this.addMinutes(v, a, n, o);
        case se.SECONDLY:
          return this.addSeconds(v, a, n, o, m);
      }
    }, e;
  }(ct)
);
function gr(r) {
  for (var e = [], t = Object.keys(r), a = 0, l = t; a < l.length; a++) {
    var v = l[a];
    ce(Tn, v) || e.push(v), mr(r[v]) && !nt(r[v]) && e.push(v);
  }
  if (e.length)
    throw new Error("Invalid options: " + e.join(", "));
  return Me({}, r);
}
function Vr(r) {
  var e = Me(Me({}, Wt), gr(r));
  if (ve(e.byeaster) && (e.freq = re.YEARLY), !(ve(e.freq) && re.FREQUENCIES[e.freq]))
    throw new Error("Invalid frequency: ".concat(e.freq, " ").concat(r.freq));
  if (e.dtstart || (e.dtstart = new Date((/* @__PURE__ */ new Date()).setMilliseconds(0))), ve(e.wkst) ? We(e.wkst) || (e.wkst = e.wkst.weekday) : e.wkst = re.MO.weekday, ve(e.bysetpos)) {
    We(e.bysetpos) && (e.bysetpos = [e.bysetpos]);
    for (var t = 0; t < e.bysetpos.length; t++) {
      var a = e.bysetpos[t];
      if (a === 0 || !(a >= -366 && a <= 366))
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
        e.byweekday = [Xe(e.dtstart)];
        break;
    }
  if (ve(e.bymonth) && !ke(e.bymonth) && (e.bymonth = [e.bymonth]), ve(e.byyearday) && !ke(e.byyearday) && We(e.byyearday) && (e.byyearday = [e.byyearday]), !ve(e.bymonthday))
    e.bymonthday = [], e.bynmonthday = [];
  else if (ke(e.bymonthday)) {
    for (var l = [], v = [], t = 0; t < e.bymonthday.length; t++) {
      var a = e.bymonthday[t];
      a > 0 ? l.push(a) : a < 0 && v.push(a);
    }
    e.bymonthday = l, e.bynmonthday = v;
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
    for (var y = [], n = [], t = 0; t < e.byweekday.length; t++) {
      var o = e.byweekday[t];
      if (We(o)) {
        y.push(o);
        continue;
      } else if (Ut(o)) {
        y.push(Oe.fromStr(o).weekday);
        continue;
      }
      !o.n || e.freq > re.MONTHLY ? y.push(o.weekday) : n.push([o.weekday, o.n]);
    }
    e.byweekday = ge(y) ? y : null, e.bynweekday = ge(n) ? n : null;
  }
  return ve(e.byhour) ? We(e.byhour) && (e.byhour = [e.byhour]) : e.byhour = e.freq < re.HOURLY ? [e.dtstart.getUTCHours()] : null, ve(e.byminute) ? We(e.byminute) && (e.byminute = [e.byminute]) : e.byminute = e.freq < re.MINUTELY ? [e.dtstart.getUTCMinutes()] : null, ve(e.bysecond) ? We(e.bysecond) && (e.bysecond = [e.bysecond]) : e.bysecond = e.freq < re.SECONDLY ? [e.dtstart.getUTCSeconds()] : null, { parsedOptions: e };
}
function Gr(r) {
  var e = r.dtstart.getTime() % 1e3;
  if (!Ft(r.freq))
    return [];
  var t = [];
  return r.byhour.forEach(function(a) {
    r.byminute.forEach(function(l) {
      r.bysecond.forEach(function(v) {
        t.push(new ct(a, l, v, e));
      });
    });
  }), t;
}
function St(r) {
  var e = r.split(`
`).map(Br).filter(function(t) {
    return t !== null;
  });
  return Me(Me({}, e[0]), e[1]);
}
function ft(r) {
  var e = {}, t = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(r);
  if (!t)
    return e;
  var a = t[1], l = t[2];
  return a && (e.tzid = a), e.dtstart = Ct(l), e;
}
function Br(r) {
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
  var e = r.replace(/^RRULE:/i, ""), t = ft(e), a = r.replace(/^(?:RRULE|EXRULE):/i, "").split(";");
  return a.forEach(function(l) {
    var v = l.split("="), y = v[0], n = v[1];
    switch (y.toUpperCase()) {
      case "FREQ":
        t.freq = se[n.toUpperCase()];
        break;
      case "WKST":
        t.wkst = Ae[n.toUpperCase()];
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
        var o = $r(n), m = y.toLowerCase();
        t[m] = o;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        t.byweekday = Kr(n);
        break;
      case "DTSTART":
      case "TZID":
        var f = ft(r);
        t.tzid = f.tzid, t.dtstart = f.dtstart;
        break;
      case "UNTIL":
        t.until = Ct(n);
        break;
      case "BYEASTER":
        t.byeaster = Number(n);
        break;
      default:
        throw new Error("Unknown RRULE property '" + y + "'");
    }
  }), t;
}
function $r(r) {
  if (r.indexOf(",") !== -1) {
    var e = r.split(",");
    return e.map(Gt);
  }
  return Gt(r);
}
function Gt(r) {
  return /^[+-]?\d+$/.test(r) ? Number(r) : r;
}
function Kr(r) {
  var e = r.split(",");
  return e.map(function(t) {
    if (t.length === 2)
      return Ae[t];
    var a = t.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
    if (!a || a.length < 3)
      throw new SyntaxError("Invalid weekday string: ".concat(t));
    var l = Number(a[1]), v = a[2], y = Ae[v].weekday;
    return new Oe(y, l);
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
  for (var e = [], t = "", a = Object.keys(r), l = Object.keys(Wt), v = 0; v < a.length; v++)
    if (a[v] !== "tzid" && ce(l, a[v])) {
      var y = a[v].toUpperCase(), n = r[a[v]], o = "";
      if (!(!ve(n) || ke(n) && !n.length)) {
        switch (y) {
          case "FREQ":
            o = re.FREQUENCIES[r.freq];
            break;
          case "WKST":
            We(n) ? o = new Oe(n).toString() : o = n.toString();
            break;
          case "BYWEEKDAY":
            y = "BYDAY", o = Lr(n).map(function(k) {
              return k instanceof Oe ? k : ke(k) ? new Oe(k[0], k[1]) : new Oe(k);
            }).toString();
            break;
          case "DTSTART":
            t = Jr(n, r.tzid);
            break;
          case "UNTIL":
            o = Lt(n, !r.tzid);
            break;
          default:
            if (ke(n)) {
              for (var m = [], f = 0; f < n.length; f++)
                m[f] = String(n[f]);
              o = m.toString();
            } else
              o = String(n);
        }
        o && e.push([y, o]);
      }
    }
  var I = e.map(function(k) {
    var U = k[0], A = k[1];
    return "".concat(U, "=").concat(A.toString());
  }).join(";"), N = "";
  return I !== "" && (N = "RRULE:".concat(I)), [t, N].filter(function(k) {
    return !!k;
  }).join(`
`);
}
function Jr(r, e) {
  return r ? "DTSTART" + new dt(new Date(r), e).toString() : "";
}
function qr(r, e) {
  return Array.isArray(r) ? !Array.isArray(e) || r.length !== e.length ? !1 : r.every(function(t, a) {
    return t.getTime() === e[a].getTime();
  }) : r instanceof Date ? e instanceof Date && r.getTime() === e.getTime() : r === e;
}
var Xr = (
  /** @class */
  function() {
    function r() {
      this.all = !1, this.before = [], this.after = [], this.between = [];
    }
    return r.prototype._cacheAdd = function(e, t, a) {
      t && (t = t instanceof Date ? wt(t) : xt(t)), e === "all" ? this.all = t : (a._value = t, this[e].push(a));
    }, r.prototype._cacheGet = function(e, t) {
      var a = !1, l = t ? Object.keys(t) : [], v = function(f) {
        for (var I = 0; I < l.length; I++) {
          var N = l[I];
          if (!qr(t[N], f[N]))
            return !0;
        }
        return !1;
      }, y = this[e];
      if (e === "all")
        a = this.all;
      else if (ke(y))
        for (var n = 0; n < y.length; n++) {
          var o = y[n];
          if (!(l.length && v(o))) {
            a = o._value;
            break;
          }
        }
      if (!a && this.all) {
        for (var m = new Je(e, t), n = 0; n < this.all.length && m.accept(this.all[n]); n++)
          ;
        a = m.getValue(), this._cacheAdd(e, a, t);
      }
      return ke(a) ? xt(a) : a instanceof Date ? wt(a) : a;
    }, r;
  }()
), Qr = $($($($($($($($($($($($($([], oe(1, 31), !0), oe(2, 28), !0), oe(3, 31), !0), oe(4, 30), !0), oe(5, 31), !0), oe(6, 30), !0), oe(7, 31), !0), oe(8, 31), !0), oe(9, 30), !0), oe(10, 31), !0), oe(11, 30), !0), oe(12, 31), !0), oe(1, 7), !0), en = $($($($($($($($($($($($($([], oe(1, 31), !0), oe(2, 29), !0), oe(3, 31), !0), oe(4, 30), !0), oe(5, 31), !0), oe(6, 30), !0), oe(7, 31), !0), oe(8, 31), !0), oe(9, 30), !0), oe(10, 31), !0), oe(11, 30), !0), oe(12, 31), !0), oe(1, 7), !0), tn = Ue(1, 29), rn = Ue(1, 30), Ve = Ue(1, 31), Te = Ue(1, 32), nn = $($($($($($($($($($($($($([], Te, !0), rn, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te.slice(0, 7), !0), an = $($($($($($($($($($($($($([], Te, !0), tn, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te, !0), Ve, !0), Te, !0), Ve, !0), Te, !0), Te.slice(0, 7), !0), on = Ue(-28, 0), sn = Ue(-29, 0), Ge = Ue(-30, 0), Ee = Ue(-31, 0), un = $($($($($($($($($($($($($([], Ee, !0), sn, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee.slice(0, 7), !0), ln = $($($($($($($($($($($($($([], Ee, !0), on, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee, !0), Ge, !0), Ee, !0), Ge, !0), Ee, !0), Ee.slice(0, 7), !0), cn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366], fn = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365], Bt = function() {
  for (var r = [], e = 0; e < 55; e++)
    r = r.concat(Ue(7));
  return r;
}();
function dn(r, e) {
  var t = $e(r, 1, 1), a = it(r) ? 366 : 365, l = it(r + 1) ? 366 : 365, v = Ot(t), y = Xe(t), n = Me(Me({ yearlen: a, nextyearlen: l, yearordinal: v, yearweekday: y }, hn(r)), { wnomask: null });
  if (Pe(e.byweekno))
    return n;
  n.wnomask = oe(0, a + 7);
  var o, m, f = o = Le(7 - y + e.wkst, 7);
  f >= 4 ? (f = 0, m = n.yearlen + Le(y - e.wkst, 7)) : m = a - f;
  for (var I = Math.floor(m / 7), N = Le(m, 7), k = Math.floor(I + N / 4), U = 0; U < e.byweekno.length; U++) {
    var A = e.byweekno[U];
    if (A < 0 && (A += k + 1), A > 0 && A <= k) {
      var M = void 0;
      A > 1 ? (M = f + (A - 1) * 7, f !== o && (M -= 7 - o)) : M = f;
      for (var h = 0; h < 7 && (n.wnomask[M] = 1, M++, n.wdaymask[M] !== e.wkst); h++)
        ;
    }
  }
  if (ce(e.byweekno, 1)) {
    var M = f + k * 7;
    if (f !== o && (M -= 7 - o), M < a)
      for (var U = 0; U < 7 && (n.wnomask[M] = 1, M += 1, n.wdaymask[M] !== e.wkst); U++)
        ;
  }
  if (f) {
    var T = void 0;
    if (ce(e.byweekno, -1))
      T = -1;
    else {
      var b = Xe($e(r - 1, 1, 1)), j = Le(7 - b.valueOf() + e.wkst, 7), D = it(r - 1) ? 366 : 365, p = void 0;
      j >= 4 ? (j = 0, p = D + Le(b - e.wkst, 7)) : p = a - f, T = Math.floor(52 + Le(p, 7) / 4);
    }
    if (ce(e.byweekno, T))
      for (var M = 0; M < f; M++)
        n.wnomask[M] = 1;
  }
  return n;
}
function hn(r) {
  var e = it(r) ? 366 : 365, t = $e(r, 1, 1), a = Xe(t);
  return e === 365 ? {
    mmask: Qr,
    mdaymask: an,
    nmdaymask: ln,
    wdaymask: Bt.slice(a),
    mrange: fn
  } : {
    mmask: en,
    mdaymask: nn,
    nmdaymask: un,
    wdaymask: Bt.slice(a),
    mrange: cn
  };
}
function mn(r, e, t, a, l, v) {
  var y = {
    lastyear: r,
    lastmonth: e,
    nwdaymask: []
  }, n = [];
  if (v.freq === re.YEARLY)
    if (Pe(v.bymonth))
      n = [[0, t]];
    else
      for (var o = 0; o < v.bymonth.length; o++)
        e = v.bymonth[o], n.push(a.slice(e - 1, e + 1));
  else v.freq === re.MONTHLY && (n = [a.slice(e - 1, e + 1)]);
  if (Pe(n))
    return y;
  y.nwdaymask = oe(0, t);
  for (var o = 0; o < n.length; o++)
    for (var m = n[o], f = m[0], I = m[1] - 1, N = 0; N < v.bynweekday.length; N++) {
      var k = void 0, U = v.bynweekday[N], A = U[0], M = U[1];
      M < 0 ? (k = I + (M + 1) * 7, k -= Le(l[k] - A, 7)) : (k = f + (M - 1) * 7, k += Le(7 - l[k] + A, 7)), f <= k && k <= I && (y.nwdaymask[k] = 1);
    }
  return y;
}
function yn(r, e) {
  e === void 0 && (e = 0);
  var t = r % 19, a = Math.floor(r / 100), l = r % 100, v = Math.floor(a / 4), y = a % 4, n = Math.floor((a + 8) / 25), o = Math.floor((a - n + 1) / 3), m = Math.floor(19 * t + a - v - o + 15) % 30, f = Math.floor(l / 4), I = l % 4, N = Math.floor(32 + 2 * y + 2 * f - m - I) % 7, k = Math.floor((t + 11 * m + 22 * N) / 451), U = Math.floor((m + N - 7 * k + 114) / 31), A = (m + N - 7 * k + 114) % 31 + 1, M = Date.UTC(r, U - 1, A + e), h = Date.UTC(r, 0, 1);
  return [Math.ceil((M - h) / (1e3 * 60 * 60 * 24))];
}
var vn = (
  /** @class */
  function() {
    function r(e) {
      this.options = e;
    }
    return r.prototype.rebuild = function(e, t) {
      var a = this.options;
      if (e !== this.lastyear && (this.yearinfo = dn(e, a)), ge(a.bynweekday) && (t !== this.lastmonth || e !== this.lastyear)) {
        var l = this.yearinfo, v = l.yearlen, y = l.mrange, n = l.wdaymask;
        this.monthinfo = mn(e, t, v, y, n, a);
      }
      ve(a.byeaster) && (this.eastermask = yn(e, a.byeaster));
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
      for (var a = this.mrange[t - 1], l = this.mrange[t], v = oe(null, this.yearlen), y = a; y < l; y++)
        v[y] = y;
      return [v, a, l];
    }, r.prototype.wdayset = function(e, t, a) {
      for (var l = oe(null, this.yearlen + 7), v = Ot($e(e, t, a)) - this.yearordinal, y = v, n = 0; n < 7 && (l[v] = v, ++v, this.wdaymask[v] !== this.options.wkst); n++)
        ;
      return [l, y, v];
    }, r.prototype.ddayset = function(e, t, a) {
      var l = oe(null, this.yearlen), v = Ot($e(e, t, a)) - this.yearordinal;
      return l[v] = v, [l, v, v + 1];
    }, r.prototype.htimeset = function(e, t, a, l) {
      var v = this, y = [];
      return this.options.byminute.forEach(function(n) {
        y = y.concat(v.mtimeset(e, n, a, l));
      }), st(y), y;
    }, r.prototype.mtimeset = function(e, t, a, l) {
      var v = this.options.bysecond.map(function(y) {
        return new ct(e, t, y, l);
      });
      return st(v), v;
    }, r.prototype.stimeset = function(e, t, a, l) {
      return [new ct(e, t, a, l)];
    }, r.prototype.getdayset = function(e) {
      switch (e) {
        case se.YEARLY:
          return this.ydayset.bind(this);
        case se.MONTHLY:
          return this.mdayset.bind(this);
        case se.WEEKLY:
          return this.wdayset.bind(this);
        case se.DAILY:
          return this.ddayset.bind(this);
        default:
          return this.ddayset.bind(this);
      }
    }, r.prototype.gettimeset = function(e) {
      switch (e) {
        case se.HOURLY:
          return this.htimeset.bind(this);
        case se.MINUTELY:
          return this.mtimeset.bind(this);
        case se.SECONDLY:
          return this.stimeset.bind(this);
      }
    }, r;
  }()
);
function pn(r, e, t, a, l, v) {
  for (var y = [], n = 0; n < r.length; n++) {
    var o = void 0, m = void 0, f = r[n];
    f < 0 ? (o = Math.floor(f / e.length), m = Le(f, e.length)) : (o = Math.floor((f - 1) / e.length), m = Le(f - 1, e.length));
    for (var I = [], N = t; N < a; N++) {
      var k = v[N];
      ve(k) && I.push(k);
    }
    var U = void 0;
    o < 0 ? U = I.slice(o)[0] : U = I[o];
    var A = e[m], M = yr(l.yearordinal + U), h = vr(M, A);
    ce(y, h) || y.push(h);
  }
  return st(y), y;
}
function br(r, e) {
  var t = e.dtstart, a = e.freq, l = e.interval, v = e.until, y = e.bysetpos, n = e.count;
  if (n === 0 || l === 0)
    return xe(r);
  var o = Yr.fromDate(t), m = new vn(e);
  m.rebuild(o.year, o.month);
  for (var f = _n(m, o, e); ; ) {
    var I = m.getdayset(a)(o.year, o.month, o.day), N = I[0], k = I[1], U = I[2], A = bn(N, k, U, m, e);
    if (ge(y))
      for (var M = pn(y, f, k, U, m, N), h = 0; h < M.length; h++) {
        var T = M[h];
        if (v && T > v)
          return xe(r);
        if (T >= t) {
          var b = $t(T, e);
          if (!r.accept(b) || n && (--n, !n))
            return xe(r);
        }
      }
    else
      for (var h = k; h < U; h++) {
        var j = N[h];
        if (ve(j))
          for (var D = yr(m.yearordinal + j), p = 0; p < f.length; p++) {
            var S = f[p], T = vr(D, S);
            if (v && T > v)
              return xe(r);
            if (T >= t) {
              var b = $t(T, e);
              if (!r.accept(b) || n && (--n, !n))
                return xe(r);
            }
          }
      }
    if (e.interval === 0 || (o.add(e, A), o.year > dr))
      return xe(r);
    Ft(a) || (f = m.gettimeset(a)(o.hour, o.minute, o.second, 0)), m.rebuild(o.year, o.month);
  }
}
function gn(r, e, t) {
  var a = t.bymonth, l = t.byweekno, v = t.byweekday, y = t.byeaster, n = t.bymonthday, o = t.bynmonthday, m = t.byyearday;
  return ge(a) && !ce(a, r.mmask[e]) || ge(l) && !r.wnomask[e] || ge(v) && !ce(v, r.wdaymask[e]) || ge(r.nwdaymask) && !r.nwdaymask[e] || y !== null && !ce(r.eastermask, e) || (ge(n) || ge(o)) && !ce(n, r.mdaymask[e]) && !ce(o, r.nmdaymask[e]) || ge(m) && (e < r.yearlen && !ce(m, e + 1) && !ce(m, -r.yearlen + e) || e >= r.yearlen && !ce(m, e + 1 - r.yearlen) && !ce(m, -r.nextyearlen + e - r.yearlen));
}
function $t(r, e) {
  return new dt(r, e.tzid).rezonedDate();
}
function xe(r) {
  return r.getValue();
}
function bn(r, e, t, a, l) {
  for (var v = !1, y = e; y < t; y++) {
    var n = r[y];
    v = gn(a, n, l), v && (r[n] = null);
  }
  return v;
}
function _n(r, e, t) {
  var a = t.freq, l = t.byhour, v = t.byminute, y = t.bysecond;
  return Ft(a) ? Gr(t) : a >= re.HOURLY && ge(l) && !ce(l, e.hour) || a >= re.MINUTELY && ge(v) && !ce(v, e.minute) || a >= re.SECONDLY && ge(y) && !ce(y, e.second) ? [] : r.gettimeset(a)(e.hour, e.minute, e.second, e.millisecond);
}
var Ae = {
  MO: new Oe(0),
  TU: new Oe(1),
  WE: new Oe(2),
  TH: new Oe(3),
  FR: new Oe(4),
  SA: new Oe(5),
  SU: new Oe(6)
}, Wt = {
  freq: se.YEARLY,
  dtstart: null,
  interval: 1,
  wkst: Ae.MO,
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
}, Tn = Object.keys(Wt), re = (
  /** @class */
  function() {
    function r(e, t) {
      e === void 0 && (e = {}), t === void 0 && (t = !1), this._cache = t ? null : new Xr(), this.origOptions = gr(e);
      var a = Vr(e).parsedOptions;
      this.options = a;
    }
    return r.parseText = function(e, t) {
      return pr(e, t);
    }, r.fromText = function(e, t) {
      return xr(e, t);
    }, r.fromString = function(e) {
      return new r(r.parseString(e) || void 0);
    }, r.prototype._iter = function(e) {
      return br(e, this.options);
    }, r.prototype._cacheGet = function(e, t) {
      return this._cache ? this._cache._cacheGet(e, t) : !1;
    }, r.prototype._cacheAdd = function(e, t, a) {
      if (this._cache)
        return this._cache._cacheAdd(e, t, a);
    }, r.prototype.all = function(e) {
      if (e)
        return this._iter(new zt("all", {}, e));
      var t = this._cacheGet("all");
      return t === !1 && (t = this._iter(new Je("all", {})), this._cacheAdd("all", t)), t;
    }, r.prototype.between = function(e, t, a, l) {
      if (a === void 0 && (a = !1), !nt(e) || !nt(t))
        throw new Error("Invalid date passed in to RRule.between");
      var v = {
        before: t,
        after: e,
        inc: a
      };
      if (l)
        return this._iter(new zt("between", v, l));
      var y = this._cacheGet("between", v);
      return y === !1 && (y = this._iter(new Je("between", v)), this._cacheAdd("between", y, v)), y;
    }, r.prototype.before = function(e, t) {
      if (t === void 0 && (t = !1), !nt(e))
        throw new Error("Invalid date passed in to RRule.before");
      var a = { dt: e, inc: t }, l = this._cacheGet("before", a);
      return l === !1 && (l = this._iter(new Je("before", a)), this._cacheAdd("before", l, a)), l;
    }, r.prototype.after = function(e, t) {
      if (t === void 0 && (t = !1), !nt(e))
        throw new Error("Invalid date passed in to RRule.after");
      var a = { dt: e, inc: t }, l = this._cacheGet("after", a);
      return l === !1 && (l = this._iter(new Je("after", a)), this._cacheAdd("after", l, a)), l;
    }, r.prototype.count = function() {
      return this.all().length;
    }, r.prototype.toString = function() {
      return It(this.origOptions);
    }, r.prototype.toText = function(e, t, a) {
      return Zr(this, e, t, a);
    }, r.prototype.isFullyConvertibleToText = function() {
      return zr(this);
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
    ], r.YEARLY = se.YEARLY, r.MONTHLY = se.MONTHLY, r.WEEKLY = se.WEEKLY, r.DAILY = se.DAILY, r.HOURLY = se.HOURLY, r.MINUTELY = se.MINUTELY, r.SECONDLY = se.SECONDLY, r.MO = Ae.MO, r.TU = Ae.TU, r.WE = Ae.WE, r.TH = Ae.TH, r.FR = Ae.FR, r.SA = Ae.SA, r.SU = Ae.SU, r.parseString = St, r.optionsToString = It, r;
  }()
);
function En(r, e, t, a, l, v) {
  var y = {}, n = r.accept;
  function o(N, k) {
    t.forEach(function(U) {
      U.between(N, k, !0).forEach(function(A) {
        y[Number(A)] = !0;
      });
    });
  }
  l.forEach(function(N) {
    var k = new dt(N, v).rezonedDate();
    y[Number(k)] = !0;
  }), r.accept = function(N) {
    var k = Number(N);
    return isNaN(k) ? n.call(this, N) : !y[k] && (o(new Date(k - 1), new Date(k + 1)), !y[k]) ? (y[k] = !0, n.call(this, N)) : !0;
  }, r.method === "between" && (o(r.args.after, r.args.before), r.accept = function(N) {
    var k = Number(N);
    return y[k] ? !0 : (y[k] = !0, n.call(this, N));
  });
  for (var m = 0; m < a.length; m++) {
    var f = new dt(a[m], v).rezonedDate();
    if (!r.accept(new Date(f.getTime())))
      break;
  }
  e.forEach(function(N) {
    br(r, N.options);
  });
  var I = r._result;
  switch (st(I), r.method) {
    case "all":
    case "between":
      return I;
    case "before":
      return I.length && I[I.length - 1] || null;
    case "after":
    default:
      return I.length && I[0] || null;
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
function On(r, e) {
  var t = [], a = [], l = [], v = [], y = ft(r), n = y.dtstart, o = y.tzid, m = kn(r, e.unfold);
  return m.forEach(function(f) {
    var I;
    if (f) {
      var N = In(f), k = N.name, U = N.parms, A = N.value;
      switch (k.toUpperCase()) {
        case "RRULE":
          if (U.length)
            throw new Error("unsupported RRULE parm: ".concat(U.join(",")));
          t.push(St(f));
          break;
        case "RDATE":
          var M = (I = /RDATE(?:;TZID=([^:=]+))?/i.exec(f)) !== null && I !== void 0 ? I : [], h = M[1];
          h && !o && (o = h), a = a.concat(Jt(A, U));
          break;
        case "EXRULE":
          if (U.length)
            throw new Error("unsupported EXRULE parm: ".concat(U.join(",")));
          l.push(St(A));
          break;
        case "EXDATE":
          v = v.concat(Jt(A, U));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + k);
      }
    }
  }), {
    dtstart: n,
    tzid: o,
    rrulevals: t,
    rdatevals: a,
    exrulevals: l,
    exdatevals: v
  };
}
function wn(r, e) {
  var t = On(r, e), a = t.rrulevals, l = t.rdatevals, v = t.exrulevals, y = t.exdatevals, n = t.dtstart, o = t.tzid, m = e.cache === !1;
  if (e.compatible && (e.forceset = !0, e.unfold = !0), e.forceset || a.length > 1 || l.length || v.length || y.length) {
    var f = new Nn(m);
    return f.dtstart(n), f.tzid(o || void 0), a.forEach(function(N) {
      f.rrule(new re(vt(N, n, o), m));
    }), l.forEach(function(N) {
      f.rdate(N);
    }), v.forEach(function(N) {
      f.exrule(new re(vt(N, n, o), m));
    }), y.forEach(function(N) {
      f.exdate(N);
    }), e.compatible && e.dtstart && f.rdate(n), f;
  }
  var I = a[0] || {};
  return new re(vt(I, I.dtstart || e.dtstart || n, I.tzid || e.tzid || o), m);
}
function kt(r, e) {
  return e === void 0 && (e = {}), wn(r, Dn(e));
}
function vt(r, e, t) {
  return Me(Me({}, r), { dtstart: e, tzid: t });
}
function Dn(r) {
  var e = [], t = Object.keys(r), a = Object.keys(Kt);
  if (t.forEach(function(l) {
    ce(a, l) || e.push(l);
  }), e.length)
    throw new Error("Invalid options: " + e.join(", "));
  return Me(Me({}, Kt), r);
}
function Sn(r) {
  if (r.indexOf(":") === -1)
    return {
      name: "RRULE",
      value: r
    };
  var e = Cr(r, ":", 1), t = e[0], a = e[1];
  return {
    name: t,
    value: a
  };
}
function In(r) {
  var e = Sn(r), t = e.name, a = e.value, l = t.split(";");
  if (!l)
    throw new Error("empty property name");
  return {
    name: l[0].toUpperCase(),
    parms: l.slice(1),
    value: a
  };
}
function kn(r, e) {
  if (e === void 0 && (e = !1), r = r && r.trim(), !r)
    throw new Error("Invalid empty string");
  if (!e)
    return r.split(/\s/);
  for (var t = r.split(`
`), a = 0; a < t.length; ) {
    var l = t[a] = t[a].replace(/\s+$/g, "");
    l ? a > 0 && l[0] === " " ? (t[a - 1] += l.slice(1), t.splice(a, 1)) : a += 1 : t.splice(a, 1);
  }
  return t;
}
function Mn(r) {
  r.forEach(function(e) {
    if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(e))
      throw new Error("unsupported RDATE/EXDATE parm: " + e);
  });
}
function Jt(r, e) {
  return Mn(e), r.split(",").map(function(t) {
    return Ct(t);
  });
}
function qt(r) {
  var e = this;
  return function(t) {
    if (t !== void 0 && (e["_".concat(r)] = t), e["_".concat(r)] !== void 0)
      return e["_".concat(r)];
    for (var a = 0; a < e._rrule.length; a++) {
      var l = e._rrule[a].origOptions[r];
      if (l)
        return l;
    }
  };
}
var Nn = (
  /** @class */
  function(r) {
    At(e, r);
    function e(t) {
      t === void 0 && (t = !1);
      var a = r.call(this, {}, t) || this;
      return a.dtstart = qt.apply(a, ["dtstart"]), a.tzid = qt.apply(a, ["tzid"]), a._rrule = [], a._rdate = [], a._exrule = [], a._exdate = [], a;
    }
    return e.prototype._iter = function(t) {
      return En(t, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
    }, e.prototype.rrule = function(t) {
      Xt(t, this._rrule);
    }, e.prototype.exrule = function(t) {
      Xt(t, this._exrule);
    }, e.prototype.rdate = function(t) {
      Qt(t, this._rdate);
    }, e.prototype.exdate = function(t) {
      Qt(t, this._exdate);
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
      return !this._rrule.length && this._dtstart && (t = t.concat(It({ dtstart: this._dtstart }))), this._rrule.forEach(function(a) {
        t = t.concat(a.toString().split(`
`));
      }), this._exrule.forEach(function(a) {
        t = t.concat(a.toString().split(`
`).map(function(l) {
          return l.replace(/^RRULE:/, "EXRULE:");
        }).filter(function(l) {
          return !/^DTSTART/.test(l);
        }));
      }), this._rdate.length && t.push(er("RDATE", this._rdate, this.tzid())), this._exdate.length && t.push(er("EXDATE", this._exdate, this.tzid())), t;
    }, e.prototype.toString = function() {
      return this.valueOf().join(`
`);
    }, e.prototype.clone = function() {
      var t = new e(!!this._cache);
      return this._rrule.forEach(function(a) {
        return t.rrule(a.clone());
      }), this._exrule.forEach(function(a) {
        return t.exrule(a.clone());
      }), this._rdate.forEach(function(a) {
        return t.rdate(new Date(a.getTime()));
      }), this._exdate.forEach(function(a) {
        return t.exdate(new Date(a.getTime()));
      }), t;
    }, e;
  }(re)
);
function Xt(r, e) {
  if (!(r instanceof re))
    throw new TypeError(String(r) + " is not RRule instance");
  ce(e.map(String), String(r)) || e.push(r);
}
function Qt(r, e) {
  if (!(r instanceof Date))
    throw new TypeError(String(r) + " is not Date instance");
  ce(e.map(Number), Number(r)) || (e.push(r), st(e));
}
function er(r, e, t) {
  var a = !t || t.toUpperCase() === "UTC", l = a ? "".concat(r, ":") : "".concat(r, ";TZID=").concat(t, ":"), v = e.map(function(y) {
    return Lt(y.valueOf(), a);
  }).join(",");
  return "".concat(l).concat(v);
}
var Ln = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, Ze = function(r) {
  return typeof r == "string" ? r.length > 0 : typeof r == "number";
}, pe = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = Math.pow(10, e)), Math.round(t * r) / t + 0;
}, Ce = function(r, e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = 1), r > t ? t : r > e ? r : e;
}, _r = function(r) {
  return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360;
}, tr = function(r) {
  return { r: Ce(r.r, 0, 255), g: Ce(r.g, 0, 255), b: Ce(r.b, 0, 255), a: Ce(r.a) };
}, pt = function(r) {
  return { r: pe(r.r), g: pe(r.g), b: pe(r.b), a: pe(r.a, 3) };
}, Cn = /^#([0-9a-f]{3,8})$/i, ut = function(r) {
  var e = r.toString(16);
  return e.length < 2 ? "0" + e : e;
}, Tr = function(r) {
  var e = r.r, t = r.g, a = r.b, l = r.a, v = Math.max(e, t, a), y = v - Math.min(e, t, a), n = y ? v === e ? (t - a) / y : v === t ? 2 + (a - e) / y : 4 + (e - t) / y : 0;
  return { h: 60 * (n < 0 ? n + 6 : n), s: v ? y / v * 100 : 0, v: v / 255 * 100, a: l };
}, Er = function(r) {
  var e = r.h, t = r.s, a = r.v, l = r.a;
  e = e / 360 * 6, t /= 100, a /= 100;
  var v = Math.floor(e), y = a * (1 - t), n = a * (1 - (e - v) * t), o = a * (1 - (1 - e + v) * t), m = v % 6;
  return { r: 255 * [a, n, y, y, o, a][m], g: 255 * [o, a, a, n, y, y][m], b: 255 * [y, y, o, a, a, n][m], a: l };
}, rr = function(r) {
  return { h: _r(r.h), s: Ce(r.s, 0, 100), l: Ce(r.l, 0, 100), a: Ce(r.a) };
}, nr = function(r) {
  return { h: pe(r.h), s: pe(r.s), l: pe(r.l), a: pe(r.a, 3) };
}, ir = function(r) {
  return Er((t = (e = r).s, { h: e.h, s: (t *= ((a = e.l) < 50 ? a : 100 - a) / 100) > 0 ? 2 * t / (a + t) * 100 : 0, v: a + t, a: e.a }));
  var e, t, a;
}, at = function(r) {
  return { h: (e = Tr(r)).h, s: (l = (200 - (t = e.s)) * (a = e.v) / 100) > 0 && l < 200 ? t * a / 100 / (l <= 100 ? l : 200 - l) * 100 : 0, l: l / 2, a: e.a };
  var e, t, a, l;
}, An = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Fn = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Wn = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Rn = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Mt = { string: [[function(r) {
  var e = Cn.exec(r);
  return e ? (r = e[1]).length <= 4 ? { r: parseInt(r[0] + r[0], 16), g: parseInt(r[1] + r[1], 16), b: parseInt(r[2] + r[2], 16), a: r.length === 4 ? pe(parseInt(r[3] + r[3], 16) / 255, 2) : 1 } : r.length === 6 || r.length === 8 ? { r: parseInt(r.substr(0, 2), 16), g: parseInt(r.substr(2, 2), 16), b: parseInt(r.substr(4, 2), 16), a: r.length === 8 ? pe(parseInt(r.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r) {
  var e = Wn.exec(r) || Rn.exec(r);
  return e ? e[2] !== e[4] || e[4] !== e[6] ? null : tr({ r: Number(e[1]) / (e[2] ? 100 / 255 : 1), g: Number(e[3]) / (e[4] ? 100 / 255 : 1), b: Number(e[5]) / (e[6] ? 100 / 255 : 1), a: e[7] === void 0 ? 1 : Number(e[7]) / (e[8] ? 100 : 1) }) : null;
}, "rgb"], [function(r) {
  var e = An.exec(r) || Fn.exec(r);
  if (!e) return null;
  var t, a, l = rr({ h: (t = e[1], a = e[2], a === void 0 && (a = "deg"), Number(t) * (Ln[a] || 1)), s: Number(e[3]), l: Number(e[4]), a: e[5] === void 0 ? 1 : Number(e[5]) / (e[6] ? 100 : 1) });
  return ir(l);
}, "hsl"]], object: [[function(r) {
  var e = r.r, t = r.g, a = r.b, l = r.a, v = l === void 0 ? 1 : l;
  return Ze(e) && Ze(t) && Ze(a) ? tr({ r: Number(e), g: Number(t), b: Number(a), a: Number(v) }) : null;
}, "rgb"], [function(r) {
  var e = r.h, t = r.s, a = r.l, l = r.a, v = l === void 0 ? 1 : l;
  if (!Ze(e) || !Ze(t) || !Ze(a)) return null;
  var y = rr({ h: Number(e), s: Number(t), l: Number(a), a: Number(v) });
  return ir(y);
}, "hsl"], [function(r) {
  var e = r.h, t = r.s, a = r.v, l = r.a, v = l === void 0 ? 1 : l;
  if (!Ze(e) || !Ze(t) || !Ze(a)) return null;
  var y = function(n) {
    return { h: _r(n.h), s: Ce(n.s, 0, 100), v: Ce(n.v, 0, 100), a: Ce(n.a) };
  }({ h: Number(e), s: Number(t), v: Number(a), a: Number(v) });
  return Er(y);
}, "hsv"]] }, ar = function(r, e) {
  for (var t = 0; t < e.length; t++) {
    var a = e[t][0](r);
    if (a) return [a, e[t][1]];
  }
  return [null, void 0];
}, Pn = function(r) {
  return typeof r == "string" ? ar(r.trim(), Mt.string) : typeof r == "object" && r !== null ? ar(r, Mt.object) : [null, void 0];
}, gt = function(r, e) {
  var t = at(r);
  return { h: t.h, s: Ce(t.s + 100 * e, 0, 100), l: t.l, a: t.a };
}, bt = function(r) {
  return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
}, or = function(r, e) {
  var t = at(r);
  return { h: t.h, s: t.s, l: Ce(t.l + 100 * e, 0, 100), a: t.a };
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
    return e = pt(this.rgba), t = e.r, a = e.g, l = e.b, y = (v = e.a) < 1 ? ut(pe(255 * v)) : "", "#" + ut(t) + ut(a) + ut(l) + y;
    var e, t, a, l, v, y;
  }, r.prototype.toRgb = function() {
    return pt(this.rgba);
  }, r.prototype.toRgbString = function() {
    return e = pt(this.rgba), t = e.r, a = e.g, l = e.b, (v = e.a) < 1 ? "rgba(" + t + ", " + a + ", " + l + ", " + v + ")" : "rgb(" + t + ", " + a + ", " + l + ")";
    var e, t, a, l, v;
  }, r.prototype.toHsl = function() {
    return nr(at(this.rgba));
  }, r.prototype.toHslString = function() {
    return e = nr(at(this.rgba)), t = e.h, a = e.s, l = e.l, (v = e.a) < 1 ? "hsla(" + t + ", " + a + "%, " + l + "%, " + v + ")" : "hsl(" + t + ", " + a + "%, " + l + "%)";
    var e, t, a, l, v;
  }, r.prototype.toHsv = function() {
    return e = Tr(this.rgba), { h: pe(e.h), s: pe(e.s), v: pe(e.v), a: pe(e.a, 3) };
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
    var t = at(this.rgba);
    return typeof e == "number" ? De({ h: e, s: t.s, l: t.l, a: t.a }) : pe(t.h);
  }, r.prototype.isEqual = function(e) {
    return this.toHex() === De(e).toHex();
  }, r;
}(), De = function(r) {
  return r instanceof Nt ? r : new Nt(r);
}, sr = [], jn = function(r) {
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
}, Rt = 96.422, Pt = 100, jt = 82.521, Un = function(r) {
  var e, t, a = { x: 0.9555766 * (e = r).x + -0.0230393 * e.y + 0.0631636 * e.z, y: -0.0282895 * e.x + 1.0099416 * e.y + 0.0210077 * e.z, z: 0.0122982 * e.x + -0.020483 * e.y + 1.3299098 * e.z };
  return t = { r: Tt(0.032404542 * a.x - 0.015371385 * a.y - 4985314e-9 * a.z), g: Tt(-969266e-8 * a.x + 0.018760108 * a.y + 41556e-8 * a.z), b: Tt(556434e-9 * a.x - 2040259e-9 * a.y + 0.010572252 * a.z), a: r.a }, { r: je(t.r, 0, 255), g: je(t.g, 0, 255), b: je(t.b, 0, 255), a: je(t.a) };
}, Hn = function(r) {
  var e = _t(r.r), t = _t(r.g), a = _t(r.b);
  return function(l) {
    return { x: je(l.x, 0, Rt), y: je(l.y, 0, Pt), z: je(l.z, 0, jt), a: je(l.a) };
  }(function(l) {
    return { x: 1.0478112 * l.x + 0.0228866 * l.y + -0.050127 * l.z, y: 0.0295424 * l.x + 0.9904844 * l.y + -0.0170491 * l.z, z: -92345e-7 * l.x + 0.0150436 * l.y + 0.7521316 * l.z, a: l.a };
  }({ x: 100 * (0.4124564 * e + 0.3575761 * t + 0.1804375 * a), y: 100 * (0.2126729 * e + 0.7151522 * t + 0.072175 * a), z: 100 * (0.0193339 * e + 0.119192 * t + 0.9503041 * a), a: r.a }));
}, ot = 216 / 24389, qe = 24389 / 27, ur = function(r) {
  var e = Hn(r), t = e.x / Rt, a = e.y / Pt, l = e.z / jt;
  return t = t > ot ? Math.cbrt(t) : (qe * t + 16) / 116, { l: 116 * (a = a > ot ? Math.cbrt(a) : (qe * a + 16) / 116) - 16, a: 500 * (t - a), b: 200 * (a - (l = l > ot ? Math.cbrt(l) : (qe * l + 16) / 116)), alpha: e.a };
}, xn = function(r, e, t) {
  var a, l = ur(r), v = ur(e);
  return function(y) {
    var n = (y.l + 16) / 116, o = y.a / 500 + n, m = n - y.b / 200;
    return Un({ x: (Math.pow(o, 3) > ot ? Math.pow(o, 3) : (116 * o - 16) / qe) * Rt, y: (y.l > 8 ? Math.pow((y.l + 16) / 116, 3) : y.l / qe) * Pt, z: (Math.pow(m, 3) > ot ? Math.pow(m, 3) : (116 * m - 16) / qe) * jt, a: y.alpha });
  }({ l: je((a = { l: l.l * (1 - t) + v.l * t, a: l.a * (1 - t) + v.a * t, b: l.b * (1 - t) + v.b * t, alpha: l.alpha * (1 - t) + v.alpha * t }).l, 0, 400), a: a.a, b: a.b, alpha: je(a.alpha) });
};
function Zn(r) {
  function e(t, a, l) {
    l === void 0 && (l = 5);
    for (var v = [], y = 1 / (l - 1), n = 0; n <= l - 1; n++) v.push(t.mix(a, y * n));
    return v;
  }
  r.prototype.mix = function(t, a) {
    a === void 0 && (a = 0.5);
    var l = t instanceof r ? t : new r(t), v = xn(this.toRgb(), l.toRgb(), a);
    return new r(v);
  }, r.prototype.tints = function(t) {
    return e(this, "#fff", t);
  }, r.prototype.shades = function(t) {
    return e(this, "#000", t);
  }, r.prototype.tones = function(t) {
    return e(this, "#808080", t);
  };
}
jn([Zn]);
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
le(ze, "generateForegroundColorFrom", (e, t = 0.8) => De(e).mix(De(e).isDark() ? "white" : "black", t).toHslString());
const Ne = class Ne {
  static getId(e) {
    return e.id ?? Object.entries(e).map(([t, a]) => `${String(a).replace(/[^a-zA-Z0-9]/g, "")}`).join("");
  }
  static getEventMetadata(e, t, a, l, v, y, n) {
    const o = ae.DateTime.fromISO(e.start_date).setZone(y).setLocale(n), m = ae.DateTime.fromISO(e.end_date).setZone(y).setLocale(n), I = o.diff(t, "minutes").minutes / l.as("minutes"), N = v * I, k = v * (m.diff(o, "minutes").minutes / l.as("minutes")), U = N * 100 / a, A = k * 100 / a, M = U + A;
    return {
      eventStartPercentage: U,
      eventHeightPercentage: A,
      eventEndPercentage: M,
      start: o,
      end: m,
      start_date: e.start_date,
      end_date: e.end_date
    };
  }
  static getEventTimeFromPercentage(e, t, a, l, v) {
    const o = e / 100 * a / v * l.as("minutes");
    return t.plus({ minutes: o });
  }
};
le(Ne, "getRandomInt", (e, t) => Math.floor(Math.random() * (t - e)) + e), le(Ne, "fakeEvents", () => {
  const e = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"], t = ["Team Meeting", "Client Call", "Code Review", "Marketing Strategy", "Design Sync"], a = ["Conference Room A", "Zoom", "Office 1", "Office 2", "Online"], l = [
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
  ], y = [], n = /* @__PURE__ */ new Date();
  for (let o = 0; o < 13; o++) {
    const m = Ne.getRandomInt(1, 7), f = Ne.getRandomInt(8, 18), I = Ne.getRandomInt(1, 3), N = new Date(n);
    N.setDate(n.getDate() + m - n.getDay()), N.setHours(f, 0, 0, 0);
    const k = new Date(N);
    k.setHours(f + I);
    const U = {
      id: `${ae.DateTime.now().toMillis().toString()}-${o}`,
      title: t[Ne.getRandomInt(0, t.length)],
      start_date: N.toISOString(),
      end_date: k.toISOString(),
      location: a[Ne.getRandomInt(0, a.length)],
      description: l[Ne.getRandomInt(0, l.length)],
      allDay: !1,
      color: e[Ne.getRandomInt(0, e.length)],
      attendees: v[Ne.getRandomInt(0, v.length)]
    };
    y.push(U);
  }
  return y;
});
let Re = Ne;
class zn {
  static detectCorner(e, t) {
    const a = t.getBoundingClientRect(), l = e.clientX - a.left, v = e.clientY - a.top, y = 20;
    let n;
    return l < y && v < y ? (n = "top-left", t.style.cursor = "nw-resize") : l > a.width - y && v < y ? (n = "top-right", t.style.cursor = "ne-resize") : l < y && v > a.height - y ? (n = "bottom-left", t.style.cursor = "sw-resize") : l > a.width - y && v > a.height - y ? (n = "bottom-right", t.style.cursor = "se-resize") : (n = null, t.style.cursor = "default"), n;
  }
}
class lr {
  constructor({
    cornerThreshold: e = 20
  } = {}) {
    le(this, "cornerThreshold");
    le(this, "isResizing", !1);
    le(this, "currentCorner", null);
    this.cornerThreshold = e;
  }
  listen(e, t) {
    const a = e.getBoundingClientRect(), l = a.width, v = a.height;
    let y = 0, n = 0;
    new Yn().observe(e, () => {
      const f = e.getBoundingClientRect(), I = f.width, N = f.height;
      y = (I - l) / l * 100, n = (N - v) / v * 100;
    }), e.addEventListener("mousedown", (m) => {
      this.currentCorner = zn.detectCorner(m, e), this.currentCorner && (this.isResizing = !0);
    }), document.addEventListener("mouseup", (m) => {
      e.style.cursor = "default", this.isResizing && (y != 0 || n != 0) && (this.isResizing = !1, t({
        percentW: y,
        percentH: n
      }));
    });
  }
}
class Yn {
  constructor() {
    le(this, "_lastWidth");
    le(this, "_lastHeight");
  }
  observe(e, t) {
    new ResizeObserver((a) => {
      if (a != null && a.length > 0) {
        const l = a[0].target.clientWidth, v = a[0].target.clientHeight;
        if (l != null && l > 0 && v != null && v > 0) {
          let y = l != this._lastWidth && this._lastWidth > 0 || v != this._lastHeight && this._lastHeight > 0;
          this._lastHeight = v, this._lastWidth = l, y && t();
        }
      }
    }).observe(e);
  }
}
class Gn {
  constructor({
    timezone: e = ae.DateTime.local().zoneName,
    selectedDate: t = ae.DateTime.local().toISODate(),
    language: a = navigator.language || "en-US",
    view: l = "month",
    // Default view,
    tHeaderOption: v = {},
    tyxWeekOption: y = {},
    disableDefaultEventClick: n = !1,
    settings: o = {}
  } = {}) {
    le(this, "resizer");
    le(this, "instance");
    le(this, "timezone");
    le(this, "selectedDate");
    le(this, "startDate");
    le(this, "endDate");
    le(this, "language");
    le(this, "disableDefaultEventClick");
    le(this, "daysOfWeek");
    le(this, "events");
    // Event storage
    le(this, "eventInstances");
    // Event storage
    le(this, "view");
    // Current view
    le(this, "tHeaderOption");
    le(this, "tyxWeekOption");
    le(this, "settings");
    le(this, "isMobile", window.matchMedia("(max-width: 600px)").matches);
    le(this, "onDayClicked");
    le(this, "onTEventClicked");
    le(this, "onTEventUpdated");
    le(this, "onBordersChanged");
    this.timezone = e, this.language = a, this.events = {}, this.eventInstances = {}, this.view = l, this.tHeaderOption = {
      currentMonthFormat: "MMMM yyyy",
      dayFormat: "ccc",
      ...v
    }, this.tyxWeekOption = {
      timeSlotInterval: 60,
      startHourOfDay: 0,
      endHourOfDay: 24,
      timeSlotHeight: 100,
      ...y
    }, this.selectedDate = ae.DateTime.fromISO(t).setZone(this.timezone), this.startDate = this.selectedDate.startOf(l.toString()), this.endDate = this.selectedDate.endOf(l.toString()), this.daysOfWeek = this._getDayHeaders(), this.disableDefaultEventClick = n, this.resizer = new lr(), this.settings = {
      handleEvents: o.handleEvents ?? !0,
      smallView: o.smallView,
      ...o
    };
  }
  adjustGridClass() {
    var t;
    const e = document.querySelector(".calendar");
    ((t = this.settings) == null ? void 0 : t.smallView) === !0 ? (this.isMobile = !0, e == null || e.classList.add("small-grid"), e == null || e.classList.remove("large-grid")) : window.innerWidth <= 600 ? (this.isMobile = !0, e == null || e.classList.add("small-grid"), e == null || e.classList.remove("large-grid")) : (this.isMobile = !1, e == null || e.classList.add("large-grid"), e == null || e.classList.remove("small-grid"));
  }
  mount(e) {
    this.instance = document.querySelector(e), this.instance.classList.add("calendar"), this._render(), window.addEventListener("resize", () => {
      this.adjustGridClass();
    }), this.adjustGridClass();
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
    var a;
    this.selectedDate = e, this.startDate = e.startOf(this.view), this.endDate = e.endOf(this.view), (a = this.onBordersChanged) == null || a.call(this, this.startDate, this.endDate), this._render(t);
  }
  _render(e) {
    var v, y, n;
    this._updateEventInstances(), this.instance.innerHTML = "";
    const t = this._createHeader();
    (v = this.instance) == null || v.appendChild(t);
    const a = document.createElement("div");
    a.className = "calendar-content", (y = this.instance) == null || y.appendChild(a);
    const l = document.createElement("div");
    l.className = "calendar-grid", this.view === "month" ? this._renderMonthView(l) : this.view === "week" ? (this._renderDayHeaders(), this._renderWeekView(l)) : this.view === "day" && this._renderDayView(l), l.classList.remove("fade-in"), l.classList.add("fade-out"), l.classList.add(e && e < 0 ? "direction-left" : "direction-right"), a.appendChild(l), (n = this.instance) == null || n.appendChild(a), this._renderEventLists(), setTimeout(() => {
      l.classList.remove("fade-out"), l.classList.add("fade-in"), this.adjustGridClass();
    }, 100);
  }
  _createHeader() {
    const e = document.createElement("header");
    e.className = "calendar-header";
    const t = document.createElement("button");
    t.className = "prev-month", t.innerText = "◀", t.addEventListener("click", () => this._changeMonth(-1));
    const a = document.createElement("h2");
    a.className = "current-month", a.innerText = this.view === "month" ? this.startDate.setLocale(this.language).toFormat(this.tHeaderOption.currentMonthFormat) : `${this.startDate.startOf("week").toLocaleString(ae.DateTime.DATE_FULL)} - ${this.startDate.endOf("week").toLocaleString(ae.DateTime.DATE_FULL)}`;
    const l = document.createElement("button");
    return l.className = "next-month", l.innerText = "▶", l.addEventListener("click", () => this._changeMonth(1)), e.appendChild(t), e.appendChild(a), e.appendChild(l), e;
  }
  _renderMonthView(e) {
    var v;
    this._removeViewClass(), (v = document.querySelector(".calendar")) == null || v.classList.add("month");
    const t = document.createElement("div");
    t.className = "month-header", this.daysOfWeek.forEach((y) => {
      const n = document.createElement("div");
      n.className = "day-header", n.innerText = y.dayName, t.appendChild(n);
    }), e.appendChild(t);
    const a = this._getDatesForMonth(), l = document.createElement("div");
    l.className = "month-grid", a.forEach(({ date: y, isPrevious: n, isNext: o }) => {
      const m = this._createDateCell({ date: y, isPrevious: n, isNext: o });
      l.appendChild(m);
    }), e.appendChild(l);
  }
  _renderEventLists() {
    var v;
    if (this.view != "month" || ((v = this.settings) == null ? void 0 : v.handleEvents) == !1) return;
    const e = document.querySelector(".event-list") || document.createElement("div");
    if (e.innerHTML = "", e.className = "event-list", e.childNodes.forEach((y) => y.remove()), this.selectedDate == null) return;
    const t = this.selectedDate.toISODate();
    (this.eventInstances[t] || []).forEach((y) => {
      const n = document.createElement("div");
      n.className = "event-item";
      let o = y.color ?? getComputedStyle(document.body).getPropertyValue("--tyx-primary-color");
      n.style.backgroundColor = ze.generateEventBgColor(o), n.style.borderLeftColor = ze.generateEventBorderColor(o), n.style.color = ze.generateEventTitleColor(o);
      const m = document.createElement("div");
      m.className = "event-title", m.innerText = `${y.title}${y.recurrence ? "🔁" : ""}`, n.appendChild(m);
      const f = document.createElement("div");
      f.className = "event-time", f.innerText = `${ae.DateTime.fromISO(y.start_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")} - ${ae.DateTime.fromISO(y.end_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")}`, n.appendChild(f), n.addEventListener("click", (I) => {
        I.stopPropagation(), this._handleTEventClick(y, I.target);
      }), e.appendChild(n);
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
      const b = document.createElement("div");
      b.className = "tyx__week-day-header";
      const j = document.createElement("div");
      j.className = "tyx__week-day-name", j.innerText = T.dayName, b.appendChild(j);
      const D = document.createElement("span");
      D.className = "tyx__week-day-date", D.innerText = T.date.day.toString(), b.appendChild(D), t.appendChild(b);
    }), document.querySelector(".calendar-content").appendChild(t);
    const l = document.createElement("div");
    l.className = "tyx__week-grid";
    const v = document.createElement("div");
    v.className = "tyx__week-grid__time-axis", l.appendChild(v);
    const y = ae.Duration.fromObject({ minute: this.tyxWeekOption.timeSlotInterval }), n = ae.DateTime.fromObject({ hour: this.tyxWeekOption.startHourOfDay }), o = ae.DateTime.fromObject({ hour: this.tyxWeekOption.endHourOfDay }), f = o.diff(n, "minutes").as("minutes") / y.as("minutes") + 1, I = this.tyxWeekOption.timeSlotHeight, N = f * I, k = document.documentElement;
    k.style.setProperty("--tyx-calendar-week-grid-height", `${N}px`), k.style.setProperty("--tyx-calendar-week-grid-slot-height", `${I}px`), k.style.setProperty("--tyx-calendar-week-grid-padding-top", "15px");
    let A = n;
    for (; A < o; ) {
      const T = document.createElement("div");
      T.className = "tyx__week-grid__time", T.setAttribute("time", `${A.toFormat("HH:mm")}`);
      const b = document.createElement("span");
      b.className = "tyx__week-grid__time-text", b.innerText = `${A.toFormat("HH:mm")}`, T.appendChild(b), v.appendChild(T), A = A.plus(y);
    }
    this._getDatesForWeek().forEach((T) => {
      const b = ae.DateTime.fromObject({ day: T.day, month: T.month, year: T.year, hour: this.tyxWeekOption.startHourOfDay }), j = document.createElement("div");
      j.className = "tyx__week-grid__day", j.classList.add(`tyx__${T.toFormat("EEEE").toLowerCase()}`), j.setAttribute("data", T ? T.toISODate() : ""), j.setAttribute("day", T ? T.toFormat("ccc") : ""), l.appendChild(j);
      const D = this.eventInstances[T.toISODate()] || [];
      for (let S = 0; S < D.length; S++) {
        var p = D.map((V) => {
          var K = Re.getEventMetadata(
            V,
            b,
            N,
            y,
            I,
            this.timezone,
            this.language
          );
          return {
            start: K.eventStartPercentage,
            end: K.eventEndPercentage,
            event: V
          };
        });
        const C = D[S], P = document.createElement("div");
        P.addEventListener("click", (V) => {
          V.stopPropagation(), this._handleTEventClick(C, V.target);
        }), P.className = "tyx__week-grid__day-event";
        const O = Re.getEventMetadata(
          C,
          b,
          N,
          y,
          I,
          this.timezone,
          this.language
        );
        P.style.top = `${O.eventStartPercentage}%`, P.style.height = `${O.eventHeightPercentage}%`;
        let _ = p.filter((V) => V.start > O.eventStartPercentage && V.start < O.eventEndPercentage || V.end > O.eventStartPercentage && V.end < O.eventEndPercentage || Re.getId(C) == Re.getId(V.event));
        const R = _.findIndex((V) => Re.getId(C) == Re.getId(V.event));
        if (_ = _.filter((V) => Re.getId(C) != Re.getId(V.event)), _.length == 0)
          P.style.width = "calc(100%)";
        else {
          const K = 100 / (_.length + 1) * R;
          P.style.marginLeft = `calc(${K}%)`, P.style.width = `calc(${100 - K}%)`, P.style.zIndex = `${S + 1}`, P.classList.add("position-" + R);
        }
        let w = C.color ?? getComputedStyle(document.body).getPropertyValue("--tyx-primary-color");
        P.style.backgroundColor = ze.generateEventBgColor(w), P.style.borderLeftColor = ze.generateEventBorderColor(w), P.style.color = ze.generateEventTitleColor(w);
        const W = document.createElement("div");
        W.classList.add("tyx__week-grid__day-event-title"), W.innerText = `${C.title}`, P.appendChild(W), setTimeout(() => {
          new lr().listen(P, (V) => {
            var x;
            const K = ae.DateTime.fromISO(C.start_date).setZone(this.timezone).setLocale(this.language), X = ae.DateTime.fromISO(C.end_date).setZone(this.timezone).setLocale(this.language), Z = X.diff(K, "minutes"), L = X.plus({ minutes: Z.as("minutes") * V.percentH / 100 });
            C.end_date = L.toUTC().toISO(), console.log(` old:${K.toFormat("HH:mm")} - ${X.toFormat("HH:mm")} new:${K.toFormat("HH:mm")} - ${L.toFormat("HH:mm")}`), (x = this.onTEventUpdated) == null || x.call(this, C), this.closeModal();
          });
        }, 200);
        const Y = document.createElement("div");
        if (Y.classList.add("tyx__week-grid__day-event-time"), Y.innerText = `${O.start.toFormat("HH:mm")} - ${O.end.toFormat("HH:mm")}`, P.appendChild(Y), C.location) {
          const V = document.createElement("div");
          V.innerText = C.location, V.classList.add("tyx__week-grid__day-event-location"), P.appendChild(V);
        }
        j.appendChild(P);
      }
    }), e.appendChild(l);
  }
  _renderDayHeaders() {
    this.daysOfWeek = this._getDayHeaders();
  }
  _renderDayView(e) {
    var a;
    const t = document.createElement("div");
    t.className = "day-details", t.innerText = `Events for ${(a = this.selectedDate) == null ? void 0 : a.toLocaleString(ae.DateTime.DATE_FULL)}`, this._populateEventDetails(this.selectedDate, t), e.appendChild(t);
  }
  _createDateCell({ date: e, isPrevious: t, isNext: a }) {
    var m, f;
    const l = document.createElement("div"), v = e && e.toISODate() === ((m = this.selectedDate) == null ? void 0 : m.toISODate());
    l.className = `date-cell ${t ? "previous-date" : ""} ${a ? "next-date" : ""} ${v ? "selected-date" : ""}`;
    const y = ae.DateTime.now().setZone(this.timezone).startOf("day");
    e && e.toISODate() === y.toISODate() && l.classList.add("today"), l.setAttribute("data", e ? e.toISODate() : ""), l.setAttribute("day", e ? e.toFormat("ccc") : ""), l.addEventListener("click", () => this._handleDateClick(e));
    const o = document.createElement("div");
    return o.innerText = e ? e.day.toString() : "", l.appendChild(o), ((f = this.settings) == null ? void 0 : f.handleEvents) == !0 && this._populateEventDetails(e, l), l;
  }
  _getDayHeaders() {
    const e = [];
    if (this.view == "week")
      for (let l = 0; l <= 6; l++) {
        const v = this.startDate.plus({ days: l }), y = v.toFormat(this.tHeaderOption.dayFormat);
        e.push({
          dayName: y,
          date: v
        });
      }
    else
      for (let l = 1; l <= 7; l++) {
        const v = ae.DateTime.local(this.startDate.year, this.startDate.month, 1, { zone: this.timezone }).set({ weekday: l }).setLocale(this.language), y = v.toFormat(this.tHeaderOption.dayFormat);
        e.push({
          dayName: y,
          date: v
        });
      }
    return e;
  }
  _getDatesForMonth() {
    const e = [], t = ae.DateTime.local(this.startDate.year, this.startDate.month, 1, { zone: this.timezone }), a = t.endOf("month"), l = t.weekday, v = t.minus({ days: 1 }).endOf("month");
    for (let n = 0; n < l - 1; n++) {
      const o = v.minus({ days: n });
      e.push({ date: o, isPrevious: !0, isNext: !1 });
    }
    for (let n = 1; n <= a.day; n++)
      e.push({ date: ae.DateTime.local(this.startDate.year, this.startDate.month, n, { zone: this.timezone }), isPrevious: !1, isNext: !1 });
    const y = a.plus({ days: 1 }).startOf("month");
    for (let n = 1; n <= 7 - a.weekday; n++)
      e.push({ date: ae.DateTime.local(y.year, y.month, n, { zone: this.timezone }), isPrevious: !1, isNext: !0 });
    return e;
  }
  _getDatesForWeek() {
    const e = [], t = this.startDate.startOf("week");
    for (let a = 0; a < 7; a++)
      e.push(t.plus({ days: a }));
    return e;
  }
  _handleDateClick(e) {
    var a, l, v;
    if (e) {
      (a = document.querySelector(".selected-date")) == null || a.classList.remove("selected-date");
      var t = document.querySelector(`[data="${e.toISODate()}"]`);
      t != null && t.classList.contains("previous-date") ? this.gotoDate(e, -1) : t != null && t.classList.contains("next-date") && this.gotoDate(e, 1), this.selectedDate = e, (l = document.querySelector(`[data="${e.toISODate()}"]`)) == null || l.classList.add("selected-date"), this._renderEventLists(), (v = this.onDayClicked) == null || v.call(this, e, this.eventInstances[e.toISODate()] || []);
    }
  }
  _handleTEventClick(e, t) {
    var a;
    this.isMobile && this.view == "month" || (this.disableDefaultEventClick || (this.closeModal(), this.showEventModal(e, t)), (a = this.onTEventClicked) == null || a.call(this, e));
  }
  _populateEventDetails(e, t) {
    if (!e) return;
    const a = e.toISODate(), l = this.eventInstances[a] || [];
    if (l.length > 0) {
      const v = document.createElement("div");
      v.classList.add("event-list-large"), l.forEach((y) => {
        const n = document.createElement("div");
        let o = y.color ?? getComputedStyle(document.body).getPropertyValue("--tyx-primary-color");
        n.style.backgroundColor = ze.generateEventBgColor(o), n.style.color = ze.generateEventTitleColor(o), n.className = "event-item", n.addEventListener("click", (k) => {
          this.isMobile && this.view == "month" || k.stopPropagation(), this._handleTEventClick(y, k.target);
        });
        const m = document.createElement("div");
        m.className = "event-details", n.appendChild(m);
        const f = document.createElement("div");
        f.className = "event-title", f.innerText = `${ae.DateTime.fromISO(y.start_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")} - ${y.title}`, m.appendChild(f);
        const I = document.createElement("div");
        I.className = "event-time", I.innerText = `${ae.DateTime.fromISO(y.start_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")} - ${ae.DateTime.fromISO(y.end_date).setZone(this.timezone).setLocale(this.language).toFormat("HH:mm a")}`, m.appendChild(I);
        const N = document.createElement("div");
        N.className = "event-marker", N.style.backgroundColor = o, n.appendChild(N), v.appendChild(n);
      }), t.appendChild(v);
    }
  }
  _updateEventInstances() {
    this.eventInstances = {};
    const e = Object.values(this.events).flatMap((t) => t);
    for (const t of e)
      t.recurrence ? kt(t.recurrence).between(this.startDate.toJSDate(), this.endDate.toJSDate(), !0).map((y) => ae.DateTime.fromJSDate(y).setZone(this.timezone)).forEach((y) => {
        var n = ae.DateTime.fromISO(t.start_date).setZone(this.timezone), o = ae.DateTime.fromObject({ year: y.year, month: y.month, day: y.day, hour: n.hour, minute: n.minute }), m = ae.DateTime.fromISO(t.end_date).setZone(this.timezone), f = m.diff(n, "minutes"), I = {
          start_date: o.toISO(),
          end_date: o.plus(f).toISO(),
          title: t.title,
          location: t.location,
          description: t.description,
          attendees: t.attendees,
          allDay: t.allDay,
          recurrence: t.recurrence
        };
        this.addEventInstance(I, this.eventInstances);
      }) : this.addEventInstance(t, this.eventInstances);
  }
  addEvent(e) {
    this.addEventInstance(e, this.events), this._render();
  }
  addEventInstance(e, t) {
    const a = ae.DateTime.fromISO(e.start_date).setZone(this.timezone), l = ae.DateTime.fromISO(e.end_date).setZone(this.timezone);
    let v = a.startOf("day");
    for (; v <= l.startOf("day"); ) {
      const y = v.toISODate();
      t[y] || (t[y] = []);
      let n = v.equals(a.startOf("day")) ? a : v.startOf("day"), o = v.equals(l.startOf("day")) ? l : v.endOf("day");
      t[y].push({
        ...e,
        start_date: n.toUTC().toISO(),
        // Adjusted start date for this segment
        end_date: o.toUTC().toISO()
        // Adjusted end date for this segment
      }), t[y].sort((m, f) => ae.DateTime.fromISO(m.start_date).toMillis() - ae.DateTime.fromISO(f.start_date).toMillis()), v = v.plus({ days: 1 });
    }
  }
  addAllEvents(e) {
    for (let t = 0; t < e.length; t++)
      this.addEvent(e[t]);
  }
  // Function to show event details in a modal
  showEventModal(e, t) {
    var T;
    const a = document.createElement("div");
    a.id = "tyx-modal-overlay", a.className = "tyx-modal-overlay";
    const l = document.createElement("div");
    l.id = "tyx-event-modal", l.classList.add("tyx-modal");
    const v = document.createElement("div");
    v.id = "tyx-modal-content", v.classList.add("tyx-modal-content");
    const y = document.createElement("h2");
    y.id = "tyx-modal-title", y.innerHTML = e.title, v.appendChild(y);
    const n = document.createElement("p");
    if (n.id = "tyx-modal-time", n.innerHTML = `${ae.DateTime.fromISO(e.start_date).setZone(this.timezone).toFormat("HH:mm a")} - ${ae.DateTime.fromISO(e.end_date).setZone(this.timezone).toFormat("HH:mm a")}`, v.appendChild(n), e.description) {
      const b = document.createElement("p");
      b.id = "tyx-modal-description", b.innerHTML = e.description, v.appendChild(b);
    }
    if (e.location) {
      const b = document.createElement("p");
      b.id = "tyx-modal-location", b.innerHTML = e.location, v.appendChild(b);
    }
    if (e.attendees) {
      const b = document.createElement("p");
      b.id = "tyx-modal-attendees", (T = e.attendees) == null || T.forEach((j) => {
        const D = document.createElement("span");
        D.innerHTML = j, b.appendChild(D);
      }), v.appendChild(b);
    }
    l.appendChild(v), document.body.appendChild(l), document.body.appendChild(a);
    const o = t.getBoundingClientRect(), m = l.getBoundingClientRect(), f = m.width, I = m.height, N = o.left + f <= window.innerWidth, k = o.left >= f, U = o.top >= I, A = o.bottom + I <= window.innerHeight;
    let M, h;
    A && N ? (M = o.bottom + window.scrollY, h = o.right) : A && k ? (M = o.bottom + window.scrollY, h = o.left - f) : U && N ? (M = o.top + window.scrollY - I, h = o.right) : U && k ? (M = o.top + window.scrollY - I, h = o.left - f) : N ? (M = o.top + window.scrollY, h = o.right) : k ? (M = o.top + window.scrollY, h = o.left - f) : A ? (M = o.bottom + window.scrollY, h = o.left) : U ? (M = o.top + window.scrollY - I, h = o.left) : (M = o.bottom + window.scrollY, h = o.left), l.style.position = "absolute", l.style.top = `${M}px`, l.style.left = `${h}px`, setTimeout(() => {
      a.classList.add("tyx-modal-show"), l.classList.add("tyx-modal-show");
    }, 10), a.addEventListener("click", (b) => {
      this.closeModal();
    });
  }
  closeModal() {
    const e = document.getElementById("tyx-event-modal"), t = document.getElementById("tyx-modal-overlay");
    e && t && (e.classList.remove("tyx-modal-show"), e.classList.add("tyx-modal-hide"), t.classList.remove("tyx-modal-show"), t.classList.add("tyx-modal-hide"), setTimeout(() => {
      e.remove(), t.remove();
    }, 300));
  }
}
export { Re as EventUtils, Gn as TimelyX };
