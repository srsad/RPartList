<?php

class RPartListLogGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'RPartLog';
    public $classKey = 'RPartLog';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
        $where = json_decode($this->getProperty('where'), true);

        if ($query) {
            $c->where([
                'name:LIKE' => "%{$query}%",
                //'OR:description:LIKE' => "%{$query}%",
            ]);
        }

        if ($where) { $c->where([$where]); }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('rpartlist_vinew_log'),
            //'multiple' => $this->modx->lexicon('rpartlist_items_update'),
            'action' => 'vinewlog',
            'button' => true,
            'menu' => true,
        ];

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('rpartlist_item_remove'),
            'multiple' => $this->modx->lexicon('rpartlist_items_remove'),
            'action' => 'removeLog',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'RPartListLogGetListProcessor';