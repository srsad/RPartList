RPartList.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'rpartlist-panel-home',
            renderTo: 'rpartlist-panel-home-div'
        }]
    });
    RPartList.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.page.Home, MODx.Component);
Ext.reg('rpartlist-page-home', RPartList.page.Home);