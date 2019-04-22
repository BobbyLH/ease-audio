/* ease-audio */
(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports):typeof define==='function'&&define.amd?define(['exports'],f):(g=g||self,f(g.EaseAudio={}));}(this,function(exports){'use strict';function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.2' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};var defineProperty$1 = defineProperty;function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$1(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;var AudioCtx =
/*#__PURE__*/
function () {
  function AudioCtx(config) {
    classCallCheck(this, AudioCtx);
  }

  createClass(AudioCtx, [{
    key: "init",
    value: function init() {}
  }, {
    key: "play",
    value: function play() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "toggle",
    value: function toggle() {}
  }, {
    key: "load",
    value: function load() {}
  }, {
    key: "seek",
    value: function seek() {}
  }, {
    key: "volume",
    value: function volume() {}
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "unload",
    value: function unload() {}
  }, {
    key: "on",
    value: function on() {}
  }, {
    key: "off",
    value: function off() {}
  }, {
    key: "once",
    value: function once() {}
  }, {
    key: "cut",
    value: function cut() {}
  }, {
    key: "pick",
    value: function pick() {}
  }, {
    key: "rate",
    value: function rate() {}
  }, {
    key: "model",
    value: function model() {}
  }, {
    key: "mute",
    value: function mute() {}
  }, {
    key: "playlist",
    value: function playlist() {}
  }]);

  return AudioCtx;
}();// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};var _library = true;var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'pure',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});var keys = _core.Object.keys;var keys$1 = keys;var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

var _bind = Function.bind || function bind(that /* , ...args */) {
  var fn = _aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
  };
  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







var rConstruct = (_global.Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = _fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !_fails(function () {
  rConstruct(function () { /* empty */ });
});

_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    _aFunction(Target);
    _anObject(args);
    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (_bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return _isObject(result) ? result : instance;
  }
});var construct$1 = _core.Reflect.construct;var construct$2 = construct$1;var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};var gOPD = Object.getOwnPropertyDescriptor;

var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$2
};// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};// 19.1.3.19 Object.setPrototypeOf(O, proto)

_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });var setPrototypeOf = _core.Object.setPrototypeOf;var setPrototypeOf$1 = setPrototypeOf;var setPrototypeOf$2 = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = setPrototypeOf$1 || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});var construct$3 = createCommonjsModule(function (module) {
function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !construct$2) return false;
  if (construct$2.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(construct$2(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = construct$2;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf$2(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
});// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


_export(_export.S, 'Array', { isArray: _isArray });var isArray = _core.Array.isArray;var isArray$1 = isArray;function _arrayWithoutHoles(arr) {
  if (isArray$1(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};var _redefine = _hide;var _iterators = {};var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});var from_1 = _core.Array.from;var from_1$1 = from_1;var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = _global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
  _iterators[NAME] = _iterators.Array;
}var ITERATOR$4 = _wks('iterator');

var core_isIterable = _core.isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR$4] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || _iterators.hasOwnProperty(_classof(O));
};var isIterable = core_isIterable;var isIterable$1 = isIterable;function _iterableToArray(iter) {
  if (isIterable$1(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return from_1$1(iter);
}

var iterableToArray = _iterableToArray;function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

var $getOwnPropertyDescriptor = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(_toIobject(it), key);
  };
});var $Object$1 = _core.Object;
var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  return $Object$1.getOwnPropertyDescriptor(it, key);
};var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor;var _meta = createCommonjsModule(function (module) {
var META = _uid('meta');


var setDesc = _objectDp.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;var f$3 = _wks;

var _wksExt = {
	f: f$3
};var defineProperty$2 = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
};var f$4 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$4
};// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$5
};// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$6 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
	f: f$6
};// ECMAScript 6 symbols shim





var META = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto$1, key);
  if (protoDesc) delete ObjectProto$1[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$1;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$1) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor$1;
  _objectDp.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;var getOwnPropertySymbols$1 = getOwnPropertySymbols;function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$1(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty$3 = _defineProperty;function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = keys$1(source);

    if (typeof getOwnPropertySymbols$1 === 'function') {
      ownKeys = ownKeys.concat(getOwnPropertySymbols$1(source).filter(function (sym) {
        return getOwnPropertyDescriptor$1(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty$3(target, key, source[key]);
    });
  }

  return target;
}

var objectSpread = _objectSpread;// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
_export(_export.S, 'Object', { create: _objectCreate });var $Object$2 = _core.Object;
var create = function create(P, D) {
  return $Object$2.create(P, D);
};var create$1 = create;// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });var assign = _core.Object.assign;var assign$1 = assign;var HAS_INSTANCE = _wks('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !_isObject(O)) return false;
  if (!_isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = _objectGpo(O)) if (this.prototype === O) return true;
  return false;
} });var hasInstance = _wksExt.f('hasInstance');var hasInstance$1 = hasInstance;_wksDefine('asyncIterator');_wksDefine('observable');var symbol = _core.Symbol;var symbol$1 = symbol;function _instanceof(left, right) {
  if (right != null && typeof symbol$1 !== "undefined" && right[hasInstance$1]) {
    return right[hasInstance$1](left);
  } else {
    return left instanceof right;
  }
}

var _instanceof_1 = _instanceof;var _anInstance = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};var _forOf = createCommonjsModule(function (module) {
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
  var f = _ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = _iterCall(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});// 7.3.20 SpeciesConstructor(O, defaultConstructor)


var SPECIES = _wks('species');
var _speciesConstructor = function (O, D) {
  var C = _anObject(O).constructor;
  var S;
  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
};var process = _global.process;
var setTask = _global.setImmediate;
var clearTask = _global.clearImmediate;
var MessageChannel = _global.MessageChannel;
var Dispatch = _global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (_cof(process) == 'process') {
    defer = function (id) {
      process.nextTick(_ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(_ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = _ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
    defer = function (id) {
      _global.postMessage(id + '', '*');
    };
    _global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
    defer = function (id) {
      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
        _html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(_ctx(run, id, 1), 0);
    };
  }
}
var _task = {
  set: setTask,
  clear: clearTask
};var macrotask = _task.set;
var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
var process$1 = _global.process;
var Promise = _global.Promise;
var isNode = _cof(process$1) == 'process';

var _microtask = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process$1.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(_global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};// 25.4.1.5 NewPromiseCapability(C)


function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = _aFunction(resolve);
  this.reject = _aFunction(reject);
}

var f$7 = function (C) {
  return new PromiseCapability(C);
};

var _newPromiseCapability = {
	f: f$7
};var _perform = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};var navigator = _global.navigator;

var _userAgent = navigator && navigator.userAgent || '';var _promiseResolve = function (C, x) {
  _anObject(C);
  if (_isObject(x) && x.constructor === C) return x;
  var promiseCapability = _newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};var _redefineAll = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else _hide(target, key, src[key]);
  } return target;
};var SPECIES$1 = _wks('species');

