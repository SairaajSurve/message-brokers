# RabbitMQ

## What is RabbitMQ

RabbitMQ is a message broker. It uses AMQP(Advanced Message Queue Protocol) on top of TCP.

## Components

Publisher and Subscriber instantiates a 2 way communication with the RMQ server.
The publishers send messages to the server. The server pushes messages to the consumer when the consumer is ready.
It uses multiplexing ( many clients and connected to the same server through same connection or logical channel ).
Server maintains 'Exchange Queues'.

## Exchange

### The producer sends messagse to and exhange. Exchanges are messsage routing agents

### Route to queues base on header attributes, bindings and routing keys

### Binding is a link that we set up to bind a queue to and exchange

### Routing key is a message attribute the exchange looks at when deciding how to route the message

### There are 6 default (Direct, Default, Topic, Fanout, Headers, Dead Letter) types of exchanges. Cllient can define their own as well

## Docker Installation

```cmd
docker pull rabbitmq
docker run --name rabbitmq -p5672:5672 rabbitmq
```

## Management UI

1. Go to 'C:\Program Files\RabbitMQ Server\rabbitmq_server-3.10.5\sbin'
2. Run command 'rabbitmq-plugins enable rabbitmq_management'
3. Go to 'http:localhost:15672'
4. Default Username and Password is 'guest'
