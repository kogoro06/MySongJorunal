/** ✅ ユーザー入力の初期化 */
export function initializeUserInput() {
  console.log('✅ ユーザー入力の初期化開始');

  const queryInput = document.getElementById('initial-query');
  const searchTypeSelect = document.getElementById('initial-search-type');
  const autoCompleteList = document.getElementById('autoComplete_list');
  const queryContainer = document.getElementById('initial-query-container');

  if (!queryInput || !searchTypeSelect || !autoCompleteList) {
    console.warn('⚠️ 必要な要素が見つかりません。');
    return;
  }

  /** 🎯 入力イベントリスナー */
  function addInputEventListener(inputElement) {
    inputElement.addEventListener('input', (event) => {
      const query = event.target.value.trim();
      if (!query) {
        autoCompleteList.innerHTML = '';
        return;
      }

      fetch(`/spotify_search?query=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => renderSuggestions(data.suggestions))
        .catch((error) => console.error('❌ APIエラー:', error));
    });
  }

  /** 🎯 検索結果のレンダリング */
  function renderSuggestions(suggestions) {
    autoCompleteList.innerHTML = '';
    suggestions.forEach((suggestion) => {
      const li = document.createElement('li');
      li.textContent = suggestion.name;
      li.classList.add('list-group-item');
      li.addEventListener('click', () => handleSuggestionSelection(suggestion));
      autoCompleteList.appendChild(li);
    });
  }

  /** 🎯 候補が選択されたとき */
  function handleSuggestionSelection(suggestion) {
    queryInput.value = suggestion.name;
    autoCompleteList.innerHTML = '';
    console.log('✅ 選択されたアイテム:', suggestion);
  }

  /** 🎯 検索タイプ変更イベント */
  function initializeSearchTypeChange() {
    searchTypeSelect.addEventListener('change', () => {
      const selectedValue = searchTypeSelect.value;
      console.log(`🔄 検索タイプが変更されました: ${selectedValue}`);

      if (selectedValue === 'year') {
        queryContainer.innerHTML = `
          <select name="search_values[]" id="initial-query" class="condition-select block w-full px-4 py-2 border rounded-md text-white bg-gray-700">
            <option value="">年代を選択</option>
            ${Array.from({ length: 26 }, (_, i) => `<option value="${2000 + i}">${2000 + i}</option>`).join('')}
          </select>
          <ul id="autoComplete_list"></ul>
        `;
      } else {
        queryContainer.innerHTML = `
          <input type="text" name="initial_query" id="initial-query" placeholder="キーワードを入力"
            class="condition-input block w-full px-4 py-2 border rounded-md text-white bg-gray-700">
          <ul id="autoComplete_list"></ul>
        `;
      }

      // 新しい要素にイベントリスナーを再設定
      const newQueryInput = document.getElementById('initial-query');
      autoCompleteList = document.getElementById('autoComplete_list');

      console.log('🔍 新しい初期入力フィールド:', newQueryInput);
      console.log('🔍 新しいオートコンプリートリスト:', autoCompleteList);

      if (newQueryInput && autoCompleteList) {
        addInputEventListener(newQueryInput);
        console.log('✅ 新しい入力フィールドにイベントリスナーが設定されました');
      } else {
        console.error('❌ 新しい #initial-query または #autoComplete_list が見つかりません。');
      }
    });
  }

  /** 🎯 初期リスナー設定 */
  if (queryInput) addInputEventListener(queryInput);
  initializeSearchTypeChange();

  console.log('✅ ユーザー入力の初期化が完了しました');
}
