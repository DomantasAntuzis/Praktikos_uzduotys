'use strict';

exports.up = function (db, callback) {
  // Create table operacijos
  db.createTable('operacijos', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    produkto_id: { type: 'int', notNull: true },
    date: { type: 'date', defaultValue: new String('current_timestamp()') },
    kiekis: { type: 'int' },
    kaina: { type: 'decimal', length: '10,2' },
    suma: { type: 'decimal', length: '10,2' }
  }, function (err) {
    if (err) return callback(err);

    // Create table produktai
    db.createTable('produktai', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      pavadinimas: { type: 'string', length: 255, notNull: true },
      aprasymas: { type: 'string', length: 255 },
      pirkimo_suma: { type: 'decimal', length: '10,2' },
      pardavimo_suma: { type: 'decimal', length: '10,2' },
      likutis: { type: 'int' }
    }, function (err) {
      if (err) return callback(err);

      callback();
    });
  });
};

exports.down = function (db, callback) {
  // Drop table operacijos
  db.dropTable('operacijos', function (err) {
    if (err) return callback(err);

    // Drop table produktai
    db.dropTable('produktai', callback);
  });
};
