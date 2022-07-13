interface IReg {
  email: RegExp,
  password: RegExp,
  phone: RegExp
}

const reg: IReg = {
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,20}/,
  phone: /^\d{2,3}-\d{3,4}-\d{4}$/,
}

export default reg;