# Semester Project 2 Resit 2

## Goal 

To create a news website.

## Brief 

You have been tasked with creating a news website where users can come and read the latest news. Authorized writers for the news site should be able to log in and create an article.

Here are a list of functional requirements: 
- Visitors should be able to view the current articles.
- Visitors should be able to search the site for any articles mentioning the keyword(s) they have used to search. You may match on the titles, the content in the articles, or both.
- Visitors should be able to use categories to filter groups of articles eg. sport, politics, science etc.
- Visitors should be able to read an article and see who the author is and should be able to click the author's name to view all the articles written by that author. The titles of the article page must update with the article title.
- Authenticated writers for the news site should be able to log into an admin panel and on this panel they are able to add, edit and delete an article. The article should have at least a: title, featured image, content, and categories.

You should use WordPress or Strapi as a headless CMS to manage the content. It’s important to note that the editing of the content should happen on the front-end built by you, not the WordPress/Strapi admin panel. You need to be making PUT and POST requests yourself to maintain the content on the site, and be fetching content from the WordPress REST API. 

The API that you create and serve through WordPress/Strapi is one part of the project. You’re just using WordPress/Strapi for the API it gives you. 

The second part of the project is the front-end code; a completely distinct project. 

## Level 1 Process 
1. Design the website using a prototyping tool of your choice (Adobe XD, Sketch etc.) 
2. Create your WordPress/Strapi installation and deploy it. If you're using WordPress you can deploy on your web host, and if you're using Strapi you can deploy on Heroku.
3. Make your own example articles so that you have data to start off. You will need at least 12 articles for the site and at least three authors. Provide login credentials for each of the authors in your report so that we can test logging into the admin panel.
4. Use your created repository that GitHub Classroom has created for you for the files for your front-end code.
5. Set up your API call to fetch data from the API and display it in your website. Make sure to read the documentation for the API of your chosen CMS
6. Create the login system and manage the authentication to ensure you can make PUT, POST and DELETE requests. Include the login details for an already created user in your report for the markers to use. 
7. Build the forms for creating, updating and deleting an article. 
8. Make the search functionality for user's to find articles based on their search input, categories, and author.
9. Ensure everything is pushed to the repository created for this project.

## Level 2 Process
1. Visitors should be able to add comments to articles.

## Submission 

Submit a link to the repository of the website you’ve created, as well as a report. You can use [this template](https://interactive-content.now.sh/resources/semester-project-2-report-template.docx) for your report. In your report, clearly state the login credentials for the users you've created.
