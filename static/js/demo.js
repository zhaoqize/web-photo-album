(function() {
    var CONST = {
            total: 17, //图片张数
            zWin: $(window),
            zWin_width: $(window).width(),
            zWin_height: $(window).height(),
            wImage: $('#large_img'), //大图对象list
            domImage: $('#large_img')[0], //大图dom
            winWidth: $(window).width(),
            padding: 2, //图片padding-top
            scrollBarWidth: 0,
            container: $('#container'),
            large_container: $('#large_container'),
        },
        ALBUM = {
            //计算图片宽度
            picWidth: function() {
                return Math.floor((CONST.winWidth - CONST.padding * 3 - CONST.scrollBarWidth) / 4);
            },
            //绘制canvas的img
            cvsImg: function(index, imgSrc) {
                var image = new Image();
                image.index = index;

                image.onload = function() {
                    var cvs = $('#cvs_' + index)[0].getContext('2d');
                    cvs.width = this.width;
                    cvs.height = this.height;
                    cvs.drawImage(this, 0, 0);
                }
                image.onerror = function() {
                    console.log('加载失败')
                }
                image.src = imgSrc;
            },
            //动态绘制页面
            render: function() {
                var tmpl = '',
                    picWidth = this.picWidth(),
                    i,
                    p;

                for (i = 1; i <= CONST.total; i++) {
                    p = CONST.padding,
                        imgSrc = 'img/' + i + '.jpg';

                    //控制每行第一张与最后一张图片没有间距
                    if (i % 4 == 1) {
                        p = 0;
                    }
                    tmpl += '<li data-id="' + i + '" class="animated bounceIn" style="width:' + picWidth + 'px;height:' + picWidth + 'px;padding-left:' + p + 'px;padding-top:' + CONST.padding + 'px;">' + '<canvas id="cvs_' + i + '"></canvas>' + '</li>';

                    this.cvsImg(i, imgSrc);
                }
                CONST.container.html(tmpl);
            },
            uiChange: function() {
                CONST.container.css({
                    height: CONST.zWin_height,
                    overflow: 'hidden'
                })

                CONST.large_container.css({
                    width: CONST.zWin_width,
                    height: CONST.zWin_height
                }).show();
            },
            loadImg: function(id, callback) {
                var _this = this,
                    w,
                    h,
                    winWidth,
                    winHeight,
                    realw,
                    realh,
                    imgsrc = 'img/' + id + '.large.jpg',
                    ImageObj = new Image();

                //UI改变
                _this.uiChange();

                ImageObj.src = imgsrc;
                ImageObj.onload = function() {
                    //获取图片宽高
                    w = this.width;
                    h = this.height;

                    //获取屏幕宽高
                    winWidth = CONST.zWin_width;
                    winHeight = CONST.zWin_height;

                    //设置图片的偏移
                    realw = parseInt((winWidth - winHeight * w / h) / 2);
                    realh = parseInt((winHeight - winWidth * h / w) / 2);

                    CONST.wImage.css('width', 'auto')
                        		.css('height', 'auto');
                    CONST.wImage.css('padding-left', '0px')
                        		.css('padding-top', '0px');

                    //判断图片是竖图还是横图
                    //竖图：以高为标准，改变图片尺寸
                    //横图：以宽为标准，改变图片尺寸
                    if (h / w > 1.2) {
                        CONST.wImage.attr('src', imgsrc)
                            		.css('height', winHeight)
                            		.css('padding-left', realw + 'px');;
                    } else {
                        CONST.wImage.attr('src', imgsrc)
                            		.css('width', winWidth)
                            		.css('padding-top', realh + 'px');
                    }

                    callback && callback();
                }
            },
            signOpera: function() {
                var cid,
                    _this = this;

                //给每个图片添加点击事件,用以显示大图
                $('#container').delegate('li', 'tap', function() {
                    var _id = cid = $(this).attr('data-id');
                    _this.loadImg(_id);
                });

                //给屏幕添加点击返回小图事件
                //添加左滑动与右滑动事件
                $('#large_container').tap(function() {
                    $(this).hide();
                }).swipeLeft(function() {
                    cid++;
                    if (cid > CONST.total) {
                        cid = CONST.total;
                    } else {
                        _this.loadImg(cid, function() {
                            _this.domImage.addEventListener('webkitAnimationEnd', function() {
                                _this.wImage.removeClass('animated bounceInRight');
                                _this.domImage.removeEventListener('webkitAnimationEnd')
                            })

                            _this.wImage.addClass('animated bounceInRight')
                        });

                    }
                }).swipeRight(function() {
                    cid--;
                    if (cid < 1) {
                        cid = 1;
                    } else {
                        _this.loadImg(cid, function() {
                            _this.domImage.addEventListener('webkitAnimationEnd', function() {
                                _this.wImage.removeClass('animated bounceInLeft');
                                _this.domImage.removeEventListener('webkitAnimationEnd')
                            })

                            _this.wImage.addClass('animated bounceInLeft')
                        });
                    }
                })
            },
            init: function() {
                this.render();
                this.signOpera();
            }
        }

    ALBUM.init();
})()
