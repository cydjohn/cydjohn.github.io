---
title: "pdfMiner UnicodeEncodeError"
date: 2016-05-22 15:46:39
tags: ["python", "pdfMiner"]
slug: "pdfMiner-UnicodeEncodeError"
---
# pdfMiner UnicodeEncodeError

用pdfMiner读取中文pdf内容的时候，会遇到这个错误

**UnicodeEncodeError: 'ascii' codec can't encode character u'\xe9' in position 0: ordinal not in range(128)**

解决这个问题需要修改一点官方源码使得它可以读取中文字符。



下面是我读取PDF文件的函数，使用时将PDF文件路径传进去即可，函数会返回PDF中所有的内容。

```python
def convert_pdf_to_txt(path):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO() 
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=None)
    fp = file(path, 'rb')
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos=set()

    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
        interpreter.process_page(page)

    text = retstr.getvalue()
    print text

    fp.close()
    device.close()
    retstr.close()
    return text
```

**需要修改源码`convert.py`文件167行，将**

```python
self.outfp.write(u"é")
```
**改为**

```python
self.outfp.write(u"é".encode('utf-8'))
```
-----

否则会有以下报错信息报错：

```python
Traceback (most recent call last):
  File "/Users/Administer/Desktop/pdfReader.py", line 33, in <module>
    convert_pdf_to_txt('document1.pdf')
  File "/Users/Administer/Desktop/pdfReader.py", line 13, in convert_pdf_to_txt
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=None)
  File "/Library/Python/2.7/site-packages/pdfminer/converter.py", line 180, in __init__
    PDFConverter.__init__(self, rsrcmgr, outfp, codec=codec, pageno=pageno, laparams=laparams)
  File "/Library/Python/2.7/site-packages/pdfminer/converter.py", line 167, in __init__
    self.outfp.write(u"é")
UnicodeEncodeError: 'ascii' codec can't encode character u'\xe9' in position 0: ordinal not in range(128)
[Finished in 0.2s with exit code 1]Administer
[shell_cmd: python -u "/Users/Administer/Desktop/pdfReader.py"]
[dir: /Users/Administer/Desktop]
[path: /usr/bin:/bin:/usr/sbin:/sbin]
```


