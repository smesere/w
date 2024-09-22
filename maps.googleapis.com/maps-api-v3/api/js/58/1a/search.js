google.maps.__gjsload__('search', function(_) {
    var Lua = function() {},
        OB = function(a) {
            this.setValues(a);
            _.Ki("search_impl")
        },
        Nua = function(a) {
            let b = _.ml,
                c = -1;
            a.tiles.forEach(e => {
                e.zoom > c && (b = e.ii, c = e.zoom)
            });
            if (c === -1) return [];
            const d = [];
            a.bu().forEach(e => {
                e.a && e.a.length >= 2 && d.push(new Mua(e, b, c))
            });
            return d
        },
        Oua = function(a) {
            const b = [];
            a.data.forEach(c => {
                b.push(...Nua(c))
            });
            return b
        };
    _.Ia(Lua, _.jk);
    var Pua = {
            ["1"]: {}
        },
        Mua = class {
            constructor(a, b, c) {
                this.wp = b;
                this.zoom = c;
                this.bounds = this.anchor = null;
                this.Eg = Pua;
                this.source = a;
                this.featureId = this.source.id || "0";
                this.infoWindowOffset = (this.source.io || []).length === 2 ? new google.maps.Point(this.source.io[0], this.source.io[1]) : null
            }
            getAnchor() {
                if (!this.anchor) {
                    const a = 1 << this.zoom;
                    this.anchor = _.Ml(new _.Yl((this.wp.x * 256 + this.source.a[0]) / a, (this.wp.y * 256 + this.source.a[1]) / a)).toJSON()
                }
                return this.anchor
            }
            getCompleteBounds() {
                return this.getBounds().reduce((a,
                    b) => {
                    a.extendByBounds(b);
                    return a
                }, _.Ql(0, 0, 0, 0))
            }
            getBounds() {
                if (this.bounds === null) {
                    this.bounds = [];
                    const a = this.source.bb || [];
                    if (a.length % 4 === 0)
                        for (let b = 0; b < a.length; b += 4) {
                            const c = this.bounds[this.bounds.length - 1],
                                d = _.Ql(a[b], a[b + 1], a[b + 2], a[b + 3]);
                            c && c.equals(d) || this.bounds.push(d)
                        }
                }
                return [...this.bounds]
            }
            getExtendedContent(a) {
                if (this.Eg === Pua) try {
                    this.Eg = this.source.c ? JSON.parse(this.source.c) : {}
                } catch (b) {
                    this.Eg = {}
                }
                return this.Eg[a] ? ? {}
            }
            getFeatureName() {
                return this.getExtendedContent("1") ? .title ? ?
                    null
            }
            isTransitStation() {
                return this.getExtendedContent("1") ? .is_transit_station ? ? !1
            }
        };
    var Qua = new WeakSet;
    _.Ia(OB, Lua);
    OB.prototype.changed = function() {
        const a = this;
        var b = this.get("map");
        let c = null;
        b && (c = b.__gm, b = c.get("blockingLayerCount") || 0, c.set("blockingLayerCount", b + 1), c.set("disableLabelingHysteresis", this.get("disableLabelingHysteresis")), c.set("tilePrefetchEnabled", this.get("tilePrefetchEnabled")));
        _.Ki("search_impl").then(d => {
            d.tF(a);
            c && (d = c.get("blockingLayerCount") || 0, c.set("blockingLayerCount", d - 1))
        })
    };
    OB.enableFeatureMapEventsRasterOnly = function(a) {
        if (_.Am[15]) {
            var b = a.__gm.Yg;
            if (!Qua.has(a)) {
                Qua.add(a);
                var c = [],
                    d = (f, g) => {
                        f = Nua(f);
                        f.length && _.fk(a, g, f)
                    },
                    e = () => {
                        for (; c.length > 0;) c.pop().remove();
                        b.forEach(f => {
                            if (f = f.data) c.push(_.Tj(f, "insert", g => d(g, "addfeatures"))), c.push(_.Tj(f, "remove", g => d(g, "removefeatures")))
                        })
                    };
                b.addListener("insert_at", e);
                b.addListener("remove_at", e);
                b.addListener("set_at", e);
                e()
            }(() => {
                const f = [];
                b.forEach(g => {
                    f.push(...Oua(g))
                });
                f.length && _.fk(a, "addfeatures", f)
            })()
        }
    };
    _.Ga("module$contents$mapsapi$onionLayers$search$googleLayer_GoogleLayer.enableFeatureMapEventsRasterOnly", OB.enableFeatureMapEventsRasterOnly);
    _.Kk(OB.prototype, {
        map: _.Jo
    });
    _.ra.google.maps.search = {
        GoogleLayer: OB
    };
    _.Li("search", {});
});