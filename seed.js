const { db, Cat, Owner } = require('./database/db')

const seed = async () => {
    await db.sync({force: true})
    console.log("DB synced!!!")

    const cat1 = await Cat.create({
        name: "Cat 1",
        age: 1
    })

    const cat2 = await Cat.create({
        name: "Cat 2",
        age: 2
    })

    const cat3 = await Cat.create({
        name: "Cat 3",
        age: 0.5
    })

    const owner1 = await Owner.create({
        name: 'Owner1'
    })

    const owner2 = await Owner.create({
        name: 'Owner2'
    })

    const owner3 = await Owner.create({
        name: 'Owner3'
    })

    //MAGIC METHODS
    console.log(cat1.__proto__) //displays magic methods!
    cat1.setOwners(owner1)
    cat1.setOwners(owner2)
    cat3.setOwners(owner3)
}

seed()