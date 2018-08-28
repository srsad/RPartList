RPartList.window.CreateBrand = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'rpartlist-brand-window-create';
    }
    Ext.applyIf(config, {
        title: _('rpartlist_bgand_create'),
        width: 550,
        autoHeight: true,
        url: RPartList.config.connector_url,
        action: 'mgr/brand/create',
        fields: brandFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    RPartList.window.CreateBrand.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.window.CreateBrand, MODx.Window);
Ext.reg('rpartlist-brand-window-create', RPartList.window.CreateBrand);


RPartList.window.UpdateBrand = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'rpartlist-brand-window-update';
    }
    Ext.applyIf(config, {
        title: _('rpartlist_bgand_update'),
        width: 550,
        autoHeight: true,
        url: RPartList.config.connector_url,
        action: 'mgr/brand/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    RPartList.window.UpdateBrand.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.window.UpdateBrand, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id'
        }, brandFields(config)];
    },

    loadDropZones: function () {
    }

});
Ext.reg('rpartlist-brand-window-update', RPartList.window.UpdateBrand);

function brandFields (config){
    return [{
        xtype: 'textfield',
        fieldLabel: _('rpartlist_item_name'),
        name: 'name',
        id: config.id + '-name',
        anchor: '99%',
        allowBlank: false
    }, {
        xtype: 'textarea',
        fieldLabel: _('rpartlist_item_description'),
        name: 'description',
        id: config.id + '-description',
        height: 80,
        anchor: '99%'
    }, {
        xtype: 'xcheckbox',
        boxLabel: _('rpartlist_item_active'),
        name: 'active',
        id: config.id + '-active',
        checked: true
    }];
}
