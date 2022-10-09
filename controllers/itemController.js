const { Item, ItemInfo } = require('../models/models')
const ApiError = require('../errors/ApiError')
const uuid = require('uuid')
const path = require('path')

class ItemController {

  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info} = req.body
      const { image } = req.files
      const fileName = uuid.v4() + '.jpg'
      await image.mv(path.resolve(__dirname, '..', 'static', fileName))
      const item =  await Item.create({ name, price, typeId, brandId, image: fileName })

      if (info) {
        info = JSON.parse(info)
        info.forEach( item => {
          ItemInfo.create({
            title: item.title,
            description: item.description,
            itemId: item.id
          })
        })
      }

      return res.json(item)
    } catch(e) {
      return next(ApiError.badRequest(e))
    }

  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 10
    let offset = page * limit - limit
    let items;
    if (!brandId && !typeId) {
      items = await Item.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
      items = await Item.findAndCountAll({where: {brandId}, limit, offset})
    }
    if (!brandId && typeId) {
      items = await Item.findAndCountAll({where: {typeId}, limit, offset})
    }if (brandId && typeId) {
      items = await Item.findAndCountAll({where: {brandId, typeId}, limit, offset})
    }

    return res.json(items)
  }
  async getItem(req, res) {
    const { id } = req.params
    const item = await Item.findOne({
      where: {
        id},
      include: [{
        model: ItemInfo,
        as: 'info'
      }]
    })

    res.json(item)
  }
}

module.exports = new ItemController()
