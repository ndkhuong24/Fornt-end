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

CREATE PROCEDURE [dbo].[UpdateUser]
    @Id INT,
    @FullName NVARCHAR(255),
    @Email NVARCHAR(255),
    @Gender INT,
    @PhoneNumber NVARCHAR(20)
AS
BEGIN
    UPDATE [Users]
    SET
        fullname = @FullName,
        email = @Email,
        gender = @Gender,
        phone_number = @PhoneNumber
    WHERE
        id = @Id;
END;
