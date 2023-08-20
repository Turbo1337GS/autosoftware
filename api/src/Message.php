<?php

namespace App;

class Message
{
    private string $uuid;
    private string $content;
    private \DateTime $timestamp;

    public function __construct(string $uuid, string $content, \DateTime $timestamp)
    {
        $this->uuid = $uuid;
        $this->content = $content;
        $this->timestamp = $timestamp;
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function getTimestamp(): \DateTime
    {
        return $this->timestamp;
    }
}
