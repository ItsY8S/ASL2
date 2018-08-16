<?php
namespace App\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ApiController extends Controller
{
    /**
     * @Route("/", name="api")
     */
    public function index()
    {
        return $this->json(array('username' => 'gyates'));
    }
}