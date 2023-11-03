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

EXEC GetProductDetail

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
		PD.id,IC.[path],PD.price
	FROM 
		ProductDetail AS PD
		JOIN ImageChinh AS IC ON PD.id=IC.product_detail_id
	WHERE
		PD.id=@Id
END

SELECT*FROM ProductDetail

EXEC SearchProductDetailById @Id='135'