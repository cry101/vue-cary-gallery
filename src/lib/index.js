import Gallery from './gallery.vue'

Gallery.install = function(Vue) {
    Vue.component(Gallery.name, Gallery)
}
export default Gallery
