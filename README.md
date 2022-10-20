# API Routes

## 1. Next.js 앱에 api 추가하는 방법

---

```
1) pages 폴더 내에 api 폴더를 만든다.

2) api 폴더 내에 생성하는 파일, 폴더명의 규칙은 pages 폴더 안에서 사용되는 규칙과 같다.

3) api 폴더 내의 파일은 서버 측에서만 실행된다. 즉, 클라이언트 측의 코드로 번들링되지 않는다.

4) 컴포넌트 함수가 아니라, 아래와 같은 함수를 만든다.
    - 함수 내에는 서버 측의 코드를 작성할 수 있고, next.js에 의해 node.js 코드를 express.js 문법(?)으로 작성할 수 있다.
```

```js
// pages/api/hello.js

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
```

## 2. 예제 코드

---

- [json 파일에 데이터를 추가하는 api](https://github.com/HyeonJu-C/api-route/blob/main/pages/api/feedback.ts)
- [json 파일 데이터를 반환하는 api](https://github.com/HyeonJu-C/api-route/blob/main/pages/index.tsx)
- [getStaticProps와 api](https://github.com/HyeonJu-C/api-route/blob/main/pages/feedback.tsx)
- dynamic api route
  - `api/products/[id]`
  - `api/products/[...slug]`
  - `req.query` 를 통해 url에 접근할 수 있다.
