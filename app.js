const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('public', path.join(__dirname, 'public'));


app.get('/', (_req, res) => res.sendFile('index.html', { root: './views' }));

app.get('/students', (_req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).send('Database error');
        }
        res.send(results);
    });
});

app.post('/add', (req, res) => {
    const { student_id, full_name, email, phone, dob, gender, course, status } = req.body;
    db.query(
        'INSERT INTO students SET ?',
        { student_id, full_name, email, phone, dob, gender, course, status },
        (err, result) => {
            if (err) {
                console.error('Error inserting student:', err);
                return res.status(500).send('Database error');
            }
            res.redirect('/');
        }
    );
});

app.get('/edit/:id', (_req, res) => res.sendFile('edit.html', { root: './views' }));

app.post('/update/:id', (req, res) => {
    const { student_id, full_name, email, phone, dob, gender, course, status } = req.body;
    db.query(
        'UPDATE students SET ? WHERE id = ?',
        [{ student_id, full_name, email, phone, dob, gender, course, status }, req.params.id],
        (err, result) => {
            if (err) {
                console.error('Error updating student:', err);
                return res.status(500).send('Database error');
            }
            res.redirect('/');
        }
    );
});

app.get('/delete/:id', (req, res) => {
    db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).send('Database error');
        }
        res.redirect('/');
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));