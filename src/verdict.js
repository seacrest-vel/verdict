class Verdict {
  static #type = undefined;
  static #args = [];
  
  static #string = "";
  static #number = 0;
  static #boolean = false;
  static #function = () => {};
  static #array = [];
  static #object = {};
  static #omitted = {
    omit: false,
    values: []
  }
  
  /**
   * @param {any[]} values
   */
  static set map(values) {
    if (!(values instanceof Array)) {
      console.error("Verdict type error:\nArray only has to be mapped");
    } else {
      Verdict.#array.forEach((item, index) => {
        const currenctType = typeof item;
        const mappedType = typeof values[index]
        if (currenctType !== mappedType) {
          console.error(`Verdict type error:\nType of index ${JSON.stringify(item)} has to be - ${mappedType}. Instead it's >> ${currenctType}`)
        }
      })
    }
  }

  static Array(arr) {
    Verdict.array = arr;
    return Verdict;
  }

  /**
   * @param {object} values
   */
  static set object(values) {
    if (typeof values !== "object") {
      const wrongType = typeof values;
      console.error(`Verdict type error:\nType of ${values} has to be - Object. Instead it's >> ${wrongType}`)
    } else if (Verdict.#omitted.omit) {
      Verdict.#checkOmitted((ommited) => {
        ommited !== null && console.warn("Verdict type warning:\nObject is >> null")
      })
    } else {
      if (values instanceof Array) {
        console.error(`Verdict type error:\nType of ${values} has to be - Object. Instead it's >> Array`);
      } else {
        Verdict.#object = {...values};
        return Verdict.#object;
      }
    }
  }

  /**
   * @param {Array} values
   */
  static set array(values) {
    if (typeof values !== "object") {
      const wrongType = typeof values;
      console.error(`Verdict type error:\nType of ${values} has to be - Array. Instead it's >> ${wrongType}`)
    } else {
      if (!(values instanceof Array)) {
        console.error(`Verdict type error:\nType of ${JSON.stringify(values)} has to be - Array`);
      } else {
        Verdict.#array = [...values];
        return Verdict.#array;
      }
    }
    
  }
  /**
   * @param {...any} args 
   * @returns {Verdict}
   */
  static Function(...args) {
    Verdict.#type = "Function";
    Verdict.#args = [...args];
    return Verdict;
  }

  static #check(type, value) {
    if (Verdict.#type === "Function") {
      if (typeof (value(...Verdict.#args)) !== type) {
        const wrongType = typeof (value(...Verdict.#args))
        console.error(`Verdict type error:\n${value} has to return - ${type}. Instead it's >> ${wrongType}`)
      }
      
      Verdict.#type = undefined;
      Verdict.#args = [];
    } else {
      if (typeof value !== type) {
        const wrongType = typeof value;
        console.error(`Verdict type error:\nType of ${value} has to be - ${type}. Instead it's >> ${wrongType}`)
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
  /**
   * @param {string} value
   */
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

  static omit(...values) {
    Verdict.#omitted.omit = true;
    Verdict.#omitted.values = [...values]
    !values.length && Verdict.#omitted.values.push(undefined);
    return Verdict;
  }

  static #checkOmitted(omit) {
    if (Verdict.#omitted.omit) {
      Verdict.#omitted.values.forEach(omitted => {
        omit(omitted);
      })
    }

    Verdict.#omitted.omit = false;
    Verdict.#omitted.values = []
  }
}


export {Verdict}