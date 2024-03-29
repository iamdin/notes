# 计算机网络

[[toc]]

网络七层：应用层、表示层、会话层、传输层、网络层、数据链路层、物理层

## 应用层

应用层协议定义了应用进程间的交互和通信规则，不同主机的应用进程间如何相互传递报文，比如传递的报文的类型、格式、哪些字段等

### HTTP 协议

HTTP 是超文本传输协议，它定义了客户端和服务器之间交换报文的格式和方式，默认使用 80 端口。它使用 TCP 作为传输层协议，保证了数据传输的可靠性。

HTTP 是一个无状态的协议，HTTP 服务器不会保存关于客户的任何信息。

HTTP 有两种连接模式，一种是持续连接，一种非持续连接。非持续连接指的是服务器必须为每一个请求的对象建立和维护 一个全新的连接。持续连接下，TCP 连接默认不关闭，可以被多个请求复用。采用持续连接的好处是可以避免每次建立 TCP 连接三次握手时所花费的时间。在 HTTP1.0 以前使用的非持续的连接，但是可以在请求时，加上 `Connection: keep-alive` 来要求服务器不要关闭 TCP 连接。HTTP1.1 以后默认采用的是持续的连接。目前对于同一个域，大多数浏览器支持 同时建立 6 个持久连接。

HTTP 报文有两种，一种是请求报文，一种是响应报文。

#### HTTP 请求报文

```http
GET / HTTP/1.1
User-Agent:  Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0)
Accept: */*

// 实体主体
```

HTTP 请求报文的第一行叫做请求行，后面的行叫做首部行，首部行后还可以跟一个实体主体。请求首部之后有一个空行，这个空行不能省略，它用来划分首部与实体。

请求行包含三个字段：方法字段、URL 字段和 HTTP 版本字段。

方法字段可以取几种不同的值，一般有 GET、POST、HEAD、PUT 和 DELETE。一般 GET 方法只被用于向服务器获取数据。 POST 方法用于将实体提交到指定的资源，通常会造成服务器资源的修改。HEAD 方法与 GET 方法类似，但是在返回的响应 中，不包含请求对象。PUT 方法用于上传文件到服务器，DELETE 方法用于删除服务器上的对象。虽然请求的方法很多，但 更多表达的是一种语义上的区别，并不是说 POST 能做的事情，GET 就不能做了，主要看我们如何选择。更多的方法可以参 看[文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)。

#### HTTP 响应报文

```http
HTTP/1.0 200 OK
Content-Type: text/plain
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84

<html>
  <body>Hello World</body>
</html>
```

```http
HTTP/1.1 200 OK
Server: nginx/1.10.3 (Ubuntu)
Date: Tue, 02 Mar 2021 03:39:52 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
Vary: Cookie
Set-Cookie: csrftoken=7CmrZMPY9ciVVRnl9ZS7DuFBx09wHaoLS2YEzzCV7P2fTSmk1hjN2htpf6jIY1Ra; expires=Tue, 01 Mar 2022 03:39:52 GMT; Max-Age=31449600; Path=/; SameSite=Lax
Content-Encoding: gzip
```

HTTP 响应报文的第一行是状态行，后面的行是首部行，最后是实体主体。

状态行包含了三个字段：版本协议、状态码和相应的状态信息

实体部分是报文的主要部分，包含了所请求的对象。

**常见状态分类**

1\*\* - 信息，服务器收到请求，需要请求者继续执行操作

2\*\* - 成功，操作被成功接受并处理

3\*\* - 重定向，需要进一步的操作以完成请求

4\*\* - 客户端错误，请求包含语法错误或无法完成请求

5\*\* - 服务器错误，服务器在处理请求的过程中发生错误

**常见状态**

100 - 继续，客户端继续其请求，101 - 切换协议

200 - 请求成功、202 - 已接受请求，但尚未处理完成

300 - 多种选择、301 - 永久移动，资源（网页等）被永久转移到其它 URL、302 - 临时移动、304 - 所请求资源未修改

400 - 客户端请求语法错误、401 - 请求要求用户身份认证、403 - 服务端理解客户端请求，但拒绝执行请求、404 - 请求的资源不存在

500 - 服务器内部错误、502 - 作为网关或代理的服务器尝试执行请求时，从远程服务器收到了一个无效的响应

**首部行**

首部可以分为四种首部，请求首部、响应首部、通用首部、实体首部；

