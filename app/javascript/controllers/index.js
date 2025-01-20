// 🔄 このファイルは自動生成されます
// ./bin/rails stimulus:manifest:update コマンドで生成
// 新しいコントローラーを追加する際や、
// ./bin/rails generate stimulus controllerName でコントローラーを作成する際に実行してください

import { application } from "./application"

// 👋 基本的な動作確認用のHelloコントローラー
import HelloController from "./hello_controller"
application.register("hello", HelloController)

// 🔐 パスワードの表示/非表示を切り替えるコントローラー
import PasswordVisibilityController from "./password_visibility_controller"
application.register("password-visibility", PasswordVisibilityController)

// 🎵 Spotify楽曲検索機能のコントローラー
import SpotifySearchController from "./spotify_search_controller"
application.register("spotify-search", SpotifySearchController)
