<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CommerceController extends Controller
{
    /**
     * @Route("/", name="commerce")
     */
    public function index()
    {
        return $this->render('commerce/index.html.twig', [
            'controller_name' => 'CommerceController',
        ]);
    }
}
