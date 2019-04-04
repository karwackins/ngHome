<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:00
 */

class Notes extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);
        $this->load->model('site/Notes_model');
    }

    /**
     * @return object
     */
    public function get($id = false)
    {
        $output = $this->Notes_model->get($id);

       echo json_encode($output);
    }

    public function update()
    {
        $note = $this->input->post('note');
        $this->Notes_model->update($note);
    }

    public function create()
    {
        $note = $this->input->post('note');
        $this->Notes_model->create($note);
    }

    public function delete()
    {
        $note = $this->input->post('note');
        $this->Notes_model->delete($note);
    }
}