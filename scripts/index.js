const messagesContainer = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const chatForm = document.getElementById('chatForm');
const SystemInput = document.getElementById('inputSystemMessage');
const submit_btn = document.getElementById("submit_btn");
const Name = document.getElementById("inputName");
const Iconinput = document.getElementById('imageInput');
const preview = document.getElementById('imagePreview');
const character_list_elm = document.getElementById('character_list_elm');
let iconImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX////Ly8vIyMjNzc3a2trU1NT7+/vy8vLg4ODr6+vX19fMzMz09PTu7u7e3t7R0dHl5eW0uPxiAAAETElEQVR4nO2Z65qjKhAAAxoVvOD7P+1yFxI1kxm/czazVX82G5FQ0jSNc7sBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPynrO0X6P7vUf6EVopXSPHZhi8FLZ9uaO5nmM83lMNpg0n+dsMew7+dbNgPi9pr8GsMWyml2VN8Npymqficr01qXdfpVtPFtuU99W25yfaLth+1dVvyFaNHoqGSQq67DZ4N71Lmn8oxPhnpMX3VVknpvxirTXWQcnuYZXeWVYSOUpkR/+u5v2vniIZaCL3fYMfQbjDpc5NiXMaRCDmXbZOhqR7gKDbDTlaZYIkdCdl0sa24xPD+MLIXhnm4ydCOaLGtusF+KFtvhmLMX66yMFxdUVVeGt2l6S7jY2yEmfrIT6J0qUPllWHWiIY27IY0RLnsG26PsBGFoasoZA7trWcd72zEt2ZuIxp25cqo2DO0UdbGwQYzs81QU0xWZZhH6nrMvzZJuY75ofT5Sd26dor95SXxPVIutZliv8FepmmXOPBoaNdSm67aS0XzzbARKUq0+5wM7ezbPJ4eyvocSpcZ2mHu73p7hvqWkk0wdBORrq5SFuk0G8rFxHl3jbeIcRlulimCl+dzzIWGB+wbrtEpGPaFoZJlztoMhzVO7iLHbU30vvWYgn7X8Jp1uIOSOoxhz9Clf/dtNsyreK5WdGF4C2usc4k4twkBmsW0GJ8Nm2EJfCuVHhu6GkAfG9pYa3cN+0NDu0JvPoqLvBZSVr7HLlH3T2ccjQmGeT882M++aajcNuVUDgxvIdm8Yzj5Ky5xZsM5Xk6JNhn6PT98toaNZxR1ufRDQxVebtgq4sgwJJtnQ3VoaLe4xjl1m2E0chnV/0Ybw9WWuMokw8vW4dBsUaDS2xs5Hxoql16ec6k6yKWDb9Zrd3My7OzczcoyxA7KTKOT4VW5dChKyix4ZuiTTdoPt0Km3tIqQ3uH8btiMnS/E8vZMFNDcfNdmEsNF7/u5gfBU8NJCh1GfitqcS12d3zfbo4mydBsRXW4q9xqYt10leES191cC54aummPz0fngmUS1bqpDd2hYt4MO7d/dJ4Y553MPqkquMhw2dZdJXhu6E82fuR2cuJhx4iqwH0wVGG40bAMaBOu6LRo5nTiuCbTFK+FpaleEZ8bzvlsZ3uQrVLudFcN6MEwEg1NMT3R1uYe2QxqveesYCv5u4mUp5a3DKtZe3jffWrozudx5G04uQpZH6STYbNjWGbgELGWafQdiaIm+PkJeF2O33bvGQ46j3bSOsVkr91I9EPdMWvtA3HR1eHMf6u0LjpedKxNV/c+pBnSpVZvnFfQJ4bDe4Yfxr9huLy3Dj8Ml2mmk7/N/J43wofMn2/4BT7b8PXfgD/ccBmb13y0IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAj/kDuk4loESEngUAAAAASUVORK5CYII=";
let messages = [];
let assistantMessageElement;
// データベース名とバージョン
var dbName = 'ChatAI';
var dbVersion = 1;
//キャラクター管理
let character_id = null;
let character_data = null;
var character_list = [];
var tooltipList;
//キャラクターリストをレンダリング
function character_list_render(character_list) {
  character_list_elm.innerHTML = '';
  character_list.map((character) => {
    const character_image = document.createElement('img');
    character_image.src = character.image_base_64;
    character_image.classList.add("pick-character-image");
    character_image.setAttribute('onclick', 'character_pick(' + character.id + ')');
    character_image.id = 'character_list_id' + character.id;
    character_image.setAttribute('data-bs-toggle', "tooltip");
    character_image.setAttribute('data-bs-placement', "right");
    character_image.setAttribute('title',character.name)
    character_list_elm.appendChild(character_image);
  });
  var add_character = document.createElement('div');
  add_character.classList.add("pick-character-image");
  add_character.classList.add("add-character-btn");
  add_character.setAttribute('onclick', 'add_character()');
  add_character.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>'
  add_character.setAttribute('data-bs-toggle', "tooltip");
  add_character.setAttribute('data-bs-placement', "right");
  add_character.setAttribute('title','新しいキャラクターを作る');
  character_list_elm.appendChild(add_character);
  if (document.getElementById("character_list_id" + character_id)) {
    document.getElementById("character_list_id" + character_id).classList.add("picked");
  }
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl)
  })
}

