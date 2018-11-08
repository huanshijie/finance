
class CostRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS cost (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE, 
        name TEXT,
        cost FLOAT,
        lastOperator TEXT,
        comment TEXT,
        status TINYINT DEFAULT 0,
        isDeleted TINYINT DEFAULT 0
      )
    `
    // const sql = `ALTER TABLE cost ADD COLUMN lastOperator TEXT;`
    return this.dao.run(sql);
  }
  create(date, name, cost, comment, isDeleted, lastOperator) {
    return this.dao.run(
      `INSERT INTO cost (date, name, cost, comment, isDeleted, lastOperator) VALUES (?, ?, ?, ?, ?, ?)`,
      [date, name, cost, comment, isDeleted, lastOperator]
    );
  }
  delete(id, lastOperator) {
    return this.dao.run(
      `UPDATE cost SET isDeleted = 1, lastOperator= ? WHERE id = ?`, 
      [lastOperator, id]
    );
  }

  getAll() {
    return this.dao.all(`SELECT id, date, name, cost, comment FROM cost WHERE isDeleted = 0 `);
  }

  getAllByMonth(year, month) {
    return this.dao.all(
      `SELECT id, date, name, cost, comment FROM cost WHERE isDeleted = 0 and strftime('%Y', date) = ? and strftime('%m', date) = ?`,
      [year, month]
    );
  }

  magic() {
    return this.dao.all(`SELECT * FROM cost`);
  }
}

module.exports = CostRepository;