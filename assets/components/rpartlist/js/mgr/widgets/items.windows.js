RPartList.window.CreateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'rpartlist-item-window-create';
    }
    Ext.applyIf(config, {
        title: _('rpartlist_item_create'),
        width: 550,
        autoHeight: true,
        url: RPartList.config.connector_url,
        action: 'mgr/item/create',
        fields: itemFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    RPartList.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.window.CreateItem, MODx.Window);
Ext.reg('rpartlist-item-window-create', RPartList.window.CreateItem);


RPartList.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'rpartlist-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('rpartlist_item_update'),
        width: 550,
        autoHeight: true,
        url: RPartList.config.connector_url,
        action: 'mgr/item/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    RPartList.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.window.UpdateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id'
        }, itemFields(config)];
    },

    loadDropZones: function () {
    }

});
Ext.reg('rpartlist-item-window-update', RPartList.window.UpdateItem);

function itemFields(config) {
    return [{
        xtype: 'textfield',
        fieldLabel: _('rpartlist_item_name'),
        name: 'name',
        id: config.id + '-name',
        anchor: '99%',
        allowBlank: false
    }, {
        xtype: 'rpartlist-combo-brands',
        fieldLabel: _('rpartlist_brands'),
        name: 'brand_id',
        id: config.id + '-brand_id',
        anchor: '99%',
        allowBlank: false
    }, {
        xtype: 'textfield',
        fieldLabel: _('rpartlist_service'),
        name: 'service',
        id: config.id + '-service',
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
        xtype: 'textfield',
        fieldLabel: _('rpartlist_item_price'),
        name: 'price',
        id: config.id + '-price',
        anchor: '99%'
    }, {
        xtype: 'textfield',
        fieldLabel: _('rpartlist_item_rservice_price'),
        name: 'rservice',
        id: config.id + '-rservice',
        anchor: '99%'
    },{
        xtype: 'textfield',
        fieldLabel: _('rpartlist_item_impuls_price'),
        name: 'impuls',
        id: config.id + '-impuls',
        anchor: '99%'
    }, {
        xtype: 'xcheckbox',
        boxLabel: _('rpartlist_item_active'),
        name: 'active',
        id: config.id + '-active',
        checked: true
    }];
}