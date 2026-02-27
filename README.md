Skill-Swap (Skill Sharing & Exchange Web Application)
Overview

Skill-Swap is a web-based platform that enables users to exchange skills without monetary transactions. Users can list skills they can offer, request skills they need, and complete exchanges through a structured workflow. The system promotes collaboration, peer learning, and fair skill-based interaction while ensuring transparency and accountability.

The solution follows a layered architecture using Spring Boot and is developed using Agile methodology, applying object-oriented principles and human-centered design practices to ensure maintainability, scalability, and usability.

Main Features and Scope
1) User Management

User registration and login

Secure authentication and role-based access

Profile management

Display of user ratings and completed exchanges

2) Skill Management

Add, edit, and delete offered skills

Skill categorization

Proficiency level selection

Skill browsing and filtering

3) Skill Exchange Workflow

Request a skill from another user

Accept or reject exchange requests

Status tracking (request → accepted/rejected → completed)

Exchange history tracking

4) Rating System

Mutual rating after exchange completion

Review history visibility

5) Admin Features

Monitor users and exchanges

View system statistics

View user feedback

Main Users
General Users (Students)

Create profiles

List and manage skills

Initiate and manage exchange requests

Provide ratings and feedback

Administrator

Monitor platform activity

Moderate inappropriate behavior

View overall system performance

Technology Stack
Backend

Java 17

Spring Boot

Spring Web (REST API)

Spring Data JPA

Spring Security

Hibernate ORM

Frontend

Thymeleaf

HTML / CSS

Bootstrap

Database

MySQL

Development Tools

Maven

Git & GitHub

Postman (API testing)

Architecture

The system is designed using a layered backend architecture to support clean separation of concerns and maintainability:

Controller Layer: Request routing + API endpoints / web routes

Service Layer: Business logic + validation + workflow rules

Repository Layer: Database operations (Spring Data JPA)

Model Layer: Domain entities (e.g., User, Skill, Exchange, Rating)

This structure supports future additions without major redesign.

Sprint 1 Goal and Scope
Sprint 1 Goal

Sprint 1 establishes the initial functional prototype by implementing:

Core system infrastructure

Database connection

Basic user authentication features

A minimal vertical slice that proves users can enter and access the system

Sprint 1 “Working Vertical Slice” (Must work by end of Sprint)

At the end of Sprint 1, the system should allow a user to:

Register a new account through a web interface

Log in using their credentials

Access a protected profile page

View basic profile information

Sprint 1 Epics Included

Epic 1 – System Setup & Architecture (project initialization, DB config, layered architecture setup)

Epic 2 – User Authentication & Registration (register + login + required backend components and UI)

Epic 3 – User Profile Management (Partial) (basic protected profile display after login)

Getting Started
Prerequisites

Java 17 installed

Maven (or use the included Maven wrapper mvnw)

MySQL running locally (or via Docker)

Database Setup (MySQL)

Create a database:

CREATE DATABASE skillshare_db;

Configure database connection in application.properties (or use environment variables).

Run the Application

Using Maven wrapper:

./mvnw spring-boot:run

Optional (example for custom port + password override):

./mvnw spring-boot:run "-Dspring-boot.run.arguments=--server.port=8081 --spring.datasource.password=YOUR_PASSWORD"
Deliverables by Sprint (High-Level Roadmap)
Sprint 1 (Current)

Project setup + DB connection

Layered architecture packages

User registration + login

Protected profile page (basic info)

Future Sprints (Planned Features)

Skill management (CRUD + categories + filtering)

Exchange workflow (requests, acceptance/rejection, completion)

Rating system (mutual rating + review history)

Admin monitoring tools + system statistics

UI improvements and full integration testing

Team & Client
Team Members

IT24200310 – S. Arun

IT24103433 – Jadavan M.

IT24610792 – Ilzam M.I.M

IT24101633 – Heshanth T.

Client Details

Client Name: Kandasamy Sugarthan

Designation: Data Governance Manager
