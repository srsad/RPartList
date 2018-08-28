var RPartList = function (config) {
    config = config || {};
    RPartList.superclass.constructor.call(this, config);
};
Ext.extend(RPartList, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('rpartlist', RPartList);

RPartList = new RPartList();