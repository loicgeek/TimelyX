import { PluginHelper } from "./plugin_helper";

export class VerticalDragger {
    isDragging: boolean = false;
    startY: number | null = null;
    initialTop: number | null = null;
    initialTopPercentage: number | null = null;

    constructor() {}

    listen(element: HTMLElement,tyxCalendarWeekGridHeight:number, onTranslated: (e: {}) => void,) {
       
        element.addEventListener('mousedown', (event: MouseEvent) => {
           const corner = PluginHelper.detectCorner(event, element);
           if(corner) return;
            this.isDragging = true;
            this.startY = event.clientY; // Store the initial mouse Y position
            this.initialTop = element.offsetTop; // Store the initial element's top position
            this.initialTopPercentage = parseFloat(element.style.top.replace("%",""));
            console.log("element.style.top",element.style.top);
            event.preventDefault(); // Prevent text selection
        });

        window.addEventListener('mousemove', (event: MouseEvent) => {
            if (this.isDragging && this.startY !== null && this.initialTop !== null) {
                const deltaY = event.clientY - this.startY; // Calculate the Y-axis movement
                const newTop = this.initialTop + deltaY; // Calculate the new top position
                
                element.style.top = `${newTop*100/tyxCalendarWeekGridHeight}%`; // Move the element vertically
            }
        });

        window.addEventListener('mouseup', (event: MouseEvent) => {
            if (this.isDragging && this.startY !== null && this.initialTop !== null) {
                const deltaY = event.clientY - this.startY; // Calculate the Y-axis movement
                const newTop = this.initialTop + deltaY; // Calculate the new top position
                

                console.log("element.style.top",element.style.top);
                const newTopPercentage = newTop*100/tyxCalendarWeekGridHeight; // Move the element vertically
                // Calculate the percentage moved relative to the initial position
                console.log(`Movement:${newTopPercentage - this.initialTopPercentage!}%`);
                const percentageMoved = newTopPercentage - this.initialTopPercentage!;
                this.isDragging = false; // Stop dragging
                if(percentageMoved!==0){
                    onTranslated.call(this, { "ty":percentageMoved,'initialTy':this.initialTopPercentage,'newTy':newTopPercentage });
                }
            }
        });
    }
}
