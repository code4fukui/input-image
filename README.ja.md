# input-image

依存関係のないカスタムHTML要素で、画像のアップロード、リサイズ、プレビューを行います。

![3つの四角い画像プレビューが横一列に並んだユーザーインターフェース。各プレビューには異なるアップロード画像が表示されている。プレビューの下には、アップロードされた画像のURLがカンマ区切りで表示されるテキストフィールドがある。](https://user-images.githubusercontent.com/57882/235284190-2581628e-8a5c-4034-9721-a4729f22588c.png)

## 機能

- **単一または複数ファイルのアップロード**: 1つのファイル、または複数のファイルを受け入れるように構成可能です。
- **クライアントサイドでの画像リサイズ**: アップロード前に設定可能な最大幅に画像を自動リサイズし、帯域幅を節約します。
- **画像プレビュー**: アップロードされた各画像のプレビューを表示します。
- **フォームへの組み込みが容易**: アップロードされたファイルのURLをカンマ区切りのリストとして保持する隠し`<input>`を含んでおり、そのままフォーム送信に利用できます。
- **画像以外のファイルのサポート**: 画像以外のファイルタイプは直接アップロードし、そのURLを表示することで対応します。
- **簡単な管理**: 「削除」ボタンにより、ユーザーはアップロードされたすべてのファイルを一度にクリアできます。
- **動的な制御**: JavaScriptを使用して、プログラムから画像URLを取得または設定できます。

## 使い方

1. **コンポーネントのインポート**

    HTMLファイルにスクリプトを追加します。ESモジュールであるため、`type="module"`を使用してください。

    ```html
    <script type="module" src="./input-image.js"></script>
    ```

2. **HTMLに要素を追加**

    任意の属性を指定して`<input-image>`タグを使用します。`<form>`内での使用に適しています。

    ```html
    <form id="my-form">
      <input-image
        id="image-uploader"
        name="image_urls"
        uploadurl="https://your-server.com/upload"
        accept="image/*"
        multiple
        maxwidth="1024"
        maxsize="2MB"
      ></input-image>
      <button type="submit">Submit</button>
    </form>
    ```

## APIリファレンス

### 属性

- `name`: 隠し`<input>`フィールドの`name`属性。カンマ区切りのURLを保持します。
- `uploadurl`: **(必須)** ファイルがPOSTされるサーバーのエンドポイントURL。
- `accept`: 受け入れるファイルタイプ（例: `"image/*"`、`".jpg,.png"`）。内部のファイル入力に渡されます。
- `multiple`: 指定された場合、複数ファイルの選択を許可します。
- `maxwidth`: 画像リサイズの最大幅（ピクセル単位）。デフォルトは`1220`です。
- `maxsize`: 最大ファイルサイズ（例: `"5MB"`、`"1024KB"`）。デフォルトは`"3MB"`です。

### JavaScriptプロパティとイベント

標準のDOMメソッドを使用して要素を操作できます。

- **`.value`**

    画像URLのカンマ区切り文字列を取得または設定します。

    ```javascript
    const uploader = document.getElementById('image-uploader');

    // 現在のURLを取得
    const imageUrls = uploader.value; // "url1.jpg,url2.png"

    // 初期表示する画像を設定
    uploader.value = "https://example.com/image1.jpg,https://example.com/image2.png";
    ```

- **`.onupload`**

    選択されたすべてのファイルが処理およびアップロードされた後に発火するイベントハンドラ。

    ```javascript
    const uploader = document.getElementById('image-uploader');

    uploader.onupload = (event) => {
      console.log('すべてのファイルがアップロードされました！');
      // event.targetは<input-image>要素自体を指します
      console.log('最終的なURL:', event.target.value);
    };
    ```

## ライセンス

MIT License — [LICENSE](LICENSE)を参照してください。
