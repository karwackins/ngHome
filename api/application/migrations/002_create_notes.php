<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_notes extends CI_Migration {

    public function up()
    {
        $this->dbforge->add_field(array(
            'id' => array(
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => TRUE,
                'auto_increment' => TRUE
            ),
            'title' => array(
                'type' => 'VARCHAR',
                'constraint' => '255',
            ),
            'content' => array(
                'type' => 'TEXT',
                'constraint' => '500',
            ),
            'category_id' => array(
                'type' => 'INT',
                'constraint' => '5',
            ),
            'issue_id' => array(
                'type' => 'INT',
                'constraint' => '5',
            ),
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('notes');
    }

    public function down()
    {
        $this->dbforge->drop_table('notes');
    }
}