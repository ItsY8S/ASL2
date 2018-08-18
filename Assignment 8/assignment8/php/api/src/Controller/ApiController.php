<?php

namespace App\Controller;
use App\Entity\Posts;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Forms;
use Symfony\Component\Form\FormTypeInterface;
use Doctrine\ORM\EntityManager;
use App\Entity\Users;

class ApiController extends AbstractController
{
    /**
     * @Route("/feed", name="get_feed")
     */
    public function getFeed(Request $request)
    {
        $repository = $this->getDoctrine()->getRepository(Posts::class);
        $posts = $repository->findAll();
        $numberOfPosts = count($posts);

        for($x = 0; $x <= ($numberOfPosts - 1); $x++) {
            $data[$x] = $posts[$x]->getText();
        }
    
        if(!$posts) {
            throw $this->createNotFoundException('No posts found from this user.');
        }

        return new JsonResponse(['posts' => $data]);
    }

    /**
     * @Route("/feed/{id}", name="get_user_posts")
     */
    public function getUserPosts($id) {
        $repository = $this->getDoctrine()->getRepository(Posts::class);
        $posts = $repository->findBy(['user' => $id]);

        // echo $posts->getText();

        // var_dump($posts);
        $numberOfPosts = count($posts);

        for($x = 0; $x <= ($numberOfPosts - 1); $x++) {
            $data[$x] = $posts[$x]->getText();
        }

        if(!$posts) {
            throw $this->createNotFoundException('No posts found from this user.');
        }

        return new JsonResponse(['posts' => $data]);
    }

    /**
     * @Route("/post", name="create_post")
     */
    public function createPost(Request $request) {
        $content = $request->getContent();
        $parametersAsArray = json_decode($content, true);

         var_dump($parametersAsArray);

         $em = $this->getDoctrine()->getManager();
        $post = new Posts();
        $user = new Users();
        $post->setText("test");
        $post->setLikes(3);
        $post->setUser($user, 4);

        $em->persist($user);
        $em->persist($post);
        $em->flush();
        // $post->setLikes($data['personal']['gender']);
        return new JsonResponse($parametersAsArray);
    }


    /**
     * @Route("/post", name="create_post")
     */
    // public function createPost(Request $request) {
    //     $content = $request->getContent();
    //     $parametersAsArray = json_decode($content, true);

    //     var_dump($parametersAsArray);

    //     $em = $this->getDoctrine()->getManager();
    //     $post = new Posts();
    //     $user = new Users();
    //     $post->setText("test");
    //     $post->setLikes(3);
    //     $post->setUser($user);

    //     // $em->persist($user);
    //     $em->persist($post);
    //     $em->flush();
    //     // $post->setLikes($data['personal']['gender']);
    //     return new JsonResponse($parametersAsArray);
    // }
}