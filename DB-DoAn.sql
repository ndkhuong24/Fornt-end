﻿use [master]
go
CREATE DATABASE DATN
go
use DATN
go

CREATE TABLE Category(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	status INT
)
CREATE TABLE Brand(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	status INT
)
CREATE TABLE Size(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	status INT
)
CREATE TABLE Color(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	status INT
)
CREATE TABLE [Image](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(500),
	image_url VARCHAR(500),
	status INT
)
CREATE TABLE Review(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	product_id INT,
	point INT,
	comment NVARCHAR(500)
)
CREATE TABLE ProductDiscount(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(500),

)
CREATE TABLE Product(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(500),
	[description] NVARCHAR(500),
	create_date DATETIME,
	size_id INT,
	category_id INT,
	brand_id INT,
	color_id INT,
	image_id INT,
	review_id INT,
	price INT,
	quantity INT,
	product_discount_id INT,
	[status] INT
)

CREATE TABLE Commune(
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(100) 
)
CREATE TABLE District (
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(100) 
)
CREATE TABLE Province(
	id INT IDENTITY(1,1) PRIMARY KEY,
	name VARCHAR(100) 
)
CREATE TABLE [Address](
	id INT IDENTITY(1,1) PRIMARY KEY,
	commune_id INT,
	district_id INT,
	province_id INT,
)

CREATE TABLE Customer(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(200),
	username VARCHAR(100),
	password VARCHAR(100),
	email VARCHAR(100),
	phone VARCHAR(100),
	birthday DATE,
	gender INT,
	customer_style INT,
	address_id INT,
	status INT
)
GO
INSERT INTO Customer([name]) VALUES ('Khách lẻ')
GO
CREATE TABLE FacebookAssociate(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	fb_scope VARCHAR(100),
	create_date DATETIME
)
CREATE TABLE GoogleAssociate(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	fb_scope VARCHAR(100),
	create_date DATETIME
)
	
