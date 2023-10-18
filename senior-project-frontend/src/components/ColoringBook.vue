<template>
    <div>
        <div id="coloring-book" ref="coloringBook" 
        @mousedown="coloringBookMouseDown" @mouseup="coloringBookMouseUp" @mousemove="coloringBookMouseMove">
            <!-- Coloring book canvas goes here -->
        </div>
        <div id="color-palette" ref="colorPalette">
            <!-- Color palette goes here -->
            <button @click="setColor('#FF0000')" class="color" style="background-color: #FF0000;"></button>
            <button @click="setColor('#00ff00')" class="color" style="background-color: #00ff00;"></button>
            <button @click="setColor('#0000ff')" class="color" style="background-color: #0000ff;"></button>
            <button @click="setColor('#ffff00')" class="color" style="background-color: #ffff00;"></button>
            <button @click="setColor('#ff00ff')" class="color" style="background-color: #ff00ff;"></button>
            <button @click="setColor('#00ffff')" class="color" style="background-color: #00ffff;"></button>
            <button @click="clearCanvas()">Clear Canvas</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            coloringBook: this.$refs.coloringBook,
            colorPalette: this.$refs.colorPalette,
            selectedColor: '#ff0000',
            isDrawing: false
        };
    },
    methods: {
        setColor(color) {
            this.selectedColor = color;
        },
        clearCanvas() {
            this.$refs.coloringBook.innerHTML = ''; // Clear all colored dots
        },
        draw(e) {
            if (!e) return; // Check if the event is defined
            // Access event properties safely
            const clientX = e.clientX;
            const clientY = e.clientY;
            const coloringBook = this.$refs.coloringBook;

            if (!this.isDrawing) return;

            const rect = coloringBook.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const dot = document.createElement('div');
            dot.style.position = 'absolute';
            dot.style.backgroundColor = this.selectedColor;
            dot.style.borderRadius = '50%';
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';

            coloringBook.appendChild(dot);
        },
        coloringBookMouseDown() {
            this.isDrawing = true;
        },
        coloringBookMouseUp() {
            this.isDrawing = false;
        },
        coloringBookMouseMove(e) {
            this.draw(e);
            console.log(e);
        }

    }
};
</script>

<style scoped>
#coloring-book {
width: 600px;
height: 400px;
border: 1px solid #000;
/* background-image: url('../assets/coloring-page.jpg'); */
background-size: cover;
}

#color-palette {
display: flex;
justify-content: center;
}

.color {
width: 30px;
height: 30px;
margin: 5px;
cursor: pointer;
}

/* Add styles for more colors and buttons as needed */
</style>