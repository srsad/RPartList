<?php
/**
 * The home manager controller for rpartlist.
 *
 */
class RPartListHomeManagerController extends modExtraManagerController
{
    /** @var RPartList $RPartList */
    public $RPartList;


    /**
     *
     */
    public function initialize()
    {
        $this->RPartList = $this->modx->getService('RPartList', 'RPartList', MODX_CORE_PATH . 'components/rpartlist/model/');
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return ['rpartlist:default'];
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('rpartlist');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->RPartList->config['cssUrl'] . 'mgr/main.css');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/rpartlist.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/brands.grid.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/log.grid.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/brands.window.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/log.window.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->RPartList->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        RPartList.config = ' . json_encode($this->RPartList->config) . ';
        RPartList.config.connector_url = "' . $this->RPartList->config['connectorUrl'] . '";
        Ext.onReady(function() {MODx.load({ xtype: "rpartlist-page-home"});});
        </script>');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        $this->content .= '<div id="rpartlist-panel-home-div"></div>';
        return '';
    }
}