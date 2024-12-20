# What's AWS Glue Databrew

AWS Glue DataBrew is a tool designed to streamline your data analysis process.
It allows you to interact with your data directly, eliminating the need for complex coding.
With its extensive library of over 250 pre-built transformations, you can easily clean, normalize, and format your data, preparing it for insightful analysis.

## Common uses

- Reducing the time required to prepare data for analytics and machine learning.
- Automating data preparation tasks with a wide range of ready-made transformations.
- Facilitating collaboration among business analysts, data scientists, and data engineers to extract insights from raw data.
- Exploring and transforming large volumes of raw data without the need to manage any infrastructure.

## Features

- **Transformations** - More than 250 pre-built transformations are available with AWS Glue DataBrew that can be applied to your data. These transformations include actions like filtering rows, replacing values, splitting and combining columns, and many more. It also includes transformations that apply natural language processing (NLP) techniques to split sentences into phrases.

- **Data Formats and Data Sources** - AWS Glue DataBrew supports various data formats, including CSV, JSON, Parquet, and more. It can read data from different data sources such as Amazon S3, Amazon Redshift, Amazon RDS, and more.

- **Job and Scheduling** - You can create jobs in AWS Glue DataBrew to automate the data preparation tasks. These jobs can be scheduled to run at specified times.

- **Security** - AWS Glue DataBrew works seamlessly with AWS Identity and Access Management (IAM), which allows you to control access to your data and resources. All data processed by AWS Glue DataBrew is encrypted in transit and at rest.

- **Integration** - AWS Glue DataBrew can be integrated with other AWS services like AWS Glue for ETL tasks, Amazon QuickSight for data visualization, and Amazon SageMaker for machine learning.

## Components

- **Project** – A project in DataBrew is essentially your workspace. It contains related items such as data, transformations, and scheduled processes.

- **Dataset** – A collection of data organized into rows or records and further divided into columns or fields.

- **Recipe** – A series of instructions or steps for data that DataBrew will act upon. A recipe can have multiple steps, and each step can have multiple actions.

- **Job** – Is the process of transforming your data by executing the instructions from a recipe. A job can execute your data recipes based on a preset schedule.

- **Data Lineage** – DataBrew tracks your data’s origin in a visual interface known as a data lineage. This view shows the flow of data through different entities from its original source.

- **Data Profile** – is a process where DataBrew generates a comprehensive report about your data.

## Pricing

- AWS Glue DataBrew pricing is based on usage with no upfront commitment.
- The number of nodes used determines the cost.
- The cost per node is $0.48 per hour.
- The DataBrew interactive sessions are billed per 30-minute session at a rate of $1.00 per session.
- Pricing can vary by AWS Region.
- For the most accurate pricing, use the AWS Pricing Calculator.
