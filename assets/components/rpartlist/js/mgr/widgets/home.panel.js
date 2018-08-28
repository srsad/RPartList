RPartList.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('rpartlist') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('rpartlist_items'),
                layout: 'anchor',
                items: [{
                    html: _('rpartlist_intro_msg_part'),
                    cls: 'panel-desc'
                }, {
                    xtype: 'rpartlist-grid-items',
                    cls: 'main-wrapper'
                }]
            },{
                title: _('rpartlist_brands'),
                layout: 'anchor',
                items: [{
                    html: _('rpartlist_intro_msg_brand'),
                    cls: 'panel-desc'
                }, {
                    xtype: 'rpartlist-grid-brands',
                    cls: 'main-wrapper'
                }]
            },{
                title: _('rpartlist_log'),
                layout: 'anchor',
                items: [{
                    html: _('rpartlist_intro_msg_log'),
                    cls: 'panel-desc'
                }, {
                    xtype: 'rpartlist-grid-log',
                    cls: 'main-wrapper'
                }]
            }]
        }]
    });
    RPartList.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.panel.Home, MODx.Panel);
Ext.reg('rpartlist-panel-home', RPartList.panel.Home);
