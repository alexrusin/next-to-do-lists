import User from '../../database/models/User';
const bcrypt = require('bcrypt');

export default async (req, res) => {
    const email = req.body.email;
    
    const user = await User.findOne({ where: { email } });

    if (user) {
        res.status(400).json({
            errorMessage: 'User with such email already exists'
        });
        return;
    }

    const hash = await bcrypt.hash(req.body.password, 10)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        api_token: token
      });

    res.status(200).json({
        token
    });
  };