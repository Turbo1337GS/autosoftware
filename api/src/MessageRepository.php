<?php

namespace App;

use Ramsey\Uuid\Uuid;

class MessageRepository
{
    private string $filePath = __DIR__ . '/../messages.json';

    public function save(Message $message): string
    {
        $messages = $this->getAll();
        $messages[] = [
            'uuid' => $message->getUuid(),
            'content' => $message->getContent(),
            'timestamp' => $message->getTimestamp()->format('Y-m-d H:i:s')
        ];
        file_put_contents($this->filePath, json_encode($messages));

        return $message->getUuid();
    }

    public function getAll(string $sortBy = 'timestamp'): array
    {
        if (!file_exists($this->filePath)) {
            return [];
        }
        $messages = json_decode(file_get_contents($this->filePath), true) ?: [];
        usort($messages, function ($a, $b) use ($sortBy) {
            return strcmp($a[$sortBy], $b[$sortBy]);
        });
        return $messages;
    }

    public function findByUuid(string $uuid): ?Message
    {
        $messages = $this->getAll();
        foreach ($messages as $data) {
            if ($data['uuid'] === $uuid) {
                return new Message($data['uuid'], $data['content'], new \DateTime($data['timestamp']));
            }
        }
        return null;
    }

    public function generateUuid(): string
    {
        return Uuid::uuid4()->toString();
    }
}
