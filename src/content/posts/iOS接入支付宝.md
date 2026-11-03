---
title: "iOS接入支付宝"
date: 2016-01-03 22:45:27
tags: ["IOS"]
slug: "iOS接入支付宝"
---
记得我做的第一个iOS应用就有接入支付宝的功能，然而当时并没有成功接入。一个是因为当时自己大三刚刚开窍菜的抠脚，另一个是因为网上传闻iOS添加支付宝的SDK难用程度已经突破了天际！所以就自动放弃了～

**但是！！我终于在一年后的今天给它弄上了！！现在返回去看其实也不难，虽然坑很多**

引用《火星救援》马克说的话：
> You just begin.  
> You do the math. You solve one problem  
> and you solve the next one,  
> and then the next.  
> And if you solve enough problems, you get to come home.  

遇到困难去做就是了，可能有成堆的问题，但是一个问题一个问题的去解决，只要解决的问题足够多，这个困难就过去了。同样，一个你不熟悉的框架或者系统，一开始自己会感到手足无措，完全不知道该怎么办，这时候只需要每天学一个技术，每天看一点文档，慢慢的就会了，然后就熟悉了，最后就可以在别人崇拜的眼光面前摇摇头说：“我也只是略懂啦～”。



## 准备
首先要去支付宝填申请，可以得到一个`parnter`和一个`seller`。然后自己要在自己的电脑上生成一组RSA，把公钥交给支付宝，私钥自己留着。具体生成方法支付宝的SDK里面有写，或者可以看这个[openssl生成RSA公私钥](http://caoyudong.com/2015/11/01/openssl%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86/)，两分钟的事。

## 下载SDK
首先要从网上下载SDK。[下载地址](https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.jhNbkN&treeId=54&articleId=104509&docType=1)

## 运行 demo

得到SDK后先运行下他给的iOS端的demo。demo中`APViewController.m`里面找到下面这几行代码，填上你的`parnter`、`seller`和`privateKey`，然后运行看下能不能支付成功，如果可以的话，说明你的三个参数没有问题，可以准备接入了

```objectivec
/*
	 *商户的唯一的parnter和seller。
	 *签约后，支付宝会为每个商户分配一个唯一的 parnter 和 seller。
	 */
	
/*============================================================================*/
/*=======================需要填写商户app申请的===================================*/
/*============================================================================*/
	NSString *partner = @"";
	NSString *seller = @"";
	NSString *privateKey = @"";
/*============================================================================*/
/*============================================================================*/
/*============================================================================*/
```

## 接入

首先把SDK包中的几个东西拖到你的项目中去：`AlipaySDK.bundle`,`AlipaySDK.framework`,`libcrypto.a`和`libssl.a`。

然后把demo中`Util`文件夹拖入你的项目中：  
**注意！要选择`Create groups`！！！**  
**注意！要选择`Create groups`！！！**  
**注意！要选择`Create groups`！！！**   

**`Util`**拖进去后应该是黄色的而不是蓝色的！！！  

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-3/17957823.jpg)

然后把demo中`openssl`文件夹拖入你的项目中： 

**注意这次选`Create folder reference`！！**

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-3/46318361.jpg)

然后把demo中这几个文件拖到你的项目中：`Product.h`,`Product.m`,`APAuthV2Info.h`,`APAuthV2Info.m`,`Order.h`,`Order.m`

**现在你的项目里面应该包含这些东西（特别注意下Util文件夹和openssl文件夹的颜色）：**


![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-3/55639355.jpg)

----

在你要用到支付的地方引入以下头文件

```objectivec
#import "Order.h"
#import <AlipaySDK/AlipaySDK.h>
#import "DataSigner.h"
#import "Product.h"
```


 然后参考demo的支付写了下面这个支付函数：

