CREATE TABLE IF NOT EXISTS productosS(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    names VARCHAR(25) NOT NULL,
    stock INTEGER NOT NULL,
    image VARCHAR(50) NULL
);

INSERT INTO productosS(names, stock, image) VALUES('cocacola', 30, 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT INTO productosS(names, stock, image) VALUES('pepsi', 35, 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT INTO productosS(names, stock, image) VALUES('fanta', 40, 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');
INSERT INTO productosS(names, stock, image) VALUES('sprite', 25, 'https://pbs.twimg.com/profile_images/858987821394210817/oMccbXv6_bigger.jpg');