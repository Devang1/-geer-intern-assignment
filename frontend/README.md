
# 💎 Geer Intern Assignment

A full-stack product management web app for a diamond jewelry store, built using **Next.js**, **PostgreSQL**, and **Tailwind CSS**. It allows users to browse diamond products and provides an admin panel to add, update, or delete them.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **Database:** PostgreSQL
- **ORM / DB Access:** node-postgres (`pg`)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Devang1/geer-intern-assignment.git
cd geer-intern-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database
```

> Replace with your actual PostgreSQL credentials and database name.
Replace:
- `your_username` → your PostgreSQL username  
- `your_password` → your PostgreSQL password  
- `diamonds` → your database name (if different)

---

## 🧱 PostgreSQL Table Creation

Run the following SQL command in your PostgreSQL database to create the `products` table:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  originalPrice INTEGER NOT NULL,
  shape TEXT,
  collection TEXT,
  carat NUMERIC,
  image TEXT,
  discount TEXT,
  date DATE
);
```

---

## 📦 Insert Mock Data

You can insert sample data using this SQL script:

```sql
INSERT INTO products (
  id, name, price, originalPrice, shape, collection, carat, image, discount, date
) VALUES
(1, '1.00 Ct Fancy Mirage Pendant', 56827, 61779, 'Round', 'Necklace', 1, 'https://geer.in/cdn/shop/files/GJPO-059_Y2.jpg?v=1750237029', '8%', '2024-05-01'),
(2, '1.00Ct Emerald & Round Globe Pendant', 38683, 41895, 'Emerald', 'Necklace', 1, 'https://geer.in/cdn/shop/files/GJPO-090_Y2.jpg?v=1750236772', '8%', '2024-06-10'),
(3, '2.5Ct Round Shape Gold Chain', 117379, 127869, 'Round', 'Chain', 2.5, 'https://geer.in/cdn/shop/files/GJPO-012_Y2.jpg?v=1750236498', '8%', '2024-04-20'),
(4, '6.50Ct Heart Shape Fancy Stud', 272291, 299673, 'Heart', 'Fancy Stud', 6.5, 'https://geer.in/cdn/shop/files/GJPO-072_Y2.jpg?v=1750236885', '9%', '2024-06-15'),
(5, '0.50Ct Oval Solitaire Ring', 28750, 32500, 'Oval', 'Engagement', 0.5, 'https://geer.in/cdn/shop/files/GJLR-030_Y2_9a31acd7-0abf-4aec-8f11-3f418081be35.jpg?v=1750239609', '12%', '2024-03-12'),
(6, '1.25Ct Cushion Halo Earrings', 84250, 92500, 'Cushion', 'Halo', 1.25, 'https://geer.in/cdn/shop/files/GJER-083_Y2.jpg?v=1750236436', '9%', '2024-05-22'),
(7, '0.25Ct Round Diamond Hoops', 15200, 16500, 'Round', 'Earrings', 0.25, 'https://geer.in/cdn/shop/files/GJER-058_Y2.jpg?v=1750238849&width=360', '8%', '2024-06-05'),
(8, '3.00Ct Emerald Cut Tennis Bracelet', 185000, 205000, 'Emerald', 'Bracelets', 3, 'https://geer.in/cdn/shop/files/GJBR-012_Y2.jpg?v=1750236649', '10%', '2024-04-30'),
(9, '0.75Ct Heart Pendant Necklace', 45200, 49500, 'Heart', 'Pendant', 0.75, 'https://geer.in/cdn/shop/files/GJPO-032_Y2.jpg?v=1750237260', '9%', '2024-05-18'),
(10, '1.50Ct Round Wedding Band', 96750, 107500, 'Round', 'Rings', 1.5, 'https://geer.in/cdn/shop/files/GJBR-004_Y2.jpg?v=1750236623', '10%', '2024-06-01'),
(11, '2.00Ct Oval Engagement Ring', 132000, 145000, 'Oval', 'Engagement', 2, 'https://geer.in/cdn/shop/files/GJLR-089_Y2.jpg?v=1750239288', '9%', '2024-05-10'),
(12, '0.30Ct Round Diamond Studs', 18200, 19500, 'Round', 'Fancy Stud', 0.3, 'https://geer.in/cdn/shop/files/GJER-206_Y2.jpg?v=1750236451', '7%', '2024-04-15'),
(13, '5.00Ct Cushion Choker', 225000, 250000, 'Cushion', 'Bracelets', 5, 'https://geer.in/cdn/shop/files/GJLR-121_Y2.jpg?v=1750236135', '10%', '2024-06-08'),
(14, '1.75Ct Heart Pendant', 78200, 85000, 'Heart', 'Pendant', 1.75, 'https://geer.in/cdn/shop/files/GJPO-032_Y2.jpg?v=1750237260', '8%', '2024-05-25'),
(15, '0.50Ct Emerald Cut Ring', 31250, 34500, 'Emerald', 'Rings', 0.5, 'https://geer.in/cdn/shop/files/GJLR-207_Y2.jpg?v=1750235285', '9%', '2024-04-05'),
(16, '2.25Ct Round Diamond Hoops', 102500, 112500, 'Round', 'Earrings', 2.25, 'https://geer.in/cdn/shop/files/GJER-202_Y2.jpg?v=1750237535', '9%', '2024-06-12'),
(17, '0.75Ct Oval Pendant', 36750, 39500, 'Oval', 'Pendant', 0.75, 'https://geer.in/cdn/shop/files/GJPO-078_Y2.jpg?v=1750236807', '7%', '2024-03-28'),
(18, '3.50Ct Cushion Bracelet', 157500, 175000, 'Cushion', 'Bracelets', 3.5, 'https://geer.in/cdn/shop/files/GJBR-018_Y2.jpg?v=1750236574', '10%', '2024-05-15'),
(19, '1.25Ct Heart Studs', 56200, 61500, 'Heart', 'Fancy Stud', 1.25, 'https://geer.in/cdn/shop/files/GJER-021_Y2.jpg?v=1750239078', '9%', '2024-04-22'),
(20, '0.25Ct Round Diamond Ring', 14200, 15500, 'Round', 'Rings', 0.25, 'https://geer.in/cdn/shop/files/GJLR-228_Y2.jpg?v=1750235316', '8%', '2024-06-18');

```

