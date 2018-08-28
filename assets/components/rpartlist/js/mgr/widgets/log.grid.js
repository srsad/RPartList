RPartList.grid.Log = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'rpartlist-grid-log';
    }
    this.sm = new Ext.grid.CheckboxSelectionModel();
    Ext.applyIf(config, {
        url: RPartList.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        sm: this.sm,
        baseParams: {
            action: 'mgr/log/getlist'
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.vinewlog(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'rpartlist-grid-row-disabled'
                    : '';
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true
    });
    RPartList.grid.Log.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(RPartList.grid.Log, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = RPartList.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },


    vinewlog: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/log/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'rpartlist-log-window-view',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },

    getFields: function () {
        return ['id', 'user_id', 'user_name', 'groups_id', 'action', 'action_date', 'actions'];
    },

    getColumns: function () {
        return [this.sm, {
            header: _('rpartlist_item_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: _('rpartlist_log_user_id'),
            dataIndex: 'user_id',
            sortable: true,
            width: 50
        }, {
            header: _('rpartlist_log_user_name'),
            dataIndex: 'user_name',
            sortable: false,
            width: 100
        },{
            header: _('rpartlist_log_groups_id'),
            dataIndex: 'groups_id',
            sortable: false,
            width: 150
        },{
            header: _('rpartlist_log_action'),
            dataIndex: 'action',
            sortable: false,
            width: 250
        }, {
            header: _('rpartlist_log_action_date'),
            dataIndex: 'action_date',
            sortable: true,
            width: 150
        }, {
            header: _('rpartlist_grid_actions'),
            dataIndex: 'actions',
            renderer: RPartList.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    removeLog: function(){
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('rpartlist_items_remove')
                : _('rpartlist_item_remove'),
            text: ids.length > 1
                ? _('rpartlist_items_remove_confirm')
                : _('rpartlist_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/log/remove',
                ids: Ext.util.JSON.encode(ids)
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    }
});
Ext.reg('rpartlist-grid-log', RPartList.grid.Log);
