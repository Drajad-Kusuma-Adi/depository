CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    avatar_id TEXT,
    banned INTEGER DEFAULT 0,
    is_shop INTEGER DEFAULT 0,
    is_admin INTEGER DEFAULT 0,
    remember_token TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (avatar_id) REFERENCES files(id) ON DELETE SET NULL ON UPDATE SET NULL
);

CREATE TABLE files (
    id TEXT PRIMARY KEY,
    filename TEXT,
    created_at INTEGER,
    updated_at INTEGER
);

CREATE TABLE products (
    id TEXT PRIMARY KEY,
    owner_id TEXT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE product_photos (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    photo_id TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (photo_id) REFERENCES files(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    customer_id TEXT,
    method TEXT DEFAULT 'cod',
    longitude REAL,
    latitude REAL,
    address_criteria TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    user_id TEXT,
    content TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ratings (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    user_id TEXT,
    rating INTEGER,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE transaction_items (
    id TEXT PRIMARY KEY,
    transaction_id TEXT,
    product_id TEXT,
    quantity INTEGER,
    status TEXT DEFAULT 'pending',
    delivery_date INTEGER,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comment_photos (
    id TEXT PRIMARY KEY,
    comment_id TEXT,
    photo_id TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (photo_id) REFERENCES files(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE wishlists (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    user_id TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);