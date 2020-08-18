<template>
    <div id="app">
        <vue-cary-gallery :list="list" :init-index="9" autoplay is-back pagination />
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
	  return {
            list: [
                {
                    src: require('./assets/1.jpg')
                },
                {
                    src: require('./assets/2.jpg')
                },
                {
                    src: require('./assets/3.jpg')
                },
                {
                    src: require('./assets/4.jpg')
                },
                {
                    src: require('./assets/5.jpg'),
                    title: '5',
                    desc: `123456`
                },
                {
                    src: require('./assets/6.jpg'),
                    title: '6',
                    desc: `123456`
                },
                {
                    src: require('./assets/1.jpg'),
                    title: '7',
                    desc: `123456`
                },
                {
                    src: require('./assets/2.jpg'),
                    title: '8',
                    desc: `123456`
                },
                {
                    src: require('./assets/3.jpg'),
                    title: '9',
                    desc: `123456`
                },
                {
                    src: require('./assets/4.jpg'),
                    title: '10',
                    desc: `123456`
                },
                {
                    src: require('./assets/5.jpg'),
                    title: '11',
                    desc: `123456`
                },
                {
                    src: require('./assets/6.jpg'),
                    title: '12',
                    desc: `123456`
                }
            ]
	  }
    }
}
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
</style>