var _setSpecies = function (KEY) {
  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
    configurable: true,
    get: function () { return this; }
  });
};var task = _task.set;
var microtask = _microtask();




var PROMISE = 'Promise';
var TypeError$1 = _global.TypeError;
var process$2 = _global.process;
var versions = process$2 && process$2.versions;
var v8 = versions && versions.v8 || '';
var $Promise = _global[PROMISE];
var isNode$1 = _classof(process$2) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

var USE_NATIVE$1 = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && _userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(_global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = _perform(function () {
        if (isNode$1) {
          process$2.emit('unhandledRejection', value, promise);
        } else if (handler = _global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = _global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(_global, function () {
    var handler;
    if (isNode$1) {
      process$2.emit('rejectionHandled', promise);
    } else if (handler = _global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE$1) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    _anInstance(this, $Promise, PROMISE, '_h');
    _aFunction(executor);
    Internal.call(this);
    try {
      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = _redefineAll($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode$1 ? process$2.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = _ctx($resolve, promise, 1);
    this.reject = _ctx($reject, promise, 1);
  };
  _newPromiseCapability.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
_setToStringTag($Promise, PROMISE);
_setSpecies(PROMISE);
Wrapper = _core[PROMISE];

// statics
_export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
_export(_export.S + _export.F * (_library || !USE_NATIVE$1), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
  }
});
_export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = _perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      _forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = _perform(function () {
      _forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return _promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return _promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });// https://github.com/tc39/proposal-promise-try




_export(_export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = _newPromiseCapability.f(this);
  var result = _perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });var promise = _core.Promise;var promise$1 = promise;var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON$1.stringify.apply($JSON$1, arguments);
};var stringify$1 = stringify;function getUA(u) {
  if (!u) return false;
  var ua = {
    edge: u.indexOf('Edge') > -1,
    trident: u.indexOf('Trident') > -1,
    presto: u.indexOf('Presto') > -1,
    webKit: u.indexOf('AppleWebKit') > -1,
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g),
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    iPhone: u.indexOf('iPhone') > -1,
    iPad: u.indexOf('iPad') > -1,
    webApp: u.indexOf('Safari') === -1,
    weixin: u.indexOf('MicroMessenger') > -1,
    weibo: u.indexOf('Weibo') > -1,
    facebook: u.indexOf('FBAN') > -1,
    twitter: u.indexOf('Twitter') > -1,
    instagram: u.indexOf('Instagram') > -1,
    qq: !!u.match(/\sQQ/i),
    hmlyApp: /himalaya/i.test(u)
  };
  return ua;
}var ua;

if (typeof window !== 'undefined') {
  try {
    ua = getUA(window.navigator.userAgent);
  } catch (error) {
    console.error("[IE]: ".concat(error));
  }
}

var isIE = ua && ua.trident;
var isEdge = ua && ua.edge;var addListener = function () {
  if (typeof window === 'undefined') return function () {};

  if (!window.addEventListener) {
    return function (event, fn, dom) {
      var eventDOM = dom || window;
      eventDOM.attachEvent("on".concat(event), fn);
    };
  }

  return function (event, fn, dom) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var eventDOM = dom || window;
    eventDOM.addEventListener(event, fn, useCapture);
  };
}();var removeListener = function () {
  if (typeof window === 'undefined') return function () {};

  if (!window.removeEventListener) {
    return function (event, fn, dom) {
      var eventDOM = dom || window;
      eventDOM.detachEvent("on".concat(event), fn);
    };
  }

  return function (event, fn, dom) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var eventDOM = dom || window;
    eventDOM.removeEventListener(event, fn, useCapture);
  };
}();var getType = function getType(ele) {
  if (typeof ele !== 'object') return typeof ele;
  var len = Object.prototype.toString.call(ele).length - 1;
  return Object.prototype.toString.call(ele).slice(8, len).toLowerCase();
};var playStateSet;

(function (playStateSet) {
  playStateSet[playStateSet["loading"] = 0] = "loading";
  playStateSet[playStateSet["playing"] = 1] = "playing";
  playStateSet[playStateSet["paused"] = 2] = "paused";
  playStateSet[playStateSet["stopped"] = 3] = "stopped";
  playStateSet[playStateSet["ended"] = 4] = "ended";
  playStateSet[playStateSet["finished"] = 5] = "finished";
  playStateSet[playStateSet["loaderror"] = 6] = "loaderror";
  playStateSet[playStateSet["playerror"] = 7] = "playerror";
  playStateSet[playStateSet["unloaded"] = 8] = "unloaded";
  playStateSet[playStateSet["loaded"] = 9] = "loaded";
})(playStateSet || (playStateSet = {}));

var playModelSet;

(function (playModelSet) {
  playModelSet[playModelSet["list-once"] = 0] = "list-once";
  playModelSet[playModelSet["list-random"] = 1] = "list-random";
  playModelSet[playModelSet["list-loop"] = 2] = "list-loop";
  playModelSet[playModelSet["single-once"] = 3] = "single-once";
  playModelSet[playModelSet["single-loop"] = 4] = "single-loop";
})(playModelSet || (playModelSet = {}));

var supportEvents;

