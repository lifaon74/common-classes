import { IObservable, IObservableUnsubscribeFunction, Observable } from '../../../core/observable';
import { createNextNotification, INextNotification } from '../../../misc/notifications/build-in/next-notification';
import {
  createCompleteNotification, ICompleteNotification
} from '../../../misc/notifications/build-in/complete-notification';
import { createErrorNotification, IErrorNotification } from '../../../misc/notifications/build-in/error-notification';
import { createAbortNotification, IAbortNotification } from '../../../misc/notifications/build-in/abort-notification';
import {
  createProgressNotification, IProgressNotification
} from '../../../misc/notifications/build-in/progress-notification';
import { IObserver } from '../../../core/observer';
import {
  createEventListener, IRemoveEventListener
} from '../../../../observables-v5/misc/event-listener/create-event-listener';
import { toTypedEventTarget } from '../../../../observables-v5/misc/event-listener/to-typed-event-target';
import { IProgress } from '../../../misc/progress/progress-interface';
import { createProgressFromProgressEvent } from '../../../misc/progress/create-progress-from-progress-event';

export interface IFileReaderFormatsToTypeMap {
  'data-url': string;
  'text': string;
  'array-buffer': ArrayBuffer;
}

export type IFileReaderReadType = keyof IFileReaderFormatsToTypeMap;

export type TInferFileReaderReturnTypeFromReadType<GReadType extends IFileReaderReadType> = IFileReaderFormatsToTypeMap[GReadType];

export type IObservableReadBlobNotifications<GReadType extends IFileReaderReadType> =
  INextNotification<TInferFileReaderReturnTypeFromReadType<GReadType>>
  | ICompleteNotification
  | IErrorNotification<DOMException>
  | IAbortNotification<void>
  | IProgressNotification
  ;

export function readBlob<GReadType extends IFileReaderReadType>(
  blob: Blob,
  readType: GReadType
): IObservable<IObservableReadBlobNotifications<GReadType>> {
  type GReturnType = TInferFileReaderReturnTypeFromReadType<GReadType>;
  type GNotificationsUnion = IObservableReadBlobNotifications<GReadType>;
  return new Observable<GNotificationsUnion>((observer: IObserver<GNotificationsUnion>): IObservableUnsubscribeFunction => {
    const fileReader: FileReader = new FileReader();
    let running: boolean = true;

    const end = () => {
      running = false;
      removeLoadEventListener();
      removeErrorEventListener();
      removeAbortEventListener();
      removeProgressEventListener();
    };

    const next = (value: GReturnType) => {
      if (running) {
        observer.emit(createNextNotification<GReturnType>(value));
      }
    };

    const complete = () => {
      if (running) {
        end();
        observer.emit(createCompleteNotification());
      }
    };

    const error = (error: any) => {
      if (running) {
        end();
        observer.emit(createErrorNotification<any>(error));
      }
    };

    const abort = () => {
      if (running) {
        end();
        observer.emit(createAbortNotification<void>(void 0));
      }
    };

    const progress = (progress: IProgress) => {
      if (running) {
        observer.emit(createProgressNotification(progress));
      }
    };


    const removeLoadEventListener: IRemoveEventListener = createEventListener<'load', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'load',
      () => {
        next(fileReader.result as GReturnType);
        complete();
      }
    );

    const removeErrorEventListener: IRemoveEventListener = createEventListener<'error', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'error',
      () => {
        error(fileReader.error);
        complete();
      }
    );

    const removeAbortEventListener: IRemoveEventListener = createEventListener<'abort', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'abort',
      abort
    );

    const removeProgressEventListener: IRemoveEventListener = createEventListener<'progress', ProgressEvent<FileReader>>(
      toTypedEventTarget(fileReader),
      'progress',
      (event: ProgressEvent<FileReader>) => {
        progress(createProgressFromProgressEvent(event));
      }
    );

    switch (readType) {
      case 'data-url':
        fileReader.readAsDataURL(blob);
        break;
      case 'text':
        fileReader.readAsText(blob);
        break;
      case 'array-buffer':
        fileReader.readAsArrayBuffer(blob);
        break;
      default:
        throw new TypeError(`Expected 'dataURL', 'text', or 'arrayBuffer' as type`);
    }

    return (): void => {
      if (running) {
        end();
        fileReader.abort();
      }
    };
  });
}

