<?php

class RPartListBrandGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'RPartBrand';
    public $classKey = 'RPartBrand';
    public $languageTopics = ['rpartlist:default'];


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }

}

return 'RPartListBrandGetProcessor';