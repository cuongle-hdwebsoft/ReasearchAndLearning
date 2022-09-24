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


## Render flow trong NextJs

### client request lần đầu lên browser và page là getServerSideProps

Server: getServerSideProps(trả về pageProps) -> App(có thể dùng pageProps) -> Components -> dùng init useState để render ra HTML
Client: App(có thể dùng pageProps) -> Components -> dùng pageProps + HTML từ server về + gắn sự kiện js vào các input + data json từ getServerSideProps được gắn vào kèm html.

### client request lần đầu lên browser và page là getStaticProps
Client: Components -> HTML từ server build trước đó về + gắn sự kiện js vào các input + data json từ getStaticProps được gắn vào kèm html.

Những lần sau khi nhấn vào thẻ next/link thì server GỌI VÀO HÀM `getServerSideProps` trả về json 

<pre>
{
  "pageProps": {
    "count": 1
  },
  "__N_SSG": true
}

{
  "pageProps": {
    "count": 1
  },
  "__N_SSP": true
}
</pre>

<pre>
<!DOCTYPE html><html><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width"/><meta name="next-head-count" content="2"/><link rel="preload" href="/_next/static/css/3c31647432f50e37.css" as="style"/><link rel="stylesheet" href="/_next/static/css/3c31647432f50e37.css" data-n-g=""/><noscript data-n-css=""></noscript><script defer="" nomodule="" src="/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js"></script><script src="/_next/static/chunks/webpack-cc9c69bc14c8e1bc.js" defer=""></script><script src="/_next/static/chunks/framework-09a2284fdc01dc36.js" defer=""></script><script src="/_next/static/chunks/main-e87ac43734682f7d.js" defer=""></script><script src="/_next/static/chunks/pages/_app-51e1b0de380907a4.js" defer=""></script><script src="/_next/static/chunks/pages/contact-7206021b20e2e3b4.js" defer=""></script><script src="/_next/static/VHZOYhnE4jbly-3dabzS3/_buildManifest.js" defer=""></script><script src="/_next/static/VHZOYhnE4jbly-3dabzS3/_ssgManifest.js" defer=""></script></head><body><div id="__next"><div><a href="/">home</a><a href="/about">about</a><a href="/contact">contact</a><div>Contact <!-- -->1<!-- --> <!-- -->11</div></div></div><script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"count":1},"__N_SSG":true},"page":"/contact","query":{},"buildId":"VHZOYhnE4jbly-3dabzS3","isFallback":false,"gsp":true,"scriptLoader":[]}</script></body></html>
</pre>

html
<pre>
<!DOCTYPE html><html><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width"/><meta name="next-head-count" content="2"/><link rel="preload" href="/_next/static/css/3c31647432f50e37.css" as="style"/><link rel="stylesheet" href="/_next/static/css/3c31647432f50e37.css" data-n-g=""/><noscript data-n-css=""></noscript><script defer="" nomodule="" src="/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js"></script><script src="/_next/static/chunks/webpack-cc9c69bc14c8e1bc.js" defer=""></script><script src="/_next/static/chunks/framework-09a2284fdc01dc36.js" defer=""></script><script src="/_next/static/chunks/main-e87ac43734682f7d.js" defer=""></script><script src="/_next/static/chunks/pages/_app-51e1b0de380907a4.js" defer=""></script><script src="/_next/static/chunks/pages/index-9545c0373f6575d4.js" defer=""></script><script src="/_next/static/VHZOYhnE4jbly-3dabzS3/_buildManifest.js" defer=""></script><script src="/_next/static/VHZOYhnE4jbly-3dabzS3/_ssgManifest.js" defer=""></script></head><body><div id="__next"><div><a href="/">home</a><a href="/about">about</a><a href="/contact">contact</a><div><h1>Homepage <!-- -->11</h1><div>1</div><button>prev</button><button>next</button></div></div></div><script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"count":1},"__N_SSP":true},"page":"/","query":{},"buildId":"VHZOYhnE4jbly-3dabzS3","isFallback":false,"gssp":true,"scriptLoader":[]}</script></body></html>
</pre>
js
<pre>
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[405], {
    5557: function(n, t, u) {
        (window.__NEXT_P = window.__NEXT_P || []).push(["/", function() {
            return u(3678)
        }
        ])
    },
    3678: function(n, t, u) {
        "use strict";
        u.r(t),
        u.d(t, {
            __N_SSP: function() {
                return i
            },
            default: function() {
                return r
            }
        });
        var c = u(5893)
          , e = u(7294)
          , i = !0;
        function r(n) {
            var t = n.count
              , u = (0,
            e.useState)(11)
              , i = u[0]
              , r = u[1];
            (0,
            e.useEffect)(function() {
                r(100)
            }, []);
            var o = function() {
                pageIndex - 1 >= 0 && setPageIndex(pageIndex - 1)
            }
              , f = function() {
                setPageIndex(pageIndex + 1)
            };
            return (0,
            c.jsxs)("div", {
                children: [(0,
                c.jsxs)("h1", {
                    children: ["Homepage ", i]
                }), (0,
                c.jsx)("div", {
                    children: t
                }), (0,
                c.jsx)("button", {
                    onClick: o,
                    children: "prev"
                }), (0,
                c.jsx)("button", {
                    onClick: f,
                    children: "next"
                })]
            })
        }
    }
}, function(n) {
    n.O(0, [774, 888, 179], function() {
        return n(n.s = 5557)
    }),
    _N_E = n.O()
}
]);

actual code
<pre>
import { useEffect, useState } from "react";

export const getServerSideProps = async () => {
  console.log("getServerSideProps index.js");

  return {
    props: {
      count: 1,
    },
  };
};

export default function Home({ count }) {
  const [state, setState] = useState(11);

  useEffect(() => {
    setState(100);
  }, []);

  const handlePrev = () => {
    if (pageIndex - 1 >= 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  return (
    <div>
      <h1>Homepage {state}</h1>
      <div>{count}</div>
      <button onClick={handlePrev}>prev</button>
      <button onClick={handleNextPage}>next</button>
    </div>
  );
}
</pre>
</pre>
