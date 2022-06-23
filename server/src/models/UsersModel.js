export default async function UsersModel(sequelize, Sequelize) {
  return sequelize.define('users', {
    user_id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4()
    },
    user_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    user_login: {
      type: Sequelize.DataTypes.STRING(32),
      is: /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
      allowNull: false,
      unique: true
    },
    user_password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  })
}