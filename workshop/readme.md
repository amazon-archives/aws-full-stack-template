# Workshop readme  

Hello workshoppers! We are excited for you to join us to learn how to build your own stack in just a few clicks!  During this workshop, you will create two full-fledged web applications ([AWS Full-Stack Template](https://github.com/awslabs/aws-full-stack-template) and [AWS Bookstore Demo App](https://github.com/aws-samples/aws-bookstore-demo-app)), explore how they work, and learn how you might customize them for your own purposes. 

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
  - [Section 2: Build your own extension! (optional)](#section-2-build-your-own-extension-optional)
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

In this part of the workshop, you will spin up a complete instance of [AWS Full-Stack Template](https://github.com/awslabs/aws-full-stack-template), understand the application architecture, manually change some components, and explore adding additions.


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

Once the CloudFormation deployment is complete, view the **Outputs** table in the stack details page, and find the CloudFront URL.  This is the public endpoint to your deployed application.  Click the link to open and explore your brand-new goals app!

Since this is a completely new instance of the application, your username and password that you used before in Step 2 won't work.  Sign up for an account in your goals app, and test out the app!  Test to make sure the verification email works, that you can create, update, and delete goals, etc.


### Section 2: Explore the backend

Now that the application is up and running, let's open the hood and play around with some of the backend components.  

#### Step 1: Change the details for one of your goals directly in DynamoDB

Let's try changing one of the goals directly in DynamoDB.  Open the DynamoDB console, find the table ending in "Goals" that corresponds to this project, and choose one of the goal items to modify.  Change either the "title" string or the "content" string (which maps to the "Description" field in the app), and save your change in DynamoDB.  Return to the goals app, and refresh the page.  You should see your change reflected in the list.  

#### Step 2: Delete a user in Cognito

Open the Cognito console, and choose "Manager User Pools."  Look for the user pool with the stack name you used when deploying the goals app in CloudFormation and open this user pool.  Choose "Users and groups" in left navigation menu and choose one of your users.  If you only signed up yourself, you can choose to delete your own user and then sign up again, or create another user from the frontend and delete that user.  Next, choose "Disable user" and then click the "Delete user" button that appears.  Tada!  You are an amazing administrator.

#### Step 3: Change the application into a notes application *(optional)*
The goals application is not that far off from a simple notes application - it contains a title and a description field.  You could easily turn the goals app into a notes-taking app by simply changing the titles, column headers, and buttons on the pages.  Of course, that wouldn't change the backend (APIs, Lambda functions, and Tables), so if you were really passionate about changing the entire application into a notes app, you could make the requisite changes throughout.

This entire step is optional, but illustrative if you want to learn more about the different backend pieces.


### Section 3: Add on to the application

By this point, you should have a pretty good feel for the different architectural components of AWS Full-Stack Template.  Since this is designed to provide you with the foundational services, components, and plumbing needed to get a basic web application up and running (it's a template, after all!) the next step is to add on to the application and make it your own.

#### Step 1: Add a "Last updated" or "Last modified" parameter

First, you'll need to modify the "UpdateGoal" Lambda function to add the current time for the update, which will pass this information to DynamoDB.  To do this, open the [AWS Lambda console](https://console.aws.amazon.com/lambda) and search for "goal" which should return a list of the functions created in your account by the CloudFormation template.  Choose the one that ends in "UpdateGoal" and scroll down to the "Function code" card.

Add a parameter to "UpdateExpression" and a new line under "ExpressionAttributeValues" so it looks like this:

```js
UpdateExpression: "SET title = :title, content = :content, lastUpdated = :lastUpdated",
ExpressionAttributeValues: {
      ":title": data.title ? data.title : null,
      ":content": data.content ? data.content : null,
      ":lastUpdated": Date.now()
    },
```

Note we have added the "lastUpdated" parameter in two places.  Save your function.  Since the function hasn't been used yet, there won't be any "lastUpdated" record created until the function is called, so go modify one of your goals in the app.  You can change the title or description (up to you), and choose "Update goal."  

Next, let's go to DynamoDB to verify the new "lastUpdated" information is passed through.  Open the DynamoDB console and search for a table ending in "-Goals."  Open the goal you updated, and you should now see the "lastUpdated" information in the item. 

#### Step 2: Add the new "Last updated" column to the goals list page

Now that you have a snazzy new parameter to track when your goal was last updated, the next step is to add this information to the goals list page.  We'll leave this part to you, but here's a big hint: you'll only need to change one file. To get started, open the CodeCommit console, choose "Repositories" and then "Code" from the left navigation.  Navigate to /src/modules/signup/Home.tsx.  Choose "Edit" in the upper-right, make your changes, and then choose "Commit changes" at the bottom.  

Next, go to the pipeline that was set up for you.  Chose "Pipeline" from the left navigation, then choose "Pipelines."  Open the pipeline associated with your goals app project, and choose "Release change."

Wait a few minutes for the change to go through, and refresh your goals app.  What else can you add?


## End of Part 1

You finished Part 1 of the workshop!  If you do not plan to immediately continue to **Part 2: AWS Bookstore Demo App**, please skip ahead to **Part 4: Cleanup!**

&nbsp;

---

&nbsp;

## Part 2: AWS Bookstore Demo App

In this part of the workshop, you will spin up a complete instance of [AWS Bookstore Demo App](https://github.com/aws-samples/aws-bookstore-demo-app), understand the application architecture, manually change some components, and explore adding additions.  If you just completed **Part 1: AWS Full-Stack Template**, some of these instructions will be repetitive.


### Section 1: Get to know the app

#### Step 1: Open the README

Visit https://github.com/aws-samples/aws-bookstore-demo-app/blob/master/README.md to open the readme file on GitHub for AWS Bookstore Demo App. 

#### Step 2: Play with the deployed Bookstore

At the top of the readme, choose **Try out the deployed application here!** This will open a new window with a fully-deployed version of AWS Bookstore Demo App. Sign up using an email address and password, and then log in to the app. View the different product categories, add some items to your cart, and checkout.  Search for a few books by title, author, or category using the search bar.  View the *Best Sellers* list, and see if you can move something to the top of the list by ordering a bunch of books.  Finally, take a look at the social recommendations on the home page and the *Best Sellers* page.  

#### Step 3: Deploy the application in your own AWS account

Read the **Overview** section in the readme to get a basic understanding of what the application consists of. 

Then, scroll down to the **Instructions** section, and follow along to deploy the application in your own AWS account. (Hint: click the big **Launch Stack** button!)

#### Step 4: Review architecture

While the application is deploying in CloudFormation (should take ~20-25 minutes), read the remainder of the readme file, including the **Architecture**, **Implementation details**, and **Considerations for demo purposes** sections. This familiarization with how the app is structured will come in handy once deployment is complete and we browse the components of the application.  

If you are coming from **Part 1** of this workshop, you should notice many similarities in the architecture.  That is because AWS Bookstore Demo App was built on top of AWS Full-Stack Template.  They contain the same developer infrastructure and frontend architectures, and a similar backend interface through Amazon API Gateway and AWS Lambda.  

What differences can you find in the architecture?  How many DynamoDB tables are there in this app compared to the other?  How many additional APIs are there?

#### Step 5: Open the endpoint from CloudFormation

Once the CloudFormation deployment is complete, view the **Outputs** table in the stack details page, and find the CloudFront URL. This is the public endpoint to your deployed application. Click the link to open and explore your brand-new Bookstore!

Since this is a completely new instance of the application, your username and password that you used before in Step 2 won't work. Sign up for an account in your Bookstore, and test out the app! Test to make sure the email verification works, and run through some of the use cases from before like search, cart, ordering, and best sellers.


### Section 2: Explore the backend

Now that the application is up and running, let's open the hood and play around with some of the backend componentry.

#### Step 1: Change the author of a book in DynamoDB

Since you've deployed this application, you deserve a reward!  Let's make you the instant author of your favorite book in the bookstore.  Open the DynamoDB console, find the BooksTable, find the name of the book you want to be the author of, and change the Author name.  Refresh the bookstore page.  Congratulations, you are an author in your own personal bookstore!

#### Step 2: Update search to reflect your new authorship

This might be the easiest step.  After you updated the Author name, in the backend, DynamoDB Streams automatically pushed this information to the Elasticsearch cluster for your application.  In the bookstore page, try searching for your name.  The book you authored should be returned.

#### Step 3: Manually edit the leaderboard/Best Sellers list

First, make sure you have at least two books in your *Past orders* list with different order quantities.  Unless you've already created multiple accounts for the boosktore, the books in your *Past orders* list will match the books in the *Best Sellers* list (since the bookstore started with no orders).  

If you're like us, you ordered over 1000 copies of one of the books to bump it to the top of the list.  That was clearly an ordering error, so let's go correct the *Best Sellers* list.  In order to do this, open the DynamoDB console and find the orders table.  Next, find the entry for your big order and open the item to edit it.  Open the "books" list, and then edit the "quantity" to be less than one of your other ordered books.  Click save.  Wait a few moments, and then go to the bookstore endpoint and refresh the page.  You should notice the book moved in the list.

Just like with updating the search experience, in the backend, DynamoDB Streams automatically pushed this information to ElastiCache for Redis, and the *Best Sellers* list was updated.


### Section 3: Change the application *(optional)*

By this point, you should have a pretty good feel for the different architectural components of AWS Bookstore Demo App, and how it is just one example of what you might create with AWS Full-Stack Template.  You can choose to start with the basic template and add on, or start with something more full-featured (like the bookstore) and change it.  Either way, you have the foundational services, components, and plumbing you need to start building any web application.

Here are a few ideas for how you might change AWS Bookstore Demo App.  Note: many of these are advanced!  You are also welcome to move on to **Part 3: Extensions** if you like.

#### Option 1: Use it for your own storefront *(medium)*

Perhaps you are interested in spinning up your own storefront.  You will likely still want to have a product catalog, categories, search, best sellers, etc., so this app is a very good place to start.  

Let's imagine that you are going to sell furniture.  Go into DynamoDB and change the structure (and content) of all of the tables to reflect that you are selling furniture.  You'll also want to go to API Gateway and make the requisite changes.  Finally, you can make changes to the frontend assets in CodeCommit to reflect your new look, furniture categories (instead of books), etc., and then push these changes through CodePipeline to update your storefront.

#### Option 2: Add individual product pages *(hard)*

One thing missing from the bookstore (or your furniture store) is individual pages for your products.  Build out an additional table(s) or rows in DynamoDB to contain the structured information for your product pages.  

#### Option 3: Turn the bookstore into a blog *(hard)*

Now that you've added individual product pages, you are not that far off from a robust blog application.  The search experience will help viewers find your content, the *Best Sellers* list can effectively return your most popular posts, and the product catalog and product pages can be your blog entries!  What else can you do?

#### Option 4: Use a different database *(hardest)*

Perhaps you want to use a different database for your product catalog (i.e. Amazon Aurora).  Change the backend structure, API calls, and other lookups to use a different database structure and call the other service.

#### Option 5: Build out the “Friends” functionality in the Bookstore *(hardest)*

One of the main items that is missing from the current AWS Bookstore Demo App implementation is that there is no way to manage (view, add, remove) your friends.  Build a friends management system and add it into the bookstore.


## End of Part 2

You finished Part 2 of the workshop! If you do not plan to immediately continue to **Part 3: Extensions** and explore deploying (and maybe even creating) extensions to your applications, please skip ahead to **Part 4: Cleanup!**

&nbsp;

---

&nbsp;

## Part 3: Extensions


### Section 1: Deploy a search extension to AWS Full-Stack Template

### Getting started

In this section, you will start with the application you deployed in **Part 1** with AWS Full-Stack Template and deploy an extension (via CloudFormation) to add onto the application.  The purpose of this section is to illustrate how you can take a basic application like the Goals app and turn it into something different by adding components.

#### Step 1: Deploy the search extension in your AWS account

Following the same guidelines for CloudFormation as in Part 1 and Part 2 of this workshop, create a new stack, and use the template provided in the **Extensions** folder in the GitHub repo for AWS Full-Stack Template to add search capabilities to the Goals app via Elasticsearch service.  Deploy the extension.

[![Launch Stack](https://cdn.rawgit.com/buildkite/cloudformation-launch-stack-button-svg/master/launch-stack.svg)](https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=SearchExtension&templateURL=https://s3.amazonaws.com/aws-dmas/ddb-es/master.yaml)

#### Step 2: Play with the search capability

Now that you've deployed the search extension, let's test it to make sure search results are being returned properly. 

Open the DynamoDB console and find the table associated with your goals.  Go to the items tab and choose one of the items (a goal).  Copy the userID and the title of the goal and make a note of them for use in a minute.  

In a new tab, open the Lambda console and look for the search function that was created as part of the extension you just ran in CloudFormation.  It should be titled "yourextensionprojectname-Search."  Open the Lambda function, choose the "Select a test event" dropdown towards the top, and choose "Configure test events."  In the "Event template" dropdown, choose "Amazon API Gateway AWS Proxy."  Here we are setting up a test for our search extension.

Next, enter an event name (e.g. searchtest) and change the following lines of code from:

```js
"queryStringParameters": {
    "foo": bar
  },
```
to:
```js
"queryStringParameters": {
    "q": title of your goal
  },
```
where "title of your goal" is the goal title you made a note of earlier (or perhaps one word of your goal title).  This is simulating the string that you might put into a search bar.

Choose "Create" at the bottom of the window.  Next, choose "Test" at the top of the window and verify that you see your goal information returned.

#### Step 3: Add a search bar to the goals app *(optional)*

If you would like, you can go even further by integrating the search functionality into the frontend application.  Feel free to explore how AWS Bookstore Demo App did this, or experiment!


### Section 2: Build your own extension! *(optional)*

In this section, you will try to build your own extension on top of an existing application.  

#### Step 1: Tear apart the search extension in Section 1

In order to figure out how you can build a generic extension on top of an existing application (ideally any application), first start by tearing apart the search extension we discussed in Part 3, Section 1.  Open the CloudFormation template and understand the different elements that are being deployed.  Open the Lambda functions to explore the logic for how/when conditional checks are made.

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
