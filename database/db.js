const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize("postgres://localhost:5432/demodb", {
  logging: false
});

const Cat = db.define('cats', {
    name: Sequelize.STRING, 
    age: Sequelize.DOUBLE
})

const Owner = db.define('owner', {
    name: Sequelize.STRING
})

//1 to Many 
/*
Owner.hasMany(Cat) 
Cat.belongsTo(Owner) //sets FK on Cat table - ownerId
*/

//Many to Many Relationship with Cats and Owners! 
Cat.belongsToMany(Owner, {through: 'cats_owners'})
Owner.belongsToMany(Cat, {through: 'cats_owners'})

//instance method
Cat.prototype.sayHello = function () {
    console.log(`${this.name} says Hello!!!!`)
}

//Class Method
Cat.getKittens = async function () {
    const kittens = await Cat.findAll({
        where: {
            age: {[Op.lte]: 1}}
    })
    return kittens
}

module.exports = {
    db,
    Cat, 
    Owner
}