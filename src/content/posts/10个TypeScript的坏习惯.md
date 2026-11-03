---
title: "10个TypeScript的坏习惯"
date: 2021-02-14 13:48:20
tags: ["TypeScript"]
slug: "10个TypeScript的坏习惯"
---
Typescript 和 Javascript 在过去的几年里增加了很多新特性，所以我们写代码时的一些习惯可能已经过时了, 其中一些可能已经永久的失去了存在意义。这篇文章列举了10个不应该有的习惯。

在下面的例子中，注意“应该是什么样”只是修复了讨论的问题，代码里面可能还会有别的问题这里不做讨论。



## 1. 没有开启 `strict` 模式

### 错误例子

在 `tsconfig.json`里面没有使用 strict 模式

```typescript
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs"
  }
}
```

### 应该是什么样（正确写法）

```typescript
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "strict": true
  }
}
```

### 为什么会这么写

在现存项目里面开`strict`模式（严格模式）需要花额外时间修改代码

### 为什么不该这么写

开启`strict`模式 未来修改代码会很容易，磨刀不误砍柴工

## 2. 使用 `||` 符号定义默认值

### 错误例子

用`||`定义备用默认值

```typescript
function createBlogPost (text: string, author: string, date?: Date) {
  return {
    text: text,
    author: author,
    date: date || new Date()
  }
}
```
### 应该是什么样（正确写法）

使用新的 `??` 符号，或者直接在参数声明的地方定义fallback value(备用值)
> A fallback value is a value you would use when the main thing you requested is not available.

```typescript
function createBlogPost (text: string, author: string, date: Date = new Date())
  return {
    text: text,
    author: author,
    date: date
  }
}
```

### 为什么会这么写

`??` 符号在去年发布3.7版本的时候才引入。以及如果在一个超长的函数中间设置默认值的话可能会比较困难。

### 为什么不该这么写

与 `||` 符号不同， `??` 只有在前面参数是`null` 或者 `undefined`的时候才起作用，如果是false的话就不会。以及如果有个函数很长以至于无法在一开始设置默认值，分开来（splitting）写也是个好办法。

## 3. 使用 `any` 作为一种类型

### 错误例子

当你不确定变量内容的时候使用`any`作为一种类型来存放变量

```typescript
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: any = await response.json()
  return products
}
```

### 应该是什么样（正确写法）

大多数情况下（几乎所有情况），在你用`any`的时候其实你应该用`unknown`。

```typescript
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

### 为什么会这么写

`any`使用起来很方便，因为完全没有类型检查。`any`通常只会用在官方代码里面（例如 上面例子TypeScript 团队写的`response.json()` 是一个 `Promise<any>`类型。

### 为什么不该这么写

因为完全没有类型检查。而规避了类型检查之后很难debug，代码只会在运行的时候，并且数据类型跟我们原先假设的不一样的时候出错。


## 4. 变量 `as` 某种类型

### 错误例子

让编译器强制类型转换

```typescript
async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  return products as Product[]
}
```

### 应该是什么样（正确写法）
应该使用type guards（类型保护）

>  type guards（类型保护）: Some expression that performs a runtime check that guarantees the type in some scope.

```typescript
function isArrayOfProducts (obj: unknown): obj is Product[] {
  return Array.isArray(obj) && obj.every(isProduct)
}

function isProduct (obj: unknown): obj is Product {
  return obj != null
    && typeof (obj as Product).id === 'string'
}

async function loadProducts(): Promise<Product[]> {
  const response = await fetch('https://api.mysite.com/products')
  const products: unknown = await response.json()
  if (!isArrayOfProducts(products)) {
    throw new TypeError('Received malformed products API response')
  }
  return products
}
```

### 为什么会这么写

当JavaScript转换到TypeScript时，TypeScript的编译器常常无法自动猜出JavaScript的类型。这样的话使用`as SomeOtherType` 能加速转换过程还可以避免产生错误(`tsconfig`中的设置)

### 为什么不该这么写

就算现在代码能正常运行，但是未来如果有代码改动，type guards（类型保护）能保证详细的检查。


## 5. 测试中使用 `as any` 

### 错误例子

写测试的时候创建了一个不完整的stand-ins（替身）

```typescript
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

