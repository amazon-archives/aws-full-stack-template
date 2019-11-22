## Search API Extension

The Search API Extension enables you to add search functionality on top of your data in DynamoDB powered by Elasticsearch and API Gateway. The extension can be created with a single CloudFormation template!

This extension takes in a DynamoDB table as a parameter. It will spin up an Elasticsearch cluster, stream changes from DynamoDB to Elasticsearch, and create a Search API.  You can choose an existing API Gateway ID to integrate with or have the extension create a new one. 

Get started with adding search to your DynamoDB data below!

## License Summary

## Outline

- [Overview](#overview)
- [Instructions](#instructions)
  - [Getting started](#getting-started)
  - [Cleaning up](#cleaning-up)
- [Architecture](#architecture)
- [Implementation details](#implementation-details)
  - [Amazon DynamoDB](#amazon-dynamodb-streams)
  - [Amazon API Gateway](#amazon-api-gateway)
  - [AWS Lambda](#aws-lambda)
- [Using the extension](#using-the-extension)
- [Limitations](#limitations)
- [Suggestions](#suggestions)
- [Additions, forks, and contributions](#additions-forks-and-contributions)

## Overview

The provided CloudFormation template automates the entire creation and deployment of the Search API.  The template includes the following features:

* Enables streams on your DynamoDB table to push updates
* Creates an Elasticsearch cluster with best practices
* Processes records and update Elasticsearch cluster via a Lambda function
* Creates a Search API with Lambda
* Creates or integrates with an existing API Gateway

## Instructions

***IMPORTANT NOTE**: Creating this application in your AWS account will create and consume AWS resources, which **will cost money**. We estimate that running this extension in development mode (t2.small) will cost **<$0.10/hour** with light usage. In production mode (m4.large), we estimate this will cost around **$0.20/hr** with an additional $0.20/hr for each additional instance. Be sure to shut down/remove all resources once you are finished to avoid ongoing charges to your AWS account (see instructions on cleaning up/tear down below).*

## Getting started

To get the Search API Extension up and running in your AWS account, follow these steps (if you do not have an AWS account, please see [How do I create and activate a new Amazon Web Services account?](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)):

1. Log into the [AWS console](https://console.aws.amazon.com/) if you are not already
2. Choose one of the **Launch Stack** buttons below for your desired AWS region to open the AWS CloudFormation console and create a new stack. The Search API extension is supported in the following regions:

Region name | Region code | Launch
--- | --- | ---
US East (N. Virginia) | us-east-1 | [![Launch Stack](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=SearchAPI&templateURL=https://s3.amazonaws.com/aws-dmas/ddb-es/master.yaml) 
US West (Oregon) |	us-west-2 | [![Launch Stack](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=SearchAPI&templateURL=https://s3.amazonaws.com/aws-dmas/ddb-es/master.yaml) 
EU (Ireland) |	eu-west-1 | [![Launch Stack](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=SearchAPI&templateURL=https://s3.amazonaws.com/aws-dmas/ddb-es/master.yaml) 
EU (Frankfurt) |	eu-central-1 | [![Launch Stack](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/new?stackName=SearchAPI&templateURL=https://s3.amazonaws.com/aws-dmas/ddb-es/master.yaml)

3. Continue through the CloudFormation wizard steps
    1. Name your stack, e.g. SearchAPI
    2. Enter the name of the DynamoDB table to integrate with
    3. Specify an existing API Gateway ID to integrate with, or we will auto-create an API Gateway Resource for you
    4. After reviewing, check the blue box for creating IAM resources. 
4. Choose Create stack. This will take ~15 minutes to complete. 
5. After the stack completes, go to the Lambda console and find the Search function ([DynamoDBTableName]-Search)
    1. Modify the fields array on line 24 with fields from your DynamoDB table to query on in the format of [column name].[column type] (S, N, BOOL, etc)
    2. This allows us to achieve optimal performance as its best to query Elasticsearch on specific fields. 
    3. If you are deploying this on top of the Full Stack app template with the existing goals schema, no additional modification is needed. 

Note: As described in the [limitations](#limitations), this template does not backfill data to the Elasticsearch cluster. To test the extension, create a new item and see [Using the extension](#using-the-extension) for instructions on testing your Search API. 

### Cleaning up

To tear down your extension and remove all resources associated with the AWS Search API Extension, follow these steps:

1. Log into the AWS CloudFormation Console and find the stack you created for the Search API Extension
2. Delete the stack

*Remember to shut down/remove all related resources once you are finished to avoid ongoing charges to your AWS account.*

## Architecture

![Architecture](architecture.png)

## Implementation details

### Amazon DynamoDB Streams

Amazon DynamoDB Streams push updates to the *UpdateSearchCluster* Lambda function that updates the Amazon Elasticsearch cluster. 

### Amazon API Gateway

Amazon API Gateway acts as the interface layer between your frontend and AWS Lambda, which calls the backend (database). Below is the different APIs the extension creates:

*Search*

GET /search/{:q} (Search)

### AWS Lambda

AWS Lambda is used in a few different places to run the application, as shown in the architecture diagram. The important Lambda functions that are deployed as part of the template are shown below, and available in the [functions](https://github.com/awslabs/aws-full-stack-template/tree/master/extensions/search-api/functions) folder. In the cases where the response fields are blank, the application will return a statusCode 200 or 500 for success or failure, respectively.

*Search* - Lambda function that returns a list of books based on provided search parameters in the request. 

*UpdateSearchCluster* - Lambda function that updates the Elasticsearch cluster when new items are added to the DynamoDB table.

### Amazon VPC

The Elasticsearch cluster is secured in an Amazon VPC (Virtual Private Cloud) for production-level security. The Lambda functions interact with the cluster through an ENI (Elastic Network Interface) that is automatically setup for you. 

## Using the extension

1. Head to the API Gateway console and click on your API Gateway resource
2. Select the search GET method
3. Click test and enter a search query q={query term}

## Limitations 

- This extension does not backfill your Elasticsearch cluster with previous data. Want to contribute? Leave us a comment or a PR request!
- Upon the first use of a Lambda function, cold start times in a VPC can be slow. Once the Lambda function has been warmed up, performance will improve. Consider creating triggers to create your Lambda "warm" for production purposes.

## Suggestions

Have other ideas for extensions we should build? Leave a comment on GitHub!

## Additions, forks, and contributions

We are excited that you are interested in using [AWS Full-Stack Template](https://github.com/awslabs/aws-full-stack-template) and some of these extensions! This is a great place to start if you are just beginning with AWS and want to get a functional application up and running. It is equally useful if you are looking for a sample full-stack application to fork off of and build your own custom application. We encourage developer participation via contributions and suggested additions. Of course you are welcome to create your own version!
Please see the [contributing guidelines](https://github.com/awslabs/aws-full-stack-template/blob/master/CONTRIBUTING.md) for more information.

For just one example of how you can build on top of this, check out [AWS Bookstore Demo App](https://github.com/aws-samples/aws-bookstore-demo-app), which was built on top of AWS Full-Stack Template and the [Search API extension](https://github.com/awslabs/aws-full-stack-template/tree/master/extensions/search-api).
