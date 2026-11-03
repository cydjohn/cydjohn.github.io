---
title: "dataGridView导出excel"
date: 2015-09-29 21:43:31
tags: ["C#"]
slug: "dataGridView导出excel"
---
## 非正常方法，简单暴力

使用这个函数即可（当然严格意义上来说导出的根本不是excel，只是用excel打开没问题……）



```csharp
//C#
   		 /// <summary>
        /// 导出excel
        /// </summary>
        /// <param name="dGV"></param>
        /// <param name="filename"></param>
        private void ToCsV(DataGridView dGV, string filename)
        {
            string stOutput = "";
            // Export titles:
            string sHeaders = "";

            for (int j = 0; j < dGV.Columns.Count; j++)
                sHeaders = sHeaders.ToString() + Convert.ToString(dGV.Columns[j].HeaderText) + "\t";
            stOutput += sHeaders + "\r\n";
            // Export data.
            for (int i = 0; i < dGV.RowCount - 1; i++)
            {
                string stLine = "";
                for (int j = 0; j < dGV.Rows[i].Cells.Count; j++)
                    stLine = stLine.ToString() + Convert.ToString(dGV.Rows[i].Cells[j].Value) + "\t";
                stOutput += stLine + "\r\n";
            }
            Encoding utf16 = Encoding.GetEncoding("gb2312");
            byte[] output = utf16.GetBytes(stOutput);
            FileStream fs = new FileStream(filename, FileMode.Create);
            BinaryWriter bw = new BinaryWriter(fs);
            bw.Write(output, 0, output.Length); //write the encoded file
            bw.Flush();
            bw.Close();
            fs.Close();
        } 
```

然后在要保存的地方调用下面这堆东西就可以了

```csharp
//C#
 //导出excel
SaveFileDialog sfd = new SaveFileDialog();
sfd.Filter = "Excel Documents (*.xls)|*.xls";
sfd.FileName = "export.xls";
if (sfd.ShowDialog() == DialogResult.OK)
{
//ToCsV(dataGridView1, @"c:\export.xls");
ToCsV(this.parameter_grid, sfd.FileName); // Here dataGridview1 is your grid view name
}
```

## 正常方法


### 微软原生Excel库
*一个是使用office原生接口，但是这种方法要求太高。如果用户的电脑上没有安装对于版本的office Excel或者用户装了盗版的office都不能使用。。所以这种方法并没有什么卵用。。。*

**但是！！**现在有了一种新的方法，不管用户的电脑上有没有装excel，装了哪个版本的excel，都可以完美的导出excel表格，这个方法就是使用一款神奇的第三方库---***NPOI***

### NPOI

[NPOI具体使用方法点这里]()这里就不详细说了，简单说下怎么用。

#### 下载 

首先到<http://npoi.codeplex.com/>官网上下载NPOI的`dll`，有`2`和`4`两个不同版本的`dll`，分别对应不同的.NET版本，我在自己的项目中使用了`4`版本的.NET。

#### 添加引用

右键项目 ->`添加`->`引用`,如图

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-10/70924586.jpg)

然后点击`浏览`，把刚才下载好的`dll`选中添加到项目中***（建议把`dll`文件夹直接放倒项目根目录下）***

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-10/28167142.jpg)

#### 简单使用

```csharp
 /// <summary>
        /// 导出excel
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="filePath"></param>
        private void WriteExcel(DataGridView dt, string filePath)
        {
            if (!string.IsNullOrEmpty(filePath) && null != dt && dt.Rows.Count > 0)
            {
                NPOI.HSSF.UserModel.HSSFWorkbook book = new NPOI.HSSF.UserModel.HSSFWorkbook();
                NPOI.SS.UserModel.ISheet sheet = book.CreateSheet("export");

                NPOI.SS.UserModel.IRow row = sheet.CreateRow(0);

                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    row.CreateCell(i).SetCellValue(dt.Columns[i].HeaderText);
                }
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    NPOI.SS.UserModel.IRow row2 = sheet.CreateRow(i + 1);
                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        row2.CreateCell(j).SetCellValue(Convert.ToString(dt.Rows[i].Cells[j].Value));
                    }
                }
                // 写入到客户端  
                using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
                {
                    book.Write(ms);
                    using (FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.Write))
                    {
                        byte[] data = ms.ToArray();
                        fs.Write(data, 0, data.Length);
                        fs.Flush();
                    }
                    book = null;
                }
            }
        }

```

通过调用`saveFileDialog`就可以导出excel了，完美解决～

```csharp
//导出excel
        private void button_excel_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Filter = "Excel Documents (*.xls)|*.xls";
            sfd.FileName = "export.xls";
            if (sfd.ShowDialog() == DialogResult.OK)
            {
                this.WriteExcel(this.site_grid, sfd.FileName);
            }
        } 

```








