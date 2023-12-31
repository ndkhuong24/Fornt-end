﻿--PROCEDURE INSERT PRODUCT
CREATE PROCEDURE PostProduct
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

--PROCEDURE GET Product
CREATE PROCEDURE GetProduct
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
--PROCEDURE Update Product
CREATE PROCEDURE UpdateProduct
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


--PROCEDURE Delete Product
CREATE PROCEDURE DeleteProduct
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
		PRINT N'Tên đã tồn tại trong bảng.';
	END
END

--PROCEDURE GET Product By Name 
CREATE PROCEDURE SearchProductByName
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

SELECT * FROM Product 

DELETE FROM Product WHERE id=15	

DROP PROCEDURE SearchProductByName

EXEC SearchProductByName @searchPattern='H'

DELETE FROM Product WHERE id=15	
