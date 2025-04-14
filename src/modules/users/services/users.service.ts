import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../../../schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findWithDynamicQuery(
    searchquery: {
      key: string;
      operator: 'equal' | 'less' | 'greater';
      value: string | number | boolean;
    }[],
  ): Promise<User[]> {
    const filter = searchquery.reduce((acc: Record<string, any>, condition) => {
      const { key, operator, value } = condition;
      const mongoOperator =
        operator === 'equal'
          ? '$eq'
          : operator === 'less'
            ? '$lt'
            : operator === 'greater'
              ? '$gt'
              : null;
      if (mongoOperator) {
        acc['parameters.' + key] = { [mongoOperator]: value };
      }
      return acc;
    }, {});
    return this.userModel.find(filter).exec();
  }

  async aggregateDeviceTypeDistribution(): Promise<
    { device: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.device_type', count: { $sum: 1 } } },
      { $project: { device: '$_id', count: 1, _id: 0 } },
    ]);
  }

  async getOSUsageStatistics(): Promise<{ os: string; count: number }[]> {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.os', count: { $sum: 1 } } },
      { $project: { os: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);
  }

  async getBrowserPopularityStatistics(): Promise<
    { browser: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.browser', count: { $sum: 1 } } },
      { $project: { browser: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);
  }

  async getSessionCountsByCountry(): Promise<
    { country: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.country', count: { $sum: 1 } } },
      { $project: { country: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
  }

  async getTopCitiesBySessionCount(): Promise<
    { city: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.city', count: { $sum: 1 } } },
      { $project: { city: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
  }

  async getHourlySessionUsage(): Promise<{ hour: string; count: number }[]> {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.hour', count: { $sum: 1 } } },
      { $project: { hour: '$_id', count: 1, _id: 0 } },
      { $sort: { hour: 1 } },
    ]);
  }

  async getWeekdayVsWeekendUsage(): Promise<{ type: string; count: number }[]> {
    return this.userModel.aggregate([
      {
        $group: {
          _id: {
            $cond: [
              { $in: ['$parameters.day_of_week', ['Saturday', 'Sunday']] },
              'Weekend',
              'Weekday',
            ],
          },
          count: { $sum: 1 },
        },
      },
      { $project: { type: '$_id', count: 1, _id: 0 } },
    ]);
  }

  async getSeasonalSessionTrends(): Promise<
    { season: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.season', count: { $sum: 1 } } },
      { $project: { season: '$_id', count: 1, _id: 0 } },
    ]);
  }

  async getUTMSourceAndMediumDistribution(): Promise<
    { source: string; medium: string; count: number }[]
  > {
    return this.userModel.aggregate([
      {
        $group: {
          _id: {
            source: '$parameters.utm_source',
            medium: '$parameters.utm_medium',
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          source: '$_id.source',
          medium: '$_id.medium',
          count: 1,
          _id: 0,
        },
      },
    ]);
  }

  async getTopMarketingCampaigns(): Promise<
    { campaign: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $match: { 'parameters.utm_campaign': { $ne: null } } },
      { $group: { _id: '$parameters.utm_campaign', count: { $sum: 1 } } },
      { $project: { campaign: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
  }

  async getTemperatureToViewRatio(): Promise<
    { temperature: number; view_ratio: number }[]
  > {
    return this.userModel.aggregate([
      {
        $project: {
          temperature: '$parameters.temperature',
          view_ratio: '$parameters.view_ratio',
        },
      },
      { $limit: 500 },
    ]);
  }

  async getNetworkSpeedToViewRatio(): Promise<
    { network_speed: string; view_ratio: number }[]
  > {
    return this.userModel.aggregate([
      {
        $project: {
          network_speed: '$parameters.network_speed',
          view_ratio: '$parameters.view_ratio',
        },
      },
      { $limit: 500 },
    ]);
  }

  async getViewRatioDistribution(): Promise<{ view_ratios: number[] }[]> {
    return this.userModel.aggregate([
      {
        $group: {
          _id: null,
          view_ratios: { $push: '$parameters.view_ratio' },
        },
      },
    ]);
  }

  async getAdBlockerUsageStatistics(): Promise<
    { ad_blocker: boolean; count: number }[]
  > {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.ad_blocker', count: { $sum: 1 } } },
      {
        $project: {
          ad_blocker: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);
  }

  async getRefererDomainCounts(): Promise<
    { referer_domain: string; count: number }[]
  > {
    return this.userModel.aggregate([
      { $match: { 'parameters.referer_domain': { $ne: null } } },
      { $group: { _id: '$parameters.referer_domain', count: { $sum: 1 } } },
      { $project: { referer_domain: '$_id', count: 1, _id: 0 } },
    ]);
  }

  async getHourlySessionCounts(): Promise<{ hour: string; count: number }[]> {
    return this.userModel.aggregate([
      { $group: { _id: '$parameters.hour', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $project: { hour: '$_id', count: 1, _id: 0 } },
    ]);
  }
}
