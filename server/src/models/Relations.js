export default async function Relations(db) {
  await db.users.hasMany(db.users_sessions, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  })
  await db.users_sessions.belongsTo(db.users, {
    foreignKey: {
      name: 'user_id',
      allowNull: false
    }
  })
}