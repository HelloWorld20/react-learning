/*
 * @Author: jianghong.wei 
 * @Date: 2019-08-14 13:56:06 
 * @Last Modified by: jianghong.wei
 * @Last Modified time: 2019-08-20 11:06:44
 */

import React from "react";

export default function() {  

  // 一个普通的泛型，T代表任意
  // identity的意义大概是，该方法接收任意类型参数，然后返回与输入相同类型的参数
  // <T> ：可以指定类型为T
  // arg : 参数的类型为指定的类型
  // :T  ：返回值也是指定的类型
  // <T> : 就相当于泛型的形参
  var identity = function<T>(arg: T): T {
    return arg;
  };
  // 一模一样。可以用不同的参数代表不同的类型
  var identity = function<U>(arg: U): U {
    return arg;
  };
  // 没找到文档，但是好像任意字母都可以
  var identity = function<a>(arg: a): a {
    return arg;
  };
  // 任意单词都可以。。。
  var identity = function<bbbb>(arg: bbbb): bbbb {
    return arg;
  };
  // 大约与js变量要求一样，字母或者下划线开头..........
  var identity = function<_bb5b>(arg: _bb5b): _bb5b {
    return arg;
  };
  // 当然也可以多个
  var identity_2 = function<_a, B, _3, 溜>(
    arg: _a,
    text: B,
    num: _3,
    charator: 溜
  ) {
    return {
      arg,
      text,
      num,
      charator
    };
  };

  var myIdentity_2 = identity_2<string, boolean, number, string>(
    "arg",
    true,
    2,
    "tt"
  );

  // 用法大概是
  var num: number = identity<number>(4); // 指定传入number
  var str: string = identity<string>("s"); // 指定传入string
  // 自动推断（推荐）
  var num: number = identity(4);
  var str: string = identity("s");

  // 这么泛型变量
  var myIdentity: <T>(arg: T) => T = identity;
  // 还能这么写，与上面一模一样。所谓的，带有调用签名的对象字面量来定义。(个人不推荐)
  // 但是有点细节的是，上面的被vscode高亮为function，而下面的是变量
  var myIdentity: { <T>(arg: T): T } = identity;

  // 用法一样
  var trusy: boolean = myIdentity(false);

  // 当然可以变为接口，但是接口这好像只能用 调用签名的对象字面量来定义 了
  interface GenericIdentity {
    <T>(arg: T): T;
  }
  var myIdentity: GenericIdentity = identity;

  // 接口也可以这样写，在定义时就指定好类型
  interface GenericIdentity_2<T> {
    (arg: T): T;
  }

  var myIdentity_num: GenericIdentity_2<number> = identity;

  var num: number = myIdentity_num(4);  // myIdentity_num就只能传入number类型了
  // var str: string = myIdentity_num('s')    // 这样报错


  ///////////////
  // 泛型约束
  // 如果希望传入的参数必须要有某个参数，可以用extends方法，给 T 类型 “注入”length参数
  // 从而实现，T必须有length参数的约束
  function logginIdentity<T extends {length: number}>(arg: T): T {
    console.log(arg.length);
    return arg;
  }


  /////////
  // 泛型类
  class GenericNumber<T> {
    // zeroValue: T[] = [];  // 同下，代表着，zeroValue是专门存放T类型的数组
    zeroValue: Array<T> = []; // 
    // zeroValue: T = ''; // 因为不知道类型，又必须初始化，所以这样写不行。这样的写法，得加constructor
    add: (x: T, y: T) => T = (x, y) => {
      this.zeroValue.push(x)
      return x;
    };
  }
  // 有constructor就可以
  class GenericString<T> {
    value: T;
    constructor(arg: T) {
      this.value = arg;
    }
  }

  var number = new GenericNumber<number>();
  number.add(2, 2)

  return <h1>generic page</h1>;
}