You can run it via tools like pgAdmin, TablePlus, or psql CLI.

---

## ▶️ Running the Project

```bash
npm run dev
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Panel Access

To manage products (admin panel):

1. Start the development server:  
   ```bash
   npm run dev
   ```

2. Navigate to:  
   [http://localhost:3000/Admin](http://localhost:3000/Admin)

3. Login with credentials:  
   - **Username:** `admin`  
   - **Password:** `admin123`

4. Once logged in, you can:
   - **Add** new products using the **"Add Product"** button  
   - **Edit** products by clicking the ✏️ icon next to a product  
   - **Delete** products by clicking the 🗑️ icon next to a product

> All operations are handled through secure API routes:
> - `POST /api/products` — Create a new product  
> - `PUT /api/products/:id` — Update an existing product  
> - `DELETE /api/products/:id` — Remove a product  
> - `GET /api/products` — Retrieve all products

> ⚠️ Authentication is minimal and intended for **internal/demo use only**.

---
## 📁 Folder Structure Overview

```
├── app/
│   ├── api/
│   │   └── products/      → API routes (GET, POST, PUT, DELETE)
│   ├── components/        → Modal, Form, Product List
│   └── page.js            → Main product dashboard
├── lib/
│   └── db.js              → PostgreSQL connection using pool
├── public/
├── styles/
├── .env.local             → Environment variables
├── package.json
└── README.md
```

## 📓 📌 Notes & Assumptions

- Uses raw SQL queries through `pg`
- API routes in `app/api/products` are responsible for all DB operations.
- No image uploading; image URL is provided manually.
- Admin credentials are hardcoded for simplicity.
- Products are refreshed automatically after every operation
- Discount is calculated if not entered

---
## 🌐 Live Preview

You can check out the deployed version of the project here:

- **🛍️ Main Site**: [https://geer-intern-assignment-4zjr.onrender.com](https://geer-intern-assignment-4zjr.onrender.com)
- **🔐 Admin Portal**: [https://geer-intern-assignment-4zjr.onrender.com/Admin](https://geer-intern-assignment-4zjr.onrender.com/Admin)
  - Login credentials:(for Admin Portal)
    - **Username**: `admin`
    - **Password**: `admin123`

---

## 📬 Contact

For any questions, feel free to contact:[Linkedin](https://www.linkedin.com/in/devang-kishore-shukla-8881402ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
