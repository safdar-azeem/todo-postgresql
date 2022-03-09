import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
   dialect: 'postgres',
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT || '5432', 10),
})

const initializeDatabase = async () => {
   try {
      await sequelize.authenticate()
      console.log('Connection to the database has been established successfully.')
      await sequelize.sync()
      console.log('All models were synchronized successfully.')
   } catch (error) {
      console.error('Unable to connect to the database:', error)
   }
}

export { initializeDatabase, sequelize, Sequelize }
