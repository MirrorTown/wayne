import { EventEmitter } from '@angular/core';
import { CommonFile } from './upload.interface';
export declare class ElUploadList {
    files: CommonFile[];
    elDisabled: boolean;
    listType: string;
    remove: EventEmitter<CommonFile>;
    preview: EventEmitter<CommonFile>;
    clickHandle(file: CommonFile): void;
    removeHandle(file: CommonFile): void;
    previewHandle(file: CommonFile): void;
}
