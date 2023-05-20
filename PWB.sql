DROP database if exists PWB;
CREATE DATABASE PWB;
USE PWB;



CREATE TABLE Users (
  USER_ID INT PRIMARY KEY auto_increment,
  USER_NAME VARCHAR(255) NOT NULL UNIQUE,
  PW VARCHAR(255) NOT NULL,
  USER_TYPE VARCHAR(255) NOT NULL,
  Created_By_ID INT NOT NULL REFERENCES Users(USER_ID),
  Profile_Picture VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL
);

SELECT * FROM USERS;

#DROP TABLE IF EXISTS USERS;
INSERT INTO USERS(USER_ID, USER_NAME, PW, USER_TYPE, Created_By_ID, Profile_Picture, Email)
VALUES
(1,'Isaam', 'TestPW123', 'Admin','1','https://drive.google.com/uc?export=view&id=18wD8CqwL54TP5Tpf8Dsh3LizG0CXJzkd','i210299@nu.edu.pk'),
(2,'Chiko_aly', 'BrokenWheels17', 'Admin','1', 'https://drive.google.com/uc?export=view&id=1rNl0MgznS5EFzsowMpDAtj462uaKVE4t','cheekumister@gmail.com'),
(3,'Moiz', 'PWD', 'Project Lead','1','https://drive.google.com/uc?export=view&id=18wD8CqwL54TP5Tpf8Dsh3LizG0CXJzkd','i210294@nu.edu.pk'),
(4,'dev', 'dev', 'Developer','1','https://drive.google.com/uc?export=view&id=18wD8CqwL54TP5Tpf8Dsh3LizG0CXJzkd','dev@nu.edu.pk'),
(5,'external', 'ext', 'External User','1','https://drive.google.com/uc?export=view&id=18wD8CqwL54TP5Tpf8Dsh3LizG0CXJzkd','nascon.23@nu.edu.pk');

#DROP table if exists project;

CREATE TABLE Project (
  Project_ID INT PRIMARY KEY auto_increment,
  Project_Name VARCHAR(255) NOT NULL,
  Lead_ID INT NOT NULL REFERENCES USERS(USER_ID),
  Version_Name VARCHAR(255) NOT NULL,
  Version_Release VARCHAR(255) NOT NULL,
  Project_Description TEXT,
  Project_Avatar VARCHAR(255) NOT NULL,
  Status VARCHAR(255) NOT NULL,
  Start_Date DATE NOT NULL,
  End_Date DATE NOT NULL,
  Creator_ID INT NOT NULL REFERENCES USERS(USER_ID)
);

INSERT INTO PROJECT(Project_ID, Project_Name, Lead_ID, Version_Name, Version_Release, Project_Description, Project_Avatar, Status, Start_Date, End_Date, Creator_ID) 
VALUES (1,"PWB", 3, "Ver2", "2", "Description", "https://drive.google.com/uc?export=view&id=1Qpq-nnztl_F5K4BAA7zFq_Qb8orBhbva", "On Going", "21/1/2", "21/1/2", 3);

INSERT INTO PROJECT(Project_ID, Project_Name, Lead_ID, Version_Name, Version_Release, Project_Description, Project_Avatar, Status, Start_Date, End_Date, Creator_ID) 
VALUES (2,"PWB", 4, "Ver2", "2", "Description", "https://drive.google.com/uc?export=view&id=1Qpq-nnztl_F5K4BAA7zFq_Qb8orBhbva", "On Going", "21/1/2", "21/1/2", 3);

INSERT INTO PROJECT(Project_ID, Project_Name, Lead_ID, Version_Name, Version_Release, Project_Description, Project_Avatar, Status, Start_Date, End_Date, Creator_ID) 
VALUES (3,"PWB", 4, "Ver2", "2", "Description", "https://drive.google.com/uc?export=view&id=1Qpq-nnztl_F5K4BAA7zFq_Qb8orBhbva", "On Going", "21/1/2", "21/1/2", 2);



select * from project;


SELECT * FROM PROJECT;
SELECT * FROM WORKFLOW_ELEMENT;

#drop table workflow_element
CREATE TABLE Workflow_Element (
  Project_ID INT NOT NULL REFERENCES Project(Project_ID),
  Element_ID INT auto_increment NOT NULL PRIMARY KEY ,
  Element_Name VARCHAR(255) NOT NULL,
  Order_No INT NOT NULL
);


CREATE TABLE Issue (
  Issue_ID INT PRIMARY KEY auto_increment not null,
  Project_ID INT not null references Project(Project_ID) ,
  Issue_Name VARCHAR(255) not null,
  Issue_Type VARCHAR(255) not null,
  Issue_Description TEXT,
  Issue_Deadline DATE NOT NULL,
  Issue_Priority VARCHAR(255) NOT NULL,
  Creator_ID INT NOT NULL REFERENCES USERS(USER_ID),
  Attachment VARCHAR(255),
  Comment TEXT
);

CREATE TABLE Issue_Status (
  Project_ID INT,
  Issue_ID INT,
  Element_ID INT,
  PRIMARY KEY (Project_ID, Issue_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Issue_ID) REFERENCES Issue(Issue_ID)
);

CREATE TABLE Developer_Projects (
  Project_ID INT not null,
  Developer_ID INT not null,
  Date_Assigned DATE,
  Assigned_By INT,
  PRIMARY KEY (Project_ID, Developer_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Developer_ID) REFERENCES Users(User_ID),
  FOREIGN KEY (Assigned_By) REFERENCES Users(User_ID)
);



CREATE TABLE Developer_Issues (
  Project_ID INT,
  Developer_ID INT,
  Issue_ID INT,
  PRIMARY KEY (Project_ID, Developer_ID, Issue_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Developer_ID) REFERENCES Users(User_ID),
  FOREIGN KEY (Issue_ID) REFERENCES Issue(Issue_ID)
);


CREATE TABLE Linked_Issues (
  Project_ID INT,
  Issue_ID INT,
  Related_Issue_ID INT,
  PRIMARY KEY (Project_ID, Issue_ID, Related_Issue_ID),
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Issue_ID) REFERENCES Issue(Issue_ID),
  FOREIGN KEY (Related_Issue_ID) REFERENCES Issue(Issue_ID)
);

CREATE TABLE ExternalUsers (
  ExternalUser_ID INT not null,
  Project_ID INT not null,
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID)
);


insert into ExternalUsers(ExternalUser_ID, Project_ID)
VALUES (5 , 2),
(5,3);

CREATE TABLE Team (
  Team_ID INT PRIMARY KEY,
  Project_ID INT,
  Team_Name VARCHAR(255),
  Creator_ID INT,
  Team_Type VARCHAR(255),
  Team_Description TEXT,
  FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
  FOREIGN KEY (Creator_ID) REFERENCES Users(User_ID)
);

CREATE TABLE TeamMembers (
  Team_ID INT,
  Developer_ID INT,
  PRIMARY KEY (Team_ID, Developer_ID),
  FOREIGN KEY (Team_ID) REFERENCES Team(Team_ID),
  FOREIGN KEY (Developer_ID) REFERENCES Users(User_ID)
);

CREATE TABLE RoadMap (
RoadMap_ID INT PRIMARY KEY,
Project_ID INT,
Milestone_Date DATE,
FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID)
);

