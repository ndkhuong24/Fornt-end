CREATE PROCEDURE GetAddressByUserID @UserID INT AS BEGIN
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

CREATE PROCEDURE GetAddressByUserID 
	@UserID INT 
AS 
BEGIN
	SELECT
		[Address].id as AddressID,
		[Address].province_id as ProvinceID,
		Province.ProvinceName as ProvinceName,
		[Address].district_id as DistrictID,
		District.DistrictName as DistrictName,
		[Address].commune_id as CommuneID,
		Commune.CommuneName as CommuneName,
		[Address].detail_address,
		[Address].[status]
	FROM
		[Address] JOIN Users ON [Address].user_id=Users.id
		JOIN Province ON [Address].province_id=Province.ProvinceID
		JOIN District ON [Address].district_id=District.DistrictID
		JOIN Commune ON [Address].commune_id=Commune.CommuneID
	WHERE 
		Users.id=@UserID
END;

CREATE PROCEDURE UpdateAddressDefault
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

CREATE PROCEDURE InsertAddress
(
  @ProvinceID NVARCHAR(100),
  @ProvinceName NVARCHAR(100),
  @DistrictID NVARCHAR(100),
  @DistrictName NVARCHAR(100),
  @CommuneID NVARCHAR(100),
  @CommuneName NVARCHAR(100),
  @DetailAddress NVARCHAR(255),
  @Status INT,
  @UserID INT
)
AS
BEGIN
    BEGIN TRANSACTION

    -- Check if there is a duplicate entry based on specified conditions
    IF EXISTS (
        SELECT 1
        FROM [Address]
        WHERE detail_address = @DetailAddress
          AND user_id = @UserID
          AND province_id = @ProvinceID
          AND district_id = @DistrictID
          AND commune_id = @CommuneID
    )
    BEGIN
        -- Rollback the transaction if there is a duplicate entry
        ROLLBACK;
        PRINT N'Đã tồn tại địa chỉ này, vui lòng chọn một địa chỉ khác';
        RETURN; -- Exit the stored procedure
    END

    -- Check the value of @Status
    IF @Status = 1
    BEGIN
        -- Update existing addresses with the same user_id to set status to 0
        UPDATE [Address]
		SET [status] = 0
		WHERE user_id = @UserID;

        -- Check if the update was successful
        IF @@ERROR = 0
        BEGIN
            -- Insert the new address
            INSERT INTO [Address] ([user_id], detail_address, province_id, district_id, commune_id, [status])
            VALUES (@UserID, @DetailAddress, @ProvinceID, @DistrictID, @CommuneID, @Status);
        END
        ELSE
        BEGIN
            -- Rollback the transaction if the update fails
            ROLLBACK;
            PRINT 'Update failed. Transaction rolled back.';
            RETURN; -- Exit the stored procedure
        END
    END
    ELSE
    BEGIN
        -- Insert the new address
		INSERT INTO [Address] ([user_id], detail_address, province_id, district_id, commune_id, [status])
		VALUES (@UserID, @DetailAddress, @ProvinceID, @DistrictID, @CommuneID, @Status);
    END;

    -- Insert Province if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM Province WHERE ProvinceID = @ProvinceID)
    BEGIN
        INSERT INTO Province (ProvinceID, ProvinceName)
        VALUES (@ProvinceID, @ProvinceName);
    END

    -- Insert District if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM District WHERE DistrictID = @DistrictID)
    BEGIN
        INSERT INTO District (DistrictID, DistrictName)
        VALUES (@DistrictID, @DistrictName);
    END

    -- Insert Commune if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM Commune WHERE CommuneID = @CommuneID)
    BEGIN
        INSERT INTO Commune (CommuneID, CommuneName)
        VALUES (@CommuneID, @CommuneName);
    END

    -- Commit the transaction if everything is successful
    COMMIT;
END;

CREATE PROCEDURE DeleteAddress
    @AddressID INT,
    @UserID INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Kiểm tra xem địa chỉ có tồn tại không trước khi xóa
        IF EXISTS (SELECT 1 FROM [Address] WHERE id = @AddressID AND user_id = @UserID)
        BEGIN
            -- Xóa địa chỉ từ bảng address
            DELETE FROM [Address] WHERE id = @AddressID AND user_id = @UserID;
            PRINT N'Dữ liệu đã được xóa thành công.';
        END
        ELSE
        BEGIN
            PRINT N'Không tìm thấy địa chỉ cần xóa.';
        END
    END TRY
    BEGIN CATCH
        PRINT N'Đã xảy ra lỗi khi xóa dữ liệu.';
    END CATCH
END;

CREATE PROCEDURE GetAddressById
    @AddressID INT
AS
BEGIN
    BEGIN TRY
        SET NOCOUNT ON;
        BEGIN TRANSACTION;

        DECLARE @AddressCount INT;

        SELECT 
            @AddressCount = COUNT(*)
        FROM 
            [Address]
        WHERE 
            [Address].id = @AddressID;

        IF @AddressCount > 0
        BEGIN
            SELECT 
                *
            FROM 
                [Address]
            WHERE 
                [Address].id = @AddressID;
        END
        ELSE
        BEGIN
            -- Thông báo khi không tìm thấy địa chỉ
            PRINT N'Không tìm thấy địa chỉ với ID ' + CAST(@AddressID AS NVARCHAR(MAX));
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW;
    END CATCH
END

CREATE PROCEDURE UpdateDetailAddress
(
    @AddressID INT,
    @NewProvinceID VARCHAR(50),
    @NewProvinceName NVARCHAR(100),
    @NewDistrictID VARCHAR(50),
    @NewDistrictName NVARCHAR(100),
    @NewCommuneID VARCHAR(50),
    @NewCommuneName NVARCHAR(100),
    @NewDetailAddress NVARCHAR(MAX)
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Kiểm tra xem @AddressID có tồn tại hay không
        IF NOT EXISTS (SELECT 1 FROM [Address] WHERE id = @AddressID)
        BEGIN
            ROLLBACK;
            THROW 51000, N'ID này không tồn tại', 1;
        END

        -- Đặt các địa chỉ khác của người dùng thành không phải mặc định
        UPDATE [Address]
        SET province_id = @NewProvinceID,
            district_id = @NewDistrictID,
            commune_id = @NewCommuneID,
            detail_address = @NewDetailAddress
        WHERE id = @AddressID;

        -- Insert Province if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM Province WHERE ProvinceID = @NewProvinceID)
        BEGIN
            INSERT INTO Province (ProvinceID, ProvinceName)
            VALUES (@NewProvinceID, @NewProvinceName);
        END

        -- Insert District if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM District WHERE DistrictID = @NewDistrictID)
        BEGIN
            INSERT INTO District (DistrictID, DistrictName)
            VALUES (@NewDistrictID, @NewDistrictName);
        END

        -- Insert Commune if it doesn't exist
        IF NOT EXISTS (SELECT 1 FROM Commune WHERE CommuneID = @NewCommuneID)
        BEGIN
            INSERT INTO Commune (CommuneID, CommuneName)
            VALUES (@NewCommuneID, @NewCommuneName);
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;
        THROW;
    END CATCH;
END;