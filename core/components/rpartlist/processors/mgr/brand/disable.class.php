<?php

class RPartListBrandDisableProcessor extends modObjectProcessor
{
    public $objectType = 'RPartBrand';
    public $classKey = 'RPartBrand';
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
            /** @var RPartBrand $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('rpartlist_item_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'RPartListBrandDisableProcessor';
