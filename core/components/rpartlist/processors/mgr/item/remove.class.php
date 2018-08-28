<?php

class RPartListItemRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'RPartListItem';
    public $classKey = 'RPartListItem';
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
            /** @var RPartListItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('rpartlist_item_err_nf'));
            }

            $object->remove();

            // запись в лог
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
                $create_log->set('action', 'Удален => ' . '(' . $id . ') - ' . $object->get('name'));
                $create_log->set('action_date', date("Y-m-d H:i:s"));
                $create_log->save();
            }
        }

        return $this->success();
    }

}

return 'RPartListItemRemoveProcessor';