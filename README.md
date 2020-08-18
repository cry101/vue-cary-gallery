# Vue-Cary-Gallery
![Vue 2.x](https://img.shields.io/badge/vue-2.x-green.svg "Vue 2 Compatible")



![A gallery plugin for vue2.]('https://raw.githubusercontent.com/cry101/vue-cary-gallery/master/view.gif')

**Note:**
Issue/PR is welcomed, I'll response as soon as possible.

## Usage

#### install
`npm install vue-cary-gallery --save`

#### Quickstart
```javascript
// global
import VueCaryGallery from 'vue-cary-gallery'
require('vue-cary-gallery/dist/gallery.css')

Vue.use(VueCaryGallery)

// in your code
<vue-cary-gallery :list="list" /> // list must required


```

##### Options

Parameter | Type | Default | Required | Description
--------- | ---- | ---- | ---- |-----------
list | `array` | `[]` | true | The images list
height | `number`| `300` | false | The container height
imgWidth | `number` | `120` | false | The image width
imgHeight | `number` | `160` | false | The image height
autoplay | `boolean` | `false` | false | Whether to auto play
delay | `number` | `3000` | false | The autoplay delay
pagination | `boolean` | `false` | false | Is pagination
initIndex | `number` | `0` | false | The init index image
isBack | `boolean` | `false` | false | Is back description


##### example
```javascript
<template>
    <vue-cary-gallery :list="list" />
</template>

<script>
    import VueCaryGallery from 'vue-cary-gallery'
    require('vue-cary-gallery/dist/gallery.css')

    export default{
        components: {
            VueCaryGallery
        },
        data() {
            return {
                list: [
                    { 
                        src: 'http://xxx.com/1.png',
                        title: '1', // 
                        desc: 'The page 1'
                    },
                    { 
                        src: 'http://xxx.com/2.png',
                        title: '2,
                        desc: 'The page 2'
                    },
                    { 
                        src: 'http://xxx.com/3.png',
                    }
                ]
            }
        })
    }
</script>
```

##### TODO
*  more style? more animation

## License
MIT
