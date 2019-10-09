
---
title: SSH连接iOS设备的几种方法
date: 2019-10-09 16:22:33
tags: [usbmuxd,ssh,OpenSSH,Cydia]
---

# 必备工具
- 一台已经越狱的iPhone
- 一台PC


# 方案一
1. 打开Cydia,搜索OpenSSH，安装。
![](/images/da95dc82edb749c09f8da787f1630990.png)
2. 保证PC和iPhone在同一局域网下，然后连接SSH。默认的账户是root，密码是alpine。地址是设备的局域网地址。
``` 
$ ssh root@192.169.50.99
```

# 方案二
1. 打开Cydia，卸载掉OpenSSH（如果安装了），然后添加源：`http://cydia.ichitaso.com/test`。（如果iPhone重启了，打开Cydia闪退，记得先Re-Jailbreak）
2. 在Cydia中搜索dropbear，安装。
![](/images/d51c54fa7d0b45e28ee73ac6e7124417.png)
3. 然后重复方案一的2.,直接SSH连接即可。

# 遇到的问题
如果wifi连接iPhone设备一直失败怎么办？
我们可以借助`usbmuxd`这个工具通过USB连接。
`usbmuxd` 是苹果的一个服务，这个服务主要用于在USB协议上实现多路TCP连接，将USB通信抽象为TCP通信。苹果的iTunes、Xcode，都直接或间接地用到了这个服务。它提供了一个USB - TCP的转换服务。

1. 安装usbmuxd。
``` 
$ brew install usbmuxd
```
2. 建立映射关系。
```
$ iproxy 1234 22
$ waiting for connection
```
这样当前连接设备的22端口(SSH端口)映射到电脑的1234端口，因此想和设备通信，直接和本地端口1234通信就可以了。
```
$ ssh -p 1234 root@127.0.0.1
```

如果你还是连不上设备，那就打开i4助手-工具箱-打开SSH通道。当然前提是设备已经安装了OpenSSH。






