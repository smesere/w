google.maps.__gjsload__('search', function(_) {
    var eva = function() {},
        JB = function(a) {
            this.setValues(a);
            _.yi("search_impl")
        },
        gva = function(a) {
            let b = _.Xk,
                c = -1;
            a.tiles.forEach(e => {
                e.zoom > c && (b = e.di, c = e.zoom)
            });
            if (c === -1) return [];
            const d = [];
            a.pu().forEach(e => {
                e.a && e.a.length >= 2 && d.push(new fva(e, b, c))
            });
            return d
        },
        hva = function(a) {
            const b = [];
            a.data.forEach(c => {
                b.push(...gva(c))
            });
            return b
        };
    _.xa(eva, _.Xj);
    var iva = {
            ["1"]: {}
        },
        fva = class {
            constructor(a, b, c) {
                this.Hp = b;
                this.zoom = c;
                this.bounds = this.anchor = null;
                this.Eg = iva;
                this.source = a;
                this.featureId = this.source.id || "0";
                this.infoWindowOffset = (this.source.io || []).length === 2 ? new google.maps.Point(this.source.io[0], this.source.io[1]) : null
            }
            getAnchor() {
                if (!this.anchor) {
                    const a = 1 << this.zoom;
                    this.anchor = _.Bl(new _.Nl((this.Hp.x * 256 + this.source.a[0]) / a, (this.Hp.y * 256 + this.source.a[1]) / a)).toJSON()
                }
                return this.anchor
            }
            getCompleteBounds() {
                return this.getBounds().reduce((a,
                    b) => {
                    a.extendByBounds(b);
                    return a
                }, _.Fl(0, 0, 0, 0))
            }
            getBounds() {
                if (this.bounds === null) {
                    this.bounds = [];
                    const a = this.source.bb || [];
                    if (a.length % 4 === 0)
                        for (let b = 0; b < a.length; b += 4) {
                            const c = this.bounds[this.bounds.length - 1],
                                d = _.Fl(a[b], a[b + 1], a[b + 2], a[b + 3]);
                            c && c.equals(d) || this.bounds.push(d)
                        }
                }
                return [...this.bounds]
            }
            getExtendedContent(a) {
                if (this.Eg === iva) try {
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
    var jva = new WeakSet;
    _.xa(JB, eva);
    JB.prototype.changed = function() {
        const a = this;
        var b = this.get("map");
        let c = null;
        b && (c = b.__gm, b = c.get("blockingLayerCount") || 0, c.set("blockingLayerCount", b + 1), c.set("disableLabelingHysteresis", this.get("disableLabelingHysteresis")), c.set("tilePrefetchEnabled", this.get("tilePrefetchEnabled")));
        _.yi("search_impl").then(d => {
            d.hG(a);
            c && (d = c.get("blockingLayerCount") || 0, c.set("blockingLayerCount", d - 1))
        })
    };
    JB.enableFeatureMapEventsRasterOnly = function(a) {
        if (_.pm[15]) {
            var b = a.__gm.Yg;
            if (!jva.has(a)) {
                jva.add(a);
                var c = [],
                    d = (f, g) => {
                        f = gva(f);
                        f.length && _.Uj(a, g, f)
                    },
                    e = () => {
                        for (; c.length > 0;) c.pop().remove();
                        b.forEach(f => {
                            if (f = f.data) c.push(_.Hj(f, "insert", g => d(g, "addfeatures"))), c.push(_.Hj(f, "remove", g => d(g, "removefeatures")))
                        })
                    };
                b.addListener("insert_at", e);
                b.addListener("remove_at", e);
                b.addListener("set_at", e);
                e()
            }(() => {
                const f = [];
                b.forEach(g => {
                    f.push(...hva(g))
                });
                f.length && _.Uj(a, "addfeatures", f)
            })()
        }
    };
    _.va("module$contents$mapsapi$onionLayers$search$googleLayer_GoogleLayer.enableFeatureMapEventsRasterOnly", JB.enableFeatureMapEventsRasterOnly);
    _.zk(JB.prototype, {
        map: _.yo
    });
    _.ka.google.maps.search = {
        GoogleLayer: JB
    };
    _.zi("search", {});
});