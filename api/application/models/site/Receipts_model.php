<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:31
 */

class Receipts_model extends CI_Model{
    public $variable;

    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = false)
    {
//        if($id == false)
//        {
//            $this->db->select('
//                receipts.id,
//                notes.title,
//                notes.content,
//                notes.date,
//                users.name
//                ')->from('notes')->join('users','users.id = notes.user_id');
//            $q =  $this->db->order_by('notes.date', 'DESC')->get();
//            $q = $q->result();
//        } else
//        {
//            $this->db->where('id', $id);
//            $q =  $this->db->get('notes');
//            $q = $q->row();
//        }
//
//        return $q;
    }

    public function update($receipt)
    {
//        $this->db->where('id', $receipt['id']);
//        $this->db->update('receipts', $receipt);
        print_r('update');
    }

    public function create($receipt)
    {
//        $this->db->insert('receipts', $receipt);
        print_r('create');
    }

    public function delete($receipt)
    {
//        $this->db->where('id', $receipt['id']);
//        $this->db->delete('receipts', $receipt);
        print_r('delete');
    }
}