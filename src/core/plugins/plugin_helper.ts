export class PluginHelper {
    static detectCorner(event: MouseEvent, element: HTMLElement): string|null {
        const rect = element.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const cornerThreshold =20; // 20px from any corner
        let currentCorner;

        // Check for top-left corner
        if (offsetX < cornerThreshold && offsetY < cornerThreshold) {
            currentCorner = 'top-left';
            element.style.cursor = 'nw-resize';
        }
        // Check for top-right corner
        else if (offsetX > rect.width - cornerThreshold && offsetY < cornerThreshold) {
            currentCorner = 'top-right';
            element.style.cursor = 'ne-resize';
        }
        // Check for bottom-left corner
        else if (offsetX < cornerThreshold && offsetY > rect.height - cornerThreshold) {
            currentCorner = 'bottom-left';
            element.style.cursor = 'sw-resize';
        }
        // Check for bottom-right corner
        else if (offsetX > rect.width - cornerThreshold && offsetY > rect.height - cornerThreshold) {
            currentCorner = 'bottom-right';
            element.style.cursor = 'se-resize';
        } else {
            currentCorner = null;
            element.style.cursor = 'default';
        }
        return currentCorner;
    }
}