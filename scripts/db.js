// データベース名とバージョン
var dbName = 'ChatAI';
var dbVersion = 1;
//キャラクターリストを取得
function getAllCharacters(callback) {
  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(['characters'], 'readonly');
    var objectStore = transaction.objectStore('characters');
    var characters = [];
    var getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = function (event) {
      characters = event.target.result;
      if (callback) {
        callback(null, characters);
      }
    };
    getAllRequest.onerror = function (event) {
      if (callback) {
        callback('データの取得中にエラーが発生しました。', null);
      }
    };
    transaction.onerror = function (event) {
      console.error('トランザクション中にエラーが発生しました。', event.target.error);
    };
  };
  request.onerror = function (event) {
    if (callback) {
      callback('データベースの開く中にエラーが発生しました。', null);
    }
  };
}
//キャラクターの情報を取得
function getCharacterById(characterId, callback) {
  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(['characters'], 'readonly');
    var objectStore = transaction.objectStore('characters');
    var getRequest = objectStore.get(characterId);
    getRequest.onsuccess = function (event) {
      var character = event.target.result;
      if (callback) {
        callback(null, character);
      }
    };
    getRequest.onerror = function (event) {
      if (callback) {
        callback('データの取得中にエラーが発生しました。', null);
      }
    };
    transaction.onerror = function (event) {
      console.error('トランザクション中にエラーが発生しました。', event.target.error);
    };
  };
  request.onerror = function (event) {
    if (callback) {
      callback('データベースの開く中にエラーが発生しました。', null);
    }
  };
}
// データをIndexedDBに保存する関数
function saveCharacterToDB(character, callback) {
  var request = indexedDB.open(dbName, dbVersion);
  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore('characters', {
      keyPath: 'id',
      autoIncrement: true
    });
    objectStore.createIndex('name', 'name', {
      unique: false
    });
  };
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(['characters'], 'readwrite');
    var objectStore = transaction.objectStore('characters');
    var addRequest = objectStore.add(character);
    addRequest.onsuccess = function (event) {
      character_id = event.target.result; // 保存されたcharacterのIDを取得
      if (callback) {
        callback(null, 'データが追加されました。');
      }
    };
    addRequest.onerror = function (event) {
      if (callback) {
        callback('データの追加中にエラーが発生しました。', null);
      }
    };
    transaction.oncomplete = function (event) {
      console.log('トランザクションが完了しました。');
    };
    transaction.onerror = function (event) {
      console.error('トランザクション中にエラーが発生しました。', event.target.error);
    };
  };
  request.onerror = function (event) {
    if (callback) {
      callback('データベースの開く中にエラーが発生しました。', null);
    }
  };
}
//キャラクターデータをアップデート
function updateCharacterInDB(characterId, updatedData, callback) {
  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(['characters'], 'readwrite');
    var objectStore = transaction.objectStore('characters');
    var getRequest = objectStore.get(characterId);
    getRequest.onsuccess = function (event) {
      var existingCharacter = event.target.result;
      if (existingCharacter) {
        // 更新データを適用
        existingCharacter.name = updatedData.name;
        existingCharacter.image_base_64 = updatedData.image_base_64;
        existingCharacter.info = updatedData.info;
        existingCharacter.conversation = updatedData.conversation;
        // 更新を実行
        var updateRequest = objectStore.put(existingCharacter);
        updateRequest.onsuccess = function (event) {
          if (callback) {
            callback(null, 'データが更新されました。');
          }
        };
        updateRequest.onerror = function (event) {
          if (callback) {
            callback('データの更新中にエラーが発生しました。', null);
          }
        };
      } else {
        if (callback) {
          callback('指定されたIDのデータが見つかりませんでした。', null);
        }
      }
    };
    transaction.oncomplete = function (event) {
      console.log('トランザクションが完了しました。');
    };
    transaction.onerror = function (event) {
      console.error('トランザクション中にエラーが発生しました。', event.target.error);
    };
  };
  request.onerror = function (event) {
    if (callback) {
      callback('データベースの開く中にエラーが発生しました。', null);
    }
  };
}
//キャラクター削除
function deleteCharacterById(characterId, callback) {
  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(['characters'], 'readwrite');
    var objectStore = transaction.objectStore('characters');
    var deleteRequest = objectStore.delete(characterId);
    deleteRequest.onsuccess = function (event) {
      if (callback) {
        callback(null, 'データが削除されました。');
      }
    };
    deleteRequest.onerror = function (event) {
      if (callback) {
        callback('データの削除中にエラーが発生しました。', null);
      }
    };
    transaction.oncomplete = function (event) {
      console.log('トランザクションが完了しました。');
    };
    transaction.onerror = function (event) {
      console.error('トランザクション中にエラーが発生しました。', event.target.error);
    };
  };
  request.onerror = function (event) {
    if (callback) {
      callback('データベースの開く中にエラーが発生しました。', null);
    }
  };
}