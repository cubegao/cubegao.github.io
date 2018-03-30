---
title: 在Centos7.2上编译安装Swift
date: 2018-03-30 16:10:33
tags: [Swift,Centos,Docker]
---


由于想用Swift写服务玩玩，准备在Centos7.2上部署一个Swift环境，能跑一下Perfect。

由于Docker的种种好处，当然是选择它来部署Swift环境。

### 安装Docker
#### 1.更新yum包到最新。
```bash
[root@fadaixiaohai ~]# yum update
```
#### 2.执行 Docker 安装脚本。
```bash
[root@fadaixiaohai ~]# curl -fsSL https://get.docker.com/ | sh
```
#### 3.启动 Docker 进程。
```bash
[root@fadaixiaohai ~]# service docker start
```
#### 4.验证 docker 是否安装成功并在容器中执行一个测试的镜像。
```bash
[root@fadaixiaohai ~]# docker run hello-world
Hello from Docker!
```
大概两三分钟就安装好了，国内的服务器可能要用镜像加速会好点。


### 安装Swift
#### 1.拉去Swift的镜像到本地。
```bash
[root@fadaixiaohai ~]# docker pull swift
```
镜像拉取成功后就可以使用docker images列出当前我们拉取到本地的所有镜像：
```bash
[root@fadaixiaohai ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
swift               latest              934835f58041        3 weeks ago         1.3GB
hello-world         latest              f2a91732366c        4 months ago        1.85kB
```
我们都知道，操作系统分为内核和用户空间。对于 Linux 而言，内核启动后，会挂载 root 文件系统为其提供用户空间支持。而 Docker 镜像（Image），就相当于是一个 root 文件系统。

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。

#### 2.在镜像里面创建一个容器并且连接它
```bash
[root@fadaixiaohai ~]# docker run  -it --name swiftfun swift /bin/bash
```
其中`-it`意思是以交互式(interactive)终端(tty)的方式运行，`--name swiftfun`指定容器的名称，`/bin/bash`是容器启动后执行的命令，也就是进入bash控制台，运行成功后会进入：
```bash
root@8408a26c123b:/#
```
默认是root用户，这里我们使用诸如`apt-get`命令时就不需要加sudo了

现在，你可以在容器中运行`swift --version`来确认是否配置成功：
```bash
root@8408a26c123b:/# swift --version
Swift version 4.0.3 (swift-4.0.3-RELEASE)
Target: x86_64-unknown-linux-gnu
```
然后用`swift`命令看是否能进入swift REPL：
```bash
root@8408a26c123b:/# swift
error: failed to launch REPL process: process launch failed: 'A' packet returned an error: 8
```
发现报错了，找到Docker官方给的解决方案是：
```bash
[root@fadaixiaohai ~]# docker run --cap-add sys_ptrace -it --rm swift swift
error: failed to launch REPL process: process launch failed: 'A' packet returned an error: 8
```
运行时添加了`--cap-add sys_ptrace`选项，应该是添加一个系统的权限。加上`--rm`选项是创建新容器时，把已经存在的旧容器删掉。但是依然是相同的报错。

最后在github上面好到了解决方案。添加一条`--privileged`。它的含义是：
--privileged=false Give extended privileges to this container 赋予容器扩展权限
运行结果如下：
```bash
[root@fadaixiaohai ~]# docker run --cap-add sys_ptrace --privileged -it --rm swift swift
Welcome to Swift version 4.0.3 (swift-4.0.3-RELEASE). Type :help for assistance.
1> print("hello world")
hello world
2>
```
以后想要连接swiftfun这个容器，必须先启动，后连接。方法如下：
```bash
[root@fadaixiaohai ~]# docker start swiftfun
swiftfun
[root@fadaixiaohai ~]# docker attach swiftfun
root@8408a26c123b:/#
```
查看所有容器状态:
```bash
[root@fadaixiaohai ~]# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                          PORTS               NAMES
8408a26c123b        swift               "/bin/bash"         27 hours ago        Exited (0) About a minute ago                       swiftfun
cc12559d586c        hello-world         "/hello"            27 hours ago        Exited (0) 27 hours ago                             boring_yonath
```

以上就是本文的所有内容了，祝你玩得愉快！

