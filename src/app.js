const express = require('express');

const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const statusRoutes = require('./routes/status.routes');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api', statusRoutes);
app.use('/', statusRoutes);

module.exports = app;
