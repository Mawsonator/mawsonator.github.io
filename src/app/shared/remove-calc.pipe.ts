import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'removeCalc',
    standalone: false
})
export class RemoveCalcPipe implements PipeTransform {

    transform(value: string) {
        const withoutPrefix = value.replace('calc', '');
        const spaced = withoutPrefix.replace(/([a-z])([A-Z])/g, '$1 $2');
        return spaced.charAt(0).toUpperCase() + spaced.slice(1);
    }

}