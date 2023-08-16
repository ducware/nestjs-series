/* eslint-disable prettier/prettier */
import { Document, FilterQuery, Model, QueryOptions } from 'mongoose';

export class BaseRepositoy<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc): Promise<any> {
    const createEntity = new this.model(doc);
    return await createEntity.save();
  }

  async findById(id: string, optiton?: QueryOptions): Promise<T> {
    return this.model.findById(id, optiton);
  }

  async findByCondition(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<T> {
    return await this.model.findOne(filter, field, option).populate(populate);
  }

  async getByCondition(
    filter,
    field?: any | null,
    option?: any | null,
    populate?: any | null,
  ): Promise<T[]> {
    return await this.model.find(filter, field, option).populate(populate);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async aggregate(option: any) {
    return await this.model.aggregate(option);
  }

  async populate(result: T[], option: any) {
    return await this.model.populate(result, option);
  }

  async deleteOne(id: string) {
    return await this.model.deleteOne({ _id: id} as FilterQuery<T>);
  }

  async deleteMany(id: string[]) {
    return await this.model.deleteMany({ _id: { $in: id} } as FilterQuery<T>);
  }

  async deleteByCondition(filter) {
    return await this.model.deleteMany(filter);
  }

  async findByConditionAndUpdate(filter, update) {
    return await this.model.findOneAndUpdate(filter as FilterQuery<T>, update);
  }

  async updateMany(filter, update, option?: any | null, callback?: any | null) {
    return await this.model.updateMany(filter, update, option, callback);
  }

  async findByIdAndUpdate(id, update) {
    return await this.model.findByIdAndUpdate(id, update);
  }
}