(function (supportEvents) {
  supportEvents[supportEvents["onplay"] = 0] = "onplay";
  supportEvents[supportEvents["onpause"] = 1] = "onpause";
  supportEvents[supportEvents["onstop"] = 2] = "onstop";
  supportEvents[supportEvents["onend"] = 3] = "onend";
  supportEvents[supportEvents["onfinish"] = 4] = "onfinish";
  supportEvents[supportEvents["onload"] = 5] = "onload";
  supportEvents[supportEvents["onunload"] = 6] = "onunload";
  supportEvents[supportEvents["oncanplay"] = 7] = "oncanplay";
  supportEvents[supportEvents["oncanplaythrough"] = 8] = "oncanplaythrough";
  supportEvents[supportEvents["onprogress"] = 9] = "onprogress";
  supportEvents[supportEvents["onvolume"] = 10] = "onvolume";
  supportEvents[supportEvents["onseeking"] = 11] = "onseeking";
  supportEvents[supportEvents["onseeked"] = 12] = "onseeked";
  supportEvents[supportEvents["onrate"] = 13] = "onrate";
  supportEvents[supportEvents["ontimeupdate"] = 14] = "ontimeupdate";
  supportEvents[supportEvents["onloaderror"] = 15] = "onloaderror";
  supportEvents[supportEvents["onplayerror"] = 16] = "onplayerror";
  supportEvents[supportEvents["oncut"] = 17] = "oncut";
  supportEvents[supportEvents["onpick"] = 18] = "onpick";
})(supportEvents || (supportEvents = {}));

var uselessEvents;

(function (uselessEvents) {
  uselessEvents[uselessEvents["finish"] = 0] = "finish";
  uselessEvents[uselessEvents["playerror"] = 1] = "playerror";
  uselessEvents[uselessEvents["cut"] = 2] = "cut";
  uselessEvents[uselessEvents["pick"] = 3] = "pick";
  uselessEvents[uselessEvents["play"] = 4] = "play";
  uselessEvents[uselessEvents["abort"] = 5] = "abort";
  uselessEvents[uselessEvents["suspend"] = 6] = "suspend";
})(uselessEvents || (uselessEvents = {}));

var logLevelSet;

(function (logLevelSet) {
  logLevelSet[logLevelSet["detail"] = 0] = "detail";
  logLevelSet[logLevelSet["info"] = 1] = "info";
  logLevelSet[logLevelSet["warn"] = 2] = "warn";
  logLevelSet[logLevelSet["error"] = 3] = "error";
  logLevelSet[logLevelSet["silent"] = 4] = "silent";
})(logLevelSet || (logLevelSet = {}));

var defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
var AudioH5 =
/*#__PURE__*/
function () {
  function AudioH5(config) {
    classCallCheck(this, AudioH5);

    this.isInit = false;
    this.init = this.init.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.toggle = this.toggle.bind(this);
    this.cut = this.cut.bind(this);
    this.pick = this.pick.bind(this);
    this.load = this.load.bind(this);
    this.seek = this.seek.bind(this);
    this.rate = this.rate.bind(this);
    this.volume = this.volume.bind(this);
    this.mute = this.mute.bind(this);
    this.stop = this.stop.bind(this);
    this.unload = this.unload.bind(this);
    this.model = this.model.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.once = this.once.bind(this);
    this.playlist = this.playlist.bind(this);
    this.init(config);
  }

  createClass(AudioH5, [{
    key: "init",
    value: function init(config) {
      if (!this.isInit && config && this._checkType(config, 'object') && stringify$1(config) !== '{}') {
        this._initial(config);

        this._registerEvent(config);

        return this._returnParams();
      }
    }
  }, {
    key: "play",
    value: function play() {
      var _this = this;

      if (this._checkInit()) {
        if (!this.playLocker) {
          try {
            if (this.audioH5.src === defaultSrc) {
              var err = 'Because the error src property, manual trigger load error event';
              return this.eventMethods && this.eventMethods.error(err);
            }

            this._blockEvent({
              block: false
            });

            var play = this.audioH5.play();

            if (play && typeof promise$1 !== 'undefined' && (_instanceof_1(play, promise$1) || typeof play.then === 'function')) {
              this.playLocker = true;
              play.then(function () {
                _this.playLocker = false;

                if (_this.lockQueue) {
                  _this.lockQueue.forEach(function (v) {
                    return v && v();
                  });

                  _this.lockQueue.splice(0);
                }
              }).catch(function (err) {
                _this.playLocker = false;

                if (_this.playErrLocker) {
                  _this.playErrLocker = false;
                  _this.lockQueue && _this.lockQueue.forEach(function (v) {
                    return v && v();
                  });
                } else {
                  if (_this.playState !== playStateSet.loaderror) {
                    _this.eventMethods && _this.eventMethods.playerror(err);
                  }
                }

                _this.lockQueue && _this.lockQueue.splice(0);
              });
            }

            if (this.audioH5.paused) {
              var _err = "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.";
              this.eventMethods && this.eventMethods.playerror(_err);
            }
          } catch (err) {
            if (!this.playErrLocker && this.playState !== playStateSet.loaderror) {
              this.eventMethods && this.eventMethods.playerror(err);
            } else {
              this.playErrLocker = false;
            }
          }
        } else if (this.lockTags && this.lockTags.pause_wait) {
          this.lockTags.pause_cancel = true;
        }

        return this.playId;
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this2 = this;

      if (this._checkInit()) {
        if (!this.lockTags.pause_wait) {
          this._playLockQueue(function (playLock) {
            _this2.lockTags.pause_wait = playLock;
            return function () {
              _this2.lockTags.pause_wait = false;

              if (_this2.lockTags.pause_cancel) {
                _this2.lockTags.pause_cancel = false;
                return;
              }

              _this2.audioH5.pause();
            };
          }(this.playLocker));
        } else {
          this.lockTags.pause_cancel = false;
        }

        return this.playId;
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this._checkInit() && this.playState !== playStateSet.loaderror && this.playState !== playStateSet.playerror && this.playState !== playStateSet.unloaded) {
        if (this.lockTags.pause_wait) {
          this.lockTags.pause_cancel = !this.lockTags.pause_cancel;
        } else {
          if (this.playState === null || this.playState === playStateSet.paused || this.playState === playStateSet.loaded) {
            this.play();
          } else {
            this.pause();
          }
        }

        return this.playId;
      }
    }
  }, {
    key: "cut",
    value: function cut() {
      if (this._checkInit()) {
        this._cut();

        return this._returnParams();
      }
    }
  }, {
    key: "pick",
    value: function pick(playId) {
      var _this3 = this;

      if (this._checkInit() && this._checkType(playId, 'number', true)) {
        for (var i = 0; i < this.playList.length; i++) {
          if (this.playList[i].playId === playId) {
            this._setPlayIndex(i);

            this._setPlayId();

            this.eventMethods && this.eventMethods.pick(this.playId);
            this.playErrLocker = true;

            this._abortLoad();

            this._commonLock('cutpick', function () {
              _this3.unload(true);

              var src = _this3.playList[_this3.playIndex].src;

              var config = assign$1(_this3.config, {
                src: src
              });

              _this3._createAudio(config);

              _this3._registerEvent(config);

              _this3.play();
            });

            break;
          }
        }

        return this._returnParams();
      }
    }
  }, {
    key: "load",
    value: function load() {
      var _this4 = this;

      if (this._checkInit()) {
        this._playLockQueue(function () {
          return _this4.audioH5.load();
        });

        return this.playId;
      }
    }
  }, {
    key: "seek",
    value: function seek(val) {
      var _this5 = this;

      if (this._checkInit()) {
        if (this._checkType(val, 'number')) {
          if (isIE && !this.metaDataLoaded) {
            this.seekValue = val;
            return;
          }

          var duration = this.audioH5.duration;
          if (val > duration) val = duration;
          if (val < 0) val = 0;
          this.seekValue = null;

          this._commonLock('seek', function () {
            return _this5.audioH5.currentTime = val;
          });
        } else {
          return this.audioH5.currentTime;
        }
      }
    }
  }, {
    key: "rate",
    value: function rate(val) {
      var _this6 = this;

      if (this._checkInit()) {
        if (this._checkType(val, 'number')) {
          if (val > 2) val = 2;
          if (val < 0.5) val = 0.5;

          this._commonLock('rate', function () {
            return _this6.audioH5.playbackRate = val;
          });

          this._updateConfig({
            rate: val
          });
        } else {
          return this.audioH5.playbackRate;
        }
      }
    }
  }, {
    key: "volume",
    value: function volume(val) {
      var _this7 = this;

      if (this._checkInit()) {
        if (this._checkType(val, 'number')) {
          if (val > 1) val = 1;
          if (val < 0) val = 0;

          this._commonLock('volume', function () {
            {
              _this7.audioH5.muted = false;
            }
            {
              _this7.audioH5.volume = val;
            }
          });

          this._updateConfig({
            volume: val
          });
        } else {
          return this.audioH5.volume;
        }
      }
    }
  }, {
    key: "mute",
    value: function mute(bool) {
      var _this8 = this;

      if (this._checkInit()) {
        if (this._checkType(bool, 'boolean')) {
          this._commonLock('mute', function () {
            return _this8.audioH5.muted = bool;
          });

          this._updateConfig({
            mute: bool
          });
        } else {
          return this.audioH5.muted;
        }
      }
    }
  }, {
    key: "stop",
    value: function stop(forbidEvent) {
      var _this9 = this;

      if (this._checkInit() && this.playState !== playStateSet.stopped) {
        this._playLockQueue(function () {
          if (!forbidEvent) {
            _this9._blockEvent({
              block: true
            });

            _this9._setPlayState(playStateSet.stopped);

            _this9._fireEventQueue(_this9.playId, 'onstop');
          }

          if (_this9.audioH5) {
            if (typeof _this9.audioH5.duration !== 'undefined') {
              _this9.audioH5.currentTime = 0;

              _this9.audioH5.pause();
            } else {
              _this9.audioH5.muted = true;
            }
          }
        });

        return this.playId;
      }
    }
  }, {
    key: "unload",
    value: function unload(forbidEvent) {
      var _this10 = this;

      if (this._checkInit()) {
        this.stop(true);

        this._unregisterEvent();

        this._playLockQueue(function () {
          if (!forbidEvent) {
            _this10._setPlayState(playStateSet.unloaded);

            _this10._fireEventQueue(_this10.playId, 'onunload');
          }

          _this10._abortLoad();

          delete _this10.audioH5;
          _this10.isInit = false;
        });
      }
    }
  }, {
    key: "model",
    value: function model(_model) {
      if (this._checkInit()) {
        if (_model) {
          this.playModel = playModelSet[_model];
        } else {
          return playModelSet[this.playModel || 0];
        }
      }
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
        var queueName = event.indexOf('on') === 0 ? event : "on".concat(event);

        var result = this._onEvent(queueName, cb);

        if (!result) this._logWarn("The [".concat(event, "] event bind failed"));
        return result;
      }

      return false;
    }
  }, {
    key: "off",
    value: function off(event, cb) {
      if (this._checkInit() && this._checkType(event, 'string', true)) {
        var queueName = event.indexOf('on') === 0 ? event : "on".concat(event);

        var result = this._offEvent(queueName, cb);

        if (!result) this._logWarn("The [".concat(event, "] event unbind failed"));
        return result;
      }

      return false;
    }
  }, {
    key: "once",
    value: function once(event, cb) {
      var _this11 = this;

      if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
        var queueName = event.indexOf('on') === 0 ? event : "on".concat(event);
        var funcName = "EASE_AUDIO_".concat(queueName.toUpperCase(), "_ONCE_CALLBACK");

        var once = function once(e) {
          cb && cb(e);

          var result = _this11._offEvent(queueName, once, funcName);

          if (!result) _this11._logWarn("The [".concat(event, "] once event unbind failed"));
        };

        var result = this._onEvent(queueName, once, funcName);

        if (!result) this._logWarn("The [".concat(event, "] once event bind failed"));
        return result;
      }

      return false;
    }
  }, {
    key: "playlist",
    value: function playlist(data) {
      var action = data.action,
          list = data.list,
          playId = data.playId,
          params = data.params;

      if (this._checkInit() && this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true)) && (!params || this._checkType(params, 'object', true))) {
        this._handlePlayList(data);

        return this._returnParams();
      }
    }
  }, {
    key: "_initial",
    value: function _initial(config) {
      this.config = config;
      this.playState = null;
      this.debug = config.debug || false;
      this.logLevel = config.logLevel && logLevelSet[config.logLevel] || logLevelSet['error'];
      this.idCounter = 1000;
      this.lockQueue = new Array(0);
      this.playLocker = false;
      this.playErrLocker = false;
      this.lockTags = {
        cutpick: 0,
        seek: 0,
        volume: 0,
        rate: 0,
        mute: 0,
        pause_wait: false,
        pause_cancel: false
      };
      this.playId = 1000;
      this.playModel = config.playModel && playModelSet[config.playModel] || config.loop && playModelSet['list-loop'] || playModelSet['list-once'];
      this.playIndex = 0;
      this.prevPlayIndex = 0;
      this.playList = new Array(0);
      this.buffered = new Array(0);
      this.eventController = create$1(null);
      this.eventMethods = create$1(null);
      var src;

      if (config.playlist && this._checkType(config.playlist, 'array')) {
        for (var i = 0; i < config.playlist.length; i++) {
          if (this._checkType(config.playlist[i], 'object')) continue;
          config.playlist[i] = create$1(null, {
            src: {
              writable: true,
              enumerable: true,
              configurable: true,
              value: config.playlist[i]
            }
          });
        }

        this._handlePlayList({
          action: 'add',
          list: config.playlist
        });

        var srcIndex = config.initIndex && this.playList[config.initIndex] ? config.initIndex : 0;

        this._setPlayIndex(srcIndex);

        this._setPlayId();

        src = this.playList[srcIndex].src;
      } else {
        this._logErr('Please pass correct playlist parameters!');
      }

      this._createAudio(objectSpread({}, config, {
        src: src
      }));
    }
  }, {
    key: "_createAudio",
    value: function _createAudio(config) {
      if (typeof window !== 'undefined' && !this.audioH5) {
        this.isInit = true;
        this.audioH5 = new Audio();
        this.audioH5.autoplay = config.autoplay || false;
        this.audioH5.loop = config.loop || false;
        this.audioH5.src = this._srcAssemble(config.src);
        this.audioH5.preload = config.preload === false ? 'none' : 'auto';
        this.audioH5.volume = config.volume || (config.volume === 0 ? 0 : 1);
        this.audioH5.muted = config.mute || false;
        this.audioH5.playbackRate = config.rate || config.playbackRate || 1;
        this.audioH5.controls = false;
      }
    }
  }, {
    key: "_srcAssemble",
    value: function _srcAssemble(src) {
      if (src && this._checkType(src, 'string')) {
        return src;
      }

      this._logErr("The playId's ".concat(this.playId, " src property is: ").concat(src, ".\nIt's necessary and must be string!"));

      return defaultSrc;
    }
  }, {
    key: "_updateConfig",
    value: function _updateConfig(params) {
      assign$1(this.config, params);
    }
  }, {
    key: "_returnParams",
    value: function _returnParams() {
      return {
        playId: this.playId,
        playingData: this.playList && this.playList[this.playIndex || 0],
        playlist: this.playList
      };
    }
  }, {
    key: "_abortLoad",
    value: function _abortLoad() {
      if (this.audioH5 && this.audioH5.src !== defaultSrc) {
        this.audioH5.src = defaultSrc;
        this.audioH5.currentTime = 0;
        this.audioH5.load();
      }
    }
  }, {
    key: "_setPlayState",
    value: function _setPlayState(state) {
      if (this.audioH5 && this._checkType(state, 'number', true) && this.playState !== state) {
        var readyState = this.audioH5.readyState;
        var isReady = readyState > 2;
        var paused = this.audioH5.paused;
        var stopped = this.playState === playStateSet.stopped;
        var ended = this.playState === playStateSet.ended;
        var finished = this.playState === playStateSet.finished;
        var unloaded = this.playState === playStateSet.unloaded;
        var seeking = this.audioH5.seeking;

        switch (state) {
          case playStateSet.loading:
            if (!finished && isReady) return false;
            break;

          case playStateSet.playing:
            if (!finished && (paused || unloaded || seeking || !isReady)) return false;
            break;

          case playStateSet.paused:
            if (stopped || ended || finished || unloaded) return false;
            break;
        }

        this._logInfo("setPlayState - ".concat(playStateSet[state]));

        this.playState = state;
        return this.playState;
      }

      return false;
    }
  }, {
    key: "_setPlayIndex",
    value: function _setPlayIndex(index) {
      var playModel = this.playModel;
      var maxIndex = this.playList.length - 1;
      this.prevPlayIndex = this.playIndex;

      if (index === 0) {
        this.playIndex = 0;
        return this.playIndex;
      }

      switch (playModelSet[playModel]) {
        case 'list-once':
          this.playIndex = index || (maxIndex >= this.playIndex ? ++this.playIndex : this.playIndex);
          break;

        case 'list-random':
          this.playIndex = index || Math.round(Math.random() * maxIndex);
          break;

        case 'list-loop':
          this.playIndex = index || (maxIndex > this.playIndex ? ++this.playIndex : 0);
          break;

        case 'single-once':
          this.playIndex = index || this.playIndex;
          break;

        case 'single-loop':
          this.playIndex = index || this.playIndex;
          break;

        default:
          this.playIndex = index || this.playIndex;
      }

      !this.playIndex && (this.playIndex = 0);

      this._log("setPlayIndex - playIndex: ".concat(this.playIndex));

      return this.playIndex;
    }
  }, {
    key: "_setPlayId",
    value: function _setPlayId() {
      var isSet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var playId = this.playList && this.playList[this.playIndex] && this.playList[this.playIndex].playId || this.playId;
      if (isSet === true) this.playId = playId;
      return playId;
    }
  }, {
    key: "_handlePlayList",
    value: function _handlePlayList(data) {
      var _this12 = this;

      var action = data.action,
          list = data.list,
          playId = data.playId,
          params = data.params;

      var playlist = construct$3(Array, toConsumableArray(this.playList || []));

      switch (action) {
        case 'add':
          if (!list) return;
          Array.prototype.forEach.call(list, function (v, k, thisArr) {
            !_this12.idCounter && (_this12.idCounter = 1000);
            v.playId = _this12.idCounter;
            _this12.idCounter++;
            thisArr[k] = v;
          });
          this.playList = Array.prototype.concat.call(playlist, list);
          break;

        case 'delete':
          if (playId) {
            for (var i = 0; i < playlist.length; i++) {
              if (playlist[i].playId === playId) {
                playlist.splice(i, 1);
                this.playList = toConsumableArray(playlist);
                break;
              }
            }
          }

          break;

        case 'insert':
          if (playId && list) {
            for (var _i = 0; _i < playlist.length; _i++) {
              if (playlist[_i].playId === playId) {
                playlist.splice.apply(playlist, [_i, 0].concat(toConsumableArray(list.map(function (v) {
                  !_this12.idCounter && (_this12.idCounter = 1000);
                  v.playId = _this12.idCounter;
                  _this12.idCounter++;
                  return v;
                }))));
                this.playList = toConsumableArray(playlist);
                break;
              }
            }
          }

          break;

        case 'replace':
          if (playId && list) {
            for (var _i2 = 0; _i2 < playlist.length; _i2++) {
              if (playlist[_i2].playId === playId) {
                playlist.splice.apply(playlist, [_i2, 1].concat(toConsumableArray(list.map(function (v) {
                  !_this12.idCounter && (_this12.idCounter = 1000);
                  v.playId = _this12.idCounter;
                  _this12.idCounter++;
                  return v;
                }))));
                this.playList = toConsumableArray(playlist);
                break;
              }
            }
          }

          break;

        case 'update':
          if (playId && params) {
            for (var _i3 = 0; _i3 < playlist.length; _i3++) {
              if (playlist[_i3].playId === playId) {
                var newData = objectSpread({}, playlist[_i3], params);

                playlist.splice(_i3, 1, newData);
                this.playList = toConsumableArray(playlist);
                break;
              }
            }
          }

          break;

        case 'reset':
          this._resetPlayList();

          break;
      }
    }
  }, {
    key: "_resetPlayList",
    value: function _resetPlayList() {
      this.playList = new Array(0);

      this._setPlayIndex(0);
    }
  }, {
    key: "_cut",
    value: function _cut(autocut) {
      var _this13 = this;

      if (this._checkInit()) {
        if (this.playModel === playModelSet['single-once']) {
          this._logWarn('Cannot cut audio if the playModel is single-once');

          this.stop();
        } else {
          this.metaDataLoaded = false;
          this.seekValue = null;
          !autocut && this._setPlayIndex();

          if (this.playList && !this.playList[this.playIndex]) {
            this._setPlayIndex(this.prevPlayIndex);

            return this.eventMethods && this.eventMethods.finish(this.playId);
          }

          this._setPlayId();

          this.eventMethods && this.eventMethods.cut(this.playId);
          this.playErrLocker = true;

          this._abortLoad();

          return this._commonLock('cutpick', function () {
            var src = _this13.playList[_this13.playIndex].src;

            if (autocut) {
              if (_this13.audioH5 && src) {
                _this13.audioH5.src = src;

                _this13.audioH5.load();
              }
            } else {
              _this13.unload(true);

              var config = assign$1(_this13.config, {
                src: src
              });

              _this13._createAudio(config);

              _this13._registerEvent(config);
            }

            return _this13.play();
          });
        }
      }
    }
  }, {
    key: "_onEvent",
    value: function _onEvent(event, cb, name) {
      if (!isNaN(supportEvents[event])) {
        try {
          var funcName = name || cb.name || "anonymous-".concat(new Date().getTime());

          if (!this[event]) {
            this[event] = create$1(null);
          }

          this[event][funcName] = cb;
          return true;
        } catch (error) {
          this._logErr(error);
        }
      } else {
        this._logWarn("The [".concat(event, "] is not support event"));
      }

      return false;
    }
  }, {
    key: "_offEvent",
    value: function _offEvent(event, cb, name) {
      if (!isNaN(supportEvents[event])) {
        try {
          if (!cb) this[event] = null;else if (name || cb.name) delete this[event][name || cb.name];
          return true;
        } catch (error) {
          this._logErr(error);
        }
      } else {
        this._logWarn("The [".concat(event, "] is not support event"));
      }

      return false;
    }
  }, {
    key: "_fireEventQueue",
    value: function _fireEventQueue(e, eventQueue) {
      if (this[eventQueue]) {
        for (var k in this[eventQueue]) {
          this[eventQueue][k] && this[eventQueue][k](e);
        }
      }
    }
  }, {
    key: "_registerEvent",
    value: function _registerEvent(config) {
      var _this14 = this;

      var curry = function curry(cb, eventName) {
        return function (e) {
          if (!_this14._triggerEventController(eventName)) return;
          return cb && cb(e);
        };
      };

      var configKeys = keys$1(config);

      configKeys.forEach(function (v) {
        if (v.indexOf('on') === 0) {
          var cb = config[v];

          if (cb && _this14._checkType(cb, 'function', true)) {
            var funcName = "EASE_AUDIO_".concat(v.toUpperCase(), "_INITIAL_CALLBACK");

            var result = _this14._onEvent(v, cb, funcName);

            if (!result) _this14._logErr("The [".concat(v, "] event initial bind failed"));
          }
        }
      });
      this.eventMethods = {
        loadstart: function loadstart(e) {
          if (_this14.audioH5 && _this14.audioH5.src === defaultSrc) return;

          _this14._setPlayState(playStateSet.loading);

          _this14._fireEventQueue(e, 'onload');
        },
        seeking: function seeking(e) {
          if (_this14.audioH5 && _this14.audioH5.src === defaultSrc) return;
          _this14.playState !== playStateSet.paused && _this14._setPlayState(playStateSet.loading);

          _this14._fireEventQueue(e, 'onseeking');
        },
        canplaythrough: function canplaythrough(e) {
          if (_this14.audioH5 && _this14.audioH5.src === defaultSrc) return;
          _this14.playState === playStateSet.loading && _this14._setPlayState(playStateSet.loaded);

          _this14._fireEventQueue(e, 'oncanplaythrough');
        },
        playing: function playing(e) {
          _this14._setPlayState(playStateSet.playing);

          _this14._fireEventQueue(e, 'onplay');

          if (_this14.isTriggerEnd) _this14.isTriggerEnd = false;
        },
        pause: function pause(e) {
          if (!_this14.isTriggerEnd) {
            _this14._setPlayState(playStateSet.paused);

            _this14._fireEventQueue(e, 'onpause');
          }
        },
        ended: function ended(e) {
          if (_this14.isTriggerEnd) {
            _this14.isTriggerEnd = false;
          } else {
            _this14.isTriggerEnd = true;

            _this14._setPlayState(playStateSet.ended);

            _this14._fireEventQueue(e, 'onend');

            return _this14._autocut();
          }
        },
        finish: function finish(e) {
          _this14._setPlayState(playStateSet.finished);

          _this14._fireEventQueue(e, 'onfinish');
        },
        error: function error(e) {
          _this14._setPlayState(playStateSet.loaderror);

          _this14._fireEventQueue(e, 'onloaderror');
        },
        playerror: function playerror(e) {
          _this14._setPlayState(playStateSet.playerror);

          _this14._fireEventQueue(e, 'onplayerror');
        },
        progress: function progress(e) {
          var ranges = e.target.buffered;
          var total = e.total || 1;
          var buffered = 0;
          var loaded = e.loaded || 0;
          var progress = loaded / total;

          if (ranges && ranges.length) {
            for (var i = 0, j = ranges.length; i < j; i++) {
              _this14.buffered && _this14.buffered.push({
                'start': ranges.start(i) * 1000,
                'end': ranges.end(i) * 1000
              });
            }

            buffered = (ranges.end(0) - ranges.start(0)) * 1000;
            loaded = Math.min(1, buffered / (e.target.duration * 1000));
            progress = loaded / total;
          }

          _this14._fireEventQueue(assign$1(e, {
            progress: progress
          }), 'onprogress');
        },
        durationchange: function durationchange(e) {},
        loadedmetadata: function loadedmetadata(e) {
          _this14.metaDataLoaded = true;
          _this14.seekValue && _this14.seek(_this14.seekValue);
        },
        loadeddata: function loadeddata(e) {},
        timeupdate: function timeupdate(e) {
          if (_this14.playState === playStateSet.loading) {
            _this14._logInfo("timeupdate's playing");

            _this14._setPlayState(playStateSet.playing);

            _this14._fireEventQueue(e, 'onplay');
          }

          var isEnd = _this14.audioH5 && _this14.audioH5.duration && +_this14.audioH5.currentTime >= +_this14.audioH5.duration;

          if (isEnd) {
            if (_this14.isTriggerEnd) {
              _this14.isTriggerEnd = false;
            } else {
              _this14._logInfo("timeupdate's ended");

              _this14.isTriggerEnd = true;

              _this14._setPlayState(playStateSet.ended);

              _this14._fireEventQueue(e, 'onend');

              return _this14._autocut();
            }
          }

          _this14._fireEventQueue(e, 'ontimeupdate');
        },
        canplay: function canplay(e) {
          return _this14._fireEventQueue(e, 'oncanplay');
        },
        seeked: function seeked(e) {
          return _this14._fireEventQueue(e, 'onseeked');
        },
        volumechange: function volumechange(e) {
          return _this14._fireEventQueue(e, 'onvolume');
        },
        ratechange: function ratechange(e) {
          return _this14._fireEventQueue(e, 'onrate');
        },
        cut: function cut(e) {
          return _this14._fireEventQueue(e, 'oncut');
        },
        pick: function pick(e) {
          return _this14._fireEventQueue(e, 'onpick');
        },
        play: function play(e) {},
        abort: function abort(e) {},
        suspend: function suspend(e) {}
      };

      for (var k in this.eventMethods) {
        if (uselessEvents[k] !== undefined) continue;
        this.eventMethods[k] = curry(this.eventMethods[k], k);

        this._bindEvent(this.eventMethods[k], k);
      }

      this._blockEvent({
        block: false
      });
    }
  }, {
    key: "_unregisterEvent",
    value: function _unregisterEvent() {
      if (this._checkInit()) {
        for (var k in this.eventMethods) {
          if (uselessEvents[k] !== 'undefined') continue;

          this._removeEvent(this.eventMethods[k], k);
        }
      }
    }
  }, {
    key: "_blockEvent",
    value: function _blockEvent(params) {
      if (this._checkInit()) {
        var event = params.event,
            block = params.block;

        if (event && this._checkType(event, 'string')) {
          this.eventController[event] = !block;
        } else {
          for (var k in this.eventMethods) {
            this.eventController[k] = !block;
          }
        }
      }
    }
  }, {
    key: "_triggerEventController",
    value: function _triggerEventController(event) {
      if (this.eventController && this.eventController[event] === false) return false;

      this._log("trigger ".concat(event, " event"));

      return true;
    }
  }, {
    key: "_bindEvent",
    value: function _bindEvent(cb, event) {
      if (!this._checkType(event, 'string')) return this._logErr("bindEvent - bind event name is not string");
      this._checkType(cb, 'function', true) && addListener(event, cb, this.audioH5);
    }
  }, {
    key: "_removeEvent",
    value: function _removeEvent(cb, event) {
      if (!this._checkType(event, 'string')) return this._logErr("removeEvent - unbind event name is not string");
      this._checkType(cb, 'function', true) && removeListener(event, cb, this.audioH5);
    }
  }, {
    key: "_playLockQueue",
    value: function _playLockQueue(fn) {
      if (this.playLocker) {
        return this.lockQueue.push(fn);
      }

      return fn && fn();
    }
  }, {
    key: "_commonLock",
    value: function _commonLock(tag, fn) {
      var _this15 = this;

      if (this.playLocker) {
        var lockTags = this.lockTags[tag];
        typeof lockTags === 'number' && (this.lockTags[tag] = lockTags + 1);
      }

      this._playLockQueue(function (id) {
        return function () {
          if (id !== _this15.lockTags[tag]) return;
          fn && fn();
        };
      }(this.lockTags[tag]));
    }
  }, {
    key: "_autocut",
    value: async function _autocut() {
      var _this16 = this;

      var autocut = this.config.autocut;

      this._setPlayIndex();

      var nextId = this._setPlayId(false);

      if (this._checkType(autocut, 'function')) {
        try {
          autocut = await autocut(this.playId, nextId);
        } catch (err) {
          this._logErr("autocut occur error, it's ".concat(err));

          this._setPlayIndex(this.prevPlayIndex);

          return this.eventMethods.finish(this.playId);
        }
      }

      return new promise$1(function (resolve, reject) {
        _this16._checkType(autocut, 'boolean') ? resolve(autocut) : reject(autocut);
      }).then(function (isCut) {
        if (isCut) return _this16._cut(true);

        _this16._setPlayIndex(_this16.prevPlayIndex);

        return _this16.eventMethods.finish(_this16.playId);
      }).catch(function (err) {
        _this16._logWarn("The autocut property type should be boolean or function return boolean, now the result ".concat(err, " type was ").concat(typeof err));

        _this16._setPlayIndex(_this16.prevPlayIndex);

        return _this16.eventMethods.finish(_this16.playId);
      });
    }
  }, {
    key: "_checkType",
    value: function _checkType(element, type, logErr) {
      if (typeof type !== 'string') {
        this._logWarn('checkType - The {type} parameter must be string');

        return false;
      }

      if (getType(element) !== type) {
        logErr && this._logErr("Your parameter(".concat(element, ") type is ").concat(getType(element), ", please pass the ").concat(type, " type"));
        return false;
      }

      return true;
    }
  }, {
    key: "_checkInit",
    value: function _checkInit() {
      if (!this.isInit) {
        this._logWarn("checkInit - The Audio haven't been initiated");

        return false;
      }

      return true;
    }
  }, {
    key: "_log",
    value: function _log(detail) {
      var canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel === logLevelSet['detail'];
      canLog && this.debug && this._logOptimize(detail, 'log');
    }
  }, {
    key: "_logInfo",
    value: function _logInfo(info) {
      var canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'] && this.logLevel !== logLevelSet['warn'];
      canLog && this.debug && this._logOptimize(info, 'info');
    }
  }, {
    key: "_logWarn",
    value: function _logWarn(warn) {
      var canLog = this.logLevel !== logLevelSet['silent'] && this.logLevel !== logLevelSet['error'];
      canLog && this.debug && this._logOptimize(warn, 'warn');
    }
  }, {
    key: "_logErr",
    value: function _logErr(error) {
      var canLog = this.logLevel !== logLevelSet['silent'];
      canLog && this.debug && this._logOptimize(error, 'error');
    }
  }, {
    key: "_logOptimize",
    value: function _logOptimize(msg, method) {
      var logger = console[method] || console.log;
      var prefix = "[EASE_AUDIO_H5 ".concat(method.toUpperCase(), "]:");

      if ((this._checkType(msg, 'object') || this._checkType(msg, 'array')) && console.table) {
        logger(prefix);
        console.table(msg);
        return;
      }

      logger(prefix, msg);
    }
  }, {
    key: "duration",
    get: function get() {
      return this.audioH5 ? this.audioH5.duration : 0;
    }
  }, {
    key: "networkState",
    get: function get() {
      return this.audioH5 ? this.audioH5.networkState : 0;
    }
  }, {
    key: "playlists",
    get: function get() {
      return this.playList || [];
    }
  }, {
    key: "playid",
    get: function get() {
      return this.playId || 1000;
    }
  }, {
    key: "playstate",
    get: function get() {
      return !this.playState && this.playState !== 0 ? null : playStateSet[this.playState || 0];
    }
  }]);

  return AudioH5;
}();var EaseAudio =
/*#__PURE__*/
function () {
  function EaseAudio(config) {
    var _this = this;

    classCallCheck(this, EaseAudio);

    this.audio = this._createAudio(config);
    this.init = this.audio.init;
    this.play = this.audio.play;
    this.pause = this.audio.pause;
    this.toggle = this.audio.toggle;
    this.cut = this.audio.cut;
    this.pick = this.audio.pick;
    this.load = this.audio.load;
    this.seek = this.audio.seek;
    this.rate = this.audio.rate;
    this.volume = this.audio.volume;
    this.mute = this.audio.mute;

    this.stop = function () {
      return _this.audio.stop();
    };

    this.unload = function () {
      return _this.audio.unload();
    };

    this.on = this.audio.on;
    this.off = this.audio.off;
    this.once = this.audio.once;
    this.model = this.audio.model;
  }

  createClass(EaseAudio, [{
    key: "_createAudio",
    value: function _createAudio(config) {
      var audio = {
        init: initFunc,
        play: initFunc,
        pause: initFunc,
        toggle: initFunc,
        load: initFunc,
        seek: initFunc,
        volume: initFunc,
        mute: initFunc,
        stop: initFunc,
        unload: initFunc,
        on: initFunc,
        off: initFunc,
        once: initFunc,
        model: initFunc,
        cut: initFunc,
        pick: initFunc,
        rate: initFunc,
        playlist: initFunc
      };

      try {
        if (typeof window !== 'undefined') {
          var usingWebAudio = config && config.usingWebAudio;

          if (usingWebAudio && AudioContext) {
            return new AudioCtx(config);
          } else if (Audio) {
            return new AudioH5(config);
          }
        }
      } catch (err) {
        console.error('[EASE_AUDIO CREATE AUDIO ERROR]:', err);
      }

      return audio;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.audio ? this.audio.duration : 0;
    }
  }, {
    key: "playState",
    get: function get() {
      return this.audio ? this.audio.playstate : null;
    }
  }, {
    key: "playId",
    get: function get() {
      return this.audio ? this.audio.playid : 1000;
    }
  }, {
    key: "playingData",
    get: function get() {
      var playingData = {};

      if (this.audio) {
        var playId = this.audio.playid;
        var playList = this.audio.playlists;
        var len = playList.length;

        for (var i = 0; i < len; i++) {
          if (+playId === +playList[i].playId) {
            playingData = playList[i];
            break;
          }
        }
      }

      return playingData;
    }
  }, {
    key: "playlist",
    set: function set(params) {
      this.audio && this.audio.playlist && this.audio.playlist(params);
    },
    get: function get() {
      return this.audio ? this.audio.playlists : [];
    }
  }, {
    key: "networkState",
    get: function get() {
      return this.audio ? this.audio.networkState : 0;
    }
  }]);

  return EaseAudio;
}();

function initFunc() {
  return console.error('[EASE_AUDIO ERROR]: Initialize failed');
}exports.default=EaseAudio;exports.EaseAudio=EaseAudio;Object.defineProperty(exports,'__esModule',{value:true});}));
/* Copyright (c) 2018-2019 Bobby.li 
* MIT License 
*/