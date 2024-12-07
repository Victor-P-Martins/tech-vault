# What's Glue?

Amazon Glue is a serverless data integration service that helps prepare, clean, and transform data for analytics and machine learning. It automates ETL (Extract, Transform, Load) tasks, supports multiple data sources, and integrates seamlessly with AWS services like S3, Redshift, and Athena.

- Serverless discovery and definition of table definitions and schema
  - S3 Data Lakes
  - RDS
  - Redshift
  - Most other SQL databases
- Custom ETL jobs
  - Trigger-driven, on a schedule, or on demand
  - Fully managed
  - Spark under the hood

## Glue Crawler / Data Catalog

- Glue crawler scans data in S3, creates schema
- Can run periodically
- Populates the Glue Data Catalog
  - Stores only table definition
  - Original data stays in S3
- Once cataloged, you can treat your unstructured data like it's structured using
  - Redshift Spectrum
  - Amazon Athena
  - Amazon EMR
  - Amazon QuickSight

## Glue and S3 Partitions

- Glue crawler will extract partitions based on how your S3 data is organized
- Think up front about how you will be querying your data lake in S3
- Example: devices send sensor data every hour
- Do you query primarily by time ranges?
  - If so, organize your buckets as yyyy/mm/dd/device
- Do you query primarily by device?
  - If so, organize your buckets as device/yyyy/mm/dd

## Glue + Hive

- Hive lets you run SQL-like queries from EMR
- The Glue Data Catalog can serve as a Hive "metastore"
- You can also import a Hive metastore into Glue

## Glue ETL

- Automatic code generation
- Scala or Python
- Encryption
  - Server-side (at rest)
  - SSL (in transit)
- Can be event-driven
- Can provision additional "DPU's" (data processing units) to increase performance of underlying Spark jobs
  - Enabling job metrics can help you understand the maximum capacity in DPU's you need
- Errors reported to CloudWatch
  - Could tie into SNS for notification
- Transform data, Clean Data, Enrich Data (before doing analysis)
  - Generate ETL code in Python or Scala, you can modify the code
  - Can provide your own Spark or PySpark scripts
  - Target can be S3, JDBC (RDS, Redshift), or in Glue Data Catalog
- Fully managed, cost effective, pay only for the resources consumed
- Jobs are run on a serverless Spark Platform
- Glue Scheduler to schedule the jobs
- Glue Triggers to automate job runs based on "events"

## The DynamicFrame

- A DynamicFrame is a collection of DynamicRecords
  - DynamicRecords are self-describing, have a schema
  - Very much like a Spark DataFrame, but with more ETL stuff
  - Scala and Python APIs

## Transformations

- Bundled Transformations
  - DropFields, DropNullFields - remove (null) fields
  - Filter - Specify a function to filter records
  - Join - to enrich data
  - Map - Add fields, delete fields, perform external lookups
- Machine Learning Transformations:
  - FindMatches ML: identify duplicate or matching records in your dataset, even when the records do not have a common unique identifier and no fields match exactly
- Format conversions: CSV, JSON, Avro, Parquet, ORC, XML
- Apache Spark Transformations (Example: K-Means)

## ResolveChoice

- Deals with ambiguities in a DynamicFrame and returns a new one
- For example, two fields with the same name
- make_cols: creates a new columns for each type
  - price_double, price_string
- cast: casts all values to specified type
- make_struct: Creates a structure that contains each data type
- project: Projects every type to a given type, for a example project:string

## Modifyng the Data Catalog

- ETL scripts can update your schema and partitions if necessary
- Adding new partitions
  - Re-run the crawler, or
  - Have the script use enableUpdateCatalog and partitionKeys options
- Updating table schema
  - Re-run the crawler, or
  - Use enableUpdateCatalog / updateBehavior from script
- Creating new tables
  - enableUpdateCatalog / updateBehavior with setCatalogInfo
- Restrictions
  - S3 only
  - Json, csv, Avro, parquet only
  - Parquet requires special code
  - Nested schemas are not supported

## Running Glue Jobs

- Time-based schedules (cron style)
- Job bookmarks
  - Persists state from the job run
  - Prevents reprocessing of old data
  - Allows you to process new data only when re-running on a schedule
  - Works with S3 sources in a variety of formats
  - Works with relational databases via JDBC (if PK's are in sequential order)
    - Only handles new rows, not updated rows
- CloudWatch Events
  - Fire off a lambda function or SNS notification when ETL succeeds or fails
  - Invoke EC2 run, send event to Kinesis, activate a Step Function

## Glue cost model

- Billed by the second for crawler and ETL jobs
- First million objects stored and accesses are free for the Glue Data Catalog
- Development endpoints for developing ETL code charged by the minute

## Glue Anti-patterns

- Glue ETL is based on Spark
- If you want to use other engines (Hive, Pig, etc) Data Pipeline EMR would be a better fit
- No longer an anti-pattern: Streaming
  - ASs of April 2020, Glue ETL supports serverless streaming ETL
    - Consumes from Amazon Kinesis Data Streams or Kafka
    - Clear & Transform in-flight
    - Store results into S3 or other data stores
  - Runs on Apache Spark Structured Streaming

## Glue Studio

- Visual interface for ETL workflows
- Visual job editor
  - Create DAG's for complex workflows
  - Sources include Amazon Simple Storage Service (Amazon S3), Amazon Kinesis Data Streams, Amazon Managed Streaming for Apache Kafka (Amazon MSK) and JDBC
  - Transform/ Sample/ join data
  - Target to S3 or Glue Data Catalog
  - Support partitioning
- Visual job dashboard
  - Overviews, status, run times

## Glue Data Quality

- Data quality rules may be created manually or recommended automatically
- Integrates into Glue Jobs
- Uses Data Quality Definition Language (DQDL)
- Results can be used to fail the job, or just be reported to CloudWatch
