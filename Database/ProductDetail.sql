--PROCEDURE GET PRODUCT DETAIL
CREATE PROCEDURE GetProductDetail
    @Id INT = NULL
AS
BEGIN
    -- Nếu tham số @Id không null, lấy bản ghi theo ID
    IF @Id IS NOT NULL
    BEGIN
        SELECT * FROM ProductDetail WHERE id = @Id;
    END
    ELSE
    -- Ngược lại, trả về tất cả các bản ghi
    BEGIN
        SELECT PD.id,PD.category_id FROM ProductDetail AS PD JOIN Category AS C ON PD.category_id=C.id
    END
END;

select *from ProductDetail
select*from Category
select*from Style