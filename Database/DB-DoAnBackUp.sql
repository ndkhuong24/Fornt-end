USE [master]
GO
/****** Object:  Database [DATN]    Script Date: 12/21/2023 10:11:17 PM ******/
CREATE DATABASE [DATN]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DATN', FILENAME = N'E:\SQLData\DATN.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DATN_log', FILENAME = N'E:\SQLData\DATN_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DATN] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DATN].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DATN] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DATN] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DATN] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DATN] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DATN] SET ARITHABORT OFF 
GO
ALTER DATABASE [DATN] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [DATN] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DATN] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DATN] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DATN] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DATN] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DATN] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DATN] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DATN] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DATN] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DATN] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DATN] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DATN] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DATN] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DATN] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DATN] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DATN] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DATN] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DATN] SET  MULTI_USER 
GO
ALTER DATABASE [DATN] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DATN] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DATN] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DATN] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DATN] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DATN] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DATN', N'ON'
GO
ALTER DATABASE [DATN] SET QUERY_STORE = OFF
GO
USE [DATN]
GO
/****** Object:  User [ttsfpt_2023]    Script Date: 12/21/2023 10:11:18 PM ******/
CREATE USER [ttsfpt_2023] FOR LOGIN [ttsfpt_2023] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [ttsfpt_2023]
GO
/****** Object:  UserDefinedTableType [dbo].[AnhChinhType]    Script Date: 12/21/2023 10:11:18 PM ******/
CREATE TYPE [dbo].[AnhChinhType] AS TABLE(
	[path] [nvarchar](max) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[AnhPhuType]    Script Date: 12/21/2023 10:11:18 PM ******/
CREATE TYPE [dbo].[AnhPhuType] AS TABLE(
	[path] [nvarchar](max) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[OrderDetailType]    Script Date: 12/21/2023 10:11:18 PM ******/
CREATE TYPE [dbo].[OrderDetailType] AS TABLE(
	[product_detail_id] [int] NULL,
	[quantity] [int] NULL,
	[price] [int] NULL
)
GO
/****** Object:  Table [dbo].[Address]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[detail_address] [nvarchar](max) NULL,
	[province_id] [int] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Authority]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Authority](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[role_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CartDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CartDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[product_detail_id] [int] NULL,
	[quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Color]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Color](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Commune]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Commune](
	[CommuneID] [varchar](50) NULL,
	[CommuneName] [nvarchar](200) NULL,
	[DistrictID] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConfirmOrders]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConfirmOrders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NULL,
	[user_id] [int] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[District]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[District](
	[DistrictName] [nvarchar](200) NULL,
	[ProvinceID] [varchar](50) NULL,
	[DistrictID] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImageChinh]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImageChinh](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[path] [nvarchar](max) NULL,
	[product_detail_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImagePhu]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImagePhu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[path] [nvarchar](max) NULL,
	[product_detail_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Material]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Material](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[product_detail_id] [int] NULL,
	[order_id] [int] NULL,
	[quantity] [int] NULL,
	[price] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[date_create] [datetime] NULL,
	[total_price] [int] NULL,
	[transport_fee] [int] NULL,
	[description_order] [nvarchar](100) NULL,
	[voucher_id] [int] NULL,
	[discount_price] [int] NULL,
	[final_price] [int] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [varchar](20) NULL,
	[name] [varchar](500) NULL,
	[style_id] [int] NULL,
	[description] [nvarchar](500) NULL,
	[create_date] [datetime] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetail](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[category_id] [int] NULL,
	[brand_id] [int] NULL,
	[product_id] [int] NULL,
	[size_id] [int] NULL,
	[color_id] [int] NULL,
	[sole_id] [int] NULL,
	[material_id] [int] NULL,
	[quantity] [int] NULL,
	[price] [int] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Province]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Province](
	[ProvinceName] [nvarchar](200) NULL,
	[ProvinceID] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Review]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Review](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[product_detail_id] [int] NULL,
	[point] [int] NULL,
	[comment] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Size]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Size](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sole]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sole](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Style]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Style](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fullname] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[gender] [int] NULL,
	[phone_number] [nvarchar](20) NULL,
	[username] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[status] [int] NULL,
	[token] [nvarchar](255) NULL,
	[tokencreationdate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Voucher]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Voucher](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [varchar](10) NULL,
	[name] [nvarchar](100) NULL,
	[type] [int] NULL,
	[value] [float] NULL,
	[maximum_value] [int] NULL,
	[condition_value] [int] NULL,
	[quantity] [int] NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Brand] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Category] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Color] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Material] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [date_create]
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT ((0)) FOR [discount_price]
GO
ALTER TABLE [dbo].[Product] ADD  DEFAULT (getdate()) FOR [create_date]
GO
ALTER TABLE [dbo].[Product] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[ProductDetail] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Size] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Sole] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Style] ADD  DEFAULT ((1)) FOR [status]
GO
/****** Object:  StoredProcedure [dbo].[DeleteProduct]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteProduct]
(
	@Id INT
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF EXISTS (SELECT 1 FROM Product WHERE id = @Id)
	BEGIN
	-- Nếu Id tồn tại trong Table, thì sẽ xóa
	DELETE FROM Product WHERE id=@Id
	END
	ELSE
	BEGIN
		-- Nếu tên không tồn tại, không thực hiện xóa
		PRINT 'Tên đã tồn tại trong bảng.';
	END
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteStyle]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteStyle]
(
	@Id INT
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF EXISTS (SELECT 1 FROM Style WHERE id = @Id)
	BEGIN
	-- Nếu Id tồn tại trong Table, thì sẽ xóa
	DELETE FROM Style WHERE id=@Id
	END
	ELSE
	BEGIN
		-- Nếu tên không tồn tại, không thực hiện xóa
		PRINT 'Tên đã tồn tại trong bảng.';
	END
END
GO
/****** Object:  StoredProcedure [dbo].[GetAddressByUserID]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAddressByUserID] @UserID INT AS BEGIN
SELECT
	[Address].id AS AddressID,
	Province.ProvinceID AS ProvinceID,
	Province.ProvinceName AS ProvinceName,
	District.DistrictID AS DistrictID,
	District.DistrictName AS DistrictName,
	Commune.CommuneID AS CommuneID,
	Commune.CommuneName AS CommuneName,
	[Address].detail_address,
	[Address].[status]
FROM
	[Address]
	JOIN Users ON [Address].user_id = Users.id
	JOIN Province ON [Address].province_id = Province.ProvinceID
	JOIN District ON Province.ProvinceID = District.ProvinceID
	JOIN Commune ON District.DistrictID = Commune.DistrictID
WHERE
	Users.id = @UserID
END;
GO
/****** Object:  StoredProcedure [dbo].[GetAllProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllProductDetail]
AS
BEGIN
	SELECT 
		PD.id AS ProductDetailID,IC.[path] AS Path,P.[name] AS ProductName,C.[name] AS CategoryName,B.[name] AS BrandName,S.[name] AS SizeName,Cl.[name] AS ColorName,Sol.[name] AS SoleName,M.[name] AS MaterialName
	FROM 
		ProductDetail AS PD
		JOIN Product AS P ON PD.product_id=P.id 
		JOIN Category AS C ON C.id=PD.category_id
		JOIN Brand AS B ON B.id=PD.brand_id
		JOIN Size AS S ON S.id=PD.size_id
		JOIN Color AS Cl ON Cl.id=PD.color_id
		JOIN Sole AS Sol ON Sol.id=PD.sole_id
		JOIN Material AS M ON M.id=PD.material_id
		JOIN ImageChinh AS IC ON PD.id=IC.product_detail_id
END
GO
/****** Object:  StoredProcedure [dbo].[GetCustomerById]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetCustomerById]
    @Id INT = NULL
AS
BEGIN
    IF @Id IS NOT NULL
    BEGIN
        SELECT id,fullname,email,gender,phone_number FROM [Users] WHERE id = @Id;
    END
    ELSE
    BEGIN
        SELECT id,fullname,email,gender,phone_number FROM [Users];
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[GetImageChinhProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetImageChinhProductDetail]
    @Id INT
AS
BEGIN
    SELECT
		ProductDetail.id,ImageChinh.[path]
	FROM
		ProductDetail JOIN ImageChinh ON ProductDetail.id= ImageChinh.product_detail_id
	WHERE 
		ProductDetail.id=@Id
END;
GO
/****** Object:  StoredProcedure [dbo].[GetImagePhuProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetImagePhuProductDetail]
    @Id INT
AS
BEGIN
    SELECT
		ProductDetail.id,ImagePhu.[path]
	FROM
		ProductDetail JOIN ImagePhu ON ProductDetail.id= ImagePhu.product_detail_id
	WHERE 
		ProductDetail.id=@Id
END;
GO
/****** Object:  StoredProcedure [dbo].[GetProduct]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProduct]
    @Id INT = NULL
AS
BEGIN
    -- Nếu tham số @Id không null, lấy bản ghi theo ID
    IF @Id IS NOT NULL
    BEGIN
        SELECT * FROM Product WHERE id = @Id;
    END
    ELSE
    -- Ngược lại, trả về tất cả các bản ghi
    BEGIN
        SELECT * FROM Product;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[GetProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProductDetail]
    @Id INT = NULL
AS
BEGIN
    -- Nếu tham số @Id không null, lấy bản ghi theo ID
    IF @Id IS NOT NULL
    BEGIN
        SELECT
			PD.id AS ProductID,IC.[path] AS Path,P.[name] AS ProductName,S.[name] AS StyleName,PD.quantity AS Quantity,PD.price AS Price,PD.[status] AS Status
		FROM
			ProductDetail AS PD
			JOIN ImageChinh AS IC ON PD.id=IC.product_detail_id
			JOIN Product AS P ON PD.product_id=P.id
			JOIN Style AS S ON S.id=P.style_id
		WHERE 
			PD.id = @Id
    END
    ELSE
    -- Ngược lại, trả về tất cả các bản ghi
    BEGIN
        SELECT
			PD.id AS ProductID,IC.[path] AS Path,P.[name] AS ProductName,S.[name] AS StyleName,PD.quantity AS Quantity,PD.price AS Price,PD.[status] AS Status
		FROM
			ProductDetail AS PD
			JOIN ImageChinh AS IC ON PD.id=IC.product_detail_id
			JOIN Product AS P ON PD.product_id=P.id
			JOIN Style AS S ON S.id=P.style_id
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[GetProductDetailAndCart]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetProductDetailAndCart](
	@Id INT
)
AS
BEGIN
	SELECT 
		PD.id AS ProductDetailID,P.code AS ProductCode,P.[name] AS ProductName,P.[description] AS ProductDescription,Sl.[name] AS StyleName,C.[name] AS CategoryName,B.[name] AS BrandName,S.[name] AS SizeName,Cl.[name] AS ColorName,Sol.[name] AS SoleName,M.[name] AS MaterialName,PD.quantity AS Quantity,PD.price AS Price,PD.[status]
	FROM 
		ProductDetail AS PD
		JOIN Product AS P ON PD.product_id=P.id 
		JOIN Style AS Sl ON P.style_id=Sl.id
		JOIN Category AS C ON C.id=PD.category_id
		JOIN Brand AS B ON B.id=PD.brand_id
		JOIN Size AS S ON S.id=PD.size_id
		JOIN Color AS Cl ON Cl.id=PD.color_id
		JOIN Sole AS Sol ON Sol.id=PD.sole_id
		JOIN Material AS M ON M.id=PD.material_id
	WHERE PD.id=@Id
END
GO
/****** Object:  StoredProcedure [dbo].[GetProductDetailById]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetProductDetailById]
    @Id INT
AS
BEGIN
    SELECT
		PD.id AS ID,C.[name] AS CategoryName,B.[name] AS BrandName,P.[name] AS ProductName,S.[name] AS SizeName,Cl.[name] AS ColorName,Sl.[name] AS SoleName
	FROM
		ProductDetail AS PD
		JOIN Category AS C ON PD.category_id=C.id
		JOIN Brand AS B ON PD.brand_id=B.id
		JOIN Product AS P ON PD.product_id=P.id
		JOIN Size AS S ON PD.size_id=S.id
		JOIN Color AS Cl ON PD.color_id=Cl.id
		JOIN Sole AS Sl ON PD.sole_id=Sl.id
	WHERE 
		PD.id = @Id
END;
GO
/****** Object:  StoredProcedure [dbo].[GetStyleByName]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetStyleByName]
	@Name NVARCHAR(250)
AS
BEGIN
    SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF EXISTS (SELECT 1 FROM Style WHERE [name] = @Name)
	BEGIN
	-- Nếu Id tồn tại trong Table, thì sẽ xóa
	SELECT * FROM Style WHERE [name] = @Name
	END
	ELSE
	BEGIN
		-- Nếu tên không tồn tại, không thực hiện xóa
		PRINT 'Tên đã tồn tại trong bảng.';
	END
END;
GO
/****** Object:  StoredProcedure [dbo].[GetVoucherActivity]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetVoucherActivity](
    @NewCondition INT
)
AS
BEGIN
    SELECT 
        *
    FROM 
        [Voucher]
    WHERE 
        [start_date] <= GETDATE()
        AND [end_date] >= GETDATE()
        AND quantity > 0
        AND @NewCondition > Voucher.condition_value -- Sử dụng tên cột mới
END
GO
/****** Object:  StoredProcedure [dbo].[InsertOrderAndOrderDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertOrderAndOrderDetail]
	@CustomerID INT,
	@UserID INT,
	@TotalPrice INT,
	@TranSportFee INT,
	@Description NVARCHAR(500),
	@VoucherID INT,
	@DiscountPrice INT,
	@FinalPrice INT,
	@Status INT,
	@OrderDetail OrderDetailType READONLY
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		DECLARE @OrderID INT

		INSERT INTO Orders(customer_id,[user_id],total_price,transport_fee,description_order,voucher_id,discount_price,final_price,[status])
		VALUES (@CustomerID,@UserID,@TotalPrice,@TranSportFee,@Description,@VoucherID,@DiscountPrice,@FinalPrice,@Status);

		SET @OrderID = SCOPE_IDENTITY();

		INSERT INTO OrderDetail (product_detail_id,order_id,quantity,price)
		SELECT [product_detail_id],@OrderID,[quantity],[price]
		FROM @OrderDetail

		COMMIT;
		
		PRINT N'Chèn dữ liệu thành công'
	END TRY
	BEGIN CATCH
		ROLLBACK;
		PRINT N'Đã xảy ra lỗi trong quá trình chèn dữ liệu';
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[InsertProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertProductDetail]
    @CategoryID INT,
    @BrandID INT,
    @ProductID INT,
    @SizeID INT,
    @ColorID INT,
    @SoleID INT,
    @MaterialID INT,
    @Quantity INT,
    @Price INT,
    @ImageAnhChinh AnhChinhType READONLY, -- Tham số cho danh sách các ảnh 
	@ImageAnhPhu AnhPhuType READONLY -- Tham số cho danh sách các ảnh 
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION; -- Bắt đầu giao dịch

        DECLARE @ProductDetailID INT;

        -- Chèn dữ liệu vào bảng ProductDetail và lấy ID của bản ghi vừa chèn
        INSERT INTO ProductDetail (category_id, brand_id, product_id, size_id, color_id, sole_id, material_id, quantity, price)
        VALUES (@CategoryID, @BrandID, @ProductID, @SizeID, @ColorID, @SoleID, @MaterialID, @Quantity, @Price);

        SET @ProductDetailID = SCOPE_IDENTITY();

		INSERT INTO ImageChinh ([path],product_detail_id)
		SELECT [path],@ProductDetailID
		FROM @ImageAnhChinh

		INSERT INTO ImagePhu([path],product_detail_id)
		SELECT [path],@ProductDetailID
		FROM @ImageAnhPhu

       /* -- Chèn dữ liệu từ bảng tạm thời @Images vào bảng Image
        INSERT INTO [Image] ([name], [url], product_detail_id, [status])
        SELECT [name], [url], @ProductDetailID, [status]
        FROM @Images; */   

        COMMIT; -- Hoàn thành giao dịch

        -- Thông báo thành công nếu cần
        PRINT N'Chèn dữ liệu thành công.';
    END TRY
    BEGIN CATCH
        ROLLBACK; -- Quay lại trạng thái an toàn nếu có lỗi
        PRINT N'Đã xảy ra lỗi trong quá trình chèn dữ liệu.';
        -- Thực hiện các xử lý hoặc ghi log lỗi ở đây nếu cần
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[PostProduct]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--PROCEDURE INSERT PRODUCT
CREATE PROCEDURE [dbo].[PostProduct]
(
	@Code VARCHAR(20),
	@Name NVARCHAR(100),
	@Style_id INT,
	@Description NVARCHAR(500),
	@Status INT = NULL
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF NOT EXISTS (SELECT 1 FROM Product WHERE [name] = @Name)
	BEGIN
	-- Nếu tên chưa tồn tại, thực hiện thêm dữ liệu vào bảng
	INSERT INTO Product(code,[name],style_id,[description],[status])
	VALUES (@Code,@Name,@Style_id,@Description,@Status);
	END
	ELSE
	BEGIN
		-- Nếu tên đã tồn tại, không thực hiện thêm dữ liệu mới
		PRINT 'Tên đã tồn tại trong bảng.';
	END
END
GO
/****** Object:  StoredProcedure [dbo].[PostStyle]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PostStyle]
(
	@Name NVARCHAR(100),
	@Status INT = NULL
)
AS
BEGIN
	SET NOCOUNT ON

	-- Kiểm tra xem tên đã tồn tại hay chưa
	IF NOT EXISTS (SELECT 1 FROM Style WHERE name = @Name)
	BEGIN
	-- Nếu tên chưa tồn tại, thực hiện thêm dữ liệu vào bảng
	INSERT INTO Style(name,status)
	VALUES (@Name,@Status);
	END
	ELSE
	BEGIN
		-- Nếu tên đã tồn tại, không thực hiện thêm dữ liệu mới
			PRINT 'Tên đã tồn tại trong bảng.';
		END
END
GO
/****** Object:  StoredProcedure [dbo].[SearchProductByName]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchProductByName]
    @searchPattern NVARCHAR(255)
AS
BEGIN
    -- Tạo một tạm thời bảng để lưu kết quả tìm kiếm
    CREATE TABLE #SearchResults (
        id INT,
		code VARCHAR(20),
		[name] VARCHAR(500),
		style_id INT,
		[description] NVARCHAR(500),
		create_date DATETIME,
		[status] INT
    );

    -- Thực hiện tìm kiếm và chèn kết quả vào bảng tạm thời
    INSERT INTO #SearchResults (id, code, [name],style_id,[description],create_date,[status])
    SELECT id, code, [name],style_id,[description],create_date,[status]
    FROM Product
    WHERE [name] LIKE '%' + @searchPattern + '%';

    -- Trả về kết quả từ bảng tạm thời
    SELECT * FROM #SearchResults;

    -- Xóa bảng tạm thời sau khi sử dụng
    DROP TABLE #SearchResults;
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchProductDetailById]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchProductDetailById]
	@Id INT
AS
BEGIN 
	SELECT
		PD.id,P.name,IC.[path],PD.price,PD.quantity,PD.[status]
	FROM 
		ProductDetail AS PD
		JOIN ImageChinh AS IC ON PD.id=IC.product_detail_id
		JOIN Product AS P ON PD.product_id=P.id
	WHERE
		PD.id=@Id
END
GO
/****** Object:  StoredProcedure [dbo].[SearchProductDetailByName]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchProductDetailByName]
    @searchPattern NVARCHAR(255)
AS
BEGIN
    -- Tạo một tạm thời bảng để lưu kết quả tìm kiếm
    CREATE TABLE #SearchResults (
        ProductID INT,
		[Path] NVARCHAR(250),
		ProductName NVARCHAR(250),
		StyleName NVARCHAR(250),
		Quantity INT,
		Price INT,
		[status] INT
	);

    -- Thực hiện tìm kiếm và chèn kết quả vào bảng tạm thời
    INSERT INTO #SearchResults (ProductID, [Path], ProductName,StyleName,Quantity,Price,[status])
    SELECT
			PD.id AS ProductID,IC.[path] AS Path,P.[name] AS ProductName,S.[name] AS StyleName,PD.quantity AS Quantity,PD.price AS Price,PD.[status] AS Status
		FROM
			ProductDetail AS PD
			JOIN ImageChinh AS IC ON PD.id=IC.product_detail_id
			JOIN Product AS P ON PD.product_id=P.id
			JOIN Style AS S ON S.id=P.style_id
		WHERE
			P.[name] LIKE '%' + @searchPattern + '%';

    -- Trả về kết quả từ bảng tạm thời
    SELECT * FROM #SearchResults;

    -- Xóa bảng tạm thời sau khi sử dụng
    DROP TABLE #SearchResults;
END;
GO
/****** Object:  StoredProcedure [dbo].[SearchStylesByName]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SearchStylesByName]
    @searchPattern NVARCHAR(255)
AS
BEGIN
    -- Tạo một tạm thời bảng để lưu kết quả tìm kiếm
    CREATE TABLE #SearchResults (
        id INT,
        [name] NVARCHAR(255),
        [status] INT
    );

    -- Thực hiện tìm kiếm và chèn kết quả vào bảng tạm thời
    INSERT INTO #SearchResults (id, [name], [status])
    SELECT id, [name], [status]
    FROM Style
    WHERE Name LIKE '%' + @searchPattern + '%';

    -- Trả về kết quả từ bảng tạm thời
    SELECT * FROM #SearchResults;

    -- Xóa bảng tạm thời sau khi sử dụng
    DROP TABLE #SearchResults;
END;
GO
/****** Object:  StoredProcedure [dbo].[Style_Get]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Style_Get]
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
GO
/****** Object:  StoredProcedure [dbo].[Style_Get_Active]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Style_Get_Active]
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
        SELECT * FROM Style WHERE [status]=1;
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateAddressDefault]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateAddressDefault]
(
	@AddressID INT,
	@UserID INT
)
AS
BEGIN
	BEGIN TRY
		BEGIN TRANSACTION;

		-- Kiểm tra xem @AddressID có tồn tại hay không
		IF NOT EXISTS (SELECT 1 FROM [Address] WHERE id = @AddressID AND user_id = @UserID)
		BEGIN
			-- @AddressID không tồn tại, hủy bỏ giao dịch
			ROLLBACK;
			THROW 51000, 'AddressID does not exist for the specified UserID.', 1;
		END

		-- Cập nhật địa chỉ được chỉ định thành mặc định
		UPDATE [Address]
		SET [status] = 1
		WHERE id = @AddressID AND user_id = @UserID;

		-- Đặt các địa chỉ khác của người dùng thành không phải mặc định
		UPDATE [Address]
		SET [status] = 0
		WHERE id != @AddressID AND user_id = @UserID;

		COMMIT;
	END TRY
	BEGIN CATCH
		-- Có lỗi xảy ra, quay lại giao dịch
		IF @@TRANCOUNT > 0
			ROLLBACK;

		-- Chuyển tiếp lỗi
		THROW;
	END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProduct]
    @Id INT,
    @NewCode VARCHAR(20),
	@NewName NVARCHAR(100),
	@NewStyleId INT,
	@NewDescription NVARCHAR(500),
	@NewStatus INT
AS
BEGIN
    -- Kiểm tra xem Id truyền vào có tồn tại trong bảng Style không
    IF EXISTS (SELECT 1 FROM Product WHERE id = @Id)
    BEGIN
        -- Thực hiện cập nhật Style
        UPDATE Product
        SET code = @NewCode,[name]=@NewName,style_id=@NewStyleId,[description]=@NewDescription,[status]=@NewStatus
        WHERE Id = @Id;

        PRINT 'Cập nhật thành công';
    END
    ELSE
    BEGIN
        PRINT 'Id không tồn tại trong bảng';
    END
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateProductDetail]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProductDetail]
(
  @NewId INT,
  @NewQuantity INT,
  @NewPrice INT,
  @NewStatus INT
)
AS
BEGIN
    UPDATE ProductDetail
    SET
      quantity = @NewQuantity,
      price = @NewPrice,
      [status] = @NewStatus
    WHERE id = @NewId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateStyle]    Script Date: 12/21/2023 10:11:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateStyle]
    @Id INT,
    @NewName NVARCHAR(100), -- Đổi tên Style mới
	@NewStatus INT
AS
BEGIN
    -- Kiểm tra xem Id truyền vào có tồn tại trong bảng Style không
    IF EXISTS (SELECT 1 FROM Style WHERE Id = @Id)
    BEGIN
        -- Thực hiện cập nhật Style
        UPDATE Style
        SET [name] = @NewName,[status]=@NewStatus
        WHERE Id = @Id;

        PRINT 'Cập nhật Style thành công';
    END
    ELSE
    BEGIN
        PRINT 'Id không tồn tại trong bảng Style';
    END
END;
GO
USE [master]
GO
ALTER DATABASE [DATN] SET  READ_WRITE 
GO
