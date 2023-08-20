This is a simple API that allows you to create, list, and read messages.

To create a message, send a POST request to `/save` with the following data in the body:

```
{
  "message": "The message content"
}
```

The API will return the UUID of the saved message.

To list all messages, send a GET request to `/list`. You can optionally specify the `sortBy` parameter to sort the messages by timestamp.

To read a message, send a GET request to `/read` with the UUID of the message in the query string.

The API will return the following data for the message:

```
{
  "uuid": "The UUID of the message",
  "content": "The message content",
  "timestamp": "The timestamp of the message"
}
```

The API is hosted on Docker and can be started by running the following command:

```
sudo docker-compose up
```

The API is accessible at http://localhost:8080/.