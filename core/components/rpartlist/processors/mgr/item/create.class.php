<?php

class RPartListItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'RPartListItem';
    public $classKey = 'RPartListItem';
    public $languageTopics = ['rpartlist'];


    /**
     * @return mixed
     */
    public function process()
    {
        $user_id = $this->modx->user->id;
        if ($user_id) {
            $query = $this->modx->newQuery('modUser',array('`modUser`.`id`' => $user_id));
            $query->innerJoin('modUserGroupMember','UserGroupMembers');
            $query->innerJoin('modUserGroup','UserGroup','`UserGroupMembers`.`user_group` = `UserGroup`.`id`');
            $query->select('UserGroup.name');
            $groupsArray = array();
            if ($query->prepare() && $query->stmt->execute()) {
                while($row = $query->stmt->fetch(PDO::FETCH_ASSOC)) { $groupsArray[] = $row['name']; }
            }

            $userGroups = implode(',',$groupsArray);

            $create_log = $this->modx->newObject('RPartLog');
            $create_log->set('user_id', $user_id);
            $create_log->set('user_name', $this->modx->user->fullname);
            $create_log->set('groups_id', $userGroups);
            $create_log->set('action', 'Создание => ' . $this->getProperty('name'));
            $create_log->set('action_date', date("Y-m-d H:i:s"));
            $create_log->save();
        }

        return parent::process();
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $brand_id = trim($this->getProperty('brand_id'));
        $name = trim($this->getProperty('name'));

        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('rpartlist_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, ['name' => $name, 'brand_id' => $brand_id])) {
            $this->modx->error->addField('name', $this->modx->lexicon('rpartlist_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'RPartListItemCreateProcessor';