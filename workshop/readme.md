# Workshop readme  

Hello workshoppers! We are excited for you to join us to learn how to build your own stack in just a few clicks!  During this workshop, you will create two full-fledged web applications, explore how they work, and learn how you might customize them for your own purposes. 

## License Summary

This sample code is made available under a modified MIT license. See the LICENSE file.

&nbsp;

## Outline

- [Overview](#overview)
  - [Prerequisite: AWS account](#prerequisite-aws-account)
- [Part 1: AWS Full-Stack Template](#part-1-aws-full-stack-template)
  - [Section 1: Get to know the app](#section-1-get-to-know-the-app)
  - [Section 2: Explore the backend](#section-2-explore-the-backend)
  - [Section 3: Add on to the application](#section-3-add-on-to-the-application)
- [Part 2: AWS Bookstore Demo App](#part-2-aws-bookstore-demo-app)
  - [Section 1: Get to know the app](#section-1-get-to-know-the-app-1)
  - [Section 2: Explore the backend](#section-2-explore-the-backend-1)
  - [Section 3: Change the application (optional)](#section-3-change-the-application-optional)
- [Part 3: Extensions](#part-3-extensions)
  - [Section 1: Deploy a search extension to AWS Full-Stack Template](#section-1-deploy-a-search-extension-to-aws-full-stack-template)
  - [Section 2: Build your own extension!](#section-2-build-your-own-extension)
- [Part 4: Cleanup!](#part-4-cleanup)
- [Part 5: Build on!](#part-5-build-on)
- [Questions and contact](#questions-and-contact)

&nbsp;

## Overview

If you complete this workshop in it's entirety, good for you!  We are very impressed.  This workshop is not only designed to help you learn how to leverage these application templates, but also it is intended to leave you with ideas for how you might change and extend these (or other) applications in the future.  There are several advanced sections to the workshop (marked as optional) that you can take home with you after the workshop session.

### Prerequisite: AWS account

In order to maximize your time at the workshop, please make sure you have an AWS account set up.  If you do not have an AWS account, please see [How do I create and activate a new Amazon Web Services account?](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

*Be sure to shut down/remove all resources once you are finished with the workshop to avoid ongoing charges to your AWS account (see instructions on cleaning up/tear down in **Part 4: Cleanup** below.*

&nbsp;

---

&nbsp;

## Part 1: AWS Full-Stack Template

In this part of the workshop, you will spin up a complete instance of AWS Full-Stack Template, understand the application architecture, manually change some components, and explore adding additions.

### Section 1: Get to know the app

#### Step 1: Open the readme

Visit https://github.com/awslabs/aws-full-stack-template/blob/master/README.md to open the readme file on GitHub for AWS Full-Stack Template.  

#### Step 2: Play with the deployed goals app

At the top of the readme, choose **Try out the deployed application here!** This will open a new window with a fully-deployed version of AWS Full-Stack Template.  Sign up using an email address and password, and then log in to the app.  Add a goal and a description, and choose save.  Try editing a goal, and then deleting a goal.  Well done - you can CRUD!

#### Step 3: Deploy the application in your own AWS account

Read the **Overview** section in the readme to get a basic understanding of what the application consists of.  

Then, scroll down to the **Instructions** section, and follow along to deploy the application in your own AWS account.  (Hint: click the big **Launch Stack** button!)

#### Step 4: Review architecture

While the application is deploying in CloudFormation (should take ~10-15 minutes), read the remainder of the readme file, including the **Architecture**, **Implementation details**, and **Considerations for demo purposes** sections.  This familiarization with how the app is structured will come in handy once deployment is complete and we browse the components of the application.

#### Step 5: Open the endpoint from CloudFormation

Once the CloudFormation deployment is complete, view the **Outputs** table in the stack details page, and find the CloudFront URL.  This is the public endpoint to your deployed application.  Click to open this link and explore your brand-new goals app!

Since this is a completely new instance of the application, your username and password that you used before won't work.  Sign up for an account in your goals app, and test out the app!  Test to make sure the verification email works, that you can create, update, and delete goals, etc.


### Section 2: Explore the backend

Now that the application is up and running, let's open the hood and play around with some of the backend components.  We'll explore this by adding a “Last updated” or “Last modified” column to the goals list page.

#### Step 1: Open the Lambda function

Modify the LambdaFunction to add an updated time, which will pass 

#### Step 2: Check something in CloudWatch



#### Step 3: Change something Somewhere else




### Section 3: Add on to the application

By this point, you should have a pretty good feel for the different architectural components of AWS Full-Stack Template.  Since this is designed to provide you with the foundational services, components, and plumbing needed to get a basic web application up and running (it's a template, after all!) the next step is to add on to the application and make it your own.

#### Step 1: Add X



#### Step 2: Add Y



#### Step 3: Add Z




## End of Part 1

You finished Part 1 of the workshop!  If you do not plan to immediately continue to **Part 2: AWS Bookstore Demo App**, please skip ahead to **Part 4: Cleanup!**

&nbsp;

---

&nbsp;

## Part 2: AWS Bookstore Demo App

In this part of the workshop, you will spin up a complete instance of AWS Bookstore Demo App, understand the application architecture, manually change some components, and explore adding additions.  If you just completed **Part 1: AWS Full-Stack Template**, some of these instructions will be repetitive.

### Section 1: Get to know the app

#### Step 1: Open the README

Visit https://github.com/aws-samples/aws-bookstore-demo-app/blob/master/README.md to open the readme file on GitHub for AWS Bookstore Demo App. 

#### Step 2: Play with the deployed Bookstore

At the top of the readme, choose **Try out the deployed application here!** This will open a new window with a fully-deployed version of AWS Bookstore Demo App. Sign up using an email address and password, and then log in to the app. Check out the different product categories, and add some items to your cart.  Search for some books by title, author, or category using the search bar.  View the *Best Sellers* list, and see if you can move something to the top of the list by ordering a bunch.  Finally, take a look at the social recommendations on the home page and the *Best Sellers* page.  

#### Step 3: Deploy the application in your own AWS account

Read the **Overview** section in the readme to get a basic understanding of what the application consists of. 

Then, scroll down to the **Instructions** section, and follow along to deploy the application in your own AWS account. (Hint: click the big **Launch Stack** button!)

#### Step 4: Review architecture

While the application is deploying in CloudFormation (should take ~20-25 minutes), read the remainder of the readme file, including the **Architecture**, **Implementation details**, and **Considerations for demo purposes** sections. This familiarization with how the app is structured will come in handy once deployment is complete and we browse the components of the application.  

If you are coming from **Part 1** of this workshop, you should notice many similarities in the architecture.  That is because AWS Bookstore Demo App was built on top of AWS Full-Stack Template.  They contain the same developer infrastructure and frontend architectures, and a similar backend interface through Amazon API Gateway and AWS Lambda.  

What differences can you find in the architecture?  How many DynamoDB tables are there in this app compared to the other?  How many additional APIs are there?

#### Step 5: Open the endpoint from CloudFormation

Once the CloudFormation deployment is complete, view the **Outputs** table in the stack details page, and find the CloudFront URL. This is the public endpoint to your deployed application. Click to open this link and explore your brand-new Bookstore!

Since this is a completely new instance of the application, your username and password that you used before won't work. Sign up for an account in your Bookstore, and test out the app! Test to make sure the email verification works, and run through some of the use cases from before like search, cart, ordering, and best sellers.


### Section 2: Explore the backend

Now that the application is up and running, let's open the hood and play around with some of the backend componentry.

#### Step 1: Change the author of a book in DynamoDB

Since you've deployed this application, you deserve a reward!  Let's make you the instant author of your favorite book in the bookstore.  Open the DynamoDB console, find the BooksTable, find the name of the book you want to be the author of, and change the Author name.  Refresh the bookstore page.


#### Step 2: Update search to reflect your new authorship



#### Step 3: Manually edit the leaderboard/Best Sellers list

If you're like us, you ordered over 1000 copies of one of the books to bump it to the top of the *Best Sellers* list.  That was clearly an ordering error, so let's go correct the *Best Sellers* list.  In order to do this, first open the ElastiCache for Redis console.


### Section 3: Change the application *(optional)*

By this point, you should have a pretty good feel for the different architectural components of AWS Bookstore Demo App, and how it is just one example of what you might create with AWS Full-Stack Template.  You can choose to start with the basic template and add on, or start with something more full-featured (like the bookstore) and change it.  Either way, you have the foundational services, components, and plumbing you need to start building any web application.

Here are a few ideas for you might change AWS Bookstore Demo App.  Note: some of these are advanced!  You are also welcome to move on to **Part 3: Extensions** if you like.

#### Option 1: Use ElasticSearch (instead of DynamoDB) to return books by category *(easy)*

In the newly-deployed bookstore, when the user clicks on a given product category in the homepage, 

#### Option 2: Use it for your own storefront *(medium)*

Perhaps you are interested in spinning up your own storefront, but you don't need a social experience.  You will likely still want to have a product catalog, categories, search, best sellers, etc., so this app is a very good place to start.  

Let's imagine that you are going to sell furniture.  Go into DynamoDB and change the structure (and content) of all of the tables to reflect that you are selling furniture.  Don't forget to go to API Gateway and make the requisite changes there as well.

#### Option 3: Add individual product pages *(hard)*

One thing missing from the bookstore (or your furniture store) is individual pages for your products.  Build out an additional table(s) or rows in DynamoDB to contain the structured information for your product pages.  

#### Option 4: Turn it into a blog *(hard)*

Now that you've added individual product pages, you are not that far off from a blog website.  The search experience will help viewers find your content, the *Best Sellers* list can effectively return your most popular posts, and the product catalog and product pages can be your blog entries!  What else can you do?

#### Option 5: Use a different database *(hardest)*

Perhaps you want to use a different database for your product catalog (i.e. Amazon Aurora).  Change the backend structure, API calls, and other lookups to use a different database structure and call t other service.

#### Option 6: Build out the “Friends” functionality in the Bookstore *(hardest)*

One of the main items that is missing from the current AWS Bookstore Demo App implementation is that there is no way to manage (view, add, remove) your friends.  Build a friends management system and add it into the bookstore.


## End of Part 2

You finished Part 2 of the workshop! If you do not plan to immediately continue to **Part 3: Extensions** and explore deploying (and maybe even creating) extensions to your applications, please skip ahead to **Part 4: Cleanup!**

&nbsp;

---

&nbsp;

## Part 3: Extensions

### Section 1: Deploy a search extension to AWS Full-Stack Template

In this section, you will start with the basic AWS Full-Stack Template and deploy an extension (via CloudFormation) to add onto the application.  The purpose of this section is to illustrate how you can take a basic application like the Goals app and turn it into something different by adding components.

#### Step 1: Deploy the extension in your AWS account

Following the same guidelines for CloudFormation as in Parts 1 and 2 of this workshop, create a new stack, and use the template provided in the **Extensions** folder in the GitHub repo for AWS Full-Stack Template.  Deploy the extension.

#### Step 2: Play with the search capability

Now that you've deployed the search extension, try a few sample searches to see if your goals are returned.  If you want, integrate the search functionality into the frontend website.


### Section 2: Build your own extension!

In this section, you will try to build your own extension on top of an existing application.  

#### Step 1: Tear apart the search extension in Section 1

In order to figure out how you can build a generic extension on top of an existing application (ideally any application), first start by tearing apart the search extension we provide in Part 3, Section 1.  Download the CloudFormation template and understand the different elements that are being deployed.  Open at the Lambda functions to explore the logic for how/when conditional checks are made.

#### Step 2: Decide what type of extension you want to build

We decided to build a search extension to add search functionality on top of any application.  What will you come up with?  You could build a caching extension, a visualization extension, or something else.  What feature do you wish your web app had?  Let your imagination run wild.

#### Step 3: Build your extension

Following the generic structure of the search extension, build a CloudFormation template that will add your extension on top of an existing application.  Let us know what you built!


## End of Part 3

You finished Part 3 of the workshop! If you would like to save your work, please do so!  If you are interested in sharing your work, please see **Part 5: Build on!** for how you might contribute additions and ideas to either AWS Full-Stack Template or AWS Bookstore Demo App.  

Don't forget to finish **Part 4: Cleanup!** to avoid ongoing charges to your AWS account.

&nbsp;

---

&nbsp;

## Part 4: Cleanup!

To make sure you don't continue to incur charges on your AWS account, make sure to tear down your applications and remove all resources associated with both AWS Full-Stack Template and AWS Bookstore Demo App.

1. Log into the AWS CloudFormation Console and find the stack you created for the demo app
2. Delete the stack 
   - Double-check that the S3 buckets created for the stack were successfully removed.

*Remember to shut down/remove all related resources once you are finished to avoid ongoing charges to your AWS account.*

&nbsp;

---

&nbsp;

## Part 5: Build on!

Now that you are an expert in creating full-stack applications in just a few clicks, go build something awesome!  Let us know what you come up with.  We encourage developer participation via contributions and suggested additions to both AWS Full-Stack Template and AWS Bookstore Demo App. Of course you are welcome to create your own version!

Please see the [contributing guidelines](https://github.com/awslabs/aws-full-stack-template/blob/master/CONTRIBUTING.md) for more information.

&nbsp;

---

&nbsp;

## Questions and contact

For questions on the AWS Full-Stack Template, or to contact the team, please leave a comment on GitHub.
