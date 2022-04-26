<pre>
  # Khi thay đổi giá trị props từ cha ở component con thì
    - life cycle update của con sẽ được gọi
    - life cycle update của cha sẽ không được gọi
    - update props của con thành công
    - update data của cha thành công

  # provide
  provide: function() {
    return {

    }
  }

  ...

  inject: []

  # combo observable & this.$set()

  this.reactiveObject = Vue.observable({
    name: "Cường",
    age: 23,
  });

  this.$set(this.reactiveObject, "school", "SGU");

  # Vue là thư viện, vm -> this hoặc biến chứ new Vue()

  # button changed nhưng mà không chạy nextTick còn dom thường thì có chạy
</pre>
