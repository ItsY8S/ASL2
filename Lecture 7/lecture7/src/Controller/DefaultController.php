<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     */
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }

    /**
     * @Route("/list")
     */
    public function list()
    {
        return $this->render('default/list.html.twig');
    }

    /**
     * @Route("/createItem")
     */
    public function create()
    {
        return $this->render('default/create.html.twig');
    }
    
}