通用首部和实体首部在请求报文和响应报文中都可以设置，区别在与请求首部和响应首部。

常见的请求首部：Accept（可接受媒体资源类型）、Accept-Charset、Host（请求主机名）

常见的响应首部：ETag（资源的匹配信息）、Location（客户端重定向的 URI）

常见的通用首部：Cache-Control（控制缓冲策略）、Connection（管理持久连接）

常见的实体首部：Content-Length（实体主体大小）、Expires（实体主体过期时间）、Last-Modified（资源最后修改时间）

学习资料：[《HTTP 首部字段详细介绍》](https://www.cnblogs.com/jycboy/p/http_head.html)、[《图解 HTTP》](https://blog.csdn.net/qq_34289537/article/details/52971516)

#### HTTP/1.1 协议

HTTP/1.1 默认使用了持久连接，多个请求可以复用同一个 TCP 连接，但是在同一个 TCP 连接里面，数据请求的通信次序 是固定的。服务器只有处理完一个请求的响应后，才会进行下一个请求的处理，如果前面请求的响应特别慢的话，就会造成许多请求排队等待的情况，这种情况被称为“队头堵塞”。队头阻塞会导致持久连接在达到最大数量时，剩余的资源需要等待其他资源请求完成后才能发起请求。

为了避免这个问题，一个是减少请求数，一个是同时打开多个持久连接。这就是我们对网站优化时，使用雪碧图、合并脚本的原因。

#### HTTP/2 协议

**二进制协议**

**多路复用**

**数据流**

**头信息压缩**

**服务器推送**

### HTTPS 协议

**HTTP 存在的问题**

- HTTP 报文使用明文方式发送，可能被第三方窃听
- HTTP 报文可能被第三方截取后修改通信内容，接收方无法发现报文内容修改
- HTTP 还存在认证的问题，第三方可以冒充他人参与通信

HTTPS，超文本传输安全协议，基于 HTTP 协议，使用 TLS/SSL 对数据进行加密传输。使用 TLS/SSL 协议，所有信息都是加密的，并且提供一种校验机制，信息一旦被篡改，通信双方会立刻发现。还配备了身份证书，防止身份被冒充的情况出现。

#### TLS 握手过程

1. 客户端向服务器发起请求，请求中包含使用的协议版本号、生成的一个随机数（Client random）、以及客户端支持的加密方法；
2. 服务器端接收到请求后，确认双方使用的加密方法、并给出服务器的证书、生成的一个随机数（Server random）；
3. 客户端确认服务器证书有效后，生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，然后发给服务器。并且还会提供一个前面所有内容的 hash 值，用来供服务器检验；
4. 服务器使用自己的私钥，来解密客户端发送过来的随机数。并提供前面所有内容的 hash 值来供客户端检验；
5. 客户端和服务器端根据约定的加密方法使用前面的三个随机数，生成对话秘钥，以后的对话过程都使用这个秘钥来加密信息。

![bg2014092003](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014092003.png)

图片来源：[阮一峰的网络日志 - 图解 SSL/TLS 协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)

**实现原理**

TLS 的握手过程主要用到了三个方法来保证传输的安全。

首先是对称加密的方法，对称加密的方法是，双方使用同一个秘钥对数据进行加密和解密。但是对称加密的存在一个问题，就 是如何保证秘钥传输的安全性，因为秘钥还是会通过网络传输的，一旦秘钥被其他人获取到，那么整个加密过程就毫无作用了。 这就要用到非对称加密的方法。

非对称加密的方法是，我们拥有两个秘钥，一个是公钥，一个是私钥。公钥是公开的，私钥是保密的。用私钥加密的数据，只有对应的公钥才能解密，用公钥加密的数据，只有对应的私钥才能解密。我们可以将公钥公布出去，任何想和我们通信的客户，都可以使用我们提供的公钥对数据进行加密，这样我们就可以使用私钥进行解密，这样就能保证数据的安全了。但是非对称加密有一个缺点就是加密的过程很慢，因此如果每次通信都使用非对称加密的方式的话，反而会造成等待时间过长的问题。

因此我们可以使用对称加密和非对称加密结合的方式，因为对称加密的方式的缺点是无法保证秘钥的安全传输，因此我们可以非对称加密的方式来对对称加密的秘钥进行传输，然后以后的通信使用对称加密的方式来加密，这样就解决了两个方法各自存在的问题。

但是现在的方法也不一定是安全的，因为我们没有办法确定我们得到的公钥就一定是安全的公钥。可能存在一个中间人，截取了对方发给我们的公钥，然后将他自己的公钥发送给我们，当我们使用他的公钥加密后发送的信息，就可以被他用自己的私钥解密。然后他伪装成我们以同样的方法向对方发送信息，这样我们的信息就被窃取了，然而我们自己还不知道。

为了解决这样的问题，我们可以使用数字证书的方式，首先我们使用一种 Hash 算法来对我们的公钥和其他信息进行加密生成一个信息摘要，然后让有公信力的认证中心（简称 CA ）用它的私钥对消息摘要加密，形成签名。最后将原始的信息和签名合在一起，称为数字证书。当接收方收到数字证书的时候，先根据原始信息使用同样的 Hash 算法生成一个摘要，然后使用公证处的公钥来对数字证书中的摘要进行解密，最后将解密的摘要和我们生成的摘要进行对比，就能发现我们得到的信息是否被更改了。这个方法最要的是认证中心的可靠性，一般浏览器里会内置一些顶层的认证中心的证书，相当于我们自动信任了他们，只有这样我们才能保证数据的安全。

详细资料可以参考： [《一个故事讲完 https》](https://mp.weixin.qq.com/s/StqqafHePlBkWAPQZg3NrA) 、[《SSL/TLS 协议运行机制的概述》](http://ruanyifeng.com/blog/2014/02/ssl_tls.html) 、[《图解 SSL/TLS 协议》](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html) 、[《RSA 算法原理（一）》](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html) 、[《RSA 算法原理（二）》](http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html)、 [《分分钟让你理解 HTTPS》](https://juejin.im/post/5ad6ad575188255c272273c4)

### DNS 协议

DNS 协议提供的是主机名到 IP 地址的转换服务，即常说的域名系统。它还是一个分层的 DNS 服务器组成的分布式数据库，是定义了主机如何查询这个分布式数据库的方式的应用层协议。DNS 协议运行在 **UDP 协议** 之上，使用 53 端口号

**查询过程**

DNS 的查询过程一般为，我们首先将 DNS 请求发送到本地 DNS 服务器，由本地 DNS 服务器来代为请求。

1. 从"根域名服务器"查到"顶级域名服务器"的 NS 记录和 A 记录（ IP 地址）。
2. 从"顶级域名服务器"查到"次级域名服务器"的 NS 记录和 A 记录（ IP 地址）。
3. 从"次级域名服务器"查出"主机名"的 IP 地址。

例如查询 www.google.com 的 IP 地址，首先向本地 DNS 服务器发送请求，本地 DNS 服务器判断是否存在缓存；如果不存在，则向根域名服务器发送一个请求，根域名服务器返回负责 `.com` 的顶级域名服务器的 IP 地址列表；然后本地 DNS 服务器在向其中一个负责 `.com` 的顶级域名服务器发送一个请求，顶级域名服务器返回负责 `.google` 的权威域名服务器的 IP 地址列表；然后本地 DNS 服务器再向其中一个权威域名服务器发送一个请求，最后权威域名服务器返回一个对应的主机名的 IP 地址列表。

**递归查询和迭代查询**

递归查询指的是查询请求发出后，域名服务器代为向下一级域名服务器发出请求，最后向用户返回查询的最终结果。使用递归 查询，用户只需要发出一次查询请求。

迭代查询指的是查询请求后，域名服务器返回单次查询的结果。下一级的查询由用户自己请求。使用迭代查询，用户需要发出 多次的查询请求。

一般我们向本地 DNS 服务器发送请求的方式就是递归查询，因为我们只需要发出一次请求，然后本地 DNS 服务器返回给我 们最终的请求结果。而本地 DNS 服务器向其他域名服务器请求的过程是迭代查询的过程，因为每一次域名服务器只返回单次 查询的结果，下一级的查询由本地 DNS 服务器自己进行。

**DNS 缓存**

DNS 缓存的原理非常简单，在一个请求链中，当某个 DNS 服务器接收到一个 DNS 回答后，它能够将回答中的信息缓存在本 地存储器中。返回的资源记录中的 TTL 代表了该条记录的缓存的时间。

**DNS 实现负载平衡**

DNS 可以用于在冗余的服务器上实现负载平衡。因为现在一般的大型网站使用多台服务器提供服务，因此一个域名可能会对应 多个服务器地址。当用户发起网站域名的 DNS 请求的时候，DNS 服务器返回这个域名所对应的服务器 IP 地址的集合，但在 每个回答中，会循环这些 IP 地址的顺序，用户一般会选择排在前面的地址发送请求。以此将用户的请求均衡的分配到各个不 同的服务器上，这样来实现负载均衡。

## 传输层

传输层协议主要是为不同主机上的不同进程间提供了逻辑通信的功能。传输层只工作在端系统中。

#### 多路复用与多路分解

### UDP 协议

UDP 是一种无连接的，不可靠的传输层协议。它只提供了传输层需要实现的最低限度的功能，除了复用/分解功能和少量的差错检测外，它几乎没有对 IP 增加其他的东西。UDP 协议适用于对实时性要求高的应用场景。

特点：

- 使用 UDP 时，在发送报文段之前，通信双方没有握手的过程，因此 UDP 被称为是无连接的传输层协议。因为没有握手的过程，相当于 TCP 来说，没有建立连接的时延。因为没有连接，所以不需要在端系统中保存连接的状态；
- UDP 提供尽力而为的交付服务，也就是说 UDP 协议不保证数据的可靠交付；
- UDP 没有拥塞控制和流量控制机制，所以 UDP 报文段的发送速率没有限制；
- 因为一个 UDP 套接字只使用目的地址和目的端口来标识，所以 UDP 可以支持一对一、一对多、多对一和多对多的交互通信；
- UDP 首部小，只有 8 个字节

**UDP 报文段结构**

UDP 报文段由首部和应用数据组成。报文段首部包含四个字段，分别是源端口号、目的端口号、长度和检验和，每个字段的长 度为两个字节。长度字段指的是整个报文段的长度，包含了首部和应用数据的大小。校验和是 UDP 提供的一种差错校验机制。 虽然提供了差错校验的机制，但是 UDP 对于差错的恢复无能为力。

![](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/note-16.png)

### TCP 协议

TCP 协议是面向连接的，提供可靠的数据传输服务的传输层协议。

特点：

- TCP 协议是面向连接的，在通信双方进行通信前，需要通过三次握手建立连接。它需要在端系统中维护双方连接的状态信息；
- TCP 协议通过序号、确认号、定时重传、检验和等机制，来提供可靠的数据传输服务；
- TCP 协议提供的是点对点的服务，即它是在单个发送方和单个接收方之间的连接；
- TCP 协议提供的是全双工的服务，也就是说连接的双方能够向对方发送和接收数据；
- TCP 提供拥塞控制机制，在网络拥塞的时候会控制发送数据的速率，有助于减少数据包的丢失和减轻网络中的拥塞程度；
- TCP 提供了流量控制机制，保证了通信双方的发送和接收速率相同。如果接收方可接收的缓存数量很小时，发送方降低发送速率，避免因为缓存填满而造成的数据包的丢失。

#### TCP 报文段结构

TCP 报文段由首部和数据组成，它的首部一般为 20 个字节。

源端口和目的端口号用于报文段的多路复用和分解。

32 比特的序号和 32 比特的确认号，用于实现可靠数据传输服务。

16 比特的接收窗口字段用于实现流量控制，该字段表示接收方愿意接收的字节的数量。

4 比特位的首部长度字段，该字段指示了以 32 比特的字节为单位的 TCP 首部的长度。

6 比特的标志字段，ACK 字段用于指示确认序号的值是有效的，RST、SYN 和 FIN 比特用于连接建立和拆除。设置 PSH 字段指示接收方应该立即将数据交到上层，URG 字段用来指示报文段里存在紧急的数据。

校验和提供了对数据的差错检测。

![TCP](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/note-17.png)

#### TCP 三次握手过程

第一次握手

- 客户端向服务端发送一个 SYN 连接请求报文段，报文段的首部中 SYN 标志位置为 1；
- 序号字段是一个任选的随机数，代表客户端数据的初始序号。

第二次握手

- 服务端接收到客户端发送到 SYN 连接请求报文段后，服务器首先会为该连接分配 TCP 缓存和变量；
- 然后向客户端发送 SYN ACK 报文段，报文段的首部中 SYN 和 ACK 标志位都被置为 1，代表这是一个对 SYN 连接请求的确认；
- 序号字段是服务端产生的一个任选的随机数，代表的是服务端数句的初始序号；
- 确认号字段为客户端发送的序号加一。

第三次握手

- 客户端接收到服务端的肯定应答后，会为该连接分配 TCP 缓存和变量；
- 同时向服务端放送一个对服务端报文段的确认。
- 第三次握手可以在报文段中携带数据。

TCP 三次握手的建立连接的过程就是相互确认初始序号的过程，告诉对方，什么序号的报文段能够被正确接收。

第三次握手的作用是客户端对服务端的初始序号的确认，如果只使用两次握手，那么服务器就没有办法知道自己的序号是否已经被确认。同时这样也是为了防止失效的请求报文段被服务器接收，而出现错误的情况。

详细资料可以参考： [《TCP 为什么是三次握手，而不是两次或四次？》](https://www.zhihu.com/question/24853633) [《TCP 的三次握手与四次挥手》](https://blog.csdn.net/qzcsu/article/details/72861891)

#### TCP 四次挥手过程

因为 TCP 连接是全双工的，通信双方都可以向对方发送和接收消息，所以断开连接需要双方都确认。

第一次挥手

- 客户端认为没有数据再发送给服务端，就向服务器发送一个 FIN 报文段，申请断开客户端到服务端的连接；
- 发送后客户端进入 FIN_WAIT_1 状态。

第二次挥手

- 服务端接收到客户端释放连接的请求后，向客户端发送一个确认报文段，表示已经接收到客户端释放连接的请求，以后不再接收客户端发送过来的数据。但是因为连接是全双工的，所以此时服务端还可以向客户端发送数据；
- 服务端进入 CLOSE_WAIT 状态；
- 客户端收到确认后，进入 FIN_WAIT_2 状态。

第三次挥手

- 服务端发送完所有数据后，向客户端发送 FIN 报文段，申请断开服务端到客户端的连接；
- 发送完后进入 LAST_ACK 状态。

第四次挥手

- 客户端接收到 FIN 请求后，向服务器发送一个确认应答，并进入 TIME_WAIT 阶段；
- 该阶段会持续一段时间，这个时间为报文段在网络中最大生存时间；
- 如果该时间内服务器没有重发请求的话，客户端进入 CLOSED 的状态；
- 如果收到服务器的重发请求就重新发送确认报文段。服务器收到客户端的确认报文段后就进入 CLOSED 状态，这样全双工的连接就被释放了。

TCP 使用四次挥手是因为 TCP 连接是全双工的，所以需要双方分别释放到对方的连接，单独一方的连接释放，只代表不能在向对方发送数据，连接处于的是半释放的状态。

最后一次挥手中，客户端会等待一段时间再关闭，原因是防止发送给服务端的确认报文段丢失或出错，从而导致服务端不能正常关闭。

状态转化图

![note-18](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/note-18.png)

![note-19](https://cavszhouyou-1254093697.cos.ap-chongqing.myqcloud.com/note-19.png)

**一个 tcp 连接能发几个 http 请求？**

如果是 HTTP 1.0 版本协议，一般情况下，不支持长连接，因此在每次请求发送完毕之后，TCP 连接即会断开，因此一个 TCP 发送一个 HTTP 请求，但是有一种情况可以将一条 TCP 连接保持在活跃状态，那就是通过 `Connection` 和 `Keep-Alive` 首部，在请求头带上 `Connection: Keep-Alive`，并且可以通过 `Keep-Alive` 通用首部中指定的，用逗号分隔的选项调节 `keep-alive` 的行为，如果客户端和服务端都支持，那么其实也可以发送多条，不过此方式也有限制，可以关注《HTTP 权威指南》4.5.5 节对于 Keep-Alive 连接的限制和规则。

而如果是 HTTP 1.1 版本协议，支持了长连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限； 同样，如果是 HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送。

#### ARQ 协议

ARQ 协议指的是自动重传请求，通过超时和重传来保证数据的可靠交付，是 TCP 协议实现可靠数据传输的一个很重要的机制。

- 停止等待 ARQ 协议
- 连续 ARQ 协议
  - 滑动窗口协议
  - 选择重传协议

**TCP 的可靠传输机制**

**TCP 的流量控制机制**

**TCP 的拥塞控制机制**

## 网络层

网络层协议主要实现了不同主机间的逻辑通信功能。网络层协议一共包含两个主要的组件，一个 IP 网际协议，一个 路由选择协议。

## 数据链路层

数据链路层提供的服务是如何将数据报通过单一通信链路从一个结点移动到相邻节点。每一台主机都有一个唯一的 MAC 地址， 这是由网络适配器决定的，在全世界都是独一无二的。

## 物理层

物理层提供的服务是尽可能的屏蔽掉组成网络的物理设备和传输介质间的差异，使数据链路层不需要考虑网络的具体传输介质 是什么。

详细资料可以参考： [《搞定计算机网络面试，看这篇就够了（补充版）》](https://juejin.im/post/5b7be0b2e51d4538db34a51e#heading-1) [《互联网协议入门（一）》](http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html) [《互联网协议入门（二）》](http://www.ruanyifeng.com/blog/2012/06/internet_protocol_suite_part_ii.html)

参考文章：[《计算机网络知识总结》](https://github.com/CavsZhouyou/Front-End-Interview-Notebook/blob/master/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C.md)

## 常考面试题

### GET 和 POST 的区别？

- 从应用场景来说，GET 请求是一个幂等请求，用于对服务器资源不产生影响的场景；POST 请求相反；
- 从浏览器缓存来说，浏览器一般会对 GET 请求进行缓存，很少对 POST 请求缓存；
- 从报文格式来说，GET 请求的报文中实体部分为空，POST 请求的报文中实体部分为向服务器发送的数据；
- GET 请求可以将参数加入到 URL 中，但是不安全且浏览器对 URL 长度有限制

### TLS/SSL 中为什么一定要用三个随机数，来生成 “会话密钥”

客户端和服务器都需要生成随机数，以此来保证每次生成的秘钥都不相同。使用三个随机数，是因为 SSL 的协议默认不信任每个主 机都能产生完全随机的数，如果只使用一个伪随机的数来生成秘钥，就很容易被破解。通过使用三个随机数的方式，增加了自由度， 一个伪随机可能被破解，但是三个伪随机就很接近于随机了，因此可以使用这种方法来保持生成秘钥的随机性和安全性。

### SSL 连接断开后如何恢复？

一共有两种方法来恢复断开的 SSL 连接，一种是使用 session ID，一种是 session ticket。

 使用 session ID 的方式，每一次的会话都有一个编号，当对话中断后，下一次重新连接时，只要客户端给出这个编号，服务器 如果有这个编号的记录，那么双方就可以继续使用以前的秘钥，而不用重新生成一把。目前所有的浏览器都支持这一种方法。但是 这种方法有一个缺点是，session ID 只能够存在一台服务器上，如果我们的请求通过负载平衡被转移到了其他的服务器上，那 么就无法恢复对话。 

另一种方式是 session ticket 的方式，session ticket 是服务器在上一次对话中发送给客户的，这个 ticket 是加密的 ，只有服务器能够解密，里面包含了本次会话的信息，比如对话秘钥和加密方法等。这样不管我们的请求是否转移到其他的服务器 上，当服务器将 ticket 解密以后，就能够获取上次对话的信息，就不用重新生成对话秘钥了。

### DNS 为什么使用 UDP 协议作为传输层协议?

DNS 使用 UDP 协议作为传输层协议的主要原因是为了避免使用 TCP 协议时造成的连接时延。因为为了得到一个域名的 IP 地 址，往往会向多个域名服务器查询，如果使用 TCP 协议，那么每次请求都会存在连接时延，这样使 DNS 服务变得很慢，因为大多数的地址查询请求，都是浏览器请求页面时发出的，这样会造成网页的等待时间过长。 

DNS 存在一个安全问题，请求方无法确认得到的应答一定是一个安全的应答，应答可能被他人伪造。可以通过 DNS over HTTPS 来解决这个问题。

### 当你在浏览器中输入 [google.com](http://google.com/) 并且按下回车之后发生了什么？

1. 解析 URL，分析所使用的传输协议和请求的资源路径
   - 如果输入的 URL 中的协议或者主机名不合法，将会把地址栏中输入的内容传递给搜索引擎；
   - 如果没有问题，浏览器会检查 URL 中是否出现了非法字符，存在则对非法字符转义后再进行下一过程；
2. 浏览器会判断所请求的资源是否在缓存中，如果在且没有失效，就直接使用，否则向服务器发起新的请求
3. DNS 解析，获取输入的 URL 中的域名的 IP 地址
   - 判断本地是否有该域名的 IP 地址的缓存，有则使用，没有则向本地 DNS 服务器发起请求；
   - 本地 DNS 服务器也会先检查是否存在缓存，没有就会先向根域名服务器发起请求，获得负责的顶级域名服务器的地址后，再向顶级域名服务器请求，获得负责的权威域名服务器的地址后，再向权威域名服务器发起请求，最终获得域名的 IP 地址。
   - 本地 DNS 服务器再将这个 IP 地址返回给请求的用户。（用户向本地 DNS 服务器发起的请求属于递归请求，本地 DNS 服务器向各级域名服务器发起的请求属于迭代请求）；
4. 当浏览器得到 IP 地址后，数据传输还需要知道目的主机 MAC 地址
   - 应用层下发数据给传输层，TCP 协议会指定源端口号和目的端口号，然后下发给网络层；
   - 网络层会将本机地址作为源地址，获取的 IP 地址作为目的地址，然后下发到数据链路层；
   - 数据链路层的发送需要加入通信双方的 MAC 地址，我们本机的 MAC 地址作为源 MAC 地址，目的 MAC 地址需要分情况处理：通过将 IP 地址与我们本机的子网掩码相与，可以判断我们是否与请求主机在同一个子网里，如果在同一个子网里，使用 ARP 协议获取目的主机的 MAC 地址；如果不在一个子网里，那么请求应该转发给网关，由它代为转发，此时同样可以通过 ARP 协议来获取网关的 MAC 地址，此时目的主机的 MAC 地址应该为网关的地址。
5. TCP 建立连接的三次握手
   - 客户端向服务器发送 SYN 请求报文段和一个随机序号；
   - 服务器收到请求后向客户端发送 SYN ACK 报文段（确认连接请求）和一个随机序号；
   - 客户端收到服务器应答后，进入连接建立状态，同时向服务器发送一个 ACK 确认报文段，服务器接收到确认后，也进入连接确认状态。
6. 如果使用 HTTPS 协议，通信前还需要 TLS 的四次握手的过程
   - 客户端向服务器发送协议版本号、支持的加密方式和一个随机数；
   - 服务端收到后，确认加密方式，向客户端发送一个随机数和自己的数字证书；
   - 客户端收到后，先检查数字证书是否有效，如果有效，则再生成一个随机数，并使用证书中的公钥对随机数加密，然后发送给服务端，并且还会提供一个前面所有内容的 hash 值供服务器检验；
   - 服务器收到后，使用自己的私钥解密，同时向客户端发送一个前面所有内容的 hash 值供客户端检验；
   - 此时，双方都有了三个随机数，按照之前约定的加密方式，使用这三个随机数生成一把“会话密钥”，以后双方通信就使用这个密钥对数据加密后传输。
7. 当页面请求发送到服务器后，服务器返回一个 HTML 文件作为响应，浏览器接收到响应后，开始对 HTML 文件进行解析，开始渲染过程
8.  浏览器首先会根据 HTML 文件构建 DOM 树，根据解析到的 CSS 文件构建 CSSOM 树，如果遇到 script 标签，则判断是否含有 defer 或 async 属性，不然 script 的加载和执行会阻塞页面的渲染。当 DOM 树和 CSSOM 树构建完成后，根据它们来构建渲染树。渲染树构建好后，会根据渲染树来进行布局。布局完成后，最后使用浏览器的 UI 接口对页面进行绘制。这个时候整个页面就显示出来了。
9. 最后一步是 TCP 断开连接四次挥手的过程。

详细资料可以参考： [《当你在浏览器中输入 Google.com 并且按下回车之后发生了什么？》](http://blog.jobbole.com/84870/)

### CDN 服务

CDN 是一个内容分发网络，通过对源网站资源的缓存，利用本身多台位于不同地域、不同运营商的服务器，向用户提供资源就近访问的功能。也就是说，用户的请求并不是直接发送给源网站，而是发送给 CDN 服务器，由 CND 服务器将请求定位到最近的含有该资源的服务器上去请求。这样有利于提高网站的访问速度，同时通过这种方式也减轻了源服务器的访问压力。

### 正向代理和反向代理

正向代理的过程，它隐藏了真实的请求客户端，服务端不知道真实的客户端是谁，客户端请求的服务都被代理服务器代替来请求。

反向代理隐藏了真实的服务端，当我们请求一个网站的时候，背后可能有成千上万台服务器为我们服务，但具体是哪一台，我们不知道，也不需要知道，我们只需要知道反向代理服务器是谁就好了，反向代理服务器会帮我们把请求转发到真实的服务器那里去。反向代理器一般用来实现负载平衡。

### 负载平衡的两种实现方式？

- 反向代理的方式，用户的请求都发送到反向代理服务上，然后由反向代理服务器来转发请求到真实的服务器上，以此来实现集群的负载平衡。

- DNS 的方式，DNS 可以用于在冗余的服务器上实现负载平衡。因为现在一般的大型网站使用多台服务器提供服务，因此一个域名可能会对应多个服务器地址。当用户向网站域名请求的时候，DNS 服务器返回这个域名所对应的服务器 IP 地址的集合，但在每个回答中，会循环这些 IP 地址的顺序，用户一般会选择排在前面的地址发送请求。以此将用户的请求均衡的分配到各个不同的服务器上，这样来实现负载均衡。这种方式有一个缺点就是，由于 DNS 服务器中存在缓存，所以有可能一个服务器出现故障后，域名解析仍然返回的是那个 IP 地址，就会造成访问的问题。

### http 请求方法 options 方法有什么用？


OPTIONS 请求与 HEAD 类似，一般也是用于客户端查看服务器的性能。这个方法会请求服务器返回该资源所支持的所有 HTTP 请求方法，该方法会用'*'来代替资源名称，向服务器发送 OPTIONS 请求，可以测试服务器功能是否正常。JS 的 XMLHttpRequest 对象进行 CORS 跨域资源共享时，对于复杂请求，就是使用 OPTIONS 方法发送嗅探请求，以判断是否有对指定资源的访问权限。

### 即时通讯的实现，短轮询、长轮询、SSE 和 WebSocket 间的区别？

短轮询和长轮询的目的都是用于实现客户端和服务器端的一个即时通讯。

短轮询的基本思路就是浏览器每隔一段时间向浏览器发送 http 请求，服务器端在收到请求后，不论是否有数据更新，都直接进行响应。这种方式实现的即时通信，本质上还是浏览器发送请求，服务器接受请求的一个过程，通过让客户端不断的进行请求，使得客户端能够模拟实时地收到服务器端的数据的变化。这种方式的优点是比较简单，易于理解。缺点是这种方式由于需要不断的建立 http 连接，严重浪费了服务器端和客户端的资源。当用户增加时，服务器端的压力就会变大，这是很不合理的。

长轮询的基本思路是，首先由客户端向服务器发起请求，当服务器收到客户端发来的请求后，服务器端不会直接进行响应，而是先将这个请求挂起，然后判断服务器端数据是否有更新。如果有更新，则进行响应，如果一直没有数据，则到达一定的时间限制才返回。客户端 JavaScript 响应处理函数会在处理完服务器返回的信息后，再次发出请求，重新建立连接。长轮询和短轮询比起来，它的优点是明显减少了很多不必要的 http 请求次数，相比之下节约了资源。长轮询的缺点在于，连接挂起也会导致资源的浪费。

SSE 的基本思想是，服务器使用流信息向服务器推送信息。严格地说，http 协议无法做到服务器主动推送信息。但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息。也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。SSE 就是利用这种机制，使用流信息向浏览器推送信息。它基于 http 协议，目前除了 IE/Edge，其他浏览器都支持。它相对于前面两种方式来说，不需要建立过多的 http 请求，相比之下节约了资源。

上面三种方式本质上都是基于 http 协议的，我们还可以使用 WebSocket 协议来实现。WebSocket 是 Html5 定义的一个新协议，与传统的 http 协议不同，该协议允许由服务器主动的向客户端推送信息。使用WebSocket 协议的缺点是在服务器端的配置比较复杂。WebSocket 是一个全双工的协议，也就是通信双方是平等的，可以相互发送消息，而 SSE 的方式是单向通信的，只能由服务器端向客户端推送信息，如果客户端需要发送信息就是属于下一个 http 请求了。


详细资料可以参考： [《轮询、长轮询、长连接、websocket》](https://cloud.tencent.com/developer/article/1076547) [《Server-Sent Events 教程》](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html) [《WebSocket 教程》](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

