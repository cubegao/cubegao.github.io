---
title: 容易被人忽略的NSCache
date: 2017-01-15 10:22:24
tags: [NSCache]
---


第一次见到`NSCache`，是在`SDWebImage`中。`SDWebImage`的内存缓存机制就是通过`NSCache`实现的。所以可能你不太了解这个类，但是其实一直在使用它。

###为什么要使用NSCache？
我们通常用使用缓存来临时存储短时间使用但创建昂贵的对象。重用这些对象可以优化性能，因为它们的值不需要重新计算。另外一方面，这些对象对于程序来说不是紧要的，在内存紧张时会被丢弃。如果对象被丢弃了，则下次使用时需要重新计算。

`NSCache`是一个可变的集合，主要用来存储`key-value`对。它有着和`NSMutableDictionary`类似的API。实际上，`NSCache`就像是一个会自动移除对象来释放内存的`NSMutableDictionary`。
```
- (id)objectForKey:(id)key
- (void)setObject:(id)obj forKey:(id)key
- (void)setObject:(id)obj forKey:(id)key cost:(NSUInteger)num
- (void)removeObjectForKey:(id)key
- (void)removeAllObjects
```

`NSCahce`与可变集合不同之处：

> 1.`NSCache`类有自己的自动删除策略，以确保缓存不用使用太多的系统内存。如果其他应用需要内存，则自动删除策略会从缓存中删除一些项目，从而最大限度的减少内存占用。
 2.`NSCache`是线程安全的，我们可以从不同的线程中添加、删除和查询缓存中的对象，而不需要锁定缓存区域。其中线程安全是`pthread_mutex`完成的。
3.明显区别于`NSMutableDictionary`的是，键对象不会被`retain`。（键不需要实现`NSCopying`协议）

###需要注意的点
`NSCache`提供了一个`delegate`方法：
```	
- (void)cache:(NSCache *)cache willEvictObject:(id)obj
```
需要注意的是在这个代理方法中不能修改`NSCache`对象，也就是只能测试使用。

>`NSCache`提供了一系列的属性来限制缓存的大小。比如属性`countLimit`限定了缓存最多维护的对象的个数，属性`totalCostLimit`限定了缓存能维持的最大内存。
在存取方法中，有一个`setObject:forKey:cost: `方法，它和`setObject:forKey: `方法类似，但是带着`cost`参数。`cost`表示每次的消耗，如对象占用的字节数。当内存不足或者所有缓存对象的总消耗超过了最大值时，缓存会移除其中的一些对象。

上面这些内容，看起来很美好，但是问题来了。从缓存中移除对象并不能保证顺序，也就是有可能刚写入的对象，就被丢弃了。如果你要使用`cost`来完成一些特殊的需求，那你可能要失望了。所以计算`cost`值，可能反而会增加使用缓存的代价。

>另外`countLimit`和`totalCostLimit`属性都是不精确或者不严格的，也就是如果缓存的数量超过了`countLimit`，或者缓存维持的最大内存超过了`totalCostLimit`，缓存中的对象可能会被丢弃，也可能不会，具体的策略只有苹果自己知道。
虽然苹果提供了`NSDiscardableContent`来控制对象是否会被自动移除的机制，但是这可能会让你碰到更多的问题。

###总结
虽然`NSCache`有一些缺点，但是也应该去积极使用。如果我们需要构建内存缓存机制，就应该选用`NSCache`而非`NSDictionary`，这样可以减少我们应用对内存的占用，从而达到优化内存的目标。

