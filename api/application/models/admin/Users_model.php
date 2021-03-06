<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-22
 * Time: 12:57
 */

class Users_model extends CI_Model
{
    public $variable;

    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = false)
    {
        if($id == false)
        {
            $q =  $this->db->get('users');
            $q = $q->result();
        } else
        {
            $this->db->where('id', $id);
            $q =  $this->db->get('users');
            $q = $q->row();
        }

        return $q;
    }

    public function update($user)
    {
        $this->db->where('id', $user['id']);
        $this->db->update('users', $user);
    }

        public function create($user)
    {
        $this->db->insert('users', $user);
    }

    public function delete($user)
    {
        $this->db->where('id', $user['id']);
        $this->db->delete('users', $user);
    }

    public function get_unique($where){
        $this->db->where($where);
        $q = $this->db->get('users');


        return $q->row();
    }
}