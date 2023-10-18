<template>
    <NavigationBar />
    <ColoringBook />
</template>

<script>
import ColoringBook from '../components/ColoringBook.vue'
import NavigationBar from '../components/NavigationBar.vue';

export default {
    components: {
        NavigationBar,
        ColoringBook
    }
}
</script>