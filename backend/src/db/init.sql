CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, role_id)
);

INSERT INTO roles(name) VALUES ('Admin'), ('Editor'), ('Viewer');

INSERT INTO users(name, email, time_created, time_updated) VALUES
('Mariia', 'Mariia@example.com', NOW(), NOW()),
('Alex', 'alex@example.com', NOW(), NOW());

INSERT INTO user_roles(user_id, role_id)
SELECT id, (SELECT id FROM roles WHERE name='Viewer') FROM users;