test('createEmailText returns text that greats the user by first name', () => {
  const user: User = {
    firstName: 'John'
  } as any
  
  expect(createEmailText(user)).toContain(user.firstName)
}
```

### 应该是什么样（正确写法）

 如果你的测试需要模拟数据，把模拟数据的逻辑写在模拟对象旁边，并且实现复用。
 
```typescript
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

class MockUser implements User {
  id = 'id'
  firstName = 'John'
  lastName = 'Doe'
  email = 'john@doe.com'
}

test('createEmailText returns text that greats the user by first name', () => {
  const user = new MockUser()

  expect(createEmailText(user)).toContain(user.firstName)
}
```

### 为什么会这么写

刚开始在一个还没有大量测试覆盖率的代码库写测试的时候，常常会遇到一些复杂的数据结构，但是测试只会用到其中的一小部分。不用担心数据结构的其他部分是一个简单的短期解决办法。

### 为什么不该这么写

之前写的测试可能会把我们坑死，如果近期修改了某个变量那我们需要手动修改所有的测试。而且，可能存在一种情况就是某个测试用到了某个我们之前以为不重要的变量，那么关于那个功能的所有的测试都需要手动更新。

## 6. Optional properties（可选属性）

### 错误例子

对于一些可有可无的属性我们标记为Optional（可选的）

```typescript
interface Product {
  id: string
  type: 'digital' | 'physical'
  weightInKg?: number
  sizeInMb?: number
}
```

### 应该是什么样（正确写法）

对于每个可能存在的属性，详细对应的类型。

```typescript
interface Product {
  id: string
  type: 'digital' | 'physical'
}

interface DigitalProduct extends Product {
  type: 'digital'
  sizeInMb: number
}

interface PhysicalProduct extends Product {
  type: 'physical'
  weightInKg: number
}
```

### 为什么会这么写

把属性标记为可选的而不是分开来写成不同的类型能减少代码量。而且这种写法需要对产品本身和代码有更深的理解，以及产品需求的变更的时候能减少代码量。

### 为什么不该这么写

类型最大的好处就是编译的时候就能完成对代码的检查而不是运行的时候才发现错误。根据更详细的类型，在编译的时候就能找出一些bug，不然的话会无法注意到。 例如 保证 每个`DigitalProduct`都有一个`sizeInMb`。

## 7. 只有一个字母的泛型

### 错误例子

只用一个字母来命名一个泛型

```typescript
function head<T> (arr: T[]): T | undefined {
  return arr[0]
}
```

### 应该是什么样（正确写法）

给一个完整的，描述性的名字。

```typescript
function head<Element> (arr: Element[]): Element | undefined {
  return arr[0]
}
```

### 为什么会这么写

这个习惯可能是因为官方文档都是用一个字母来写泛型的。这样子写起来很快，只用写一个T就好，不用去费力想一个名字。

### 为什么不该这么写

泛型变量依旧是变量。由于IDE的发展我们已经开始放弃了在变量上描述变量技术细节的想法了。例如 `const strName = 'Daniel'` 现在只会写成 `const name = 'Daniel'`。并且一个字母的变量大多数情况下是不推荐的，因为很难不看声明来弄明白他们的含义。

## 8. 非布尔值的布尔检查

### 错误例子

直接用`if`来检查一个一个变量有没有声明。

```typescript
function createNewMessagesResponse (countOfNewMessages?: number) {
  if (countOfNewMessages) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

### 应该是什么样（正确写法）

明确检查我们关心的那种情况

```typescript
function createNewMessagesResponse (countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

### 为什么会这么写

把检查写的很短看起来简洁，还可以避免去思考到底要检查什么

### 为什么不该这么写

我们需要想清楚自己到底要检查什么。上面的例子对于`countOfNewMessages` 是 `0` 的情况会有不同的结果。


## 9. Bang Bang 运算符（!!）

### 错误例子

把一个非布尔值变成布尔值

```typescript 
function createNewMessagesResponse (countOfNewMessages?: number) {
  if (!!countOfNewMessages) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

### 应该是什么样（正确写法）

明确检查我们关心的那种情况

```typescript
function createNewMessagesResponse (countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

### 为什么会这么写

理解 `!!` 符号就像Javascript的入门技巧一样。它看起来简短且简介，如果你已经习惯了它的存在，那你是知道它是什么的。他是一个把任何值转为布尔值的捷径。尤其是项目里面对于`null`, `undefined`, and `'' `没有明确的区分.

### 为什么不该这么写

与其他捷径或者入门技巧一样，使用!!会使代码含义不清。这会使新的开发者很难看懂代码，不管是刚入门编程的或者是刚入门JavaScript的。这也很容易引入一些微妙的bug。上面的例子对于`countOfNewMessages` 是 `0` 的情况会也有不同的结果。

## 10. `!= null`

### 错误例子

Bang Bang 运算符的姐妹，`!= null` 允许我们同时检查`null` 和 `undefined`的情况。

```typescript
function createNewMessagesResponse (countOfNewMessages?: number) {
  if (countOfNewMessages != null) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

### 应该是什么样（正确写法）

明确检查我们关心的那种情况

```typescript
function createNewMessagesResponse (countOfNewMessages?: number) {
  if (countOfNewMessages !== undefined) {
    return `You have ${countOfNewMessages} new messages`
  }
  return 'Error: Could not retrieve number of new messages'
}
```

### 为什么会这么写

如果你看到这里了说明你的代码量和代码技巧都可圈可点。即使最严格的linting规则，强制使用 `!==` 而不是 `!=` 的规则都对 `!= null` 做了例外处理。如果项目代码中对于 `null` 和 `undefined` 没有明确的区分，那么`!= null`是一个检查两者是否存在的捷径。

### 为什么不该这么写

在Javascript早期 `null` 值是个大麻烦，但是在TypeScript `strict`模式下他们可以变成十分有价值的工具袋。 一个常见的模式是用 null 代表一个完全不存在的东西，而undefined 代表存在但是未知的量。例如，`user.firstName === null` 可能代表用户确实没有名字， 但是 `user.firstName === undefined` 可以代表我们还没问到用户的名字（`user.firstName === ''` 代表用户名字叫 `''`）。


> 原文：https://startup-cto.net/10-bad-typescript-habits-to-break-this-year/
