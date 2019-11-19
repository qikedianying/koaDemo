// image title pubdate content fav_nums type // 代号\
const {Sequelize, Model} = require('sequelize')
const { db } = require('../core/db') // 重命名
const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.STRING,
  fav_nums: Sequelize.INTEGER,
  title: Sequelize.STRING,
  type: Sequelize.INTEGER,
}
class Base extends Model{

}

class Movie extends Model {}
Movie.init(classicFields, {
  sequelize: db,
  tableName: 'movie'
},)

class Sentence extends Base {}
Sentence.init(classicFields, {
  sequelize: db,
  tableName: 'sentence'
},)



class Music extends Base {}
Music.init(Object.assign({
  url: Sequelize.STRING
}, classicFields), {
  sequelize: db,
  tableName: 'music'
},)

module.exports = {
  Movie,
  Sentence,
  Music
}
