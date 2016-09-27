# web-photo-album
web相册

### | 使用的技术
[zepto.js](http://css88.com/doc/zeptojs_api/) 类jquery库，进行dom操作

[animate.css](https://daneden.github.io/animate.css/) css3库

### | 使用的事件
- 点击
- 左滑
- 右滑

> -  “touch”模块添加以下事件，可以使用 on 和 off。 tap —元素tap的时候触发。 singleTap and
> - doubleTap — 这一对事件可以用来检测元素上的单击和双击。(如果你不需要检测单击、双击，使用 tap 代替)。 
> - longTap — 当一个元素被按住超过750ms触发。 swipe, swipeLeft, swipeRight, swipeUp, swipeDown —
> - 当元素被划过时触发。(可选择给定的方向) 这些事件也是所有Zepto对象集合上的快捷方法。

```
<style>.delete { display: none; }</style>

<ul id=items>
  <li>List item 1 <span class=delete>DELETE</span></li>
  <li>List item 2 <span class=delete>DELETE</span></li>
</ul>

<script>
// show delete buttons on swipe
$('#items li').swipe(function(){
  $('.delete').hide()
  $('.delete', this).show()
})

// delete row on tapping delete button
$('.delete').tap(function(){
  $(this).parent('li').remove()
})
</script>
```

### | css的动画事件
animationend 事件在 CSS 动画完成后触发。
CSS 动画播放时，会发生以下三个事件：
- animationstart - CSS 动画开始后触发
- animationiteration - CSS 动画重复播放时触发
- animationend - CSS 动画完成后触发

```
// Chrome, Safari 和 Opera 代码
x.addEventListener("webkitAnimationEnd", myStartFunction);
```

### 效果
![image](http://images.cnblogs.com/cnblogs_com/zqzjs/885846/o_blog_2016-09-27_225327.png)

![image](http://images.cnblogs.com/cnblogs_com/zqzjs/885846/o_blog_2016-09-27_225345.png)
