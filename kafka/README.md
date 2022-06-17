# Kafka

## What is Kafka

### Distributed Stream Processing System

### Kafka does both Queue and Pub-Sub using Consumer Group

## Queue vs Pub-Sub

### Queue

Message published once, consumed once.

### Pub-Sub

Message published once, consumed many times.

## Consumer Group

In a Consumer Group there ware multiple Consumers.  
Each Consumer can consume from many Partitions.  
But one Partition can only be consumed by one Consumer.
To act like a queue, put all you consumers in one group.  
To act like a pub/sub, put each consumer in a unique group.  
There we get parallel processing for free.

## Components

### Kafka Broker

Server (default port 9092). Waiting for TCP connections.

### Producer and Consumer

Establish bi-directional connection with broker.  
Producer publishes data to a topic.  
Consumer polls for data from the broker.

### Topic

Logic partition to which the Producer writes and Consumers reads from.

### Partitions

Logical partitions inside a Topic(similar to sharding).

### Distributed System

Create copies of the server and tag them as Leader and Follower.  
We can make one broker Leader of one partition and Follower of other.  
Only write to Leader and read from Leader as well as Follower.

### ZooKeeper

Manages all the writing and reading in Distributed System.

## Kafka Installation

```cmd
# zookeeper

docker run --name zookeeper -p2181:2181 zookeeper

# to get zookeeper ip (usually 172.18.0.2)

Zookeeper_Server_IP = $(docker inspect zookeeper --format='{{ .NetworkSettings.IPAddress }}')

-e KAFKA_ZOOKEEPER_CONNECT=Zookeeper_Server_IP:2181

# kafka

docker run --name kafka -p9092:9092
-e KAFKA_ZOOKEEPER_CONNECT=172.18.0.2:2181
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
confluentinc/cp-kafka
```
