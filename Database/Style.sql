--PROCEDURE GET Style
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
--PROCEDURE INSERT Style
CREATE PROCEDURE PostStyle
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
--PROCEDURE Delete from Style
CREATE PROCEDURE DeleteStyle
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
--PROCEDURE Update Style
CREATE PROCEDURE UpdateStyle
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

--INSERT Style
EXEC PostStyle @Name='Classic Sneakers',@Status='1'
EXEC PostStyle @Name='Retro Sneakers',@Status='1'
EXEC PostStyle @Name='Running Sneakers',@Status='1'
EXEC PostStyle @Name='Skateboard Sneakers',@Status='1'
EXEC PostStyle @Name='High-Top Sneakers',@Status='1'
EXEC PostStyle @Name='Low-Top Sneakers',@Status='1'
EXEC PostStyle @Name='Fashion Sneakers',@Status='1'
EXEC PostStyle @Name='Dad Sneakers',@Status='1'
EXEC PostStyle @Name='Test',@Status=''

DROP PROCEDURE PostStyle;