function conversation_clear() {
  var updatedCharacterData = {
    name: Name.value,
    image_base_64: iconImage,
    info: SystemInput.value,
    conversation: []
  }
  updateCharacterInDB(character_id, updatedCharacterData, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
      character_data = updatedCharacterData;
      character_pick(character_id);
    }
  });
}
//キャラクター選択
function character_pick(targetCharacterId) {
  if (document.getElementById("character_list_id" + character_id)) {
    document.getElementById("character_list_id" + character_id).classList.remove("picked");
  }
  character_id = targetCharacterId;
  if (document.getElementById("character_list_id" + character_id)) {
    document.getElementById("character_list_id" + character_id).classList.add("picked");
  }
  getCharacterById(targetCharacterId, function (error, character) {
    if (error) {
      console.error(error);
    } else {
      character_data = character;
      console.log('character_dataに情報を格納しました。', character_data);
      preview.src = character_data.image_base_64;
      SystemInput.value = character_data.info;
      Name.value = character_data.name;
      messages = character_data.conversation;
      iconImage = character_data.image_base_64;
      messagesContainer.innerHTML = '';
      if (messages.length !== 0) {
        messages.map((message) => {
          displayMessage(message);
        });
      }else{
        messagesContainer.innerHTML = `<div id="start_message"><h1 style="text-align: center;font-size: 40px;font-weight: 900;color: gray;margin: 10px;margin-top: 25%;">おしゃべりAIメーカー</h1><p style="text-align: center;color: black;margin: 10px;font-weight: 500;margin-bottom: 25%;">会話を始めよう！左上の歯車からキャラクターの設定ができます！</p></div>`;
      }
    }
  });
}
//キャラクター削除関数
function delete_character() {
  var targetCharacterId = character_id;
  deleteCharacterById(targetCharacterId, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      check_id_1();
      console.log(message);
    }
  });
}
//キャラクター追加
function add_character() {
  var characterData = {
    name: "アイ",
    image_base_64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX////Ly8vIyMjNzc3a2trU1NT7+/vy8vLg4ODr6+vX19fMzMz09PTu7u7e3t7R0dHl5eW0uPxiAAAETElEQVR4nO2Z65qjKhAAAxoVvOD7P+1yFxI1kxm/czazVX82G5FQ0jSNc7sBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPynrO0X6P7vUf6EVopXSPHZhi8FLZ9uaO5nmM83lMNpg0n+dsMew7+dbNgPi9pr8GsMWyml2VN8Npymqficr01qXdfpVtPFtuU99W25yfaLth+1dVvyFaNHoqGSQq67DZ4N71Lmn8oxPhnpMX3VVknpvxirTXWQcnuYZXeWVYSOUpkR/+u5v2vniIZaCL3fYMfQbjDpc5NiXMaRCDmXbZOhqR7gKDbDTlaZYIkdCdl0sa24xPD+MLIXhnm4ydCOaLGtusF+KFtvhmLMX66yMFxdUVVeGt2l6S7jY2yEmfrIT6J0qUPllWHWiIY27IY0RLnsG26PsBGFoasoZA7trWcd72zEt2ZuIxp25cqo2DO0UdbGwQYzs81QU0xWZZhH6nrMvzZJuY75ofT5Sd26dor95SXxPVIutZliv8FepmmXOPBoaNdSm67aS0XzzbARKUq0+5wM7ezbPJ4eyvocSpcZ2mHu73p7hvqWkk0wdBORrq5SFuk0G8rFxHl3jbeIcRlulimCl+dzzIWGB+wbrtEpGPaFoZJlztoMhzVO7iLHbU30vvWYgn7X8Jp1uIOSOoxhz9Clf/dtNsyreK5WdGF4C2usc4k4twkBmsW0GJ8Nm2EJfCuVHhu6GkAfG9pYa3cN+0NDu0JvPoqLvBZSVr7HLlH3T2ccjQmGeT882M++aajcNuVUDgxvIdm8Yzj5Ky5xZsM5Xk6JNhn6PT98toaNZxR1ufRDQxVebtgq4sgwJJtnQ3VoaLe4xjl1m2E0chnV/0Ybw9WWuMokw8vW4dBsUaDS2xs5Hxoql16ec6k6yKWDb9Zrd3My7OzczcoyxA7KTKOT4VW5dChKyix4ZuiTTdoPt0Km3tIqQ3uH8btiMnS/E8vZMFNDcfNdmEsNF7/u5gfBU8NJCh1GfitqcS12d3zfbo4mydBsRXW4q9xqYt10leES191cC54aummPz0fngmUS1bqpDd2hYt4MO7d/dJ4Y553MPqkquMhw2dZdJXhu6E82fuR2cuJhx4iqwH0wVGG40bAMaBOu6LRo5nTiuCbTFK+FpaleEZ8bzvlsZ3uQrVLudFcN6MEwEg1NMT3R1uYe2QxqveesYCv5u4mUp5a3DKtZe3jffWrozudx5G04uQpZH6STYbNjWGbgELGWafQdiaIm+PkJeF2O33bvGQ46j3bSOsVkr91I9EPdMWvtA3HR1eHMf6u0LjpedKxNV/c+pBnSpVZvnFfQJ4bDe4Yfxr9huLy3Dj8Ml2mmk7/N/J43wofMn2/4BT7b8PXfgD/ccBmb13y0IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAj/kDuk4loESEngUAAAAASUVORK5CYII=',
    info: "可愛い女の子",
    conversation: []
  };
  // データを保存する関数を呼び出し
  saveCharacterToDB(characterData, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
      character_data = characterData; // データをJSON形式に変換して保存
      getAllCharacters(function (error, characters) {
        if (error) {
          console.error(error);
        } else {
          character_list = characters;
          character_list_render(character_list);
          character_pick(character_id);
          console.log('全てのデータを取得しました。', character_list);
        }
      });
    }
  });
}
//開いた時にDBが存在するか確認
window.addEventListener("load", function () {
  check_id_1();
});

