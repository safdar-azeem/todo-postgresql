import { DataTypes, Model } from 'sequelize'
import { sequelize, Sequelize } from '../config/database'

class Todo extends Model {
   public id!: number
   public description!: string
}

Todo.init(
   {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      sequelize,
      modelName: 'Todo',
   }
)

const TodoFactory = () => Todo

export { Todo, TodoFactory }
