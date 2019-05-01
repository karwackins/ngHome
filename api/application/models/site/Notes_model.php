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
            $q =  $this->db->get('notes');
            $q = $q->row();
        }

        return $q;
    }

    public function update($note)
    {
        $data = array(
            'title' => $note['title'],
            'content' => $note['content']
        );
        $this->db->where('id', $note['id']);
        $this->db->update('notes', $data);
    }

    public function create($note)
    {
        $this->db->insert('notes', $note);
    }

    public function delete($note)
    {
        $this->db->where('id', $note['id']);
        $this->db->delete('notes', $note);
    }

    public function setThumb($id, $thumb)
    {
        $data = array('thumb' => $thumb);
        $this->db->where('id', $id);
        $this->db->update('notes', $data);
    }

    public function fileCounter($id, $op){
        $this->db->select('file_count')->where('id', $id);
        $query = $this->db->get('notes');
        $query = $query->row();

        if($op == 1)
        {
            $counter = $query->file_count;
            $counter++;
        }elseif($op == -1)
        {
            $counter = $query->file_count;
            $counter--;
        }

        $data = array('file_count' => $counter);
        $this->db->where('id', $id);
        $this->db->update('notes', $data);

    }
}