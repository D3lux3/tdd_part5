import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../utils/database';


class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
    declare id: string;
    declare name: string;
    declare done: boolean;
}
Todo.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'todo',
    tableName: 'todos',
}
);


export default Todo;