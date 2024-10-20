
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

extend([mixPlugin])

export class ColorUtils{
    
    static  generateForegroundColorFrom =   (input:any, percentage = 0.8) =>{
        return colord(input)
          .mix(colord(input).isDark() ? 'white' : 'black', percentage)
          .toHslString()
       
      }

      static generateEventBgColor(color:any){
        return colord(color).lighten(0.25).toHex()
      }
      static generateEventTitleColor(color:any){
        return   colord(color).darken(0.3).toHex();
      }

      static generateEventDescriptionColor(){

      }
      static generateEventBorderColor(color:any){
        return colord(color).darken(0.3).toHex()
      }
    
}