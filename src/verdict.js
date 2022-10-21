class Verdict {
  static #type = undefined;
  static #args = [];
  
  static #string = "";
  static #number = 0;
  static #boolean = false;
  static #function = () => {};
  static #array = [];
  static #object = {};

  static set object(values) {
    if (typeof values !== "object") {
      const wrongType = typeof value;
      console.error(`Verdict type error:\nType of ${values} has to be - Object. Instead it does >> ${wrongType}`)
    } else {
      if (values instanceof Array) {
        console.error(`Verdict type error:\nType of ${values} has to be - Object. Instead it does >> Array`);
      } else {
        Verdict.#object = {...values};
        return Verdict.#object;
      }
    }
  }

  static set array(values) {
    if (typeof values !== "object") {
      const wrongType = typeof value;
      console.error(`Verdict type error:\nType of ${values} has to be - Array. Instead it does >> ${wrongType}`)
    } else {
      if (!(values instanceof Array)) {
        console.error(`Verdict type error:\nType of ${values} has to be - Array`);
      } else {
        Verdict.#array = [...values];
        return Verdict.#array;
      }
    }
    
  }
  
  static Function(...args) {
    Verdict.#type = "Function";
    Verdict.#args = [...args];
    return Verdict;
  }

  static #check(type, value) {
    if (Verdict.#type === "Function") {
      if (typeof (value(...Verdict.#args)) !== type) {
        const wrongType = typeof (value(...Verdict.#args))
        console.error(`Verdict type error:\n${value} has to return - ${type}. Instead it does >> ${wrongType}`)
      }
      
      Verdict.#type = undefined;
      Verdict.#args = [];
    } else {
      if (typeof value !== type) {
        const wrongType = typeof value;
        console.error(`Verdict type error:\nType of ${value} has to be - ${type}. Instead it does >> ${wrongType}`)
      } else {
        switch (type) {
          case "string": {
            Verdict.#string = value;
            return Verdict.#string;
          }
          case "number": {
            Verdict.#number = value;
            return Verdict.#number
          }
          case "boolean": {
            Verdict.#boolean = value;
            return Verdict.#boolean
          }
          case "function": {
            Verdict.#function = value;
            return Verdict.#function
          }
          
          default: break;
        }
      }
    }
  }

  static set function(value) {
    return Verdict.#check("function", value)
  }
  static get function() {
    return Verdict.#function
  }
  
  static set string(value) {
    return Verdict.#check("string", value)
  }
  static get string() {
    return Verdict.#string
  }

  static set number(value) {
    return Verdict.#check("number", value)
  }
  static get number() {
    return Verdict.#number
  }

  static set boolean(value) {
    return Verdict.#check("boolean", value)
  }
  static get boolean() {
    return Verdict.#boolean
  }

}


export {Verdict as v, Verdict}