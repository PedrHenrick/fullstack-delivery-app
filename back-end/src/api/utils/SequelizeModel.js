class SequelizeModel {
  constructor(model) { this.model = model; }

  async create(createObject) {
    return this.model
      .create({ ...createObject });
  }

  async findOrCreate(whereObject, defaultObject) {
    return this.model
      .findOrCreate({ where: { ...whereObject }, defaults: { ...defaultObject } });
  }

  async findAll() {
    return this.model
      .findAll();
  }

  async findOne(whereObject) {
    return this.model
      .findOne({ where: { ...whereObject } });
  }

  async update(id, updateObject) {
    return this.model
      .update(updateObject, { where: { id } });
  }

  async delete(id) {
    return this.model
      .destroy({ where: { id } });
  }
}

module.exports = { SequelizeModel };
