<?php

class RPartListItemGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'RPartListItem';
    public $classKey = 'RPartListItem';
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

return 'RPartListItemGetProcessor';