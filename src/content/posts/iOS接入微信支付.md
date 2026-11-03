---
title: "iOS接入微信支付"
date: 2016-03-20 13:27:58
tags: ["IOS"]
slug: "iOS接入微信支付"
---
# iOS接入微信支付

微信支付SDK比支付宝的SDK好了不知道多少倍，坑也少了好多，简直是支付类SDK中的良心之作！！
 
[iOS接入支付宝SDK传送门](http://caoyudong.com/2016/01/03/iOS%E6%8E%A5%E5%85%A5%E6%94%AF%E4%BB%98%E5%AE%9D/)



## 准备

首先要去微信申请一个账号，分别有`商户API密钥`和`商户号` <https://open.weixin.qq.com/>

## 下载SDK

目前微信SDK已经升级到了（1.6.2）。但是我现在用的是上一个版本SDK，[这里有下载](http://7xkfbb.com1.z0.glb.clouddn.com/wechat_sdk_sample_ios_v3_pay.zip)

为什么不用最新的呢？因为最新的SDK里面要求签名加密等操作在服务器上完成然后返回给手机端，然而……额，我这个项目的后台比较菜，不知道签名是怎么回事。而我比他更菜，我懒得自己写md5加密，所以就用了老版本的SDK。老版本SDK自带了各种各样加密方法，网上教程也比较多，所以很容易集成。

> 当然，微信这么做也是有原因的，你把私钥放到了每一台手机上用来做签名……这样跟泄露了私钥有什么区别～

## 运行DEMO

`SDKSample`下的demo跑一遍，没有什么问题，没有支付宝那么坑～～

**lib**文件夹下`payRequsestHandler.h`文件中填上`APP_ID`、`APP_SECRET`、`MCH_ID`、`PARTNER_ID`的值，然后运行demo，试一下能否完成支付，如果可以就可以进行下一步接入工作了。

## 接入

将**SDKExport**下的`libWeChatSDK.a`、`WXApi.h`、`WXApiObject.h`三个文件拖入工程中，再把**lib**文件夹拖入工程中。。*可能会有报错，ApiXml.m中报错那两行注释掉就好*

支付代码：

```objectivec
//  WechatPayManager.h
#import <Foundation/Foundation.h>
#import "WXApiObject.h"
#import "WXApi.h"

// 账号帐户资料
// 更改商户把相关参数后可测试
#define APP_ID          @"XXX"        //APPID
#define APP_SECRET      @"XXX"                          //appsecret,看起来好像没用
//商户号，填写商户对应参数
#define MCH_ID          @"XXX"
//商户API密钥，填写相应参数
#define PARTNER_ID      @"XXX"
//支付结果回调页面
#define NOTIFY_URL      @"http://wxpay.weixin.qq.com/pub_v2/pay/notify.v2.php"
#define SP_URL          @"http://wxpay.weixin.qq.com/pub_v2/app/app_pay.php"


@interface WechatPayManager : NSObject
{
}


//预支付网关url地址
@property (nonatomic,strong) NSString* payUrl;

//debug信息
@property (nonatomic,strong) NSMutableString *debugInfo;
@property (nonatomic,assign) NSInteger lastErrCode;//返回的错误码

//商户关键信息
@property (nonatomic,strong) NSString *appId,*mchId,*spKey;


//初始化函数
-(id)initWithAppID:(NSString*)appID
             mchID:(NSString*)mchID
             spKey:(NSString*)key;

//获取当前的debug信息
-(NSString *) getDebugInfo;

//获取预支付订单信息（核心是一个prepayID）
- (NSMutableDictionary*)getPrepayWithOrderName:(NSString*)name
                                         price:(NSString*)price
                                        device:(NSString*)device;

@end
```

```objectivec
//  WechatPayManager.m

#import "WechatPayManager.h"
#import "WXUtil.h"
#import "ApiXml.h"

@implementation WechatPayManager
//初始化函数
-(id)initWithAppID:(NSString*)appID mchID:(NSString*)mchID spKey:(NSString*)key
{
    self = [super init];
    if(self)
    {
        //初始化私有参数，主要是一些和商户有关的参数
        self.payUrl    = @"https://api.mch.weixin.qq.com/pay/unifiedorder";
        if (self.debugInfo == nil){
            self.debugInfo  = [NSMutableString string];
        }
        [self.debugInfo setString:@""];
        self.appId = appID;//微信分配给商户的appID
        self.mchId = mchID;//
        self.spKey = key;//商户的密钥
    }
    return self;
}

//获取debug信息
-(NSString*) getDebugInfo
{
    NSString *res = [NSString stringWithString:self.debugInfo];
    [self.debugInfo setString:@""];
    return res;
}

//创建package签名
-(NSString*) createMd5Sign:(NSMutableDictionary*)dict
{
    NSMutableString *contentString  =[NSMutableString string];
    NSArray *keys = [dict allKeys];
    //按字母顺序排序
    NSArray *sortedArray = [keys sortedArrayUsingComparator:^NSComparisonResult(id obj1, id obj2) {
        return [obj1 compare:obj2 options:NSNumericSearch];
    }];
    //拼接字符串
    for (NSString *categoryId in sortedArray) {
        if (   ![[dict objectForKey:categoryId] isEqualToString:@""]
            && ![categoryId isEqualToString:@"sign"]
            && ![categoryId isEqualToString:@"key"]
            )
        {
            [contentString appendFormat:@"%@=%@&", categoryId, [dict objectForKey:categoryId]];
        }
        
    }
    //添加key字段
    [contentString appendFormat:@"key=%@", self.spKey];
    //得到MD5 sign签名
    NSString *md5Sign =[WXUtil md5:contentString];
    
    //输出Debug Info
    [self.debugInfo appendFormat:@"MD5签名字符串：\n%@\n\n",contentString];
    
    return md5Sign;
}

//获取package带参数的签名包
-(NSString *)genPackage:(NSMutableDictionary*)packageParams
{
    NSString *sign;
    NSMutableString *reqPars=[NSMutableString string];
    //生成签名
    sign        = [self createMd5Sign:packageParams];
    //生成xml的package
    NSArray *keys = [packageParams allKeys];
    [reqPars appendString:@"<xml>\n"];
    for (NSString *categoryId in keys) {
        [reqPars appendFormat:@"<%@>%@</%@>\n", categoryId, [packageParams objectForKey:categoryId],categoryId];
    }
    [reqPars appendFormat:@"<sign>%@</sign>\n</xml>", sign];
    
    return [NSString stringWithString:reqPars];
}

//提交预支付
-(NSString *)sendPrepay:(NSMutableDictionary *)prePayParams
{
    NSString *prepayid = nil;
    
    //获取提交支付
    NSString *send      = [self genPackage:prePayParams];
    
    //输出Debug Info
    [self.debugInfo appendFormat:@"API链接:%@\n", self.payUrl];
    [self.debugInfo appendFormat:@"发送的xml:%@\n", send];
    
    //发送请求post xml数据
    NSData *res = [WXUtil httpSend:self.payUrl method:@"POST" data:send];
    
    //输出Debug Info
    [self.debugInfo appendFormat:@"服务器返回：\n%@\n\n",[[NSString alloc] initWithData:res encoding:NSUTF8StringEncoding]];
    
    XMLHelper *xml  = [[XMLHelper alloc] init];
    
    //开始解析
    [xml startParse:res];
    
    NSMutableDictionary *resParams = [xml getDict];
    
    //判断返回
    NSString *return_code   = [resParams objectForKey:@"return_code"];
    NSString *result_code   = [resParams objectForKey:@"result_code"];
    if ( [return_code isEqualToString:@"SUCCESS"] )
    {
        //生成返回数据的签名
        NSString *sign      = [self createMd5Sign:resParams ];
        NSString *send_sign =[resParams objectForKey:@"sign"] ;
        
        //验证签名正确性
        if( [sign isEqualToString:send_sign]){
            if( [result_code isEqualToString:@"SUCCESS"]) {
                //验证业务处理状态
                prepayid    = [resParams objectForKey:@"prepay_id"];
                return_code = 0;
                
                [self.debugInfo appendFormat:@"获取预支付交易标示成功！\n"];
            }
        }else{
            self.lastErrCode = 1;
            [self.debugInfo appendFormat:@"gen_sign=%@\n   _sign=%@\n",sign,send_sign];
            [self.debugInfo appendFormat:@"服务器返回签名验证错误！！！\n"];
        }
    }else{
        self.lastErrCode = 2;
        [self.debugInfo appendFormat:@"接口返回错误！！！\n"];
    }
    
    return prepayid;
}

- (NSMutableDictionary*)getPrepayWithOrderName:(NSString*)name
                                         price:(NSString*)price
                                        device:(NSString*)device
{
    //订单标题，展示给用户
    NSString* orderName = name;
    //订单金额,单位（分）
    NSString* orderPrice = price;//以分为单位的整数
    //支付设备号或门店号
    NSString* orderDevice = device;
    //支付类型，固定为APP
    NSString* orderType = @"APP";
    //发器支付的机器ip,暂时没有发现其作用
    NSString* orderIP = @"196.168.1.1";
    
    //随机数串
    srand( (unsigned)time(0) );
    NSString *noncestr  = [NSString stringWithFormat:@"%d", rand()];
    NSString *orderNO   = [NSString stringWithFormat:@"%ld",time(0)];
    
    //================================
    //预付单参数订单设置
    //================================
    NSMutableDictionary *packageParams = [NSMutableDictionary dictionary];
    
    [packageParams setObject: self.appId  forKey:@"appid"];       //开放平台appid
    [packageParams setObject: self.mchId  forKey:@"mch_id"];      //商户号
    [packageParams setObject: orderDevice  forKey:@"device_info"]; //支付设备号或门店号
    [packageParams setObject: noncestr     forKey:@"nonce_str"];   //随机串
    [packageParams setObject: orderType    forKey:@"trade_type"];  //支付类型，固定为APP
    [packageParams setObject: orderName    forKey:@"body"];        //订单描述，展示给用户
    [packageParams setObject: NOTIFY_URL  forKey:@"notify_url"];  //支付结果异步通知
    [packageParams setObject: orderNO      forKey:@"out_trade_no"];//商户订单号
    [packageParams setObject: orderIP      forKey:@"spbill_create_ip"];//发器支付的机器ip
    [packageParams setObject: orderPrice   forKey:@"total_fee"];       //订单金额，单位为分
    
    //获取prepayId（预支付交易会话标识）
    NSString *prePayid;
    prePayid = [self sendPrepay:packageParams];
    
    if(prePayid == nil)
    {
        [self.debugInfo appendFormat:@"获取prepayid失败！\n"];
        return nil;
    }
    
    //获取到prepayid后进行第二次签名
    NSString    *package, *time_stamp, *nonce_str;
    //设置支付参数
    time_t now;
    time(&now);
    time_stamp  = [NSString stringWithFormat:@"%ld", now];
    nonce_str = [WXUtil md5:time_stamp];
    //重新按提交格式组包，微信客户端暂只支持package=Sign=WXPay格式，须考虑升级后支持携带package具体参数的情况
    //package       = [NSString stringWithFormat:@"Sign=%@",package];
    package         = @"Sign=WXPay";
    //第二次签名参数列表
    NSMutableDictionary *signParams = [NSMutableDictionary dictionary];
    [signParams setObject: self.appId  forKey:@"appid"];
    [signParams setObject: self.mchId  forKey:@"partnerid"];
    [signParams setObject: nonce_str    forKey:@"noncestr"];
    [signParams setObject: package      forKey:@"package"];
    [signParams setObject: time_stamp   forKey:@"timestamp"];
    [signParams setObject: prePayid     forKey:@"prepayid"];
    
    //生成签名
    NSString *sign  = [self createMd5Sign:signParams];
    
    //添加签名
    [signParams setObject: sign         forKey:@"sign"];
    
    [self.debugInfo appendFormat:@"第二步签名成功，sign＝%@\n",sign];
    
    //返回参数列表
    return signParams;
}
@end

```

**支付函数**
调用这个函数即可完成支付～

```objectivec
- (void)wxPayWithOrderName:(NSString*)name price:(NSString*)price
{
    //创建支付签名对象 && 初始化支付签名对象
    WechatPayManager* wxpayManager = [[WechatPayManager alloc]initWithAppID:APP_ID mchID:MCH_ID spKey:PARTNER_ID];
    
    //获取到实际调起微信支付的参数后，在app端调起支付
    //生成预支付订单，实际上就是把关键参数进行第一次加密。
    NSString* device = @"aaaaaa";//[[ defaultManager]userId];
    NSMutableDictionary *dict = [wxpayManager getPrepayWithOrderName:name
                                                               price:price
                                                              device:device];
    
    if(dict == nil){
        //错误提示
        NSString *debug = [wxpayManager getDebugInfo];
        NSLog(@"%@",debug);
        return;
    }
    
    NSMutableString *stamp  = [dict objectForKey:@"timestamp"];
    
    //调起微信支付
    PayReq* req             = [[PayReq alloc] init];
    req.openID              = [dict objectForKey:@"appid"];
    req.partnerId          = [dict objectForKey:@"partnerid"];
    req.prepayId            = [dict objectForKey:@"prepayid"];
    req.nonceStr            = [dict objectForKey:@"noncestr"];
    req.timeStamp          = stamp.intValue;
    req.package            = [dict objectForKey:@"package"];
    req.sign                = [dict objectForKey:@"sign"];
    
    BOOL flag = [WXApi sendReq:req];
   
    if (!flag) {
        NSLog(@"ERROR!");
    }
}
```



## 可能遇到的问题

**"OBJC_CLASS$_CTTelephonyNetworkInfo" 报错**

**"Undefined symbols for architecture armv7:"报错**

在`General`->`Linked Frameworks and Libraries`中加入以下Libraries:

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-3-20/48722356.jpg)

> 写的比较仓促，如果发现什么问题请留言，我一定会回复的～