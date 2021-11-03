const { readFile, writeFile } = require("fs").promises;
const { join } = require("path");
const { v4: uuid } = require("uuid");
class Db {
  constructor(dbFileName) {
    this.dbFileName = join(__dirname, "../data", dbFileName);
    console.log(this.dbFileName);
    this._load();
  }

  async _load() {
    this._data = JSON.parse(
      await readFile(this.dbFileName, {
        encoding: "utf-8",
      })
    );
  }

  _save() {
    writeFile(this.dbFileName, JSON.stringify(this._data), {
      encoding: "utf-8",
    });
  }

  create(obj) {
    this._data.push({
      id: uuid(),
      ...obj,
    });
    this._save();
  }

  getAll() {
    return this._data;
  }

  getOne(id) {
    ``;
    return this._data.find((oneObj) => oneObj.id === id);
  }

  update(id, newObj) {
    this._data = this._data.map((oneObj) =>
      oneObj.id === id
        ? {
            ...oneObj,
            ...newObj,
          }
        : oneObj
    );
    this._save();
  }

  delete(id) {
    this._data = this._data.filter((oneObj) => oneObj.id !== id);
    this._save();
  }
}

const db = new Db("client.json");

module.exports = {
  db,
};
