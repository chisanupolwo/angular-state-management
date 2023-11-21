
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, of } from 'rxjs';

export interface Avatar {
    id: number;
    Title: string,
    DirectedBy: string
    OriginalAirDate: string
}

interface State {
    value: Avatar[] | undefined,
    error: { message: string } | undefined
}

@Injectable({
    providedIn: 'root'
})
export class AvatarService {

    // Actions
    load$ = new Subject<void>()

    // Selectors
    avatar = computed(() => this.state()?.value)
    error = computed(() => this.state()?.error?.message)

    // State
    private state = signal<State>({ value: undefined, error: undefined })

    private avatarLoad$ = this.load$.pipe(switchMap(() => this.getData()))

    private http = inject(HttpClient)

    constructor() {
        // Loading data
        this.load$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.state.update(state => ({ ...state, value: undefined, error: undefined }))
        });
        // Get data
        this.avatarLoad$.pipe(takeUntilDestroyed()).subscribe(data => {
            this.state.update(state => ({ ...state, value: data, error: undefined }))
        })
    }

    private getData(): Observable<Avatar[]> {
        return this.http.get<Avatar[]>('https://api.sampleapis.com/avatar/episodes').pipe(
            delay(3000),
            catchError(error => {
                this.handleError(error)
                return EMPTY
            }),
            map(data => (data))
        )
    }

    private handleError(error: HttpErrorResponse) {
        console.log('Handle error', error)
        this.state.update(state => ({ ...state, value: undefined, error: { message: error.message } }))
    }

}
