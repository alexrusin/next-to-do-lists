import User from '../../database/models/User';

export default async (req, res) => {
    const token = req.body.token;
    
    const user = await User.findOne({ where: { api_token: token } });

    if (!user) {
        res.status(401).json({
            errorMessage: 'Account not found'
        });
        return;
    }

    res.status(200).json({
        name: user.name
    });
  };