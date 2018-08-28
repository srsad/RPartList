<?php

class RPartListItemGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'RPartListItem';
    public $classKey = 'RPartListItem';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';


    /**
     * @return mixed
     */
    public function process()
    {
        return parent::process();
    }


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
        $c->leftJoin('RPartBrand', 'RPartBrand', 'RPartBrand.id = RPartListItem.brand_id');
        $c->select('`RPartListItem`.*, `RPartBrand`.`name` AS brand_name');

        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
                'name:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
                'OR:service:LIKE' => "%{$query}%",
                'OR:RPartBrand.name:LIKE' => "%{$query}%",
            ]);
        }

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
            'title' => $this->modx->lexicon('rpartlist_item_update'),
            //'multiple' => $this->modx->lexicon('rpartlist_items_update'),
            'action' => 'updateItem',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('rpartlist_item_enable'),
                'multiple' => $this->modx->lexicon('rpartlist_items_enable'),
                'action' => 'enableItem',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('rpartlist_item_disable'),
                'multiple' => $this->modx->lexicon('rpartlist_items_disable'),
                'action' => 'disableItem',
                'button' => true,
                'menu' => true,
            ];
        }

        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('rpartlist_item_remove'),
            'multiple' => $this->modx->lexicon('rpartlist_items_remove'),
            'action' => 'removeItem',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'RPartListItemGetListProcessor';