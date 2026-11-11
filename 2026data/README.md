# SAORI TANIZAWA Portfolio

## 内容
- 7カテゴリー×5作品、合計35作品を掲載しています。
- `images/` フォルダに各作品に対応したSVG形式のダミー画像を収録しています。
- ダミー画像はグレー背景・白文字でファイル名（例：flyer01）を表示しています。

## 画像の差し替え
1. `images/` フォルダに実際の作品画像を追加します。
2. `index.html` 内の `const projects` から該当作品を探します。
3. `image: "images/flyer01.jpg"` の部分を、追加した画像名に変更します（例：`image: "images/flyer01.jpg"`）。
4. 画像ファイルは `images/` フォルダに置いてください。

## 作品情報の編集
`const projects` 内の各作品について、`title`（作品名）、`category`（カテゴリー）、`year`（制作年）、`tools`（使用ツール）、`role`（担当範囲）、`description`（説明）を編集してください。作品を追加・削除する場合も、この配列を編集します。

## 公開について
このサイトはHTML/CSS/JavaScriptで動作する静的サイトです。ブラウザ上の管理画面から変更を保存する仕組みはありません。HTMLと画像を更新して、公開先（GitHub/Netlify等）へアップロードしてください。


ダミー画像はすべてJPEG形式（.jpg）です。imagesフォルダ内の画像を実際の作品画像に差し替えると、そのまま表示されます。
