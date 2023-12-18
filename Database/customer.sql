-- User
CREATE PROCEDURE GetCustomerById
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

EXEC GetCustomerById @Id=1