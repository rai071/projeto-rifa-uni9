import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';

export class ErrorHandler {
    static handleError(error: HttpResponse<any> | any) {
        let errorMessage: string;
        if (error instanceof HttpResponse) {
            const body = error.body || '';
            const err = body.error || JSON.stringify(body);
            errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }
        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }
}
