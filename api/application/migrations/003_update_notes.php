<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Update_notes extends CI_Migration {

    public function up()
    {
        $this->dbforge->add_column('notes', array(
            'user_id' => array(
                'type' => 'INT',
                'constraint' => 5,
            ),
        ));
    }

    public function down()
    {
        $this->dbforge->drop_table('notes');
    }
}