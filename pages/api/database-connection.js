import User from '../../database/models/User';

export default async (req, res) => {
    const users = await User.findAll({
        raw: true,
        attributes: ['name', 'email'],
        where: {
          api_token: 'mysecrettoken'
        }
      });

    const name = users[0].name;
    const email = users[0].email;

    res.status(200).json({
     name,
     email
    });
  };