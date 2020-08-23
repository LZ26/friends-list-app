const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/friends', {
  logging: false
});


const Friend = db.define('friend', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },

  rating: {
    type: INTEGER,
    defaultValue: 5,
    allowNull: false
  }
})

const syncAndSeed = async () => {
    await db.sync({ force: true });

    const [ Brax, Arteezy, Topson ] = await Promise.all([
      Friend.create({ name: 'Arteezy', rating: 10}),
      Friend.create({ name: 'Solo', rating: 7}),
      Friend.create({ name: 'Cr1t', rating: 6}),
      Friend.create({ name: 'Noone', rating: 8}),
      Friend.create({ name: 'Iceiceice', rating: 9})
    ]);
  };


module.exports = {
  models: {
    Friend,
  },
  syncAndSeed
};
