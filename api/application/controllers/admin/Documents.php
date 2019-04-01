<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:00
 */

class Documents extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);
        $this->load->model('admin/Documents_model');
    }

    /**
     * @return object
     */
    public function get($id = false)
    {
        $output = $this->Documents_model->get($id);

       echo json_encode($output);
    }

    public function update()
    {
        $document = $this->input->post('document');
        $this->Documents_model->update($document);
    }

    public function create()
    {
        $document = $this->input->post('document');
        $this->Products_model->create($document);
    }

    public function delete()
    {
        $document = $this->input->post('document');
        $this->Products_model->delete($document);
    }
}