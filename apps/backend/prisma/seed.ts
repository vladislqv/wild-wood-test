import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Удаляем существующие записи
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Создаём категории
  const stullenCategory = await prisma.category.create({
    data: {
      name_en: 'Stullen, love on bread',
      name_de: 'Stullen, Liebe auf Brot',
    },
  });

  const sweeterThanHoneyCategory = await prisma.category.create({
    data: {
      name_en: 'Sweeter than honey',
      name_de: 'Süßer als Honig',
    },
  });

  const allDayBreakfastCategory = await prisma.category.create({
    data: {
      name_en: 'All day Breakfast – Wild Bowls',
      name_de: 'All Day Frühstück – Wild Bowls',
    },
  });

  const wilfLunchCategory = await prisma.category.create({
    data: {
      name_en: 'Wilf Lunch',
      name_de: 'Wilf Mittagessen',
    },
  });

  const coffeeHotDrinksCategory = await prisma.category.create({
    data: {
      name_en: 'Coffee + Hot Drinks',
      name_de: 'Kaffee + Heiße Getränke',
    },
  });

  const icedDrinksCategory = await prisma.category.create({
    data: {
      name_en: 'Iced Drinks',
      name_de: 'Eisgetränke',
    },
  });

  const softdrinksCategory = await prisma.category.create({
    data: {
      name_en: 'Softdrinks',
      name_de: 'Softdrinks',
    },
  });

  const wildWinesMoreCategory = await prisma.category.create({
    data: {
      name_en: 'Wild Wines + More',
      name_de: 'Wild Weine + Mehr',
    },
  });

  const smoothiesCategory = await prisma.category.create({
    data: {
      name_en: 'Smoothies',
      name_de: 'Smoothies',
    },
  });

  // Создаём продукты
  await prisma.product.createMany({
    data: [
      // Stullen, love on bread
      {
        name_en: 'Bravocado',
        name_de: 'Bravocado',
        price: 11.9,
        description_en: 'Sourdough bread, homemade guacamole, tasty tomatoes, herbs',
        description_de: 'Sauerteigbrot, hausgemachtes Guacamole, schmackhafte Tomaten, Kräuter',
        cookTime: '10 min',
        allergens: ['gluten'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Sourdough bread', 'homemade guacamole', 'tasty tomatoes', 'herbs'],
        image: '/Bravocado.webp',
        categoryId: stullenCategory.id,
      },
      {
        name_en: 'But first - Hummus',
        name_de: 'Aber zuerst - Hummus',
        price: 11.9,
        description_en: 'Sourdough bread, homemade red beet hummus',
        description_de: 'Sauerteigbrot, hausgemachter roter Rübenhummus',
        cookTime: '5 min',
        allergens: ['gluten'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Sourdough bread', 'homemade red beet hummus'],
        image: '/But-first-Hummus.webp',
        categoryId: stullenCategory.id,
      },
      {
        name_en: 'Cream Cheese',
        name_de: 'Frischkäse',
        price: 11.9,
        description_en: 'Fig or other seasonal fruits',
        description_de: 'Feigen oder andere saisonale Früchte',
        cookTime: '5 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Fig', 'seasonal fruits'],
        image: '/Cream-Cheese.webp',
        categoryId: stullenCategory.id,
      },
      {
        name_en: 'Bagelicious',
        name_de: 'Bagelicious',
        price: 11.9,
        description_en: 'Smashed avocado, cream cheese, egg',
        description_de: 'Avocado zerdrückt, Frischkäse, Ei',
        cookTime: '10 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['smashed avocado', 'cream cheese', 'egg'],
        image: '/Bagelicious.webp',
        categoryId: stullenCategory.id,
      },
      {
        name_en: 'EGGcited',
        name_de: 'EGGcited',
        price: 11.9,
        description_en: 'Scrambled eggs, tomatoes, fresh herbs',
        description_de: 'Rühreier, Tomaten, frische Kräuter',
        cookTime: '8 min',
        allergens: ['egg'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['scrambled eggs', 'tomatoes', 'fresh herbs'],
        image: '/EGGcited.webp',
        categoryId: stullenCategory.id,
      },

      // Sweeter than honey
      {
        name_en: 'Banana bread',
        name_de: 'Bananenbrot',
        price: 4.4,
        description_en: '',
        description_de: '',
        cookTime: '30 min',
        allergens: ['gluten', 'milk', 'nuts'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['bananas', 'flour', 'sugar', 'eggs'],
        image: '/Banana-bread.webp',
        categoryId: sweeterThanHoneyCategory.id,
      },
      {
        name_en: 'Cake Dreams',
        name_de: 'Kuchen Träume',
        price: 4.9,
        description_en: 'Ask for ingredients',
        description_de: 'Nach den Zutaten fragen',
        cookTime: '45 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: [],
        image: '/Cake-Dreams.webp',
        categoryId: sweeterThanHoneyCategory.id,
      },

      // All day Breakfast – Wild Bowls
      {
        name_en: 'Acai Dream',
        name_de: 'Acai Traum',
        price: 13.5,
        description_en: 'Acai, banana, berries | Toppings - granola, goji, chia, coconut flakes, berries, banana',
        description_de: 'Acai, Banane, Beeren | Toppings - Granola, Goji, Chia, Kokosflocken, Beeren, Banane',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Acai', 'banana', 'berries'],
        image: '/Acai-Dream.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Mango Wild',
        name_de: 'Mango Wild',
        price: 13.5,
        description_en: 'Mango, banana, berries | Toppings - granola, goji, chia, coconut flakes, berries, banana',
        description_de: 'Mango, Banane, Beeren | Toppings - Granola, Goji, Chia, Kokosflocken, Beeren, Banane',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Mango', 'banana', 'berries'],
        image: '/Mango-Wild.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Hokus Kokus',
        name_de: 'Hokus Kokus',
        price: 13.5,
        description_en: 'Coconut, banana | Toppings - granola, nuts, coconut flakes, berries, banana',
        description_de: 'Kokosnuss, Banane | Toppings - Granola, Nüsse, Kokosflocken, Beeren, Banane',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Coconut', 'banana'],
        image: '/Hokus-Kokus.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Blue Wild Bowl',
        name_de: 'Blue Wild Bowl',
        price: 13.5,
        description_en: 'Dragon fruit, cauliflower, banana, coconut, almonds | Toppings - granola, berries, banana, coconut flakes',
        description_de: 'Drachenfrucht, Blumenkohl, Banane, Kokosnuss, Mandeln | Toppings - Granola, Beeren, Banane, Kokosflocken',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Dragon fruit', 'cauliflower', 'banana', 'coconut', 'almonds'],
        image: '/Blue-Wild-Bowl.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Pancake Pan',
        name_de: 'Pfannkuchen Pan',
        price: 12.9,
        description_en: '1 big pancake, vanilla quark, blueberry jelly, berries, banana, peanut butter',
        description_de: '1 großer Pfannkuchen, Vanillequark, Blaubeermarmelade, Beeren, Banane, Erdnussbutter',
        cookTime: '15 min',
        allergens: ['gluten', 'milk', 'egg'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['big pancake', 'vanilla quark', 'blueberry jelly', 'berries', 'banana', 'peanut butter'],
        image: '/Pancake-Pan.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Pancakes',
        name_de: 'Pfannkuchen',
        price: 13.5,
        description_en: '3 Pancakes served with banana, berries, maple syrup, chocolate sauce',
        description_de: '3 Pfannkuchen serviert mit Banane, Beeren, Ahornsirup, Schokoladensauce',
        cookTime: '15 min',
        allergens: ['gluten', 'milk', 'egg'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['3 Pancakes', 'banana', 'berries', 'maple syrup', 'chocolate sauce'],
        image: '/Pancakes.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Woodtella Pancakes',
        name_de: 'Woodtella Pfannkuchen',
        price: 13.5,
        description_en: '3 Pancakes with berries, banana, seasonal fruits, Nutella',
        description_de: '3 Pfannkuchen mit Beeren, Banane, saisonalen Früchten, Nutella',
        cookTime: '15 min',
        allergens: ['gluten', 'milk', 'egg'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['3 Pancakes', 'berries', 'banana', 'seasonal fruits', 'Nutella'],
        image: '/Woodtella-Pancakes.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Homemade Bio Porridge',
        name_de: 'Hausgemachtes Bio Porridge',
        price: 11.5,
        description_en: 'With dried dates, plums, apples, cinnamon, coconut flakes, peanut butter',
        description_de: 'Mit getrockneten Datteln, Pflaumen, Äpfeln, Zimt, Kokosflocken, Erdnussbutter',
        cookTime: '10 min',
        allergens: ['gluten'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['dried dates', 'plums', 'apples', 'cinnamon', 'coconut flakes', 'peanut butter'],
        image: '/Homemade-Bio-Porridge.webp',
        categoryId: allDayBreakfastCategory.id,
      },
      {
        name_en: 'Wild Granola',
        name_de: 'Wild Granola',
        price: 7.9,
        description_en: 'Greek yoghurt, homemade granola, honey, berries',
        description_de: 'Griechischer Joghurt, hausgemachte Granola, Honig, Beeren',
        cookTime: '5 min',
        allergens: ['gluten'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Greek yoghurt', 'homemade granola', 'honey', 'berries'],
        image: '/Wild-Granola.webp',
        categoryId: allDayBreakfastCategory.id,
      },

      // Wilf Lunch
      {
        name_en: 'Wild Quinoa Bowl',
        name_de: 'Wild Quinoa Bowl',
        price: 13.9,
        description_en: 'Quinoa, baby spinach, beans, chickpeas, avocado cream, tomatoes, beetroot, olives, coconut lime pomegranate dressing',
        description_de: 'Quinoa, Babyspinat, Bohnen, Kichererbsen, Avocadocreme, Tomaten, Rote Bete, Oliven, Kokos-Limetten-Granatapfel-Dressing',
        cookTime: '15 min',
        allergens: ['vegan'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Quinoa', 'baby spinach', 'beans', 'chickpeas', 'avocado cream', 'tomatoes', 'beetroot', 'olives', 'coconut lime pomegranate dressing'],
        image: '/Wild-Quinoa-Bowl.webp',
        categoryId: wilfLunchCategory.id,
      },
      {
        name_en: 'Wild Salad',
        name_de: 'Wild Salat',
        price: 11.9,
        description_en: 'Burrata, salad, walnut, tomatoes, berries, fig or other seasonal fruit',
        description_de: 'Burrata, Salat, Walnuss, Tomaten, Beeren, Feige oder andere saisonale Früchte',
        cookTime: '10 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Burrata', 'salad', 'walnut', 'tomatoes', 'berries', 'fig', 'seasonal fruit'],
        image: '/Wild-Salad.webp',
        categoryId: wilfLunchCategory.id,
      },
      {
        name_en: 'Burrata Sourdough Bread',
        name_de: 'Burrata Sauerteigbrot',
        price: 10.9,
        description_en: 'Burrata, grilled tomatoes, fresh herbs, Italian oil',
        description_de: 'Burrata, gegrillte Tomaten, frische Kräuter, italienisches Öl',
        cookTime: '8 min',
        allergens: ['gluten', 'milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Burrata', 'grilled tomatoes', 'fresh herbs', 'Italian oil'],
        image: '/Burrata-Sourdough-Bread.webp',
        categoryId: wilfLunchCategory.id,
      },
      {
        name_en: 'Wild in your Hood Salad',
        name_de: 'Wild in your Hood Salat',
        price: 11.9,
        description_en: 'Baby spinach, walnut, beetroot, sheep cheese, apple, quinoa',
        description_de: 'Babyspinat, Walnuss, Rote Bete, Schafskäse, Apfel, Quinoa',
        cookTime: '10 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['baby spinach', 'walnut', 'beetroot', 'sheep cheese', 'apple', 'quinoa'],
        image: '/Wild-in-your-Hood-Salad.webp',
        categoryId: wilfLunchCategory.id,
      },
      {
        name_en: 'Wild Mykonos Pita',
        name_de: 'Wild Mykonos Pita',
        price: 14.5,
        description_en: '2 pita, beetroot hummus, avocado, scrambled egg, sheep cheese',
        description_de: '2 Pita, Rote Bete Hummus, Avocado, Rührei, Schafskäse',
        cookTime: '12 min',
        allergens: ['gluten', 'egg'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['2 pita', 'beetroot hummus', 'avocado', 'scrambled egg', 'sheep cheese'],
        image: '/Wild-Mykonos-Pita.webp',
        categoryId: wilfLunchCategory.id,
      },

      // Coffee + Hot Drinks
      {
        name_en: 'Espresso',
        name_de: 'Espresso',
        price: 2.5,
        description_en: '',
        description_de: '',
        cookTime: '3 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso'],
        image: '/Espresso.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Doppio',
        name_de: 'Doppio',
        price: 3.6,
        description_en: '',
        description_de: '',
        cookTime: '3 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['double espresso'],
        image: '/Doppio.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Americano',
        name_de: 'Americano',
        price: 3.7,
        description_en: '',
        description_de: '',
        cookTime: '4 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso', 'hot water'],
        image: '/Americano.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Cappuccino',
        name_de: 'Cappuccino',
        price: 3.8,
        description_en: '',
        description_de: '',
        cookTime: '4 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso', 'steamed milk', 'milk foam'],
        image: '/Cappuccino.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Flat White',
        name_de: 'Flat White',
        price: 4.3,
        description_en: '',
        description_de: '',
        cookTime: '4 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso', 'steamed milk'],
        image: '/Flat-White.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Latte',
        name_de: 'Latte',
        price: 4.2,
        description_en: '',
        description_de: '',
        cookTime: '4 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso', 'steamed milk'],
        image: '/Latte.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Hot Chocolate',
        name_de: 'Heiße Schokolade',
        price: 4.2,
        description_en: '',
        description_de: '',
        cookTime: '5 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['cocoa', 'milk', 'sugar'],
        image: '/Hot-Chocolate.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Special Latte',
        name_de: 'Spezial Latte',
        price: 4.9,
        description_en: 'Matcha, Curcuma, Beetroot, Butterfly Pea, Chai, Pink Superfood',
        description_de: 'Matcha, Kurkuma, Rote Bete, Schmetterlings-Erbse, Chai, Pink Superfood',
        cookTime: '5 min',
        allergens: ['milk'],
        isSpecial: true,
        isPopular: false,
        ingredients: ['espresso', 'steamed milk', 'special syrup'],
        image: '/Special-Latte.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Plant Milk',
        name_de: 'Pflanzenmilch',
        price: 0.5,
        description_en: 'oat, almond, coconut',
        description_de: 'Hafer, Mandel, Kokosnuss',
        cookTime: '0 min',
        allergens: ['nuts'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['oat milk', 'almond milk', 'coconut milk'],
        image: '/Plant-Milk.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },
      {
        name_en: 'Pot of Tea',
        name_de: 'Topf Tee',
        price: 4.9,
        description_en: '',
        description_de: '',
        cookTime: '3 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['tea'],
        image: '/Pot-of-Tea.webp',
        categoryId: coffeeHotDrinksCategory.id,
      },

      // Iced Drinks
      {
        name_en: 'Iced Cappuccino',
        name_de: 'Eis Cappuccino',
        price: 4.8,
        description_en: '',
        description_de: '',
        cookTime: '5 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso', 'cold milk', 'ice'],
        image: '/Iced-Cappuccino.webp',
        categoryId: icedDrinksCategory.id,
      },
      {
        name_en: 'Iced Flat White',
        name_de: 'Eis Flat White',
        price: 5.2,
        description_en: '',
        description_de: '',
        cookTime: '5 min',
        allergens: ['milk'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['espresso', 'cold milk', 'ice'],
        image: '/Iced-Flat-White.webp',
        categoryId: icedDrinksCategory.id,
      },
      {
        name_en: 'Iced Matcha',
        name_de: 'Eis Matcha',
        price: 5.6,
        description_en: '',
        description_de: '',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['matcha', 'cold milk', 'ice'],
        image: '/Iced-Matcha.webp',
        categoryId: icedDrinksCategory.id,
      },

      // Softdrinks
      {
        name_en: 'Water Taunusquelle (0,25L)',
        name_de: 'Wasser Taunusquelle (0,25L)',
        price: 3.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['water'],
        image: '/Water-Taunusquelle.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Water Taunusquelle (0,75L)',
        name_de: 'Wasser Taunusquelle (0,75L)',
        price: 6.9,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['water'],
        image: '/Water-Taunusquelle.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Fritz-kola',
        name_de: 'Fritz-kola',
        price: 3.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['cola'],
        image: '/Fritz-kola.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Fritz-limo',
        name_de: 'Fritz-limo',
        price: 3.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['lemonade'],
        image: '/Fritz-limo.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Fritz-spritz',
        name_de: 'Fritz-spritz',
        price: 3.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['spritz'],
        image: '/Fritz-spritz.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Mintspritzer (maracuja)',
        name_de: 'Mintspritzer (Maracuja)',
        price: 6.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['mint', 'passion fruit'],
        image: '/Mintspritzer.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Mintspritzer (rhabarber)',
        name_de: 'Mintspritzer (Rhabarber)',
        price: 6.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['mint', 'rhubarb'],
        image: '/Mintspritzer.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Fresh orange juice (0.25L)',
        name_de: 'Frisch gepresster Orangensaft (0,25L)',
        price: 4.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['fresh orange juice'],
        image: '/Fresh-orange-juice.webp',
        categoryId: softdrinksCategory.id,
      },
      {
        name_en: 'Elephant Bay',
        name_de: 'Elephant Bay',
        price: 3.9,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Elephant Bay drink'],
        image: '/Elephant-Bay.webp',
        categoryId: softdrinksCategory.id,
      },

      // Wild Wines + More
      {
        name_en: 'Chateau de Miraval (0.75L)',
        name_de: 'Chateau de Miraval (0,75L)',
        price: 34.0,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Chateau de Miraval wine'],
        image: '/Chateau-de-Miraval.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Grauburgunder (0.2L)',
        name_de: 'Grauburgunder (0,2L)',
        price: 6.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Grauburgunder wine'],
        image: '/Grauburgunder.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Grauburgunder (0.75L)',
        name_de: 'Grauburgunder (0,75L)',
        price: 25.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Grauburgunder wine'],
        image: '/Grauburgunder.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Riesling (0.2L)',
        name_de: 'Riesling (0,2L)',
        price: 6.9,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Riesling wine'],
        image: '/Riesling.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Riesling (0.75L)',
        name_de: 'Riesling (0,75L)',
        price: 26.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Riesling wine'],
        image: '/Riesling.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Rosé (0.2L)',
        name_de: 'Rosé (0,2L)',
        price: 7.5,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Rosé wine'],
        image: '/Rose.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Rosé (0.75L)',
        name_de: 'Rosé (0,75L)',
        price: 28.0,
        description_en: '',
        description_de: '',
        cookTime: '0 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Rosé wine'],
        image: '/Rose.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Aperol Spritz',
        name_de: 'Aperol Spritz',
        price: 9.0,
        description_en: '',
        description_de: '',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Aperol', 'Prosecco', 'soda water'],
        image: 'Aperol-Spritz-Lillet-Wild-Berry.webp',
        categoryId: wildWinesMoreCategory.id,
      },
      {
        name_en: 'Lillet Wild Berry',
        name_de: 'Lillet Wild Berry',
        price: 9.0,
        description_en: '',
        description_de: '',
        cookTime: '5 min',
        allergens: [],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Lillet', 'wild berry syrup', 'soda water'],
        image: 'Aperol-Spritz-Lillet-Wild-Berry.webp',
        categoryId: wildWinesMoreCategory.id,
      },

      // Smoothies
      {
        name_en: 'Wild Berry Thing',
        name_de: 'Wild Berry Thing',
        price: 7.9,
        description_en: 'Strawberry, blueberry, black currant, blackberry, açaí, banana, hemp protein',
        description_de: 'Erdbeere, Blaubeere, schwarze Johannisbeere, Brombeere, Açaí, Banane, Hanfprotein',
        cookTime: '5 min',
        allergens: ['nuts'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Strawberry', 'blueberry', 'black currant', 'blackberry', 'açaí', 'banana', 'hemp protein'],
        image: '/Wild-Berry-Thing.webp',
        categoryId: smoothiesCategory.id,
      },
      {
        name_en: 'Green Crow',
        name_de: 'Green Crow',
        price: 7.9,
        description_en: 'Spinach, broccoli, avocado, barley grass, wheat grass, spirulina, coconut milk',
        description_de: 'Spinat, Brokkoli, Avocado, Gerstengras, Weizengras, Spirulina, Kokosmilch',
        cookTime: '5 min',
        allergens: ['nuts'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Spinach', 'broccoli', 'avocado', 'barley grass', 'wheat grass', 'spirulina', 'coconut milk'],
        image: '/Green-Crow.webp',
        categoryId: smoothiesCategory.id,
      },
      {
        name_en: 'Mango Wild',
        name_de: 'Mango Wild',
        price: 7.9,
        description_en: 'Mango, pineapple, passion fruit, acerola, almond milk, coconut oil',
        description_de: 'Mango, Ananas, Maracuja, Acerola, Mandelmilch, Kokosöl',
        cookTime: '5 min',
        allergens: ['nuts'],
        isSpecial: false,
        isPopular: false,
        ingredients: ['Mango', 'pineapple', 'passion fruit', 'acerola', 'almond milk', 'coconut oil'],
        image: '/Mango-Wild..webp',
        categoryId: smoothiesCategory.id,
      },
    ],
  });
}

main()
  .then(async () => {
    console.log('Данные успешно загружены');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Ошибка при загрузке данных:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
