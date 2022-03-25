function* callback() {
  yield 1;
  yield 2;
}

function* helloWorld() {
  yield "hello";
  yield "world";

  // yield function thì chưa vào function này chỉ in ra value là function generator
  // yeild* function thì chạy tiếp vào trong
  yield* callback();
}

// let t = helloWorld();
// console.log(t.next());
// console.log(t.next());
// console.log(t.next());
// console.log(t.next());

// chạy hết tất cả các yield và in kết quả
// for (let i of t) {
//   console.log(i);
// }

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});

async function* asyncFunc() {
  yield 1;
  let t = await promise;
  yield t;
  yield 2;
}

// yield tạo thành những promise nên muốn lấy kq thì phải dùng .then
// let a = asyncFunc();
// a.next().then((value) => {
//   console.log(value);
//   a.next().then((data) => {
//     console.log(data);
//   });
// });

function* asyncFunc2() {
  yield 1;
  yield promise.then((data) => {
    return data;
  });
  yield 2;
}

// let t = asyncFunc2();
// console.log(t.next().value);
// // yield promise thì nó sẽ trả về promise pending
// console.log(t.next().value.then((data) => console.log(data)));

function put(obj) {
  console.log(123);
  console.log(456);
  return obj;
}

function* main() {
  yield put({ name: "me" });
  console.log(789);
}

let t = main();
console.log(t.next());
