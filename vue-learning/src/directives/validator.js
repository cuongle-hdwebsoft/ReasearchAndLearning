function addError(parent, errorMessage) {
  let error = parent.querySelector(".error");
  if (error) {
    error.innerHTML = errorMessage;
  } else {
    let doc = document.createElement("div");
    doc.innerHTML = errorMessage;
    doc.className = "error";
    parent.appendChild(doc);
  }
}

function removeError(parent) {
  let error = parent.querySelector(".error");
  if (error) {
    parent.removeChild(error);
  }
}

export default {
  update: function (el, binding, vnode) {
    // console.log(el);
    // console.log(binding);
    // console.log(vnode);

    const value = vnode.data.domProps.value;
    const arg = binding.value;
    const name = el.name;

    if (!arg) {
      return;
    }

    let validates = arg.split("|");
    let errors = [];
    // console.log(validates);
    for (let i = 0; i < validates.length; i++) {
      switch (validates[i]) {
        case "required":
          if (value === "") {
            errors.push(`${name} is required`);
          }
          break;
        case "number":
          if (isNaN(value)) {
            errors.push(`${name} is number`);
          }
          break;
      }
    }

    if (errors.length > 0) {
      addError(el.parentElement, errors[0]);
    } else {
      removeError(el.parentElement);
    }
  },
};
