# node-red-contrib-writeexif

Wrapper for [exiftool-vendored](https://github.com/photostructure/exiftool-vendored.js) focused on write image exif
Writable Exif are listed [on this page](https://exiftool.org/TagNames/index.html)

## node's Properties

There are 3 properties : 

* Image : path to image (i.e. c:\Users\toto\images\mypic.jpg for windows)
* Exif object : JSON like that
```
{
  "XPComment":"TagMe",
  "XPAuthor":"Toto"
}
```
* Delete orginal True/False : exiftool make a backup of original image, delete it automatically ?
