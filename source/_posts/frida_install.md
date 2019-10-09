
---
title: 安装frida的一些坑
date: 2019-10-09 17:47:33
tags: [frida,Cydia]
---

# 开始安装frida

首先需要安装python，Mac已经自带python2.7，frida作者是推荐安装python3.x。python2.x同样也能安装成功。

```
$ sudo pip install frida
```

如果报错：

```
DEPRECATION: Uninstalling a distutils installed project (six) has been deprecated and will be removed in a future version. This is due to the fact that uninstalling a distutils project will only partially uninstall the project.
```

安装命令修改成

```
$ sudo pip install frida --ignore-installed six
```

如果报错：

```
Exception:
Traceback (most recent call last):
  File "/Library/Python/2.7/site-packages/pip-9.0.1-py2.7.egg/pip/basecommand.py", line 215, in main
    status = self.run(options, args)
```

安装命令修改成：

```
$ sudo -H pip install frida --ignore-installed six
```

然后一个小时过去了，回来一看卡住了，一直停留在下面这个地方。

```
Running setup.py install for frida
```

如果有科学上网工具，可以操作一下。如果没有也没关系，我们可以先把egg文件下到本地用setuptools进行安装。

### 先装setuptools

[https://pypi.org/project/setuptools/#files](https://pypi.org/project/setuptools/#files)

下载最新版的.whl文件，命令行安装：

```
$ pip install (本地.whl文件路径).whl
```

### 通过setuptools安装frida

[https://pypi.org/project/frida/#files](https://pypi.org/project/frida/#files)

下载你需要的版本.egg文件，命令行安装：

```
$ easy_install (本地.egg文件路径).egg
```

# 安装frida-tools

```
$ pip install frida-tools
```

如果安装卡住，也可以先下载文件到本地。

[https://pypi.org/project/frida-tools/#files](https://pypi.org/project/frida-tools/#files)

解压后运行setup.py安装。

# 安装完成

```
$ frida-ps
```

如果能显示当前系统进程则证明安装成功。