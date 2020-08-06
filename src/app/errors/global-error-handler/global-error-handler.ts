import { Router } from '@angular/router';
import { ErrorHandler, Injector, Injectable } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { UserService } from './../../core/user/user.service';
import { ServerLogService } from './server-log-service';
import { ServerLog } from './server-log';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: any): void {
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const message = error.message ? error.message : error.toString();
        const userService = this.injector.get(UserService);
        const router = this.injector.get(Router);

        router.navigate(['/error']);

        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                console.log(message);
                console.log(stackAsString);

                this.sendLog({ message, url, userName: userService.getUserName(), stack: stackAsString });
            });

    }

    sendLog(log: ServerLog) {
        const serverLogService = this.injector.get(ServerLogService);

        serverLogService
            .log(log)
            .subscribe(
                success => {
                    console.log('Error logged on server')
                },
                err => {
                    console.log(err);
                    console.log('Fail to send error log to server');
                }
            );
    }
}