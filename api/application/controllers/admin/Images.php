<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-01-19
 * Time: 11:47
 */

class Images extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('site/Notes_model');
    }

    public function upload($id) {

        echo FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
        if ( !empty( $_FILES ) ) {
            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
            $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR ;
            $basePath = $basePath . $id . DIRECTORY_SEPARATOR;
            mkdir($basePath, 0777);
            $uploadPath =  $basePath . $_FILES[ 'file' ][ 'name' ];
            move_uploaded_file( $tempPath, $uploadPath );
            $answer = array( 'answer' => 'File transfer completed' );
            $json = json_encode( $answer );
            echo $json;
        } else {
            echo 'No files';
        }
        $fileName = $_FILES[ 'file' ][ 'name' ];
        $this->setThumb($id, $fileName);
        $this->fileCounter($id, $op = 1 );
    }

    public function get($id) {
        $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR ;
        $basePath = $basePath . $id . DIRECTORY_SEPARATOR;

        if(!is_dir($basePath))
            return;

        $files = scandir($basePath);
        $files = array_diff($files, array('..', '.'));

        $newFiles = array();
        foreach ($files as $file) {
            $newFiles[] .= $file;
        }
        echo json_encode($newFiles);
    }

    public function del() {
        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $id = $this->input->post('id');
        $image = $this->input->post('image');

        $imagePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR ;
        $imagePath = $imagePath . $id . DIRECTORY_SEPARATOR;
        $imagePath = $imagePath . $image;
        unlink($imagePath);

        $this->fileCounter($id, $op = -1 );

    }

    public function setThumb($id, $fileName)
    {
        $this->Notes_model->setThumb($id, $fileName);
    }

    public function fileCounter($id, $op){

        $this->Notes_model->fileCounter($id, $op);
    }
}