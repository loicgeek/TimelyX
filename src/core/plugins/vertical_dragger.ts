export class VerticalDragger {
    isDragging: boolean = false;
    startY: number | null = null;
    initialTop: number | null = null;

    constructor() {}

    listen(element: HTMLElement) {
        element.style.position = 'absolute'; // Ensure the element can move freely

        element.addEventListener('mousedown', (event: MouseEvent) => {
            this.isDragging = true;
            this.startY = event.clientY; // Store the initial mouse Y position
            this.initialTop = element.offsetTop; // Store the initial element's top position
            event.preventDefault(); // Prevent text selection
        });

        window.addEventListener('mousemove', (event: MouseEvent) => {
            if (this.isDragging && this.startY !== null && this.initialTop !== null) {
                const deltaY = event.clientY - this.startY; // Calculate the Y-axis movement
                const newTop = this.initialTop + deltaY; // Calculate the new top position
                element.style.top = newTop + 'px'; // Move the element vertically
            }
        });

        window.addEventListener('mouseup', (event: MouseEvent) => {
            if (this.isDragging && this.startY !== null && this.initialTop !== null) {
                const endY = event.clientY; // Get the Y position when dragging stops
                const totalDrag = endY - this.startY; // Total distance moved during the drag

                // Calculate new position based on the initial top position
                const newPosition = this.initialTop + totalDrag;

                // Calculate the percentage moved relative to the initial position
                const percentageMoved = ((newPosition - this.initialTop) / this.initialTop) * 100;

                console.log(`Dragged vertically:initialTop:${this.initialTop},newPosition:${newPosition} ${percentageMoved.toFixed(2)}%`);

                this.isDragging = false; // Stop dragging
            }
        });
    }
}
