# React Apollo Client

## useQuery

- Tự động cache lần đầu và những lần sau sẽ không fetch nữa
- Có 2 cách để update dữ liệu là: Polling (Interval request lên server), Refetching
- Bắt sự kiện theo status notifyOnNetworkStatusChange: true

## useLazyQuery

- giữ lại query chỉ gọi khi nhận user action

## Cache ID được tạo như thế nào

https://www.apollographql.com/docs/react/caching/overview#2-generate-cache-ids

By default, an object's cache ID is the concatenation of the object's \_\_typename and id (or \_id) fields, separated by a colon (:).

## Thay thế các type Object như thế nào

https://www.apollographql.com/docs/react/caching/overview#3-replace-object-fields-with-references
