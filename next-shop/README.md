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

## Luồng đi NextJS

Server: getServerSideProps -> MyApp -> Post List
Client: MyApp -> Post List -> MyApp -> Post List ...

Server xong rôi xuống client

## Vấn đề

### Vấn đề 1

<pre>
const query = useQueryClient();
const queryCache = query.getQueryCache();
const {
  queryKey: [_key, _query],
} = queryCache.find("posts", {
  exact: false,
}) as any;
</pre>

Vấn đề đặt ra là làm sao có thể nhớ được chính xác queryKey để khi từ post detail quay lại thì nó lấy được.

## Hydrate

### dehydrate

dehydrate creates a frozen representation of a cache that can later be hydrated with Hydrate, useHydrate, or hydrate. This is useful for passing prefetched queries from server to client or persisting queries to localStorage or other persistent locations.

### hydrate

Nó sẽ add cái dehydratedState vào cache để sử dụng trong cache, nếu như state ở Hydrate có state = rỗng. Quá trình này diễn ra trên server.

### useHydrate

Nó sẽ add cái dehydratedState vào queryClient để sử dụng trong cache, nếu như state ở Hydrate có state = rỗng. Quá trình này diễn ra trên server.

### Hydrate

- nó sẽ cho phép dùng useHydrate
- state này sẽ lưu vào cache để sử dụng, để không phải dùng useHydrate

Trước tiên server sẽ chạy getServerSideProps sau đó trả về props cho MyApp

- Nếu có xài Hydrate
  - Có thê dùng hook useHydrate
  - Lưu state vào cache ở props tstae. Nếu mình không bỏ gì thì cache rỗng
    - Nếu state = {} Dưới Post List nên apply dehydrate bằng cách dùng useDehydrate
    - Nếu có state = props.dehydratedState thì dùng luôn trong cache

<strong>hydrate và useHydrate y chang nhau nên dùng cái nào cũng được để apply cái dehydratedState vào cache</strong>

<pre>new QueryClient()</pre> sẽ tạo những instance khác nhau và lưu cache khác nhau

## Render giữa \_app và \_document

My App -> My Document

## useInfiniteQuery

- data
  - data.pages: Chứa tất cả page được fetch về là 1 array các response từ server theo page. Vd [responsePage1, responsePage2, responsePage3,...]
  - data.pageParams: Chứa tất cả các page được fetch về [undefined, 1, 2,...]
- fetchNextPage hàm để fetch page kế tiếp
- fetchPreviousPage hàm để fetch page sau
- getNextPageParam: khi 1 response của page được trả về, RQ sẽ chạy hàm này. Ở đây có 2 tham số lastPage, allPages. lastPage là page cuối cùng, allPages là tất cả các pages. Chúng ta sẽ return lastPage.nextPage, với giá trị này thì RQ sẽ set hasNextPage = true, ngc lại nếu return undefined, RQ sẽ set hasNextPage = false. Nhờ đó mà hiển thị load tiếp hay không. Khi return lastPage.nextPage nó sẽ trở thành pageParam để khi gọi fetchNextPage, nó sẽ lấy giá trị lastPage.nextPage này mà xài.
- Các tham số khác hoạt động giống useQuery
- Khi bị lỗi seriablize thì nên stringify giá trị queryClient

## References

https://github.com/vercel/next.js/discussions/10925
