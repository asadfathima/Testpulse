# Testpulse


Readme for TestPulse


1. Introduction

TestPulse is a dynamic tool crafted with the purpose of empowering developers to tackle programming challenges more efficiently. By harnessing the power of real-time insights, TestPulse helps in swiftly pointing and resolving code-related issues.

2. Team Members:


Asad Fatima 
Tanvi Bhardwaj 
Karun Shamanur 
Rahul Chavan 

3. Prerequisites

Before setting up and proceeding, ensure you have the following installed:
Java JDK 17
Maven 3.9.6
Access to a SonarQube server (locally)
Python version 3.11.6

Folder Structure: 
The snippet shows the folder structure of the submission folder:



Studentpantrymanagement : Spring boot code to be tested using Sonarqube.
Testpulse: Contains Flask application which is the Sonarqube server.
Testpulse_frontend: Angular Application which contains the Testpulse dashboard.
Dbscripts.txt: The scripts to be run in your POSTGRES database ‘testpulse;.
TestPulse.postman_collection: JSON postman collection that can be imported in postman to understand Testpulse APIs.
Readme file: Contains project setup and understanding documentation. 



4. Setup / Installation

Extract the zip file contents. 
Setting up Sonarqube

Download sonarqube community edition from the official site on this link:
https://www.sonarsource.com/products/sonarqube/downloads/
Install Sonarqube and connect it to postgres. Follow official documentation:
https://docs.sonarsource.com/sonarqube/latest/setup-and-upgrade/install-the-server/installing-sonarqube-from-zip-file/

Make the following changes in the conf/sonar.properties file of your sonarqube setup files:
(Update the credentials as per your Postgres credentials)


sonar.jdbc.username=postgres
sonar.jdbc.password=postgres
sonar.jdbc.url=jdbc:postgresql://localhost:5432/sonarqube

Start Sonarqube and create a new local project. 
Once setup is completed you should be able to access Sonarqube at the following location: http://localhost:9000/
Create a new test project and generate a key of type ‘user’
Save the project name and key somewhere to be used later. 

Setting up your Testpulse database.
In the Postgres database create a database with the name : ‘testpulse’
Find the db_scripts.txt file in the unzipped folder and run the scripts in the testpulse database. This should create two tables in your database:
issue_files
sonarqube_issues

Modifying the testpulse application script:
Go to the testpulse/app.py file in the unzipped folder and modify the following
conn_params = {
    "dbname": 'testpulse',
    "user": 'postgres',
    "password": 'postgres',
    "host": 'localhost' ,
    "port": '5432' 
}

Update this with the postgres credentials for your machine. 

 headers = {
        'Authorization': 'Bearer squ_9433ebf3f196b62091d5487c68588c77dc57bb3d'
    }


params = {
        'componentKeys': 'pantry-pal-tester',
        'statuses': 'OPEN,REOPENED',
	'ps':'500',
	'p':'1'
    }

Update this with the sonarqube key and the project key you generated previously when creating a new project. 

Note: DO NOT CHANGE THE KEY IN THE analyze_issue() function. It is the OPEN AI LLM key. 

base_path = r'C:\projects\SQA\subm\studentpantrymanagement\studentPantry'

Change this path to point to the path of the studentPantry folder in the extracted folder in your machine. 

Save and close the file.

Updating the start.bat
Go to studentpantrymanagement/studentPantry folder and open the start.bat file in Notepad:
call mvn clean verify sonar:sonar -Dsonar.projectKey=pantry-pal-tester -Dsonar.projectName="pantry-pal-tester" -Dsonar.host.url=http://localhost:9000 -Dsonar.login=squ_9433ebf3f196b62091d5487c68588c77dc57bb3d

Replace the projectKey, projectName and token with the credentials you generated from Sonarqube.
 
Save and close


Setting up a python environment. 
Go to the testpulse folder and start the command prompt.
Run: pip install -r requirements.txt

Go to the testpulse_frontend folder and run ng serve. The dashboard will be accessed at http://localhost:4200/

5. Testing the project

Once the setup is done start the Testpulse flask application by running the app.py file in the folder testpulse

Once the server and the angular application are running, run the start.bat file in the studentpantrymanagement\studentPantry folder. This will run the Sonarqube analysis on the pantrypal project and results should be visible here:
http://localhost:9000/projects

Go to http://localhost:4200/ and you should see a timestamp of the time you run your batch file analysis.

Click on the timestamp and you should see a list of issues. Click on the issue id you want to get AI suggestions for and click on the button ‘AI Suggestion’ to get code suggestions. 

Once you fix the issue you can re-run sonar analysis by simply running the batch file. If the issue is resolved then you can see that in the browser by clicking on the timestamp of your most recent analysis. 



6. High Level Architecture Diagram


