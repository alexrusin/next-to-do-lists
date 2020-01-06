const Sequelize = require('sequelize');
import sequelize from '../connection';

const User = sequelize.define('user', {
    // attributes
    
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    api_token: {
      type: Sequelize.STRING,
    }
  }, {
    // options
  });

  export default User;