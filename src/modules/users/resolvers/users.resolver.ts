import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchQueryInput, User } from '../../../../schemas';
import { UsersService } from '../services/users.service';
import GraphQLJSON from 'graphql-type-json';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../../guards/auth-guard';

@UseGuards(AuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'dynamicQuery' })
  async dynamicQuery(
    @Args('searchquery', { type: () => [SearchQueryInput] })
    searchquery: SearchQueryInput[],
  ): Promise<any[]> {
    return await this.usersService.findWithDynamicQuery(searchquery);
  }

  @Query(() => GraphQLJSON, { name: 'deviceTypeDistribution' })
  async getDeviceTypeDistribution(): Promise<
    { device: string; count: number }[]
  > {
    return await this.usersService.aggregateDeviceTypeDistribution();
  }

  @Query(() => GraphQLJSON, { name: 'osUsage' })
  async getOSUsageStatistics(): Promise<{ os: string; count: number }[]> {
    return this.usersService.getOSUsageStatistics();
  }

  @Query(() => GraphQLJSON, {
    name: 'browserPopularity',
  })
  async getBrowserPopularityStatistics(): Promise<
    { browser: string; count: number }[]
  > {
    return this.usersService.getBrowserPopularityStatistics();
  }

  @Query(() => GraphQLJSON, {
    name: 'sessionsByCountry',
  })
  async getSessionCountsByCountry(): Promise<
    { country: string; count: number }[]
  > {
    return this.usersService.getSessionCountsByCountry();
  }

  @Query(() => GraphQLJSON, {
    name: 'topCities',
  })
  async getTopCitiesBySessionCount(): Promise<
    { city: string; count: number }[]
  > {
    return this.usersService.getTopCitiesBySessionCount();
  }

  @Query(() => GraphQLJSON, { name: 'hourlyUsage' })
  async getHourlyUsage(): Promise<{ hour: string; count: number }[]> {
    return this.usersService.getHourlySessionUsage();
  }

  @Query(() => GraphQLJSON, { name: 'weekdayWeekendUsage' })
  async getWeekdayWeekendUsage(): Promise<{ type: string; count: number }[]> {
    return this.usersService.getWeekdayVsWeekendUsage();
  }

  @Query(() => GraphQLJSON, { name: 'seasonalTrends' })
  async getSeasonalTrends(): Promise<{ season: string; count: number }[]> {
    return this.usersService.getSeasonalSessionTrends();
  }

  @Query(() => GraphQLJSON, { name: 'utmSourceMedium' })
  async getUTMSourceMedium(): Promise<
    { source: string; medium: string; count: number }[]
  > {
    return this.usersService.getUTMSourceAndMediumDistribution();
  }

  @Query(() => GraphQLJSON, { name: 'topCampaigns' })
  async getTopCampaigns(): Promise<{ campaign: string; count: number }[]> {
    return this.usersService.getTopMarketingCampaigns();
  }

  @Query(() => GraphQLJSON, { name: 'networkSpeedVsViewRatio' })
  async getNetworkSpeedVsViewRatio(): Promise<
    { network_speed: string; view_ratio: number }[]
  > {
    return this.usersService.getNetworkSpeedToViewRatio();
  }

  @Query(() => GraphQLJSON, { name: 'adBlockerUsage' })
  async getAdBlockerUsage(): Promise<{ ad_blocker: boolean; count: number }[]> {
    return this.usersService.getAdBlockerUsageStatistics();
  }

  @Query(() => GraphQLJSON, { name: 'refererDomainCounts' })
  async getRefererDomainCounts(): Promise<
    { referer_domain: string; count: number }[]
  > {
    return this.usersService.getRefererDomainCounts();
  }

  @Query(() => [GraphQLJSON], { name: 'hourlySessionCounts' })
  async getHourlySessionCounts(): Promise<{ hour: string; count: number }[]> {
    return this.usersService.getHourlySessionCounts();
  }
}
