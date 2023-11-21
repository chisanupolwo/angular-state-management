
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { catchError, concatMap, delay, map, startWith, switchMap, tap } from 'rxjs/operators';
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
export class AvatarPaginateService {

    // Actions
    pagination$ = new Subject<void>()
    updateItemPage$ = new Subject<number>()
    private avatarLoad$ = this.pagination$.pipe(
        concatMap(() => this.getData(this.page()))
    )

    // Selectors
    avatar = computed(() => this.state()?.value)
    error = computed(() => this.state()?.error?.message)

    // State
    private state = signal<State>({ value: undefined, error: undefined })

    // Page control
    private page = signal(0)
    private itempage = signal(10)

    private http = inject(HttpClient)

    constructor() {
        // Pagination
        this.pagination$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.state.update(state => ({ ...state, value: undefined, error: undefined }))
        });
        // Get data
        this.avatarLoad$.pipe(takeUntilDestroyed()).subscribe(data => {
            this.page.update(value => value + 1)
            this.state.update(state => ({ ...state, value: data, error: undefined }))
        });
        // Page control
        this.updateItemPage$.pipe(takeUntilDestroyed()).subscribe(data => {
            this.itempage.update(() => data);
            this.page.update(() => 0);
            this.pagination$.next()
        });
    }

    private getData(page: number | undefined): Observable<Avatar[]> {
        console.log('Page', page)
        console.log('Item', this.itempage())
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