```objectivec
- (void)Alipay{
	
	/*
	 *点击获取prodcut实例并初始化订单信息
	 */
	//    Product *product = [self.productList objectAtIndex:indexPath.row];
	Product *product = [[Product alloc] init];
	product.subject = @"1";
	product.body = @"人在塔在";
	
	product.price = 0.01f+pow(10,-2);
	
	/*
	 *商户的唯一的parnter和seller。
	 *签约后，支付宝会为每个商户分配一个唯一的 parnter 和 seller。
	 */
	
	/*============================================================================*/
	/*=======================需要填写商户app申请的===================================*/
	/*============================================================================*/
	NSString *partner = @"";
	NSString *seller = @"";
	NSString *privateKey = @“私钥”;
	/*============================================================================*/
	/*============================================================================*/
	/*============================================================================*/
	
	//partner和seller获取失败,提示
	if ([partner length] == 0 ||
		[seller length] == 0 ||
		[privateKey length] == 0)
	{
				UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示"
																message:@"缺少partner或者seller或者私钥。"
															   delegate:self
													  cancelButtonTitle:@"确定"
													  otherButtonTitles:nil];
				[alert show];
	}
	
	/*
	 *生成订单信息及签名
	 */
	
	product.price = 0.01f+pow(10,-2);//商品价格
	//将商品信息赋予AlixPayOrder的成员变量
	
	
	Order *order = [[Order alloc] init];
	order.partner = partner;
	order.seller = seller;
	order.tradeNO = [self generateTradeNO]; //订单ID（由商家自行制定）
	order.productName = product.subject; //商品标题
	order.productDescription = product.body; //商品描述
	order.amount = [NSString stringWithFormat:@"%.2f",product.price]; //
	
	order.notifyURL =  @"http://www.xxx.com"; //回调URL
	
	order.service = @"mobile.securitypay.pay";
	order.paymentType = @"1";
	order.inputCharset = @"utf-8";
	order.itBPay = @"30m";
	order.showUrl = @"m.alipay.com";
	
	//应用注册scheme,在AlixPayDemo-Info.plist定义URL types
	NSString *appScheme = @"alisdkdemo";
	
	//将商品信息拼接成字符串
	NSString *orderSpec = [order description];
	NSLog(@"orderSpec = %@",orderSpec);
	
	//获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode
	id<DataSigner> signer = CreateRSADataSigner(privateKey);
	NSString *signedString = [signer signString:orderSpec];
	
	//将签名成功字符串格式化为订单字符串,请严格按照该格式
	NSString *orderString = nil;
	if (signedString != nil) {
		orderString = [NSString stringWithFormat:@"%@&sign=\"%@\"&sign_type=\"%@\"",
					   orderSpec, signedString, @"RSA"];
		
	//回调会调用这个函数
	[[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
		NSLog(@"reslut = %@",resultDic);
	}];
		
		//        [tableView deselectRowAtIndexPath:indexPath animated:YES];
	}
}
- (NSString *)generateTradeNO
{
	static int kNumber = 15;
	
	NSString *sourceStr = @"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	NSMutableString *resultStr = [[NSMutableString alloc] init];
	srand(time(0));
	for (int i = 0; i < kNumber; i++)
	{
		unsigned index = rand() % [sourceStr length];
		NSString *oneStr = [sourceStr substringWithRange:NSMakeRange(index, 1)];
		[resultStr appendString:oneStr];
	}
	return resultStr;
}
```

按照官方的说法，这样子就差不多算是把支付宝接入了；现在点击运行。。。。会惊奇的发现：**Boom! sha ka la ka!!** 

报了超多错！这就是支付宝坑的地方，接下来我们来填坑。

## 填坑
#### Util/base64.h:63:21: Cannot find interface declaration for 'NSObject', superclass of 'Base64'

在`base64.h `中加入`#import <Foundation/Foundation.h>` 官方古老的demo加到了`PCH`中，所以不会报错～结果他说都不说一声！！！坑啊有没有！！！

</br>

#### Util/openssl_wrapper.m:11:9: 'rsa.h' file not found

 在`Build setting`中搜索`search`，找到`Header Search Paths`，添加`$(PROJECT_DIR)/openssl`和`$(PROJECT_DIR)`  如图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-3/40007724.jpg)

</br>

####   "_CNCopyCurrentNetworkInfo", referenced from:

这类错很多，大概有这些：

