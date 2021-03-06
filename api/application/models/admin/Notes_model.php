<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:31
 */

class Notes_model extends CI_Model{
    public $variable;

    public function __construct()
    {
        parent::__construct();
    }

    public function get($id = false)
    {
        if($id == false)
        {
            $this->db->select('
                notes.id,
                notes.title,
                notes.content,
                notes.date,
                notes.thumb,
                notes.file_count,
                users.name
                ')->from('notes')->join('users','users.id = notes.user_id');
            $q =  $this->db->order_by('notes.date', 'DESC')->get();
            $q = $q->result();
        } else
        {
            $this->db->where('id', $id);
            $q =  $this->db->get('Notes');
            $q = $q->row();
        }

        return $q;
    }

    public function update($note)
    {
        $this->db->where('id', $note['id']);
        $this->db->update('Notes', $note);
    }

    public function create($note)
    {
        $this->db->insert('Notes', $note);
    }

    public function delete($note)
    {
        $this->db->where('id', $note['id']);
        $this->db->delete('Notes', $note);
    }
}