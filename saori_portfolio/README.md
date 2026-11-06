# SAORI TANIZAWA — Portfolio template

JPG作品を一覧・拡大・詳細表示できる、静的Webポートフォリオの雛形です。

## プレビュー
`index.html` をブラウザで開くと確認できます。

## カテゴリ
チラシ・販促物／パンフレット／ロゴ／SNS・広告／求人広告／WEBサイト／その他

## まず編集する場所
- `index.html`：名前、自己紹介、連絡先、デザインを編集
- JavaScript内の `const projects = [...]`：作品タイトル・カテゴリ・年・使用ツール・説明を編集
- 実際の画像は `images/` に入れ、各作品の `image` を `images/ファイル名.jpg` に変更してください

例：
```js
{
  id: 1,
  title: "Instagramキャンペーン画像",
  category: "SNS・広告",
  year: "2026",
  tools: "Canva",
  role: "構成・デザイン",
  description: "制作目的と工夫した点。",
  image: "images/instagram-campaign.jpg"
}
```

## 作品追加フォームについて
ページ上部の「作品を追加」は、ブラウザ上で一時的に作品をプレビューするための補助機能です。追加した作品はリロードすると消えます。公開サイトに恒久的に追加するには、画像を `images/` に置き、`projects` 配列に作品情報を登録して再デプロイしてください。
JSON書き出しは作品情報の下書き用で、画像ファイル自体は含みません。

## Cloudflare Pagesへ公開
1. `index.html` と `images/` を含むフォルダを用意します。
2. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Direct Upload（画面の名称は変更される場合があります）を選択。
3. プロジェクト名を設定し、フォルダまたはZIPをアップロードしてデプロイします。
4. 発行された `*.pages.dev` URLを開き、PC・スマホで表示を確認します。

## 公開前チェック
- 会社や顧客の許可なく公開できない制作物を除外
- 顧客名、個人情報、未公開情報を確認
- `your-email@example.com` を公開用メールアドレスに置き換える
- サンプルの説明文・作品名を実際の実績に置き換える
- JPGのファイルサイズを必要に応じて軽量化する

この雛形は静的サイトです。Cloudflare Pagesに置いただけでは、Web上のフォームからアップロードした画像がサーバーに保存されることはありません。
