# おそばに — 介護記録・受診サポート（共有版）

家族・ケアマネジャーと介護記録を共有する PWA。バックエンドは Firebase（Auth + Firestore）。

公開URL: https://masamichi19840316-jpg.github.io/osoboni/

- `index.html` — アプリ本体（Firebase設定は先頭の `FIREBASE_CONFIG`）
- `firebase-sdk.js` — Firebase JS SDK v10.12.5 をバンドルしたもの（オフライン起動用）
- `firestore.rules` — Firestore セキュリティルール（Firebaseコンソールに貼り付け）
- `sw.js` / `manifest.webmanifest` — PWA
