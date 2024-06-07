import { Injectable } from '@nestjs/common';

@Injectable()
export class ManipulatorsService {
    getManipulators(): string {
        return 'All manipulators';
    }
}
