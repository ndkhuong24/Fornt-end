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
CREATE TABLE [Image](
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] NVARCHAR(100),
	[url] VARCHAR(500),
	product_detail_id INT,
	[status] INT DEFAULT 1
)
CREATE TABLE Commune(
	id INT IDENTITY(1,1) PRIMARY KEY,
	[name] VARCHAR(100),
	district_id INT
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
	detail_address nvarchar(100),
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
	[status] INT DEFAULT 1
)
GO
INSERT INTO Customer([name]) VALUES ('Khách lẻ')
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
	[start_date] DATETIME,
	[end_date] DATETIME,
	[status] INT
)
CREATE TABLE [Order](
	id INT IDENTITY(1,1) PRIMARY KEY,
	customer_id INT,
	[user_id] INT,
	date_create DATETIME DEFAULT GETDATE(),
	total_price INT,
	transport_fee INT,
	[description_order] NVARCHAR(100),
	voucher_id INT,
	discount_price INT DEFAULT 0,
	final_price INT
)
CREATE TABLE OrderDetail(
	id INT IDENTITY(1,1) PRIMARY KEY,
	product_detail_id INT,
	order_id INT,
	quantity INT,
	price INT
)

CREATE PROCEDURE Style_Get
    @Id INT = NULL
AS
BEGIN
    -- Nếu tham số @Id không null, lấy bản ghi theo ID
    IF @Id IS NOT NULL
    BEGIN
        SELECT * FROM Style WHERE Id = @Id;
    END
    ELSE
    -- Ngược lại, trả về tất cả các bản ghi
    BEGIN
        SELECT * FROM Style;
    END
END;

CREATE PROCEDURE Brand_Get
    @Id INT = NULL
AS
BEGIN
    -- Nếu tham số @Id không null, lấy bản ghi theo ID
    IF @Id IS NOT NULL
    BEGIN
        SELECT * FROM Brand WHERE id = @Id;
    END
    ELSE
    -- Ngược lại, trả về tất cả các bản ghi
    BEGIN
        SELECT * FROM Brand;
    END
END;

CREATE PROCEDURE PostStyle
(
	@Name NVARCHAR(100),
	@Status INT = NULL
)
AS
BEGIN
	SET NOCOUNT ON

<<<<<<< HEAD
	-- Kiểm tra xem tên đã tồn tại hay chưa
    IF NOT EXISTS (SELECT 1 FROM Style WHERE name = @Name)
    BEGIN
        -- Nếu tên chưa tồn tại, thực hiện thêm dữ liệu vào bảng
        INSERT INTO Style(name)
        VALUES (@Name);
    END
    ELSE
    BEGIN
        -- Nếu tên đã tồn tại, không thực hiện thêm dữ liệu mới
        PRINT 'Tên đã tồn tại trong bảng Employee.';
    END;
END

EXEC PostStyle @Name='Test'
EXEC PostStyle @Name='Test',@Status='0'
EXEC Style_Get
EXEC Brand_Get

DROP PROCEDURE PostStyle;

Delete from Style where [name]='Test'
=======
	IF @Status IS NOT NULL
    BEGIN
        -- Trường hợp có giá trị cho @Status, kiểm tra xem @Name đã tồn tại hay chưa
        IF NOT EXISTS (SELECT 1 FROM YourTable WHERE Name = @Name)
        BEGIN
            -- Nếu @Name chưa tồn tại, chèn cả hai tham số vào bảng
            INSERT INTO YourTable (Name, Status)
            VALUES (@Name, @Status);
        END
        ELSE
        BEGIN
            -- Nếu @Name đã tồn tại, không thực hiện thêm dữ liệu mới
            PRINT 'Tên đã tồn tại trong bảng.';
        END;
    END
    ELSE
    BEGIN
        -- Trường hợp không có giá trị cho @Status, chỉ chèn @Name vào bảng
        INSERT INTO YourTable (Name)
        VALUES (@Name);
    END
END

EXEC PostStyle @Name='Test'

DROP PROCEDURE PostStyle;
>>>>>>> 82728548dea9a6c9133634eca502eb376d0d3bd7
