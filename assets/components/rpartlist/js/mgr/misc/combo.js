RPartList.combo.Search = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        xtype: 'twintrigger',
        ctCls: 'x-field-search',
        allowBlank: true,
        msgTarget: 'under',
        emptyText: _('search'),
        name: 'query',
        triggerAction: 'all',
        clearBtnCls: 'x-field-search-clear',
        searchBtnCls: 'x-field-search-go',
        onTrigger1Click: this._triggerSearch,
        onTrigger2Click: this._triggerClear,
    });
    RPartList.combo.Search.superclass.constructor.call(this, config);
    this.on('render', function () {
        this.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
            this._triggerSearch();
        }, this);
    });
    this.addEvents('clear', 'search');
};
Ext.extend(RPartList.combo.Search, Ext.form.TwinTriggerField, {

    initComponent: function () {
        Ext.form.TwinTriggerField.superclass.initComponent.call(this);
        this.triggerConfig = {
            tag: 'span',
            cls: 'x-field-search-btns',
            cn: [
                {tag: 'div', cls: 'x-form-trigger ' + this.searchBtnCls},
                {tag: 'div', cls: 'x-form-trigger ' + this.clearBtnCls}
            ]
        };
    },

    _triggerSearch: function () {
        this.fireEvent('search', this);
    },

    _triggerClear: function () {
        this.fireEvent('clear', this);
    },

});
Ext.reg('rpartlist-combo-search', RPartList.combo.Search);
Ext.reg('rpartlist-field-search', RPartList.combo.Search);


// список групп
RPartList.combo.Brnds = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        name: 'brand_id'
        ,hiddenName: 'brand_id'
        ,displayField: 'name'
        ,valueField: 'id'
        ,fieldLabel: 'Выберите бренд'
        ,editable: true
        ,fields: ['id', 'name']
        ,pageSize: 20
        ,anchor: '100%'
        ,emptyText: 'Выберите бренд'
        ,hideMode: 'offsets'
        ,url: RPartList.config.connector_url
        ,baseParams: {
            action: 'mgr/brand/getlist'
            ,where: '{"active" : "1"}'
            ,combo: true
        }
    });
    RPartList.combo.Brnds.superclass.constructor.call(this, config);
};
Ext.extend(RPartList.combo.Brnds, MODx.combo.ComboBox);
Ext.reg('rpartlist-combo-brands', RPartList.combo.Brnds);