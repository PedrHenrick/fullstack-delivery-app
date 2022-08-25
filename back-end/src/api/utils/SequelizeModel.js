class SequelizeModel {
  constructor(model) { this._model = model }

  create = async (createObject) => this._model
    .create({ ...createObject });

  findAll = async () => this._model
    .findAll();

  findOne = async (whereObject) => this._model
    .findOne({ where: { ...whereObject } });

  update = async (id, updateObject) => this._model
    .update(updateObject, { where: { id } });

  delete = async (_id) => this._model
    .destroy({ where: { id } });
}

module.exports = { SequelizeModel };
