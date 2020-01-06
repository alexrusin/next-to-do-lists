import User from '../../database/models/User';

export default async (req, res) => {
    const username = req.body.username;
    
    const user = await User.findOne({ where: { email: username } });

    if (!user) {
        console.log('User not found');
        res.status(404).json({
            errorMessage: 'Not found'
        });
        return;
    }

    const token = 'mysecrettokenforlogin';

    user.update({api_token: token});

    res.status(200).json({
        token
    });
  };