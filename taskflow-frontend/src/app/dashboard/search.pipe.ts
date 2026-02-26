import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
    standalone: true
})
export class SearchPipe implements PipeTransform {

    transform(tasks: any[], text: string): any[] {

        if (!tasks) return [];

        if (!text || text.trim() === '') return tasks;

        text = text.toLowerCase();

        return tasks.filter(task =>
            task.title.toLowerCase().includes(text) ||
            task.description.toLowerCase().includes(text)
        );
    }
}