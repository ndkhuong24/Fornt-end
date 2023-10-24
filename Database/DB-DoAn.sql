﻿use [master]
go
CREATE DATABASE DATN
go
use DATN
go
CREATE TABLE Category(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Brand(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Size(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Color(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Sole(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Material(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Style(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT DEFAULT 1
)
CREATE TABLE Product(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(20),
	[name] VARCHAR(500),
	style_id INT,
	[description] NVARCHAR(500),
	create_date DATETIME DEFAULT GETDATE(),
	[status] INT DEFAULT 1
)
CREATE TABLE ProductDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	category_id INT,
	brand_id INT,
	product_id INT,
	size_id INT,
	color_id INT,
	sole_id INT,
	material_id INT,
	quantity INT,
	price INT,
	[status] INT DEFAULT 1
)
CREATE TABLE ImageChinh(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[path] NVARCHAR(MAX),
	product_detail_id INT
)
CREATE TABLE ImagePhu(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[path] NVARCHAR(MAX),
	product_detail_id INT
)
/*CREATE TABLE [Image](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[url] NVARCHAR(MAX),
	product_detail_id INT,
	[status] INT DEFAULT 0
)*/
CREATE TABLE Commune(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(200),
	commune_code INT,
	district_id INT
)
CREATE TABLE District (
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(200),
	district_code INT,
	province_id INT
)
CREATE TABLE Province(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(200),
	province_code INT
)
CREATE TABLE [Address](
	id INT IDENTITY(1,1) PRIMARY KEY,
	detail_address nvarchar(100),
	commune_id INT,
	district_id INT,
	province_id INT,
)
CREATE TABLE Customer(
	id INT IDENTITY(1,1) PRIMARY KEY,
	role_id INT,
	[name] NVARCHAR(200),
	username VARCHAR(100),
	[password] VARCHAR(100),
	email VARCHAR(100),
	phone VARCHAR(20),
	birthday DATE,
	gender INT,
	[status] INT DEFAULT 1
)
GO
INSERT INTO Customer([name]) VALUES (N'Khách lẻ')
GO
CREATE TABLE CustomerAddress(
	id INT IDENTITY(1,1)PRIMARY KEY,
	customer_id INT,
	address_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE Review(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	product_detail_id INT,
	point INT,
	comment NVARCHAR(500)
)
CREATE TABLE CartDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	product_detail_id INT,
	quantity INT,
)
CREATE TABLE Roles(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(10)
)
CREATE TABLE Users(
	id INT IDENTITY(1,1) PRIMARY KEY,
	fullname NVARCHAR(100),
	email VARCHAR(100),
	gender INT,
	phone_number VARCHAR(30),
	username VARCHAR(100),
	[password] VARCHAR(100),
	role_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE UserAddress(
	id INT IDENTITY(1,1)PRIMARY KEY,
	[user_id] INT,
	address_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE Voucher(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(10),
	[name] NVARCHAR(100),
	[type] INT,
	[value] FLOAT,
	maximum_value INT,
	condition INT,
	[start_date] DATETIME,
	[end_date] DATETIME,
	[status] INT
)
CREATE TABLE [Orders](
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	[user_id] INT,
	date_create DATETIME DEFAULT GETDATE(),
	total_price INT,
	transport_fee INT,
	[description_order] NVARCHAR(100),
	voucher_id INT,
	discount_price INT DEFAULT 0,
	final_price INT,
	[status] INT
)
CREATE TABLE OrderDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_detail_id INT,
	order_id INT,
	quantity INT,
	price INT
)
CREATE TABLE Authority (
	id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT,
	role_id INT,
)

