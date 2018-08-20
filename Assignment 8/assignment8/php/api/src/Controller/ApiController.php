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
        // Get the database
        $repository = $this->getDoctrine()->getRepository(Posts::class);
        // Query it for posts
        $posts = $repository->findAll();
        // Check for the number of posts and store it in a variable
        $numberOfPosts = count($posts);

        // Loop through the data with the help of the variable above
        for($x = 0; $x <= ($numberOfPosts - 1); $x++) {
            // get the text of all the data and store it in an array
            $data[$x] = $posts[$x]->getText();
        }
    
        // Handle the event of no posts being found
        if(!$posts) {
            // Throw an exception
            throw $this->createNotFoundException('No posts found from this user.');
        }

        // Respond with the posts
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

        // loop through posts
        for($x = 0; $x <= ($numberOfPosts - 1); $x++) {
            // Throw an exception
            $data[$x] = $posts[$x]->getText();
        }

        // Handle the event of no posts being found
        if(!$posts) {
            throw $this->createNotFoundException('No posts found from this user.');
        }

        // Respond with the posts
        return new JsonResponse(['posts' => $data]);
    }

    /**
     * @Route("/post", name="create_post")
     */
    public function createPost(Request $request) {
        $content = $request->getContent();
        $parametersAsArray = json_decode($content, true);

         var_dump($parametersAsArray);

         // use entity manager
         $em = $this->getDoctrine()->getManager();
        $post = new Posts();
        $user = new Users();
        $post->setText("test");
        $post->setLikes(3);
        $post->setUser($user, 4);
        // set post info

        // persist to database
        $em->persist($user);
        $em->persist($post);
        $em->flush();

        // $post->setLikes($data['personal']['gender']);
        return new JsonResponse($parametersAsArray);
    }


    /**
     * @Route("/user", name="create_user")
     */
    public function createUser(Request $request) {
        $content = $request->getContent();
        $parametersAsArray = json_decode($content, true);

         var_dump($parametersAsArray);

         // use entity manager
         $em = $this->getDoctrine()->getManager();
        $post = new Posts();
        $user = new Users();
        $post->setName("test");
        $post->setLikes(3);
        $post->setUser($user, 4);
        // set post info

        // persist to database
        $em->persist($user);
        $em->persist($post);
        $em->flush();

        return new JsonResponse($parametersAsArray);
    }

    /**
     * @Route("/post/{id}", name="update_post")
     */
    public function updatePost(Request $request) {
        $content = $request->getContent();
        $parametersAsArray = json_decode($content, true);

         var_dump($parametersAsArray);

         // use entity manager
         $em = $this->getDoctrine()->getManager();
        $post = new Posts();
        $user = new Users();
        $post->setText("test change");
        $post->setLikes(5);
        $post->setUser($user, 4);
        // set post info

        // persist to database
        $em->persist($user);
        $em->persist($post);
        $em->flush();

        return new JsonResponse($parametersAsArray);
    }

    /**
     * @Route("/post/{id}", name="delete_post")
     */
    public function deletePost(Request $request) {
        // $content = $request->getContent();
        // $parametersAsArray = json_decode($content, true);

        //  var_dump($parametersAsArray);

        //  // use entity manager
        //  $em = $this->getDoctrine()->getManager();
        // $post = new Posts();
        // $user = new Users();
        

        // // persist to database
        // $em->persist($user);
        // $em->persist($post);
        // $em->flush();

        // $post->setLikes($data['personal']['gender']);
        return new JsonResponse($parametersAsArray);
    }

    
}