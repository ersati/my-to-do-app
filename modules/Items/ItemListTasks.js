const Item = require("./ItemModel.js")

const hobb = new Item({
    list: "Hobby"
})

const heal = new Item({
    list: "Health"
})

const fin = new Item({
    list: "Finance"
})
module.exports = [hobb, heal, fin]