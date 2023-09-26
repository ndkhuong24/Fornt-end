use [master]
go
CREATE DATABASE DATN
go
use DATN
go

CREATE TABLE Category(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT
)
CREATE TABLE Brand(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	[status] INT
)
CREATE TABLE Size(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT
)
CREATE TABLE Color(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT
)
CREATE TABLE Sole(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT
)
CREATE TABLE Material(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT
)

CREATE TABLE Style(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[status] INT
)
CREATE TABLE Product(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(20),
	[name] VARCHAR(500),
	style_id INT,
	[description] NVARCHAR(500),
	create_date DATETIME,
	[status] INT
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
	[status] INT
)
CREATE TABLE [Image](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[url] VARCHAR(500),
	product_detail_id INT,
	[status] INT
)


CREATE TABLE Commune(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	district_id INT,
	province_id INT
)
CREATE TABLE District (
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	province_id INT
)
CREATE TABLE Province(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	province_code INT
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
	[password] VARCHAR(100),
	email VARCHAR(100),
	phone VARCHAR(20),
	birthday DATE,
	gender INT,
	address_id INT,
	[status] INT
)
GO
INSERT INTO Customer([name]) VALUES ('Khách lẻ')
GO



CREATE TABLE CartDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_id INT,
	quantity INT,
)
CREATE TABLE Cart(
	id INT IDENTITY(1,1) PRIMARY KEY,
	cart_detail_id INT,
	customer_id INT
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
	phone VARCHAR(30),
	address_id INT,
	username VARCHAR(100),
	[password] VARCHAR(100),
	role_id INT,
	[status] INT
)

	



CREATE TABLE Voucher(
	id INT IDENTITY(1,1) PRIMARY KEY,
	code VARCHAR(10),
	[name] NVARCHAR(100),
	[type] INT,
	[value] FLOAT,
	[start_date] DATETIME,
	[end_date] DATETIME,
	[status] INT
)
CREATE TABLE [Order](
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	[user_id] INT,
	date_create DATETIME,
	total_price INT,
	transport_fee INT,
	[description] NVARCHAR(100),
	voucher_id INT,
	discount_price INT,
	final_price INT
)
CREATE TABLE OrderDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_id INT,
	order_id INT,
	quantity INT,
	price INT
)
CREATE TABLE Review(
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	product_detail_id INT,
	point INT,
	comment NVARCHAR(500)
)