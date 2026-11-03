---
title: "如何区分UITableView里的UITextField（UIButton）"
date: 2015-08-13 11:46:38
tags: ["IOS"]
slug: "如何区分UITableView里的UITextField和UIButton"
---
如果tableView里面添加了TextField，如何知道每一个TextField的值呢？

如果是静态的tableView就可以用`control－drag`大法（从View相应控件按住control键拖到controller上）。

但是如果是动态的呢？



不能用control－drag，因为cell都是重用的的，这样没发知道是哪一个TextField，就算你这么做了系统也会报错。

这时可以用这个方法：***把每个textField的tag赋值，通过不同的Tag区分不同的textField***

## 示例代码

首先肯定是要自定义一个custom cell,我是这样定义的：新建一个TableViewCell类继承UITableViewCell，然后在里面定义了label和textField

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-13/94552121.jpg)

然后就新建一个UITableView，`(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath`这个方法里面这样定义：

~~~objectivec
//OC

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    TableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
    cell.label.text = [NSString stringWithFormat: @"%ld ", (long)indexPath.row ];
    /**
     *  每个textField的tag对应每行的序号
     */
    cell.textFiedl.tag = indexPath.row;
    cell.textFiedl.delegate = self;
    cell.textFiedl.text = self.array[indexPath.row];
    return cell;
}
~~~

这样就相当于给每个textField分了不同的tag值。

然后，通过`(void)textFieldDidEndEditing:(UITextField *)textField`方法获得每次输入完之后对应textField的值：

~~~objectivec
//OC
-(void)textFieldDidEndEditing:(UITextField *)textField{
    self.array[textField.tag] =  textField.text;
    NSLog(@"%@",self.array);
}
~~~

[代码下载（OC  Xcode6.4）](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-13/48999955-TextField in tableView.zip)

------

当然有人会问了，如果cell里面放了button怎么办？button没有对应的带代理法呀？

很简单，其实也是通过tag值区分，只是在`(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath`方法里面加多一行代码，比如我定义了一个`saveButton`:

~~~objectivec
//OC

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    TableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"cell" forIndexPath:indexPath];
    /**
     *  每个textField的tag对应每行的序号
     */
    cell.saveButton.tag = indexPath.row;
    
    [cell.saveButton addTarget:self action:@selector(saveAction) forControlEvents:UIControlEventTouchUpInside];
    return cell;
}
~~~


这样每次点击了`saveButton`都会运行一遍`saveAction`

我们在`saveAction`里面区分tag值就可以知道点击了哪个button。

~~~objectivec
//OC
-(void)saveAction:(UIButton*)sender
{
     if (sender.tag == 0) 
     {
         //   ………
     }
}
~~~

>当然使用前也要自定义一个custom cell
