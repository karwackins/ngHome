<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-21
 * Time: 13:00
 */

class Receipts extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);
        $this->load->model('site/receipts_model');

    }

    /**
     * @return object
     */
    public function get($id = false)
    {
        $output = $this->receipts_model->get($id);

       echo json_encode($output);
    }

    public function update()
    {
        $receipt = $this->input->post('receipt');
        $this->receipts_model->update($receipt);
    }

    public function create()
    {
        $receipt = $this->input->post('$receipt');
        $payload = $this->input->post('payload');
        $receipt = array_merge($receipt, array('date' => date("Y-m-d")), array('user_id' => $payload['userId']));

        $this->receipts_model->create($receipt);
    }

    public function delete()
    {
        $receipt = $this->input->post('receipt');
        $this->receipts_model->delete($receipt);
    }
}