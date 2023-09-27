# Introduction 
Cypress is the new standard in front-end testing that every developer and QA engineer needs. With millions of downloads and users in over 90 countries, 
Cypress is the leader in browser-based test automation for the modern web. Cypress enables developers and enterprises to easily, quickly, and accurately 
test anything that runs in the browser, empowering developers to build modern web applications faster, better. \
AT_Cypress project's goal is to implement Betus **Mobile Tests**. The reference of the tests and the scenarios will be the same as our Selenium 4 desktop tests. The decision has been made to implement a complete test set with one of the famous and industry practical frameworks.
# Getting Started
The following section will guide you through the steps to run your first cypress project
## 1.	Software dependencies
Before installation you only need to install **node.js** on your end.
## 2.	Installation process
It is recommended to always reference Cypress website for installation guidelines. Current section was lastly written assuming you are using Cypress 13.10.0. \
i. Open the project custom directory and use the following command to install Cypress:
``` 
npm install cypress --save-dev
```
To verify the proper installation use the following command.
```
npx cypress open
```
You are now ready to clone the AT_Cypress. After cloning and receiving the files run the previous command again. Choose the chrome option and a chrome browser automated and configured by cypress will open.\
If you able to see the testcases and running them by clicking on them it means that your project has been setup correctly

# Build and Test
### 1- In Browser Testing:
```
npx cypress open
```
Using the open command and openning the cypress app you are able to manually test the specs.\
Major benefit of this approach is that you can inspect and debug you tests smoothly.
### 2- Headless Testing:
```
npx cypress run <args>
```
Using the run command with your desirable arguments you can do the following options:\
- Run headless tests
- Run tests on cypres cloud
- Save videos and screenshots for failures
- Save html result reports

# Contribute
- Recommended: Coding style should remain consistent. In case of a change and succession of the approach refactoring the code should take place.
- MUST: After adding the ```data-qa``` to all properties of Betus website locators.json should be changed so that instead of using css selectors it uses the ```data-qa``` attribute. 