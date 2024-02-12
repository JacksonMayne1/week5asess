import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///animals');

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    return `${this.fname} ${this.lname}`;
  }
}

Human.init({
  human_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, { sequelize: db, modelName: 'human' });

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init({
  animal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  human_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'human',
      key: 'human_id'
    }
  }
}, { sequelize: db, modelName: 'animal' });

// Define the relationship
Human.hasMany(Animal, { foreignKey: 'human_id' });
Animal.belongsTo(Human, { foreignKey: 'human_id' });

await db.close();
export default db;
