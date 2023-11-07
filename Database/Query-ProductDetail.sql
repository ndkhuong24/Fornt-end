--PROCEDURE GET ProductDetail
CREATE PROCEDURE GetProductDetail
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

CREATE PROCEDURE SearchProductDetailByName
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

CREATE PROCEDURE SearchProductDetailById
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

DROP PROCEDURE SearchProductDetailById

CREATE PROCEDURE GetProductDetailById
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
CREATE PROCEDURE GetImageChinhProductDetail
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
CREATE PROCEDURE GetImagePhuProductDetail
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









CREATE PROCEDURE UpdateProductDetail
(
  @NewId INT,
  @NewQuantity INT,
  @NewPrice INT,
  @NewStatus INT
)
AS
BEGIN
  -- Kiểm tra xem @NewId có tồn tại trong bảng ProductDetail không
  IF EXISTS (SELECT 1 FROM ProductDetail WHERE Id = @NewId)
  BEGIN
    -- Nếu tồn tại, cập nhật thông tin sản phẩm chi tiết
    UPDATE ProductDetail
    SET
      Quantity = @NewQuantity,
      Price = @NewPrice,
      Status = @NewStatus
    WHERE Id = @NewId;
  END
  ELSE
  BEGIN
    -- Nếu không tồn tại, thêm mới sản phẩm chi tiết
    INSERT INTO ProductDetail (Id, Quantity, Price, Status)
    VALUES (@NewId, @NewQuantity, @NewPrice, @NewStatus);
  END
END
