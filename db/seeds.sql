INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Production'),
    ('Finance');

INSERT INTO role (title, salary, department)
VALUES
    ('Manager', 22.50, 2)
    ('engineer', 17.50, 2),
    ('Salesman', 14.50, 1),
    ('Accountant', 19.50, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Traves', 'Manchester', 1),
    ("Samatha", 'Tally', 1),
    ('Sally', 'Baker', 2, 1),
    ('Megan', "Smith", 4, 2),
    ('Justin', 'Longbottum', 3, 1);