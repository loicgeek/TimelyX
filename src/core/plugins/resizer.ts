

export class Resizer {
    cornerThreshold: number;
    isResizing: boolean = false;
    currentCorner: string | null = null;

    constructor({
        cornerThreshold = 20
    } = {}) {
        this.cornerThreshold = cornerThreshold;
    }



    listen(element: HTMLElement,timeSlotHeight:number, onSizedChangePercentage: (e: {}) => void,) {
       // Store the initial width and height
    const targetRect = element.getBoundingClientRect();
    const originalWidth = targetRect.width;
    const originalHeight = targetRect.height;
    let widthChangePercentage: number = 0
    let heightChangePercentage:number =0
    


    const sizeObserver =new ResizeObserverWrapper();
    sizeObserver.observe(element, () => {
        const target = element as HTMLElement;
        const targetRect = target.getBoundingClientRect();
        const currentWidth = targetRect.width;
        const currentHeight =targetRect.height;
        // Calculate the percentage change in width and height
        widthChangePercentage = ((currentWidth - originalWidth) / originalWidth) * 100;
        heightChangePercentage = ((currentHeight - originalHeight) / originalHeight) * 100;       
    })
   

    // Prevent click propagation during resizing
    element.addEventListener('mousedown', (event) => {
        this.isResizing = true;
    event.stopPropagation();  // Prevent click propagation
        if (this.currentCorner) {
            event.stopPropagation();  // Prevent click propagation
            event.preventDefault();   // Prevent default behavior (e.g., text selection)
        }
    });

    document.addEventListener('mouseup', (_) => {
        
       if(this.isResizing && (widthChangePercentage!=0 || heightChangePercentage!=0)){
        this.isResizing =false;
        onSizedChangePercentage({
            "percentW":widthChangePercentage,
            "percentH":heightChangePercentage,
        })
       }
    });

    }

   
}

class ResizeObserverWrapper {

     _lastWidth: number | undefined;
     _lastHeight:number | undefined;

    observe(htmlElement: HTMLElement, onSizeChanged:Function) {

        new ResizeObserver(entries => {
            if (entries != undefined && entries.length > 0) {
                const newWidth = entries[0].target.clientWidth;
                const newHeight = entries[0].target.clientHeight;


                if (newWidth != undefined && newWidth > 0
                    && newHeight != undefined && newHeight > 0
                ) {
                    let dimensionChanged = newWidth != this._lastWidth && this._lastWidth! > 0
                        || newHeight != this._lastHeight  && this._lastHeight! > 0 ;
                    this._lastHeight = newHeight;
                    this._lastWidth = newWidth;
                    if (dimensionChanged) {
                        onSizeChanged();
                    }
                }
            }
        }).observe(htmlElement);
    }
}
