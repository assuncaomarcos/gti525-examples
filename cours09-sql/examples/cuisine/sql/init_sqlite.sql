CREATE TABLE dishes (
  id     INTEGER PRIMARY KEY,
  name   VARCHAR(80) NOT NULL,
  veg    INTEGER(1) NOT NULL,
  photo  VARCHAR(200) NOT NULL
);

CREATE TABLE items (
  id    INTEGER PRIMARY KEY,
  name  VARCHAR(80) NOT NULL
);

CREATE TABLE ingredients (
  dish_id   INTEGER NOT NULL REFERENCES dishes(id),
  item_id   INTEGER NOT NULL REFERENCES items(id),
  quantity  FLOAT DEFAULT 1,
  unit      VARCHAR(30) NOT NULL
);

CREATE TABLE directions (
    dish_id   INTEGER NOT NULL REFERENCES dishes(id),
    step_id   INTEGER NOT NULL,
    description   TEXT,
    PRIMARY KEY (dish_id, step_id)
);

INSERT INTO items VALUES (1, 'fettucine');
INSERT INTO items VALUES (2, 'beurre');
INSERT INTO items VALUES (3, 'bacon');
INSERT INTO items VALUES (4, 'ail');
INSERT INTO items VALUES (5, 'poivre noir');
INSERT INTO items VALUES (6, 'crème liquide');
INSERT INTO items VALUES (7, 'oeufs');
INSERT INTO items VALUES (8, 'parmesan râpé');
INSERT INTO items VALUES (9, 'pecorino romano');
INSERT INTO items VALUES (10, 'ciboulette hachée');
INSERT INTO items VALUES (11, 'pignons de pin grillé');
INSERT INTO items VALUES (12, 'basilique');
INSERT INTO items VALUES (13, 'huile d''olive');
INSERT INTO items VALUES (14, 'spaguetti');

INSERT INTO dishes VALUES (1, 'Fettucine carbonara', 0, 'https://img.taste.com.au/yeaSrH46/w643-h428-cfill-q90/taste/2016/11/creamy-fettuccine-carbonara-105940-1.jpeg');
INSERT INTO dishes VALUES (2, 'Spaghettis au pesto', 1, 'https://assets.afcdn.com/recipe/20150828/19205_w768h583c1cx2048cy3072.webp');
INSERT INTO dishes VALUES (3, 'Fettuchine alfredo', 1, 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg');

INSERT INTO ingredients VALUES (1, 1, 500, 'g');
INSERT INTO ingredients VALUES (1, 2, 60, 'g');
INSERT INTO ingredients VALUES (1, 3, 6, 'tranche');
INSERT INTO ingredients VALUES (1, 4, 1, 'gousse');
INSERT INTO ingredients VALUES (1, 5, 0.5, 'c. à c.');
INSERT INTO ingredients VALUES (1, 6, 300, 'ml');
INSERT INTO ingredients VALUES (1, 7, 2, 'un.');
INSERT INTO ingredients VALUES (1, 8, 40, 'g');
INSERT INTO ingredients VALUES (1, 9, 40, 'g');
INSERT INTO ingredients VALUES (1, 10, 2, 'c. à c.');
INSERT INTO ingredients VALUES (2, 4, 2, 'gousse');
INSERT INTO ingredients VALUES (2, 11, 50, 'g');
INSERT INTO ingredients VALUES (2, 8, 40, 'g');
INSERT INTO ingredients VALUES (2, 12, 4, 'botte');
INSERT INTO ingredients VALUES (2, 13, 125, 'ml');
INSERT INTO ingredients VALUES (2, 14, 500, 'g');
INSERT INTO ingredients VALUES (3, 1, 500, 'g');
INSERT INTO ingredients VALUES (3, 2, 80, 'g');
INSERT INTO ingredients VALUES (3, 6, 300, 'ml');
INSERT INTO ingredients VALUES (3, 8, 40, 'g');

INSERT INTO directions VALUES
(1, 1, "Faites cuire les pâtes dans une grande casserole d'eau bouillante, puis égouttez-les.");
INSERT INTO directions VALUES
(1, 2, "Pendant ce temps, faites fondre le beurre dans une poêle et faites revenir le bacon 5 minutes.");
INSERT INTO directions VALUES
(1, 3, "Ajoutez l'ail, le poivre et la crème liquide dans la poêle. Laissez frémir à découvert jusqu'à ce que la sauce réduise de moitié. Retirez la poêle du feu pour incorporer les oeufs et les fromages.");
INSERT INTO directions VALUES
(1, 4, "Mélangez les pâtes avec la sauce. Parsemer de ciboulette avant de servir.");
INSERT INTO directions VALUES
(2, 1, "Pour réaliser le pesto, avec un mixeur ou un robot, mixez l'ail, les pignons, le parmesan râpé et le basilic jusqu’à obtention d'un mélange presque lisse.");
INSERT INTO directions VALUES
(2, 2, "Versez progressivement l'huile d'olive en filet, en mixant, jusqu'à ce que le mélange ait épaissi.");
INSERT INTO directions VALUES
(2, 3, "Faites cuire les pâtes dans une grande casserole d'eau bouillante, Égouttez-les et réservez 60 ml de l'eau de cuisson.");
INSERT INTO directions VALUES
(2, 4, "Mélangez les spaghettis, le pesto et l'eau de cuisson réservée dans un grand saladier.");
INSERT INTO directions VALUES
(3, 1, "Faites cuire les pâtes dans une grande casserole d'eau bouillante salée, puis égouttes-les.");
INSERT INTO directions VALUES
(3, 2, "Faites fondre le beurre dans une poêle. Versez la crème liquide, portez à ébullition puis baissez le feu. Laisser mijoter 5 minutes sans couvrir, jusqu'à ce que la sauce ait réduit de moitié.");
INSERT INTO directions VALUES
(3, 3, "Ajoutez le parmesan et remuez pendant 2 minutes pour que le fromage soit bien incorporé.");
INSERT INTO directions VALUES
(3, 4, "Servez les fettucine avec la sauce et parsemer d’un peu de parmesan râpé, si vous le souhaitez.");