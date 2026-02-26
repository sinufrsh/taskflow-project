import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusFilter',
    standalone: true
})
export class StatusFilterPipe implements PipeTransform {

    transform(tasks: any[], status: string): any[] {
        if (!tasks) return [];
        if (status === 'ALL') return tasks;
        return tasks.filter(task => task.status === status);
    }
}