import { Test, TestingModule } from '@nestjs/testing';
import { ManipulatorsService } from './manipulators.service';

describe('ManipulatorsService', () => {
  let manipulatorService: ManipulatorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManipulatorsService],
    }).compile();

    manipulatorService = module.get<ManipulatorsService>(ManipulatorsService);
  });

  it('should be defined', () => {
    expect(manipulatorService).toBeDefined();
  });

  it('should return "All manipulators"', () => {
    const response = manipulatorService.getManipulators();
    expect(response).toBe('All manipulators');
  });

  it('Transfer all values of 1D array A=[10, 9, 8, 7, 6, 5, 4, 3, 2, 1] to B by loops', () => {
    const A = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    let B: number[] = [];
    let C: number[] = [];

    for (let i = 0; i < A.length; i++) {
      B.push(A[i]);
    }

    for (let item of A) {
      C.push(item);
    }

    expect(B).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    expect(C).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it('Transfer all values of 1D array A=[10, 9, 8, 7, 6, 5, 4, 3, 2, 1] to B by array operations', () => {
    const A = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    let B: number[] = A.map((item) => item);

    expect(B).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });
});
