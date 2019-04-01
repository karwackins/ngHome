<?php
/**
 * Created by PhpStorm.
 * User: karwackid
 * Date: 2019-04-01
 * Time: 07:15
 */

class test
{
    public function alive()
    {
        $alive = 0;
        $die = 100;

        while($alive < $die)
        {

            echo $alive;
            $alive++;
            return true;
        }
    }

    public function IloveHer()
    {
        echo 'I Love Her!'.'<br />';
    }

    public function index()
    {

        echo "Marlenka, 15.11.2014";

        while ($this->alive())
        {
            $this->IloveHer();
        }
        echo "4 me GAME OVER, but I love her still";
    }

}