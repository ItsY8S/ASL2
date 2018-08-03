<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return new Response('<div><h1>Home</h1><br><a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/thankyou">Thank You</a></div>');
    }

    /**
     * @Route("/about", name="about")
     */
    public function about()
    {
        return new Response('<h1>About</h1><br><a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/thankyou">Thank You</a><br><h4>Wow some HTML content</h4></div>');
    }
}