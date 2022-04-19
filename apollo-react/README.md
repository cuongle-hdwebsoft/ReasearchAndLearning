# React Apollo Client

## useQuery

- Tự động cache lần đầu và những lần sau sẽ không fetch nữa
- Có 2 cách để update dữ liệu là: Polling (Interval request lên server), Refetching
- Bắt sự kiện theo status notifyOnNetworkStatusChange: true

## useLazyQuery

- giữ lại query chỉ gọi khi nhận user action
