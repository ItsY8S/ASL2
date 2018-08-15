<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

class User
{
    public $_id;
    public $name;
    public $username;
    public $admin;
    public $dob;
    public $website;
}
