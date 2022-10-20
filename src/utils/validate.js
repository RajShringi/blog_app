export default function validate(name, value, errors) {
  if (value === "") {
    errors[name] = `${[name]} can't be empty.`;
  } else if (name === "password" && !validatePassword(value)) {
    errors[name] = "Password must contain a letter and a number";
  } else if (name === "password" && value.length < 6) {
    errors[name] = "Password should be at-least 6 characters";
  } else if (name === "email" && !value.includes("@")) {
    errors[name] = "Email should contain @ ";
  } else if (name === "username" && value.length < 6) {
    errors[name] = "Username should be at-least 6 characters long";
  } else {
    errors[name] = "";
  }
  //   return errors;
}

function validatePassword(password) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  return re.test(password);
}
