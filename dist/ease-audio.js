/* ease-audio */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.EaseAudio = {}));
}(this, function (exports) { 'use strict';

  class AudioCtx {
    constructor() {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.audioDom = new window.Audio();
      this.audio = this.audioCtx.createMediaElementSource(this.audioDom);
    }

    play() {}

    pause() {}

    stop() {}

    unload() {}

    seek() {}

  }

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
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
  };

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _core = createCommonjsModule(function (module) {
  var core = module.exports = { version: '2.6.2' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _global = createCommonjsModule(function (module) {
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math
    ? window : typeof self != 'undefined' && self.Math == Math ? self
    // eslint-disable-next-line no-new-func
    : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var _library = true;

  var _shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = _global[SHARED] || (_global[SHARED] = {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: _core.version,
    mode: 'pure',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
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
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

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
  };

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

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
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var PROTOTYPE = 'prototype';

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
  var _export = $export;

  // most Object methods by ES6 should accept primitives



  var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  var keys = _core.Object.keys;

  var keys$1 = keys;

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



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
  };

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  _export(_export.S, 'Object', { create: _objectCreate });

  var $Object = _core.Object;
  var create = function create(P, D) {
    return $Object.create(P, D);
  };

  var create$1 = create;

  // true  -> String#at
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
  };

  var _redefine = _hide;

  var _iterators = {};

  var _wks = createCommonjsModule(function (module) {
  var store = _shared('wks');

  var Symbol = _global.Symbol;
  var USE_SYMBOL = typeof Symbol == 'function';

  var $exports = module.exports = function (name) {
    return store[name] || (store[name] =
      USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
  };

  $exports.store = store;
  });

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };

  var ITERATOR = _wks('iterator');
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
  };

  var $at = _stringAt(true);

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
  });

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  // 22.1.3.4 Array.prototype.entries()
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
  _iterators.Arguments = _iterators.Array;

  var TO_STRING_TAG = _wks('toStringTag');

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
  }

  // getting tag from 19.1.3.6 Object.prototype.toString()

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
  };

  var _anInstance = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  // call something on iterator step with safe closing on error

  var _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$1 = _wks('iterator');
  var ArrayProto = Array.prototype;

  var _isArrayIter = function (it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var ITERATOR$2 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2]
      || it['@@iterator']
      || _iterators[_classof(it)];
  };

  var _forOf = createCommonjsModule(function (module) {
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
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES = _wks('species');
  var _speciesConstructor = function (O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
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
  };

  var process = _global.process;
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
  };

  var macrotask = _task.set;
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
  };

  // 25.4.1.5 NewPromiseCapability(C)


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

  var f$1 = function (C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
  	f: f$1
  };

  var _perform = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var navigator = _global.navigator;

  var _userAgent = navigator && navigator.userAgent || '';

  var _promiseResolve = function (C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function (target, src, safe) {
    for (var key in src) {
      if (safe && target[key]) target[key] = src[key];
      else _hide(target, key, src[key]);
    } return target;
  };

  var SPECIES$1 = _wks('species');

  var _setSpecies = function (KEY) {
    var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  };

  var ITERATOR$3 = _wks('iterator');
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
  };

  var task = _task.set;
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

  var USE_NATIVE = !!function () {
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
  if (!USE_NATIVE) {
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

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE];

  // statics
  _export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
    }
  });
  _export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
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
  });

  _export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
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
  } });

  // https://github.com/tc39/proposal-promise-try




  _export(_export.S, 'Promise', { 'try': function (callbackfn) {
    var promiseCapability = _newPromiseCapability.f(this);
    var result = _perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

  var promise = _core.Promise;

  var promise$1 = promise;

  var $JSON = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
  var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
    return $JSON.stringify.apply($JSON, arguments);
  };

  var stringify$1 = stringify;

  function getUA(u) {
    if (!u) return false; // console.log(u)

    const obj = {
      edge: u.indexOf('Edge') > -1,
      // Edge内核
      trident: u.indexOf('Trident') > -1,
      // IE内核
      presto: u.indexOf('Presto') > -1,
      // opera内核
      webKit: u.indexOf('AppleWebKit') > -1,
      // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g),
      // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1,
      // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1,
      // 是否iPad
      webApp: u.indexOf('Safari') === -1,
      // 是否web程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1,
      // 是否微信
      weibo: u.indexOf('Weibo') > -1,
      // 是否微博
      facebook: u.indexOf('FBAN') > -1,
      // 是否facebook
      twitter: u.indexOf('FBAN') > -1,
      // 是否twitter
      qq: u.match(/\sQQ/i) === ' qq',
      // 是否QQ
      hmlyApp: /himalaya/i.test(u) // 是否在 himalaya app

    };
    return obj;
  }

  let ua;

  try {
    ua = window && window.navigator && window.navigator.userAgent;
  } catch (error) {
    console.error(`[isIE]: ${error}`);
  }

  const isIE = ua ? getUA(ua).trident : false;
  const isEdge = ua ? getUA(ua).edge : false;

  // adapt IE add event
  const addListener = (event, fn, dom) => {
    if (!window) return false;
    const eventDOM = dom || window;

    if (window.addEventListener) {
      eventDOM.addEventListener(event, fn, false);
    } else {
      eventDOM.attachEvent(`on${event}`, fn);
    }
  }; // adapt IE remove event

  const removeListener = (event, fn, dom) => {
    if (!window) return false;
    const eventDOM = dom || window;

    if (window.removeEventListener) {
      eventDOM.removeEventListener(event, fn, false);
    } else {
      eventDOM.detachEvent(`on${event}`, fn);
    }
  }; // prevent default

  const getType = obj => {
    if (typeof obj !== 'object') return typeof obj;
    const len = Object.prototype.toString.call(obj).length - 1;
    return Object.prototype.toString.call(obj).slice(8, len).toLowerCase();
  };

  const playStateSet = ['loading', 'playing', 'paused', 'stopped', 'ended', 'loaderror', 'playerror', 'unloaded'];
  const playModelSet = ['list-once', 'list-random', 'list-loop', 'single-once', 'single-loop'];
  const supportEvents = ['onplay', 'onpause', 'onstop', 'onend', 'onload', 'onunload', 'oncanplay', 'onprogress', 'onvolume', 'onseeking', 'onseeked', 'onrate', 'ontimeupdate', 'onloaderror', 'onplayerror', 'oncut', 'onpick'];
  const logLevel = ['detail', 'info', 'warn', 'error', 'silent'];
  const defaultSrc = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
  class AudioH5 {
    constructor(config) {
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
      this.muted = this.muted.bind(this);
      this.stop = this.stop.bind(this);
      this.unload = this.unload.bind(this);
      this.model = this.model.bind(this);
      this.on = this.on.bind(this);
      this.off = this.off.bind(this);
      this.once = this.once.bind(this);
      this.playlist = this.playlist.bind(this);
      this.init(config);
    }

    get duration() {
      return this.audioH5.duration;
    }

    set setProps({
      prop,
      value
    }) {
      if (this.audioH5[prop] && !this._checkType(this.audioH5[prop], 'function')) {
        this.audioH5[prop] = value;

        this._updateConfig({
          prop: value
        });
      }
    }

    init(config) {
      if (!this.isInit && config && this._checkType(config, 'object') && stringify$1(config) !== '{}') {
        this._initial(config);

        this._registerEvent(config);

        return this._returnParams();
      }
    }

    play() {
      if (this._checkInit()) {
        try {
          this._blockEvent({
            block: false
          });

          let play = this.audioH5.play();

          if (play && typeof promise$1 !== 'undefined' && (play instanceof promise$1 || typeof play.then === 'function')) {
            this.playLocker = true;
            play.then(() => {
              this.lockQueue.forEach(v => v && v());
              this.lockQueue.splice(0);
              this.playLocker = false;
            }).catch(err => {
              this.lockQueue.splice(0);
              this.playLocker = false;

              this._setPlayState(playStateSet[6]);

              this._fireEventQueue(err, 'onplayerror');
            });
          } // If the sound is still paused, then we can assume there was a playback issue.


          if (this.audioH5.paused) {
            const err = `Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.`;

            this._setPlayState(playStateSet[6]);

            this._fireEventQueue(err, 'onplayerror');
          }
        } catch (err) {
          this._setPlayState(playStateSet[6]);

          this._fireEventQueue(err, 'onplayerror');
        }

        return this.playId;
      }
    }

    pause() {
      if (this._checkInit()) {
        this._playLockQueue(() => this.audioH5.pause());

        return this.playId;
      }
    }

    toggle() {
      if (this._checkInit() && this.playState !== 'stopped' && this.playState !== 'ended' && this.playState !== 'loaderror' && this.playState !== 'playerror') {
        this.playState === null || this.playState === 'paused' ? this.play() : this.pause();
        return this.playId;
      }
    }

    cut() {
      if (this._checkInit()) {
        this._cut();

        return this._returnParams();
      }
    }

    pick(playId) {
      if (this._checkInit() && this._checkType(playId, 'number', true)) {
        for (let i = 0; i < this.playList.length; i++) {
          if (this.playList[i].playId === playId) {
            this.unload(true);

            this._setPlayIndex(i);

            const src = this.playList[this.playIndex].src;
            const config = { ...this.config,
              src
            };

            this._createAudio(config);

            this._registerEvent(config);

            this._fireEventQueue(this.playId, 'onpick');

            this.play();
            break;
          }
        }

        return this._returnParams();
      }
    }

    load() {
      if (this._checkInit()) {
        this._playLockQueue(() => this.audioH5.load());

        return this.playId;
      }
    }

    seek(val) {
      if (this._checkInit()) {
        if (this._checkType(val, 'number')) {
          // IE cannot set currentTime when the metaData is loading
          if (isIE && !this.metaDataLoaded) {
            this.seekValue = val;
            return;
          }

          const duration = this.audioH5.duration;
          if (val > duration) val = duration;
          if (val < 0) val = 0;
          this.seekValue = null;

          this._playLockQueue(() => this.audioH5.currentTime = val);
        } else {
          return this.audioH5.currentTime;
        }
      }
    }

    rate(val) {
      if (this._checkInit()) {
        if (this._checkType(val, 'number')) {
          if (val > 2) val = 2;
          if (val < 0.5) val = 0.5;

          this._playLockQueue(() => this.audioH5.playbackRate = val);

          this._updateConfig({
            rate: val
          });
        } else {
          return this.audioH5.playbackRate;
        }
      }
    }

    volume(val) {
      if (this._checkInit()) {
        if (this._checkType(val, 'number')) {
          if (val > 1) val = 1;
          if (val < 0) val = 0;

          this._playLockQueue(() => {
            this.audioH5.muted = false;
            this.audioH5.volume = val;
          });

          this._updateConfig({
            volume: val
          });
        } else {
          return this.audioH5.volume;
        }
      }
    }

    muted(bool) {
      if (this._checkInit()) {
        if (this._checkType(bool, 'boolean', true)) {
          this._playLockQueue(() => this.audioH5.muted = bool);

          this._updateConfig({
            muted: bool
          });
        } else {
          return this.audioH5.muted;
        }
      }
    }

    stop(forbidEvent) {
      if (this._checkInit() && this.playState !== playStateSet[3]) {
        this._playLockQueue(() => {
          if (!forbidEvent) {
            this._blockEvent({
              block: true
            });

            this._setPlayState(playStateSet[3]);

            this._fireEventQueue(this.playId, 'onstop');
          }

          this.audioH5.currentTime = 0;
          this.audioH5.pause();
        });

        return this.playId;
      }
    }

    unload(forbidEvent) {
      if (this._checkInit()) {
        this.stop(true);

        this._unregisterEvent();

        this._playLockQueue(() => {
          if (!forbidEvent) {
            this._setPlayState(playStateSet[7]);

            this._fireEventQueue(this.playId, 'onunload');
          }

          this.audioH5.src = defaultSrc;
          this.audioH5 = null;
          this.isInit = false;
        });
      }
    }
    /* set play model */


    model(model) {
      if (this._checkInit()) {
        if (playModelSet.indexOf(model) !== -1) {
          // model contain: list-once, list-random, list-loop, single-once, single-loop
          this.playModel = model;
        } else {
          return this.playModel;
        }
      }
    }
    /* add event to events queue */


    on(event, cb) {
      if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
        const queueName = event.indexOf('on') === 0 ? event : `on${event}`;

        this._onEvent(queueName, cb);
      }
    }
    /* remove event from events queue */


    off(event, cb) {
      if (this._checkInit() && this._checkType(event, 'string', true)) {
        const queueName = event.indexOf('on') === 0 ? event : `on${event}`;

        this._offEvent(queueName, cb);
      }
    }
    /* fire only one time */


    once(event, cb) {
      if (this._checkInit() && this._checkType(event, 'string', true) && this._checkType(cb, 'function', true)) {
        const queueName = event.indexOf('on') === 0 ? event : `on${event}`;
        const funcName = `EASE_AUDIO_${queueName.toUpperCase()}_ONCE_CALLBACK`;

        const once = e => {
          cb && cb(e);

          this._offEvent(queueName, once, funcName);
        };

        this._onEvent(queueName, once, funcName);
      }
    }
    /* set play list */


    playlist(data) {
      const {
        action,
        list,
        playId,
        params
      } = data;

      if (this._checkInit() && this._checkType(action, 'string', true) && (!list || this._checkType(list, 'array', true)) && (!playId || this._checkType(playId, 'number', true)) && (!params || this._checkType(params, 'object', true))) {
        this._handlePlayList(data);

        return this._returnParams();
      }
    }
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


    _initial(config) {
      this.config = config; // preserve initial config

      this.playState = null;
      this.debug = config.debug || false;
      this.logLevel = logLevel.indexOf(config.logLevel) !== -1 && config.logLevel || logLevel[3];
      this.idCounter = 1000;
      this.lockQueue = new Array(0);
      this.playLocker = false;
      this.playId = 1000;
      this.playModel = playModelSet.indexOf(config.playModel) !== -1 && config.playModel || config.loop && playModelSet[3] || playModelSet[0];
      this.playIndex = 0;
      this.playList = new Array(0);
      this.buffered = new Array(0);
      this.eventController = new Array(0);
      this.eventMethods = create$1(null); // playlist convert to src

      let src;

      if (config.playlist && this._checkType(config.playlist, 'array')) {
        for (let i = 0; i < config.playlist.length; i++) {
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

        src = config.playlist[0] && config.playlist[0].src;

        if (!src || !this._checkType(src, 'string')) {
          src = defaultSrc;

          this._logErr('The src property is necessary and must be string!');
        }
      } else {
        this._logErr('Please pass correct playlist parameters!');

        src = defaultSrc;
      } // create Audio Object


      this._createAudio({ ...config,
        src
      });
    }

    _createAudio(config) {
      this.isInit = true;
      this.audioH5 = new window.Audio();
      this.audioH5.autoplay = config.autoplay || false;
      this.audioH5.loop = config.loop || false;
      this.audioH5.src = this._srcAssemble(config.src);
      this.audioH5.preload = config.preload || true;
      this.audioH5.volume = config.volume || (config.volume === 0 ? 0 : 1);
      this.audioH5.muted = config.muted || false;
      this.audioH5.playbackRate = config.rate || config.playbackRate || 1;
      this.audioH5.controls = false;
    }

    _srcAssemble(src) {
      if (src && this._checkType(src, 'string')) {
        return src;
      }

      return defaultSrc;
    }

    _updateConfig(params) {
      this.config = { ...this.config,
        ...params
      };
    }

    _returnParams() {
      return {
        playId: this.playId,
        playingData: this.playList[this.playIndex],
        playlist: this.playList
      };
    }
    /* set play state */


    _setPlayState(state) {
      if (this._checkType(state, 'string', true) && this.playState !== state) {
        const readyState = this.audioH5.readyState;
        const isReady = readyState > 2;
        const paused = this.audioH5.paused;
        const ended = this.audioH5.ended;
        const seeking = this.audioH5.seeking; // filter impossible state

        switch (state) {
          case playStateSet[0]:
            // loading
            if (paused || ended || isReady) return false;
            break;

          case playStateSet[1]:
            // playing
            if (paused || ended || seeking || !isReady) return false;
            break;

          case playStateSet[2]:
            // paused
            if (ended) return false;
            break;
        }

        this._logInfo(`setPlayState - ${state}`);

        this.playState = state;
        return this.playState;
      }
    }
    /* set play index */


    _setPlayIndex(index) {
      const playModel = this.playModel;
      const maxIndex = this.playList.length - 1;

      if (index === 0) {
        this.playIndex = 0;
        this.playId = this.playList[0] && this.playList[0].playId || this.playId;
        return;
      }

      switch (playModel) {
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

      this.playId = this.playList[this.playIndex] && this.playList[this.playIndex].playId || this.playId;

      this._log(`setPlayIndex - playIndex: ${this.playIndex}  playId: ${this.playId}`);

      return this.playIndex;
    }
    /* reset play list */


    _resetPlayList() {
      this.playList = [];

      this._setPlayIndex(0);
    }
    /* handle play list */


    _handlePlayList({
      action,
      list,
      playId,
      params
    }) {
      switch (action) {
        case 'add':
          this.playList = [...this.playList, ...list.map(v => {
            if (this._checkType(v, 'object')) {
              v.playId = this.idCounter;
              this.idCounter++;
              return v;
            }
          })];
          break;

        case 'delete':
          if (playId) {
            for (let i = 0; i < this.playList.length; i++) {
              if (this.playList[i].playId === playId) {
                return this.playList.splice(i, 1);
              }
            }
          }

          break;

        case 'insert':
          if (playId && list) {
            for (let i = 0; i < this.playList.length; i++) {
              if (this.playList[i].playId === playId) {
                return this.playList.splice(i, 0, ...list.map(v => {
                  v.playId = this.idCounter;
                  this.idCounter++;
                  return v;
                }));
              }
            }
          }

          break;

        case 'replace':
          if (playId && list) {
            for (let i = 0; i < this.playList.length; i++) {
              if (this.playList[i].playId === playId) {
                return this.playList.splice(i, 1, ...list.map(v => {
                  v.playId = this.idCounter;
                  this.idCounter++;
                  return v;
                }));
              }
            }
          }

          break;

        case 'update':
          if (playId && params) {
            for (let i = 0; i < this.playList.length; i++) {
              if (this.playList[i].playId === playId) {
                const newData = { ...this.playList[i],
                  ...params
                };
                return this.playList.splice(i, 1, newData);
              }
            }
          }

          break;

        case 'reset':
          this._resetPlayList();

          break;

        default:
          this._resetPlayList();

      }
    }
    /* cut audio */


    _cut(endCut) {
      this.stop(true); // can't cut audio if the playModel is single-once

      if (this._checkInit() && this.playModel !== 'single-once') {
        this.metaDataLoaded = false;
        this.seekValue = null;

        this._setPlayIndex();

        if (!this.playList[this.playIndex]) return;
        const src = this.playList[this.playIndex].src;

        if (endCut) {
          // resolve the IOS auto play problem
          this.audioH5.src = src;
          this.load();
        } else {
          this.unload(true);
          const config = { ...this.config,
            src
          };

          this._createAudio(config);

          this._registerEvent(config);
        }

        this._fireEventQueue(this.playId, 'oncut');

        this.play();
        return this._setPlayState(playStateSet[1]);
      }
    }
    /* generate received event callback queue */


    _onEvent(event, cb, name) {
      if (supportEvents.indexOf(event) !== -1) {
        if (!this[event]) this[event] = {};
        this[event][name || cb.name || `anonymous-${new Date().getTime()}`] = cb;
      }
    }
    /* delete received event callback queue */


    _offEvent(event, cb, name) {
      if (supportEvents.indexOf(event) !== -1) {
        if (!cb) this[event] = null;else if (name || cb.name) delete this[event][name || cb.name];
      }
    }
    /* fire event callback queue */


    _fireEventQueue(e, eventQueue) {
      if (this[eventQueue]) {
        for (let k in this[eventQueue]) {
          this[eventQueue][k] && this[eventQueue][k](e);
        }
      }
    }
    /* register Audio Event */


    _registerEvent(config) {
      const curry = (cb, eventName) => e => {
        if (!this._triggerEventController(eventName)) return;
        return cb && cb(e);
      };
      /* bindind received event callbacks */


      const configKeys = keys$1(config);

      configKeys.forEach(v => {
        if (v.indexOf('on') === 0) {
          const funcName = `EASE_AUDIO_${v.toUpperCase()}_INITIAL_CALLBACK`;

          this._onEvent(v, config[v], funcName);
        }
      });
      this.eventMethods = {
        // loading state
        loadstart: e => {
          this.playState === playStateSet[1] && this._setPlayState(playStateSet[0]);

          this._fireEventQueue(e, 'onload');
        },
        // playing state
        playing: e => {
          this._setPlayState(playStateSet[1]);

          this._fireEventQueue(e, 'onplay');
        },
        canplaythrough: e => {
          this.playState === playStateSet[0] && this._setPlayState(playStateSet[1]);
        },
        // paused state
        pause: e => {
          this._setPlayState(playStateSet[2]);

          this._fireEventQueue(e, 'onpause');
        },
        // ended state
        ended: e => {
          if (this.isEnd) {
            this.isEnd = false;
          } else {
            this.isEnd = true;

            this._fireEventQueue(e, 'onend');

            this.config.endAutoCut && this._cut(true);
          }
        },
        // loaderror state
        error: e => {
          this._setPlayState(playStateSet[5]);

          this._fireEventQueue(e, 'onloaderror');
        },
        // others
        progress: e => {
          const ranges = e.target.buffered;
          const total = e.total || 1;
          let buffered = 0;
          let loaded = e.loaded || 0;
          let progress = loaded / total;

          if (ranges && ranges.length) {
            for (let i = 0, j = ranges.length; i < j; i++) {
              this.buffered.push({
                'start': ranges.start(i) * 1000,
                'end': ranges.end(i) * 1000
              });
            }

            buffered = (ranges.end(0) - ranges.start(0)) * 1000;
            loaded = Math.min(1, buffered / (e.target.duration * 1000));
            progress = loaded / total;
          }

          this._fireEventQueue({
            e,
            progress
          }, 'onprogress');
        },
        durationchange: e => {},
        loadedmetadata: e => {
          this.metaDataLoaded = true;
          this.seekValue && this.seek(this.seekValue);
        },
        loadeddata: e => {},
        timeupdate: e => {
          // playState is loading but actually is playing
          if (this.playState === playStateSet[0]) {
            this._logInfo("timeupdate's playing");

            this._setPlayState(playStateSet[1]);

            this._fireEventQueue(e, 'onplay');
          } // Depending on currentTime and duration to mimic end event


          const isEnd = this.audioH5.duration && +this.audioH5.currentTime >= +this.audioH5.duration;

          if (isEnd) {
            this._logInfo("timeupdate's ended");

            if (this.isEnd) {
              this.isEnd = false;
            } else {
              this.isEnd = true;

              this._fireEventQueue(e, 'onend');

              this.config.endAutoCut && this._cut(true);
            }
          }

          this._fireEventQueue(e, 'ontimeupdate');
        },
        canplay: e => {
          this._fireEventQueue(e, 'oncanplay');
        },
        seeking: e => {
          this._fireEventQueue(e, 'onseeking');
        },
        seeked: e => {
          this._fireEventQueue(e, 'onseeked');
        },
        play: e => {},
        volumechange: e => {
          this._fireEventQueue(e, 'onvolume');
        },
        ratechange: e => {
          this._fireEventQueue(e, 'onrate');
        },
        abort: e => {},
        suspend: e => {}
      };

      for (let k in this.eventMethods) {
        this.eventMethods[k] = curry(this.eventMethods[k], k);
      }

      for (let k in this.eventMethods) {
        this._bindEvent(this.eventMethods[k], k);
      }

      this._blockEvent({
        block: false
      });
    }
    /* unregister Audio Event */


    _unregisterEvent() {
      if (this._checkInit()) {
        for (let k in this.eventMethods) {
          this._removeEvent(this.eventMethods[k], k);
        }
      }
    }
    /* not remove but block event callback */


    _blockEvent({
      event,
      block
    }) {
      if (this._checkInit()) {
        if (event && this._checkType(event, 'string')) {
          this.eventController[event] = !block;
        } else {
          for (let k in this.eventMethods) {
            this.eventController[k] = !block;
          }
        }
      }
    }
    /* whether or not trigger event callback */


    _triggerEventController(event) {
      if (!this.eventController[event]) return false;

      this._log(`trigger ${event} event`);

      return true;
    }
    /* bind event */


    _bindEvent(cb, event) {
      if (!this._checkType(event, 'string')) return this._logErr(`bindEvent - bind event name is not string`);
      this._checkType(cb, 'function', true) && addListener(event, cb, this.audioH5);
    }
    /* remove event */


    _removeEvent(cb, event) {
      if (!this._checkType(event, 'string')) return this._logErr(`removeEvent - unbind event name is not string`);
      this._checkType(cb, 'function', true) && removeListener(event, cb, this.audioH5);
    }
    /* playLock queue handle */


    _playLockQueue(fn) {
      if (this.playLocker) {
        return this.lockQueue.push(fn);
      }

      return fn && fn();
    }
    /* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

    /* check type */


    _checkType(element, type, logErr) {
      if (typeof type !== 'string') return this._logWarn('checkType - The type must be string');

      if (getType(element) !== type) {
        logErr && this._logErr(`Your parameter(${element}) type is ${getType(element)}, please pass the ${type} type`);
        return false;
      }

      return true;
    }
    /* check whether or not init Audio */


    _checkInit() {
      if (!this.isInit) {
        this._logWarn("checkInit - The Audio haven't been initiated");

        return false;
      }

      return true;
    }
    /* detail logger */


    _log(detail) {
      const canLog = this.logLevel !== 'silent' && this.logLevel === 'detail';
      return canLog && this.debug && console.log('[EASE_AUDIO_H5 DETAIL]:', detail);
    }
    /* info logger */


    _logInfo(info) {
      const canLog = this.logLevel !== 'silent' && this.logLevel !== 'error' && this.logLevel !== 'warn';
      return canLog && this.debug && console.info('[EASE_AUDIO_H5 INFO]:', info);
    }
    /* warn logger */


    _logWarn(warn) {
      const canLog = this.logLevel !== 'silent' && this.logLevel !== 'error';
      return canLog && this.debug && console.warn('[EASE_AUDIO_H5 WARN]:', warn);
    }
    /* error logger */


    _logErr(err) {
      const canLog = this.logLevel !== 'silent';
      return canLog && this.debug && console.error('[EASE_AUDIO_H5 ERROR]:', err);
    }

  }

  class EaseAudio {
    constructor(config) {
      this.audio = this._createAudio(config);
      this.init = this.audio.init;
      this.play = this.audio.play;
      this.pause = this.audio.pause;
      this.toggle = this.audio.toggle;
      this.cut = this.audio.cut;
      this.pick = this.audio.pick;
      this.load = this.audio.load;
      this.seek = this.audio.seek;
      this.volume = this.audio.volume;
      this.muted = this.audio.muted;

      this.stop = () => this.audio.stop();

      this.unload = () => this.audio.unload();

      this.on = this.audio.on;
      this.off = this.audio.off;
      this.once = this.audio.once;
      this.model = this.audio.model;
    }

    get duration() {
      return this.audio.duration;
    }

    get playState() {
      return this.audio.playState;
    }

    get playId() {
      return this.audio.playId;
    }

    get playingData() {
      return this.audio.playList[this.audio.playIndex];
    }

    set playlist(params) {
      this.audio.playlist(params);
    }

    get playlist() {
      return this.audio.playList;
    }

    get networkState() {
      return this.audio.networkState;
    }

    _createAudio(config) {
      let audio = {
        init: initFunc,
        play: initFunc,
        pause: initFunc,
        toggle: initFunc,
        load: initFunc,
        seek: initFunc,
        volume: initFunc,
        muted: initFunc,
        stop: initFunc,
        unload: initFunc,
        on: initFunc,
        off: initFunc,
        once: initFunc
      };
      const {
        usingWebAudio
      } = config || {};

      try {
        if (usingWebAudio && (window.AudioContext || window.webkitAudioContext)) {
          audio = new AudioCtx(config);
        } else if (window.Audio) {
          audio = new AudioH5(config);
        }
      } catch (err) {
        console.error('[EASE_AUDIO ERROR]:', err);
      }

      return audio;
    }

  }

  function initFunc() {
    return console.error('[EASE_AUDIO ERROR]: Initialize failed');
  }

  exports.default = EaseAudio;
  exports.EaseAudio = EaseAudio;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
/* Copyright (c) 2018-2019 Bobby.li 
* MIT License 
*/
