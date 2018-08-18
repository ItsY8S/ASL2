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
    public function createPost() {
        $post = new Posts();
        $form = $this->createForm(ApiController::class, $post);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
        $response = $this->get('api')->post('/post', ['json'=>$post]);
        $post = json_decode($response->getBody());

        return $this->redirectToRoute('post_show', array('text' => $post->text));
        }

        

        // $data = json_decode(file_get_contents('http://localhost:3000/post'), true);
        // print_r($data);

        // $request = Request::createFromGlobals();

        // $form->handleRequest($request);

        // $request->request->get('text', 'likes');

        // return new JsonResponse(['post' => $request->request->get('text', 'likes')]);
    }
}