<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Message;
use App\MessageRepository;

$request = Request::createFromGlobals();
$response = new Response();
$repo = new MessageRepository();

switch ($request->getPathInfo()) {
    case '/save':
        $content = $request->getContent();
        $data = json_decode($content, true);
        if (isset($data['message'])) {
            $uuid = $repo->generateUuid();
            $message = new Message($uuid, $data['message'], new \DateTime());
            $savedUuid = $repo->save($message);
            $response->setContent(json_encode(['uuid' => $savedUuid]));
        } else {
            $response->setContent('Invalid data.');
            $response->setStatusCode(400);
        }
        break;

    case '/list':
        $sortBy = $request->query->get('sortBy', 'timestamp'); 
        $messages = $repo->getAll($sortBy);
        $response->setContent(json_encode($messages));
        break;

    case '/read':
        $uuid = $request->query->get('uuid');
        $message = $repo->findByUuid($uuid);
        if ($message) {
            $response->setContent(json_encode([
                'uuid' => $message->getUuid(),
                'content' => $message->getContent(),
                'timestamp' => $message->getTimestamp()->format('Y-m-d H:i:s')
            ]));
        } else {
            $response->setContent('Message not found.');
            $response->setStatusCode(404);
        }
        break;

    default:
        $response->setContent('Not Found. Error 404');
        $response->setStatusCode(404);
}

$response->headers->set('Content-Type', 'application/json');
$response->headers->set('Access-Control-Allow-Origin', '*');
$response->headers->set('Access-Control-Allow-Methods', '*');
$response->headers->set('Access-Control-Allow-Headers', '*');

$response->send();
//sudo docker-compose up
