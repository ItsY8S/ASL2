<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testSomething()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/');

        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertContains('Hello World', $crawler->filter('h1')->text());
    }

    public function testList() {
        $client = static::createClient();
        $crawler = $client->request('GET', '/list');

        $this->assertContains('Work', $crawler->filter('h1')->text());
        $this->assertGreaterThan(0, $crawler->filter('#list a.item')->count());
        $this->assertContains('Design new icons', $crawler->filter('#list a.item:first-child')->text());
        $this->assertContains('checked', $crawler->filter('#list a.item:first-child')->attr('class'));
        $this->assertEquals('/createItem', $crawler->filter('header a.create')->attr('href'));
        $link = $crawler->filter('header a.create')->link();
        $createPage = $client->click($link);
        $this->assertEquals('Create New', $createPage->filter('h1')->first()->text());
    }

    public function testCreate() {
        $client = static::createClient();
        $crawler = $client->request('GET', '/createItem');

        $this->assertTrue($client->getResponse()->isSuccessful());
        $form = $crawler->selectButton('Submit')->form();
        $form['form[title]'] = 'Title 1';
        $form['form[description]'] = 'short description';
        $form['form[date]'] = ['year' =>2017, 'month'=>1, 'day'=>1];
        $form['form[time]'] = [''];

    }
}
