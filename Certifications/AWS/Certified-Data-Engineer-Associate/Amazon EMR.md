# What's EMR?

Amazon EMR (Elastic MapReduce) is a cloud-based big data platform that simplifies processing large datasets using frameworks like Apache Hadoop, Spark, Hive, and Presto. It handles provisioning, scaling, and maintenance of clusters, making it ideal for analytics, machine learning, and data transformations.

- Elastic MapReduce
- Managed Hadoop framework on EC2 instances
- Includes Spark, HBase, Presto, Flink, Hive and more.
- EMR Notebooks
- Several integration points with AWS

## Cluster

- Master node: Manages the cluster
  - Tracks status of tasks, monitors clusters health
  - Single EC2 instance (it can be a single node cluster even)
  - AKA "leader node"
- Code node: hosts HDFS data and runs tasks
  - Can be scaled up & down, but with some risk
  - Multi-node clusters have at least one
- Task node: Runs tasks, does not host data
  - Optional
  - No risk of data loss when removing
  - Good use of spot instances

## Usage

- Frameworks and applications are specified at cluster launch
- Connect directly to master to run jobs directly
- Or, submit ordered steps via the console
  - Process data in S3 or HDFS
  - Output data to S3 or somewhere
  - Once defined, steps can be invoked via the console

## Integration

- Amazon EC2 for the instances that comprise the nodes in the cluster
- Amazon VPC to configure the virtual network in which you launch your instances
- Amazon S3 to store input and output data
- Amazon CloudWatch to monitor cluster performance and configure alarms
- AWS IAM to configure permissions
- AWS CloudTrail to audit requests made to the service
- AWS Data Pipeline to schedule and start your clusters

## Storage

- HDFS
  - Hadoop Distributed File System
  - Multiple copies stored across cluster instances for redundancy
  - Files stored as blocks (128MB default size)
  - Ephemeral - HDFS data is lost when cluster is terminated!
  - But, useful for caching intermediate results or workloads with significant random I/O
- EMRFS: Access S3 as if it were HDFS
  - Allows persistent storage after cluster termination
  - EMRFS Consistent View - Optional for S3 consistency
    - Uses DynamoDB to track consistency
    - May need to tinker with read/write capacity on DynamoDB
  - New in 2021: S3 is Now Strongly Consistent
- Local file system
  - Suitable only for temporary data (buffers, caches, etc)
- EBS for HDFS
  - Allows use of EMR on EBS-only types (M4, C4)
  - Deleted when cluster is terminated
  - Amazon Elastic Block Store (Amazon EBS) volumes can only be attached when launching a cluster
  - If you manually detach an EBS volume, EMR treats that as a failure and replaces it

## Promises

- EMR charges by the hour
  - Plus EC2 Charges
- Provisions new nodes if a core node fails
- Can add and remove tasks nodes on the fly
  - Increase processing capacity, but not HDFS capacity
- Can resize a running cluster's core nodes
  - Increases both processing and HDFS capacity
- Core nodes can also be added or removed
  - But removing risks data loss

## Managed Scaling

- EMR Automatic Scaling
  - The old way of doing it
  - Custom scaling rules based on CloudWatch metrics
  - Supports instance groups only
- EMR Managed Scaling
  - Introduced in 2020
  - Support instance groups and instance fleets
  - Scales spot, on-demand, and instances in a Savings Plan within the same cluster
  - Available for Spark, Hive, YARN workloads
- Scale-up Strategy
  - First adds core nodes, then task nodes, up to max units specified
- Scale-down Strategy
  - First removes task nodes, then core nodes, no further than minimum constraints
  - Spot nodes always removed before on-demand instances

## Serverless

- Choose an EMR Release and Runtime (Spark, Hive, Presto)
- Submit queries/scripts via job run requests
- EMR manages underlying capacity
  - But you can specify default worker sizes & pre-initialized capacity
  - EMR computes resources needed for your job & schedules workers accordingly
  - All within one region (across multiple AZ's)
- Why is this a big deal?
  - You no longer have to estimate how many workers are needed for your workloads - they are provisioned as needed, automatically
- Serverless? Really?
  - TBH you still need to think about workers nodes and how they are configured