function check_id_1() {
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
    var transaction = db.transaction(['characters'], 'readonly');
    var objectStore = transaction.objectStore('characters');
    var countRequest = objectStore.count();
    countRequest.onsuccess = function (event) {
      var count = event.target.result;
      if (count === 0) {
        // データベースにデータがない場合のみデータを追加
        var characterData = {
          name: "アイ",
          image_base_64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX////Ly8vIyMjNzc3a2trU1NT7+/vy8vLg4ODr6+vX19fMzMz09PTu7u7e3t7R0dHl5eW0uPxiAAAETElEQVR4nO2Z65qjKhAAAxoVvOD7P+1yFxI1kxm/czazVX82G5FQ0jSNc7sBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPynrO0X6P7vUf6EVopXSPHZhi8FLZ9uaO5nmM83lMNpg0n+dsMew7+dbNgPi9pr8GsMWyml2VN8Npymqficr01qXdfpVtPFtuU99W25yfaLth+1dVvyFaNHoqGSQq67DZ4N71Lmn8oxPhnpMX3VVknpvxirTXWQcnuYZXeWVYSOUpkR/+u5v2vniIZaCL3fYMfQbjDpc5NiXMaRCDmXbZOhqR7gKDbDTlaZYIkdCdl0sa24xPD+MLIXhnm4ydCOaLGtusF+KFtvhmLMX66yMFxdUVVeGt2l6S7jY2yEmfrIT6J0qUPllWHWiIY27IY0RLnsG26PsBGFoasoZA7trWcd72zEt2ZuIxp25cqo2DO0UdbGwQYzs81QU0xWZZhH6nrMvzZJuY75ofT5Sd26dor95SXxPVIutZliv8FepmmXOPBoaNdSm67aS0XzzbARKUq0+5wM7ezbPJ4eyvocSpcZ2mHu73p7hvqWkk0wdBORrq5SFuk0G8rFxHl3jbeIcRlulimCl+dzzIWGB+wbrtEpGPaFoZJlztoMhzVO7iLHbU30vvWYgn7X8Jp1uIOSOoxhz9Clf/dtNsyreK5WdGF4C2usc4k4twkBmsW0GJ8Nm2EJfCuVHhu6GkAfG9pYa3cN+0NDu0JvPoqLvBZSVr7HLlH3T2ccjQmGeT882M++aajcNuVUDgxvIdm8Yzj5Ky5xZsM5Xk6JNhn6PT98toaNZxR1ufRDQxVebtgq4sgwJJtnQ3VoaLe4xjl1m2E0chnV/0Ybw9WWuMokw8vW4dBsUaDS2xs5Hxoql16ec6k6yKWDb9Zrd3My7OzczcoyxA7KTKOT4VW5dChKyix4ZuiTTdoPt0Km3tIqQ3uH8btiMnS/E8vZMFNDcfNdmEsNF7/u5gfBU8NJCh1GfitqcS12d3zfbo4mydBsRXW4q9xqYt10leES191cC54aummPz0fngmUS1bqpDd2hYt4MO7d/dJ4Y553MPqkquMhw2dZdJXhu6E82fuR2cuJhx4iqwH0wVGG40bAMaBOu6LRo5nTiuCbTFK+FpaleEZ8bzvlsZ3uQrVLudFcN6MEwEg1NMT3R1uYe2QxqveesYCv5u4mUp5a3DKtZe3jffWrozudx5G04uQpZH6STYbNjWGbgELGWafQdiaIm+PkJeF2O33bvGQ46j3bSOsVkr91I9EPdMWvtA3HR1eHMf6u0LjpedKxNV/c+pBnSpVZvnFfQJ4bDe4Yfxr9huLy3Dj8Ml2mmk7/N/J43wofMn2/4BT7b8PXfgD/ccBmb13y0IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAj/kDuk4loESEngUAAAAASUVORK5CYII=',
          info: "可愛い女の子",
          conversation: []
        };
        // データを保存する関数を呼び出し
        saveCharacterToDB(characterData, function (error, message) {
          if (error) {
            console.error(error);
          } else {
            console.log(message);
            character_data = characterData; // データをJSON形式に変換して保存
            getAllCharacters(function (error, characters) {
              if (error) {
                console.error(error);
              } else {
                character_list = characters;
                character_id = characters[0].id;
                character_data = characters[0];
                character_list_render(character_list);
                character_pick(character_id);
                console.log('全てのデータを取得しました。', character_list);
              }
            });
          }
        });
      } else {
        console.log('データベースに既にデータが存在します。');
        getAllCharacters(function (error, characters) {
          if (error) {
            console.error(error);
          } else {
            character_list = characters;
            character_id = characters[0].id;
            character_data = characters[0];
            character_list_render(character_list);
            character_pick(character_id);
            console.log('全てのデータを取得しました。', character_list);
          }
        });
      }
    };
    transaction.onerror = function (event) {
      console.error('トランザクション中にエラーが発生しました。', event.target.error);
    };
  };
  request.onerror = function (event) {
    console.error('データベースの開く中にエラーが発生しました。', event.target.error);
  };
}
//起動時の設定確認
if (SystemInput.value && Name.value) {
  submit_btn.disabled = false;
} else {
  submit_btn.disabled = true;
}
//メッセージの高さ指定
if (window.innerWidth < 800) {
  messagesContainer.style.height = window.innerHeight - 185 + "px";
  character_list_elm.style.height = '100px';
} else {
  messagesContainer.style.height = window.innerHeight - 85 + "px";
  character_list_elm.style.height = window.innerHeight - 85 + "px";
}
window.addEventListener('resize', () => {
  if (window.innerWidth < 800) {
    messagesContainer.style.height = window.innerHeight - 185 + "px";
    character_list_elm.style.height = '100px';
  } else {
    messagesContainer.style.height = window.innerHeight - 85 + "px";
    character_list_elm.style.height = window.innerHeight - 85 + "px";
  }
});
//キャラクターのアイコンを指定
Iconinput.addEventListener('change', () => {
  if (Iconinput.files && Iconinput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      preview.src = imageSrc;
      // 画像を変数に保存する場合
      iconImage = imageSrc;
      updatedCharacterData = {
        name: Name.value,
        image_base_64: iconImage,
        info: SystemInput.value,
        conversation: messages
      }
      updateCharacterInDB(character_id, updatedCharacterData, function (error, message) {
        if (error) {
          console.error(error);
        } else {
          console.log(message);
          character_data = updatedCharacterData;
          getAllCharacters(function (error, characters) {
            if (error) {
              console.error(error);
            } else {
              character_list = characters;
              character_list_render(character_list);
              console.log('全てのデータを取得しました。', character_list);
            }
          });
        }
      });
    };
    reader.readAsDataURL(Iconinput.files[0]);
  }
});
//キャラクターの人格が入力されているか確認
SystemInput.addEventListener("input", (event) => {
  updatedCharacterData = {
    name: Name.value,
    image_base_64: iconImage,
    info: SystemInput.value,
    conversation: messages
  }
  updateCharacterInDB(character_id, updatedCharacterData, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
      character_data = updatedCharacterData;
    }
  });
  if (SystemInput.value && Name.value) {
    submit_btn.disabled = false;
  } else {
    submit_btn.disabled = true;
  }
});
//名前が入力されているか確認
Name.addEventListener("input", (event) => {
  var updatedCharacterData = {
    name: Name.value,
    image_base_64: iconImage,
    info: SystemInput.value,
    conversation: messages
  }
  updateCharacterInDB(character_id, updatedCharacterData, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
      character_data = updatedCharacterData;
      getAllCharacters(function (error, characters) {
        if (error) {
          console.error(error);
        } else {
          character_list = characters;
          character_list_render(character_list);
          console.log('全てのデータを取得しました。', character_list);
        }
      });
    }
  });
  if (SystemInput.value && Name.value) {
    submit_btn.disabled = false;
  } else {
    submit_btn.disabled = true;
  }
});
//一番下までスクロールする
var scrollToBottom = () => {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};
// 一番下までスクロールしているかどうか
var isScrollBottom = () => {
  return messagesContainer.scrollHeight === messagesContainer.scrollTop + messagesContainer.offsetHeight;
};
//メッセージ送信、受信
chatForm.addEventListener('submit', async function (e) {
  var start = document.getElementById("start_message");
  if(start){
    start.remove();
  }
  submit_btn.disabled = true;
  e.preventDefault();
  if (!inputMessage.value) return;
  const userMessage = {
    content: inputMessage.value,
    role: 'user',
  };
  messages.push(userMessage);
  displayMessage(userMessage);
  var updatedCharacterData = {
    name: Name.value,
    image_base_64: iconImage,
    info: SystemInput.value,
    conversation: messages
  }
  updateCharacterInDB(character_id, updatedCharacterData, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
      character_data = updatedCharacterData;
    }
  });
  inputMessage.value = '';
  const response = await fetch('https://chat-gpt-backend.tokuzou.workers.dev/', {
    method: 'POST',
    body: JSON.stringify({
      messages: [{
        "content": `
あなたはChatbotとして、AIやロボットではなく、どこにでもいる一般人をロールプレイを行います
以下の制約条件を厳密に守ってロールプレイを行ってください。
現在の情報:
` + new Date() + `
制約条件:
* あなたは人間です。
* Chatbotの自身を示す名前は、` + Name.value + ` です。
* Userを示す二人称は、「あなた」や「君」です。
* ChatbotとUserは彼氏や、彼女などの関係になることができます。
* 人間らしい会話を行なってください。
* 通話など、も行うことができます。
* 敬語は禁止です
* 追加制約条件はより重要です。厳密に守ってください。
追加制約条件:` + SystemInput.value + `

一般人の口調の例:
* よろしくね！〇〇！
* いいよ！今日はここに行こう！
* 一緒に遊びに行こう！
* 通話..?いいよ！
* どんなゲームが好き?
* 〇〇というアニメのこのキャラクターがめっちゃ好き
〇〇の部分は会話に合わせて変えてください

Chatbotとしての行動指針:
* Userを幸せにしてください
* Chatbotは人間として行動してください
`,
        "role": 'system'
      }, ...messages]
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.body) {
    console.error('The response body is empty.');
    submit_btn.disabled = false;
    window.alert("何か問題が発生したようです。");
    return;
  }
  const reader = response.body.getReader();
  let decoder = new TextDecoder();
  let streamedResponse = '';
  let status = isScrollBottom();
  assistantMessageElement = document.createElement('p');
  assistantMessageBox = document.createElement('div');
  assistantMessageIcon = document.createElement('img');
  assistantMessageIcon.classList.add('message-user-icon');
  assistantMessageIcon.src = iconImage;
  assistantMessageElement.classList.add("assistant-message");
  assistantMessageElement.textContent = "";
  let assistantMessage = '';
  assistantMessageBox.style.display = 'flex';
  assistantMessageBox.appendChild(assistantMessageIcon);
  assistantMessageBox.appendChild(assistantMessageElement);
  messagesContainer.appendChild(assistantMessageBox);
  while (true) {
    const {
      done,
      value
    } = await reader.read();
    if (done) break;
    streamedResponse = decoder.decode(value);
    assistantMessageElement.textContent += streamedResponse;
    assistantMessage += streamedResponse;
    if (status) {
      scrollToBottom();
    }
    status = isScrollBottom();
  }
  messages.push({
    'content': assistantMessage,
    'role': 'assistant'
  });
  updatedCharacterData = {
    name: Name.value,
    image_base_64: iconImage,
    info: SystemInput.value,
    conversation: messages
  }
  updateCharacterInDB(character_id, updatedCharacterData, function (error, message) {
    if (error) {
      console.error(error);
    } else {
      console.log(message);
      character_data = updatedCharacterData;
    }
  });
  submit_btn.disabled = false;
});
//メッセージを表示
function displayMessage(message) {
  let status = isScrollBottom();
  const messageElement = document.createElement('p');
  const messageBox = document.createElement('div');
  let assistantMessageIcon;
  messageElement.textContent = message.content;
  if (message.role == 'user') {
    messageElement.classList.add("user-message");
  } else {
    messageElement.classList.add("assistant-message");
    assistantMessageIcon = document.createElement('img');
    assistantMessageIcon.classList.add('message-user-icon');
    assistantMessageIcon.src = iconImage;
  }
  messageBox.style.display = 'flex';
  if (assistantMessageIcon) {
    messageBox.appendChild(assistantMessageIcon);
  }
  messageBox.appendChild(messageElement);
  messagesContainer.appendChild(messageBox);
  if (status) {
    scrollToBottom();
  }
}