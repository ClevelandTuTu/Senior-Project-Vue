<template>
    <div>
        <div id="coloring-book">
            <!-- Coloring book canvas goes here -->
        </div>
        <div id="color-palette">
            <!-- Color palette goes here -->
            <button @click="clearCanvas">Clear</button>
        </div>
    </div>
</template>

<style scoped>
#coloring-book {
width: 600px;
height: 400px;
border: 1px solid #000;
/* background-image: url('coloring-page.jpg'); */
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

<script>
export default {
    data() {
        return {
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
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
        if (!this.isDrawing) return;

        const rect = this.$refs.coloringBook.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.backgroundColor = this.selectedColor;
        dot.style.borderRadius = '50%';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';

        this.$refs.coloringBook.appendChild(dot);
        }
    },
    mounted() {
        this.colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color');
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', () => this.setColor(color));
        this.$refs.colorPalette.appendChild(colorDiv);
        });
    }
};
</script>