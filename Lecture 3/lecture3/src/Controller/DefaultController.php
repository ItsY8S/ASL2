<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Contact;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="default")
     */
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'users' => ['Griffin', 'George', 'Wowowow'],
            'loggedin' => false,
        ]);
    }

    /**
     * @Route("/contact")
     */
    public function contactAction(Request $request) {
        $contact = new Contact();

        $form = $this->createFormBuilder($contact)
        ->add('name', TextType::class)
        ->add('email', EmailType::class)
        ->add('msg', TextareaType::class)
        ->add('save', SubmitType::class, ['label' => 'Contact Me'])
        ->getForm();

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            return $this->redirectToRoute("thank-you");
        }
        return $this->render('default/contact.html.twig', [
            'contact_form'=>$form->createView()]);
    }

    /**
     * @Route("/thankyou", name="thank-you")
     */
    public function thankYouAction() {
        return $this->render('default/thank-you.html.twig');
    }
}
