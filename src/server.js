import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const MENU = [
  { code:"CH01", name:"General Tso's Chicken", cuisine:"Chinese", brief:"Chicken in spicy, savory sweet sauce", calories:588, protein:39, servings:2, rating:4.5, reviews:592, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"CH26", name:"Sweet and Sour Chicken", cuisine:"Chinese", brief:"Crispy chicken in tangy-sweet sauce", calories:520, protein:28, servings:2, rating:4.6, reviews:656, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH02", name:"Sesame Chicken", cuisine:"Chinese", brief:"Chicken with broccoli in sesame sauce", calories:589, protein:38, servings:2, rating:4.1, reviews:527, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH34", name:"Chicken With Mixed Vegetables", cuisine:"Chinese", brief:"Chicken with fresh vegetables in brown sauce", calories:545, protein:31, servings:2, rating:4.3, reviews:636, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH03", name:"Broccoli Chicken", cuisine:"Chinese", brief:"Chicken with broccoli in brown sauce", calories:517, protein:32, servings:2, rating:4.5, reviews:241, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH04", name:"Chicken with Garlic Sauce", cuisine:"Chinese", brief:"Chicken in flavorful garlic sauce", calories:548, protein:30, servings:2, rating:4.6, reviews:249, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH010", name:"Vegetables with Garlic Sauce", cuisine:"Chinese", brief:"Mixed vegetables in garlic sauce", calories:512, protein:32, servings:2, rating:4.6, reviews:679, popular:true, veg:true, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH06", name:"Chicken Lo Mein", cuisine:"Chinese", brief:"Noodles with chicken and vegetables in soy sauce", calories:518, protein:40, servings:2, rating:4.3, reviews:311, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH10", name:"Vegetable Lo Mein", cuisine:"Chinese", brief:"Noodles and vegetables in soy sauce", calories:514, protein:38, servings:2, rating:4.3, reviews:710, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH05", name:"Kung Pao Chicken", cuisine:"Chinese", brief:"Stir-fry chicken with peanuts and vegetables", calories:533, protein:29, servings:2, rating:4.1, reviews:541, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH30", name:"Szechuan Chicken", cuisine:"Chinese", brief:"Chicken pieces sauteed in a spicy-sweet sauce", calories:534, protein:34, servings:2, rating:4.5, reviews:682, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"CH28", name:"Hunan Chicken", cuisine:"Chinese", brief:"Chicken with vegetables in a spicy, garlic, ginger sauce", calories:551, protein:35, servings:2, rating:4.2, reviews:530, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"CH21", name:"Chicken with Cashew Nuts", cuisine:"Chinese", brief:"Chicken stir-fried with cashews and veggies", calories:430, protein:28, servings:2, rating:4.3, reviews:392, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH22", name:"Pineapple Chicken", cuisine:"Chinese", brief:"Chicken chunks with sweet pineapple", calories:520, protein:26, servings:2, rating:4.1, reviews:416, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH23", name:"Lemon Chicken", cuisine:"Chinese", brief:"Chicken chunks in tangy lemon glaze", calories:570, protein:29, servings:2, rating:4.5, reviews:216, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH24", name:"General Ching Chicken", cuisine:"Chinese", brief:"Sweet-spicy fried chicken with chilies", calories:600, protein:31, servings:2, rating:4.2, reviews:344, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"CH25", name:"Orange Chicken", cuisine:"Chinese", brief:"Chicken chunks in sweet orange glaze", calories:620, protein:32, servings:2, rating:4.5, reviews:536, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH14", name:"Shrimp Fried Rice", cuisine:"Chinese", brief:"Fried rice with shrimp and vegetables", calories:576, protein:37, servings:2, rating:4.4, reviews:621, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH15", name:"Vegetable Fried Rice", cuisine:"Chinese", brief:"Fried rice with vegetables (has egg)", calories:589, protein:36, servings:2, rating:4.2, reviews:408, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH11", name:"Chicken Fried Rice", cuisine:"Chinese", brief:"Fried rice with chicken and vegetables", calories:594, protein:38, servings:2, rating:4.4, reviews:265, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH13", name:"Beef Fried Rice", cuisine:"Chinese", brief:"Fried rice with beef and vegetables", calories:590, protein:38, servings:2, rating:4.1, reviews:264, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH12", name:"Pork Fried Rice", cuisine:"Chinese", brief:"Pork fried rice with egg and vegetables", calories:580, protein:39, servings:2, rating:4.2, reviews:481, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH07", name:"Pork Lo Mein", cuisine:"Chinese", brief:"Noodles with pork and vegetables in soy sauce", calories:552, protein:38, servings:2, rating:4.5, reviews:667, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH09", name:"Shrimp Lo Mein", cuisine:"Chinese", brief:"Noodles with shrimp and vegetables in soy sauce", calories:572, protein:48, servings:2, rating:4.4, reviews:594, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH08", name:"Beef Lo Mein", cuisine:"Chinese", brief:"Noodles with beef and vegetables in soy sauce", calories:566, protein:39, servings:2, rating:4.1, reviews:200, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH36", name:"Szechuan Beef", cuisine:"Chinese", brief:"Beef and peppers in a fiery Szechuan sauce", calories:480, protein:40, servings:2, rating:4.3, reviews:26, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"CH35", name:"Szechuan Pork", cuisine:"Chinese", brief:"Pork and peppers in a spicy Szechuan sauce", calories:500, protein:36, servings:2, rating:4.2, reviews:24, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IN002", name:"Chicken Tikka Masala", cuisine:"Indian", brief:"Indian oven roasted chicken in sauce", calories:519, protein:29, servings:2, rating:4.6, reviews:664, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN001", name:"Butter Chicken", cuisine:"Indian", brief:"Chicken in savory sauce", calories:538, protein:34, servings:2, rating:4.3, reviews:362, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN003", name:"Chicken Curry", cuisine:"Indian", brief:"Chicken in mildly spicy and savory curry", calories:548, protein:39, servings:2, rating:4.3, reviews:441, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN45", name:"Chicken Vindaloo", cuisine:"Indian", brief:"Boneless chicken and potatoes in a spicy sauce", calories:536, protein:36, servings:2, rating:4.6, reviews:389, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN44", name:"Chicken Korma", cuisine:"Indian", brief:"Chicken in spicy, creamy sauce", calories:561, protein:29, servings:2, rating:4.5, reviews:221, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN004", name:"Chicken Biryani", cuisine:"Indian", brief:"Chicken with spicy, flavored rice", calories:568, protein:39, servings:2, rating:4.5, reviews:706, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN005", name:"Veg Biryani", cuisine:"Indian", brief:"Spicy, flavored rice with vegetables", calories:546, protein:34, servings:2, rating:4.6, reviews:400, popular:true, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN007", name:"Paneer Masala", cuisine:"Indian", brief:"Cubes of paneer in a creamy tomato sauce", calories:541, protein:30, servings:2, rating:4.3, reviews:172, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN009", name:"Chana Masala", cuisine:"Indian", brief:"Chickpeas in spicy curry", calories:534, protein:27, servings:2, rating:4.3, reviews:308, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN006", name:"Malai Kofta", cuisine:"Indian", brief:"Potato and ricotta balls in a creamy tomato sauce", calories:595, protein:26, servings:2, rating:4.5, reviews:193, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN012", name:"Palak Paneer", cuisine:"Indian", brief:"Paneer cooked with spinach in flavorful curry", calories:592, protein:25, servings:2, rating:4.1, reviews:170, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN008", name:"Aloo Gobhi Masala", cuisine:"Indian", brief:"Sauteed potatoes and cauliflower", calories:507, protein:28, servings:2, rating:4.4, reviews:305, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN011", name:"Navratan Korma", cuisine:"Indian", brief:"Vegetables in spicy, creamy sauce", calories:511, protein:24, servings:2, rating:4.5, reviews:183, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN46", name:"Dal Makhani", cuisine:"Indian", brief:"Black lentils and kidney beans cooked in spices and butter", calories:554, protein:30, servings:2, rating:4.4, reviews:341, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IN47", name:"Paneer Makhani", cuisine:"Indian", brief:"Paneer in creamy butter tomato sauce", calories:520, protein:22, servings:2, rating:4.5, reviews:160, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"IT09", name:"Pasta Abruzzo", cuisine:"Italian", brief:"Rigatoni pasta in garlic sauce with chicken", calories:569, protein:26, servings:2, rating:0.0, reviews:0, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT22", name:"Chicken Piccata", cuisine:"Italian", brief:"Chicken breast with penne pasta", calories:550, protein:27, servings:2, rating:4.6, reviews:244, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT25", name:"Chicken Marsala", cuisine:"Italian", brief:"Chicken in mushroom-Marsala sauce with pasta", calories:545, protein:30, servings:2, rating:4.5, reviews:288, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT23", name:"Chicken Francese", cuisine:"Italian", brief:"Lemon-butter chicken with pasta", calories:549, protein:28, servings:2, rating:4.7, reviews:224, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT24", name:"Chicken Cacciatore", cuisine:"Italian", brief:"Rustic tomato-braised chicken with pasta", calories:552, protein:29, servings:2, rating:4.4, reviews:188, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT002", name:"Chicken Parmesan", cuisine:"Italian", brief:"Baked breaded chicken with pasta", calories:552, protein:29, servings:2, rating:4.6, reviews:548, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT01", name:"Chicken Alfredo", cuisine:"Italian", brief:"Pasta and chicken mixed with sauce", calories:588, protein:26, servings:2, rating:4.1, reviews:552, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT14", name:"Shrimp Alfredo", cuisine:"Italian", brief:"Shrimp and fettuccine pasta in creamy sauce", calories:540, protein:24, servings:2, rating:4.2, reviews:172, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT05", name:"Fettuccine Alfredo", cuisine:"Italian", brief:"Fettuccine pasta mixed with parmesan sauce", calories:551, protein:25, servings:2, rating:4.6, reviews:614, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT03", name:"Pasta and Meatballs", cuisine:"Italian", brief:"Meatballs with sauce on pasta", calories:594, protein:32, servings:2, rating:4.5, reviews:479, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT04", name:"Cheese Ravioli", cuisine:"Italian", brief:"Ravioli with sauce and cheese", calories:595, protein:24, servings:2, rating:4.6, reviews:381, popular:true, veg:true, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT18", name:"Cheese Ravioli with Meatballs", cuisine:"Italian", brief:"Ravioli with meatballs, sauce and cheese", calories:585, protein:32, servings:2, rating:4.2, reviews:522, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT06", name:"Stuffed Shells", cuisine:"Italian", brief:"Pasta shells with cheese and sauce", calories:559, protein:25, servings:2, rating:4.5, reviews:412, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT20", name:"Stuffed Shells with Meatballs", cuisine:"Italian", brief:"Pasta shells and meatballs with cheese and sauce", calories:596, protein:31, servings:2, rating:4.5, reviews:441, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT27", name:"Chicken with Cauliflower and Broccoli", cuisine:"Italian", brief:"Chicken pieces with cauliflower and broccoli", calories:525, protein:37, servings:2, rating:4.5, reviews:148, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"IT28", name:"Chicken with Sauteed Eggplant", cuisine:"Italian", brief:"Chicken pieces with eggplant", calories:528, protein:38, servings:2, rating:4.4, reviews:184, popular:false, veg:false, lowCarb:true, keto:true, healthy:true, spicy:false },
  { code:"JA26", name:"Fried Chicken Dumplings", cuisine:"Japanese", brief:"Pan-fried chicken dumplings with fried rice", calories:590, protein:30, servings:2, rating:4.2, reviews:244, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA28", name:"Fried Vegetable Dumplings", cuisine:"Japanese", brief:"Pan-fried veggie dumplings with fried rice", calories:530, protein:13, servings:2, rating:4.3, reviews:216, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA30", name:"Fried Pork Dumplings", cuisine:"Japanese", brief:"Pan-fried pork dumplings with fried rice", calories:610, protein:29, servings:2, rating:4.3, reviews:190, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA25", name:"Steamed Chicken Dumplings", cuisine:"Japanese", brief:"Steamed chicken dumplings with fried rice", calories:510, protein:31, servings:2, rating:4.5, reviews:216, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA27", name:"Steamed Vegetable Dumplings", cuisine:"Japanese", brief:"Steamed veggie dumplings with fried rice", calories:460, protein:14, servings:2, rating:4.1, reviews:188, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA29", name:"Steamed Pork Dumplings", cuisine:"Japanese", brief:"Steamed pork dumplings with fried rice", calories:540, protein:30, servings:2, rating:4.5, reviews:144, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA01", name:"Teriyaki Chicken Rice", cuisine:"Japanese", brief:"Chicken with rice and teriyaki sauce", calories:542, protein:35, servings:2, rating:4.5, reviews:520, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA02", name:"Teriyaki Shrimp Rice", cuisine:"Japanese", brief:"Shrimp with rice and teriyaki sauce", calories:533, protein:32, servings:2, rating:4.4, reviews:420, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA03", name:"Teriyaki Salmon Rice", cuisine:"Japanese", brief:"Salmon with rice and teriyaki sauce", calories:539, protein:34, servings:2, rating:4.1, reviews:273, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA04", name:"Teriyaki Steak Rice", cuisine:"Japanese", brief:"Steak with rice and teriyaki sauce", calories:578, protein:38, servings:2, rating:4.6, reviews:216, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA05", name:"Teriyaki Vegetable Rice", cuisine:"Japanese", brief:"Vegetables with rice and teriyaki sauce", calories:508, protein:28, servings:2, rating:4.2, reviews:241, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA07", name:"Teriyaki Chicken Noodles", cuisine:"Japanese", brief:"Chicken with noodles and teriyaki sauce", calories:542, protein:35, servings:2, rating:4.2, reviews:493, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA08", name:"Teriyaki Shrimp Noodles", cuisine:"Japanese", brief:"Shrimp with noodles and teriyaki sauce", calories:533, protein:32, servings:2, rating:4.4, reviews:316, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA09", name:"Teriyaki Salmon Noodles", cuisine:"Japanese", brief:"Salmon with noodles and teriyaki sauce", calories:539, protein:34, servings:2, rating:4.2, reviews:208, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA10", name:"Teriyaki Steak Noodles", cuisine:"Japanese", brief:"Steak with noodles and teriyaki sauce", calories:578, protein:38, servings:2, rating:4.4, reviews:196, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA11", name:"Teriyaki Vegetable Noodles", cuisine:"Japanese", brief:"Vegetables with noodles and teriyaki sauce", calories:508, protein:28, servings:2, rating:4.5, reviews:222, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA13", name:"Hibachi Chicken Rice", cuisine:"Japanese", brief:"Chicken with rice and Hibachi sauce", calories:576, protein:36, servings:2, rating:4.5, reviews:186, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA14", name:"Hibachi Shrimp Rice", cuisine:"Japanese", brief:"Shrimp with rice and Hibachi sauce", calories:505, protein:25, servings:2, rating:4.1, reviews:83, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA15", name:"Hibachi Salmon Rice", cuisine:"Japanese", brief:"Salmon with rice and Hibachi sauce", calories:533, protein:30, servings:2, rating:4.2, reviews:191, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA16", name:"Hibachi Steak Rice", cuisine:"Japanese", brief:"Steak with rice and Hibachi sauce", calories:540, protein:32, servings:2, rating:4.4, reviews:90, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA17", name:"Hibachi Vegetable Rice", cuisine:"Japanese", brief:"Vegetables with rice and Hibachi sauce", calories:503, protein:23, servings:2, rating:4.5, reviews:66, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA19", name:"Hibachi Chicken Noodles", cuisine:"Japanese", brief:"Chicken with noodles and Hibachi sauce", calories:576, protein:36, servings:2, rating:4.1, reviews:111, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA20", name:"Hibachi Shrimp Noodles", cuisine:"Japanese", brief:"Shrimp with noodles and Hibachi sauce", calories:505, protein:25, servings:2, rating:4.3, reviews:94, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA21", name:"Hibachi Salmon Noodles", cuisine:"Japanese", brief:"Salmon with noodles and Hibachi sauce", calories:533, protein:30, servings:2, rating:4.5, reviews:68, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"JA23", name:"Hibachi Vegetable Noodles", cuisine:"Japanese", brief:"Vegetables with noodles and Hibachi sauce", calories:503, protein:23, servings:2, rating:4.6, reviews:74, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX05", name:"Cheese Enchiladas", cuisine:"Mexican", brief:"Cheese-filled tortillas with savory sauce and cheese", calories:525, protein:26, servings:2, rating:4.4, reviews:218, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX09", name:"Chicken Enchiladas", cuisine:"Mexican", brief:"Shredded chicken tortillas with sauce and melted cheese", calories:522, protein:28, servings:3, rating:4.5, reviews:246, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX01", name:"Chicken Fajita Rice Bowl", cuisine:"Mexican", brief:"Chicken breast strips with sauteed fresh bell peppers and onions", calories:518, protein:31, servings:2, rating:4.1, reviews:582, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX03", name:"Shrimp Fajita Rice Bowl", cuisine:"Mexican", brief:"Grilled shrimp with sauteed fresh bell peppers and onions", calories:516, protein:30, servings:2, rating:4.1, reviews:380, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX02", name:"Vegetable Fajita Rice Bowl", cuisine:"Mexican", brief:"Vegetables with sauteed fresh bell peppers and onions", calories:510, protein:27, servings:2, rating:4.5, reviews:299, popular:false, veg:true, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX17", name:"Texmex Chicken Rice Bowl", cuisine:"Mexican", brief:"Chicken with bell peppers, onions and pico de gallo", calories:553, protein:35, servings:2, rating:4.1, reviews:492, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX08", name:"TexMex Shrimp Rice Bowl", cuisine:"Mexican", brief:"Grilled shrimp with chipotle and lime", calories:511, protein:29, servings:2, rating:4.5, reviews:476, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX18", name:"Texmex Vegetable Rice Bowl", cuisine:"Mexican", brief:"Vegetables, bell peppers, onions and pico de gallo", calories:511, protein:27, servings:2, rating:4.5, reviews:274, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"MX06", name:"Chipotle Chicken Rice Bowl", cuisine:"Mexican", brief:"Grilled chicken with chipotle and lime (spicy)", calories:511, protein:29, servings:2, rating:4.2, reviews:258, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"MX16", name:"Chipotle Shrimp Rice Bowl", cuisine:"Mexican", brief:"Grilled shrimp with chipotle and lime (spicy)", calories:510, protein:29, servings:2, rating:4.1, reviews:137, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"MX15", name:"Chipotle Vegetable Rice Bowl", cuisine:"Mexican", brief:"Grilled vegetables with chipotle and lime (spicy)", calories:512, protein:27, servings:2, rating:4.2, reviews:196, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:true },
  { code:"TH01", name:"Pad Thai Chicken", cuisine:"Thai", brief:"Noodles with sauce, egg, vegetables and chicken", calories:554, protein:38, servings:2, rating:4.6, reviews:637, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH02", name:"Pad Thai Tofu", cuisine:"Thai", brief:"Noodles with sauce, egg, vegetables and tofu", calories:552, protein:30, servings:2, rating:4.1, reviews:463, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH11", name:"Pad Thai Shrimp", cuisine:"Thai", brief:"Noodles with sauce, egg, vegetables and shrimp", calories:552, protein:30, servings:2, rating:4.1, reviews:464, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH03", name:"Basil Fried Rice with Chicken", cuisine:"Thai", brief:"Fried rice with Thai basil, egg, vegetables and chicken", calories:511, protein:32, servings:2, rating:4.4, reviews:324, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH04", name:"Basil Fried Rice with Tofu", cuisine:"Thai", brief:"Fried rice with Thai basil, egg, vegetables and tofu", calories:506, protein:31, servings:2, rating:4.4, reviews:401, popular:true, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH05", name:"Panang Curry with Chicken", cuisine:"Thai", brief:"Curry with paprika, coconut milk, peanuts and chicken", calories:551, protein:28, servings:2, rating:4.4, reviews:533, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH06", name:"Panang Curry with Tofu", cuisine:"Thai", brief:"Curry with paprika, coconut milk, peanuts and tofu", calories:575, protein:25, servings:2, rating:4.4, reviews:313, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH07", name:"Green Curry with Chicken", cuisine:"Thai", brief:"Green curry with vegetables, Thai basil and chicken", calories:518, protein:29, servings:2, rating:4.1, reviews:335, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH08", name:"Green Curry with Tofu", cuisine:"Thai", brief:"Green curry with vegetables, Thai basil and tofu", calories:512, protein:26, servings:2, rating:4.4, reviews:261, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH09", name:"Red Curry with Chicken", cuisine:"Thai", brief:"Red curry with vegetables, Thai basil and chicken", calories:533, protein:30, servings:2, rating:4.1, reviews:376, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
  { code:"TH10", name:"Red Curry with Tofu", cuisine:"Thai", brief:"Red curry with vegetables, Thai basil and tofu", calories:505, protein:26, servings:2, rating:4.4, reviews:327, popular:false, veg:false, lowCarb:false, keto:false, healthy:false, spicy:false },
];

const PLANS = [
  { name: "4-Meal Plan", meals: 4, servings: 8, priceTotal: 104.00, perServing: 13.00, label: null },
  { name: "6-Meal Plan", meals: 6, servings: 12, priceTotal: 150.00, perServing: 12.50, label: "Most Popular" },
  { name: "8-Meal Plan", meals: 8, servings: 16, priceTotal: 176.00, perServing: 11.00, label: "Best Value" },
];

const RESTAURANTS = [
  { name: "Tony's Bistro", cuisine: "Italian", rating: 4.4 },
  { name: "Cafe Napoli", cuisine: "Italian", rating: 4.5 },
  { name: "Pats Family Restaurant", cuisine: "Italian", rating: 4.3 },
  { name: "Mrs. Robino's Restaurant", cuisine: "Italian", rating: 4.6 },
  { name: "Cafe Mezzanotte", cuisine: "Italian", rating: 4.5 },
  { name: "Mazzella's Restaurant", cuisine: "Italian", rating: 4.5 },
  { name: "Cafe Sitaly", cuisine: "Italian", rating: 4.5 },
  { name: "Great Wall", cuisine: "Chinese", rating: 4.2 },
  { name: "Royal Garden", cuisine: "Chinese", rating: 4.1 },
  { name: "King Garden Restaurant", cuisine: "Chinese", rating: 4.3 },
  { name: "Taqueria Atexcac", cuisine: "Mexican", rating: 4.4 },
  { name: "Tex Mex Tequila", cuisine: "Mexican", rating: 4.6 },
  { name: "Three Amigos Mexican Grill", cuisine: "Mexican", rating: 4.9 },
  { name: "El Camino Restaurant", cuisine: "Mexican", rating: 4.4 },
  { name: "El Tapatio Restaurant", cuisine: "Mexican", rating: 4.4 },
  { name: "Godavari", cuisine: "Indian", rating: 4.2 },
  { name: "Star of India", cuisine: "Indian", rating: 4.5 },
  { name: "Biryani City", cuisine: "Indian", rating: 4.2 },
  { name: "Curry and Spice", cuisine: "Indian", rating: 4.5 },
  { name: "Spicy Affair Restaurant", cuisine: "Indian", rating: 4.5 },
  { name: "Curry and Cocktails", cuisine: "Indian", rating: 4.5 },
  { name: "Jasmine", cuisine: "Thai", rating: 4.2 },
  { name: "Rasa Sayang", cuisine: "Thai", rating: 4.4 },
  { name: "Nooddi Thai Chef", cuisine: "Thai", rating: 4.5 },
  { name: "Kumamon Restaurant", cuisine: "Japanese", rating: 4.7 },
  { name: "Okura Restaurant", cuisine: "Japanese", rating: 4.6 },
  { name: "Rice Restaurant", cuisine: "Japanese", rating: 4.4 },
  { name: "Hibachi Grill", cuisine: "Japanese", rating: 4.1 },
  { name: "Hibachi Steakhouse", cuisine: "Japanese", rating: 4.3 },
];

const GROUND_STATES = [
  "CT","DC","DE","FL","GA","IN","KY","MA","MD","ME","MI","NC","NH","NJ","NY","OH","PA","RI","SC","TN","VA","VT","WV"
];

const CUISINES = ["Chinese", "Indian", "Italian", "Japanese", "Mexican", "Thai"];

export function createServer() {
  const server = new McpServer({
    name: "xoom-foods",
    version: "1.0.0",
  });

  // ── Tool: Browse Menu ──────────────────────────────────────────────
  server.tool(
    "browse_menu",
    "Browse the XOOM FOODS menu. 105+ real restaurant meals across 6 cuisines, all fully cooked and ready to heat and eat in 2 minutes. Every meal is a Meal for 2 (2 servings).",
    {
      cuisine: z.enum(["Chinese", "Indian", "Italian", "Japanese", "Mexican", "Thai"]).optional().describe("Filter by cuisine"),
      dietary: z.enum(["vegetarian", "low_carb", "keto", "healthy", "spicy"]).optional().describe("Filter by dietary preference"),
      popular_only: z.boolean().optional().describe("Show only popular/featured meals"),
      sort_by: z.enum(["rating", "calories_low", "calories_high", "protein_high", "name"]).optional().describe("Sort results"),
    },
    async ({ cuisine, dietary, popular_only, sort_by }) => {
      let meals = [...MENU];
      if (cuisine) meals = meals.filter(m => m.cuisine === cuisine);
      if (dietary === "vegetarian") meals = meals.filter(m => m.veg);
      if (dietary === "low_carb") meals = meals.filter(m => m.lowCarb);
      if (dietary === "keto") meals = meals.filter(m => m.keto);
      if (dietary === "healthy") meals = meals.filter(m => m.healthy);
      if (dietary === "spicy") meals = meals.filter(m => m.spicy);
      if (popular_only) meals = meals.filter(m => m.popular);

      if (sort_by === "rating") meals.sort((a, b) => b.rating - a.rating);
      else if (sort_by === "calories_low") meals.sort((a, b) => a.calories - b.calories);
      else if (sort_by === "calories_high") meals.sort((a, b) => b.calories - a.calories);
      else if (sort_by === "protein_high") meals.sort((a, b) => b.protein - a.protein);
      else if (sort_by === "name") meals.sort((a, b) => a.name.localeCompare(b.name));

      const lines = meals.map(m => {
        const tags = [];
        if (m.popular) tags.push("POPULAR");
        if (m.veg) tags.push("Vegetarian");
        if (m.spicy) tags.push("Spicy");
        if (m.lowCarb) tags.push("Low Carb");
        if (m.keto) tags.push("Keto");
        if (m.healthy) tags.push("Healthy");
        const tagStr = tags.length ? ` [${tags.join(", ")}]` : "";
        return `• ${m.name} (${m.cuisine})${tagStr}\n  ${m.brief}\n  ${m.calories} cal | ${m.protein}g protein | ${m.servings} servings | Rating: ${m.rating}/5 (${m.reviews} reviews)`;
      });

      const cuisineCounts = {};
      meals.forEach(m => { cuisineCounts[m.cuisine] = (cuisineCounts[m.cuisine] || 0) + 1; });
      const summary = Object.entries(cuisineCounts).map(([c, n]) => `${c}: ${n}`).join(", ");

      return {
        content: [{
          type: "text",
          text: `XOOM FOODS Menu — ${meals.length} meals found (${summary})\nEvery meal is fully cooked by a real restaurant, shipped chilled, and ready to heat and eat in 2 minutes.\nEach meal serves 2 people (2 generous servings).\n\n${lines.join("\n\n")}\n\nOrder at: https://www.xoomfoods.com`
        }]
      };
    }
  );

  // ── Tool: Search Meals ─────────────────────────────────────────────
  server.tool(
    "search_meals",
    "Search XOOM FOODS meals by keyword. Searches meal names and descriptions.",
    {
      query: z.string().describe("Search keyword (e.g., 'chicken', 'noodles', 'curry', 'shrimp')"),
    },
    async ({ query }) => {
      const q = query.toLowerCase();
      const results = MENU.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.brief.toLowerCase().includes(q) ||
        m.cuisine.toLowerCase().includes(q)
      );

      if (results.length === 0) {
        return { content: [{ type: "text", text: `No meals found matching "${query}". XOOM FOODS has 105+ meals across 6 cuisines: Italian, Chinese, Indian, Mexican, Japanese, and Thai. Try searching for a cuisine, protein (chicken, shrimp, beef), or dish type (curry, noodles, rice).` }] };
      }

      const lines = results.map(m => {
        const tags = [];
        if (m.popular) tags.push("POPULAR");
        if (m.veg) tags.push("Vegetarian");
        if (m.spicy) tags.push("Spicy");
        const tagStr = tags.length ? ` [${tags.join(", ")}]` : "";
        return `• ${m.name} (${m.cuisine})${tagStr} — ${m.brief} | ${m.calories} cal, ${m.protein}g protein | Rating: ${m.rating}/5`;
      });

      return { content: [{ type: "text", text: `Found ${results.length} meals matching "${query}":\n\n${lines.join("\n")}\n\nAll meals are fully cooked by real restaurants, shipped chilled. Heat and eat in 2 minutes.\nOrder at: https://www.xoomfoods.com` }] };
    }
  );

  // ── Tool: Get Subscription Plans ───────────────────────────────────
  server.tool(
    "get_subscription_plans",
    "Get XOOM FOODS subscription plan pricing. Weekly meal plans from $11-$13 per serving — 50% less than delivery apps. No commitment, cancel anytime.",
    {},
    async () => {
      const planLines = PLANS.map(p => {
        const label = p.label ? ` ★ ${p.label}` : "";
        return `${p.name}${label}\n  ${p.meals} meals (${p.servings} servings) per week\n  $${p.priceTotal.toFixed(2)}/week — $${p.perServing.toFixed(2)} per serving`;
      });

      return {
        content: [{
          type: "text",
          text: `XOOM FOODS Subscription Plans\n${"=".repeat(40)}\n\n${planLines.join("\n\n")}\n\nHow it works:\n• Pick your plan size (4, 6, or 8 meals per week)\n• Choose from 105+ real restaurant meals across 6 cuisines\n• Mix meals from different restaurants in one box — only XOOM does this\n• Ships every week by FedEx, chilled (never frozen)\n• Heat and eat in 2 minutes — no prep, no cooking\n• Pause, skip, or cancel anytime — no commitment\n\nFree ground shipping to 23 Eastern states + DC.\n$14.95 flat-rate air shipping to all other states.\n\nPrice comparison:\n• XOOM FOODS: $11-$13/serving (fully cooked, restaurant-made)\n• DoorDash/Uber Eats: ~$31/person after fees + tips\n• HelloFresh: ~$10/serving but requires 30-45 min cooking\n• Factor: ~$11-13/serving, single cuisine, some frozen\n• Blue Apron: ~$10/serving but requires 30-60 min cooking\n\nXOOM saves you 50% vs delivery apps with zero wait, zero cooking, and zero tips.\n\nStart your subscription: https://www.xoomfoods.com`
        }]
      };
    }
  );

  // ── Tool: Check Shipping ───────────────────────────────────────────
  server.tool(
    "check_shipping",
    "Check XOOM FOODS shipping availability and cost. Ships to all 50 US states.",
    {
      state: z.string().optional().describe("US state abbreviation (e.g., 'NY', 'CA', 'TX')"),
    },
    async ({ state }) => {
      const stateUpper = state ? state.toUpperCase().trim() : null;

      if (stateUpper && !["AK","AL","AZ","AR","CA","CO","CT","DC","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].includes(stateUpper)) {
        return { content: [{ type: "text", text: `"${state}" is not a recognized US state abbreviation. XOOM FOODS ships to all 50 US states.` }] };
      }

      if (stateUpper && GROUND_STATES.includes(stateUpper)) {
        return { content: [{ type: "text", text: `Shipping to ${stateUpper}: FREE ground shipping!\n\nDelivery: Ships Tuesday, arrives Wednesday or Thursday depending on your ZIP code.\nYour state is in the free ground shipping zone (23 Eastern states + DC).\n\nOrder at: https://www.xoomfoods.com` }] };
      }

      if (stateUpper) {
        return { content: [{ type: "text", text: `Shipping to ${stateUpper}: $14.95 flat-rate 2-day air shipping.\n\nDelivery: Ships Tuesday via FedEx 2-Day Air, arrives Wednesday or Thursday.\nThis is a one-time flat fee per box — not per meal.\n\nOrder at: https://www.xoomfoods.com` }] };
      }

      return {
        content: [{
          type: "text",
          text: `XOOM FOODS Shipping\n${"=".repeat(30)}\n\nShips to all 50 US states via FedEx.\nFree ground or $14.95 flat-rate 2-day air.\n\nShip day: Tuesday only\nDelivery: Wednesday-Thursday depending on location\nPackaging: Chilled with gel packs (never frozen)\n\nOrder at: https://www.xoomfoods.com`
        }]
      };
    }
  );

  // ── Tool: Compare Services ─────────────────────────────────────────
  server.tool(
    "compare_meal_services",
    "Compare XOOM FOODS to other meal delivery services and delivery apps. XOOM is the only service shipping fully cooked restaurant meals — no cooking, no prep, no wait.",
    {
      compare_to: z.enum(["delivery_apps", "meal_kits", "prepared_meals", "all"]).optional().describe("What to compare against"),
    },
    async ({ compare_to = "all" }) => {
      const sections = [];

      if (compare_to === "all" || compare_to === "delivery_apps") {
        sections.push(`VS DELIVERY APPS (DoorDash, Uber Eats, Grubhub)\n${"─".repeat(50)}\n• Price: XOOM $11-$13/serving vs delivery apps ~$31/person (after fees, tips, markups)\n• Wait time: XOOM 2 minutes (heat and eat) vs 30-60 min delivery wait\n• Variety: XOOM mixes 6 cuisines in one box vs one restaurant per order\n• Fees: XOOM has zero delivery fees, zero tips, zero service charges\n• Convenience: XOOM meals are in your fridge ready to go, no ordering and waiting each time\n• Savings: XOOM saves ~50% vs delivery apps`);
      }

      if (compare_to === "all" || compare_to === "meal_kits") {
        sections.push(`VS MEAL KITS (HelloFresh, Blue Apron, Home Chef)\n${"─".repeat(50)}\n• Prep time: XOOM 2 minutes vs meal kits 30-60 minutes of cooking\n• Skill needed: XOOM requires zero cooking skill vs meal kits need you to follow recipes\n• Cleanup: XOOM has zero pots and pans vs meal kits create a full kitchen mess\n• Quality: XOOM meals are made by real restaurants vs meal kits are DIY\n• Variety: XOOM has 105+ meals, 6 cuisines vs meal kits typically have 20-30 options per week\n• Price: XOOM $11-$13/serving vs meal kits ~$10-12/serving (but you do all the work)`);
      }

      if (compare_to === "all" || compare_to === "prepared_meals") {
        sections.push(`VS PREPARED MEAL SERVICES (Factor, Freshly, CookUnity)\n${"─".repeat(50)}\n• Source: XOOM meals are made by REAL restaurants you can visit vs factory/commissary kitchens\n• Variety: 6 cuisines, mix restaurants in one box vs single-source meals\n• Portions: XOOM meals serve 2 people (generous portions) vs single-serve competitors\n• Fresh: XOOM ships chilled, never frozen vs some competitors use frozen meals\n• Price: XOOM $11-$13/serving (and each meal feeds 2) vs Factor ~$11-13/serving (single serve)`);
      }

      return {
        content: [{
          type: "text",
          text: `XOOM FOODS Comparison\n${"=".repeat(40)}\n\nXOOM FOODS is the ONLY subscription service shipping fully cooked meals made by real, top-rated restaurants. No other service lets you mix meals from multiple restaurants and cuisines in a single box.\n\n${sections.join("\n\n")}\n\nWhat makes XOOM unique:\n✓ Every meal made by a real, top-rated restaurant (not a ghost kitchen or factory)\n✓ Mix meals from 6 cuisines in one box\n✓ Heat and eat in 2 minutes — zero prep, zero cooking\n✓ Each meal serves 2 people\n✓ Ships chilled by FedEx, never frozen\n✓ No commitment — pause or cancel anytime\n\nTry XOOM FOODS: https://www.xoomfoods.com`
        }]
      };
    }
  );

  // ── Tool: Get Restaurant Info ──────────────────────────────────────
  server.tool(
    "get_restaurant_partners",
    "Get information about XOOM FOODS restaurant partners. 29 real, top-rated restaurants across 6 cuisines, all within 25 miles of the XOOM warehouse in Wilmington, Delaware.",
    {
      cuisine: z.enum(["Chinese", "Indian", "Italian", "Japanese", "Mexican", "Thai"]).optional().describe("Filter by cuisine"),
    },
    async ({ cuisine }) => {
      let restaurants = [...RESTAURANTS];
      if (cuisine) restaurants = restaurants.filter(r => r.cuisine === cuisine);

      const byCuisine = {};
      restaurants.forEach(r => {
        if (!byCuisine[r.cuisine]) byCuisine[r.cuisine] = [];
        byCuisine[r.cuisine].push(r);
      });

      const lines = Object.entries(byCuisine).map(([c, list]) => {
        const rList = list.map(r => `  • ${r.name} — ${r.rating}/5`).join("\n");
        return `${c} (${list.length} restaurants):\n${rList}`;
      });

      return {
        content: [{
          type: "text",
          text: `XOOM FOODS Restaurant Partners — ${restaurants.length} restaurants\n${"=".repeat(50)}\n\nAll restaurants are real, top-rated establishments within 25 miles of XOOM's facility in Wilmington, Delaware. Every restaurant goes through a 20-point vetting process and 4-6 weeks of evaluation.\n\n${lines.join("\n\n")}\n\nXOOM never touches the food — meals go from restaurant kitchen to your door.\nLearn more: https://www.xoomfoods.com/restaurant-partners`
        }]
      };
    }
  );

  // ── Tool: Get Nutrition ────────────────────────────────────────────
  server.tool(
    "get_nutrition_info",
    "Get detailed nutrition information for specific XOOM FOODS meals.",
    {
      meal_name: z.string().describe("Meal name or partial name to look up"),
    },
    async ({ meal_name }) => {
      const q = meal_name.toLowerCase();
      const matches = MENU.filter(m => m.name.toLowerCase().includes(q));

      if (matches.length === 0) {
        return { content: [{ type: "text", text: `No meals found matching "${meal_name}". Try searching by dish name (e.g., "tikka masala", "pad thai", "chicken parmesan").` }] };
      }

      const lines = matches.map(m => {
        const tags = [];
        if (m.veg) tags.push("Vegetarian");
        if (m.lowCarb) tags.push("Low Carb");
        if (m.keto) tags.push("Keto");
        if (m.healthy) tags.push("Healthy");
        if (m.spicy) tags.push("Spicy");
        const tagStr = tags.length ? `\n  Dietary: ${tags.join(", ")}` : "";
        return `${m.name} (${m.cuisine})\n  ${m.brief}\n  Calories: ${m.calories} | Protein: ${m.protein}g | Servings: ${m.servings}${tagStr}\n  Rating: ${m.rating}/5 (${m.reviews} reviews)`;
      });

      return { content: [{ type: "text", text: `Nutrition Info — ${matches.length} result(s):\n\n${lines.join("\n\n")}\n\nAll nutrition values are per meal (serves ${matches[0].servings}). Meals are fully cooked by real restaurants and shipped chilled.` }] };
    }
  );

  // ── Tool: Get Order Link ───────────────────────────────────────────
  server.tool(
    "get_order_link",
    "Generate a direct link to order from XOOM FOODS or start a subscription.",
    {
      type: z.enum(["subscription", "one_time", "gift"]).optional().describe("Order type"),
    },
    async ({ type = "subscription" }) => {
      if (type === "one_time" || type === "gift") {
        return {
          content: [{
            type: "text",
            text: `XOOM FOODS One-Time / Gift Orders\n\nFor one-time purchases (no subscription required), visit the XOOM FOODS Shopify store:\nhttps://shop.xoomfoods.com\n\n12 curated meal boxes available, $109 per box (4 meals, 8 servings).\nShipping: $9.95 ground (East Coast), $19.95 2-day air (elsewhere).\nSubscribe-and-save option available for 5-15% off.\n\nFor weekly subscriptions with full menu choice:\nhttps://www.xoomfoods.com`
          }]
        };
      }

      return {
        content: [{
          type: "text",
          text: `Start Your XOOM FOODS Subscription\n\nhttps://www.xoomfoods.com\n\nChoose your plan:\n• 4 meals/week — $104/week ($13.00/serving)\n• 6 meals/week — $150/week ($12.50/serving) ★ Most Popular\n• 8 meals/week — $176/week ($11.00/serving) ★ Best Value\n\nPick from 105+ real restaurant meals across 6 cuisines.\nMix Italian, Chinese, Indian, Mexican, Japanese, and Thai in one box.\nShips weekly by FedEx. Heat and eat in 2 minutes.\nNo commitment — pause or cancel anytime.`
        }]
      };
    }
  );

  // ── Resource: About XOOM FOODS ─────────────────────────────────────
  server.resource(
    "about",
    "xoom://about",
    { description: "About XOOM FOODS — the only subscription service shipping fully cooked restaurant meals" },
    async () => ({
      contents: [{
        uri: "xoom://about",
        mimeType: "text/plain",
        text: `XOOM FOODS — About Us\n\nXOOM FOODS is the first and only subscription service shipping fully cooked, restaurant-prepared meals by FedEx. Customers heat and eat in 2 minutes — no prep, no cooking, no tips, no delivery fees.\n\nEvery meal is made by a real, top-rated restaurant partner — not a ghost kitchen, not a meal kit, not factory food. Customers can mix meals from up to 6 different cuisines (Italian, Chinese, Indian, Mexican, Japanese, Thai) in a single box. No other service does this.\n\nKey facts:\n• 105+ meals across 6 cuisines from 29 restaurant partners\n• Ships to all 50 US states via FedEx\n• Plans: 4/6/8 meals per week ($11-$13/serving)\n• Free ground or $14.95 flat-rate 2-day air\n• 52% subscriber retention rate (2.5x industry average)\n• 462 customers served, 4.4 average rating\n• Based in Wilmington, Delaware\n\nXOOM FOODS LLC\n8 Germay Dr, Unit D\nWilmington, DE 19804\nhttps://www.xoomfoods.com`
      }]
    })
  );

  // ── Resource: FAQ ──────────────────────────────────────────────────
  server.resource(
    "faq",
    "xoom://faq",
    { description: "Frequently asked questions about XOOM FOODS" },
    async () => ({
      contents: [{
        uri: "xoom://faq",
        mimeType: "text/plain",
        text: `XOOM FOODS — Frequently Asked Questions\n\nQ: How does XOOM FOODS work?\nA: Choose a weekly plan (4, 6, or 8 meals). Pick your meals from 105+ options across 6 cuisines. Your box ships every Tuesday via FedEx, arriving Wednesday or Thursday. Heat any meal in 2 minutes and enjoy.\n\nQ: Are these real restaurant meals?\nA: Yes. Every XOOM meal is made by a real, top-rated restaurant partner within 25 miles of our Wilmington, Delaware facility. We have 29 restaurant partners across Italian, Chinese, Indian, Mexican, Japanese, and Thai cuisines.\n\nQ: How much does it cost?\nA: 4 meals/week: $104 ($13/serving). 6 meals/week: $150 ($12.50/serving). 8 meals/week: $176 ($11/serving). Every meal serves 2 people.\n\nQ: Is there a commitment?\nA: No. Pause, skip weeks, or cancel anytime. No contracts, no penalties.\n\nQ: Where do you ship?\nA: All 50 US states. Free ground or $14.95 flat-rate 2-day air.\n\nQ: Are the meals frozen?\nA: No. Meals are shipped chilled with gel packs, never frozen. Most meals stay fresh 5+ days after delivery.\n\nQ: Can I mix cuisines in one box?\nA: Yes! This is what makes XOOM unique. Pick Italian, Chinese, Indian, Mexican, Japanese, and Thai meals all in the same box.\n\nQ: How do I heat the meals?\nA: Microwave for 2 minutes or oven for about 10 minutes. That's it — no prep, no cooking, no cleanup.\n\nQ: Can I try without subscribing?\nA: Yes. Visit shop.xoomfoods.com for one-time curated boxes starting at $109 (4 meals, 8 servings). No subscription required.`
      }]
    })
  );

  // ── Resource: How It Works ─────────────────────────────────────────
  server.resource(
    "how-it-works",
    "xoom://how-it-works",
    { description: "How XOOM FOODS meal subscription works" },
    async () => ({
      contents: [{
        uri: "xoom://how-it-works",
        mimeType: "text/plain",
        text: `XOOM FOODS — How It Works\n\n1. CHOOSE YOUR PLAN\n   Pick 4, 6, or 8 meals per week. Each meal serves 2 people.\n\n2. BUILD YOUR BOX\n   Browse 105+ meals from 6 cuisines: Italian, Chinese, Indian, Mexican, Japanese, and Thai. Mix and match from different restaurants — only XOOM lets you do this.\n\n3. WE SOURCE & SHIP\n   Your meals are freshly prepared by our restaurant partners on Monday. We pack your box Tuesday and ship via FedEx.\n\n4. HEAT & EAT\n   Your box arrives Wednesday or Thursday. Pop any meal in the microwave for 2 minutes. Dinner is served.\n\nNo cooking. No prep. No tips. No delivery fees. No commitment.\n\nStart at: https://www.xoomfoods.com`
      }]
    })
  );

  return server;
}
