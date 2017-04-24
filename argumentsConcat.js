// argumentsConcat 这个函数传递任意数量的参数，它会将各个参数连接成一个字符串“列表”：
function argumentsConcat(separator) {
   var result = "", // initialize list
       i;
   // iterate through arguments
   for (i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
   }
   return result;
}
// returns "sage. basil. oregano. pepper. parsley. "
argumentsConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");