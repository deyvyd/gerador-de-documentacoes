var pg = Object.defineProperty;
var mg = (e, t, n) =>
  t in e
    ? pg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var gg = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var G = (e, t, n) => mg(e, typeof t != "symbol" ? t + "" : t, n);
var wC = gg((Ve, Ke) => {
  /**
   * @vue/shared v3.5.13
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ /*! #__NO_SIDE_EFFECTS__ */ function nu(e) {
    const t = Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return (n) => n in t;
  }
  const Mt = {},
    Ii = [],
    Ln = () => {},
    bg = () => !1,
    va = (e) =>
      e.charCodeAt(0) === 111 &&
      e.charCodeAt(1) === 110 &&
      (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    ru = (e) => e.startsWith("onUpdate:"),
    re = Object.assign,
    iu = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
    },
    vg = Object.prototype.hasOwnProperty,
    Lt = (e, t) => vg.call(e, t),
    st = Array.isArray,
    ki = (e) => Js(e) === "[object Map]",
    ya = (e) => Js(e) === "[object Set]",
    Gu = (e) => Js(e) === "[object Date]",
    pt = (e) => typeof e == "function",
    Gt = (e) => typeof e == "string",
    bn = (e) => typeof e == "symbol",
    Pt = (e) => e !== null && typeof e == "object",
    ih = (e) => (Pt(e) || pt(e)) && pt(e.then) && pt(e.catch),
    sh = Object.prototype.toString,
    Js = (e) => sh.call(e),
    yg = (e) => Js(e).slice(8, -1),
    oh = (e) => Js(e) === "[object Object]",
    su = (e) =>
      Gt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    ys = nu(
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    wa = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
    },
    wg = /-(\w)/g,
    nn = wa((e) => e.replace(wg, (t, n) => (n ? n.toUpperCase() : ""))),
    Eg = /\B([A-Z])/g,
    kr = wa((e) => e.replace(Eg, "-$1").toLowerCase()),
    Ea = wa((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Nl = wa((e) => (e ? `on${Ea(e)}` : "")),
    Cr = (e, t) => !Object.is(e, t),
    Mo = (e, ...t) => {
      for (let n = 0; n < e.length; n++) e[n](...t);
    },
    ah = (e, t, n, r = !1) => {
      Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        writable: r,
        value: n,
      });
    },
    Yo = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
    },
    Sg = (e) => {
      const t = Gt(e) ? Number(e) : NaN;
      return isNaN(t) ? e : t;
    };
  let Wu;
  const Sa = () =>
    Wu ||
    (Wu =
      typeof globalThis < "u"
        ? globalThis
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : {});
  function xa(e) {
    if (st(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n],
          i = Gt(r) ? Tg(r) : xa(r);
        if (i) for (const s in i) t[s] = i[s];
      }
      return t;
    } else if (Gt(e) || Pt(e)) return e;
  }
  const xg = /;(?![^(]*\))/g,
    _g = /:([^]+)/,
    Ag = /\/\*[^]*?\*\//g;
  function Tg(e) {
    const t = {};
    return (
      e
        .replace(Ag, "")
        .split(xg)
        .forEach((n) => {
          if (n) {
            const r = n.split(_g);
            r.length > 1 && (t[r[0].trim()] = r[1].trim());
          }
        }),
      t
    );
  }
  function rt(e) {
    let t = "";
    if (Gt(e)) t = e;
    else if (st(e))
      for (let n = 0; n < e.length; n++) {
        const r = rt(e[n]);
        r && (t += r + " ");
      }
    else if (Pt(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  const Cg =
      "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Ng = nu(Cg);
  function lh(e) {
    return !!e || e === "";
  }
  function Ig(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let r = 0; n && r < e.length; r++) n = _a(e[r], t[r]);
    return n;
  }
  function _a(e, t) {
    if (e === t) return !0;
    let n = Gu(e),
      r = Gu(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
    if (((n = bn(e)), (r = bn(t)), n || r)) return e === t;
    if (((n = st(e)), (r = st(t)), n || r)) return n && r ? Ig(e, t) : !1;
    if (((n = Pt(e)), (r = Pt(t)), n || r)) {
      if (!n || !r) return !1;
      const i = Object.keys(e).length,
        s = Object.keys(t).length;
      if (i !== s) return !1;
      for (const o in e) {
        const a = e.hasOwnProperty(o),
          l = t.hasOwnProperty(o);
        if ((a && !l) || (!a && l) || !_a(e[o], t[o])) return !1;
      }
    }
    return String(e) === String(t);
  }
  function kg(e, t) {
    return e.findIndex((n) => _a(n, t));
  }
  const ch = (e) => !!(e && e.__v_isRef === !0),
    Ht = (e) =>
      Gt(e)
        ? e
        : e == null
        ? ""
        : st(e) || (Pt(e) && (e.toString === sh || !pt(e.toString)))
        ? ch(e)
          ? Ht(e.value)
          : JSON.stringify(e, uh, 2)
        : String(e),
    uh = (e, t) =>
      ch(t)
        ? uh(e, t.value)
        : ki(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, i], s) => ((n[Il(r, s) + " =>"] = i), n),
              {}
            ),
          }
        : ya(t)
        ? { [`Set(${t.size})`]: [...t.values()].map((n) => Il(n)) }
        : bn(t)
        ? Il(t)
        : Pt(t) && !st(t) && !oh(t)
        ? String(t)
        : t,
    Il = (e, t = "") => {
      var n;
      return bn(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
  /**
   * @vue/reactivity v3.5.13
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ let Ue;
  class Og {
    constructor(t = !1) {
      (this.detached = t),
        (this._active = !0),
        (this.effects = []),
        (this.cleanups = []),
        (this._isPaused = !1),
        (this.parent = Ue),
        !t &&
          Ue &&
          (this.index = (Ue.scopes || (Ue.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = !0;
        let t, n;
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++)
            this.scopes[t].pause();
        for (t = 0, n = this.effects.length; t < n; t++)
          this.effects[t].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = !1;
        let t, n;
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++)
            this.scopes[t].resume();
        for (t = 0, n = this.effects.length; t < n; t++)
          this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const n = Ue;
        try {
          return (Ue = this), t();
        } finally {
          Ue = n;
        }
      }
    }
    on() {
      Ue = this;
    }
    off() {
      Ue = this.parent;
    }
    stop(t) {
      if (this._active) {
        this._active = !1;
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (
          this.effects.length = 0, n = 0, r = this.cleanups.length;
          n < r;
          n++
        )
          this.cleanups[n]();
        if (((this.cleanups.length = 0), this.scopes)) {
          for (n = 0, r = this.scopes.length; n < r; n++)
            this.scopes[n].stop(!0);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !t) {
          const i = this.parent.scopes.pop();
          i &&
            i !== this &&
            ((this.parent.scopes[this.index] = i), (i.index = this.index));
        }
        this.parent = void 0;
      }
    }
  }
  function Lg() {
    return Ue;
  }
  let Ft;
  const kl = new WeakSet();
  class fh {
    constructor(t) {
      (this.fn = t),
        (this.deps = void 0),
        (this.depsTail = void 0),
        (this.flags = 5),
        (this.next = void 0),
        (this.cleanup = void 0),
        (this.scheduler = void 0),
        Ue && Ue.active && Ue.effects.push(this);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 &&
        ((this.flags &= -65),
        kl.has(this) && (kl.delete(this), this.trigger()));
    }
    notify() {
      (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || hh(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      (this.flags |= 2), Yu(this), ph(this);
      const t = Ft,
        n = mn;
      (Ft = this), (mn = !0);
      try {
        return this.fn();
      } finally {
        mh(this), (Ft = t), (mn = n), (this.flags &= -3);
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) lu(t);
        (this.deps = this.depsTail = void 0),
          Yu(this),
          this.onStop && this.onStop(),
          (this.flags &= -2);
      }
    }
    trigger() {
      this.flags & 64
        ? kl.add(this)
        : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
    }
    runIfDirty() {
      uc(this) && this.run();
    }
    get dirty() {
      return uc(this);
    }
  }
  let dh = 0,
    ws,
    Es;
  function hh(e, t = !1) {
    if (((e.flags |= 8), t)) {
      (e.next = Es), (Es = e);
      return;
    }
    (e.next = ws), (ws = e);
  }
  function ou() {
    dh++;
  }
  function au() {
    if (--dh > 0) return;
    if (Es) {
      let t = Es;
      for (Es = void 0; t; ) {
        const n = t.next;
        (t.next = void 0), (t.flags &= -9), (t = n);
      }
    }
    let e;
    for (; ws; ) {
      let t = ws;
      for (ws = void 0; t; ) {
        const n = t.next;
        if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
          try {
            t.trigger();
          } catch (r) {
            e || (e = r);
          }
        t = n;
      }
    }
    if (e) throw e;
  }
  function ph(e) {
    for (let t = e.deps; t; t = t.nextDep)
      (t.version = -1),
        (t.prevActiveLink = t.dep.activeLink),
        (t.dep.activeLink = t);
  }
  function mh(e) {
    let t,
      n = e.depsTail,
      r = n;
    for (; r; ) {
      const i = r.prevDep;
      r.version === -1 ? (r === n && (n = i), lu(r), qg(r)) : (t = r),
        (r.dep.activeLink = r.prevActiveLink),
        (r.prevActiveLink = void 0),
        (r = i);
    }
    (e.deps = t), (e.depsTail = n);
  }
  function uc(e) {
    for (let t = e.deps; t; t = t.nextDep)
      if (
        t.dep.version !== t.version ||
        (t.dep.computed && (gh(t.dep.computed) || t.dep.version !== t.version))
      )
        return !0;
    return !!e._dirty;
  }
  function gh(e) {
    if (
      (e.flags & 4 && !(e.flags & 16)) ||
      ((e.flags &= -17), e.globalVersion === Ds)
    )
      return;
    e.globalVersion = Ds;
    const t = e.dep;
    if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !uc(e))) {
      e.flags &= -3;
      return;
    }
    const n = Ft,
      r = mn;
    (Ft = e), (mn = !0);
    try {
      ph(e);
      const i = e.fn(e._value);
      (t.version === 0 || Cr(i, e._value)) && ((e._value = i), t.version++);
    } catch (i) {
      throw (t.version++, i);
    } finally {
      (Ft = n), (mn = r), mh(e), (e.flags &= -3);
    }
  }
  function lu(e, t = !1) {
    const { dep: n, prevSub: r, nextSub: i } = e;
    if (
      (r && ((r.nextSub = i), (e.prevSub = void 0)),
      i && ((i.prevSub = r), (e.nextSub = void 0)),
      n.subs === e && ((n.subs = r), !r && n.computed))
    ) {
      n.computed.flags &= -5;
      for (let s = n.computed.deps; s; s = s.nextDep) lu(s, !0);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
  }
  function qg(e) {
    const { prevDep: t, nextDep: n } = e;
    t && ((t.nextDep = n), (e.prevDep = void 0)),
      n && ((n.prevDep = t), (e.nextDep = void 0));
  }
  let mn = !0;
  const bh = [];
  function Or() {
    bh.push(mn), (mn = !1);
  }
  function Lr() {
    const e = bh.pop();
    mn = e === void 0 ? !0 : e;
  }
  function Yu(e) {
    const { cleanup: t } = e;
    if (((e.cleanup = void 0), t)) {
      const n = Ft;
      Ft = void 0;
      try {
        t();
      } finally {
        Ft = n;
      }
    }
  }
  let Ds = 0,
    Rg = class {
      constructor(t, n) {
        (this.sub = t),
          (this.dep = n),
          (this.version = n.version),
          (this.nextDep =
            this.prevDep =
            this.nextSub =
            this.prevSub =
            this.prevActiveLink =
              void 0);
      }
    };
  class cu {
    constructor(t) {
      (this.computed = t),
        (this.version = 0),
        (this.activeLink = void 0),
        (this.subs = void 0),
        (this.map = void 0),
        (this.key = void 0),
        (this.sc = 0);
    }
    track(t) {
      if (!Ft || !mn || Ft === this.computed) return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== Ft)
        (n = this.activeLink = new Rg(Ft, this)),
          Ft.deps
            ? ((n.prevDep = Ft.depsTail),
              (Ft.depsTail.nextDep = n),
              (Ft.depsTail = n))
            : (Ft.deps = Ft.depsTail = n),
          vh(n);
      else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
        const r = n.nextDep;
        (r.prevDep = n.prevDep),
          n.prevDep && (n.prevDep.nextDep = r),
          (n.prevDep = Ft.depsTail),
          (n.nextDep = void 0),
          (Ft.depsTail.nextDep = n),
          (Ft.depsTail = n),
          Ft.deps === n && (Ft.deps = r);
      }
      return n;
    }
    trigger(t) {
      this.version++, Ds++, this.notify(t);
    }
    notify(t) {
      ou();
      try {
        for (let n = this.subs; n; n = n.prevSub)
          n.sub.notify() && n.sub.dep.notify();
      } finally {
        au();
      }
    }
  }
  function vh(e) {
    if ((e.dep.sc++, e.sub.flags & 4)) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) vh(r);
      }
      const n = e.dep.subs;
      n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e);
    }
  }
  const fc = new WeakMap(),
    Yr = Symbol(""),
    dc = Symbol(""),
    Ms = Symbol("");
  function be(e, t, n) {
    if (mn && Ft) {
      let r = fc.get(e);
      r || fc.set(e, (r = new Map()));
      let i = r.get(n);
      i || (r.set(n, (i = new cu())), (i.map = r), (i.key = n)), i.track();
    }
  }
  function Xn(e, t, n, r, i, s) {
    const o = fc.get(e);
    if (!o) {
      Ds++;
      return;
    }
    const a = (l) => {
      l && l.trigger();
    };
    if ((ou(), t === "clear")) o.forEach(a);
    else {
      const l = st(e),
        c = l && su(n);
      if (l && n === "length") {
        const f = Number(r);
        o.forEach((d, h) => {
          (h === "length" || h === Ms || (!bn(h) && h >= f)) && a(d);
        });
      } else
        switch (
          ((n !== void 0 || o.has(void 0)) && a(o.get(n)), c && a(o.get(Ms)), t)
        ) {
          case "add":
            l ? c && a(o.get("length")) : (a(o.get(Yr)), ki(e) && a(o.get(dc)));
            break;
          case "delete":
            l || (a(o.get(Yr)), ki(e) && a(o.get(dc)));
            break;
          case "set":
            ki(e) && a(o.get(Yr));
            break;
        }
    }
    au();
  }
  function hi(e) {
    const t = It(e);
    return t === e ? t : (be(t, "iterate", Ms), en(e) ? t : t.map(ve));
  }
  function Aa(e) {
    return be((e = It(e)), "iterate", Ms), e;
  }
  const Dg = {
    __proto__: null,
    [Symbol.iterator]() {
      return Ol(this, Symbol.iterator, ve);
    },
    concat(...e) {
      return hi(this).concat(...e.map((t) => (st(t) ? hi(t) : t)));
    },
    entries() {
      return Ol(this, "entries", (e) => ((e[1] = ve(e[1])), e));
    },
    every(e, t) {
      return Kn(this, "every", e, t, void 0, arguments);
    },
    filter(e, t) {
      return Kn(this, "filter", e, t, (n) => n.map(ve), arguments);
    },
    find(e, t) {
      return Kn(this, "find", e, t, ve, arguments);
    },
    findIndex(e, t) {
      return Kn(this, "findIndex", e, t, void 0, arguments);
    },
    findLast(e, t) {
      return Kn(this, "findLast", e, t, ve, arguments);
    },
    findLastIndex(e, t) {
      return Kn(this, "findLastIndex", e, t, void 0, arguments);
    },
    forEach(e, t) {
      return Kn(this, "forEach", e, t, void 0, arguments);
    },
    includes(...e) {
      return Ll(this, "includes", e);
    },
    indexOf(...e) {
      return Ll(this, "indexOf", e);
    },
    join(e) {
      return hi(this).join(e);
    },
    lastIndexOf(...e) {
      return Ll(this, "lastIndexOf", e);
    },
    map(e, t) {
      return Kn(this, "map", e, t, void 0, arguments);
    },
    pop() {
      return cs(this, "pop");
    },
    push(...e) {
      return cs(this, "push", e);
    },
    reduce(e, ...t) {
      return Xu(this, "reduce", e, t);
    },
    reduceRight(e, ...t) {
      return Xu(this, "reduceRight", e, t);
    },
    shift() {
      return cs(this, "shift");
    },
    some(e, t) {
      return Kn(this, "some", e, t, void 0, arguments);
    },
    splice(...e) {
      return cs(this, "splice", e);
    },
    toReversed() {
      return hi(this).toReversed();
    },
    toSorted(e) {
      return hi(this).toSorted(e);
    },
    toSpliced(...e) {
      return hi(this).toSpliced(...e);
    },
    unshift(...e) {
      return cs(this, "unshift", e);
    },
    values() {
      return Ol(this, "values", ve);
    },
  };
  function Ol(e, t, n) {
    const r = Aa(e),
      i = r[t]();
    return (
      r !== e &&
        !en(e) &&
        ((i._next = i.next),
        (i.next = () => {
          const s = i._next();
          return s.value && (s.value = n(s.value)), s;
        })),
      i
    );
  }
  const Mg = Array.prototype;
  function Kn(e, t, n, r, i, s) {
    const o = Aa(e),
      a = o !== e && !en(e),
      l = o[t];
    if (l !== Mg[t]) {
      const d = l.apply(e, s);
      return a ? ve(d) : d;
    }
    let c = n;
    o !== e &&
      (a
        ? (c = function (d, h) {
            return n.call(this, ve(d), h, e);
          })
        : n.length > 2 &&
          (c = function (d, h) {
            return n.call(this, d, h, e);
          }));
    const f = l.call(o, c, r);
    return a && i ? i(f) : f;
  }
  function Xu(e, t, n, r) {
    const i = Aa(e);
    let s = n;
    return (
      i !== e &&
        (en(e)
          ? n.length > 3 &&
            (s = function (o, a, l) {
              return n.call(this, o, a, l, e);
            })
          : (s = function (o, a, l) {
              return n.call(this, o, ve(a), l, e);
            })),
      i[t](s, ...r)
    );
  }
  function Ll(e, t, n) {
    const r = It(e);
    be(r, "iterate", Ms);
    const i = r[t](...n);
    return (i === -1 || i === !1) && du(n[0])
      ? ((n[0] = It(n[0])), r[t](...n))
      : i;
  }
  function cs(e, t, n = []) {
    Or(), ou();
    const r = It(e)[t].apply(e, n);
    return au(), Lr(), r;
  }
  const Pg = nu("__proto__,__v_isRef,__isVue"),
    yh = new Set(
      Object.getOwnPropertyNames(Symbol)
        .filter((e) => e !== "arguments" && e !== "caller")
        .map((e) => Symbol[e])
        .filter(bn)
    );
  function Bg(e) {
    bn(e) || (e = String(e));
    const t = It(this);
    return be(t, "has", e), t.hasOwnProperty(e);
  }
  class wh {
    constructor(t = !1, n = !1) {
      (this._isReadonly = t), (this._isShallow = n);
    }
    get(t, n, r) {
      if (n === "__v_skip") return t.__v_skip;
      const i = this._isReadonly,
        s = this._isShallow;
      if (n === "__v_isReactive") return !i;
      if (n === "__v_isReadonly") return i;
      if (n === "__v_isShallow") return s;
      if (n === "__v_raw")
        return r === (i ? (s ? Wg : _h) : s ? xh : Sh).get(t) ||
          Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
          ? t
          : void 0;
      const o = st(t);
      if (!i) {
        let l;
        if (o && (l = Dg[n])) return l;
        if (n === "hasOwnProperty") return Bg;
      }
      const a = Reflect.get(t, n, we(t) ? t : r);
      return (bn(n) ? yh.has(n) : Pg(n)) || (i || be(t, "get", n), s)
        ? a
        : we(a)
        ? o && su(n)
          ? a
          : a.value
        : Pt(a)
        ? i
          ? Th(a)
          : Ta(a)
        : a;
    }
  }
  class Eh extends wh {
    constructor(t = !1) {
      super(!1, t);
    }
    set(t, n, r, i) {
      let s = t[n];
      if (!this._isShallow) {
        const l = Xr(s);
        if (
          (!en(r) && !Xr(r) && ((s = It(s)), (r = It(r))),
          !st(t) && we(s) && !we(r))
        )
          return l ? !1 : ((s.value = r), !0);
      }
      const o = st(t) && su(n) ? Number(n) < t.length : Lt(t, n),
        a = Reflect.set(t, n, r, we(t) ? t : i);
      return (
        t === It(i) &&
          (o ? Cr(r, s) && Xn(t, "set", n, r) : Xn(t, "add", n, r)),
        a
      );
    }
    deleteProperty(t, n) {
      const r = Lt(t, n);
      t[n];
      const i = Reflect.deleteProperty(t, n);
      return i && r && Xn(t, "delete", n, void 0), i;
    }
    has(t, n) {
      const r = Reflect.has(t, n);
      return (!bn(n) || !yh.has(n)) && be(t, "has", n), r;
    }
    ownKeys(t) {
      return be(t, "iterate", st(t) ? "length" : Yr), Reflect.ownKeys(t);
    }
  }
  class Fg extends wh {
    constructor(t = !1) {
      super(!0, t);
    }
    set(t, n) {
      return !0;
    }
    deleteProperty(t, n) {
      return !0;
    }
  }
  const $g = new Eh(),
    jg = new Fg(),
    Ug = new Eh(!0),
    hc = (e) => e,
    So = (e) => Reflect.getPrototypeOf(e);
  function Hg(e, t, n) {
    return function (...r) {
      const i = this.__v_raw,
        s = It(i),
        o = ki(s),
        a = e === "entries" || (e === Symbol.iterator && o),
        l = e === "keys" && o,
        c = i[e](...r),
        f = n ? hc : t ? pc : ve;
      return (
        !t && be(s, "iterate", l ? dc : Yr),
        {
          next() {
            const { value: d, done: h } = c.next();
            return h
              ? { value: d, done: h }
              : { value: a ? [f(d[0]), f(d[1])] : f(d), done: h };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function xo(e) {
    return function (...t) {
      return e === "delete" ? !1 : e === "clear" ? void 0 : this;
    };
  }
  function zg(e, t) {
    const n = {
      get(i) {
        const s = this.__v_raw,
          o = It(s),
          a = It(i);
        e || (Cr(i, a) && be(o, "get", i), be(o, "get", a));
        const { has: l } = So(o),
          c = t ? hc : e ? pc : ve;
        if (l.call(o, i)) return c(s.get(i));
        if (l.call(o, a)) return c(s.get(a));
        s !== o && s.get(i);
      },
      get size() {
        const i = this.__v_raw;
        return !e && be(It(i), "iterate", Yr), Reflect.get(i, "size", i);
      },
      has(i) {
        const s = this.__v_raw,
          o = It(s),
          a = It(i);
        return (
          e || (Cr(i, a) && be(o, "has", i), be(o, "has", a)),
          i === a ? s.has(i) : s.has(i) || s.has(a)
        );
      },
      forEach(i, s) {
        const o = this,
          a = o.__v_raw,
          l = It(a),
          c = t ? hc : e ? pc : ve;
        return (
          !e && be(l, "iterate", Yr),
          a.forEach((f, d) => i.call(s, c(f), c(d), o))
        );
      },
    };
    return (
      re(
        n,
        e
          ? {
              add: xo("add"),
              set: xo("set"),
              delete: xo("delete"),
              clear: xo("clear"),
            }
          : {
              add(i) {
                !t && !en(i) && !Xr(i) && (i = It(i));
                const s = It(this);
                return (
                  So(s).has.call(s, i) || (s.add(i), Xn(s, "add", i, i)), this
                );
              },
              set(i, s) {
                !t && !en(s) && !Xr(s) && (s = It(s));
                const o = It(this),
                  { has: a, get: l } = So(o);
                let c = a.call(o, i);
                c || ((i = It(i)), (c = a.call(o, i)));
                const f = l.call(o, i);
                return (
                  o.set(i, s),
                  c ? Cr(s, f) && Xn(o, "set", i, s) : Xn(o, "add", i, s),
                  this
                );
              },
              delete(i) {
                const s = It(this),
                  { has: o, get: a } = So(s);
                let l = o.call(s, i);
                l || ((i = It(i)), (l = o.call(s, i))), a && a.call(s, i);
                const c = s.delete(i);
                return l && Xn(s, "delete", i, void 0), c;
              },
              clear() {
                const i = It(this),
                  s = i.size !== 0,
                  o = i.clear();
                return s && Xn(i, "clear", void 0, void 0), o;
              },
            }
      ),
      ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
        n[i] = Hg(i, e, t);
      }),
      n
    );
  }
  function uu(e, t) {
    const n = zg(e, t);
    return (r, i, s) =>
      i === "__v_isReactive"
        ? !e
        : i === "__v_isReadonly"
        ? e
        : i === "__v_raw"
        ? r
        : Reflect.get(Lt(n, i) && i in r ? n : r, i, s);
  }
  const Vg = { get: uu(!1, !1) },
    Kg = { get: uu(!1, !0) },
    Gg = { get: uu(!0, !1) },
    Sh = new WeakMap(),
    xh = new WeakMap(),
    _h = new WeakMap(),
    Wg = new WeakMap();
  function Yg(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Xg(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Yg(yg(e));
  }
  function Ta(e) {
    return Xr(e) ? e : fu(e, !1, $g, Vg, Sh);
  }
  function Ah(e) {
    return fu(e, !1, Ug, Kg, xh);
  }
  function Th(e) {
    return fu(e, !0, jg, Gg, _h);
  }
  function fu(e, t, n, r, i) {
    if (!Pt(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const s = i.get(e);
    if (s) return s;
    const o = Xg(e);
    if (o === 0) return e;
    const a = new Proxy(e, o === 2 ? r : n);
    return i.set(e, a), a;
  }
  function Oi(e) {
    return Xr(e) ? Oi(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function Xr(e) {
    return !!(e && e.__v_isReadonly);
  }
  function en(e) {
    return !!(e && e.__v_isShallow);
  }
  function du(e) {
    return e ? !!e.__v_raw : !1;
  }
  function It(e) {
    const t = e && e.__v_raw;
    return t ? It(t) : e;
  }
  function Zg(e) {
    return (
      !Lt(e, "__v_skip") && Object.isExtensible(e) && ah(e, "__v_skip", !0), e
    );
  }
  const ve = (e) => (Pt(e) ? Ta(e) : e),
    pc = (e) => (Pt(e) ? Th(e) : e);
  function we(e) {
    return e ? e.__v_isRef === !0 : !1;
  }
  function Jg(e) {
    return Ch(e, !1);
  }
  function Qg(e) {
    return Ch(e, !0);
  }
  function Ch(e, t) {
    return we(e) ? e : new t1(e, t);
  }
  class t1 {
    constructor(t, n) {
      (this.dep = new cu()),
        (this.__v_isRef = !0),
        (this.__v_isShallow = !1),
        (this._rawValue = n ? t : It(t)),
        (this._value = n ? t : ve(t)),
        (this.__v_isShallow = n);
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const n = this._rawValue,
        r = this.__v_isShallow || en(t) || Xr(t);
      (t = r ? t : It(t)),
        Cr(t, n) &&
          ((this._rawValue = t),
          (this._value = r ? t : ve(t)),
          this.dep.trigger());
    }
  }
  function Li(e) {
    return we(e) ? e.value : e;
  }
  const e1 = {
    get: (e, t, n) => (t === "__v_raw" ? e : Li(Reflect.get(e, t, n))),
    set: (e, t, n, r) => {
      const i = e[t];
      return we(i) && !we(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r);
    },
  };
  function Nh(e) {
    return Oi(e) ? e : new Proxy(e, e1);
  }
  class n1 {
    constructor(t, n, r) {
      (this.fn = t),
        (this.setter = n),
        (this._value = void 0),
        (this.dep = new cu(this)),
        (this.__v_isRef = !0),
        (this.deps = void 0),
        (this.depsTail = void 0),
        (this.flags = 16),
        (this.globalVersion = Ds - 1),
        (this.next = void 0),
        (this.effect = this),
        (this.__v_isReadonly = !n),
        (this.isSSR = r);
    }
    notify() {
      if (((this.flags |= 16), !(this.flags & 8) && Ft !== this))
        return hh(this, !0), !0;
    }
    get value() {
      const t = this.dep.track();
      return gh(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  }
  function r1(e, t, n = !1) {
    let r, i;
    return pt(e) ? (r = e) : ((r = e.get), (i = e.set)), new n1(r, i, n);
  }
  const _o = {},
    Xo = new WeakMap();
  let Kr;
  function i1(e, t = !1, n = Kr) {
    if (n) {
      let r = Xo.get(n);
      r || Xo.set(n, (r = [])), r.push(e);
    }
  }
  function s1(e, t, n = Mt) {
    const {
        immediate: r,
        deep: i,
        once: s,
        scheduler: o,
        augmentJob: a,
        call: l,
      } = n,
      c = (C) => (i ? C : en(C) || i === !1 || i === 0 ? Zn(C, 1) : Zn(C));
    let f,
      d,
      h,
      p,
      g = !1,
      v = !1;
    if (
      (we(e)
        ? ((d = () => e.value), (g = en(e)))
        : Oi(e)
        ? ((d = () => c(e)), (g = !0))
        : st(e)
        ? ((v = !0),
          (g = e.some((C) => Oi(C) || en(C))),
          (d = () =>
            e.map((C) => {
              if (we(C)) return C.value;
              if (Oi(C)) return c(C);
              if (pt(C)) return l ? l(C, 2) : C();
            })))
        : pt(e)
        ? t
          ? (d = l ? () => l(e, 2) : e)
          : (d = () => {
              if (h) {
                Or();
                try {
                  h();
                } finally {
                  Lr();
                }
              }
              const C = Kr;
              Kr = f;
              try {
                return l ? l(e, 3, [p]) : e(p);
              } finally {
                Kr = C;
              }
            })
        : (d = Ln),
      t && i)
    ) {
      const C = d,
        q = i === !0 ? 1 / 0 : i;
      d = () => Zn(C(), q);
    }
    const E = Lg(),
      x = () => {
        f.stop(), E && E.active && iu(E.effects, f);
      };
    if (s && t) {
      const C = t;
      t = (...q) => {
        C(...q), x();
      };
    }
    let A = v ? new Array(e.length).fill(_o) : _o;
    const T = (C) => {
      if (!(!(f.flags & 1) || (!f.dirty && !C)))
        if (t) {
          const q = f.run();
          if (i || g || (v ? q.some((P, W) => Cr(P, A[W])) : Cr(q, A))) {
            h && h();
            const P = Kr;
            Kr = f;
            try {
              const W = [q, A === _o ? void 0 : v && A[0] === _o ? [] : A, p];
              l ? l(t, 3, W) : t(...W), (A = q);
            } finally {
              Kr = P;
            }
          }
        } else f.run();
    };
    return (
      a && a(T),
      (f = new fh(d)),
      (f.scheduler = o ? () => o(T, !1) : T),
      (p = (C) => i1(C, !1, f)),
      (h = f.onStop =
        () => {
          const C = Xo.get(f);
          if (C) {
            if (l) l(C, 4);
            else for (const q of C) q();
            Xo.delete(f);
          }
        }),
      t ? (r ? T(!0) : (A = f.run())) : o ? o(T.bind(null, !0), !0) : f.run(),
      (x.pause = f.pause.bind(f)),
      (x.resume = f.resume.bind(f)),
      (x.stop = x),
      x
    );
  }
  function Zn(e, t = 1 / 0, n) {
    if (t <= 0 || !Pt(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
      return e;
    if ((n.add(e), t--, we(e))) Zn(e.value, t, n);
    else if (st(e)) for (let r = 0; r < e.length; r++) Zn(e[r], t, n);
    else if (ya(e) || ki(e))
      e.forEach((r) => {
        Zn(r, t, n);
      });
    else if (oh(e)) {
      for (const r in e) Zn(e[r], t, n);
      for (const r of Object.getOwnPropertySymbols(e))
        Object.prototype.propertyIsEnumerable.call(e, r) && Zn(e[r], t, n);
    }
    return e;
  }
  /**
   * @vue/runtime-core v3.5.13
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ function Qs(e, t, n, r) {
    try {
      return r ? e(...r) : e();
    } catch (i) {
      Ca(i, t, n);
    }
  }
  function vn(e, t, n, r) {
    if (pt(e)) {
      const i = Qs(e, t, n, r);
      return (
        i &&
          ih(i) &&
          i.catch((s) => {
            Ca(s, t, n);
          }),
        i
      );
    }
    if (st(e)) {
      const i = [];
      for (let s = 0; s < e.length; s++) i.push(vn(e[s], t, n, r));
      return i;
    }
  }
  function Ca(e, t, n, r = !0) {
    const i = t ? t.vnode : null,
      { errorHandler: s, throwUnhandledErrorInProduction: o } =
        (t && t.appContext.config) || Mt;
    if (t) {
      let a = t.parent;
      const l = t.proxy,
        c = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; a; ) {
        const f = a.ec;
        if (f) {
          for (let d = 0; d < f.length; d++) if (f[d](e, l, c) === !1) return;
        }
        a = a.parent;
      }
      if (s) {
        Or(), Qs(s, null, 10, [e, l, c]), Lr();
        return;
      }
    }
    o1(e, n, i, r, o);
  }
  function o1(e, t, n, r = !0, i = !1) {
    if (i) throw e;
    console.error(e);
  }
  const Oe = [];
  let In = -1;
  const qi = [];
  let gr = null,
    bi = 0;
  const Ih = Promise.resolve();
  let Zo = null;
  function hu(e) {
    const t = Zo || Ih;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function a1(e) {
    let t = In + 1,
      n = Oe.length;
    for (; t < n; ) {
      const r = (t + n) >>> 1,
        i = Oe[r],
        s = Ps(i);
      s < e || (s === e && i.flags & 2) ? (t = r + 1) : (n = r);
    }
    return t;
  }
  function pu(e) {
    if (!(e.flags & 1)) {
      const t = Ps(e),
        n = Oe[Oe.length - 1];
      !n || (!(e.flags & 2) && t >= Ps(n))
        ? Oe.push(e)
        : Oe.splice(a1(t), 0, e),
        (e.flags |= 1),
        kh();
    }
  }
  function kh() {
    Zo || (Zo = Ih.then(Lh));
  }
  function l1(e) {
    st(e)
      ? qi.push(...e)
      : gr && e.id === -1
      ? gr.splice(bi + 1, 0, e)
      : e.flags & 1 || (qi.push(e), (e.flags |= 1)),
      kh();
  }
  function Zu(e, t, n = In + 1) {
    for (; n < Oe.length; n++) {
      const r = Oe[n];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        Oe.splice(n, 1),
          n--,
          r.flags & 4 && (r.flags &= -2),
          r(),
          r.flags & 4 || (r.flags &= -2);
      }
    }
  }
  function Oh(e) {
    if (qi.length) {
      const t = [...new Set(qi)].sort((n, r) => Ps(n) - Ps(r));
      if (((qi.length = 0), gr)) {
        gr.push(...t);
        return;
      }
      for (gr = t, bi = 0; bi < gr.length; bi++) {
        const n = gr[bi];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2);
      }
      (gr = null), (bi = 0);
    }
  }
  const Ps = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
  function Lh(e) {
    try {
      for (In = 0; In < Oe.length; In++) {
        const t = Oe[In];
        t &&
          !(t.flags & 8) &&
          (t.flags & 4 && (t.flags &= -2),
          Qs(t, t.i, t.i ? 15 : 14),
          t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; In < Oe.length; In++) {
        const t = Oe[In];
        t && (t.flags &= -2);
      }
      (In = -1),
        (Oe.length = 0),
        Oh(),
        (Zo = null),
        (Oe.length || qi.length) && Lh();
    }
  }
  let se = null,
    qh = null;
  function Jo(e) {
    const t = se;
    return (se = e), (qh = (e && e.type.__scopeId) || null), t;
  }
  function Qo(e, t = se, n) {
    if (!t || e._n) return e;
    const r = (...i) => {
      r._d && lf(-1);
      const s = Jo(t);
      let o;
      try {
        o = e(...i);
      } finally {
        Jo(s), r._d && lf(1);
      }
      return o;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
  }
  function ke(e, t) {
    if (se === null) return e;
    const n = Oa(se),
      r = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
      let [s, o, a, l = Mt] = t[i];
      s &&
        (pt(s) && (s = { mounted: s, updated: s }),
        s.deep && Zn(o),
        r.push({
          dir: s,
          instance: n,
          value: o,
          oldValue: void 0,
          arg: a,
          modifiers: l,
        }));
    }
    return e;
  }
  function jr(e, t, n, r) {
    const i = e.dirs,
      s = t && t.dirs;
    for (let o = 0; o < i.length; o++) {
      const a = i[o];
      s && (a.oldValue = s[o].value);
      let l = a.dir[r];
      l && (Or(), vn(l, n, 8, [e.el, a, e, t]), Lr());
    }
  }
  const c1 = Symbol("_vte"),
    u1 = (e) => e.__isTeleport,
    pi = Symbol("_leaveCb"),
    Ao = Symbol("_enterCb");
  function f1() {
    const e = {
      isMounted: !1,
      isLeaving: !1,
      isUnmounting: !1,
      leavingVNodes: new Map(),
    };
    return (
      Fh(() => {
        e.isMounted = !0;
      }),
      jh(() => {
        e.isUnmounting = !0;
      }),
      e
    );
  }
  const We = [Function, Array],
    d1 = {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: We,
      onEnter: We,
      onAfterEnter: We,
      onEnterCancelled: We,
      onBeforeLeave: We,
      onLeave: We,
      onAfterLeave: We,
      onLeaveCancelled: We,
      onBeforeAppear: We,
      onAppear: We,
      onAfterAppear: We,
      onAppearCancelled: We,
    };
  function h1(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || ((r = Object.create(null)), n.set(t.type, r)), r;
  }
  function mc(e, t, n, r, i) {
    const {
        appear: s,
        mode: o,
        persisted: a = !1,
        onBeforeEnter: l,
        onEnter: c,
        onAfterEnter: f,
        onEnterCancelled: d,
        onBeforeLeave: h,
        onLeave: p,
        onAfterLeave: g,
        onLeaveCancelled: v,
        onBeforeAppear: E,
        onAppear: x,
        onAfterAppear: A,
        onAppearCancelled: T,
      } = t,
      C = String(e.key),
      q = h1(n, e),
      P = (Y, ut) => {
        Y && vn(Y, r, 9, ut);
      },
      W = (Y, ut) => {
        const dt = ut[1];
        P(Y, ut),
          st(Y) ? Y.every((z) => z.length <= 1) && dt() : Y.length <= 1 && dt();
      },
      at = {
        mode: o,
        persisted: a,
        beforeEnter(Y) {
          let ut = l;
          if (!n.isMounted)
            if (s) ut = E || l;
            else return;
          Y[pi] && Y[pi](!0);
          const dt = q[C];
          dt && vi(e, dt) && dt.el[pi] && dt.el[pi](), P(ut, [Y]);
        },
        enter(Y) {
          let ut = c,
            dt = f,
            z = d;
          if (!n.isMounted)
            if (s) (ut = x || c), (dt = A || f), (z = T || d);
            else return;
          let ct = !1;
          const Nt = (Y[Ao] = (jt) => {
            ct ||
              ((ct = !0),
              jt ? P(z, [Y]) : P(dt, [Y]),
              at.delayedLeave && at.delayedLeave(),
              (Y[Ao] = void 0));
          });
          ut ? W(ut, [Y, Nt]) : Nt();
        },
        leave(Y, ut) {
          const dt = String(e.key);
          if ((Y[Ao] && Y[Ao](!0), n.isUnmounting)) return ut();
          P(h, [Y]);
          let z = !1;
          const ct = (Y[pi] = (Nt) => {
            z ||
              ((z = !0),
              ut(),
              Nt ? P(v, [Y]) : P(g, [Y]),
              (Y[pi] = void 0),
              q[dt] === e && delete q[dt]);
          });
          (q[dt] = e), p ? W(p, [Y, ct]) : ct();
        },
        clone(Y) {
          return mc(Y, t, n, r);
        },
      };
    return at;
  }
  function Bs(e, t) {
    e.shapeFlag & 6 && e.component
      ? ((e.transition = t), Bs(e.component.subTree, t))
      : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
  }
  function Rh(e, t = !1, n) {
    let r = [],
      i = 0;
    for (let s = 0; s < e.length; s++) {
      let o = e[s];
      const a =
        n == null ? o.key : String(n) + String(o.key != null ? o.key : s);
      o.type === qt
        ? (o.patchFlag & 128 && i++, (r = r.concat(Rh(o.children, t, a))))
        : (t || o.type !== tr) && r.push(a != null ? Zr(o, { key: a }) : o);
    }
    if (i > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
    return r;
  }
  /*! #__NO_SIDE_EFFECTS__ */ function Dh(e, t) {
    return pt(e) ? re({ name: e.name }, t, { setup: e }) : e;
  }
  function Mh(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  function ta(e, t, n, r, i = !1) {
    if (st(e)) {
      e.forEach((g, v) => ta(g, t && (st(t) ? t[v] : t), n, r, i));
      return;
    }
    if (Ri(r) && !i) {
      r.shapeFlag & 512 &&
        r.type.__asyncResolved &&
        r.component.subTree.component &&
        ta(e, t, n, r.component.subTree);
      return;
    }
    const s = r.shapeFlag & 4 ? Oa(r.component) : r.el,
      o = i ? null : s,
      { i: a, r: l } = e,
      c = t && t.r,
      f = a.refs === Mt ? (a.refs = {}) : a.refs,
      d = a.setupState,
      h = It(d),
      p = d === Mt ? () => !1 : (g) => Lt(h, g);
    if (
      (c != null &&
        c !== l &&
        (Gt(c)
          ? ((f[c] = null), p(c) && (d[c] = null))
          : we(c) && (c.value = null)),
      pt(l))
    )
      Qs(l, a, 12, [o, f]);
    else {
      const g = Gt(l),
        v = we(l);
      if (g || v) {
        const E = () => {
          if (e.f) {
            const x = g ? (p(l) ? d[l] : f[l]) : l.value;
            i
              ? st(x) && iu(x, s)
              : st(x)
              ? x.includes(s) || x.push(s)
              : g
              ? ((f[l] = [s]), p(l) && (d[l] = f[l]))
              : ((l.value = [s]), e.k && (f[e.k] = l.value));
          } else
            g
              ? ((f[l] = o), p(l) && (d[l] = o))
              : v && ((l.value = o), e.k && (f[e.k] = o));
        };
        o ? ((E.id = -1), $e(E, n)) : E();
      }
    }
  }
  Sa().requestIdleCallback;
  Sa().cancelIdleCallback;
  const Ri = (e) => !!e.type.__asyncLoader,
    Ph = (e) => e.type.__isKeepAlive;
  function p1(e, t) {
    Bh(e, "a", t);
  }
  function m1(e, t) {
    Bh(e, "da", t);
  }
  function Bh(e, t, n = fe) {
    const r =
      e.__wdc ||
      (e.__wdc = () => {
        let i = n;
        for (; i; ) {
          if (i.isDeactivated) return;
          i = i.parent;
        }
        return e();
      });
    if ((Na(t, r, n), n)) {
      let i = n.parent;
      for (; i && i.parent; )
        Ph(i.parent.vnode) && g1(r, t, n, i), (i = i.parent);
    }
  }
  function g1(e, t, n, r) {
    const i = Na(t, e, r, !0);
    Uh(() => {
      iu(r[t], i);
    }, n);
  }
  function Na(e, t, n = fe, r = !1) {
    if (n) {
      const i = n[e] || (n[e] = []),
        s =
          t.__weh ||
          (t.__weh = (...o) => {
            Or();
            const a = to(n),
              l = vn(t, n, e, o);
            return a(), Lr(), l;
          });
      return r ? i.unshift(s) : i.push(s), s;
    }
  }
  const sr =
      (e) =>
      (t, n = fe) => {
        (!js || e === "sp") && Na(e, (...r) => t(...r), n);
      },
    b1 = sr("bm"),
    Fh = sr("m"),
    v1 = sr("bu"),
    $h = sr("u"),
    jh = sr("bum"),
    Uh = sr("um"),
    y1 = sr("sp"),
    w1 = sr("rtg"),
    E1 = sr("rtc");
  function S1(e, t = fe) {
    Na("ec", e, t);
  }
  const x1 = "components";
  function Ie(e, t) {
    return A1(x1, e, !0, t) || e;
  }
  const _1 = Symbol.for("v-ndc");
  function A1(e, t, n = !0, r = !1) {
    const i = se || fe;
    if (i) {
      const s = i.type;
      {
        const a = d0(s, !1);
        if (a && (a === t || a === nn(t) || a === Ea(nn(t)))) return s;
      }
      const o = Ju(i[e] || s[e], t) || Ju(i.appContext[e], t);
      return !o && r ? s : o;
    }
  }
  function Ju(e, t) {
    return e && (e[t] || e[nn(t)] || e[Ea(nn(t))]);
  }
  function pn(e, t, n, r) {
    let i;
    const s = n,
      o = st(e);
    if (o || Gt(e)) {
      const a = o && Oi(e);
      let l = !1;
      a && ((l = !en(e)), (e = Aa(e))), (i = new Array(e.length));
      for (let c = 0, f = e.length; c < f; c++)
        i[c] = t(l ? ve(e[c]) : e[c], c, void 0, s);
    } else if (typeof e == "number") {
      i = new Array(e);
      for (let a = 0; a < e; a++) i[a] = t(a + 1, a, void 0, s);
    } else if (Pt(e))
      if (e[Symbol.iterator]) i = Array.from(e, (a, l) => t(a, l, void 0, s));
      else {
        const a = Object.keys(e);
        i = new Array(a.length);
        for (let l = 0, c = a.length; l < c; l++) {
          const f = a[l];
          i[l] = t(e[f], f, l, s);
        }
      }
    else i = [];
    return i;
  }
  function ea(e, t, n = {}, r, i) {
    if (se.ce || (se.parent && Ri(se.parent) && se.parent.ce))
      return (
        t !== "default" && (n.name = t),
        $(),
        Er(qt, null, [Rt("slot", n, r && r())], 64)
      );
    let s = e[t];
    s && s._c && (s._d = !1), $();
    const o = s && Hh(s(n)),
      a = n.key || (o && o.key),
      l = Er(
        qt,
        { key: (a && !bn(a) ? a : `_${t}`) + (!o && r ? "_fb" : "") },
        o || (r ? r() : []),
        o && e._ === 1 ? 64 : -2
      );
    return s && s._c && (s._d = !0), l;
  }
  function Hh(e) {
    return e.some((t) =>
      $s(t) ? !(t.type === tr || (t.type === qt && !Hh(t.children))) : !0
    )
      ? e
      : null;
  }
  const gc = (e) => (e ? (up(e) ? Oa(e) : gc(e.parent)) : null),
    Ss = re(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => gc(e.parent),
      $root: (e) => gc(e.root),
      $host: (e) => e.ce,
      $emit: (e) => e.emit,
      $options: (e) => Vh(e),
      $forceUpdate: (e) =>
        e.f ||
        (e.f = () => {
          pu(e.update);
        }),
      $nextTick: (e) => e.n || (e.n = hu.bind(e.proxy)),
      $watch: (e) => K1.bind(e),
    }),
    ql = (e, t) => e !== Mt && !e.__isScriptSetup && Lt(e, t),
    T1 = {
      get({ _: e }, t) {
        if (t === "__v_skip") return !0;
        const {
          ctx: n,
          setupState: r,
          data: i,
          props: s,
          accessCache: o,
          type: a,
          appContext: l,
        } = e;
        let c;
        if (t[0] !== "$") {
          const p = o[t];
          if (p !== void 0)
            switch (p) {
              case 1:
                return r[t];
              case 2:
                return i[t];
              case 4:
                return n[t];
              case 3:
                return s[t];
            }
          else {
            if (ql(r, t)) return (o[t] = 1), r[t];
            if (i !== Mt && Lt(i, t)) return (o[t] = 2), i[t];
            if ((c = e.propsOptions[0]) && Lt(c, t)) return (o[t] = 3), s[t];
            if (n !== Mt && Lt(n, t)) return (o[t] = 4), n[t];
            bc && (o[t] = 0);
          }
        }
        const f = Ss[t];
        let d, h;
        if (f) return t === "$attrs" && be(e.attrs, "get", ""), f(e);
        if ((d = a.__cssModules) && (d = d[t])) return d;
        if (n !== Mt && Lt(n, t)) return (o[t] = 4), n[t];
        if (((h = l.config.globalProperties), Lt(h, t))) return h[t];
      },
      set({ _: e }, t, n) {
        const { data: r, setupState: i, ctx: s } = e;
        return ql(i, t)
          ? ((i[t] = n), !0)
          : r !== Mt && Lt(r, t)
          ? ((r[t] = n), !0)
          : Lt(e.props, t) || (t[0] === "$" && t.slice(1) in e)
          ? !1
          : ((s[t] = n), !0);
      },
      has(
        {
          _: {
            data: e,
            setupState: t,
            accessCache: n,
            ctx: r,
            appContext: i,
            propsOptions: s,
          },
        },
        o
      ) {
        let a;
        return (
          !!n[o] ||
          (e !== Mt && Lt(e, o)) ||
          ql(t, o) ||
          ((a = s[0]) && Lt(a, o)) ||
          Lt(r, o) ||
          Lt(Ss, o) ||
          Lt(i.config.globalProperties, o)
        );
      },
      defineProperty(e, t, n) {
        return (
          n.get != null
            ? (e._.accessCache[t] = 0)
            : Lt(n, "value") && this.set(e, t, n.value, null),
          Reflect.defineProperty(e, t, n)
        );
      },
    };
  function Qu(e) {
    return st(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
  }
  let bc = !0;
  function C1(e) {
    const t = Vh(e),
      n = e.proxy,
      r = e.ctx;
    (bc = !1), t.beforeCreate && tf(t.beforeCreate, e, "bc");
    const {
      data: i,
      computed: s,
      methods: o,
      watch: a,
      provide: l,
      inject: c,
      created: f,
      beforeMount: d,
      mounted: h,
      beforeUpdate: p,
      updated: g,
      activated: v,
      deactivated: E,
      beforeDestroy: x,
      beforeUnmount: A,
      destroyed: T,
      unmounted: C,
      render: q,
      renderTracked: P,
      renderTriggered: W,
      errorCaptured: at,
      serverPrefetch: Y,
      expose: ut,
      inheritAttrs: dt,
      components: z,
      directives: ct,
      filters: Nt,
    } = t;
    if ((c && N1(c, r, null), o))
      for (const vt in o) {
        const mt = o[vt];
        pt(mt) && (r[vt] = mt.bind(n));
      }
    if (i) {
      const vt = i.call(n, n);
      Pt(vt) && (e.data = Ta(vt));
    }
    if (((bc = !0), s))
      for (const vt in s) {
        const mt = s[vt],
          Se = pt(mt) ? mt.bind(n, n) : pt(mt.get) ? mt.get.bind(n, n) : Ln,
          gt = !pt(mt) && pt(mt.set) ? mt.set.bind(n) : Ln,
          oe = dn({ get: Se, set: gt });
        Object.defineProperty(r, vt, {
          enumerable: !0,
          configurable: !0,
          get: () => oe.value,
          set: (Wt) => (oe.value = Wt),
        });
      }
    if (a) for (const vt in a) zh(a[vt], r, n, vt);
    if (l) {
      const vt = pt(l) ? l.call(n) : l;
      Reflect.ownKeys(vt).forEach((mt) => {
        Po(mt, vt[mt]);
      });
    }
    f && tf(f, e, "c");
    function St(vt, mt) {
      st(mt) ? mt.forEach((Se) => vt(Se.bind(n))) : mt && vt(mt.bind(n));
    }
    if (
      (St(b1, d),
      St(Fh, h),
      St(v1, p),
      St($h, g),
      St(p1, v),
      St(m1, E),
      St(S1, at),
      St(E1, P),
      St(w1, W),
      St(jh, A),
      St(Uh, C),
      St(y1, Y),
      st(ut))
    )
      if (ut.length) {
        const vt = e.exposed || (e.exposed = {});
        ut.forEach((mt) => {
          Object.defineProperty(vt, mt, {
            get: () => n[mt],
            set: (Se) => (n[mt] = Se),
          });
        });
      } else e.exposed || (e.exposed = {});
    q && e.render === Ln && (e.render = q),
      dt != null && (e.inheritAttrs = dt),
      z && (e.components = z),
      ct && (e.directives = ct),
      Y && Mh(e);
  }
  function N1(e, t, n = Ln) {
    st(e) && (e = vc(e));
    for (const r in e) {
      const i = e[r];
      let s;
      Pt(i)
        ? "default" in i
          ? (s = Jn(i.from || r, i.default, !0))
          : (s = Jn(i.from || r))
        : (s = Jn(i)),
        we(s)
          ? Object.defineProperty(t, r, {
              enumerable: !0,
              configurable: !0,
              get: () => s.value,
              set: (o) => (s.value = o),
            })
          : (t[r] = s);
    }
  }
  function tf(e, t, n) {
    vn(st(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
  }
  function zh(e, t, n, r) {
    let i = r.includes(".") ? sp(n, r) : () => n[r];
    if (Gt(e)) {
      const s = t[e];
      pt(s) && Bo(i, s);
    } else if (pt(e)) Bo(i, e.bind(n));
    else if (Pt(e))
      if (st(e)) e.forEach((s) => zh(s, t, n, r));
      else {
        const s = pt(e.handler) ? e.handler.bind(n) : t[e.handler];
        pt(s) && Bo(i, s, e);
      }
  }
  function Vh(e) {
    const t = e.type,
      { mixins: n, extends: r } = t,
      {
        mixins: i,
        optionsCache: s,
        config: { optionMergeStrategies: o },
      } = e.appContext,
      a = s.get(t);
    let l;
    return (
      a
        ? (l = a)
        : !i.length && !n && !r
        ? (l = t)
        : ((l = {}),
          i.length && i.forEach((c) => na(l, c, o, !0)),
          na(l, t, o)),
      Pt(t) && s.set(t, l),
      l
    );
  }
  function na(e, t, n, r = !1) {
    const { mixins: i, extends: s } = t;
    s && na(e, s, n, !0), i && i.forEach((o) => na(e, o, n, !0));
    for (const o in t)
      if (!(r && o === "expose")) {
        const a = I1[o] || (n && n[o]);
        e[o] = a ? a(e[o], t[o]) : t[o];
      }
    return e;
  }
  const I1 = {
    data: ef,
    props: nf,
    emits: nf,
    methods: ps,
    computed: ps,
    beforeCreate: Ce,
    created: Ce,
    beforeMount: Ce,
    mounted: Ce,
    beforeUpdate: Ce,
    updated: Ce,
    beforeDestroy: Ce,
    beforeUnmount: Ce,
    destroyed: Ce,
    unmounted: Ce,
    activated: Ce,
    deactivated: Ce,
    errorCaptured: Ce,
    serverPrefetch: Ce,
    components: ps,
    directives: ps,
    watch: O1,
    provide: ef,
    inject: k1,
  };
  function ef(e, t) {
    return t
      ? e
        ? function () {
            return re(
              pt(e) ? e.call(this, this) : e,
              pt(t) ? t.call(this, this) : t
            );
          }
        : t
      : e;
  }
  function k1(e, t) {
    return ps(vc(e), vc(t));
  }
  function vc(e) {
    if (st(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
    }
    return e;
  }
  function Ce(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
  }
  function ps(e, t) {
    return e ? re(Object.create(null), e, t) : t;
  }
  function nf(e, t) {
    return e
      ? st(e) && st(t)
        ? [...new Set([...e, ...t])]
        : re(Object.create(null), Qu(e), Qu(t ?? {}))
      : t;
  }
  function O1(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = re(Object.create(null), e);
    for (const r in t) n[r] = Ce(e[r], t[r]);
    return n;
  }
  function Kh() {
    return {
      app: null,
      config: {
        isNativeTag: bg,
        performance: !1,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: void 0,
        warnHandler: void 0,
        compilerOptions: {},
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
    };
  }
  let L1 = 0;
  function q1(e, t) {
    return function (r, i = null) {
      pt(r) || (r = re({}, r)), i != null && !Pt(i) && (i = null);
      const s = Kh(),
        o = new WeakSet(),
        a = [];
      let l = !1;
      const c = (s.app = {
        _uid: L1++,
        _component: r,
        _props: i,
        _container: null,
        _context: s,
        _instance: null,
        version: p0,
        get config() {
          return s.config;
        },
        set config(f) {},
        use(f, ...d) {
          return (
            o.has(f) ||
              (f && pt(f.install)
                ? (o.add(f), f.install(c, ...d))
                : pt(f) && (o.add(f), f(c, ...d))),
            c
          );
        },
        mixin(f) {
          return s.mixins.includes(f) || s.mixins.push(f), c;
        },
        component(f, d) {
          return d ? ((s.components[f] = d), c) : s.components[f];
        },
        directive(f, d) {
          return d ? ((s.directives[f] = d), c) : s.directives[f];
        },
        mount(f, d, h) {
          if (!l) {
            const p = c._ceVNode || Rt(r, i);
            return (
              (p.appContext = s),
              h === !0 ? (h = "svg") : h === !1 && (h = void 0),
              e(p, f, h),
              (l = !0),
              (c._container = f),
              (f.__vue_app__ = c),
              Oa(p.component)
            );
          }
        },
        onUnmount(f) {
          a.push(f);
        },
        unmount() {
          l &&
            (vn(a, c._instance, 16),
            e(null, c._container),
            delete c._container.__vue_app__);
        },
        provide(f, d) {
          return (s.provides[f] = d), c;
        },
        runWithContext(f) {
          const d = Di;
          Di = c;
          try {
            return f();
          } finally {
            Di = d;
          }
        },
      });
      return c;
    };
  }
  let Di = null;
  function Po(e, t) {
    if (fe) {
      let n = fe.provides;
      const r = fe.parent && fe.parent.provides;
      r === n && (n = fe.provides = Object.create(r)), (n[e] = t);
    }
  }
  function Jn(e, t, n = !1) {
    const r = fe || se;
    if (r || Di) {
      const i = Di
        ? Di._context.provides
        : r
        ? r.parent == null
          ? r.vnode.appContext && r.vnode.appContext.provides
          : r.parent.provides
        : void 0;
      if (i && e in i) return i[e];
      if (arguments.length > 1) return n && pt(t) ? t.call(r && r.proxy) : t;
    }
  }
  const Gh = {},
    Wh = () => Object.create(Gh),
    Yh = (e) => Object.getPrototypeOf(e) === Gh;
  function R1(e, t, n, r = !1) {
    const i = {},
      s = Wh();
    (e.propsDefaults = Object.create(null)), Xh(e, t, i, s);
    for (const o in e.propsOptions[0]) o in i || (i[o] = void 0);
    n
      ? (e.props = r ? i : Ah(i))
      : e.type.props
      ? (e.props = i)
      : (e.props = s),
      (e.attrs = s);
  }
  function D1(e, t, n, r) {
    const {
        props: i,
        attrs: s,
        vnode: { patchFlag: o },
      } = e,
      a = It(i),
      [l] = e.propsOptions;
    let c = !1;
    if ((r || o > 0) && !(o & 16)) {
      if (o & 8) {
        const f = e.vnode.dynamicProps;
        for (let d = 0; d < f.length; d++) {
          let h = f[d];
          if (Ia(e.emitsOptions, h)) continue;
          const p = t[h];
          if (l)
            if (Lt(s, h)) p !== s[h] && ((s[h] = p), (c = !0));
            else {
              const g = nn(h);
              i[g] = yc(l, a, g, p, e, !1);
            }
          else p !== s[h] && ((s[h] = p), (c = !0));
        }
      }
    } else {
      Xh(e, t, i, s) && (c = !0);
      let f;
      for (const d in a)
        (!t || (!Lt(t, d) && ((f = kr(d)) === d || !Lt(t, f)))) &&
          (l
            ? n &&
              (n[d] !== void 0 || n[f] !== void 0) &&
              (i[d] = yc(l, a, d, void 0, e, !0))
            : delete i[d]);
      if (s !== a)
        for (const d in s) (!t || !Lt(t, d)) && (delete s[d], (c = !0));
    }
    c && Xn(e.attrs, "set", "");
  }
  function Xh(e, t, n, r) {
    const [i, s] = e.propsOptions;
    let o = !1,
      a;
    if (t)
      for (let l in t) {
        if (ys(l)) continue;
        const c = t[l];
        let f;
        i && Lt(i, (f = nn(l)))
          ? !s || !s.includes(f)
            ? (n[f] = c)
            : ((a || (a = {}))[f] = c)
          : Ia(e.emitsOptions, l) ||
            ((!(l in r) || c !== r[l]) && ((r[l] = c), (o = !0)));
      }
    if (s) {
      const l = It(n),
        c = a || Mt;
      for (let f = 0; f < s.length; f++) {
        const d = s[f];
        n[d] = yc(i, l, d, c[d], e, !Lt(c, d));
      }
    }
    return o;
  }
  function yc(e, t, n, r, i, s) {
    const o = e[n];
    if (o != null) {
      const a = Lt(o, "default");
      if (a && r === void 0) {
        const l = o.default;
        if (o.type !== Function && !o.skipFactory && pt(l)) {
          const { propsDefaults: c } = i;
          if (n in c) r = c[n];
          else {
            const f = to(i);
            (r = c[n] = l.call(null, t)), f();
          }
        } else r = l;
        i.ce && i.ce._setProp(n, r);
      }
      o[0] &&
        (s && !a ? (r = !1) : o[1] && (r === "" || r === kr(n)) && (r = !0));
    }
    return r;
  }
  const M1 = new WeakMap();
  function Zh(e, t, n = !1) {
    const r = n ? M1 : t.propsCache,
      i = r.get(e);
    if (i) return i;
    const s = e.props,
      o = {},
      a = [];
    let l = !1;
    if (!pt(e)) {
      const f = (d) => {
        l = !0;
        const [h, p] = Zh(d, t, !0);
        re(o, h), p && a.push(...p);
      };
      !n && t.mixins.length && t.mixins.forEach(f),
        e.extends && f(e.extends),
        e.mixins && e.mixins.forEach(f);
    }
    if (!s && !l) return Pt(e) && r.set(e, Ii), Ii;
    if (st(s))
      for (let f = 0; f < s.length; f++) {
        const d = nn(s[f]);
        rf(d) && (o[d] = Mt);
      }
    else if (s)
      for (const f in s) {
        const d = nn(f);
        if (rf(d)) {
          const h = s[f],
            p = (o[d] = st(h) || pt(h) ? { type: h } : re({}, h)),
            g = p.type;
          let v = !1,
            E = !0;
          if (st(g))
            for (let x = 0; x < g.length; ++x) {
              const A = g[x],
                T = pt(A) && A.name;
              if (T === "Boolean") {
                v = !0;
                break;
              } else T === "String" && (E = !1);
            }
          else v = pt(g) && g.name === "Boolean";
          (p[0] = v), (p[1] = E), (v || Lt(p, "default")) && a.push(d);
        }
      }
    const c = [o, a];
    return Pt(e) && r.set(e, c), c;
  }
  function rf(e) {
    return e[0] !== "$" && !ys(e);
  }
  const Jh = (e) => e[0] === "_" || e === "$stable",
    mu = (e) => (st(e) ? e.map(On) : [On(e)]),
    P1 = (e, t, n) => {
      if (t._n) return t;
      const r = Qo((...i) => mu(t(...i)), n);
      return (r._c = !1), r;
    },
    Qh = (e, t, n) => {
      const r = e._ctx;
      for (const i in e) {
        if (Jh(i)) continue;
        const s = e[i];
        if (pt(s)) t[i] = P1(i, s, r);
        else if (s != null) {
          const o = mu(s);
          t[i] = () => o;
        }
      }
    },
    tp = (e, t) => {
      const n = mu(t);
      e.slots.default = () => n;
    },
    ep = (e, t, n) => {
      for (const r in t) (n || r !== "_") && (e[r] = t[r]);
    },
    B1 = (e, t, n) => {
      const r = (e.slots = Wh());
      if (e.vnode.shapeFlag & 32) {
        const i = t._;
        i ? (ep(r, t, n), n && ah(r, "_", i, !0)) : Qh(t, r);
      } else t && tp(e, t);
    },
    F1 = (e, t, n) => {
      const { vnode: r, slots: i } = e;
      let s = !0,
        o = Mt;
      if (r.shapeFlag & 32) {
        const a = t._;
        a
          ? n && a === 1
            ? (s = !1)
            : ep(i, t, n)
          : ((s = !t.$stable), Qh(t, i)),
          (o = t);
      } else t && (tp(e, t), (o = { default: 1 }));
      if (s) for (const a in i) !Jh(a) && o[a] == null && delete i[a];
    },
    $e = Q1;
  function $1(e) {
    return j1(e);
  }
  function j1(e, t) {
    const n = Sa();
    n.__VUE__ = !0;
    const {
        insert: r,
        remove: i,
        patchProp: s,
        createElement: o,
        createText: a,
        createComment: l,
        setText: c,
        setElementText: f,
        parentNode: d,
        nextSibling: h,
        setScopeId: p = Ln,
        insertStaticContent: g,
      } = e,
      v = (
        b,
        y,
        _,
        I = null,
        R = null,
        O = null,
        H = void 0,
        B = null,
        M = !!y.dynamicChildren
      ) => {
        if (b === y) return;
        b && !vi(b, y) && ((I = k(b)), Wt(b, R, O, !0), (b = null)),
          y.patchFlag === -2 && ((M = !1), (y.dynamicChildren = null));
        const { type: D, ref: nt, shapeFlag: V } = y;
        switch (D) {
          case ka:
            E(b, y, _, I);
            break;
          case tr:
            x(b, y, _, I);
            break;
          case Dl:
            b == null && A(y, _, I, H);
            break;
          case qt:
            z(b, y, _, I, R, O, H, B, M);
            break;
          default:
            V & 1
              ? q(b, y, _, I, R, O, H, B, M)
              : V & 6
              ? ct(b, y, _, I, R, O, H, B, M)
              : (V & 64 || V & 128) && D.process(b, y, _, I, R, O, H, B, M, J);
        }
        nt != null && R && ta(nt, b && b.ref, O, y || b, !y);
      },
      E = (b, y, _, I) => {
        if (b == null) r((y.el = a(y.children)), _, I);
        else {
          const R = (y.el = b.el);
          y.children !== b.children && c(R, y.children);
        }
      },
      x = (b, y, _, I) => {
        b == null ? r((y.el = l(y.children || "")), _, I) : (y.el = b.el);
      },
      A = (b, y, _, I) => {
        [b.el, b.anchor] = g(b.children, y, _, I, b.el, b.anchor);
      },
      T = ({ el: b, anchor: y }, _, I) => {
        let R;
        for (; b && b !== y; ) (R = h(b)), r(b, _, I), (b = R);
        r(y, _, I);
      },
      C = ({ el: b, anchor: y }) => {
        let _;
        for (; b && b !== y; ) (_ = h(b)), i(b), (b = _);
        i(y);
      },
      q = (b, y, _, I, R, O, H, B, M) => {
        y.type === "svg" ? (H = "svg") : y.type === "math" && (H = "mathml"),
          b == null ? P(y, _, I, R, O, H, B, M) : Y(b, y, R, O, H, B, M);
      },
      P = (b, y, _, I, R, O, H, B) => {
        let M, D;
        const { props: nt, shapeFlag: V, transition: Z, dirs: it } = b;
        if (
          ((M = b.el = o(b.type, O, nt && nt.is, nt)),
          V & 8
            ? f(M, b.children)
            : V & 16 && at(b.children, M, null, I, R, Rl(b, O), H, B),
          it && jr(b, null, I, "created"),
          W(M, b, b.scopeId, H, I),
          nt)
        ) {
          for (const xt in nt)
            xt !== "value" && !ys(xt) && s(M, xt, null, nt[xt], O, I);
          "value" in nt && s(M, "value", null, nt.value, O),
            (D = nt.onVnodeBeforeMount) && Cn(D, I, b);
        }
        it && jr(b, null, I, "beforeMount");
        const bt = U1(R, Z);
        bt && Z.beforeEnter(M),
          r(M, y, _),
          ((D = nt && nt.onVnodeMounted) || bt || it) &&
            $e(() => {
              D && Cn(D, I, b),
                bt && Z.enter(M),
                it && jr(b, null, I, "mounted");
            }, R);
      },
      W = (b, y, _, I, R) => {
        if ((_ && p(b, _), I)) for (let O = 0; O < I.length; O++) p(b, I[O]);
        if (R) {
          let O = R.subTree;
          if (
            y === O ||
            (ap(O.type) && (O.ssContent === y || O.ssFallback === y))
          ) {
            const H = R.vnode;
            W(b, H, H.scopeId, H.slotScopeIds, R.parent);
          }
        }
      },
      at = (b, y, _, I, R, O, H, B, M = 0) => {
        for (let D = M; D < b.length; D++) {
          const nt = (b[D] = B ? br(b[D]) : On(b[D]));
          v(null, nt, y, _, I, R, O, H, B);
        }
      },
      Y = (b, y, _, I, R, O, H) => {
        const B = (y.el = b.el);
        let { patchFlag: M, dynamicChildren: D, dirs: nt } = y;
        M |= b.patchFlag & 16;
        const V = b.props || Mt,
          Z = y.props || Mt;
        let it;
        if (
          (_ && Ur(_, !1),
          (it = Z.onVnodeBeforeUpdate) && Cn(it, _, y, b),
          nt && jr(y, b, _, "beforeUpdate"),
          _ && Ur(_, !0),
          ((V.innerHTML && Z.innerHTML == null) ||
            (V.textContent && Z.textContent == null)) &&
            f(B, ""),
          D
            ? ut(b.dynamicChildren, D, B, _, I, Rl(y, R), O)
            : H || mt(b, y, B, null, _, I, Rl(y, R), O, !1),
          M > 0)
        ) {
          if (M & 16) dt(B, V, Z, _, R);
          else if (
            (M & 2 && V.class !== Z.class && s(B, "class", null, Z.class, R),
            M & 4 && s(B, "style", V.style, Z.style, R),
            M & 8)
          ) {
            const bt = y.dynamicProps;
            for (let xt = 0; xt < bt.length; xt++) {
              const yt = bt[xt],
                Qt = V[yt],
                Dt = Z[yt];
              (Dt !== Qt || yt === "value") && s(B, yt, Qt, Dt, R, _);
            }
          }
          M & 1 && b.children !== y.children && f(B, y.children);
        } else !H && D == null && dt(B, V, Z, _, R);
        ((it = Z.onVnodeUpdated) || nt) &&
          $e(() => {
            it && Cn(it, _, y, b), nt && jr(y, b, _, "updated");
          }, I);
      },
      ut = (b, y, _, I, R, O, H) => {
        for (let B = 0; B < y.length; B++) {
          const M = b[B],
            D = y[B],
            nt =
              M.el && (M.type === qt || !vi(M, D) || M.shapeFlag & 70)
                ? d(M.el)
                : _;
          v(M, D, nt, null, I, R, O, H, !0);
        }
      },
      dt = (b, y, _, I, R) => {
        if (y !== _) {
          if (y !== Mt)
            for (const O in y) !ys(O) && !(O in _) && s(b, O, y[O], null, R, I);
          for (const O in _) {
            if (ys(O)) continue;
            const H = _[O],
              B = y[O];
            H !== B && O !== "value" && s(b, O, B, H, R, I);
          }
          "value" in _ && s(b, "value", y.value, _.value, R);
        }
      },
      z = (b, y, _, I, R, O, H, B, M) => {
        const D = (y.el = b ? b.el : a("")),
          nt = (y.anchor = b ? b.anchor : a(""));
        let { patchFlag: V, dynamicChildren: Z, slotScopeIds: it } = y;
        it && (B = B ? B.concat(it) : it),
          b == null
            ? (r(D, _, I),
              r(nt, _, I),
              at(y.children || [], _, nt, R, O, H, B, M))
            : V > 0 && V & 64 && Z && b.dynamicChildren
            ? (ut(b.dynamicChildren, Z, _, R, O, H, B),
              (y.key != null || (R && y === R.subTree)) && np(b, y, !0))
            : mt(b, y, _, nt, R, O, H, B, M);
      },
      ct = (b, y, _, I, R, O, H, B, M) => {
        (y.slotScopeIds = B),
          b == null
            ? y.shapeFlag & 512
              ? R.ctx.activate(y, _, I, H, M)
              : Nt(y, _, I, R, O, H, M)
            : jt(b, y, M);
      },
      Nt = (b, y, _, I, R, O, H) => {
        const B = (b.component = o0(b, I, R));
        if ((Ph(b) && (B.ctx.renderer = J), l0(B, !1, H), B.asyncDep)) {
          if ((R && R.registerDep(B, St, H), !b.el)) {
            const M = (B.subTree = Rt(tr));
            x(null, M, y, _);
          }
        } else St(B, b, y, _, R, O, H);
      },
      jt = (b, y, _) => {
        const I = (y.component = b.component);
        if (Z1(b, y, _))
          if (I.asyncDep && !I.asyncResolved) {
            vt(I, y, _);
            return;
          } else (I.next = y), I.update();
        else (y.el = b.el), (I.vnode = y);
      },
      St = (b, y, _, I, R, O, H) => {
        const B = () => {
          if (b.isMounted) {
            let { next: V, bu: Z, u: it, parent: bt, vnode: xt } = b;
            {
              const _e = rp(b);
              if (_e) {
                V && ((V.el = xt.el), vt(b, V, H)),
                  _e.asyncDep.then(() => {
                    b.isUnmounted || B();
                  });
                return;
              }
            }
            let yt = V,
              Qt;
            Ur(b, !1),
              V ? ((V.el = xt.el), vt(b, V, H)) : (V = xt),
              Z && Mo(Z),
              (Qt = V.props && V.props.onVnodeBeforeUpdate) &&
                Cn(Qt, bt, V, xt),
              Ur(b, !0);
            const Dt = of(b),
              xe = b.subTree;
            (b.subTree = Dt),
              v(xe, Dt, d(xe.el), k(xe), b, R, O),
              (V.el = Dt.el),
              yt === null && J1(b, Dt.el),
              it && $e(it, R),
              (Qt = V.props && V.props.onVnodeUpdated) &&
                $e(() => Cn(Qt, bt, V, xt), R);
          } else {
            let V;
            const { el: Z, props: it } = y,
              { bm: bt, m: xt, parent: yt, root: Qt, type: Dt } = b,
              xe = Ri(y);
            Ur(b, !1),
              bt && Mo(bt),
              !xe && (V = it && it.onVnodeBeforeMount) && Cn(V, yt, y),
              Ur(b, !0);
            {
              Qt.ce && Qt.ce._injectChildStyle(Dt);
              const _e = (b.subTree = of(b));
              v(null, _e, _, I, b, R, O), (y.el = _e.el);
            }
            if ((xt && $e(xt, R), !xe && (V = it && it.onVnodeMounted))) {
              const _e = y;
              $e(() => Cn(V, yt, _e), R);
            }
            (y.shapeFlag & 256 ||
              (yt && Ri(yt.vnode) && yt.vnode.shapeFlag & 256)) &&
              b.a &&
              $e(b.a, R),
              (b.isMounted = !0),
              (y = _ = I = null);
          }
        };
        b.scope.on();
        const M = (b.effect = new fh(B));
        b.scope.off();
        const D = (b.update = M.run.bind(M)),
          nt = (b.job = M.runIfDirty.bind(M));
        (nt.i = b),
          (nt.id = b.uid),
          (M.scheduler = () => pu(nt)),
          Ur(b, !0),
          D();
      },
      vt = (b, y, _) => {
        y.component = b;
        const I = b.vnode.props;
        (b.vnode = y),
          (b.next = null),
          D1(b, y.props, I, _),
          F1(b, y.children, _),
          Or(),
          Zu(b),
          Lr();
      },
      mt = (b, y, _, I, R, O, H, B, M = !1) => {
        const D = b && b.children,
          nt = b ? b.shapeFlag : 0,
          V = y.children,
          { patchFlag: Z, shapeFlag: it } = y;
        if (Z > 0) {
          if (Z & 128) {
            gt(D, V, _, I, R, O, H, B, M);
            return;
          } else if (Z & 256) {
            Se(D, V, _, I, R, O, H, B, M);
            return;
          }
        }
        it & 8
          ? (nt & 16 && ae(D, R, O), V !== D && f(_, V))
          : nt & 16
          ? it & 16
            ? gt(D, V, _, I, R, O, H, B, M)
            : ae(D, R, O, !0)
          : (nt & 8 && f(_, ""), it & 16 && at(V, _, I, R, O, H, B, M));
      },
      Se = (b, y, _, I, R, O, H, B, M) => {
        (b = b || Ii), (y = y || Ii);
        const D = b.length,
          nt = y.length,
          V = Math.min(D, nt);
        let Z;
        for (Z = 0; Z < V; Z++) {
          const it = (y[Z] = M ? br(y[Z]) : On(y[Z]));
          v(b[Z], it, _, null, R, O, H, B, M);
        }
        D > nt ? ae(b, R, O, !0, !1, V) : at(y, _, I, R, O, H, B, M, V);
      },
      gt = (b, y, _, I, R, O, H, B, M) => {
        let D = 0;
        const nt = y.length;
        let V = b.length - 1,
          Z = nt - 1;
        for (; D <= V && D <= Z; ) {
          const it = b[D],
            bt = (y[D] = M ? br(y[D]) : On(y[D]));
          if (vi(it, bt)) v(it, bt, _, null, R, O, H, B, M);
          else break;
          D++;
        }
        for (; D <= V && D <= Z; ) {
          const it = b[V],
            bt = (y[Z] = M ? br(y[Z]) : On(y[Z]));
          if (vi(it, bt)) v(it, bt, _, null, R, O, H, B, M);
          else break;
          V--, Z--;
        }
        if (D > V) {
          if (D <= Z) {
            const it = Z + 1,
              bt = it < nt ? y[it].el : I;
            for (; D <= Z; )
              v(null, (y[D] = M ? br(y[D]) : On(y[D])), _, bt, R, O, H, B, M),
                D++;
          }
        } else if (D > Z) for (; D <= V; ) Wt(b[D], R, O, !0), D++;
        else {
          const it = D,
            bt = D,
            xt = new Map();
          for (D = bt; D <= Z; D++) {
            const Yt = (y[D] = M ? br(y[D]) : On(y[D]));
            Yt.key != null && xt.set(Yt.key, D);
          }
          let yt,
            Qt = 0;
          const Dt = Z - bt + 1;
          let xe = !1,
            _e = 0;
          const $n = new Array(Dt);
          for (D = 0; D < Dt; D++) $n[D] = 0;
          for (D = it; D <= V; D++) {
            const Yt = b[D];
            if (Qt >= Dt) {
              Wt(Yt, R, O, !0);
              continue;
            }
            let Ae;
            if (Yt.key != null) Ae = xt.get(Yt.key);
            else
              for (yt = bt; yt <= Z; yt++)
                if ($n[yt - bt] === 0 && vi(Yt, y[yt])) {
                  Ae = yt;
                  break;
                }
            Ae === void 0
              ? Wt(Yt, R, O, !0)
              : (($n[Ae - bt] = D + 1),
                Ae >= _e ? (_e = Ae) : (xe = !0),
                v(Yt, y[Ae], _, null, R, O, H, B, M),
                Qt++);
          }
          const cr = xe ? H1($n) : Ii;
          for (yt = cr.length - 1, D = Dt - 1; D >= 0; D--) {
            const Yt = bt + D,
              Ae = y[Yt],
              jn = Yt + 1 < nt ? y[Yt + 1].el : I;
            $n[D] === 0
              ? v(null, Ae, _, jn, R, O, H, B, M)
              : xe && (yt < 0 || D !== cr[yt] ? oe(Ae, _, jn, 2) : yt--);
          }
        }
      },
      oe = (b, y, _, I, R = null) => {
        const { el: O, type: H, transition: B, children: M, shapeFlag: D } = b;
        if (D & 6) {
          oe(b.component.subTree, y, _, I);
          return;
        }
        if (D & 128) {
          b.suspense.move(y, _, I);
          return;
        }
        if (D & 64) {
          H.move(b, y, _, J);
          return;
        }
        if (H === qt) {
          r(O, y, _);
          for (let V = 0; V < M.length; V++) oe(M[V], y, _, I);
          r(b.anchor, y, _);
          return;
        }
        if (H === Dl) {
          T(b, y, _);
          return;
        }
        if (I !== 2 && D & 1 && B)
          if (I === 0) B.beforeEnter(O), r(O, y, _), $e(() => B.enter(O), R);
          else {
            const { leave: V, delayLeave: Z, afterLeave: it } = B,
              bt = () => r(O, y, _),
              xt = () => {
                V(O, () => {
                  bt(), it && it();
                });
              };
            Z ? Z(O, bt, xt) : xt();
          }
        else r(O, y, _);
      },
      Wt = (b, y, _, I = !1, R = !1) => {
        const {
          type: O,
          props: H,
          ref: B,
          children: M,
          dynamicChildren: D,
          shapeFlag: nt,
          patchFlag: V,
          dirs: Z,
          cacheIndex: it,
        } = b;
        if (
          (V === -2 && (R = !1),
          B != null && ta(B, null, _, b, !0),
          it != null && (y.renderCache[it] = void 0),
          nt & 256)
        ) {
          y.ctx.deactivate(b);
          return;
        }
        const bt = nt & 1 && Z,
          xt = !Ri(b);
        let yt;
        if ((xt && (yt = H && H.onVnodeBeforeUnmount) && Cn(yt, y, b), nt & 6))
          _t(b.component, _, I);
        else {
          if (nt & 128) {
            b.suspense.unmount(_, I);
            return;
          }
          bt && jr(b, null, y, "beforeUnmount"),
            nt & 64
              ? b.type.remove(b, y, _, J, I)
              : D && !D.hasOnce && (O !== qt || (V > 0 && V & 64))
              ? ae(D, y, _, !1, !0)
              : ((O === qt && V & 384) || (!R && nt & 16)) && ae(M, y, _),
            I && ie(b);
        }
        ((xt && (yt = H && H.onVnodeUnmounted)) || bt) &&
          $e(() => {
            yt && Cn(yt, y, b), bt && jr(b, null, y, "unmounted");
          }, _);
      },
      ie = (b) => {
        const { type: y, el: _, anchor: I, transition: R } = b;
        if (y === qt) {
          rn(_, I);
          return;
        }
        if (y === Dl) {
          C(b);
          return;
        }
        const O = () => {
          i(_), R && !R.persisted && R.afterLeave && R.afterLeave();
        };
        if (b.shapeFlag & 1 && R && !R.persisted) {
          const { leave: H, delayLeave: B } = R,
            M = () => H(_, O);
          B ? B(b.el, O, M) : M();
        } else O();
      },
      rn = (b, y) => {
        let _;
        for (; b !== y; ) (_ = h(b)), i(b), (b = _);
        i(y);
      },
      _t = (b, y, _) => {
        const { bum: I, scope: R, job: O, subTree: H, um: B, m: M, a: D } = b;
        sf(M),
          sf(D),
          I && Mo(I),
          R.stop(),
          O && ((O.flags |= 8), Wt(H, b, y, _)),
          B && $e(B, y),
          $e(() => {
            b.isUnmounted = !0;
          }, y),
          y &&
            y.pendingBranch &&
            !y.isUnmounted &&
            b.asyncDep &&
            !b.asyncResolved &&
            b.suspenseId === y.pendingId &&
            (y.deps--, y.deps === 0 && y.resolve());
      },
      ae = (b, y, _, I = !1, R = !1, O = 0) => {
        for (let H = O; H < b.length; H++) Wt(b[H], y, _, I, R);
      },
      k = (b) => {
        if (b.shapeFlag & 6) return k(b.component.subTree);
        if (b.shapeFlag & 128) return b.suspense.next();
        const y = h(b.anchor || b.el),
          _ = y && y[c1];
        return _ ? h(_) : y;
      };
    let j = !1;
    const U = (b, y, _) => {
        b == null
          ? y._vnode && Wt(y._vnode, null, null, !0)
          : v(y._vnode || null, b, y, null, null, null, _),
          (y._vnode = b),
          j || ((j = !0), Zu(), Oh(), (j = !1));
      },
      J = {
        p: v,
        um: Wt,
        m: oe,
        r: ie,
        mt: Nt,
        mc: at,
        pc: mt,
        pbc: ut,
        n: k,
        o: e,
      };
    return { render: U, hydrate: void 0, createApp: q1(U) };
  }
  function Rl({ type: e, props: t }, n) {
    return (n === "svg" && e === "foreignObject") ||
      (n === "mathml" &&
        e === "annotation-xml" &&
        t &&
        t.encoding &&
        t.encoding.includes("html"))
      ? void 0
      : n;
  }
  function Ur({ effect: e, job: t }, n) {
    n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
  }
  function U1(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
  }
  function np(e, t, n = !1) {
    const r = e.children,
      i = t.children;
    if (st(r) && st(i))
      for (let s = 0; s < r.length; s++) {
        const o = r[s];
        let a = i[s];
        a.shapeFlag & 1 &&
          !a.dynamicChildren &&
          ((a.patchFlag <= 0 || a.patchFlag === 32) &&
            ((a = i[s] = br(i[s])), (a.el = o.el)),
          !n && a.patchFlag !== -2 && np(o, a)),
          a.type === ka && (a.el = o.el);
      }
  }
  function H1(e) {
    const t = e.slice(),
      n = [0];
    let r, i, s, o, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
      const c = e[r];
      if (c !== 0) {
        if (((i = n[n.length - 1]), e[i] < c)) {
          (t[r] = i), n.push(r);
          continue;
        }
        for (s = 0, o = n.length - 1; s < o; )
          (a = (s + o) >> 1), e[n[a]] < c ? (s = a + 1) : (o = a);
        c < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r));
      }
    }
    for (s = n.length, o = n[s - 1]; s-- > 0; ) (n[s] = o), (o = t[o]);
    return n;
  }
  function rp(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : rp(t);
  }
  function sf(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
  }
  const z1 = Symbol.for("v-scx"),
    V1 = () => Jn(z1);
  function Bo(e, t, n) {
    return ip(e, t, n);
  }
  function ip(e, t, n = Mt) {
    const { immediate: r, deep: i, flush: s, once: o } = n,
      a = re({}, n),
      l = (t && r) || (!t && s !== "post");
    let c;
    if (js) {
      if (s === "sync") {
        const p = V1();
        c = p.__watcherHandles || (p.__watcherHandles = []);
      } else if (!l) {
        const p = () => {};
        return (p.stop = Ln), (p.resume = Ln), (p.pause = Ln), p;
      }
    }
    const f = fe;
    a.call = (p, g, v) => vn(p, f, g, v);
    let d = !1;
    s === "post"
      ? (a.scheduler = (p) => {
          $e(p, f && f.suspense);
        })
      : s !== "sync" &&
        ((d = !0),
        (a.scheduler = (p, g) => {
          g ? p() : pu(p);
        })),
      (a.augmentJob = (p) => {
        t && (p.flags |= 4),
          d && ((p.flags |= 2), f && ((p.id = f.uid), (p.i = f)));
      });
    const h = s1(e, t, a);
    return js && (c ? c.push(h) : l && h()), h;
  }
  function K1(e, t, n) {
    const r = this.proxy,
      i = Gt(e) ? (e.includes(".") ? sp(r, e) : () => r[e]) : e.bind(r, r);
    let s;
    pt(t) ? (s = t) : ((s = t.handler), (n = t));
    const o = to(this),
      a = ip(i, s.bind(r), n);
    return o(), a;
  }
  function sp(e, t) {
    const n = t.split(".");
    return () => {
      let r = e;
      for (let i = 0; i < n.length && r; i++) r = r[n[i]];
      return r;
    };
  }
  const G1 = (e, t) =>
    t === "modelValue" || t === "model-value"
      ? e.modelModifiers
      : e[`${t}Modifiers`] || e[`${nn(t)}Modifiers`] || e[`${kr(t)}Modifiers`];
  function W1(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || Mt;
    let i = n;
    const s = t.startsWith("update:"),
      o = s && G1(r, t.slice(7));
    o &&
      (o.trim && (i = n.map((f) => (Gt(f) ? f.trim() : f))),
      o.number && (i = n.map(Yo)));
    let a,
      l = r[(a = Nl(t))] || r[(a = Nl(nn(t)))];
    !l && s && (l = r[(a = Nl(kr(t)))]), l && vn(l, e, 6, i);
    const c = r[a + "Once"];
    if (c) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[a]) return;
      (e.emitted[a] = !0), vn(c, e, 6, i);
    }
  }
  function op(e, t, n = !1) {
    const r = t.emitsCache,
      i = r.get(e);
    if (i !== void 0) return i;
    const s = e.emits;
    let o = {},
      a = !1;
    if (!pt(e)) {
      const l = (c) => {
        const f = op(c, t, !0);
        f && ((a = !0), re(o, f));
      };
      !n && t.mixins.length && t.mixins.forEach(l),
        e.extends && l(e.extends),
        e.mixins && e.mixins.forEach(l);
    }
    return !s && !a
      ? (Pt(e) && r.set(e, null), null)
      : (st(s) ? s.forEach((l) => (o[l] = null)) : re(o, s),
        Pt(e) && r.set(e, o),
        o);
  }
  function Ia(e, t) {
    return !e || !va(t)
      ? !1
      : ((t = t.slice(2).replace(/Once$/, "")),
        Lt(e, t[0].toLowerCase() + t.slice(1)) || Lt(e, kr(t)) || Lt(e, t));
  }
  function of(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: i,
        propsOptions: [s],
        slots: o,
        attrs: a,
        emit: l,
        render: c,
        renderCache: f,
        props: d,
        data: h,
        setupState: p,
        ctx: g,
        inheritAttrs: v,
      } = e,
      E = Jo(e);
    let x, A;
    try {
      if (n.shapeFlag & 4) {
        const C = i || r,
          q = C;
        (x = On(c.call(q, C, f, d, p, h, g))), (A = a);
      } else {
        const C = t;
        (x = On(
          C.length > 1 ? C(d, { attrs: a, slots: o, emit: l }) : C(d, null)
        )),
          (A = t.props ? a : Y1(a));
      }
    } catch (C) {
      (xs.length = 0), Ca(C, e, 1), (x = Rt(tr));
    }
    let T = x;
    if (A && v !== !1) {
      const C = Object.keys(A),
        { shapeFlag: q } = T;
      C.length &&
        q & 7 &&
        (s && C.some(ru) && (A = X1(A, s)), (T = Zr(T, A, !1, !0)));
    }
    return (
      n.dirs &&
        ((T = Zr(T, null, !1, !0)),
        (T.dirs = T.dirs ? T.dirs.concat(n.dirs) : n.dirs)),
      n.transition && Bs(T, n.transition),
      (x = T),
      Jo(E),
      x
    );
  }
  const Y1 = (e) => {
      let t;
      for (const n in e)
        (n === "class" || n === "style" || va(n)) &&
          ((t || (t = {}))[n] = e[n]);
      return t;
    },
    X1 = (e, t) => {
      const n = {};
      for (const r in e) (!ru(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
      return n;
    };
  function Z1(e, t, n) {
    const { props: r, children: i, component: s } = e,
      { props: o, children: a, patchFlag: l } = t,
      c = s.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
      if (l & 1024) return !0;
      if (l & 16) return r ? af(r, o, c) : !!o;
      if (l & 8) {
        const f = t.dynamicProps;
        for (let d = 0; d < f.length; d++) {
          const h = f[d];
          if (o[h] !== r[h] && !Ia(c, h)) return !0;
        }
      }
    } else
      return (i || a) && (!a || !a.$stable)
        ? !0
        : r === o
        ? !1
        : r
        ? o
          ? af(r, o, c)
          : !0
        : !!o;
    return !1;
  }
  function af(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let i = 0; i < r.length; i++) {
      const s = r[i];
      if (t[s] !== e[s] && !Ia(n, s)) return !0;
    }
    return !1;
  }
  function J1({ vnode: e, parent: t }, n) {
    for (; t; ) {
      const r = t.subTree;
      if (
        (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)
      )
        ((e = t.vnode).el = n), (t = t.parent);
      else break;
    }
  }
  const ap = (e) => e.__isSuspense;
  function Q1(e, t) {
    t && t.pendingBranch
      ? st(e)
        ? t.effects.push(...e)
        : t.effects.push(e)
      : l1(e);
  }
  const qt = Symbol.for("v-fgt"),
    ka = Symbol.for("v-txt"),
    tr = Symbol.for("v-cmt"),
    Dl = Symbol.for("v-stc"),
    xs = [];
  let He = null;
  function $(e = !1) {
    xs.push((He = e ? null : []));
  }
  function t0() {
    xs.pop(), (He = xs[xs.length - 1] || null);
  }
  let Fs = 1;
  function lf(e, t = !1) {
    (Fs += e), e < 0 && He && t && (He.hasOnce = !0);
  }
  function lp(e) {
    return (
      (e.dynamicChildren = Fs > 0 ? He || Ii : null),
      t0(),
      Fs > 0 && He && He.push(e),
      e
    );
  }
  function K(e, t, n, r, i, s) {
    return lp(S(e, t, n, r, i, s, !0));
  }
  function Er(e, t, n, r, i) {
    return lp(Rt(e, t, n, r, i, !0));
  }
  function $s(e) {
    return e ? e.__v_isVNode === !0 : !1;
  }
  function vi(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  const cp = ({ key: e }) => e ?? null,
    Fo = ({ ref: e, ref_key: t, ref_for: n }) => (
      typeof e == "number" && (e = "" + e),
      e != null
        ? Gt(e) || we(e) || pt(e)
          ? { i: se, r: e, k: t, f: !!n }
          : e
        : null
    );
  function S(
    e,
    t = null,
    n = null,
    r = 0,
    i = null,
    s = e === qt ? 0 : 1,
    o = !1,
    a = !1
  ) {
    const l = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && cp(t),
      ref: t && Fo(t),
      scopeId: qh,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: s,
      patchFlag: r,
      dynamicProps: i,
      dynamicChildren: null,
      appContext: null,
      ctx: se,
    };
    return (
      a
        ? (gu(l, n), s & 128 && e.normalize(l))
        : n && (l.shapeFlag |= Gt(n) ? 8 : 16),
      Fs > 0 &&
        !o &&
        He &&
        (l.patchFlag > 0 || s & 6) &&
        l.patchFlag !== 32 &&
        He.push(l),
      l
    );
  }
  const Rt = e0;
  function e0(e, t = null, n = null, r = 0, i = null, s = !1) {
    if (((!e || e === _1) && (e = tr), $s(e))) {
      const a = Zr(e, t, !0);
      return (
        n && gu(a, n),
        Fs > 0 &&
          !s &&
          He &&
          (a.shapeFlag & 6 ? (He[He.indexOf(e)] = a) : He.push(a)),
        (a.patchFlag = -2),
        a
      );
    }
    if ((h0(e) && (e = e.__vccOpts), t)) {
      t = n0(t);
      let { class: a, style: l } = t;
      a && !Gt(a) && (t.class = rt(a)),
        Pt(l) && (du(l) && !st(l) && (l = re({}, l)), (t.style = xa(l)));
    }
    const o = Gt(e) ? 1 : ap(e) ? 128 : u1(e) ? 64 : Pt(e) ? 4 : pt(e) ? 2 : 0;
    return S(e, t, n, r, i, o, s, !0);
  }
  function n0(e) {
    return e ? (du(e) || Yh(e) ? re({}, e) : e) : null;
  }
  function Zr(e, t, n = !1, r = !1) {
    const { props: i, ref: s, patchFlag: o, children: a, transition: l } = e,
      c = t ? r0(i || {}, t) : i,
      f = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && cp(c),
        ref:
          t && t.ref
            ? n && s
              ? st(s)
                ? s.concat(Fo(t))
                : [s, Fo(t)]
              : Fo(t)
            : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: a,
        target: e.target,
        targetStart: e.targetStart,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== qt ? (o === -1 ? 16 : o | 16) : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: l,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Zr(e.ssContent),
        ssFallback: e.ssFallback && Zr(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce,
      };
    return l && r && Bs(f, l.clone(f)), f;
  }
  function ee(e = " ", t = 0) {
    return Rt(ka, null, e, t);
  }
  function Kt(e = "", t = !1) {
    return t ? ($(), Er(tr, null, e)) : Rt(tr, null, e);
  }
  function On(e) {
    return e == null || typeof e == "boolean"
      ? Rt(tr)
      : st(e)
      ? Rt(qt, null, e.slice())
      : $s(e)
      ? br(e)
      : Rt(ka, null, String(e));
  }
  function br(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Zr(e);
  }
  function gu(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (st(t)) n = 16;
    else if (typeof t == "object")
      if (r & 65) {
        const i = t.default;
        i && (i._c && (i._d = !1), gu(e, i()), i._c && (i._d = !0));
        return;
      } else {
        n = 32;
        const i = t._;
        !i && !Yh(t)
          ? (t._ctx = se)
          : i === 3 &&
            se &&
            (se.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
      }
    else
      pt(t)
        ? ((t = { default: t, _ctx: se }), (n = 32))
        : ((t = String(t)), r & 64 ? ((n = 16), (t = [ee(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
  }
  function r0(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const i in r)
        if (i === "class")
          t.class !== r.class && (t.class = rt([t.class, r.class]));
        else if (i === "style") t.style = xa([t.style, r.style]);
        else if (va(i)) {
          const s = t[i],
            o = r[i];
          o &&
            s !== o &&
            !(st(s) && s.includes(o)) &&
            (t[i] = s ? [].concat(s, o) : o);
        } else i !== "" && (t[i] = r[i]);
    }
    return t;
  }
  function Cn(e, t, n, r = null) {
    vn(e, t, 7, [n, r]);
  }
  const i0 = Kh();
  let s0 = 0;
  function o0(e, t, n) {
    const r = e.type,
      i = (t ? t.appContext : e.appContext) || i0,
      s = {
        uid: s0++,
        vnode: e,
        type: r,
        parent: t,
        appContext: i,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        job: null,
        scope: new Og(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(i.provides),
        ids: t ? t.ids : ["", 0, 0],
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: Zh(r, i),
        emitsOptions: op(r, i),
        emit: null,
        emitted: null,
        propsDefaults: Mt,
        inheritAttrs: r.inheritAttrs,
        ctx: Mt,
        data: Mt,
        props: Mt,
        attrs: Mt,
        slots: Mt,
        refs: Mt,
        setupState: Mt,
        setupContext: null,
        suspense: n,
        suspenseId: n ? n.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null,
      };
    return (
      (s.ctx = { _: s }),
      (s.root = t ? t.root : s),
      (s.emit = W1.bind(null, s)),
      e.ce && e.ce(s),
      s
    );
  }
  let fe = null;
  const a0 = () => fe || se;
  let ra, wc;
  {
    const e = Sa(),
      t = (n, r) => {
        let i;
        return (
          (i = e[n]) || (i = e[n] = []),
          i.push(r),
          (s) => {
            i.length > 1 ? i.forEach((o) => o(s)) : i[0](s);
          }
        );
      };
    (ra = t("__VUE_INSTANCE_SETTERS__", (n) => (fe = n))),
      (wc = t("__VUE_SSR_SETTERS__", (n) => (js = n)));
  }
  const to = (e) => {
      const t = fe;
      return (
        ra(e),
        e.scope.on(),
        () => {
          e.scope.off(), ra(t);
        }
      );
    },
    cf = () => {
      fe && fe.scope.off(), ra(null);
    };
  function up(e) {
    return e.vnode.shapeFlag & 4;
  }
  let js = !1;
  function l0(e, t = !1, n = !1) {
    t && wc(t);
    const { props: r, children: i } = e.vnode,
      s = up(e);
    R1(e, r, s, t), B1(e, i, n);
    const o = s ? c0(e, t) : void 0;
    return t && wc(!1), o;
  }
  function c0(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, T1));
    const { setup: r } = n;
    if (r) {
      Or();
      const i = (e.setupContext = r.length > 1 ? f0(e) : null),
        s = to(e),
        o = Qs(r, e, 0, [e.props, i]),
        a = ih(o);
      if ((Lr(), s(), (a || e.sp) && !Ri(e) && Mh(e), a)) {
        if ((o.then(cf, cf), t))
          return o
            .then((l) => {
              uf(e, l);
            })
            .catch((l) => {
              Ca(l, e, 0);
            });
        e.asyncDep = o;
      } else uf(e, o);
    } else fp(e);
  }
  function uf(e, t, n) {
    pt(t)
      ? e.type.__ssrInlineRender
        ? (e.ssrRender = t)
        : (e.render = t)
      : Pt(t) && (e.setupState = Nh(t)),
      fp(e);
  }
  function fp(e, t, n) {
    const r = e.type;
    e.render || (e.render = r.render || Ln);
    {
      const i = to(e);
      Or();
      try {
        C1(e);
      } finally {
        Lr(), i();
      }
    }
  }
  const u0 = {
    get(e, t) {
      return be(e, "get", ""), e[t];
    },
  };
  function f0(e) {
    const t = (n) => {
      e.exposed = n || {};
    };
    return {
      attrs: new Proxy(e.attrs, u0),
      slots: e.slots,
      emit: e.emit,
      expose: t,
    };
  }
  function Oa(e) {
    return e.exposed
      ? e.exposeProxy ||
          (e.exposeProxy = new Proxy(Nh(Zg(e.exposed)), {
            get(t, n) {
              if (n in t) return t[n];
              if (n in Ss) return Ss[n](e);
            },
            has(t, n) {
              return n in t || n in Ss;
            },
          }))
      : e.proxy;
  }
  function d0(e, t = !0) {
    return pt(e) ? e.displayName || e.name : e.name || (t && e.__name);
  }
  function h0(e) {
    return pt(e) && "__vccOpts" in e;
  }
  const dn = (e, t) => r1(e, t, js);
  function dp(e, t, n) {
    const r = arguments.length;
    return r === 2
      ? Pt(t) && !st(t)
        ? $s(t)
          ? Rt(e, null, [t])
          : Rt(e, t)
        : Rt(e, null, t)
      : (r > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : r === 3 && $s(n) && (n = [n]),
        Rt(e, t, n));
  }
  const p0 = "3.5.13";
  /**
   * @vue/runtime-dom v3.5.13
   * (c) 2018-present Yuxi (Evan) You and Vue contributors
   * @license MIT
   **/ let Ec;
  const ff = typeof window < "u" && window.trustedTypes;
  if (ff)
    try {
      Ec = ff.createPolicy("vue", { createHTML: (e) => e });
    } catch {}
  const hp = Ec ? (e) => Ec.createHTML(e) : (e) => e,
    m0 = "http://www.w3.org/2000/svg",
    g0 = "http://www.w3.org/1998/Math/MathML",
    Yn = typeof document < "u" ? document : null,
    df = Yn && Yn.createElement("template"),
    b0 = {
      insert: (e, t, n) => {
        t.insertBefore(e, n || null);
      },
      remove: (e) => {
        const t = e.parentNode;
        t && t.removeChild(e);
      },
      createElement: (e, t, n, r) => {
        const i =
          t === "svg"
            ? Yn.createElementNS(m0, e)
            : t === "mathml"
            ? Yn.createElementNS(g0, e)
            : n
            ? Yn.createElement(e, { is: n })
            : Yn.createElement(e);
        return (
          e === "select" &&
            r &&
            r.multiple != null &&
            i.setAttribute("multiple", r.multiple),
          i
        );
      },
      createText: (e) => Yn.createTextNode(e),
      createComment: (e) => Yn.createComment(e),
      setText: (e, t) => {
        e.nodeValue = t;
      },
      setElementText: (e, t) => {
        e.textContent = t;
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => Yn.querySelector(e),
      setScopeId(e, t) {
        e.setAttribute(t, "");
      },
      insertStaticContent(e, t, n, r, i, s) {
        const o = n ? n.previousSibling : t.lastChild;
        if (i && (i === s || i.nextSibling))
          for (
            ;
            t.insertBefore(i.cloneNode(!0), n),
              !(i === s || !(i = i.nextSibling));

          );
        else {
          df.innerHTML = hp(
            r === "svg"
              ? `<svg>${e}</svg>`
              : r === "mathml"
              ? `<math>${e}</math>`
              : e
          );
          const a = df.content;
          if (r === "svg" || r === "mathml") {
            const l = a.firstChild;
            for (; l.firstChild; ) a.appendChild(l.firstChild);
            a.removeChild(l);
          }
          t.insertBefore(a, n);
        }
        return [
          o ? o.nextSibling : t.firstChild,
          n ? n.previousSibling : t.lastChild,
        ];
      },
    },
    dr = "transition",
    us = "animation",
    ji = Symbol("_vtc"),
    pp = {
      name: String,
      type: String,
      css: { type: Boolean, default: !0 },
      duration: [String, Number, Object],
      enterFromClass: String,
      enterActiveClass: String,
      enterToClass: String,
      appearFromClass: String,
      appearActiveClass: String,
      appearToClass: String,
      leaveFromClass: String,
      leaveActiveClass: String,
      leaveToClass: String,
    },
    v0 = re({}, d1, pp),
    Hr = (e, t = []) => {
      st(e) ? e.forEach((n) => n(...t)) : e && e(...t);
    },
    hf = (e) => (e ? (st(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
  function y0(e) {
    const t = {};
    for (const z in e) z in pp || (t[z] = e[z]);
    if (e.css === !1) return t;
    const {
        name: n = "v",
        type: r,
        duration: i,
        enterFromClass: s = `${n}-enter-from`,
        enterActiveClass: o = `${n}-enter-active`,
        enterToClass: a = `${n}-enter-to`,
        appearFromClass: l = s,
        appearActiveClass: c = o,
        appearToClass: f = a,
        leaveFromClass: d = `${n}-leave-from`,
        leaveActiveClass: h = `${n}-leave-active`,
        leaveToClass: p = `${n}-leave-to`,
      } = e,
      g = w0(i),
      v = g && g[0],
      E = g && g[1],
      {
        onBeforeEnter: x,
        onEnter: A,
        onEnterCancelled: T,
        onLeave: C,
        onLeaveCancelled: q,
        onBeforeAppear: P = x,
        onAppear: W = A,
        onAppearCancelled: at = T,
      } = t,
      Y = (z, ct, Nt, jt) => {
        (z._enterCancelled = jt),
          pr(z, ct ? f : a),
          pr(z, ct ? c : o),
          Nt && Nt();
      },
      ut = (z, ct) => {
        (z._isLeaving = !1), pr(z, d), pr(z, p), pr(z, h), ct && ct();
      },
      dt = (z) => (ct, Nt) => {
        const jt = z ? W : A,
          St = () => Y(ct, z, Nt);
        Hr(jt, [ct, St]),
          pf(() => {
            pr(ct, z ? l : s), Nn(ct, z ? f : a), hf(jt) || mf(ct, r, v, St);
          });
      };
    return re(t, {
      onBeforeEnter(z) {
        Hr(x, [z]), Nn(z, s), Nn(z, o);
      },
      onBeforeAppear(z) {
        Hr(P, [z]), Nn(z, l), Nn(z, c);
      },
      onEnter: dt(!1),
      onAppear: dt(!0),
      onLeave(z, ct) {
        z._isLeaving = !0;
        const Nt = () => ut(z, ct);
        Nn(z, d),
          z._enterCancelled ? (Nn(z, h), Sc()) : (Sc(), Nn(z, h)),
          pf(() => {
            z._isLeaving && (pr(z, d), Nn(z, p), hf(C) || mf(z, r, E, Nt));
          }),
          Hr(C, [z, Nt]);
      },
      onEnterCancelled(z) {
        Y(z, !1, void 0, !0), Hr(T, [z]);
      },
      onAppearCancelled(z) {
        Y(z, !0, void 0, !0), Hr(at, [z]);
      },
      onLeaveCancelled(z) {
        ut(z), Hr(q, [z]);
      },
    });
  }
  function w0(e) {
    if (e == null) return null;
    if (Pt(e)) return [Ml(e.enter), Ml(e.leave)];
    {
      const t = Ml(e);
      return [t, t];
    }
  }
  function Ml(e) {
    return Sg(e);
  }
  function Nn(e, t) {
    t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
      (e[ji] || (e[ji] = new Set())).add(t);
  }
  function pr(e, t) {
    t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
    const n = e[ji];
    n && (n.delete(t), n.size || (e[ji] = void 0));
  }
  function pf(e) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e);
    });
  }
  let E0 = 0;
  function mf(e, t, n, r) {
    const i = (e._endId = ++E0),
      s = () => {
        i === e._endId && r();
      };
    if (n != null) return setTimeout(s, n);
    const { type: o, timeout: a, propCount: l } = mp(e, t);
    if (!o) return r();
    const c = o + "end";
    let f = 0;
    const d = () => {
        e.removeEventListener(c, h), s();
      },
      h = (p) => {
        p.target === e && ++f >= l && d();
      };
    setTimeout(() => {
      f < l && d();
    }, a + 1),
      e.addEventListener(c, h);
  }
  function mp(e, t) {
    const n = window.getComputedStyle(e),
      r = (g) => (n[g] || "").split(", "),
      i = r(`${dr}Delay`),
      s = r(`${dr}Duration`),
      o = gf(i, s),
      a = r(`${us}Delay`),
      l = r(`${us}Duration`),
      c = gf(a, l);
    let f = null,
      d = 0,
      h = 0;
    t === dr
      ? o > 0 && ((f = dr), (d = o), (h = s.length))
      : t === us
      ? c > 0 && ((f = us), (d = c), (h = l.length))
      : ((d = Math.max(o, c)),
        (f = d > 0 ? (o > c ? dr : us) : null),
        (h = f ? (f === dr ? s.length : l.length) : 0));
    const p =
      f === dr && /\b(transform|all)(,|$)/.test(r(`${dr}Property`).toString());
    return { type: f, timeout: d, propCount: h, hasTransform: p };
  }
  function gf(e, t) {
    for (; e.length < t.length; ) e = e.concat(e);
    return Math.max(...t.map((n, r) => bf(n) + bf(e[r])));
  }
  function bf(e) {
    return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
  }
  function Sc() {
    return document.body.offsetHeight;
  }
  function S0(e, t, n) {
    const r = e[ji];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
      t == null
        ? e.removeAttribute("class")
        : n
        ? e.setAttribute("class", t)
        : (e.className = t);
  }
  const vf = Symbol("_vod"),
    x0 = Symbol("_vsh"),
    _0 = Symbol(""),
    A0 = /(^|;)\s*display\s*:/;
  function T0(e, t, n) {
    const r = e.style,
      i = Gt(n);
    let s = !1;
    if (n && !i) {
      if (t)
        if (Gt(t))
          for (const o of t.split(";")) {
            const a = o.slice(0, o.indexOf(":")).trim();
            n[a] == null && $o(r, a, "");
          }
        else for (const o in t) n[o] == null && $o(r, o, "");
      for (const o in n) o === "display" && (s = !0), $o(r, o, n[o]);
    } else if (i) {
      if (t !== n) {
        const o = r[_0];
        o && (n += ";" + o), (r.cssText = n), (s = A0.test(n));
      }
    } else t && e.removeAttribute("style");
    vf in e && ((e[vf] = s ? r.display : ""), e[x0] && (r.display = "none"));
  }
  const yf = /\s*!important$/;
  function $o(e, t, n) {
    if (st(n)) n.forEach((r) => $o(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
      const r = C0(e, t);
      yf.test(n)
        ? e.setProperty(kr(r), n.replace(yf, ""), "important")
        : (e[r] = n);
    }
  }
  const wf = ["Webkit", "Moz", "ms"],
    Pl = {};
  function C0(e, t) {
    const n = Pl[t];
    if (n) return n;
    let r = nn(t);
    if (r !== "filter" && r in e) return (Pl[t] = r);
    r = Ea(r);
    for (let i = 0; i < wf.length; i++) {
      const s = wf[i] + r;
      if (s in e) return (Pl[t] = s);
    }
    return t;
  }
  const Ef = "http://www.w3.org/1999/xlink";
  function Sf(e, t, n, r, i, s = Ng(t)) {
    r && t.startsWith("xlink:")
      ? n == null
        ? e.removeAttributeNS(Ef, t.slice(6, t.length))
        : e.setAttributeNS(Ef, t, n)
      : n == null || (s && !lh(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : bn(n) ? String(n) : n);
  }
  function xf(e, t, n, r, i) {
    if (t === "innerHTML" || t === "textContent") {
      n != null && (e[t] = t === "innerHTML" ? hp(n) : n);
      return;
    }
    const s = e.tagName;
    if (t === "value" && s !== "PROGRESS" && !s.includes("-")) {
      const a = s === "OPTION" ? e.getAttribute("value") || "" : e.value,
        l = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
      (a !== l || !("_value" in e)) && (e.value = l),
        n == null && e.removeAttribute(t),
        (e._value = n);
      return;
    }
    let o = !1;
    if (n === "" || n == null) {
      const a = typeof e[t];
      a === "boolean"
        ? (n = lh(n))
        : n == null && a === "string"
        ? ((n = ""), (o = !0))
        : a === "number" && ((n = 0), (o = !0));
    }
    try {
      e[t] = n;
    } catch {}
    o && e.removeAttribute(i || t);
  }
  function Wr(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function N0(e, t, n, r) {
    e.removeEventListener(t, n, r);
  }
  const _f = Symbol("_vei");
  function I0(e, t, n, r, i = null) {
    const s = e[_f] || (e[_f] = {}),
      o = s[t];
    if (r && o) o.value = r;
    else {
      const [a, l] = k0(t);
      if (r) {
        const c = (s[t] = q0(r, i));
        Wr(e, a, c, l);
      } else o && (N0(e, a, o, l), (s[t] = void 0));
    }
  }
  const Af = /(?:Once|Passive|Capture)$/;
  function k0(e) {
    let t;
    if (Af.test(e)) {
      t = {};
      let r;
      for (; (r = e.match(Af)); )
        (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : kr(e.slice(2)), t];
  }
  let Bl = 0;
  const O0 = Promise.resolve(),
    L0 = () => Bl || (O0.then(() => (Bl = 0)), (Bl = Date.now()));
  function q0(e, t) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      vn(R0(r, n.value), t, 5, [r]);
    };
    return (n.value = e), (n.attached = L0()), n;
  }
  function R0(e, t) {
    if (st(t)) {
      const n = e.stopImmediatePropagation;
      return (
        (e.stopImmediatePropagation = () => {
          n.call(e), (e._stopped = !0);
        }),
        t.map((r) => (i) => !i._stopped && r && r(i))
      );
    } else return t;
  }
  const Tf = (e) =>
      e.charCodeAt(0) === 111 &&
      e.charCodeAt(1) === 110 &&
      e.charCodeAt(2) > 96 &&
      e.charCodeAt(2) < 123,
    D0 = (e, t, n, r, i, s) => {
      const o = i === "svg";
      t === "class"
        ? S0(e, r, o)
        : t === "style"
        ? T0(e, n, r)
        : va(t)
        ? ru(t) || I0(e, t, n, r, s)
        : (
            t[0] === "."
              ? ((t = t.slice(1)), !0)
              : t[0] === "^"
              ? ((t = t.slice(1)), !1)
              : M0(e, t, r, o)
          )
        ? (xf(e, t, r),
          !e.tagName.includes("-") &&
            (t === "value" || t === "checked" || t === "selected") &&
            Sf(e, t, r, o, s, t !== "value"))
        : e._isVueCE && (/[A-Z]/.test(t) || !Gt(r))
        ? xf(e, nn(t), r, s, t)
        : (t === "true-value"
            ? (e._trueValue = r)
            : t === "false-value" && (e._falseValue = r),
          Sf(e, t, r, o));
    };
  function M0(e, t, n, r) {
    if (r)
      return !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Tf(t) && pt(n))
      );
    if (
      t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA")
    )
      return !1;
    if (t === "width" || t === "height") {
      const i = e.tagName;
      if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
        return !1;
    }
    return Tf(t) && Gt(n) ? !1 : t in e;
  }
  const gp = new WeakMap(),
    bp = new WeakMap(),
    ia = Symbol("_moveCb"),
    Cf = Symbol("_enterCb"),
    P0 = (e) => (delete e.props.mode, e),
    B0 = P0({
      name: "TransitionGroup",
      props: re({}, v0, { tag: String, moveClass: String }),
      setup(e, { slots: t }) {
        const n = a0(),
          r = f1();
        let i, s;
        return (
          $h(() => {
            if (!i.length) return;
            const o = e.moveClass || `${e.name || "v"}-move`;
            if (!H0(i[0].el, n.vnode.el, o)) return;
            i.forEach($0), i.forEach(j0);
            const a = i.filter(U0);
            Sc(),
              a.forEach((l) => {
                const c = l.el,
                  f = c.style;
                Nn(c, o),
                  (f.transform = f.webkitTransform = f.transitionDuration = "");
                const d = (c[ia] = (h) => {
                  (h && h.target !== c) ||
                    ((!h || /transform$/.test(h.propertyName)) &&
                      (c.removeEventListener("transitionend", d),
                      (c[ia] = null),
                      pr(c, o)));
                });
                c.addEventListener("transitionend", d);
              });
          }),
          () => {
            const o = It(e),
              a = y0(o);
            let l = o.tag || qt;
            if (((i = []), s))
              for (let c = 0; c < s.length; c++) {
                const f = s[c];
                f.el &&
                  f.el instanceof Element &&
                  (i.push(f),
                  Bs(f, mc(f, a, r, n)),
                  gp.set(f, f.el.getBoundingClientRect()));
              }
            s = t.default ? Rh(t.default()) : [];
            for (let c = 0; c < s.length; c++) {
              const f = s[c];
              f.key != null && Bs(f, mc(f, a, r, n));
            }
            return Rt(l, null, s);
          }
        );
      },
    }),
    F0 = B0;
  function $0(e) {
    const t = e.el;
    t[ia] && t[ia](), t[Cf] && t[Cf]();
  }
  function j0(e) {
    bp.set(e, e.el.getBoundingClientRect());
  }
  function U0(e) {
    const t = gp.get(e),
      n = bp.get(e),
      r = t.left - n.left,
      i = t.top - n.top;
    if (r || i) {
      const s = e.el.style;
      return (
        (s.transform = s.webkitTransform = `translate(${r}px,${i}px)`),
        (s.transitionDuration = "0s"),
        e
      );
    }
  }
  function H0(e, t, n) {
    const r = e.cloneNode(),
      i = e[ji];
    i &&
      i.forEach((a) => {
        a.split(/\s+/).forEach((l) => l && r.classList.remove(l));
      }),
      n.split(/\s+/).forEach((a) => a && r.classList.add(a)),
      (r.style.display = "none");
    const s = t.nodeType === 1 ? t : t.parentNode;
    s.appendChild(r);
    const { hasTransform: o } = mp(r);
    return s.removeChild(r), o;
  }
  const sa = (e) => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return st(t) ? (n) => Mo(t, n) : t;
  };
  function z0(e) {
    e.target.composing = !0;
  }
  function Nf(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
  }
  const Mi = Symbol("_assign"),
    Me = {
      created(e, { modifiers: { lazy: t, trim: n, number: r } }, i) {
        e[Mi] = sa(i);
        const s = r || (i.props && i.props.type === "number");
        Wr(e, t ? "change" : "input", (o) => {
          if (o.target.composing) return;
          let a = e.value;
          n && (a = a.trim()), s && (a = Yo(a)), e[Mi](a);
        }),
          n &&
            Wr(e, "change", () => {
              e.value = e.value.trim();
            }),
          t ||
            (Wr(e, "compositionstart", z0),
            Wr(e, "compositionend", Nf),
            Wr(e, "change", Nf));
      },
      mounted(e, { value: t }) {
        e.value = t ?? "";
      },
      beforeUpdate(
        e,
        { value: t, oldValue: n, modifiers: { lazy: r, trim: i, number: s } },
        o
      ) {
        if (((e[Mi] = sa(o)), e.composing)) return;
        const a =
            (s || e.type === "number") && !/^0\d/.test(e.value)
              ? Yo(e.value)
              : e.value,
          l = t ?? "";
        a !== l &&
          ((document.activeElement === e &&
            e.type !== "range" &&
            ((r && t === n) || (i && e.value.trim() === l))) ||
            (e.value = l));
      },
    },
    V0 = {
      deep: !0,
      created(e, { value: t, modifiers: { number: n } }, r) {
        const i = ya(t);
        Wr(e, "change", () => {
          const s = Array.prototype.filter
            .call(e.options, (o) => o.selected)
            .map((o) => (n ? Yo(oa(o)) : oa(o)));
          e[Mi](e.multiple ? (i ? new Set(s) : s) : s[0]),
            (e._assigning = !0),
            hu(() => {
              e._assigning = !1;
            });
        }),
          (e[Mi] = sa(r));
      },
      mounted(e, { value: t }) {
        If(e, t);
      },
      beforeUpdate(e, t, n) {
        e[Mi] = sa(n);
      },
      updated(e, { value: t }) {
        e._assigning || If(e, t);
      },
    };
  function If(e, t) {
    const n = e.multiple,
      r = st(t);
    if (!(n && !r && !ya(t))) {
      for (let i = 0, s = e.options.length; i < s; i++) {
        const o = e.options[i],
          a = oa(o);
        if (n)
          if (r) {
            const l = typeof a;
            l === "string" || l === "number"
              ? (o.selected = t.some((c) => String(c) === String(a)))
              : (o.selected = kg(t, a) > -1);
          } else o.selected = t.has(a);
        else if (_a(oa(o), t)) {
          e.selectedIndex !== i && (e.selectedIndex = i);
          return;
        }
      }
      !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
    }
  }
  function oa(e) {
    return "_value" in e ? e._value : e.value;
  }
  const K0 = ["ctrl", "shift", "alt", "meta"],
    G0 = {
      stop: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      self: (e) => e.target !== e.currentTarget,
      ctrl: (e) => !e.ctrlKey,
      shift: (e) => !e.shiftKey,
      alt: (e) => !e.altKey,
      meta: (e) => !e.metaKey,
      left: (e) => "button" in e && e.button !== 0,
      middle: (e) => "button" in e && e.button !== 1,
      right: (e) => "button" in e && e.button !== 2,
      exact: (e, t) => K0.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    Sr = (e, t) => {
      const n = e._withMods || (e._withMods = {}),
        r = t.join(".");
      return (
        n[r] ||
        (n[r] = (i, ...s) => {
          for (let o = 0; o < t.length; o++) {
            const a = G0[t[o]];
            if (a && a(i, t)) return;
          }
          return e(i, ...s);
        })
      );
    },
    W0 = {
      esc: "escape",
      space: " ",
      up: "arrow-up",
      left: "arrow-left",
      right: "arrow-right",
      down: "arrow-down",
      delete: "backspace",
    },
    Ci = (e, t) => {
      const n = e._withKeys || (e._withKeys = {}),
        r = t.join(".");
      return (
        n[r] ||
        (n[r] = (i) => {
          if (!("key" in i)) return;
          const s = kr(i.key);
          if (t.some((o) => o === s || W0[o] === s)) return e(i);
        })
      );
    },
    Y0 = re({ patchProp: D0 }, b0);
  let kf;
  function X0() {
    return kf || (kf = $1(Y0));
  }
  const Z0 = (...e) => {
    const t = X0().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const i = Q0(r);
        if (!i) return;
        const s = t._component;
        !pt(s) && !s.render && !s.template && (s.template = i.innerHTML),
          i.nodeType === 1 && (i.textContent = "");
        const o = n(i, !1, J0(i));
        return (
          i instanceof Element &&
            (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
          o
        );
      }),
      t
    );
  };
  function J0(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement)
      return "mathml";
  }
  function Q0(e) {
    return Gt(e) ? document.querySelector(e) : e;
  }
  const tb = "/assets/dark-logo-BQpPnqtQ.png",
    Be = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [r, i] of t) n[r] = i;
      return n;
    },
    eb = {
      name: "AppHeader",
      props: {
        title: { type: String, default: "Gerador de Documentações Técnicas" },
      },
      emits: ["swap-requested"],
      data() {
        return {};
      },
      methods: {
        handleSwapRequested(e) {
          this.$emit("swap-requested", e);
        },
      },
    },
    nb = { class: "app-header fixed top-0 left-0 right-0 z-50" },
    rb = {
      class: "container mx-auto px-4 py-3 flex items-center justify-between",
    },
    ib = { class: "flex items-center" },
    sb = { class: "text-white text-xl font-bold" },
    ob = { class: "flex items-center space-x-3" };
  function ab(e, t, n, r, i, s) {
    return (
      $(),
      K(
        qt,
        null,
        [
          S("header", nb, [
            S("div", rb, [
              S("div", ib, [
                t[0] ||
                  (t[0] = S(
                    "img",
                    { src: tb, alt: "Logo", class: "h-12 mr-4" },
                    null,
                    -1
                  )),
                S("h1", sb, Ht(n.title), 1),
                ea(e.$slots, "swap-button", {}, void 0),
              ]),
              S("div", ob, [ea(e.$slots, "actions", {}, void 0)]),
            ]),
          ]),
          t[1] || (t[1] = S("div", { class: "header-spacer" }, null, -1)),
        ],
        64
      )
    );
  }
  const vp = Be(eb, [
      ["render", ab],
      ["__scopeId", "data-v-bc3ad5a5"],
    ]),
    lb = {
      name: "BasicFormSection",
      props: {
        formData: { type: Object, required: !0 },
        selectedAutores: { type: Array, required: !0 },
        autorInput: { type: String, required: !0 },
        showSuggestions: { type: Boolean, default: !1 },
        filteredAutores: { type: Array, default: () => [] },
        highlightedIndex: { type: Number, default: 0 },
      },
      data() {
        return { inputValue: this.autorInput };
      },
      watch: {
        autorInput(e) {
          this.inputValue = e;
        },
      },
      methods: {
        handleInput(e) {
          let t = e.target.value.replace(/\D/g, "").slice(0, 3);
          this.$emit("update:numeroSS", t);
        },
        formatSS() {
          this.formData.numeroSS && this.$emit("format-ss");
        },
        updateAutorInput() {
          this.$emit("update:autorInput", this.inputValue);
        },
        handleAutorBlur(e) {
          setTimeout(() => {
            this.$emit("show-suggestions", !1);
          }, 200);
        },
        handleBackspace(e) {
          this.inputValue === "" && this.$emit("handle-backspace");
        },
        selectHighlighted() {
          this.filteredAutores.length &&
            this.filteredAutores[this.highlightedIndex] &&
            this.selectAutor(this.filteredAutores[this.highlightedIndex]);
        },
        selectAutor(e) {
          this.$emit("select-autor", e);
        },
        removeAutor(e) {
          this.$emit("remove-autor", e);
        },
      },
    },
    cb = { class: "base-section mb-4" },
    ub = { class: "form-grid grid-7-7-86" },
    fb = { class: "form-group" },
    db = { class: "form-group" },
    hb = { class: "form-group" },
    pb = { class: "form-group" },
    mb = { class: "form-grid grid-18-18-64" },
    gb = { class: "form-group" },
    bb = { class: "form-group" },
    vb = { class: "form-group" },
    yb = { class: "form-group" },
    wb = { class: "author-selector-container" },
    Eb = { class: "author-input-area autor-container" },
    Sb = ["onClick"],
    xb = { key: 0, class: "suggestions-list" },
    _b = ["onMousedown", "onMouseover"];
  function Ab(e, t, n, r, i, s) {
    return (
      $(),
      K("form", null, [
        S("div", cb, [
          t[24] ||
            (t[24] = S(
              "h2",
              { class: "base-title" },
              "Informações básicas da SS",
              -1
            )),
          S("div", ub, [
            S("div", fb, [
              t[17] ||
                (t[17] = S(
                  "label",
                  { class: "form-label" },
                  [ee(" Número "), S("span", { class: "text-red-600" }, "*")],
                  -1
                )),
              ke(
                S(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue":
                      t[0] || (t[0] = (o) => (n.formData.numeroSS = o)),
                    ref: "numeroSS",
                    maxlength: "3",
                    placeholder: "000",
                    onInput:
                      t[1] ||
                      (t[1] = (...o) => s.handleInput && s.handleInput(...o)),
                    onBlur:
                      t[2] || (t[2] = (...o) => s.formatSS && s.formatSS(...o)),
                    class: "form-input text-center",
                    required: "",
                  },
                  null,
                  544
                ),
                [[Me, n.formData.numeroSS]]
              ),
            ]),
            S("div", db, [
              t[18] ||
                (t[18] = S(
                  "label",
                  { class: "form-label" },
                  [ee(" Ano "), S("span", { class: "text-red-600" }, "*")],
                  -1
                )),
              ke(
                S(
                  "input",
                  {
                    type: "number",
                    "onUpdate:modelValue":
                      t[3] || (t[3] = (o) => (n.formData.anoSS = o)),
                    class: "form-input text-center",
                    required: "",
                  },
                  null,
                  512
                ),
                [[Me, n.formData.anoSS]]
              ),
            ]),
            S("div", hb, [
              t[19] ||
                (t[19] = S(
                  "label",
                  { class: "form-label" },
                  [ee(" Título "), S("span", { class: "text-red-600" }, "*")],
                  -1
                )),
              ke(
                S(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue":
                      t[4] || (t[4] = (o) => (n.formData.tituloSS = o)),
                    ref: "tituloSS",
                    class: "form-input",
                    placeholder: "Título informado no e-mail de abertura da SS",
                    required: "",
                  },
                  null,
                  512
                ),
                [[Me, n.formData.tituloSS]]
              ),
            ]),
          ]),
          S("div", pb, [
            t[20] ||
              (t[20] = S(
                "label",
                { class: "form-label" },
                [ee(" Descrição "), S("span", { class: "text-red-600" }, "*")],
                -1
              )),
            ke(
              S(
                "textarea",
                {
                  "onUpdate:modelValue":
                    t[5] || (t[5] = (o) => (n.formData.descricao = o)),
                  ref: "descricao",
                  class: "form-input form-textarea",
                  placeholder:
                    "Ações realizadas para atualização do (SISTEMA) para que (OBJETIVO).",
                  rows: "2",
                  required: "",
                },
                null,
                512
              ),
              [[Me, n.formData.descricao]]
            ),
          ]),
          S("div", mb, [
            S("div", gb, [
              t[21] ||
                (t[21] = S(
                  "label",
                  { class: "form-label" },
                  [
                    ee(" Data de Início "),
                    S("span", { class: "text-red-600" }, "*"),
                  ],
                  -1
                )),
              ke(
                S(
                  "input",
                  {
                    ref: "dataInicio",
                    type: "date",
                    "onUpdate:modelValue":
                      t[6] || (t[6] = (o) => (n.formData.dataInicio = o)),
                    class: "form-input",
                    required: "",
                  },
                  null,
                  512
                ),
                [[Me, n.formData.dataInicio]]
              ),
            ]),
            S("div", bb, [
              t[22] ||
                (t[22] = S(
                  "label",
                  { class: "form-label" },
                  [
                    ee(" Data de Fim "),
                    S("span", { class: "text-red-600" }, "*"),
                  ],
                  -1
                )),
              ke(
                S(
                  "input",
                  {
                    ref: "dataFim",
                    type: "date",
                    "onUpdate:modelValue":
                      t[7] || (t[7] = (o) => (n.formData.dataFim = o)),
                    class: "form-input",
                    required: "",
                  },
                  null,
                  512
                ),
                [[Me, n.formData.dataFim]]
              ),
            ]),
            S("div", vb, [
              t[23] ||
                (t[23] = S(
                  "label",
                  { class: "form-label" },
                  "Link do board",
                  -1
                )),
              ke(
                S(
                  "input",
                  {
                    type: "url",
                    "onUpdate:modelValue":
                      t[8] || (t[8] = (o) => (n.formData.linkBoard = o)),
                    placeholder: "https://gitlab.com/chesf.gov.br/...",
                    class: "form-input",
                  },
                  null,
                  512
                ),
                [[Me, n.formData.linkBoard]]
              ),
            ]),
          ]),
        ]),
        S("div", yb, [
          t[25] ||
            (t[25] = S(
              "label",
              { class: "form-label" },
              [ee(" Autor(es) "), S("span", { class: "text-red-600" }, "*")],
              -1
            )),
          S("div", wb, [
            S("div", Eb, [
              ($(!0),
              K(
                qt,
                null,
                pn(
                  n.selectedAutores,
                  (o) => (
                    $(),
                    K("span", { key: o.nome, class: "author-tag" }, [
                      ee(Ht(o.nome) + " ", 1),
                      S(
                        "button",
                        {
                          onClick: Sr((a) => s.removeAutor(o), ["prevent"]),
                          class: "author-remove-btn",
                        },
                        " × ",
                        8,
                        Sb
                      ),
                    ])
                  )
                ),
                128
              )),
              ke(
                S(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue":
                      t[9] || (t[9] = (o) => (i.inputValue = o)),
                    onInput:
                      t[10] ||
                      (t[10] = (...o) =>
                        s.updateAutorInput && s.updateAutorInput(...o)),
                    onFocus:
                      t[11] ||
                      (t[11] = (...o) =>
                        e.handleInputFocus && e.handleInputFocus(...o)),
                    onBlur:
                      t[12] ||
                      (t[12] = (...o) =>
                        s.handleAutorBlur && s.handleAutorBlur(...o)),
                    onKeydown: [
                      t[13] ||
                        (t[13] = Ci(
                          Sr(
                            (o) => e.$emit("navigate-list", "down"),
                            ["prevent"]
                          ),
                          ["down"]
                        )),
                      t[14] ||
                        (t[14] = Ci(
                          Sr(
                            (o) => e.$emit("navigate-list", "up"),
                            ["prevent"]
                          ),
                          ["up"]
                        )),
                      t[15] ||
                        (t[15] = Ci(
                          Sr(
                            (...o) =>
                              s.selectHighlighted && s.selectHighlighted(...o),
                            ["prevent"]
                          ),
                          ["enter"]
                        )),
                      t[16] ||
                        (t[16] = Ci(
                          (...o) =>
                            s.handleBackspace && s.handleBackspace(...o),
                          ["backspace"]
                        )),
                    ],
                    placeholder: "Digite o nome do autor...",
                    class: "author-input-field",
                    ref: "autorInput",
                  },
                  null,
                  544
                ),
                [[Me, i.inputValue]]
              ),
            ]),
            n.showSuggestions && n.filteredAutores.length > 0
              ? ($(),
                K("div", xb, [
                  ($(!0),
                  K(
                    qt,
                    null,
                    pn(
                      n.filteredAutores,
                      (o, a) => (
                        $(),
                        K(
                          "div",
                          {
                            key: o.nome,
                            onMousedown: (l) => s.selectAutor(o),
                            onMouseover: (l) => e.$emit("highlight-index", a),
                            class: rt([
                              "suggestion-item",
                              n.highlightedIndex === a
                                ? "suggestion-item-highlighted"
                                : "",
                            ]),
                          },
                          Ht(o.nome),
                          43,
                          _b
                        )
                      )
                    ),
                    128
                  )),
                ]))
              : Kt("", !0),
          ]),
        ]),
      ])
    );
  }
  const yp = Be(lb, [
    ["render", Ab],
    ["__scopeId", "data-v-6a4829cd"],
  ]);
  /**!
   * Sortable 1.15.6
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */ function Of(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
        (r = r.filter(function (i) {
          return Object.getOwnPropertyDescriptor(e, i).enumerable;
        })),
        n.push.apply(n, r);
    }
    return n;
  }
  function Mn(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2
        ? Of(Object(n), !0).forEach(function (r) {
            Tb(e, r, n[r]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Of(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
    }
    return e;
  }
  function jo(e) {
    "@babel/helpers - typeof";
    return (
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? (jo = function (t) {
            return typeof t;
          })
        : (jo = function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
      jo(e)
    );
  }
  function Tb(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  function er() {
    return (
      (er =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
      er.apply(this, arguments)
    );
  }
  function Cb(e, t) {
    if (e == null) return {};
    var n = {},
      r = Object.keys(e),
      i,
      s;
    for (s = 0; s < r.length; s++)
      (i = r[s]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
  }
  function Nb(e, t) {
    if (e == null) return {};
    var n = Cb(e, t),
      r,
      i;
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (i = 0; i < s.length; i++)
        (r = s[i]),
          !(t.indexOf(r) >= 0) &&
            Object.prototype.propertyIsEnumerable.call(e, r) &&
            (n[r] = e[r]);
    }
    return n;
  }
  var Ib = "1.15.6";
  function Qn(e) {
    if (typeof window < "u" && window.navigator)
      return !!navigator.userAgent.match(e);
  }
  var or = Qn(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
    eo = Qn(/Edge/i),
    Lf = Qn(/firefox/i),
    _s = Qn(/safari/i) && !Qn(/chrome/i) && !Qn(/android/i),
    bu = Qn(/iP(ad|od|hone)/i),
    wp = Qn(/chrome/i) && Qn(/android/i),
    Ep = { capture: !1, passive: !1 };
  function Et(e, t, n) {
    e.addEventListener(t, n, !or && Ep);
  }
  function wt(e, t, n) {
    e.removeEventListener(t, n, !or && Ep);
  }
  function aa(e, t) {
    if (t) {
      if ((t[0] === ">" && (t = t.substring(1)), e))
        try {
          if (e.matches) return e.matches(t);
          if (e.msMatchesSelector) return e.msMatchesSelector(t);
          if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
        } catch {
          return !1;
        }
      return !1;
    }
  }
  function Sp(e) {
    return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode;
  }
  function un(e, t, n, r) {
    if (e) {
      n = n || document;
      do {
        if (
          (t != null &&
            (t[0] === ">" ? e.parentNode === n && aa(e, t) : aa(e, t))) ||
          (r && e === n)
        )
          return e;
        if (e === n) break;
      } while ((e = Sp(e)));
    }
    return null;
  }
  var qf = /\s+/g;
  function Fe(e, t, n) {
    if (e && t)
      if (e.classList) e.classList[n ? "add" : "remove"](t);
      else {
        var r = (" " + e.className + " ")
          .replace(qf, " ")
          .replace(" " + t + " ", " ");
        e.className = (r + (n ? " " + t : "")).replace(qf, " ");
      }
  }
  function lt(e, t, n) {
    var r = e && e.style;
    if (r) {
      if (n === void 0)
        return (
          document.defaultView && document.defaultView.getComputedStyle
            ? (n = document.defaultView.getComputedStyle(e, ""))
            : e.currentStyle && (n = e.currentStyle),
          t === void 0 ? n : n[t]
        );
      !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t),
        (r[t] = n + (typeof n == "string" ? "" : "px"));
    }
  }
  function Pi(e, t) {
    var n = "";
    if (typeof e == "string") n = e;
    else
      do {
        var r = lt(e, "transform");
        r && r !== "none" && (n = r + " " + n);
      } while (!t && (e = e.parentNode));
    var i =
      window.DOMMatrix ||
      window.WebKitCSSMatrix ||
      window.CSSMatrix ||
      window.MSCSSMatrix;
    return i && new i(n);
  }
  function xp(e, t, n) {
    if (e) {
      var r = e.getElementsByTagName(t),
        i = 0,
        s = r.length;
      if (n) for (; i < s; i++) n(r[i], i);
      return r;
    }
    return [];
  }
  function qn() {
    var e = document.scrollingElement;
    return e || document.documentElement;
  }
  function Jt(e, t, n, r, i) {
    if (!(!e.getBoundingClientRect && e !== window)) {
      var s, o, a, l, c, f, d;
      if (
        (e !== window && e.parentNode && e !== qn()
          ? ((s = e.getBoundingClientRect()),
            (o = s.top),
            (a = s.left),
            (l = s.bottom),
            (c = s.right),
            (f = s.height),
            (d = s.width))
          : ((o = 0),
            (a = 0),
            (l = window.innerHeight),
            (c = window.innerWidth),
            (f = window.innerHeight),
            (d = window.innerWidth)),
        (t || n) && e !== window && ((i = i || e.parentNode), !or))
      )
        do
          if (
            i &&
            i.getBoundingClientRect &&
            (lt(i, "transform") !== "none" ||
              (n && lt(i, "position") !== "static"))
          ) {
            var h = i.getBoundingClientRect();
            (o -= h.top + parseInt(lt(i, "border-top-width"))),
              (a -= h.left + parseInt(lt(i, "border-left-width"))),
              (l = o + s.height),
              (c = a + s.width);
            break;
          }
        while ((i = i.parentNode));
      if (r && e !== window) {
        var p = Pi(i || e),
          g = p && p.a,
          v = p && p.d;
        p && ((o /= v), (a /= g), (d /= g), (f /= v), (l = o + f), (c = a + d));
      }
      return { top: o, left: a, bottom: l, right: c, width: d, height: f };
    }
  }
  function Rf(e, t, n) {
    for (var r = xr(e, !0), i = Jt(e)[t]; r; ) {
      var s = Jt(r)[n],
        o = void 0;
      if (((o = i >= s), !o)) return r;
      if (r === qn()) break;
      r = xr(r, !1);
    }
    return !1;
  }
  function Ui(e, t, n, r) {
    for (var i = 0, s = 0, o = e.children; s < o.length; ) {
      if (
        o[s].style.display !== "none" &&
        o[s] !== ot.ghost &&
        (r || o[s] !== ot.dragged) &&
        un(o[s], n.draggable, e, !1)
      ) {
        if (i === t) return o[s];
        i++;
      }
      s++;
    }
    return null;
  }
  function vu(e, t) {
    for (
      var n = e.lastElementChild;
      n && (n === ot.ghost || lt(n, "display") === "none" || (t && !aa(n, t)));

    )
      n = n.previousElementSibling;
    return n || null;
  }
  function Xe(e, t) {
    var n = 0;
    if (!e || !e.parentNode) return -1;
    for (; (e = e.previousElementSibling); )
      e.nodeName.toUpperCase() !== "TEMPLATE" &&
        e !== ot.clone &&
        (!t || aa(e, t)) &&
        n++;
    return n;
  }
  function Df(e) {
    var t = 0,
      n = 0,
      r = qn();
    if (e)
      do {
        var i = Pi(e),
          s = i.a,
          o = i.d;
        (t += e.scrollLeft * s), (n += e.scrollTop * o);
      } while (e !== r && (e = e.parentNode));
    return [t, n];
  }
  function kb(e, t) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        for (var r in t)
          if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n);
      }
    return -1;
  }
  function xr(e, t) {
    if (!e || !e.getBoundingClientRect) return qn();
    var n = e,
      r = !1;
    do
      if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
        var i = lt(n);
        if (
          (n.clientWidth < n.scrollWidth &&
            (i.overflowX == "auto" || i.overflowX == "scroll")) ||
          (n.clientHeight < n.scrollHeight &&
            (i.overflowY == "auto" || i.overflowY == "scroll"))
        ) {
          if (!n.getBoundingClientRect || n === document.body) return qn();
          if (r || t) return n;
          r = !0;
        }
      }
    while ((n = n.parentNode));
    return qn();
  }
  function Ob(e, t) {
    if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
    return e;
  }
  function Fl(e, t) {
    return (
      Math.round(e.top) === Math.round(t.top) &&
      Math.round(e.left) === Math.round(t.left) &&
      Math.round(e.height) === Math.round(t.height) &&
      Math.round(e.width) === Math.round(t.width)
    );
  }
  var As;
  function _p(e, t) {
    return function () {
      if (!As) {
        var n = arguments,
          r = this;
        n.length === 1 ? e.call(r, n[0]) : e.apply(r, n),
          (As = setTimeout(function () {
            As = void 0;
          }, t));
      }
    };
  }
  function Lb() {
    clearTimeout(As), (As = void 0);
  }
  function Ap(e, t, n) {
    (e.scrollLeft += t), (e.scrollTop += n);
  }
  function Tp(e) {
    var t = window.Polymer,
      n = window.jQuery || window.Zepto;
    return t && t.dom
      ? t.dom(e).cloneNode(!0)
      : n
      ? n(e).clone(!0)[0]
      : e.cloneNode(!0);
  }
  function Cp(e, t, n) {
    var r = {};
    return (
      Array.from(e.children).forEach(function (i) {
        var s, o, a, l;
        if (!(!un(i, t.draggable, e, !1) || i.animated || i === n)) {
          var c = Jt(i);
          (r.left = Math.min(
            (s = r.left) !== null && s !== void 0 ? s : 1 / 0,
            c.left
          )),
            (r.top = Math.min(
              (o = r.top) !== null && o !== void 0 ? o : 1 / 0,
              c.top
            )),
            (r.right = Math.max(
              (a = r.right) !== null && a !== void 0 ? a : -1 / 0,
              c.right
            )),
            (r.bottom = Math.max(
              (l = r.bottom) !== null && l !== void 0 ? l : -1 / 0,
              c.bottom
            ));
        }
      }),
      (r.width = r.right - r.left),
      (r.height = r.bottom - r.top),
      (r.x = r.left),
      (r.y = r.top),
      r
    );
  }
  var Pe = "Sortable" + new Date().getTime();
  function qb() {
    var e = [],
      t;
    return {
      captureAnimationState: function () {
        if (((e = []), !!this.options.animation)) {
          var r = [].slice.call(this.el.children);
          r.forEach(function (i) {
            if (!(lt(i, "display") === "none" || i === ot.ghost)) {
              e.push({ target: i, rect: Jt(i) });
              var s = Mn({}, e[e.length - 1].rect);
              if (i.thisAnimationDuration) {
                var o = Pi(i, !0);
                o && ((s.top -= o.f), (s.left -= o.e));
              }
              i.fromRect = s;
            }
          });
        }
      },
      addAnimationState: function (r) {
        e.push(r);
      },
      removeAnimationState: function (r) {
        e.splice(kb(e, { target: r }), 1);
      },
      animateAll: function (r) {
        var i = this;
        if (!this.options.animation) {
          clearTimeout(t), typeof r == "function" && r();
          return;
        }
        var s = !1,
          o = 0;
        e.forEach(function (a) {
          var l = 0,
            c = a.target,
            f = c.fromRect,
            d = Jt(c),
            h = c.prevFromRect,
            p = c.prevToRect,
            g = a.rect,
            v = Pi(c, !0);
          v && ((d.top -= v.f), (d.left -= v.e)),
            (c.toRect = d),
            c.thisAnimationDuration &&
              Fl(h, d) &&
              !Fl(f, d) &&
              (g.top - d.top) / (g.left - d.left) ===
                (f.top - d.top) / (f.left - d.left) &&
              (l = Db(g, h, p, i.options)),
            Fl(d, f) ||
              ((c.prevFromRect = f),
              (c.prevToRect = d),
              l || (l = i.options.animation),
              i.animate(c, g, d, l)),
            l &&
              ((s = !0),
              (o = Math.max(o, l)),
              clearTimeout(c.animationResetTimer),
              (c.animationResetTimer = setTimeout(function () {
                (c.animationTime = 0),
                  (c.prevFromRect = null),
                  (c.fromRect = null),
                  (c.prevToRect = null),
                  (c.thisAnimationDuration = null);
              }, l)),
              (c.thisAnimationDuration = l));
        }),
          clearTimeout(t),
          s
            ? (t = setTimeout(function () {
                typeof r == "function" && r();
              }, o))
            : typeof r == "function" && r(),
          (e = []);
      },
      animate: function (r, i, s, o) {
        if (o) {
          lt(r, "transition", ""), lt(r, "transform", "");
          var a = Pi(this.el),
            l = a && a.a,
            c = a && a.d,
            f = (i.left - s.left) / (l || 1),
            d = (i.top - s.top) / (c || 1);
          (r.animatingX = !!f),
            (r.animatingY = !!d),
            lt(r, "transform", "translate3d(" + f + "px," + d + "px,0)"),
            (this.forRepaintDummy = Rb(r)),
            lt(
              r,
              "transition",
              "transform " +
                o +
                "ms" +
                (this.options.easing ? " " + this.options.easing : "")
            ),
            lt(r, "transform", "translate3d(0,0,0)"),
            typeof r.animated == "number" && clearTimeout(r.animated),
            (r.animated = setTimeout(function () {
              lt(r, "transition", ""),
                lt(r, "transform", ""),
                (r.animated = !1),
                (r.animatingX = !1),
                (r.animatingY = !1);
            }, o));
        }
      },
    };
  }
  function Rb(e) {
    return e.offsetWidth;
  }
  function Db(e, t, n, r) {
    return (
      (Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) /
        Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2))) *
      r.animation
    );
  }
  var mi = [],
    $l = { initializeByDefault: !0 },
    no = {
      mount: function (t) {
        for (var n in $l) $l.hasOwnProperty(n) && !(n in t) && (t[n] = $l[n]);
        mi.forEach(function (r) {
          if (r.pluginName === t.pluginName)
            throw "Sortable: Cannot mount plugin ".concat(
              t.pluginName,
              " more than once"
            );
        }),
          mi.push(t);
      },
      pluginEvent: function (t, n, r) {
        var i = this;
        (this.eventCanceled = !1),
          (r.cancel = function () {
            i.eventCanceled = !0;
          });
        var s = t + "Global";
        mi.forEach(function (o) {
          n[o.pluginName] &&
            (n[o.pluginName][s] && n[o.pluginName][s](Mn({ sortable: n }, r)),
            n.options[o.pluginName] &&
              n[o.pluginName][t] &&
              n[o.pluginName][t](Mn({ sortable: n }, r)));
        });
      },
      initializePlugins: function (t, n, r, i) {
        mi.forEach(function (a) {
          var l = a.pluginName;
          if (!(!t.options[l] && !a.initializeByDefault)) {
            var c = new a(t, n, t.options);
            (c.sortable = t),
              (c.options = t.options),
              (t[l] = c),
              er(r, c.defaults);
          }
        });
        for (var s in t.options)
          if (t.options.hasOwnProperty(s)) {
            var o = this.modifyOption(t, s, t.options[s]);
            typeof o < "u" && (t.options[s] = o);
          }
      },
      getEventProperties: function (t, n) {
        var r = {};
        return (
          mi.forEach(function (i) {
            typeof i.eventProperties == "function" &&
              er(r, i.eventProperties.call(n[i.pluginName], t));
          }),
          r
        );
      },
      modifyOption: function (t, n, r) {
        var i;
        return (
          mi.forEach(function (s) {
            t[s.pluginName] &&
              s.optionListeners &&
              typeof s.optionListeners[n] == "function" &&
              (i = s.optionListeners[n].call(t[s.pluginName], r));
          }),
          i
        );
      },
    };
  function Mb(e) {
    var t = e.sortable,
      n = e.rootEl,
      r = e.name,
      i = e.targetEl,
      s = e.cloneEl,
      o = e.toEl,
      a = e.fromEl,
      l = e.oldIndex,
      c = e.newIndex,
      f = e.oldDraggableIndex,
      d = e.newDraggableIndex,
      h = e.originalEvent,
      p = e.putSortable,
      g = e.extraEventProperties;
    if (((t = t || (n && n[Pe])), !!t)) {
      var v,
        E = t.options,
        x = "on" + r.charAt(0).toUpperCase() + r.substr(1);
      window.CustomEvent && !or && !eo
        ? (v = new CustomEvent(r, { bubbles: !0, cancelable: !0 }))
        : ((v = document.createEvent("Event")), v.initEvent(r, !0, !0)),
        (v.to = o || n),
        (v.from = a || n),
        (v.item = i || n),
        (v.clone = s),
        (v.oldIndex = l),
        (v.newIndex = c),
        (v.oldDraggableIndex = f),
        (v.newDraggableIndex = d),
        (v.originalEvent = h),
        (v.pullMode = p ? p.lastPutMode : void 0);
      var A = Mn(Mn({}, g), no.getEventProperties(r, t));
      for (var T in A) v[T] = A[T];
      n && n.dispatchEvent(v), E[x] && E[x].call(t, v);
    }
  }
  var Pb = ["evt"],
    De = function (t, n) {
      var r =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        i = r.evt,
        s = Nb(r, Pb);
      no.pluginEvent.bind(ot)(
        t,
        n,
        Mn(
          {
            dragEl: F,
            parentEl: Vt,
            ghostEl: ft,
            rootEl: Ut,
            nextEl: Gr,
            lastDownEl: Uo,
            cloneEl: zt,
            cloneHidden: wr,
            dragStarted: ms,
            putSortable: ue,
            activeSortable: ot.active,
            originalEvent: i,
            oldIndex: Ni,
            oldDraggableIndex: Ts,
            newIndex: je,
            newDraggableIndex: vr,
            hideGhostForTarget: Op,
            unhideGhostForTarget: Lp,
            cloneNowHidden: function () {
              wr = !0;
            },
            cloneNowShown: function () {
              wr = !1;
            },
            dispatchSortableEvent: function (a) {
              Ne({ sortable: n, name: a, originalEvent: i });
            },
          },
          s
        )
      );
    };
  function Ne(e) {
    Mb(
      Mn(
        {
          putSortable: ue,
          cloneEl: zt,
          targetEl: F,
          rootEl: Ut,
          oldIndex: Ni,
          oldDraggableIndex: Ts,
          newIndex: je,
          newDraggableIndex: vr,
        },
        e
      )
    );
  }
  var F,
    Vt,
    ft,
    Ut,
    Gr,
    Uo,
    zt,
    wr,
    Ni,
    je,
    Ts,
    vr,
    To,
    ue,
    yi = !1,
    la = !1,
    ca = [],
    zr,
    an,
    jl,
    Ul,
    Mf,
    Pf,
    ms,
    gi,
    Cs,
    Ns = !1,
    Co = !1,
    Ho,
    ge,
    Hl = [],
    xc = !1,
    ua = [],
    La = typeof document < "u",
    No = bu,
    Bf = eo || or ? "cssFloat" : "float",
    Bb = La && !wp && !bu && "draggable" in document.createElement("div"),
    Np = (function () {
      if (La) {
        if (or) return !1;
        var e = document.createElement("x");
        return (
          (e.style.cssText = "pointer-events:auto"),
          e.style.pointerEvents === "auto"
        );
      }
    })(),
    Ip = function (t, n) {
      var r = lt(t),
        i =
          parseInt(r.width) -
          parseInt(r.paddingLeft) -
          parseInt(r.paddingRight) -
          parseInt(r.borderLeftWidth) -
          parseInt(r.borderRightWidth),
        s = Ui(t, 0, n),
        o = Ui(t, 1, n),
        a = s && lt(s),
        l = o && lt(o),
        c = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + Jt(s).width,
        f = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + Jt(o).width;
      if (r.display === "flex")
        return r.flexDirection === "column" ||
          r.flexDirection === "column-reverse"
          ? "vertical"
          : "horizontal";
      if (r.display === "grid")
        return r.gridTemplateColumns.split(" ").length <= 1
          ? "vertical"
          : "horizontal";
      if (s && a.float && a.float !== "none") {
        var d = a.float === "left" ? "left" : "right";
        return o && (l.clear === "both" || l.clear === d)
          ? "vertical"
          : "horizontal";
      }
      return s &&
        (a.display === "block" ||
          a.display === "flex" ||
          a.display === "table" ||
          a.display === "grid" ||
          (c >= i && r[Bf] === "none") ||
          (o && r[Bf] === "none" && c + f > i))
        ? "vertical"
        : "horizontal";
    },
    Fb = function (t, n, r) {
      var i = r ? t.left : t.top,
        s = r ? t.right : t.bottom,
        o = r ? t.width : t.height,
        a = r ? n.left : n.top,
        l = r ? n.right : n.bottom,
        c = r ? n.width : n.height;
      return i === a || s === l || i + o / 2 === a + c / 2;
    },
    $b = function (t, n) {
      var r;
      return (
        ca.some(function (i) {
          var s = i[Pe].options.emptyInsertThreshold;
          if (!(!s || vu(i))) {
            var o = Jt(i),
              a = t >= o.left - s && t <= o.right + s,
              l = n >= o.top - s && n <= o.bottom + s;
            if (a && l) return (r = i);
          }
        }),
        r
      );
    },
    kp = function (t) {
      function n(s, o) {
        return function (a, l, c, f) {
          var d =
            a.options.group.name &&
            l.options.group.name &&
            a.options.group.name === l.options.group.name;
          if (s == null && (o || d)) return !0;
          if (s == null || s === !1) return !1;
          if (o && s === "clone") return s;
          if (typeof s == "function") return n(s(a, l, c, f), o)(a, l, c, f);
          var h = (o ? a : l).options.group.name;
          return (
            s === !0 ||
            (typeof s == "string" && s === h) ||
            (s.join && s.indexOf(h) > -1)
          );
        };
      }
      var r = {},
        i = t.group;
      (!i || jo(i) != "object") && (i = { name: i }),
        (r.name = i.name),
        (r.checkPull = n(i.pull, !0)),
        (r.checkPut = n(i.put)),
        (r.revertClone = i.revertClone),
        (t.group = r);
    },
    Op = function () {
      !Np && ft && lt(ft, "display", "none");
    },
    Lp = function () {
      !Np && ft && lt(ft, "display", "");
    };
  La &&
    !wp &&
    document.addEventListener(
      "click",
      function (e) {
        if (la)
          return (
            e.preventDefault(),
            e.stopPropagation && e.stopPropagation(),
            e.stopImmediatePropagation && e.stopImmediatePropagation(),
            (la = !1),
            !1
          );
      },
      !0
    );
  var Vr = function (t) {
      if (F) {
        t = t.touches ? t.touches[0] : t;
        var n = $b(t.clientX, t.clientY);
        if (n) {
          var r = {};
          for (var i in t) t.hasOwnProperty(i) && (r[i] = t[i]);
          (r.target = r.rootEl = n),
            (r.preventDefault = void 0),
            (r.stopPropagation = void 0),
            n[Pe]._onDragOver(r);
        }
      }
    },
    jb = function (t) {
      F && F.parentNode[Pe]._isOutsideThisEl(t.target);
    };
  function ot(e, t) {
    if (!(e && e.nodeType && e.nodeType === 1))
      throw "Sortable: `el` must be an HTMLElement, not ".concat(
        {}.toString.call(e)
      );
    (this.el = e), (this.options = t = er({}, t)), (e[Pe] = this);
    var n = {
      group: null,
      sort: !0,
      disabled: !1,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      invertSwap: !1,
      invertedSwapThreshold: null,
      removeCloneOnHide: !0,
      direction: function () {
        return Ip(e, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: !0,
      animation: 0,
      easing: null,
      setData: function (o, a) {
        o.setData("Text", a.textContent);
      },
      dropBubble: !1,
      dragoverBubble: !1,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: !1,
      touchStartThreshold:
        (Number.parseInt ? Number : window).parseInt(
          window.devicePixelRatio,
          10
        ) || 1,
      forceFallback: !1,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: !1,
      fallbackTolerance: 0,
      fallbackOffset: { x: 0, y: 0 },
      supportPointer:
        ot.supportPointer !== !1 && "PointerEvent" in window && (!_s || bu),
      emptyInsertThreshold: 5,
    };
    no.initializePlugins(this, e, n);
    for (var r in n) !(r in t) && (t[r] = n[r]);
    kp(t);
    for (var i in this)
      i.charAt(0) === "_" &&
        typeof this[i] == "function" &&
        (this[i] = this[i].bind(this));
    (this.nativeDraggable = t.forceFallback ? !1 : Bb),
      this.nativeDraggable && (this.options.touchStartThreshold = 1),
      t.supportPointer
        ? Et(e, "pointerdown", this._onTapStart)
        : (Et(e, "mousedown", this._onTapStart),
          Et(e, "touchstart", this._onTapStart)),
      this.nativeDraggable &&
        (Et(e, "dragover", this), Et(e, "dragenter", this)),
      ca.push(this.el),
      t.store && t.store.get && this.sort(t.store.get(this) || []),
      er(this, qb());
  }
  ot.prototype = {
    constructor: ot,
    _isOutsideThisEl: function (t) {
      !this.el.contains(t) && t !== this.el && (gi = null);
    },
    _getDirection: function (t, n) {
      return typeof this.options.direction == "function"
        ? this.options.direction.call(this, t, n, F)
        : this.options.direction;
    },
    _onTapStart: function (t) {
      if (t.cancelable) {
        var n = this,
          r = this.el,
          i = this.options,
          s = i.preventOnFilter,
          o = t.type,
          a =
            (t.touches && t.touches[0]) ||
            (t.pointerType && t.pointerType === "touch" && t),
          l = (a || t).target,
          c =
            (t.target.shadowRoot &&
              ((t.path && t.path[0]) ||
                (t.composedPath && t.composedPath()[0]))) ||
            l,
          f = i.filter;
        if (
          (Yb(r),
          !F &&
            !(
              (/mousedown|pointerdown/.test(o) && t.button !== 0) ||
              i.disabled
            ) &&
            !c.isContentEditable &&
            !(
              !this.nativeDraggable &&
              _s &&
              l &&
              l.tagName.toUpperCase() === "SELECT"
            ) &&
            ((l = un(l, i.draggable, r, !1)), !(l && l.animated) && Uo !== l))
        ) {
          if (
            ((Ni = Xe(l)), (Ts = Xe(l, i.draggable)), typeof f == "function")
          ) {
            if (f.call(this, t, l, this)) {
              Ne({
                sortable: n,
                rootEl: c,
                name: "filter",
                targetEl: l,
                toEl: r,
                fromEl: r,
              }),
                De("filter", n, { evt: t }),
                s && t.preventDefault();
              return;
            }
          } else if (
            f &&
            ((f = f.split(",").some(function (d) {
              if (((d = un(c, d.trim(), r, !1)), d))
                return (
                  Ne({
                    sortable: n,
                    rootEl: d,
                    name: "filter",
                    targetEl: l,
                    fromEl: r,
                    toEl: r,
                  }),
                  De("filter", n, { evt: t }),
                  !0
                );
            })),
            f)
          ) {
            s && t.preventDefault();
            return;
          }
          (i.handle && !un(c, i.handle, r, !1)) ||
            this._prepareDragStart(t, a, l);
        }
      }
    },
    _prepareDragStart: function (t, n, r) {
      var i = this,
        s = i.el,
        o = i.options,
        a = s.ownerDocument,
        l;
      if (r && !F && r.parentNode === s) {
        var c = Jt(r);
        if (
          ((Ut = s),
          (F = r),
          (Vt = F.parentNode),
          (Gr = F.nextSibling),
          (Uo = r),
          (To = o.group),
          (ot.dragged = F),
          (zr = {
            target: F,
            clientX: (n || t).clientX,
            clientY: (n || t).clientY,
          }),
          (Mf = zr.clientX - c.left),
          (Pf = zr.clientY - c.top),
          (this._lastX = (n || t).clientX),
          (this._lastY = (n || t).clientY),
          (F.style["will-change"] = "all"),
          (l = function () {
            if ((De("delayEnded", i, { evt: t }), ot.eventCanceled)) {
              i._onDrop();
              return;
            }
            i._disableDelayedDragEvents(),
              !Lf && i.nativeDraggable && (F.draggable = !0),
              i._triggerDragStart(t, n),
              Ne({ sortable: i, name: "choose", originalEvent: t }),
              Fe(F, o.chosenClass, !0);
          }),
          o.ignore.split(",").forEach(function (f) {
            xp(F, f.trim(), zl);
          }),
          Et(a, "dragover", Vr),
          Et(a, "mousemove", Vr),
          Et(a, "touchmove", Vr),
          o.supportPointer
            ? (Et(a, "pointerup", i._onDrop),
              !this.nativeDraggable && Et(a, "pointercancel", i._onDrop))
            : (Et(a, "mouseup", i._onDrop),
              Et(a, "touchend", i._onDrop),
              Et(a, "touchcancel", i._onDrop)),
          Lf &&
            this.nativeDraggable &&
            ((this.options.touchStartThreshold = 4), (F.draggable = !0)),
          De("delayStart", this, { evt: t }),
          o.delay &&
            (!o.delayOnTouchOnly || n) &&
            (!this.nativeDraggable || !(eo || or)))
        ) {
          if (ot.eventCanceled) {
            this._onDrop();
            return;
          }
          o.supportPointer
            ? (Et(a, "pointerup", i._disableDelayedDrag),
              Et(a, "pointercancel", i._disableDelayedDrag))
            : (Et(a, "mouseup", i._disableDelayedDrag),
              Et(a, "touchend", i._disableDelayedDrag),
              Et(a, "touchcancel", i._disableDelayedDrag)),
            Et(a, "mousemove", i._delayedDragTouchMoveHandler),
            Et(a, "touchmove", i._delayedDragTouchMoveHandler),
            o.supportPointer &&
              Et(a, "pointermove", i._delayedDragTouchMoveHandler),
            (i._dragStartTimer = setTimeout(l, o.delay));
        } else l();
      }
    },
    _delayedDragTouchMoveHandler: function (t) {
      var n = t.touches ? t.touches[0] : t;
      Math.max(
        Math.abs(n.clientX - this._lastX),
        Math.abs(n.clientY - this._lastY)
      ) >=
        Math.floor(
          this.options.touchStartThreshold /
            ((this.nativeDraggable && window.devicePixelRatio) || 1)
        ) && this._disableDelayedDrag();
    },
    _disableDelayedDrag: function () {
      F && zl(F),
        clearTimeout(this._dragStartTimer),
        this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function () {
      var t = this.el.ownerDocument;
      wt(t, "mouseup", this._disableDelayedDrag),
        wt(t, "touchend", this._disableDelayedDrag),
        wt(t, "touchcancel", this._disableDelayedDrag),
        wt(t, "pointerup", this._disableDelayedDrag),
        wt(t, "pointercancel", this._disableDelayedDrag),
        wt(t, "mousemove", this._delayedDragTouchMoveHandler),
        wt(t, "touchmove", this._delayedDragTouchMoveHandler),
        wt(t, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function (t, n) {
      (n = n || (t.pointerType == "touch" && t)),
        !this.nativeDraggable || n
          ? this.options.supportPointer
            ? Et(document, "pointermove", this._onTouchMove)
            : n
            ? Et(document, "touchmove", this._onTouchMove)
            : Et(document, "mousemove", this._onTouchMove)
          : (Et(F, "dragend", this), Et(Ut, "dragstart", this._onDragStart));
      try {
        document.selection
          ? zo(function () {
              document.selection.empty();
            })
          : window.getSelection().removeAllRanges();
      } catch {}
    },
    _dragStarted: function (t, n) {
      if (((yi = !1), Ut && F)) {
        De("dragStarted", this, { evt: n }),
          this.nativeDraggable && Et(document, "dragover", jb);
        var r = this.options;
        !t && Fe(F, r.dragClass, !1),
          Fe(F, r.ghostClass, !0),
          (ot.active = this),
          t && this._appendGhost(),
          Ne({ sortable: this, name: "start", originalEvent: n });
      } else this._nulling();
    },
    _emulateDragOver: function () {
      if (an) {
        (this._lastX = an.clientX), (this._lastY = an.clientY), Op();
        for (
          var t = document.elementFromPoint(an.clientX, an.clientY), n = t;
          t &&
          t.shadowRoot &&
          ((t = t.shadowRoot.elementFromPoint(an.clientX, an.clientY)),
          t !== n);

        )
          n = t;
        if ((F.parentNode[Pe]._isOutsideThisEl(t), n))
          do {
            if (n[Pe]) {
              var r = void 0;
              if (
                ((r = n[Pe]._onDragOver({
                  clientX: an.clientX,
                  clientY: an.clientY,
                  target: t,
                  rootEl: n,
                })),
                r && !this.options.dragoverBubble)
              )
                break;
            }
            t = n;
          } while ((n = Sp(n)));
        Lp();
      }
    },
    _onTouchMove: function (t) {
      if (zr) {
        var n = this.options,
          r = n.fallbackTolerance,
          i = n.fallbackOffset,
          s = t.touches ? t.touches[0] : t,
          o = ft && Pi(ft, !0),
          a = ft && o && o.a,
          l = ft && o && o.d,
          c = No && ge && Df(ge),
          f =
            (s.clientX - zr.clientX + i.x) / (a || 1) +
            (c ? c[0] - Hl[0] : 0) / (a || 1),
          d =
            (s.clientY - zr.clientY + i.y) / (l || 1) +
            (c ? c[1] - Hl[1] : 0) / (l || 1);
        if (!ot.active && !yi) {
          if (
            r &&
            Math.max(
              Math.abs(s.clientX - this._lastX),
              Math.abs(s.clientY - this._lastY)
            ) < r
          )
            return;
          this._onDragStart(t, !0);
        }
        if (ft) {
          o
            ? ((o.e += f - (jl || 0)), (o.f += d - (Ul || 0)))
            : (o = { a: 1, b: 0, c: 0, d: 1, e: f, f: d });
          var h = "matrix("
            .concat(o.a, ",")
            .concat(o.b, ",")
            .concat(o.c, ",")
            .concat(o.d, ",")
            .concat(o.e, ",")
            .concat(o.f, ")");
          lt(ft, "webkitTransform", h),
            lt(ft, "mozTransform", h),
            lt(ft, "msTransform", h),
            lt(ft, "transform", h),
            (jl = f),
            (Ul = d),
            (an = s);
        }
        t.cancelable && t.preventDefault();
      }
    },
    _appendGhost: function () {
      if (!ft) {
        var t = this.options.fallbackOnBody ? document.body : Ut,
          n = Jt(F, !0, No, !0, t),
          r = this.options;
        if (No) {
          for (
            ge = t;
            lt(ge, "position") === "static" &&
            lt(ge, "transform") === "none" &&
            ge !== document;

          )
            ge = ge.parentNode;
          ge !== document.body && ge !== document.documentElement
            ? (ge === document && (ge = qn()),
              (n.top += ge.scrollTop),
              (n.left += ge.scrollLeft))
            : (ge = qn()),
            (Hl = Df(ge));
        }
        (ft = F.cloneNode(!0)),
          Fe(ft, r.ghostClass, !1),
          Fe(ft, r.fallbackClass, !0),
          Fe(ft, r.dragClass, !0),
          lt(ft, "transition", ""),
          lt(ft, "transform", ""),
          lt(ft, "box-sizing", "border-box"),
          lt(ft, "margin", 0),
          lt(ft, "top", n.top),
          lt(ft, "left", n.left),
          lt(ft, "width", n.width),
          lt(ft, "height", n.height),
          lt(ft, "opacity", "0.8"),
          lt(ft, "position", No ? "absolute" : "fixed"),
          lt(ft, "zIndex", "100000"),
          lt(ft, "pointerEvents", "none"),
          (ot.ghost = ft),
          t.appendChild(ft),
          lt(
            ft,
            "transform-origin",
            (Mf / parseInt(ft.style.width)) * 100 +
              "% " +
              (Pf / parseInt(ft.style.height)) * 100 +
              "%"
          );
      }
    },
    _onDragStart: function (t, n) {
      var r = this,
        i = t.dataTransfer,
        s = r.options;
      if ((De("dragStart", this, { evt: t }), ot.eventCanceled)) {
        this._onDrop();
        return;
      }
      De("setupClone", this),
        ot.eventCanceled ||
          ((zt = Tp(F)),
          zt.removeAttribute("id"),
          (zt.draggable = !1),
          (zt.style["will-change"] = ""),
          this._hideClone(),
          Fe(zt, this.options.chosenClass, !1),
          (ot.clone = zt)),
        (r.cloneId = zo(function () {
          De("clone", r),
            !ot.eventCanceled &&
              (r.options.removeCloneOnHide || Ut.insertBefore(zt, F),
              r._hideClone(),
              Ne({ sortable: r, name: "clone" }));
        })),
        !n && Fe(F, s.dragClass, !0),
        n
          ? ((la = !0), (r._loopId = setInterval(r._emulateDragOver, 50)))
          : (wt(document, "mouseup", r._onDrop),
            wt(document, "touchend", r._onDrop),
            wt(document, "touchcancel", r._onDrop),
            i &&
              ((i.effectAllowed = "move"),
              s.setData && s.setData.call(r, i, F)),
            Et(document, "drop", r),
            lt(F, "transform", "translateZ(0)")),
        (yi = !0),
        (r._dragStartId = zo(r._dragStarted.bind(r, n, t))),
        Et(document, "selectstart", r),
        (ms = !0),
        window.getSelection().removeAllRanges(),
        _s && lt(document.body, "user-select", "none");
    },
    _onDragOver: function (t) {
      var n = this.el,
        r = t.target,
        i,
        s,
        o,
        a = this.options,
        l = a.group,
        c = ot.active,
        f = To === l,
        d = a.sort,
        h = ue || c,
        p,
        g = this,
        v = !1;
      if (xc) return;
      function E(mt, Se) {
        De(
          mt,
          g,
          Mn(
            {
              evt: t,
              isOwner: f,
              axis: p ? "vertical" : "horizontal",
              revert: o,
              dragRect: i,
              targetRect: s,
              canSort: d,
              fromSortable: h,
              target: r,
              completed: A,
              onMove: function (oe, Wt) {
                return Io(Ut, n, F, i, oe, Jt(oe), t, Wt);
              },
              changed: T,
            },
            Se
          )
        );
      }
      function x() {
        E("dragOverAnimationCapture"),
          g.captureAnimationState(),
          g !== h && h.captureAnimationState();
      }
      function A(mt) {
        return (
          E("dragOverCompleted", { insertion: mt }),
          mt &&
            (f ? c._hideClone() : c._showClone(g),
            g !== h &&
              (Fe(F, ue ? ue.options.ghostClass : c.options.ghostClass, !1),
              Fe(F, a.ghostClass, !0)),
            ue !== g && g !== ot.active
              ? (ue = g)
              : g === ot.active && ue && (ue = null),
            h === g && (g._ignoreWhileAnimating = r),
            g.animateAll(function () {
              E("dragOverAnimationComplete"), (g._ignoreWhileAnimating = null);
            }),
            g !== h && (h.animateAll(), (h._ignoreWhileAnimating = null))),
          ((r === F && !F.animated) || (r === n && !r.animated)) && (gi = null),
          !a.dragoverBubble &&
            !t.rootEl &&
            r !== document &&
            (F.parentNode[Pe]._isOutsideThisEl(t.target), !mt && Vr(t)),
          !a.dragoverBubble && t.stopPropagation && t.stopPropagation(),
          (v = !0)
        );
      }
      function T() {
        (je = Xe(F)),
          (vr = Xe(F, a.draggable)),
          Ne({
            sortable: g,
            name: "change",
            toEl: n,
            newIndex: je,
            newDraggableIndex: vr,
            originalEvent: t,
          });
      }
      if (
        (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(),
        (r = un(r, a.draggable, n, !0)),
        E("dragOver"),
        ot.eventCanceled)
      )
        return v;
      if (
        F.contains(t.target) ||
        (r.animated && r.animatingX && r.animatingY) ||
        g._ignoreWhileAnimating === r
      )
        return A(!1);
      if (
        ((la = !1),
        c &&
          !a.disabled &&
          (f
            ? d || (o = Vt !== Ut)
            : ue === this ||
              ((this.lastPutMode = To.checkPull(this, c, F, t)) &&
                l.checkPut(this, c, F, t))))
      ) {
        if (
          ((p = this._getDirection(t, r) === "vertical"),
          (i = Jt(F)),
          E("dragOverValid"),
          ot.eventCanceled)
        )
          return v;
        if (o)
          return (
            (Vt = Ut),
            x(),
            this._hideClone(),
            E("revert"),
            ot.eventCanceled ||
              (Gr ? Ut.insertBefore(F, Gr) : Ut.appendChild(F)),
            A(!0)
          );
        var C = vu(n, a.draggable);
        if (!C || (Vb(t, p, this) && !C.animated)) {
          if (C === F) return A(!1);
          if (
            (C && n === t.target && (r = C),
            r && (s = Jt(r)),
            Io(Ut, n, F, i, r, s, t, !!r) !== !1)
          )
            return (
              x(),
              C && C.nextSibling
                ? n.insertBefore(F, C.nextSibling)
                : n.appendChild(F),
              (Vt = n),
              T(),
              A(!0)
            );
        } else if (C && zb(t, p, this)) {
          var q = Ui(n, 0, a, !0);
          if (q === F) return A(!1);
          if (((r = q), (s = Jt(r)), Io(Ut, n, F, i, r, s, t, !1) !== !1))
            return x(), n.insertBefore(F, q), (Vt = n), T(), A(!0);
        } else if (r.parentNode === n) {
          s = Jt(r);
          var P = 0,
            W,
            at = F.parentNode !== n,
            Y = !Fb(
              (F.animated && F.toRect) || i,
              (r.animated && r.toRect) || s,
              p
            ),
            ut = p ? "top" : "left",
            dt = Rf(r, "top", "top") || Rf(F, "top", "top"),
            z = dt ? dt.scrollTop : void 0;
          gi !== r &&
            ((W = s[ut]), (Ns = !1), (Co = (!Y && a.invertSwap) || at)),
            (P = Kb(
              t,
              r,
              s,
              p,
              Y ? 1 : a.swapThreshold,
              a.invertedSwapThreshold == null
                ? a.swapThreshold
                : a.invertedSwapThreshold,
              Co,
              gi === r
            ));
          var ct;
          if (P !== 0) {
            var Nt = Xe(F);
            do (Nt -= P), (ct = Vt.children[Nt]);
            while (ct && (lt(ct, "display") === "none" || ct === ft));
          }
          if (P === 0 || ct === r) return A(!1);
          (gi = r), (Cs = P);
          var jt = r.nextElementSibling,
            St = !1;
          St = P === 1;
          var vt = Io(Ut, n, F, i, r, s, t, St);
          if (vt !== !1)
            return (
              (vt === 1 || vt === -1) && (St = vt === 1),
              (xc = !0),
              setTimeout(Hb, 30),
              x(),
              St && !jt
                ? n.appendChild(F)
                : r.parentNode.insertBefore(F, St ? jt : r),
              dt && Ap(dt, 0, z - dt.scrollTop),
              (Vt = F.parentNode),
              W !== void 0 && !Co && (Ho = Math.abs(W - Jt(r)[ut])),
              T(),
              A(!0)
            );
        }
        if (n.contains(F)) return A(!1);
      }
      return !1;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function () {
      wt(document, "mousemove", this._onTouchMove),
        wt(document, "touchmove", this._onTouchMove),
        wt(document, "pointermove", this._onTouchMove),
        wt(document, "dragover", Vr),
        wt(document, "mousemove", Vr),
        wt(document, "touchmove", Vr);
    },
    _offUpEvents: function () {
      var t = this.el.ownerDocument;
      wt(t, "mouseup", this._onDrop),
        wt(t, "touchend", this._onDrop),
        wt(t, "pointerup", this._onDrop),
        wt(t, "pointercancel", this._onDrop),
        wt(t, "touchcancel", this._onDrop),
        wt(document, "selectstart", this);
    },
    _onDrop: function (t) {
      var n = this.el,
        r = this.options;
      if (
        ((je = Xe(F)),
        (vr = Xe(F, r.draggable)),
        De("drop", this, { evt: t }),
        (Vt = F && F.parentNode),
        (je = Xe(F)),
        (vr = Xe(F, r.draggable)),
        ot.eventCanceled)
      ) {
        this._nulling();
        return;
      }
      (yi = !1),
        (Co = !1),
        (Ns = !1),
        clearInterval(this._loopId),
        clearTimeout(this._dragStartTimer),
        _c(this.cloneId),
        _c(this._dragStartId),
        this.nativeDraggable &&
          (wt(document, "drop", this), wt(n, "dragstart", this._onDragStart)),
        this._offMoveEvents(),
        this._offUpEvents(),
        _s && lt(document.body, "user-select", ""),
        lt(F, "transform", ""),
        t &&
          (ms &&
            (t.cancelable && t.preventDefault(),
            !r.dropBubble && t.stopPropagation()),
          ft && ft.parentNode && ft.parentNode.removeChild(ft),
          (Ut === Vt || (ue && ue.lastPutMode !== "clone")) &&
            zt &&
            zt.parentNode &&
            zt.parentNode.removeChild(zt),
          F &&
            (this.nativeDraggable && wt(F, "dragend", this),
            zl(F),
            (F.style["will-change"] = ""),
            ms &&
              !yi &&
              Fe(F, ue ? ue.options.ghostClass : this.options.ghostClass, !1),
            Fe(F, this.options.chosenClass, !1),
            Ne({
              sortable: this,
              name: "unchoose",
              toEl: Vt,
              newIndex: null,
              newDraggableIndex: null,
              originalEvent: t,
            }),
            Ut !== Vt
              ? (je >= 0 &&
                  (Ne({
                    rootEl: Vt,
                    name: "add",
                    toEl: Vt,
                    fromEl: Ut,
                    originalEvent: t,
                  }),
                  Ne({
                    sortable: this,
                    name: "remove",
                    toEl: Vt,
                    originalEvent: t,
                  }),
                  Ne({
                    rootEl: Vt,
                    name: "sort",
                    toEl: Vt,
                    fromEl: Ut,
                    originalEvent: t,
                  }),
                  Ne({
                    sortable: this,
                    name: "sort",
                    toEl: Vt,
                    originalEvent: t,
                  })),
                ue && ue.save())
              : je !== Ni &&
                je >= 0 &&
                (Ne({
                  sortable: this,
                  name: "update",
                  toEl: Vt,
                  originalEvent: t,
                }),
                Ne({
                  sortable: this,
                  name: "sort",
                  toEl: Vt,
                  originalEvent: t,
                })),
            ot.active &&
              ((je == null || je === -1) && ((je = Ni), (vr = Ts)),
              Ne({ sortable: this, name: "end", toEl: Vt, originalEvent: t }),
              this.save()))),
        this._nulling();
    },
    _nulling: function () {
      De("nulling", this),
        (Ut =
          F =
          Vt =
          ft =
          Gr =
          zt =
          Uo =
          wr =
          zr =
          an =
          ms =
          je =
          vr =
          Ni =
          Ts =
          gi =
          Cs =
          ue =
          To =
          ot.dragged =
          ot.ghost =
          ot.clone =
          ot.active =
            null),
        ua.forEach(function (t) {
          t.checked = !0;
        }),
        (ua.length = jl = Ul = 0);
    },
    handleEvent: function (t) {
      switch (t.type) {
        case "drop":
        case "dragend":
          this._onDrop(t);
          break;
        case "dragenter":
        case "dragover":
          F && (this._onDragOver(t), Ub(t));
          break;
        case "selectstart":
          t.preventDefault();
          break;
      }
    },
    toArray: function () {
      for (
        var t = [],
          n,
          r = this.el.children,
          i = 0,
          s = r.length,
          o = this.options;
        i < s;
        i++
      )
        (n = r[i]),
          un(n, o.draggable, this.el, !1) &&
            t.push(n.getAttribute(o.dataIdAttr) || Wb(n));
      return t;
    },
    sort: function (t, n) {
      var r = {},
        i = this.el;
      this.toArray().forEach(function (s, o) {
        var a = i.children[o];
        un(a, this.options.draggable, i, !1) && (r[s] = a);
      }, this),
        n && this.captureAnimationState(),
        t.forEach(function (s) {
          r[s] && (i.removeChild(r[s]), i.appendChild(r[s]));
        }),
        n && this.animateAll();
    },
    save: function () {
      var t = this.options.store;
      t && t.set && t.set(this);
    },
    closest: function (t, n) {
      return un(t, n || this.options.draggable, this.el, !1);
    },
    option: function (t, n) {
      var r = this.options;
      if (n === void 0) return r[t];
      var i = no.modifyOption(this, t, n);
      typeof i < "u" ? (r[t] = i) : (r[t] = n), t === "group" && kp(r);
    },
    destroy: function () {
      De("destroy", this);
      var t = this.el;
      (t[Pe] = null),
        wt(t, "mousedown", this._onTapStart),
        wt(t, "touchstart", this._onTapStart),
        wt(t, "pointerdown", this._onTapStart),
        this.nativeDraggable &&
          (wt(t, "dragover", this), wt(t, "dragenter", this)),
        Array.prototype.forEach.call(
          t.querySelectorAll("[draggable]"),
          function (n) {
            n.removeAttribute("draggable");
          }
        ),
        this._onDrop(),
        this._disableDelayedDragEvents(),
        ca.splice(ca.indexOf(this.el), 1),
        (this.el = t = null);
    },
    _hideClone: function () {
      if (!wr) {
        if ((De("hideClone", this), ot.eventCanceled)) return;
        lt(zt, "display", "none"),
          this.options.removeCloneOnHide &&
            zt.parentNode &&
            zt.parentNode.removeChild(zt),
          (wr = !0);
      }
    },
    _showClone: function (t) {
      if (t.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (wr) {
        if ((De("showClone", this), ot.eventCanceled)) return;
        F.parentNode == Ut && !this.options.group.revertClone
          ? Ut.insertBefore(zt, F)
          : Gr
          ? Ut.insertBefore(zt, Gr)
          : Ut.appendChild(zt),
          this.options.group.revertClone && this.animate(F, zt),
          lt(zt, "display", ""),
          (wr = !1);
      }
    },
  };
  function Ub(e) {
    e.dataTransfer && (e.dataTransfer.dropEffect = "move"),
      e.cancelable && e.preventDefault();
  }
  function Io(e, t, n, r, i, s, o, a) {
    var l,
      c = e[Pe],
      f = c.options.onMove,
      d;
    return (
      window.CustomEvent && !or && !eo
        ? (l = new CustomEvent("move", { bubbles: !0, cancelable: !0 }))
        : ((l = document.createEvent("Event")), l.initEvent("move", !0, !0)),
      (l.to = t),
      (l.from = e),
      (l.dragged = n),
      (l.draggedRect = r),
      (l.related = i || t),
      (l.relatedRect = s || Jt(t)),
      (l.willInsertAfter = a),
      (l.originalEvent = o),
      e.dispatchEvent(l),
      f && (d = f.call(c, l, o)),
      d
    );
  }
  function zl(e) {
    e.draggable = !1;
  }
  function Hb() {
    xc = !1;
  }
  function zb(e, t, n) {
    var r = Jt(Ui(n.el, 0, n.options, !0)),
      i = Cp(n.el, n.options, ft),
      s = 10;
    return t
      ? e.clientX < i.left - s || (e.clientY < r.top && e.clientX < r.right)
      : e.clientY < i.top - s || (e.clientY < r.bottom && e.clientX < r.left);
  }
  function Vb(e, t, n) {
    var r = Jt(vu(n.el, n.options.draggable)),
      i = Cp(n.el, n.options, ft),
      s = 10;
    return t
      ? e.clientX > i.right + s || (e.clientY > r.bottom && e.clientX > r.left)
      : e.clientY > i.bottom + s || (e.clientX > r.right && e.clientY > r.top);
  }
  function Kb(e, t, n, r, i, s, o, a) {
    var l = r ? e.clientY : e.clientX,
      c = r ? n.height : n.width,
      f = r ? n.top : n.left,
      d = r ? n.bottom : n.right,
      h = !1;
    if (!o) {
      if (a && Ho < c * i) {
        if (
          (!Ns &&
            (Cs === 1 ? l > f + (c * s) / 2 : l < d - (c * s) / 2) &&
            (Ns = !0),
          Ns)
        )
          h = !0;
        else if (Cs === 1 ? l < f + Ho : l > d - Ho) return -Cs;
      } else if (l > f + (c * (1 - i)) / 2 && l < d - (c * (1 - i)) / 2)
        return Gb(t);
    }
    return (
      (h = h || o),
      h && (l < f + (c * s) / 2 || l > d - (c * s) / 2)
        ? l > f + c / 2
          ? 1
          : -1
        : 0
    );
  }
  function Gb(e) {
    return Xe(F) < Xe(e) ? 1 : -1;
  }
  function Wb(e) {
    for (
      var t = e.tagName + e.className + e.src + e.href + e.textContent,
        n = t.length,
        r = 0;
      n--;

    )
      r += t.charCodeAt(n);
    return r.toString(36);
  }
  function Yb(e) {
    ua.length = 0;
    for (var t = e.getElementsByTagName("input"), n = t.length; n--; ) {
      var r = t[n];
      r.checked && ua.push(r);
    }
  }
  function zo(e) {
    return setTimeout(e, 0);
  }
  function _c(e) {
    return clearTimeout(e);
  }
  La &&
    Et(document, "touchmove", function (e) {
      (ot.active || yi) && e.cancelable && e.preventDefault();
    });
  ot.utils = {
    on: Et,
    off: wt,
    css: lt,
    find: xp,
    is: function (t, n) {
      return !!un(t, n, t, !1);
    },
    extend: Ob,
    throttle: _p,
    closest: un,
    toggleClass: Fe,
    clone: Tp,
    index: Xe,
    nextTick: zo,
    cancelNextTick: _c,
    detectDirection: Ip,
    getChild: Ui,
    expando: Pe,
  };
  ot.get = function (e) {
    return e[Pe];
  };
  ot.mount = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    t[0].constructor === Array && (t = t[0]),
      t.forEach(function (r) {
        if (!r.prototype || !r.prototype.constructor)
          throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
            {}.toString.call(r)
          );
        r.utils && (ot.utils = Mn(Mn({}, ot.utils), r.utils)), no.mount(r);
      });
  };
  ot.create = function (e, t) {
    return new ot(e, t);
  };
  ot.version = Ib;
  var Zt = [],
    gs,
    Ac,
    Tc = !1,
    Vl,
    Kl,
    fa,
    bs;
  function Xb() {
    function e() {
      this.defaults = {
        scroll: !0,
        forceAutoScrollFallback: !1,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: !0,
      };
      for (var t in this)
        t.charAt(0) === "_" &&
          typeof this[t] == "function" &&
          (this[t] = this[t].bind(this));
    }
    return (
      (e.prototype = {
        dragStarted: function (n) {
          var r = n.originalEvent;
          this.sortable.nativeDraggable
            ? Et(document, "dragover", this._handleAutoScroll)
            : this.options.supportPointer
            ? Et(document, "pointermove", this._handleFallbackAutoScroll)
            : r.touches
            ? Et(document, "touchmove", this._handleFallbackAutoScroll)
            : Et(document, "mousemove", this._handleFallbackAutoScroll);
        },
        dragOverCompleted: function (n) {
          var r = n.originalEvent;
          !this.options.dragOverBubble &&
            !r.rootEl &&
            this._handleAutoScroll(r);
        },
        drop: function () {
          this.sortable.nativeDraggable
            ? wt(document, "dragover", this._handleAutoScroll)
            : (wt(document, "pointermove", this._handleFallbackAutoScroll),
              wt(document, "touchmove", this._handleFallbackAutoScroll),
              wt(document, "mousemove", this._handleFallbackAutoScroll)),
            Ff(),
            Vo(),
            Lb();
        },
        nulling: function () {
          (fa = Ac = gs = Tc = bs = Vl = Kl = null), (Zt.length = 0);
        },
        _handleFallbackAutoScroll: function (n) {
          this._handleAutoScroll(n, !0);
        },
        _handleAutoScroll: function (n, r) {
          var i = this,
            s = (n.touches ? n.touches[0] : n).clientX,
            o = (n.touches ? n.touches[0] : n).clientY,
            a = document.elementFromPoint(s, o);
          if (
            ((fa = n),
            r || this.options.forceAutoScrollFallback || eo || or || _s)
          ) {
            Gl(n, this.options, a, r);
            var l = xr(a, !0);
            Tc &&
              (!bs || s !== Vl || o !== Kl) &&
              (bs && Ff(),
              (bs = setInterval(function () {
                var c = xr(document.elementFromPoint(s, o), !0);
                c !== l && ((l = c), Vo()), Gl(n, i.options, c, r);
              }, 10)),
              (Vl = s),
              (Kl = o));
          } else {
            if (!this.options.bubbleScroll || xr(a, !0) === qn()) {
              Vo();
              return;
            }
            Gl(n, this.options, xr(a, !1), !1);
          }
        },
      }),
      er(e, { pluginName: "scroll", initializeByDefault: !0 })
    );
  }
  function Vo() {
    Zt.forEach(function (e) {
      clearInterval(e.pid);
    }),
      (Zt = []);
  }
  function Ff() {
    clearInterval(bs);
  }
  var Gl = _p(function (e, t, n, r) {
      if (t.scroll) {
        var i = (e.touches ? e.touches[0] : e).clientX,
          s = (e.touches ? e.touches[0] : e).clientY,
          o = t.scrollSensitivity,
          a = t.scrollSpeed,
          l = qn(),
          c = !1,
          f;
        Ac !== n &&
          ((Ac = n),
          Vo(),
          (gs = t.scroll),
          (f = t.scrollFn),
          gs === !0 && (gs = xr(n, !0)));
        var d = 0,
          h = gs;
        do {
          var p = h,
            g = Jt(p),
            v = g.top,
            E = g.bottom,
            x = g.left,
            A = g.right,
            T = g.width,
            C = g.height,
            q = void 0,
            P = void 0,
            W = p.scrollWidth,
            at = p.scrollHeight,
            Y = lt(p),
            ut = p.scrollLeft,
            dt = p.scrollTop;
          p === l
            ? ((q =
                T < W &&
                (Y.overflowX === "auto" ||
                  Y.overflowX === "scroll" ||
                  Y.overflowX === "visible")),
              (P =
                C < at &&
                (Y.overflowY === "auto" ||
                  Y.overflowY === "scroll" ||
                  Y.overflowY === "visible")))
            : ((q =
                T < W && (Y.overflowX === "auto" || Y.overflowX === "scroll")),
              (P =
                C < at &&
                (Y.overflowY === "auto" || Y.overflowY === "scroll")));
          var z =
              q &&
              (Math.abs(A - i) <= o && ut + T < W) -
                (Math.abs(x - i) <= o && !!ut),
            ct =
              P &&
              (Math.abs(E - s) <= o && dt + C < at) -
                (Math.abs(v - s) <= o && !!dt);
          if (!Zt[d]) for (var Nt = 0; Nt <= d; Nt++) Zt[Nt] || (Zt[Nt] = {});
          (Zt[d].vx != z || Zt[d].vy != ct || Zt[d].el !== p) &&
            ((Zt[d].el = p),
            (Zt[d].vx = z),
            (Zt[d].vy = ct),
            clearInterval(Zt[d].pid),
            (z != 0 || ct != 0) &&
              ((c = !0),
              (Zt[d].pid = setInterval(
                function () {
                  r && this.layer === 0 && ot.active._onTouchMove(fa);
                  var jt = Zt[this.layer].vy ? Zt[this.layer].vy * a : 0,
                    St = Zt[this.layer].vx ? Zt[this.layer].vx * a : 0;
                  (typeof f == "function" &&
                    f.call(
                      ot.dragged.parentNode[Pe],
                      St,
                      jt,
                      e,
                      fa,
                      Zt[this.layer].el
                    ) !== "continue") ||
                    Ap(Zt[this.layer].el, St, jt);
                }.bind({ layer: d }),
                24
              )))),
            d++;
        } while (t.bubbleScroll && h !== l && (h = xr(h, !1)));
        Tc = c;
      }
    }, 30),
    qp = function (t) {
      var n = t.originalEvent,
        r = t.putSortable,
        i = t.dragEl,
        s = t.activeSortable,
        o = t.dispatchSortableEvent,
        a = t.hideGhostForTarget,
        l = t.unhideGhostForTarget;
      if (n) {
        var c = r || s;
        a();
        var f =
            n.changedTouches && n.changedTouches.length
              ? n.changedTouches[0]
              : n,
          d = document.elementFromPoint(f.clientX, f.clientY);
        l(),
          c &&
            !c.el.contains(d) &&
            (o("spill"), this.onSpill({ dragEl: i, putSortable: r }));
      }
    };
  function yu() {}
  yu.prototype = {
    startIndex: null,
    dragStart: function (t) {
      var n = t.oldDraggableIndex;
      this.startIndex = n;
    },
    onSpill: function (t) {
      var n = t.dragEl,
        r = t.putSortable;
      this.sortable.captureAnimationState(), r && r.captureAnimationState();
      var i = Ui(this.sortable.el, this.startIndex, this.options);
      i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n),
        this.sortable.animateAll(),
        r && r.animateAll();
    },
    drop: qp,
  };
  er(yu, { pluginName: "revertOnSpill" });
  function wu() {}
  wu.prototype = {
    onSpill: function (t) {
      var n = t.dragEl,
        r = t.putSortable,
        i = r || this.sortable;
      i.captureAnimationState(),
        n.parentNode && n.parentNode.removeChild(n),
        i.animateAll();
    },
    drop: qp,
  };
  er(wu, { pluginName: "removeOnSpill" });
  ot.mount(new Xb());
  ot.mount(wu, yu);
  const Zb = {
      name: "DataTable",
      props: {
        items: { type: Array, required: !0 },
        columns: { type: Array, required: !0 },
        dragRef: { type: String, default: "dragArea" },
        draggable: { type: Boolean, default: !0 },
        keyFunction: { type: Function, default: (e, t) => `item-${t}` },
        showFooter: { type: Boolean, default: !1 },
        footerItems: { type: Array, default: () => [] },
        enableTruncation: { type: Boolean, default: !0 },
        nonTruncatedColumns: { type: Array, default: () => [] },
      },
      data() {
        return { sortableInstance: null };
      },
      computed: {
        processedFooterItems() {
          if (!this.footerItems || this.footerItems.length === 0) return [];
          const e = this.columns.length,
            t = this.footerItems.length;
          return e > t
            ? this.footerItems.map((n, r) => {
                if (r === t - 1) {
                  const i = e - (t - 1);
                  return { ...n, colspan: i };
                }
                return { ...n, colspan: 1 };
              })
            : this.footerItems
                .map((n, r) =>
                  r < e - 1
                    ? { ...n, colspan: 1 }
                    : r === e - 1
                    ? { ...n, colspan: t - (e - 1) }
                    : null
                )
                .filter(Boolean);
        },
      },
      methods: {
        getValueByPath(e, t) {
          return t.split(".").reduce((n, r) => (n ? n[r] : null), e);
        },
        initSortable() {
          if (this.draggable && (this.destroySortable(), this.$refs.tbodyRef))
            try {
              this.sortableInstance = ot.create(this.$refs.tbodyRef, {
                animation: 150,
                handle: ".cursor-move",
                ghostClass: "sortable-ghost",
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                forceFallback: !0,
                fallbackClass: "sortable-fallback",
                onEnd: (e) => {
                  e.oldIndex !== e.newIndex &&
                    this.$emit("reorder", {
                      oldIndex: e.oldIndex,
                      newIndex: e.newIndex,
                    });
                },
              });
            } catch (e) {
              console.error("Erro ao inicializar Sortable:", e);
            }
        },
        destroySortable() {
          this.sortableInstance &&
            typeof this.sortableInstance.destroy == "function" &&
            (this.sortableInstance.destroy(), (this.sortableInstance = null));
        },
      },
      mounted() {
        this.$nextTick(() => {
          this.initSortable();
        });
      },
      updated() {
        this.$nextTick(() => {
          this.initSortable();
        });
      },
      beforeUnmount() {
        this.destroySortable();
      },
      watch: {
        items: {
          handler() {
            this.$nextTick(() => {
              this.initSortable();
            });
          },
          deep: !0,
        },
        draggable(e) {
          e
            ? this.$nextTick(() => {
                this.initSortable();
              })
            : this.destroySortable();
        },
      },
    },
    Jb = { key: 0, class: "base-table-container" },
    Qb = { class: "base-table", ref: "tableRef" },
    tv = { ref: "tbodyRef", class: "text-sm" },
    ev = ["title"],
    nv = { class: "truncate-text" },
    rv = { key: 1, class: "text-center" },
    iv = ["onClick"],
    sv = ["onClick"],
    ov = ["onClick"],
    av = ["onClick"],
    lv = { key: 2 },
    cv = { key: 0 },
    uv = ["colspan"],
    fv = { class: "total-label" },
    dv = { class: "total-value" };
  function hv(e, t, n, r, i, s) {
    return n.items.length > 0
      ? ($(),
        K("div", Jb, [
          S(
            "table",
            Qb,
            [
              S("thead", null, [
                S("tr", null, [
                  ($(!0),
                  K(
                    qt,
                    null,
                    pn(
                      n.columns,
                      (o) => (
                        $(),
                        K(
                          "th",
                          {
                            key: o.key,
                            class: rt([o.width, o.align]),
                            style: xa({
                              textAlign:
                                o.align === "text-center"
                                  ? "center"
                                  : o.align === "text-right"
                                  ? "right"
                                  : "left",
                            }),
                          },
                          [S("div", { class: rt(o.align) }, Ht(o.label), 3)],
                          6
                        )
                      )
                    ),
                    128
                  )),
                ]),
              ]),
              S(
                "tbody",
                tv,
                [
                  ($(!0),
                  K(
                    qt,
                    null,
                    pn(
                      n.items,
                      (o, a) => (
                        $(),
                        K(
                          "tr",
                          {
                            key: n.keyFunction(o, a),
                            class: rt({ "cursor-move": n.draggable }),
                          },
                          [
                            ($(!0),
                            K(
                              qt,
                              null,
                              pn(
                                n.columns,
                                (l) => (
                                  $(),
                                  K(
                                    "td",
                                    {
                                      key: l.key,
                                      class: rt([
                                        l.align === "text-left"
                                          ? "relative group"
                                          : l.align,
                                      ]),
                                    },
                                    [
                                      l.type === "text"
                                        ? ($(),
                                          K(
                                            "div",
                                            {
                                              key: 0,
                                              class: rt({
                                                "pl-2 py-2":
                                                  l.align === "text-left",
                                              }),
                                            },
                                            [
                                              n.enableTruncation &&
                                              !n.nonTruncatedColumns.includes(
                                                l.key
                                              )
                                                ? ($(),
                                                  K(
                                                    "div",
                                                    {
                                                      key: 0,
                                                      class:
                                                        "truncate-text-container",
                                                      title: s.getValueByPath(
                                                        o,
                                                        l.key
                                                      ),
                                                    },
                                                    [
                                                      S(
                                                        "span",
                                                        nv,
                                                        Ht(
                                                          s.getValueByPath(
                                                            o,
                                                            l.key
                                                          )
                                                        ),
                                                        1
                                                      ),
                                                    ],
                                                    8,
                                                    ev
                                                  ))
                                                : ($(),
                                                  K(
                                                    qt,
                                                    { key: 1 },
                                                    [
                                                      ee(
                                                        Ht(
                                                          s.getValueByPath(
                                                            o,
                                                            l.key
                                                          )
                                                        ),
                                                        1
                                                      ),
                                                    ],
                                                    64
                                                  )),
                                            ],
                                            2
                                          ))
                                        : l.type === "buttons"
                                        ? ($(),
                                          K("div", rv, [
                                            ea(
                                              e.$slots,
                                              "buttons-" + l.key,
                                              { item: o, index: a },
                                              () => {
                                                var c, f, d, h;
                                                return [
                                                  (c = l.actions) != null &&
                                                  c.view
                                                    ? ($(),
                                                      K(
                                                        "button",
                                                        {
                                                          key: 0,
                                                          onClick: (p) =>
                                                            e.$emit("view", a),
                                                          class:
                                                            "action-button view-button",
                                                          title: "Visualizar",
                                                        },
                                                        t[0] ||
                                                          (t[0] = [
                                                            S(
                                                              "svg",
                                                              {
                                                                xmlns:
                                                                  "http://www.w3.org/2000/svg",
                                                                class:
                                                                  "h-5 w-5",
                                                                viewBox:
                                                                  "0 0 24 24",
                                                                fill: "none",
                                                                stroke:
                                                                  "currentColor",
                                                                "stroke-width":
                                                                  "2",
                                                              },
                                                              [
                                                                S("path", {
                                                                  d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
                                                                }),
                                                                S("circle", {
                                                                  cx: "12",
                                                                  cy: "12",
                                                                  r: "3",
                                                                }),
                                                              ],
                                                              -1
                                                            ),
                                                          ]),
                                                        8,
                                                        iv
                                                      ))
                                                    : Kt("", !0),
                                                  (f = l.actions) != null &&
                                                  f.edit
                                                    ? ($(),
                                                      K(
                                                        "button",
                                                        {
                                                          key: 1,
                                                          onClick: (p) =>
                                                            e.$emit("edit", a),
                                                          class:
                                                            "action-button edit-button",
                                                          title: "Editar",
                                                        },
                                                        t[1] ||
                                                          (t[1] = [
                                                            S(
                                                              "svg",
                                                              {
                                                                xmlns:
                                                                  "http://www.w3.org/2000/svg",
                                                                class:
                                                                  "h-5 w-5",
                                                                viewBox:
                                                                  "0 0 24 24",
                                                                fill: "none",
                                                                stroke:
                                                                  "currentColor",
                                                                "stroke-width":
                                                                  "2",
                                                              },
                                                              [
                                                                S("path", {
                                                                  d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
                                                                }),
                                                                S("path", {
                                                                  d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
                                                                }),
                                                              ],
                                                              -1
                                                            ),
                                                          ]),
                                                        8,
                                                        sv
                                                      ))
                                                    : Kt("", !0),
                                                  (d = l.actions) != null &&
                                                  d.duplicate
                                                    ? ($(),
                                                      K(
                                                        "button",
                                                        {
                                                          key: 2,
                                                          onClick: (p) =>
                                                            e.$emit(
                                                              "duplicate",
                                                              a
                                                            ),
                                                          class:
                                                            "action-button duplicate-button",
                                                          title: "Duplicar",
                                                        },
                                                        t[2] ||
                                                          (t[2] = [
                                                            S(
                                                              "svg",
                                                              {
                                                                xmlns:
                                                                  "http://www.w3.org/2000/svg",
                                                                class:
                                                                  "h-5 w-5",
                                                                viewBox:
                                                                  "0 0 24 24",
                                                                fill: "none",
                                                                stroke:
                                                                  "currentColor",
                                                                "stroke-width":
                                                                  "2",
                                                              },
                                                              [
                                                                S("rect", {
                                                                  x: "8",
                                                                  y: "8",
                                                                  width: "12",
                                                                  height: "12",
                                                                  rx: "2",
                                                                  ry: "2",
                                                                }),
                                                                S("path", {
                                                                  d: "M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2",
                                                                }),
                                                              ],
                                                              -1
                                                            ),
                                                          ]),
                                                        8,
                                                        ov
                                                      ))
                                                    : Kt("", !0),
                                                  (h = l.actions) != null &&
                                                  h.delete
                                                    ? ($(),
                                                      K(
                                                        "button",
                                                        {
                                                          key: 3,
                                                          onClick: (p) =>
                                                            e.$emit(
                                                              "delete",
                                                              a
                                                            ),
                                                          class:
                                                            "action-button delete-button",
                                                          title: "Remover",
                                                        },
                                                        t[3] ||
                                                          (t[3] = [
                                                            S(
                                                              "svg",
                                                              {
                                                                xmlns:
                                                                  "http://www.w3.org/2000/svg",
                                                                class:
                                                                  "h-5 w-5",
                                                                viewBox:
                                                                  "0 0 24 24",
                                                                fill: "none",
                                                                stroke:
                                                                  "currentColor",
                                                                "stroke-width":
                                                                  "2",
                                                              },
                                                              [
                                                                S("path", {
                                                                  d: "M3 6h18",
                                                                }),
                                                                S("path", {
                                                                  d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
                                                                }),
                                                                S("path", {
                                                                  d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
                                                                }),
                                                              ],
                                                              -1
                                                            ),
                                                          ]),
                                                        8,
                                                        av
                                                      ))
                                                    : Kt("", !0),
                                                ];
                                              }
                                            ),
                                          ]))
                                        : ($(),
                                          K("div", lv, [
                                            ea(
                                              e.$slots,
                                              "col-" + l.key,
                                              { item: o, index: a },
                                              () => [
                                                ee(
                                                  Ht(
                                                    s.getValueByPath(o, l.key)
                                                  ),
                                                  1
                                                ),
                                              ]
                                            ),
                                          ])),
                                    ],
                                    2
                                  )
                                )
                              ),
                              128
                            )),
                          ],
                          2
                        )
                      )
                    ),
                    128
                  )),
                ],
                512
              ),
              n.showFooter
                ? ($(),
                  K("tfoot", cv, [
                    S("tr", null, [
                      ($(!0),
                      K(
                        qt,
                        null,
                        pn(
                          s.processedFooterItems,
                          (o, a) => (
                            $(),
                            K(
                              "td",
                              {
                                key: "footer-" + a,
                                colspan: o.colspan || 1,
                                class: rt(o.class || "text-center font-medium"),
                              },
                              [
                                S("span", fv, Ht(o.label) + ": ", 1),
                                S("span", dv, Ht(o.value), 1),
                              ],
                              10,
                              uv
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                  ]))
                : Kt("", !0),
            ],
            512
          ),
        ]))
      : Kt("", !0);
  }
  const Rp = Be(Zb, [
      ["render", hv],
      ["__scopeId", "data-v-7f7fec9f"],
    ]),
    pv = {
      name: "FormSubmitSection",
      props: {
        formatos: Object,
        isLoading: Boolean,
        buttonText: { type: String, default: "Gerar Documento" },
        loadingText: { type: String, default: "Processando" },
      },
      computed: {
        dynamicButtonText() {
          return !this.formatos.gerarDocx && !this.formatos.gerarPdf
            ? "Baixar JSON"
            : "Gerar Documentos";
        },
      },
      data() {
        return {};
      },
      methods: {
        updateDocx(e) {
          this.$emit("update:docx", e);
        },
        updatePdf(e) {
          this.$emit("update:pdf", e);
        },
      },
    },
    mv = { class: "mt-6" },
    gv = { class: "flex justify-center items-center gap-4" },
    bv = { class: "format-section" },
    vv = { class: "flex items-center gap-4" },
    yv = { class: "flex gap-4" },
    wv = { class: "checkbox-container" },
    Ev = ["checked"],
    Sv = { class: "checkbox-container" },
    xv = ["checked"],
    _v = ["disabled"];
  function Av(e, t, n, r, i, s) {
    return (
      $(),
      K("div", mv, [
        S("div", gv, [
          S("div", bv, [
            S("div", vv, [
              t[6] ||
                (t[6] = S(
                  "h3",
                  { class: "format-title whitespace-nowrap" },
                  "Formato dos arquivos",
                  -1
                )),
              S("div", yv, [
                t[5] ||
                  (t[5] = S(
                    "label",
                    { class: "checkbox-container" },
                    [
                      S("input", {
                        type: "checkbox",
                        checked: !0,
                        disabled: "",
                        class: "checkbox-input",
                      }),
                      S("span", { class: "checkbox-label" }, "JSON"),
                    ],
                    -1
                  )),
                S("label", wv, [
                  S(
                    "input",
                    {
                      type: "checkbox",
                      checked: n.formatos.gerarDocx,
                      onChange:
                        t[0] || (t[0] = (o) => s.updateDocx(o.target.checked)),
                      class: "checkbox-input",
                    },
                    null,
                    40,
                    Ev
                  ),
                  t[3] ||
                    (t[3] = S("span", { class: "checkbox-label" }, "DOCX", -1)),
                ]),
                S("label", Sv, [
                  S(
                    "input",
                    {
                      type: "checkbox",
                      checked: n.formatos.gerarPdf,
                      onChange:
                        t[1] || (t[1] = (o) => s.updatePdf(o.target.checked)),
                      class: "checkbox-input",
                    },
                    null,
                    40,
                    xv
                  ),
                  t[4] ||
                    (t[4] = S("span", { class: "checkbox-label" }, "PDF", -1)),
                ]),
              ]),
            ]),
          ]),
          S(
            "button",
            {
              onClick: t[2] || (t[2] = (o) => e.$emit("submit")),
              class: "btn btn-primary w-64",
              disabled: n.isLoading,
            },
            [
              n.isLoading
                ? ($(),
                  K(
                    qt,
                    { key: 0 },
                    [
                      t[7] ||
                        (t[7] = S(
                          "svg",
                          {
                            class: "animate-spin -ml-1 mr-2 h-5 w-5 text-white",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                          },
                          [
                            S("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4",
                            }),
                            S("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                            }),
                          ],
                          -1
                        )),
                      ee(" " + Ht(n.loadingText), 1),
                    ],
                    64
                  ))
                : ($(),
                  K(
                    qt,
                    { key: 1 },
                    [
                      t[8] ||
                        (t[8] = S(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-5 w-5 mr-2",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                          },
                          [
                            S("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                            }),
                          ],
                          -1
                        )),
                      ee(" " + Ht(s.dynamicButtonText), 1),
                    ],
                    64
                  )),
            ],
            8,
            _v
          ),
        ]),
      ])
    );
  }
  const Dp = Be(pv, [
      ["render", Av],
      ["__scopeId", "data-v-575d7169"],
    ]),
    Tv = {
      name: "InfoButton",
      props: {
        tooltipTitle: { type: String, default: "Informações" },
        tooltipItems: { type: Array, default: () => [] },
      },
      data() {
        return {};
      },
      methods: {},
    },
    Cv = { class: "info-toggle" },
    Nv = { class: "info-tooltip" },
    Iv = { class: "tooltip-content" },
    kv = { class: "tooltip-title" },
    Ov = { class: "tooltip-list" };
  function Lv(e, t, n, r, i, s) {
    return (
      $(),
      K("button", Cv, [
        t[1] ||
          (t[1] = S(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              class: "info-icon",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
            },
            [
              S("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              }),
            ],
            -1
          )),
        S("div", Nv, [
          t[0] || (t[0] = S("div", { class: "tooltip-arrow" }, null, -1)),
          S("div", Iv, [
            S("p", kv, Ht(n.tooltipTitle), 1),
            S("ul", Ov, [
              ($(!0),
              K(
                qt,
                null,
                pn(
                  n.tooltipItems,
                  (o, a) => (
                    $(),
                    K("li", { key: a, class: "tooltip-item" }, " • " + Ht(o), 1)
                  )
                ),
                128
              )),
            ]),
          ]),
        ]),
      ])
    );
  }
  const Mp = Be(Tv, [
      ["render", Lv],
      ["__scopeId", "data-v-6ae8896c"],
    ]),
    qv = {
      name: "ModalMessage",
      props: {
        show: Boolean,
        titulo: { type: String, default: "Mensagem" },
        mensagem: { type: [String, Object], default: "Conteúdo da mensagem." },
        tipo: {
          type: String,
          default: "note",
          validator: (e) =>
            ["note", "tip", "important", "warning", "caution"].includes(e),
        },
        showConfirmButton: { type: Boolean, default: !0 },
        showCancelButton: { type: Boolean, default: !1 },
        textoBotaoConfirmar: { type: String, default: "OK" },
        textoBotaoCancelar: { type: String, default: "Cancelar" },
        larguraPersonalizada: { type: String, default: "max-w-md" },
        fecharAoClicarFora: { type: Boolean, default: !1 },
      },
      emits: ["confirmar", "cancelar"],
      computed: {
        isDarkMode() {
          return document.documentElement.classList.contains("dark");
        },
        modalConfig() {
          const e = {
            note: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>`,
              title: this.titulo || "Nota",
              colorClass: this.isDarkMode
                ? "text-blue-400 bg-blue-900/20"
                : "text-blue-600 bg-blue-50",
              borderClass: this.isDarkMode
                ? "border-blue-700"
                : "border-blue-200",
              buttonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
            },
            tip: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 20.488V17"></path>
                  <path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>`,
              title: this.titulo || "Dica",
              colorClass: this.isDarkMode
                ? "text-green-400 bg-green-900/20"
                : "text-green-600 bg-green-50",
              borderClass: this.isDarkMode
                ? "border-green-700"
                : "border-green-200",
              buttonClass:
                "bg-green-600 hover:bg-green-700 focus:ring-green-500",
            },
            important: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                        <path d="M19 4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3l3 3 3-3h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
                        <line x1="12" y1="7" x2="12" y2="11"></line>
                        <line x1="12" y1="14" x2="12.01" y2="14"></line>
                      </svg>`,
              title: this.titulo || "Importante",
              colorClass: this.isDarkMode
                ? "text-purple-400 bg-purple-900/20"
                : "text-purple-600 bg-purple-50",
              borderClass: this.isDarkMode
                ? "border-purple-700"
                : "border-purple-200",
              buttonClass:
                "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
            },
            warning: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>`,
              title: this.titulo || "Aviso",
              colorClass: this.isDarkMode
                ? "text-yellow-400 bg-yellow-900/20"
                : "text-yellow-600 bg-yellow-50",
              borderClass: this.isDarkMode
                ? "border-yellow-700"
                : "border-yellow-200",
              buttonClass:
                "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
            },
            caution: {
              icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>`,
              title: this.titulo || "Cuidado",
              colorClass: this.isDarkMode
                ? "text-red-400 bg-red-900/20"
                : "text-red-600 bg-red-50",
              borderClass: this.isDarkMode
                ? "border-red-700"
                : "border-red-200",
              buttonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
            },
          };
          return e[this.tipo] || e.note;
        },
        confirmButtonClasses() {
          return `px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${this.modalConfig.buttonClass}`;
        },
        cancelButtonClasses() {
          return `px-4 py-2 rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
            this.isDarkMode
              ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`;
        },
      },
      methods: {
        confirmar() {
          this.$emit("confirmar");
        },
        cancelar() {
          this.$emit("cancelar");
        },
        fecharSeClicarFora(e) {
          this.fecharAoClicarFora &&
            e.target === e.currentTarget &&
            this.cancelar();
        },
        gerenciarTeclas(e) {
          e.key === "Escape" && this.fecharAoClicarFora
            ? this.cancelar()
            : e.key === "Enter" && this.showConfirmButton && this.confirmar();
        },
      },
      mounted() {
        window.addEventListener("keydown", this.gerenciarTeclas),
          this.show && document.body.classList.add("modal-open");
      },
      updated() {
        this.show
          ? document.body.classList.add("modal-open")
          : document.body.classList.remove("modal-open");
      },
      beforeUnmount() {
        window.removeEventListener("keydown", this.gerenciarTeclas),
          document.body.classList.remove("modal-open");
      },
    },
    Rv = { class: "flex items-start mb-4 gap-4" },
    Dv = ["innerHTML"],
    Mv = { class: "flex-1" },
    Pv = { class: "text-lg font-medium mb-2" },
    Bv = { key: 0 },
    Fv = ["innerHTML"],
    $v = { class: "flex justify-end space-x-4" };
  function jv(e, t, n, r, i, s) {
    return n.show
      ? ($(),
        K(
          "div",
          {
            key: 0,
            class:
              "fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center",
            onClick:
              t[2] ||
              (t[2] = (...o) =>
                s.fecharSeClicarFora && s.fecharSeClicarFora(...o)),
          },
          [
            S(
              "div",
              {
                class: rt([
                  "modal-message",
                  "p-6",
                  "rounded-lg",
                  "shadow-xl",
                  "w-full",
                  "mx-4",
                  "transform",
                  "transition-all",
                  "duration-300",
                  "scale-100",
                  n.larguraPersonalizada,
                  s.isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800",
                ]),
              },
              [
                S("div", Rv, [
                  S(
                    "div",
                    {
                      class: rt([
                        "p-3",
                        "rounded-full",
                        s.modalConfig.colorClass,
                      ]),
                      innerHTML: s.modalConfig.icon,
                    },
                    null,
                    10,
                    Dv
                  ),
                  S("div", Mv, [
                    S("h3", Pv, Ht(s.modalConfig.title), 1),
                    S(
                      "div",
                      {
                        class: rt([
                          "text-sm",
                          s.isDarkMode ? "text-gray-300" : "text-gray-600",
                        ]),
                      },
                      [
                        typeof n.mensagem == "string"
                          ? ($(), K("p", Bv, Ht(n.mensagem), 1))
                          : ($(),
                            K(
                              "div",
                              { key: 1, innerHTML: n.mensagem },
                              null,
                              8,
                              Fv
                            )),
                      ],
                      2
                    ),
                  ]),
                ]),
                S(
                  "div",
                  {
                    class: rt(["border-t", "my-4", s.modalConfig.borderClass]),
                  },
                  null,
                  2
                ),
                S("div", $v, [
                  n.showCancelButton
                    ? ($(),
                      K(
                        "button",
                        {
                          key: 0,
                          onClick:
                            t[0] ||
                            (t[0] = (...o) => s.cancelar && s.cancelar(...o)),
                          type: "button",
                          class: rt(s.cancelButtonClasses),
                        },
                        Ht(n.textoBotaoCancelar),
                        3
                      ))
                    : Kt("", !0),
                  n.showConfirmButton
                    ? ($(),
                      K(
                        "button",
                        {
                          key: 1,
                          onClick:
                            t[1] ||
                            (t[1] = (...o) => s.confirmar && s.confirmar(...o)),
                          type: "button",
                          class: rt(s.confirmButtonClasses),
                        },
                        Ht(n.textoBotaoConfirmar),
                        3
                      ))
                    : Kt("", !0),
                ]),
              ],
              2
            ),
          ]
        ))
      : Kt("", !0);
  }
  const Pp = Be(qv, [
    ["render", jv],
    ["__scopeId", "data-v-4feb7451"],
  ]);
  var Bp =
      typeof global == "object" && global && global.Object === Object && global,
    Uv = typeof self == "object" && self && self.Object === Object && self,
    Fn = Bp || Uv || Function("return this")(),
    Ir = Fn.Symbol,
    Fp = Object.prototype,
    Hv = Fp.hasOwnProperty,
    zv = Fp.toString,
    fs = Ir ? Ir.toStringTag : void 0;
  function Vv(e) {
    var t = Hv.call(e, fs),
      n = e[fs];
    try {
      e[fs] = void 0;
      var r = !0;
    } catch {}
    var i = zv.call(e);
    return r && (t ? (e[fs] = n) : delete e[fs]), i;
  }
  var Kv = Object.prototype,
    Gv = Kv.toString;
  function Wv(e) {
    return Gv.call(e);
  }
  var Yv = "[object Null]",
    Xv = "[object Undefined]",
    $f = Ir ? Ir.toStringTag : void 0;
  function Xi(e) {
    return e == null
      ? e === void 0
        ? Xv
        : Yv
      : $f && $f in Object(e)
      ? Vv(e)
      : Wv(e);
  }
  function nr(e) {
    return e != null && typeof e == "object";
  }
  var Jr = Array.isArray;
  function qr(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  function $p(e) {
    return e;
  }
  var Zv = "[object AsyncFunction]",
    Jv = "[object Function]",
    Qv = "[object GeneratorFunction]",
    ty = "[object Proxy]";
  function Eu(e) {
    if (!qr(e)) return !1;
    var t = Xi(e);
    return t == Jv || t == Qv || t == Zv || t == ty;
  }
  var Wl = Fn["__core-js_shared__"],
    jf = (function () {
      var e = /[^.]+$/.exec((Wl && Wl.keys && Wl.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
  function ey(e) {
    return !!jf && jf in e;
  }
  var ny = Function.prototype,
    ry = ny.toString;
  function ei(e) {
    if (e != null) {
      try {
        return ry.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  var iy = /[\\^$.*+?()[\]{}|]/g,
    sy = /^\[object .+?Constructor\]$/,
    oy = Function.prototype,
    ay = Object.prototype,
    ly = oy.toString,
    cy = ay.hasOwnProperty,
    uy = RegExp(
      "^" +
        ly
          .call(cy)
          .replace(iy, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function fy(e) {
    if (!qr(e) || ey(e)) return !1;
    var t = Eu(e) ? uy : sy;
    return t.test(ei(e));
  }
  function dy(e, t) {
    return e == null ? void 0 : e[t];
  }
  function ni(e, t) {
    var n = dy(e, t);
    return fy(n) ? n : void 0;
  }
  var Cc = ni(Fn, "WeakMap"),
    Uf = Object.create,
    hy = (function () {
      function e() {}
      return function (t) {
        if (!qr(t)) return {};
        if (Uf) return Uf(t);
        e.prototype = t;
        var n = new e();
        return (e.prototype = void 0), n;
      };
    })();
  function py(e, t, n) {
    switch (n.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, n[0]);
      case 2:
        return e.call(t, n[0], n[1]);
      case 3:
        return e.call(t, n[0], n[1], n[2]);
    }
    return e.apply(t, n);
  }
  function my(e, t) {
    var n = -1,
      r = e.length;
    for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
    return t;
  }
  var gy = 800,
    by = 16,
    vy = Date.now;
  function yy(e) {
    var t = 0,
      n = 0;
    return function () {
      var r = vy(),
        i = by - (r - n);
      if (((n = r), i > 0)) {
        if (++t >= gy) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  function wy(e) {
    return function () {
      return e;
    };
  }
  var da = (function () {
      try {
        var e = ni(Object, "defineProperty");
        return e({}, "", {}), e;
      } catch {}
    })(),
    Ey = da
      ? function (e, t) {
          return da(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: wy(t),
            writable: !0,
          });
        }
      : $p,
    Sy = yy(Ey);
  function xy(e, t) {
    for (
      var n = -1, r = e == null ? 0 : e.length;
      ++n < r && t(e[n], n, e) !== !1;

    );
    return e;
  }
  var _y = 9007199254740991,
    Ay = /^(?:0|[1-9]\d*)$/;
  function jp(e, t) {
    var n = typeof e;
    return (
      (t = t ?? _y),
      !!t &&
        (n == "number" || (n != "symbol" && Ay.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  function Su(e, t, n) {
    t == "__proto__" && da
      ? da(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
      : (e[t] = n);
  }
  function ro(e, t) {
    return e === t || (e !== e && t !== t);
  }
  var Ty = Object.prototype,
    Cy = Ty.hasOwnProperty;
  function Up(e, t, n) {
    var r = e[t];
    (!(Cy.call(e, t) && ro(r, n)) || (n === void 0 && !(t in e))) &&
      Su(e, t, n);
  }
  function Ny(e, t, n, r) {
    var i = !n;
    n || (n = {});
    for (var s = -1, o = t.length; ++s < o; ) {
      var a = t[s],
        l = void 0;
      l === void 0 && (l = e[a]), i ? Su(n, a, l) : Up(n, a, l);
    }
    return n;
  }
  var Hf = Math.max;
  function Iy(e, t, n) {
    return (
      (t = Hf(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var r = arguments, i = -1, s = Hf(r.length - t, 0), o = Array(s);
          ++i < s;

        )
          o[i] = r[t + i];
        i = -1;
        for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
        return (a[t] = n(o)), py(e, this, a);
      }
    );
  }
  function ky(e, t) {
    return Sy(Iy(e, t, $p), e + "");
  }
  var Oy = 9007199254740991;
  function Hp(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Oy;
  }
  function qa(e) {
    return e != null && Hp(e.length) && !Eu(e);
  }
  function Ly(e, t, n) {
    if (!qr(n)) return !1;
    var r = typeof t;
    return (r == "number" ? qa(n) && jp(t, n.length) : r == "string" && t in n)
      ? ro(n[t], e)
      : !1;
  }
  function qy(e) {
    return ky(function (t, n) {
      var r = -1,
        i = n.length,
        s = i > 1 ? n[i - 1] : void 0,
        o = i > 2 ? n[2] : void 0;
      for (
        s = e.length > 3 && typeof s == "function" ? (i--, s) : void 0,
          o && Ly(n[0], n[1], o) && ((s = i < 3 ? void 0 : s), (i = 1)),
          t = Object(t);
        ++r < i;

      ) {
        var a = n[r];
        a && e(t, a, r, s);
      }
      return t;
    });
  }
  var Ry = Object.prototype;
  function xu(e) {
    var t = e && e.constructor,
      n = (typeof t == "function" && t.prototype) || Ry;
    return e === n;
  }
  function Dy(e, t) {
    for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
    return r;
  }
  var My = "[object Arguments]";
  function zf(e) {
    return nr(e) && Xi(e) == My;
  }
  var zp = Object.prototype,
    Py = zp.hasOwnProperty,
    By = zp.propertyIsEnumerable,
    Nc = zf(
      (function () {
        return arguments;
      })()
    )
      ? zf
      : function (e) {
          return nr(e) && Py.call(e, "callee") && !By.call(e, "callee");
        };
  function Fy() {
    return !1;
  }
  var Vp = typeof Ve == "object" && Ve && !Ve.nodeType && Ve,
    Vf = Vp && typeof Ke == "object" && Ke && !Ke.nodeType && Ke,
    $y = Vf && Vf.exports === Vp,
    Kf = $y ? Fn.Buffer : void 0,
    jy = Kf ? Kf.isBuffer : void 0,
    Us = jy || Fy,
    Uy = "[object Arguments]",
    Hy = "[object Array]",
    zy = "[object Boolean]",
    Vy = "[object Date]",
    Ky = "[object Error]",
    Gy = "[object Function]",
    Wy = "[object Map]",
    Yy = "[object Number]",
    Xy = "[object Object]",
    Zy = "[object RegExp]",
    Jy = "[object Set]",
    Qy = "[object String]",
    tw = "[object WeakMap]",
    ew = "[object ArrayBuffer]",
    nw = "[object DataView]",
    rw = "[object Float32Array]",
    iw = "[object Float64Array]",
    sw = "[object Int8Array]",
    ow = "[object Int16Array]",
    aw = "[object Int32Array]",
    lw = "[object Uint8Array]",
    cw = "[object Uint8ClampedArray]",
    uw = "[object Uint16Array]",
    fw = "[object Uint32Array]",
    $t = {};
  $t[rw] =
    $t[iw] =
    $t[sw] =
    $t[ow] =
    $t[aw] =
    $t[lw] =
    $t[cw] =
    $t[uw] =
    $t[fw] =
      !0;
  $t[Uy] =
    $t[Hy] =
    $t[ew] =
    $t[zy] =
    $t[nw] =
    $t[Vy] =
    $t[Ky] =
    $t[Gy] =
    $t[Wy] =
    $t[Yy] =
    $t[Xy] =
    $t[Zy] =
    $t[Jy] =
    $t[Qy] =
    $t[tw] =
      !1;
  function dw(e) {
    return nr(e) && Hp(e.length) && !!$t[Xi(e)];
  }
  function _u(e) {
    return function (t) {
      return e(t);
    };
  }
  var Kp = typeof Ve == "object" && Ve && !Ve.nodeType && Ve,
    Is = Kp && typeof Ke == "object" && Ke && !Ke.nodeType && Ke,
    hw = Is && Is.exports === Kp,
    Yl = hw && Bp.process,
    Hi = (function () {
      try {
        var e = Is && Is.require && Is.require("util").types;
        return e || (Yl && Yl.binding && Yl.binding("util"));
      } catch {}
    })(),
    Gf = Hi && Hi.isTypedArray,
    Au = Gf ? _u(Gf) : dw,
    pw = Object.prototype,
    mw = pw.hasOwnProperty;
  function Gp(e, t) {
    var n = Jr(e),
      r = !n && Nc(e),
      i = !n && !r && Us(e),
      s = !n && !r && !i && Au(e),
      o = n || r || i || s,
      a = o ? Dy(e.length, String) : [],
      l = a.length;
    for (var c in e)
      (t || mw.call(e, c)) &&
        !(
          o &&
          (c == "length" ||
            (i && (c == "offset" || c == "parent")) ||
            (s && (c == "buffer" || c == "byteLength" || c == "byteOffset")) ||
            jp(c, l))
        ) &&
        a.push(c);
    return a;
  }
  function Wp(e, t) {
    return function (n) {
      return e(t(n));
    };
  }
  var gw = Wp(Object.keys, Object),
    bw = Object.prototype,
    vw = bw.hasOwnProperty;
  function yw(e) {
    if (!xu(e)) return gw(e);
    var t = [];
    for (var n in Object(e)) vw.call(e, n) && n != "constructor" && t.push(n);
    return t;
  }
  function ww(e) {
    return qa(e) ? Gp(e) : yw(e);
  }
  function Ew(e) {
    var t = [];
    if (e != null) for (var n in Object(e)) t.push(n);
    return t;
  }
  var Sw = Object.prototype,
    xw = Sw.hasOwnProperty;
  function _w(e) {
    if (!qr(e)) return Ew(e);
    var t = xu(e),
      n = [];
    for (var r in e) (r == "constructor" && (t || !xw.call(e, r))) || n.push(r);
    return n;
  }
  function Yp(e) {
    return qa(e) ? Gp(e, !0) : _w(e);
  }
  var Hs = ni(Object, "create");
  function Aw() {
    (this.__data__ = Hs ? Hs(null) : {}), (this.size = 0);
  }
  function Tw(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  var Cw = "__lodash_hash_undefined__",
    Nw = Object.prototype,
    Iw = Nw.hasOwnProperty;
  function kw(e) {
    var t = this.__data__;
    if (Hs) {
      var n = t[e];
      return n === Cw ? void 0 : n;
    }
    return Iw.call(t, e) ? t[e] : void 0;
  }
  var Ow = Object.prototype,
    Lw = Ow.hasOwnProperty;
  function qw(e) {
    var t = this.__data__;
    return Hs ? t[e] !== void 0 : Lw.call(t, e);
  }
  var Rw = "__lodash_hash_undefined__";
  function Dw(e, t) {
    var n = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (n[e] = Hs && t === void 0 ? Rw : t),
      this
    );
  }
  function Qr(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  Qr.prototype.clear = Aw;
  Qr.prototype.delete = Tw;
  Qr.prototype.get = kw;
  Qr.prototype.has = qw;
  Qr.prototype.set = Dw;
  function Mw() {
    (this.__data__ = []), (this.size = 0);
  }
  function Ra(e, t) {
    for (var n = e.length; n--; ) if (ro(e[n][0], t)) return n;
    return -1;
  }
  var Pw = Array.prototype,
    Bw = Pw.splice;
  function Fw(e) {
    var t = this.__data__,
      n = Ra(t, e);
    if (n < 0) return !1;
    var r = t.length - 1;
    return n == r ? t.pop() : Bw.call(t, n, 1), --this.size, !0;
  }
  function $w(e) {
    var t = this.__data__,
      n = Ra(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function jw(e) {
    return Ra(this.__data__, e) > -1;
  }
  function Uw(e, t) {
    var n = this.__data__,
      r = Ra(n, e);
    return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
  }
  function ar(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  ar.prototype.clear = Mw;
  ar.prototype.delete = Fw;
  ar.prototype.get = $w;
  ar.prototype.has = jw;
  ar.prototype.set = Uw;
  var zs = ni(Fn, "Map");
  function Hw() {
    (this.size = 0),
      (this.__data__ = {
        hash: new Qr(),
        map: new (zs || ar)(),
        string: new Qr(),
      });
  }
  function zw(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  function Da(e, t) {
    var n = e.__data__;
    return zw(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
  }
  function Vw(e) {
    var t = Da(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  function Kw(e) {
    return Da(this, e).get(e);
  }
  function Gw(e) {
    return Da(this, e).has(e);
  }
  function Ww(e, t) {
    var n = Da(this, e),
      r = n.size;
    return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
  }
  function ri(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.clear(); ++t < n; ) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  ri.prototype.clear = Hw;
  ri.prototype.delete = Vw;
  ri.prototype.get = Kw;
  ri.prototype.has = Gw;
  ri.prototype.set = Ww;
  function Yw(e, t) {
    for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
    return e;
  }
  var Xp = Wp(Object.getPrototypeOf, Object),
    Xw = "[object Object]",
    Zw = Function.prototype,
    Jw = Object.prototype,
    Zp = Zw.toString,
    Qw = Jw.hasOwnProperty,
    tE = Zp.call(Object);
  function eE(e) {
    if (!nr(e) || Xi(e) != Xw) return !1;
    var t = Xp(e);
    if (t === null) return !0;
    var n = Qw.call(t, "constructor") && t.constructor;
    return typeof n == "function" && n instanceof n && Zp.call(n) == tE;
  }
  function nE() {
    (this.__data__ = new ar()), (this.size = 0);
  }
  function rE(e) {
    var t = this.__data__,
      n = t.delete(e);
    return (this.size = t.size), n;
  }
  function iE(e) {
    return this.__data__.get(e);
  }
  function sE(e) {
    return this.__data__.has(e);
  }
  var oE = 200;
  function aE(e, t) {
    var n = this.__data__;
    if (n instanceof ar) {
      var r = n.__data__;
      if (!zs || r.length < oE - 1)
        return r.push([e, t]), (this.size = ++n.size), this;
      n = this.__data__ = new ri(r);
    }
    return n.set(e, t), (this.size = n.size), this;
  }
  function Rn(e) {
    var t = (this.__data__ = new ar(e));
    this.size = t.size;
  }
  Rn.prototype.clear = nE;
  Rn.prototype.delete = rE;
  Rn.prototype.get = iE;
  Rn.prototype.has = sE;
  Rn.prototype.set = aE;
  var Jp = typeof Ve == "object" && Ve && !Ve.nodeType && Ve,
    Wf = Jp && typeof Ke == "object" && Ke && !Ke.nodeType && Ke,
    lE = Wf && Wf.exports === Jp,
    Yf = lE ? Fn.Buffer : void 0,
    Xf = Yf ? Yf.allocUnsafe : void 0;
  function Qp(e, t) {
    if (t) return e.slice();
    var n = e.length,
      r = Xf ? Xf(n) : new e.constructor(n);
    return e.copy(r), r;
  }
  function cE(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length, i = 0, s = []; ++n < r; ) {
      var o = e[n];
      t(o, n, e) && (s[i++] = o);
    }
    return s;
  }
  function uE() {
    return [];
  }
  var fE = Object.prototype,
    dE = fE.propertyIsEnumerable,
    Zf = Object.getOwnPropertySymbols,
    hE = Zf
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              cE(Zf(e), function (t) {
                return dE.call(e, t);
              }));
        }
      : uE;
  function pE(e, t, n) {
    var r = t(e);
    return Jr(e) ? r : Yw(r, n(e));
  }
  function Ic(e) {
    return pE(e, ww, hE);
  }
  var kc = ni(Fn, "DataView"),
    Oc = ni(Fn, "Promise"),
    Lc = ni(Fn, "Set"),
    Jf = "[object Map]",
    mE = "[object Object]",
    Qf = "[object Promise]",
    td = "[object Set]",
    ed = "[object WeakMap]",
    nd = "[object DataView]",
    gE = ei(kc),
    bE = ei(zs),
    vE = ei(Oc),
    yE = ei(Lc),
    wE = ei(Cc),
    fn = Xi;
  ((kc && fn(new kc(new ArrayBuffer(1))) != nd) ||
    (zs && fn(new zs()) != Jf) ||
    (Oc && fn(Oc.resolve()) != Qf) ||
    (Lc && fn(new Lc()) != td) ||
    (Cc && fn(new Cc()) != ed)) &&
    (fn = function (e) {
      var t = Xi(e),
        n = t == mE ? e.constructor : void 0,
        r = n ? ei(n) : "";
      if (r)
        switch (r) {
          case gE:
            return nd;
          case bE:
            return Jf;
          case vE:
            return Qf;
          case yE:
            return td;
          case wE:
            return ed;
        }
      return t;
    });
  var EE = Object.prototype,
    SE = EE.hasOwnProperty;
  function xE(e) {
    var t = e.length,
      n = new e.constructor(t);
    return (
      t &&
        typeof e[0] == "string" &&
        SE.call(e, "index") &&
        ((n.index = e.index), (n.input = e.input)),
      n
    );
  }
  var ha = Fn.Uint8Array;
  function Tu(e) {
    var t = new e.constructor(e.byteLength);
    return new ha(t).set(new ha(e)), t;
  }
  function _E(e, t) {
    var n = Tu(e.buffer);
    return new e.constructor(n, e.byteOffset, e.byteLength);
  }
  var AE = /\w*$/;
  function TE(e) {
    var t = new e.constructor(e.source, AE.exec(e));
    return (t.lastIndex = e.lastIndex), t;
  }
  var rd = Ir ? Ir.prototype : void 0,
    id = rd ? rd.valueOf : void 0;
  function CE(e) {
    return id ? Object(id.call(e)) : {};
  }
  function tm(e, t) {
    var n = t ? Tu(e.buffer) : e.buffer;
    return new e.constructor(n, e.byteOffset, e.length);
  }
  var NE = "[object Boolean]",
    IE = "[object Date]",
    kE = "[object Map]",
    OE = "[object Number]",
    LE = "[object RegExp]",
    qE = "[object Set]",
    RE = "[object String]",
    DE = "[object Symbol]",
    ME = "[object ArrayBuffer]",
    PE = "[object DataView]",
    BE = "[object Float32Array]",
    FE = "[object Float64Array]",
    $E = "[object Int8Array]",
    jE = "[object Int16Array]",
    UE = "[object Int32Array]",
    HE = "[object Uint8Array]",
    zE = "[object Uint8ClampedArray]",
    VE = "[object Uint16Array]",
    KE = "[object Uint32Array]";
  function GE(e, t, n) {
    var r = e.constructor;
    switch (t) {
      case ME:
        return Tu(e);
      case NE:
      case IE:
        return new r(+e);
      case PE:
        return _E(e);
      case BE:
      case FE:
      case $E:
      case jE:
      case UE:
      case HE:
      case zE:
      case VE:
      case KE:
        return tm(e, n);
      case kE:
        return new r();
      case OE:
      case RE:
        return new r(e);
      case LE:
        return TE(e);
      case qE:
        return new r();
      case DE:
        return CE(e);
    }
  }
  function em(e) {
    return typeof e.constructor == "function" && !xu(e) ? hy(Xp(e)) : {};
  }
  var WE = "[object Map]";
  function YE(e) {
    return nr(e) && fn(e) == WE;
  }
  var sd = Hi && Hi.isMap,
    XE = sd ? _u(sd) : YE,
    ZE = "[object Set]";
  function JE(e) {
    return nr(e) && fn(e) == ZE;
  }
  var od = Hi && Hi.isSet,
    QE = od ? _u(od) : JE,
    tS = 1,
    nm = "[object Arguments]",
    eS = "[object Array]",
    nS = "[object Boolean]",
    rS = "[object Date]",
    iS = "[object Error]",
    rm = "[object Function]",
    sS = "[object GeneratorFunction]",
    oS = "[object Map]",
    aS = "[object Number]",
    im = "[object Object]",
    lS = "[object RegExp]",
    cS = "[object Set]",
    uS = "[object String]",
    fS = "[object Symbol]",
    dS = "[object WeakMap]",
    hS = "[object ArrayBuffer]",
    pS = "[object DataView]",
    mS = "[object Float32Array]",
    gS = "[object Float64Array]",
    bS = "[object Int8Array]",
    vS = "[object Int16Array]",
    yS = "[object Int32Array]",
    wS = "[object Uint8Array]",
    ES = "[object Uint8ClampedArray]",
    SS = "[object Uint16Array]",
    xS = "[object Uint32Array]",
    Bt = {};
  Bt[nm] =
    Bt[eS] =
    Bt[hS] =
    Bt[pS] =
    Bt[nS] =
    Bt[rS] =
    Bt[mS] =
    Bt[gS] =
    Bt[bS] =
    Bt[vS] =
    Bt[yS] =
    Bt[oS] =
    Bt[aS] =
    Bt[im] =
    Bt[lS] =
    Bt[cS] =
    Bt[uS] =
    Bt[fS] =
    Bt[wS] =
    Bt[ES] =
    Bt[SS] =
    Bt[xS] =
      !0;
  Bt[iS] = Bt[rm] = Bt[dS] = !1;
  function Ko(e, t, n, r, i, s) {
    var o,
      a = t & tS;
    if (o !== void 0) return o;
    if (!qr(e)) return e;
    var l = Jr(e);
    if (l) o = xE(e);
    else {
      var c = fn(e),
        f = c == rm || c == sS;
      if (Us(e)) return Qp(e, a);
      if (c == im || c == nm || (f && !i)) o = f ? {} : em(e);
      else {
        if (!Bt[c]) return i ? e : {};
        o = GE(e, c, a);
      }
    }
    s || (s = new Rn());
    var d = s.get(e);
    if (d) return d;
    s.set(e, o),
      QE(e)
        ? e.forEach(function (g) {
            o.add(Ko(g, t, n, g, e, s));
          })
        : XE(e) &&
          e.forEach(function (g, v) {
            o.set(v, Ko(g, t, n, v, e, s));
          });
    var h = Ic,
      p = l ? void 0 : h(e);
    return (
      xy(p || e, function (g, v) {
        p && ((v = g), (g = e[v])), Up(o, v, Ko(g, t, n, v, e, s));
      }),
      o
    );
  }
  var _S = 1,
    AS = 4;
  function Bi(e) {
    return Ko(e, _S | AS);
  }
  var TS = "__lodash_hash_undefined__";
  function CS(e) {
    return this.__data__.set(e, TS), this;
  }
  function NS(e) {
    return this.__data__.has(e);
  }
  function pa(e) {
    var t = -1,
      n = e == null ? 0 : e.length;
    for (this.__data__ = new ri(); ++t < n; ) this.add(e[t]);
  }
  pa.prototype.add = pa.prototype.push = CS;
  pa.prototype.has = NS;
  function IS(e, t) {
    for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
      if (t(e[n], n, e)) return !0;
    return !1;
  }
  function kS(e, t) {
    return e.has(t);
  }
  var OS = 1,
    LS = 2;
  function sm(e, t, n, r, i, s) {
    var o = n & OS,
      a = e.length,
      l = t.length;
    if (a != l && !(o && l > a)) return !1;
    var c = s.get(e),
      f = s.get(t);
    if (c && f) return c == t && f == e;
    var d = -1,
      h = !0,
      p = n & LS ? new pa() : void 0;
    for (s.set(e, t), s.set(t, e); ++d < a; ) {
      var g = e[d],
        v = t[d];
      if (r) var E = o ? r(v, g, d, t, e, s) : r(g, v, d, e, t, s);
      if (E !== void 0) {
        if (E) continue;
        h = !1;
        break;
      }
      if (p) {
        if (
          !IS(t, function (x, A) {
            if (!kS(p, A) && (g === x || i(g, x, n, r, s))) return p.push(A);
          })
        ) {
          h = !1;
          break;
        }
      } else if (!(g === v || i(g, v, n, r, s))) {
        h = !1;
        break;
      }
    }
    return s.delete(e), s.delete(t), h;
  }
  function qS(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r, i) {
        n[++t] = [i, r];
      }),
      n
    );
  }
  function RS(e) {
    var t = -1,
      n = Array(e.size);
    return (
      e.forEach(function (r) {
        n[++t] = r;
      }),
      n
    );
  }
  var DS = 1,
    MS = 2,
    PS = "[object Boolean]",
    BS = "[object Date]",
    FS = "[object Error]",
    $S = "[object Map]",
    jS = "[object Number]",
    US = "[object RegExp]",
    HS = "[object Set]",
    zS = "[object String]",
    VS = "[object Symbol]",
    KS = "[object ArrayBuffer]",
    GS = "[object DataView]",
    ad = Ir ? Ir.prototype : void 0,
    Xl = ad ? ad.valueOf : void 0;
  function WS(e, t, n, r, i, s, o) {
    switch (n) {
      case GS:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        (e = e.buffer), (t = t.buffer);
      case KS:
        return !(e.byteLength != t.byteLength || !s(new ha(e), new ha(t)));
      case PS:
      case BS:
      case jS:
        return ro(+e, +t);
      case FS:
        return e.name == t.name && e.message == t.message;
      case US:
      case zS:
        return e == t + "";
      case $S:
        var a = qS;
      case HS:
        var l = r & DS;
        if ((a || (a = RS), e.size != t.size && !l)) return !1;
        var c = o.get(e);
        if (c) return c == t;
        (r |= MS), o.set(e, t);
        var f = sm(a(e), a(t), r, i, s, o);
        return o.delete(e), f;
      case VS:
        if (Xl) return Xl.call(e) == Xl.call(t);
    }
    return !1;
  }
  var YS = 1,
    XS = Object.prototype,
    ZS = XS.hasOwnProperty;
  function JS(e, t, n, r, i, s) {
    var o = n & YS,
      a = Ic(e),
      l = a.length,
      c = Ic(t),
      f = c.length;
    if (l != f && !o) return !1;
    for (var d = l; d--; ) {
      var h = a[d];
      if (!(o ? h in t : ZS.call(t, h))) return !1;
    }
    var p = s.get(e),
      g = s.get(t);
    if (p && g) return p == t && g == e;
    var v = !0;
    s.set(e, t), s.set(t, e);
    for (var E = o; ++d < l; ) {
      h = a[d];
      var x = e[h],
        A = t[h];
      if (r) var T = o ? r(A, x, h, t, e, s) : r(x, A, h, e, t, s);
      if (!(T === void 0 ? x === A || i(x, A, n, r, s) : T)) {
        v = !1;
        break;
      }
      E || (E = h == "constructor");
    }
    if (v && !E) {
      var C = e.constructor,
        q = t.constructor;
      C != q &&
        "constructor" in e &&
        "constructor" in t &&
        !(
          typeof C == "function" &&
          C instanceof C &&
          typeof q == "function" &&
          q instanceof q
        ) &&
        (v = !1);
    }
    return s.delete(e), s.delete(t), v;
  }
  var QS = 1,
    ld = "[object Arguments]",
    cd = "[object Array]",
    ko = "[object Object]",
    tx = Object.prototype,
    ud = tx.hasOwnProperty;
  function ex(e, t, n, r, i, s) {
    var o = Jr(e),
      a = Jr(t),
      l = o ? cd : fn(e),
      c = a ? cd : fn(t);
    (l = l == ld ? ko : l), (c = c == ld ? ko : c);
    var f = l == ko,
      d = c == ko,
      h = l == c;
    if (h && Us(e)) {
      if (!Us(t)) return !1;
      (o = !0), (f = !1);
    }
    if (h && !f)
      return (
        s || (s = new Rn()),
        o || Au(e) ? sm(e, t, n, r, i, s) : WS(e, t, l, n, r, i, s)
      );
    if (!(n & QS)) {
      var p = f && ud.call(e, "__wrapped__"),
        g = d && ud.call(t, "__wrapped__");
      if (p || g) {
        var v = p ? e.value() : e,
          E = g ? t.value() : t;
        return s || (s = new Rn()), i(v, E, n, r, s);
      }
    }
    return h ? (s || (s = new Rn()), JS(e, t, n, r, i, s)) : !1;
  }
  function om(e, t, n, r, i) {
    return e === t
      ? !0
      : e == null || t == null || (!nr(e) && !nr(t))
      ? e !== e && t !== t
      : ex(e, t, n, r, om, i);
  }
  function nx(e) {
    return function (t, n, r) {
      for (var i = -1, s = Object(t), o = r(t), a = o.length; a--; ) {
        var l = o[++i];
        if (n(s[l], l, s) === !1) break;
      }
      return t;
    };
  }
  var rx = nx();
  function qc(e, t, n) {
    ((n !== void 0 && !ro(e[t], n)) || (n === void 0 && !(t in e))) &&
      Su(e, t, n);
  }
  function ix(e) {
    return nr(e) && qa(e);
  }
  function Rc(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
      return e[t];
  }
  function sx(e) {
    return Ny(e, Yp(e));
  }
  function ox(e, t, n, r, i, s, o) {
    var a = Rc(e, n),
      l = Rc(t, n),
      c = o.get(l);
    if (c) {
      qc(e, n, c);
      return;
    }
    var f = s ? s(a, l, n + "", e, t, o) : void 0,
      d = f === void 0;
    if (d) {
      var h = Jr(l),
        p = !h && Us(l),
        g = !h && !p && Au(l);
      (f = l),
        h || p || g
          ? Jr(a)
            ? (f = a)
            : ix(a)
            ? (f = my(a))
            : p
            ? ((d = !1), (f = Qp(l, !0)))
            : g
            ? ((d = !1), (f = tm(l, !0)))
            : (f = [])
          : eE(l) || Nc(l)
          ? ((f = a), Nc(a) ? (f = sx(a)) : (!qr(a) || Eu(a)) && (f = em(l)))
          : (d = !1);
    }
    d && (o.set(l, f), i(f, l, r, s, o), o.delete(l)), qc(e, n, f);
  }
  function am(e, t, n, r, i) {
    e !== t &&
      rx(
        t,
        function (s, o) {
          if ((i || (i = new Rn()), qr(s))) ox(e, t, o, n, am, r, i);
          else {
            var a = r ? r(Rc(e, o), s, o + "", e, t, i) : void 0;
            a === void 0 && (a = s), qc(e, o, a);
          }
        },
        Yp
      );
  }
  function Cu(e, t) {
    return om(e, t);
  }
  var Nr = qy(function (e, t, n) {
      am(e, t, n);
    }),
    tt = ((e) => (
      (e[(e.TYPE = 3)] = "TYPE"),
      (e[(e.LEVEL = 12)] = "LEVEL"),
      (e[(e.ATTRIBUTE = 13)] = "ATTRIBUTE"),
      (e[(e.BLOT = 14)] = "BLOT"),
      (e[(e.INLINE = 7)] = "INLINE"),
      (e[(e.BLOCK = 11)] = "BLOCK"),
      (e[(e.BLOCK_BLOT = 10)] = "BLOCK_BLOT"),
      (e[(e.INLINE_BLOT = 6)] = "INLINE_BLOT"),
      (e[(e.BLOCK_ATTRIBUTE = 9)] = "BLOCK_ATTRIBUTE"),
      (e[(e.INLINE_ATTRIBUTE = 5)] = "INLINE_ATTRIBUTE"),
      (e[(e.ANY = 15)] = "ANY"),
      e
    ))(tt || {});
  class Pn {
    constructor(t, n, r = {}) {
      (this.attrName = t), (this.keyName = n);
      const i = tt.TYPE & tt.ATTRIBUTE;
      (this.scope = r.scope != null ? (r.scope & tt.LEVEL) | i : tt.ATTRIBUTE),
        r.whitelist != null && (this.whitelist = r.whitelist);
    }
    static keys(t) {
      return Array.from(t.attributes).map((n) => n.name);
    }
    add(t, n) {
      return this.canAdd(t, n) ? (t.setAttribute(this.keyName, n), !0) : !1;
    }
    canAdd(t, n) {
      return this.whitelist == null
        ? !0
        : typeof n == "string"
        ? this.whitelist.indexOf(n.replace(/["']/g, "")) > -1
        : this.whitelist.indexOf(n) > -1;
    }
    remove(t) {
      t.removeAttribute(this.keyName);
    }
    value(t) {
      const n = t.getAttribute(this.keyName);
      return this.canAdd(t, n) && n ? n : "";
    }
  }
  class Fi extends Error {
    constructor(t) {
      (t = "[Parchment] " + t),
        super(t),
        (this.message = t),
        (this.name = this.constructor.name);
    }
  }
  const lm = class Dc {
    constructor() {
      (this.attributes = {}),
        (this.classes = {}),
        (this.tags = {}),
        (this.types = {});
    }
    static find(t, n = !1) {
      if (t == null) return null;
      if (this.blots.has(t)) return this.blots.get(t) || null;
      if (n) {
        let r = null;
        try {
          r = t.parentNode;
        } catch {
          return null;
        }
        return this.find(r, n);
      }
      return null;
    }
    create(t, n, r) {
      const i = this.query(n);
      if (i == null) throw new Fi(`Unable to create ${n} blot`);
      const s = i,
        o =
          n instanceof Node || n.nodeType === Node.TEXT_NODE ? n : s.create(r),
        a = new s(t, o, r);
      return Dc.blots.set(a.domNode, a), a;
    }
    find(t, n = !1) {
      return Dc.find(t, n);
    }
    query(t, n = tt.ANY) {
      let r;
      return (
        typeof t == "string"
          ? (r = this.types[t] || this.attributes[t])
          : t instanceof Text || t.nodeType === Node.TEXT_NODE
          ? (r = this.types.text)
          : typeof t == "number"
          ? t & tt.LEVEL & tt.BLOCK
            ? (r = this.types.block)
            : t & tt.LEVEL & tt.INLINE && (r = this.types.inline)
          : t instanceof Element &&
            ((t.getAttribute("class") || "")
              .split(/\s+/)
              .some((i) => ((r = this.classes[i]), !!r)),
            (r = r || this.tags[t.tagName])),
        r == null
          ? null
          : "scope" in r && n & tt.LEVEL & r.scope && n & tt.TYPE & r.scope
          ? r
          : null
      );
    }
    register(...t) {
      return t.map((n) => {
        const r = "blotName" in n,
          i = "attrName" in n;
        if (!r && !i) throw new Fi("Invalid definition");
        if (r && n.blotName === "abstract")
          throw new Fi("Cannot register abstract class");
        const s = r ? n.blotName : i ? n.attrName : void 0;
        return (
          (this.types[s] = n),
          i
            ? typeof n.keyName == "string" && (this.attributes[n.keyName] = n)
            : r &&
              (n.className && (this.classes[n.className] = n),
              n.tagName &&
                (Array.isArray(n.tagName)
                  ? (n.tagName = n.tagName.map((o) => o.toUpperCase()))
                  : (n.tagName = n.tagName.toUpperCase()),
                (Array.isArray(n.tagName) ? n.tagName : [n.tagName]).forEach(
                  (o) => {
                    (this.tags[o] == null || n.className == null) &&
                      (this.tags[o] = n);
                  }
                ))),
          n
        );
      });
    }
  };
  lm.blots = new WeakMap();
  let zi = lm;
  function fd(e, t) {
    return (e.getAttribute("class") || "")
      .split(/\s+/)
      .filter((n) => n.indexOf(`${t}-`) === 0);
  }
  class ax extends Pn {
    static keys(t) {
      return (t.getAttribute("class") || "")
        .split(/\s+/)
        .map((n) => n.split("-").slice(0, -1).join("-"));
    }
    add(t, n) {
      return this.canAdd(t, n)
        ? (this.remove(t), t.classList.add(`${this.keyName}-${n}`), !0)
        : !1;
    }
    remove(t) {
      fd(t, this.keyName).forEach((n) => {
        t.classList.remove(n);
      }),
        t.classList.length === 0 && t.removeAttribute("class");
    }
    value(t) {
      const n = (fd(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
      return this.canAdd(t, n) ? n : "";
    }
  }
  const En = ax;
  function Zl(e) {
    const t = e.split("-"),
      n = t
        .slice(1)
        .map((r) => r[0].toUpperCase() + r.slice(1))
        .join("");
    return t[0] + n;
  }
  class lx extends Pn {
    static keys(t) {
      return (t.getAttribute("style") || "")
        .split(";")
        .map((n) => n.split(":")[0].trim());
    }
    add(t, n) {
      return this.canAdd(t, n) ? ((t.style[Zl(this.keyName)] = n), !0) : !1;
    }
    remove(t) {
      (t.style[Zl(this.keyName)] = ""),
        t.getAttribute("style") || t.removeAttribute("style");
    }
    value(t) {
      const n = t.style[Zl(this.keyName)];
      return this.canAdd(t, n) ? n : "";
    }
  }
  const Rr = lx;
  class cx {
    constructor(t) {
      (this.attributes = {}), (this.domNode = t), this.build();
    }
    attribute(t, n) {
      n
        ? t.add(this.domNode, n) &&
          (t.value(this.domNode) != null
            ? (this.attributes[t.attrName] = t)
            : delete this.attributes[t.attrName])
        : (t.remove(this.domNode), delete this.attributes[t.attrName]);
    }
    build() {
      this.attributes = {};
      const t = zi.find(this.domNode);
      if (t == null) return;
      const n = Pn.keys(this.domNode),
        r = En.keys(this.domNode),
        i = Rr.keys(this.domNode);
      n.concat(r)
        .concat(i)
        .forEach((s) => {
          const o = t.scroll.query(s, tt.ATTRIBUTE);
          o instanceof Pn && (this.attributes[o.attrName] = o);
        });
    }
    copy(t) {
      Object.keys(this.attributes).forEach((n) => {
        const r = this.attributes[n].value(this.domNode);
        t.format(n, r);
      });
    }
    move(t) {
      this.copy(t),
        Object.keys(this.attributes).forEach((n) => {
          this.attributes[n].remove(this.domNode);
        }),
        (this.attributes = {});
    }
    values() {
      return Object.keys(this.attributes).reduce(
        (t, n) => ((t[n] = this.attributes[n].value(this.domNode)), t),
        {}
      );
    }
  }
  const Ma = cx,
    cm = class {
      constructor(t, n) {
        (this.scroll = t),
          (this.domNode = n),
          zi.blots.set(n, this),
          (this.prev = null),
          (this.next = null);
      }
      static create(t) {
        if (this.tagName == null)
          throw new Fi("Blot definition missing tagName");
        let n, r;
        return (
          Array.isArray(this.tagName)
            ? (typeof t == "string"
                ? ((r = t.toUpperCase()),
                  parseInt(r, 10).toString() === r && (r = parseInt(r, 10)))
                : typeof t == "number" && (r = t),
              typeof r == "number"
                ? (n = document.createElement(this.tagName[r - 1]))
                : r && this.tagName.indexOf(r) > -1
                ? (n = document.createElement(r))
                : (n = document.createElement(this.tagName[0])))
            : (n = document.createElement(this.tagName)),
          this.className && n.classList.add(this.className),
          n
        );
      }
      get statics() {
        return this.constructor;
      }
      attach() {}
      clone() {
        const t = this.domNode.cloneNode(!1);
        return this.scroll.create(t);
      }
      detach() {
        this.parent != null && this.parent.removeChild(this),
          zi.blots.delete(this.domNode);
      }
      deleteAt(t, n) {
        this.isolate(t, n).remove();
      }
      formatAt(t, n, r, i) {
        const s = this.isolate(t, n);
        if (this.scroll.query(r, tt.BLOT) != null && i) s.wrap(r, i);
        else if (this.scroll.query(r, tt.ATTRIBUTE) != null) {
          const o = this.scroll.create(this.statics.scope);
          s.wrap(o), o.format(r, i);
        }
      }
      insertAt(t, n, r) {
        const i =
            r == null
              ? this.scroll.create("text", n)
              : this.scroll.create(n, r),
          s = this.split(t);
        this.parent.insertBefore(i, s || void 0);
      }
      isolate(t, n) {
        const r = this.split(t);
        if (r == null) throw new Error("Attempt to isolate at end");
        return r.split(n), r;
      }
      length() {
        return 1;
      }
      offset(t = this.parent) {
        return this.parent == null || this === t
          ? 0
          : this.parent.children.offset(this) + this.parent.offset(t);
      }
      optimize(t) {
        this.statics.requiredContainer &&
          !(this.parent instanceof this.statics.requiredContainer) &&
          this.wrap(this.statics.requiredContainer.blotName);
      }
      remove() {
        this.domNode.parentNode != null &&
          this.domNode.parentNode.removeChild(this.domNode),
          this.detach();
      }
      replaceWith(t, n) {
        const r = typeof t == "string" ? this.scroll.create(t, n) : t;
        return (
          this.parent != null &&
            (this.parent.insertBefore(r, this.next || void 0), this.remove()),
          r
        );
      }
      split(t, n) {
        return t === 0 ? this : this.next;
      }
      update(t, n) {}
      wrap(t, n) {
        const r = typeof t == "string" ? this.scroll.create(t, n) : t;
        if (
          (this.parent != null &&
            this.parent.insertBefore(r, this.next || void 0),
          typeof r.appendChild != "function")
        )
          throw new Fi(`Cannot wrap ${t}`);
        return r.appendChild(this), r;
      }
    };
  cm.blotName = "abstract";
  let um = cm;
  const fm = class extends um {
    static value(t) {
      return !0;
    }
    index(t, n) {
      return this.domNode === t ||
        this.domNode.compareDocumentPosition(t) &
          Node.DOCUMENT_POSITION_CONTAINED_BY
        ? Math.min(n, 1)
        : -1;
    }
    position(t, n) {
      let r = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
      return t > 0 && (r += 1), [this.parent.domNode, r];
    }
    value() {
      return {
        [this.statics.blotName]: this.statics.value(this.domNode) || !0,
      };
    }
  };
  fm.scope = tt.INLINE_BLOT;
  let ux = fm;
  const ye = ux;
  class fx {
    constructor() {
      (this.head = null), (this.tail = null), (this.length = 0);
    }
    append(...t) {
      if ((this.insertBefore(t[0], null), t.length > 1)) {
        const n = t.slice(1);
        this.append(...n);
      }
    }
    at(t) {
      const n = this.iterator();
      let r = n();
      for (; r && t > 0; ) (t -= 1), (r = n());
      return r;
    }
    contains(t) {
      const n = this.iterator();
      let r = n();
      for (; r; ) {
        if (r === t) return !0;
        r = n();
      }
      return !1;
    }
    indexOf(t) {
      const n = this.iterator();
      let r = n(),
        i = 0;
      for (; r; ) {
        if (r === t) return i;
        (i += 1), (r = n());
      }
      return -1;
    }
    insertBefore(t, n) {
      t != null &&
        (this.remove(t),
        (t.next = n),
        n != null
          ? ((t.prev = n.prev),
            n.prev != null && (n.prev.next = t),
            (n.prev = t),
            n === this.head && (this.head = t))
          : this.tail != null
          ? ((this.tail.next = t), (t.prev = this.tail), (this.tail = t))
          : ((t.prev = null), (this.head = this.tail = t)),
        (this.length += 1));
    }
    offset(t) {
      let n = 0,
        r = this.head;
      for (; r != null; ) {
        if (r === t) return n;
        (n += r.length()), (r = r.next);
      }
      return -1;
    }
    remove(t) {
      this.contains(t) &&
        (t.prev != null && (t.prev.next = t.next),
        t.next != null && (t.next.prev = t.prev),
        t === this.head && (this.head = t.next),
        t === this.tail && (this.tail = t.prev),
        (this.length -= 1));
    }
    iterator(t = this.head) {
      return () => {
        const n = t;
        return t != null && (t = t.next), n;
      };
    }
    find(t, n = !1) {
      const r = this.iterator();
      let i = r();
      for (; i; ) {
        const s = i.length();
        if (
          t < s ||
          (n && t === s && (i.next == null || i.next.length() !== 0))
        )
          return [i, t];
        (t -= s), (i = r());
      }
      return [null, 0];
    }
    forEach(t) {
      const n = this.iterator();
      let r = n();
      for (; r; ) t(r), (r = n());
    }
    forEachAt(t, n, r) {
      if (n <= 0) return;
      const [i, s] = this.find(t);
      let o = t - s;
      const a = this.iterator(i);
      let l = a();
      for (; l && o < t + n; ) {
        const c = l.length();
        t > o
          ? r(l, t - o, Math.min(n, o + c - t))
          : r(l, 0, Math.min(c, t + n - o)),
          (o += c),
          (l = a());
      }
    }
    map(t) {
      return this.reduce((n, r) => (n.push(t(r)), n), []);
    }
    reduce(t, n) {
      const r = this.iterator();
      let i = r();
      for (; i; ) (n = t(n, i)), (i = r());
      return n;
    }
  }
  function dd(e, t) {
    const n = t.find(e);
    if (n) return n;
    try {
      return t.create(e);
    } catch {
      const r = t.create(tt.INLINE);
      return (
        Array.from(e.childNodes).forEach((i) => {
          r.domNode.appendChild(i);
        }),
        e.parentNode && e.parentNode.replaceChild(r.domNode, e),
        r.attach(),
        r
      );
    }
  }
  const dm = class mr extends um {
    constructor(t, n) {
      super(t, n), (this.uiNode = null), this.build();
    }
    appendChild(t) {
      this.insertBefore(t);
    }
    attach() {
      super.attach(),
        this.children.forEach((t) => {
          t.attach();
        });
    }
    attachUI(t) {
      this.uiNode != null && this.uiNode.remove(),
        (this.uiNode = t),
        mr.uiClass && this.uiNode.classList.add(mr.uiClass),
        this.uiNode.setAttribute("contenteditable", "false"),
        this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
    }
    build() {
      (this.children = new fx()),
        Array.from(this.domNode.childNodes)
          .filter((t) => t !== this.uiNode)
          .reverse()
          .forEach((t) => {
            try {
              const n = dd(t, this.scroll);
              this.insertBefore(n, this.children.head || void 0);
            } catch (n) {
              if (n instanceof Fi) return;
              throw n;
            }
          });
    }
    deleteAt(t, n) {
      if (t === 0 && n === this.length()) return this.remove();
      this.children.forEachAt(t, n, (r, i, s) => {
        r.deleteAt(i, s);
      });
    }
    descendant(t, n = 0) {
      const [r, i] = this.children.find(n);
      return (t.blotName == null && t(r)) ||
        (t.blotName != null && r instanceof t)
        ? [r, i]
        : r instanceof mr
        ? r.descendant(t, i)
        : [null, -1];
    }
    descendants(t, n = 0, r = Number.MAX_VALUE) {
      let i = [],
        s = r;
      return (
        this.children.forEachAt(n, r, (o, a, l) => {
          ((t.blotName == null && t(o)) ||
            (t.blotName != null && o instanceof t)) &&
            i.push(o),
            o instanceof mr && (i = i.concat(o.descendants(t, a, s))),
            (s -= l);
        }),
        i
      );
    }
    detach() {
      this.children.forEach((t) => {
        t.detach();
      }),
        super.detach();
    }
    enforceAllowedChildren() {
      let t = !1;
      this.children.forEach((n) => {
        t ||
          this.statics.allowedChildren.some((r) => n instanceof r) ||
          (n.statics.scope === tt.BLOCK_BLOT
            ? (n.next != null && this.splitAfter(n),
              n.prev != null && this.splitAfter(n.prev),
              n.parent.unwrap(),
              (t = !0))
            : n instanceof mr
            ? n.unwrap()
            : n.remove());
      });
    }
    formatAt(t, n, r, i) {
      this.children.forEachAt(t, n, (s, o, a) => {
        s.formatAt(o, a, r, i);
      });
    }
    insertAt(t, n, r) {
      const [i, s] = this.children.find(t);
      if (i) i.insertAt(s, n, r);
      else {
        const o =
          r == null ? this.scroll.create("text", n) : this.scroll.create(n, r);
        this.appendChild(o);
      }
    }
    insertBefore(t, n) {
      t.parent != null && t.parent.children.remove(t);
      let r = null;
      this.children.insertBefore(t, n || null),
        (t.parent = this),
        n != null && (r = n.domNode),
        (this.domNode.parentNode !== t.domNode ||
          this.domNode.nextSibling !== r) &&
          this.domNode.insertBefore(t.domNode, r),
        t.attach();
    }
    length() {
      return this.children.reduce((t, n) => t + n.length(), 0);
    }
    moveChildren(t, n) {
      this.children.forEach((r) => {
        t.insertBefore(r, n);
      });
    }
    optimize(t) {
      if (
        (super.optimize(t),
        this.enforceAllowedChildren(),
        this.uiNode != null &&
          this.uiNode !== this.domNode.firstChild &&
          this.domNode.insertBefore(this.uiNode, this.domNode.firstChild),
        this.children.length === 0)
      )
        if (this.statics.defaultChild != null) {
          const n = this.scroll.create(this.statics.defaultChild.blotName);
          this.appendChild(n);
        } else this.remove();
    }
    path(t, n = !1) {
      const [r, i] = this.children.find(t, n),
        s = [[this, t]];
      return r instanceof mr
        ? s.concat(r.path(i, n))
        : (r != null && s.push([r, i]), s);
    }
    removeChild(t) {
      this.children.remove(t);
    }
    replaceWith(t, n) {
      const r = typeof t == "string" ? this.scroll.create(t, n) : t;
      return r instanceof mr && this.moveChildren(r), super.replaceWith(r);
    }
    split(t, n = !1) {
      if (!n) {
        if (t === 0) return this;
        if (t === this.length()) return this.next;
      }
      const r = this.clone();
      return (
        this.parent && this.parent.insertBefore(r, this.next || void 0),
        this.children.forEachAt(t, this.length(), (i, s, o) => {
          const a = i.split(s, n);
          a != null && r.appendChild(a);
        }),
        r
      );
    }
    splitAfter(t) {
      const n = this.clone();
      for (; t.next != null; ) n.appendChild(t.next);
      return this.parent && this.parent.insertBefore(n, this.next || void 0), n;
    }
    unwrap() {
      this.parent && this.moveChildren(this.parent, this.next || void 0),
        this.remove();
    }
    update(t, n) {
      const r = [],
        i = [];
      t.forEach((s) => {
        s.target === this.domNode &&
          s.type === "childList" &&
          (r.push(...s.addedNodes), i.push(...s.removedNodes));
      }),
        i.forEach((s) => {
          if (
            s.parentNode != null &&
            s.tagName !== "IFRAME" &&
            document.body.compareDocumentPosition(s) &
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            return;
          const o = this.scroll.find(s);
          o != null &&
            (o.domNode.parentNode == null ||
              o.domNode.parentNode === this.domNode) &&
            o.detach();
        }),
        r
          .filter((s) => s.parentNode === this.domNode && s !== this.uiNode)
          .sort((s, o) =>
            s === o
              ? 0
              : s.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING
              ? 1
              : -1
          )
          .forEach((s) => {
            let o = null;
            s.nextSibling != null && (o = this.scroll.find(s.nextSibling));
            const a = dd(s, this.scroll);
            (a.next !== o || a.next == null) &&
              (a.parent != null && a.parent.removeChild(this),
              this.insertBefore(a, o || void 0));
          }),
        this.enforceAllowedChildren();
    }
  };
  dm.uiClass = "";
  let dx = dm;
  const gn = dx;
  function hx(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (e[n] !== t[n]) return !1;
    return !0;
  }
  const wi = class Ei extends gn {
    static create(t) {
      return super.create(t);
    }
    static formats(t, n) {
      const r = n.query(Ei.blotName);
      if (!(r != null && t.tagName === r.tagName)) {
        if (typeof this.tagName == "string") return !0;
        if (Array.isArray(this.tagName)) return t.tagName.toLowerCase();
      }
    }
    constructor(t, n) {
      super(t, n), (this.attributes = new Ma(this.domNode));
    }
    format(t, n) {
      if (t === this.statics.blotName && !n)
        this.children.forEach((r) => {
          r instanceof Ei || (r = r.wrap(Ei.blotName, !0)),
            this.attributes.copy(r);
        }),
          this.unwrap();
      else {
        const r = this.scroll.query(t, tt.INLINE);
        if (r == null) return;
        r instanceof Pn
          ? this.attributes.attribute(r, n)
          : n &&
            (t !== this.statics.blotName || this.formats()[t] !== n) &&
            this.replaceWith(t, n);
      }
    }
    formats() {
      const t = this.attributes.values(),
        n = this.statics.formats(this.domNode, this.scroll);
      return n != null && (t[this.statics.blotName] = n), t;
    }
    formatAt(t, n, r, i) {
      this.formats()[r] != null || this.scroll.query(r, tt.ATTRIBUTE)
        ? this.isolate(t, n).format(r, i)
        : super.formatAt(t, n, r, i);
    }
    optimize(t) {
      super.optimize(t);
      const n = this.formats();
      if (Object.keys(n).length === 0) return this.unwrap();
      const r = this.next;
      r instanceof Ei &&
        r.prev === this &&
        hx(n, r.formats()) &&
        (r.moveChildren(this), r.remove());
    }
    replaceWith(t, n) {
      const r = super.replaceWith(t, n);
      return this.attributes.copy(r), r;
    }
    update(t, n) {
      super.update(t, n),
        t.some((r) => r.target === this.domNode && r.type === "attributes") &&
          this.attributes.build();
    }
    wrap(t, n) {
      const r = super.wrap(t, n);
      return r instanceof Ei && this.attributes.move(r), r;
    }
  };
  (wi.allowedChildren = [wi, ye]),
    (wi.blotName = "inline"),
    (wi.scope = tt.INLINE_BLOT),
    (wi.tagName = "SPAN");
  let px = wi;
  const Nu = px,
    Si = class Mc extends gn {
      static create(t) {
        return super.create(t);
      }
      static formats(t, n) {
        const r = n.query(Mc.blotName);
        if (!(r != null && t.tagName === r.tagName)) {
          if (typeof this.tagName == "string") return !0;
          if (Array.isArray(this.tagName)) return t.tagName.toLowerCase();
        }
      }
      constructor(t, n) {
        super(t, n), (this.attributes = new Ma(this.domNode));
      }
      format(t, n) {
        const r = this.scroll.query(t, tt.BLOCK);
        r != null &&
          (r instanceof Pn
            ? this.attributes.attribute(r, n)
            : t === this.statics.blotName && !n
            ? this.replaceWith(Mc.blotName)
            : n &&
              (t !== this.statics.blotName || this.formats()[t] !== n) &&
              this.replaceWith(t, n));
      }
      formats() {
        const t = this.attributes.values(),
          n = this.statics.formats(this.domNode, this.scroll);
        return n != null && (t[this.statics.blotName] = n), t;
      }
      formatAt(t, n, r, i) {
        this.scroll.query(r, tt.BLOCK) != null
          ? this.format(r, i)
          : super.formatAt(t, n, r, i);
      }
      insertAt(t, n, r) {
        if (r == null || this.scroll.query(n, tt.INLINE) != null)
          super.insertAt(t, n, r);
        else {
          const i = this.split(t);
          if (i != null) {
            const s = this.scroll.create(n, r);
            i.parent.insertBefore(s, i);
          } else throw new Error("Attempt to insertAt after block boundaries");
        }
      }
      replaceWith(t, n) {
        const r = super.replaceWith(t, n);
        return this.attributes.copy(r), r;
      }
      update(t, n) {
        super.update(t, n),
          t.some((r) => r.target === this.domNode && r.type === "attributes") &&
            this.attributes.build();
      }
    };
  (Si.blotName = "block"),
    (Si.scope = tt.BLOCK_BLOT),
    (Si.tagName = "P"),
    (Si.allowedChildren = [Nu, Si, ye]);
  let mx = Si;
  const Vs = mx,
    Pc = class extends gn {
      checkMerge() {
        return (
          this.next !== null &&
          this.next.statics.blotName === this.statics.blotName
        );
      }
      deleteAt(t, n) {
        super.deleteAt(t, n), this.enforceAllowedChildren();
      }
      formatAt(t, n, r, i) {
        super.formatAt(t, n, r, i), this.enforceAllowedChildren();
      }
      insertAt(t, n, r) {
        super.insertAt(t, n, r), this.enforceAllowedChildren();
      }
      optimize(t) {
        super.optimize(t),
          this.children.length > 0 &&
            this.next != null &&
            this.checkMerge() &&
            (this.next.moveChildren(this), this.next.remove());
      }
    };
  (Pc.blotName = "container"), (Pc.scope = tt.BLOCK_BLOT);
  let gx = Pc;
  const Pa = gx;
  class bx extends ye {
    static formats(t, n) {}
    format(t, n) {
      super.formatAt(0, this.length(), t, n);
    }
    formatAt(t, n, r, i) {
      t === 0 && n === this.length()
        ? this.format(r, i)
        : super.formatAt(t, n, r, i);
    }
    formats() {
      return this.statics.formats(this.domNode, this.scroll);
    }
  }
  const Ge = bx,
    vx = {
      attributes: !0,
      characterData: !0,
      characterDataOldValue: !0,
      childList: !0,
      subtree: !0,
    },
    yx = 100,
    xi = class extends gn {
      constructor(t, n) {
        super(null, n),
          (this.registry = t),
          (this.scroll = this),
          this.build(),
          (this.observer = new MutationObserver((r) => {
            this.update(r);
          })),
          this.observer.observe(this.domNode, vx),
          this.attach();
      }
      create(t, n) {
        return this.registry.create(this, t, n);
      }
      find(t, n = !1) {
        const r = this.registry.find(t, n);
        return r
          ? r.scroll === this
            ? r
            : n
            ? this.find(r.scroll.domNode.parentNode, !0)
            : null
          : null;
      }
      query(t, n = tt.ANY) {
        return this.registry.query(t, n);
      }
      register(...t) {
        return this.registry.register(...t);
      }
      build() {
        this.scroll != null && super.build();
      }
      detach() {
        super.detach(), this.observer.disconnect();
      }
      deleteAt(t, n) {
        this.update(),
          t === 0 && n === this.length()
            ? this.children.forEach((r) => {
                r.remove();
              })
            : super.deleteAt(t, n);
      }
      formatAt(t, n, r, i) {
        this.update(), super.formatAt(t, n, r, i);
      }
      insertAt(t, n, r) {
        this.update(), super.insertAt(t, n, r);
      }
      optimize(t = [], n = {}) {
        super.optimize(n);
        const r = n.mutationsMap || new WeakMap();
        let i = Array.from(this.observer.takeRecords());
        for (; i.length > 0; ) t.push(i.pop());
        const s = (l, c = !0) => {
            l == null ||
              l === this ||
              (l.domNode.parentNode != null &&
                (r.has(l.domNode) || r.set(l.domNode, []), c && s(l.parent)));
          },
          o = (l) => {
            r.has(l.domNode) &&
              (l instanceof gn && l.children.forEach(o),
              r.delete(l.domNode),
              l.optimize(n));
          };
        let a = t;
        for (let l = 0; a.length > 0; l += 1) {
          if (l >= yx)
            throw new Error("[Parchment] Maximum optimize iterations reached");
          for (
            a.forEach((c) => {
              const f = this.find(c.target, !0);
              f != null &&
                (f.domNode === c.target &&
                  (c.type === "childList"
                    ? (s(this.find(c.previousSibling, !1)),
                      Array.from(c.addedNodes).forEach((d) => {
                        const h = this.find(d, !1);
                        s(h, !1),
                          h instanceof gn &&
                            h.children.forEach((p) => {
                              s(p, !1);
                            });
                      }))
                    : c.type === "attributes" && s(f.prev)),
                s(f));
            }),
              this.children.forEach(o),
              a = Array.from(this.observer.takeRecords()),
              i = a.slice();
            i.length > 0;

          )
            t.push(i.pop());
        }
      }
      update(t, n = {}) {
        t = t || this.observer.takeRecords();
        const r = new WeakMap();
        t
          .map((i) => {
            const s = this.find(i.target, !0);
            return s == null
              ? null
              : r.has(s.domNode)
              ? (r.get(s.domNode).push(i), null)
              : (r.set(s.domNode, [i]), s);
          })
          .forEach((i) => {
            i != null &&
              i !== this &&
              r.has(i.domNode) &&
              i.update(r.get(i.domNode) || [], n);
          }),
          (n.mutationsMap = r),
          r.has(this.domNode) && super.update(r.get(this.domNode), n),
          this.optimize(t, n);
      }
    };
  (xi.blotName = "scroll"),
    (xi.defaultChild = Vs),
    (xi.allowedChildren = [Vs, Pa]),
    (xi.scope = tt.BLOCK_BLOT),
    (xi.tagName = "DIV");
  let wx = xi;
  const Iu = wx,
    Bc = class hm extends ye {
      static create(t) {
        return document.createTextNode(t);
      }
      static value(t) {
        return t.data;
      }
      constructor(t, n) {
        super(t, n), (this.text = this.statics.value(this.domNode));
      }
      deleteAt(t, n) {
        this.domNode.data = this.text =
          this.text.slice(0, t) + this.text.slice(t + n);
      }
      index(t, n) {
        return this.domNode === t ? n : -1;
      }
      insertAt(t, n, r) {
        r == null
          ? ((this.text = this.text.slice(0, t) + n + this.text.slice(t)),
            (this.domNode.data = this.text))
          : super.insertAt(t, n, r);
      }
      length() {
        return this.text.length;
      }
      optimize(t) {
        super.optimize(t),
          (this.text = this.statics.value(this.domNode)),
          this.text.length === 0
            ? this.remove()
            : this.next instanceof hm &&
              this.next.prev === this &&
              (this.insertAt(this.length(), this.next.value()),
              this.next.remove());
      }
      position(t, n = !1) {
        return [this.domNode, t];
      }
      split(t, n = !1) {
        if (!n) {
          if (t === 0) return this;
          if (t === this.length()) return this.next;
        }
        const r = this.scroll.create(this.domNode.splitText(t));
        return (
          this.parent.insertBefore(r, this.next || void 0),
          (this.text = this.statics.value(this.domNode)),
          r
        );
      }
      update(t, n) {
        t.some(
          (r) => r.type === "characterData" && r.target === this.domNode
        ) && (this.text = this.statics.value(this.domNode));
      }
      value() {
        return this.text;
      }
    };
  (Bc.blotName = "text"), (Bc.scope = tt.INLINE_BLOT);
  let Ex = Bc;
  const ma = Ex,
    Sx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          Attributor: Pn,
          AttributorStore: Ma,
          BlockBlot: Vs,
          ClassAttributor: En,
          ContainerBlot: Pa,
          EmbedBlot: Ge,
          InlineBlot: Nu,
          LeafBlot: ye,
          ParentBlot: gn,
          Registry: zi,
          Scope: tt,
          ScrollBlot: Iu,
          StyleAttributor: Rr,
          TextBlot: ma,
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    );
  var _r =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};
  function pm(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var Fc = { exports: {} },
    ze = -1,
    Le = 1,
    ne = 0;
  function Ks(e, t, n, r, i) {
    if (e === t) return e ? [[ne, e]] : [];
    if (n != null) {
      var s = Ox(e, t, n);
      if (s) return s;
    }
    var o = ku(e, t),
      a = e.substring(0, o);
    (e = e.substring(o)), (t = t.substring(o)), (o = Ba(e, t));
    var l = e.substring(e.length - o);
    (e = e.substring(0, e.length - o)), (t = t.substring(0, t.length - o));
    var c = xx(e, t);
    return (
      a && c.unshift([ne, a]), l && c.push([ne, l]), Ou(c, i), r && Tx(c), c
    );
  }
  function xx(e, t) {
    var n;
    if (!e) return [[Le, t]];
    if (!t) return [[ze, e]];
    var r = e.length > t.length ? e : t,
      i = e.length > t.length ? t : e,
      s = r.indexOf(i);
    if (s !== -1)
      return (
        (n = [
          [Le, r.substring(0, s)],
          [ne, i],
          [Le, r.substring(s + i.length)],
        ]),
        e.length > t.length && (n[0][0] = n[2][0] = ze),
        n
      );
    if (i.length === 1)
      return [
        [ze, e],
        [Le, t],
      ];
    var o = Ax(e, t);
    if (o) {
      var a = o[0],
        l = o[1],
        c = o[2],
        f = o[3],
        d = o[4],
        h = Ks(a, c),
        p = Ks(l, f);
      return h.concat([[ne, d]], p);
    }
    return _x(e, t);
  }
  function _x(e, t) {
    for (
      var n = e.length,
        r = t.length,
        i = Math.ceil((n + r) / 2),
        s = i,
        o = 2 * i,
        a = new Array(o),
        l = new Array(o),
        c = 0;
      c < o;
      c++
    )
      (a[c] = -1), (l[c] = -1);
    (a[s + 1] = 0), (l[s + 1] = 0);
    for (
      var f = n - r, d = f % 2 !== 0, h = 0, p = 0, g = 0, v = 0, E = 0;
      E < i;
      E++
    ) {
      for (var x = -E + h; x <= E - p; x += 2) {
        var A = s + x,
          T;
        x === -E || (x !== E && a[A - 1] < a[A + 1])
          ? (T = a[A + 1])
          : (T = a[A - 1] + 1);
        for (var C = T - x; T < n && C < r && e.charAt(T) === t.charAt(C); )
          T++, C++;
        if (((a[A] = T), T > n)) p += 2;
        else if (C > r) h += 2;
        else if (d) {
          var q = s + f - x;
          if (q >= 0 && q < o && l[q] !== -1) {
            var P = n - l[q];
            if (T >= P) return hd(e, t, T, C);
          }
        }
      }
      for (var W = -E + g; W <= E - v; W += 2) {
        var q = s + W,
          P;
        W === -E || (W !== E && l[q - 1] < l[q + 1])
          ? (P = l[q + 1])
          : (P = l[q - 1] + 1);
        for (
          var at = P - W;
          P < n && at < r && e.charAt(n - P - 1) === t.charAt(r - at - 1);

        )
          P++, at++;
        if (((l[q] = P), P > n)) v += 2;
        else if (at > r) g += 2;
        else if (!d) {
          var A = s + f - W;
          if (A >= 0 && A < o && a[A] !== -1) {
            var T = a[A],
              C = s + T - A;
            if (((P = n - P), T >= P)) return hd(e, t, T, C);
          }
        }
      }
    }
    return [
      [ze, e],
      [Le, t],
    ];
  }
  function hd(e, t, n, r) {
    var i = e.substring(0, n),
      s = t.substring(0, r),
      o = e.substring(n),
      a = t.substring(r),
      l = Ks(i, s),
      c = Ks(o, a);
    return l.concat(c);
  }
  function ku(e, t) {
    if (!e || !t || e.charAt(0) !== t.charAt(0)) return 0;
    for (var n = 0, r = Math.min(e.length, t.length), i = r, s = 0; n < i; )
      e.substring(s, i) == t.substring(s, i) ? ((n = i), (s = n)) : (r = i),
        (i = Math.floor((r - n) / 2 + n));
    return mm(e.charCodeAt(i - 1)) && i--, i;
  }
  function pd(e, t) {
    var n = e.length,
      r = t.length;
    if (n == 0 || r == 0) return 0;
    n > r ? (e = e.substring(n - r)) : n < r && (t = t.substring(0, n));
    var i = Math.min(n, r);
    if (e == t) return i;
    for (var s = 0, o = 1; ; ) {
      var a = e.substring(i - o),
        l = t.indexOf(a);
      if (l == -1) return s;
      (o += l),
        (l == 0 || e.substring(i - o) == t.substring(0, o)) && ((s = o), o++);
    }
  }
  function Ba(e, t) {
    if (!e || !t || e.slice(-1) !== t.slice(-1)) return 0;
    for (var n = 0, r = Math.min(e.length, t.length), i = r, s = 0; n < i; )
      e.substring(e.length - i, e.length - s) ==
      t.substring(t.length - i, t.length - s)
        ? ((n = i), (s = n))
        : (r = i),
        (i = Math.floor((r - n) / 2 + n));
    return gm(e.charCodeAt(e.length - i)) && i--, i;
  }
  function Ax(e, t) {
    var n = e.length > t.length ? e : t,
      r = e.length > t.length ? t : e;
    if (n.length < 4 || r.length * 2 < n.length) return null;
    function i(p, g, v) {
      for (
        var E = p.substring(v, v + Math.floor(p.length / 4)),
          x = -1,
          A = "",
          T,
          C,
          q,
          P;
        (x = g.indexOf(E, x + 1)) !== -1;

      ) {
        var W = ku(p.substring(v), g.substring(x)),
          at = Ba(p.substring(0, v), g.substring(0, x));
        A.length < at + W &&
          ((A = g.substring(x - at, x) + g.substring(x, x + W)),
          (T = p.substring(0, v - at)),
          (C = p.substring(v + W)),
          (q = g.substring(0, x - at)),
          (P = g.substring(x + W)));
      }
      return A.length * 2 >= p.length ? [T, C, q, P, A] : null;
    }
    var s = i(n, r, Math.ceil(n.length / 4)),
      o = i(n, r, Math.ceil(n.length / 2)),
      a;
    if (!s && !o) return null;
    o ? (s ? (a = s[4].length > o[4].length ? s : o) : (a = o)) : (a = s);
    var l, c, f, d;
    e.length > t.length
      ? ((l = a[0]), (c = a[1]), (f = a[2]), (d = a[3]))
      : ((f = a[0]), (d = a[1]), (l = a[2]), (c = a[3]));
    var h = a[4];
    return [l, c, f, d, h];
  }
  function Tx(e) {
    for (
      var t = !1, n = [], r = 0, i = null, s = 0, o = 0, a = 0, l = 0, c = 0;
      s < e.length;

    )
      e[s][0] == ne
        ? ((n[r++] = s), (o = l), (a = c), (l = 0), (c = 0), (i = e[s][1]))
        : (e[s][0] == Le ? (l += e[s][1].length) : (c += e[s][1].length),
          i &&
            i.length <= Math.max(o, a) &&
            i.length <= Math.max(l, c) &&
            (e.splice(n[r - 1], 0, [ze, i]),
            (e[n[r - 1] + 1][0] = Le),
            r--,
            r--,
            (s = r > 0 ? n[r - 1] : -1),
            (o = 0),
            (a = 0),
            (l = 0),
            (c = 0),
            (i = null),
            (t = !0))),
        s++;
    for (t && Ou(e), Ix(e), s = 1; s < e.length; ) {
      if (e[s - 1][0] == ze && e[s][0] == Le) {
        var f = e[s - 1][1],
          d = e[s][1],
          h = pd(f, d),
          p = pd(d, f);
        h >= p
          ? (h >= f.length / 2 || h >= d.length / 2) &&
            (e.splice(s, 0, [ne, d.substring(0, h)]),
            (e[s - 1][1] = f.substring(0, f.length - h)),
            (e[s + 1][1] = d.substring(h)),
            s++)
          : (p >= f.length / 2 || p >= d.length / 2) &&
            (e.splice(s, 0, [ne, f.substring(0, p)]),
            (e[s - 1][0] = Le),
            (e[s - 1][1] = d.substring(0, d.length - p)),
            (e[s + 1][0] = ze),
            (e[s + 1][1] = f.substring(p)),
            s++),
          s++;
      }
      s++;
    }
  }
  var md = /[^a-zA-Z0-9]/,
    gd = /\s/,
    bd = /[\r\n]/,
    Cx = /\n\r?\n$/,
    Nx = /^\r?\n\r?\n/;
  function Ix(e) {
    function t(p, g) {
      if (!p || !g) return 6;
      var v = p.charAt(p.length - 1),
        E = g.charAt(0),
        x = v.match(md),
        A = E.match(md),
        T = x && v.match(gd),
        C = A && E.match(gd),
        q = T && v.match(bd),
        P = C && E.match(bd),
        W = q && p.match(Cx),
        at = P && g.match(Nx);
      return W || at
        ? 5
        : q || P
        ? 4
        : x && !T && C
        ? 3
        : T || C
        ? 2
        : x || A
        ? 1
        : 0;
    }
    for (var n = 1; n < e.length - 1; ) {
      if (e[n - 1][0] == ne && e[n + 1][0] == ne) {
        var r = e[n - 1][1],
          i = e[n][1],
          s = e[n + 1][1],
          o = Ba(r, i);
        if (o) {
          var a = i.substring(i.length - o);
          (r = r.substring(0, r.length - o)),
            (i = a + i.substring(0, i.length - o)),
            (s = a + s);
        }
        for (
          var l = r, c = i, f = s, d = t(r, i) + t(i, s);
          i.charAt(0) === s.charAt(0);

        ) {
          (r += i.charAt(0)),
            (i = i.substring(1) + s.charAt(0)),
            (s = s.substring(1));
          var h = t(r, i) + t(i, s);
          h >= d && ((d = h), (l = r), (c = i), (f = s));
        }
        e[n - 1][1] != l &&
          (l ? (e[n - 1][1] = l) : (e.splice(n - 1, 1), n--),
          (e[n][1] = c),
          f ? (e[n + 1][1] = f) : (e.splice(n + 1, 1), n--));
      }
      n++;
    }
  }
  function Ou(e, t) {
    e.push([ne, ""]);
    for (var n = 0, r = 0, i = 0, s = "", o = "", a; n < e.length; ) {
      if (n < e.length - 1 && !e[n][1]) {
        e.splice(n, 1);
        continue;
      }
      switch (e[n][0]) {
        case Le:
          i++, (o += e[n][1]), n++;
          break;
        case ze:
          r++, (s += e[n][1]), n++;
          break;
        case ne:
          var l = n - i - r - 1;
          if (t) {
            if (l >= 0 && vm(e[l][1])) {
              var c = e[l][1].slice(-1);
              if (
                ((e[l][1] = e[l][1].slice(0, -1)),
                (s = c + s),
                (o = c + o),
                !e[l][1])
              ) {
                e.splice(l, 1), n--;
                var f = l - 1;
                e[f] && e[f][0] === Le && (i++, (o = e[f][1] + o), f--),
                  e[f] && e[f][0] === ze && (r++, (s = e[f][1] + s), f--),
                  (l = f);
              }
            }
            if (bm(e[n][1])) {
              var c = e[n][1].charAt(0);
              (e[n][1] = e[n][1].slice(1)), (s += c), (o += c);
            }
          }
          if (n < e.length - 1 && !e[n][1]) {
            e.splice(n, 1);
            break;
          }
          if (s.length > 0 || o.length > 0) {
            s.length > 0 &&
              o.length > 0 &&
              ((a = ku(o, s)),
              a !== 0 &&
                (l >= 0
                  ? (e[l][1] += o.substring(0, a))
                  : (e.splice(0, 0, [ne, o.substring(0, a)]), n++),
                (o = o.substring(a)),
                (s = s.substring(a))),
              (a = Ba(o, s)),
              a !== 0 &&
                ((e[n][1] = o.substring(o.length - a) + e[n][1]),
                (o = o.substring(0, o.length - a)),
                (s = s.substring(0, s.length - a))));
            var d = i + r;
            s.length === 0 && o.length === 0
              ? (e.splice(n - d, d), (n = n - d))
              : s.length === 0
              ? (e.splice(n - d, d, [Le, o]), (n = n - d + 1))
              : o.length === 0
              ? (e.splice(n - d, d, [ze, s]), (n = n - d + 1))
              : (e.splice(n - d, d, [ze, s], [Le, o]), (n = n - d + 2));
          }
          n !== 0 && e[n - 1][0] === ne
            ? ((e[n - 1][1] += e[n][1]), e.splice(n, 1))
            : n++,
            (i = 0),
            (r = 0),
            (s = ""),
            (o = "");
          break;
      }
    }
    e[e.length - 1][1] === "" && e.pop();
    var h = !1;
    for (n = 1; n < e.length - 1; )
      e[n - 1][0] === ne &&
        e[n + 1][0] === ne &&
        (e[n][1].substring(e[n][1].length - e[n - 1][1].length) === e[n - 1][1]
          ? ((e[n][1] =
              e[n - 1][1] +
              e[n][1].substring(0, e[n][1].length - e[n - 1][1].length)),
            (e[n + 1][1] = e[n - 1][1] + e[n + 1][1]),
            e.splice(n - 1, 1),
            (h = !0))
          : e[n][1].substring(0, e[n + 1][1].length) == e[n + 1][1] &&
            ((e[n - 1][1] += e[n + 1][1]),
            (e[n][1] = e[n][1].substring(e[n + 1][1].length) + e[n + 1][1]),
            e.splice(n + 1, 1),
            (h = !0))),
        n++;
    h && Ou(e, t);
  }
  function mm(e) {
    return e >= 55296 && e <= 56319;
  }
  function gm(e) {
    return e >= 56320 && e <= 57343;
  }
  function bm(e) {
    return gm(e.charCodeAt(0));
  }
  function vm(e) {
    return mm(e.charCodeAt(e.length - 1));
  }
  function kx(e) {
    for (var t = [], n = 0; n < e.length; n++)
      e[n][1].length > 0 && t.push(e[n]);
    return t;
  }
  function Jl(e, t, n, r) {
    return vm(e) || bm(r)
      ? null
      : kx([
          [ne, e],
          [ze, t],
          [Le, n],
          [ne, r],
        ]);
  }
  function Ox(e, t, n) {
    var r = typeof n == "number" ? { index: n, length: 0 } : n.oldRange,
      i = typeof n == "number" ? null : n.newRange,
      s = e.length,
      o = t.length;
    if (r.length === 0 && (i === null || i.length === 0)) {
      var a = r.index,
        l = e.slice(0, a),
        c = e.slice(a),
        f = i ? i.index : null;
      t: {
        var d = a + o - s;
        if ((f !== null && f !== d) || d < 0 || d > o) break t;
        var h = t.slice(0, d),
          p = t.slice(d);
        if (p !== c) break t;
        var g = Math.min(a, d),
          v = l.slice(0, g),
          E = h.slice(0, g);
        if (v !== E) break t;
        var x = l.slice(g),
          A = h.slice(g);
        return Jl(v, x, A, c);
      }
      t: {
        if (f !== null && f !== a) break t;
        var T = a,
          h = t.slice(0, T),
          p = t.slice(T);
        if (h !== l) break t;
        var C = Math.min(s - T, o - T),
          q = c.slice(c.length - C),
          P = p.slice(p.length - C);
        if (q !== P) break t;
        var x = c.slice(0, c.length - C),
          A = p.slice(0, p.length - C);
        return Jl(l, x, A, q);
      }
    }
    if (r.length > 0 && i && i.length === 0)
      t: {
        var v = e.slice(0, r.index),
          q = e.slice(r.index + r.length),
          g = v.length,
          C = q.length;
        if (o < g + C) break t;
        var E = t.slice(0, g),
          P = t.slice(o - C);
        if (v !== E || q !== P) break t;
        var x = e.slice(g, s - C),
          A = t.slice(g, o - C);
        return Jl(v, x, A, q);
      }
    return null;
  }
  function Fa(e, t, n, r) {
    return Ks(e, t, n, r, !0);
  }
  Fa.INSERT = Le;
  Fa.DELETE = ze;
  Fa.EQUAL = ne;
  var Lx = Fa,
    ga = { exports: {} };
  ga.exports;
  (function (e, t) {
    var n = 200,
      r = "__lodash_hash_undefined__",
      i = 9007199254740991,
      s = "[object Arguments]",
      o = "[object Array]",
      a = "[object Boolean]",
      l = "[object Date]",
      c = "[object Error]",
      f = "[object Function]",
      d = "[object GeneratorFunction]",
      h = "[object Map]",
      p = "[object Number]",
      g = "[object Object]",
      v = "[object Promise]",
      E = "[object RegExp]",
      x = "[object Set]",
      A = "[object String]",
      T = "[object Symbol]",
      C = "[object WeakMap]",
      q = "[object ArrayBuffer]",
      P = "[object DataView]",
      W = "[object Float32Array]",
      at = "[object Float64Array]",
      Y = "[object Int8Array]",
      ut = "[object Int16Array]",
      dt = "[object Int32Array]",
      z = "[object Uint8Array]",
      ct = "[object Uint8ClampedArray]",
      Nt = "[object Uint16Array]",
      jt = "[object Uint32Array]",
      St = /[\\^$.*+?()[\]{}|]/g,
      vt = /\w*$/,
      mt = /^\[object .+?Constructor\]$/,
      Se = /^(?:0|[1-9]\d*)$/,
      gt = {};
    (gt[s] =
      gt[o] =
      gt[q] =
      gt[P] =
      gt[a] =
      gt[l] =
      gt[W] =
      gt[at] =
      gt[Y] =
      gt[ut] =
      gt[dt] =
      gt[h] =
      gt[p] =
      gt[g] =
      gt[E] =
      gt[x] =
      gt[A] =
      gt[T] =
      gt[z] =
      gt[ct] =
      gt[Nt] =
      gt[jt] =
        !0),
      (gt[c] = gt[f] = gt[C] = !1);
    var oe = typeof _r == "object" && _r && _r.Object === Object && _r,
      Wt = typeof self == "object" && self && self.Object === Object && self,
      ie = oe || Wt || Function("return this")(),
      rn = t && !t.nodeType && t,
      _t = rn && !0 && e && !e.nodeType && e,
      ae = _t && _t.exports === rn;
    function k(u, m) {
      return u.set(m[0], m[1]), u;
    }
    function j(u, m) {
      return u.add(m), u;
    }
    function U(u, m) {
      for (var w = -1, N = u ? u.length : 0; ++w < N && m(u[w], w, u) !== !1; );
      return u;
    }
    function J(u, m) {
      for (var w = -1, N = m.length, ht = u.length; ++w < N; ) u[ht + w] = m[w];
      return u;
    }
    function At(u, m, w, N) {
      for (var ht = -1, et = u ? u.length : 0; ++ht < et; )
        w = m(w, u[ht], ht, u);
      return w;
    }
    function b(u, m) {
      for (var w = -1, N = Array(u); ++w < u; ) N[w] = m(w);
      return N;
    }
    function y(u, m) {
      return u == null ? void 0 : u[m];
    }
    function _(u) {
      var m = !1;
      if (u != null && typeof u.toString != "function")
        try {
          m = !!(u + "");
        } catch {}
      return m;
    }
    function I(u) {
      var m = -1,
        w = Array(u.size);
      return (
        u.forEach(function (N, ht) {
          w[++m] = [ht, N];
        }),
        w
      );
    }
    function R(u, m) {
      return function (w) {
        return u(m(w));
      };
    }
    function O(u) {
      var m = -1,
        w = Array(u.size);
      return (
        u.forEach(function (N) {
          w[++m] = N;
        }),
        w
      );
    }
    var H = Array.prototype,
      B = Function.prototype,
      M = Object.prototype,
      D = ie["__core-js_shared__"],
      nt = (function () {
        var u = /[^.]+$/.exec((D && D.keys && D.keys.IE_PROTO) || "");
        return u ? "Symbol(src)_1." + u : "";
      })(),
      V = B.toString,
      Z = M.hasOwnProperty,
      it = M.toString,
      bt = RegExp(
        "^" +
          V.call(Z)
            .replace(St, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      ),
      xt = ae ? ie.Buffer : void 0,
      yt = ie.Symbol,
      Qt = ie.Uint8Array,
      Dt = R(Object.getPrototypeOf, Object),
      xe = Object.create,
      _e = M.propertyIsEnumerable,
      $n = H.splice,
      cr = Object.getOwnPropertySymbols,
      Yt = xt ? xt.isBuffer : void 0,
      Ae = R(Object.keys, Object),
      jn = on(ie, "DataView"),
      Dr = on(ie, "Map"),
      sn = on(ie, "Promise"),
      ai = on(ie, "Set"),
      Zi = on(ie, "WeakMap"),
      Mr = on(Object, "create"),
      Ji = Te(jn),
      Pr = Te(Dr),
      Qi = Te(sn),
      ts = Te(ai),
      es = Te(Zi),
      ur = yt ? yt.prototype : void 0,
      lo = ur ? ur.valueOf : void 0;
    function Un(u) {
      var m = -1,
        w = u ? u.length : 0;
      for (this.clear(); ++m < w; ) {
        var N = u[m];
        this.set(N[0], N[1]);
      }
    }
    function Va() {
      this.__data__ = Mr ? Mr(null) : {};
    }
    function Ka(u) {
      return this.has(u) && delete this.__data__[u];
    }
    function Ga(u) {
      var m = this.__data__;
      if (Mr) {
        var w = m[u];
        return w === r ? void 0 : w;
      }
      return Z.call(m, u) ? m[u] : void 0;
    }
    function co(u) {
      var m = this.__data__;
      return Mr ? m[u] !== void 0 : Z.call(m, u);
    }
    function ns(u, m) {
      var w = this.__data__;
      return (w[u] = Mr && m === void 0 ? r : m), this;
    }
    (Un.prototype.clear = Va),
      (Un.prototype.delete = Ka),
      (Un.prototype.get = Ga),
      (Un.prototype.has = co),
      (Un.prototype.set = ns);
    function le(u) {
      var m = -1,
        w = u ? u.length : 0;
      for (this.clear(); ++m < w; ) {
        var N = u[m];
        this.set(N[0], N[1]);
      }
    }
    function Wa() {
      this.__data__ = [];
    }
    function Ya(u) {
      var m = this.__data__,
        w = ci(m, u);
      if (w < 0) return !1;
      var N = m.length - 1;
      return w == N ? m.pop() : $n.call(m, w, 1), !0;
    }
    function Xa(u) {
      var m = this.__data__,
        w = ci(m, u);
      return w < 0 ? void 0 : m[w][1];
    }
    function Za(u) {
      return ci(this.__data__, u) > -1;
    }
    function Ja(u, m) {
      var w = this.__data__,
        N = ci(w, u);
      return N < 0 ? w.push([u, m]) : (w[N][1] = m), this;
    }
    (le.prototype.clear = Wa),
      (le.prototype.delete = Ya),
      (le.prototype.get = Xa),
      (le.prototype.has = Za),
      (le.prototype.set = Ja);
    function he(u) {
      var m = -1,
        w = u ? u.length : 0;
      for (this.clear(); ++m < w; ) {
        var N = u[m];
        this.set(N[0], N[1]);
      }
    }
    function Qa() {
      this.__data__ = {
        hash: new Un(),
        map: new (Dr || le)(),
        string: new Un(),
      };
    }
    function tl(u) {
      return Fr(this, u).delete(u);
    }
    function el(u) {
      return Fr(this, u).get(u);
    }
    function nl(u) {
      return Fr(this, u).has(u);
    }
    function rl(u, m) {
      return Fr(this, u).set(u, m), this;
    }
    (he.prototype.clear = Qa),
      (he.prototype.delete = tl),
      (he.prototype.get = el),
      (he.prototype.has = nl),
      (he.prototype.set = rl);
    function qe(u) {
      this.__data__ = new le(u);
    }
    function il() {
      this.__data__ = new le();
    }
    function sl(u) {
      return this.__data__.delete(u);
    }
    function ol(u) {
      return this.__data__.get(u);
    }
    function al(u) {
      return this.__data__.has(u);
    }
    function ll(u, m) {
      var w = this.__data__;
      if (w instanceof le) {
        var N = w.__data__;
        if (!Dr || N.length < n - 1) return N.push([u, m]), this;
        w = this.__data__ = new he(N);
      }
      return w.set(u, m), this;
    }
    (qe.prototype.clear = il),
      (qe.prototype.delete = sl),
      (qe.prototype.get = ol),
      (qe.prototype.has = al),
      (qe.prototype.set = ll);
    function li(u, m) {
      var w = os(u) || fi(u) ? b(u.length, String) : [],
        N = w.length,
        ht = !!N;
      for (var et in u)
        Z.call(u, et) && !(ht && (et == "length" || Sl(et, N))) && w.push(et);
      return w;
    }
    function uo(u, m, w) {
      var N = u[m];
      (!(Z.call(u, m) && go(N, w)) || (w === void 0 && !(m in u))) &&
        (u[m] = w);
    }
    function ci(u, m) {
      for (var w = u.length; w--; ) if (go(u[w][0], m)) return w;
      return -1;
    }
    function _n(u, m) {
      return u && ss(m, ls(m), u);
    }
    function rs(u, m, w, N, ht, et, Ct) {
      var Tt;
      if ((N && (Tt = et ? N(u, ht, et, Ct) : N(u)), Tt !== void 0)) return Tt;
      if (!Tn(u)) return u;
      var Xt = os(u);
      if (Xt) {
        if (((Tt = wl(u)), !m)) return bl(u, Tt);
      } else {
        var kt = zn(u),
          pe = kt == f || kt == d;
        if (bo(u)) return ui(u, m);
        if (kt == g || kt == s || (pe && !et)) {
          if (_(u)) return et ? u : {};
          if (((Tt = An(pe ? {} : u)), !m)) return vl(u, _n(Tt, u));
        } else {
          if (!gt[kt]) return et ? u : {};
          Tt = El(u, kt, rs, m);
        }
      }
      Ct || (Ct = new qe());
      var Re = Ct.get(u);
      if (Re) return Re;
      if ((Ct.set(u, Tt), !Xt)) var te = w ? yl(u) : ls(u);
      return (
        U(te || u, function (me, ce) {
          te && ((ce = me), (me = u[ce])),
            uo(Tt, ce, rs(me, m, w, N, ce, u, Ct));
        }),
        Tt
      );
    }
    function cl(u) {
      return Tn(u) ? xe(u) : {};
    }
    function ul(u, m, w) {
      var N = m(u);
      return os(u) ? N : J(N, w(u));
    }
    function fl(u) {
      return it.call(u);
    }
    function dl(u) {
      if (!Tn(u) || _l(u)) return !1;
      var m = as(u) || _(u) ? bt : mt;
      return m.test(Te(u));
    }
    function hl(u) {
      if (!po(u)) return Ae(u);
      var m = [];
      for (var w in Object(u)) Z.call(u, w) && w != "constructor" && m.push(w);
      return m;
    }
    function ui(u, m) {
      if (m) return u.slice();
      var w = new u.constructor(u.length);
      return u.copy(w), w;
    }
    function is(u) {
      var m = new u.constructor(u.byteLength);
      return new Qt(m).set(new Qt(u)), m;
    }
    function Br(u, m) {
      var w = m ? is(u.buffer) : u.buffer;
      return new u.constructor(w, u.byteOffset, u.byteLength);
    }
    function fo(u, m, w) {
      var N = m ? w(I(u), !0) : I(u);
      return At(N, k, new u.constructor());
    }
    function ho(u) {
      var m = new u.constructor(u.source, vt.exec(u));
      return (m.lastIndex = u.lastIndex), m;
    }
    function pl(u, m, w) {
      var N = m ? w(O(u), !0) : O(u);
      return At(N, j, new u.constructor());
    }
    function ml(u) {
      return lo ? Object(lo.call(u)) : {};
    }
    function gl(u, m) {
      var w = m ? is(u.buffer) : u.buffer;
      return new u.constructor(w, u.byteOffset, u.length);
    }
    function bl(u, m) {
      var w = -1,
        N = u.length;
      for (m || (m = Array(N)); ++w < N; ) m[w] = u[w];
      return m;
    }
    function ss(u, m, w, N) {
      w || (w = {});
      for (var ht = -1, et = m.length; ++ht < et; ) {
        var Ct = m[ht],
          Tt = void 0;
        uo(w, Ct, Tt === void 0 ? u[Ct] : Tt);
      }
      return w;
    }
    function vl(u, m) {
      return ss(u, Hn(u), m);
    }
    function yl(u) {
      return ul(u, ls, Hn);
    }
    function Fr(u, m) {
      var w = u.__data__;
      return xl(m) ? w[typeof m == "string" ? "string" : "hash"] : w.map;
    }
    function on(u, m) {
      var w = y(u, m);
      return dl(w) ? w : void 0;
    }
    var Hn = cr ? R(cr, Object) : Tl,
      zn = fl;
    ((jn && zn(new jn(new ArrayBuffer(1))) != P) ||
      (Dr && zn(new Dr()) != h) ||
      (sn && zn(sn.resolve()) != v) ||
      (ai && zn(new ai()) != x) ||
      (Zi && zn(new Zi()) != C)) &&
      (zn = function (u) {
        var m = it.call(u),
          w = m == g ? u.constructor : void 0,
          N = w ? Te(w) : void 0;
        if (N)
          switch (N) {
            case Ji:
              return P;
            case Pr:
              return h;
            case Qi:
              return v;
            case ts:
              return x;
            case es:
              return C;
          }
        return m;
      });
    function wl(u) {
      var m = u.length,
        w = u.constructor(m);
      return (
        m &&
          typeof u[0] == "string" &&
          Z.call(u, "index") &&
          ((w.index = u.index), (w.input = u.input)),
        w
      );
    }
    function An(u) {
      return typeof u.constructor == "function" && !po(u) ? cl(Dt(u)) : {};
    }
    function El(u, m, w, N) {
      var ht = u.constructor;
      switch (m) {
        case q:
          return is(u);
        case a:
        case l:
          return new ht(+u);
        case P:
          return Br(u, N);
        case W:
        case at:
        case Y:
        case ut:
        case dt:
        case z:
        case ct:
        case Nt:
        case jt:
          return gl(u, N);
        case h:
          return fo(u, N, w);
        case p:
        case A:
          return new ht(u);
        case E:
          return ho(u);
        case x:
          return pl(u, N, w);
        case T:
          return ml(u);
      }
    }
    function Sl(u, m) {
      return (
        (m = m ?? i),
        !!m &&
          (typeof u == "number" || Se.test(u)) &&
          u > -1 &&
          u % 1 == 0 &&
          u < m
      );
    }
    function xl(u) {
      var m = typeof u;
      return m == "string" || m == "number" || m == "symbol" || m == "boolean"
        ? u !== "__proto__"
        : u === null;
    }
    function _l(u) {
      return !!nt && nt in u;
    }
    function po(u) {
      var m = u && u.constructor,
        w = (typeof m == "function" && m.prototype) || M;
      return u === w;
    }
    function Te(u) {
      if (u != null) {
        try {
          return V.call(u);
        } catch {}
        try {
          return u + "";
        } catch {}
      }
      return "";
    }
    function mo(u) {
      return rs(u, !0, !0);
    }
    function go(u, m) {
      return u === m || (u !== u && m !== m);
    }
    function fi(u) {
      return (
        Al(u) &&
        Z.call(u, "callee") &&
        (!_e.call(u, "callee") || it.call(u) == s)
      );
    }
    var os = Array.isArray;
    function di(u) {
      return u != null && vo(u.length) && !as(u);
    }
    function Al(u) {
      return yo(u) && di(u);
    }
    var bo = Yt || Cl;
    function as(u) {
      var m = Tn(u) ? it.call(u) : "";
      return m == f || m == d;
    }
    function vo(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= i;
    }
    function Tn(u) {
      var m = typeof u;
      return !!u && (m == "object" || m == "function");
    }
    function yo(u) {
      return !!u && typeof u == "object";
    }
    function ls(u) {
      return di(u) ? li(u) : hl(u);
    }
    function Tl() {
      return [];
    }
    function Cl() {
      return !1;
    }
    e.exports = mo;
  })(ga, ga.exports);
  var ym = ga.exports,
    ba = { exports: {} };
  ba.exports;
  (function (e, t) {
    var n = 200,
      r = "__lodash_hash_undefined__",
      i = 1,
      s = 2,
      o = 9007199254740991,
      a = "[object Arguments]",
      l = "[object Array]",
      c = "[object AsyncFunction]",
      f = "[object Boolean]",
      d = "[object Date]",
      h = "[object Error]",
      p = "[object Function]",
      g = "[object GeneratorFunction]",
      v = "[object Map]",
      E = "[object Number]",
      x = "[object Null]",
      A = "[object Object]",
      T = "[object Promise]",
      C = "[object Proxy]",
      q = "[object RegExp]",
      P = "[object Set]",
      W = "[object String]",
      at = "[object Symbol]",
      Y = "[object Undefined]",
      ut = "[object WeakMap]",
      dt = "[object ArrayBuffer]",
      z = "[object DataView]",
      ct = "[object Float32Array]",
      Nt = "[object Float64Array]",
      jt = "[object Int8Array]",
      St = "[object Int16Array]",
      vt = "[object Int32Array]",
      mt = "[object Uint8Array]",
      Se = "[object Uint8ClampedArray]",
      gt = "[object Uint16Array]",
      oe = "[object Uint32Array]",
      Wt = /[\\^$.*+?()[\]{}|]/g,
      ie = /^\[object .+?Constructor\]$/,
      rn = /^(?:0|[1-9]\d*)$/,
      _t = {};
    (_t[ct] =
      _t[Nt] =
      _t[jt] =
      _t[St] =
      _t[vt] =
      _t[mt] =
      _t[Se] =
      _t[gt] =
      _t[oe] =
        !0),
      (_t[a] =
        _t[l] =
        _t[dt] =
        _t[f] =
        _t[z] =
        _t[d] =
        _t[h] =
        _t[p] =
        _t[v] =
        _t[E] =
        _t[A] =
        _t[q] =
        _t[P] =
        _t[W] =
        _t[ut] =
          !1);
    var ae = typeof _r == "object" && _r && _r.Object === Object && _r,
      k = typeof self == "object" && self && self.Object === Object && self,
      j = ae || k || Function("return this")(),
      U = t && !t.nodeType && t,
      J = U && !0 && e && !e.nodeType && e,
      At = J && J.exports === U,
      b = At && ae.process,
      y = (function () {
        try {
          return b && b.binding && b.binding("util");
        } catch {}
      })(),
      _ = y && y.isTypedArray;
    function I(u, m) {
      for (
        var w = -1, N = u == null ? 0 : u.length, ht = 0, et = [];
        ++w < N;

      ) {
        var Ct = u[w];
        m(Ct, w, u) && (et[ht++] = Ct);
      }
      return et;
    }
    function R(u, m) {
      for (var w = -1, N = m.length, ht = u.length; ++w < N; ) u[ht + w] = m[w];
      return u;
    }
    function O(u, m) {
      for (var w = -1, N = u == null ? 0 : u.length; ++w < N; )
        if (m(u[w], w, u)) return !0;
      return !1;
    }
    function H(u, m) {
      for (var w = -1, N = Array(u); ++w < u; ) N[w] = m(w);
      return N;
    }
    function B(u) {
      return function (m) {
        return u(m);
      };
    }
    function M(u, m) {
      return u.has(m);
    }
    function D(u, m) {
      return u == null ? void 0 : u[m];
    }
    function nt(u) {
      var m = -1,
        w = Array(u.size);
      return (
        u.forEach(function (N, ht) {
          w[++m] = [ht, N];
        }),
        w
      );
    }
    function V(u, m) {
      return function (w) {
        return u(m(w));
      };
    }
    function Z(u) {
      var m = -1,
        w = Array(u.size);
      return (
        u.forEach(function (N) {
          w[++m] = N;
        }),
        w
      );
    }
    var it = Array.prototype,
      bt = Function.prototype,
      xt = Object.prototype,
      yt = j["__core-js_shared__"],
      Qt = bt.toString,
      Dt = xt.hasOwnProperty,
      xe = (function () {
        var u = /[^.]+$/.exec((yt && yt.keys && yt.keys.IE_PROTO) || "");
        return u ? "Symbol(src)_1." + u : "";
      })(),
      _e = xt.toString,
      $n = RegExp(
        "^" +
          Qt.call(Dt)
            .replace(Wt, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      ),
      cr = At ? j.Buffer : void 0,
      Yt = j.Symbol,
      Ae = j.Uint8Array,
      jn = xt.propertyIsEnumerable,
      Dr = it.splice,
      sn = Yt ? Yt.toStringTag : void 0,
      ai = Object.getOwnPropertySymbols,
      Zi = cr ? cr.isBuffer : void 0,
      Mr = V(Object.keys, Object),
      Ji = Hn(j, "DataView"),
      Pr = Hn(j, "Map"),
      Qi = Hn(j, "Promise"),
      ts = Hn(j, "Set"),
      es = Hn(j, "WeakMap"),
      ur = Hn(Object, "create"),
      lo = Te(Ji),
      Un = Te(Pr),
      Va = Te(Qi),
      Ka = Te(ts),
      Ga = Te(es),
      co = Yt ? Yt.prototype : void 0,
      ns = co ? co.valueOf : void 0;
    function le(u) {
      var m = -1,
        w = u == null ? 0 : u.length;
      for (this.clear(); ++m < w; ) {
        var N = u[m];
        this.set(N[0], N[1]);
      }
    }
    function Wa() {
      (this.__data__ = ur ? ur(null) : {}), (this.size = 0);
    }
    function Ya(u) {
      var m = this.has(u) && delete this.__data__[u];
      return (this.size -= m ? 1 : 0), m;
    }
    function Xa(u) {
      var m = this.__data__;
      if (ur) {
        var w = m[u];
        return w === r ? void 0 : w;
      }
      return Dt.call(m, u) ? m[u] : void 0;
    }
    function Za(u) {
      var m = this.__data__;
      return ur ? m[u] !== void 0 : Dt.call(m, u);
    }
    function Ja(u, m) {
      var w = this.__data__;
      return (
        (this.size += this.has(u) ? 0 : 1),
        (w[u] = ur && m === void 0 ? r : m),
        this
      );
    }
    (le.prototype.clear = Wa),
      (le.prototype.delete = Ya),
      (le.prototype.get = Xa),
      (le.prototype.has = Za),
      (le.prototype.set = Ja);
    function he(u) {
      var m = -1,
        w = u == null ? 0 : u.length;
      for (this.clear(); ++m < w; ) {
        var N = u[m];
        this.set(N[0], N[1]);
      }
    }
    function Qa() {
      (this.__data__ = []), (this.size = 0);
    }
    function tl(u) {
      var m = this.__data__,
        w = ui(m, u);
      if (w < 0) return !1;
      var N = m.length - 1;
      return w == N ? m.pop() : Dr.call(m, w, 1), --this.size, !0;
    }
    function el(u) {
      var m = this.__data__,
        w = ui(m, u);
      return w < 0 ? void 0 : m[w][1];
    }
    function nl(u) {
      return ui(this.__data__, u) > -1;
    }
    function rl(u, m) {
      var w = this.__data__,
        N = ui(w, u);
      return N < 0 ? (++this.size, w.push([u, m])) : (w[N][1] = m), this;
    }
    (he.prototype.clear = Qa),
      (he.prototype.delete = tl),
      (he.prototype.get = el),
      (he.prototype.has = nl),
      (he.prototype.set = rl);
    function qe(u) {
      var m = -1,
        w = u == null ? 0 : u.length;
      for (this.clear(); ++m < w; ) {
        var N = u[m];
        this.set(N[0], N[1]);
      }
    }
    function il() {
      (this.size = 0),
        (this.__data__ = {
          hash: new le(),
          map: new (Pr || he)(),
          string: new le(),
        });
    }
    function sl(u) {
      var m = on(this, u).delete(u);
      return (this.size -= m ? 1 : 0), m;
    }
    function ol(u) {
      return on(this, u).get(u);
    }
    function al(u) {
      return on(this, u).has(u);
    }
    function ll(u, m) {
      var w = on(this, u),
        N = w.size;
      return w.set(u, m), (this.size += w.size == N ? 0 : 1), this;
    }
    (qe.prototype.clear = il),
      (qe.prototype.delete = sl),
      (qe.prototype.get = ol),
      (qe.prototype.has = al),
      (qe.prototype.set = ll);
    function li(u) {
      var m = -1,
        w = u == null ? 0 : u.length;
      for (this.__data__ = new qe(); ++m < w; ) this.add(u[m]);
    }
    function uo(u) {
      return this.__data__.set(u, r), this;
    }
    function ci(u) {
      return this.__data__.has(u);
    }
    (li.prototype.add = li.prototype.push = uo), (li.prototype.has = ci);
    function _n(u) {
      var m = (this.__data__ = new he(u));
      this.size = m.size;
    }
    function rs() {
      (this.__data__ = new he()), (this.size = 0);
    }
    function cl(u) {
      var m = this.__data__,
        w = m.delete(u);
      return (this.size = m.size), w;
    }
    function ul(u) {
      return this.__data__.get(u);
    }
    function fl(u) {
      return this.__data__.has(u);
    }
    function dl(u, m) {
      var w = this.__data__;
      if (w instanceof he) {
        var N = w.__data__;
        if (!Pr || N.length < n - 1)
          return N.push([u, m]), (this.size = ++w.size), this;
        w = this.__data__ = new qe(N);
      }
      return w.set(u, m), (this.size = w.size), this;
    }
    (_n.prototype.clear = rs),
      (_n.prototype.delete = cl),
      (_n.prototype.get = ul),
      (_n.prototype.has = fl),
      (_n.prototype.set = dl);
    function hl(u, m) {
      var w = fi(u),
        N = !w && go(u),
        ht = !w && !N && di(u),
        et = !w && !N && !ht && yo(u),
        Ct = w || N || ht || et,
        Tt = Ct ? H(u.length, String) : [],
        Xt = Tt.length;
      for (var kt in u)
        Dt.call(u, kt) &&
          !(
            Ct &&
            (kt == "length" ||
              (ht && (kt == "offset" || kt == "parent")) ||
              (et &&
                (kt == "buffer" || kt == "byteLength" || kt == "byteOffset")) ||
              El(kt, Xt))
          ) &&
          Tt.push(kt);
      return Tt;
    }
    function ui(u, m) {
      for (var w = u.length; w--; ) if (mo(u[w][0], m)) return w;
      return -1;
    }
    function is(u, m, w) {
      var N = m(u);
      return fi(u) ? N : R(N, w(u));
    }
    function Br(u) {
      return u == null
        ? u === void 0
          ? Y
          : x
        : sn && sn in Object(u)
        ? zn(u)
        : po(u);
    }
    function fo(u) {
      return Tn(u) && Br(u) == a;
    }
    function ho(u, m, w, N, ht) {
      return u === m
        ? !0
        : u == null || m == null || (!Tn(u) && !Tn(m))
        ? u !== u && m !== m
        : pl(u, m, w, N, ho, ht);
    }
    function pl(u, m, w, N, ht, et) {
      var Ct = fi(u),
        Tt = fi(m),
        Xt = Ct ? l : An(u),
        kt = Tt ? l : An(m);
      (Xt = Xt == a ? A : Xt), (kt = kt == a ? A : kt);
      var pe = Xt == A,
        Re = kt == A,
        te = Xt == kt;
      if (te && di(u)) {
        if (!di(m)) return !1;
        (Ct = !0), (pe = !1);
      }
      if (te && !pe)
        return (
          et || (et = new _n()),
          Ct || yo(u) ? ss(u, m, w, N, ht, et) : vl(u, m, Xt, w, N, ht, et)
        );
      if (!(w & i)) {
        var me = pe && Dt.call(u, "__wrapped__"),
          ce = Re && Dt.call(m, "__wrapped__");
        if (me || ce) {
          var fr = me ? u.value() : u,
            Vn = ce ? m.value() : m;
          return et || (et = new _n()), ht(fr, Vn, w, N, et);
        }
      }
      return te ? (et || (et = new _n()), yl(u, m, w, N, ht, et)) : !1;
    }
    function ml(u) {
      if (!vo(u) || xl(u)) return !1;
      var m = bo(u) ? $n : ie;
      return m.test(Te(u));
    }
    function gl(u) {
      return Tn(u) && as(u.length) && !!_t[Br(u)];
    }
    function bl(u) {
      if (!_l(u)) return Mr(u);
      var m = [];
      for (var w in Object(u)) Dt.call(u, w) && w != "constructor" && m.push(w);
      return m;
    }
    function ss(u, m, w, N, ht, et) {
      var Ct = w & i,
        Tt = u.length,
        Xt = m.length;
      if (Tt != Xt && !(Ct && Xt > Tt)) return !1;
      var kt = et.get(u);
      if (kt && et.get(m)) return kt == m;
      var pe = -1,
        Re = !0,
        te = w & s ? new li() : void 0;
      for (et.set(u, m), et.set(m, u); ++pe < Tt; ) {
        var me = u[pe],
          ce = m[pe];
        if (N) var fr = Ct ? N(ce, me, pe, m, u, et) : N(me, ce, pe, u, m, et);
        if (fr !== void 0) {
          if (fr) continue;
          Re = !1;
          break;
        }
        if (te) {
          if (
            !O(m, function (Vn, $r) {
              if (!M(te, $r) && (me === Vn || ht(me, Vn, w, N, et)))
                return te.push($r);
            })
          ) {
            Re = !1;
            break;
          }
        } else if (!(me === ce || ht(me, ce, w, N, et))) {
          Re = !1;
          break;
        }
      }
      return et.delete(u), et.delete(m), Re;
    }
    function vl(u, m, w, N, ht, et, Ct) {
      switch (w) {
        case z:
          if (u.byteLength != m.byteLength || u.byteOffset != m.byteOffset)
            return !1;
          (u = u.buffer), (m = m.buffer);
        case dt:
          return !(u.byteLength != m.byteLength || !et(new Ae(u), new Ae(m)));
        case f:
        case d:
        case E:
          return mo(+u, +m);
        case h:
          return u.name == m.name && u.message == m.message;
        case q:
        case W:
          return u == m + "";
        case v:
          var Tt = nt;
        case P:
          var Xt = N & i;
          if ((Tt || (Tt = Z), u.size != m.size && !Xt)) return !1;
          var kt = Ct.get(u);
          if (kt) return kt == m;
          (N |= s), Ct.set(u, m);
          var pe = ss(Tt(u), Tt(m), N, ht, et, Ct);
          return Ct.delete(u), pe;
        case at:
          if (ns) return ns.call(u) == ns.call(m);
      }
      return !1;
    }
    function yl(u, m, w, N, ht, et) {
      var Ct = w & i,
        Tt = Fr(u),
        Xt = Tt.length,
        kt = Fr(m),
        pe = kt.length;
      if (Xt != pe && !Ct) return !1;
      for (var Re = Xt; Re--; ) {
        var te = Tt[Re];
        if (!(Ct ? te in m : Dt.call(m, te))) return !1;
      }
      var me = et.get(u);
      if (me && et.get(m)) return me == m;
      var ce = !0;
      et.set(u, m), et.set(m, u);
      for (var fr = Ct; ++Re < Xt; ) {
        te = Tt[Re];
        var Vn = u[te],
          $r = m[te];
        if (N) var Ku = Ct ? N($r, Vn, te, m, u, et) : N(Vn, $r, te, u, m, et);
        if (!(Ku === void 0 ? Vn === $r || ht(Vn, $r, w, N, et) : Ku)) {
          ce = !1;
          break;
        }
        fr || (fr = te == "constructor");
      }
      if (ce && !fr) {
        var wo = u.constructor,
          Eo = m.constructor;
        wo != Eo &&
          "constructor" in u &&
          "constructor" in m &&
          !(
            typeof wo == "function" &&
            wo instanceof wo &&
            typeof Eo == "function" &&
            Eo instanceof Eo
          ) &&
          (ce = !1);
      }
      return et.delete(u), et.delete(m), ce;
    }
    function Fr(u) {
      return is(u, ls, wl);
    }
    function on(u, m) {
      var w = u.__data__;
      return Sl(m) ? w[typeof m == "string" ? "string" : "hash"] : w.map;
    }
    function Hn(u, m) {
      var w = D(u, m);
      return ml(w) ? w : void 0;
    }
    function zn(u) {
      var m = Dt.call(u, sn),
        w = u[sn];
      try {
        u[sn] = void 0;
        var N = !0;
      } catch {}
      var ht = _e.call(u);
      return N && (m ? (u[sn] = w) : delete u[sn]), ht;
    }
    var wl = ai
        ? function (u) {
            return u == null
              ? []
              : ((u = Object(u)),
                I(ai(u), function (m) {
                  return jn.call(u, m);
                }));
          }
        : Tl,
      An = Br;
    ((Ji && An(new Ji(new ArrayBuffer(1))) != z) ||
      (Pr && An(new Pr()) != v) ||
      (Qi && An(Qi.resolve()) != T) ||
      (ts && An(new ts()) != P) ||
      (es && An(new es()) != ut)) &&
      (An = function (u) {
        var m = Br(u),
          w = m == A ? u.constructor : void 0,
          N = w ? Te(w) : "";
        if (N)
          switch (N) {
            case lo:
              return z;
            case Un:
              return v;
            case Va:
              return T;
            case Ka:
              return P;
            case Ga:
              return ut;
          }
        return m;
      });
    function El(u, m) {
      return (
        (m = m ?? o),
        !!m &&
          (typeof u == "number" || rn.test(u)) &&
          u > -1 &&
          u % 1 == 0 &&
          u < m
      );
    }
    function Sl(u) {
      var m = typeof u;
      return m == "string" || m == "number" || m == "symbol" || m == "boolean"
        ? u !== "__proto__"
        : u === null;
    }
    function xl(u) {
      return !!xe && xe in u;
    }
    function _l(u) {
      var m = u && u.constructor,
        w = (typeof m == "function" && m.prototype) || xt;
      return u === w;
    }
    function po(u) {
      return _e.call(u);
    }
    function Te(u) {
      if (u != null) {
        try {
          return Qt.call(u);
        } catch {}
        try {
          return u + "";
        } catch {}
      }
      return "";
    }
    function mo(u, m) {
      return u === m || (u !== u && m !== m);
    }
    var go = fo(
        (function () {
          return arguments;
        })()
      )
        ? fo
        : function (u) {
            return Tn(u) && Dt.call(u, "callee") && !jn.call(u, "callee");
          },
      fi = Array.isArray;
    function os(u) {
      return u != null && as(u.length) && !bo(u);
    }
    var di = Zi || Cl;
    function Al(u, m) {
      return ho(u, m);
    }
    function bo(u) {
      if (!vo(u)) return !1;
      var m = Br(u);
      return m == p || m == g || m == c || m == C;
    }
    function as(u) {
      return typeof u == "number" && u > -1 && u % 1 == 0 && u <= o;
    }
    function vo(u) {
      var m = typeof u;
      return u != null && (m == "object" || m == "function");
    }
    function Tn(u) {
      return u != null && typeof u == "object";
    }
    var yo = _ ? B(_) : gl;
    function ls(u) {
      return os(u) ? hl(u) : bl(u);
    }
    function Tl() {
      return [];
    }
    function Cl() {
      return !1;
    }
    e.exports = Al;
  })(ba, ba.exports);
  var wm = ba.exports,
    Lu = {};
  Object.defineProperty(Lu, "__esModule", { value: !0 });
  const qx = ym,
    Rx = wm;
  var $c;
  (function (e) {
    function t(s = {}, o = {}, a = !1) {
      typeof s != "object" && (s = {}), typeof o != "object" && (o = {});
      let l = qx(o);
      a ||
        (l = Object.keys(l).reduce(
          (c, f) => (l[f] != null && (c[f] = l[f]), c),
          {}
        ));
      for (const c in s) s[c] !== void 0 && o[c] === void 0 && (l[c] = s[c]);
      return Object.keys(l).length > 0 ? l : void 0;
    }
    e.compose = t;
    function n(s = {}, o = {}) {
      typeof s != "object" && (s = {}), typeof o != "object" && (o = {});
      const a = Object.keys(s)
        .concat(Object.keys(o))
        .reduce(
          (l, c) => (
            Rx(s[c], o[c]) || (l[c] = o[c] === void 0 ? null : o[c]), l
          ),
          {}
        );
      return Object.keys(a).length > 0 ? a : void 0;
    }
    e.diff = n;
    function r(s = {}, o = {}) {
      s = s || {};
      const a = Object.keys(o).reduce(
        (l, c) => (o[c] !== s[c] && s[c] !== void 0 && (l[c] = o[c]), l),
        {}
      );
      return Object.keys(s).reduce(
        (l, c) => (s[c] !== o[c] && o[c] === void 0 && (l[c] = null), l),
        a
      );
    }
    e.invert = r;
    function i(s, o, a = !1) {
      if (typeof s != "object") return o;
      if (typeof o != "object") return;
      if (!a) return o;
      const l = Object.keys(o).reduce(
        (c, f) => (s[f] === void 0 && (c[f] = o[f]), c),
        {}
      );
      return Object.keys(l).length > 0 ? l : void 0;
    }
    e.transform = i;
  })($c || ($c = {}));
  Lu.default = $c;
  var $a = {};
  Object.defineProperty($a, "__esModule", { value: !0 });
  var jc;
  (function (e) {
    function t(n) {
      return typeof n.delete == "number"
        ? n.delete
        : typeof n.retain == "number"
        ? n.retain
        : typeof n.retain == "object" && n.retain !== null
        ? 1
        : typeof n.insert == "string"
        ? n.insert.length
        : 1;
    }
    e.length = t;
  })(jc || (jc = {}));
  $a.default = jc;
  var qu = {};
  Object.defineProperty(qu, "__esModule", { value: !0 });
  const vd = $a;
  class Dx {
    constructor(t) {
      (this.ops = t), (this.index = 0), (this.offset = 0);
    }
    hasNext() {
      return this.peekLength() < 1 / 0;
    }
    next(t) {
      t || (t = 1 / 0);
      const n = this.ops[this.index];
      if (n) {
        const r = this.offset,
          i = vd.default.length(n);
        if (
          (t >= i - r
            ? ((t = i - r), (this.index += 1), (this.offset = 0))
            : (this.offset += t),
          typeof n.delete == "number")
        )
          return { delete: t };
        {
          const s = {};
          return (
            n.attributes && (s.attributes = n.attributes),
            typeof n.retain == "number"
              ? (s.retain = t)
              : typeof n.retain == "object" && n.retain !== null
              ? (s.retain = n.retain)
              : typeof n.insert == "string"
              ? (s.insert = n.insert.substr(r, t))
              : (s.insert = n.insert),
            s
          );
        }
      } else return { retain: 1 / 0 };
    }
    peek() {
      return this.ops[this.index];
    }
    peekLength() {
      return this.ops[this.index]
        ? vd.default.length(this.ops[this.index]) - this.offset
        : 1 / 0;
    }
    peekType() {
      const t = this.ops[this.index];
      return t
        ? typeof t.delete == "number"
          ? "delete"
          : typeof t.retain == "number" ||
            (typeof t.retain == "object" && t.retain !== null)
          ? "retain"
          : "insert"
        : "retain";
    }
    rest() {
      if (this.hasNext()) {
        if (this.offset === 0) return this.ops.slice(this.index);
        {
          const t = this.offset,
            n = this.index,
            r = this.next(),
            i = this.ops.slice(this.index);
          return (this.offset = t), (this.index = n), [r].concat(i);
        }
      } else return [];
    }
  }
  qu.default = Dx;
  (function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.AttributeMap = t.OpIterator = t.Op = void 0);
    const n = Lx,
      r = ym,
      i = wm,
      s = Lu;
    t.AttributeMap = s.default;
    const o = $a;
    t.Op = o.default;
    const a = qu;
    t.OpIterator = a.default;
    const l = "\0",
      c = (d, h) => {
        if (typeof d != "object" || d === null)
          throw new Error(`cannot retain a ${typeof d}`);
        if (typeof h != "object" || h === null)
          throw new Error(`cannot retain a ${typeof h}`);
        const p = Object.keys(d)[0];
        if (!p || p !== Object.keys(h)[0])
          throw new Error(
            `embed types not matched: ${p} != ${Object.keys(h)[0]}`
          );
        return [p, d[p], h[p]];
      };
    class f {
      constructor(h) {
        Array.isArray(h)
          ? (this.ops = h)
          : h != null && Array.isArray(h.ops)
          ? (this.ops = h.ops)
          : (this.ops = []);
      }
      static registerEmbed(h, p) {
        this.handlers[h] = p;
      }
      static unregisterEmbed(h) {
        delete this.handlers[h];
      }
      static getHandler(h) {
        const p = this.handlers[h];
        if (!p) throw new Error(`no handlers for embed type "${h}"`);
        return p;
      }
      insert(h, p) {
        const g = {};
        return typeof h == "string" && h.length === 0
          ? this
          : ((g.insert = h),
            p != null &&
              typeof p == "object" &&
              Object.keys(p).length > 0 &&
              (g.attributes = p),
            this.push(g));
      }
      delete(h) {
        return h <= 0 ? this : this.push({ delete: h });
      }
      retain(h, p) {
        if (typeof h == "number" && h <= 0) return this;
        const g = { retain: h };
        return (
          p != null &&
            typeof p == "object" &&
            Object.keys(p).length > 0 &&
            (g.attributes = p),
          this.push(g)
        );
      }
      push(h) {
        let p = this.ops.length,
          g = this.ops[p - 1];
        if (((h = r(h)), typeof g == "object")) {
          if (typeof h.delete == "number" && typeof g.delete == "number")
            return (this.ops[p - 1] = { delete: g.delete + h.delete }), this;
          if (
            typeof g.delete == "number" &&
            h.insert != null &&
            ((p -= 1), (g = this.ops[p - 1]), typeof g != "object")
          )
            return this.ops.unshift(h), this;
          if (i(h.attributes, g.attributes)) {
            if (typeof h.insert == "string" && typeof g.insert == "string")
              return (
                (this.ops[p - 1] = { insert: g.insert + h.insert }),
                typeof h.attributes == "object" &&
                  (this.ops[p - 1].attributes = h.attributes),
                this
              );
            if (typeof h.retain == "number" && typeof g.retain == "number")
              return (
                (this.ops[p - 1] = { retain: g.retain + h.retain }),
                typeof h.attributes == "object" &&
                  (this.ops[p - 1].attributes = h.attributes),
                this
              );
          }
        }
        return (
          p === this.ops.length ? this.ops.push(h) : this.ops.splice(p, 0, h),
          this
        );
      }
      chop() {
        const h = this.ops[this.ops.length - 1];
        return (
          h && typeof h.retain == "number" && !h.attributes && this.ops.pop(),
          this
        );
      }
      filter(h) {
        return this.ops.filter(h);
      }
      forEach(h) {
        this.ops.forEach(h);
      }
      map(h) {
        return this.ops.map(h);
      }
      partition(h) {
        const p = [],
          g = [];
        return (
          this.forEach((v) => {
            (h(v) ? p : g).push(v);
          }),
          [p, g]
        );
      }
      reduce(h, p) {
        return this.ops.reduce(h, p);
      }
      changeLength() {
        return this.reduce(
          (h, p) =>
            p.insert ? h + o.default.length(p) : p.delete ? h - p.delete : h,
          0
        );
      }
      length() {
        return this.reduce((h, p) => h + o.default.length(p), 0);
      }
      slice(h = 0, p = 1 / 0) {
        const g = [],
          v = new a.default(this.ops);
        let E = 0;
        for (; E < p && v.hasNext(); ) {
          let x;
          E < h ? (x = v.next(h - E)) : ((x = v.next(p - E)), g.push(x)),
            (E += o.default.length(x));
        }
        return new f(g);
      }
      compose(h) {
        const p = new a.default(this.ops),
          g = new a.default(h.ops),
          v = [],
          E = g.peek();
        if (E != null && typeof E.retain == "number" && E.attributes == null) {
          let A = E.retain;
          for (; p.peekType() === "insert" && p.peekLength() <= A; )
            (A -= p.peekLength()), v.push(p.next());
          E.retain - A > 0 && g.next(E.retain - A);
        }
        const x = new f(v);
        for (; p.hasNext() || g.hasNext(); )
          if (g.peekType() === "insert") x.push(g.next());
          else if (p.peekType() === "delete") x.push(p.next());
          else {
            const A = Math.min(p.peekLength(), g.peekLength()),
              T = p.next(A),
              C = g.next(A);
            if (C.retain) {
              const q = {};
              if (typeof T.retain == "number")
                q.retain = typeof C.retain == "number" ? A : C.retain;
              else if (typeof C.retain == "number")
                T.retain == null
                  ? (q.insert = T.insert)
                  : (q.retain = T.retain);
              else {
                const W = T.retain == null ? "insert" : "retain",
                  [at, Y, ut] = c(T[W], C.retain),
                  dt = f.getHandler(at);
                q[W] = { [at]: dt.compose(Y, ut, W === "retain") };
              }
              const P = s.default.compose(
                T.attributes,
                C.attributes,
                typeof T.retain == "number"
              );
              if (
                (P && (q.attributes = P),
                x.push(q),
                !g.hasNext() && i(x.ops[x.ops.length - 1], q))
              ) {
                const W = new f(p.rest());
                return x.concat(W).chop();
              }
            } else
              typeof C.delete == "number" &&
                (typeof T.retain == "number" ||
                  (typeof T.retain == "object" && T.retain !== null)) &&
                x.push(C);
          }
        return x.chop();
      }
      concat(h) {
        const p = new f(this.ops.slice());
        return (
          h.ops.length > 0 &&
            (p.push(h.ops[0]), (p.ops = p.ops.concat(h.ops.slice(1)))),
          p
        );
      }
      diff(h, p) {
        if (this.ops === h.ops) return new f();
        const g = [this, h].map((T) =>
            T.map((C) => {
              if (C.insert != null)
                return typeof C.insert == "string" ? C.insert : l;
              const q = T === h ? "on" : "with";
              throw new Error("diff() called " + q + " non-document");
            }).join("")
          ),
          v = new f(),
          E = n(g[0], g[1], p, !0),
          x = new a.default(this.ops),
          A = new a.default(h.ops);
        return (
          E.forEach((T) => {
            let C = T[1].length;
            for (; C > 0; ) {
              let q = 0;
              switch (T[0]) {
                case n.INSERT:
                  (q = Math.min(A.peekLength(), C)), v.push(A.next(q));
                  break;
                case n.DELETE:
                  (q = Math.min(C, x.peekLength())), x.next(q), v.delete(q);
                  break;
                case n.EQUAL:
                  q = Math.min(x.peekLength(), A.peekLength(), C);
                  const P = x.next(q),
                    W = A.next(q);
                  i(P.insert, W.insert)
                    ? v.retain(q, s.default.diff(P.attributes, W.attributes))
                    : v.push(W).delete(q);
                  break;
              }
              C -= q;
            }
          }),
          v.chop()
        );
      }
      eachLine(
        h,
        p = `
`
      ) {
        const g = new a.default(this.ops);
        let v = new f(),
          E = 0;
        for (; g.hasNext(); ) {
          if (g.peekType() !== "insert") return;
          const x = g.peek(),
            A = o.default.length(x) - g.peekLength(),
            T = typeof x.insert == "string" ? x.insert.indexOf(p, A) - A : -1;
          if (T < 0) v.push(g.next());
          else if (T > 0) v.push(g.next(T));
          else {
            if (h(v, g.next(1).attributes || {}, E) === !1) return;
            (E += 1), (v = new f());
          }
        }
        v.length() > 0 && h(v, {}, E);
      }
      invert(h) {
        const p = new f();
        return (
          this.reduce((g, v) => {
            if (v.insert) p.delete(o.default.length(v));
            else {
              if (typeof v.retain == "number" && v.attributes == null)
                return p.retain(v.retain), g + v.retain;
              if (v.delete || typeof v.retain == "number") {
                const E = v.delete || v.retain;
                return (
                  h.slice(g, g + E).forEach((A) => {
                    v.delete
                      ? p.push(A)
                      : v.retain &&
                        v.attributes &&
                        p.retain(
                          o.default.length(A),
                          s.default.invert(v.attributes, A.attributes)
                        );
                  }),
                  g + E
                );
              } else if (typeof v.retain == "object" && v.retain !== null) {
                const E = h.slice(g, g + 1),
                  x = new a.default(E.ops).next(),
                  [A, T, C] = c(v.retain, x.insert),
                  q = f.getHandler(A);
                return (
                  p.retain(
                    { [A]: q.invert(T, C) },
                    s.default.invert(v.attributes, x.attributes)
                  ),
                  g + 1
                );
              }
            }
            return g;
          }, 0),
          p.chop()
        );
      }
      transform(h, p = !1) {
        if (((p = !!p), typeof h == "number"))
          return this.transformPosition(h, p);
        const g = h,
          v = new a.default(this.ops),
          E = new a.default(g.ops),
          x = new f();
        for (; v.hasNext() || E.hasNext(); )
          if (v.peekType() === "insert" && (p || E.peekType() !== "insert"))
            x.retain(o.default.length(v.next()));
          else if (E.peekType() === "insert") x.push(E.next());
          else {
            const A = Math.min(v.peekLength(), E.peekLength()),
              T = v.next(A),
              C = E.next(A);
            if (T.delete) continue;
            if (C.delete) x.push(C);
            else {
              const q = T.retain,
                P = C.retain;
              let W = typeof P == "object" && P !== null ? P : A;
              if (
                typeof q == "object" &&
                q !== null &&
                typeof P == "object" &&
                P !== null
              ) {
                const at = Object.keys(q)[0];
                if (at === Object.keys(P)[0]) {
                  const Y = f.getHandler(at);
                  Y && (W = { [at]: Y.transform(q[at], P[at], p) });
                }
              }
              x.retain(W, s.default.transform(T.attributes, C.attributes, p));
            }
          }
        return x.chop();
      }
      transformPosition(h, p = !1) {
        p = !!p;
        const g = new a.default(this.ops);
        let v = 0;
        for (; g.hasNext() && v <= h; ) {
          const E = g.peekLength(),
            x = g.peekType();
          if ((g.next(), x === "delete")) {
            h -= Math.min(E, h - v);
            continue;
          } else x === "insert" && (v < h || !p) && (h += E);
          v += E;
        }
        return h;
      }
    }
    (f.Op = o.default),
      (f.OpIterator = a.default),
      (f.AttributeMap = s.default),
      (f.handlers = {}),
      (t.default = f),
      (e.exports = f),
      (e.exports.default = f);
  })(Fc, Fc.exports);
  var tn = Fc.exports;
  const Q = pm(tn);
  class Sn extends Ge {
    static value() {}
    optimize() {
      (this.prev || this.next) && this.remove();
    }
    length() {
      return 0;
    }
    value() {
      return "";
    }
  }
  Sn.blotName = "break";
  Sn.tagName = "BR";
  let yn = class extends ma {};
  const Mx = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  function ja(e) {
    return e.replace(/[&<>"']/g, (t) => Mx[t]);
  }
  const kn = class kn extends Nu {
    static compare(t, n) {
      const r = kn.order.indexOf(t),
        i = kn.order.indexOf(n);
      return r >= 0 || i >= 0 ? r - i : t === n ? 0 : t < n ? -1 : 1;
    }
    formatAt(t, n, r, i) {
      if (
        kn.compare(this.statics.blotName, r) < 0 &&
        this.scroll.query(r, tt.BLOT)
      ) {
        const s = this.isolate(t, n);
        i && s.wrap(r, i);
      } else super.formatAt(t, n, r, i);
    }
    optimize(t) {
      if (
        (super.optimize(t),
        this.parent instanceof kn &&
          kn.compare(this.statics.blotName, this.parent.statics.blotName) > 0)
      ) {
        const n = this.parent.isolate(this.offset(), this.length());
        this.moveChildren(n), n.wrap(this);
      }
    }
  };
  G(kn, "allowedChildren", [kn, Sn, Ge, yn]),
    G(kn, "order", [
      "cursor",
      "inline",
      "link",
      "underline",
      "strike",
      "italic",
      "bold",
      "script",
      "code",
    ]);
  let Bn = kn;
  const yd = 1;
  class de extends Vs {
    constructor() {
      super(...arguments);
      G(this, "cache", {});
    }
    delta() {
      return (
        this.cache.delta == null && (this.cache.delta = Em(this)),
        this.cache.delta
      );
    }
    deleteAt(n, r) {
      super.deleteAt(n, r), (this.cache = {});
    }
    formatAt(n, r, i, s) {
      r <= 0 ||
        (this.scroll.query(i, tt.BLOCK)
          ? n + r === this.length() && this.format(i, s)
          : super.formatAt(n, Math.min(r, this.length() - n - 1), i, s),
        (this.cache = {}));
    }
    insertAt(n, r, i) {
      if (i != null) {
        super.insertAt(n, r, i), (this.cache = {});
        return;
      }
      if (r.length === 0) return;
      const s = r.split(`
`),
        o = s.shift();
      o.length > 0 &&
        (n < this.length() - 1 || this.children.tail == null
          ? super.insertAt(Math.min(n, this.length() - 1), o)
          : this.children.tail.insertAt(this.children.tail.length(), o),
        (this.cache = {}));
      let a = this;
      s.reduce(
        (l, c) => ((a = a.split(l, !0)), a.insertAt(0, c), c.length),
        n + o.length
      );
    }
    insertBefore(n, r) {
      const { head: i } = this.children;
      super.insertBefore(n, r),
        i instanceof Sn && i.remove(),
        (this.cache = {});
    }
    length() {
      return (
        this.cache.length == null && (this.cache.length = super.length() + yd),
        this.cache.length
      );
    }
    moveChildren(n, r) {
      super.moveChildren(n, r), (this.cache = {});
    }
    optimize(n) {
      super.optimize(n), (this.cache = {});
    }
    path(n) {
      return super.path(n, !0);
    }
    removeChild(n) {
      super.removeChild(n), (this.cache = {});
    }
    split(n) {
      let r =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (r && (n === 0 || n >= this.length() - yd)) {
        const s = this.clone();
        return n === 0
          ? (this.parent.insertBefore(s, this), this)
          : (this.parent.insertBefore(s, this.next), s);
      }
      const i = super.split(n, r);
      return (this.cache = {}), i;
    }
  }
  de.blotName = "block";
  de.tagName = "P";
  de.defaultChild = Sn;
  de.allowedChildren = [Sn, Bn, Ge, yn];
  class Qe extends Ge {
    attach() {
      super.attach(), (this.attributes = new Ma(this.domNode));
    }
    delta() {
      return new Q().insert(this.value(), {
        ...this.formats(),
        ...this.attributes.values(),
      });
    }
    format(t, n) {
      const r = this.scroll.query(t, tt.BLOCK_ATTRIBUTE);
      r != null && this.attributes.attribute(r, n);
    }
    formatAt(t, n, r, i) {
      this.format(r, i);
    }
    insertAt(t, n, r) {
      if (r != null) {
        super.insertAt(t, n, r);
        return;
      }
      const i = n.split(`
`),
        s = i.pop(),
        o = i.map((l) => {
          const c = this.scroll.create(de.blotName);
          return c.insertAt(0, l), c;
        }),
        a = this.split(t);
      o.forEach((l) => {
        this.parent.insertBefore(l, a);
      }),
        s && this.parent.insertBefore(this.scroll.create("text", s), a);
    }
  }
  Qe.scope = tt.BLOCK_BLOT;
  function Em(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return e
      .descendants(ye)
      .reduce(
        (n, r) => (r.length() === 0 ? n : n.insert(r.value(), Ze(r, {}, t))),
        new Q()
      )
      .insert(
        `
`,
        Ze(e)
      );
  }
  function Ze(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    return e == null ||
      ("formats" in e &&
        typeof e.formats == "function" &&
        ((t = { ...t, ...e.formats() }), n && delete t["code-token"]),
      e.parent == null ||
        e.parent.statics.blotName === "scroll" ||
        e.parent.statics.scope !== e.statics.scope)
      ? t
      : Ze(e.parent, t, n);
  }
  const Ye = class Ye extends Ge {
    static value() {}
    constructor(t, n, r) {
      super(t, n),
        (this.selection = r),
        (this.textNode = document.createTextNode(Ye.CONTENTS)),
        this.domNode.appendChild(this.textNode),
        (this.savedLength = 0);
    }
    detach() {
      this.parent != null && this.parent.removeChild(this);
    }
    format(t, n) {
      if (this.savedLength !== 0) {
        super.format(t, n);
        return;
      }
      let r = this,
        i = 0;
      for (; r != null && r.statics.scope !== tt.BLOCK_BLOT; )
        (i += r.offset(r.parent)), (r = r.parent);
      r != null &&
        ((this.savedLength = Ye.CONTENTS.length),
        r.optimize(),
        r.formatAt(i, Ye.CONTENTS.length, t, n),
        (this.savedLength = 0));
    }
    index(t, n) {
      return t === this.textNode ? 0 : super.index(t, n);
    }
    length() {
      return this.savedLength;
    }
    position() {
      return [this.textNode, this.textNode.data.length];
    }
    remove() {
      super.remove(), (this.parent = null);
    }
    restore() {
      if (this.selection.composing || this.parent == null) return null;
      const t = this.selection.getNativeRange();
      for (
        ;
        this.domNode.lastChild != null &&
        this.domNode.lastChild !== this.textNode;

      )
        this.domNode.parentNode.insertBefore(
          this.domNode.lastChild,
          this.domNode
        );
      const n = this.prev instanceof yn ? this.prev : null,
        r = n ? n.length() : 0,
        i = this.next instanceof yn ? this.next : null,
        s = i ? i.text : "",
        { textNode: o } = this,
        a = o.data.split(Ye.CONTENTS).join("");
      o.data = Ye.CONTENTS;
      let l;
      if (n)
        (l = n), (a || i) && (n.insertAt(n.length(), a + s), i && i.remove());
      else if (i) (l = i), i.insertAt(0, a);
      else {
        const c = document.createTextNode(a);
        (l = this.scroll.create(c)), this.parent.insertBefore(l, this);
      }
      if ((this.remove(), t)) {
        const c = (h, p) =>
            n && h === n.domNode
              ? p
              : h === o
              ? r + p - 1
              : i && h === i.domNode
              ? r + a.length + p
              : null,
          f = c(t.start.node, t.start.offset),
          d = c(t.end.node, t.end.offset);
        if (f !== null && d !== null)
          return {
            startNode: l.domNode,
            startOffset: f,
            endNode: l.domNode,
            endOffset: d,
          };
      }
      return null;
    }
    update(t, n) {
      if (
        t.some((r) => r.type === "characterData" && r.target === this.textNode)
      ) {
        const r = this.restore();
        r && (n.range = r);
      }
    }
    optimize(t) {
      super.optimize(t);
      let { parent: n } = this;
      for (; n; ) {
        if (n.domNode.tagName === "A") {
          (this.savedLength = Ye.CONTENTS.length),
            n.isolate(this.offset(n), this.length()).unwrap(),
            (this.savedLength = 0);
          break;
        }
        n = n.parent;
      }
    }
    value() {
      return "";
    }
  };
  G(Ye, "blotName", "cursor"),
    G(Ye, "className", "ql-cursor"),
    G(Ye, "tagName", "span"),
    G(Ye, "CONTENTS", "\uFEFF");
  let Vi = Ye;
  var Sm = { exports: {} };
  (function (e) {
    var t = Object.prototype.hasOwnProperty,
      n = "~";
    function r() {}
    Object.create &&
      ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1));
    function i(l, c, f) {
      (this.fn = l), (this.context = c), (this.once = f || !1);
    }
    function s(l, c, f, d, h) {
      if (typeof f != "function")
        throw new TypeError("The listener must be a function");
      var p = new i(f, d || l, h),
        g = n ? n + c : c;
      return (
        l._events[g]
          ? l._events[g].fn
            ? (l._events[g] = [l._events[g], p])
            : l._events[g].push(p)
          : ((l._events[g] = p), l._eventsCount++),
        l
      );
    }
    function o(l, c) {
      --l._eventsCount === 0 ? (l._events = new r()) : delete l._events[c];
    }
    function a() {
      (this._events = new r()), (this._eventsCount = 0);
    }
    (a.prototype.eventNames = function () {
      var c = [],
        f,
        d;
      if (this._eventsCount === 0) return c;
      for (d in (f = this._events)) t.call(f, d) && c.push(n ? d.slice(1) : d);
      return Object.getOwnPropertySymbols
        ? c.concat(Object.getOwnPropertySymbols(f))
        : c;
    }),
      (a.prototype.listeners = function (c) {
        var f = n ? n + c : c,
          d = this._events[f];
        if (!d) return [];
        if (d.fn) return [d.fn];
        for (var h = 0, p = d.length, g = new Array(p); h < p; h++)
          g[h] = d[h].fn;
        return g;
      }),
      (a.prototype.listenerCount = function (c) {
        var f = n ? n + c : c,
          d = this._events[f];
        return d ? (d.fn ? 1 : d.length) : 0;
      }),
      (a.prototype.emit = function (c, f, d, h, p, g) {
        var v = n ? n + c : c;
        if (!this._events[v]) return !1;
        var E = this._events[v],
          x = arguments.length,
          A,
          T;
        if (E.fn) {
          switch ((E.once && this.removeListener(c, E.fn, void 0, !0), x)) {
            case 1:
              return E.fn.call(E.context), !0;
            case 2:
              return E.fn.call(E.context, f), !0;
            case 3:
              return E.fn.call(E.context, f, d), !0;
            case 4:
              return E.fn.call(E.context, f, d, h), !0;
            case 5:
              return E.fn.call(E.context, f, d, h, p), !0;
            case 6:
              return E.fn.call(E.context, f, d, h, p, g), !0;
          }
          for (T = 1, A = new Array(x - 1); T < x; T++) A[T - 1] = arguments[T];
          E.fn.apply(E.context, A);
        } else {
          var C = E.length,
            q;
          for (T = 0; T < C; T++)
            switch (
              (E[T].once && this.removeListener(c, E[T].fn, void 0, !0), x)
            ) {
              case 1:
                E[T].fn.call(E[T].context);
                break;
              case 2:
                E[T].fn.call(E[T].context, f);
                break;
              case 3:
                E[T].fn.call(E[T].context, f, d);
                break;
              case 4:
                E[T].fn.call(E[T].context, f, d, h);
                break;
              default:
                if (!A)
                  for (q = 1, A = new Array(x - 1); q < x; q++)
                    A[q - 1] = arguments[q];
                E[T].fn.apply(E[T].context, A);
            }
        }
        return !0;
      }),
      (a.prototype.on = function (c, f, d) {
        return s(this, c, f, d, !1);
      }),
      (a.prototype.once = function (c, f, d) {
        return s(this, c, f, d, !0);
      }),
      (a.prototype.removeListener = function (c, f, d, h) {
        var p = n ? n + c : c;
        if (!this._events[p]) return this;
        if (!f) return o(this, p), this;
        var g = this._events[p];
        if (g.fn)
          g.fn === f && (!h || g.once) && (!d || g.context === d) && o(this, p);
        else {
          for (var v = 0, E = [], x = g.length; v < x; v++)
            (g[v].fn !== f || (h && !g[v].once) || (d && g[v].context !== d)) &&
              E.push(g[v]);
          E.length ? (this._events[p] = E.length === 1 ? E[0] : E) : o(this, p);
        }
        return this;
      }),
      (a.prototype.removeAllListeners = function (c) {
        var f;
        return (
          c
            ? ((f = n ? n + c : c), this._events[f] && o(this, f))
            : ((this._events = new r()), (this._eventsCount = 0)),
          this
        );
      }),
      (a.prototype.off = a.prototype.removeListener),
      (a.prototype.addListener = a.prototype.on),
      (a.prefixed = n),
      (a.EventEmitter = a),
      (e.exports = a);
  })(Sm);
  var Px = Sm.exports;
  const Bx = pm(Px),
    Uc = new WeakMap(),
    Hc = ["error", "warn", "log", "info"];
  let zc = "warn";
  function xm(e) {
    if (zc && Hc.indexOf(e) <= Hc.indexOf(zc)) {
      for (
        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
        r < t;
        r++
      )
        n[r - 1] = arguments[r];
      console[e](...n);
    }
  }
  function lr(e) {
    return Hc.reduce((t, n) => ((t[n] = xm.bind(console, n, e)), t), {});
  }
  lr.level = (e) => {
    zc = e;
  };
  xm.level = lr.level;
  const Ql = lr("quill:events"),
    Fx = ["selectionchange", "mousedown", "mouseup", "click"];
  Fx.forEach((e) => {
    document.addEventListener(e, function () {
      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      Array.from(document.querySelectorAll(".ql-container")).forEach((i) => {
        const s = Uc.get(i);
        s && s.emitter && s.emitter.handleDOM(...n);
      });
    });
  });
  class X extends Bx {
    constructor() {
      super(), (this.domListeners = {}), this.on("error", Ql.error);
    }
    emit() {
      for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
        n[r] = arguments[r];
      return Ql.log.call(Ql, ...n), super.emit(...n);
    }
    handleDOM(t) {
      for (
        var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1;
        i < n;
        i++
      )
        r[i - 1] = arguments[i];
      (this.domListeners[t.type] || []).forEach((s) => {
        let { node: o, handler: a } = s;
        (t.target === o || o.contains(t.target)) && a(t, ...r);
      });
    }
    listenDOM(t, n, r) {
      this.domListeners[t] || (this.domListeners[t] = []),
        this.domListeners[t].push({ node: n, handler: r });
    }
  }
  G(X, "events", {
    EDITOR_CHANGE: "editor-change",
    SCROLL_BEFORE_UPDATE: "scroll-before-update",
    SCROLL_BLOT_MOUNT: "scroll-blot-mount",
    SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
    SCROLL_OPTIMIZE: "scroll-optimize",
    SCROLL_UPDATE: "scroll-update",
    SCROLL_EMBED_UPDATE: "scroll-embed-update",
    SELECTION_CHANGE: "selection-change",
    TEXT_CHANGE: "text-change",
    COMPOSITION_BEFORE_START: "composition-before-start",
    COMPOSITION_START: "composition-start",
    COMPOSITION_BEFORE_END: "composition-before-end",
    COMPOSITION_END: "composition-end",
  }),
    G(X, "sources", { API: "api", SILENT: "silent", USER: "user" });
  const tc = lr("quill:selection");
  class ti {
    constructor(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      (this.index = t), (this.length = n);
    }
  }
  class $x {
    constructor(t, n) {
      (this.emitter = n),
        (this.scroll = t),
        (this.composing = !1),
        (this.mouseDown = !1),
        (this.root = this.scroll.domNode),
        (this.cursor = this.scroll.create("cursor", this)),
        (this.savedRange = new ti(0, 0)),
        (this.lastRange = this.savedRange),
        (this.lastNative = null),
        this.handleComposition(),
        this.handleDragging(),
        this.emitter.listenDOM("selectionchange", document, () => {
          !this.mouseDown &&
            !this.composing &&
            setTimeout(this.update.bind(this, X.sources.USER), 1);
        }),
        this.emitter.on(X.events.SCROLL_BEFORE_UPDATE, () => {
          if (!this.hasFocus()) return;
          const r = this.getNativeRange();
          r != null &&
            r.start.node !== this.cursor.textNode &&
            this.emitter.once(X.events.SCROLL_UPDATE, (i, s) => {
              try {
                this.root.contains(r.start.node) &&
                  this.root.contains(r.end.node) &&
                  this.setNativeRange(
                    r.start.node,
                    r.start.offset,
                    r.end.node,
                    r.end.offset
                  );
                const o = s.some(
                  (a) =>
                    a.type === "characterData" ||
                    a.type === "childList" ||
                    (a.type === "attributes" && a.target === this.root)
                );
                this.update(o ? X.sources.SILENT : i);
              } catch {}
            });
        }),
        this.emitter.on(X.events.SCROLL_OPTIMIZE, (r, i) => {
          if (i.range) {
            const {
              startNode: s,
              startOffset: o,
              endNode: a,
              endOffset: l,
            } = i.range;
            this.setNativeRange(s, o, a, l), this.update(X.sources.SILENT);
          }
        }),
        this.update(X.sources.SILENT);
    }
    handleComposition() {
      this.emitter.on(X.events.COMPOSITION_BEFORE_START, () => {
        this.composing = !0;
      }),
        this.emitter.on(X.events.COMPOSITION_END, () => {
          if (((this.composing = !1), this.cursor.parent)) {
            const t = this.cursor.restore();
            if (!t) return;
            setTimeout(() => {
              this.setNativeRange(
                t.startNode,
                t.startOffset,
                t.endNode,
                t.endOffset
              );
            }, 1);
          }
        });
    }
    handleDragging() {
      this.emitter.listenDOM("mousedown", document.body, () => {
        this.mouseDown = !0;
      }),
        this.emitter.listenDOM("mouseup", document.body, () => {
          (this.mouseDown = !1), this.update(X.sources.USER);
        });
    }
    focus() {
      this.hasFocus() ||
        (this.root.focus({ preventScroll: !0 }),
        this.setRange(this.savedRange));
    }
    format(t, n) {
      this.scroll.update();
      const r = this.getNativeRange();
      if (
        !(r == null || !r.native.collapsed || this.scroll.query(t, tt.BLOCK))
      ) {
        if (r.start.node !== this.cursor.textNode) {
          const i = this.scroll.find(r.start.node, !1);
          if (i == null) return;
          if (i instanceof ye) {
            const s = i.split(r.start.offset);
            i.parent.insertBefore(this.cursor, s);
          } else i.insertBefore(this.cursor, r.start.node);
          this.cursor.attach();
        }
        this.cursor.format(t, n),
          this.scroll.optimize(),
          this.setNativeRange(
            this.cursor.textNode,
            this.cursor.textNode.data.length
          ),
          this.update();
      }
    }
    getBounds(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      const r = this.scroll.length();
      (t = Math.min(t, r - 1)), (n = Math.min(t + n, r - 1) - t);
      let i,
        [s, o] = this.scroll.leaf(t);
      if (s == null) return null;
      if (n > 0 && o === s.length()) {
        const [f] = this.scroll.leaf(t + 1);
        if (f) {
          const [d] = this.scroll.line(t),
            [h] = this.scroll.line(t + 1);
          d === h && ((s = f), (o = 0));
        }
      }
      [i, o] = s.position(o, !0);
      const a = document.createRange();
      if (n > 0)
        return (
          a.setStart(i, o),
          ([s, o] = this.scroll.leaf(t + n)),
          s == null
            ? null
            : (([i, o] = s.position(o, !0)),
              a.setEnd(i, o),
              a.getBoundingClientRect())
        );
      let l = "left",
        c;
      if (i instanceof Text) {
        if (!i.data.length) return null;
        o < i.data.length
          ? (a.setStart(i, o), a.setEnd(i, o + 1))
          : (a.setStart(i, o - 1), a.setEnd(i, o), (l = "right")),
          (c = a.getBoundingClientRect());
      } else {
        if (!(s.domNode instanceof Element)) return null;
        (c = s.domNode.getBoundingClientRect()), o > 0 && (l = "right");
      }
      return {
        bottom: c.top + c.height,
        height: c.height,
        left: c[l],
        right: c[l],
        top: c.top,
        width: 0,
      };
    }
    getNativeRange() {
      const t = document.getSelection();
      if (t == null || t.rangeCount <= 0) return null;
      const n = t.getRangeAt(0);
      if (n == null) return null;
      const r = this.normalizeNative(n);
      return tc.info("getNativeRange", r), r;
    }
    getRange() {
      const t = this.scroll.domNode;
      if ("isConnected" in t && !t.isConnected) return [null, null];
      const n = this.getNativeRange();
      return n == null ? [null, null] : [this.normalizedToRange(n), n];
    }
    hasFocus() {
      return (
        document.activeElement === this.root ||
        (document.activeElement != null &&
          ec(this.root, document.activeElement))
      );
    }
    normalizedToRange(t) {
      const n = [[t.start.node, t.start.offset]];
      t.native.collapsed || n.push([t.end.node, t.end.offset]);
      const r = n.map((o) => {
          const [a, l] = o,
            c = this.scroll.find(a, !0),
            f = c.offset(this.scroll);
          return l === 0
            ? f
            : c instanceof ye
            ? f + c.index(a, l)
            : f + c.length();
        }),
        i = Math.min(Math.max(...r), this.scroll.length() - 1),
        s = Math.min(i, ...r);
      return new ti(s, i - s);
    }
    normalizeNative(t) {
      if (
        !ec(this.root, t.startContainer) ||
        (!t.collapsed && !ec(this.root, t.endContainer))
      )
        return null;
      const n = {
        start: { node: t.startContainer, offset: t.startOffset },
        end: { node: t.endContainer, offset: t.endOffset },
        native: t,
      };
      return (
        [n.start, n.end].forEach((r) => {
          let { node: i, offset: s } = r;
          for (; !(i instanceof Text) && i.childNodes.length > 0; )
            if (i.childNodes.length > s) (i = i.childNodes[s]), (s = 0);
            else if (i.childNodes.length === s)
              (i = i.lastChild),
                i instanceof Text
                  ? (s = i.data.length)
                  : i.childNodes.length > 0
                  ? (s = i.childNodes.length)
                  : (s = i.childNodes.length + 1);
            else break;
          (r.node = i), (r.offset = s);
        }),
        n
      );
    }
    rangeToNative(t) {
      const n = this.scroll.length(),
        r = (i, s) => {
          i = Math.min(n - 1, i);
          const [o, a] = this.scroll.leaf(i);
          return o ? o.position(a, s) : [null, -1];
        };
      return [...r(t.index, !1), ...r(t.index + t.length, !0)];
    }
    setNativeRange(t, n) {
      let r =
          arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : t,
        i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : n,
        s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
      if (
        (tc.info("setNativeRange", t, n, r, i),
        t != null &&
          (this.root.parentNode == null ||
            t.parentNode == null ||
            r.parentNode == null))
      )
        return;
      const o = document.getSelection();
      if (o != null)
        if (t != null) {
          this.hasFocus() || this.root.focus({ preventScroll: !0 });
          const { native: a } = this.getNativeRange() || {};
          if (
            a == null ||
            s ||
            t !== a.startContainer ||
            n !== a.startOffset ||
            r !== a.endContainer ||
            i !== a.endOffset
          ) {
            t instanceof Element &&
              t.tagName === "BR" &&
              ((n = Array.from(t.parentNode.childNodes).indexOf(t)),
              (t = t.parentNode)),
              r instanceof Element &&
                r.tagName === "BR" &&
                ((i = Array.from(r.parentNode.childNodes).indexOf(r)),
                (r = r.parentNode));
            const l = document.createRange();
            l.setStart(t, n),
              l.setEnd(r, i),
              o.removeAllRanges(),
              o.addRange(l);
          }
        } else o.removeAllRanges(), this.root.blur();
    }
    setRange(t) {
      let n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
        r =
          arguments.length > 2 && arguments[2] !== void 0
            ? arguments[2]
            : X.sources.API;
      if (
        (typeof n == "string" && ((r = n), (n = !1)),
        tc.info("setRange", t),
        t != null)
      ) {
        const i = this.rangeToNative(t);
        this.setNativeRange(...i, n);
      } else this.setNativeRange(null);
      this.update(r);
    }
    update() {
      let t =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : X.sources.USER;
      const n = this.lastRange,
        [r, i] = this.getRange();
      if (
        ((this.lastRange = r),
        (this.lastNative = i),
        this.lastRange != null && (this.savedRange = this.lastRange),
        !Cu(n, this.lastRange))
      ) {
        if (
          !this.composing &&
          i != null &&
          i.native.collapsed &&
          i.start.node !== this.cursor.textNode
        ) {
          const o = this.cursor.restore();
          o &&
            this.setNativeRange(
              o.startNode,
              o.startOffset,
              o.endNode,
              o.endOffset
            );
        }
        const s = [X.events.SELECTION_CHANGE, Bi(this.lastRange), Bi(n), t];
        this.emitter.emit(X.events.EDITOR_CHANGE, ...s),
          t !== X.sources.SILENT && this.emitter.emit(...s);
      }
    }
  }
  function ec(e, t) {
    try {
      t.parentNode;
    } catch {
      return !1;
    }
    return e.contains(t);
  }
  const jx = /^[ -~]*$/;
  class Ux {
    constructor(t) {
      (this.scroll = t), (this.delta = this.getDelta());
    }
    applyDelta(t) {
      this.scroll.update();
      let n = this.scroll.length();
      this.scroll.batchStart();
      const r = wd(t),
        i = new Q();
      return (
        zx(r.ops.slice()).reduce((o, a) => {
          const l = tn.Op.length(a);
          let c = a.attributes || {},
            f = !1,
            d = !1;
          if (a.insert != null) {
            if ((i.retain(l), typeof a.insert == "string")) {
              const g = a.insert;
              (d =
                !g.endsWith(`
`) &&
                (n <= o || !!this.scroll.descendant(Qe, o)[0])),
                this.scroll.insertAt(o, g);
              const [v, E] = this.scroll.line(o);
              let x = Nr({}, Ze(v));
              if (v instanceof de) {
                const [A] = v.descendant(ye, E);
                A && (x = Nr(x, Ze(A)));
              }
              c = tn.AttributeMap.diff(x, c) || {};
            } else if (typeof a.insert == "object") {
              const g = Object.keys(a.insert)[0];
              if (g == null) return o;
              const v = this.scroll.query(g, tt.INLINE) != null;
              if (v) (n <= o || this.scroll.descendant(Qe, o)[0]) && (d = !0);
              else if (o > 0) {
                const [E, x] = this.scroll.descendant(ye, o - 1);
                E instanceof yn
                  ? E.value()[x] !==
                      `
` && (f = !0)
                  : E instanceof Ge &&
                    E.statics.scope === tt.INLINE_BLOT &&
                    (f = !0);
              }
              if ((this.scroll.insertAt(o, g, a.insert[g]), v)) {
                const [E] = this.scroll.descendant(ye, o);
                if (E) {
                  const x = Nr({}, Ze(E));
                  c = tn.AttributeMap.diff(x, c) || {};
                }
              }
            }
            n += l;
          } else if (
            (i.push(a), a.retain !== null && typeof a.retain == "object")
          ) {
            const g = Object.keys(a.retain)[0];
            if (g == null) return o;
            this.scroll.updateEmbedAt(o, g, a.retain[g]);
          }
          Object.keys(c).forEach((g) => {
            this.scroll.formatAt(o, l, g, c[g]);
          });
          const h = f ? 1 : 0,
            p = d ? 1 : 0;
          return (n += h + p), i.retain(h), i.delete(p), o + l + h + p;
        }, 0),
        i.reduce(
          (o, a) =>
            typeof a.delete == "number"
              ? (this.scroll.deleteAt(o, a.delete), o)
              : o + tn.Op.length(a),
          0
        ),
        this.scroll.batchEnd(),
        this.scroll.optimize(),
        this.update(r)
      );
    }
    deleteText(t, n) {
      return (
        this.scroll.deleteAt(t, n), this.update(new Q().retain(t).delete(n))
      );
    }
    formatLine(t, n) {
      let r =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      this.scroll.update(),
        Object.keys(r).forEach((s) => {
          this.scroll.lines(t, Math.max(n, 1)).forEach((o) => {
            o.format(s, r[s]);
          });
        }),
        this.scroll.optimize();
      const i = new Q().retain(t).retain(n, Bi(r));
      return this.update(i);
    }
    formatText(t, n) {
      let r =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      Object.keys(r).forEach((s) => {
        this.scroll.formatAt(t, n, s, r[s]);
      });
      const i = new Q().retain(t).retain(n, Bi(r));
      return this.update(i);
    }
    getContents(t, n) {
      return this.delta.slice(t, t + n);
    }
    getDelta() {
      return this.scroll.lines().reduce((t, n) => t.concat(n.delta()), new Q());
    }
    getFormat(t) {
      let n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
        r = [],
        i = [];
      n === 0
        ? this.scroll.path(t).forEach((a) => {
            const [l] = a;
            l instanceof de ? r.push(l) : l instanceof ye && i.push(l);
          })
        : ((r = this.scroll.lines(t, n)),
          (i = this.scroll.descendants(ye, t, n)));
      const [s, o] = [r, i].map((a) => {
        const l = a.shift();
        if (l == null) return {};
        let c = Ze(l);
        for (; Object.keys(c).length > 0; ) {
          const f = a.shift();
          if (f == null) return c;
          c = Hx(Ze(f), c);
        }
        return c;
      });
      return { ...s, ...o };
    }
    getHTML(t, n) {
      const [r, i] = this.scroll.line(t);
      if (r) {
        const s = r.length();
        return r.length() >= i + n && !(i === 0 && n === s)
          ? Gs(r, i, n, !0)
          : Gs(this.scroll, t, n, !0);
      }
      return "";
    }
    getText(t, n) {
      return this.getContents(t, n)
        .filter((r) => typeof r.insert == "string")
        .map((r) => r.insert)
        .join("");
    }
    insertContents(t, n) {
      const r = wd(n),
        i = new Q().retain(t).concat(r);
      return this.scroll.insertContents(t, r), this.update(i);
    }
    insertEmbed(t, n, r) {
      return (
        this.scroll.insertAt(t, n, r),
        this.update(new Q().retain(t).insert({ [n]: r }))
      );
    }
    insertText(t, n) {
      let r =
        arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return (
        (n = n
          .replace(
            /\r\n/g,
            `
`
          )
          .replace(
            /\r/g,
            `
`
          )),
        this.scroll.insertAt(t, n),
        Object.keys(r).forEach((i) => {
          this.scroll.formatAt(t, n.length, i, r[i]);
        }),
        this.update(new Q().retain(t).insert(n, Bi(r)))
      );
    }
    isBlank() {
      if (this.scroll.children.length === 0) return !0;
      if (this.scroll.children.length > 1) return !1;
      const t = this.scroll.children.head;
      if ((t == null ? void 0 : t.statics.blotName) !== de.blotName) return !1;
      const n = t;
      return n.children.length > 1 ? !1 : n.children.head instanceof Sn;
    }
    removeFormat(t, n) {
      const r = this.getText(t, n),
        [i, s] = this.scroll.line(t + n);
      let o = 0,
        a = new Q();
      i != null &&
        ((o = i.length() - s),
        (a = i.delta().slice(s, s + o - 1).insert(`
`)));
      const c = this.getContents(t, n + o).diff(new Q().insert(r).concat(a)),
        f = new Q().retain(t).concat(c);
      return this.applyDelta(f);
    }
    update(t) {
      let n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
        r =
          arguments.length > 2 && arguments[2] !== void 0
            ? arguments[2]
            : void 0;
      const i = this.delta;
      if (
        n.length === 1 &&
        n[0].type === "characterData" &&
        n[0].target.data.match(jx) &&
        this.scroll.find(n[0].target)
      ) {
        const s = this.scroll.find(n[0].target),
          o = Ze(s),
          a = s.offset(this.scroll),
          l = n[0].oldValue.replace(Vi.CONTENTS, ""),
          c = new Q().insert(l),
          f = new Q().insert(s.value()),
          d = r && {
            oldRange: Ed(r.oldRange, -a),
            newRange: Ed(r.newRange, -a),
          };
        (t = new Q()
          .retain(a)
          .concat(c.diff(f, d))
          .reduce(
            (p, g) => (g.insert ? p.insert(g.insert, o) : p.push(g)),
            new Q()
          )),
          (this.delta = i.compose(t));
      } else
        (this.delta = this.getDelta()),
          (!t || !Cu(i.compose(t), this.delta)) && (t = i.diff(this.delta, r));
      return t;
    }
  }
  function _i(e, t, n) {
    if (e.length === 0) {
      const [p] = nc(n.pop());
      return t <= 0 ? `</li></${p}>` : `</li></${p}>${_i([], t - 1, n)}`;
    }
    const [{ child: r, offset: i, length: s, indent: o, type: a }, ...l] = e,
      [c, f] = nc(a);
    if (o > t)
      return (
        n.push(a),
        o === t + 1
          ? `<${c}><li${f}>${Gs(r, i, s)}${_i(l, o, n)}`
          : `<${c}><li>${_i(e, t + 1, n)}`
      );
    const d = n[n.length - 1];
    if (o === t && a === d) return `</li><li${f}>${Gs(r, i, s)}${_i(l, o, n)}`;
    const [h] = nc(n.pop());
    return `</li></${h}>${_i(e, t - 1, n)}`;
  }
  function Gs(e, t, n) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    if ("html" in e && typeof e.html == "function") return e.html(t, n);
    if (e instanceof yn)
      return ja(e.value().slice(t, t + n)).replaceAll(" ", "&nbsp;");
    if (e instanceof gn) {
      if (e.statics.blotName === "list-container") {
        const c = [];
        return (
          e.children.forEachAt(t, n, (f, d, h) => {
            const p =
              "formats" in f && typeof f.formats == "function"
                ? f.formats()
                : {};
            c.push({
              child: f,
              offset: d,
              length: h,
              indent: p.indent || 0,
              type: p.list,
            });
          }),
          _i(c, -1, [])
        );
      }
      const i = [];
      if (
        (e.children.forEachAt(t, n, (c, f, d) => {
          i.push(Gs(c, f, d));
        }),
        r || e.statics.blotName === "list")
      )
        return i.join("");
      const { outerHTML: s, innerHTML: o } = e.domNode,
        [a, l] = s.split(`>${o}<`);
      return a === "<table"
        ? `<table style="border: 1px solid #000;">${i.join("")}<${l}`
        : `${a}>${i.join("")}<${l}`;
    }
    return e.domNode instanceof Element ? e.domNode.outerHTML : "";
  }
  function Hx(e, t) {
    return Object.keys(t).reduce((n, r) => {
      if (e[r] == null) return n;
      const i = t[r];
      return (
        i === e[r]
          ? (n[r] = i)
          : Array.isArray(i)
          ? i.indexOf(e[r]) < 0
            ? (n[r] = i.concat([e[r]]))
            : (n[r] = i)
          : (n[r] = [i, e[r]]),
        n
      );
    }, {});
  }
  function nc(e) {
    const t = e === "ordered" ? "ol" : "ul";
    switch (e) {
      case "checked":
        return [t, ' data-list="checked"'];
      case "unchecked":
        return [t, ' data-list="unchecked"'];
      default:
        return [t, ""];
    }
  }
  function wd(e) {
    return e.reduce((t, n) => {
      if (typeof n.insert == "string") {
        const r = n.insert
          .replace(
            /\r\n/g,
            `
`
          )
          .replace(
            /\r/g,
            `
`
          );
        return t.insert(r, n.attributes);
      }
      return t.push(n);
    }, new Q());
  }
  function Ed(e, t) {
    let { index: n, length: r } = e;
    return new ti(n + t, r);
  }
  function zx(e) {
    const t = [];
    return (
      e.forEach((n) => {
        typeof n.insert == "string"
          ? n.insert
              .split(
                `
`
              )
              .forEach((i, s) => {
                s &&
                  t.push({
                    insert: `
`,
                    attributes: n.attributes,
                  }),
                  i && t.push({ insert: i, attributes: n.attributes });
              })
          : t.push(n);
      }),
      t
    );
  }
  class xn {
    constructor(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (this.quill = t), (this.options = n);
    }
  }
  G(xn, "DEFAULTS", {});
  const Oo = "\uFEFF";
  class Ru extends Ge {
    constructor(t, n) {
      super(t, n),
        (this.contentNode = document.createElement("span")),
        this.contentNode.setAttribute("contenteditable", "false"),
        Array.from(this.domNode.childNodes).forEach((r) => {
          this.contentNode.appendChild(r);
        }),
        (this.leftGuard = document.createTextNode(Oo)),
        (this.rightGuard = document.createTextNode(Oo)),
        this.domNode.appendChild(this.leftGuard),
        this.domNode.appendChild(this.contentNode),
        this.domNode.appendChild(this.rightGuard);
    }
    index(t, n) {
      return t === this.leftGuard
        ? 0
        : t === this.rightGuard
        ? 1
        : super.index(t, n);
    }
    restore(t) {
      let n = null,
        r;
      const i = t.data.split(Oo).join("");
      if (t === this.leftGuard)
        if (this.prev instanceof yn) {
          const s = this.prev.length();
          this.prev.insertAt(s, i),
            (n = { startNode: this.prev.domNode, startOffset: s + i.length });
        } else
          (r = document.createTextNode(i)),
            this.parent.insertBefore(this.scroll.create(r), this),
            (n = { startNode: r, startOffset: i.length });
      else
        t === this.rightGuard &&
          (this.next instanceof yn
            ? (this.next.insertAt(0, i),
              (n = { startNode: this.next.domNode, startOffset: i.length }))
            : ((r = document.createTextNode(i)),
              this.parent.insertBefore(this.scroll.create(r), this.next),
              (n = { startNode: r, startOffset: i.length })));
      return (t.data = Oo), n;
    }
    update(t, n) {
      t.forEach((r) => {
        if (
          r.type === "characterData" &&
          (r.target === this.leftGuard || r.target === this.rightGuard)
        ) {
          const i = this.restore(r.target);
          i && (n.range = i);
        }
      });
    }
  }
  class Vx {
    constructor(t, n) {
      G(this, "isComposing", !1);
      (this.scroll = t), (this.emitter = n), this.setupListeners();
    }
    setupListeners() {
      this.scroll.domNode.addEventListener("compositionstart", (t) => {
        this.isComposing || this.handleCompositionStart(t);
      }),
        this.scroll.domNode.addEventListener("compositionend", (t) => {
          this.isComposing &&
            queueMicrotask(() => {
              this.handleCompositionEnd(t);
            });
        });
    }
    handleCompositionStart(t) {
      const n =
        t.target instanceof Node ? this.scroll.find(t.target, !0) : null;
      n &&
        !(n instanceof Ru) &&
        (this.emitter.emit(X.events.COMPOSITION_BEFORE_START, t),
        this.scroll.batchStart(),
        this.emitter.emit(X.events.COMPOSITION_START, t),
        (this.isComposing = !0));
    }
    handleCompositionEnd(t) {
      this.emitter.emit(X.events.COMPOSITION_BEFORE_END, t),
        this.scroll.batchEnd(),
        this.emitter.emit(X.events.COMPOSITION_END, t),
        (this.isComposing = !1);
    }
  }
  const qs = class qs {
    constructor(t, n) {
      G(this, "modules", {});
      (this.quill = t), (this.options = n);
    }
    init() {
      Object.keys(this.options.modules).forEach((t) => {
        this.modules[t] == null && this.addModule(t);
      });
    }
    addModule(t) {
      const n = this.quill.constructor.import(`modules/${t}`);
      return (
        (this.modules[t] = new n(this.quill, this.options.modules[t] || {})),
        this.modules[t]
      );
    }
  };
  G(qs, "DEFAULTS", { modules: {} }), G(qs, "themes", { default: qs });
  let Ki = qs;
  const Kx = (e) => e.parentElement || e.getRootNode().host || null,
    Gx = (e) => {
      const t = e.getBoundingClientRect(),
        n = ("offsetWidth" in e && Math.abs(t.width) / e.offsetWidth) || 1,
        r = ("offsetHeight" in e && Math.abs(t.height) / e.offsetHeight) || 1;
      return {
        top: t.top,
        right: t.left + e.clientWidth * n,
        bottom: t.top + e.clientHeight * r,
        left: t.left,
      };
    },
    Lo = (e) => {
      const t = parseInt(e, 10);
      return Number.isNaN(t) ? 0 : t;
    },
    Sd = (e, t, n, r, i, s) =>
      e < n && t > r
        ? 0
        : e < n
        ? -(n - e + i)
        : t > r
        ? t - e > r - n
          ? e + i - n
          : t - r + s
        : 0,
    Wx = (e, t) => {
      var s, o, a;
      const n = e.ownerDocument;
      let r = t,
        i = e;
      for (; i; ) {
        const l = i === n.body,
          c = l
            ? {
                top: 0,
                right:
                  ((s = window.visualViewport) == null ? void 0 : s.width) ??
                  n.documentElement.clientWidth,
                bottom:
                  ((o = window.visualViewport) == null ? void 0 : o.height) ??
                  n.documentElement.clientHeight,
                left: 0,
              }
            : Gx(i),
          f = getComputedStyle(i),
          d = Sd(
            r.left,
            r.right,
            c.left,
            c.right,
            Lo(f.scrollPaddingLeft),
            Lo(f.scrollPaddingRight)
          ),
          h = Sd(
            r.top,
            r.bottom,
            c.top,
            c.bottom,
            Lo(f.scrollPaddingTop),
            Lo(f.scrollPaddingBottom)
          );
        if (d || h)
          if (l) (a = n.defaultView) == null || a.scrollBy(d, h);
          else {
            const { scrollLeft: p, scrollTop: g } = i;
            h && (i.scrollTop += h), d && (i.scrollLeft += d);
            const v = i.scrollLeft - p,
              E = i.scrollTop - g;
            r = {
              left: r.left - v,
              top: r.top - E,
              right: r.right - v,
              bottom: r.bottom - E,
            };
          }
        i = l || f.position === "fixed" ? null : Kx(i);
      }
    },
    Yx = 100,
    Xx = ["block", "break", "cursor", "inline", "scroll", "text"],
    Zx = (e, t, n) => {
      const r = new zi();
      return (
        Xx.forEach((i) => {
          const s = t.query(i);
          s && r.register(s);
        }),
        e.forEach((i) => {
          let s = t.query(i);
          s ||
            n.error(
              `Cannot register "${i}" specified in "formats" config. Are you sure it was registered?`
            );
          let o = 0;
          for (; s; )
            if (
              (r.register(s),
              (s = "blotName" in s ? s.requiredContainer ?? null : null),
              (o += 1),
              o > Yx)
            ) {
              n.error(
                `Cycle detected in registering blot requiredContainer: "${i}"`
              );
              break;
            }
        }),
        r
      );
    },
    $i = lr("quill"),
    qo = new zi();
  gn.uiClass = "ql-ui";
  const cn = class cn {
    static debug(t) {
      t === !0 && (t = "log"), lr.level(t);
    }
    static find(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      return Uc.get(t) || qo.find(t, n);
    }
    static import(t) {
      return (
        this.imports[t] == null &&
          $i.error(`Cannot import ${t}. Are you sure it was registered?`),
        this.imports[t]
      );
    }
    static register() {
      if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) != "string") {
        const t = arguments.length <= 0 ? void 0 : arguments[0],
          n = !!(!(arguments.length <= 1) && arguments[1]),
          r = "attrName" in t ? t.attrName : t.blotName;
        typeof r == "string"
          ? this.register(`formats/${r}`, t, n)
          : Object.keys(t).forEach((i) => {
              this.register(i, t[i], n);
            });
      } else {
        const t = arguments.length <= 0 ? void 0 : arguments[0],
          n = arguments.length <= 1 ? void 0 : arguments[1],
          r = !!(!(arguments.length <= 2) && arguments[2]);
        this.imports[t] != null && !r && $i.warn(`Overwriting ${t} with`, n),
          (this.imports[t] = n),
          (t.startsWith("blots/") || t.startsWith("formats/")) &&
            n &&
            typeof n != "boolean" &&
            n.blotName !== "abstract" &&
            qo.register(n),
          typeof n.register == "function" && n.register(qo);
      }
    }
    constructor(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (
        ((this.options = Jx(t, n)),
        (this.container = this.options.container),
        this.container == null)
      ) {
        $i.error("Invalid Quill container", t);
        return;
      }
      this.options.debug && cn.debug(this.options.debug);
      const r = this.container.innerHTML.trim();
      this.container.classList.add("ql-container"),
        (this.container.innerHTML = ""),
        Uc.set(this.container, this),
        (this.root = this.addContainer("ql-editor")),
        this.root.classList.add("ql-blank"),
        (this.emitter = new X());
      const i = Iu.blotName,
        s = this.options.registry.query(i);
      if (!s || !("blotName" in s))
        throw new Error(`Cannot initialize Quill without "${i}" blot`);
      if (
        ((this.scroll = new s(this.options.registry, this.root, {
          emitter: this.emitter,
        })),
        (this.editor = new Ux(this.scroll)),
        (this.selection = new $x(this.scroll, this.emitter)),
        (this.composition = new Vx(this.scroll, this.emitter)),
        (this.theme = new this.options.theme(this, this.options)),
        (this.keyboard = this.theme.addModule("keyboard")),
        (this.clipboard = this.theme.addModule("clipboard")),
        (this.history = this.theme.addModule("history")),
        (this.uploader = this.theme.addModule("uploader")),
        this.theme.addModule("input"),
        this.theme.addModule("uiNode"),
        this.theme.init(),
        this.emitter.on(X.events.EDITOR_CHANGE, (o) => {
          o === X.events.TEXT_CHANGE &&
            this.root.classList.toggle("ql-blank", this.editor.isBlank());
        }),
        this.emitter.on(X.events.SCROLL_UPDATE, (o, a) => {
          const l = this.selection.lastRange,
            [c] = this.selection.getRange(),
            f = l && c ? { oldRange: l, newRange: c } : void 0;
          ln.call(this, () => this.editor.update(null, a, f), o);
        }),
        this.emitter.on(X.events.SCROLL_EMBED_UPDATE, (o, a) => {
          const l = this.selection.lastRange,
            [c] = this.selection.getRange(),
            f = l && c ? { oldRange: l, newRange: c } : void 0;
          ln.call(
            this,
            () => {
              const d = new Q()
                .retain(o.offset(this))
                .retain({ [o.statics.blotName]: a });
              return this.editor.update(d, [], f);
            },
            cn.sources.USER
          );
        }),
        r)
      ) {
        const o = this.clipboard.convert({
          html: `${r}<p><br></p>`,
          text: `
`,
        });
        this.setContents(o);
      }
      this.history.clear(),
        this.options.placeholder &&
          this.root.setAttribute("data-placeholder", this.options.placeholder),
        this.options.readOnly && this.disable(),
        (this.allowReadOnlyEdits = !1);
    }
    addContainer(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (typeof t == "string") {
        const r = t;
        (t = document.createElement("div")), t.classList.add(r);
      }
      return this.container.insertBefore(t, n), t;
    }
    blur() {
      this.selection.setRange(null);
    }
    deleteText(t, n, r) {
      return (
        ([t, n, , r] = Gn(t, n, r)),
        ln.call(this, () => this.editor.deleteText(t, n), r, t, -1 * n)
      );
    }
    disable() {
      this.enable(!1);
    }
    editReadOnly(t) {
      this.allowReadOnlyEdits = !0;
      const n = t();
      return (this.allowReadOnlyEdits = !1), n;
    }
    enable() {
      let t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      this.scroll.enable(t), this.container.classList.toggle("ql-disabled", !t);
    }
    focus() {
      let t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      this.selection.focus(), t.preventScroll || this.scrollSelectionIntoView();
    }
    format(t, n) {
      let r =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : X.sources.API;
      return ln.call(
        this,
        () => {
          const i = this.getSelection(!0);
          let s = new Q();
          if (i == null) return s;
          if (this.scroll.query(t, tt.BLOCK))
            s = this.editor.formatLine(i.index, i.length, { [t]: n });
          else {
            if (i.length === 0) return this.selection.format(t, n), s;
            s = this.editor.formatText(i.index, i.length, { [t]: n });
          }
          return this.setSelection(i, X.sources.SILENT), s;
        },
        r
      );
    }
    formatLine(t, n, r, i, s) {
      let o;
      return (
        ([t, n, o, s] = Gn(t, n, r, i, s)),
        ln.call(this, () => this.editor.formatLine(t, n, o), s, t, 0)
      );
    }
    formatText(t, n, r, i, s) {
      let o;
      return (
        ([t, n, o, s] = Gn(t, n, r, i, s)),
        ln.call(this, () => this.editor.formatText(t, n, o), s, t, 0)
      );
    }
    getBounds(t) {
      let n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
        r = null;
      if (
        (typeof t == "number"
          ? (r = this.selection.getBounds(t, n))
          : (r = this.selection.getBounds(t.index, t.length)),
        !r)
      )
        return null;
      const i = this.container.getBoundingClientRect();
      return {
        bottom: r.bottom - i.top,
        height: r.height,
        left: r.left - i.left,
        right: r.right - i.left,
        top: r.top - i.top,
        width: r.width,
      };
    }
    getContents() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
        n =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : this.getLength() - t;
      return ([t, n] = Gn(t, n)), this.editor.getContents(t, n);
    }
    getFormat() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : this.getSelection(!0),
        n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return typeof t == "number"
        ? this.editor.getFormat(t, n)
        : this.editor.getFormat(t.index, t.length);
    }
    getIndex(t) {
      return t.offset(this.scroll);
    }
    getLength() {
      return this.scroll.length();
    }
    getLeaf(t) {
      return this.scroll.leaf(t);
    }
    getLine(t) {
      return this.scroll.line(t);
    }
    getLines() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
        n =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : Number.MAX_VALUE;
      return typeof t != "number"
        ? this.scroll.lines(t.index, t.length)
        : this.scroll.lines(t, n);
    }
    getModule(t) {
      return this.theme.modules[t];
    }
    getSelection() {
      return (
        (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) &&
          this.focus(),
        this.update(),
        this.selection.getRange()[0]
      );
    }
    getSemanticHTML() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
        n = arguments.length > 1 ? arguments[1] : void 0;
      return (
        typeof t == "number" && (n = n ?? this.getLength() - t),
        ([t, n] = Gn(t, n)),
        this.editor.getHTML(t, n)
      );
    }
    getText() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
        n = arguments.length > 1 ? arguments[1] : void 0;
      return (
        typeof t == "number" && (n = n ?? this.getLength() - t),
        ([t, n] = Gn(t, n)),
        this.editor.getText(t, n)
      );
    }
    hasFocus() {
      return this.selection.hasFocus();
    }
    insertEmbed(t, n, r) {
      let i =
        arguments.length > 3 && arguments[3] !== void 0
          ? arguments[3]
          : cn.sources.API;
      return ln.call(this, () => this.editor.insertEmbed(t, n, r), i, t);
    }
    insertText(t, n, r, i, s) {
      let o;
      return (
        ([t, , o, s] = Gn(t, 0, r, i, s)),
        ln.call(this, () => this.editor.insertText(t, n, o), s, t, n.length)
      );
    }
    isEnabled() {
      return this.scroll.isEnabled();
    }
    off() {
      return this.emitter.off(...arguments);
    }
    on() {
      return this.emitter.on(...arguments);
    }
    once() {
      return this.emitter.once(...arguments);
    }
    removeFormat(t, n, r) {
      return (
        ([t, n, , r] = Gn(t, n, r)),
        ln.call(this, () => this.editor.removeFormat(t, n), r, t)
      );
    }
    scrollRectIntoView(t) {
      Wx(this.root, t);
    }
    scrollIntoView() {
      console.warn(
        "Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."
      ),
        this.scrollSelectionIntoView();
    }
    scrollSelectionIntoView() {
      const t = this.selection.lastRange,
        n = t && this.selection.getBounds(t.index, t.length);
      n && this.scrollRectIntoView(n);
    }
    setContents(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : X.sources.API;
      return ln.call(
        this,
        () => {
          t = new Q(t);
          const r = this.getLength(),
            i = this.editor.deleteText(0, r),
            s = this.editor.insertContents(0, t),
            o = this.editor.deleteText(this.getLength() - 1, 1);
          return i.compose(s).compose(o);
        },
        n
      );
    }
    setSelection(t, n, r) {
      t == null
        ? this.selection.setRange(null, n || cn.sources.API)
        : (([t, n, , r] = Gn(t, n, r)),
          this.selection.setRange(new ti(Math.max(0, t), n), r),
          r !== X.sources.SILENT && this.scrollSelectionIntoView());
    }
    setText(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : X.sources.API;
      const r = new Q().insert(t);
      return this.setContents(r, n);
    }
    update() {
      let t =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : X.sources.USER;
      const n = this.scroll.update(t);
      return this.selection.update(t), n;
    }
    updateContents(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : X.sources.API;
      return ln.call(
        this,
        () => ((t = new Q(t)), this.editor.applyDelta(t)),
        n,
        !0
      );
    }
  };
  G(cn, "DEFAULTS", {
    bounds: null,
    modules: { clipboard: !0, keyboard: !0, history: !0, uploader: !0 },
    placeholder: "",
    readOnly: !1,
    registry: qo,
    theme: "default",
  }),
    G(cn, "events", X.events),
    G(cn, "sources", X.sources),
    G(cn, "version", "2.0.3"),
    G(cn, "imports", {
      delta: Q,
      parchment: Sx,
      "core/module": xn,
      "core/theme": Ki,
    });
  let L = cn;
  function xd(e) {
    return typeof e == "string" ? document.querySelector(e) : e;
  }
  function rc(e) {
    return Object.entries(e ?? {}).reduce((t, n) => {
      let [r, i] = n;
      return { ...t, [r]: i === !0 ? {} : i };
    }, {});
  }
  function _d(e) {
    return Object.fromEntries(Object.entries(e).filter((t) => t[1] !== void 0));
  }
  function Jx(e, t) {
    const n = xd(e);
    if (!n) throw new Error("Invalid Quill container");
    const i =
      !t.theme || t.theme === L.DEFAULTS.theme
        ? Ki
        : L.import(`themes/${t.theme}`);
    if (!i) throw new Error(`Invalid theme ${t.theme}. Did you register it?`);
    const { modules: s, ...o } = L.DEFAULTS,
      { modules: a, ...l } = i.DEFAULTS;
    let c = rc(t.modules);
    c != null &&
      c.toolbar &&
      c.toolbar.constructor !== Object &&
      (c = { ...c, toolbar: { container: c.toolbar } });
    const f = Nr({}, rc(s), rc(a), c),
      d = { ...o, ..._d(l), ..._d(t) };
    let h = t.registry;
    return (
      h
        ? t.formats &&
          $i.warn('Ignoring "formats" option because "registry" is specified')
        : (h = t.formats ? Zx(t.formats, d.registry, $i) : d.registry),
      {
        ...d,
        registry: h,
        container: n,
        theme: i,
        modules: Object.entries(f).reduce((p, g) => {
          let [v, E] = g;
          if (!E) return p;
          const x = L.import(`modules/${v}`);
          return x == null
            ? ($i.error(
                `Cannot load ${v} module. Are you sure you registered it?`
              ),
              p)
            : { ...p, [v]: Nr({}, x.DEFAULTS || {}, E) };
        }, {}),
        bounds: xd(d.bounds),
      }
    );
  }
  function ln(e, t, n, r) {
    if (!this.isEnabled() && t === X.sources.USER && !this.allowReadOnlyEdits)
      return new Q();
    let i = n == null ? null : this.getSelection();
    const s = this.editor.delta,
      o = e();
    if (
      (i != null &&
        (n === !0 && (n = i.index),
        r == null ? (i = Ad(i, o, t)) : r !== 0 && (i = Ad(i, n, r, t)),
        this.setSelection(i, X.sources.SILENT)),
      o.length() > 0)
    ) {
      const a = [X.events.TEXT_CHANGE, o, s, t];
      this.emitter.emit(X.events.EDITOR_CHANGE, ...a),
        t !== X.sources.SILENT && this.emitter.emit(...a);
    }
    return o;
  }
  function Gn(e, t, n, r, i) {
    let s = {};
    return (
      typeof e.index == "number" && typeof e.length == "number"
        ? typeof t != "number"
          ? ((i = r), (r = n), (n = t), (t = e.length), (e = e.index))
          : ((t = e.length), (e = e.index))
        : typeof t != "number" && ((i = r), (r = n), (n = t), (t = 0)),
      typeof n == "object"
        ? ((s = n), (i = r))
        : typeof n == "string" && (r != null ? (s[n] = r) : (i = n)),
      (i = i || X.sources.API),
      [e, t, s, i]
    );
  }
  function Ad(e, t, n, r) {
    const i = typeof n == "number" ? n : 0;
    if (e == null) return null;
    let s, o;
    return (
      t && typeof t.transformPosition == "function"
        ? ([s, o] = [e.index, e.index + e.length].map((a) =>
            t.transformPosition(a, r !== X.sources.USER)
          ))
        : ([s, o] = [e.index, e.index + e.length].map((a) =>
            a < t || (a === t && r === X.sources.USER)
              ? a
              : i >= 0
              ? a + i
              : Math.max(t, a + i)
          )),
      new ti(s, o - s)
    );
  }
  class ii extends Pa {}
  function Td(e) {
    return e instanceof de || e instanceof Qe;
  }
  function Cd(e) {
    return typeof e.updateContent == "function";
  }
  class Ai extends Iu {
    constructor(t, n, r) {
      let { emitter: i } = r;
      super(t, n),
        (this.emitter = i),
        (this.batch = !1),
        this.optimize(),
        this.enable(),
        this.domNode.addEventListener("dragstart", (s) =>
          this.handleDragStart(s)
        );
    }
    batchStart() {
      Array.isArray(this.batch) || (this.batch = []);
    }
    batchEnd() {
      if (!this.batch) return;
      const t = this.batch;
      (this.batch = !1), this.update(t);
    }
    emitMount(t) {
      this.emitter.emit(X.events.SCROLL_BLOT_MOUNT, t);
    }
    emitUnmount(t) {
      this.emitter.emit(X.events.SCROLL_BLOT_UNMOUNT, t);
    }
    emitEmbedUpdate(t, n) {
      this.emitter.emit(X.events.SCROLL_EMBED_UPDATE, t, n);
    }
    deleteAt(t, n) {
      const [r, i] = this.line(t),
        [s] = this.line(t + n);
      if ((super.deleteAt(t, n), s != null && r !== s && i > 0)) {
        if (r instanceof Qe || s instanceof Qe) {
          this.optimize();
          return;
        }
        const o = s.children.head instanceof Sn ? null : s.children.head;
        r.moveChildren(s, o), r.remove();
      }
      this.optimize();
    }
    enable() {
      let t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
      this.domNode.setAttribute("contenteditable", t ? "true" : "false");
    }
    formatAt(t, n, r, i) {
      super.formatAt(t, n, r, i), this.optimize();
    }
    insertAt(t, n, r) {
      if (t >= this.length())
        if (r == null || this.scroll.query(n, tt.BLOCK) == null) {
          const i = this.scroll.create(this.statics.defaultChild.blotName);
          this.appendChild(i),
            r == null &&
            n.endsWith(`
`)
              ? i.insertAt(0, n.slice(0, -1), r)
              : i.insertAt(0, n, r);
        } else {
          const i = this.scroll.create(n, r);
          this.appendChild(i);
        }
      else super.insertAt(t, n, r);
      this.optimize();
    }
    insertBefore(t, n) {
      if (t.statics.scope === tt.INLINE_BLOT) {
        const r = this.scroll.create(this.statics.defaultChild.blotName);
        r.appendChild(t), super.insertBefore(r, n);
      } else super.insertBefore(t, n);
    }
    insertContents(t, n) {
      const r = this.deltaToRenderBlocks(
          n.concat(
            new Q().insert(`
`)
          )
        ),
        i = r.pop();
      if (i == null) return;
      this.batchStart();
      const s = r.shift();
      if (s) {
        const l =
            s.type === "block" &&
            (s.delta.length() === 0 ||
              (!this.descendant(Qe, t)[0] && t < this.length())),
          c =
            s.type === "block" ? s.delta : new Q().insert({ [s.key]: s.value });
        ic(this, t, c);
        const f = s.type === "block" ? 1 : 0,
          d = t + c.length() + f;
        l &&
          this.insertAt(
            d - 1,
            `
`
          );
        const h = Ze(this.line(t)[0]),
          p = tn.AttributeMap.diff(h, s.attributes) || {};
        Object.keys(p).forEach((g) => {
          this.formatAt(d - 1, 1, g, p[g]);
        }),
          (t = d);
      }
      let [o, a] = this.children.find(t);
      if (
        (r.length &&
          (o && ((o = o.split(a)), (a = 0)),
          r.forEach((l) => {
            if (l.type === "block") {
              const c = this.createBlock(l.attributes, o || void 0);
              ic(c, 0, l.delta);
            } else {
              const c = this.create(l.key, l.value);
              this.insertBefore(c, o || void 0),
                Object.keys(l.attributes).forEach((f) => {
                  c.format(f, l.attributes[f]);
                });
            }
          })),
        i.type === "block" && i.delta.length())
      ) {
        const l = o ? o.offset(o.scroll) + a : this.length();
        ic(this, l, i.delta);
      }
      this.batchEnd(), this.optimize();
    }
    isEnabled() {
      return this.domNode.getAttribute("contenteditable") === "true";
    }
    leaf(t) {
      const n = this.path(t).pop();
      if (!n) return [null, -1];
      const [r, i] = n;
      return r instanceof ye ? [r, i] : [null, -1];
    }
    line(t) {
      return t === this.length() ? this.line(t - 1) : this.descendant(Td, t);
    }
    lines() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0,
        n =
          arguments.length > 1 && arguments[1] !== void 0
            ? arguments[1]
            : Number.MAX_VALUE;
      const r = (i, s, o) => {
        let a = [],
          l = o;
        return (
          i.children.forEachAt(s, o, (c, f, d) => {
            Td(c) ? a.push(c) : c instanceof Pa && (a = a.concat(r(c, f, l))),
              (l -= d);
          }),
          a
        );
      };
      return r(this, t, n);
    }
    optimize() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
        n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      this.batch ||
        (super.optimize(t, n),
        t.length > 0 && this.emitter.emit(X.events.SCROLL_OPTIMIZE, t, n));
    }
    path(t) {
      return super.path(t).slice(1);
    }
    remove() {}
    update(t) {
      if (this.batch) {
        Array.isArray(t) && (this.batch = this.batch.concat(t));
        return;
      }
      let n = X.sources.USER;
      typeof t == "string" && (n = t),
        Array.isArray(t) || (t = this.observer.takeRecords()),
        (t = t.filter((r) => {
          let { target: i } = r;
          const s = this.find(i, !0);
          return s && !Cd(s);
        })),
        t.length > 0 && this.emitter.emit(X.events.SCROLL_BEFORE_UPDATE, n, t),
        super.update(t.concat([])),
        t.length > 0 && this.emitter.emit(X.events.SCROLL_UPDATE, n, t);
    }
    updateEmbedAt(t, n, r) {
      const [i] = this.descendant((s) => s instanceof Qe, t);
      i && i.statics.blotName === n && Cd(i) && i.updateContent(r);
    }
    handleDragStart(t) {
      t.preventDefault();
    }
    deltaToRenderBlocks(t) {
      const n = [];
      let r = new Q();
      return (
        t.forEach((i) => {
          const s = i == null ? void 0 : i.insert;
          if (s)
            if (typeof s == "string") {
              const o = s.split(`
`);
              o.slice(0, -1).forEach((l) => {
                r.insert(l, i.attributes),
                  n.push({
                    type: "block",
                    delta: r,
                    attributes: i.attributes ?? {},
                  }),
                  (r = new Q());
              });
              const a = o[o.length - 1];
              a && r.insert(a, i.attributes);
            } else {
              const o = Object.keys(s)[0];
              if (!o) return;
              this.query(o, tt.INLINE)
                ? r.push(i)
                : (r.length() &&
                    n.push({ type: "block", delta: r, attributes: {} }),
                  (r = new Q()),
                  n.push({
                    type: "blockEmbed",
                    key: o,
                    value: s[o],
                    attributes: i.attributes ?? {},
                  }));
            }
        }),
        r.length() && n.push({ type: "block", delta: r, attributes: {} }),
        n
      );
    }
    createBlock(t, n) {
      let r;
      const i = {};
      Object.entries(t).forEach((a) => {
        let [l, c] = a;
        this.query(l, tt.BLOCK & tt.BLOT) != null ? (r = l) : (i[l] = c);
      });
      const s = this.create(
        r || this.statics.defaultChild.blotName,
        r ? t[r] : void 0
      );
      this.insertBefore(s, n || void 0);
      const o = s.length();
      return (
        Object.entries(i).forEach((a) => {
          let [l, c] = a;
          s.formatAt(0, o, l, c);
        }),
        s
      );
    }
  }
  G(Ai, "blotName", "scroll"),
    G(Ai, "className", "ql-editor"),
    G(Ai, "tagName", "DIV"),
    G(Ai, "defaultChild", de),
    G(Ai, "allowedChildren", [de, Qe, ii]);
  function ic(e, t, n) {
    n.reduce((r, i) => {
      const s = tn.Op.length(i);
      let o = i.attributes || {};
      if (i.insert != null) {
        if (typeof i.insert == "string") {
          const a = i.insert;
          e.insertAt(r, a);
          const [l] = e.descendant(ye, r),
            c = Ze(l);
          o = tn.AttributeMap.diff(c, o) || {};
        } else if (typeof i.insert == "object") {
          const a = Object.keys(i.insert)[0];
          if (a == null) return r;
          if (
            (e.insertAt(r, a, i.insert[a]),
            e.scroll.query(a, tt.INLINE) != null)
          ) {
            const [c] = e.descendant(ye, r),
              f = Ze(c);
            o = tn.AttributeMap.diff(f, o) || {};
          }
        }
      }
      return (
        Object.keys(o).forEach((a) => {
          e.formatAt(r, s, a, o[a]);
        }),
        r + s
      );
    }, t);
  }
  const Du = { scope: tt.BLOCK, whitelist: ["right", "center", "justify"] },
    Qx = new Pn("align", "align", Du),
    _m = new En("align", "ql-align", Du),
    Am = new Rr("align", "text-align", Du);
  class Tm extends Rr {
    value(t) {
      let n = super.value(t);
      return n.startsWith("rgb(")
        ? ((n = n.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "")),
          `#${n
            .split(",")
            .map((i) => `00${parseInt(i, 10).toString(16)}`.slice(-2))
            .join("")}`)
        : n;
    }
  }
  const t_ = new En("color", "ql-color", { scope: tt.INLINE }),
    Mu = new Tm("color", "color", { scope: tt.INLINE }),
    e_ = new En("background", "ql-bg", { scope: tt.INLINE }),
    Pu = new Tm("background", "background-color", { scope: tt.INLINE });
  class si extends ii {
    static create(t) {
      const n = super.create(t);
      return n.setAttribute("spellcheck", "false"), n;
    }
    code(t, n) {
      return this.children
        .map((r) => (r.length() <= 1 ? "" : r.domNode.innerText))
        .join(
          `
`
        )
        .slice(t, t + n);
    }
    html(t, n) {
      return `<pre>
${ja(this.code(t, n))}
</pre>`;
    }
  }
  class Ee extends de {
    static register() {
      L.register(si);
    }
  }
  G(Ee, "TAB", "  ");
  class Bu extends Bn {}
  Bu.blotName = "code";
  Bu.tagName = "CODE";
  Ee.blotName = "code-block";
  Ee.className = "ql-code-block";
  Ee.tagName = "DIV";
  si.blotName = "code-block-container";
  si.className = "ql-code-block-container";
  si.tagName = "DIV";
  si.allowedChildren = [Ee];
  Ee.allowedChildren = [yn, Sn, Vi];
  Ee.requiredContainer = si;
  const Fu = { scope: tt.BLOCK, whitelist: ["rtl"] },
    Cm = new Pn("direction", "dir", Fu),
    Nm = new En("direction", "ql-direction", Fu),
    Im = new Rr("direction", "direction", Fu),
    km = { scope: tt.INLINE, whitelist: ["serif", "monospace"] },
    Om = new En("font", "ql-font", km);
  class n_ extends Rr {
    value(t) {
      return super.value(t).replace(/["']/g, "");
    }
  }
  const Lm = new n_("font", "font-family", km),
    qm = new En("size", "ql-size", {
      scope: tt.INLINE,
      whitelist: ["small", "large", "huge"],
    }),
    Rm = new Rr("size", "font-size", {
      scope: tt.INLINE,
      whitelist: ["10px", "18px", "32px"],
    }),
    r_ = lr("quill:keyboard"),
    i_ = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
  class Ua extends xn {
    static match(t, n) {
      return ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(
        (r) => !!n[r] !== t[r] && n[r] !== null
      )
        ? !1
        : n.key === t.key || n.key === t.which;
    }
    constructor(t, n) {
      super(t, n),
        (this.bindings = {}),
        Object.keys(this.options.bindings).forEach((r) => {
          this.options.bindings[r] && this.addBinding(this.options.bindings[r]);
        }),
        this.addBinding({ key: "Enter", shiftKey: null }, this.handleEnter),
        this.addBinding(
          { key: "Enter", metaKey: null, ctrlKey: null, altKey: null },
          () => {}
        ),
        /Firefox/i.test(navigator.userAgent)
          ? (this.addBinding(
              { key: "Backspace" },
              { collapsed: !0 },
              this.handleBackspace
            ),
            this.addBinding(
              { key: "Delete" },
              { collapsed: !0 },
              this.handleDelete
            ))
          : (this.addBinding(
              { key: "Backspace" },
              { collapsed: !0, prefix: /^.?$/ },
              this.handleBackspace
            ),
            this.addBinding(
              { key: "Delete" },
              { collapsed: !0, suffix: /^.?$/ },
              this.handleDelete
            )),
        this.addBinding(
          { key: "Backspace" },
          { collapsed: !1 },
          this.handleDeleteRange
        ),
        this.addBinding(
          { key: "Delete" },
          { collapsed: !1 },
          this.handleDeleteRange
        ),
        this.addBinding(
          {
            key: "Backspace",
            altKey: null,
            ctrlKey: null,
            metaKey: null,
            shiftKey: null,
          },
          { collapsed: !0, offset: 0 },
          this.handleBackspace
        ),
        this.listen();
    }
    addBinding(t) {
      let n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const i = o_(t);
      if (i == null) {
        r_.warn("Attempted to add invalid keyboard binding", i);
        return;
      }
      typeof n == "function" && (n = { handler: n }),
        typeof r == "function" && (r = { handler: r }),
        (Array.isArray(i.key) ? i.key : [i.key]).forEach((o) => {
          const a = { ...i, key: o, ...n, ...r };
          (this.bindings[a.key] = this.bindings[a.key] || []),
            this.bindings[a.key].push(a);
        });
    }
    listen() {
      this.quill.root.addEventListener("keydown", (t) => {
        if (
          t.defaultPrevented ||
          t.isComposing ||
          (t.keyCode === 229 && (t.key === "Enter" || t.key === "Backspace"))
        )
          return;
        const i = (this.bindings[t.key] || [])
          .concat(this.bindings[t.which] || [])
          .filter((x) => Ua.match(t, x));
        if (i.length === 0) return;
        const s = L.find(t.target, !0);
        if (s && s.scroll !== this.quill.scroll) return;
        const o = this.quill.getSelection();
        if (o == null || !this.quill.hasFocus()) return;
        const [a, l] = this.quill.getLine(o.index),
          [c, f] = this.quill.getLeaf(o.index),
          [d, h] =
            o.length === 0 ? [c, f] : this.quill.getLeaf(o.index + o.length),
          p = c instanceof ma ? c.value().slice(0, f) : "",
          g = d instanceof ma ? d.value().slice(h) : "",
          v = {
            collapsed: o.length === 0,
            empty: o.length === 0 && a.length() <= 1,
            format: this.quill.getFormat(o),
            line: a,
            offset: l,
            prefix: p,
            suffix: g,
            event: t,
          };
        i.some((x) => {
          if (
            (x.collapsed != null && x.collapsed !== v.collapsed) ||
            (x.empty != null && x.empty !== v.empty) ||
            (x.offset != null && x.offset !== v.offset)
          )
            return !1;
          if (Array.isArray(x.format)) {
            if (x.format.every((A) => v.format[A] == null)) return !1;
          } else if (
            typeof x.format == "object" &&
            !Object.keys(x.format).every((A) =>
              x.format[A] === !0
                ? v.format[A] != null
                : x.format[A] === !1
                ? v.format[A] == null
                : Cu(x.format[A], v.format[A])
            )
          )
            return !1;
          return (x.prefix != null && !x.prefix.test(v.prefix)) ||
            (x.suffix != null && !x.suffix.test(v.suffix))
            ? !1
            : x.handler.call(this, o, v, x) !== !0;
        }) && t.preventDefault();
      });
    }
    handleBackspace(t, n) {
      const r = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(n.prefix) ? 2 : 1;
      if (t.index === 0 || this.quill.getLength() <= 1) return;
      let i = {};
      const [s] = this.quill.getLine(t.index);
      let o = new Q().retain(t.index - r).delete(r);
      if (n.offset === 0) {
        const [a] = this.quill.getLine(t.index - 1);
        if (a && !(a.statics.blotName === "block" && a.length() <= 1)) {
          const c = s.formats(),
            f = this.quill.getFormat(t.index - 1, 1);
          if (
            ((i = tn.AttributeMap.diff(c, f) || {}), Object.keys(i).length > 0)
          ) {
            const d = new Q().retain(t.index + s.length() - 2).retain(1, i);
            o = o.compose(d);
          }
        }
      }
      this.quill.updateContents(o, L.sources.USER), this.quill.focus();
    }
    handleDelete(t, n) {
      const r = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(n.suffix) ? 2 : 1;
      if (t.index >= this.quill.getLength() - r) return;
      let i = {};
      const [s] = this.quill.getLine(t.index);
      let o = new Q().retain(t.index).delete(r);
      if (n.offset >= s.length() - 1) {
        const [a] = this.quill.getLine(t.index + 1);
        if (a) {
          const l = s.formats(),
            c = this.quill.getFormat(t.index, 1);
          (i = tn.AttributeMap.diff(l, c) || {}),
            Object.keys(i).length > 0 &&
              (o = o.retain(a.length() - 1).retain(1, i));
        }
      }
      this.quill.updateContents(o, L.sources.USER), this.quill.focus();
    }
    handleDeleteRange(t) {
      $u({ range: t, quill: this.quill }), this.quill.focus();
    }
    handleEnter(t, n) {
      const r = Object.keys(n.format).reduce(
          (s, o) => (
            this.quill.scroll.query(o, tt.BLOCK) &&
              !Array.isArray(n.format[o]) &&
              (s[o] = n.format[o]),
            s
          ),
          {}
        ),
        i = new Q()
          .retain(t.index)
          .delete(t.length)
          .insert(
            `
`,
            r
          );
      this.quill.updateContents(i, L.sources.USER),
        this.quill.setSelection(t.index + 1, L.sources.SILENT),
        this.quill.focus();
    }
  }
  const s_ = {
    bindings: {
      bold: sc("bold"),
      italic: sc("italic"),
      underline: sc("underline"),
      indent: {
        key: "Tab",
        format: ["blockquote", "indent", "list"],
        handler(e, t) {
          return t.collapsed && t.offset !== 0
            ? !0
            : (this.quill.format("indent", "+1", L.sources.USER), !1);
        },
      },
      outdent: {
        key: "Tab",
        shiftKey: !0,
        format: ["blockquote", "indent", "list"],
        handler(e, t) {
          return t.collapsed && t.offset !== 0
            ? !0
            : (this.quill.format("indent", "-1", L.sources.USER), !1);
        },
      },
      "outdent backspace": {
        key: "Backspace",
        collapsed: !0,
        shiftKey: null,
        metaKey: null,
        ctrlKey: null,
        altKey: null,
        format: ["indent", "list"],
        offset: 0,
        handler(e, t) {
          t.format.indent != null
            ? this.quill.format("indent", "-1", L.sources.USER)
            : t.format.list != null &&
              this.quill.format("list", !1, L.sources.USER);
        },
      },
      "indent code-block": Nd(!0),
      "outdent code-block": Nd(!1),
      "remove tab": {
        key: "Tab",
        shiftKey: !0,
        collapsed: !0,
        prefix: /\t$/,
        handler(e) {
          this.quill.deleteText(e.index - 1, 1, L.sources.USER);
        },
      },
      tab: {
        key: "Tab",
        handler(e, t) {
          if (t.format.table) return !0;
          this.quill.history.cutoff();
          const n = new Q().retain(e.index).delete(e.length).insert("	");
          return (
            this.quill.updateContents(n, L.sources.USER),
            this.quill.history.cutoff(),
            this.quill.setSelection(e.index + 1, L.sources.SILENT),
            !1
          );
        },
      },
      "blockquote empty enter": {
        key: "Enter",
        collapsed: !0,
        format: ["blockquote"],
        empty: !0,
        handler() {
          this.quill.format("blockquote", !1, L.sources.USER);
        },
      },
      "list empty enter": {
        key: "Enter",
        collapsed: !0,
        format: ["list"],
        empty: !0,
        handler(e, t) {
          const n = { list: !1 };
          t.format.indent && (n.indent = !1),
            this.quill.formatLine(e.index, e.length, n, L.sources.USER);
        },
      },
      "checklist enter": {
        key: "Enter",
        collapsed: !0,
        format: { list: "checked" },
        handler(e) {
          const [t, n] = this.quill.getLine(e.index),
            r = { ...t.formats(), list: "checked" },
            i = new Q()
              .retain(e.index)
              .insert(
                `
`,
                r
              )
              .retain(t.length() - n - 1)
              .retain(1, { list: "unchecked" });
          this.quill.updateContents(i, L.sources.USER),
            this.quill.setSelection(e.index + 1, L.sources.SILENT),
            this.quill.scrollSelectionIntoView();
        },
      },
      "header enter": {
        key: "Enter",
        collapsed: !0,
        format: ["header"],
        suffix: /^$/,
        handler(e, t) {
          const [n, r] = this.quill.getLine(e.index),
            i = new Q()
              .retain(e.index)
              .insert(
                `
`,
                t.format
              )
              .retain(n.length() - r - 1)
              .retain(1, { header: null });
          this.quill.updateContents(i, L.sources.USER),
            this.quill.setSelection(e.index + 1, L.sources.SILENT),
            this.quill.scrollSelectionIntoView();
        },
      },
      "table backspace": {
        key: "Backspace",
        format: ["table"],
        collapsed: !0,
        offset: 0,
        handler() {},
      },
      "table delete": {
        key: "Delete",
        format: ["table"],
        collapsed: !0,
        suffix: /^$/,
        handler() {},
      },
      "table enter": {
        key: "Enter",
        shiftKey: null,
        format: ["table"],
        handler(e) {
          const t = this.quill.getModule("table");
          if (t) {
            const [n, r, i, s] = t.getTable(e),
              o = a_(n, r, i, s);
            if (o == null) return;
            let a = n.offset();
            if (o < 0) {
              const l = new Q().retain(a).insert(`
`);
              this.quill.updateContents(l, L.sources.USER),
                this.quill.setSelection(
                  e.index + 1,
                  e.length,
                  L.sources.SILENT
                );
            } else if (o > 0) {
              a += n.length();
              const l = new Q().retain(a).insert(`
`);
              this.quill.updateContents(l, L.sources.USER),
                this.quill.setSelection(a, L.sources.USER);
            }
          }
        },
      },
      "table tab": {
        key: "Tab",
        shiftKey: null,
        format: ["table"],
        handler(e, t) {
          const { event: n, line: r } = t,
            i = r.offset(this.quill.scroll);
          n.shiftKey
            ? this.quill.setSelection(i - 1, L.sources.USER)
            : this.quill.setSelection(i + r.length(), L.sources.USER);
        },
      },
      "list autofill": {
        key: " ",
        shiftKey: null,
        collapsed: !0,
        format: { "code-block": !1, blockquote: !1, table: !1 },
        prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
        handler(e, t) {
          if (this.quill.scroll.query("list") == null) return !0;
          const { length: n } = t.prefix,
            [r, i] = this.quill.getLine(e.index);
          if (i > n) return !0;
          let s;
          switch (t.prefix.trim()) {
            case "[]":
            case "[ ]":
              s = "unchecked";
              break;
            case "[x]":
              s = "checked";
              break;
            case "-":
            case "*":
              s = "bullet";
              break;
            default:
              s = "ordered";
          }
          this.quill.insertText(e.index, " ", L.sources.USER),
            this.quill.history.cutoff();
          const o = new Q()
            .retain(e.index - i)
            .delete(n + 1)
            .retain(r.length() - 2 - i)
            .retain(1, { list: s });
          return (
            this.quill.updateContents(o, L.sources.USER),
            this.quill.history.cutoff(),
            this.quill.setSelection(e.index - n, L.sources.SILENT),
            !1
          );
        },
      },
      "code exit": {
        key: "Enter",
        collapsed: !0,
        format: ["code-block"],
        prefix: /^$/,
        suffix: /^\s*$/,
        handler(e) {
          const [t, n] = this.quill.getLine(e.index);
          let r = 2,
            i = t;
          for (; i != null && i.length() <= 1 && i.formats()["code-block"]; )
            if (((i = i.prev), (r -= 1), r <= 0)) {
              const s = new Q()
                .retain(e.index + t.length() - n - 2)
                .retain(1, { "code-block": null })
                .delete(1);
              return (
                this.quill.updateContents(s, L.sources.USER),
                this.quill.setSelection(e.index - 1, L.sources.SILENT),
                !1
              );
            }
          return !0;
        },
      },
      "embed left": Ro("ArrowLeft", !1),
      "embed left shift": Ro("ArrowLeft", !0),
      "embed right": Ro("ArrowRight", !1),
      "embed right shift": Ro("ArrowRight", !0),
      "table down": Id(!1),
      "table up": Id(!0),
    },
  };
  Ua.DEFAULTS = s_;
  function Nd(e) {
    return {
      key: "Tab",
      shiftKey: !e,
      format: { "code-block": !0 },
      handler(t, n) {
        let { event: r } = n;
        const i = this.quill.scroll.query("code-block"),
          { TAB: s } = i;
        if (t.length === 0 && !r.shiftKey) {
          this.quill.insertText(t.index, s, L.sources.USER),
            this.quill.setSelection(t.index + s.length, L.sources.SILENT);
          return;
        }
        const o =
          t.length === 0
            ? this.quill.getLines(t.index, 1)
            : this.quill.getLines(t);
        let { index: a, length: l } = t;
        o.forEach((c, f) => {
          e
            ? (c.insertAt(0, s), f === 0 ? (a += s.length) : (l += s.length))
            : c.domNode.textContent.startsWith(s) &&
              (c.deleteAt(0, s.length),
              f === 0 ? (a -= s.length) : (l -= s.length));
        }),
          this.quill.update(L.sources.USER),
          this.quill.setSelection(a, l, L.sources.SILENT);
      },
    };
  }
  function Ro(e, t) {
    return {
      key: e,
      shiftKey: t,
      altKey: null,
      [e === "ArrowLeft" ? "prefix" : "suffix"]: /^$/,
      handler(r) {
        let { index: i } = r;
        e === "ArrowRight" && (i += r.length + 1);
        const [s] = this.quill.getLeaf(i);
        return s instanceof Ge
          ? (e === "ArrowLeft"
              ? t
                ? this.quill.setSelection(
                    r.index - 1,
                    r.length + 1,
                    L.sources.USER
                  )
                : this.quill.setSelection(r.index - 1, L.sources.USER)
              : t
              ? this.quill.setSelection(r.index, r.length + 1, L.sources.USER)
              : this.quill.setSelection(r.index + r.length + 1, L.sources.USER),
            !1)
          : !0;
      },
    };
  }
  function sc(e) {
    return {
      key: e[0],
      shortKey: !0,
      handler(t, n) {
        this.quill.format(e, !n.format[e], L.sources.USER);
      },
    };
  }
  function Id(e) {
    return {
      key: e ? "ArrowUp" : "ArrowDown",
      collapsed: !0,
      format: ["table"],
      handler(t, n) {
        const r = e ? "prev" : "next",
          i = n.line,
          s = i.parent[r];
        if (s != null) {
          if (s.statics.blotName === "table-row") {
            let o = s.children.head,
              a = i;
            for (; a.prev != null; ) (a = a.prev), (o = o.next);
            const l =
              o.offset(this.quill.scroll) + Math.min(n.offset, o.length() - 1);
            this.quill.setSelection(l, 0, L.sources.USER);
          }
        } else {
          const o = i.table()[r];
          o != null &&
            (e
              ? this.quill.setSelection(
                  o.offset(this.quill.scroll) + o.length() - 1,
                  0,
                  L.sources.USER
                )
              : this.quill.setSelection(
                  o.offset(this.quill.scroll),
                  0,
                  L.sources.USER
                ));
        }
        return !1;
      },
    };
  }
  function o_(e) {
    if (typeof e == "string" || typeof e == "number") e = { key: e };
    else if (typeof e == "object") e = Bi(e);
    else return null;
    return e.shortKey && ((e[i_] = e.shortKey), delete e.shortKey), e;
  }
  function $u(e) {
    let { quill: t, range: n } = e;
    const r = t.getLines(n);
    let i = {};
    if (r.length > 1) {
      const s = r[0].formats(),
        o = r[r.length - 1].formats();
      i = tn.AttributeMap.diff(o, s) || {};
    }
    t.deleteText(n, L.sources.USER),
      Object.keys(i).length > 0 && t.formatLine(n.index, 1, i, L.sources.USER),
      t.setSelection(n.index, L.sources.SILENT);
  }
  function a_(e, t, n, r) {
    return t.prev == null && t.next == null
      ? n.prev == null && n.next == null
        ? r === 0
          ? -1
          : 1
        : n.prev == null
        ? -1
        : 1
      : t.prev == null
      ? -1
      : t.next == null
      ? 1
      : null;
  }
  const l_ = /font-weight:\s*normal/,
    c_ = ["P", "OL", "UL"],
    kd = (e) => e && c_.includes(e.tagName),
    u_ = (e) => {
      Array.from(e.querySelectorAll("br"))
        .filter((t) => kd(t.previousElementSibling) && kd(t.nextElementSibling))
        .forEach((t) => {
          var n;
          (n = t.parentNode) == null || n.removeChild(t);
        });
    },
    f_ = (e) => {
      Array.from(e.querySelectorAll('b[style*="font-weight"]'))
        .filter((t) => {
          var n;
          return (n = t.getAttribute("style")) == null ? void 0 : n.match(l_);
        })
        .forEach((t) => {
          var r;
          const n = e.createDocumentFragment();
          n.append(...t.childNodes),
            (r = t.parentNode) == null || r.replaceChild(n, t);
        });
    };
  function d_(e) {
    e.querySelector('[id^="docs-internal-guid-"]') && (f_(e), u_(e));
  }
  const h_ = /\bmso-list:[^;]*ignore/i,
    p_ = /\bmso-list:[^;]*\bl(\d+)/i,
    m_ = /\bmso-list:[^;]*\blevel(\d+)/i,
    g_ = (e, t) => {
      const n = e.getAttribute("style"),
        r = n == null ? void 0 : n.match(p_);
      if (!r) return null;
      const i = Number(r[1]),
        s = n == null ? void 0 : n.match(m_),
        o = s ? Number(s[1]) : 1,
        a = new RegExp(
          `@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`,
          "i"
        ),
        l = t.match(a),
        c = l && l[1] === "bullet" ? "bullet" : "ordered";
      return { id: i, indent: o, type: c, element: e };
    },
    b_ = (e) => {
      var o, a;
      const t = Array.from(e.querySelectorAll("[style*=mso-list]")),
        n = [],
        r = [];
      t.forEach((l) => {
        (l.getAttribute("style") || "").match(h_) ? n.push(l) : r.push(l);
      }),
        n.forEach((l) => {
          var c;
          return (c = l.parentNode) == null ? void 0 : c.removeChild(l);
        });
      const i = e.documentElement.innerHTML,
        s = r.map((l) => g_(l, i)).filter((l) => l);
      for (; s.length; ) {
        const l = [];
        let c = s.shift();
        for (; c; )
          l.push(c),
            (c =
              s.length &&
              ((o = s[0]) == null ? void 0 : o.element) ===
                c.element.nextElementSibling &&
              s[0].id === c.id
                ? s.shift()
                : null);
        const f = document.createElement("ul");
        l.forEach((p) => {
          const g = document.createElement("li");
          g.setAttribute("data-list", p.type),
            p.indent > 1 &&
              g.setAttribute("class", `ql-indent-${p.indent - 1}`),
            (g.innerHTML = p.element.innerHTML),
            f.appendChild(g);
        });
        const d = (a = l[0]) == null ? void 0 : a.element,
          { parentNode: h } = d ?? {};
        d && (h == null || h.replaceChild(f, d)),
          l.slice(1).forEach((p) => {
            let { element: g } = p;
            h == null || h.removeChild(g);
          });
      }
    };
  function v_(e) {
    e.documentElement.getAttribute("xmlns:w") ===
      "urn:schemas-microsoft-com:office:word" && b_(e);
  }
  const y_ = [v_, d_],
    w_ = (e) => {
      e.documentElement &&
        y_.forEach((t) => {
          t(e);
        });
    },
    E_ = lr("quill:clipboard"),
    S_ = [
      [Node.TEXT_NODE, R_],
      [Node.TEXT_NODE, Ld],
      ["br", C_],
      [Node.ELEMENT_NODE, Ld],
      [Node.ELEMENT_NODE, T_],
      [Node.ELEMENT_NODE, A_],
      [Node.ELEMENT_NODE, L_],
      ["li", k_],
      ["ol, ul", O_],
      ["pre", N_],
      ["tr", q_],
      ["b", oc("bold")],
      ["i", oc("italic")],
      ["strike", oc("strike")],
      ["style", I_],
    ],
    x_ = [Qx, Cm].reduce((e, t) => ((e[t.keyName] = t), e), {}),
    Od = [Am, Pu, Mu, Im, Lm, Rm].reduce((e, t) => ((e[t.keyName] = t), e), {});
  class Dm extends xn {
    constructor(t, n) {
      super(t, n),
        this.quill.root.addEventListener("copy", (r) =>
          this.onCaptureCopy(r, !1)
        ),
        this.quill.root.addEventListener("cut", (r) =>
          this.onCaptureCopy(r, !0)
        ),
        this.quill.root.addEventListener(
          "paste",
          this.onCapturePaste.bind(this)
        ),
        (this.matchers = []),
        S_.concat(this.options.matchers ?? []).forEach((r) => {
          let [i, s] = r;
          this.addMatcher(i, s);
        });
    }
    addMatcher(t, n) {
      this.matchers.push([t, n]);
    }
    convert(t) {
      let { html: n, text: r } = t,
        i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (i[Ee.blotName])
        return new Q().insert(r || "", { [Ee.blotName]: i[Ee.blotName] });
      if (!n) return new Q().insert(r || "", i);
      const s = this.convertHTML(n);
      return io(
        s,
        `
`
      ) &&
        (s.ops[s.ops.length - 1].attributes == null || i.table)
        ? s.compose(new Q().retain(s.length() - 1).delete(1))
        : s;
    }
    normalizeHTML(t) {
      w_(t);
    }
    convertHTML(t) {
      const n = new DOMParser().parseFromString(t, "text/html");
      this.normalizeHTML(n);
      const r = n.body,
        i = new WeakMap(),
        [s, o] = this.prepareMatching(r, i);
      return ju(this.quill.scroll, r, s, o, i);
    }
    dangerouslyPasteHTML(t, n) {
      let r =
        arguments.length > 2 && arguments[2] !== void 0
          ? arguments[2]
          : L.sources.API;
      if (typeof t == "string") {
        const i = this.convert({ html: t, text: "" });
        this.quill.setContents(i, n),
          this.quill.setSelection(0, L.sources.SILENT);
      } else {
        const i = this.convert({ html: n, text: "" });
        this.quill.updateContents(new Q().retain(t).concat(i), r),
          this.quill.setSelection(t + i.length(), L.sources.SILENT);
      }
    }
    onCaptureCopy(t) {
      var o, a;
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (t.defaultPrevented) return;
      t.preventDefault();
      const [r] = this.quill.selection.getRange();
      if (r == null) return;
      const { html: i, text: s } = this.onCopy(r, n);
      (o = t.clipboardData) == null || o.setData("text/plain", s),
        (a = t.clipboardData) == null || a.setData("text/html", i),
        n && $u({ range: r, quill: this.quill });
    }
    normalizeURIList(t) {
      return t.split(/\r?\n/).filter((n) => n[0] !== "#").join(`
`);
    }
    onCapturePaste(t) {
      var o, a, l, c, f;
      if (t.defaultPrevented || !this.quill.isEnabled()) return;
      t.preventDefault();
      const n = this.quill.getSelection(!0);
      if (n == null) return;
      const r = (o = t.clipboardData) == null ? void 0 : o.getData("text/html");
      let i = (a = t.clipboardData) == null ? void 0 : a.getData("text/plain");
      if (!r && !i) {
        const d =
          (l = t.clipboardData) == null ? void 0 : l.getData("text/uri-list");
        d && (i = this.normalizeURIList(d));
      }
      const s = Array.from(
        ((c = t.clipboardData) == null ? void 0 : c.files) || []
      );
      if (!r && s.length > 0) {
        this.quill.uploader.upload(n, s);
        return;
      }
      if (r && s.length > 0) {
        const d = new DOMParser().parseFromString(r, "text/html");
        if (
          d.body.childElementCount === 1 &&
          ((f = d.body.firstElementChild) == null ? void 0 : f.tagName) ===
            "IMG"
        ) {
          this.quill.uploader.upload(n, s);
          return;
        }
      }
      this.onPaste(n, { html: r, text: i });
    }
    onCopy(t) {
      const n = this.quill.getText(t);
      return { html: this.quill.getSemanticHTML(t), text: n };
    }
    onPaste(t, n) {
      let { text: r, html: i } = n;
      const s = this.quill.getFormat(t.index),
        o = this.convert({ text: r, html: i }, s);
      E_.log("onPaste", o, { text: r, html: i });
      const a = new Q().retain(t.index).delete(t.length).concat(o);
      this.quill.updateContents(a, L.sources.USER),
        this.quill.setSelection(a.length() - t.length, L.sources.SILENT),
        this.quill.scrollSelectionIntoView();
    }
    prepareMatching(t, n) {
      const r = [],
        i = [];
      return (
        this.matchers.forEach((s) => {
          const [o, a] = s;
          switch (o) {
            case Node.TEXT_NODE:
              i.push(a);
              break;
            case Node.ELEMENT_NODE:
              r.push(a);
              break;
            default:
              Array.from(t.querySelectorAll(o)).forEach((l) => {
                if (n.has(l)) {
                  const c = n.get(l);
                  c == null || c.push(a);
                } else n.set(l, [a]);
              });
              break;
          }
        }),
        [r, i]
      );
    }
  }
  G(Dm, "DEFAULTS", { matchers: [] });
  function oi(e, t, n, r) {
    return r.query(t)
      ? e.reduce((i, s) => {
          if (!s.insert) return i;
          if (s.attributes && s.attributes[t]) return i.push(s);
          const o = n ? { [t]: n } : {};
          return i.insert(s.insert, { ...o, ...s.attributes });
        }, new Q())
      : e;
  }
  function io(e, t) {
    let n = "";
    for (let r = e.ops.length - 1; r >= 0 && n.length < t.length; --r) {
      const i = e.ops[r];
      if (typeof i.insert != "string") break;
      n = i.insert + n;
    }
    return n.slice(-1 * t.length) === t;
  }
  function Ar(e, t) {
    if (!(e instanceof Element)) return !1;
    const n = t.query(e);
    return n && n.prototype instanceof Ge
      ? !1
      : [
          "address",
          "article",
          "blockquote",
          "canvas",
          "dd",
          "div",
          "dl",
          "dt",
          "fieldset",
          "figcaption",
          "figure",
          "footer",
          "form",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "header",
          "iframe",
          "li",
          "main",
          "nav",
          "ol",
          "output",
          "p",
          "pre",
          "section",
          "table",
          "td",
          "tr",
          "ul",
          "video",
        ].includes(e.tagName.toLowerCase());
  }
  function __(e, t) {
    return (
      e.previousElementSibling &&
      e.nextElementSibling &&
      !Ar(e.previousElementSibling, t) &&
      !Ar(e.nextElementSibling, t)
    );
  }
  const Do = new WeakMap();
  function Mm(e) {
    return e == null
      ? !1
      : (Do.has(e) ||
          (e.tagName === "PRE" ? Do.set(e, !0) : Do.set(e, Mm(e.parentNode))),
        Do.get(e));
  }
  function ju(e, t, n, r, i) {
    return t.nodeType === t.TEXT_NODE
      ? r.reduce((s, o) => o(t, s, e), new Q())
      : t.nodeType === t.ELEMENT_NODE
      ? Array.from(t.childNodes || []).reduce((s, o) => {
          let a = ju(e, o, n, r, i);
          return (
            o.nodeType === t.ELEMENT_NODE &&
              ((a = n.reduce((l, c) => c(o, l, e), a)),
              (a = (i.get(o) || []).reduce((l, c) => c(o, l, e), a))),
            s.concat(a)
          );
        }, new Q())
      : new Q();
  }
  function oc(e) {
    return (t, n, r) => oi(n, e, !0, r);
  }
  function A_(e, t, n) {
    const r = Pn.keys(e),
      i = En.keys(e),
      s = Rr.keys(e),
      o = {};
    return (
      r
        .concat(i)
        .concat(s)
        .forEach((a) => {
          let l = n.query(a, tt.ATTRIBUTE);
          (l != null && ((o[l.attrName] = l.value(e)), o[l.attrName])) ||
            ((l = x_[a]),
            l != null &&
              (l.attrName === a || l.keyName === a) &&
              (o[l.attrName] = l.value(e) || void 0),
            (l = Od[a]),
            l != null &&
              (l.attrName === a || l.keyName === a) &&
              ((l = Od[a]), (o[l.attrName] = l.value(e) || void 0)));
        }),
      Object.entries(o).reduce((a, l) => {
        let [c, f] = l;
        return oi(a, c, f, n);
      }, t)
    );
  }
  function T_(e, t, n) {
    const r = n.query(e);
    if (r == null) return t;
    if (r.prototype instanceof Ge) {
      const i = {},
        s = r.value(e);
      if (s != null)
        return (i[r.blotName] = s), new Q().insert(i, r.formats(e, n));
    } else if (
      (r.prototype instanceof Vs &&
        !io(
          t,
          `
`
        ) &&
        t.insert(`
`),
      "blotName" in r && "formats" in r && typeof r.formats == "function")
    )
      return oi(t, r.blotName, r.formats(e, n), n);
    return t;
  }
  function C_(e, t) {
    return (
      io(
        t,
        `
`
      ) ||
        t.insert(`
`),
      t
    );
  }
  function N_(e, t, n) {
    const r = n.query("code-block"),
      i =
        r && "formats" in r && typeof r.formats == "function"
          ? r.formats(e, n)
          : !0;
    return oi(t, "code-block", i, n);
  }
  function I_() {
    return new Q();
  }
  function k_(e, t, n) {
    const r = n.query(e);
    if (
      r == null ||
      r.blotName !== "list" ||
      !io(
        t,
        `
`
      )
    )
      return t;
    let i = -1,
      s = e.parentNode;
    for (; s != null; )
      ["OL", "UL"].includes(s.tagName) && (i += 1), (s = s.parentNode);
    return i <= 0
      ? t
      : t.reduce(
          (o, a) =>
            a.insert
              ? a.attributes && typeof a.attributes.indent == "number"
                ? o.push(a)
                : o.insert(a.insert, { indent: i, ...(a.attributes || {}) })
              : o,
          new Q()
        );
  }
  function O_(e, t, n) {
    const r = e;
    let i = r.tagName === "OL" ? "ordered" : "bullet";
    const s = r.getAttribute("data-checked");
    return (
      s && (i = s === "true" ? "checked" : "unchecked"), oi(t, "list", i, n)
    );
  }
  function Ld(e, t, n) {
    if (
      !io(
        t,
        `
`
      )
    ) {
      if (
        Ar(e, n) &&
        (e.childNodes.length > 0 || e instanceof HTMLParagraphElement)
      )
        return t.insert(`
`);
      if (t.length() > 0 && e.nextSibling) {
        let r = e.nextSibling;
        for (; r != null; ) {
          if (Ar(r, n))
            return t.insert(`
`);
          const i = n.query(r);
          if (i && i.prototype instanceof Qe)
            return t.insert(`
`);
          r = r.firstChild;
        }
      }
    }
    return t;
  }
  function L_(e, t, n) {
    var s;
    const r = {},
      i = e.style || {};
    return (
      i.fontStyle === "italic" && (r.italic = !0),
      i.textDecoration === "underline" && (r.underline = !0),
      i.textDecoration === "line-through" && (r.strike = !0),
      (((s = i.fontWeight) != null && s.startsWith("bold")) ||
        parseInt(i.fontWeight, 10) >= 700) &&
        (r.bold = !0),
      (t = Object.entries(r).reduce((o, a) => {
        let [l, c] = a;
        return oi(o, l, c, n);
      }, t)),
      parseFloat(i.textIndent || 0) > 0 ? new Q().insert("	").concat(t) : t
    );
  }
  function q_(e, t, n) {
    var i, s;
    const r =
      ((i = e.parentElement) == null ? void 0 : i.tagName) === "TABLE"
        ? e.parentElement
        : (s = e.parentElement) == null
        ? void 0
        : s.parentElement;
    if (r != null) {
      const a = Array.from(r.querySelectorAll("tr")).indexOf(e) + 1;
      return oi(t, "table", a, n);
    }
    return t;
  }
  function R_(e, t, n) {
    var i;
    let r = e.data;
    if (((i = e.parentElement) == null ? void 0 : i.tagName) === "O:P")
      return t.insert(r.trim());
    if (!Mm(e)) {
      if (
        r.trim().length === 0 &&
        r.includes(`
`) &&
        !__(e, n)
      )
        return t;
      (r = r.replace(/[^\S\u00a0]/g, " ")),
        (r = r.replace(/ {2,}/g, " ")),
        ((e.previousSibling == null &&
          e.parentElement != null &&
          Ar(e.parentElement, n)) ||
          (e.previousSibling instanceof Element && Ar(e.previousSibling, n))) &&
          (r = r.replace(/^ /, "")),
        ((e.nextSibling == null &&
          e.parentElement != null &&
          Ar(e.parentElement, n)) ||
          (e.nextSibling instanceof Element && Ar(e.nextSibling, n))) &&
          (r = r.replace(/ $/, "")),
        (r = r.replaceAll(" ", " "));
    }
    return t.insert(r);
  }
  class Pm extends xn {
    constructor(n, r) {
      super(n, r);
      G(this, "lastRecorded", 0);
      G(this, "ignoreChange", !1);
      G(this, "stack", { undo: [], redo: [] });
      G(this, "currentRange", null);
      this.quill.on(L.events.EDITOR_CHANGE, (i, s, o, a) => {
        i === L.events.SELECTION_CHANGE
          ? s && a !== L.sources.SILENT && (this.currentRange = s)
          : i === L.events.TEXT_CHANGE &&
            (this.ignoreChange ||
              (!this.options.userOnly || a === L.sources.USER
                ? this.record(s, o)
                : this.transform(s)),
            (this.currentRange = Vc(this.currentRange, s)));
      }),
        this.quill.keyboard.addBinding(
          { key: "z", shortKey: !0 },
          this.undo.bind(this)
        ),
        this.quill.keyboard.addBinding(
          { key: ["z", "Z"], shortKey: !0, shiftKey: !0 },
          this.redo.bind(this)
        ),
        /Win/i.test(navigator.platform) &&
          this.quill.keyboard.addBinding(
            { key: "y", shortKey: !0 },
            this.redo.bind(this)
          ),
        this.quill.root.addEventListener("beforeinput", (i) => {
          i.inputType === "historyUndo"
            ? (this.undo(), i.preventDefault())
            : i.inputType === "historyRedo" &&
              (this.redo(), i.preventDefault());
        });
    }
    change(n, r) {
      if (this.stack[n].length === 0) return;
      const i = this.stack[n].pop();
      if (!i) return;
      const s = this.quill.getContents(),
        o = i.delta.invert(s);
      this.stack[r].push({ delta: o, range: Vc(i.range, o) }),
        (this.lastRecorded = 0),
        (this.ignoreChange = !0),
        this.quill.updateContents(i.delta, L.sources.USER),
        (this.ignoreChange = !1),
        this.restoreSelection(i);
    }
    clear() {
      this.stack = { undo: [], redo: [] };
    }
    cutoff() {
      this.lastRecorded = 0;
    }
    record(n, r) {
      if (n.ops.length === 0) return;
      this.stack.redo = [];
      let i = n.invert(r),
        s = this.currentRange;
      const o = Date.now();
      if (
        this.lastRecorded + this.options.delay > o &&
        this.stack.undo.length > 0
      ) {
        const a = this.stack.undo.pop();
        a && ((i = i.compose(a.delta)), (s = a.range));
      } else this.lastRecorded = o;
      i.length() !== 0 &&
        (this.stack.undo.push({ delta: i, range: s }),
        this.stack.undo.length > this.options.maxStack &&
          this.stack.undo.shift());
    }
    redo() {
      this.change("redo", "undo");
    }
    transform(n) {
      qd(this.stack.undo, n), qd(this.stack.redo, n);
    }
    undo() {
      this.change("undo", "redo");
    }
    restoreSelection(n) {
      if (n.range) this.quill.setSelection(n.range, L.sources.USER);
      else {
        const r = M_(this.quill.scroll, n.delta);
        this.quill.setSelection(r, L.sources.USER);
      }
    }
  }
  G(Pm, "DEFAULTS", { delay: 1e3, maxStack: 100, userOnly: !1 });
  function qd(e, t) {
    let n = t;
    for (let r = e.length - 1; r >= 0; r -= 1) {
      const i = e[r];
      (e[r] = {
        delta: n.transform(i.delta, !0),
        range: i.range && Vc(i.range, n),
      }),
        (n = i.delta.transform(n)),
        e[r].delta.length() === 0 && e.splice(r, 1);
    }
  }
  function D_(e, t) {
    const n = t.ops[t.ops.length - 1];
    return n == null
      ? !1
      : n.insert != null
      ? typeof n.insert == "string" &&
        n.insert.endsWith(`
`)
      : n.attributes != null
      ? Object.keys(n.attributes).some((r) => e.query(r, tt.BLOCK) != null)
      : !1;
  }
  function M_(e, t) {
    const n = t.reduce((i, s) => i + (s.delete || 0), 0);
    let r = t.length() - n;
    return D_(e, t) && (r -= 1), r;
  }
  function Vc(e, t) {
    if (!e) return e;
    const n = t.transformPosition(e.index),
      r = t.transformPosition(e.index + e.length);
    return { index: n, length: r - n };
  }
  class Bm extends xn {
    constructor(t, n) {
      super(t, n),
        t.root.addEventListener("drop", (r) => {
          var o;
          r.preventDefault();
          let i = null;
          if (document.caretRangeFromPoint)
            i = document.caretRangeFromPoint(r.clientX, r.clientY);
          else if (document.caretPositionFromPoint) {
            const a = document.caretPositionFromPoint(r.clientX, r.clientY);
            (i = document.createRange()),
              i.setStart(a.offsetNode, a.offset),
              i.setEnd(a.offsetNode, a.offset);
          }
          const s = i && t.selection.normalizeNative(i);
          if (s) {
            const a = t.selection.normalizedToRange(s);
            (o = r.dataTransfer) != null &&
              o.files &&
              this.upload(a, r.dataTransfer.files);
          }
        });
    }
    upload(t, n) {
      const r = [];
      Array.from(n).forEach((i) => {
        var s;
        i &&
          (s = this.options.mimetypes) != null &&
          s.includes(i.type) &&
          r.push(i);
      }),
        r.length > 0 && this.options.handler.call(this, t, r);
    }
  }
  Bm.DEFAULTS = {
    mimetypes: ["image/png", "image/jpeg"],
    handler(e, t) {
      if (!this.quill.scroll.query("image")) return;
      const n = t.map(
        (r) =>
          new Promise((i) => {
            const s = new FileReader();
            (s.onload = () => {
              i(s.result);
            }),
              s.readAsDataURL(r);
          })
      );
      Promise.all(n).then((r) => {
        const i = r.reduce(
          (s, o) => s.insert({ image: o }),
          new Q().retain(e.index).delete(e.length)
        );
        this.quill.updateContents(i, X.sources.USER),
          this.quill.setSelection(e.index + r.length, X.sources.SILENT);
      });
    },
  };
  const P_ = ["insertText", "insertReplacementText"];
  class B_ extends xn {
    constructor(t, n) {
      super(t, n),
        t.root.addEventListener("beforeinput", (r) => {
          this.handleBeforeInput(r);
        }),
        /Android/i.test(navigator.userAgent) ||
          t.on(L.events.COMPOSITION_BEFORE_START, () => {
            this.handleCompositionStart();
          });
    }
    deleteRange(t) {
      $u({ range: t, quill: this.quill });
    }
    replaceText(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      if (t.length === 0) return !1;
      if (n) {
        const r = this.quill.getFormat(t.index, 1);
        this.deleteRange(t),
          this.quill.updateContents(
            new Q().retain(t.index).insert(n, r),
            L.sources.USER
          );
      } else this.deleteRange(t);
      return (
        this.quill.setSelection(t.index + n.length, 0, L.sources.SILENT), !0
      );
    }
    handleBeforeInput(t) {
      if (
        this.quill.composition.isComposing ||
        t.defaultPrevented ||
        !P_.includes(t.inputType)
      )
        return;
      const n = t.getTargetRanges ? t.getTargetRanges()[0] : null;
      if (!n || n.collapsed === !0) return;
      const r = F_(t);
      if (r == null) return;
      const i = this.quill.selection.normalizeNative(n),
        s = i ? this.quill.selection.normalizedToRange(i) : null;
      s && this.replaceText(s, r) && t.preventDefault();
    }
    handleCompositionStart() {
      const t = this.quill.getSelection();
      t && this.replaceText(t);
    }
  }
  function F_(e) {
    var t;
    return typeof e.data == "string"
      ? e.data
      : (t = e.dataTransfer) != null && t.types.includes("text/plain")
      ? e.dataTransfer.getData("text/plain")
      : null;
  }
  const $_ = /Mac/i.test(navigator.platform),
    j_ = 100,
    U_ = (e) =>
      !!(
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "Home" ||
        ($_ && e.key === "a" && e.ctrlKey === !0)
      );
  class H_ extends xn {
    constructor(n, r) {
      super(n, r);
      G(this, "isListening", !1);
      G(this, "selectionChangeDeadline", 0);
      this.handleArrowKeys(), this.handleNavigationShortcuts();
    }
    handleArrowKeys() {
      this.quill.keyboard.addBinding({
        key: ["ArrowLeft", "ArrowRight"],
        offset: 0,
        shiftKey: null,
        handler(n, r) {
          let { line: i, event: s } = r;
          if (!(i instanceof gn) || !i.uiNode) return !0;
          const o = getComputedStyle(i.domNode).direction === "rtl";
          return (o && s.key !== "ArrowRight") || (!o && s.key !== "ArrowLeft")
            ? !0
            : (this.quill.setSelection(
                n.index - 1,
                n.length + (s.shiftKey ? 1 : 0),
                L.sources.USER
              ),
              !1);
        },
      });
    }
    handleNavigationShortcuts() {
      this.quill.root.addEventListener("keydown", (n) => {
        !n.defaultPrevented && U_(n) && this.ensureListeningToSelectionChange();
      });
    }
    ensureListeningToSelectionChange() {
      if (((this.selectionChangeDeadline = Date.now() + j_), this.isListening))
        return;
      this.isListening = !0;
      const n = () => {
        (this.isListening = !1),
          Date.now() <= this.selectionChangeDeadline &&
            this.handleSelectionChange();
      };
      document.addEventListener("selectionchange", n, { once: !0 });
    }
    handleSelectionChange() {
      const n = document.getSelection();
      if (!n) return;
      const r = n.getRangeAt(0);
      if (r.collapsed !== !0 || r.startOffset !== 0) return;
      const i = this.quill.scroll.find(r.startContainer);
      if (!(i instanceof gn) || !i.uiNode) return;
      const s = document.createRange();
      s.setStartAfter(i.uiNode),
        s.setEndAfter(i.uiNode),
        n.removeAllRanges(),
        n.addRange(s);
    }
  }
  L.register({
    "blots/block": de,
    "blots/block/embed": Qe,
    "blots/break": Sn,
    "blots/container": ii,
    "blots/cursor": Vi,
    "blots/embed": Ru,
    "blots/inline": Bn,
    "blots/scroll": Ai,
    "blots/text": yn,
    "modules/clipboard": Dm,
    "modules/history": Pm,
    "modules/keyboard": Ua,
    "modules/uploader": Bm,
    "modules/input": B_,
    "modules/uiNode": H_,
  });
  class z_ extends En {
    add(t, n) {
      let r = 0;
      if (n === "+1" || n === "-1") {
        const i = this.value(t) || 0;
        r = n === "+1" ? i + 1 : i - 1;
      } else typeof n == "number" && (r = n);
      return r === 0 ? (this.remove(t), !0) : super.add(t, r.toString());
    }
    canAdd(t, n) {
      return super.canAdd(t, n) || super.canAdd(t, parseInt(n, 10));
    }
    value(t) {
      return parseInt(super.value(t), 10) || void 0;
    }
  }
  const V_ = new z_("indent", "ql-indent", {
    scope: tt.BLOCK,
    whitelist: [1, 2, 3, 4, 5, 6, 7, 8],
  });
  class Kc extends de {}
  G(Kc, "blotName", "blockquote"), G(Kc, "tagName", "blockquote");
  class Gc extends de {
    static formats(t) {
      return this.tagName.indexOf(t.tagName) + 1;
    }
  }
  G(Gc, "blotName", "header"),
    G(Gc, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
  class so extends ii {}
  so.blotName = "list-container";
  so.tagName = "OL";
  class oo extends de {
    static create(t) {
      const n = super.create();
      return n.setAttribute("data-list", t), n;
    }
    static formats(t) {
      return t.getAttribute("data-list") || void 0;
    }
    static register() {
      L.register(so);
    }
    constructor(t, n) {
      super(t, n);
      const r = n.ownerDocument.createElement("span"),
        i = (s) => {
          if (!t.isEnabled()) return;
          const o = this.statics.formats(n, t);
          o === "checked"
            ? (this.format("list", "unchecked"), s.preventDefault())
            : o === "unchecked" &&
              (this.format("list", "checked"), s.preventDefault());
        };
      r.addEventListener("mousedown", i),
        r.addEventListener("touchstart", i),
        this.attachUI(r);
    }
    format(t, n) {
      t === this.statics.blotName && n
        ? this.domNode.setAttribute("data-list", n)
        : super.format(t, n);
    }
  }
  oo.blotName = "list";
  oo.tagName = "LI";
  so.allowedChildren = [oo];
  oo.requiredContainer = so;
  class Ws extends Bn {
    static create() {
      return super.create();
    }
    static formats() {
      return !0;
    }
    optimize(t) {
      super.optimize(t),
        this.domNode.tagName !== this.statics.tagName[0] &&
          this.replaceWith(this.statics.blotName);
    }
  }
  G(Ws, "blotName", "bold"), G(Ws, "tagName", ["STRONG", "B"]);
  class Wc extends Ws {}
  G(Wc, "blotName", "italic"), G(Wc, "tagName", ["EM", "I"]);
  class Tr extends Bn {
    static create(t) {
      const n = super.create(t);
      return (
        n.setAttribute("href", this.sanitize(t)),
        n.setAttribute("rel", "noopener noreferrer"),
        n.setAttribute("target", "_blank"),
        n
      );
    }
    static formats(t) {
      return t.getAttribute("href");
    }
    static sanitize(t) {
      return Fm(t, this.PROTOCOL_WHITELIST) ? t : this.SANITIZED_URL;
    }
    format(t, n) {
      t !== this.statics.blotName || !n
        ? super.format(t, n)
        : this.domNode.setAttribute("href", this.constructor.sanitize(n));
    }
  }
  G(Tr, "blotName", "link"),
    G(Tr, "tagName", "A"),
    G(Tr, "SANITIZED_URL", "about:blank"),
    G(Tr, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
  function Fm(e, t) {
    const n = document.createElement("a");
    n.href = e;
    const r = n.href.slice(0, n.href.indexOf(":"));
    return t.indexOf(r) > -1;
  }
  class Yc extends Bn {
    static create(t) {
      return t === "super"
        ? document.createElement("sup")
        : t === "sub"
        ? document.createElement("sub")
        : super.create(t);
    }
    static formats(t) {
      if (t.tagName === "SUB") return "sub";
      if (t.tagName === "SUP") return "super";
    }
  }
  G(Yc, "blotName", "script"), G(Yc, "tagName", ["SUB", "SUP"]);
  class Xc extends Ws {}
  G(Xc, "blotName", "strike"), G(Xc, "tagName", ["S", "STRIKE"]);
  class Zc extends Bn {}
  G(Zc, "blotName", "underline"), G(Zc, "tagName", "U");
  class Go extends Ru {
    static create(t) {
      if (window.katex == null)
        throw new Error("Formula module requires KaTeX.");
      const n = super.create(t);
      return (
        typeof t == "string" &&
          (window.katex.render(t, n, { throwOnError: !1, errorColor: "#f00" }),
          n.setAttribute("data-value", t)),
        n
      );
    }
    static value(t) {
      return t.getAttribute("data-value");
    }
    html() {
      const { formula: t } = this.value();
      return `<span>${t}</span>`;
    }
  }
  G(Go, "blotName", "formula"),
    G(Go, "className", "ql-formula"),
    G(Go, "tagName", "SPAN");
  const Rd = ["alt", "height", "width"];
  class Jc extends Ge {
    static create(t) {
      const n = super.create(t);
      return typeof t == "string" && n.setAttribute("src", this.sanitize(t)), n;
    }
    static formats(t) {
      return Rd.reduce(
        (n, r) => (t.hasAttribute(r) && (n[r] = t.getAttribute(r)), n),
        {}
      );
    }
    static match(t) {
      return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
    }
    static sanitize(t) {
      return Fm(t, ["http", "https", "data"]) ? t : "//:0";
    }
    static value(t) {
      return t.getAttribute("src");
    }
    format(t, n) {
      Rd.indexOf(t) > -1
        ? n
          ? this.domNode.setAttribute(t, n)
          : this.domNode.removeAttribute(t)
        : super.format(t, n);
    }
  }
  G(Jc, "blotName", "image"), G(Jc, "tagName", "IMG");
  const Dd = ["height", "width"];
  class Wo extends Qe {
    static create(t) {
      const n = super.create(t);
      return (
        n.setAttribute("frameborder", "0"),
        n.setAttribute("allowfullscreen", "true"),
        n.setAttribute("src", this.sanitize(t)),
        n
      );
    }
    static formats(t) {
      return Dd.reduce(
        (n, r) => (t.hasAttribute(r) && (n[r] = t.getAttribute(r)), n),
        {}
      );
    }
    static sanitize(t) {
      return Tr.sanitize(t);
    }
    static value(t) {
      return t.getAttribute("src");
    }
    format(t, n) {
      Dd.indexOf(t) > -1
        ? n
          ? this.domNode.setAttribute(t, n)
          : this.domNode.removeAttribute(t)
        : super.format(t, n);
    }
    html() {
      const { video: t } = this.value();
      return `<a href="${t}">${t}</a>`;
    }
  }
  G(Wo, "blotName", "video"),
    G(Wo, "className", "ql-video"),
    G(Wo, "tagName", "IFRAME");
  const vs = new En("code-token", "hljs", { scope: tt.INLINE });
  class rr extends Bn {
    static formats(t, n) {
      for (; t != null && t !== n.domNode; ) {
        if (t.classList && t.classList.contains(Ee.className))
          return super.formats(t, n);
        t = t.parentNode;
      }
    }
    constructor(t, n, r) {
      super(t, n, r), vs.add(this.domNode, r);
    }
    format(t, n) {
      t !== rr.blotName
        ? super.format(t, n)
        : n
        ? vs.add(this.domNode, n)
        : (vs.remove(this.domNode),
          this.domNode.classList.remove(this.statics.className));
    }
    optimize() {
      super.optimize(...arguments), vs.value(this.domNode) || this.unwrap();
    }
  }
  rr.blotName = "code-token";
  rr.className = "ql-token";
  class Je extends Ee {
    static create(t) {
      const n = super.create(t);
      return typeof t == "string" && n.setAttribute("data-language", t), n;
    }
    static formats(t) {
      return t.getAttribute("data-language") || "plain";
    }
    static register() {}
    format(t, n) {
      t === this.statics.blotName && n
        ? this.domNode.setAttribute("data-language", n)
        : super.format(t, n);
    }
    replaceWith(t, n) {
      return (
        this.formatAt(0, this.length(), rr.blotName, !1),
        super.replaceWith(t, n)
      );
    }
  }
  class ks extends si {
    attach() {
      super.attach(), (this.forceNext = !1), this.scroll.emitMount(this);
    }
    format(t, n) {
      t === Je.blotName &&
        ((this.forceNext = !0),
        this.children.forEach((r) => {
          r.format(t, n);
        }));
    }
    formatAt(t, n, r, i) {
      r === Je.blotName && (this.forceNext = !0), super.formatAt(t, n, r, i);
    }
    highlight(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (this.children.head == null) return;
      const i = `${Array.from(this.domNode.childNodes)
          .filter((o) => o !== this.uiNode)
          .map((o) => o.textContent).join(`
`)}
`,
        s = Je.formats(this.children.head.domNode);
      if (n || this.forceNext || this.cachedText !== i) {
        if (i.trim().length > 0 || this.cachedText == null) {
          const o = this.children.reduce(
              (l, c) => l.concat(Em(c, !1)),
              new Q()
            ),
            a = t(i, s);
          o.diff(a).reduce((l, c) => {
            let { retain: f, attributes: d } = c;
            return f
              ? (d &&
                  Object.keys(d).forEach((h) => {
                    [Je.blotName, rr.blotName].includes(h) &&
                      this.formatAt(l, f, h, d[h]);
                  }),
                l + f)
              : l;
          }, 0);
        }
        (this.cachedText = i), (this.forceNext = !1);
      }
    }
    html(t, n) {
      const [r] = this.children.find(t);
      return `<pre data-language="${r ? Je.formats(r.domNode) : "plain"}">
${ja(this.code(t, n))}
</pre>`;
    }
    optimize(t) {
      if (
        (super.optimize(t),
        this.parent != null &&
          this.children.head != null &&
          this.uiNode != null)
      ) {
        const n = Je.formats(this.children.head.domNode);
        n !== this.uiNode.value && (this.uiNode.value = n);
      }
    }
  }
  ks.allowedChildren = [Je];
  Je.requiredContainer = ks;
  Je.allowedChildren = [rr, Vi, yn, Sn];
  const K_ = (e, t, n) => {
    if (typeof e.versionString == "string") {
      const r = e.versionString.split(".")[0];
      if (parseInt(r, 10) >= 11) return e.highlight(n, { language: t }).value;
    }
    return e.highlight(t, n).value;
  };
  class $m extends xn {
    static register() {
      L.register(rr, !0), L.register(Je, !0), L.register(ks, !0);
    }
    constructor(t, n) {
      if ((super(t, n), this.options.hljs == null))
        throw new Error(
          "Syntax module requires highlight.js. Please include the library on the page before Quill."
        );
      (this.languages = this.options.languages.reduce((r, i) => {
        let { key: s } = i;
        return (r[s] = !0), r;
      }, {})),
        (this.highlightBlot = this.highlightBlot.bind(this)),
        this.initListener(),
        this.initTimer();
    }
    initListener() {
      this.quill.on(L.events.SCROLL_BLOT_MOUNT, (t) => {
        if (!(t instanceof ks)) return;
        const n = this.quill.root.ownerDocument.createElement("select");
        this.options.languages.forEach((r) => {
          let { key: i, label: s } = r;
          const o = n.ownerDocument.createElement("option");
          (o.textContent = s), o.setAttribute("value", i), n.appendChild(o);
        }),
          n.addEventListener("change", () => {
            t.format(Je.blotName, n.value),
              this.quill.root.focus(),
              this.highlight(t, !0);
          }),
          t.uiNode == null &&
            (t.attachUI(n),
            t.children.head && (n.value = Je.formats(t.children.head.domNode)));
      });
    }
    initTimer() {
      let t = null;
      this.quill.on(L.events.SCROLL_OPTIMIZE, () => {
        t && clearTimeout(t),
          (t = setTimeout(() => {
            this.highlight(), (t = null);
          }, this.options.interval));
      });
    }
    highlight() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null,
        n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (this.quill.selection.composing) return;
      this.quill.update(L.sources.USER);
      const r = this.quill.getSelection();
      (t == null ? this.quill.scroll.descendants(ks) : [t]).forEach((s) => {
        s.highlight(this.highlightBlot, n);
      }),
        this.quill.update(L.sources.SILENT),
        r != null && this.quill.setSelection(r, L.sources.SILENT);
    }
    highlightBlot(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : "plain";
      if (((n = this.languages[n] ? n : "plain"), n === "plain"))
        return ja(t)
          .split(
            `
`
          )
          .reduce(
            (i, s, o) => (
              o !== 0 &&
                i.insert(
                  `
`,
                  { [Ee.blotName]: n }
                ),
              i.insert(s)
            ),
            new Q()
          );
      const r = this.quill.root.ownerDocument.createElement("div");
      return (
        r.classList.add(Ee.className),
        (r.innerHTML = K_(this.options.hljs, n, t)),
        ju(
          this.quill.scroll,
          r,
          [
            (i, s) => {
              const o = vs.value(i);
              return o
                ? s.compose(new Q().retain(s.length(), { [rr.blotName]: o }))
                : s;
            },
          ],
          [
            (i, s) =>
              i.data
                .split(
                  `
`
                )
                .reduce(
                  (o, a, l) => (
                    l !== 0 &&
                      o.insert(
                        `
`,
                        { [Ee.blotName]: n }
                      ),
                    o.insert(a)
                  ),
                  s
                ),
          ],
          new WeakMap()
        )
      );
    }
  }
  $m.DEFAULTS = {
    hljs: window.hljs,
    interval: 1e3,
    languages: [
      { key: "plain", label: "Plain" },
      { key: "bash", label: "Bash" },
      { key: "cpp", label: "C++" },
      { key: "cs", label: "C#" },
      { key: "css", label: "CSS" },
      { key: "diff", label: "Diff" },
      { key: "xml", label: "HTML/XML" },
      { key: "java", label: "Java" },
      { key: "javascript", label: "JavaScript" },
      { key: "markdown", label: "Markdown" },
      { key: "php", label: "PHP" },
      { key: "python", label: "Python" },
      { key: "ruby", label: "Ruby" },
      { key: "sql", label: "SQL" },
    ],
  };
  const Rs = class Rs extends de {
    static create(t) {
      const n = super.create();
      return (
        t ? n.setAttribute("data-row", t) : n.setAttribute("data-row", Uu()), n
      );
    }
    static formats(t) {
      if (t.hasAttribute("data-row")) return t.getAttribute("data-row");
    }
    cellOffset() {
      return this.parent ? this.parent.children.indexOf(this) : -1;
    }
    format(t, n) {
      t === Rs.blotName && n
        ? this.domNode.setAttribute("data-row", n)
        : super.format(t, n);
    }
    row() {
      return this.parent;
    }
    rowOffset() {
      return this.row() ? this.row().rowOffset() : -1;
    }
    table() {
      return this.row() && this.row().table();
    }
  };
  G(Rs, "blotName", "table"), G(Rs, "tagName", "TD");
  let hn = Rs;
  class ir extends ii {
    checkMerge() {
      if (super.checkMerge() && this.next.children.head != null) {
        const t = this.children.head.formats(),
          n = this.children.tail.formats(),
          r = this.next.children.head.formats(),
          i = this.next.children.tail.formats();
        return (
          t.table === n.table && t.table === r.table && t.table === i.table
        );
      }
      return !1;
    }
    optimize(t) {
      super.optimize(t),
        this.children.forEach((n) => {
          if (n.next == null) return;
          const r = n.formats(),
            i = n.next.formats();
          if (r.table !== i.table) {
            const s = this.splitAfter(n);
            s && s.optimize(), this.prev && this.prev.optimize();
          }
        });
    }
    rowOffset() {
      return this.parent ? this.parent.children.indexOf(this) : -1;
    }
    table() {
      return this.parent && this.parent.parent;
    }
  }
  G(ir, "blotName", "table-row"), G(ir, "tagName", "TR");
  class Dn extends ii {}
  G(Dn, "blotName", "table-body"), G(Dn, "tagName", "TBODY");
  class Gi extends ii {
    balanceCells() {
      const t = this.descendants(ir),
        n = t.reduce((r, i) => Math.max(i.children.length, r), 0);
      t.forEach((r) => {
        new Array(n - r.children.length).fill(0).forEach(() => {
          let i;
          r.children.head != null && (i = hn.formats(r.children.head.domNode));
          const s = this.scroll.create(hn.blotName, i);
          r.appendChild(s), s.optimize();
        });
      });
    }
    cells(t) {
      return this.rows().map((n) => n.children.at(t));
    }
    deleteColumn(t) {
      const [n] = this.descendant(Dn);
      n == null ||
        n.children.head == null ||
        n.children.forEach((r) => {
          const i = r.children.at(t);
          i != null && i.remove();
        });
    }
    insertColumn(t) {
      const [n] = this.descendant(Dn);
      n == null ||
        n.children.head == null ||
        n.children.forEach((r) => {
          const i = r.children.at(t),
            s = hn.formats(r.children.head.domNode),
            o = this.scroll.create(hn.blotName, s);
          r.insertBefore(o, i);
        });
    }
    insertRow(t) {
      const [n] = this.descendant(Dn);
      if (n == null || n.children.head == null) return;
      const r = Uu(),
        i = this.scroll.create(ir.blotName);
      n.children.head.children.forEach(() => {
        const o = this.scroll.create(hn.blotName, r);
        i.appendChild(o);
      });
      const s = n.children.at(t);
      n.insertBefore(i, s);
    }
    rows() {
      const t = this.children.head;
      return t == null ? [] : t.children.map((n) => n);
    }
  }
  G(Gi, "blotName", "table-container"), G(Gi, "tagName", "TABLE");
  Gi.allowedChildren = [Dn];
  Dn.requiredContainer = Gi;
  Dn.allowedChildren = [ir];
  ir.requiredContainer = Dn;
  ir.allowedChildren = [hn];
  hn.requiredContainer = ir;
  function Uu() {
    return `row-${Math.random().toString(36).slice(2, 6)}`;
  }
  class G_ extends xn {
    static register() {
      L.register(hn), L.register(ir), L.register(Dn), L.register(Gi);
    }
    constructor() {
      super(...arguments), this.listenBalanceCells();
    }
    balanceTables() {
      this.quill.scroll.descendants(Gi).forEach((t) => {
        t.balanceCells();
      });
    }
    deleteColumn() {
      const [t, , n] = this.getTable();
      n != null &&
        (t.deleteColumn(n.cellOffset()), this.quill.update(L.sources.USER));
    }
    deleteRow() {
      const [, t] = this.getTable();
      t != null && (t.remove(), this.quill.update(L.sources.USER));
    }
    deleteTable() {
      const [t] = this.getTable();
      if (t == null) return;
      const n = t.offset();
      t.remove(),
        this.quill.update(L.sources.USER),
        this.quill.setSelection(n, L.sources.SILENT);
    }
    getTable() {
      let t =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : this.quill.getSelection();
      if (t == null) return [null, null, null, -1];
      const [n, r] = this.quill.getLine(t.index);
      if (n == null || n.statics.blotName !== hn.blotName)
        return [null, null, null, -1];
      const i = n.parent;
      return [i.parent.parent, i, n, r];
    }
    insertColumn(t) {
      const n = this.quill.getSelection();
      if (!n) return;
      const [r, i, s] = this.getTable(n);
      if (s == null) return;
      const o = s.cellOffset();
      r.insertColumn(o + t), this.quill.update(L.sources.USER);
      let a = i.rowOffset();
      t === 0 && (a += 1),
        this.quill.setSelection(n.index + a, n.length, L.sources.SILENT);
    }
    insertColumnLeft() {
      this.insertColumn(0);
    }
    insertColumnRight() {
      this.insertColumn(1);
    }
    insertRow(t) {
      const n = this.quill.getSelection();
      if (!n) return;
      const [r, i, s] = this.getTable(n);
      if (s == null) return;
      const o = i.rowOffset();
      r.insertRow(o + t),
        this.quill.update(L.sources.USER),
        t > 0
          ? this.quill.setSelection(n, L.sources.SILENT)
          : this.quill.setSelection(
              n.index + i.children.length,
              n.length,
              L.sources.SILENT
            );
    }
    insertRowAbove() {
      this.insertRow(0);
    }
    insertRowBelow() {
      this.insertRow(1);
    }
    insertTable(t, n) {
      const r = this.quill.getSelection();
      if (r == null) return;
      const i = new Array(t).fill(0).reduce((s) => {
        const o = new Array(n)
          .fill(
            `
`
          )
          .join("");
        return s.insert(o, { table: Uu() });
      }, new Q().retain(r.index));
      this.quill.updateContents(i, L.sources.USER),
        this.quill.setSelection(r.index, L.sources.SILENT),
        this.balanceTables();
    }
    listenBalanceCells() {
      this.quill.on(L.events.SCROLL_OPTIMIZE, (t) => {
        t.some((n) =>
          ["TD", "TR", "TBODY", "TABLE"].includes(n.target.tagName)
            ? (this.quill.once(L.events.TEXT_CHANGE, (r, i, s) => {
                s === L.sources.USER && this.balanceTables();
              }),
              !0)
            : !1
        );
      });
    }
  }
  const Md = lr("quill:toolbar");
  class Hu extends xn {
    constructor(t, n) {
      var r, i;
      if ((super(t, n), Array.isArray(this.options.container))) {
        const s = document.createElement("div");
        s.setAttribute("role", "toolbar"),
          W_(s, this.options.container),
          (i = (r = t.container) == null ? void 0 : r.parentNode) == null ||
            i.insertBefore(s, t.container),
          (this.container = s);
      } else
        typeof this.options.container == "string"
          ? (this.container = document.querySelector(this.options.container))
          : (this.container = this.options.container);
      if (!(this.container instanceof HTMLElement)) {
        Md.error("Container required for toolbar", this.options);
        return;
      }
      this.container.classList.add("ql-toolbar"),
        (this.controls = []),
        (this.handlers = {}),
        this.options.handlers &&
          Object.keys(this.options.handlers).forEach((s) => {
            var a;
            const o = (a = this.options.handlers) == null ? void 0 : a[s];
            o && this.addHandler(s, o);
          }),
        Array.from(this.container.querySelectorAll("button, select")).forEach(
          (s) => {
            this.attach(s);
          }
        ),
        this.quill.on(L.events.EDITOR_CHANGE, () => {
          const [s] = this.quill.selection.getRange();
          this.update(s);
        });
    }
    addHandler(t, n) {
      this.handlers[t] = n;
    }
    attach(t) {
      let n = Array.from(t.classList).find((i) => i.indexOf("ql-") === 0);
      if (!n) return;
      if (
        ((n = n.slice(3)),
        t.tagName === "BUTTON" && t.setAttribute("type", "button"),
        this.handlers[n] == null && this.quill.scroll.query(n) == null)
      ) {
        Md.warn("ignoring attaching to nonexistent format", n, t);
        return;
      }
      const r = t.tagName === "SELECT" ? "change" : "click";
      t.addEventListener(r, (i) => {
        let s;
        if (t.tagName === "SELECT") {
          if (t.selectedIndex < 0) return;
          const a = t.options[t.selectedIndex];
          a.hasAttribute("selected") ? (s = !1) : (s = a.value || !1);
        } else
          t.classList.contains("ql-active")
            ? (s = !1)
            : (s = t.value || !t.hasAttribute("value")),
            i.preventDefault();
        this.quill.focus();
        const [o] = this.quill.selection.getRange();
        if (this.handlers[n] != null) this.handlers[n].call(this, s);
        else if (this.quill.scroll.query(n).prototype instanceof Ge) {
          if (((s = prompt(`Enter ${n}`)), !s)) return;
          this.quill.updateContents(
            new Q()
              .retain(o.index)
              .delete(o.length)
              .insert({ [n]: s }),
            L.sources.USER
          );
        } else this.quill.format(n, s, L.sources.USER);
        this.update(o);
      }),
        this.controls.push([n, t]);
    }
    update(t) {
      const n = t == null ? {} : this.quill.getFormat(t);
      this.controls.forEach((r) => {
        const [i, s] = r;
        if (s.tagName === "SELECT") {
          let o = null;
          if (t == null) o = null;
          else if (n[i] == null) o = s.querySelector("option[selected]");
          else if (!Array.isArray(n[i])) {
            let a = n[i];
            typeof a == "string" && (a = a.replace(/"/g, '\\"')),
              (o = s.querySelector(`option[value="${a}"]`));
          }
          o == null
            ? ((s.value = ""), (s.selectedIndex = -1))
            : (o.selected = !0);
        } else if (t == null)
          s.classList.remove("ql-active"),
            s.setAttribute("aria-pressed", "false");
        else if (s.hasAttribute("value")) {
          const o = n[i],
            a =
              o === s.getAttribute("value") ||
              (o != null && o.toString() === s.getAttribute("value")) ||
              (o == null && !s.getAttribute("value"));
          s.classList.toggle("ql-active", a),
            s.setAttribute("aria-pressed", a.toString());
        } else {
          const o = n[i] != null;
          s.classList.toggle("ql-active", o),
            s.setAttribute("aria-pressed", o.toString());
        }
      });
    }
  }
  Hu.DEFAULTS = {};
  function Pd(e, t, n) {
    const r = document.createElement("button");
    r.setAttribute("type", "button"),
      r.classList.add(`ql-${t}`),
      r.setAttribute("aria-pressed", "false"),
      n != null
        ? ((r.value = n), r.setAttribute("aria-label", `${t}: ${n}`))
        : r.setAttribute("aria-label", t),
      e.appendChild(r);
  }
  function W_(e, t) {
    Array.isArray(t[0]) || (t = [t]),
      t.forEach((n) => {
        const r = document.createElement("span");
        r.classList.add("ql-formats"),
          n.forEach((i) => {
            if (typeof i == "string") Pd(r, i);
            else {
              const s = Object.keys(i)[0],
                o = i[s];
              Array.isArray(o) ? Y_(r, s, o) : Pd(r, s, o);
            }
          }),
          e.appendChild(r);
      });
  }
  function Y_(e, t, n) {
    const r = document.createElement("select");
    r.classList.add(`ql-${t}`),
      n.forEach((i) => {
        const s = document.createElement("option");
        i !== !1
          ? s.setAttribute("value", String(i))
          : s.setAttribute("selected", "selected"),
          r.appendChild(s);
      }),
      e.appendChild(r);
  }
  Hu.DEFAULTS = {
    container: null,
    handlers: {
      clean() {
        const e = this.quill.getSelection();
        if (e != null)
          if (e.length === 0) {
            const t = this.quill.getFormat();
            Object.keys(t).forEach((n) => {
              this.quill.scroll.query(n, tt.INLINE) != null &&
                this.quill.format(n, !1, L.sources.USER);
            });
          } else this.quill.removeFormat(e.index, e.length, L.sources.USER);
      },
      direction(e) {
        const { align: t } = this.quill.getFormat();
        e === "rtl" && t == null
          ? this.quill.format("align", "right", L.sources.USER)
          : !e &&
            t === "right" &&
            this.quill.format("align", !1, L.sources.USER),
          this.quill.format("direction", e, L.sources.USER);
      },
      indent(e) {
        const t = this.quill.getSelection(),
          n = this.quill.getFormat(t),
          r = parseInt(n.indent || 0, 10);
        if (e === "+1" || e === "-1") {
          let i = e === "+1" ? 1 : -1;
          n.direction === "rtl" && (i *= -1),
            this.quill.format("indent", r + i, L.sources.USER);
        }
      },
      link(e) {
        e === !0 && (e = prompt("Enter link URL:")),
          this.quill.format("link", e, L.sources.USER);
      },
      list(e) {
        const t = this.quill.getSelection(),
          n = this.quill.getFormat(t);
        e === "check"
          ? n.list === "checked" || n.list === "unchecked"
            ? this.quill.format("list", !1, L.sources.USER)
            : this.quill.format("list", "unchecked", L.sources.USER)
          : this.quill.format("list", e, L.sources.USER);
      },
    },
  };
  const X_ =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>',
    Z_ =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>',
    J_ =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>',
    Q_ =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>',
    tA =
      '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>',
    eA =
      '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>',
    nA =
      '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>',
    rA =
      '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>',
    Bd =
      '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>',
    iA =
      '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>',
    sA =
      '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>',
    oA =
      '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>',
    aA =
      '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>',
    lA =
      '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>',
    cA =
      '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',
    uA =
      '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',
    fA =
      '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>',
    dA =
      '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',
    hA =
      '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>',
    pA =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>',
    mA =
      '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>',
    gA =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>',
    bA =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>',
    vA =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>',
    yA =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>',
    wA =
      '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>',
    EA =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>',
    SA =
      '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>',
    xA =
      '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>',
    _A =
      '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>',
    AA =
      '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>',
    TA =
      '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>',
    CA =
      '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>',
    Ys = {
      align: { "": X_, center: Z_, right: J_, justify: Q_ },
      background: tA,
      blockquote: eA,
      bold: nA,
      clean: rA,
      code: Bd,
      "code-block": Bd,
      color: iA,
      direction: { "": sA, rtl: oA },
      formula: aA,
      header: { 1: lA, 2: cA, 3: uA, 4: fA, 5: dA, 6: hA },
      italic: pA,
      image: mA,
      indent: { "+1": gA, "-1": bA },
      link: vA,
      list: { bullet: yA, check: wA, ordered: EA },
      script: { sub: SA, super: xA },
      strike: _A,
      table: AA,
      underline: TA,
      video: CA,
    },
    NA =
      '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
  let Fd = 0;
  function $d(e, t) {
    e.setAttribute(t, `${e.getAttribute(t) !== "true"}`);
  }
  class Ha {
    constructor(t) {
      (this.select = t),
        (this.container = document.createElement("span")),
        this.buildPicker(),
        (this.select.style.display = "none"),
        this.select.parentNode.insertBefore(this.container, this.select),
        this.label.addEventListener("mousedown", () => {
          this.togglePicker();
        }),
        this.label.addEventListener("keydown", (n) => {
          switch (n.key) {
            case "Enter":
              this.togglePicker();
              break;
            case "Escape":
              this.escape(), n.preventDefault();
              break;
          }
        }),
        this.select.addEventListener("change", this.update.bind(this));
    }
    togglePicker() {
      this.container.classList.toggle("ql-expanded"),
        $d(this.label, "aria-expanded"),
        $d(this.options, "aria-hidden");
    }
    buildItem(t) {
      const n = document.createElement("span");
      (n.tabIndex = "0"),
        n.setAttribute("role", "button"),
        n.classList.add("ql-picker-item");
      const r = t.getAttribute("value");
      return (
        r && n.setAttribute("data-value", r),
        t.textContent && n.setAttribute("data-label", t.textContent),
        n.addEventListener("click", () => {
          this.selectItem(n, !0);
        }),
        n.addEventListener("keydown", (i) => {
          switch (i.key) {
            case "Enter":
              this.selectItem(n, !0), i.preventDefault();
              break;
            case "Escape":
              this.escape(), i.preventDefault();
              break;
          }
        }),
        n
      );
    }
    buildLabel() {
      const t = document.createElement("span");
      return (
        t.classList.add("ql-picker-label"),
        (t.innerHTML = NA),
        (t.tabIndex = "0"),
        t.setAttribute("role", "button"),
        t.setAttribute("aria-expanded", "false"),
        this.container.appendChild(t),
        t
      );
    }
    buildOptions() {
      const t = document.createElement("span");
      t.classList.add("ql-picker-options"),
        t.setAttribute("aria-hidden", "true"),
        (t.tabIndex = "-1"),
        (t.id = `ql-picker-options-${Fd}`),
        (Fd += 1),
        this.label.setAttribute("aria-controls", t.id),
        (this.options = t),
        Array.from(this.select.options).forEach((n) => {
          const r = this.buildItem(n);
          t.appendChild(r), n.selected === !0 && this.selectItem(r);
        }),
        this.container.appendChild(t);
    }
    buildPicker() {
      Array.from(this.select.attributes).forEach((t) => {
        this.container.setAttribute(t.name, t.value);
      }),
        this.container.classList.add("ql-picker"),
        (this.label = this.buildLabel()),
        this.buildOptions();
    }
    escape() {
      this.close(), setTimeout(() => this.label.focus(), 1);
    }
    close() {
      this.container.classList.remove("ql-expanded"),
        this.label.setAttribute("aria-expanded", "false"),
        this.options.setAttribute("aria-hidden", "true");
    }
    selectItem(t) {
      let n =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      const r = this.container.querySelector(".ql-selected");
      t !== r &&
        (r != null && r.classList.remove("ql-selected"),
        t != null &&
          (t.classList.add("ql-selected"),
          (this.select.selectedIndex = Array.from(
            t.parentNode.children
          ).indexOf(t)),
          t.hasAttribute("data-value")
            ? this.label.setAttribute(
                "data-value",
                t.getAttribute("data-value")
              )
            : this.label.removeAttribute("data-value"),
          t.hasAttribute("data-label")
            ? this.label.setAttribute(
                "data-label",
                t.getAttribute("data-label")
              )
            : this.label.removeAttribute("data-label"),
          n && (this.select.dispatchEvent(new Event("change")), this.close())));
    }
    update() {
      let t;
      if (this.select.selectedIndex > -1) {
        const r =
          this.container.querySelector(".ql-picker-options").children[
            this.select.selectedIndex
          ];
        (t = this.select.options[this.select.selectedIndex]),
          this.selectItem(r);
      } else this.selectItem(null);
      const n =
        t != null && t !== this.select.querySelector("option[selected]");
      this.label.classList.toggle("ql-active", n);
    }
  }
  class jm extends Ha {
    constructor(t, n) {
      super(t),
        (this.label.innerHTML = n),
        this.container.classList.add("ql-color-picker"),
        Array.from(this.container.querySelectorAll(".ql-picker-item"))
          .slice(0, 7)
          .forEach((r) => {
            r.classList.add("ql-primary");
          });
    }
    buildItem(t) {
      const n = super.buildItem(t);
      return (n.style.backgroundColor = t.getAttribute("value") || ""), n;
    }
    selectItem(t, n) {
      super.selectItem(t, n);
      const r = this.label.querySelector(".ql-color-label"),
        i = (t && t.getAttribute("data-value")) || "";
      r && (r.tagName === "line" ? (r.style.stroke = i) : (r.style.fill = i));
    }
  }
  class Um extends Ha {
    constructor(t, n) {
      super(t),
        this.container.classList.add("ql-icon-picker"),
        Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach(
          (r) => {
            r.innerHTML = n[r.getAttribute("data-value") || ""];
          }
        ),
        (this.defaultItem = this.container.querySelector(".ql-selected")),
        this.selectItem(this.defaultItem);
    }
    selectItem(t, n) {
      super.selectItem(t, n);
      const r = t || this.defaultItem;
      if (r != null) {
        if (this.label.innerHTML === r.innerHTML) return;
        this.label.innerHTML = r.innerHTML;
      }
    }
  }
  const IA = (e) => {
    const { overflowY: t } = getComputedStyle(e, null);
    return t !== "visible" && t !== "clip";
  };
  class Hm {
    constructor(t, n) {
      (this.quill = t),
        (this.boundsContainer = n || document.body),
        (this.root = t.addContainer("ql-tooltip")),
        (this.root.innerHTML = this.constructor.TEMPLATE),
        IA(this.quill.root) &&
          this.quill.root.addEventListener("scroll", () => {
            this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
          }),
        this.hide();
    }
    hide() {
      this.root.classList.add("ql-hidden");
    }
    position(t) {
      const n = t.left + t.width / 2 - this.root.offsetWidth / 2,
        r = t.bottom + this.quill.root.scrollTop;
      (this.root.style.left = `${n}px`),
        (this.root.style.top = `${r}px`),
        this.root.classList.remove("ql-flip");
      const i = this.boundsContainer.getBoundingClientRect(),
        s = this.root.getBoundingClientRect();
      let o = 0;
      if (
        (s.right > i.right &&
          ((o = i.right - s.right), (this.root.style.left = `${n + o}px`)),
        s.left < i.left &&
          ((o = i.left - s.left), (this.root.style.left = `${n + o}px`)),
        s.bottom > i.bottom)
      ) {
        const a = s.bottom - s.top,
          l = t.bottom - t.top + a;
        (this.root.style.top = `${r - l}px`),
          this.root.classList.add("ql-flip");
      }
      return o;
    }
    show() {
      this.root.classList.remove("ql-editing"),
        this.root.classList.remove("ql-hidden");
    }
  }
  const kA = [!1, "center", "right", "justify"],
    OA = [
      "#000000",
      "#e60000",
      "#ff9900",
      "#ffff00",
      "#008a00",
      "#0066cc",
      "#9933ff",
      "#ffffff",
      "#facccc",
      "#ffebcc",
      "#ffffcc",
      "#cce8cc",
      "#cce0f5",
      "#ebd6ff",
      "#bbbbbb",
      "#f06666",
      "#ffc266",
      "#ffff66",
      "#66b966",
      "#66a3e0",
      "#c285ff",
      "#888888",
      "#a10000",
      "#b26b00",
      "#b2b200",
      "#006100",
      "#0047b2",
      "#6b24b2",
      "#444444",
      "#5c0000",
      "#663d00",
      "#666600",
      "#003700",
      "#002966",
      "#3d1466",
    ],
    LA = [!1, "serif", "monospace"],
    qA = ["1", "2", "3", !1],
    RA = ["small", !1, "large", "huge"];
  class ao extends Ki {
    constructor(t, n) {
      super(t, n);
      const r = (i) => {
        if (!document.body.contains(t.root)) {
          document.body.removeEventListener("click", r);
          return;
        }
        this.tooltip != null &&
          !this.tooltip.root.contains(i.target) &&
          document.activeElement !== this.tooltip.textbox &&
          !this.quill.hasFocus() &&
          this.tooltip.hide(),
          this.pickers != null &&
            this.pickers.forEach((s) => {
              s.container.contains(i.target) || s.close();
            });
      };
      t.emitter.listenDOM("click", document.body, r);
    }
    addModule(t) {
      const n = super.addModule(t);
      return t === "toolbar" && this.extendToolbar(n), n;
    }
    buildButtons(t, n) {
      Array.from(t).forEach((r) => {
        (r.getAttribute("class") || "").split(/\s+/).forEach((s) => {
          if (s.startsWith("ql-") && ((s = s.slice(3)), n[s] != null))
            if (s === "direction") r.innerHTML = n[s][""] + n[s].rtl;
            else if (typeof n[s] == "string") r.innerHTML = n[s];
            else {
              const o = r.value || "";
              o != null && n[s][o] && (r.innerHTML = n[s][o]);
            }
        });
      });
    }
    buildPickers(t, n) {
      this.pickers = Array.from(t).map((i) => {
        if (
          i.classList.contains("ql-align") &&
          (i.querySelector("option") == null && ds(i, kA),
          typeof n.align == "object")
        )
          return new Um(i, n.align);
        if (
          i.classList.contains("ql-background") ||
          i.classList.contains("ql-color")
        ) {
          const s = i.classList.contains("ql-background")
            ? "background"
            : "color";
          return (
            i.querySelector("option") == null &&
              ds(i, OA, s === "background" ? "#ffffff" : "#000000"),
            new jm(i, n[s])
          );
        }
        return (
          i.querySelector("option") == null &&
            (i.classList.contains("ql-font")
              ? ds(i, LA)
              : i.classList.contains("ql-header")
              ? ds(i, qA)
              : i.classList.contains("ql-size") && ds(i, RA)),
          new Ha(i)
        );
      });
      const r = () => {
        this.pickers.forEach((i) => {
          i.update();
        });
      };
      this.quill.on(X.events.EDITOR_CHANGE, r);
    }
  }
  ao.DEFAULTS = Nr({}, Ki.DEFAULTS, {
    modules: {
      toolbar: {
        handlers: {
          formula() {
            this.quill.theme.tooltip.edit("formula");
          },
          image() {
            let e = this.container.querySelector("input.ql-image[type=file]");
            e == null &&
              ((e = document.createElement("input")),
              e.setAttribute("type", "file"),
              e.setAttribute(
                "accept",
                this.quill.uploader.options.mimetypes.join(", ")
              ),
              e.classList.add("ql-image"),
              e.addEventListener("change", () => {
                const t = this.quill.getSelection(!0);
                this.quill.uploader.upload(t, e.files), (e.value = "");
              }),
              this.container.appendChild(e)),
              e.click();
          },
          video() {
            this.quill.theme.tooltip.edit("video");
          },
        },
      },
    },
  });
  class zm extends Hm {
    constructor(t, n) {
      super(t, n),
        (this.textbox = this.root.querySelector('input[type="text"]')),
        this.listen();
    }
    listen() {
      this.textbox.addEventListener("keydown", (t) => {
        t.key === "Enter"
          ? (this.save(), t.preventDefault())
          : t.key === "Escape" && (this.cancel(), t.preventDefault());
      });
    }
    cancel() {
      this.hide(), this.restoreFocus();
    }
    edit() {
      let t =
          arguments.length > 0 && arguments[0] !== void 0
            ? arguments[0]
            : "link",
        n =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      if (
        (this.root.classList.remove("ql-hidden"),
        this.root.classList.add("ql-editing"),
        this.textbox == null)
      )
        return;
      n != null
        ? (this.textbox.value = n)
        : t !== this.root.getAttribute("data-mode") &&
          (this.textbox.value = "");
      const r = this.quill.getBounds(this.quill.selection.savedRange);
      r != null && this.position(r),
        this.textbox.select(),
        this.textbox.setAttribute(
          "placeholder",
          this.textbox.getAttribute(`data-${t}`) || ""
        ),
        this.root.setAttribute("data-mode", t);
    }
    restoreFocus() {
      this.quill.focus({ preventScroll: !0 });
    }
    save() {
      let { value: t } = this.textbox;
      switch (this.root.getAttribute("data-mode")) {
        case "link": {
          const { scrollTop: n } = this.quill.root;
          this.linkRange
            ? (this.quill.formatText(this.linkRange, "link", t, X.sources.USER),
              delete this.linkRange)
            : (this.restoreFocus(),
              this.quill.format("link", t, X.sources.USER)),
            (this.quill.root.scrollTop = n);
          break;
        }
        case "video":
          t = DA(t);
        case "formula": {
          if (!t) break;
          const n = this.quill.getSelection(!0);
          if (n != null) {
            const r = n.index + n.length;
            this.quill.insertEmbed(
              r,
              this.root.getAttribute("data-mode"),
              t,
              X.sources.USER
            ),
              this.root.getAttribute("data-mode") === "formula" &&
                this.quill.insertText(r + 1, " ", X.sources.USER),
              this.quill.setSelection(r + 2, X.sources.USER);
          }
          break;
        }
      }
      (this.textbox.value = ""), this.hide();
    }
  }
  function DA(e) {
    let t =
      e.match(
        /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
      ) ||
      e.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    return t
      ? `${t[1] || "https"}://www.youtube.com/embed/${t[2]}?showinfo=0`
      : (t = e.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/))
      ? `${t[1] || "https"}://player.vimeo.com/video/${t[2]}/`
      : e;
  }
  function ds(e, t) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    t.forEach((r) => {
      const i = document.createElement("option");
      r === n
        ? i.setAttribute("selected", "selected")
        : i.setAttribute("value", String(r)),
        e.appendChild(i);
    });
  }
  const MA = [
    ["bold", "italic", "link"],
    [{ header: 1 }, { header: 2 }, "blockquote"],
  ];
  class Vm extends zm {
    constructor(t, n) {
      super(t, n),
        this.quill.on(X.events.EDITOR_CHANGE, (r, i, s, o) => {
          if (r === X.events.SELECTION_CHANGE)
            if (i != null && i.length > 0 && o === X.sources.USER) {
              this.show(),
                (this.root.style.left = "0px"),
                (this.root.style.width = ""),
                (this.root.style.width = `${this.root.offsetWidth}px`);
              const a = this.quill.getLines(i.index, i.length);
              if (a.length === 1) {
                const l = this.quill.getBounds(i);
                l != null && this.position(l);
              } else {
                const l = a[a.length - 1],
                  c = this.quill.getIndex(l),
                  f = Math.min(l.length() - 1, i.index + i.length - c),
                  d = this.quill.getBounds(new ti(c, f));
                d != null && this.position(d);
              }
            } else
              document.activeElement !== this.textbox &&
                this.quill.hasFocus() &&
                this.hide();
        });
    }
    listen() {
      super.listen(),
        this.root.querySelector(".ql-close").addEventListener("click", () => {
          this.root.classList.remove("ql-editing");
        }),
        this.quill.on(X.events.SCROLL_OPTIMIZE, () => {
          setTimeout(() => {
            if (this.root.classList.contains("ql-hidden")) return;
            const t = this.quill.getSelection();
            if (t != null) {
              const n = this.quill.getBounds(t);
              n != null && this.position(n);
            }
          }, 1);
        });
    }
    cancel() {
      this.show();
    }
    position(t) {
      const n = super.position(t),
        r = this.root.querySelector(".ql-tooltip-arrow");
      return (
        (r.style.marginLeft = ""),
        n !== 0 && (r.style.marginLeft = `${-1 * n - r.offsetWidth / 2}px`),
        n
      );
    }
  }
  G(
    Vm,
    "TEMPLATE",
    [
      '<span class="ql-tooltip-arrow"></span>',
      '<div class="ql-tooltip-editor">',
      '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
      '<a class="ql-close"></a>',
      "</div>",
    ].join("")
  );
  class Km extends ao {
    constructor(t, n) {
      n.modules.toolbar != null &&
        n.modules.toolbar.container == null &&
        (n.modules.toolbar.container = MA),
        super(t, n),
        this.quill.container.classList.add("ql-bubble");
    }
    extendToolbar(t) {
      (this.tooltip = new Vm(this.quill, this.options.bounds)),
        t.container != null &&
          (this.tooltip.root.appendChild(t.container),
          this.buildButtons(t.container.querySelectorAll("button"), Ys),
          this.buildPickers(t.container.querySelectorAll("select"), Ys));
    }
  }
  Km.DEFAULTS = Nr({}, ao.DEFAULTS, {
    modules: {
      toolbar: {
        handlers: {
          link(e) {
            e
              ? this.quill.theme.tooltip.edit()
              : this.quill.format("link", !1, L.sources.USER);
          },
        },
      },
    },
  });
  const PA = [
    [{ header: ["1", "2", "3", !1] }],
    ["bold", "italic", "underline", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];
  class Gm extends zm {
    constructor() {
      super(...arguments);
      G(this, "preview", this.root.querySelector("a.ql-preview"));
    }
    listen() {
      super.listen(),
        this.root
          .querySelector("a.ql-action")
          .addEventListener("click", (n) => {
            this.root.classList.contains("ql-editing")
              ? this.save()
              : this.edit("link", this.preview.textContent),
              n.preventDefault();
          }),
        this.root
          .querySelector("a.ql-remove")
          .addEventListener("click", (n) => {
            if (this.linkRange != null) {
              const r = this.linkRange;
              this.restoreFocus(),
                this.quill.formatText(r, "link", !1, X.sources.USER),
                delete this.linkRange;
            }
            n.preventDefault(), this.hide();
          }),
        this.quill.on(X.events.SELECTION_CHANGE, (n, r, i) => {
          if (n != null) {
            if (n.length === 0 && i === X.sources.USER) {
              const [s, o] = this.quill.scroll.descendant(Tr, n.index);
              if (s != null) {
                this.linkRange = new ti(n.index - o, s.length());
                const a = Tr.formats(s.domNode);
                (this.preview.textContent = a),
                  this.preview.setAttribute("href", a),
                  this.show();
                const l = this.quill.getBounds(this.linkRange);
                l != null && this.position(l);
                return;
              }
            } else delete this.linkRange;
            this.hide();
          }
        });
    }
    show() {
      super.show(), this.root.removeAttribute("data-mode");
    }
  }
  G(
    Gm,
    "TEMPLATE",
    [
      '<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>',
      '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
      '<a class="ql-action"></a>',
      '<a class="ql-remove"></a>',
    ].join("")
  );
  class Wm extends ao {
    constructor(t, n) {
      n.modules.toolbar != null &&
        n.modules.toolbar.container == null &&
        (n.modules.toolbar.container = PA),
        super(t, n),
        this.quill.container.classList.add("ql-snow");
    }
    extendToolbar(t) {
      t.container != null &&
        (t.container.classList.add("ql-snow"),
        this.buildButtons(t.container.querySelectorAll("button"), Ys),
        this.buildPickers(t.container.querySelectorAll("select"), Ys),
        (this.tooltip = new Gm(this.quill, this.options.bounds)),
        t.container.querySelector(".ql-link") &&
          this.quill.keyboard.addBinding({ key: "k", shortKey: !0 }, (n, r) => {
            t.handlers.link.call(t, !r.format.link);
          }));
    }
  }
  Wm.DEFAULTS = Nr({}, ao.DEFAULTS, {
    modules: {
      toolbar: {
        handlers: {
          link(e) {
            if (e) {
              const t = this.quill.getSelection();
              if (t == null || t.length === 0) return;
              let n = this.quill.getText(t);
              /^\S+@\S+\.\S+$/.test(n) &&
                n.indexOf("mailto:") !== 0 &&
                (n = `mailto:${n}`);
              const { tooltip: r } = this.quill.theme;
              r.edit("link", n);
            } else this.quill.format("link", !1, L.sources.USER);
          },
        },
      },
    },
  });
  L.register(
    {
      "attributors/attribute/direction": Cm,
      "attributors/class/align": _m,
      "attributors/class/background": e_,
      "attributors/class/color": t_,
      "attributors/class/direction": Nm,
      "attributors/class/font": Om,
      "attributors/class/size": qm,
      "attributors/style/align": Am,
      "attributors/style/background": Pu,
      "attributors/style/color": Mu,
      "attributors/style/direction": Im,
      "attributors/style/font": Lm,
      "attributors/style/size": Rm,
    },
    !0
  );
  L.register(
    {
      "formats/align": _m,
      "formats/direction": Nm,
      "formats/indent": V_,
      "formats/background": Pu,
      "formats/color": Mu,
      "formats/font": Om,
      "formats/size": qm,
      "formats/blockquote": Kc,
      "formats/code-block": Ee,
      "formats/header": Gc,
      "formats/list": oo,
      "formats/bold": Ws,
      "formats/code": Bu,
      "formats/italic": Wc,
      "formats/link": Tr,
      "formats/script": Yc,
      "formats/strike": Xc,
      "formats/underline": Zc,
      "formats/formula": Go,
      "formats/image": Jc,
      "formats/video": Wo,
      "modules/syntax": $m,
      "modules/table": G_,
      "modules/toolbar": Hu,
      "themes/bubble": Km,
      "themes/snow": Wm,
      "ui/icons": Ys,
      "ui/picker": Ha,
      "ui/icon-picker": Um,
      "ui/color-picker": jm,
      "ui/tooltip": Hm,
    },
    !0
  );
  const BA = {
    name: "RichTextEditor",
    props: {
      value: { type: String, default: "" },
      disabled: { type: Boolean, default: !1 },
      placeholder: { type: String, default: "Digite o conteúdo aqui..." },
      tabIndex: { type: Number, default: 0 },
    },
    emits: ["input", "change", "editor-ready", "tab-pressed"],
    data() {
      return {
        editor: null,
        content: this.value,
        isInitialized: !1,
        containerId: `quill-editor-${Math.random()
          .toString(36)
          .substring(2, 9)}`,
      };
    },
    computed: {
      isReadOnly() {
        return this.disabled;
      },
    },
    watch: {
      value(e) {
        this.editor &&
          e !== this.editor.root.innerHTML &&
          (this.editor.root.innerHTML = e);
      },
      disabled(e) {
        this.editor && this.editor.enable(!e);
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.initQuill();
      });
    },
    methods: {
      initQuill() {
        if (!document.getElementById(this.containerId)) return;
        const t = [
          ["bold", "italic", "underline"],
          [{ color: [] }],
          ["code"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["clean"],
        ];
        (this.editor = new L(`#${this.containerId}`, {
          modules: {
            toolbar: t,
            keyboard: {
              bindings: {
                tab: {
                  key: 9,
                  handler: (n, r) => (
                    console.log("Tab pressed in Quill editor"),
                    this.$emit("tab-pressed"),
                    !1
                  ),
                },
              },
            },
          },
          theme: "snow",
          placeholder: this.placeholder,
          readOnly: this.isReadOnly,
          formats: [
            "bold",
            "italic",
            "underline",
            "color",
            "background",
            "code",
            "list",
            "indent",
            "align",
          ],
        })),
          (this.editor.root.style.fontFamily = "Calibri, sans-serif"),
          (this.editor.root.style.fontSize = "18px"),
          this.value && (this.editor.root.innerHTML = this.value),
          this.editor.on("text-change", () => {
            (this.content = this.editor.root.innerHTML),
              this.$emit("input", this.content),
              this.$emit("change", this.content);
          }),
          (this.isInitialized = !0),
          this.$emit("editor-ready", this.editor);
      },
      focus() {
        this.editor && !this.disabled && this.editor.focus();
      },
    },
  };
  function FA(e, t, n, r, i, s) {
    return null;
  }
  const Ym = Be(BA, [
      ["render", FA],
      ["__scopeId", "data-v-23cf69d0"],
    ]),
    $A = {
      name: "ModalRequisito",
      components: { "rich-text-editor": Ym },
      props: {
        show: Boolean,
        titulo: String,
        requisito: Object,
        modoVisualizacao: Boolean,
        totalRequisitos: { type: Number, default: 0 },
      },
      data() {
        return {
          tabAtiva: 0,
          tabs: [
            { id: 0, nome: "Informações básicas" },
            { id: 1, nome: "Imagens e Descrição" },
            { id: 2, nome: "Regras" },
            { id: 3, nome: "Banco de dados" },
          ],
          isDarkMode: document.documentElement.classList.contains("dark"),
          shouldFocusUploadButton: !1,
          descricaoContent: "",
          editor: null,
          validacoesContent: "",
          regrasContent: "",
          bancoContent: "",
          validacoesEditor: null,
          regrasEditor: null,
          bancoEditor: null,
        };
      },
      computed: {
        tabIndexes() {
          return {
            tab0: 101,
            tab1: 102,
            tab2: 103,
            tab3: 104,
            tituloRF: 111,
            tipo: 112,
            local: 113,
            usuario: 114,
            perfil: 115,
            selectImagens: 211,
            descricao: 220,
            validacoes: 311,
            regras: 312,
            banco: 411,
            btnSalvar: 501,
            btnCancelar: 502,
            btnVoltar: 501,
          };
        },
      },
      watch: {
        show(e) {
          e
            ? (document.body.classList.add("modal-open"),
              (this.tabAtiva = 0),
              (this.isDarkMode =
                document.documentElement.classList.contains("dark")),
              (this.descricaoContent = this.requisito.descricao || ""),
              (this.validacoesContent = this.requisito.validacoes || ""),
              (this.regrasContent = this.requisito.regras || ""),
              (this.bancoContent = this.requisito.banco || ""),
              this.$nextTick(() => {
                if (!this.editor) {
                  const t = document.querySelector(".ql-editor");
                  t && t.quill && (this.editor = t.quill);
                }
                setTimeout(() => {
                  const t = document.getElementById("req-tituloRF");
                  t && t.focus();
                }, 50);
              }))
            : document.body.classList.remove("modal-open");
        },
        requisito: {
          handler(e) {
            e &&
              ((this.descricaoContent = e.descricao || ""),
              (this.validacoesContent = e.validacoes || ""),
              (this.regrasContent = e.regras || ""),
              (this.bancoContent = e.banco || ""));
          },
          deep: !0,
          immediate: !0,
        },
        descricaoContent(e) {
          this.requisito && (this.requisito.descricao = e);
        },
        validacoesContent(e) {
          this.requisito && (this.requisito.validacoes = e);
        },
        regrasContent(e) {
          this.requisito && (this.requisito.regras = e);
        },
        bancoContent(e) {
          this.requisito && (this.requisito.banco = e);
        },
      },
      methods: {
        focarPrimeiroElementoDaAba() {
          if (this.$refs[`abaConteudo${this.tabAtiva}`]) {
            const t = this.$el.querySelector(
              "button, input, select, textarea, .ql-editor"
            );
            t && t.focus();
          }
        },
        onEditorReady(e) {
          this.editor = e;
        },
        handleEditorTab() {
          this.trocarAba(2),
            setTimeout(() => {
              const e = document.getElementById("req-validacoes");
              if (e)
                e.focus(),
                  e.value &&
                    (e.selectionStart = e.selectionEnd = e.value.length),
                  console.log("Focused on validacoes field");
              else {
                console.warn("Validacoes field not found in the DOM");
                const t = this.$refs.abaConteudo2;
                if (t) {
                  const n = t.querySelector("textarea");
                  n
                    ? (n.focus(),
                      console.log("Focused on textarea via fallback"))
                    : console.warn("No textarea found in tab content");
                } else console.warn("Tab content ref not found");
              }
            }, 200);
        },
        onKeydown(e, t) {
          e.key === "Tab" &&
            !e.shiftKey &&
            t !== void 0 &&
            (e.preventDefault(),
            t < this.tabs.length
              ? (this.trocarAba(t),
                t === 1 && (this.shouldFocusUploadButton = !0))
              : this.$refs.btnSalvar && this.$refs.btnSalvar.focus());
        },
        trocarAba(e) {
          this.tabAtiva === 1
            ? (this.requisito.descricao = this.descricaoContent)
            : this.tabAtiva === 2
            ? ((this.requisito.validacoes = this.validacoesContent),
              (this.requisito.regras = this.regrasContent))
            : this.tabAtiva === 3 && (this.requisito.banco = this.bancoContent),
            (this.tabAtiva = e),
            document
              .querySelectorAll(".border-red-500, .campo-erro")
              .forEach((n) => {
                n.classList.remove(
                  "border-red-500",
                  "focus:border-red-500",
                  "focus:ring-red-500",
                  "border-2",
                  "campo-erro"
                ),
                  (n.style.borderColor = ""),
                  (n.style.borderWidth = ""),
                  (n.style.borderTopWidth = ""),
                  (n.style.borderBottomWidth = "");
              }),
            this.$nextTick(() => {
              e === 1
                ? (this.descricaoContent = this.requisito.descricao || "")
                : e === 2
                ? ((this.validacoesContent = this.requisito.validacoes || ""),
                  (this.regrasContent = this.requisito.regras || ""))
                : e === 3 && (this.bancoContent = this.requisito.banco || ""),
                e === 1 &&
                this.$refs.uploadButton &&
                this.shouldFocusUploadButton
                  ? (this.$refs.uploadButton.focus(),
                    (this.shouldFocusUploadButton = !1))
                  : this.focarPrimeiroElementoDaAba();
            });
        },
        limparErroEditor() {
          const e = document.querySelector(".ql-container"),
            t = document.querySelector(".ql-toolbar");
          e &&
            (e.classList.remove("campo-erro"),
            (e.style.borderColor = ""),
            (e.style.borderWidth = ""),
            (e.style.borderTopWidth = "")),
            t &&
              (t.classList.remove("campo-erro"),
              (t.style.borderColor = ""),
              (t.style.borderWidth = ""),
              (t.style.borderBottomWidth = ""));
        },
        fecharModal() {
          this.requisito &&
            ((this.requisito.descricao = this.descricaoContent),
            (this.requisito.validacoes = this.validacoesContent),
            (this.requisito.regras = this.regrasContent),
            (this.requisito.banco = this.bancoContent)),
            this.$emit("fechar");
        },
        salvarRequisito() {
          if (
            (document.querySelectorAll(".campo-erro").forEach((n) => {
              n.classList.remove("campo-erro");
            }),
            !this.requisito.tituloRF)
          ) {
            (this.tabAtiva = 0),
              setTimeout(() => {
                const n = document.getElementById("req-tituloRF");
                n && (n.classList.add("campo-erro"), n.focus());
              }, 50);
            return;
          }
          if (!this.requisito.tipo) {
            (this.tabAtiva = 0),
              setTimeout(() => {
                const n = document.getElementById("req-tipo");
                n && (n.classList.add("campo-erro"), n.focus());
              }, 50);
            return;
          }
          if (!this.requisito.local) {
            (this.tabAtiva = 0),
              setTimeout(() => {
                const n = document.getElementById("req-local");
                n && (n.classList.add("campo-erro"), n.focus());
              }, 50);
            return;
          }
          if (!this.requisito.usuario) {
            (this.tabAtiva = 0),
              setTimeout(() => {
                const n = document.getElementById("req-usuario");
                n && (n.classList.add("campo-erro"), n.focus());
              }, 50);
            return;
          }
          if (!this.requisito.perfil) {
            (this.tabAtiva = 0),
              setTimeout(() => {
                const n = document.getElementById("req-perfil");
                n && (n.classList.add("campo-erro"), n.focus());
              }, 50);
            return;
          }
          if (!this.requisito.descricao) {
            (this.tabAtiva = 1),
              setTimeout(() => {
                const n = document.querySelector(".ql-container"),
                  r = document.querySelector(".ql-toolbar"),
                  i = document.querySelector(".ql-editor");
                if (n) {
                  n.classList.add("campo-erro"),
                    r &&
                      (r.classList.add("campo-erro"),
                      (r.style.borderColor = "var(--error-color)"),
                      (r.style.borderWidth = "2px"),
                      (r.style.borderBottomWidth = "0"),
                      this.isDarkMode &&
                        (r.style.borderColor = "var(--error-color-dark)")),
                    (n.style.borderColor = "var(--error-color)"),
                    (n.style.borderWidth = "2px"),
                    (n.style.borderTopWidth = "0"),
                    this.isDarkMode &&
                      (n.style.borderColor = "var(--error-color-dark)");
                  try {
                    i &&
                      (i.focus(),
                      this.editor &&
                        typeof this.editor.focus == "function" &&
                        this.editor.focus());
                  } catch (s) {
                    console.warn("Não foi possível focar no editor:", s);
                  }
                }
              }, 50);
            return;
          }
          const e = (n) =>
            !n || n.replace(/<[^>]*>/g, "").trim() === "" ? "" : n;
          (this.requisito.descricao = e(this.descricaoContent)),
            (this.requisito.validacoes = e(this.validacoesContent)),
            (this.requisito.regras = e(this.regrasContent)),
            (this.requisito.banco = e(this.bancoContent));
          const t = this.requisito.id
            ? parseInt(this.requisito.id.split("-")[1]) - 1
            : -1;
          if (t >= 0)
            this.$emit(
              "update-requisito",
              t,
              JSON.parse(JSON.stringify(this.requisito)),
              !0
            );
          else {
            const n = "RF-" + String(this.totalRequisitos + 1).padStart(2, "0");
            (this.requisito.id = n),
              this.$emit(
                "add-requisito",
                JSON.parse(JSON.stringify(this.requisito)),
                !0
              );
          }
          this.$emit("fechar", !0);
        },
        handleFileUpload(e) {
          this.$emit("upload-imagem", e);
        },
        removerImagem(e) {
          this.$emit("remover-imagem", e);
        },
        updateDescricaoContent(e) {
          const t = !e || e.replace(/<[^>]*>/g, "").trim() === "";
          (this.descricaoContent = t ? "" : e),
            this.requisito && (this.requisito.descricao = t ? "" : e),
            t || this.limparErroEditor();
        },
        updateValidacoesContent(e) {
          const t = !e || e.replace(/<[^>]*>/g, "").trim() === "";
          (this.validacoesContent = t ? "" : e),
            this.requisito && (this.requisito.validacoes = t ? "" : e);
        },
        updateRegrasContent(e) {
          const t = !e || e.replace(/<[^>]*>/g, "").trim() === "";
          (this.regrasContent = t ? "" : e),
            this.requisito && (this.requisito.regras = t ? "" : e);
        },
        updateBancoContent(e) {
          const t = !e || e.replace(/<[^>]*>/g, "").trim() === "";
          (this.bancoContent = t ? "" : e),
            this.requisito && (this.requisito.banco = t ? "" : e);
        },
        onValidacoesEditorReady(e) {
          this.validacoesEditor = e;
        },
        onRegrasEditorReady(e) {
          this.regrasEditor = e;
        },
        onBancoEditorReady(e) {
          this.bancoEditor = e;
        },
        handleValidacoesTab() {
          const e = this.$el.querySelector("#regras-editor .ql-editor");
          e &&
            setTimeout(() => {
              e.focus();
            }, 200);
        },
        handleRegrasTab() {
          this.trocarAba(3);
        },
        handleBancoTab() {
          this.$refs.btnSalvar && this.$refs.btnSalvar.focus();
        },
        onSaveButtonKeydown(e) {
          e.key === "Tab" &&
            !e.shiftKey &&
            (e.preventDefault(),
            this.$refs.btnCancelar && this.$refs.btnCancelar.focus());
        },
        onCancelButtonKeydown(e) {
          if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            const t = this.$el.querySelector(
              "button, input, select, textarea, .ql-editor"
            );
            t && t.focus();
          }
        },
      },
      mounted() {
        this.$nextTick(() => {
          this.$refs.btnSalvar &&
            this.$refs.btnSalvar.addEventListener(
              "keydown",
              this.onSaveButtonKeydown
            ),
            this.$refs.btnCancelar &&
              this.$refs.btnCancelar.addEventListener(
                "keydown",
                this.onCancelButtonKeydown
              );
        });
      },
      updated() {
        this.$nextTick(() => {
          this.tabAtiva === 1 &&
            this.$refs.uploadButton &&
            document.activeElement &&
            document.activeElement.id === "req-perfil" &&
            this.$refs.uploadButton.focus();
        });
      },
      beforeUnmount() {
        this.$refs.btnSalvar &&
          this.$refs.btnSalvar.removeEventListener(
            "keydown",
            this.onSaveButtonKeydown
          ),
          this.$refs.btnCancelar &&
            this.$refs.btnCancelar.removeEventListener(
              "keydown",
              this.onCancelButtonKeydown
            );
      },
    },
    jA = { key: 0, class: "modal-requisito-overlay" },
    UA = { class: "modal-requisito-header" },
    HA = ["onClick", "tabindex"],
    zA = { class: "modal-content-container" },
    VA = { key: 0, class: "modal-section", ref: "abaConteudo0" },
    KA = { class: "grid grid-cols-4 gap-4" },
    GA = { class: "modal-form-group col-span-3" },
    WA = ["placeholder", "disabled", "tabindex"],
    YA = { class: "modal-form-group col-span-1" },
    XA = ["disabled", "tabindex"],
    ZA = { key: 0, value: "" },
    JA = { class: "modal-form-group" },
    QA = ["placeholder", "disabled", "tabindex"],
    t2 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" },
    e2 = { class: "modal-form-group" },
    n2 = ["placeholder", "disabled", "tabindex"],
    r2 = { class: "modal-form-group" },
    i2 = ["placeholder", "disabled", "tabindex"],
    s2 = { key: 1, class: "modal-section", ref: "abaConteudo1" },
    o2 = { key: 0, class: "modal-form-group" },
    a2 = ["tabindex"],
    l2 = { key: 0, class: "modal-image-grid" },
    c2 = ["src"],
    u2 = ["onClick", "tabindex"],
    f2 = { key: 1, class: "modal-form-group" },
    d2 = { key: 0, class: "modal-view-images-grid" },
    h2 = ["src"],
    p2 = { class: "modal-form-group" },
    m2 = { key: 1, class: "quill-editor-container modo-visualizacao" },
    g2 = { class: "ql-container ql-snow" },
    b2 = ["innerHTML"],
    v2 = { key: 2, class: "modal-section", ref: "abaConteudo2" },
    y2 = { class: "modal-form-group" },
    w2 = {
      key: 2,
      class: "quill-editor-container modo-visualizacao",
      style: { "min-height": "90px" },
    },
    E2 = { class: "ql-container ql-snow" },
    S2 = ["innerHTML"],
    x2 = { class: "modal-form-group" },
    _2 = {
      key: 2,
      class: "quill-editor-container modo-visualizacao",
      style: { "min-height": "90px" },
    },
    A2 = { class: "ql-container ql-snow" },
    T2 = ["innerHTML"],
    C2 = { key: 3, class: "modal-section", ref: "abaConteudo3" },
    N2 = { class: "modal-form-group" },
    I2 = {
      key: 2,
      class: "quill-editor-container modo-visualizacao",
      style: { "min-height": "200px" },
    },
    k2 = { class: "ql-container ql-snow" },
    O2 = ["innerHTML"],
    L2 = ["tabindex"],
    q2 = ["tabindex"],
    R2 = ["tabindex"];
  function D2(e, t, n, r, i, s) {
    const o = Ie("rich-text-editor");
    return n.show
      ? ($(),
        K("div", jA, [
          S(
            "div",
            {
              class: rt([
                "modal-requisito-container",
                i.isDarkMode ? "modal-requisito-dark" : "modal-requisito-light",
                { "modo-visualizacao": n.modoVisualizacao },
              ]),
            },
            [
              S("div", UA, [
                S(
                  "h2",
                  {
                    class: rt([
                      "modal-requisito-title",
                      i.isDarkMode
                        ? "modal-requisito-title-dark"
                        : "modal-requisito-title-light",
                    ]),
                  },
                  Ht(n.titulo),
                  3
                ),
                n.modoVisualizacao
                  ? ($(),
                    K(
                      "span",
                      {
                        key: 0,
                        class: rt([
                          "modal-view-badge",
                          i.isDarkMode
                            ? "modal-view-badge-dark"
                            : "modal-view-badge-light",
                        ]),
                      },
                      " Modo Visualização ",
                      2
                    ))
                  : Kt("", !0),
              ]),
              S(
                "div",
                {
                  class: rt([
                    "modal-tabs-container",
                    i.isDarkMode
                      ? "modal-tabs-border-dark"
                      : "modal-tabs-border-light",
                  ]),
                },
                [
                  ($(!0),
                  K(
                    qt,
                    null,
                    pn(
                      i.tabs,
                      (a) => (
                        $(),
                        K(
                          "button",
                          {
                            key: a.id,
                            onClick: (l) => s.trocarAba(a.id),
                            class: rt([
                              "modal-tab-button",
                              [
                                i.tabAtiva === a.id
                                  ? i.isDarkMode
                                    ? "modal-tab-active-dark"
                                    : "modal-tab-active-light"
                                  : i.isDarkMode
                                  ? "modal-tab-inactive-dark"
                                  : "modal-tab-inactive-light",
                              ],
                            ]),
                            tabindex: s.tabIndexes["tab" + a.id],
                          },
                          Ht(a.nome),
                          11,
                          HA
                        )
                      )
                    ),
                    128
                  )),
                ],
                2
              ),
              S("div", zA, [
                i.tabAtiva === 0
                  ? ($(),
                    K(
                      "div",
                      VA,
                      [
                        S("div", KA, [
                          S("div", GA, [
                            S(
                              "label",
                              {
                                for: "req-tituloRF",
                                class: rt([
                                  "modal-form-label",
                                  i.isDarkMode
                                    ? "modal-form-label-dark"
                                    : "modal-form-label-light",
                                ]),
                              },
                              t[12] ||
                                (t[12] = [
                                  ee(" Título "),
                                  S("span", { class: "text-red-600" }, "*", -1),
                                ]),
                              2
                            ),
                            ke(
                              S(
                                "input",
                                {
                                  type: "text",
                                  id: "req-tituloRF",
                                  "onUpdate:modelValue":
                                    t[0] ||
                                    (t[0] = (a) => (n.requisito.tituloRF = a)),
                                  class: rt([
                                    "modal-form-input",
                                    i.isDarkMode
                                      ? "modal-form-input-dark"
                                      : "modal-form-input-light",
                                  ]),
                                  placeholder: n.modoVisualizacao
                                    ? ""
                                    : "Título do requisito funcional",
                                  disabled: n.modoVisualizacao,
                                  tabindex: s.tabIndexes.tituloRF,
                                },
                                null,
                                10,
                                WA
                              ),
                              [[Me, n.requisito.tituloRF]]
                            ),
                          ]),
                          S("div", YA, [
                            S(
                              "label",
                              {
                                for: "req-tipo",
                                class: rt([
                                  "modal-form-label",
                                  i.isDarkMode
                                    ? "modal-form-label-dark"
                                    : "modal-form-label-light",
                                ]),
                              },
                              t[13] ||
                                (t[13] = [
                                  ee(" Tipo "),
                                  S("span", { class: "text-red-600" }, "*", -1),
                                ]),
                              2
                            ),
                            ke(
                              S(
                                "select",
                                {
                                  id: "req-tipo",
                                  "onUpdate:modelValue":
                                    t[1] ||
                                    (t[1] = (a) => (n.requisito.tipo = a)),
                                  class: rt([
                                    "modal-form-input",
                                    i.isDarkMode
                                      ? "modal-form-input-dark"
                                      : "modal-form-input-light",
                                  ]),
                                  disabled: n.modoVisualizacao,
                                  tabindex: s.tabIndexes.tipo,
                                },
                                [
                                  n.modoVisualizacao
                                    ? Kt("", !0)
                                    : ($(), K("option", ZA, "Selecione")),
                                  t[14] ||
                                    (t[14] = S(
                                      "option",
                                      { value: "Alteração" },
                                      "Alteração",
                                      -1
                                    )),
                                  t[15] ||
                                    (t[15] = S(
                                      "option",
                                      { value: "Inclusão" },
                                      "Inclusão",
                                      -1
                                    )),
                                  t[16] ||
                                    (t[16] = S(
                                      "option",
                                      { value: "Remoção" },
                                      "Remoção",
                                      -1
                                    )),
                                ],
                                10,
                                XA
                              ),
                              [[V0, n.requisito.tipo]]
                            ),
                          ]),
                        ]),
                        S("div", JA, [
                          S(
                            "label",
                            {
                              for: "req-local",
                              class: rt([
                                "modal-form-label",
                                i.isDarkMode
                                  ? "modal-form-label-dark"
                                  : "modal-form-label-light",
                              ]),
                            },
                            t[17] ||
                              (t[17] = [
                                ee(" Local "),
                                S("span", { class: "text-red-600" }, "*", -1),
                              ]),
                            2
                          ),
                          ke(
                            S(
                              "input",
                              {
                                type: "text",
                                id: "req-local",
                                "onUpdate:modelValue":
                                  t[2] ||
                                  (t[2] = (a) => (n.requisito.local = a)),
                                class: rt([
                                  "modal-form-input",
                                  i.isDarkMode
                                    ? "modal-form-input-dark"
                                    : "modal-form-input-light",
                                ]),
                                placeholder: n.modoVisualizacao
                                  ? ""
                                  : "Local de implementação",
                                disabled: n.modoVisualizacao,
                                tabindex: s.tabIndexes.local,
                              },
                              null,
                              10,
                              QA
                            ),
                            [[Me, n.requisito.local]]
                          ),
                        ]),
                        S("div", t2, [
                          S("div", e2, [
                            S(
                              "label",
                              {
                                for: "req-usuario",
                                class: rt([
                                  "modal-form-label",
                                  i.isDarkMode
                                    ? "modal-form-label-dark"
                                    : "modal-form-label-light",
                                ]),
                              },
                              t[18] ||
                                (t[18] = [
                                  ee(" Usuário "),
                                  S("span", { class: "text-red-600" }, "*", -1),
                                ]),
                              2
                            ),
                            ke(
                              S(
                                "input",
                                {
                                  type: "text",
                                  id: "req-usuario",
                                  "onUpdate:modelValue":
                                    t[3] ||
                                    (t[3] = (a) => (n.requisito.usuario = a)),
                                  class: rt([
                                    "modal-form-input",
                                    i.isDarkMode
                                      ? "modal-form-input-dark"
                                      : "modal-form-input-light",
                                  ]),
                                  placeholder: n.modoVisualizacao
                                    ? ""
                                    : "Usuário alvo",
                                  disabled: n.modoVisualizacao,
                                  tabindex: s.tabIndexes.usuario,
                                },
                                null,
                                10,
                                n2
                              ),
                              [[Me, n.requisito.usuario]]
                            ),
                          ]),
                          S("div", r2, [
                            S(
                              "label",
                              {
                                for: "req-perfil",
                                class: rt([
                                  "modal-form-label",
                                  i.isDarkMode
                                    ? "modal-form-label-dark"
                                    : "modal-form-label-light",
                                ]),
                              },
                              t[19] ||
                                (t[19] = [
                                  ee(" Perfil "),
                                  S("span", { class: "text-red-600" }, "*", -1),
                                ]),
                              2
                            ),
                            ke(
                              S(
                                "input",
                                {
                                  type: "text",
                                  id: "req-perfil",
                                  "onUpdate:modelValue":
                                    t[4] ||
                                    (t[4] = (a) => (n.requisito.perfil = a)),
                                  class: rt([
                                    "modal-form-input",
                                    i.isDarkMode
                                      ? "modal-form-input-dark"
                                      : "modal-form-input-light",
                                  ]),
                                  placeholder: n.modoVisualizacao
                                    ? ""
                                    : "Perfil de acesso",
                                  disabled: n.modoVisualizacao,
                                  tabindex: s.tabIndexes.perfil,
                                  onKeydown:
                                    t[5] || (t[5] = (a) => s.onKeydown(a, 1)),
                                },
                                null,
                                42,
                                i2
                              ),
                              [[Me, n.requisito.perfil]]
                            ),
                          ]),
                        ]),
                      ],
                      512
                    ))
                  : Kt("", !0),
                i.tabAtiva === 1
                  ? ($(),
                    K(
                      "div",
                      s2,
                      [
                        n.modoVisualizacao
                          ? Kt("", !0)
                          : ($(),
                            K("div", o2, [
                              S(
                                "label",
                                {
                                  class: rt([
                                    "modal-form-label",
                                    i.isDarkMode
                                      ? "modal-form-label-dark"
                                      : "modal-form-label-light",
                                  ]),
                                  for: "btn-select-images",
                                },
                                " Imagens ",
                                2
                              ),
                              S(
                                "div",
                                {
                                  ref: "uploadArea",
                                  class: rt([
                                    "modal-upload-area",
                                    i.isDarkMode
                                      ? "modal-upload-area-dark"
                                      : "modal-upload-area-light",
                                  ]),
                                },
                                [
                                  S(
                                    "input",
                                    {
                                      type: "file",
                                      ref: "fileInput",
                                      onChange:
                                        t[6] ||
                                        (t[6] = (...a) =>
                                          s.handleFileUpload &&
                                          s.handleFileUpload(...a)),
                                      multiple: "",
                                      accept: "image/*",
                                      class: "hidden",
                                      tabindex: "-1",
                                    },
                                    null,
                                    544
                                  ),
                                  S(
                                    "button",
                                    {
                                      id: "btn-select-images",
                                      onClick:
                                        t[7] ||
                                        (t[7] = (a) =>
                                          e.$refs.fileInput.click()),
                                      onKeydown:
                                        t[8] ||
                                        (t[8] = Ci(
                                          Sr(
                                            (a) => e.$refs.fileInput.click(),
                                            ["prevent"]
                                          ),
                                          ["enter"]
                                        )),
                                      type: "button",
                                      class: rt([
                                        "modal-upload-button",
                                        i.isDarkMode
                                          ? "modal-upload-button-dark"
                                          : "modal-upload-button-light",
                                      ]),
                                      tabindex: s.tabIndexes.selectImagens,
                                      ref: "uploadButton",
                                    },
                                    " Selecionar imagens ",
                                    42,
                                    a2
                                  ),
                                ],
                                2
                              ),
                              n.requisito.imagens &&
                              n.requisito.imagens.length > 0
                                ? ($(),
                                  K("div", l2, [
                                    ($(!0),
                                    K(
                                      qt,
                                      null,
                                      pn(
                                        n.requisito.imagens,
                                        (a, l) => (
                                          $(),
                                          K(
                                            "div",
                                            {
                                              key: l,
                                              class: "modal-image-container",
                                            },
                                            [
                                              S(
                                                "img",
                                                {
                                                  src: a,
                                                  alt: "Preview",
                                                  class: "modal-image",
                                                },
                                                null,
                                                8,
                                                c2
                                              ),
                                              S(
                                                "button",
                                                {
                                                  onClick: (c) =>
                                                    s.removerImagem(l),
                                                  class:
                                                    "modal-image-remove-button",
                                                  tabindex:
                                                    s.tabIndexes.selectImagens +
                                                    1 +
                                                    l,
                                                },
                                                " × ",
                                                8,
                                                u2
                                              ),
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ]))
                                : Kt("", !0),
                            ])),
                        n.modoVisualizacao
                          ? ($(),
                            K("div", f2, [
                              S(
                                "label",
                                {
                                  class: rt([
                                    "modal-form-label",
                                    i.isDarkMode
                                      ? "modal-form-label-dark"
                                      : "modal-form-label-light",
                                  ]),
                                },
                                " Imagens ",
                                2
                              ),
                              n.requisito.imagens &&
                              n.requisito.imagens.length > 0
                                ? ($(),
                                  K("div", d2, [
                                    ($(!0),
                                    K(
                                      qt,
                                      null,
                                      pn(
                                        n.requisito.imagens,
                                        (a, l) => (
                                          $(),
                                          K(
                                            "div",
                                            {
                                              key: l,
                                              class: "modal-image-container",
                                            },
                                            [
                                              S(
                                                "img",
                                                {
                                                  src: a,
                                                  alt: "Imagem do requisito",
                                                  class: rt([
                                                    "modal-view-image",
                                                    i.isDarkMode
                                                      ? "modal-view-image-dark"
                                                      : "modal-view-image-light",
                                                  ]),
                                                },
                                                null,
                                                10,
                                                h2
                                              ),
                                            ]
                                          )
                                        )
                                      ),
                                      128
                                    )),
                                  ]))
                                : ($(),
                                  K(
                                    "div",
                                    {
                                      key: 1,
                                      class: rt([
                                        "modal-no-images",
                                        i.isDarkMode
                                          ? "modal-no-images-dark"
                                          : "modal-no-images-light",
                                      ]),
                                    },
                                    " Não foram inseridas imagens nesse RF ",
                                    2
                                  )),
                            ]))
                          : Kt("", !0),
                        S("div", p2, [
                          S(
                            "label",
                            {
                              for: "req-descricao",
                              class: rt([
                                "form-label mb-0",
                                i.isDarkMode
                                  ? "text-gray-200"
                                  : "text-gray-700",
                              ]),
                            },
                            t[20] ||
                              (t[20] = [
                                ee(" Descrição "),
                                S("span", { class: "text-red-600" }, "*", -1),
                              ]),
                            2
                          ),
                          n.modoVisualizacao
                            ? ($(),
                              K("div", m2, [
                                S("div", g2, [
                                  S(
                                    "div",
                                    {
                                      class: "ql-editor form-input",
                                      innerHTML:
                                        i.descricaoContent || "Sem descrição",
                                    },
                                    null,
                                    8,
                                    b2
                                  ),
                                ]),
                              ]))
                            : ($(),
                              Er(
                                o,
                                {
                                  key: 0,
                                  value: i.descricaoContent,
                                  disabled: n.modoVisualizacao,
                                  placeholder:
                                    "Descrição detalhada do requisito",
                                  tabIndex: s.tabIndexes.descricao,
                                  onInput: s.updateDescricaoContent,
                                  onChange: s.updateDescricaoContent,
                                  onEditorReady: s.onEditorReady,
                                  onTabPressed: s.handleEditorTab,
                                },
                                null,
                                8,
                                [
                                  "value",
                                  "disabled",
                                  "tabIndex",
                                  "onInput",
                                  "onChange",
                                  "onEditorReady",
                                  "onTabPressed",
                                ]
                              )),
                        ]),
                      ],
                      512
                    ))
                  : Kt("", !0),
                i.tabAtiva === 2
                  ? ($(),
                    K(
                      "div",
                      v2,
                      [
                        S("div", y2, [
                          S(
                            "label",
                            {
                              for: "req-validacoes",
                              class: rt([
                                "modal-form-label",
                                i.isDarkMode
                                  ? "modal-form-label-dark"
                                  : "modal-form-label-light",
                              ]),
                            },
                            " Regras de validações dos campos ",
                            2
                          ),
                          n.modoVisualizacao && !n.requisito.validacoes
                            ? ($(),
                              K(
                                "div",
                                {
                                  key: 0,
                                  class: rt([
                                    "modal-empty-field",
                                    i.isDarkMode
                                      ? "modal-empty-field-dark"
                                      : "modal-empty-field-light",
                                  ]),
                                  style: {
                                    "min-height": "90px",
                                    padding: "0.7rem",
                                  },
                                },
                                [
                                  S(
                                    "em",
                                    {
                                      class: rt(
                                        i.isDarkMode
                                          ? "modal-empty-text-dark"
                                          : "modal-empty-text-light"
                                      ),
                                    },
                                    "Não preenchido",
                                    2
                                  ),
                                ],
                                2
                              ))
                            : n.modoVisualizacao
                            ? ($(),
                              K("div", w2, [
                                S("div", E2, [
                                  S(
                                    "div",
                                    {
                                      class: "ql-editor form-input",
                                      innerHTML:
                                        i.validacoesContent || "Não preenchido",
                                    },
                                    null,
                                    8,
                                    S2
                                  ),
                                ]),
                              ]))
                            : ($(),
                              Er(
                                o,
                                {
                                  key: 1,
                                  value: i.validacoesContent,
                                  disabled: n.modoVisualizacao,
                                  placeholder:
                                    "Descreva as regras de validação",
                                  tabIndex: s.tabIndexes.validacoes,
                                  onInput: s.updateValidacoesContent,
                                  onChange: s.updateValidacoesContent,
                                  onEditorReady: s.onValidacoesEditorReady,
                                  onTabPressed: s.handleValidacoesTab,
                                  id: "validacoes-editor",
                                },
                                null,
                                8,
                                [
                                  "value",
                                  "disabled",
                                  "tabIndex",
                                  "onInput",
                                  "onChange",
                                  "onEditorReady",
                                  "onTabPressed",
                                ]
                              )),
                        ]),
                        S("div", x2, [
                          S(
                            "label",
                            {
                              for: "req-regras",
                              class: rt([
                                "modal-form-label",
                                i.isDarkMode
                                  ? "modal-form-label-dark"
                                  : "modal-form-label-light",
                              ]),
                            },
                            " Regras de negócio ",
                            2
                          ),
                          n.modoVisualizacao && !n.requisito.regras
                            ? ($(),
                              K(
                                "div",
                                {
                                  key: 0,
                                  class: rt([
                                    "modal-empty-field",
                                    i.isDarkMode
                                      ? "modal-empty-field-dark"
                                      : "modal-empty-field-light",
                                  ]),
                                  style: {
                                    "min-height": "90px",
                                    padding: "0.7rem",
                                  },
                                },
                                [
                                  S(
                                    "em",
                                    {
                                      class: rt(
                                        i.isDarkMode
                                          ? "modal-empty-text-dark"
                                          : "modal-empty-text-light"
                                      ),
                                    },
                                    "Não preenchido",
                                    2
                                  ),
                                ],
                                2
                              ))
                            : n.modoVisualizacao
                            ? ($(),
                              K("div", _2, [
                                S("div", A2, [
                                  S(
                                    "div",
                                    {
                                      class: "ql-editor form-input",
                                      innerHTML:
                                        i.regrasContent || "Não preenchido",
                                    },
                                    null,
                                    8,
                                    T2
                                  ),
                                ]),
                              ]))
                            : ($(),
                              Er(
                                o,
                                {
                                  key: 1,
                                  value: i.regrasContent,
                                  disabled: n.modoVisualizacao,
                                  placeholder: "Descreva as regras de negócio",
                                  tabIndex: s.tabIndexes.regras,
                                  onInput: s.updateRegrasContent,
                                  onChange: s.updateRegrasContent,
                                  onEditorReady: s.onRegrasEditorReady,
                                  onTabPressed: s.handleRegrasTab,
                                  id: "regras-editor",
                                },
                                null,
                                8,
                                [
                                  "value",
                                  "disabled",
                                  "tabIndex",
                                  "onInput",
                                  "onChange",
                                  "onEditorReady",
                                  "onTabPressed",
                                ]
                              )),
                        ]),
                      ],
                      512
                    ))
                  : Kt("", !0),
                i.tabAtiva === 3
                  ? ($(),
                    K(
                      "div",
                      C2,
                      [
                        S("div", N2, [
                          S(
                            "label",
                            {
                              for: "req-banco",
                              class: rt([
                                "modal-form-label",
                                i.isDarkMode
                                  ? "modal-form-label-dark"
                                  : "modal-form-label-light",
                              ]),
                            },
                            " Mudança de banco ",
                            2
                          ),
                          n.modoVisualizacao && !n.requisito.banco
                            ? ($(),
                              K(
                                "div",
                                {
                                  key: 0,
                                  class: rt([
                                    "modal-empty-field modal-empty-field-tall",
                                    i.isDarkMode
                                      ? "modal-empty-field-dark"
                                      : "modal-empty-field-light",
                                  ]),
                                  style: {
                                    "min-height": "200px",
                                    padding: "0.7rem",
                                  },
                                },
                                [
                                  S(
                                    "em",
                                    {
                                      class: rt(
                                        i.isDarkMode
                                          ? "modal-empty-text-dark"
                                          : "modal-empty-text-light"
                                      ),
                                    },
                                    "Não preenchido",
                                    2
                                  ),
                                ],
                                2
                              ))
                            : n.modoVisualizacao
                            ? ($(),
                              K("div", I2, [
                                S("div", k2, [
                                  S(
                                    "div",
                                    {
                                      class: "ql-editor form-input",
                                      innerHTML:
                                        i.bancoContent || "Não preenchido",
                                    },
                                    null,
                                    8,
                                    O2
                                  ),
                                ]),
                              ]))
                            : ($(),
                              Er(
                                o,
                                {
                                  key: 1,
                                  value: i.bancoContent,
                                  disabled: n.modoVisualizacao,
                                  placeholder:
                                    "Descreva as mudanças no banco de dados",
                                  tabIndex: s.tabIndexes.banco,
                                  onInput: s.updateBancoContent,
                                  onChange: s.updateBancoContent,
                                  onEditorReady: s.onBancoEditorReady,
                                  onTabPressed: s.handleBancoTab,
                                  id: "banco-editor",
                                },
                                null,
                                8,
                                [
                                  "value",
                                  "disabled",
                                  "tabIndex",
                                  "onInput",
                                  "onChange",
                                  "onEditorReady",
                                  "onTabPressed",
                                ]
                              )),
                        ]),
                      ],
                      512
                    ))
                  : Kt("", !0),
                S(
                  "div",
                  {
                    class: rt([
                      "modal-footer",
                      i.isDarkMode ? "modal-footer-dark" : "modal-footer-light",
                    ]),
                  },
                  [
                    n.modoVisualizacao
                      ? ($(),
                        K(
                          "button",
                          {
                            key: 0,
                            onClick:
                              t[9] ||
                              (t[9] = (...a) =>
                                s.fecharModal && s.fecharModal(...a)),
                            type: "button",
                            class: "modal-btn modal-btn-primary",
                            tabindex: s.tabIndexes.btnVoltar,
                          },
                          " Voltar ",
                          8,
                          L2
                        ))
                      : ($(),
                        K(
                          qt,
                          { key: 1 },
                          [
                            S(
                              "button",
                              {
                                onClick:
                                  t[10] ||
                                  (t[10] = (...a) =>
                                    s.fecharModal && s.fecharModal(...a)),
                                type: "button",
                                class: "modal-btn modal-btn-secondary",
                                tabindex: s.tabIndexes.btnCancelar,
                                ref: "btnCancelar",
                              },
                              " Cancelar ",
                              8,
                              q2
                            ),
                            S(
                              "button",
                              {
                                onClick:
                                  t[11] ||
                                  (t[11] = (...a) =>
                                    s.salvarRequisito &&
                                    s.salvarRequisito(...a)),
                                type: "button",
                                class: "modal-btn modal-btn-primary",
                                tabindex: s.tabIndexes.btnSalvar,
                                ref: "btnSalvar",
                              },
                              " Salvar ",
                              8,
                              R2
                            ),
                          ],
                          64
                        )),
                  ],
                  2
                ),
              ]),
            ],
            2
          ),
        ]))
      : Kt("", !0);
  }
  const M2 = Be($A, [
      ["render", D2],
      ["__scopeId", "data-v-7b6ca331"],
    ]),
    P2 = {
      name: "SwapButton",
      props: {
        tooltip: {
          type: String,
          default: "Trocar para documentação de desenvolvimento",
        },
        targetUrl: { type: String, required: !0 },
        targetType: {
          type: String,
          default: "desenvolvimento",
          validator: (e) => ["desenvolvimento", "tecnica"].includes(e),
        },
      },
      data() {
        return {};
      },
      emits: ["swap-requested"],
      methods: {
        handleSwap() {
          this.$emit("swap-requested", this.targetUrl);
        },
      },
    },
    B2 = { class: "tooltip-content" },
    F2 = { class: "tooltip-title" };
  function $2(e, t, n, r, i, s) {
    return (
      $(),
      K(
        "div",
        {
          class: rt(["swap-toggle", "swap-toggle-" + n.targetType]),
          style: {
            display: "flex",
            "align-items": "center",
            "margin-left": "16px",
          },
        },
        [
          S(
            "a",
            {
              href: "javascript:void(0)",
              onClick:
                t[0] || (t[0] = (...o) => s.handleSwap && s.handleSwap(...o)),
              class: "swap-button",
            },
            t[1] ||
              (t[1] = [
                S(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "swap-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    width: "24",
                    height: "24",
                  },
                  [
                    S("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
                    }),
                  ],
                  -1
                ),
              ])
          ),
          S(
            "div",
            {
              class: rt([
                "swap-tooltip",
                n.targetType === "desenvolvimento"
                  ? "tooltip-desenvolvimento"
                  : "tooltip-tecnica",
              ]),
            },
            [
              S(
                "div",
                {
                  class: rt([
                    "tooltip-arrow",
                    n.targetType === "desenvolvimento"
                      ? "arrow-desenvolvimento"
                      : "arrow-tecnica",
                  ]),
                },
                null,
                2
              ),
              S("div", B2, [S("p", F2, Ht(n.tooltip), 1)]),
            ],
            2
          ),
        ],
        2
      )
    );
  }
  const Xm = Be(P2, [
      ["render", $2],
      ["__scopeId", "data-v-400466cb"],
    ]),
    j2 = {
      name: "ThemeToggle",
      props: { isDark: { type: Boolean, required: !0 } },
      data() {
        return {};
      },
      methods: {
        toggleTheme() {
          this.$emit("toggle");
        },
      },
    },
    U2 = {
      key: 0,
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-6 w-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
    },
    H2 = {
      key: 1,
      xmlns: "http://www.w3.org/2000/svg",
      class: "h-6 w-6",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
    };
  function z2(e, t, n, r, i, s) {
    return (
      $(),
      K(
        "button",
        {
          onClick:
            t[0] || (t[0] = (...o) => s.toggleTheme && s.toggleTheme(...o)),
          class: "theme-toggle",
        },
        [
          n.isDark
            ? ($(),
              K(
                "svg",
                U2,
                t[1] ||
                  (t[1] = [
                    S(
                      "path",
                      {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
                      },
                      null,
                      -1
                    ),
                  ])
              ))
            : ($(),
              K(
                "svg",
                H2,
                t[2] ||
                  (t[2] = [
                    S(
                      "path",
                      {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
                      },
                      null,
                      -1
                    ),
                  ])
              )),
        ]
      )
    );
  }
  const Zm = Be(j2, [
      ["render", z2],
      ["__scopeId", "data-v-f6a6e318"],
    ]),
    V2 = {
      name: "ToastNotification",
      props: {
        toasts: { type: Array, required: !0, default: () => [] },
        mensagens: { type: Array, default: () => [] },
        posicao: {
          type: String,
          default: "top-right",
          validator: (e) =>
            [
              "top-right",
              "top-left",
              "bottom-right",
              "bottom-left",
              "top-center",
              "bottom-center",
            ].includes(e),
        },
        duracaoPadrao: { type: Number, default: 5e3 },
        mostrarIcone: { type: Boolean, default: !0 },
        mostrarFechar: { type: Boolean, default: !0 },
        mostrarProgresso: { type: Boolean, default: !0 },
      },
      emits: ["fechar"],
      data() {
        return { timers: {}, progressos: {} };
      },
      computed: {
        isDarkMode() {
          return document.documentElement.classList.contains("dark");
        },
        containerClasses() {
          return `toast-container ${this.posicao}`;
        },
      },
      watch: {
        mensagens: {
          handler(e, t) {
            e.forEach((r) => {
              !this.timers[r.id] &&
                r.duracao !== 0 &&
                this.iniciarTemporizador(r);
            });
            const n = e.map((r) => r.id);
            Object.keys(this.timers).forEach((r) => {
              n.includes(r) ||
                (clearInterval(this.timers[r]),
                delete this.timers[r],
                delete this.progressos[r]);
            });
          },
          deep: !0,
        },
      },
      methods: {
        iniciarTemporizador(e) {
          const t = e.duracao || this.duracaoPadrao;
          if (t <= 0) return;
          this.progressos[e.id] = 100;
          const n = 100,
            r = t / n;
          let i = 0;
          this.timers[e.id] = setInterval(() => {
            i++;
            const s = 100 - (i / r) * 100;
            (this.progressos[e.id] = Math.max(0, s)),
              i >= r &&
                (clearInterval(this.timers[e.id]),
                delete this.timers[e.id],
                this.fecharToast(e.id));
          }, n);
        },
        getToastConfig(e) {
          const t = [
            "note",
            "success",
            "error",
            "warning",
            "caution",
            "important",
          ].includes(e)
            ? e
            : "note";
          return {
            icon: {
              note: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>`,
              success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                   <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                   <polyline points="22 4 12 14.01 9 11.01"></polyline>
                 </svg>`,
              error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="15" y1="9" x2="9" y2="15"></line>
                 <line x1="9" y1="9" x2="15" y2="15"></line>
               </svg>`,
              warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                   <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                   <line x1="12" y1="9" x2="12" y2="13"></line>
                   <line x1="12" y1="17" x2="12.01" y2="17"></line>
                 </svg>`,
              caution: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                   <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                   <line x1="12" y1="8" x2="12" y2="12"></line>
                   <line x1="12" y1="16" x2="12.01" y2="16"></line>
                 </svg>`,
              important: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                      <path d="M19 4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3l3 3 3-3h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
                      <line x1="12" y1="7" x2="12" y2="11"></line>
                      <line x1="12" y1="14" x2="12.01" y2="14"></line>
                    </svg>`,
            }[t],
            cssClass: `toast-${t}`,
          };
        },
        fecharToast(e) {
          this.timers[e] &&
            (clearInterval(this.timers[e]), delete this.timers[e]),
            this.progressos[e] && delete this.progressos[e],
            this.$emit("fechar", e);
        },
        pausarTemporizador(e) {
          this.timers[e] &&
            (clearInterval(this.timers[e]), delete this.timers[e]);
        },
        retomarTemporizador(e) {
          !this.timers[e.id] && e.duracao !== 0 && this.iniciarTemporizador(e);
        },
        getToastClasses(e) {
          let n = [
            `toast-notification ${this.getToastConfig(e.tipo).cssClass}`,
          ];
          return (
            e.tamanho === "sm"
              ? n.push("toast-sm")
              : e.tamanho === "lg" && n.push("toast-lg"),
            n.join(" ")
          );
        },
      },
    },
    K2 = { class: "toast-container" };
  function G2(e, t, n, r, i, s) {
    return (
      $(),
      K("div", K2, [
        Rt(
          F0,
          { name: "toast" },
          {
            default: Qo(() => [
              ($(!0),
              K(
                qt,
                null,
                pn(
                  n.toasts,
                  (o) => (
                    $(),
                    K(
                      "div",
                      { key: o.id, class: rt(["toast", o.type]) },
                      Ht(o.message),
                      3
                    )
                  )
                ),
                128
              )),
            ]),
            _: 1,
          }
        ),
      ])
    );
  }
  const Jm = Be(V2, [
      ["render", G2],
      ["__scopeId", "data-v-6ccc65d2"],
    ]),
    W2 = {
      name: "UploadButton",
      props: {
        tooltipTitle: { type: String, default: "Importar arquivo JSON" },
      },
      data() {
        return {};
      },
      methods: {
        checkAndOpenFileSelector() {
          this.$emit("check-data");
        },
        openFileSelector() {
          this.$refs.fileInput
            ? this.$refs.fileInput.click()
            : console.error("Referência ao input file não encontrada!");
        },
        handleFileUpload(e) {
          const t = e.target.files[0];
          if (!t) return;
          const n = new FileReader();
          (n.onload = (r) => {
            try {
              const i = JSON.parse(r.target.result);
              this.$emit("json-loaded", i), (this.$refs.fileInput.value = "");
            } catch (i) {
              console.error("Erro ao parsear o arquivo JSON:", i),
                this.$emit("json-error", i),
                (this.$refs.fileInput.value = "");
            }
          }),
            n.readAsText(t);
        },
        mounted() {
          this.$el.__vueRef = this;
        },
      },
    },
    Y2 = { class: "upload-toggle" },
    X2 = { class: "upload-tooltip" },
    Z2 = { class: "tooltip-content" },
    J2 = { class: "tooltip-title" };
  function Q2(e, t, n, r, i, s) {
    return (
      $(),
      K("div", Y2, [
        S(
          "input",
          {
            type: "file",
            ref: "fileInput",
            accept: ".json",
            class: "hidden",
            onChange:
              t[0] ||
              (t[0] = (...o) => s.handleFileUpload && s.handleFileUpload(...o)),
          },
          null,
          544
        ),
        S(
          "button",
          {
            onClick:
              t[1] ||
              (t[1] = (...o) =>
                s.checkAndOpenFileSelector && s.checkAndOpenFileSelector(...o)),
            type: "button",
          },
          t[2] ||
            (t[2] = [
              S(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  class: "upload-icon",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                },
                [
                  S("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12",
                  }),
                ],
                -1
              ),
            ])
        ),
        S("div", X2, [
          t[3] || (t[3] = S("div", { class: "tooltip-arrow" }, null, -1)),
          S("div", Z2, [S("p", J2, Ht(n.tooltipTitle), 1)]),
        ]),
      ])
    );
  }
  const Qm = Be(W2, [
      ["render", Q2],
      ["__scopeId", "data-v-32de3e95"],
    ]),
    tg = {
      data() {
        const e = () => ({
          toasts: [],
          show: (t, n = "info", r = 3e3) => {
            const i = Date.now() + Math.random();
            this.notificationService.toasts.push({
              id: i,
              message: t,
              type: n,
            }),
              setTimeout(() => this.notificationService.closeToast(i), r);
          },
          closeToast: (t) => {
            const n = this.notificationService.toasts.findIndex(
              (r) => r.id === t
            );
            n !== -1 && this.notificationService.toasts.splice(n, 1);
          },
        });
        return {
          notificationService: e(),
          isDark: !0,
          isLoading: !1,
          formData: {
            numeroSS: "",
            anoSS: new Date().getFullYear().toString(),
            iniciaisAutor: "",
            tituloSS: "",
            descricao: "",
            dataInicio: "",
            dataFim: "",
            linkBoard: "",
            gerarJson: !0,
            gerarDocx: !1,
            gerarPdf: !1,
          },
          autorInput: "",
          selectedAutores: [],
          showSuggestions: !1,
          autoresDisponiveis: [
            { nome: "Carlos Henrique Bezerra de Azevedo", iniciais: "CHB" },
            { nome: "Danilo Mikael Costa Barros", iniciais: "DMC" },
            { nome: "Deyvyd Moura Fé e Sousa Araújo", iniciais: "DMF" },
            { nome: "Fernanda da Silva Caldas", iniciais: "FSC" },
            { nome: "Flávio Mata Davim", iniciais: "FMD" },
            { nome: "Joilson Vidal Abrantes", iniciais: "JVA" },
            { nome: "Jonathan Batista de Oliveira Silva", iniciais: "JBO" },
            { nome: "João Filipe do Nascimento e Silva", iniciais: "JFN" },
            { nome: "João Paulo Victor Martin Sousa", iniciais: "JPS" },
            { nome: "Júlio Gusmão Carlos de Mendonça", iniciais: "JGC" },
            { nome: "Marcos Antônio Cavalcanti Junior", iniciais: "MAC" },
            { nome: "Moises Viana dos Santos", iniciais: "MVS" },
            { nome: "Paulla Rachel Gomes de Oliveira", iniciais: "PRO" },
          ],
          highlightedIndex: 0,
          notificationService: e(),
          showMessageModal: !1,
          messageTitle: "",
          messageContent: "",
          messageCallback: null,
          messageCancelCallback: null,
          messageType: "caution",
          messageConfirmButtonText: "Remover",
        };
      },
      computed: {
        filteredAutores() {
          return this.filterAutores();
        },
      },
      methods: {
        toggleTheme() {
          (this.isDark = !this.isDark),
            this.updateTheme(),
            localStorage.setItem("theme", this.isDark ? "dark" : "light");
        },
        updateTheme() {
          this.isDark
            ? document.documentElement.classList.add("dark")
            : document.documentElement.classList.remove("dark");
        },
        checkForImportConfirmation() {
          if (this.hasFilledData())
            this.mostrarModalMensagem(
              "Confirmar Importação",
              "Existem dados preenchidos nos campos. Importar um novo arquivo substituirá todos esses dados. Deseja continuar?",
              () => {
                if (this.$refs.uploadButton)
                  this.$refs.uploadButton.openFileSelector();
                else {
                  const t = document.querySelector(".upload-toggle");
                  t && t.__vueRef && t.__vueRef.openFileSelector();
                }
              },
              null,
              "warning",
              "Continuar"
            );
          else if (this.$refs.uploadButton)
            this.$refs.uploadButton.openFileSelector();
          else {
            const t = document.querySelector(".upload-toggle");
            t && t.__vueRef && t.__vueRef.openFileSelector();
          }
        },
        hasFilledData() {
          return !!(
            this.formData.numeroSS ||
            this.formData.tituloSS ||
            this.formData.descricao ||
            this.formData.dataInicio ||
            this.formData.dataFim ||
            this.formData.linkBoard ||
            (this.selectedAutores && this.selectedAutores.length > 0) ||
            (this.atividades && this.atividades.length > 0) ||
            (this.requisitos && this.requisitos.length > 0) ||
            (this.listaRequisitosNaoFuncionais &&
              this.listaRequisitosNaoFuncionais.length > 0)
          );
        },
        handleSwapRequested(e) {
          this.hasFilledData()
            ? this.mostrarModalMensagem(
                "Confirmar troca do tipo de documentação",
                "Existem dados preenchidos nos campos. Trocar o tipo de documentação fará com que todos esses dados sejam perdidos. Deseja continuar?",
                () => {
                  window.location.href = e;
                },
                null,
                "warning",
                "Continuar"
              )
            : (window.location.href = e);
        },
        processImportedJSON(e) {
          try {
            if (!e || typeof e != "object") {
              this.notificationService.show(
                "Formato de arquivo inválido",
                "error"
              );
              return;
            }
            const t = e.tipo || "desconhecido";
            let n = "tecnica";
            if (
              ((window.location.pathname.includes("/dev") ||
                this.requisitos !== void 0) &&
                (n = "desenvolvimento"),
              t !== "desconhecido" && t !== n)
            ) {
              this.notificationService.show(
                `Este JSON é para documentação "${t}" mas a aplicação atual é para documentação "${n}".`,
                "error"
              );
              return;
            }
            if (t === "desenvolvimento") {
              let r = null;
              e.info.iniciaisAutorModificacao
                ? (r = e.info.iniciaisAutorModificacao)
                : e.info.iniciaisAutorCriacao
                ? (r = e.info.iniciaisAutorCriacao)
                : e.info.iniciaisAutor && (r = e.info.iniciaisAutor),
                r && this.processarAutoresFromIniciais(r),
                e.info.dataCriacao && (this.dataCriacao = e.info.dataCriacao),
                e.info.iniciaisAutorCriacao &&
                  (this.iniciaisAutorCriacao = e.info.iniciaisAutorCriacao),
                e.info.dataModificacao &&
                  (this.dataModificacao = e.info.dataModificacao),
                e.info.iniciaisAutorModificacao &&
                  (this.iniciaisAutorModificacao =
                    e.info.iniciaisAutorModificacao);
            } else
              e.info.iniciaisAutor &&
                this.processarAutoresFromIniciais(e.info.iniciaisAutor);
            if (e.info) {
              const r = {
                numeroSS: "numeroSS",
                anoSS: "anoSS",
                tituloSS: "tituloSS",
                descricao: "descricao",
                dataInicio: "dataInicio",
                dataFim: "dataFim",
                totalHoras: "totalHoras",
                linkBoard: "linkBoard",
                iniciaisAutor: "iniciaisAutor",
              };
              for (const [i, s] of Object.entries(r))
                e.info[i] !== void 0 && (this.formData[s] = e.info[i]);
              e.info.iniciaisAutor &&
                this.processarAutoresFromIniciais(e.info.iniciaisAutor);
            }
            e.atividades &&
              Array.isArray(e.atividades) &&
              this.atividades !== void 0 &&
              (this.atividades = [...e.atividades]),
              e.requisitos &&
                Array.isArray(e.requisitos) &&
                this.requisitos !== void 0 &&
                (this.requisitos = [...e.requisitos]),
              e.requisitosNaoFuncionais &&
                Array.isArray(e.requisitosNaoFuncionais) &&
                this.listaRequisitosNaoFuncionais !== void 0 &&
                (this.listaRequisitosNaoFuncionais = [
                  ...e.requisitosNaoFuncionais,
                ]),
              e.totalPontosFuncao !== void 0 &&
                this.totalPontosFuncao !== void 0 &&
                ((this.totalPontosFuncao = e.totalPontosFuncao),
                (this.totalPontosFuncaoFormatado = e.totalPontosFuncao
                  .toString()
                  .replace(".", ","))),
              this.notificationService.show(
                "Dados importados com sucesso!",
                "success"
              );
          } catch (t) {
            console.error("Erro ao processar dados JSON:", t),
              this.notificationService.show(
                "Erro ao processar o arquivo",
                "error"
              );
          }
        },
        processarAutoresFromIniciais(e) {
          if (!e) return;
          this.selectedAutores = [];
          let t = [];
          if (e.includes(" e ")) {
            const n = e.split(" e "),
              r = n.pop();
            n.length > 0 && (t = n[0].split(",").map((i) => i.trim())),
              t.push(r.trim());
          } else
            e.includes(",")
              ? (t = e.split(",").map((n) => n.trim()))
              : (t = [e.trim()]);
          t.forEach((n) => {
            const r = this.autoresDisponiveis.find((i) => i.iniciais === n);
            r && this.selectedAutores.push(r);
          }),
            this.updateFormDataAutores();
        },
        handleAutorInputUpdate(e) {
          (this.autorInput = e), (this.showSuggestions = !0);
        },
        toggleSuggestions(e) {
          this.showSuggestions = e;
        },
        navigateList(e) {
          this.filteredAutores.length &&
            (e === "down"
              ? this.highlightedIndex < this.filteredAutores.length - 1
                ? this.highlightedIndex++
                : (this.highlightedIndex = 0)
              : e === "up" &&
                (this.highlightedIndex > 0
                  ? this.highlightedIndex--
                  : (this.highlightedIndex = this.filteredAutores.length - 1)));
        },
        normalizeString(e) {
          return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },
        filterAutores() {
          if (!this.autorInput.trim()) return [];
          const e = this.normalizeString(this.autorInput.toLowerCase());
          return this.autoresDisponiveis.filter(
            (t) =>
              this.normalizeString(t.nome.toLowerCase()).includes(e) &&
              !this.selectedAutores.some((r) => r.nome === t.nome)
          );
        },
        selectAutor(e) {
          this.selectedAutores.some((t) => t.nome === e.nome) ||
            (this.selectedAutores.push(e),
            (this.autorInput = ""),
            this.updateFormDataAutores(),
            this.$nextTick(() => {
              const t = this.$refs.basicFormSection;
              t && t.$refs.autorInput && t.$refs.autorInput.focus();
            }));
        },
        removeAutor(e) {
          const t = this.selectedAutores.findIndex((n) => n.nome === e.nome);
          t !== -1 &&
            (this.selectedAutores.splice(t, 1), this.updateFormDataAutores());
        },
        handleBackspace() {
          this.autorInput === "" &&
            this.selectedAutores.length > 0 &&
            (this.selectedAutores.pop(), this.updateFormDataAutores());
        },
        updateFormDataAutores() {
          if (this.selectedAutores.length === 0) {
            this.formData.iniciaisAutor = "";
            return;
          }
          if (this.selectedAutores.length === 1) {
            this.formData.iniciaisAutor = this.selectedAutores[0].iniciais;
            return;
          }
          if (this.selectedAutores.length === 2) {
            this.formData.iniciaisAutor = `${this.selectedAutores[0].iniciais} e ${this.selectedAutores[1].iniciais}`;
            return;
          }
          const e = this.selectedAutores.map((n) => n.iniciais),
            t = e.pop();
          this.formData.iniciaisAutor = `${e.join(", ")} e ${t}`;
        },
        mostrarModalMensagem(e, t, n, r = null, i = "caution", s = "Remover") {
          (this.messageTitle = e),
            (this.messageContent = t),
            (this.messageCallback = n),
            (this.messageCancelCallback = r),
            (this.messageType = i),
            (this.messageConfirmButtonText = s),
            (this.showMessageModal = !0),
            document.body.classList.add("modal-open");
        },
        confirmarModalMensagem() {
          this.messageCallback && this.messageCallback(),
            (this.showMessageModal = !1),
            document.body.classList.remove("modal-open");
        },
        cancelarModalMensagem() {
          this.messageCancelCallback && this.messageCancelCallback(),
            (this.showMessageModal = !1),
            document.body.classList.remove("modal-open");
        },
        formatSS() {
          this.formData.numeroSS &&
            (this.formData.numeroSS = this.formData.numeroSS.padStart(3, "0"));
        },
        resetFieldErrors() {
          try {
            const e = this.$refs.basicFormSection;
            if (!e) {
              console.warn("Componente BasicFormSection não encontrado");
              return;
            }
            [
              "numeroSS",
              "tituloSS",
              "descricao",
              "dataInicio",
              "dataFim",
            ].forEach((n) => {
              const r = e.$refs[n];
              r && r.classList.remove("campo-erro");
            }),
              this.resetAutorFieldError();
          } catch (e) {
            console.warn("Erro ao resetar os campos:", e);
          }
        },
        resetAutorFieldError() {
          const e = this.$refs.basicFormSection;
          if (!e) {
            console.warn("BasicFormSection não encontrado");
            return;
          }
          if (!e.$el || typeof e.$el.querySelector != "function") {
            if (e instanceof HTMLElement) {
              const t = e.querySelector(".autor-container");
              t && t.classList.remove("campo-erro");
              return;
            }
            try {
              const t = document.querySelector(".autor-container");
              if (t) {
                t.classList.remove("campo-erro");
                return;
              }
              const r = document.querySelector(
                ".author-input-area, .form-group:nth-child(4) .form-input"
              );
              r && r.classList.remove("campo-erro");
            } catch {
              console.warn(
                "Não foi possível remover a classe de erro do container de autores"
              );
            }
            return;
          }
          try {
            const t = e.$el.querySelector(".autor-container");
            if (t) {
              t.classList.remove("campo-erro");
              return;
            }
            const n = [
              ".author-input-area",
              ".form-group:nth-child(4) .form-input",
            ];
            for (const r of n) {
              const i = e.$el.querySelector(r);
              if (i) {
                i.classList.remove("campo-erro");
                return;
              }
            }
          } catch (t) {
            console.warn("Erro ao tentar remover classe de erro:", t);
          }
        },
        aplicarErroTemporario(e, t = 3e3) {
          if (e)
            return (
              e.classList.add("campo-erro"),
              e.focus(),
              setTimeout(() => {
                e.classList.remove("campo-erro");
              }, t),
              !0
            );
        },
        aplicarErroTemporarioAutores(e = 3e3) {
          const t = this.$refs.basicFormSection;
          if (!t) return !1;
          try {
            if (t.$el && typeof t.$el.querySelector == "function") {
              let n = t.$el.querySelector(".autor-container");
              if (!n) {
                const r = t.$el.querySelectorAll(".form-group"),
                  i = Array.from(r).find(
                    (s) =>
                      s.querySelector("label") &&
                      s.querySelector("label").textContent.includes("Autor")
                  );
                i &&
                  (n =
                    i.querySelector(".form-input") ||
                    i.querySelector(".author-input-area"));
              }
              if (n) {
                n.classList.add("campo-erro");
                const r = t.$refs && t.$refs.autorInput;
                return (
                  r && r.focus(),
                  setTimeout(() => {
                    n.classList.remove("campo-erro");
                  }, e),
                  !0
                );
              }
            } else {
              const r = [
                document.querySelector(".autor-container"),
                document.querySelector(".author-input-area"),
                document.querySelector(".form-group:nth-child(4) .form-input"),
              ].find((i) => i !== null);
              if (r) {
                r.classList.add("campo-erro");
                const i = document.querySelector(".author-input-field");
                return (
                  i && i.focus(),
                  setTimeout(() => {
                    r.classList.remove("campo-erro");
                  }, e),
                  !0
                );
              }
            }
            return (
              this.notificationService.show(
                "Selecione pelo menos um autor",
                "error"
              ),
              !1
            );
          } catch (n) {
            return (
              console.warn("Erro ao aplicar destaque ao campo de autores:", n),
              this.notificationService.show(
                "Selecione pelo menos um autor",
                "error"
              ),
              !1
            );
          }
        },
        validarCamposObrigatorios() {
          try {
            const e = this.$refs.basicFormSection;
            if (!e)
              return (
                console.error("Componente BasicFormSection não encontrado"),
                this.notificationService.show(
                  "Erro ao acessar o formulário",
                  "error"
                ),
                (this.isLoading = !1),
                !1
              );
            const t = [
              { ref: "numeroSS", label: "Número SS" },
              { ref: "tituloSS", label: "Título" },
              { ref: "descricao", label: "Descrição" },
              { ref: "dataInicio", label: "Data de Início" },
              { ref: "dataFim", label: "Data de Fim" },
            ];
            for (const i of t) {
              const s = this.formData[i.ref];
              if (!s || s.trim() === "")
                return (
                  e.$refs &&
                    e.$refs[i.ref] &&
                    this.aplicarErroTemporario(e.$refs[i.ref]),
                  this.notificationService.show(
                    `O campo ${i.label} é obrigatório`,
                    "error"
                  ),
                  (this.isLoading = !1),
                  !1
                );
            }
            const n = new Date(this.formData.dataInicio),
              r = new Date(this.formData.dataFim);
            return n > r
              ? (e.$refs &&
                  e.$refs.dataInicio &&
                  this.aplicarErroTemporario(e.$refs.dataInicio),
                this.notificationService.show(
                  "A data de início não pode ser posterior à data de fim",
                  "error"
                ),
                (this.isLoading = !1),
                !1)
              : this.selectedAutores.length === 0
              ? (this.aplicarErroTemporarioAutores() ||
                  this.notificationService.show(
                    "Selecione pelo menos um autor",
                    "error"
                  ),
                (this.isLoading = !1),
                !1)
              : !0;
          } catch (e) {
            return (
              console.error("Erro durante validação de campos:", e),
              this.notificationService.show(
                "Erro durante validação. Verifique os campos obrigatórios.",
                "error"
              ),
              (this.isLoading = !1),
              !1
            );
          }
        },
        prepareFormData(e = !1, t = "tecnica") {
          const n = new FormData();
          return (
            n.append("tipo", t),
            n.append("gerar_json", "true"),
            n.append(
              "gerar_docx",
              e ? "false" : this.formData.gerarDocx ? "true" : "false"
            ),
            n.append(
              "gerar_pdf",
              e ? "false" : this.formData.gerarPdf ? "true" : "false"
            ),
            n.append("apenas_json", e ? "true" : "false"),
            n.append("numeroSS", this.formData.numeroSS),
            n.append("anoSS", this.formData.anoSS),
            n.append("iniciaisAutor", this.formData.iniciaisAutor),
            n.append("tituloSS", this.formData.tituloSS),
            n.append("descricao", this.formData.descricao),
            n.append("dataInicio", this.formData.dataInicio),
            n.append("dataFim", this.formData.dataFim),
            n.append("linkBoard", this.formData.linkBoard),
            this.dataCriacao && n.append("dataCriacao", this.dataCriacao),
            this.iniciaisAutorCriacao &&
              n.append("iniciaisAutorCriacao", this.iniciaisAutorCriacao),
            this.dataModificacao &&
              n.append("dataModificacao", this.dataModificacao),
            this.iniciaisAutorModificacao &&
              n.append(
                "iniciaisAutorModificacao",
                this.iniciaisAutorModificacao
              ),
            n
          );
        },
        initTheme() {
          const e = localStorage.getItem("theme");
          e
            ? (this.isDark = e === "dark")
            : window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
            ? (this.isDark = !0)
            : (this.isDark = !1),
            this.updateTheme();
        },
      },
      mounted() {
        this.initTheme();
      },
    },
    tT = {
      name: "App",
      mixins: [tg],
      components: {
        AppHeader: vp,
        BasicFormSection: yp,
        DataTable: Rp,
        FormSubmitSection: Dp,
        InfoButton: Mp,
        ModalMessage: Pp,
        ModalRequisito: M2,
        RichTextEditor: Ym,
        SwapButton: Xm,
        ThemeToggle: Zm,
        ToastNotification: Jm,
        UploadButton: Qm,
      },
    },
    eT = { id: "app" },
    nT = { class: "container" };
  function rT(e, t, n, r, i, s) {
    const o = Ie("toast-notification"),
      a = Ie("app-header"),
      l = Ie("router-view"),
      c = Ie("modal-message");
    return (
      $(),
      K("div", eT, [
        Rt(o, { toasts: e.notificationService.toasts }, null, 8, ["toasts"]),
        Rt(
          a,
          {
            title: "Documentações Técnicas",
            onSwapRequested: e.handleSwapRequested,
          },
          null,
          8,
          ["onSwapRequested"]
        ),
        S("div", nT, [Rt(l)]),
        Rt(
          c,
          {
            show: e.showMessageModal,
            titulo: e.messageTitle,
            mensagem: e.messageContent,
            tipo: e.messageType,
            "texto-botao-confirmar": e.messageConfirmButtonText,
            "texto-botao-cancelar": "Cancelar",
            "show-cancel-button": !0,
            "fechar-ao-clicar-fora": !1,
            onConfirmar: e.confirmarModalMensagem,
            onCancelar: e.cancelarModalMensagem,
          },
          null,
          8,
          [
            "show",
            "titulo",
            "mensagem",
            "tipo",
            "texto-botao-confirmar",
            "onConfirmar",
            "onCancelar",
          ]
        ),
      ])
    );
  }
  const iT = Be(tT, [["render", rT]]);
  /*!
   * vue-router v4.5.1
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */ const Ti = typeof document < "u";
  function eg(e) {
    return (
      typeof e == "object" ||
      "displayName" in e ||
      "props" in e ||
      "__vccOpts" in e
    );
  }
  function sT(e) {
    return (
      e.__esModule ||
      e[Symbol.toStringTag] === "Module" ||
      (e.default && eg(e.default))
    );
  }
  const Ot = Object.assign;
  function ac(e, t) {
    const n = {};
    for (const r in t) {
      const i = t[r];
      n[r] = wn(i) ? i.map(e) : e(i);
    }
    return n;
  }
  const Os = () => {},
    wn = Array.isArray,
    ng = /#/g,
    oT = /&/g,
    aT = /\//g,
    lT = /=/g,
    cT = /\?/g,
    rg = /\+/g,
    uT = /%5B/g,
    fT = /%5D/g,
    ig = /%5E/g,
    dT = /%60/g,
    sg = /%7B/g,
    hT = /%7C/g,
    og = /%7D/g,
    pT = /%20/g;
  function zu(e) {
    return encodeURI("" + e)
      .replace(hT, "|")
      .replace(uT, "[")
      .replace(fT, "]");
  }
  function mT(e) {
    return zu(e).replace(sg, "{").replace(og, "}").replace(ig, "^");
  }
  function Qc(e) {
    return zu(e)
      .replace(rg, "%2B")
      .replace(pT, "+")
      .replace(ng, "%23")
      .replace(oT, "%26")
      .replace(dT, "`")
      .replace(sg, "{")
      .replace(og, "}")
      .replace(ig, "^");
  }
  function gT(e) {
    return Qc(e).replace(lT, "%3D");
  }
  function bT(e) {
    return zu(e).replace(ng, "%23").replace(cT, "%3F");
  }
  function vT(e) {
    return e == null ? "" : bT(e).replace(aT, "%2F");
  }
  function Xs(e) {
    try {
      return decodeURIComponent("" + e);
    } catch {}
    return "" + e;
  }
  const yT = /\/$/,
    wT = (e) => e.replace(yT, "");
  function lc(e, t, n = "/") {
    let r,
      i = {},
      s = "",
      o = "";
    const a = t.indexOf("#");
    let l = t.indexOf("?");
    return (
      a < l && a >= 0 && (l = -1),
      l > -1 &&
        ((r = t.slice(0, l)),
        (s = t.slice(l + 1, a > -1 ? a : t.length)),
        (i = e(s))),
      a > -1 && ((r = r || t.slice(0, a)), (o = t.slice(a, t.length))),
      (r = _T(r ?? t, n)),
      { fullPath: r + (s && "?") + s + o, path: r, query: i, hash: Xs(o) }
    );
  }
  function ET(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
  }
  function jd(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase())
      ? e
      : e.slice(t.length) || "/";
  }
  function ST(e, t, n) {
    const r = t.matched.length - 1,
      i = n.matched.length - 1;
    return (
      r > -1 &&
      r === i &&
      Wi(t.matched[r], n.matched[i]) &&
      ag(t.params, n.params) &&
      e(t.query) === e(n.query) &&
      t.hash === n.hash
    );
  }
  function Wi(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
  }
  function ag(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!xT(e[n], t[n])) return !1;
    return !0;
  }
  function xT(e, t) {
    return wn(e) ? Ud(e, t) : wn(t) ? Ud(t, e) : e === t;
  }
  function Ud(e, t) {
    return wn(t)
      ? e.length === t.length && e.every((n, r) => n === t[r])
      : e.length === 1 && e[0] === t;
  }
  function _T(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
      r = e.split("/"),
      i = r[r.length - 1];
    (i === ".." || i === ".") && r.push("");
    let s = n.length - 1,
      o,
      a;
    for (o = 0; o < r.length; o++)
      if (((a = r[o]), a !== "."))
        if (a === "..") s > 1 && s--;
        else break;
    return n.slice(0, s).join("/") + "/" + r.slice(o).join("/");
  }
  const hr = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  };
  var Zs;
  (function (e) {
    (e.pop = "pop"), (e.push = "push");
  })(Zs || (Zs = {}));
  var Ls;
  (function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
  })(Ls || (Ls = {}));
  function AT(e) {
    if (!e)
      if (Ti) {
        const t = document.querySelector("base");
        (e = (t && t.getAttribute("href")) || "/"),
          (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
      } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), wT(e);
  }
  const TT = /^[^#]+#/;
  function CT(e, t) {
    return e.replace(TT, "#") + t;
  }
  function NT(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
      r = e.getBoundingClientRect();
    return {
      behavior: t.behavior,
      left: r.left - n.left - (t.left || 0),
      top: r.top - n.top - (t.top || 0),
    };
  }
  const za = () => ({ left: window.scrollX, top: window.scrollY });
  function IT(e) {
    let t;
    if ("el" in e) {
      const n = e.el,
        r = typeof n == "string" && n.startsWith("#"),
        i =
          typeof n == "string"
            ? r
              ? document.getElementById(n.slice(1))
              : document.querySelector(n)
            : n;
      if (!i) return;
      t = NT(i, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
      ? window.scrollTo(t)
      : window.scrollTo(
          t.left != null ? t.left : window.scrollX,
          t.top != null ? t.top : window.scrollY
        );
  }
  function Hd(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
  }
  const tu = new Map();
  function kT(e, t) {
    tu.set(e, t);
  }
  function OT(e) {
    const t = tu.get(e);
    return tu.delete(e), t;
  }
  let LT = () => location.protocol + "//" + location.host;
  function lg(e, t) {
    const { pathname: n, search: r, hash: i } = t,
      s = e.indexOf("#");
    if (s > -1) {
      let a = i.includes(e.slice(s)) ? e.slice(s).length : 1,
        l = i.slice(a);
      return l[0] !== "/" && (l = "/" + l), jd(l, "");
    }
    return jd(n, e) + r + i;
  }
  function qT(e, t, n, r) {
    let i = [],
      s = [],
      o = null;
    const a = ({ state: h }) => {
      const p = lg(e, location),
        g = n.value,
        v = t.value;
      let E = 0;
      if (h) {
        if (((n.value = p), (t.value = h), o && o === g)) {
          o = null;
          return;
        }
        E = v ? h.position - v.position : 0;
      } else r(p);
      i.forEach((x) => {
        x(n.value, g, {
          delta: E,
          type: Zs.pop,
          direction: E ? (E > 0 ? Ls.forward : Ls.back) : Ls.unknown,
        });
      });
    };
    function l() {
      o = n.value;
    }
    function c(h) {
      i.push(h);
      const p = () => {
        const g = i.indexOf(h);
        g > -1 && i.splice(g, 1);
      };
      return s.push(p), p;
    }
    function f() {
      const { history: h } = window;
      h.state && h.replaceState(Ot({}, h.state, { scroll: za() }), "");
    }
    function d() {
      for (const h of s) h();
      (s = []),
        window.removeEventListener("popstate", a),
        window.removeEventListener("beforeunload", f);
    }
    return (
      window.addEventListener("popstate", a),
      window.addEventListener("beforeunload", f, { passive: !0 }),
      { pauseListeners: l, listen: c, destroy: d }
    );
  }
  function zd(e, t, n, r = !1, i = !1) {
    return {
      back: e,
      current: t,
      forward: n,
      replaced: r,
      position: window.history.length,
      scroll: i ? za() : null,
    };
  }
  function RT(e) {
    const { history: t, location: n } = window,
      r = { value: lg(e, n) },
      i = { value: t.state };
    i.value ||
      s(
        r.value,
        {
          back: null,
          current: r.value,
          forward: null,
          position: t.length - 1,
          replaced: !0,
          scroll: null,
        },
        !0
      );
    function s(l, c, f) {
      const d = e.indexOf("#"),
        h =
          d > -1
            ? (n.host && document.querySelector("base") ? e : e.slice(d)) + l
            : LT() + e + l;
      try {
        t[f ? "replaceState" : "pushState"](c, "", h), (i.value = c);
      } catch (p) {
        console.error(p), n[f ? "replace" : "assign"](h);
      }
    }
    function o(l, c) {
      const f = Ot({}, t.state, zd(i.value.back, l, i.value.forward, !0), c, {
        position: i.value.position,
      });
      s(l, f, !0), (r.value = l);
    }
    function a(l, c) {
      const f = Ot({}, i.value, t.state, { forward: l, scroll: za() });
      s(f.current, f, !0);
      const d = Ot({}, zd(r.value, l, null), { position: f.position + 1 }, c);
      s(l, d, !1), (r.value = l);
    }
    return { location: r, state: i, push: a, replace: o };
  }
  function DT(e) {
    e = AT(e);
    const t = RT(e),
      n = qT(e, t.state, t.location, t.replace);
    function r(s, o = !0) {
      o || n.pauseListeners(), history.go(s);
    }
    const i = Ot(
      { location: "", base: e, go: r, createHref: CT.bind(null, e) },
      t,
      n
    );
    return (
      Object.defineProperty(i, "location", {
        enumerable: !0,
        get: () => t.location.value,
      }),
      Object.defineProperty(i, "state", {
        enumerable: !0,
        get: () => t.state.value,
      }),
      i
    );
  }
  function MT(e) {
    return typeof e == "string" || (e && typeof e == "object");
  }
  function cg(e) {
    return typeof e == "string" || typeof e == "symbol";
  }
  const ug = Symbol("");
  var Vd;
  (function (e) {
    (e[(e.aborted = 4)] = "aborted"),
      (e[(e.cancelled = 8)] = "cancelled"),
      (e[(e.duplicated = 16)] = "duplicated");
  })(Vd || (Vd = {}));
  function Yi(e, t) {
    return Ot(new Error(), { type: e, [ug]: !0 }, t);
  }
  function Wn(e, t) {
    return e instanceof Error && ug in e && (t == null || !!(e.type & t));
  }
  const Kd = "[^/]+?",
    PT = { sensitive: !1, strict: !1, start: !0, end: !0 },
    BT = /[.+*?^${}()[\]/\\]/g;
  function FT(e, t) {
    const n = Ot({}, PT, t),
      r = [];
    let i = n.start ? "^" : "";
    const s = [];
    for (const c of e) {
      const f = c.length ? [] : [90];
      n.strict && !c.length && (i += "/");
      for (let d = 0; d < c.length; d++) {
        const h = c[d];
        let p = 40 + (n.sensitive ? 0.25 : 0);
        if (h.type === 0)
          d || (i += "/"), (i += h.value.replace(BT, "\\$&")), (p += 40);
        else if (h.type === 1) {
          const { value: g, repeatable: v, optional: E, regexp: x } = h;
          s.push({ name: g, repeatable: v, optional: E });
          const A = x || Kd;
          if (A !== Kd) {
            p += 10;
            try {
              new RegExp(`(${A})`);
            } catch (C) {
              throw new Error(
                `Invalid custom RegExp for param "${g}" (${A}): ` + C.message
              );
            }
          }
          let T = v ? `((?:${A})(?:/(?:${A}))*)` : `(${A})`;
          d || (T = E && c.length < 2 ? `(?:/${T})` : "/" + T),
            E && (T += "?"),
            (i += T),
            (p += 20),
            E && (p += -8),
            v && (p += -20),
            A === ".*" && (p += -50);
        }
        f.push(p);
      }
      r.push(f);
    }
    if (n.strict && n.end) {
      const c = r.length - 1;
      r[c][r[c].length - 1] += 0.7000000000000001;
    }
    n.strict || (i += "/?"),
      n.end ? (i += "$") : n.strict && !i.endsWith("/") && (i += "(?:/|$)");
    const o = new RegExp(i, n.sensitive ? "" : "i");
    function a(c) {
      const f = c.match(o),
        d = {};
      if (!f) return null;
      for (let h = 1; h < f.length; h++) {
        const p = f[h] || "",
          g = s[h - 1];
        d[g.name] = p && g.repeatable ? p.split("/") : p;
      }
      return d;
    }
    function l(c) {
      let f = "",
        d = !1;
      for (const h of e) {
        (!d || !f.endsWith("/")) && (f += "/"), (d = !1);
        for (const p of h)
          if (p.type === 0) f += p.value;
          else if (p.type === 1) {
            const { value: g, repeatable: v, optional: E } = p,
              x = g in c ? c[g] : "";
            if (wn(x) && !v)
              throw new Error(
                `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
              );
            const A = wn(x) ? x.join("/") : x;
            if (!A)
              if (E)
                h.length < 2 &&
                  (f.endsWith("/") ? (f = f.slice(0, -1)) : (d = !0));
              else throw new Error(`Missing required param "${g}"`);
            f += A;
          }
      }
      return f || "/";
    }
    return { re: o, score: r, keys: s, parse: a, stringify: l };
  }
  function $T(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
      const r = t[n] - e[n];
      if (r) return r;
      n++;
    }
    return e.length < t.length
      ? e.length === 1 && e[0] === 80
        ? -1
        : 1
      : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0;
  }
  function fg(e, t) {
    let n = 0;
    const r = e.score,
      i = t.score;
    for (; n < r.length && n < i.length; ) {
      const s = $T(r[n], i[n]);
      if (s) return s;
      n++;
    }
    if (Math.abs(i.length - r.length) === 1) {
      if (Gd(r)) return 1;
      if (Gd(i)) return -1;
    }
    return i.length - r.length;
  }
  function Gd(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
  }
  const jT = { type: 0, value: "" },
    UT = /[a-zA-Z0-9_]/;
  function HT(e) {
    if (!e) return [[]];
    if (e === "/") return [[jT]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(p) {
      throw new Error(`ERR (${n})/"${c}": ${p}`);
    }
    let n = 0,
      r = n;
    const i = [];
    let s;
    function o() {
      s && i.push(s), (s = []);
    }
    let a = 0,
      l,
      c = "",
      f = "";
    function d() {
      c &&
        (n === 0
          ? s.push({ type: 0, value: c })
          : n === 1 || n === 2 || n === 3
          ? (s.length > 1 &&
              (l === "*" || l === "+") &&
              t(
                `A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`
              ),
            s.push({
              type: 1,
              value: c,
              regexp: f,
              repeatable: l === "*" || l === "+",
              optional: l === "*" || l === "?",
            }))
          : t("Invalid state to consume buffer"),
        (c = ""));
    }
    function h() {
      c += l;
    }
    for (; a < e.length; ) {
      if (((l = e[a++]), l === "\\" && n !== 2)) {
        (r = n), (n = 4);
        continue;
      }
      switch (n) {
        case 0:
          l === "/" ? (c && d(), o()) : l === ":" ? (d(), (n = 1)) : h();
          break;
        case 4:
          h(), (n = r);
          break;
        case 1:
          l === "("
            ? (n = 2)
            : UT.test(l)
            ? h()
            : (d(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--);
          break;
        case 2:
          l === ")"
            ? f[f.length - 1] == "\\"
              ? (f = f.slice(0, -1) + l)
              : (n = 3)
            : (f += l);
          break;
        case 3:
          d(), (n = 0), l !== "*" && l !== "?" && l !== "+" && a--, (f = "");
          break;
        default:
          t("Unknown state");
          break;
      }
    }
    return (
      n === 2 && t(`Unfinished custom RegExp for param "${c}"`), d(), o(), i
    );
  }
  function zT(e, t, n) {
    const r = FT(HT(e.path), n),
      i = Ot(r, { record: e, parent: t, children: [], alias: [] });
    return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
  }
  function VT(e, t) {
    const n = [],
      r = new Map();
    t = Zd({ strict: !1, end: !0, sensitive: !1 }, t);
    function i(d) {
      return r.get(d);
    }
    function s(d, h, p) {
      const g = !p,
        v = Yd(d);
      v.aliasOf = p && p.record;
      const E = Zd(t, d),
        x = [v];
      if ("alias" in d) {
        const C = typeof d.alias == "string" ? [d.alias] : d.alias;
        for (const q of C)
          x.push(
            Yd(
              Ot({}, v, {
                components: p ? p.record.components : v.components,
                path: q,
                aliasOf: p ? p.record : v,
              })
            )
          );
      }
      let A, T;
      for (const C of x) {
        const { path: q } = C;
        if (h && q[0] !== "/") {
          const P = h.record.path,
            W = P[P.length - 1] === "/" ? "" : "/";
          C.path = h.record.path + (q && W + q);
        }
        if (
          ((A = zT(C, h, E)),
          p
            ? p.alias.push(A)
            : ((T = T || A),
              T !== A && T.alias.push(A),
              g && d.name && !Xd(A) && o(d.name)),
          dg(A) && l(A),
          v.children)
        ) {
          const P = v.children;
          for (let W = 0; W < P.length; W++) s(P[W], A, p && p.children[W]);
        }
        p = p || A;
      }
      return T
        ? () => {
            o(T);
          }
        : Os;
    }
    function o(d) {
      if (cg(d)) {
        const h = r.get(d);
        h &&
          (r.delete(d),
          n.splice(n.indexOf(h), 1),
          h.children.forEach(o),
          h.alias.forEach(o));
      } else {
        const h = n.indexOf(d);
        h > -1 &&
          (n.splice(h, 1),
          d.record.name && r.delete(d.record.name),
          d.children.forEach(o),
          d.alias.forEach(o));
      }
    }
    function a() {
      return n;
    }
    function l(d) {
      const h = WT(d, n);
      n.splice(h, 0, d), d.record.name && !Xd(d) && r.set(d.record.name, d);
    }
    function c(d, h) {
      let p,
        g = {},
        v,
        E;
      if ("name" in d && d.name) {
        if (((p = r.get(d.name)), !p)) throw Yi(1, { location: d });
        (E = p.record.name),
          (g = Ot(
            Wd(
              h.params,
              p.keys
                .filter((T) => !T.optional)
                .concat(p.parent ? p.parent.keys.filter((T) => T.optional) : [])
                .map((T) => T.name)
            ),
            d.params &&
              Wd(
                d.params,
                p.keys.map((T) => T.name)
              )
          )),
          (v = p.stringify(g));
      } else if (d.path != null)
        (v = d.path),
          (p = n.find((T) => T.re.test(v))),
          p && ((g = p.parse(v)), (E = p.record.name));
      else {
        if (
          ((p = h.name ? r.get(h.name) : n.find((T) => T.re.test(h.path))), !p)
        )
          throw Yi(1, { location: d, currentLocation: h });
        (E = p.record.name),
          (g = Ot({}, h.params, d.params)),
          (v = p.stringify(g));
      }
      const x = [];
      let A = p;
      for (; A; ) x.unshift(A.record), (A = A.parent);
      return { name: E, path: v, params: g, matched: x, meta: GT(x) };
    }
    e.forEach((d) => s(d));
    function f() {
      (n.length = 0), r.clear();
    }
    return {
      addRoute: s,
      resolve: c,
      removeRoute: o,
      clearRoutes: f,
      getRoutes: a,
      getRecordMatcher: i,
    };
  }
  function Wd(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n;
  }
  function Yd(e) {
    const t = {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: e.aliasOf,
      beforeEnter: e.beforeEnter,
      props: KT(e),
      children: e.children || [],
      instances: {},
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      components:
        "components" in e
          ? e.components || null
          : e.component && { default: e.component },
    };
    return Object.defineProperty(t, "mods", { value: {} }), t;
  }
  function KT(e) {
    const t = {},
      n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n;
    return t;
  }
  function Xd(e) {
    for (; e; ) {
      if (e.record.aliasOf) return !0;
      e = e.parent;
    }
    return !1;
  }
  function GT(e) {
    return e.reduce((t, n) => Ot(t, n.meta), {});
  }
  function Zd(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n;
  }
  function WT(e, t) {
    let n = 0,
      r = t.length;
    for (; n !== r; ) {
      const s = (n + r) >> 1;
      fg(e, t[s]) < 0 ? (r = s) : (n = s + 1);
    }
    const i = YT(e);
    return i && (r = t.lastIndexOf(i, r - 1)), r;
  }
  function YT(e) {
    let t = e;
    for (; (t = t.parent); ) if (dg(t) && fg(e, t) === 0) return t;
  }
  function dg({ record: e }) {
    return !!(
      e.name ||
      (e.components && Object.keys(e.components).length) ||
      e.redirect
    );
  }
  function XT(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let i = 0; i < r.length; ++i) {
      const s = r[i].replace(rg, " "),
        o = s.indexOf("="),
        a = Xs(o < 0 ? s : s.slice(0, o)),
        l = o < 0 ? null : Xs(s.slice(o + 1));
      if (a in t) {
        let c = t[a];
        wn(c) || (c = t[a] = [c]), c.push(l);
      } else t[a] = l;
    }
    return t;
  }
  function Jd(e) {
    let t = "";
    for (let n in e) {
      const r = e[n];
      if (((n = gT(n)), r == null)) {
        r !== void 0 && (t += (t.length ? "&" : "") + n);
        continue;
      }
      (wn(r) ? r.map((s) => s && Qc(s)) : [r && Qc(r)]).forEach((s) => {
        s !== void 0 &&
          ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s));
      });
    }
    return t;
  }
  function ZT(e) {
    const t = {};
    for (const n in e) {
      const r = e[n];
      r !== void 0 &&
        (t[n] = wn(r)
          ? r.map((i) => (i == null ? null : "" + i))
          : r == null
          ? r
          : "" + r);
    }
    return t;
  }
  const JT = Symbol(""),
    Qd = Symbol(""),
    Vu = Symbol(""),
    hg = Symbol(""),
    eu = Symbol("");
  function hs() {
    let e = [];
    function t(r) {
      return (
        e.push(r),
        () => {
          const i = e.indexOf(r);
          i > -1 && e.splice(i, 1);
        }
      );
    }
    function n() {
      e = [];
    }
    return { add: t, list: () => e.slice(), reset: n };
  }
  function yr(e, t, n, r, i, s = (o) => o()) {
    const o = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
    return () =>
      new Promise((a, l) => {
        const c = (h) => {
            h === !1
              ? l(Yi(4, { from: n, to: t }))
              : h instanceof Error
              ? l(h)
              : MT(h)
              ? l(Yi(2, { from: t, to: h }))
              : (o &&
                  r.enterCallbacks[i] === o &&
                  typeof h == "function" &&
                  o.push(h),
                a());
          },
          f = s(() => e.call(r && r.instances[i], t, n, c));
        let d = Promise.resolve(f);
        e.length < 3 && (d = d.then(c)), d.catch((h) => l(h));
      });
  }
  function cc(e, t, n, r, i = (s) => s()) {
    const s = [];
    for (const o of e)
      for (const a in o.components) {
        let l = o.components[a];
        if (!(t !== "beforeRouteEnter" && !o.instances[a]))
          if (eg(l)) {
            const f = (l.__vccOpts || l)[t];
            f && s.push(yr(f, n, r, o, a, i));
          } else {
            let c = l();
            s.push(() =>
              c.then((f) => {
                if (!f)
                  throw new Error(
                    `Couldn't resolve component "${a}" at "${o.path}"`
                  );
                const d = sT(f) ? f.default : f;
                (o.mods[a] = f), (o.components[a] = d);
                const p = (d.__vccOpts || d)[t];
                return p && yr(p, n, r, o, a, i)();
              })
            );
          }
      }
    return s;
  }
  function th(e) {
    const t = Jn(Vu),
      n = Jn(hg),
      r = dn(() => {
        const l = Li(e.to);
        return t.resolve(l);
      }),
      i = dn(() => {
        const { matched: l } = r.value,
          { length: c } = l,
          f = l[c - 1],
          d = n.matched;
        if (!f || !d.length) return -1;
        const h = d.findIndex(Wi.bind(null, f));
        if (h > -1) return h;
        const p = eh(l[c - 2]);
        return c > 1 && eh(f) === p && d[d.length - 1].path !== p
          ? d.findIndex(Wi.bind(null, l[c - 2]))
          : h;
      }),
      s = dn(() => i.value > -1 && rC(n.params, r.value.params)),
      o = dn(
        () =>
          i.value > -1 &&
          i.value === n.matched.length - 1 &&
          ag(n.params, r.value.params)
      );
    function a(l = {}) {
      if (nC(l)) {
        const c = t[Li(e.replace) ? "replace" : "push"](Li(e.to)).catch(Os);
        return (
          e.viewTransition &&
            typeof document < "u" &&
            "startViewTransition" in document &&
            document.startViewTransition(() => c),
          c
        );
      }
      return Promise.resolve();
    }
    return {
      route: r,
      href: dn(() => r.value.href),
      isActive: s,
      isExactActive: o,
      navigate: a,
    };
  }
  function QT(e) {
    return e.length === 1 ? e[0] : e;
  }
  const tC = Dh({
      name: "RouterLink",
      compatConfig: { MODE: 3 },
      props: {
        to: { type: [String, Object], required: !0 },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: { type: String, default: "page" },
        viewTransition: Boolean,
      },
      useLink: th,
      setup(e, { slots: t }) {
        const n = Ta(th(e)),
          { options: r } = Jn(Vu),
          i = dn(() => ({
            [nh(e.activeClass, r.linkActiveClass, "router-link-active")]:
              n.isActive,
            [nh(
              e.exactActiveClass,
              r.linkExactActiveClass,
              "router-link-exact-active"
            )]: n.isExactActive,
          }));
        return () => {
          const s = t.default && QT(t.default(n));
          return e.custom
            ? s
            : dp(
                "a",
                {
                  "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                  href: n.href,
                  onClick: n.navigate,
                  class: i.value,
                },
                s
              );
        };
      },
    }),
    eC = tC;
  function nC(e) {
    if (
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
      !e.defaultPrevented &&
      !(e.button !== void 0 && e.button !== 0)
    ) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
        const t = e.currentTarget.getAttribute("target");
        if (/\b_blank\b/i.test(t)) return;
      }
      return e.preventDefault && e.preventDefault(), !0;
    }
  }
  function rC(e, t) {
    for (const n in t) {
      const r = t[n],
        i = e[n];
      if (typeof r == "string") {
        if (r !== i) return !1;
      } else if (
        !wn(i) ||
        i.length !== r.length ||
        r.some((s, o) => s !== i[o])
      )
        return !1;
    }
    return !0;
  }
  function eh(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
  }
  const nh = (e, t, n) => e ?? t ?? n,
    iC = Dh({
      name: "RouterView",
      inheritAttrs: !1,
      props: { name: { type: String, default: "default" }, route: Object },
      compatConfig: { MODE: 3 },
      setup(e, { attrs: t, slots: n }) {
        const r = Jn(eu),
          i = dn(() => e.route || r.value),
          s = Jn(Qd, 0),
          o = dn(() => {
            let c = Li(s);
            const { matched: f } = i.value;
            let d;
            for (; (d = f[c]) && !d.components; ) c++;
            return c;
          }),
          a = dn(() => i.value.matched[o.value]);
        Po(
          Qd,
          dn(() => o.value + 1)
        ),
          Po(JT, a),
          Po(eu, i);
        const l = Jg();
        return (
          Bo(
            () => [l.value, a.value, e.name],
            ([c, f, d], [h, p, g]) => {
              f &&
                ((f.instances[d] = c),
                p &&
                  p !== f &&
                  c &&
                  c === h &&
                  (f.leaveGuards.size || (f.leaveGuards = p.leaveGuards),
                  f.updateGuards.size || (f.updateGuards = p.updateGuards))),
                c &&
                  f &&
                  (!p || !Wi(f, p) || !h) &&
                  (f.enterCallbacks[d] || []).forEach((v) => v(c));
            },
            { flush: "post" }
          ),
          () => {
            const c = i.value,
              f = e.name,
              d = a.value,
              h = d && d.components[f];
            if (!h) return rh(n.default, { Component: h, route: c });
            const p = d.props[f],
              g = p
                ? p === !0
                  ? c.params
                  : typeof p == "function"
                  ? p(c)
                  : p
                : null,
              E = dp(
                h,
                Ot({}, g, t, {
                  onVnodeUnmounted: (x) => {
                    x.component.isUnmounted && (d.instances[f] = null);
                  },
                  ref: l,
                })
              );
            return rh(n.default, { Component: E, route: c }) || E;
          }
        );
      },
    });
  function rh(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
  }
  const sC = iC;
  function oC(e) {
    const t = VT(e.routes, e),
      n = e.parseQuery || XT,
      r = e.stringifyQuery || Jd,
      i = e.history,
      s = hs(),
      o = hs(),
      a = hs(),
      l = Qg(hr);
    let c = hr;
    Ti &&
      e.scrollBehavior &&
      "scrollRestoration" in history &&
      (history.scrollRestoration = "manual");
    const f = ac.bind(null, (k) => "" + k),
      d = ac.bind(null, vT),
      h = ac.bind(null, Xs);
    function p(k, j) {
      let U, J;
      return (
        cg(k) ? ((U = t.getRecordMatcher(k)), (J = j)) : (J = k),
        t.addRoute(J, U)
      );
    }
    function g(k) {
      const j = t.getRecordMatcher(k);
      j && t.removeRoute(j);
    }
    function v() {
      return t.getRoutes().map((k) => k.record);
    }
    function E(k) {
      return !!t.getRecordMatcher(k);
    }
    function x(k, j) {
      if (((j = Ot({}, j || l.value)), typeof k == "string")) {
        const _ = lc(n, k, j.path),
          I = t.resolve({ path: _.path }, j),
          R = i.createHref(_.fullPath);
        return Ot(_, I, {
          params: h(I.params),
          hash: Xs(_.hash),
          redirectedFrom: void 0,
          href: R,
        });
      }
      let U;
      if (k.path != null) U = Ot({}, k, { path: lc(n, k.path, j.path).path });
      else {
        const _ = Ot({}, k.params);
        for (const I in _) _[I] == null && delete _[I];
        (U = Ot({}, k, { params: d(_) })), (j.params = d(j.params));
      }
      const J = t.resolve(U, j),
        At = k.hash || "";
      J.params = f(h(J.params));
      const b = ET(r, Ot({}, k, { hash: mT(At), path: J.path })),
        y = i.createHref(b);
      return Ot(
        {
          fullPath: b,
          hash: At,
          query: r === Jd ? ZT(k.query) : k.query || {},
        },
        J,
        { redirectedFrom: void 0, href: y }
      );
    }
    function A(k) {
      return typeof k == "string" ? lc(n, k, l.value.path) : Ot({}, k);
    }
    function T(k, j) {
      if (c !== k) return Yi(8, { from: j, to: k });
    }
    function C(k) {
      return W(k);
    }
    function q(k) {
      return C(Ot(A(k), { replace: !0 }));
    }
    function P(k) {
      const j = k.matched[k.matched.length - 1];
      if (j && j.redirect) {
        const { redirect: U } = j;
        let J = typeof U == "function" ? U(k) : U;
        return (
          typeof J == "string" &&
            ((J =
              J.includes("?") || J.includes("#") ? (J = A(J)) : { path: J }),
            (J.params = {})),
          Ot(
            {
              query: k.query,
              hash: k.hash,
              params: J.path != null ? {} : k.params,
            },
            J
          )
        );
      }
    }
    function W(k, j) {
      const U = (c = x(k)),
        J = l.value,
        At = k.state,
        b = k.force,
        y = k.replace === !0,
        _ = P(U);
      if (_)
        return W(
          Ot(A(_), {
            state: typeof _ == "object" ? Ot({}, At, _.state) : At,
            force: b,
            replace: y,
          }),
          j || U
        );
      const I = U;
      I.redirectedFrom = j;
      let R;
      return (
        !b &&
          ST(r, J, U) &&
          ((R = Yi(16, { to: I, from: J })), oe(J, J, !0, !1)),
        (R ? Promise.resolve(R) : ut(I, J))
          .catch((O) => (Wn(O) ? (Wn(O, 2) ? O : gt(O)) : mt(O, I, J)))
          .then((O) => {
            if (O) {
              if (Wn(O, 2))
                return W(
                  Ot({ replace: y }, A(O.to), {
                    state:
                      typeof O.to == "object" ? Ot({}, At, O.to.state) : At,
                    force: b,
                  }),
                  j || I
                );
            } else O = z(I, J, !0, y, At);
            return dt(I, J, O), O;
          })
      );
    }
    function at(k, j) {
      const U = T(k, j);
      return U ? Promise.reject(U) : Promise.resolve();
    }
    function Y(k) {
      const j = rn.values().next().value;
      return j && typeof j.runWithContext == "function"
        ? j.runWithContext(k)
        : k();
    }
    function ut(k, j) {
      let U;
      const [J, At, b] = aC(k, j);
      U = cc(J.reverse(), "beforeRouteLeave", k, j);
      for (const _ of J)
        _.leaveGuards.forEach((I) => {
          U.push(yr(I, k, j));
        });
      const y = at.bind(null, k, j);
      return (
        U.push(y),
        ae(U)
          .then(() => {
            U = [];
            for (const _ of s.list()) U.push(yr(_, k, j));
            return U.push(y), ae(U);
          })
          .then(() => {
            U = cc(At, "beforeRouteUpdate", k, j);
            for (const _ of At)
              _.updateGuards.forEach((I) => {
                U.push(yr(I, k, j));
              });
            return U.push(y), ae(U);
          })
          .then(() => {
            U = [];
            for (const _ of b)
              if (_.beforeEnter)
                if (wn(_.beforeEnter))
                  for (const I of _.beforeEnter) U.push(yr(I, k, j));
                else U.push(yr(_.beforeEnter, k, j));
            return U.push(y), ae(U);
          })
          .then(
            () => (
              k.matched.forEach((_) => (_.enterCallbacks = {})),
              (U = cc(b, "beforeRouteEnter", k, j, Y)),
              U.push(y),
              ae(U)
            )
          )
          .then(() => {
            U = [];
            for (const _ of o.list()) U.push(yr(_, k, j));
            return U.push(y), ae(U);
          })
          .catch((_) => (Wn(_, 8) ? _ : Promise.reject(_)))
      );
    }
    function dt(k, j, U) {
      a.list().forEach((J) => Y(() => J(k, j, U)));
    }
    function z(k, j, U, J, At) {
      const b = T(k, j);
      if (b) return b;
      const y = j === hr,
        _ = Ti ? history.state : {};
      U &&
        (J || y
          ? i.replace(k.fullPath, Ot({ scroll: y && _ && _.scroll }, At))
          : i.push(k.fullPath, At)),
        (l.value = k),
        oe(k, j, U, y),
        gt();
    }
    let ct;
    function Nt() {
      ct ||
        (ct = i.listen((k, j, U) => {
          if (!_t.listening) return;
          const J = x(k),
            At = P(J);
          if (At) {
            W(Ot(At, { replace: !0, force: !0 }), J).catch(Os);
            return;
          }
          c = J;
          const b = l.value;
          Ti && kT(Hd(b.fullPath, U.delta), za()),
            ut(J, b)
              .catch((y) =>
                Wn(y, 12)
                  ? y
                  : Wn(y, 2)
                  ? (W(Ot(A(y.to), { force: !0 }), J)
                      .then((_) => {
                        Wn(_, 20) &&
                          !U.delta &&
                          U.type === Zs.pop &&
                          i.go(-1, !1);
                      })
                      .catch(Os),
                    Promise.reject())
                  : (U.delta && i.go(-U.delta, !1), mt(y, J, b))
              )
              .then((y) => {
                (y = y || z(J, b, !1)),
                  y &&
                    (U.delta && !Wn(y, 8)
                      ? i.go(-U.delta, !1)
                      : U.type === Zs.pop && Wn(y, 20) && i.go(-1, !1)),
                  dt(J, b, y);
              })
              .catch(Os);
        }));
    }
    let jt = hs(),
      St = hs(),
      vt;
    function mt(k, j, U) {
      gt(k);
      const J = St.list();
      return (
        J.length ? J.forEach((At) => At(k, j, U)) : console.error(k),
        Promise.reject(k)
      );
    }
    function Se() {
      return vt && l.value !== hr
        ? Promise.resolve()
        : new Promise((k, j) => {
            jt.add([k, j]);
          });
    }
    function gt(k) {
      return (
        vt ||
          ((vt = !k),
          Nt(),
          jt.list().forEach(([j, U]) => (k ? U(k) : j())),
          jt.reset()),
        k
      );
    }
    function oe(k, j, U, J) {
      const { scrollBehavior: At } = e;
      if (!Ti || !At) return Promise.resolve();
      const b =
        (!U && OT(Hd(k.fullPath, 0))) ||
        ((J || !U) && history.state && history.state.scroll) ||
        null;
      return hu()
        .then(() => At(k, j, b))
        .then((y) => y && IT(y))
        .catch((y) => mt(y, k, j));
    }
    const Wt = (k) => i.go(k);
    let ie;
    const rn = new Set(),
      _t = {
        currentRoute: l,
        listening: !0,
        addRoute: p,
        removeRoute: g,
        clearRoutes: t.clearRoutes,
        hasRoute: E,
        getRoutes: v,
        resolve: x,
        options: e,
        push: C,
        replace: q,
        go: Wt,
        back: () => Wt(-1),
        forward: () => Wt(1),
        beforeEach: s.add,
        beforeResolve: o.add,
        afterEach: a.add,
        onError: St.add,
        isReady: Se,
        install(k) {
          const j = this;
          k.component("RouterLink", eC),
            k.component("RouterView", sC),
            (k.config.globalProperties.$router = j),
            Object.defineProperty(k.config.globalProperties, "$route", {
              enumerable: !0,
              get: () => Li(l),
            }),
            Ti &&
              !ie &&
              l.value === hr &&
              ((ie = !0), C(i.location).catch((At) => {}));
          const U = {};
          for (const At in hr)
            Object.defineProperty(U, At, {
              get: () => l.value[At],
              enumerable: !0,
            });
          k.provide(Vu, j), k.provide(hg, Ah(U)), k.provide(eu, l);
          const J = k.unmount;
          rn.add(k),
            (k.unmount = function () {
              rn.delete(k),
                rn.size < 1 &&
                  ((c = hr),
                  ct && ct(),
                  (ct = null),
                  (l.value = hr),
                  (ie = !1),
                  (vt = !1)),
                J();
            });
        },
      };
    function ae(k) {
      return k.reduce((j, U) => j.then(() => Y(U)), Promise.resolve());
    }
    return _t;
  }
  function aC(e, t) {
    const n = [],
      r = [],
      i = [],
      s = Math.max(t.matched.length, e.matched.length);
    for (let o = 0; o < s; o++) {
      const a = t.matched[o];
      a && (e.matched.find((c) => Wi(c, a)) ? r.push(a) : n.push(a));
      const l = e.matched[o];
      l && (t.matched.find((c) => Wi(c, l)) || i.push(l));
    }
    return [n, r, i];
  }
  const lC = {
      name: "DocumentacaoTecnica",
      mixins: [tg],
      components: {
        ToastNotification: Jm,
        AppHeader: vp,
        SwapButton: Xm,
        ThemeToggle: Zm,
        InfoButton: Mp,
        UploadButton: Qm,
        BasicFormSection: yp,
        DataTable: Rp,
        FormSubmitSection: Dp,
        ModalMessage: Pp,
      },
      data() {
        return {
          editingIndex: null,
          sortable: null,
          sortableInitialized: !1,
          sortableTimeout: null,
          sortableInstance: null,
          isDestroying: !1,
          novaAtividade: { nome: "", horas: "" },
          atividades: [],
          atividadesChangeCounter: 0,
        };
      },
      computed: {
        totalHoras() {
          return this.atividades.reduce(
            (e, t) => e + (Number(t.horas) || 0),
            0
          );
        },
        pontosFuncao() {
          return ((this.totalHoras / 10) * 2.5).toFixed(2);
        },
        dataInicioFormatada: {
          get() {
            return this.formData.dataInicio;
          },
          set(e) {
            this.formData.dataInicio = e;
          },
        },
        dataFimFormatada: {
          get() {
            return this.formData.dataFim;
          },
          set(e) {
            this.formData.dataFim = e;
          },
        },
      },
      watch: {
        atividades: {
          handler(e, t) {
            e.length !== (t == null ? void 0 : t.length) &&
              this.$nextTick(() => {
                this.initSortable();
              });
          },
          deep: !0,
        },
        selectedAutores: {
          handler(e) {
            e.length === 0
              ? this.aplicarErroTemporarioAutores()
              : this.resetAutorFieldError();
          },
          immediate: !0,
        },
      },
      created() {
        this.lastFormat = "gerarDocx";
      },
      mounted() {
        this.initSortable();
      },
      beforeUnmount() {
        this.destroySortable();
      },
      methods: {
        initSortable() {
          return new Promise((e) => {
            this.$nextTick(() => {
              var n;
              if (this.isDestroying) {
                e();
                return;
              }
              const t =
                (n = this.$refs.dragArea) == null
                  ? void 0
                  : n.getElementsByTagName("tbody")[0];
              if (!t) {
                e();
                return;
              }
              this.destroySortable().then(() => {
                try {
                  (this.sortableInstance = ot.create(t, {
                    animation: 150,
                    handle: ".cursor-move",
                    ghostClass: "sortable-ghost",
                    chosenClass: "sortable-chosen",
                    dragClass: "sortable-drag",
                    forceFallback: !0,
                    fallbackClass: "sortable-fallback",
                    onEnd: (r) => {
                      r.oldIndex !== r.newIndex &&
                        this.reordenarAtividades({
                          oldIndex: r.oldIndex,
                          newIndex: r.newIndex,
                        });
                    },
                  })),
                    e();
                } catch (r) {
                  console.error("Erro ao criar Sortable:", r),
                    (this.sortableInstance = null),
                    e();
                }
              });
            });
          });
        },
        destroySortable() {
          return new Promise((e) => {
            if (!this.sortableInstance) {
              e();
              return;
            }
            try {
              (this.isDestroying = !0),
                typeof this.sortableInstance.destroy == "function" &&
                  this.sortableInstance.destroy();
            } catch (t) {
              console.warn("Aviso ao destruir Sortable:", t);
            } finally {
              (this.sortableInstance = null), (this.isDestroying = !1), e();
            }
          });
        },
        reordenarAtividades({ oldIndex: e, newIndex: t }) {
          const n = JSON.parse(JSON.stringify(this.atividades)),
            [r] = n.splice(e, 1);
          n.splice(t, 0, r),
            (this.atividades = [...n]),
            this.$nextTick(() => {
              this.destroySortable().then(() => {
                this.initSortable();
              });
            }),
            this.atividadesChangeCounter++;
        },
        adicionarAtividade() {
          this.novaAtividade.nome &&
            this.novaAtividade.horas &&
            (this.editingIndex !== null
              ? ((this.atividades[this.editingIndex] = {
                  ...this.novaAtividade,
                }),
                (this.editingIndex = null))
              : this.atividades.push({ ...this.novaAtividade }),
            (this.novaAtividade = { nome: "", horas: "" }));
        },
        editarAtividade(e) {
          (this.editingIndex = e),
            (this.novaAtividade = { ...this.atividades[e] });
        },
        removerAtividade(e) {
          const t = this.atividades[e].nome;
          this.mostrarModalMensagem(
            "Remover Atividade",
            `Tem certeza que deseja remover a atividade "${t}"?`,
            () => {
              this.atividades.splice(e, 1),
                this.editingIndex === e &&
                  ((this.novaAtividade = { nome: "", horas: "" }),
                  (this.editingIndex = null)),
                this.editingIndex > e && this.editingIndex--;
            }
          );
        },
        cancelarEdicao() {
          (this.editingIndex = null),
            (this.novaAtividade = { nome: "", horas: "" });
        },
        submitAtividade() {
          const e = this.$refs.atividadeInput,
            t = this.$refs.horasInput;
          e && e.classList.remove("campo-erro"),
            t && t.classList.remove("campo-erro");
          let n = !0;
          !this.novaAtividade.nome || this.novaAtividade.nome.trim() === ""
            ? (e && (this.aplicarErroTemporario(e), e.focus()), (n = !1))
            : (!this.novaAtividade.horas ||
                isNaN(this.novaAtividade.horas) ||
                this.novaAtividade.horas <= 0) &&
              (t && (this.aplicarErroTemporario(t), t.focus()), (n = !1)),
            n &&
              this.destroySortable().then(() => {
                this.editingIndex !== null
                  ? ((this.atividades[this.editingIndex] = {
                      ...this.novaAtividade,
                    }),
                    (this.editingIndex = null))
                  : this.atividades.push({ ...this.novaAtividade }),
                  (this.novaAtividade = { nome: "", horas: "" }),
                  this.$nextTick(() => {
                    this.$refs.atividadeInput.focus(), this.initSortable();
                  });
              });
        },
        resetAtividadeFieldError() {
          const e = document.querySelector(
            ".activity-form .form-group .form-input"
          );
          e && e.classList.remove("campo-erro");
        },
        validarCamposAtividade() {
          const e = this.$refs.atividadeInput,
            t = this.$refs.horasInput,
            n = this.$refs.activityButton,
            r = document.querySelector(".activity-form .btn");
          if (
            !this.novaAtividade.nome ||
            this.novaAtividade.nome.trim() === ""
          ) {
            if (e)
              return (
                this.aplicarErroTemporario(e),
                e.focus(),
                this.notificationService.show(
                  "Adicione pelo menos uma atividade",
                  "error"
                ),
                (this.isLoading = !1),
                !1
              );
          } else if (
            !this.novaAtividade.horas ||
            isNaN(this.novaAtividade.horas) ||
            this.novaAtividade.horas <= 0
          ) {
            if (t)
              return (
                this.aplicarErroTemporario(t),
                t.focus(),
                this.notificationService.show(
                  "Informe o número de horas para a atividade",
                  "error"
                ),
                (this.isLoading = !1),
                !1
              );
          } else
            return r
              ? (t.classList.remove("campo-erro"),
                r.classList.add("btn-erro"),
                n.focus(),
                setTimeout(() => {
                  r.classList.remove("btn-erro");
                }, 2e3),
                this.notificationService.show(
                  "Clique em 'Adicionar' para incluir a atividade na lista",
                  "error"
                ),
                (this.isLoading = !1),
                !1)
              : (this.notificationService.show(
                  "Adicione pelo menos uma atividade",
                  "error"
                ),
                (this.isLoading = !1),
                !1);
          return !0;
        },
        async gerarDocumento() {
          if (!this.isLoading)
            try {
              if (!(this.formData.gerarDocx || this.formData.gerarPdf)) {
                this.enviarFormularioParaJSON();
                return;
              }
              try {
                this.resetFieldErrors();
              } catch (t) {
                console.warn("Erro ao resetar campos:", t);
              }
              if (
                !this.validarCamposObrigatorios() ||
                (this.atividades.length === 0 && !this.validarCamposAtividade())
              )
                return;
              this.enviarFormularioCompleto();
            } catch (e) {
              console.error("Erro ao gerar documento:", e),
                this.notificationService.show(
                  "Ocorreu um erro ao processar o documento. Por favor, tente novamente.",
                  "error"
                ),
                (this.isLoading = !1);
            }
        },
        enviarFormularioParaJSON() {
          this.isLoading = !0;
          try {
            const e = this.prepareFormData(!0, "tecnica");
            e.append("atividades", JSON.stringify(this.atividades)),
              e.append("totalHoras", this.totalHoras.toString()),
              this.notificationService.show("Gerando JSON...", "info");
            const t = this;
            fetch("/gerar_documentos", { method: "POST", body: e })
              .then(function (n) {
                return n.ok
                  ? ((window.lastResponse = n), n.blob())
                  : n
                      .json()
                      .then(function (r) {
                        throw new Error(r.error || "Erro ao gerar JSON");
                      })
                      .catch(function () {
                        throw new Error("Erro");
                      });
              })
              .then(function (n) {
                const r = window.URL.createObjectURL(n),
                  i = document.createElement("a");
                i.href = r;
                let s = `SS ${t.formData.numeroSS.padStart(3, "0")}-${
                  t.formData.anoSS
                }.json`;
                const o = window.lastResponse;
                if (o && o.headers) {
                  const a = o.headers.get("Content-Disposition");
                  if (a) {
                    const l = a.match(/filename="(.+)"/);
                    l && l[1] && (s = l[1]);
                  }
                }
                (i.download = s),
                  document.body.appendChild(i),
                  setTimeout(function () {
                    i.click(),
                      setTimeout(function () {
                        window.URL.revokeObjectURL(r),
                          document.body.removeChild(i),
                          t.notificationService.show(
                            "Arquivo JSON gerado com sucesso!",
                            "success"
                          );
                      }, 100);
                  }, 100);
              })
              .catch(function (n) {
                console.error("Erro:", n),
                  t.notificationService.show(
                    n.message || "Erro ao gerar JSON",
                    "error"
                  );
              })
              .finally(function () {
                (t.isLoading = !1), delete window.lastResponse;
              });
          } catch (e) {
            console.error("Erro:", e),
              this.notificationService.show(
                e.message || "Erro ao gerar JSON",
                "error"
              ),
              (this.isLoading = !1);
          }
        },
        enviarFormularioCompleto() {
          this.isLoading = !0;
          try {
            const e = this.prepareFormData(!1, "tecnica");
            e.append("atividades", JSON.stringify(this.atividades)),
              e.append("totalHoras", this.totalHoras.toString()),
              this.notificationService.show("Gerando documentos...", "info"),
              fetch("/gerar_documentos", { method: "POST", body: e })
                .then((t) => {
                  if (!t.ok)
                    return t.json().then((r) => {
                      throw new Error(r.error || "Erro ao gerar documento");
                    });
                  const n = t.headers.get("Content-Type");
                  return n && n.includes("application/zip")
                    ? t.blob().then((r) => {
                        const i = window.URL.createObjectURL(r),
                          s = document.createElement("a");
                        (s.style.display = "none"), (s.href = i);
                        const o = t.headers.get("Content-Disposition");
                        let a = "documentos.zip";
                        if (o) {
                          const l = o.match(/filename="(.+)"/);
                          l && l[1] && (a = l[1]);
                        }
                        return (
                          (s.download = a),
                          document.body.appendChild(s),
                          setTimeout(() => {
                            s.click(),
                              setTimeout(() => {
                                window.URL.revokeObjectURL(i),
                                  document.body.removeChild(s);
                              }, 200);
                          }, 100),
                          this.notificationService.show(
                            "Documento gerado com sucesso!",
                            "success"
                          ),
                          { success: !0 }
                        );
                      })
                    : t.json();
                })
                .then((t) => {
                  (t && t.success === !0) ||
                    (t &&
                      t.message &&
                      this.notificationService.show(t.message, "success"));
                })
                .catch((t) => {
                  console.error("Erro:", t),
                    this.notificationService.show(
                      t.message || "Erro ao gerar documento",
                      "error"
                    );
                })
                .finally(() => {
                  this.isLoading = !1;
                });
          } catch (e) {
            console.error("Erro:", e),
              this.notificationService.show(
                e.message || "Erro ao gerar documento",
                "error"
              ),
              (this.isLoading = !1);
          }
        },
        updateDocx(e) {
          this.formData.gerarDocx = e;
        },
        updatePdf(e) {
          this.formData.gerarPdf = e;
        },
      },
    },
    cC = { class: "container" },
    uC = { class: "main-card" },
    fC = { class: "base-section" },
    dC = { class: "activity-inputs" },
    hC = { class: "form-group w-8/12" },
    pC = { class: "form-group w-2/12" },
    mC = { class: "form-group w-2/12" };
  function gC(e, t, n, r, i, s) {
    const o = Ie("toast-notification"),
      a = Ie("swap-button"),
      l = Ie("theme-toggle"),
      c = Ie("info-button"),
      f = Ie("upload-button"),
      d = Ie("app-header"),
      h = Ie("basic-form-section"),
      p = Ie("data-table"),
      g = Ie("form-submit-section"),
      v = Ie("modal-message");
    return (
      $(),
      K("div", null, [
        Rt(o, { toasts: e.notificationService.toasts }, null, 8, ["toasts"]),
        Rt(
          d,
          {
            title: "Documentações Técnicas",
            onSwapRequested: e.handleSwapRequested,
          },
          {
            "swap-button": Qo(() => [
              Rt(
                a,
                {
                  "target-url": "/dev",
                  "target-type": "desenvolvimento",
                  tooltip: "Trocar para documentação de desenvolvimento",
                  onSwapRequested: e.handleSwapRequested,
                },
                null,
                8,
                ["onSwapRequested"]
              ),
            ]),
            actions: Qo(() => [
              Rt(l, { "is-dark": e.isDark, onToggle: e.toggleTheme }, null, 8, [
                "is-dark",
                "onToggle",
              ]),
              Rt(c, {
                "tooltip-title":
                  "Este sistema gera um arquivo .zip com documentos de desenvolvimento:",
                "tooltip-items": [
                  "Estimativa de Esforço e Cronograma",
                  "Estratégia de Solução",
                  "Relatório de Acompanhamento de Projeto",
                ],
              }),
              Rt(
                f,
                {
                  "tooltip-title": "Importar dados de arquivo JSON",
                  onCheckData: e.checkForImportConfirmation,
                  onJsonLoaded: e.processImportedJSON,
                  onJsonError:
                    t[0] ||
                    (t[0] = (E) =>
                      e.notificationService.show(
                        "Erro ao processar o arquivo JSON. Verifique o formato.",
                        "error"
                      )),
                  ref: "uploadButton",
                },
                null,
                8,
                ["onCheckData", "onJsonLoaded"]
              ),
            ]),
            _: 1,
          },
          8,
          ["onSwapRequested"]
        ),
        S("div", cC, [
          S("div", uC, [
            Rt(
              h,
              {
                ref: "basicFormSection",
                "form-data": e.formData,
                "selected-autores": e.selectedAutores,
                "autor-input": e.autorInput,
                "show-suggestions": e.showSuggestions,
                "filtered-autores": e.filteredAutores,
                "highlighted-index": e.highlightedIndex,
                "onUpdate:numeroSs":
                  t[1] || (t[1] = (E) => (e.formData.numeroSS = E)),
                onFormatSs: e.formatSS,
                "onUpdate:autorInput": e.handleAutorInputUpdate,
                onShowSuggestions: e.toggleSuggestions,
                onNavigateList: t[2] || (t[2] = (E) => e.navigateList(E)),
                onHighlightIndex:
                  t[3] || (t[3] = (E) => (e.highlightedIndex = E)),
                onHandleBackspace: e.handleBackspace,
                onSelectAutor: t[4] || (t[4] = (E) => e.selectAutor(E)),
                onRemoveAutor: t[5] || (t[5] = (E) => e.removeAutor(E)),
              },
              null,
              8,
              [
                "form-data",
                "selected-autores",
                "autor-input",
                "show-suggestions",
                "filtered-autores",
                "highlighted-index",
                "onFormatSs",
                "onUpdate:autorInput",
                "onShowSuggestions",
                "onHandleBackspace",
              ]
            ),
            S("div", fC, [
              t[17] ||
                (t[17] = S(
                  "h2",
                  { class: "base-title" },
                  "Gerenciar Atividades",
                  -1
                )),
              S(
                "form",
                {
                  onSubmit:
                    t[11] ||
                    (t[11] = Sr(
                      (...E) => s.submitAtividade && s.submitAtividade(...E),
                      ["prevent"]
                    )),
                  class: "activity-form",
                },
                [
                  S("div", dC, [
                    S("div", hC, [
                      t[14] ||
                        (t[14] = S(
                          "label",
                          { class: "form-label" },
                          "Atividade",
                          -1
                        )),
                      ke(
                        S(
                          "input",
                          {
                            ref: "atividadeInput",
                            "onUpdate:modelValue":
                              t[6] ||
                              (t[6] = (E) => (i.novaAtividade.nome = E)),
                            type: "text",
                            required: "",
                            class: "form-input",
                            placeholder: "Nome da atividade",
                          },
                          null,
                          512
                        ),
                        [[Me, i.novaAtividade.nome]]
                      ),
                    ]),
                    S("div", pC, [
                      t[15] ||
                        (t[15] = S(
                          "label",
                          { class: "form-label" },
                          "Estimativa de horas",
                          -1
                        )),
                      ke(
                        S(
                          "input",
                          {
                            "onUpdate:modelValue":
                              t[7] ||
                              (t[7] = (E) => (i.novaAtividade.horas = E)),
                            type: "number",
                            required: "",
                            min: "0",
                            ref: "horasInput",
                            class: "form-input text-center",
                            placeholder: "0",
                            onKeydown:
                              t[8] ||
                              (t[8] = Ci(
                                Sr(
                                  (...E) =>
                                    s.submitAtividade &&
                                    s.submitAtividade(...E),
                                  ["prevent"]
                                ),
                                ["enter"]
                              )),
                          },
                          null,
                          544
                        ),
                        [[Me, i.novaAtividade.horas, void 0, { number: !0 }]]
                      ),
                    ]),
                    S("div", mC, [
                      t[16] ||
                        (t[16] = S("label", { class: "form-label" }, " ", -1)),
                      S(
                        "form",
                        {
                          onSubmit:
                            t[10] ||
                            (t[10] = Sr(
                              (...E) =>
                                s.submitAtividade && s.submitAtividade(...E),
                              ["prevent"]
                            )),
                        },
                        [
                          S(
                            "button",
                            {
                              type: "button",
                              onClick:
                                t[9] ||
                                (t[9] = (...E) =>
                                  s.submitAtividade && s.submitAtividade(...E)),
                              ref: "activityButton",
                              class: rt([
                                "btn",
                                i.editingIndex !== null
                                  ? "btn-update"
                                  : "btn-primary",
                              ]),
                            },
                            Ht(
                              i.editingIndex !== null
                                ? "Atualizar"
                                : "Adicionar"
                            ),
                            3
                          ),
                        ],
                        32
                      ),
                    ]),
                  ]),
                ],
                32
              ),
              i.atividades.length > 0
                ? ($(),
                  Er(
                    p,
                    {
                      key: i.atividadesChangeCounter,
                      items: i.atividades,
                      columns: [
                        {
                          key: "nome",
                          label: "Atividade",
                          width: "w-8/12",
                          align: "text-left",
                          type: "text",
                        },
                        {
                          key: "horas",
                          label: "Estimativa de horas",
                          width: "w-2/12",
                          align: "text-center",
                          type: "text",
                        },
                        {
                          key: "actions",
                          label: "Ações",
                          width: "w-2/12",
                          align: "text-center",
                          type: "buttons",
                          actions: { edit: !0, delete: !0 },
                        },
                      ],
                      "key-function": (E, x) => `atividade-${x}`,
                      "drag-ref": "dragArea",
                      draggable: !0,
                      "show-footer": !0,
                      "footer-items": [
                        {
                          label: "Total de horas",
                          value: s.totalHoras,
                          colspan: 1,
                        },
                        {
                          label: "Quantidade de PF",
                          value: s.pontosFuncao,
                          colspan: 2,
                        },
                      ],
                      onEdit: s.editarAtividade,
                      onDelete: s.removerAtividade,
                      onReorder: s.reordenarAtividades,
                    },
                    null,
                    8,
                    [
                      "items",
                      "key-function",
                      "footer-items",
                      "onEdit",
                      "onDelete",
                      "onReorder",
                    ]
                  ))
                : Kt("", !0),
            ]),
            Rt(
              g,
              {
                formatos: e.formData,
                "is-loading": e.isLoading,
                "is-formato-valido":
                  e.formData.gerarDocx || e.formData.gerarPdf,
                "button-text": "Gerar Documento",
                "loading-text": "Gerando...",
                onSubmit: s.gerarDocumento,
                "onUpdate:docx":
                  t[12] || (t[12] = (E) => (e.formData.gerarDocx = E)),
                "onUpdate:pdf":
                  t[13] || (t[13] = (E) => (e.formData.gerarPdf = E)),
              },
              null,
              8,
              ["formatos", "is-loading", "is-formato-valido", "onSubmit"]
            ),
          ]),
        ]),
        Rt(
          v,
          {
            show: e.showMessageModal,
            titulo: e.messageTitle,
            mensagem: e.messageContent,
            tipo: e.messageType,
            "texto-botao-confirmar": e.messageConfirmButtonText,
            "texto-botao-cancelar": "Cancelar",
            "show-cancel-button": !0,
            "fechar-ao-clicar-fora": !1,
            onConfirmar: e.confirmarModalMensagem,
            onCancelar: e.cancelarModalMensagem,
          },
          null,
          8,
          [
            "show",
            "titulo",
            "mensagem",
            "tipo",
            "texto-botao-confirmar",
            "onConfirmar",
            "onCancelar",
          ]
        ),
      ])
    );
  }
  const bC = Be(lC, [
      ["render", gC],
      ["__scopeId", "data-v-1aa84b70"],
    ]),
    vC = [{ path: "/", name: "DocumentacaoTecnica", component: bC }],
    yC = oC({ history: DT(), routes: vC });
  Z0(iT).use(yC).mount("#app");
});
export default wC();
