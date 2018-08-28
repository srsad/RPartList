
RPartList.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'rpartlist-log-window-view';
    }
    Ext.applyIf(config, {
        title: _('rpartlist_vinew_log'),
        width: 550,
        autoHeight: true,
        url: RPartList.config.connector_url,
        action: 'mgr/log/get',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.close()
            }, scope: this
        }],
        buttons: []
    });
    RPartList.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.window.UpdateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('rpartlist_log_user_id'),
            name: 'user_id',
            id: config.id + '-user_id',
            anchor: '99%',
            disabled: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('rpartlist_log_user_name'),
            name: 'user_name',
            id: config.id + '-user_name',
            anchor: '99%',
            disabled: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('rpartlist_log_groups_id'),
            name: 'groups_id',
            id: config.id + '-groups_id',
            anchor: '99%',
            disabled: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('rpartlist_log_action'),
            name: 'action',
            id: config.id + '-action',
            anchor: '99%',
            disabled: true
        }, {
            xtype: 'textfield',
            fieldLabel: _('rpartlist_log_action_date'),
            name: 'action_date',
            id: config.id + '-action_date',
            anchor: '99%',
            disabled: true
        }];
    }

});
Ext.reg('rpartlist-log-window-view', RPartList.window.UpdateItem);