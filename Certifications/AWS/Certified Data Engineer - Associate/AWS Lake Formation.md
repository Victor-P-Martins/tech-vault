# What's AWS Lake Formation?

AWS Lake Formation is a managed service by Amazon Web Services designed to simplify the process of building, securing, and managing data lakes. It automates tasks such as data ingestion, cleaning, transformation, and applying security policies. It streamlines the creation of scalable, secure, and cost-efficient data lakes to facilitate analytics and machine learning.

- Makes it easy to set up a secure data lake in days
- Loading data & monitoring data flows
- Setting up partitions
- Encryption & managing keys
- Defining transformation jobs & monitoring them
- Access control
- Auditing
- Built on top of Glue

## Pricing

- No cost for Lake Formation itself
- But underlying services incur charges
  - Glue
  - S3
  - EMR
  - Athena
  - Redshift

## Finer points

- Cross-account Lake Formation permission
  - Recipient must be set up as a data lake administrator
  - Can use AWS Resource Access Manager for accounts external to your organization
  - IAM permissions for cross-account access
- Lake Formation does not support manifests in Athena or Redshift queries
- IAM permissions on the KMS encryption key are needed for encrypted data catalogs in Lake Formation
- IAM permissions needed to create blueprints and workflows

## Governed Tables and Security

- Now supports "Governed Tables" that support ACID transactions across multiple tables
  - New type of S3 table
  - Can't change choice of governed afterwards
  - Works with streaming data too ([[Amazon Kinesis Data Streams]])
  - Can query with Athena
- Storage optimization with Automatic Compaction
- Granular Access Control with Row and Cell-Level Security
  - Both for governed and S3 tables
- Above features incur additional charges based on usage

## Data Permissions

- Can tie to IAM users/roles, SAML, or external AWS accounts
- Can use policy tags on databases, tables, or columns
- Can select specific permissions for tables or columns

## Data Filters

- Column, row, or cell-level security
- Apply when granting SELECT permission on tables
- "All columns" + row filter = row-level security
- "All rows" + specific columns = columns-level security
- Specific columns + specific rows = cell-level security
- Create filters via the console (seen here) or via CreateDataCellsFilter API.
