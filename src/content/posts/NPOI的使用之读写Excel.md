---
title: "NPOI的使用之读写Excel"
date: 2016-04-12 19:38:37
tags: ["C#"]
slug: "NPOI的使用之读写Excel"
---
NPOI 是 POI 项目的 .NET 版本。POI是一个开源的Java读写Excel、WORD等微软OLE2组件文档的项目。

使用 NPOI 你就可以在没有安装 Office 或者相应环境的机器上对 WORD/EXCEL 文档进行读写。NPOI是构建在POI 3.x版本之上的，它可以在没有安装Office的情况下对Word/Excel文档进行读写操作。



## 下载 

首先到<http://npoi.codeplex.com/>官网上下载NPOI的`dll`，有`2`和`4`两个不同版本的`dll`，分别对应不同的.NET版本，我在自己的项目中使用了`4`版本的.NET。

## 添加引用

右键项目 ->`添加`->`引用`,如图

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-10/70924586.jpg)

然后点击`浏览`，把刚才下载好的`dll`选中添加到项目中***（建议把`dll`文件夹直接放倒项目根目录下）***

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-10/28167142.jpg)

## 操作Excel


```csharp
using NPOI;

NPOI.HSSF.UserModel.HSSFWorkbook book = new NPOI.HSSF.UserModel.HSSFWorkbook();
NPOI.SS.UserModel.ISheet sheet = book.CreateSheet("export");

NPOI.SS.UserModel.IRow row = sheet.CreateRow(0);
```


### 合并单元格

参数分别是：起始行，结束行，起始列，结束列

```csharp
sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 0, 1, 12));
```

### 单元格水平对齐

```csharp
row.CreateCell(i).CellStyle.Alignment = NPOI.SS.UserModel.HorizontalAlignment.Center;
```

### 单元格垂直对齐

```csharp
row.CreateCell(i).CellStyle.VerticalAlignment = NPOI.SS.UserModel.VerticalAlignment.Center;
```

### 单元格自动换行（很不稳定会导致单元格内容突然没有了）

```csharp
row.CreateCell(i).CellStyle.WrapText = true;
```

-------

### 示例

导出一个DataGridView的Excel

```csharp
/// <summary>
/// 导出excel
/// </summary>
/// <param name="dt"></param>
/// <param name="filePath"></param>
private void WriteExcel(string filePath) {
    if (!string.IsNullOrEmpty(filePath)) {
        NPOI.HSSF.UserModel.HSSFWorkbook book = new NPOI.HSSF.UserModel.HSSFWorkbook();
        NPOI.SS.UserModel.ISheet sheet = book.CreateSheet("export");

        NPOI.SS.UserModel.IRow row = sheet.CreateRow(0);
        
        int[] columnWidth = { 8, 8, 8, 8, 30, 30, 8, 8, 8, 8 };
        for (int i = 0; i < columnWidth.Length; i++) {
            row.CreateCell(i).CellStyle.Alignment = NPOI.SS.UserModel.HorizontalAlignment.Center;

            //乘以256是因为Excel中列宽是以256为单位的，详情可以看函数的注释
            sheet.SetColumnWidth(i, columnWidth[i] * 256);

            //乘以256是因为Excel中行高是以20为单位的，详情可以看函数的注释
            row.Height = 15 * 20;
        }

        sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 0, 0, 10));


        row.GetCell(0).SetCellValue("合并的单元格");


        NPOI.SS.UserModel.IRow row2 = sheet.CreateRow(1);
        row2.Height = 28 * 20;

        string[] columnName = { "编号", "标题", "标题", "标题", "长……长……的……标……题……", "长……长……的……标……题……", "标题", "标题", "标题", "标题" };

        for (int i = 0; i < columnName.Length; i++) {
            row2.CreateCell(i).CellStyle.VerticalAlignment = NPOI.SS.UserModel.VerticalAlignment.Center;
            row2.CreateCell(i).SetCellValue(columnName[i]);
        }

        //具体信息
        for (int i = 0; i < 10; i++) {
            NPOI.SS.UserModel.IRow rowDetail = sheet.CreateRow(i + 2);
            rowDetail.Height = 70 * 20;
            rowDetail.CreateCell(i).CellStyle.WrapText = true;

            rowDetail.CreateCell(0).SetCellValue((i + 1).ToString());
            rowDetail.CreateCell(1).SetCellValue("内容");
            rowDetail.CreateCell(2).SetCellValue("内容");
            rowDetail.CreateCell(3).SetCellValue("内容");
            rowDetail.CreateCell(4).SetCellValue("好……多……好……多……好……多……的……内……容……好……多……好……多……好……多……的……内……容……好……多……好……多……好……多……的……内……容……");
            rowDetail.CreateCell(5).SetCellValue("好……多……好……多……好……多……的……内……容……好……多……好……多……好……多……的……内……容……好……多……好……多……好……多……的……内……容……");
            rowDetail.CreateCell(6).SetCellValue("内容");
            rowDetail.CreateCell(7).SetCellValue("内容");
            rowDetail.CreateCell(8).SetCellValue("内容");
            rowDetail.CreateCell(9).SetCellValue("内容");
        }


        // 写入到客户端  
        using(System.IO.MemoryStream ms = new System.IO.MemoryStream()) {
            book.Write(ms);
            using(FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.Write)) {
                byte[] data = ms.ToArray();
                fs.Write(data, 0, data.Length);
                fs.Flush();
            }
            book = null;
        }
    }
}
```

```csharp
SaveFileDialog sfd = new SaveFileDialog();
sfd.Filter = "Excel Documents (*.xls)|*.xls";
sfd.FileName = "export.xls";
if (sfd.ShowDialog() == DialogResult.OK)
{
    this.WriteExcel(sfd.FileName);
}
```

效果图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-12/79687687.jpg)

## 读取Excel

NPOI 使用 `HSSFWorkbook` 类来处理 `xls`，`XSSFWorkbook` 类来处理 `xlsx`，它们都继承接口 `IWorkbook`，因此可以通过 `IWorkbook` 来统一处理 `xls` 和 `xlsx` 格式的文件。

```csharp
public void ReadFromExcelFile(string filePath)
{
    IWorkbook wk = null;
    string extension = System.IO.Path.GetExtension(filePath);
    try
    {
        FileStream fs = File.OpenRead(filePath);
        if (extension.Equals(".xls"))
        {
            //把xls文件中的数据写入wk中
            wk = new HSSFWorkbook(fs);
        }
        else
        {
            //把xlsx文件中的数据写入wk中
            wk = new XSSFWorkbook(fs);
        }

        fs.Close();
        //读取当前表数据
        ISheet sheet = wk.GetSheetAt(0);

        IRow row = sheet.GetRow(0);  //读取当前行数据
        //LastRowNum 是当前表的总行数-1（注意）
        int offset = 0;
        for (int i = 0; i <= sheet.LastRowNum; i++)
        {
            row = sheet.GetRow(i);  //读取当前行数据
            if (row != null)
            {
                //LastCellNum 是当前行的总列数
                for (int j = 0; j < row.LastCellNum; j++)
                {
                    //读取该行的第j列数据
                    string value = row.GetCell(j).ToString();
                    Console.Write(value.ToString() + " ");
                }
                Console.WriteLine("\n");
            }
        }
    }
    
    catch (Exception e)
    {
        //只在Debug模式下才输出
        Console.WriteLine(e.Message);
    }
}
```

输出如图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-12/18579406.jpg)