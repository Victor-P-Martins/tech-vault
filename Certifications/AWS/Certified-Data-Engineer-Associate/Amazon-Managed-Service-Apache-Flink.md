# What is Amazon Managed Service for Apache Flink?

Amazon Managed Service for Apache Flink (Amazon MSF) is a fully managed service that enables you to build and run real-time, event-driven applications using Apache Flink, an open-source framework for processing data streams.

- Formerly Kinesis Data Analytics for Apache Flink or for Java
  - Kinesis Data Analytics always used Flink under the hood
  - But now supports Python and Scala
  - Flink is a framework for processing data streams
- MSAF integrates Flink with AWS
  - Instead of using SQL, you can develop your own Flink Application from scratch and load it into MSAF via S3
- In addition to the DataStream API, there is a table API for SQL Access
- Serverless

## Common use-cases

- **Real-Time Processing**: Analyze and process streaming data in real time for use cases like log analytics, anomaly detection, and machine learning.
- **Serverless Operation**: Automatically scales infrastructure based on workload, removing the need to manage servers.
- **Integration**: Seamlessly integrates with Amazon Kinesis, Apache Kafka, Amazon S3, DynamoDB, and more for input/output streams.
- **Simplified Management**: Offers an intuitive interface to deploy, monitor, and manage Flink applications without handling the complexity of cluster management.
- **Cost-Efficiency**: Pay only for the resources used, with no upfront costs.
