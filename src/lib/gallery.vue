<template>
    <div ref="wrap" class="wrap" :style="{height: height + 'px'}">
        <div
            v-for="(item, index) in list"
            :key="index"
            ref="photo"
            class="photo photo_front"
            :style="{ height: imgHeight + 'px', width: imgWidth + 'px', marginTop: -imgHeight/2 + 'px',marginLeft: -imgWidth/2 + 'px' }"
            :class="{ photo_center: active === index}"
            @click="turn(index)"
        >
            <div class="photo_wrap" :style="wrapStyle(index)">
                <div class="side side_front">
                    <div class="image">
                        <img :src="item.src" :alt="item.title">
                    </div>
                    <div v-if="item.title" class="capation">{{ item.title }}</div>
                </div>
                <div v-if="isBack" class="side side_back">
                    <div class="desc">
                        {{ item.desc }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="pagination" id="nav" class="nav">
            <span v-for="(j, i) in list" :key="i" class="i" :class="{ i_current: active === i, i_back: isBack && active === i && back }" @click="turn(i)" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueCaryGallery',
    props: {
        list: {
            type: Array,
            required: true,
            default: () => []
        },
        height: { // 容器高度
            type: Number,
            default: 300
        },
        autoplay: { // 自动轮播
            type: Boolean,
            default: false
        },
        delay: { // 自动轮播间隔
            type: Number,
            default: 3000
        },
        pagination: { // 分页器
            type: Boolean,
            default: false
        },
        imgWidth: { // 图片宽
            type: Number,
            default: 120
        },
        imgHeight: { // 图片高
            type: Number,
            default: 160
        },
        initIndex: { // 初始索引
            type: Number,
            default: 0
        },
        isBack: { // 是否开启背面描述
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: 0, // 当前居中
            back: false // 正反面
        }
    },
    computed: {
        range() {
            var range = {
                left: {
                    x: [],
                    y: []
                },
                right: {
                    x: [],
                    y: []
                }
            }
            let $wrap = this.$refs.wrap
            let $photo = this.$refs.photo
            var wrap = {
                w: $wrap.clientWidth,
                h: $wrap.clientHeight
            }
            var photo = {
                w: $photo[0].clientWidth,
                h: $photo[0].clientHeight
            }
            range.wrap = wrap // 向json里面添加json元素.
            range.photo = photo

            // 定义left的xy值范围 , 和right的xy范围值.
            range.left.x = [0 - photo.w / 2, wrap.w / 2 - photo.w / 2] // 定义json数组中的元素 , 用.方法.
            range.left.y = [0 - photo.h / 2, wrap.h - photo.w / 2]

            range.right.x = [
                wrap.w / 2 - photo.w / 2,
                wrap.w - photo.w / 2
            ] // 定义json数组中的元素 , 用.方法.
            range.right.y = [0 - photo.h / 2, wrap.h - photo.w / 2]
            console.log(range)
            return range
        }
    },
    created() {
        const that = this
        this.$nextTick(() => {
            this.sort(this.initIndex)
            if (this.autoplay) {
                let i = this.initIndex
                setInterval(() => {
                    i++
                    if (i >= that.list.length) i = 0
                    that.sort(i)
                }, this.delay || 3000)
            }
        })
    },
    methods: {
        random(range) {
            var min = Math.min(range[0], range[1])
            var max = Math.max(range[0], range[1])
            var diff = max - min + 1 // [3,5]
            var n = Math.floor(diff * Math.random()) + min
            return n
        },
        sort(n) {
            var _photo = this.$refs.photo
            if (!_photo) return
            var photos = []
            for (var i = 0; i < _photo.length; i++) {
                _photo[i].style.left = ""
                _photo[i].style.top = ""
                _photo[i].style["-webkit-transform"] =
						"rotate(360deg) scale(1.3)"

                photos.push(_photo[i])
            }
            this.active = n
            this.back = false

            // 定义变量存储数据值
            var ranges = this.range
            var photos_left = photos.splice(
                0,
                Math.ceil(photos.length / 2)
            )
            var photos_right = photos
            // 通过随机的left和top值 , 随意排列图片:
            for (var j = 0; j < photos_left.length; j++) {
                photos_left[j].style.left = this.random(ranges.left.x) + "px"
                photos_left[j].style.top = this.random(ranges.left.y) + "px"
                photos_left[j].style["-webkit-transform"] =
						"rotate(" + this.random([-100, 100]) + "deg) scale(1)"
            }

            for (var s = 0; s < photos_right.length; s++) {
                photos_right[s].style.left = this.random(ranges.right.x) + "px"
                photos_right[s].style.top = this.random(ranges.right.y) + "px"
                photos_right[s].style["-webkit-transform"] =
						"rotate(" + this.random([-100, 100]) + "deg) scale(1)"
            }
        },
        turn(n) {
            if (this.active !== n) {
                this.sort(n)
                return
            }
            this.back = !this.back
        },
        wrapStyle(index) {
            if (this.isBack && this.active === index && this.back) {
                return {
                    transform: 'translate(' + this.imgWidth + 'px, 0) rotateY(-180deg)'
                }
            } else {
                return {
                    transform: 'rotateY(0deg)'
                }
            }
        }
    }
}
</script>

<style scoped>
body {
    font-family: "Avenir Next", "Lantinghei SC";
    -webkit-font-smoothing: antialiased;
}

.wrap {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.photo {
    position: absolute;
    left: 50%;
    top: 50%;
    perspective: 800px;
    transition: all 0.3s, left 1s 0.3s, top 1s 0.3s;
}
.photo .photo_wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    transform-style: preserve-3d;
    transform-origin: 0% 50%;
    transition: all 0.6s;
}
.photo .photo_wrap .side {
    width: 100%;
    height: 100%;
    background: #eee;
    position: absolute;
    left: 0;
    top: 0;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
.photo .photo_wrap .side_front .image {
    width: 100%;
    flex: 1;
    overflow: hidden;
}
.photo .photo_wrap .side_front .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.photo .photo_wrap .side_front .capation {
    width: 100%;
    align-items: center;
    height: 10%;
    display: flex;
    justify-content: center;
    font-size: 14px;
}
.photo .photo_wrap .side_back {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(-180deg);
    font-size: 14px;
}
.photo_front .photo_wrap {
    transform: rotateY(0deg);
}
.photo_back .photo_wrap {
    transform: translate(160px, 0) rotateY(-180deg);
}

.photo_center {
    z-index: 999;
    left: 50%!important;
    top: 50%!important;
    transform: none!important;
    margin: -160px 0 0 -130px;
}
/*导航条*/
.nav {
    width: 80%;
    height: 30px;
    position: absolute;
    left: 10%;
    bottom: 30px;
    text-align: center;
    z-index: 1000;
}
.nav .i {
    width: 30px;
    height: 30px;
    display: inline-block;
    border-radius: 50%;
    background-color: #00807a;
    transform: rotateY(180deg) scale(0.48);
    cursor: pointer;
    transition: all 1s;
}
.nav .i_current {
    transform: rotateY(0deg) scale(1);
}
.nav .i_back {
    background: yellow;
    transform: rotateY(180deg) scale(1);
}
</style>