```bash
Undefined symbols for architecture x86_64:
  "_CNCopyCurrentNetworkInfo", referenced from:
	  -[APayReachability wifiInterface] in AlipaySDK
	  +[internal_DeviceInfo getSSIDInfo] in AlipaySDK
	  +[internal_DeviceInfo getNetworkInfo] in AlipaySDK
  "_CNCopySupportedInterfaces", referenced from:
	  -[APayReachability wifiInterface] in AlipaySDK
	  +[internal_DeviceInfo getSSIDInfo] in AlipaySDK
	  +[internal_DeviceInfo getNetworkInfo] in AlipaySDK
  "_CTRadioAccessTechnologyCDMA1x", referenced from:
	  -[AliSecXReachability networkStatusForFlags:] in AlipaySDK
  "_CTRadioAccessTechnologyEdge", referenced from:
	  -[AliSecXReachability networkStatusForFlags:] in AlipaySDK
  "_CTRadioAccessTechnologyGPRS", referenced from:
	  -[AliSecXReachability networkStatusForFlags:] in AlipaySDK
  "_CTRadioAccessTechnologyLTE", referenced from:
	  -[AliSecXReachability networkStatusForFlags:] in AlipaySDK
  "_OBJC_CLASS_$_CMMotionManager", referenced from:
	  objc-class-ref in AlipaySDK
  "_OBJC_CLASS_$_CTTelephonyNetworkInfo", referenced from:
	  objc-class-ref in AlipaySDK
  "_SCNetworkReachabilityCreateWithAddress", referenced from:
	  +[APayReachability reachabilityWithAddress:] in AlipaySDK
	  +[AliSecXReachability reachabilityWithAddress:] in AlipaySDK
  "_SCNetworkReachabilityCreateWithName", referenced from:
	  +[APayReachability reachabilityWithHostname:] in AlipaySDK
	  +[AliSecXReachability reachabilityWithHostName:] in AlipaySDK
  "_SCNetworkReachabilityGetFlags", referenced from:
	  -[APayReachability isReachable] in AlipaySDK
	  -[APayReachability isReachableViaWWAN] in AlipaySDK
	  -[APayReachability isReachableViaWiFi] in AlipaySDK
	  -[APayReachability connectionRequired] in AlipaySDK
	  -[APayReachability isConnectionOnDemand] in AlipaySDK
	  -[APayReachability isInterventionRequired] in AlipaySDK
	  -[APayReachability reachabilityFlags] in AlipaySDK
	  ...
  "_SCNetworkReachabilityScheduleWithRunLoop", referenced from:
	  -[AliSecXReachability startNotifier] in AlipaySDK
  "_SCNetworkReachabilitySetCallback", referenced from:
	  -[APayReachability startNotifier] in AlipaySDK
	  -[APayReachability stopNotifier] in AlipaySDK
	  -[AliSecXReachability startNotifier] in AlipaySDK
  "_SCNetworkReachabilitySetDispatchQueue", referenced from:
	  -[APayReachability startNotifier] in AlipaySDK
	  -[APayReachability stopNotifier] in AlipaySDK
  "_SCNetworkReachabilityUnscheduleFromRunLoop", referenced from:
	  -[AliSecXReachability stopNotifier] in AlipaySDK
  "std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >::__init(char const*, unsigned long)", referenced from:
	  CAliSecXURL::encodeURIComponent(CAliSecXBuffer&) in AlipaySDK
  "std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >::reserve(unsigned long)", referenced from:
	  CAliSecXURL::encodeURIComponent(CAliSecXBuffer&) in AlipaySDK
  "std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> >::~basic_string()", referenced from:
	  CAliSecXURL::encodeURIComponent(CAliSecXBuffer&) in AlipaySDK
  "std::nothrow", referenced from:
	  CAliSecXBuffer::CAliSecXBuffer(unsigned long) in AlipaySDK
	  CAliSecXBuffer::_copy(unsigned char const*, unsigned long) in AlipaySDK
	  CAliSecXBuffer::resize(unsigned long) in AlipaySDK
  "std::terminate()", referenced from:
	  ___clang_call_terminate in AlipaySDK
  "operator delete[](void*)", referenced from:
	  CAliSecXBuffer::~CAliSecXBuffer() in AlipaySDK
	  CAliSecXBuffer::release() in AlipaySDK
	  CAliSecXBuffer::~CAliSecXBuffer() in AlipaySDK
	  CAliSecXBuffer::operator=(CAliSecXBuffer const&) in AlipaySDK
	  CAliSecXBuffer::resize(unsigned long) in AlipaySDK
	  alisec_crypto_Hex2Bin(CAliSecXBuffer const&) in AlipaySDK
	  alisec_crypto_Bin2Hex(CAliSecXBuffer const&) in AlipaySDK
	  ...
  "operator new[](unsigned long, std::nothrow_t const&)", referenced from:
	  CAliSecXBuffer::CAliSecXBuffer(unsigned long) in AlipaySDK
	  CAliSecXBuffer::_copy(unsigned char const*, unsigned long) in AlipaySDK
	  CAliSecXBuffer::resize(unsigned long) in AlipaySDK
  "___cxa_begin_catch", referenced from:
	  ___clang_call_terminate in AlipaySDK
  "___gxx_personality_v0", referenced from:
	  +[ASSStorageAccesser saveStorageModel:] in AlipaySDK
	  +[ASSStorageAccesser loadStorageModelFromKeychain] in AlipaySDK
	  +[ASSStorageAccesser loadPreviousApdid] in AlipaySDK
	  +[ASSStorageAccesser getRandomizedID] in AlipaySDK
	  +[ASSStorageAccesser getNewRadomizedID] in AlipaySDK
	  +[ASSStorageAccesser loadLastLoginTime] in AlipaySDK
	  +[ASSStorageAccesser saveCurrentLoginTime:] in AlipaySDK
	  ...
  "_deflate", referenced from:
	  +[ASSCommonUtils gzipData:] in AlipaySDK
	  +[DTGZipUtil compressGZip:] in AlipaySDK
  "_deflateEnd", referenced from:
	  +[ASSCommonUtils gzipData:] in AlipaySDK
	  +[DTGZipUtil compressGZip:] in AlipaySDK
  "_deflateInit2_", referenced from:
	  +[ASSCommonUtils gzipData:] in AlipaySDK
	  +[DTGZipUtil compressGZip:] in AlipaySDK
  "_kCNNetworkInfoKeyBSSID", referenced from:
	  +[UIDevice(APEX) networkDic] in AlipaySDK
  "_kCNNetworkInfoKeySSID", referenced from:
	  +[UIDevice(APEX) networkDic] in AlipaySDK
ld: symbol(s) not found for architecture x86_64
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

这种问题通过在`General`->`Link Framework and Libraiies`中添加以下framework解决：

* libz.tbd
* libc++.tbd
* Security.framework
* CoreMotion.Framework
* CFNetwork.framework
* CoreTelephony.framework
* SystemConfiguration.framework


如图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-3/89744262.jpg)

> 强迫症可以挪下位置～～

现在运行，应该就可以了，别的问题我好像也没有遇到～（记得联网！！！！）

#### 交易订单处理失败，请稍候再试。（ALI64）



我出现这个问题是因为`product.body`放了空值，这里不能为空～

----

补充下，支付完成的回调需要在`AppDelegate.h`中的`-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation;`函数中调用：
 
```objectivec
if ([url.host isEqualToString:@"safepay"]) {
        [[AlipaySDK defaultService]
         processOrderWithPaymentResult:url
         standbyCallback:^(NSDictionary *resultDic) {
         //这个部分绝对不会运行，不用在这里浪费时间了～
         }];
        return YES;
    }
```
来处理回调，不然应用无法知道有没有支付成功。返回`9000`代表支付成功。

**注意仔细查看本文中`Alipay`函数的最后几行，在那个地方有个`[[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback……`函数，在这个函数中处理回调的结果！！**

**`AppDelegate.h`里面的`standbyCallback:\^(NSDictionary \*resultDic) {}];`是不会有回调结果的!!!**