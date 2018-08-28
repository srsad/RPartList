<?php

class RPartListLogRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'RPartLog';
    public $classKey = 'RPartLog';
    public $languageTopics = ['rpartlist'];


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('rpartlist_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var RPartLog $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('rpartlist_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'RPartListLogRemoveProcessor';