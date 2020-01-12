import User from '../../database/models/User';
const bcrypt = require('bcrypt')

export default async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const user = await User.findOne({ where: { email: username } });

    if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(404).json({
            errorMessage: 'Account not found'
        });
        return;
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    user.update({api_token: token});

    res.status(200).json({
        token
    });
  };