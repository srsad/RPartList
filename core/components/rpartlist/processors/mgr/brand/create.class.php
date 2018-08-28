<?php

class RPartListBrandCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'RPartBrand';
    public $classKey = 'RPartBrand';
    public $languageTopics = ['rpartlist'];


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('rpartlist_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name])) {
            $this->modx->error->addField('name', $this->modx->lexicon('rpartlist_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'RPartListBrandCreateProcessor';