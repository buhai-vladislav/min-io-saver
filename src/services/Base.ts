import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAffectedResponse } from '../types/AffectedResponse';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { throwError } from '../utils/Utils';

@Injectable()
export class BaseService<T> {
  constructor(protected readonly baseRepository: Repository<T>) {}

  public async create(createDto: DeepPartial<T>): Promise<Partial<T>> {
    let resultRes: Partial<T> = null;
    try {
      resultRes = await this.baseRepository.save(createDto);
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }

    return resultRes;
  }

  public async getOneByOptions(
    where: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<Partial<T>> {
    let resultRes: Partial<T> = null;

    try {
      resultRes = await this.baseRepository.findOne({
        where,
        relations,
      });
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.BAD_REQUEST, {
        cause: new Error(error),
      });
    }

    return resultRes;
  }

  public async update(
    recordId: string,
    updateDto: QueryDeepPartialEntity<T>,
  ): Promise<IAffectedResponse> {
    let resultRes = null;

    try {
      resultRes = await this.baseRepository.update(recordId, updateDto);
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }

    if (!resultRes.affected) {
      throw new HttpException(
        'Record for update not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    const affectedResponseData: IAffectedResponse = {
      isAffected: !!resultRes.affected,
    };

    return affectedResponseData;
  }

  public async delete(where: FindOptionsWhere<T>): Promise<IAffectedResponse> {
    let resultRes = null;

    try {
      resultRes = await this.baseRepository.delete(where);
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }

    if (!resultRes.affected) {
      throw new HttpException(
        'Record for deletion not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    const affectedResponseData: IAffectedResponse = {
      isAffected: !!resultRes.affected,
    };

    return affectedResponseData;
  }
}
