<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:31
 */

class Documents_model extends CI_Model{
    public $variable;

    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = false)
    {
        if($id == false)
        {
            $q =  $this->db->get('Documents');
            $q = $q->result();
        } else
        {
            $this->db->where('id', $id);
            $q =  $this->db->get('Documents');
            $q = $q->row();
        }

        return $q;
    }



}