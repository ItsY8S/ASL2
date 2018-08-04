<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class Contact {
    /**
     * @Assert\NotBlank(message="Please enter a name")
     */
    public $name;

    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    public $email;

    /**
     * @Assert\NotBlank()
     */
    public $msg;
}