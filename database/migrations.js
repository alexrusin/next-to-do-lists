import User from './models/User'

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        name: 'Alex Rusin',
        email: 'alex@alexrusin.com',
        password: 'mysecretpassowrd',
        api_token: 'mysecrettoken'
      });
  });