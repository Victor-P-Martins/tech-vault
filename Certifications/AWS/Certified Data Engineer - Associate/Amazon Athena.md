
# What is Athena?

Amazon Athena is a serverless, interactive query service by AWS that allows you to analyze data directly in Amazon S3 using standard SQL. It eliminates the need to manage infrastructure, scales automatically, and supports various data formats like CSV, JSON, ORC, Parquet, and more. It's ideal for quick data analysis, ad-hoc querying, and integration with BI tools.

- Interactive query service for S3 (SQL)
  - No need to load data, it stays in S3
- Presto under the hood
- Serverless
- Supports many data formats
  - CSV, TSV (Human readable)
  - JSON (Human readable)
  - ORC (Columnar, splittable)
  - Parquet (Columnar, splittable)
  - Avro (splittable)
  - Snappy, Zlib, Gzip compression
  - Unstructured, semi-structured or structured

# Examples

- Ad-hoc queries of web logs
- Querying staging data before loading to Redshift
- Analyze CloudTrail / CloudFront / VPC / ELB etc logs in S3
- Integration with Jupyter, Zeppelin, Rstudio notebooks
- Integration with QuickSight
- Integration via ODBC / JDBC with other visualization tools

# Athena Workgroups

- Can organize users / teams / apps / workloads into Workgroups
- Can control query access and track costs by WorkGroup
- Integrates with IAM, Aws CloudWatch, Amazon Simple Notification Service (Amazon SNS)
- Each WorkGroup can have its own:
  - Query history
  - Data limits (you can limit how much data queries may scan by workgroup)
  - IAM policies
  - Encryption settings

# Cost Model

- Pay-as-you-go
  - $5 per TB scanned
  - Successful or cancelled queries count, failed queries do not
  - No charge for DDL (CREATE/ALTER/DROP,etc.)
- Save LOTS of money by using columnar formats
  - ORC, Parquet
  - Save 30-90%, and get better performance
- Glue and S3 have their own charges

# Security

- Access control
  - IAM, ACLs, S3 bucket policies
  - AmazonAthenaFullAccess / AWSQuicksightAthenaAccess
- Encrypt results at rest in S3 staging directory
  - Server-side encryption with S3-managed key (SSE-S3)
  - Server-side encryption with KMS Key (SSE-KMS)
  - Client-side encryption with KMS key (CSE-KMS)
- Cross-account access in S3 bucket policy possible
- Transport Layer Security (TLS) encrypts in-transit (between Athena and S3)

# Anti-Patterns

- Highly formatted reports / visualization
  - That's what Amazon QuickSight is for
- ETL
  - Use Glue instead

# Optimizing Performance

- Use columnar data (ORC, Parquet)
- Small number of large files performs better than large number of small files
- Use partitions
  - If adding partitions after the fact, use MSCK REPAIR TABLE command

# ACID transactions

- Powered by Apache Iceberg
  - Just add 'table_type' = 'ICEBERG' in your CREATE TABLE command
- Concurrent users can safely make row-level modifications
- Compatible with EMR, Spark, anything that supports Iceberg table format
- Removes need for custom record locking
- Time travel operations
  - Recover data recently deleted with a SELECT statement
- Remember governed tables in Lake Formation? This is another way of getting ACID features in Athena
- Benefits from periodic compaction to preserve performance

# Fine-Grained Access to AWS Glue Data Catalog

- IAM-based Database and table-level security
  - Broader than data filters in Lake Formation
  - Cannot restrict to specific table versions
- At a minimum you must have a policy that grants access to your database and the Glue Data Catalog in each region.
- You might have policies to restrict access to:
  - ALTER or CREATE DATABASE
  - CREATE TABLE
  - DROP DATABASE or DROP TABLE
  - MSCK REPAIR TABLE
  - SHOW DATABASES or SHOW TABLES
- Just need to map these operations to their IAM actions
- Example: DROP TABLE

# Athena for Apache Spark

- Can run Jupyter notebooks with Spark within Athena console
  - Notebooks may be encrypted automatically or with KMS
- Totally serverless
- Selectable as an alternate analytics engine (vs. Athena SQL)
- Uses Firecracker for quickly spinning up Spark resources
- Programmatic API/CLI access as well
  - Create-Work-Group, create-notebook, start-session, start-calculation-execution
- Can adjust DPU's for coordinator and executor sizes
- Pricing based on compute usage and DPU per hour

# User Defined Function

Amazon Athena now supports User Defined Functions (UDFs), allowing customers to write custom scalar functions and invoke them in SQL queries. UDFs in Athena are defined within an AWS Lambda function as methods in a Java deployment package. This feature is particularly useful for scenarios requiring custom processing, such as categorizing earthquake locations using a geospacial indexing system. UDFs enable the encapsulation of complex logic into reusable functions, thus simplifying SQL queries in Athena.
