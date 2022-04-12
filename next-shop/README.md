# Next JS

## Dynamic Route

/posts

- Tạo folder posts trong pages
- Tạo file index.tsx

/posts/1 /posts/2

- Tạo folder posts trong pages
- Tạo folder [id] trong posts
- Tạo file index.tsx

/posts/1/comments

- Tạo folder posts trong pages
- Tạo folder [id] trong posts
- Tạo folder [comments] trong folder [id]
- Tạo file index.tsx

/posts/abc/c /posts/def/f (Các path có từ 3 slash trở lên)

- Tạo folder posts trong pages
- Tạo folder [...id] trong folder posts

## Pre-rendering

SSG (Static site generation)

- Render trong lúc build time lúc mình npm run build. Folder này có thể được tìm thấy ở .next/server/pages
- getStaticPaths sẽ trả chạy trong lúc build time, yêu cầu trả về { paths, fallback }
  - paths ở đây là 1 mảng object có 1 key đặc biệt là params sẽ dùng tiếp cho getStaticProps
  - lúc build hàm này sẽ chạy ra mảng paths và gọi lần lượt hết tất cả item trong paths để tiếp tục render ra html và json của dynamic route đó. Chạy xong getStaticPaths sẽ chạy getStaticProps của chính nó để render ra html
- getStaticProps chạy lúc build time để tạo html json rồi dùng luôn cái đó cho productions

SSR (Server site rendering)

- Render lại mỗi lần user request

CSR (Client site rendering)
