<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController2 extends Controller
{
    /**
     * @Route("/contact", name="contact")
     */
    public function contact()
    {
        return new Response('<h1>Contact</h1><br><a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/thankyou">Thank You</a></div>');
    }

    /**
     * @Route("/thankyou", name="thankyou")
     */
    public function thankyou()
    {
        return new Response('<h1>Thank You</h1><br><a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/thankyou">Thank You</a></div>');
    }
}
