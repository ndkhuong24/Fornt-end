-- Dữ liệu cho bảng Style
INSERT INTO Style (name)
VALUES ('Classic/Minimalist'), ('Retro/Vintage'), ('Athleisure'), ('Streetwear'), ('Techwear'), ('Chunky/Dad Sneakers'),
       ('High Fashion'), ('Collaboration'), ('Vegan/Friendly'), ('Custom/Personalized'), ('Limited Edition'), ('Futuristic')

-- Dữ liệu cho bảng Category
INSERT INTO Category (name)
VALUES ('Athletic Sneakers'), ('Streetwear Sneakers'), ('Skate Shoes'), ('Basketball Shoes'),
       ('Performance Sneakers'), ('High Top Sneakers'), ('Retro Sneakers'), ('Low Top Sneakers'), ('Vegan')

-- Dữ liệu cho bảng Brand
INSERT INTO Brand (name)
VALUES ('Jordan'), ('Asics'), ('Converse'), ('New Balance'), ('Puma'), ('Vans'), ('Adidas'), ('Nike')

-- Dữ liệu cho bảng Product
INSERT INTO Product (code, [name], style_id, brand_id, category_id, [description])
VALUES 
    ('ABC123', 'Classic Sneaker 1', 1, 2, 8, 'A classic and minimalist sneaker with a timeless design.'),
    ('DEF456', 'Vintage Runner', 2, 4, 1, 'A retro-style running shoe with vintage vibes.'),
    ('GHI789', 'Street Style Icon', 4, 7, 2, 'Perfect for streetwear enthusiasts who want a trendy look.'),
    ('JKL012', 'Techwear Explorer', 5, 6, 5, 'Built with advanced technology for high-performance activities.'),
    ('MNO345', 'Dad Sneak Supreme', 6, 5, 3, 'Embrace the chunky sneaker trend with this dad-style sneaker.'),
    ('PQR678', 'High Fashion Elegance', 7, 8, 7, 'A high-fashion sneaker designed for elegance and style.'),
    ('STU901', 'Collaboration Edition', 8, 1, 9, 'A limited edition sneaker created in collaboration with a famous artist.'),
    ('VWX234', 'Vegan Friendly Runner', 9, 4, 1, 'A running shoe made from vegan-friendly materials.'),
    ('YZA567', 'Customized Classic', 10, 3, 8, 'Customize your style with this classic sneaker.'),
    ('BCD890', 'Limited Edition Street', 11, 7, 2, 'A limited edition streetwear sneaker with unique features.'),
    ('EFG123', 'Futuristic Tech Sneak', 12, 2, 5, 'Step into the future with this futuristic tech sneaker.');

-- Dữ liệu cho bảng Size
INSERT INTO Size ([name])
VALUES ('US 7'), ('US 8'), ('US 9'), ('US 10'), ('US 11');

-- Dữ liệu cho bảng Color
INSERT INTO Color ([name])
VALUES ('Red'), ('Blue'), ('Black'), ('White'), ('Gray');

-- Dữ liệu cho bảng Sole
INSERT INTO Sole ([name])
VALUES ('Rubber'), ('EVA'), ('Foam'), ('Gum');

-- Dữ liệu cho bảng Material
INSERT INTO Material ([name])
VALUES ('Leather'), ('Canvas'), ('Mesh'), ('Synthetic'), ('Knit');

-- Dữ liệu cho bảng ImageChinh
INSERT INTO ImageChinh ([path], product_detail_id)
VALUES ('/images/image (6).jpg', 1)

INSERT INTO ImagePhu ([path], product_detail_id)
VALUES ('/images/image (1).jpg', 1),
       ('/images/image (2).jpg', 1),
       ('/images/image (3).jpg', 1),
       ('/images/image (4).jpg', 1),
       ('/images/image (5).jpg', 1)

INSERT INTO ProductDetail (product_id, size_id, color_id, sole_id, material_id, quantity, price)
VALUES 
    (1, 1, 3, 2, 1, 50, 120),
    (1, 2, 4, 1, 3, 30, 150)
