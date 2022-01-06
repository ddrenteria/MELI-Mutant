import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryMock {
	findOne = jest.fn();
    save = jest.fn();
    createQueryBuilder = jest.fn();
}
